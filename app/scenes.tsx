import { SYSTEMS, systemPrice, type System } from './systems';
import { ScenePlayer } from './scene-player';
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


export function Storyboard({ system }: { system: System }) {
  return <div className="s-board" data-pause-offscreen>
    <ol className="s-board-steps">{system.steps.map((step, index) => <li key={step.title} className="s-board-step" style={{ ['--i' as string]: index }}>
      <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true"><path d={ICONS[step.icon]} /></svg>
      <strong>{step.title}</strong><span>{step.detail}</span>
    </li>)}</ol>
    <p className="s-board-result"><strong>{system.result}</strong> <span>{systemPrice(system)}</span></p>
  </div>;
}
export function Scenes({ systems = SYSTEMS.filter(system => !system.packageId && system.id !== 'missed-calls') }: { systems?: System[] }) {
  return <><ScenePlayer tabs={systems.map(system => ({ id: system.id, label: system.name, durationMs: 5000 }))}>
    {systems.map(system => <Storyboard key={system.id} system={system} />)}
  </ScenePlayer><p className="s-small">Illustrations of how it works, not real customers.</p></>;
}
