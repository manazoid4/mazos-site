'use client';

import { FormEvent, useMemo, useRef, useState } from 'react';
import styles from './rotareason.module.css';

type Skill = 'Clinical lead' | 'First aid';
type Weekday = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';
type Tone = 'normal' | 'success' | 'warning';

type StaffMember = {
  id: string;
  name: string;
  role: string;
  skills: Skill[];
  availableDays: Weekday[];
  maxShifts: number;
  active: boolean;
};

type LeaveMap = Record<string, number[]>;
type Schedule = Record<number, string[]>;

type Message = {
  id: number;
  role: 'assistant' | 'user';
  body: string;
  tone?: Tone;
  details?: string[];
};

type Snapshot = {
  staff: StaffMember[];
  leaves: LeaveMap;
  schedule: Schedule;
};

type PendingChange = Snapshot & {
  label: string;
  summary: string;
};

type BuildResult = {
  schedule: Schedule;
  issues: string[];
  counts: Record<string, number>;
};

const WEEK: { day: number; weekday: Weekday; label: string; date: string }[] = [
  { day: 17, weekday: 'Mon', label: 'Monday', date: '17 Aug' },
  { day: 18, weekday: 'Tue', label: 'Tuesday', date: '18 Aug' },
  { day: 19, weekday: 'Wed', label: 'Wednesday', date: '19 Aug' },
  { day: 20, weekday: 'Thu', label: 'Thursday', date: '20 Aug' },
  { day: 21, weekday: 'Fri', label: 'Friday', date: '21 Aug' },
  { day: 22, weekday: 'Sat', label: 'Saturday', date: '22 Aug' },
  { day: 23, weekday: 'Sun', label: 'Sunday', date: '23 Aug' },
];

const INITIAL_STAFF: StaffMember[] = [
  { id: 'julie', name: 'Julie Carter', role: 'Senior nurse', skills: ['Clinical lead', 'First aid'], availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'], maxShifts: 5, active: true },
  { id: 'amira', name: 'Amira Khan', role: 'Registered nurse', skills: ['Clinical lead'], availableDays: ['Mon', 'Tue', 'Thu', 'Fri', 'Sat', 'Sun'], maxShifts: 5, active: true },
  { id: 'priya', name: 'Priya Shah', role: 'Registered nurse', skills: ['Clinical lead', 'First aid'], availableDays: ['Tue', 'Wed', 'Thu', 'Fri', 'Sat'], maxShifts: 5, active: true },
  { id: 'noah', name: 'Noah Williams', role: 'Registered nurse', skills: ['Clinical lead'], availableDays: ['Mon', 'Thu', 'Fri', 'Sat', 'Sun'], maxShifts: 5, active: true },
  { id: 'ben', name: 'Ben Morris', role: 'Healthcare assistant', skills: ['First aid'], availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'], maxShifts: 5, active: true },
  { id: 'jimmy', name: 'Jimmy Reed', role: 'Healthcare assistant', skills: ['First aid'], availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'], maxShifts: 5, active: true },
  { id: 'sam', name: 'Sam Taylor', role: 'Healthcare assistant', skills: ['First aid'], availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], maxShifts: 5, active: true },
  { id: 'ella', name: 'Ella Brown', role: 'Healthcare assistant', skills: [], availableDays: ['Tue', 'Wed', 'Sat', 'Sun'], maxShifts: 4, active: true },
];

const INITIAL_LEAVES: LeaveMap = { priya: [19] };

const DAY_LOOKUP: Record<string, Weekday> = {
  monday: 'Mon', mon: 'Mon',
  tuesday: 'Tue', tue: 'Tue', tues: 'Tue',
  wednesday: 'Wed', wed: 'Wed',
  thursday: 'Thu', thu: 'Thu', thurs: 'Thu',
  friday: 'Fri', fri: 'Fri',
  saturday: 'Sat', sat: 'Sat',
  sunday: 'Sun', sun: 'Sun',
};

function copyLeaves(leaves: LeaveMap): LeaveMap {
  return Object.fromEntries(Object.entries(leaves).map(([id, days]) => [id, [...days]]));
}

function hasLeave(leaves: LeaveMap, staffId: string, day: number) {
  return leaves[staffId]?.includes(day) ?? false;
}

function scoreCandidate(member: StaffMember, counts: Record<string, number>) {
  return (counts[member.id] ?? 0) * 10 + member.maxShifts;
}

function buildSchedule(staff: StaffMember[], leaves: LeaveMap): BuildResult {
  const schedule: Schedule = {};
  const counts: Record<string, number> = Object.fromEntries(staff.map((member) => [member.id, 0]));
  const issues: string[] = [];

  for (const date of WEEK) {
    const candidates = staff
      .filter((member) => member.active)
      .filter((member) => member.availableDays.includes(date.weekday))
      .filter((member) => !hasLeave(leaves, member.id, date.day))
      .filter((member) => counts[member.id] < member.maxShifts)
      .sort((a, b) => scoreCandidate(a, counts) - scoreCandidate(b, counts));

    const chosen: StaffMember[] = [];
    const add = (member?: StaffMember) => {
      if (member && !chosen.some((item) => item.id === member.id)) chosen.push(member);
    };

    add(candidates.find((member) => member.skills.includes('Clinical lead')));
    if (!chosen.some((member) => member.skills.includes('First aid'))) {
      add(candidates.find((member) => member.skills.includes('First aid')));
    }
    for (const member of candidates) {
      if (chosen.length >= 3) break;
      add(member);
    }

    schedule[date.day] = chosen.map((member) => member.id);
    chosen.forEach((member) => { counts[member.id] += 1; });

    if (chosen.length < 3) issues.push(`${date.label} ${date.date}: only ${chosen.length} of 3 required staff can be assigned.`);
    if (!chosen.some((member) => member.skills.includes('Clinical lead'))) issues.push(`${date.label} ${date.date}: no clinical lead is available.`);
    if (!chosen.some((member) => member.skills.includes('First aid'))) issues.push(`${date.label} ${date.date}: no first-aid-qualified staff member is available.`);
  }

  return { schedule, issues: [...new Set(issues)], counts };
}

function findStaff(text: string, staff: StaffMember[]) {
  const lower = text.toLowerCase();
  return staff.find((member) => {
    const firstName = member.name.split(' ')[0].toLowerCase();
    return lower.includes(firstName) || lower.includes(member.name.toLowerCase());
  });
}

function parseDateRange(text: string) {
  const numbers = [...text.matchAll(/\b(1[7-9]|2[0-3])(?:st|nd|rd|th)?\b/g)].map((match) => Number(match[1]));
  if (!numbers.length) return [];
  if (numbers.length === 1) return [numbers[0]];
  const start = Math.min(numbers[0], numbers[1]);
  const end = Math.max(numbers[0], numbers[1]);
  return WEEK.map((item) => item.day).filter((day) => day >= start && day <= end);
}

function parseWeekdays(text: string): Weekday[] {
  const found: Weekday[] = [];
  Object.entries(DAY_LOOKUP).forEach(([name, code]) => {
    if (new RegExp(`\\b${name}\\b`, 'i').test(text) && !found.includes(code)) found.push(code);
  });
  return found;
}

function formatDays(days: number[]) {
  if (days.length === 1) return `${days[0]} August`;
  return `${days[0]}–${days[days.length - 1]} August`;
}

function riskForDay(staff: StaffMember[], leaves: LeaveMap, day: number, weekday: Weekday) {
  const available = staff.filter((member) => member.active && member.availableDays.includes(weekday) && !hasLeave(leaves, member.id, day));
  const leads = available.filter((member) => member.skills.includes('Clinical lead')).length;
  const firstAiders = available.filter((member) => member.skills.includes('First aid')).length;
  if (available.length < 3 || leads === 0 || firstAiders === 0) return 'Conflict';
  if (available.length === 3 || leads === 1 || firstAiders === 1) return 'Tight';
  return 'Healthy';
}

function staffName(staff: StaffMember[], id: string) {
  return staff.find((member) => member.id === id)?.name ?? id;
}

export default function RotaReasonClient() {
  const initialBuild = useMemo(() => buildSchedule(INITIAL_STAFF, INITIAL_LEAVES), []);
  const [staff, setStaff] = useState<StaffMember[]>(INITIAL_STAFF);
  const [leaves, setLeaves] = useState<LeaveMap>(INITIAL_LEAVES);
  const [schedule, setSchedule] = useState<Schedule>(initialBuild.schedule);
  const [input, setInput] = useState('');
  const [pending, setPending] = useState<PendingChange | null>(null);
  const [undo, setUndo] = useState<Snapshot | null>(null);
  const nextMessageId = useRef(3);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: 'assistant',
      body: 'The rota is valid for 17–23 August. Wednesday is tight: Julie is the only available clinical lead because Priya is on training leave.',
      details: ['3 staff required each day', 'At least 1 clinical lead', 'At least 1 first aider', 'Weekly shift limits respected'],
    },
    {
      id: 2,
      role: 'assistant',
      body: 'Ask me to test a holiday, change availability, remove a leaver, regenerate the rota, or tell you who is working a day.',
    },
  ]);

  const currentBuild = useMemo(() => buildSchedule(staff, leaves), [staff, leaves]);
  const coverageCount = WEEK.filter((date) => riskForDay(staff, leaves, date.day, date.weekday) !== 'Conflict').length;
  const activeStaff = staff.filter((member) => member.active).length;

  const addMessage = (message: Omit<Message, 'id'>) => {
    const id = nextMessageId.current;
    nextMessageId.current += 1;
    setMessages((current) => [...current, { ...message, id }]);
  };

  const propose = (nextStaff: StaffMember[], nextLeaves: LeaveMap, label: string, summary: string) => {
    const result = buildSchedule(nextStaff, nextLeaves);
    if (result.issues.length) {
      setPending(null);
      addMessage({ role: 'assistant', body: `No — I would not approve that change yet. ${result.issues[0]}`, tone: 'warning', details: result.issues });
      return;
    }
    setPending({ staff: nextStaff, leaves: nextLeaves, schedule: result.schedule, label, summary });
    addMessage({
      role: 'assistant',
      body: `Yes — that works. ${summary}`,
      tone: 'success',
      details: ['All 7 days remain covered', 'Clinical-lead coverage remains valid', 'First-aid coverage remains valid', 'No weekly shift limit is exceeded'],
    });
  };

  const handleCommand = (raw: string) => {
    const text = raw.trim();
    if (!text) return;
    addMessage({ role: 'user', body: text });
    setInput('');

    const lower = text.toLowerCase();
    const member = findStaff(text, staff);

    if (/(holiday|annual leave|time off|day off|days off|take .*off|wants .*off)/i.test(text) && member) {
      const days = parseDateRange(text);
      if (!days.length) {
        addMessage({ role: 'assistant', body: `I found ${member.name}, but I need a date between 17 and 23 August for this demo week.` });
        return;
      }
      const nextLeaves = copyLeaves(leaves);
      nextLeaves[member.id] = [...new Set([...(nextLeaves[member.id] ?? []), ...days])].sort((a, b) => a - b);
      propose(staff, nextLeaves, `${member.name} leave`, `${member.name} can take ${formatDays(days)} off and the rota can be rebuilt safely.`);
      return;
    }

    if (/(only works|only work|can only work|available only)/i.test(text) && member) {
      const days = parseWeekdays(text);
      if (!days.length) {
        addMessage({ role: 'assistant', body: `I found ${member.name}, but I could not identify the weekdays to keep available.` });
        return;
      }
      const nextStaff = staff.map((item) => item.id === member.id ? { ...item, availableDays: days } : item);
      propose(nextStaff, leaves, `${member.name} availability`, `${member.name}'s availability can be limited to ${days.join(' and ')} without breaking coverage.`);
      return;
    }

    if (/(has left|is leaving|left the team|remove .*future|delete .*future)/i.test(text) && member) {
      const nextStaff = staff.map((item) => item.id === member.id ? { ...item, active: false } : item);
      propose(nextStaff, leaves, `${member.name} removed`, `${member.name} can be removed from future scheduling and the week can still be covered.`);
      return;
    }

    if (/(generate|rebuild|make me a rota|make a rota|regenerate)/i.test(text)) {
      const result = buildSchedule(staff, leaves);
      setSchedule(result.schedule);
      addMessage({
        role: 'assistant',
        body: result.issues.length ? 'I regenerated the rota, but there are unresolved hard constraints.' : 'Done — I regenerated the rota using current availability, leave, skills and shift limits.',
        tone: result.issues.length ? 'warning' : 'success',
        details: result.issues.length ? result.issues : ['The schedule is balanced using the lowest current shift count first.'],
      });
      return;
    }

    if (/(who.*working|who.*on|show.*working)/i.test(text)) {
      const day = WEEK.find((item) => lower.includes(item.label.toLowerCase()) || lower.includes(item.weekday.toLowerCase()));
      if (!day) {
        addMessage({ role: 'assistant', body: 'Tell me the day, for example: “Who is working Wednesday?”' });
        return;
      }
      const names = (schedule[day.day] ?? []).map((id) => staffName(staff, id));
      addMessage({ role: 'assistant', body: `${day.label} ${day.date}: ${names.join(', ') || 'nobody is assigned'}.` });
      return;
    }

    if (/(conflict|risk|problem|unsafe|why)/i.test(text)) {
      const risks = WEEK.filter((date) => riskForDay(staff, leaves, date.day, date.weekday) !== 'Healthy');
      addMessage({
        role: 'assistant',
        body: risks.length ? `I found ${risks.length} day${risks.length === 1 ? '' : 's'} with limited resilience.` : 'No current hard conflicts or tight days found.',
        details: risks.map((date) => `${date.label} ${date.date}: ${riskForDay(staff, leaves, date.day, date.weekday)} coverage.`),
      });
      return;
    }

    addMessage({
      role: 'assistant',
      body: 'I can handle rota generation, holiday feasibility, recurring availability, leavers, day-by-day staffing and conflict explanations in this v1 demo.',
      details: ['“Julie wants 17th to 19th off”', '“Jimmy can only work Thursday and Friday”', '“Sam has left — remove future shifts”', '“Who is working Wednesday?”'],
    });
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    handleCommand(input);
  };

  const applyPending = () => {
    if (!pending) return;
    setUndo({ staff, leaves: copyLeaves(leaves), schedule });
    setStaff(pending.staff);
    setLeaves(pending.leaves);
    setSchedule(pending.schedule);
    addMessage({ role: 'assistant', body: `Applied: ${pending.label}. The visible rota has been regenerated.`, tone: 'success' });
    setPending(null);
  };

  const undoLast = () => {
    if (!undo) return;
    setStaff(undo.staff);
    setLeaves(undo.leaves);
    setSchedule(undo.schedule);
    setUndo(null);
    setPending(null);
    addMessage({ role: 'assistant', body: 'Undone. The previous rota and rules are restored.' });
  };

  const resetDemo = () => {
    const resetBuild = buildSchedule(INITIAL_STAFF, INITIAL_LEAVES);
    setStaff(INITIAL_STAFF);
    setLeaves(INITIAL_LEAVES);
    setSchedule(resetBuild.schedule);
    setPending(null);
    setUndo(null);
    addMessage({ role: 'assistant', body: 'Demo reset to the original fictional team and rota.' });
  };

  return (
    <main id="main-content" className={styles.shell}>
      <header className={styles.topbar}>
        <div className={styles.brandGroup}>
          <a href="/" className={styles.backLink}>Maz Works</a>
          <span className={styles.divider}>/</span>
          <div className={styles.logo}>RR</div>
          <div>
            <div className={styles.brand}>RotaReason</div>
            <div className={styles.tagline}>Explainable scheduling</div>
          </div>
        </div>
        <div className={styles.headerActions}>
          <span className={styles.demoBadge}>Fictional clinic demo</span>
          <button className={styles.ghostButton} onClick={resetDemo}>Reset demo</button>
        </div>
      </header>

      <section className={styles.summaryBar} aria-label="Rota summary">
        <div><span>Week</span><strong>17–23 Aug 2026</strong></div>
        <div><span>Active staff</span><strong>{activeStaff}</strong></div>
        <div><span>Covered days</span><strong>{coverageCount}/7</strong></div>
        <div><span>Hard rules</span><strong>4</strong></div>
        <div className={currentBuild.issues.length ? styles.statusBad : styles.statusGood}>
          <span>Status</span><strong>{currentBuild.issues.length ? 'Needs attention' : 'Valid rota'}</strong>
        </div>
      </section>

      <div className={styles.workspace}>
        <section className={styles.chatPanel} aria-label="Rota assistant">
          <div className={styles.panelHeading}>
            <div>
              <p className={styles.eyebrow}>Manager console</p>
              <h1>Ask for the change. See whether it works.</h1>
            </div>
            {undo ? <button className={styles.smallButton} onClick={undoLast}>Undo last change</button> : null}
          </div>

          <div className={styles.quickCommands}>
            {[
              'Generate next week’s rota',
              'Julie wants 17th to 19th off',
              'Jimmy can only work Thursday and Friday',
              'Sam has left — remove future shifts',
            ].map((command) => <button key={command} onClick={() => handleCommand(command)}>{command}</button>)}
          </div>

          <div className={styles.messages} aria-live="polite">
            {messages.map((message) => (
              <article
                key={message.id}
                className={`${styles.message} ${message.role === 'user' ? styles.userMessage : styles.assistantMessage} ${message.tone === 'warning' ? styles.warningMessage : ''} ${message.tone === 'success' ? styles.successMessage : ''}`}
              >
                <div className={styles.messageMeta}>{message.role === 'user' ? 'You' : 'RotaReason'}</div>
                <p>{message.body}</p>
                {message.details?.length ? <ul>{message.details.map((detail) => <li key={detail}>{detail}</li>)}</ul> : null}
              </article>
            ))}
          </div>

          {pending ? (
            <div className={styles.pendingCard}>
              <div>
                <span>Safe change ready</span>
                <strong>{pending.label}</strong>
                <p>{pending.summary}</p>
              </div>
              <div className={styles.pendingActions}>
                <button className={styles.secondaryButton} onClick={() => setPending(null)}>Discard</button>
                <button className={styles.primaryButton} onClick={applyPending}>Apply and rebuild rota</button>
              </div>
            </div>
          ) : null}

          <form className={styles.commandForm} onSubmit={submit}>
            <label htmlFor="rota-command">Type a rota request</label>
            <div className={styles.inputRow}>
              <input id="rota-command" value={input} onChange={(event) => setInput(event.target.value)} placeholder="e.g. Julie wants 17th and 18th off" autoComplete="off" />
              <button type="submit" className={styles.primaryButton}>Check</button>
            </div>
            <p>v1 uses a deterministic local rule engine. No personal data is sent anywhere.</p>
          </form>
        </section>

        <section className={styles.rotaPanel} aria-label="Visible rota">
          <div className={styles.rotaHeader}>
            <div>
              <p className={styles.eyebrow}>Live rota</p>
              <h2>Core coverage</h2>
              <p>Demo requirement: 3 staff, 1 clinical lead, 1 first aider per day.</p>
            </div>
            <span className={styles.shiftBadge}>08:00–20:00</span>
          </div>

          <div className={styles.calendar}>
            {WEEK.map((date) => {
              const risk = riskForDay(staff, leaves, date.day, date.weekday);
              return (
                <article key={date.day} className={styles.dayCard}>
                  <div className={styles.dayHeader}>
                    <div><strong>{date.weekday}</strong><span>{date.date}</span></div>
                    <span className={`${styles.risk} ${risk === 'Healthy' ? styles.healthy : risk === 'Tight' ? styles.tight : styles.conflict}`}>{risk}</span>
                  </div>
                  <div className={styles.assignments}>
                    {(schedule[date.day] ?? []).map((id) => {
                      const member = staff.find((item) => item.id === id);
                      if (!member) return null;
                      return (
                        <div key={id} className={styles.personCard}>
                          <span className={styles.avatar}>{member.name.split(' ').map((part) => part[0]).join('')}</span>
                          <div><strong>{member.name}</strong><span>{member.role}</span></div>
                          <div className={styles.skillDots} aria-label={member.skills.join(', ')}>
                            {member.skills.includes('Clinical lead') ? <i title="Clinical lead">L</i> : null}
                            {member.skills.includes('First aid') ? <i title="First aid">F</i> : null}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </article>
              );
            })}
          </div>

          <div className={styles.lowerGrid}>
            <div className={styles.rulesCard}>
              <div className={styles.cardTitle}><strong>Hard constraints</strong><span>Always enforced</span></div>
              <ul>
                <li><span>Minimum staffing</span><strong>3 / day</strong></li>
                <li><span>Clinical lead</span><strong>1+ / day</strong></li>
                <li><span>First aid</span><strong>1+ / day</strong></li>
                <li><span>Individual limit</span><strong>Max 4–5 shifts</strong></li>
              </ul>
            </div>

            <div className={styles.teamCard}>
              <div className={styles.cardTitle}><strong>Team rules</strong><span>Availability + leave</span></div>
              <div className={styles.teamList}>
                {staff.map((member) => (
                  <div key={member.id} className={!member.active ? styles.inactive : ''}>
                    <span>{member.name}</span>
                    <small>{member.active ? member.availableDays.join(' · ') : 'Left team'}</small>
                  </div>
                ))}
              </div>
              <p className={styles.seedNote}>Seeded exception: Priya is unavailable Wednesday 19 August for training.</p>
            </div>
          </div>
        </section>
      </div>

      <footer className={styles.footer}>
        <strong>RotaReason v1</strong>
        <span>Decision-support prototype only. Real healthcare deployment would require organisation-specific rules, security, integration, auditability and clinical governance.</span>
      </footer>
    </main>
  );
}
