import { EXTRAS, OFFERS } from './offers';
import { HeroDemo } from './hero-demo';
import { ScenePlayer } from './scene-player';

/**
 * Short animated explainers: how each system slots into a normal working day.
 * Each is a three-step storyboard plus the result, drawn and animated in CSS
 * (see .s-board in refresh.css). They are illustrations of how the systems
 * work, labelled once below the player, never presented as client results.
 * Prices come from offers.ts.
 */
const ICONS = {
  phone: 'M8 4h3l1.5 4-2 1.5a10 10 0 0 0 4 4l1.5-2 4 1.5v3a2 2 0 0 1-2 2A15 15 0 0 1 6 6a2 2 0 0 1 2-2Z',
  inbox: 'M4 13l2.5-7h11L20 13v6H4ZM4 13h5l1 2h4l1-2h5',
  list: 'M8 7h12M8 12h12M8 17h12M4 7h.01M4 12h.01M4 17h.01',
  calendar: 'M5 7h14v12H5ZM5 11h14M9 4v5M15 4v5',
  message: 'M5 5h14v10H10l-4 4v-4H5Z',
  check: 'M5 12.5l4.5 4.5L19 7',
  star: 'M12 4l2.4 5 5.3.6-4 3.6 1.2 5.3L12 15.8 7.1 18.5l1.2-5.3-4-3.6 5.3-.6Z',
  doc: 'M7 4h7l4 4v12H7ZM14 4v4h4M10 13h5M10 16h5',
  clock: 'M12 5a7 7 0 1 0 0 14 7 7 0 0 0 0-14ZM12 8v4l3 2',
} as const;

type Step = { icon: keyof typeof ICONS; title: string; detail: string };
type Board = { steps: [Step, Step, Step]; result: string };

const price = (name: string) => {
  const found = [...EXTRAS, ...OFFERS].find((item) => item.name === name);
  if (!found) throw new Error(`Unknown package or add-on in scenes: ${name}`);
  return `${found.name}, ${found.price}`;
};

const BOARDS: Record<string, Board & { label: string; plan: string }> = {
  enquiries: {
    label: 'Enquiries',
    plan: price('Starter Automation'),
    steps: [
      { icon: 'inbox', title: 'Enquiries arrive everywhere', detail: 'Phone, email, web form, Instagram.' },
      { icon: 'list', title: 'They land in one list', detail: 'Each gets an instant reply.' },
      { icon: 'check', title: 'You answer from one place', detail: 'No more checking five apps.' },
    ],
    result: 'Nothing slips through on a busy Saturday.',
  },
  reminders: {
    label: 'Reminders',
    plan: price('Appointment reminders'),
    steps: [
      { icon: 'calendar', title: 'A booking is made', detail: 'In the app you already use.' },
      { icon: 'message', title: 'A reminder the day before', detail: '“See you at 10:30. Reply C to change.”' },
      { icon: 'check', title: 'They turn up, or move it', detail: 'The slot isn’t wasted.' },
    ],
    result: 'Fewer no-shows, no texting at night.',
  },
  reviews: {
    label: 'Reviews',
    plan: price('Review requests'),
    steps: [
      { icon: 'check', title: 'The job is done', detail: 'Marked finished as normal.' },
      { icon: 'message', title: 'A thank-you asks for a review', detail: 'With a link to your Google page.' },
      { icon: 'star', title: 'A new review arrives', detail: 'You’re told so you can reply.' },
    ],
    result: 'More reviews, without asking face to face.',
  },
  quotes: {
    label: 'Quotes',
    plan: price('Quote follow-up'),
    steps: [
      { icon: 'doc', title: 'You send a quote', detail: 'The way you do now.' },
      { icon: 'clock', title: 'No reply after 3 days', detail: 'A friendly nudge goes out.' },
      { icon: 'check', title: 'They say yes', detail: 'Or tell you why not.' },
    ],
    result: 'Quotes don’t go cold because you were busy.',
  },
};

function Storyboard({ board }: { board: Board & { plan: string } }) {
  return (
    <div className="s-board">
      <ol className="s-board-steps">
        {board.steps.map((step, index) => (
          <li key={step.title} className="s-board-step" style={{ ['--i' as string]: index }}>
            <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true" focusable="false"><path d={ICONS[step.icon]} /></svg>
            <strong>{step.title}</strong>
            <span>{step.detail}</span>
          </li>
        ))}
      </ol>
      <p className="s-board-result"><strong>{board.result}</strong> <span>{board.plan}</span></p>
    </div>
  );
}

function MissedCallScene() {
  return (
    <div className="s-board s-board-phone">
      <HeroDemo />
      <div className="s-board-side">
        <p><strong>You’re with a customer and the phone rings.</strong></p>
        <p>Instead of trying the next business on Google, the caller gets a text with your booking link within seconds.</p>
        <p className="s-board-result"><strong>They book with you, not the next business.</strong></p>
      </div>
    </div>
  );
}

const TABS = [
  { id: 'missed-calls', label: 'Missed calls', durationMs: 9000 },
  ...Object.entries(BOARDS).map(([id, board]) => ({ id, label: board.label, durationMs: 7000 })),
];

export function Scenes() {
  return (
    <>
      <ScenePlayer tabs={TABS}>
        {[<MissedCallScene key="missed-calls" />, ...Object.entries(BOARDS).map(([id, board]) => <Storyboard key={id} board={board} />)]}
      </ScenePlayer>
      <p className="s-small">Illustrations of how each system works, not real customers.</p>
    </>
  );
}
