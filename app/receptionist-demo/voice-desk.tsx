'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { AFTER_HOURS } from '../offers';
import { MAIN_CTA } from '../site';
import { DEFAULT_CONFIG, cleanConfig, createDesk, decodeConfig } from './engine.mjs';

type Line = { who: 'desk' | 'caller'; text: string };
type Phase = 'ready' | 'speaking' | 'listening' | 'waiting' | 'ended';
type Desk = ReturnType<typeof createDesk>;
type Summary = ReturnType<Desk['summary']>;

/* SpeechRecognition is not consistently included in browser TypeScript definitions. */
type RecognitionResult = ArrayLike<{ transcript: string }> & { isFinal: boolean };
type Recogniser = {
  lang: string; interimResults: boolean; continuous: boolean; maxAlternatives: number;
  onresult: ((event: { results: ArrayLike<RecognitionResult> }) => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  onend: (() => void) | null;
  start(): void; stop(): void; abort(): void;
};
function recogniserClass(): (new () => Recogniser) | null {
  if (typeof window === 'undefined') return null;
  const w = window as unknown as { SpeechRecognition?: new () => Recogniser; webkitSpeechRecognition?: new () => Recogniser };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

const formatDuration = (seconds: number) => `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;

export function VoiceDesk() {
  const [config, setConfig] = useState(cleanConfig(DEFAULT_CONFIG));
  const [custom, setCustom] = useState(false);
  const [lines, setLines] = useState<Line[]>([]);
  const [phase, setPhase] = useState<Phase>('ready');
  const [interim, setInterim] = useState('');
  const [summary, setSummary] = useState<Summary | null>(null);
  const [capabilities, setCapabilities] = useState({ talk: false, listen: false });
  const [voiceOn, setVoiceOn] = useState(true);
  const [note, setNote] = useState('');
  const [elapsed, setElapsed] = useState(0);
  const desk = useRef<Desk | null>(null);
  const rec = useRef<Recogniser | null>(null);
  const active = useRef(false);
  const turn = useRef(0);
  const voiceRef = useRef(true);
  const utteranceTimer = useRef<number | null>(null);
  const elapsedTimer = useRef<number | null>(null);
  const startedAt = useRef(0);
  const typed = useRef<HTMLInputElement>(null);
  const log = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const code = new URLSearchParams(window.location.hash.slice(1)).get('c');
    const fromLink = code ? decodeConfig(code) : null;
    if (fromLink) { setConfig(fromLink); setCustom(true); }
    setCapabilities({ talk: 'speechSynthesis' in window, listen: Boolean(recogniserClass()) });
    return () => {
      active.current = false;
      turn.current += 1;
      if (utteranceTimer.current !== null) window.clearTimeout(utteranceTimer.current);
      if (elapsedTimer.current !== null) window.clearInterval(elapsedTimer.current);
      rec.current?.abort();
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    };
  }, []);

  useEffect(() => { log.current?.lastElementChild?.scrollIntoView({ block: 'nearest' }); }, [lines, interim]);

  function stopAudio() {
    turn.current += 1;
    if (utteranceTimer.current !== null) { window.clearTimeout(utteranceTimer.current); utteranceTimer.current = null; }
    const previous = rec.current;
    rec.current = null;
    if (previous) {
      previous.onresult = null;
      previous.onerror = null;
      previous.onend = null;
      previous.abort();
    }
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  }

  function endCall() {
    stopAudio();
    active.current = false;
    if (elapsedTimer.current !== null) window.clearInterval(elapsedTimer.current);
    elapsedTimer.current = null;
    setInterim('');
    setPhase('ended');
    if (desk.current) setSummary(desk.current.summary());
  }

  function listen() {
    if (!active.current) return;
    const Recog = recogniserClass();
    if (!Recog) {
      setPhase('waiting');
      setNote('Voice recognition is not available here. Type a reply below instead.');
      typed.current?.focus();
      return;
    }
    if (rec.current) return;
    const r = new Recog();
    rec.current = r;
    const currentTurn = turn.current;
    r.lang = 'en-GB';
    r.interimResults = true;
    r.continuous = false;
    r.maxAlternatives = 1;
    let heard = '';
    r.onresult = (event) => {
      if (rec.current !== r || turn.current !== currentTurn || !active.current) return;
      const results = Array.from(event.results);
      const text = results.map((result) => result[0]?.transcript ?? '').join(' ').trim();
      setInterim(text);
      if (results.some((result) => result.isFinal)) heard = text;
    };
    r.onerror = (event) => {
      if (rec.current !== r || turn.current !== currentTurn) return;
      if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
        setCapabilities((value) => ({ ...value, listen: false }));
        setNote('Microphone access was blocked. Type your reply instead.');
      } else if (event.error !== 'no-speech' && event.error !== 'aborted') {
        setNote('I couldn’t hear that clearly. You can try the microphone again or type.');
      }
    };
    r.onend = () => {
      if (rec.current !== r || turn.current !== currentTurn || !active.current) return;
      rec.current = null;
      setInterim('');
      if (heard.trim()) handle(heard);
      else {
        setPhase('waiting');
        typed.current?.focus();
      }
    };
    try { r.start(); setPhase('listening'); setNote(''); }
    catch {
      rec.current = null;
      setPhase('waiting');
      setNote('The microphone could not start. Please type a reply or try again.');
    }
  }

  function say(text: string, after?: () => void) {
    stopAudio();
    setLines((current) => [...current, { who: 'desk', text }]);
    const currentTurn = turn.current;
    const advance = () => {
      if (!active.current || currentTurn !== turn.current) return;
      if (after) after();
      else listen();
    };
    if (voiceRef.current && 'speechSynthesis' in window) {
      setPhase('speaking');
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-GB';
      utterance.rate = 0.98;
      const voices = window.speechSynthesis.getVoices();
      const british = voices.find((voice) => voice.lang === 'en-GB');
      if (british) utterance.voice = british;
      let finished = false;
      const done = () => {
        if (finished) return;
        finished = true;
        if (utteranceTimer.current !== null) window.clearTimeout(utteranceTimer.current);
        utteranceTimer.current = null;
        advance();
      };
      utterance.onend = done;
      utterance.onerror = () => {
        setNote('Audio playback was interrupted. You can still type or use the microphone.');
        done();
      };
      // Browser speech engines sometimes omit onend. Cancel before advancing so
      // recognition never starts while stale speech is still playing.
      utteranceTimer.current = window.setTimeout(() => {
        if (currentTurn !== turn.current) return;
        window.speechSynthesis.cancel();
        done();
      }, 4000 + text.split(/\s+/).length * 650);
      try { window.speechSynthesis.speak(utterance); }
      catch {
        if (utteranceTimer.current !== null) window.clearTimeout(utteranceTimer.current);
        utteranceTimer.current = window.setTimeout(advance, 250);
      }
    } else {
      setPhase('waiting');
      utteranceTimer.current = window.setTimeout(advance, 260);
    }
  }

  function handle(text: string) {
    if (!desk.current || !active.current || !text.trim()) return;
    setLines((current) => [...current, { who: 'caller', text: text.trim() }]);
    setInterim('');
    const answer = desk.current.reply(text.trim());
    if (desk.current.stage === 'done') say(answer, endCall);
    else say(answer);
  }

  function start() {
    stopAudio();
    desk.current = createDesk(config);
    active.current = true;
    setLines([]);
    setSummary(null);
    setNote('');
    setElapsed(0);
    startedAt.current = Date.now();
    if (elapsedTimer.current !== null) window.clearInterval(elapsedTimer.current);
    elapsedTimer.current = window.setInterval(() => setElapsed(Math.floor((Date.now() - startedAt.current) / 1000)), 1000);
    say(desk.current.greet());
  }

  function sendTyped(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const box = typed.current;
    if (!box || !box.value.trim()) return;
    const text = box.value;
    box.value = '';
    stopAudio();
    handle(text);
  }

  function sample(text: string) {
    if (!active.current) return;
    stopAudio();
    handle(text);
  }

  function toggleVoice() {
    const next = !voiceRef.current;
    voiceRef.current = next;
    setVoiceOn(next);
    if (!next && phase === 'speaking') {
      stopAudio();
      if (desk.current?.stage === 'done') endCall();
      else listen();
    }
  }

  const status = {
    ready: 'Ready for a test call',
    speaking: 'Receptionist speaking',
    listening: 'Listening to you',
    waiting: 'Your turn — tap the mic or type',
    ended: 'Call complete',
  }[phase];
  const suggestions = [
    'When are you open?',
    config.services[0] ? `Do you do ${config.services[0].name}?` : 'What services do you offer?',
    config.services.find((service: { name: string; price?: string }) => service.price)
      ? `How much is ${config.services.find((service: { name: string; price?: string }) => service.price)?.name}?`
      : 'Can I book an appointment?',
  ];
  const demoHref = `/free-plan?src=voice-demo&package=${encodeURIComponent(AFTER_HOURS.name)}#leak-check-form`;

  return (
    <section className="vd" aria-label="Try an after-hours receptionist">
      <div className="vd-head">
        <div>
          <p className="vd-tag">{custom ? 'Personalised browser example' : 'Interactive browser example'}</p>
          <h2 className="vd-name">{config.name}</h2>
          <p className="vd-closed"><span aria-hidden="true">●</span> Example business · after-hours</p>
        </div>
        <span className="vd-call-pill">{phase === 'ready' ? 'LIVE DEMO' : formatDuration(elapsed)}</span>
      </div>

      <div className={`vd-stage vd-stage-${phase}`}>
        <div className="vd-orb" aria-hidden="true"><div className="vd-orb-core"><span /><span /><span /><span /><span /><span /><span /></div></div>
        <p className="vd-status" role="status">{status}</p>
        <p className="vd-stage-note">
          {phase === 'ready' ? 'Experience an example customer call, then see the message the owner would receive.' :
            phase === 'ended' ? 'The example summary is ready below. Nothing has been emailed.' :
            phase === 'speaking' ? 'Listen to the response, or type your answer at any time.' :
            phase === 'listening' ? 'Ask a question in your own words, or choose an example below.' :
            'Choose an example below, try the microphone again, or type a reply.'}
        </p>
        {phase === 'ready' || phase === 'ended'
          ? <button type="button" className="button button-signal vd-start" onClick={start}>{phase === 'ready' ? 'Start the demo call' : 'Try another call'} <span aria-hidden="true">↗</span></button>
          : <button type="button" className="button vd-end" onClick={endCall}>End demo call</button>}
      </div>

      {phase !== 'ready' && phase !== 'ended' && (
        <div className="vd-controls">
          <div className="vd-suggestions" role="group" aria-label="Example questions">
            <strong>Try asking</strong>
            {suggestions.map((question) => <button type="button" key={question} onClick={() => sample(question)}>{question}</button>)}
          </div>
          <div className="vd-row">
            {capabilities.listen &&
              <button type="button" className="vd-mic" onClick={listen} disabled={phase === 'listening' || phase === 'speaking'} aria-label="Start microphone" title="Start microphone">
                <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true"><path d="M12 3a3 3 0 0 1 3 3v6a3 3 0 0 1-6 0V6a3 3 0 0 1 3-3zM5 11a7 7 0 0 0 14 0M12 18v3" /></svg>
              </button>}
            <form className="vd-type" onSubmit={sendTyped}>
              <label className="vd-sr" htmlFor="vd-typed">Type what you would say</label>
              <input id="vd-typed" ref={typed} autoComplete="off" placeholder="Or type your reply…" maxLength={400} />
              <button type="submit" className="button">Send</button>
            </form>
          </div>
          {capabilities.talk && <button type="button" className="vd-voice" onClick={toggleVoice} aria-pressed={!voiceOn}>{voiceOn ? 'Mute the receptionist' : 'Turn receptionist audio back on'}</button>}
        </div>
      )}

      {note && <p className="vd-note" role="status">{note}</p>}

      <div className="vd-conversation">
        <div className="vd-conversation-head"><h3>Conversation</h3><span>Live example transcript</span></div>
        <ol className="vd-log" ref={log} aria-live="polite" aria-label="Conversation transcript">
          {lines.length === 0 && <li className="vd-empty">Your conversation will appear here. No real call is placed.</li>}
          {lines.map((line, index) => (
            <li key={index} className={`vd-line vd-${line.who}`}><span className="vd-who">{line.who === 'desk' ? 'Receptionist' : 'You'}</span><span className="vd-said">{line.text}</span></li>
          ))}
          {interim && <li className="vd-line vd-caller vd-interim"><span className="vd-who">You · recognising</span><span className="vd-said">{interim}</span></li>}
        </ol>
      </div>

      {summary && (
        <div className={`vd-summary${summary.urgent ? ' is-urgent' : ''}`}>
          <span className="vd-tag">Example message preview · not sent</span>
          <strong>{summary.title}</strong>
          <dl>{summary.rows.map(([key, value]) => <div key={key}><dt>{key}</dt><dd>{value}</dd></div>)}</dl>
          <a className="button button-signal" href={demoHref}>{MAIN_CTA}</a>
        </div>
      )}

      <p className="vd-small">Browser-only interactive example; not a real telephone line. Maz Works does not receive or store this conversation. If you use the microphone, your browser may process your audio through its speech-recognition provider. You can type instead. The paid telephone service uses a separate setup.</p>
    </section>
  );
}
