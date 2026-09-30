// Generates the brief 02 illustrations (trade guides + homepage mock screens).
// One script so every drawing shares the same calm style and palette as
// app/refresh.css. Run: node scripts/illustrations.mjs
// Every file: viewBox, role="img", <title>, system fonts only, "ILLUSTRATIVE ONLY",
// no real names/numbers/addresses (first names and yourbusiness.co.uk only).
import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const C = { paper: '#f5f6f3', surface: '#ffffff', ink: '#13293a', accent: '#13405a', muted: '#56666f', line: '#e1e6e8', signal: '#c7ea6e', tint: '#ebf5dc', warn: '#ffe1d6' };
const W = 480;
const H = 320;
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function wrap(text, max) {
  const words = text.split(' ');
  const lines = [];
  let line = '';
  for (const word of words) {
    if ((line + ' ' + word).trim().length > max) { lines.push(line.trim()); line = word; } else line += ' ' + word;
  }
  if (line.trim()) lines.push(line.trim());
  return lines;
}

function text(x, y, s, { size = 13, weight = 400, fill = C.ink, anchor = 'start' } = {}) {
  return `<text x="${x}" y="${y}" font-family="system-ui,sans-serif" font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}">${esc(s)}</text>`;
}

function frame(title, body, caption) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" role="img" aria-labelledby="t"><title id="t">${esc(title)}</title>`
    + `<rect width="${W}" height="${H}" rx="24" fill="${C.paper}"/>${body}`
    + text(24, 36, caption, { size: 14, weight: 700, fill: C.accent })
    + `<text x="${W - 20}" y="${H - 14}" font-family="ui-monospace,monospace" font-size="10" fill="${C.muted}" text-anchor="end">ILLUSTRATIVE ONLY</text></svg>`;
}

/** A phone on the right with a message thread. rows: {kind:'system'|'in'|'out', text, sub?} */
function phone(rows, x = 250) {
  const w = 206;
  let y = 64;
  let out = `<rect x="${x}" y="22" width="${w}" height="${H - 44}" rx="26" fill="${C.surface}" stroke="${C.line}" stroke-width="1.5"/>`
    + `<rect x="${x + w / 2 - 22}" y="30" width="44" height="5" rx="2.5" fill="${C.line}"/>`;
  for (const row of rows) {
    if (row.kind === 'system') {
      out += `<circle cx="${x + 26}" cy="${y + 10}" r="11" fill="${row.tone === 'good' ? C.tint : C.warn}"/>`
        + text(x + 26, y + 14, row.tone === 'good' ? '✓' : '×', { size: 12, weight: 700, anchor: 'middle' })
        + text(x + 44, y + 9, row.text, { size: 12.5, weight: 700 })
        + (row.sub ? text(x + 44, y + 24, row.sub, { size: 11, fill: C.muted }) : '');
      y += 40;
      continue;
    }
    const lines = wrap(row.text, 26);
    const bh = lines.length * 15 + 14;
    const out_ = row.kind === 'out';
    const bw = 168;
    const bx = out_ ? x + w - bw - 12 : x + 12;
    out += `<rect x="${bx}" y="${y}" width="${bw}" height="${bh}" rx="12" fill="${out_ ? C.accent : C.paper}"/>`;
    lines.forEach((l, i) => { out += text(bx + 11, y + 19 + i * 15, l, { size: 11.5, fill: out_ ? '#ffffff' : C.ink }); });
    y += bh + 6;
    if (row.sub) { out += text(out_ ? bx + bw : bx, y + 8, row.sub, { size: 10, fill: C.muted, anchor: out_ ? 'end' : 'start' }); y += 16; }
  }
  return out;
}

/** Left-hand explainer: 2-3 short lines with ticks. */
function notes(lines, y = 76) {
  return lines.map((l, i) => `<circle cx="34" cy="${y + i * 52 - 4}" r="9" fill="${C.signal}"/>` + text(34, y + i * 52, '✓', { size: 11, weight: 700, anchor: 'middle' })
    + wrap(l, 24).map((w, j) => text(52, y + i * 52 + j * 16, w, { size: 13, fill: C.ink })).join('')).join('');
}

/** A card list with status chips. items: {label, status, tone} */
function list(items, x = 24, y = 60, w = W - 48, heading) {
  let out = `<rect x="${x}" y="${y}" width="${w}" height="${items.length * 44 + (heading ? 44 : 16)}" rx="18" fill="${C.surface}" stroke="${C.line}" stroke-width="1.5"/>`;
  let yy = y + 16;
  if (heading) { out += text(x + 18, yy + 14, heading, { size: 13, weight: 700, fill: C.muted }); yy += 30; }
  for (const item of items) {
    out += `<rect x="${x + 12}" y="${yy}" width="${w - 24}" height="36" rx="10" fill="${C.paper}"/>`
      + text(x + 26, yy + 23, item.label, { size: 12.5, weight: 600 })
      + `<rect x="${x + w - 132}" y="${yy + 8}" width="108" height="20" rx="10" fill="${item.tone === 'good' ? C.signal : item.tone === 'warn' ? C.warn : C.tint}"/>`
      + text(x + w - 78, yy + 22, item.status, { size: 11, weight: 700, anchor: 'middle' });
    yy += 44;
  }
  return out;
}

const FILES = {
  'salons/booking-confirmation.svg': frame('A salon appointment booked online and confirmed without a phone call',
    notes(['Booked online at 9:40pm', 'Confirmed straight away', 'No phone call needed']) + phone([
      { kind: 'system', text: 'New booking', sub: 'Cut and finish · Thu 11:00', tone: 'good' },
      { kind: 'out', text: 'Hi Amy, you’re booked in for Thursday at 11:00. See you then!', sub: 'Sent automatically' },
    ]), 'Booking confirmed'),
  'salons/appointment-reminder.svg': frame('A reminder sent the day before a salon appointment',
    notes(['Sent the day before', 'Reply C to change', 'Fewer empty chairs']) + phone([
      { kind: 'out', text: 'Hi Amy, see you tomorrow at 11:00. Reply C if you need to change it.', sub: 'Wed 6:00pm' },
      { kind: 'in', text: 'Perfect, see you then' },
    ]), 'Reminder, the day before'),
  'salons/rebooking-prompt.svg': frame('A past salon client invited to book their next visit',
    notes(['Six weeks since the last visit', 'A friendly nudge', 'Books in one tap']) + phone([
      { kind: 'out', text: 'Hi Amy, it’s been six weeks. Want your next appointment? yourbusiness.co.uk/book', sub: 'Sent automatically' },
      { kind: 'system', text: 'Rebooked', sub: 'Thu 11:00, in 2 weeks', tone: 'good' },
    ]), 'Time for your next visit'),
  'groomers/missed-call.svg': frame('A missed grooming call followed by a text with a booking link',
    notes(['You’re mid-groom', 'The caller gets a text', 'They book instead of ringing round']) + phone([
      { kind: 'system', text: 'Missed call', sub: 'New caller · 2:14pm' },
      { kind: 'out', text: 'Sorry we missed you, we’re with a dog! Book here: yourbusiness.co.uk/book', sub: 'Sent automatically' },
    ]), 'Missed call, texted back'),
  'groomers/next-groom.svg': frame('A reminder that the next groom is due with a booking link',
    notes(['Groom due in a week', 'Owner gets a nudge', 'Slot booked online']) + phone([
      { kind: 'out', text: 'Hi Sam, Bella is due her next groom. Pick a time: yourbusiness.co.uk/book', sub: 'Sent automatically' },
      { kind: 'system', text: 'Booked', sub: 'Bella · Sat 9:30', tone: 'good' },
    ]), 'Next groom due'),
  'garages/mot-reminder.svg': frame('An MOT reminder invites the driver to choose an available slot',
    notes(['MOT due next month', 'Driver picks a slot', 'Booked without a call']) + phone([
      { kind: 'out', text: 'Hi Dan, your MOT is due on 14 Nov. Book a slot: yourbusiness.co.uk/mot', sub: 'Sent automatically' },
      { kind: 'system', text: 'MOT booked', sub: 'Tue 8:30 drop-off', tone: 'good' },
    ]), 'MOT reminder'),
  'garages/quote-follow-up.svg': frame('An unanswered garage quote receives a friendly nudge after three days',
    notes(['Quote sent Monday', 'No reply by Thursday', 'A friendly nudge goes out']) + phone([
      { kind: 'out', text: 'Hi Dan, just checking you got our quote for the brakes. Any questions?', sub: 'Thursday, sent automatically' },
      { kind: 'in', text: 'Yes, go ahead. Can you do Monday?' },
    ]), 'Quote follow-up'),
  'garages/job-list.svg': frame('Garage enquiries arranged by awaiting quote, booked and ready',
    list([
      { label: 'Brakes · Dan', status: 'Quote sent', tone: 'wait' },
      { label: 'MOT · Priya', status: 'Booked Tue', tone: 'good' },
      { label: 'Service · Joe', status: 'Ready', tone: 'good' },
      { label: 'Tyres · Ali', status: 'Needs reply', tone: 'warn' },
    ], 24, 58, W - 48, 'Every job in one list'), 'Jobs at a glance'),
  'cafes/shared-inbox.svg': frame('Café orders and messages gathered into one list',
    list([
      { label: 'Cake order · website', status: 'Replied', tone: 'good' },
      { label: 'Table for 6 · Instagram', status: 'Booked', tone: 'good' },
      { label: 'Allergy question · email', status: 'Needs reply', tone: 'warn' },
      { label: 'Catering · phone', status: 'Called back', tone: 'good' },
    ], 24, 58, W - 48, 'One list, whatever the channel'), 'Orders and messages'),
  'cafes/review-request.svg': frame('A post-visit message links to the café’s Google review page',
    notes(['After the visit', 'A thank-you with a link', 'You’re told about new reviews']) + phone([
      { kind: 'out', text: 'Thanks for coming in today, Leah! Would you leave us a quick Google review?', sub: 'Sent automatically' },
      { kind: 'system', text: 'New Google review', sub: 'You’ve been notified', tone: 'good' },
    ]), 'Review request'),
  'clinics/intake-form.svg': frame('An intake form link sent before the first appointment',
    notes(['Sent after booking', 'Filled in at home', 'Ready before they arrive']) + phone([
      { kind: 'out', text: 'Hi Tom, before your first visit on Friday, please fill in this short form: yourbusiness.co.uk/form', sub: 'Sent automatically' },
      { kind: 'system', text: 'Form completed', sub: '2 days before the visit', tone: 'good' },
    ]), 'Intake form, sent ahead'),
  'clinics/appointment-reminder.svg': frame('A clinic appointment reminder with a route to change the time',
    notes(['Sent the day before', 'Easy to change', 'Fewer missed appointments']) + phone([
      { kind: 'out', text: 'Hi Tom, reminder: physio tomorrow at 3:30pm. Reply C to change it.', sub: 'Thu 6:00pm' },
      { kind: 'in', text: 'C' },
      { kind: 'out', text: 'No problem. Pick a new time: yourbusiness.co.uk/book' },
    ]), 'Appointment reminder'),
  'mock/missed-call.svg': frame('Example screen: a missed call becomes a text with a booking link',
    notes(['Missed call', 'Text sent in seconds', 'Booking made']) + phone([
      { kind: 'system', text: 'Missed call', sub: 'New caller · 2:14pm' },
      { kind: 'out', text: 'Sorry we missed you! Book here: yourbusiness.co.uk/book', sub: 'Delivered' },
      { kind: 'system', text: 'New booking', sub: 'Tue 10:30', tone: 'good' },
    ]), 'Missed call → booking'),
  'mock/enquiry-list.svg': frame('Example screen: enquiries from different places in one list',
    list([
      { label: 'Phone · missed call', status: 'Texted back', tone: 'good' },
      { label: 'Email · quote request', status: 'Replied', tone: 'good' },
      { label: 'Web form · booking', status: 'Needs reply', tone: 'warn' },
      { label: 'Instagram · question', status: 'Replied', tone: 'good' },
    ], 24, 58, W - 48, 'All enquiries'), 'Every enquiry in one list'),
  'mock/weekly-summary.svg': frame('Example screen: a Monday summary email of the week',
    list([
      { label: 'New enquiries', status: '12', tone: 'wait' },
      { label: 'Bookings made', status: '9', tone: 'good' },
      { label: 'Quotes waiting', status: '3', tone: 'warn' },
      { label: 'Money due', status: '2 invoices', tone: 'warn' },
    ], 24, 58, W - 48, 'Monday 8:00 · Your week'), 'Weekly summary (example numbers)'),
};

const root = path.join(process.cwd(), 'public');
for (const [file, svg] of Object.entries(FILES)) {
  const target = path.join(root, file);
  mkdirSync(path.dirname(target), { recursive: true });
  writeFileSync(target, svg);
  console.log(file, svg.length, 'bytes');
}
