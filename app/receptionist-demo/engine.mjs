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
 * @typedef {'open'|'offer'|'name'|'number'|'confirm'|'more'|'done'} DeskStage
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

/**
 * Turns "oh seven seven double oh 900123" into "07700900123". "plus forty four" gives 44.
 * With `loose`, a heard "to", "too" or "for" between two digit words counts as 2 or 4.
 * @param {string} text
 * @param {boolean} [loose]
 */
export function digitsFrom(text, loose = false) {
  let said = String(text).toLowerCase();
  // "oh yeah, oh seven…": the first "oh" is a filler, not a zero.
  if (loose) said = said.replace(/\b(?:oh|o)[,.]? (?=(?:yeah|yes|sorry|um+|er+m?|right|ok|okay|well|so|hmm|sure|no|hi|hello)\b)/g, ' ');
  const words = said.replace(/[^a-z0-9 ]/g, ' ').split(/\s+/).filter(Boolean);
  const digitWord = (word) => word !== undefined && (/^\d+$/.test(word) || word in WORD_DIGITS || word === 'double' || word === 'treble' || word === 'triple');
  let out = '';
  for (let i = 0; i < words.length; i += 1) {
    const word = words[i];
    if (word === 'forty' && words[i + 1] === 'four' && (!out || words[i - 1] === 'plus')) { out += '44'; i += 1; continue; }
    if (loose && (word === 'to' || word === 'too' || word === 'for') && digitWord(words[i - 1]) && digitWord(words[i + 1])) { out += word === 'for' ? '4' : '2'; continue; }
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

/**
 * Speech-friendly copy of a line: any run of 7+ digits is read digit by digit,
 * "07700 900123" becomes "0 7 7 0 0, 9 0 0, 1 2 3". Everything else is unchanged.
 */
export function spoken(text) {
  return String(text).replace(/\d(?: ?\d){6,}/g, (run) => {
    const digits = run.replace(/ /g, '');
    const sizes = digits.length === 11 ? [5, 3, 3] : [];
    const groups = [];
    for (let at = 0, i = 0; at < digits.length; i += 1) {
      const size = sizes[i] ?? 3;
      groups.push(digits.slice(at, at + size).split('').join(' '));
      at += size;
    }
    return groups.join(', ');
  });
}

/** A UK number from spoken digits: +44 / 0044 become 0; 11 digits, or a 10-digit 01/02 landline. '' if not valid. */
function ukNumber(digits) {
  let d = digits;
  if (d.startsWith('0044')) d = `0${d.slice(4).replace(/^0/, '')}`;
  else if (d.startsWith('44') && d.length >= 11) d = `0${d.slice(2).replace(/^0/, '')}`;
  return /^0\d{10}$/.test(d) || /^0[12]\d{8}$/.test(d) ? d : '';
}

const nameWords = (text) => String(text).replace(/[^A-Za-z' -]/g, ' ')
  .replace(/^\s*(hi|hello|yeah|yes|ok|okay|sure)[, ]+/i, '')
  .replace(/^\s*(it'?s|it is|my name is|my name'?s|i'?m|i am|this is|call me|name'?s)\s+/i, '')
  .trim().split(/\s+/).filter(Boolean);
const titleCase = (words) => words.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');

/** "it's Sam Jones" / "my name is sam" → "Sam Jones". */
export function nameFrom(text) {
  return titleCase(nameWords(text).slice(0, 3));
}

/** A believable name (1 to 3 words, no digits), or '' so the desk asks again. */
function validName(text) {
  if (/\d/.test(text) || digitsFrom(text).length >= 5) return '';
  const words = nameWords(text);
  if (!words.length || words.length > 3 || words.some((word) => word.length > 20)) return '';
  if (words.every((word) => /^(yes|yeah|no|ok|okay|um|uh|er|erm|hello|hi|hey|what|sorry|pardon|why|thanks|thank|you|please|sure|bye|cheers)$/i.test(word))) return '';
  return titleCase(words);
}

const escape = (word) => word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const has = (text, words) => words.some((word) => new RegExp(`(^|\\W)${escape(word)}(\\W|$)`, 'i').test(text));
/** Lower-case words only, so "Yes, please!" and "yes please" compare equal. */
const plain = (text) => String(text).toLowerCase().replace(/[’‘]/g, "'").replace(/[^a-z0-9' ]/g, ' ').replace(/\s+/g, ' ').trim();
const wordCount = (text) => (text ? text.split(' ').length : 0);

const AFFIRM = /^(yes|yeah|yep|yup|sure|ok|okay|please|go on|go ahead|that would be great|that'd be great|definitely|absolutely|of course)\b/;
const CLOSINGS = /\b(no thank you|no thanks|nope|nah|no|nothing else|nothing|not really|that's all|that is all|thats all|that's it|that is it|thats it|bye bye|bye|goodbye|good bye|cheers|thanks very much|thank you very much|thanks|thank you|mate|all good|i'm good|im good|i'm all set|ta|take care|see you)\b/g;
const QUESTION = /^(how|what|when|where|do|does|can|are|is|why)\b/;

/** A short "yes" (4 words or fewer), or a request to be called back. Never a question like "please tell me the price". */
function isYes(text) {
  const t = plain(text);
  if (/\bcall (me )?back\b/.test(t)) return true;
  return wordCount(t) <= 4 && AFFIRM.test(t) && !/\b(how|what|when|where|why|price|cost)\b/.test(t);
}
/** Short "no": "no", "no thanks", "not now". */
function isNo(text) {
  const t = plain(text);
  return wordCount(t) <= 4 && /^(no|nope|nah|not now|not really|wrong|incorrect)\b/.test(t);
}
/** The WHOLE utterance is a goodbye ("no thanks, bye"), never "no" inside a longer sentence. */
function isClosing(text) {
  const t = plain(text);
  return Boolean(t) && !t.replace(CLOSINGS, ' ').trim();
}
const isQuestion = (text) => /\?/.test(text) || QUESTION.test(plain(text).replace(/^(sorry|um+|uh+|er+m?|hi|hello|yeah|yes|ok|okay)\b ?/, ''));
const refusesDetail = (text) => isNo(text) || /\b(rather not|prefer not|don'?t want|do not want|not saying|no name|keep it private)\b/i.test(text);

/** Strips links, e-mail addresses, angle brackets and control characters. */
export function safeText(value, max) {
  if (typeof value !== 'string') return '';
  const out = value
    .replace(/\bhttps?:\/\/\S*/gi, ' ')
    .replace(/\bwww\.\S*/gi, ' ')
    .replace(/\S+@\S+/g, ' ')
    .replace(/\b[a-z][a-z0-9-]*(?:\.[a-z0-9-]+)+\/\S*/gi, ' ')
    .replace(/\b[a-z0-9-]+\.(?:com|co\.uk|uk|net|org|io|me|app|info|biz|xyz|link|ly)\b\S*/gi, ' ')
    .replace(/[<>]/g, '')
    .replace(/[\u0000-\u001f\u007f-\u009f]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return out.slice(0, max).trim();
}

/** safeText, but refuses anything that looks like a phone or card number (5+ digits in a row). */
const NUMBERISH = /\d(?:[\s().,-]?\d){4,}/;
const noNumbers = (value, max) => {
  const out = safeText(value, max);
  return NUMBERISH.test(out) ? '' : out;
};
const PRICE = /^(from |about |around )?£\s?\d{1,5}(\.\d{2})?( ?(\+|per|an?|\/)\s?\w+)?$/i;

/** Normalises a config from a link: drops empty parts, keeps strings short and plain. */
export function cleanConfig(input) {
  const raw = input && typeof input === 'object' ? input : {};
  const name = noNumbers(raw.name, 40);
  // A name that was refused means the whole link is suspect: show the example desk instead.
  if (raw.name && !name) return cleanConfig({});
  const services = Array.isArray(raw.services) ? raw.services : [];
  const config = {
    name: name || DEFAULT_CONFIG.name,
    hours: noNumbers(raw.hours, 160) || (name ? '' : DEFAULT_CONFIG.hours),
    services: services
      .map((service) => {
        const price = safeText(service?.price, 40);
        return { name: noNumbers(service?.name, 40), price: PRICE.test(price) ? price : undefined };
      })
      .filter((service) => service.name)
      .slice(0, 20),
    areas: noNumbers(raw.areas, 160) || undefined,
    urgent: (Array.isArray(raw.urgent) ? raw.urgent : []).map((word) => noNumbers(word, 30).toLowerCase()).filter(Boolean).slice(0, 12),
    callback: noNumbers(raw.callback, 80) || 'on the next working day',
  };
  if (!config.services.length && !name) config.services = DEFAULT_CONFIG.services;
  if (!config.urgent.length && !name) config.urgent = DEFAULT_CONFIG.urgent;
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

const NAME_ASK = 'Can I take your name?';
const NUMBER_ASK = 'What’s the best number to call you on?';
/** Words that mean someone may be hurt or at risk: these get the 999 line. Business-urgent words (the owner's list) only get flagged. */
const DANGER = ['in danger', 'injured', 'bleeding', 'unconscious', 'not breathing', 'can’t breathe', "can't breathe", 'on fire', 'a fire', 'house fire', 'smoke coming', 'full of smoke', 'gas leak', 'smell gas', 'smell of gas', 'carbon monoxide', 'collapsed', 'ring 999', 'call 999'];
const DANGER_LINE = 'If anyone is in danger, please ring 999 now. I’ve also marked this as urgent for the owner.';
const URGENT_LINE = 'I’ve marked this as urgent for the owner.';
const ANON = 'Caller (no name given)';
const isDanger = (text) => has(String(text).toLowerCase(), DANGER);
const aOrAn = (name) => (/^[A-Z0-9]{2,}$/.test(name) ? /^[FHLMNRSX]/.test(name) : /^[aeiou]/i.test(name)) ? 'an' : 'a';
/** Lower-case for mid-sentence use, but keep acronyms: "EV charger" → "EV charger", "Deep clean" → "deep clean". */
const shown = (name) => name.split(' ').map((word) => (/^[A-Z0-9]{2,}$/.test(word) ? word : word.toLowerCase())).join(' ');

/**
 * One call. `greet()` starts it; `reply(text)` takes what the caller said and
 * returns what the receptionist says next; `hints()` suggests what to say now;
 * `summary()` is the owner's email.
 * @param {DeskConfig} input
 */
export function createDesk(input) {
  const config = cleanConfig(input);
  /** @type {DeskStage} */
  let stage = 'open';
  let caller = '';
  let named = false;
  let number = '';
  let held = '';
  let numberConfirmed = false;
  let noNumber = false;
  let nameTries = 0;
  let numberTries = 0;
  let corrections = 0;
  let urgent = false;
  /** @type {Service | undefined} */
  let lastService;
  const wants = [];
  const answered = [];
  const note = (list, item) => { if (!list.includes(item)) list.push(item); };

  /** The service sharing the most words with what was said ("boiler repair" beats "boiler service"). */
  const findService = (text) => {
    let best;
    let bestScore = 0;
    for (const service of config.services) {
      const words = service.name.toLowerCase().split(/\s+/).filter((word) => word.length > 2 || /^[a-z0-9]{2}$/i.test(word) && word === word.toUpperCase());
      const score = words.filter((word) => new RegExp(`(^|\\W)${escape(word)}`, 'i').test(text)).length;
      if (score > bestScore) { best = service; bestScore = score; }
    }
    return best;
  };
  const askName = (lead) => {
    if (caller && (number || noNumber)) { stage = 'more'; return `${lead} I’ve added that to your message. Anything else?`; }
    if (caller) { stage = 'number'; return `${lead} ${NUMBER_ASK}`; }
    stage = 'name';
    return `${lead} ${NAME_ASK}`;
  };
  const markUrgent = (text) => { urgent = true; note(wants, `Urgent: ${text.trim()}`); };
  const readBack = () => `Let me read that back: ${formatNumber(held)}. Is that right?`;
  const firstName = () => caller.split(' ')[0];

  function open(text) {
    const t = text.toLowerCase();
    if (isDanger(t) || (config.urgent.length && has(t, config.urgent))) {
      markUrgent(text);
      return askName(`Thanks for telling me. ${isDanger(t) ? DANGER_LINE : URGENT_LINE}`);
    }
    if (isClosing(text)) return finish();
    if (/^(hi|hello|hey|good (evening|morning|afternoon))[\s!.,?]*$/.test(t)) return 'Hello. How can I help?';
    if (has(t, ['take a message', 'leave a message', 'pass a message', 'pass on a message'])) {
      note(wants, 'Left a message');
      return askName('Of course.');
    }
    if (has(t, ['real person', 'human', 'robot', 'automated', 'machine', 'are you real'])) {
      note(answered, 'Said it is an automated receptionist');
      return `No, I’m the automated receptionist for ${config.name}. I can answer common questions or take a message for the team. How can I help?`;
    }
    if (config.areas && /\b(close to|near|nearby|far)\b/.test(t)) {
      note(answered, 'Areas covered');
      return `We cover ${config.areas}. Is there anything else?`;
    }
    if (has(t, ['open', 'opening', 'hours', 'closing', 'what time', 'when are you']) || /\b(you|do you) close\b|\bclose (at|today|tonight|early|on)\b/.test(t)) {
      if (!config.hours) { note(wants, 'Asked about opening hours'); return askName('I don’t have the opening hours to hand, so I won’t guess. The team can let you know.'); }
      note(answered, 'Opening hours');
      return `We’re open ${config.hours}. Is there anything else I can help with?`;
    }
    const service = findService(t);
    if (has(t, ['price', 'prices', 'cost', 'costs', 'how much', 'charge', 'quote', 'pricing'])) {
      // "how much is it?" after a service was mentioned means that service.
      const refersBack = /((\b(is|are|would|will|does|be) (it|that|this)( cost)?|\b(it|that|this) costs?|\bthe (price|cost)|\bhow much)\s*[?.!]*)$/.test(t);
      const asked = service || (refersBack ? lastService : undefined);
      if (asked?.price) {
        note(answered, `${asked.name} price`);
        note(wants, asked.name);
        lastService = asked;
        stage = 'offer';
        return `${asked.name} is ${asked.price}. For an exact price the team will need a few details. Would you like them to call you back?`;
      }
      note(wants, `Price for ${asked ? asked.name : text.trim()}`);
      return askName('I don’t have a price for that, so I won’t guess. The team can call you with a proper quote.');
    }
    if (config.areas && has(t, ['area', 'areas', 'cover', 'come out', 'travel', 'where are you', 'location'])) {
      note(answered, 'Areas covered');
      return `We cover ${config.areas}. Is there anything else?`;
    }
    if (has(t, ['book', 'booking', 'appointment', 'slot', 'available', 'availability', 'come in'])) {
      note(wants, service ? `Book: ${service.name}` : `Booking: ${text.trim()}`);
      return askName('I can’t book the diary myself, but the team will call you to arrange it.');
    }
    if (service) {
      note(answered, `Confirmed ${service.name}`);
      note(wants, service.name);
      lastService = service;
      stage = 'offer';
      return `Yes, we do ${shown(service.name)}. Would you like the team to call you back to arrange it?`;
    }
    note(wants, `Message: ${text.trim()}`);
    return askName('I can’t answer that one myself, but I can take a message for the team.');
  }

  function finish() {
    stage = 'done';
    const thanks = `Thanks for calling${named ? `, ${firstName()}` : ` ${config.name}`}.`;
    if (!caller) return `${thanks} Goodbye.`;
    // Never promise a callback without a number the caller confirmed.
    if (!number) return `${thanks} I couldn’t take a number, so if you need a reply, please ring back when we’re open. Goodbye.`;
    return `${thanks} ${urgent ? 'Your message is marked urgent for the owner.' : `The team will get your message and can call you back ${config.callback}.`} Goodbye.`;
  }

  /** Urgent words at the name, number or confirm question: 999 line first, then the question again. */
  function interruptUrgent(text) {
    markUrgent(text);
    const line = isDanger(text) ? DANGER_LINE : URGENT_LINE;
    const again = stage === 'name' ? NAME_ASK : stage === 'number' ? NUMBER_ASK : readBack();
    return `${line} ${again}`;
  }

  function takeName(text) {
    if (refusesDetail(text)) return anonymous('No problem.');
    if (isClosing(text)) return finish();
    // A number given at the name question ("Sam, 07700 900123", or just the number): keep it, check it, ask the name after.
    const early = ukNumber(digitsFrom(text));
    if (early) {
      const rest = validName(text.replace(/\+?\d[\d\s]*/g, ' ').replace(new RegExp(`\\b(${Object.keys(WORD_DIGITS).join('|')}|double|treble|triple|on|and|my|number|is)\\b`, 'gi'), ' ').replace(/[,.]/g, ' ').trim());
      if (rest) { caller = rest; named = true; }
      held = early;
      stage = 'confirm';
      return readBack();
    }
    const clean = text.replace(/^\s*(sorry|um+|uh+|er+m?|hi|hello|yeah|yes|ok|okay)\b[,.! ]*/i, '');
    const filler = /^(hi|hello|hey|um+|uh+|er+m?|hmm+|pardon|what)[\s?!.,]*$/i.test(text) || /^(that'?s|that is) (right|correct)|^(correct|right|exactly)\b/i.test(text.trim());
    if (isQuestion(text) && !filler) {
      const answer = open(text);
      if (stage !== 'name') return answer;
      const body = answer.replace(/\s*(Is there anything else( I can help with)?|How can I help)\?$/, '');
      return /your name\?$/.test(body) ? body : `${body} ${NAME_ASK}`;
    }
    const name = filler ? '' : validName(clean || text);
    if (!name) {
      nameTries += 1;
      if (nameTries < 2) return `Sorry, I didn’t catch that. ${NAME_ASK}`;
      return anonymous('That’s fine.');
    }
    caller = name;
    named = true;
    if (number || noNumber) { stage = 'more'; return `Thanks, ${firstName()}. Is there anything else?`; }
    stage = 'number';
    return `Thanks, ${firstName()}. ${NUMBER_ASK}`;
  }
  function anonymous(lead) {
    caller = ANON;
    stage = 'number';
    return `${lead} ${NUMBER_ASK}`;
  }

  function leaveWithoutNumber(lead) {
    noNumber = true;
    stage = 'more';
    return `${lead} I’ll pass your message on without a number. Is there anything else?`;
  }
  function takeNumber(text) {
    if (refusesDetail(text)) return leaveWithoutNumber('No problem.');
    const valid = ukNumber(digitsFrom(text));
    if (valid) { held = valid; stage = 'confirm'; return readBack(); }
    numberTries += 1;
    if (numberTries < 2) return 'Sorry, I didn’t get all of that. Could you say the number again, digit by digit?';
    return leaveWithoutNumber('Sorry, I still can’t make that out.');
  }

  function acceptNumber(confirmed) {
    number = formatNumber(held);
    numberConfirmed = confirmed;
    if (!caller) { stage = 'name'; return `Thanks. ${NAME_ASK}`; }
    stage = 'more';
    const next = urgent ? 'I’ve marked this as urgent for the owner.' : `The team will call you back ${config.callback}.`;
    return confirmed
      ? `Thanks. ${next} Is there anything else?`
      : `Thanks, I’ve noted ${number} and the team will check it. ${next} Is there anything else?`;
  }
  /** One more correction. Past two, take what we have and flag it. */
  function correct(next) {
    corrections += 1;
    if (next) held = next;
    if (corrections > 2) return acceptNumber(false);
    stage = 'confirm';
    return readBack();
  }
  function checkNumber(text) {
    const digits = digitsFrom(text);
    if (/\b(end|ends|ending|last|finish|finishes)\b/i.test(text) && digits.length >= 1 && digits.length < held.length - 3) {
      return correct(held.slice(0, -digits.length) + digits);
    }
    const valid = ukNumber(digits);
    if (valid) return valid === held ? acceptNumber(true) : correct(valid);
    if (isYes(text) || /^(that'?s|that is) (right|correct)|^(correct|right|exactly|spot on)\b/.test(plain(text))) return acceptNumber(true);
    if (isNo(text) || digits.length >= 3) {
      corrections += 1;
      if (corrections > 2) return acceptNumber(false);
      stage = 'number';
      numberTries = 0;
      return 'No problem. What’s the right number?';
    }
    return 'Sorry, is that number right? Say yes, or say the right number.';
  }

  /** The 'more' stage: "no, I also need brakes" is a new request, not a goodbye. */
  function more(text) {
    if (isClosing(text)) return finish();
    const rest = text.replace(/^\s*(no|nope|nah)\b[\s,.!-]*(thanks|thank you)?[\s,.!-]*(but|and|also|actually)?[\s,.!-]*/i, '').trim();
    if (rest && rest !== text.trim()) return open(rest);
    if (isYes(text) && text.split(/\s+/).length <= 2) return 'Of course. What else can I help with?';
    return open(text);
  }

  const firstHint = () => (config.hours ? 'Are you open on Saturday?' : config.services[0] ? `Do you do ${shown(config.services[0].name)}?` : 'Can you take a message?');
  const openHints = () => {
    const hints = [firstHint()];
    const priced = config.services.find((service) => service.price);
    if (priced) hints.push(`How much is ${aOrAn(priced.name)} ${shown(priced.name)}?`);
    const word = config.urgent[0];
    if (word) hints.push(/^(broken down|breakdown)$/.test(word) ? 'It’s urgent, I’ve broken down' : `It’s urgent: ${word}`);
    if (hints.length < 2) hints.push(config.services[0] ? `Do you do ${shown(config.services[0].name)}?` : hints[0] === 'Can you take a message?' ? 'Are you open tomorrow?' : 'Can you take a message?');
    return hints.slice(0, 3);
  };

  return {
    config,
    get stage() { return stage; },
    greet() { return `Good evening, ${config.name}. We’re closed right now, but I can answer a question or take a message. How can I help?`; },
    /** @param {string} said */
    reply(said) {
      const text = String(said || '').trim();
      if (stage === 'done') return '';
      if (!text) return 'Sorry, I didn’t catch that. Could you say it again?';
      if (isDanger(text) || (config.urgent.length && has(text, config.urgent))) {
        return stage === 'name' || stage === 'number' || stage === 'confirm' ? interruptUrgent(text) : open(text);
      }
      if (stage === 'name') return takeName(text);
      if (stage === 'number') return takeNumber(text);
      if (stage === 'confirm') return checkNumber(text);
      if (stage === 'offer') {
        if (isNo(text)) { stage = 'more'; return 'No problem. Is there anything else I can help with?'; }
        if (isClosing(text)) return finish();
        if (isYes(text)) return askName('Great.');
        return open(text);
      }
      if (stage === 'more') return more(text);
      return open(text);
    },
    /** Two or three short things the caller could say right now. */
    hints() {
      if (stage === 'name') return ['It’s Sam'];
      if (stage === 'number') return ['07700 900123'];
      if (stage === 'confirm') return ['Yes, that’s right', `No, it ends ${String((Number(held.slice(-3)) + 1) % 1000).padStart(3, '0')}`];
      if (stage === 'offer') return ['Yes please', 'No thanks'];
      if (stage === 'more') return ['No, that’s all', `Do you do ${shown(config.services[0]?.name ?? 'repairs')}?`];
      if (stage === 'done') return [];
      return openHints();
    },
    /** @returns {DeskSummary} */
    summary() {
      const title = urgent ? 'Urgent call' : wants.length ? 'New enquiry' : 'Question answered';
      /** @type {[string, string][]} */
      const rows = [];
      rows.push(['Caller', caller ? `${caller}${number ? ` · ${number}` : ''}` : 'No details left']);
      if (number) rows.push(['Number check', numberConfirmed ? 'Confirmed by caller' : 'Not confirmed: ring to check']);
      if (wants.length) rows.push(['Wants', wants.join('; ')]);
      if (answered.length) rows.push(['Answered', answered.join('; ')]);
      const next = !caller ? (urgent ? 'Urgent: no details left, check caller ID' : 'Nothing to do')
        : !number ? `${urgent ? 'Urgent. ' : ''}No number left: check caller ID`
          : urgent ? 'Urgent: ring back now' : `Call back ${config.callback}`;
      rows.push(['Next step', next]);
      return { title, urgent, rows };
    },
  };
}
