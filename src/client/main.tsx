import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { ArrowDown, ArrowLeft, ArrowRight, Download, ExternalLink, Menu, Minus, Plus, X } from 'lucide-react';
import './styles.css';

type Project = {
  slug: string;
  number: string;
  name: string;
  year: string;
  kind: string;
  status: string;
  line: string;
  accent: string;
  summary: string;
  role: string;
  observed: string;
  question: string;
  tried: string;
  result: string;
  learned: string;
  link: string;
};

type ArchiveItem = {
  number: string;
  title: string;
  year: string;
  status: string;
  text: string;
  lesson: string;
};

const projects: Project[] = [
  { slug:'ksrtc-workflow', number:'01', name:'ksrtc-workflow', year:'2026', kind:'UX research', status:'INDEPENDENT STUDY', accent:'#ED7C22', line:'A payment error that happens before the ticket exists.', role:'Field research, journey mapping, interaction design', summary:'A self-initiated study of a recurring payment-mode error in the KSRTC Chalo ETM workflow. Not affiliated with KSRTC or Chalo.', observed:'Regular bus travel exposed a payment-mode failure before passenger confirmation, with no clear recovery after printing.', question:'How might payment be confirmed without slowing an already pressured ticketing workflow?', tried:'I combined field observation with a contextual interview, then mapped the journey across six stages.', result:'A lightweight confirmation before printing, supported by a Recent Tickets log for eligible cash corrections while preserving the audit trail.', learned:'When failure occurs before the visible output, prevention is usually more useful than repair. Feedback is welcome. This study may contain mistakes.', link:'https://www.behance.net/gallery/253455687/Rethinking-the-KSRTC-Chalo-ETM-Workflow' },
  { slug:'tejasvi-26', number:'02', name:'tejasvi-26', year:'2026', kind:'Brand system', status:'VERIFIED PROJECT', accent:'#C4161C', line:'A festival identity built around The Ritual of Fire.', role:'Design direction, identity, visual system', summary:'The end-to-end identity for Tejasvi 2026, Marian Engineering College’s intercollegiate cultural festival.', observed:'The festival needed a visual identity that could hold together many teams, formats and event moments.', question:'How can fire behave as a system instead of appearing as decoration?', tried:'I developed a Promethean flame mark, a Bella Sophie wordmark and a connected language of colour, typography and iconography.', result:'A complete visual system spanning posters, event communication and merchandise.', learned:'An identity becomes useful when other people can extend it without weakening it.', link:'https://www.behance.net/gallery/244949181/Tejasvi-2026-MEC-Intercollegiate-Fest' },
  { slug:'growit', number:'03', name:'growit', year:'2025', kind:'Product design', status:'PROJECT', accent:'#3D889D', line:'One distributor experience instead of disconnected workflows.', role:'Product design, information architecture, prototyping', summary:'A unified digital platform concept for mutual fund distributors.', observed:'Essential distributor activities were spread across fragmented workflows, increasing effort and reducing clarity.', question:'What should a distributor see and do when the product behaves like one system?', tried:'I reorganised key activities, clarified the information hierarchy and prototyped a consistent navigation model.', result:'A unified interface that gives essential activities a shared structure while keeping each workflow legible.', learned:'Consistency is not cosmetic. It reduces the amount of product logic a person has to relearn.', link:'https://www.behance.net/gallery/254159901/GrowIt-A-Unified-Distributor-Experience' }
];

const archiveItems: ArchiveItem[] = [
  { number:'A-01', title:'Lumen Space', year:'2026-now', status:'ACTIVE', text:'A student-led creative community spanning design, media, branding, content and videography.', lesson:'I founded it to create practical workflows, workshops, collaborations and portfolio opportunities.' },
  { number:'A-02', title:'Inspira Marian IEDC', year:'2024-25', status:'COMPLETED', text:'Two consecutive leadership tenures across creative direction, campaigns and event visuals.', lesson:'A recognisable system comes from consistent decisions made by a team.' },
  { number:'A-03', title:'MuLearn Foundation', year:'2023-25', status:'COMPLETED', text:'Social media strategy and creative production for statewide community initiatives.', lesson:'The work connected large communities, events and organisations through clear communication.' },
  { number:'A-04', title:'Design workshops', year:'2025-26', status:'COMPLETED', text:'Co-mentored Beyond Pixels and co-conducted the full-day Pixel Craft bootcamp.', lesson:'Explaining a design decision clearly is a different skill from making it.' },
  { number:'A-05', title:'AI and ML foundation', year:'2022-26', status:'COMPLETED', text:'B.Tech in Artificial Intelligence and Machine Learning at Marian Engineering College.', lesson:'Technical literacy helps me ask better product questions when the interface is only the visible layer.' }
];

const systemStatements = [
  { n: '01', title: "I LIKE PROBLEMS THAT DON'T COME WITH INSTRUCTIONS.", copy: "Ambiguous problems are usually more interesting than well-defined ones. That's where most of my work starts." },
  { n: '02', title: 'I CARE ABOUT HOW THINGS WORK, NOT JUST HOW THEY LOOK.', copy: 'Interfaces are the visible part. The decisions underneath them are usually more interesting.' },
  { n: '03', title: 'I MAKE A LOT OF THINGS THAT NEVER SHIP.', copy: 'Some become products. Some become prototypes. Some teach me what not to do.' }
];

const capabilitiesList = [
  { n: '01', title: 'MESSY PROBLEMS.', copy: 'Making sense of ambiguous challenges.' },
  { n: '02', title: 'IDEAS TO INTERFACES.', copy: 'Turning raw concepts into intuitive UI.' },
  { n: '03', title: "WHY IT FAILS.", copy: "Figuring out why something isn't working." },
  { n: '04', title: "PROTOTYPING.", copy: "Building proofs when words aren't enough." },
  { n: '05', title: 'PRODUCT POLISH.', copy: 'Making ugly products less ugly.' }
];

function Command({ children }: { children: React.ReactNode }) {
  return <div className="command"><span className="command-user">arjun@internet</span><span>:~$</span> {children}</div>;
}

function ScrollLetterReveal({ text, breaks = [] }: { text: string; breaks?: number[] }) {
  const ref = React.useRef<HTMLParagraphElement>(null);
  const [revealed, setRevealed] = useState(0);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let frame = 0;
    const update = () => {
      frame = 0;
      if (reduced) { setRevealed(text.length); return; }
      const rect = element.getBoundingClientRect();
      const start = window.innerHeight * 0.88;
      const end = window.innerHeight * 0.28;
      const progress = Math.max(0, Math.min(1, (start - rect.top) / (start - end)));
      setRevealed(Math.round(progress * text.length));
    };
    const request = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    addEventListener('scroll', request, { passive: true });
    addEventListener('resize', request);
    return () => { removeEventListener('scroll', request); removeEventListener('resize', request); if (frame) cancelAnimationFrame(frame); };
  }, [text]);
  return <p ref={ref} className="scroll-letter-reveal" aria-label={text}>{[...text].map((character, index) => <React.Fragment key={index}>{breaks.includes(index) && <br/>}<span className={index < revealed ? 'revealed' : ''} aria-hidden="true">{character === ' ' ? '\u00a0' : character}</span></React.Fragment>)}</p>;
}

function ProjectVisual({ slug, compact = false }: { slug: string; compact?: boolean }) {
  if (slug === 'ksrtc-workflow') return (
    <div className={`project-visual image-project-visual ${compact ? 'compact' : ''}`}>
      <img src="/projects/ksrtc-cover.webp" alt="Rethinking the KSRTC Chalo ticketing workflow case study cover" loading={compact ? 'lazy' : 'eager'}/>
    </div>
  );
  if (slug === 'tejasvi-26') return (
    <div className={`project-visual image-project-visual tejasvi-project-visual ${compact ? 'compact' : ''}`}>
      <img src="/projects/tejasvi-cover.webp" alt="Tejasvi 26, The Ritual of Fire brand identity artwork" loading={compact ? 'lazy' : 'eager'}/>
    </div>
  );
  return (
    <div className={`project-visual useful-visual ${compact ? 'compact' : ''}`} aria-label="Almost Useful experiments preview">
      <div className="tool-card card-one"><span>should this<br/>be a meeting?</span><b>probably not.</b></div>
      <div className="tool-card card-two"><span>tiny decision<br/>machine</span><b>flip → keep</b></div>
      <div className="tool-card card-three"><span>tab debt</span><b>37 / concerning</b></div>
      <div className="useful-label">GROWIT / PRODUCT DESIGN</div>
    </div>
  );
}

function ProjectDetail({ project, close }: { project: Project; close: () => void }) {
  const dialogRef = React.useRef<HTMLDivElement>(null);
  const closeRef = React.useRef(close);
  const closingRef = React.useRef(false);
  const [closing, setClosing] = useState(false);
  closeRef.current = close;
  const requestClose = React.useCallback(() => {
    if (closingRef.current) return;
    closingRef.current = true;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    setClosing(true);
    window.setTimeout(() => closeRef.current(), reduced ? 0 : 180);
  }, []);
  useEffect(() => {
    const scrollPosition = window.scrollY;
    const body = document.body;
    const root = document.documentElement;
    const previous = {
      bodyPosition: body.style.position,
      bodyTop: body.style.top,
      bodyLeft: body.style.left,
      bodyRight: body.style.right,
      bodyWidth: body.style.width,
      bodyOverflow: body.style.overflow,
      bodyPaddingRight: body.style.paddingRight,
      rootOverflow: root.style.overflow,
      rootOverscroll: root.style.overscrollBehavior
    };
    const scrollbarWidth = window.innerWidth - root.clientWidth;
    body.style.position = 'fixed';
    body.style.top = `-${scrollPosition}px`;
    body.style.left = '0';
    body.style.right = '0';
    body.style.width = '100%';
    body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;
    root.style.overflow = 'hidden';
    root.style.overscrollBehavior = 'none';
    const dialog = dialogRef.current;
    const focusable = () => Array.from(dialog?.querySelectorAll<HTMLElement>('button, a[href], [tabindex]:not([tabindex="-1"])') || []);
    focusable()[0]?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') requestClose();
      if (event.key === 'Tab') {
        const items = focusable();
        if (!items.length) return;
        const first = items[0], last = items[items.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    addEventListener('keydown', onKey);
    return () => {
      body.style.position = previous.bodyPosition;
      body.style.top = previous.bodyTop;
      body.style.left = previous.bodyLeft;
      body.style.right = previous.bodyRight;
      body.style.width = previous.bodyWidth;
      body.style.overflow = previous.bodyOverflow;
      body.style.paddingRight = previous.bodyPaddingRight;
      root.style.overflow = previous.rootOverflow;
      root.style.overscrollBehavior = previous.rootOverscroll;
      removeEventListener('keydown', onKey);
      window.scrollTo({ top: scrollPosition, behavior: 'instant' });
    };
  }, [requestClose]);

  return <div className={`project-modal-backdrop ${closing ? 'is-closing' : ''}`} onMouseDown={event => { if (event.target === event.currentTarget) requestClose(); }}>
    <div ref={dialogRef} className={`project-modal ${closing ? 'is-closing' : ''}`} role="dialog" aria-modal="true" aria-labelledby={`project-title-${project.slug}`} style={{'--project-accent': project.accent} as React.CSSProperties}>
      <header className="project-modal-header"><div><span>PROJECT FILE / {project.number}</span><b>/projects/{project.name}</b></div><button onClick={requestClose} aria-label={`Close ${project.name}`}><X size={20}/></button></header>
      <div className="project-modal-scroll">
        <section className="project-modal-intro"><div className="project-modal-title"><span>{project.year} / {project.kind} / {project.status}</span><h1 id={`project-title-${project.slug}`}>{project.name}</h1><p>{project.line}</p></div><div className="project-modal-meta"><div><span>ROLE</span><b>{project.role}</b></div><div><span>STATUS</span><b>{project.status}</b></div></div></section>
        <div className="project-modal-media"><ProjectVisual slug={project.slug}/></div>
        <section className="project-modal-story-grid-section">
          <div className="section-heading-mini"><span>04 STAGES / RESEARCH & DIRECTION</span></div>
          <div className="statements ksrtc-steps-grid">
            <article className="statement capability-statement">
              <span>01</span>
              <h2>OBSERVED CHALLENGE.</h2>
              <p>{project.observed}</p>
            </article>
            <article className="statement capability-statement">
              <span>02</span>
              <h2>KEY QUESTION.</h2>
              <p>{project.question}</p>
            </article>
            <article className="statement capability-statement">
              <span>03</span>
              <h2>EXPLORED APPROACH.</h2>
              <p>{project.tried}</p>
            </article>
            <article className="statement capability-statement">
              <span>04</span>
              <h2>FINAL DIRECTION.</h2>
              <p>{project.result}</p>
            </article>
          </div>
        </section>
        <section className="project-modal-learning"><span>WHAT I LEARNED</span><h2>{project.learned}</h2></section>
        <footer className="project-modal-footer"><p>Full project documentation is available on Behance.</p><a href={project.link} target="_blank" rel="noreferrer">READ MORE <ExternalLink size={17}/></a><button onClick={requestClose}><ArrowLeft size={16}/> BACK TO PROJECTS</button></footer>
      </div>
    </div>
  </div>;
}

function ResumeDetail({ close }: { close: () => void }) {
  const dialogRef = React.useRef<HTMLDivElement>(null);
  const closeRef = React.useRef(close);
  const closingRef = React.useRef(false);
  const [closing, setClosing] = useState(false);
  closeRef.current = close;
  const requestClose = React.useCallback(() => {
    if (closingRef.current) return;
    closingRef.current = true;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    setClosing(true);
    window.setTimeout(() => closeRef.current(), reduced ? 0 : 180);
  }, []);
  useEffect(() => {
    const scrollPosition = window.scrollY;
    const body = document.body;
    const root = document.documentElement;
    const previous = {
      bodyPosition: body.style.position,
      bodyTop: body.style.top,
      bodyLeft: body.style.left,
      bodyRight: body.style.right,
      bodyWidth: body.style.width,
      bodyOverflow: body.style.overflow,
      bodyPaddingRight: body.style.paddingRight,
      rootOverflow: root.style.overflow,
      rootOverscroll: root.style.overscrollBehavior
    };
    const scrollbarWidth = window.innerWidth - root.clientWidth;
    body.style.position = 'fixed';
    body.style.top = `-${scrollPosition}px`;
    body.style.left = '0';
    body.style.right = '0';
    body.style.width = '100%';
    body.style.overflow = 'hidden';
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;
    root.style.overflow = 'hidden';
    root.style.overscrollBehavior = 'none';
    const dialog = dialogRef.current;
    const focusable = () => Array.from(dialog?.querySelectorAll<HTMLElement>('button, a[href], [tabindex]:not([tabindex="-1"])') || []);
    focusable()[0]?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') requestClose();
      if (event.key === 'Tab') {
        const items = focusable();
        if (!items.length) return;
        const first = items[0], last = items[items.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    addEventListener('keydown', onKey);
    return () => {
      body.style.position = previous.bodyPosition;
      body.style.top = previous.bodyTop;
      body.style.left = previous.bodyLeft;
      body.style.right = previous.bodyRight;
      body.style.width = previous.bodyWidth;
      body.style.overflow = previous.bodyOverflow;
      body.style.paddingRight = previous.bodyPaddingRight;
      root.style.overflow = previous.rootOverflow;
      root.style.overscrollBehavior = previous.rootOverscroll;
      removeEventListener('keydown', onKey);
      window.scrollTo({ top: scrollPosition, behavior: 'instant' });
    };
  }, [requestClose]);

  return <div className={`project-modal-backdrop ${closing ? 'is-closing' : ''}`} onMouseDown={event => { if (event.target === event.currentTarget) requestClose(); }}>
    <div ref={dialogRef} className={`project-modal resume-modal ${closing ? 'is-closing' : ''}`} role="dialog" aria-modal="true" aria-label="Resume PDF Document" style={{'--project-accent': '#0077B5'} as React.CSSProperties}>
      <header className="project-modal-header">
        <div><span>DOCUMENT FILE / RÉSUMÉ</span><b>/about/arjun-kh-cv.pdf</b></div>
        <div className="resume-header-actions">
          <a href="/arjun-kh-cv.pdf?v=2" download="arjun-kh-cv.pdf" className="resume-header-dl-btn"><Download size={15}/> DOWNLOAD PDF</a>
          <button onClick={requestClose} aria-label="Close résumé modal"><X size={20}/></button>
        </div>
      </header>
      <div className="project-modal-scroll">
        <div className="project-modal-media resume-pdf-container">
          <object data="/arjun-kh-cv.pdf?v=2" type="application/pdf" className="resume-pdf-object">
            <iframe src="/arjun-kh-cv.pdf?v=2" title="Arjun KH Resume PDF" className="resume-pdf-iframe">
              <p>PDF preview unavailable. <a href="/arjun-kh-cv.pdf?v=2" download="arjun-kh-cv.pdf">Download PDF document</a>.</p>
            </iframe>
          </object>
        </div>
      </div>
    </div>
  </div>;
}





function LiveClock() {
  const [time, setTime] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Kolkata',
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });

  const partsMap: Record<string, string> = {};
  formatter.formatToParts(time).forEach(({ type, value }) => {
    partsMap[type] = value;
  });

  const dayName = (partsMap.weekday || '').toUpperCase();
  const dayNum = partsMap.day || '01';
  const monthName = (partsMap.month || '').toUpperCase();
  const year = partsMap.year || '2026';

  const hours = partsMap.hour || '12';
  const minutes = partsMap.minute || '00';
  const seconds = partsMap.second || '00';
  const period = (partsMap.dayPeriod || 'AM').toUpperCase();

  return (
    <div className="live-clock" title="Current IST Time & Date">
      <span className="clock-date">{dayName} {dayNum} {monthName} {year}</span>
      <span className="clock-sep">/</span>
      <span className="clock-time">{hours}:{minutes}:{seconds} {period}</span>
      <span className="clock-tz">IST</span>
    </div>
  );
}

const FINAL_ASCII_ART = `K   K  H   H       A       RRRR     JJJJJ  U   U  N   N
K  K   H   H      A A      R   R      J    U   U  NN  N
KK     HHHHH     AAAAA     RRRR       J    U   U  N N N
K  K   H   H    A     A    R  R    J  J    U   U  N  NN
K   K  H   H   A       A   R   R    JJ      UUU   N   N`;

function AsciiStartup({ storageKey = 'kha-startup-seen' }: { storageKey?: string }) {
  const [hidden, setHidden] = useState<boolean>(false);
  const [leaving, setLeaving] = useState<boolean>(false);
  const [artText, setArtText] = useState<string>(FINAL_ASCII_ART);
  const [progress, setProgress] = useState<number>(0);
  const [stepState, setStepState] = useState<Array<'WAIT' | 'READ' | 'OK'>>(['WAIT', 'WAIT', 'WAIT']);
  const runningRef = React.useRef<boolean>(true);
  const frameRef = React.useRef<number>(0);
  const timerRef = React.useRef<number>(0);
  const frameNumRef = React.useRef<number>(0);

  const noise = "/\\|+*.:01[]";

  const finish = React.useCallback((remember = true) => {
    if (!runningRef.current) return;
    runningRef.current = false;
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    if (timerRef.current) clearTimeout(timerRef.current);

    if (remember) {
      try { localStorage.setItem(storageKey, '1'); } catch {}
    }

    setLeaving(true);
    document.documentElement.classList.remove('ascii-startup-active');
    document.body.classList.remove('ascii-startup-active');

    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    timerRef.current = window.setTimeout(() => {
      setHidden(true);
      setLeaving(false);
      document.dispatchEvent(new CustomEvent('ascii-startup:complete'));
    }, reduced ? 0 : 190);
  }, [storageKey]);

  const startAnimation = React.useCallback((force = false) => {
    let seen = false;
    try { seen = localStorage.getItem(storageKey) === '1'; } catch {}
    if (!force && seen) {
      setHidden(true);
      runningRef.current = false;
      return;
    }

    if (timerRef.current) clearTimeout(timerRef.current);
    setHidden(false);
    setLeaving(false);
    document.documentElement.classList.add('ascii-startup-active');
    document.body.classList.add('ascii-startup-active');
    runningRef.current = true;
    frameNumRef.current = 0;

    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setProgress(1);
      setStepState(['OK', 'OK', 'OK']);
      setArtText(FINAL_ASCII_ART);
      timerRef.current = window.setTimeout(() => finish(), 250);
      return;
    }

    const startedAt = performance.now();
    let isFullyLoaded = document.readyState === 'complete';

    const onWindowLoad = () => { isFullyLoaded = true; };
    if (!isFullyLoaded) {
      window.addEventListener('load', onWindowLoad, { once: true });
    }

    const computeRealProgress = () => {
      if (isFullyLoaded || document.readyState === 'complete') return 1.0;

      const imgs = Array.from(document.images);
      const totalImgs = imgs.length || 1;
      const loadedImgs = imgs.filter(img => img.complete).length;
      const imgRatio = loadedImgs / totalImgs;

      if (document.readyState === 'interactive') {
        return 0.5 + 0.45 * imgRatio;
      }
      return 0.15 + 0.3 * imgRatio;
    };

    const tick = (now: number) => {
      if (!runningRef.current) return;

      const timeP = Math.min(1, (now - startedAt) / 1650);
      const realP = computeRealProgress();
      const p = Math.min(1, Math.min(timeP, realP));
      frameNumRef.current += 1;

      const revealAt = Math.floor(FINAL_ASCII_ART.length * Math.min(1, p * 1.18));
      const newArt = [...FINAL_ASCII_ART].map((char, index) => {
        if (char === '\n' || char === ' ') return char;
        if (index < revealAt) return char;
        return noise[(index * 7 + frameNumRef.current) % noise.length];
      }).join('');

      setArtText(newArt);
      setProgress(p);

      const activeStep = Math.min(2, Math.floor(p * 3));
      const steps: Array<'WAIT' | 'READ' | 'OK'> = [0, 1, 2].map((idx) => {
        const isDone = idx < activeStep || p === 1;
        const isActive = idx === activeStep && p !== 1;
        return isDone ? 'OK' : isActive ? 'READ' : 'WAIT';
      });
      setStepState(steps);

      if (p < 1) {
        frameRef.current = requestAnimationFrame(tick);
      } else {
        window.removeEventListener('load', onWindowLoad);
        timerRef.current = window.setTimeout(() => finish(), 180);
      }
    };

    frameRef.current = requestAnimationFrame(tick);
  }, [finish, storageKey]);

  React.useLayoutEffect(() => {
    startAnimation(true);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      if (timerRef.current) clearTimeout(timerRef.current);
      document.documentElement.classList.remove('ascii-startup-active');
      document.body.classList.remove('ascii-startup-active');
    };
  }, [finish, startAnimation]);

  if (hidden) return null;

  const filledCount = Math.round(progress * 20);
  const barStr = `[${'#'.repeat(filledCount)}${'.'.repeat(20 - filledCount)}]`;
  const percentStr = `${String(Math.round(progress * 100)).padStart(3, '0')}%`;

  return (
    <section
      className={`ascii-startup ${leaving ? 'is-leaving' : ''}`}
      aria-label="Portfolio startup"
      aria-live="polite"
      onWheel={(e) => e.preventDefault()}
      onTouchMove={(e) => e.preventDefault()}
    >
      <div className="ascii-startup__top">
        <span>KHA/PORTFOLIO_OS</span>
      </div>

      <div className="ascii-startup__core">
        <pre className="ascii-startup__art" aria-hidden="true">
          {artText}
        </pre>

        <div className="ascii-startup__log" aria-hidden="true">
          <div className={`ascii-startup__row ${stepState[0] === 'READ' ? 'is-live' : ''} ${stepState[0] === 'OK' ? 'is-done' : ''}`}>
            <span className="ascii-startup__index">01</span>
            <span>reading working files</span>
            <span className="ascii-startup__result">{stepState[0]}</span>
          </div>
          <div className={`ascii-startup__row ${stepState[1] === 'READ' ? 'is-live' : ''} ${stepState[1] === 'OK' ? 'is-done' : ''}`}>
            <span className="ascii-startup__index">02</span>
            <span>mapping projects and experiments</span>
            <span className="ascii-startup__result">{stepState[1]}</span>
          </div>
          <div className={`ascii-startup__row ${stepState[2] === 'READ' ? 'is-live' : ''} ${stepState[2] === 'OK' ? 'is-done' : ''}`}>
            <span className="ascii-startup__index">03</span>
            <span>opening personal environment</span>
            <span className="ascii-startup__result">{stepState[2]}</span>
          </div>

          <div className="ascii-startup__progress">
            <span>{barStr}</span> <span className="ascii-startup__percent">{percentStr}</span>
          </div>
        </div>
      </div>

      <div className="ascii-startup__bottom">
        <span><span className="ascii-startup__signal">●</span> LOCAL SESSION</span>
      </div>
    </section>
  );
}

const HERO_GLYPHS = ' .,:;!|/\\(){}[]<>irsxXzZaomwqpdbkhao*#MW&8%B@$';
const HERO_WORDS = [
  'ARJUN', 'SAVYASACHI', 'VISIBLE CONFUSION', 'ALINA', 'ADITI', 'LUMENSPACE', 'µLEARN', 'TINKERHUB',
  'KSRTC', 'CHALO', 'TICKETING', 'PAYMENT', 'WORKFLOW', 'CONFIRMATION', 'RECOVERY', 'RESEARCH',
  'FIELDWORK', 'JOURNEY', 'DESIGN', 'PRODUCT', 'INTERACTION', 'SYSTEMS', 'INTERFACES', 'EXPERIMENTS',
  'PROTOTYPES', 'OBSERVATIONS', 'QUESTIONS', 'ITERATIONS', 'OBSERVE', 'QUESTION', 'UNDERSTAND', 'MAKE',
  'TEST', 'BREAK', 'RETHINK', 'REBUILD', 'SHIP', 'PROCESS', 'INPUT', 'OUTPUT', 'SIGNAL', 'NOISE', 'DEBUG',
  'STACK', 'BUFFER', 'CACHE', 'PROTOCOL', 'KERNEL', 'INSTANCE', 'THREAD', 'STATE', 'ERROR', 'RESPONSE',
  'REQUEST', 'TRACE', 'LOG', 'PING', 'UPTIME', 'CURIOUS', 'SKEPTICAL', 'NOSY', 'TINKERING', 'THINKING',
  'MAKING', 'QUESTIONING', 'EXPLORING', 'UNFINISHED', 'ITERATION', 'SIDE QUEST', 'ROUGH CUT', 'SCRATCH',
  'DRAFT', 'FAILURE', 'VERSION', 'BUILD', 'WIP',
] as const;
const HERO_CELL_W = 7;
const HERO_CELL_H = 11;

function heroClamp(value: number, min = 0, max = 1) {
  return Math.max(min, Math.min(max, value));
}

function heroHashNoise(x: number, y: number, seed = 0) {
  let n = (Math.imul(x, 374761393) + Math.imul(y, 668265263) + Math.imul(seed, 1442695041)) >>> 0;
  n = Math.imul(n ^ (n >>> 13), 1274126177) >>> 0;
  return ((n ^ (n >>> 16)) & 0xffff) / 65536;
}

function BlackHole() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d', { alpha: true });
    if (!context) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let width = 0;
    let height = 0;
    let columns = 0;
    let rows = 0;
    let frameId = 0;
    let lastFrame = 0;
    const started = performance.now();
    const particles = Array.from({ length: 18 }, (_, index) => ({
      phase: index * 0.349,
      speed: 0.2 + (index % 6) * 0.027,
      offset: (index * 1.37) % 7,
    }));

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      columns = Math.ceil(width / HERO_CELL_W);
      rows = Math.ceil(height / HERO_CELL_H);
      context.font = `500 ${HERO_CELL_H}px "Mona Sans Mono", "IBM Plex Mono", "SFMono-Regular", Consolas, monospace`;
      context.textBaseline = 'middle';
      context.textAlign = 'center';
    };

    const colorFor = (intensity: number, region: string) => {
      if (region === 'disk') {
        const red = Math.round(0 + 91 * intensity);
        const green = Math.round(55 + 118 * intensity);
        const blue = Math.round(92 + 103 * intensity);
        return `rgb(${red} ${green} ${blue})`;
      }
      if (region === 'dust') {
        const red = Math.round(0 + 38 * intensity);
        const green = Math.round(30 + 92 * intensity);
        const blue = Math.round(56 + 115 * intensity);
        return `rgb(${red} ${green} ${blue})`;
      }
      if (region === 'ring') {
        const red = Math.round(0 + 158 * intensity);
        const green = Math.round(93 + 116 * intensity);
        const blue = Math.round(150 + 91 * intensity);
        return `rgb(${red} ${green} ${blue})`;
      }
      const blue = Math.round(72 + 74 * intensity);
      return `rgb(${Math.round(blue * 0.32)} ${Math.round(blue * 0.67)} ${blue})`;
    };

    const draw = (now: number) => {
      const elapsed = reducedMotion.matches ? 3.4 : (now - started) / 1000;
      context.clearRect(0, 0, width, height);

      const cx = width * 0.5;
      const cy = height * 0.5;
      const horizon = Math.max(64, Math.min(width / 8.7, height / 3.25));
      const ringRadius = horizon * 1.18;
      const diskRadius = Math.min(width * 0.47, horizon * 6.2);
      const diskHalfHeight = Math.max(17, horizon * 0.31);

      for (let row = 0; row < rows; row += 1) {
        const py = row * HERO_CELL_H + HERO_CELL_H / 2;
        const y = py - cy;
        for (let column = 0; column < columns; column += 1) {
          const px = column * HERO_CELL_W + HERO_CELL_W / 2;
          const x = px - cx;
          const radius = Math.hypot(x, y * 1.08);
          const angle = Math.atan2(y * 1.08, x);
          let intensity = 0;
          let region = '';
          let glyph = '';

          const starNoise = heroHashNoise(column + Math.floor(elapsed * 0.55), row, 31);
          if (starNoise > 0.994 && radius > horizon * 1.8) {
            intensity = 0.14 + 0.3 * (0.5 + 0.5 * Math.sin(elapsed * 1.5 + column * 1.61 + row));
            region = 'star';
            glyph = intensity > 0.34 ? '+' : '.';
          }

          const radialPosition = Math.abs(x) / diskRadius;
          const turbulentWarp = Math.sin(x * 0.018 - elapsed * 1.4) * diskHalfHeight * 0.16;
          const warpedY = y - turbulentWarp;

          const dustHalfHeight = diskHalfHeight * 2.35 * Math.max(0.08, 1 - radialPosition);
          if (Math.abs(x) < diskRadius && Math.abs(warpedY) < dustHalfHeight && radius > horizon * 1.03) {
            const dustVertical = Math.abs(warpedY) / Math.max(dustHalfHeight, 1);
            const dustNoise = heroHashNoise(column + Math.floor(elapsed * 4), row, 73);
            const dustIntensity = heroClamp((1 - radialPosition) * (1 - dustVertical) * (0.2 + dustNoise * 0.46));
            if (dustIntensity > intensity && dustNoise > 0.27) {
              intensity = dustIntensity;
              region = 'dust';
              glyph = HERO_GLYPHS[Math.max(1, Math.floor(dustIntensity * (HERO_GLYPHS.length - 1)))];
            }
          }

          const bands = [
            { width: 1.72, speed: 1.8, frequency: 0.041, phase: 0.4, strength: 0.3 },
            { width: 1.3, speed: -2.8, frequency: 0.066, phase: 1.2, strength: 0.48 },
            { width: 0.91, speed: 4.2, frequency: 0.105, phase: 2.1, strength: 0.66 },
            { width: 0.58, speed: -6.1, frequency: 0.158, phase: 3.3, strength: 0.84 },
            { width: 0.3, speed: 8.4, frequency: 0.238, phase: 4.6, strength: 1.0 },
          ];
          for (const band of bands) {
            const availableHalfHeight = diskHalfHeight * band.width * Math.max(0.05, 1 - 0.5 * radialPosition);
            if (Math.abs(x) < diskRadius && Math.abs(warpedY) < availableHalfHeight && radius > horizon * 0.91) {
              const vertical = Math.abs(warpedY) / Math.max(availableHalfHeight, 1);
              const envelope = heroClamp((1 - radialPosition ** 1.85) * (1 - vertical ** 1.55));
              const stream = 0.58
                + 0.24 * Math.sin(x * band.frequency - elapsed * band.speed + Math.sin(y * 0.14))
                + 0.18 * Math.sin(x * band.frequency * 2.37 + elapsed * band.speed * 0.62 + band.phase);
              const beaming = 1 + 0.4 * (-x / diskRadius);
              const bandIntensity = heroClamp(envelope * stream * beaming * band.strength);
              if (bandIntensity > intensity) {
                intensity = bandIntensity;
                region = 'disk';
                glyph = HERO_GLYPHS[Math.floor(bandIntensity * (HERO_GLYPHS.length - 1))];
              }
            }
          }

          const shellRadii = [1.08, 1.36, 1.68];
          const shellStrengths = [0.32, 0.19, 0.11];
          for (let shell = 0; shell < shellRadii.length; shell += 1) {
            const shellDistance = Math.abs(radius - ringRadius * shellRadii[shell]);
            let shellIntensity = Math.exp(-((shellDistance / Math.max(8, horizon * (0.13 + shell * 0.035))) ** 2));
            shellIntensity *= shellStrengths[shell] * (0.72 + 0.28 * Math.sin(angle * (5 + shell * 2) - elapsed * (1.7 - shell * 0.25)));
            if (shellIntensity > intensity && shellIntensity > 0.055) {
              intensity = shellIntensity;
              region = shell === 0 ? 'ring' : 'dust';
              glyph = HERO_GLYPHS[Math.max(1, Math.floor(shellIntensity * (HERO_GLYPHS.length - 1)))];
            }
          }

          const spiralRadius = ringRadius * (1.55 + 0.34 * Math.sin(angle * 2.4 - elapsed * 0.8));
          const spiralDistance = Math.abs(radius - spiralRadius);
          const spiralNoise = heroHashNoise(column + Math.floor(elapsed * 2), row, 109);
          const spiralIntensity = Math.exp(-((spiralDistance / Math.max(7, horizon * 0.09)) ** 2)) * 0.28 * spiralNoise;
          if (spiralIntensity > intensity && spiralIntensity > 0.06) {
            intensity = spiralIntensity;
            region = 'dust';
            glyph = HERO_GLYPHS[Math.max(1, Math.floor(spiralIntensity * (HERO_GLYPHS.length - 1)))];
          }

          const ringDistance = Math.abs(radius - ringRadius);
          let lensIntensity = Math.exp(-((ringDistance / Math.max(4.5, horizon * 0.075)) ** 2));
          lensIntensity *= 0.74 + 0.22 * Math.sin(angle * 6 - elapsed * 3.1);
          if (lensIntensity > intensity && lensIntensity > 0.13) {
            intensity = heroClamp(lensIntensity);
            region = 'ring';
            glyph = HERO_GLYPHS[Math.max(1, Math.floor(intensity * (HERO_GLYPHS.length - 1)))];
          }

          if (radius < horizon) {
            glyph = '';
            intensity = 0;
            region = '';
          }

          for (const particle of particles) {
            const particleAngle = elapsed * particle.speed + particle.phase;
            const particleRadius = ringRadius * (1.82 - 0.075 * ((elapsed * 0.72 + particle.offset) % 7));
            const particleX = Math.cos(particleAngle) * particleRadius;
            const particleY = Math.sin(particleAngle) * particleRadius * 0.58;
            if (Math.abs(x - particleX) < HERO_CELL_W * 0.7 && Math.abs(y - particleY) < HERO_CELL_H * 0.62 && radius > horizon) {
              glyph = '*';
              intensity = 0.92;
              region = 'ring';
            }
          }

          if (glyph && glyph !== ' ') {
            context.fillStyle = colorFor(intensity, region);
            context.fillText(glyph, px, py);
          }
        }
      }

      const wordCount = width < 500 ? 7 : width < 900 ? 10 : 15;
      context.save();
      context.font = `600 ${Math.max(9, HERO_CELL_H - 1)}px "Mona Sans Mono", "IBM Plex Mono", "SFMono-Regular", Consolas, monospace`;
      context.textBaseline = 'middle';
      context.textAlign = 'center';

      for (let index = 0; index < wordCount; index += 1) {
        const duration = 4.8 + heroHashNoise(index, 17, 811) * 6.4;
        const timeOffset = heroHashNoise(index, 29, 823) * duration * 2.7 + index * 0.83;
        const entityTime = reducedMotion.matches ? timeOffset + duration * 0.5 : elapsed + timeOffset;
        const entityEpoch = Math.floor(entityTime / duration);
        const life = (entityTime % duration) / duration;
        const visibility = life >= 0.08 && life < 0.86 ? 1 : 0;
        if (visibility === 0) continue;

        const selector = heroHashNoise(index * 31 + entityEpoch * 17, entityEpoch * 13 + index, 401);
        const word = HERO_WORDS[Math.floor(selector * HERO_WORDS.length) % HERO_WORDS.length];
        const orbitSeed = heroHashNoise(index * 19, entityEpoch * 11, 503);
        const placementMode = index % 3;
        const direction = heroHashNoise(index, 43, 827) > 0.5 ? 1 : -1;
        const driftSpeed = 0.018 + heroHashNoise(index, 47, 829) * 0.032;
        const individualDrift = (life - 0.5) * direction;
        let wordX = cx;
        let wordY = cy;

        if (placementMode === 0) {
          let localX = (orbitSeed * 2 - 1) * diskRadius * 0.8;
          if (Math.abs(localX) < horizon * 1.32) localX += Math.sign(localX || 1) * horizon * 1.45;
          localX += individualDrift * diskRadius * 0.1;
          wordX = cx + localX;
          wordY = cy + Math.sin(localX * 0.018 - entityTime * 0.23) * diskHalfHeight * 0.16
            + (heroHashNoise(index, entityEpoch, 601) - 0.5) * diskHalfHeight * 1.25;
        } else {
          const initialAngle = orbitSeed * Math.PI * 2;
          const orbitalAngle = initialAngle + entityTime * driftSpeed * direction;
          const orbitalRadius = ringRadius * (1.16 + heroHashNoise(index, entityEpoch, 607) * 0.54);
          wordX = cx + Math.cos(orbitalAngle) * orbitalRadius;
          wordY = cy + Math.sin(orbitalAngle) * orbitalRadius * 0.94;
        }

        const measured = context.measureText(word).width;
        wordX = heroClamp(wordX, measured / 2 + 6, width - measured / 2 - 6);
        wordY = heroClamp(wordY, 10, height - 10);
        const emphasis = 0.38 + heroHashNoise(index, entityEpoch, 709) * 0.14;
        context.fillStyle = 'rgba(16, 17, 16, 0.34)';
        context.fillRect(wordX - measured / 2 - 2, wordY - 6, measured + 4, 12);
        context.fillStyle = `rgba(126, 199, 236, ${emphasis})`;
        context.fillText(word, wordX, wordY);
      }
      context.restore();
    };

    const loop = (now: number) => {
      if (now - lastFrame >= 1000 / 24) {
        draw(now);
        lastFrame = now;
      }
      frameId = requestAnimationFrame(loop);
    };

    resize();
    window.addEventListener('resize', resize);
    frameId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="black-hole" aria-label="Animated ASCII black hole" role="img" />;
}

function App() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [showResume, setShowResume] = useState(false);
  const [openArchive, setOpenArchive] = useState<number | null>(null);
  const [mobileNav, setMobileNav] = useState(false);
  const [section, setSection] = useState('boot');

  useEffect(() => {
    const ids = ['boot', 'who-am-i', 'projects', 'archive', 'about', 'next', 'contact'];
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => entry.isIntersecting && setSection(entry.target.id));
    }, { rootMargin: '-30% 0px -60% 0px' });
    ids.forEach(id => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  const go = (id: string) => {
    setMobileNav(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };
  const closeProject = () => {
    const slug = activeProject?.slug;
    setActiveProject(null);
    requestAnimationFrame(() => document.querySelector<HTMLElement>(`[data-project-trigger="${slug}"]`)?.focus());
  };

  return <><AsciiStartup /><div className="site-shell">
    <header className="topbar">
      <button className="wordmark" onClick={() => go('boot')}>K H Arjun</button>
      <nav className="desktop-nav" aria-label="Primary navigation">
        {['projects', 'archive', 'about', 'next', 'contact'].map(item => <button key={item} className={section === item ? 'active' : ''} onClick={() => go(item)}>/{item}</button>)}
      </nav>
      <div className="topbar-right">
        <LiveClock />
        <div className="status"><i/><span>{section === 'boot' ? 'SYSTEM READY' : `/${section}`}</span></div>
      </div>
      <button className="mobile-menu" onClick={() => setMobileNav(!mobileNav)} aria-label="Toggle navigation">{mobileNav ? <X/> : <Menu/>}</button>
    </header>

    {mobileNav && <div className="mobile-nav">{['projects','archive','about','next','contact'].map((item, i) => <button key={item} onClick={() => go(item)}><span>0{i+1}</span>/{item}<ArrowRight/></button>)}</div>}

    <main>
      <section id="boot" className="boot-section">
        <Command>portfolio --open</Command>
        <div className="hero-composition">
          <h1>I'VE BEEN MAKING THINGS FOR A WHILE.</h1>
          <div className="visual">
            <BlackHole />
          </div>
          <p className="hero-subtext">Some became projects. Some became experience. Some became lessons.</p>
        </div>
        <button className="continue" onClick={() => go('who-am-i')}><ArrowDown size={15}/> continue</button>
        <div className="boot-index">PERSONAL ENVIRONMENT<br/>REV. 26.09 / ONLINE</div>
      </section>

      <section id="who-am-i" className="who-section section-pad">
        <Command>who-am-i</Command>
        <div className="section-heading who-heading"><ScrollLetterReveal text="HERE'S WHAT I ACTUALLY WANT YOU TO KNOW." breaks={[23]}/><span>03 STATEMENTS<br/>NO BIOGRAPHY</span></div>
        <div className="statements">
          {systemStatements.map(s => <article key={s.n} className="statement"><span>{s.n}</span><h2>{s.title}</h2><p>{s.copy}</p></article>)}
        </div>
      </section>

      <section id="projects" className="work-section section-pad">
        <Command>ls /projects</Command>
        <div className="section-heading work-heading"><ScrollLetterReveal text="THREE THINGS THAT MADE IT OUT." breaks={[18]}/><span>CLICK A COMMAND<br/>TO OPEN</span></div>
        <div className="project-list project-card-grid">
          {projects.map(project => <article key={project.slug} className="project-row project-card">
            <div className="project-preview"><ProjectVisual slug={project.slug} compact/></div>
            <div className="project-meta"><span>{project.number}</span><span>{project.year}</span><span>{project.kind}</span><span>{project.status}</span></div>
            <h2>{project.name}</h2>
            <p>{project.line}</p>
            <button className="open-command" data-project-trigger={project.slug} onClick={() => setActiveProject(project)}><span>$</span> open {project.name}<ArrowRight size={16}/></button>
          </article>)}
        </div>
        <div className="projects-more-bar">
          <a href="https://behance.net/arjunkh" target="_blank" rel="noreferrer" className="btn-view-more-behance">
            VIEW MORE WORKS <ExternalLink size={16}/>
          </a>
        </div>
      </section>

      <section id="archive" className="archive-section section-pad">
        <Command>ls /archive</Command>
        <div className="section-heading archive-heading"><ScrollLetterReveal text="NOT EVERYTHING MADE IT." breaks={[15]}/><span>FAILED OPENLY<br/>LEARNED QUIETLY</span></div>
        <div className="archive-list">
          {archiveItems.map((item, i) => {
            const open = openArchive === i;
            return <article key={item.number} className={`archive-item ${open ? 'open' : ''}`}>
              <button onClick={() => setOpenArchive(open ? null : i)} aria-expanded={open}>
                <span className="archive-no">{item.number}</span><h3>{item.title}</h3><span className="archive-year">{item.year}</span><span className="archive-status">{item.status}</span>{open ? <Minus/> : <Plus/>}
              </button>
              <div className="archive-detail"><div><span>WHAT IT WAS</span><p>{item.text}</p></div><div><span>WHAT REMAINED</span><p>{item.lesson}</p></div></div>
            </article>
          })}
        </div>
      </section>

      <section id="about" className="about-section section-pad">
        <Command>cat /about</Command>
        <div className="about-grid">
          <ScrollLetterReveal text="WHO'S BEHIND ALL THIS?" breaks={[13]}/>
          <div className="about-copy"><p>I'm Arjun, a product designer working across UI/UX, interaction design and visual communication. I use field research, journey mapping and prototypes to turn evidence into clearer decisions.</p><dl><div><dt>NOW</dt><dd>UX Design Intern<br/>Experion Technologies</dd></div><div><dt>BASED</dt><dd>Kerala, India<br/>Open to junior product design opportunities</dd></div><div><dt>EXPERIENCE</dt><dd>2+ years across product, brand and digital communication</dd></div><div><dt>EDUCATION</dt><dd>B.Tech, Artificial Intelligence and Machine Learning</dd></div></dl></div>
        </div>
      </section>

      <section className="capabilities-section section-pad">
        <Command>./what-i-do</Command>
        <div className="section-heading capabilities-heading">
          <ScrollLetterReveal text="I CAN HELP WITH" breaks={[6]}/>
          <span>05 CAPABILITIES<br/>WHAT I DO</span>
        </div>
        <div className="statements capabilities-statements">
          {capabilitiesList.map(s => (
            <article key={s.n} className="statement capability-statement">
              <span>{s.n}</span>
              <h2>{s.title}</h2>
              <p>{s.copy}</p>
            </article>
          ))}
        </div>
        <p className="tools-line"><span>Things I use along the way:</span> Figma, code, research, paper, and unreasonable amounts of iteration.</p>
      </section>

      <section id="next" className="next-plans-section section-pad">
        <Command>cat /next</Command>
        <div className="next-plans-heading"><ScrollLetterReveal text="WHERE THIS IS HEADING." breaks={[14]}/><span>FUTURE PLANS<br/>NOT ARRIVALS</span></div>
        <div className="next-plans-list">
          <article><span>01 / EDUCATION</span><h2>PURSUE A MASTER'S<br/>ABROAD.</h2><p>Go deeper into UX, experience a different design culture, and learn in an environment that changes how I see the work.</p><small>STATUS / PLANNING</small></article>
          <article><span>02 / PRODUCT STUDIO</span><h2>BUILD A PRODUCT<br/>STUDIO OF MY OWN.</h2><p>The long-term plan is to start an independent product studio for turning early ideas into useful, well-considered products.</p><small>STATUS / GREENLIT</small></article>
        </div>
      </section>

      <section className="resume-section section-pad">
        <Command>cat resume.pdf</Command>
        <div><p>WANT THE BORING VERSION?</p><a href="/arjun-kh-cv.pdf" onClick={(e) => { e.preventDefault(); setShowResume(true); }}>VIEW RÉSUMÉ <ExternalLink size={17}/></a></div>
      </section>

      <section id="contact" className="contact-section section-pad">
        <Command>./contact</Command>
        <ScrollLetterReveal text="IF YOU HAVE A PROBLEM WORTH SOLVING, LET'S TALK." breaks={[21,36]}/>
        <div className="contact-links"><a href="mailto:kharjun48@gmail.com">Email <ArrowRight/></a><a href="https://linkedin.com/in/kharjun" target="_blank" rel="noreferrer">LinkedIn <ArrowRight/></a><a href="https://behance.net/arjunkh" target="_blank" rel="noreferrer">Behance <ArrowRight/></a></div>
        <footer><span>ARJUN / PRODUCT DESIGNER</span><span>DESIGNED TO BE EXPLORED.<br/>BUILT TO GET OUT OF THE WAY.</span><button onClick={() => go('boot')}>↑ top</button></footer>
      </section>
    </main>
  </div>
  {activeProject && <ProjectDetail project={activeProject} close={closeProject}/>}
  {showResume && <ResumeDetail close={() => setShowResume(false)}/>}
  </>;
}

ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><App/></React.StrictMode>);
