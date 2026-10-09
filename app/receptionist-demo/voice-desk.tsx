'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { DEFAULT_CONFIG, cleanConfig, createDesk, decodeConfig } from './engine.mjs';

type Line = { who: 'desk' | 'caller'; text: string };
type Phase = 'ready' | 'speaking' | 'listening' | 'waiting' | 'ended';
type Desk = ReturnType<typeof createDesk>;
type Summary = ReturnType<Desk['summary']>;

/* The browser's own speech tools. Not in TypeScript's DOM types yet. */
type Recogniser = {
  lang: string; interimResults: boolean; continuous: boolean; maxAlternatives: number;
  onresult: ((event: { resultIndex: number; results: ArrayLike<ArrayLike<{ transcript: string }> & { isFinal: boolean }> }) => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  onend: (() => void) | null;
  start(): void; stop(): void; abort(): void;
};
const recogniserClass = (): (new () => Recogniser) | null => {
  if (typeof window === 'undefined') return null;
  const w = window as unknown as { SpeechRecognition?: new () => Recogniser; webkitSpeechRecognition?: new () => Recogniser };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
};

/**
 * A pretend after-hours call you can have out loud, in the browser.
 * Speech in and out uses the browser's built-in tools (free, no account).
 * Answers come from engine.mjs: only the business details in the link.
 * Without a microphone, or in browsers without speech, you type instead.
 */
export function VoiceDesk() {
  const [config, setConfig] = useState(cleanConfig(DEFAULT_CONFIG));
  const [custom, setCustom] = useState(false);
  const [lines, setLines] = useState<Line[]>([]);
  const [phase, setPhase] = useState<Phase>('ready');
  const [interim, setInterim] = useState('');
  const [summary, setSummary] = useState<Summary | null>(null);
  const [speech, setSpeech] = useState({ talk: false, listen: false });
  const [voiceOn, setVoiceOn] = useState(true);
  const [note, setNote] = useState('');
  const desk = useRef<Desk | null>(null);
  const rec = useRef<Recogniser | null>(null);
  const live = useRef(false);
  const voiceRef = useRef(true);
  const typed = useRef<HTMLInputElement>(null);
  const log = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const code = new URLSearchParams(window.location.hash.slice(1)).get('c');
    const fromLink = code ? decodeConfig(code) : null;
    if (fromLink) { setConfig(fromLink); setCustom(true); }
    setSpeech({ talk: 'speechSynthesis' in window, listen: Boolean(recogniserClass()) });
    return () => { live.current = false; rec.current?.abort(); if ('speechSynthesis' in window) window.speechSynthesis.cancel(); };
  }, []);

  useEffect(() => { log.current?.lastElementChild?.scrollIntoView({ block: 'nearest' }); }, [lines, interim]);

  const endCall = () => {
    live.current = false;
    rec.current?.abort();
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    setInterim('');
    setPhase('ended');
    if (desk.current) setSummary(desk.current.summary());
  };

  const listen = () => {
    const Recog = recogniserClass();
    if (!live.current) return;
    if (!Recog) { setPhase('waiting'); typed.current?.focus(); return; }
    const r = new Recog();
    rec.current = r;
    r.lang = 'en-GB'; r.interimResults = true; r.continuous = false; r.maxAlternatives = 1;
    let heard = '';
    r.onresult = (event) => {
      let text = '';
      for (let i = event.resultIndex; i < event.results.length; i += 1) {
        text += event.results[i][0].transcript;
        if (event.results[i].isFinal) heard = text;
      }
      setInterim(text);
    };
    r.onerror = (event) => {
      if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
        setSpeech((s) => ({ ...s, listen: false }));
        setNote('Microphone is blocked, so type your side of the call instead.');
      }
    };
    r.onend = () => {
      setInterim('');
      if (!live.current) return;
      if (heard.trim()) handle(heard);
      else setPhase('waiting');
    };
    try { r.start(); setPhase('listening'); } catch { setPhase('waiting'); }
  };

  const say = (text: string, then?: () => void) => {
    setLines((current) => [...current, { who: 'desk', text }]);
    const next = then ?? listen;
    if (voiceRef.current && 'speechSynthesis' in window) {
      setPhase('speaking');
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-GB';
      utterance.rate = 1.02;
      const voice = window.speechSynthesis.getVoices().find((v) => v.lang === 'en-GB');
      if (voice) utterance.voice = voice;
      // Some browsers never fire onend (no voices installed): a timer makes sure the call moves on.
      let moved = false;
      const go = () => { if (moved) return; moved = true; window.clearTimeout(backup); next(); };
      const backup = window.setTimeout(go, 2500 + text.split(/\s+/).length * 450);
      utterance.onend = go;
      utterance.onerror = go;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    } else {
      window.setTimeout(next, 300);
    }
  };

  function handle(text: string) {
    if (!desk.current || !live.current) return;
    setLines((current) => [...current, { who: 'caller', text }]);
    const answer = desk.current.reply(text);
    if (desk.current.stage === 'done') say(answer, endCall);
    else say(answer);
  }

  const start = () => {
    desk.current = createDesk(config);
    live.current = true;
    setLines([]);
    setSummary(null);
    setNote('');
    say(desk.current.greet());
  };

  const sendTyped = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const box = typed.current;
    if (!box || !box.value.trim()) return;
    rec.current?.abort();
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    const text = box.value;
    box.value = '';
    handle(text);
  };

  const toggleVoice = () => {
    voiceRef.current = !voiceRef.current;
    setVoiceOn(voiceRef.current);
    if (!voiceRef.current && 'speechSynthesis' in window) window.speechSynthesis.cancel();
  };

  const status = {
    ready: 'Ready when you are',
    speaking: 'Receptionist speaking…',
    listening: 'Listening… say something',
    waiting: speech.listen ? 'Tap the mic to talk, or type' : 'Type your reply',
    ended: 'Call ended',
  }[phase];

  return (
    <div className="vd">
      <div className="vd-head">
        <div>
          <p className="vd-tag">{custom ? 'Your demo' : 'Example business'}</p>
          <h2 className="vd-name">{config.name}</h2>
          <p className="vd-closed"><span aria-hidden="true">●</span> Closed now{config.hours ? ` · open ${config.hours}` : ''}</p>
        </div>
        {phase === 'ready' || phase === 'ended'
          ? <button type="button" className="button button-signal vd-start" onClick={start}>{phase === 'ended' ? 'Call again' : 'Start the call'}</button>
          : <button type="button" className="button vd-end" onClick={endCall}>End call</button>}
      </div>

      <ol className="vd-log" ref={log} aria-live="polite" aria-label="Call so far">
        {lines.length === 0 ? <li className="vd-empty">Press “Start the call”, then talk as if you were a customer ringing after hours. Try asking about opening hours, a price, or say it’s urgent.</li> : null}
        {lines.map((line, index) => (
          <li key={index} className={`vd-line vd-${line.who}`}><span className="vd-who">{line.who === 'desk' ? 'Receptionist' : 'You'}</span><span className="vd-said">{line.text}</span></li>
        ))}
        {interim ? <li className="vd-line vd-caller vd-interim"><span className="vd-who">You</span><span className="vd-said">{interim}</span></li> : null}
      </ol>

      {phase !== 'ready' && phase !== 'ended' ? (
        <div className="vd-controls">
          <p className={`vd-status vd-status-${phase}`} role="status">{status}</p>
          <div className="vd-row">
            {speech.listen ? <button type="button" className="vd-mic" onClick={listen} disabled={phase === 'listening'} aria-label="Talk"><svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><path d="M12 3a3 3 0 0 1 3 3v6a3 3 0 0 1-6 0V6a3 3 0 0 1 3-3zM5 11a7 7 0 0 0 14 0M12 18v3" /></svg></button> : null}
            <form className="vd-type" onSubmit={sendTyped}>
              <label className="vd-sr" htmlFor="vd-typed">Type what you’d say</label>
              <input id="vd-typed" ref={typed} autoComplete="off" placeholder="Or type what you’d say…" />
              <button type="submit" className="button">Send</button>
            </form>
          </div>
          <button type="button" className="vd-voice" onClick={toggleVoice} aria-pressed={!voiceOn}>{voiceOn ? 'Mute the receptionist' : 'Turn voice back on'}</button>
        </div>
      ) : null}
      {note ? <p className="vd-note">{note}</p> : null}

      {summary ? (
        <div className={`vd-summary${summary.urgent ? ' is-urgent' : ''}`}>
          <span className="vd-tag">What the owner would get by email</span>
          <strong>{summary.title}</strong>
          <dl>{summary.rows.map(([key, value]) => <div key={key}><dt>{key}</dt><dd>{value}</dd></div>)}</dl>
        </div>
      ) : null}

      <p className="vd-small">
        A demo that runs in your browser. Nothing is recorded or sent to Maz Works. {speech.listen ? 'Your browser’s own speech service turns your voice into text (in Chrome that is Google’s). ' : ''}
        It answers only from the details it was given and takes a message for anything else. The paid service uses a more natural voice on a real phone line.
      </p>
    </div>
  );
}
