/**
 * Niche guides. Every example is a real problem found on a live UK small-business
 * website during manual checks in September 2026, described without naming the
 * business. Keep it that way: no invented findings, no names.
 */
export type NicheGuide = {
  id: string;
  name: string;
  title: string;
  lede: string;
  examples: { found: string; cost: string }[];
  selfCheck: string[];
  fixes: { name: string; price: string; body: string }[];
};

export const NICHE_GUIDES: NicheGuide[] = [
  {
    id: 'salons-and-beauty',
    name: 'Salons and beauty',
    title: 'Website leaks on salon and beauty websites',
    lede: 'Clients book on their phone, often late at night. If the booking route breaks, they book somewhere else and you never hear about it.',
    examples: [
      { found: 'A salon homepage showing casino adverts, a New York address and info@example.com. It looked hacked.', cost: 'Anyone searching for the salon saw gambling content under its name.' },
      { found: 'A skin clinic where every Book a Treatment button opened an old booking page saying the business was no longer available.', cost: 'Clients ready to book were told the clinic had closed.' },
      { found: 'A salon with thousands of five-star reviews whose phone number could not be tapped on a phone.', cost: 'Clients had to copy the number out by hand to call.' },
      { found: 'A beauty parlour homepage still full of template filler text, including a line reading "Longer intro text about" the salon.', cost: 'The first thing new clients read looked unfinished.' },
    ],
    selfCheck: [
      'Open your site on your phone and tap every Book button. Does it reach your live booking page?',
      'Tap your phone number. Does your phone offer to call it?',
      'Google your salon name. Is the title and description yours, spelled right?',
    ],
    fixes: [
      { name: 'Quick Win', price: '£150 fixed', body: 'Book buttons pointed at your real booking page, tap-to-call and your Google details fixed.' },
      { name: 'Growth System', price: 'From £795', body: 'Online booking plus rebooking reminders and review requests after each visit.' },
    ],
  },
  {
    id: 'dog-groomers',
    name: 'Dog groomers',
    title: 'Website leaks on dog grooming websites',
    lede: 'You cannot answer the phone mid-groom. If your website cannot take the booking instead, the call goes to the next groomer on Google.',
    examples: [
      { found: 'A groomer with over a thousand clients and no way to book online, only a form or a phone call. A review mentioned calls going unanswered.', cost: 'Owners who could not get through booked elsewhere.' },
      { found: 'A groomer whose "Book here" button opened a contact page instead of a booking system.', cost: 'Clients expected to book and got a form instead.' },
      { found: 'A groomer whose phone number was plain text on every page, and whose footer still said 2017.', cost: 'Harder to call, and the site looked neglected.' },
    ],
    selfCheck: [
      'Can a client book a slot on your site at 10pm without speaking to you?',
      'Do regular clients get a reminder when the next groom is due?',
      'Does your Book button do what it says?',
    ],
    fixes: [
      { name: 'Quick Win', price: '£150 fixed', body: 'A working Book button linked to a free booking tool, plus tap-to-call.' },
      { name: 'Growth System', price: 'From £795', body: 'Online booking plus "time for the next groom" reminders so regulars rebook themselves.' },
    ],
  },
  {
    id: 'garages',
    name: 'Garages and MOT centres',
    title: 'Website leaks on garage and MOT websites',
    lede: 'Most drivers search when something is already wrong. They want a number to tap or an MOT slot to book, fast.',
    examples: [
      { found: 'A garage homepage with template filler text ("Lorem ipsum") sitting right under the words "trusted repairs".', cost: 'It undercut the trust line directly above it.' },
      { found: 'A garage trading since 1961 whose phone number could not be tapped anywhere on the site, with no email address either.', cost: 'Drivers on their phone had one awkward way to get in touch.' },
      { found: 'A garage whose number at the top of the page was plain text on mobile.', cost: 'Drivers had to copy the number out by hand to call.' },
    ],
    selfCheck: [
      'Tap your phone number on your own site, on your phone.',
      'Read your homepage top to bottom. Is any of it template text?',
      'Can a driver request an MOT without phoning?',
    ],
    fixes: [
      { name: 'Quick Win', price: '£150 fixed', body: 'Tap-to-call everywhere, leftover template text replaced and a simple MOT request form.' },
      { name: 'Full Rebuild', price: 'From £1,000', body: 'An old site rebuilt properly, with online booking requests and your content moved across.' },
    ],
  },
  {
    id: 'cafes-and-food',
    name: 'Cafes, bakeries and food',
    title: 'Website leaks on cafe, bakery and food websites',
    lede: 'People check your hours, menu and number on their phone before they visit. Small errors quietly send them elsewhere.',
    examples: [
      { found: 'A bakery contact page listing "Email@example.com", a US-style phone number and placeholder Latin reviews signed with a made-up name.', cost: 'Customers could not reach the business from its own contact page.' },
      { found: 'An ice cream parlour with hundreds of Google reviews whose website showed a security warning on every phone.', cost: 'Visitors were told the site was not safe to open.' },
      { found: 'A dessert shop whose Google title misspelled its own name.', cost: 'The first thing searchers saw looked careless.' },
      { found: 'A countryside venue whose mobile call button dialled the wrong number.', cost: 'Every customer who tapped it reached someone else.' },
    ],
    selfCheck: [
      'Open your contact page on your phone. Is every detail real and current?',
      'Does your site open without a security warning?',
      'Tap your call button. Does it ring you?',
    ],
    fixes: [
      { name: 'Quick Win', price: '£150 fixed', body: 'Security, contact details, call button or Google title fixed, whichever is costing you most.' },
      { name: 'Website Launch', price: 'From £495', body: 'A clean phone-first site with menu, hours, tap-to-call and a reviews link.' },
    ],
  },
  {
    id: 'clinics-and-therapists',
    name: 'Clinics and therapists',
    title: 'Website leaks on clinic and therapist websites',
    lede: 'Patients are often nervous before they book. A dead link or a missing number at the wrong moment is enough to stop them.',
    examples: [
      { found: 'An aesthetics clinic whose "Skin Consultation" menu link opened a page-not-found error.', cost: 'Patients ready to book hit a dead end.' },
      { found: 'An opticians whose footer phone link was empty on every page.', cost: 'Tapping it did nothing.' },
      { found: 'A clinic whose "Complaints and refunds" link opened a page-not-found error.', cost: 'The one page a cautious patient checks was missing.' },
      { found: 'A chiropractic clinic whose number could not be tapped and which had no email on the site.', cost: 'Phone was the only route, and it was awkward on mobile.' },
    ],
    selfCheck: [
      'Click every link in your menu and footer. Do any show an error?',
      'Tap your phone number and email on your phone.',
      'Can a new patient see how to book in under 10 seconds?',
    ],
    fixes: [
      { name: 'Quick Win', price: '£150 fixed', body: 'Broken links and pages fixed, tap-to-call and a clear booking route.' },
      { name: 'Growth System', price: 'From £795', body: 'Booking plus appointment reminders and review requests after treatment.' },
    ],
  },
];

export function getNicheGuide(id: string) {
  return NICHE_GUIDES.find((guide) => guide.id === id);
}
