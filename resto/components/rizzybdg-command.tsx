"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion, useScroll, useSpring, useInView, AnimatePresence, animate,
} from "framer-motion";
import {
  Menu, X, ArrowUpRight, Lock, ChevronDown, Check, Mail, Crosshair,
  ShieldCheck, Timer, Users, ThumbsUp, RotateCcw, Play,
} from "lucide-react";
import { FaFacebookF, FaQuoteLeft } from "react-icons/fa";
import { GiBroadsword, GiPadlock } from "react-icons/gi";
import { PiTargetBold } from "react-icons/pi";

// ─── CONFIG — swap per client ────────────────────────────────────────────────
const BRAND = {
  name: "RIZZYBDG",
  tag: "SELF-COMMAND",
  line: "I help men kill what keeps them weak & take back command.",
  protocolUrl: "https://stan.store/rizzybdg/p/the-urge-protocol",
  email: "rizzy@rizzybdg.com",
  facebook: "https://facebook.com/rizzybdg",
  followers: 131,
  reactions: 942,
  months: 21,
  price: "$9",
};

// Unsplash images (swap any ID). Broken images hide themselves and the dark overlay remains.
const u = (id: string, w = 1600) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;
const IMG = {
  hero: u("1517836357463-d25dfeac3438"),
  gym: u("1534438327276-14e5300c3a48"),
  night: u("1519681393784-d120267933ba"),
  mountain: u("1500530855697-b586d89ba3ee"),
  fog: u("1470071459604-3b5ec3a7fe05", 900),
  city: u("1519501025264-65ba15a82390", 900),
  plan: u("1484480974693-6ca0a78fb36b", 900),
  runner: u("1476480862126-209bfaa8edc8", 900),
  train: u("1541534741688-6078c6bfb5c5", 900),
  sunrise: u("1552674605-db6ffd4facb5"),
};

const NAV = ["System", "Protocol", "Coaching", "Proof", "FAQ"];
const TICKER = ["SELF-COMMAND", "PICK YOUR HARD", "SYSTEM > WILLPOWER", "STOP BEING OWNED", "KEEP YOUR WORD. REPEAT.", "MASTER THE RESPONSE", "BUILD YOURSELF FOR YOURSELF"];

const TRIGGERS = [
  { n: "01", t: "Boredom", d: "An empty hour is an open door. Most relapses are decided long before the urge arrives.", img: IMG.city },
  { n: "02", t: "Isolation", d: "Alone, tired and scrolling. The urge feeds on silence and nobody watching.", img: IMG.fog },
  { n: "03", t: "No plan", d: "Motivation shows up when it feels like it. A system shows up every time.", img: IMG.plan },
];

const STEPS = [
  { n: "01", s: "0:60 → 0:41" },
  { n: "02", s: "0:40 → 0:21" },
  { n: "03", s: "0:20 → 0:00" },
];

const PILLARS = [
  { t: "Master the response", d: "Feel the anger, the jealousy, the frustration. Just never let them make the decision.", icon: <PiTargetBold size={22} />, img: IMG.runner },
  { t: "Earn self-respect", d: "It is built by the choices you make when nobody is watching. Start small. Keep your word. Repeat.", icon: <ShieldCheck size={22} />, img: IMG.mountain },
  { t: "Fall forward", d: "A relapse does not erase progress. What you do in the next hour is the test.", icon: <GiBroadsword size={22} />, img: IMG.train },
];

const PROOF = [
  { q: "[Swap in a real client result here. One sentence, their words, their first name.]", who: "Client name · Week 3" },
  { q: "[Second testimonial. Specific beats flattering: a number, a streak, a changed habit.]", who: "Client name · Day 40" },
  { q: "[Third testimonial. Screenshots of real DMs convert even better.]", who: "Client name · Month 2" },
];

const FAQ = [
  { q: "Is this for me?", a: "If you know what you should be doing and keep not doing it, yes. The protocol is built for the moment between the urge and the action." },
  { q: "What do I get for $9?", a: "A short, step-by-step protocol you can run in about 60 seconds when an urge hits. No long reading, no complicated routine." },
  { q: "How does 1:1 coaching work?", a: "You apply, Rizzy reviews your answers, and if it is a fit you get a personal plan and direct accountability. [Replace with your real process.]" },
  { q: "Is this therapy?", a: "No. This is coaching and self-discipline training, not medical or mental-health treatment. If you are in crisis, please contact a professional or local emergency service." },
];

const MONO = { fontFamily: "'JetBrains Mono', monospace" } as const;
const DISPLAY = { fontFamily: "'Anton', sans-serif" } as const;

// ─── helpers ─────────────────────────────────────────────────────────────────
function Photo({ src, className = "" }: { src: string; className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt="" loading="lazy" className={`h-full w-full object-cover ${className}`}
      onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
  );
}

/** Full-bleed background image + dark gradient overlay. Parent must be `relative overflow-hidden`. */
function Bg({ src, img = "opacity-40", grad = "from-black/85 via-black/70 to-[#0A0A0A]" }: { src: string; img?: string; grad?: string }) {
  return (
    <div className="pointer-events-none absolute inset-0 z-0">
      <Photo src={src} className={`${img} grayscale-40 contrast-110`} />
      <div className={`absolute inset-0 bg-linear-to-b ${grad}`} />
    </div>
  );
}

function Count({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inV = useInView(ref, { once: true });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inV) return;
    const c = animate(0, to, { duration: 1.6, ease: "easeOut", onUpdate: (x) => setV(Math.round(x)) });
    return () => c.stop();
  }, [inV, to]);
  return <span ref={ref}>{v}{suffix}</span>;
}

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inV = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} className={className} initial={{ opacity: 0, y: 36 }}
      animate={inV ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

function Marquee() {
  const items = [...TICKER, ...TICKER];
  return (
    <div className="mx-3 my-4 overflow-hidden rounded-full border border-[#2A2A2A] bg-[#FF3B1D] py-3 md:mx-6">
      <motion.div className="flex w-max gap-10 whitespace-nowrap" animate={{ x: ["0%", "-50%"] }} transition={{ duration: 28, ease: "linear", repeat: Infinity }}>
        {items.map((t, i) => (
          <span key={i} className="flex items-center gap-10 text-sm font-bold tracking-[0.25em] text-black">
            {t} <span className="h-1.5 w-1.5 rounded-full bg-black" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function UrgeTimer() {
  const [left, setLeft] = useState(60);
  const [run, setRun] = useState(false);
  useEffect(() => {
    if (!run) return;
    const id = setInterval(() => setLeft((s) => { if (s <= 1) { setRun(false); return 0; } return s - 1; }), 1000);
    return () => clearInterval(id);
  }, [run]);
  const done = left === 0;
  const step = left > 40 ? 0 : left > 20 ? 1 : 2;
  const R = 92, C = 2 * Math.PI * R;
  return (
    <div className="rounded-3xl border border-white/10 bg-black/60 p-6 backdrop-blur-xl md:p-8">
      <div className="mb-5 flex items-center justify-between text-xs tracking-[0.25em] text-[#8C877E]" style={MONO}>
        <span className="flex items-center gap-2"><Timer size={14} className="text-[#FF3B1D]" /> URGE CLOCK</span>
        <span className="rounded-full border border-white/10 px-3 py-1">{run ? "LIVE" : done ? "HELD" : "STANDBY"}</span>
      </div>
      <div className="relative mx-auto h-56 w-56">
        <svg viewBox="0 0 220 220" className="-rotate-90">
          <circle cx="110" cy="110" r={R} stroke="#222" strokeWidth="8" fill="none" />
          <motion.circle cx="110" cy="110" r={R} stroke="#FF3B1D" strokeWidth="8" fill="none" strokeLinecap="round"
            strokeDasharray={C} animate={{ strokeDashoffset: C * (1 - left / 60) }} transition={{ duration: 0.9, ease: "linear" }} />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-6xl text-[#EDE8DF]" style={DISPLAY}>{String(left).padStart(2, "0")}</div>
          <div className="mt-1 text-[10px] tracking-[0.3em] text-[#8C877E]" style={MONO}>SECONDS</div>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-3 gap-2">
        {STEPS.map((s, i) => (
          <div key={s.n} className={`rounded-3xl border p-3 text-center transition-colors ${run && step === i ? "border-[#FF3B1D] bg-[#FF3B1D]/10" : "border-white/10"}`}>
            <div className="text-[10px] tracking-widest text-[#8C877E]" style={MONO}>STEP {s.n}</div>
            <Lock size={14} className="mx-auto my-2 text-[#8C877E]" />
            <div className="text-[10px] text-[#6C675F]" style={MONO}>{s.s}</div>
          </div>
        ))}
      </div>
      <p className="mt-4 min-h-10 text-center text-sm text-[#BDB7AC]">
        {done ? "60 seconds held. That is the whole game." : run ? "Stay on the clock. Do not touch the phone." : "Press start. Feel what 60 seconds of holding the line is like."}
      </p>
      <div className="mt-3 flex gap-3">
        <button onClick={() => { if (done) setLeft(60); setRun((r) => !r); }}
          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#EDE8DF] py-3 text-sm font-bold tracking-widest text-black transition hover:bg-white">
          <Play size={14} /> {run ? "PAUSE" : done ? "RUN AGAIN" : "START"}
        </button>
        <button onClick={() => { setRun(false); setLeft(60); }} aria-label="Reset" className="rounded-full border border-white/10 px-5 text-[#BDB7AC] transition hover:border-[#FF3B1D] hover:text-[#FF3B1D]">
          <RotateCcw size={16} />
        </button>
      </div>
    </div>
  );
}

function Application() {
  const [sent, setSent] = useState(false);
  const [lvl, setLvl] = useState(7);
  const field = "w-full rounded-3xl border border-white/10 bg-black/50 px-5 py-3 text-sm text-[#EDE8DF] outline-none transition focus:border-[#FF3B1D]";
  return (
    <div className="rounded-3xl border border-white/10 bg-black/60 p-6 backdrop-blur-xl md:p-8">
      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div key="ok" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="py-10 text-center">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#FF3B1D] text-black"><Check size={28} /></div>
            <div className="text-3xl text-[#EDE8DF]" style={DISPLAY}>APPLICATION RECEIVED</div>
            <p className="mt-3 text-sm text-[#BDB7AC]">This is a demo, so nothing was sent. In the live version, it lands in Rizzy&#8217;s inbox, with no DM chasing.</p>
          </motion.div>
        ) : (
          <motion.form key="f" exit={{ opacity: 0 }} onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-4">
            {[{ l: "FIRST NAME", t: "text", p: "Your name" }, { l: "EMAIL", t: "email", p: "you@email.com" }].map((f) => (
              <label key={f.l} className="block">
                <span className="mb-1.5 block pl-2 text-[10px] tracking-[0.25em] text-[#8C877E]" style={MONO}>{f.l}</span>
                <input required type={f.t} placeholder={f.p} className={field} />
              </label>
            ))}
            <label className="block">
              <span className="mb-1.5 block pl-2 text-[10px] tracking-[0.25em] text-[#8C877E]" style={MONO}>WHAT ARE YOU TRYING TO KILL?</span>
              <select className={field}>
                <option>A habit that owns me</option><option>Procrastination</option><option>Post-breakup spiral</option><option>No discipline or routine</option>
              </select>
            </label>
            <label className="block">
              <span className="mb-1.5 flex justify-between px-2 text-[10px] tracking-[0.25em] text-[#8C877E]" style={MONO}>
                <span>HOW READY ARE YOU?</span><span className="text-[#FF3B1D]">{lvl}/10</span>
              </span>
              <input type="range" min={1} max={10} value={lvl} onChange={(e) => setLvl(+e.target.value)} className="w-full accent-[#FF3B1D]" />
            </label>
            <button className="flex w-full items-center justify-center gap-2 rounded-full bg-[#FF3B1D] py-4 text-sm font-bold tracking-[0.2em] text-black transition hover:bg-[#ff5a3f]">
              APPLY FOR 1:1 COACHING <ArrowUpRight size={16} />
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

const SECTION = "relative mx-3 my-4 overflow-hidden rounded-3xl border border-white/10 md:mx-6";
const EYEBROW = "mb-3 text-xs tracking-[0.3em] text-[#FF3B1D]";

// ─── PAGE ────────────────────────────────────────────────────────────────────
export default function RizzyCommand() {
  const [open, setOpen] = useState(false);
  const [faq, setFaq] = useState<number | null>(0);
  const { scrollYProgress } = useScroll();
  const bar = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });

  return (
    <div className="overflow-x-hidden bg-[#0A0A0A] text-[#EDE8DF]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=JetBrains+Mono:wght@400;600&family=Space+Grotesk:wght@400;500;700&display=swap');
        html{scroll-behavior:smooth}
        ::selection{background:#FF3B1D;color:#000}
        .grid-bg{background-image:linear-gradient(#ffffff0a 1px,transparent 1px),linear-gradient(90deg,#ffffff0a 1px,transparent 1px);background-size:64px 64px}
        .scan{background-image:repeating-linear-gradient(0deg,rgba(255,255,255,.03) 0 1px,transparent 1px 3px)}
        @keyframes glitch{0%,92%,100%{transform:translate(0);text-shadow:none}93%{transform:translate(-3px,1px);text-shadow:3px 0 #FF3B1D,-3px 0 #00E5FF}95%{transform:translate(3px,-1px);text-shadow:-3px 0 #FF3B1D,3px 0 #00E5FF}97%{transform:translate(-1px,0)}}
        .glitch{animation:glitch 5s infinite}
      `}</style>

      <motion.div style={{ scaleX: bar }} className="fixed left-0 right-0 top-0 z-60 h-0.75 origin-left rounded-r-full bg-[#FF3B1D]" />

      {/* NAV — floating pill */}
      <nav className="fixed left-1/2 top-4 z-50 w-[calc(100%-1.5rem)] max-w-6xl -translate-x-1/2">
        <div className="flex items-center justify-between rounded-full border border-white/10 bg-black/60 px-5 py-3 backdrop-blur-xl md:px-7">
          <a href="#" className="flex items-center gap-2">
            <Crosshair size={20} className="text-[#FF3B1D]" />
            <span className="text-xl tracking-wider" style={DISPLAY}>{BRAND.name}</span>
          </a>
          <div className="hidden items-center gap-8 md:flex">
            {NAV.map((n) => <a key={n} href={`#${n.toLowerCase()}`} className="text-xs tracking-[0.2em] text-[#8C877E] transition hover:text-[#FF3B1D]">{n.toUpperCase()}</a>)}
          </div>
          <a href={BRAND.protocolUrl} target="_blank" rel="noreferrer" className="hidden items-center gap-2 rounded-full bg-[#EDE8DF] px-5 py-2.5 text-xs font-bold tracking-widest text-black transition hover:bg-[#FF3B1D] md:flex">
            GET PROTOCOL · {BRAND.price} <ArrowUpRight size={14} />
          </a>
          <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">{open ? <X /> : <Menu />}</button>
        </div>
        <AnimatePresence>
          {open && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              className="mt-2 overflow-hidden rounded-3xl border border-white/10 bg-black/85 backdrop-blur-xl md:hidden">
              <div className="flex flex-col gap-5 px-6 py-6">
                {NAV.map((n, i) => (
                  <motion.a key={n} href={`#${n.toLowerCase()}`} onClick={() => setOpen(false)} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.05 }}
                    className="text-2xl" style={DISPLAY}>{n.toUpperCase()}</motion.a>
                ))}
                <a href={BRAND.protocolUrl} target="_blank" rel="noreferrer" className="rounded-full bg-[#FF3B1D] py-3 text-center text-sm font-bold tracking-widest text-black">GET THE PROTOCOL · {BRAND.price}</a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* HERO */}
      <section className={`${SECTION} mt-3 flex min-h-[96vh] items-center md:mt-4`}>
        <Bg src={IMG.hero} img="opacity-50" grad="from-black/80 via-black/60 to-[#0A0A0A]" />
        {/* <div className="grid-bg scan pointer-events-none absolute inset-0 z-[1]" /> */}
        <div className="pointer-events-none absolute -left-32 top-1/3 z-1 h-96 w-96 rounded-full bg-[#FF3B1D] opacity-[0.12] blur-[140px]" />
        <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-12 px-5 pb-16 pt-32 md:px-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-4 py-1.5 text-[10px] tracking-[0.3em] text-[#BDB7AC] backdrop-blur" style={MONO}>
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#FF3B1D]" /> {BRAND.tag} PROTOCOL · ONLINE
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.7 }}
              className="glitch text-[3.4rem] leading-[0.95] sm:text-7xl lg:text-[7.5rem]" style={DISPLAY}>
              SYSTEM <span className="text-[#FF3B1D]">&gt;</span><br />WILLPOWER.
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="mt-7 max-w-xl text-lg leading-relaxed text-[#D6D0C4]">
              {BRAND.line} Stop negotiating with the urge. Run the plan.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="mt-9 flex flex-wrap gap-4">
              <a href={BRAND.protocolUrl} target="_blank" rel="noreferrer" className="group flex items-center gap-3 rounded-full bg-[#FF3B1D] px-8 py-4 text-sm font-bold tracking-[0.2em] text-black transition hover:bg-[#ff5a3f]">
                KILL THE URGE · {BRAND.price} <ArrowUpRight size={16} className="transition group-hover:-translate-y-1 group-hover:translate-x-1" />
              </a>
              <a href="#coaching" className="rounded-full border border-white/40 bg-black/30 px-8 py-4 text-sm font-bold tracking-[0.2em] backdrop-blur transition hover:border-[#FF3B1D] hover:text-[#FF3B1D]">1:1 COACHING</a>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }} className="mt-12 grid max-w-lg grid-cols-3 gap-3">
              {[{ v: BRAND.followers, s: "K", l: "FOLLOWERS", i: <Users size={14} /> }, { v: BRAND.reactions, s: "K", l: "REACTIONS", i: <ThumbsUp size={14} /> }, { v: BRAND.months, s: "+", l: "MONTHS FREE", i: <ShieldCheck size={14} /> }].map((s) => (
                <div key={s.l} className="rounded-3xl border border-white/10 bg-black/45 p-4 backdrop-blur">
                  <div className="text-4xl" style={DISPLAY}><Count to={s.v} suffix={s.s} /></div>
                  <div className="mt-1 flex items-center gap-1.5 text-[9px] tracking-[0.2em] text-[#A8A298]" style={MONO}>{s.i}{s.l}</div>
                </div>
              ))}
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.7 }}><UrgeTimer /></motion.div>
        </div>
      </section>

      <Marquee />

      {/* SYSTEM */}
      <section id="system" className={`${SECTION} py-24`}>
        <Bg src={IMG.fog} img="opacity-25" grad="from-[#0A0A0A] via-[#0A0A0A]/90 to-[#0A0A0A]" />
        <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-10">
          <Reveal className="mb-14 max-w-2xl">
            <div className={EYEBROW} style={MONO}>// THE PROBLEM</div>
            <h2 className="text-5xl md:text-6xl" style={DISPLAY}>THE URGE IS NOT THE ENEMY. THE EMPTY HOUR IS.</h2>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-3">
            {TRIGGERS.map((t, i) => (
              <Reveal key={t.n} delay={i * 0.1}>
                <motion.div whileHover={{ y: -8 }} className="group h-full overflow-hidden rounded-3xl border border-white/10 bg-[#101010]/80 backdrop-blur transition-colors hover:border-[#FF3B1D]">
                  <div className="relative h-44 overflow-hidden">
                    <Photo src={t.img} className="grayscale transition duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-linear-to-t from-[#101010] via-black/40 to-black/10" />
                    <div className="absolute bottom-3 left-5 text-6xl text-[#FF3B1D]/80" style={DISPLAY}>{t.n}</div>
                  </div>
                  <div className="p-7">
                    <h3 className="text-2xl" style={DISPLAY}>{t.t.toUpperCase()}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-[#BDB7AC]">{t.d}</p>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROTOCOL */}
      <section id="protocol" className={`${SECTION} py-24`}>
        <Bg src={IMG.gym} img="opacity-45" grad="from-black/85 via-black/75 to-[#0A0A0A]" />
        <div className="relative z-10 mx-auto grid max-w-7xl gap-12 px-5 md:px-10 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <div className={EYEBROW} style={MONO}>// THE URGE PROTOCOL</div>
            <h2 className="text-5xl md:text-6xl" style={DISPLAY}>60 SECONDS. 3 STEPS. NO EXCUSES.</h2>
            <p className="mt-5 max-w-md text-[#D6D0C4]">A simple, step-by-step way to interrupt an urge before you act on it. No lengthy reading, no complicated routine. Something you can open the moment temptation hits.</p>
            <ul className="mt-6 space-y-3 text-sm text-[#D6D0C4]">
              {["Built from a system, not motivation", "Fast enough to use in the middle of an urge", `One-time ${BRAND.price}, instant access`].map((x) => (
                <li key={x} className="flex items-center gap-3"><span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#FF3B1D]/20"><Check size={14} className="text-[#FF3B1D]" /></span>{x}</li>
              ))}
            </ul>
            <a href={BRAND.protocolUrl} target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#EDE8DF] px-8 py-4 text-sm font-bold tracking-[0.2em] text-black transition hover:bg-[#FF3B1D]">
              GET THE PROTOCOL · {BRAND.price} <ArrowUpRight size={16} />
            </a>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/60 p-6 backdrop-blur-xl md:p-8">
              <div className="space-y-4">
                {STEPS.map((s, i) => (
                  <div key={s.n} className="flex items-center gap-5 rounded-3xl border border-white/10 p-5">
                    <div className="text-5xl text-[#FF3B1D]" style={DISPLAY}>{s.n}</div>
                    <div className="flex-1 space-y-2">
                      <div className="h-2.5 rounded-full bg-[#2E2E2E]" style={{ width: `${88 - i * 16}%` }} />
                      <div className="h-2.5 rounded-full bg-[#202020]" style={{ width: `${62 - i * 8}%` }} />
                    </div>
                    <GiPadlock size={22} className="text-[#8C877E]" />
                  </div>
                ))}
              </div>
              <div className="mt-5 text-center text-[10px] tracking-[0.3em] text-[#8C877E]" style={MONO}>UNLOCKS AFTER CHECKOUT</div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PILLARS */}
      <section className={`${SECTION} py-24`}>
        <Bg src={IMG.sunrise} img="opacity-25" grad="from-[#0A0A0A] via-[#0A0A0A]/90 to-[#0A0A0A]" />
        <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-10">
          <Reveal className="mb-14">
            <div className={EYEBROW} style={MONO}>// SELF-COMMAND</div>
            <h2 className="text-5xl md:text-6xl" style={DISPLAY}>THREE LAWS. ONE MAN.</h2>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-3">
            {PILLARS.map((p, i) => (
              <Reveal key={p.t} delay={i * 0.1}>
                <motion.div whileHover={{ y: -8 }} className="group relative h-full overflow-hidden rounded-3xl border border-white/10 transition-colors hover:border-[#FF3B1D]">
                  <div className="absolute inset-0"><Photo src={p.img} className="opacity-45 grayscale transition duration-700 group-hover:scale-110" /><div className="absolute inset-0 bg-linear-to-t from-black via-black/80 to-black/40" /></div>
                  <div className="relative flex h-full min-h-88 flex-col justify-end p-8">
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#FF3B1D] text-black">{p.icon}</div>
                    <h3 className="text-2xl" style={DISPLAY}>{p.t.toUpperCase()}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-[#D6D0C4]">{p.d}</p>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* STORY */}
      <section className={`${SECTION} py-28`}>
        <Bg src={IMG.night} img="opacity-55" grad="from-black/70 via-black/65 to-black/90" />
        <div className="relative z-10 mx-auto max-w-4xl px-5 text-center md:px-10">
          <Reveal>
            <FaQuoteLeft className="mx-auto mb-6 text-[#FF3B1D]" size={28} />
            <p className="text-3xl leading-snug md:text-5xl" style={DISPLAY}>
              I SPENT YEARS STRUGGLING. THEN I STOPPED RELYING ON MOTIVATION AND BUILT A SYSTEM. <span className="text-[#FF3B1D]">{BRAND.months}+ MONTHS FREE.</span>
            </p>
            <p className="mx-auto mt-7 inline-block rounded-full border border-white/15 bg-black/40 px-5 py-2 text-[10px] tracking-[0.2em] text-[#BDB7AC] backdrop-blur" style={MONO}>THE FOUNDER STORY, TOLD ON THE SITE, NOT BURIED IN A FEED</p>
          </Reveal>
        </div>
      </section>

      {/* COACHING */}
      <section id="coaching" className={`${SECTION} py-24`}>
        <Bg src={IMG.runner} img="opacity-30" grad="from-[#0A0A0A]/95 via-[#0A0A0A]/85 to-[#0A0A0A]" />
        <div className="relative z-10 mx-auto grid max-w-7xl gap-12 px-5 md:px-10 lg:grid-cols-2">
          <Reveal>
            <div className={EYEBROW} style={MONO}>// 1:1 COACHING</div>
            <h2 className="text-5xl md:text-6xl" style={DISPLAY}>APPLY. DON&#8217;T DM AND WAIT.</h2>
            <p className="mt-5 max-w-md text-[#D6D0C4]">Applications arrive organized and pre-qualified, so serious men get a faster answer and Rizzy stops sorting a flooded inbox. Prefer the old way? You can still DM &#8220;COMMAND&#8221; on Facebook.</p>
            <a href={BRAND.facebook} target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-3 rounded-full border border-white/20 bg-black/30 px-6 py-3 text-xs font-bold tracking-[0.2em] backdrop-blur transition hover:border-[#FF3B1D] hover:text-[#FF3B1D]">
              <FaFacebookF size={14} /> DM &#8220;COMMAND&#8221;
            </a>
          </Reveal>
          <Reveal delay={0.15}><Application /></Reveal>
        </div>
      </section>

      {/* PROOF */}
      <section id="proof" className={`${SECTION} py-24`}>
        <Bg src={IMG.mountain} img="opacity-35" grad="from-black/80 via-black/70 to-[#0A0A0A]" />
        <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-10">
          <Reveal className="mb-14 flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className={EYEBROW} style={MONO}>// PROOF</div>
              <h2 className="text-5xl md:text-6xl" style={DISPLAY}>RESULTS, ON THE RECORD.</h2>
            </div>
            <p className="max-w-xs rounded-full border border-white/10 bg-black/40 px-4 py-2 text-xs text-[#A8A298] backdrop-blur">Demo placeholders. Replace with real client results.</p>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-3">
            {PROOF.map((p, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut" }} className="h-full rounded-3xl border border-white/10 bg-black/55 p-7 backdrop-blur-xl">
                  <div className="mb-4 flex gap-1.5">{Array.from({ length: 5 }).map((_, k) => <span key={k} className="h-2 w-5 rounded-full bg-[#FF3B1D]" />)}</div>
                  <p className="text-sm leading-relaxed text-[#D6D0C4]">{p.q}</p>
                  <div className="mt-6 text-[10px] tracking-[0.25em] text-[#8C877E]" style={MONO}>{p.who.toUpperCase()}</div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className={`${SECTION} py-24`}>
        <Bg src={IMG.city} img="opacity-20" grad="from-[#0A0A0A] via-[#0A0A0A]/90 to-[#0A0A0A]" />
        <div className="relative z-10 mx-auto max-w-3xl px-5 md:px-10">
          <Reveal className="mb-10">
            <div className={EYEBROW} style={MONO}>// FAQ</div>
            <h2 className="text-5xl" style={DISPLAY}>STRAIGHT ANSWERS.</h2>
          </Reveal>
          <div className="space-y-3">
            {FAQ.map((f, i) => (
              <div key={f.q} className={`overflow-hidden rounded-3xl border bg-black/50 backdrop-blur transition-colors ${faq === i ? "border-[#FF3B1D]" : "border-white/10"}`}>
                <button onClick={() => setFaq(faq === i ? null : i)} className="flex w-full items-center justify-between px-6 py-5 text-left text-lg">
                  {f.q}<motion.span animate={{ rotate: faq === i ? 180 : 0 }}><ChevronDown size={20} className="text-[#FF3B1D]" /></motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {faq === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <p className="px-6 pb-5 text-sm leading-relaxed text-[#BDB7AC]">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className={`${SECTION} bg-[#FF3B1D] py-28 text-black`}>
        <div className="pointer-events-none absolute inset-0 z-0">
          <Photo src={IMG.hero} className="opacity-30 mix-blend-multiply grayscale" />
          <div className="absolute inset-0 bg-linear-to-b from-[#FF3B1D]/60 via-[#FF3B1D]/30 to-[#FF3B1D]/80" />
        </div>
        <div className="relative z-10 mx-auto max-w-5xl px-5 text-center md:px-10">
          <Reveal>
            <h2 className="text-5xl leading-none md:text-8xl" style={DISPLAY}>STOP BEING OWNED.</h2>
            <p className="mx-auto mt-5 max-w-lg text-lg font-medium">Take command of your attention, your decisions, your purpose. It starts with the next 60 seconds.</p>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <a href={BRAND.protocolUrl} target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-full bg-black px-8 py-4 text-sm font-bold tracking-[0.2em] text-[#EDE8DF] transition hover:bg-[#222]">GET THE PROTOCOL · {BRAND.price} <ArrowUpRight size={16} /></a>
              <a href="#coaching" className="rounded-full border-2 border-black px-8 py-4 text-sm font-bold tracking-[0.2em] transition hover:bg-black hover:text-[#FF3B1D]">APPLY FOR COACHING</a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="mx-3 mb-4 rounded-3xl border border-white/10 bg-[#0E0E0E] py-10 md:mx-6">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-5 md:flex-row md:px-10">
          <div className="flex items-center gap-2"><Crosshair size={18} className="text-[#FF3B1D]" /><span className="text-lg tracking-wider" style={DISPLAY}>{BRAND.name}</span></div>
          <div className="flex items-center gap-4 text-sm text-[#8C877E]">
            <a href={`mailto:${BRAND.email}`} className="flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 transition hover:border-[#FF3B1D] hover:text-[#FF3B1D]"><Mail size={14} />{BRAND.email}</a>
            <a href={BRAND.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 transition hover:border-[#FF3B1D] hover:text-[#FF3B1D]"><FaFacebookF size={14} /></a>
          </div>
          <p className="max-w-xs text-center text-[10px] leading-relaxed text-[#6C675F] md:text-right">Coaching, not therapy or medical treatment. Concept demo by GTECH.</p>
        </div>
      </footer>
    </div>
  );
}