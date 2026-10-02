/**
 * Niche guides. Every example is a real problem found on a live UK small-business
 * website during manual checks in September 2026, described without naming the
 * business. Keep it that way: no invented findings, no names.
 *
 * These are examples of businesses this applies to, not a limit: the same
 * review and systems work for any UK business customers book, call or enquire with.
 */
import { AUTOMATION_MENU, EXTRAS, OFFERS, WEB_OFFERS } from '../offers';

const offer = (id: string) => {
  const found = OFFERS.find((item) => item.id === id);
  if (!found) throw new Error(`Unknown offer ${id}`);
  return found;
};
const addOn = (name: string, body: string) => {
  const found = EXTRAS.find((item) => item.name === name);
  if (!found) throw new Error(`Unknown add-on ${name}`);
  return { name: `Add-on: ${found.name}`, price: found.price, body, pick: found.name };
};
/** A second job from the automation menu, shown with the Starter price (Offer v11: menu jobs are Starters). */
const menuJob = (name: string, body: string) => {
  const found = AUTOMATION_MENU.find((item) => item.name === name);
  if (!found) throw new Error(`Unknown menu job ${name}`);
  return { name: `Another job: ${found.name}`, price: offer('starter').price, body, pick: offer('starter').name };
};
/** Starter is ONE job (Offer v9). Anything more is a priced add-on or a Business System. */
const starter = (body: string) => ({ name: offer('starter').name, price: offer('starter').price, body, pick: offer('starter').name });
const system = (body: string) => ({ name: offer('business-system').name, price: offer('business-system').price, body, pick: offer('business-system').name });
const website = (body: string) => { const w = WEB_OFFERS.find((item) => item.id === 'website')!; return { name: w.name, price: w.price, body, pick: w.name }; };
const custom = (body: string) => ({ name: offer('custom').name, price: offer('custom').price, body, pick: offer('custom').name });

export type NicheGuide = {
  id: string;
  name: string;
  /** Short label for menus. */
  shortName: string;
  title: string;
  lede: string;
  /** Evidence, what it cost the business, and the system in app/systems.ts that answers it. */
  examples: { found: string; cost: string; system: string }[];
  selfCheck: string[];
  /** `pick` is the exact package or add-on name that pre-fills the free plan form. */
  fixes: { name: string; price: string; body: string; pick: string }[];
  /** Optional illustrations. Must be labelled as illustrative, never passed off as client work. */
  visuals?: { src: string; alt: string; caption: string }[];
  /** Optional related page, e.g. physical models for architects. */
  related?: { href: string; label: string; body: string };
};

export const NICHE_GUIDES: NicheGuide[] = [
  {
    id: 'salons-and-beauty',
    shortName: 'Salons and beauty',
    name: 'Salons and beauty',
    title: 'Keep salon and beauty clients booking without chasing them',
    lede: 'Clients book on their phone, often late at night. If the booking route breaks, they book somewhere else and you never hear about it.',
    examples: [
      { found: 'A salon homepage showing unrelated casino content, a New York address and info@example.com instead of the salon’s own details.', cost: 'Lost customer: people searching for the salon by name found gambling content and no way to book.', system: 'enquiries' },
      { found: 'A skin clinic where every Book a Treatment button opened an old booking page saying the business was no longer available.', cost: 'Lost customer: clients ready to book were told the clinic had closed, so they booked somewhere else.', system: 'booking' },
      { found: 'A salon with thousands of five-star reviews whose phone number could not be tapped on a phone.', cost: 'Lost customer: calls that don’t connect go to the next salon on the list.', system: 'missed-calls' },
      { found: 'A beauty parlour homepage still full of template filler text, including a line reading "Longer intro text about" the salon.', cost: 'Lost customer: new clients comparing salons left before asking about a booking.', system: 'enquiries' },
    ],
    selfCheck: [
      'Open your site on your phone and tap every Book button. Does it reach your live booking page?',
      'Tap your phone number. Does your phone offer to call it?',
      'Google your salon name. Is the title and description yours, spelled right?',
    ],
    fixes: [
      starter('One job set up to run itself: every booking or enquiry lands in one place and gets an instant confirmation.'),
      menuJob('Appointment reminders', 'Clients get a reminder the day before, so fewer no-shows.'),
      system('Rebooking prompts, review requests and no-show follow-ups joined up and sent for you, so repeat visits do not depend on your memory.'),
    ],
  },
  {
    id: 'dog-groomers',
    shortName: 'Dog groomers',
    name: 'Dog groomers',
    title: 'Take dog grooming bookings while your hands are full',
    lede: 'You cannot answer the phone mid-groom. If your website cannot take the booking instead, the call goes to the next groomer on Google.',
    examples: [
      { found: 'A groomer with over a thousand clients and no way to book online, only a form or a phone call. A review mentioned calls going unanswered.', cost: 'Lost customer: owners who could not get through booked with another groomer.', system: 'missed-calls' },
      { found: 'A groomer whose "Book here" button opened a contact page instead of a booking system.', cost: 'Lost customer: clients who wanted to book there and then were handed a form and a wait.', system: 'booking' },
      { found: 'A groomer whose phone number was plain text on every page, and whose footer still said 2017.', cost: 'Lost customer: drivers-by and new owners gave up on calling before they got through.', system: 'missed-calls' },
    ],
    selfCheck: [
      'Can a client book a slot on your site at 10pm without speaking to you?',
      'Do regular clients get a reminder when the next groom is due?',
      'Does your Book button do what it says?',
    ],
    fixes: [
      starter('One job set up to run itself: every booking confirmed automatically, so you can keep grooming.'),
      menuJob('Missed-call text-back', 'Miss a call and the owner gets a text with your booking link, so they don’t ring another groomer.'),
      menuJob('Online booking', 'If you have no booking tool yet. Most booking tools charge a monthly fee, paid to them directly, and I tell you the cost before you commit.'),
    ],
  },
  {
    id: 'garages',
    shortName: 'Garages and MOT',
    name: 'Garages and MOT centres',
    title: 'Turn garage and MOT enquiries into booked jobs',
    lede: 'Most drivers search when something is already wrong. They want a number to tap or an MOT slot to book, fast.',
    examples: [
      { found: 'A garage homepage with template filler text ("Lorem ipsum") sitting right under the words "trusted repairs".', cost: 'Lost customer: drivers comparing garages had less reason to trust this one and ring.', system: 'enquiries' },
      { found: 'A garage trading since 1961 whose phone number could not be tapped anywhere on the site, with no email address either.', cost: 'Lost customer: drivers who could not get through rang the next garage.', system: 'missed-calls' },
      { found: 'A garage whose number at the top of the page was plain text on mobile.', cost: 'Lost time and customers: every awkward call is one more driver who may not bother.', system: 'missed-calls' },
    ],
    selfCheck: [
      'Tap your phone number on your own site, on your phone.',
      'Read your homepage top to bottom. Is any of it template text?',
      'Can a driver request an MOT without phoning?',
    ],
    fixes: [
      starter('One job set up to run itself: every quote or MOT request logged in one list with an instant reply.'),
      menuJob('Quote follow-up', 'A friendly reminder goes out if the customer goes quiet after a quote.'),
      website('A new site with online booking and job updates built in, when your current one can’t do it.'),
    ],
  },
  {
    id: 'cafes-and-food',
    shortName: 'Cafés and food',
    name: 'Cafes, bakeries and food',
    title: 'Get cafe, bakery and food customers through the door',
    lede: 'People check your hours, menu and number on their phone before they visit. Small errors quietly send them elsewhere.',
    examples: [
      { found: 'A bakery contact page listing "Email@example.com", a US-style phone number and placeholder Latin reviews signed with a made-up name.', cost: 'Lost customer: people trying to order or ask a question had no way to reach the business.', system: 'enquiries' },
      { found: 'An ice cream parlour with hundreds of Google reviews whose website showed a security warning on every phone.', cost: 'Lost customer: visitors warned away before they saw the menu or opening times.', system: 'reviews' },
      { found: 'A dessert shop whose Google title misspelled its own name.', cost: 'Lost customer: searchers comparing places passed over a listing that looked careless.', system: 'reviews' },
      { found: 'A countryside venue whose mobile call button dialled the wrong number.', cost: 'Lost customer: every customer who tapped to call reached someone else.', system: 'missed-calls' },
    ],
    selfCheck: [
      'Open your contact page on your phone. Is every detail real and current?',
      'Does your site open without a security warning?',
      'Tap your call button. Does it ring you?',
    ],
    fixes: [
      starter('One job set up to run itself: orders, bookings and messages gathered in one place with an automatic reply.'),
      menuJob('Review requests', 'Customers are asked for a Google review after each visit.'),
      website('A phone-first site with menu, hours, ordering or table booking built in, when your current one can’t do it.'),
    ],
  },
  {
    id: 'clinics-and-therapists',
    shortName: 'Clinics and therapists',
    name: 'Clinics and therapists',
    title: 'Help clinic and therapy clients book with confidence',
    lede: 'Patients are often nervous before they book. A dead link or a missing number at the wrong moment is enough to stop them.',
    examples: [
      { found: 'An aesthetics clinic whose "Skin Consultation" menu link opened a page-not-found error.', cost: 'Lost customer: patients ready to book a consultation hit a dead end.', system: 'booking' },
      { found: 'An opticians whose footer phone link was empty on every page.', cost: 'Lost customer: patients who tapped to call got nothing and moved on.', system: 'missed-calls' },
      { found: 'A clinic whose "Complaints and refunds" link opened a page-not-found error.', cost: 'Lost customer: cautious patients checking before they book found the page missing.', system: 'enquiries' },
      { found: 'A chiropractic clinic whose number could not be tapped and which had no email on the site.', cost: 'Lost time: every enquiry had to be a phone call, taken between appointments.', system: 'enquiries' },
    ],
    selfCheck: [
      'Click every link in your menu and footer. Do any show an error?',
      'Tap your phone number and email on your phone.',
      'Can a new patient see how to book in under 10 seconds?',
    ],
    fixes: [
      starter('One job set up to run itself: new enquiries acknowledged straight away with the next step.'),
      menuJob('Appointment reminders', 'Patients and clients get a reminder the day before, so fewer appointments are missed.'),
    ],
  },
  {
    id: 'architects',
    shortName: 'Architects',
    name: 'Architects and architecture practices',
    title: 'Turn portfolio interest into qualified architecture projects',
    lede: 'A strong portfolio gets attention, but the next step still matters. If a potential client has to hunt for contact details or start from a blank email, every enquiry begins with extra back-and-forth.',
    examples: [
      { found: 'A small architecture practice had a dedicated contact page that showed only an address, phone number and email, with no project enquiry form.', cost: 'Lost time: every project started with rounds of emails to get type, location, budget and timescale.', system: 'enquiries' },
      { found: 'A rural architecture studio offered a complimentary site visit and consultation, but asked people to arrange it by phone or email; the only form on the page was for the newsletter.', cost: 'Lost customer: people ready for the free consultation had to chase a time by phone or email.', system: 'booking' },
      { found: 'A residential architecture site had Home, Projects and About in the main menu, while its “contact us about your project” details appeared near the bottom of the homepage.', cost: 'Lost customer: visitors browsing the portfolio had no clear next step to start a project.', system: 'enquiries' },
      { found: 'A small independent practice said it was taking new commissions selectively, but its public contact route was a general email address or Instagram.', cost: 'Lost time: every new client started from a blank message that needed follow-up questions.', system: 'quotes' },
    ],
    selfCheck: [
      'Open one of your project pages on your phone. Can a client start an enquiry without hunting for contact details?',
      'Does your first enquiry capture the basics you need: project type, location, rough budget and timescale?',
      'If someone asks for a consultation, do they get an acknowledgement and clear next step without you typing it by hand?',
    ],
    fixes: [
      starter('One job set up to run itself: a project enquiry captured in one place, acknowledged automatically and passed to you with the key details already collected.'),
      system('Enquiry, qualification, consultation, proposal and follow-up joined up so new-project admin does not start from scratch every time.'),
      website('A portfolio or practice site with project pages, enquiry flow or a client-facing tool built around how your practice actually works.'),
    ],
    visuals: [
      { src: '/architecture/massing-model.svg', alt: 'Illustrative axonometric of a simple 1:500 massing model on a site base, with a QR plaque that opens the project page', caption: 'A simple massing model with a QR or tap plaque that opens the project page.' },
      { src: '/architecture/site-plan.svg', alt: 'Illustrative site plan with a proposed dwelling, garage, trees, access road, north arrow and scale bar', caption: 'A clean site plan for a proposal or project page.' },
    ],
    related: {
      href: '/3d-printing#architecture-property',
      label: 'See models and drawings',
      body: 'Simple printed concept and massing models, plus clear presentation drawings, linked to your project page.',
    },
  },
];

export function getNicheGuide(id: string) {
  return NICHE_GUIDES.find((guide) => guide.id === id);
}
