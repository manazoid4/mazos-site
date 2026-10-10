'use client';

import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react';
import { AFTER_HOURS } from '../offers';
import { MAIN_CTA } from '../site';
import { DEFAULT_CONFIG, cleanConfig, createDesk, decodeConfig, spoken } from './engine.mjs';
import { TryYours, focusTryYours } from './try-yours';

type Line = { who: 'desk' | 'caller'; text: string };
type Phase = 'ready' | 'ringing' | 'speaking' | 'listening' | 'thinking' | 'waiting' | 'ended';
type Desk = ReturnType<typeof createDesk>;
type Summary = ReturnType<Desk['summary']>;
type Source = 'default' | 'link' | 'typed';

/* The browser's own speech tools. Not in TypeScript's DOM types yet. */
type Recogniser = {
  lang: string; interimResults: boolean; continuous: boolean; maxAlternatives: number;
  onresult: ((event: { resultIndex: number; results: ArrayLike<ArrayLike<{ transcript: string }> & { isFinal: boolean }> }) => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  onend: (() => void) | null;
  onaudiostart: (() => void) | null;
  start(): void; stop(): void; abort(): void;
};
const recogniserClass = (): (new () => Recogniser) | null => {
  if (typeof window === 'undefined') return null;
  const w = window as unknown as { SpeechRecognition?: new () => Recogniser; webkitSpeechRecognition?: new () => Recogniser };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
};


/** The picture inside the presence core. Colour, icon and the status line carry the state when motion is off. */
function CoreIcon({ phase }: { phase: Phase }) {
  const paths: Record<string, string> = {
    speaking: 'M4 9v6h4l5 4V5L8 9H4zM16 8.5a5 5 0 0 1 0 7M18.6 6a8.5 8.5 0 0 1 0 12',
    listening: 'M12 3a3 3 0 0 1 3 3v6a3 3 0 0 1-6 0V6a3 3 0 0 1 3-3zM5 11a7 7 0 0 0 14 0M12 18v3',
    thinking: 'M6 12h.01M12 12h.01M18 12h.01',
    ended: 'M5 12.5l4.5 4.5L19 7.5',
  };
  paths.waiting = paths.listening;
  return (
    <svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d={paths[phase] ?? 'M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z'} />
    </svg>
  );
}

const clock = (seconds: number) => `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;

/**
 * A pretend after-hours call you can have out loud, in the browser.
 * Speech in and out uses the browser's built-in tools (free, no account).
 * Answers come from engine.mjs: only the business details in the link.
 * Without a microphone, or in browsers without speech, you type or tap a suggestion instead.
 */
export function VoiceDesk() {
  const [config, setConfig] = useState(cleanConfig(DEFAULT_CONFIG));
  const [source, setSource] = useState<Source>('default');
  const [seconds, setSeconds] = useState(0);
  const [madeAt, setMadeAt] = useState('');
  const [lines, setLines] = useState<Line[]>([]);
  const [phase, setPhase] = useState<Phase>('ready');
  const [interim, setInterim] = useState('');
  const [summary, setSummary] = useState<Summary | null>(null);
  const [speech, setSpeech] = useState({ talk: false, listen: false });
  const [voiceOn, setVoiceOn] = useState(true);
  const [note, setNote] = useState('');
  const [nudge, setNudge] = useState('');
  const [hints, setHints] = useState<string[]>([]);
  const desk = useRef<Desk | null>(null);
  const rec = useRef<Recogniser | null>(null);
  const live = useRef(false);
  const voiceRef = useRef(true);
  const voice = useRef<SpeechSynthesisVoice | null>(null);
  /** Counts utterances. A callback only carries on if its number is still the current one. */
  const turn = useRef(0);
  const timers = useRef<number[]>([]);
  const typed = useRef<HTMLInputElement>(null);
  const log = useRef<HTMLOListElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const presence = useRef<HTMLDivElement>(null);
  const start = useRef<HTMLButtonElement>(null);
  const decay = useRef(0);
  const boundarySeen = useRef(false);
  const focusStart = useRef(false);
  const startedAt = useRef(0);
  const mic = useRef<HTMLButtonElement>(null);
  const starter = useMemo(() => createDesk(config).hints(), [config]);

  useEffect(() => {
    const code = new URLSearchParams(window.location.hash.slice(1)).get('c');
    const fromLink = code ? decodeConfig(code) : null;
    if (fromLink) { setConfig(fromLink); setSource('link'); }
    setSpeech({ talk: 'speechSynthesis' in window, listen: Boolean(recogniserClass()) });
    if (!('speechSynthesis' in window)) return undefined;
    // Voices often load after the page does, so look again when the list changes.
    const synth = window.speechSynthesis;
    const pick = () => {
      const voices = synth.getVoices();
      voice.current = voices.find((v) => v.lang.replace('_', '-') === 'en-GB') ?? voices.find((v) => /^en[-_]GB/i.test(v.lang)) ?? null;
    };
    pick();
    synth.addEventListener('voiceschanged', pick);
    return () => { synth.removeEventListener('voiceschanged', pick); live.current = false; window.clearTimeout(decay.current); stopListening(); stopSpeech(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep the newest line in view inside the transcript box only: never scroll the page (it jumped on load and stole the keyboard start point).
  useEffect(() => { const el = log.current; if (el && lines.length) el.scrollTop = el.scrollHeight; }, [lines, interim]);
  // The Start button leaves when a call begins and the summary arrives when it ends: move focus on so keyboard users aren't dropped.
  const idle = phase === 'ready' || phase === 'ended';
  useEffect(() => { if (!idle) (mic.current ?? typed.current)?.focus(); }, [idle]);
  useEffect(() => { if (summary) card.current?.querySelector<HTMLElement>('.vd-summary')?.focus(); }, [summary]);
  // Call timer: counts up while live, then keeps the final length.
  useEffect(() => {
    if (idle) return undefined;
    startedAt.current = Date.now();
    setSeconds(0);
    const id = window.setInterval(() => setSeconds(Math.floor((Date.now() - startedAt.current) / 1000)), 1000);
    return () => { window.clearInterval(id); setSeconds(Math.floor((Date.now() - startedAt.current) / 1000)); };
  }, [idle]);
  // After "Make my demo", the cursor goes to Start.
  useEffect(() => { if (focusStart.current && phase === 'ready') { focusStart.current = false; start.current?.focus(); } }, [config, phase]);
  // The pulse fallback only belongs to the receptionist speaking.
  useEffect(() => { if (phase !== 'speaking') presence.current?.removeAttribute('data-pulse'); }, [phase]);

  /** Moves the presence core. Written straight to the element (never React state), because it changes on every spoken word. */
  const bump = () => {
    const el = presence.current;
    if (!el) return;
    el.style.setProperty('--level', '1');
    window.clearTimeout(decay.current);
    decay.current = window.setTimeout(() => el.style.setProperty('--level', '0.12'), 110);
  };

  const later = (fn: () => void, ms: number) => { const id = window.setTimeout(fn, ms); timers.current.push(id); return id; };
  const clearTimers = () => { timers.current.forEach((id) => window.clearTimeout(id)); timers.current = []; };

  /** Stops the receptionist mid-sentence. Bumping `turn` means the old utterance can never restart the mic. */
  function stopSpeech() {
    turn.current += 1;
    clearTimers();
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  }

  /** Detaches and aborts the recogniser, so there is never more than one. */
  function stopListening() {
    const r = rec.current;
    rec.current = null;
    if (r) { r.onresult = null; r.onerror = null; r.onend = null; r.onaudiostart = null; try { r.abort(); } catch { /* already stopped */ } }
    setInterim('');
  }

  const endCall = () => {
    live.current = false;
    stopListening();
    stopSpeech();
    setNudge('');
    setPhase('ended');
    if (desk.current) {
      setSummary(desk.current.summary());
      setMadeAt(new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }));
    }
  };

  const listen = () => {
    const Recog = recogniserClass();
    if (!live.current) return;
    stopListening();
    setNudge('');
    if (!Recog) { setPhase('waiting'); typed.current?.focus(); return; }
    const r = new Recog();
    rec.current = r;
    r.lang = 'en-GB'; r.interimResults = true; r.continuous = false; r.maxAlternatives = 1;
    let heard = '';
    // "Listening" only shows once the microphone is really open, so a blocked mic never flashes it.
    r.onaudiostart = () => { if (rec.current === r) setPhase('listening'); };
    r.onresult = (event) => {
      if (rec.current !== r) return;
      setPhase('listening');
      bump();
      let text = '';
      for (let i = event.resultIndex; i < event.results.length; i += 1) {
        text += event.results[i][0].transcript;
        if (event.results[i].isFinal) heard = text;
      }
      setInterim(text);
    };
    r.onerror = (event) => {
      if (rec.current !== r) return;
      if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
        setSpeech((s) => ({ ...s, listen: false }));
        setNote('Microphone is blocked, so type your side of the call instead.');
      } else if (event.error === 'no-speech') setNudge('Didn’t hear anything. Tap the mic or a suggestion.');
      else if (event.error === 'audio-capture') { setSpeech((s) => ({ ...s, listen: false })); setNudge('No microphone found. Type or tap a suggestion.'); }
      else if (event.error === 'network') setNudge('Speech needs a connection. Type instead.');
    };
    r.onend = () => {
      if (rec.current !== r) return;
      rec.current = null;
      setInterim('');
      if (!live.current) return;
      if (heard.trim()) handle(heard);
      else setPhase('waiting');
    };
    setPhase('waiting');
    try { r.start(); } catch { rec.current = null; setPhase('waiting'); }
  };

  const say = (text: string, then?: () => void) => {
    stopSpeech();
    const token = turn.current;
    setLines((current) => [...current, { who: 'desk', text }]);
    const next = then ?? listen;
    // Some browsers never fire onend (no voices installed): a timer makes sure the call moves on.
    let moved = false;
    const go = () => {
      if (moved || token !== turn.current || !live.current) return;
      moved = true;
      clearTimers();
      next();
    };
    const spokenText = spoken(text);
    if (voiceRef.current && 'speechSynthesis' in window) {
      setPhase('speaking');
      const utterance = new SpeechSynthesisUtterance(spokenText);
      utterance.lang = 'en-GB';
      utterance.rate = 1.02;
      if (voice.current) utterance.voice = voice.current;
      // "Thinking" only shows if speech is slow to start (over 150ms).
      const slow = later(() => setPhase('thinking'), 150);
      utterance.onstart = () => { window.clearTimeout(slow); setPhase('speaking'); };
      utterance.onboundary = () => { boundarySeen.current = true; presence.current?.removeAttribute('data-pulse'); bump(); };
      utterance.onend = go;
      utterance.onerror = go;
      boundarySeen.current = false;
      later(() => { if (!boundarySeen.current) presence.current?.setAttribute('data-pulse', '1'); }, 400);
      later(() => setPhase('speaking'), 1500);
      // Backstop for engines that never fire onend: stop the voice first so the mic never opens over it.
      later(() => { if (!moved && token === turn.current) window.speechSynthesis.cancel(); go(); }, 2500 + spokenText.split(/\s+/).length * 450);
      window.speechSynthesis.speak(utterance);
    } else {
      later(() => setPhase('thinking'), 150);
      later(go, 300);
    }
  };

  function handle(text: string) {
    if (!desk.current || !live.current) return;
    stopSpeech();
    stopListening();
    setNudge('');
    setLines((current) => [...current, { who: 'caller', text }]);
    const answer = desk.current.reply(text);
    setHints(desk.current.hints());
    say(answer, desk.current.stage === 'done' ? endCall : undefined);
  }

  /** Starts a call. With `first` (a suggestion tapped before the call), the greeting is shown and that line is sent straight away. */
  const begin = (first?: string) => {
    stopSpeech();
    stopListening();
    desk.current = createDesk(config);
    live.current = true;
    setLines([]);
    setSummary(null);
    setNote('');
    setNudge('');
    setHints(desk.current.hints());
    const greeting = desk.current.greet();
    if (first) { setLines([{ who: 'desk', text: greeting }]); handle(first); return; }
    // iOS only lets a page speak if speech starts inside the tap, so start a silent line now; the greeting follows the ring.
    if (voiceRef.current && 'speechSynthesis' in window) window.speechSynthesis.speak(new SpeechSynthesisUtterance(' '));
    setPhase('ringing');
    later(() => say(greeting), 800);
  };

  const sendTyped = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const box = typed.current;
    if (!box || !box.value.trim() || phase === 'ringing') return;
    const text = box.value;
    box.value = '';
    handle(text);
  };

  const sendChip = (text: string) => {
    if (phase === 'ringing') return;
    if (phase === 'ready' || phase === 'ended') begin(text);
    else handle(text);
  };

  /** While the receptionist speaks the mic button interrupts: speech stops first, then the mic opens. */
  const micTap = () => {
    if (phase === 'ringing') return;
    if (phase === 'listening') { stopListening(); setPhase('waiting'); return; }
    stopSpeech();
    listen();
  };

  /** A visitor typed their own business: swap the desk, reset any finished call, and send them to Start. */
  const madeDemo = (made: typeof config) => {
    stopSpeech();
    stopListening();
    live.current = false;
    desk.current = null;
    setConfig(made);
    setSource('typed');
    setLines([]);
    setSummary(null);
    setHints([]);
    setNudge('');
    setNote('');
    setSeconds(0);
    setPhase('ready');
    focusStart.current = true;
  };

  /** Escape hangs up. Nothing traps focus, so Tab still leaves the card. */
  // Escape ends a live call wherever focus is: a tapped chip or the mic can unmount and drop focus to the page.
  useEffect(() => {
    if (idle) return undefined;
    const onKey = (event: globalThis.KeyboardEvent) => { if (event.key === 'Escape' && live.current) { event.preventDefault(); endCall(); } };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idle]);

  const toggleVoice = () => {
    voiceRef.current = !voiceRef.current;
    setVoiceOn(voiceRef.current);
    if (!voiceRef.current && 'speechSynthesis' in window) window.speechSynthesis.cancel();
  };

  const status = {
    ready: 'Ready when you are',
    ringing: 'Ringing…',
    speaking: 'Receptionist speaking…',
    listening: 'Your turn: listening',
    thinking: 'Thinking…',
    waiting: nudge || (speech.listen ? 'Your turn: tap the mic, a suggestion, or type' : 'Your turn: type or tap a suggestion'),
    ended: 'Call ended',
  }[phase];

  const truth = source === 'link' ? `Demo made for ${config.name}. Not ${config.name}’s real phone line.`
    : source === 'typed' ? `Demo made from the details you typed. Not ${config.name}’s real phone line.`
    : 'Demo · not a real phone line';
  const chips = phase === 'ready' ? starter : phase === 'ended' ? [] : hints;
  const micLabel = phase === 'speaking' || phase === 'thinking' ? 'Interrupt' : phase === 'listening' ? 'Stop listening' : 'Talk';
  const planHref = `/free-plan?src=voice-demo&package=${encodeURIComponent(AFTER_HOURS.name)}${source !== 'default' ? `&business=${encodeURIComponent(config.name)}` : ''}#leak-check-form`;

  return (
    <div className="vd" ref={card}>
      <p className="vd-truth">{truth}</p>
      <div className="vd-head">
        <div>
          <h2 className="vd-name">{config.name}</h2>
          <p className="vd-closed"><span aria-hidden="true">●</span> Closed now{config.hours ? ` · open ${config.hours}` : ''}</p>
        </div>
        <span className={`vd-timer${idle ? '' : ' is-live'}`}>{phase === 'ready' ? 'Demo' : <><span className="vd-sr">{phase === 'ended' ? 'Call length ' : 'Call time '}</span>{clock(seconds)}</>}</span>
      </div>

      <div className="vd-stage">
        <div className={`vd-presence vd-p-${phase}`} ref={presence} aria-hidden="true">
          <span className="vd-pr vd-pr1" /><span className="vd-pr vd-pr2" /><span className="vd-orbit"><i /></span>
          <span className="vd-core"><CoreIcon phase={phase} /></span>
        </div>
        <p className={`vd-status vd-status-${phase}`} role="status">{status}</p>
        {phase === 'ready' ? (
          <button type="button" ref={start} className="vd-start" onClick={() => begin()}>
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" /></svg>
            Start the call
          </button>
        ) : null}
      </div>

      <div className="vd-talk">
        <ol className="vd-log" ref={log} tabIndex={0} aria-live="polite" aria-label="Call so far">
          {lines.length === 0 ? <li className="vd-empty">Press “Start the call”, or tap a suggestion, then talk as if you were a customer ringing after hours.</li> : null}
          {lines.map((line, index) => (
            <li key={index} className={`vd-line vd-${line.who}`}><span className="vd-who">{line.who === 'desk' ? 'Receptionist' : 'You'}</span><span className="vd-said">{line.text}</span></li>
          ))}
          {interim ? <li className="vd-line vd-caller vd-interim" aria-hidden="true"><span className="vd-who">You</span><span className="vd-said">{interim}</span></li> : null}
        </ol>

        {chips.length ? (
          <div className="vd-hints" role="group" aria-label="Things you could say">
            <span className="vd-hint-label">Try saying</span>
            {chips.map((chip) => <button key={chip} type="button" className="vd-chip" disabled={phase === 'ringing'} onClick={() => sendChip(chip)}>{chip}</button>)}
          </div>
        ) : null}

        {phase !== 'ready' && phase !== 'ended' ? (
          <div className="vd-controls">
            <div className="vd-row">
              {speech.listen ? <button type="button" ref={mic} className={`vd-mic${phase === 'listening' ? ' is-on' : ''}`} onClick={micTap} aria-label={micLabel} title={micLabel}><svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><path d="M12 3a3 3 0 0 1 3 3v6a3 3 0 0 1-6 0V6a3 3 0 0 1 3-3zM5 11a7 7 0 0 0 14 0M12 18v3" /></svg></button> : null}
              <form className="vd-type" onSubmit={sendTyped}>
                <label className="vd-sr" htmlFor="vd-typed">Type what you’d say</label>
                <input id="vd-typed" ref={typed} autoComplete="off" placeholder="Or type what you’d say…" />
                <button type="submit" className="button">Send</button>
              </form>
            </div>
            <div className="vd-foot">
              <button type="button" className="vd-voice" onClick={toggleVoice} aria-pressed={!voiceOn}>{voiceOn ? 'Mute the receptionist' : 'Turn voice back on'}</button>
              <button type="button" className="button vd-end" onClick={endCall}>End call (Esc)</button>
            </div>
          </div>
        ) : null}
        {note ? <p className="vd-note">{note}</p> : null}
      </div>

      {summary ? (
        <div className={`vd-summary${summary.urgent ? ' is-urgent' : ''}`} tabIndex={-1}>
          <div className="vd-mhead">
            <span className="vd-tag">Message for {config.name} · {madeAt}</span>
            <span className="vd-stamp">Demo · not sent</span>
          </div>
          <strong className="vd-subject">{summary.title}{summary.urgent ? <span className="vd-urgent">Urgent</span> : null}</strong>
          <dl>{summary.rows.map(([key, value]) => <div key={key}><dt>{key}</dt><dd>{value}</dd></div>)}</dl>
          <p className="vd-real">With the real service, a message like this reaches your inbox after every call.</p>
          <div className="vd-actions">
            <a className="button button-signal" href={planHref}>{MAIN_CTA}</a>
            <button type="button" className="button" onClick={() => begin()}>Call again</button>
          </div>
          {source === 'default' ? <button type="button" className="vd-link" onClick={focusTryYours}>Try it as your business</button> : null}
        </div>
      ) : null}

      {idle ? <div className="vd-trywrap"><TryYours onMade={madeDemo} /></div> : null}

      <p className="vd-small">
        A demo that runs in your browser. Nothing is recorded or sent to Maz Works. {speech.listen ? 'Your browser’s own speech service turns your voice into text (in Chrome that is Google’s). ' : ''}
        It answers only from the details it was given and takes a message for anything else. The paid service uses a more natural voice on a real phone line.
      </p>
    </div>
  );
}
