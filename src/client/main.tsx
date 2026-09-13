import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { ArrowDown, ArrowLeft, ArrowRight, ExternalLink, Menu, Minus, Plus, X } from 'lucide-react';
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
  { slug:'ksrtc-workflow', number:'01', name:'ksrtc-workflow', year:'2026', kind:'UX research', status:'INDEPENDENT STUDY', accent:'#ff6542', line:'A payment error that happens before the ticket exists.', role:'Field research, journey mapping, interaction design', summary:'A self-initiated study of a recurring payment-mode error in the KSRTC Chalo ETM workflow. Not affiliated with KSRTC or Chalo.', observed:'Regular bus travel exposed a payment-mode failure before passenger confirmation, with no clear recovery after printing.', question:'How might payment be confirmed without slowing an already pressured ticketing workflow?', tried:'I combined field observation with a contextual interview, then mapped the journey across six stages.', result:'A lightweight confirmation before printing, supported by a Recent Tickets log for eligible cash corrections while preserving the audit trail.', learned:'When failure occurs before the visible output, prevention is usually more useful than repair. Feedback is welcome. This study may contain mistakes.' },
  { slug:'tejasvi-26', number:'02', name:'tejasvi-26', year:'2026', kind:'Brand system', status:'VERIFIED PROJECT', accent:'#ff884d', line:'A festival identity built around The Ritual of Fire.', role:'Design direction, identity, visual system', summary:'The end-to-end identity for Tejasvi 2026, Marian Engineering College’s intercollegiate cultural festival.', observed:'The festival needed a visual identity that could hold together many teams, formats and event moments.', question:'How can fire behave as a system instead of appearing as decoration?', tried:'I developed a Promethean flame mark, a Bella Sophie wordmark and a connected language of colour, typography and iconography.', result:'A complete visual system spanning posters, event communication and merchandise.', learned:'An identity becomes useful when other people can extend it without weakening it.' },
  { slug:'growit', number:'03', name:'growit', year:'2025', kind:'Product design', status:'PROJECT', accent:'#8aa0ff', line:'One distributor experience instead of disconnected workflows.', role:'Product design, information architecture, prototyping', summary:'A unified digital platform concept for mutual fund distributors.', observed:'Essential distributor activities were spread across fragmented workflows, increasing effort and reducing clarity.', question:'What should a distributor see and do when the product behaves like one system?', tried:'I reorganised key activities, clarified the information hierarchy and prototyped a consistent navigation model.', result:'A unified interface that gives essential activities a shared structure while keeping each workflow legible.', learned:'Consistency is not cosmetic. It reduces the amount of product logic a person has to relearn.' }
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
      <header className="project-modal-header"><div><span>PROJECT FILE / {project.number}</span><b>/work/{project.name}</b></div><button onClick={requestClose} aria-label={`Close ${project.name}`}><X size={20}/></button></header>
      <div className="project-modal-scroll">
        <section className="project-modal-intro"><div className="project-modal-title"><span>{project.year} / {project.kind} / {project.status}</span><h1 id={`project-title-${project.slug}`}>{project.name}</h1><p>{project.line}</p></div><div className="project-modal-meta"><div><span>ROLE</span><b>{project.role}</b></div><div><span>STATUS</span><b>{project.status}</b></div></div></section>
        <div className="project-modal-media"><ProjectVisual slug={project.slug}/></div>
        <section className="project-modal-story">
          <article><span>01 / OBSERVED</span><h2>{project.observed}</h2><p>{project.summary}</p></article>
          <article><span>02 / QUESTION</span><h2>{project.question}</h2></article>
          <article><span>03 / TRIED</span><h2>{project.tried}</h2></article>
          <article><span>04 / DIRECTION</span><h2>{project.result}</h2></article>
        </section>
        <section className="project-modal-learning"><span>WHAT I LEARNED</span><h2>{project.learned}</h2></section>
        <footer className="project-modal-footer"><p>Full project documentation is available on Behance.</p><a href="https://behance.net/arjunkh" target="_blank" rel="noreferrer">VIEW FULL WORK <ExternalLink size={17}/></a><button onClick={requestClose}><ArrowLeft size={16}/> BACK TO WORK</button></footer>
      </div>
    </div>
  </div>;
}
function App() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [openArchive, setOpenArchive] = useState<number | null>(null);
  const [mobileNav, setMobileNav] = useState(false);
  const [section, setSection] = useState('boot');

  useEffect(() => {
    const ids = ['boot', 'whoami', 'work', 'archive', 'about', 'next', 'contact'];
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

  return <><div className="site-shell">
    <header className="topbar">
      <button className="wordmark" onClick={() => go('boot')}>K H Arjun</button>
      <nav className="desktop-nav" aria-label="Primary navigation">
        {['work', 'archive', 'about', 'next', 'contact'].map(item => <button key={item} className={section === item ? 'active' : ''} onClick={() => go(item)}>/{item}</button>)}
      </nav>
      <div className="status"><i/><span>{section === 'boot' ? 'SYSTEM READY' : `/${section}`}</span></div>
      <button className="mobile-menu" onClick={() => setMobileNav(!mobileNav)} aria-label="Toggle navigation">{mobileNav ? <X/> : <Menu/>}</button>
    </header>

    {mobileNav && <div className="mobile-nav">{['work','archive','about','next','contact'].map((item, i) => <button key={item} onClick={() => go(item)}><span>0{i+1}</span>/{item}<ArrowRight/></button>)}</div>}

    <main>
      <section id="boot" className="boot-section">
        <Command>portfolio --open</Command>
        <div className="boot-copy">
          <h1>YOU'VE SEEN ENOUGH<br/><em>PORTFOLIOS.</em></h1>
          <p>So I'm not going to make another one.</p>
        </div>
        <button className="continue" onClick={() => go('whoami')}><ArrowDown size={15}/> continue</button>
        <div className="boot-index">PERSONAL ENVIRONMENT<br/>REV. 26.09 / ONLINE</div>
      </section>

      <section id="whoami" className="who-section section-pad">
        <Command>whoami</Command>
        <div className="section-heading who-heading"><ScrollLetterReveal text="HERE'S WHAT I ACTUALLY WANT YOU TO KNOW." breaks={[23]}/><span>03 STATEMENTS<br/>NO BIOGRAPHY</span></div>
        <div className="statements">
          {systemStatements.map(s => <article key={s.n} className="statement"><span>{s.n}</span><h2>{s.title}</h2><p>{s.copy}</p></article>)}
        </div>
      </section>

      <section id="work" className="work-section section-pad">
        <Command>ls /work</Command>
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
        <div className="capabilities-grid"><ScrollLetterReveal text="I CAN HELP WITH" breaks={[6]}/><ol>
          <li><span>01</span>Making sense of messy problems.</li><li><span>02</span>Turning ideas into interfaces.</li><li><span>03</span>Figuring out why something isn't working.</li><li><span>04</span>Making prototypes when words aren't enough.</li><li><span>05</span>Making ugly products less ugly.</li>
        </ol></div>
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
        <div><p>WANT THE BORING VERSION?</p><a href="/arjun-kh-cv.pdf" target="_blank" rel="noreferrer">VIEW RÉSUMÉ <ExternalLink size={17}/></a></div>
      </section>

      <section id="contact" className="contact-section section-pad">
        <Command>./contact</Command>
        <ScrollLetterReveal text="IF YOU HAVE A PROBLEM WORTH SOLVING, LET'S TALK." breaks={[22,37]}/>
        <div className="contact-links"><a href="mailto:kharjun48@gmail.com">Email <ArrowRight/></a><a href="https://linkedin.com/in/kharjun" target="_blank" rel="noreferrer">LinkedIn <ArrowRight/></a><a href="https://behance.net/arjunkh" target="_blank" rel="noreferrer">Behance <ArrowRight/></a></div>
        <footer><span>ARJUN / PRODUCT DESIGNER</span><span>DESIGNED TO BE EXPLORED.<br/>BUILT TO GET OUT OF THE WAY.</span><button onClick={() => go('boot')}>↑ top</button></footer>
      </section>
    </main>
  </div>{activeProject && <ProjectDetail project={activeProject} close={closeProject}/>}</>;
}

ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><App/></React.StrictMode>);
