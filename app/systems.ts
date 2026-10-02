import { ALL_OFFERS, EXTRAS, OFFERS, type Offer } from './offers';
export type SystemStep = { icon: 'phone' | 'inbox' | 'list' | 'calendar' | 'message' | 'check' | 'star' | 'doc' | 'clock'; title: string; detail: string };
export type System = { id: string; name: string; headache: string; steps: SystemStep[]; result: string; offerName: string; trades: string[]; packageId?: Offer['id'] };
const BOARDS = {
  enquiries: {
    label: 'Enquiries',
    offerName: 'Starter Automation',
    steps: [
      { icon: 'inbox', title: 'Enquiries arrive everywhere', detail: 'Phone, email, web form, Instagram.' },
      { icon: 'list', title: 'One list, one instant reply', detail: 'Each gets an instant reply.' },
      { icon: 'check', title: 'You answer from one place', detail: 'No more checking each app.' },
    ],
    result: 'Nothing slips through on a busy Saturday.',
  },
  reminders: {
    label: 'Reminders',
    offerName: 'Starter Automation',
    steps: [
      { icon: 'calendar', title: 'A booking is made', detail: 'In the app you already use.' },
      { icon: 'message', title: 'A reminder the day before', detail: '“Your appointment is tomorrow.”' },
      { icon: 'check', title: 'You see the reminder sent', detail: 'No manual message to send.' },
    ],
    result: 'Fewer no-shows, no texting at night.',
  },
  reviews: {
    label: 'Reviews',
    offerName: 'Starter Automation',
    steps: [
      { icon: 'check', title: 'The job is done', detail: 'Marked finished as normal.' },
      { icon: 'message', title: 'A thank-you with a link', detail: 'Opens your Google review page.' },
      { icon: 'star', title: 'A new review arrives', detail: 'You’re told so you can reply.' },
    ],
    result: 'More reviews, without asking face to face.',
  },
  quotes: {
    label: 'Quotes',
    offerName: 'Starter Automation',
    steps: [
      { icon: 'doc', title: 'You send a quote', detail: 'The way you do now.' },
      { icon: 'clock', title: 'No reply after 3 days', detail: 'A friendly nudge goes out.' },
      { icon: 'check', title: 'They say yes', detail: 'Or tell you why not.' },
    ],
    result: 'Quotes don’t go cold because you were busy.',
  },
  booking: {
    label: 'Online booking', offerName: 'Starter Automation',
    steps: [
      { icon: 'clock', title: 'It’s ten at night', detail: 'Your customer has a moment.' },
      { icon: 'calendar', title: 'They choose a slot', detail: 'From your available appointments.' },
      { icon: 'check', title: 'The booking is confirmed', detail: 'No phone call needed.' },
    ],
    result: 'Bookings while you’re off the clock.',
  },
  rebooking: {
    label: 'Rebooking', offerName: 'Starter Automation',
    steps: [
      { icon: 'calendar', title: 'Their next visit is due', detail: 'Based on their last appointment.' },
      { icon: 'message', title: 'A helpful nudge arrives', detail: 'With your booking link.' },
      { icon: 'check', title: 'They pick their next visit', detail: 'Without you chasing them.' },
    ],
    result: 'Keep in touch between visits.',
  },
  weekly: {
    label: 'Weekly report', offerName: 'Weekly report',
    steps: [
      { icon: 'inbox', title: 'Monday’s email is here', detail: 'Enquiries and bookings together.' },
      { icon: 'doc', title: 'See what needs attention', detail: 'Quotes waiting. Money due.' },
      { icon: 'check', title: 'Choose what to do first', detail: 'No spreadsheet round-up.' },
    ],
    result: 'Start the week knowing what’s waiting.',
  },
  'keyword-dm': {
    label: 'Comment to get it', offerName: 'Creator Starter',
    steps: [
      { icon: 'message', title: 'Someone comments “PLAN”', detail: 'On your post, at any hour.' },
      { icon: 'doc', title: 'Your free resource lands in their DMs', detail: 'Sent for you, straight away.' },
      { icon: 'inbox', title: 'They join your email list', detail: 'In your name, with a welcome email.' },
      { icon: 'check', title: 'You see who’s warm', detail: 'Ready for your next offer.' },
    ],
    result: 'Followers become a list you own.',
  },
};

const trades = ['salons-and-beauty', 'dog-groomers', 'garages', 'cafes-and-food', 'clinics-and-therapists', 'architects', 'other'];
const headaches: Record<string, string> = { enquiries: 'Slow replies and copying details between apps', reminders: 'No-shows', reviews: 'Few reviews', quotes: 'Chasing quotes', booking: 'Booking calls interrupt your work', rebooking: 'Customers forget to return', weekly: 'Admin at night', 'keyword-dm': 'Followers but no list' };
export const SYSTEMS: System[] = [
  { id: 'missed-calls', name: 'Missed calls', headache: 'Missed calls', offerName: 'Starter Automation', trades, steps: [
    {icon:'phone',title:'A call goes unanswered',detail:'You are with a customer.'},
    {icon:'message',title:'A text goes out',detail:'With your booking link.'},
    {icon:'calendar',title:'They choose a time',detail:'You see the booking in your diary.'}
  ], result:'Give callers a way to book while you work.' },
  ...Object.entries(BOARDS).map(([id, board]) => ({ id, name: board.label, headache: headaches[id], steps: board.steps as SystemStep[], result: board.result, offerName: board.offerName, trades })),
  ...OFFERS.map(offer => ({ id: offer.id, packageId: offer.id, name: offer.name, headache: offer.body, offerName: offer.name, trades,
    steps: [
      {icon:'inbox' as const,title:offer.id === 'starter' ? 'One task takes your time' : offer.id === 'business-system' ? 'A customer gets in touch' : 'Your team needs a tool',detail:offer.id === 'starter' ? 'For example, an enquiry arrives.' : 'Start with the way you work today.'},
      {icon:'list' as const,title:offer.id === 'starter' ? 'That job runs on its own' : offer.id === 'business-system' ? 'Details move between your tools' : 'Your system handles the task',detail:offer.id === 'starter' ? 'An instant reply and a saved record.' : 'Built around your agreed process.'},
      {icon:'doc' as const,title:'You see what needs you',detail:offer.id === 'starter' ? 'One list to answer from.' : 'Customer details and the next action together.'},
      {icon:'check' as const,title:'You carry on with the work',detail:'Less copying and chasing.'}
    ], result:offer.id === 'starter' ? 'One task off your plate.' : offer.id === 'business-system' ? 'A joined-up customer journey.' : 'A tool built to fit your business.' }))
];
export function systemPrice(system: System): string {
  const offer = [...ALL_OFFERS, ...EXTRAS].find(item => item.name === system.offerName);
  if (!offer) throw new Error(`Unknown system offer: ${system.offerName}`);
  return `${offer.name}, ${offer.price}${system.id === 'weekly' ? ' · included with Business System' : ''}`;
}
export function systemsForTrade(trade: string): System[] {
  const ids = trade === 'garages' || trade === 'architects' ? ['enquiries', 'quotes', 'weekly'] : trade === 'cafes-and-food' ? ['enquiries','reviews','booking'] : ['missed-calls','reminders','rebooking'];
  return ids.map(id => SYSTEMS.find(system => system.id === id)!);
}
export function getSystem(id: string): System {
  const system = SYSTEMS.find(item => item.id === id);
  if (!system) throw new Error(`Unknown system: ${id}`);
  return system;
}

/** The "Build my system" headaches, each answered by one system above. */
export const HEADACHE_PICKS: { id: string; label: string; system: string }[] = [
  { id: 'missed-calls', label: 'Missed calls', system: 'missed-calls' },
  { id: 'slow-replies', label: 'Slow replies', system: 'enquiries' },
  { id: 'no-shows', label: 'No-shows', system: 'reminders' },
  { id: 'chasing-quotes', label: 'Chasing quotes', system: 'quotes' },
  { id: 'few-reviews', label: 'Few reviews', system: 'reviews' },
  { id: 'copying', label: 'Copying between apps', system: 'business-system' },
  { id: 'admin-at-night', label: 'Admin at night', system: 'booking' },
];
