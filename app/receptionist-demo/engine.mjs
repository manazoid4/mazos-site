/**
 * After-hours receptionist demo: the conversation rules.
 *
 * Plain rules, no paid services: it answers only from the business details it
 * is given (hours, services, "from" prices, areas, urgent words) and takes a
 * message for everything else. It never guesses a price. Shared by the demo
 * page and tests/receptionist-demo.test.mjs.
 *
 * @typedef {{ name: string, price?: string }} Service
 * @typedef {{ name: string, hours: string, services: Service[], areas?: string, urgent?: string[], callback?: string }} DeskConfig
 * @typedef {{ title: string, urgent: boolean, rows: [string, string][] }} DeskSummary
 */

export const DEFAULT_CONFIG = {
  name: 'Harbour Street Garage',
  hours: 'Monday to Friday 8am to 6pm, and Saturday 8am to 12 noon',
  services: [
    { name: 'MOT', price: 'from £45' },
    { name: 'Service', price: 'from £120' },
    { name: 'Tyres' },
    { name: 'Brakes' },
    { name: 'Clutch' },
    { name: 'Diagnostics', price: 'from £40' },
  ],
  areas: 'the town and villages within about 10 miles',
  urgent: ['broken down', 'breakdown', 'accident', 'blocking', 'stuck', 'smoke'],
  callback: 'after 8am on the next working day',
};

const WORD_DIGITS = { zero: '0', oh: '0', o: '0', nought: '0', one: '1', two: '2', three: '3', four: '4', five: '5', six: '6', seven: '7', eight: '8', nine: '9' };

/** Turns "oh seven seven double oh 900123" into "07700900123". */
export function digitsFrom(text) {
  const words = String(text).toLowerCase().replace(/[^a-z0-9 ]/g, ' ').split(/\s+/).filter(Boolean);
  let out = '';
  for (let i = 0; i < words.length; i += 1) {
    const word = words[i];
    if ((word === 'double' || word === 'treble' || word === 'triple') && i + 1 < words.length) {
      const next = WORD_DIGITS[words[i + 1]] ?? (/^\d$/.test(words[i + 1]) ? words[i + 1] : '');
      if (next) { out += next.repeat(word === 'double' ? 2 : 3); i += 1; continue; }
    }
    if (/^\d+$/.test(word)) out += word;
    else if (WORD_DIGITS[word]) out += WORD_DIGITS[word];
  }
  return out;
}

/** UK-style grouping for reading back: 07700 900123. */
export function formatNumber(digits) {
  if (digits.length === 11 && digits.startsWith('0')) return `${digits.slice(0, 5)} ${digits.slice(5)}`;
  return digits;
}

/** "it's Sam Jones" / "my name is sam" → "Sam Jones". */
export function nameFrom(text) {
  const cleaned = String(text).replace(/[^A-Za-z' -]/g, ' ')
    .replace(/^\s*(hi|hello|yeah|yes|ok|okay|sure)[, ]+/i, '')
    .replace(/^\s*(it'?s|it is|my name is|my name'?s|i'?m|i am|this is|call me|name'?s)\s+/i, '')
    .trim();
  const words = cleaned.split(/\s+/).filter(Boolean).slice(0, 3);
  return words.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
}

const has = (text, words) => words.some((word) => new RegExp(`\\b${word}\\b`, 'i').test(text));
const YES = ['yes', 'yeah', 'yep', 'please', 'sure', 'ok', 'okay', 'go on', 'that would be great'];
const NO = ['no', 'nope', 'nothing', "that's all", 'thats all', 'that is all', 'no thanks', 'bye', 'goodbye', 'cheers'];

/** Normalises a config from a link: drops empty parts, keeps strings short. */
export function cleanConfig(input) {
  const raw = input && typeof input === 'object' ? input : {};
  const text = (value, max) => (typeof value === 'string' ? value.trim().slice(0, max) : '');
  const services = Array.isArray(raw.services) ? raw.services : [];
  const config = {
    name: text(raw.name, 60) || DEFAULT_CONFIG.name,
    hours: text(raw.hours, 160) || DEFAULT_CONFIG.hours,
    services: services
      .map((service) => ({ name: text(service?.name, 40), price: text(service?.price, 40) || undefined }))
      .filter((service) => service.name)
      .slice(0, 20),
    areas: text(raw.areas, 160) || undefined,
    urgent: (Array.isArray(raw.urgent) ? raw.urgent : []).map((word) => text(word, 30).toLowerCase()).filter(Boolean).slice(0, 12),
    callback: text(raw.callback, 80) || 'on the next working day',
  };
  if (!config.services.length && !raw.name) config.services = DEFAULT_CONFIG.services;
  if (!config.urgent.length && !raw.name) config.urgent = DEFAULT_CONFIG.urgent;
  return config;
}

/** Link-safe encoding of a config (base64url JSON), and back. */
export function encodeConfig(config) {
  const bytes = new TextEncoder().encode(JSON.stringify(config));
  let binary = '';
  bytes.forEach((byte) => { binary += String.fromCharCode(byte); });
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
export function decodeConfig(code) {
  try {
    const binary = atob(String(code).replace(/-/g, '+').replace(/_/g, '/'));
    const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
    return cleanConfig(JSON.parse(new TextDecoder().decode(bytes)));
  } catch {
    return null;
  }
}

/**
 * One call. `greet()` starts it; `reply(text)` takes what the caller said and
 * returns what the receptionist says next; `summary()` is the owner's email.
 * @param {DeskConfig} input
 */
export function createDesk(input) {
  const config = cleanConfig(input);
  /** @type {'open'|'offer'|'name'|'number'|'more'|'done'} */
  let stage = 'open';
  let caller = '';
  let number = '';
  let numberTries = 0;
  let urgent = false;
  const wants = [];
  const answered = [];

  const findService = (text) => config.services.find((service) => service.name.toLowerCase().split(/\s+/).some((word) => word.length > 2 && new RegExp(`\\b${word}`, 'i').test(text)));
  const askName = (lead) => {
    if (caller && number) { stage = 'more'; return `${lead} I’ve added that to your message. Anything else?`; }
    stage = 'name';
    return `${lead} Can I take your name?`;
  };

  function open(text) {
    const t = text.toLowerCase();
    if (config.urgent.length && has(t, config.urgent.map((word) => word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')))) {
      urgent = true;
      wants.push(`Urgent: ${text.trim()}`);
      return askName('Thanks for telling me. If anyone is in danger, please ring 999. I’ll mark this as urgent for the owner.');
    }
    if (has(t, ['real person', 'human', 'robot', 'automated', 'machine', 'are you real'])) {
      answered.push('Said it is an automated receptionist');
      return `No, I’m the automated receptionist for ${config.name}. I can answer common questions or take a message for the team. How can I help?`;
    }
    if (has(t, ['open', 'opening', 'hours', 'close', 'closing', 'what time', 'when are you'])) {
      answered.push('Opening hours');
      return `We’re open ${config.hours}. Is there anything else I can help with?`;
    }
    const service = findService(t);
    if (has(t, ['price', 'prices', 'cost', 'costs', 'how much', 'charge', 'quote', 'pricing'])) {
      if (service?.price) {
        answered.push(`${service.name} price`);
        wants.push(service.name);
        stage = 'offer';
        return `${service.name} is ${service.price}. For an exact price the team will need a few details. Would you like them to call you back?`;
      }
      wants.push(`Price for ${service ? service.name : text.trim()}`);
      return askName('I don’t have a price for that, so I won’t guess. The team can call you with a proper quote.');
    }
    if (config.areas && has(t, ['area', 'areas', 'cover', 'come out', 'near', 'far', 'travel', 'where are you', 'location'])) {
      answered.push('Areas covered');
      return `We cover ${config.areas}. Is there anything else?`;
    }
    if (has(t, ['book', 'booking', 'appointment', 'slot', 'available', 'availability', 'come in'])) {
      wants.push(service ? `Book: ${service.name}` : `Booking: ${text.trim()}`);
      return askName('I can’t book the diary myself, but the team will call you to arrange it.');
    }
    if (service) {
      answered.push(`Confirmed ${service.name}`);
      wants.push(service.name);
      stage = 'offer';
      return `Yes, we do ${/^[A-Z0-9]{2,}$/.test(service.name) ? service.name : service.name.toLowerCase()}. Would you like the team to call you back to arrange it?`;
    }
    if (has(t, NO)) return finish();
    wants.push(`Message: ${text.trim()}`);
    return askName('I can’t answer that one myself, but I can take a message for the team.');
  }

  function finish() {
    stage = 'done';
    return caller
      ? `Thanks for calling, ${caller.split(' ')[0]}. ${urgent ? 'The owner has your details marked as urgent.' : `The team will be in touch ${config.callback}.`} Goodbye.`
      : `Thanks for calling ${config.name}. Goodbye.`;
  }

  return {
    config,
    get stage() { return stage; },
    greet() { return `Good evening, ${config.name}. We’re closed right now, but I can answer a question or take a message. How can I help?`; },
    /** @param {string} said */
    reply(said) {
      const text = String(said || '').trim();
      if (stage === 'done') return '';
      if (!text) return 'Sorry, I didn’t catch that. Could you say it again?';
      if (stage === 'offer') {
        if (has(text, NO)) { stage = 'more'; return 'No problem. Is there anything else I can help with?'; }
        if (has(text, YES)) return askName('Great.');
        return open(text);
      }
      if (stage === 'name') {
        caller = nameFrom(text) || 'Caller';
        stage = 'number';
        return `Thanks, ${caller.split(' ')[0]}. What’s the best number to call you on?`;
      }
      if (stage === 'number') {
        const digits = digitsFrom(text);
        numberTries += 1;
        if (digits.length < 10 && numberTries < 2) return 'Sorry, could you say the number again, digit by digit?';
        number = digits.length >= 10 ? formatNumber(digits) : text;
        stage = 'more';
        return `Thanks. That’s ${number}. ${urgent ? 'I’ve marked this as urgent for the owner.' : `The team will call you back ${config.callback}.`} Is there anything else?`;
      }
      if (stage === 'more') {
        if (has(text, NO) && !has(text, ['how', 'what', 'when', 'do you'])) return finish();
        if (has(text, YES) && text.split(/\s+/).length <= 2) return 'Of course. What else can I help with?';
      }
      return open(text);
    },
    /** @returns {DeskSummary} */
    summary() {
      const title = urgent ? 'Urgent call' : wants.length ? 'New enquiry' : 'Question answered';
      /** @type {[string, string][]} */
      const rows = [];
      rows.push(['Caller', caller ? `${caller}${number ? ` · ${number}` : ''}` : 'No details left']);
      if (wants.length) rows.push(['Wants', wants.join('; ')]);
      if (answered.length) rows.push(['Answered', answered.join('; ')]);
      rows.push(['Next step', caller ? (urgent ? 'Urgent: ring back now' : `Call back ${config.callback}`) : 'Nothing to do']);
      return { title, urgent, rows };
    },
  };
}
