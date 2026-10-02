"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { FiPhone, FiMapPin, FiClock, FiInstagram, FiMenu, FiX, FiCheck, FiArrowRight } from "react-icons/fi";
import { FaStar, FaRegStar } from "react-icons/fa";
import { RiInstagramLine } from "react-icons/ri";
import { BsTelephoneFill } from "react-icons/bs";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { Sparkles, MapPin, Phone, Clock, CheckCircle, ChevronDown } from "lucide-react";

// ─── TYPES ────────────────────────────────────────────────────────────────────
interface NavLink { label: string; href: string; }
interface ServiceCard { title: string; desc: string; img: string; tag: string; }
interface ReviewCard { name: string; initials: string; date: string; text: string; }
interface GalleryItem { img: string; label: string; }
interface ProcessStep { num: string; icon: string; title: string; desc: string; }

// ─── DATA ─────────────────────────────────────────────────────────────────────
const NAV_LINKS: NavLink[] = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Reviews", href: "#reviews" },
  { label: "Gallery", href: "#gallery" },
];

const SERVICES: ServiceCard[] = [
  {
    title: "Custom Tattoos",
    img: "https://images.unsplash.com/photo-1542856391-010fb87dcfed?w=800&auto=format&fit=crop",
    tag: "Most Popular",
    desc: "Every design is crafted specifically for you   your story, your vision, your skin. No flash. Pure original artwork.",
  },
  {
    title: "Cover-Up Tattoos",
    img: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&auto=format&fit=crop",
    tag: "Transformation",
    desc: "Turn what you regret into something you love. Jose specializes in seamless cover-ups that look flawless.",
  },
  {
    title: "Fine Line Work",
    img: "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=800&auto=format&fit=crop",
    tag: "Precision",
    desc: "Delicate, razor-sharp linework executed with surgical precision. Minimal, timeless, and deeply personal.",
  },
  {
    title: "Black & Grey",
    img: "https://images.unsplash.com/photo-1604881991720-f91add269bed?w=800&auto=format&fit=crop",
    tag: "Classic Art",
    desc: "Rich tonal depth and photorealistic shading. The art form at its most dramatic and enduring.",
  },
];

const REVIEWS: ReviewCard[] = [
  {
    name: "Jacob Allen",
    initials: "JA",
    date: "2 months ago",
    text: "Amazing experience from start to finish. Super professional, clean, and welcoming. Jose brought my idea to life perfectly, with incredible detail and precision. Will definitely be back!",
  },
  {
    name: "Nancy Evora",
    initials: "NE",
    date: "9 months ago",
    text: "I HIGHLY recommend Anew Tattoo Co. Jose did an amazing job not just fixing my old tattoo, but making it look 10x better. His attention to detail is unmatched.",
  },
  {
    name: "Oak7",
    initials: "OA",
    date: "A year ago",
    text: "First tattoo experience and I felt so welcomed and safe. Jose took his time to make sure everything came out great. I can tell he genuinely cares more about the work than the money.",
  },
];

const GALLERY: GalleryItem[] = [
  // { img: "https://images.unsplash.com/photo-1561573969-b5c3a6d0ae1a?w=800&auto=format&fit=crop", label: "Custom Work" },
  { img: "https://images.unsplash.com/photo-1542856391-010fb87dcfed?w=800&auto=format&fit=crop", label: "Fine Line" },
  { img: "https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=800&auto=format&fit=crop", label: "Black & Grey" },
  { img: "https://images.unsplash.com/photo-1542856391-010fb87dcfed?w=800&auto=format&fit=crop", label: "Cover-Up" },
  { img: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=800&auto=format&fit=crop", label: "Portrait" },
  { img: "https://images.unsplash.com/photo-1588515724527-074a7a56616c?w=800&auto=format&fit=crop", label: "Sleeve" },
];

const PROCESS: ProcessStep[] = [
  { num: "01", icon: "💬", title: "Consultation", desc: "We talk through your vision, placement, size, and style. No pressure. Just honest conversation." },
  { num: "02", icon: "✏️", title: "Design & Sketch", desc: "Jose creates a custom design tailored to your body and story. You approve before any ink touches skin." },
  { num: "03", icon: "🖊️", title: "Tattoo Session", desc: "Clean, sterile environment. Meticulous technique. A comfortable, professional experience throughout." },
  { num: "04", icon: "✨", title: "Healing & Aftercare", desc: "We walk you through proper aftercare so your tattoo heals beautifully and stays vibrant for life." },
];

// ─── FONTS (injected via style tag) ───────────────────────────────────────────
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Crimson+Text:ital,wght@0,400;0,600;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&family=Cinzel:wght@400;600&display=swap');
    :root {
      --gold: #c9a84c;
      --gold-light: #e8c97a;
      --gold-dim: rgba(201,168,76,0.14);
      --pink: #d4627a;
      --pink-dim: rgba(212,98,122,0.14);
      --black: #080808;
      --gray-dark: #111111;
      --gray-mid: #1a1a1a;
      --white: #f5f0ea;
      --muted: rgba(245,240,234,0.5);
    }
    html { scroll-behavior: smooth; }
    body { background: var(--black); color: var(--white); font-family: 'DM Sans', sans-serif; }
    ::-webkit-scrollbar { width: 3px; }
    ::-webkit-scrollbar-track { background: var(--black); }
    ::-webkit-scrollbar-thumb { background: var(--gold); border-radius: 2px; }
    .crimson { font-family: 'Crimson Text', serif; }
    .cinzel  { font-family: 'Cinzel', serif; }
    input::placeholder, textarea::placeholder { color: rgba(245,240,234,0.3); }
    select option { background: #1a1a1a; }
  `}</style>
);

// ─── HELPERS ──────────────────────────────────────────────────────────────────
const Stars = ({ n = 5 }: { n?: number }) => (
  <span style={{ display: "flex", gap: 2 }}>
    {Array.from({ length: 5 }).map((_, i) =>
      i < n
        ? <FaStar key={i} style={{ color: "#c9a84c", fontSize: 13 }} />
        : <FaRegStar key={i} style={{ color: "#c9a84c", fontSize: 13 }} />
    )}
  </span>
);

const Tag = ({ children }: { children: React.ReactNode }) => (
  <span className="flex items-center gap-2 text-xs tracking-widest uppercase mb-4"
    style={{ color: "var(--gold)", fontFamily: "'DM Sans', sans-serif" }}>
    <span style={{ width: 28, height: 1, background: "var(--gold)", display: "inline-block" }} />
    {children}
  </span>
);

const Divider = () => (
  <div style={{ width: 56, height: 1, background: "linear-gradient(90deg,var(--gold),var(--pink))", margin: "20px 0" }} />
);

// ─── NAVBAR ───────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between transition-all duration-500"
        style={{
          padding: scrolled ? "14px 40px" : "22px 40px",
          background: scrolled ? "rgba(8,8,8,0.9)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(201,168,76,0.15)" : "none",
        }}
      >
        {/* Logo */}
        <a href="#hero" className="no-underline" style={{ textDecoration: "none" }}>
          <span className="crimson text-2xl font-semibold tracking-wide" style={{ color: "var(--white)", letterSpacing: "0.04em" }}>
            Anew<span style={{ color: "var(--gold)" }}>Tattoo</span>{" "}
            <span style={{ fontStyle: "italic", color: "rgba(245,240,234,0.7)" }}>Co</span>
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-9 list-none">
          {NAV_LINKS.map(l => (
            <li key={l.href}>
              <a href={l.href}
                className="text-xs tracking-widest uppercase transition-colors duration-200 no-underline"
                style={{ color: "rgba(245,240,234,0.65)", fontFamily: "'DM Sans',sans-serif", fontWeight: 400 }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--gold)")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(245,240,234,0.65)")}
              >{l.label}</a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <a href="#booking"
          className="hidden rounded-2xl md:inline-flex items-center gap-2 text-xs tracking-widest uppercase font-medium no-underline transition-all duration-300"
          style={{
            background: "linear-gradient(135deg,var(--gold),var(--gold-light))",
            color: "var(--black)", padding: "12px 26px",
            boxShadow: "0 0 20px rgba(201,168,76,0.25)",
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(201,168,76,0.4)"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px rgba(201,168,76,0.25)"; }}
        >
          Book Now <HiOutlineArrowNarrowRight size={16} />
        </a>

        {/* Hamburger */}
        <button className="md:hidden bg-transparent border-none rounded-2xl cursor-pointer p-1" style={{ color: "var(--white)" }} onClick={() => setOpen(true)}>
          <FiMenu size={24} />
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-10"
            style={{ background: "rgba(8,8,8,0.97)", backdropFilter: "blur(24px)" }}
          >
            <button className="absolute top-6 right-7 bg-transparent border-none rounded-2xl cursor-pointer" style={{ color: "var(--white)" }} onClick={() => setOpen(false)}>
              <FiX size={28} />
            </button>
            {NAV_LINKS.map((l, i) => (
              <motion.a
                key={l.href} href={l.href}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                className="crimson no-underline transition-colors duration-200"
                style={{ fontSize: 38, color: "var(--white)", textDecoration: "none" }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--gold)")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--white)")}
                onClick={() => setOpen(false)}
              >{l.label}</motion.a>
            ))}
            <motion.a
              href="#booking" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.36 }}
              className="no-underline rounded-2xl text-sm tracking-widest uppercase font-medium"
              style={{ background: "linear-gradient(135deg,var(--gold),var(--gold-light))", color: "var(--black)", padding: "14px 36px" }}
              onClick={() => setOpen(false)}
            >Book Now</motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section id="hero" className="relative flex items-end justify-start overflow-hidden"
      style={{ minHeight: "100svh" }}>
      {/* BG */}
      <div className="absolute inset-0"
        style={{
          background: "url('https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=1600&auto=format&fit=crop') center/cover no-repeat",
        }} />
      {/* Overlay */}
      <div className="absolute inset-0"
        style={{ background: "linear-gradient(to top, rgba(8,8,8,1) 0%, rgba(8,8,8,0.7) 45%, rgba(8,8,8,0.2) 100%)" }} />
      {/* Glow */}
      <div className="absolute pointer-events-none"
        style={{ bottom: -80, left: -80, width: 480, height: 480, borderRadius: "50%", background: "radial-gradient(circle, rgba(201,168,76,0.1) 0%, transparent 70%)" }} />

      <div className="relative z-10 w-full max-w-3xl md:max-w-4xl" style={{ padding: "0 40px 30px" }}>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <Tag>Minneapolis, Minnesota · Premium Tattoo Studio</Tag>
        </motion.div>

        <motion.h1
          className="crimson font-semibold leading-none mb-5"
          style={{ fontSize: "clamp(52px,8vw,102px)", color: "var(--white)" }}
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
        >
          Art You Wear<br /><em style={{ color: "var(--gold)" }}>Forever.</em>
        </motion.h1>

        <motion.p
          className="mb-7"
          style={{ fontSize: 17, color: "rgba(245,240,234,0.65)", lineHeight: 1.75, maxWidth: 480 }}
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
        >
          Premium custom tattoos in Minneapolis, MN.<br />Precision. Detail. Expression.
        </motion.p>

        <motion.div
          className="md:inline-flex hidden  items-center gap-3 mb-9"
          style={{
            background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.25)",
            borderRadius: 40, padding: "8px 18px", fontSize: 13, color: "var(--gold)",
          }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}
        >
          <Stars /> &nbsp; 5.0 Stars · 10+ Minneapolis Clients
        </motion.div>

        <motion.div className="flex flex-wrap gap-4"
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
          <a href="tel:+15128870942"
            className="inline-flex rounded-2xl items-center gap-3 no-underline font-medium transition-all duration-300"
            style={{
              background: "linear-gradient(135deg,var(--gold),var(--gold-light))", color: "var(--black)",
              padding: "15px 30px", fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase",
              boxShadow: "0 0 24px rgba(201,168,76,0.3)",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
          >
            <BsTelephoneFill size={14} /> Call Now
          </a>
          <a href="#booking"
            className="inline-flex rounded-2xl items-center gap-3 no-underline transition-all duration-300"
            style={{
              background: "transparent", color: "var(--white)", border: "1px solid rgba(245,240,234,0.3)",
              padding: "14px 30px",fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--gold)"; (e.currentTarget as HTMLElement).style.color = "var(--gold)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(245,240,234,0.3)"; (e.currentTarget as HTMLElement).style.color = "var(--white)"; }}
          >
            Book Appointment <HiOutlineArrowNarrowRight size={16} />
          </a>
        </motion.div>
      </div>

      {/* Scroll hint */}
      {/* <motion.div
        className="absolute bottom-8 right-10 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}
        style={{ color: "rgba(245,240,234,0.3)", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase" }}
      >
        <ChevronDown size={18} />
      </motion.div> */}
    </section>
  );
}

// ─── STATS ────────────────────────────────────────────────────────────────────
function Stats() {
  const stats = [
    { num: " 5.0", label: "Star Rating" },
    { num: "9", label: "Reviews" },
    { num: "5+", label: "Years Experience" },
    { num: "∞", label: "Custom Designs" },
  ];
  return (
    <section style={{ background: "var(--gray-dark)", borderTop: "1px solid rgba(201,168,76,0.12)", borderBottom: "1px solid rgba(201,168,76,0.12)" }}>
      <div className="flex flex-wrap justify-center mx-auto" style={{ maxWidth: 1200, padding: "0 24px" }}>
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            className="flex flex-col items-center text-center"
            style={{
              flex: "1 1 180px", padding: "52px 32px",
              borderRight: i < stats.length - 1 ? "1px solid rgba(201,168,76,0.1)" : "none",
            }}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: i * 0.1 }}
          >
            <span className="crimson font-semibold mb-2" style={{ fontSize: 56, color: "var(--gold)", lineHeight: 1 }}>{s.num}</span>
            <span style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--muted)" }}>{s.label}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ─── SERVICES ─────────────────────────────────────────────────────────────────
function Services() {
  return (
    <section id="services" style={{ background: "var(--black)", padding: "100px 24px" }}>
      <div className="mx-auto" style={{ maxWidth: 1200 }}>
        <div className="text-center mb-16">
          <Tag>Our Craft</Tag>
          <h2 className="crimson font-semibold" style={{ fontSize: "clamp(36px,5vw,64px)" }}>
            What We <em style={{ color: "var(--gold)" }}>Do Best</em>
          </h2>
        </div>
        <div className="flex flex-wrap gap-6 justify-center">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.title}
              className="relative rounded-2xl overflow-hidden cursor-pointer"
              style={{ flex: "1 1 280px", maxWidth: 340 }}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8, boxShadow: "0 24px 60px rgba(201,168,76,0.2)" }}
            >
              <img src={s.img} alt={s.title} style={{ width: "100%", height: 340, objectFit: "cover", display: "block", transition: "transform 0.6s ease" }}
                onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.06)")}
                onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
              />
              <div className="absolute inset-0 flex flex-col justify-end"
                style={{ background: "linear-gradient(to top, rgba(8,8,8,0.95) 35%, transparent 80%)", padding: "28px 24px" }}>
                <span style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 8 }}>{s.tag}</span>
                <h3 className="crimson font-semibold mb-2" style={{ fontSize: 26 }}>{s.title}</h3>
                <p style={{ fontSize: 13, color: "rgba(245,240,234,0.6)", lineHeight: 1.7 }}>{s.desc}</p>
                <div style={{ marginTop: 14, borderTop: "1px solid rgba(201,168,76,0.2)", paddingTop: 10 }}>
                  <a href="#booking" className="inline-flex items-center gap-2 no-underline"
                    style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--gold)" }}>
                    Book This <FiArrowRight size={12} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── REVIEWS ──────────────────────────────────────────────────────────────────
function Reviews() {
  return (
    <section id="reviews" style={{ background: "var(--gray-dark)", padding: "100px 24px" }}>
      <div className="mx-auto" style={{ maxWidth: 1200 }}>
        <div className="text-center mb-14">
          <Tag>Client Love</Tag>
          <h2 className="crimson font-semibold" style={{ fontSize: "clamp(34px,5vw,60px)" }}>
            What People <em style={{ color: "var(--gold)" }}>Say</em>
          </h2>
        </div>
        <div className="flex flex-wrap gap-5 justify-center">
          {REVIEWS.map((r, i) => (
            <motion.div
              key={r.name}
              className="relative rounded-2xl"
              style={{
                flex: "1 1 280px", maxWidth: 360,
                background: "var(--gray-mid)",
               padding: "32px 28px",
              }}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.12 }}
              whileHover={{ borderColor: "rgba(201,168,76,0.35)", y: -4 }}
            >
              {/* Big quote */}
              <span className="crimson absolute pointer-events-none"
                style={{ fontSize: 100, lineHeight: 0.8, color: "rgba(201,168,76,0.07)", top: 20, left: 22 }}>"</span>
              <Stars />
              <p style={{ fontSize: 15, lineHeight: 1.8, color: "rgba(245,240,234,0.8)", margin: "16px 0 22px" }}>{r.text}</p>
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center font-semibold crimson"
                  style={{
                    width: 42, height: 42, borderRadius: "50%",
                    background: "linear-gradient(135deg,var(--gold),var(--pink))",
                    color: "var(--black)", fontSize: 16, flexShrink: 0,
                  }}>{r.initials}</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 500 }}>{r.name}</div>
                  <div style={{ fontSize: 12, color: "var(--muted)" }}>{r.date}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Overall rating row */}
        <motion.div
          className="flex rounded-2xl flex-wrap items-center justify-center gap-6 mt-14"
          style={{
            background: "var(--gold-dim)",  padding: "28px 40px",
          }}
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        >
          <span className="crimson font-semibold" style={{ fontSize: 64, color: "var(--gold)", lineHeight: 1 }}> 5.0</span>
          <div>
            <Stars n={5} />
            <p style={{ fontSize: 14, color: "rgba(245,240,234,0.6)", marginTop: 4 }}>Based on 9 Google Reviews</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── ABOUT ────────────────────────────────────────────────────────────────────
function About() {
  return (
    <section id="about" style={{ background: "var(--black)", padding: "100px 24px" }}>
      <div className="mx-auto flex flex-wrap gap-16 items-center" style={{ maxWidth: 1200 }}>
        {/* Image */}
        <motion.div
          className="relative" style={{ flex: "1 1 320px" }}
          initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8 }}
        >
          <img
            src="https://images.unsplash.com/photo-1611501275019-9b5cda994e8d?w=800&auto=format&fit=crop"
            alt="Jose at work"
            className="rounded-2xl"
            style={{ width: "100%", display: "block", aspectRatio: "4/5", objectFit: "cover" }}
          />
          <div className="rounded-2xl" style={{
            position: "absolute", bottom: -16, right: -16, width: "58%", height: "58%",
             zIndex: -1,
          }} />
          <div className="absolute rounded-2xl bottom-6 left-6 flex items-center gap-3"
            style={{
              background: "rgba(8,8,8,0.85)", backdropFilter: "blur(12px)",
              padding: "12px 18px",
            }}>
            <Sparkles size={18} style={{ color: "var(--gold)" } as React.CSSProperties} />
            <div>
              <div style={{ fontSize: 13, fontWeight: 500 }}>Jose</div>
              <div style={{ fontSize: 11, color: "var(--muted)" }}>Lead Artist · Anew</div>
            </div>
          </div>
        </motion.div>

        {/* Text */}
        <motion.div
          style={{ flex: "1 1 340px" }}
          initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8 }}
        >
          <Tag>The Artist</Tag>
          <h2 className="crimson font-semibold mb-4" style={{ fontSize: "clamp(34px,4vw,56px)" }}>
            Crafted with <em style={{ color: "var(--gold)" }}>Heart & Ink</em>
          </h2>
          <Divider />
          <p style={{ fontSize: 15, lineHeight: 1.85, color: "rgba(245,240,234,0.65)", marginBottom: 16 }}>
            Jose founded Anew Tattoo with a single belief: every client deserves art that tells their story   not something pulled from a flash sheet.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.85, color: "rgba(245,240,234,0.65)", marginBottom: 16 }}>
            With 5+ years of experience and an obsession for detail, he approaches every piece as a collaboration. The studio is clean, welcoming, and judgment-free.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.85, color: "rgba(245,240,234,0.65)", marginBottom: 32 }}>
            "I care more about the work than the money." That mindset shows in every line, every shade, every client who walks out a repeat customer.
          </p>

          <div className="flex flex-wrap gap-3">
            {["5+ Years Experience", "Client-First", "Sterile & Safe", "Custom Only"].map(b => (
              <span key={b} className="inline-flex rounded-2xl items-center gap-2"
                style={{
                  background: "var(--gold-dim)", padding: "8px 14px",
                  fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--gold)",
                }}>
                <FiCheck size={12} /> {b}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── GALLERY ──────────────────────────────────────────────────────────────────
function Gallery() {
  return (
    <section id="gallery" style={{ background: "var(--gray-dark)", padding: "100px 24px" }}>
      <div className="mx-auto" style={{ maxWidth: 1200 }}>
        <div className="text-center mb-12">
          <Tag>Ink Portfolio</Tag>
          <h2 className="crimson font-semibold" style={{ fontSize: "clamp(34px,5vw,60px)" }}>
            The <em style={{ color: "var(--gold)" }}>Work</em>
          </h2>
        </div>
        <div className="flex flex-wrap gap-3 justify-center">
          {GALLERY.map((g, i) => (
            <motion.div
              key={g.label}
              className="relative overflow-hidden cursor-pointer"
              style={{ flex: "1 1 200px", maxWidth: 270, borderRadius: 4, aspectRatio: "4/5" }}
              initial={{ opacity: 0, scale: 0.94 }} whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }} transition={{ delay: i * 0.08 }}
            >
              <img src={g.img} alt={g.label}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.5s ease" }}
                onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.08)")}
                onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300"
                style={{ background: "rgba(8,8,8,0.6)" }}
                onMouseEnter={e => (e.currentTarget.style.opacity = "1")}
                onMouseLeave={e => (e.currentTarget.style.opacity = "0")}
              >
                <span className="crimson" style={{ fontSize: 20, color: "var(--gold)", letterSpacing: "0.08em" }}>{g.label}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── PROCESS ──────────────────────────────────────────────────────────────────
function Process() {
  return (
    <section style={{ background: "var(--black)", padding: "100px 24px" }}>
      <div className="mx-auto" style={{ maxWidth: 1200 }}>
        <div className="text-center mb-14">
          <Tag>The Journey</Tag>
          <h2 className="crimson font-semibold" style={{ fontSize: "clamp(34px,5vw,60px)" }}>
            How It <em style={{ color: "var(--gold)" }}>Works</em>
          </h2>
        </div>
        <div className="flex flex-wrap gap-5 justify-center">
          {PROCESS.map((p, i) => (
            <motion.div
              key={p.title}
              className="rounded-2xl relative overflow-hidden"
              style={{
                flex: "1 1 220px", maxWidth: 268,
                background: "var(--gray-mid)",
                padding: "36px 26px",
              }}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              whileHover={{ borderColor: "rgba(201,168,76,0.3)", y: -4 }}
            >
              <span className="cinzel absolute pointer-events-none"
                style={{ fontSize: 70, fontWeight: 600, color: "rgba(201,168,76,0.06)", top: 10, right: 16, lineHeight: 1 }}>
                {p.num}
              </span>
              <span style={{ fontSize: 30, marginBottom: 18, display: "block" }}>{p.icon}</span>
              <h3 className="crimson font-semibold mb-3" style={{ fontSize: 23 }}>{p.title}</h3>
              <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.75 }}>{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── LOCATION ─────────────────────────────────────────────────────────────────
function Location() {
  const days = [
    { day: "Monday", time: "Closed" },
    { day: "Tuesday – Friday", time: "11 AM – 8 PM" },
    { day: "Saturday", time: "11 AM – 6 PM" },
    { day: "Sunday", time: "12 PM – 5 PM" },
  ];
  return (
    <section id="location" style={{ background: "var(--gray-dark)", padding: "100px 24px" }}>
      <div className="mx-auto flex flex-wrap gap-12 items-start" style={{ maxWidth: 1200 }}>
        {/* Info */}
        <motion.div
          style={{ flex: "1 1 300px" }}
          initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
        >
          <Tag>Find Us</Tag>
          <h2 className="crimson font-semibold mb-8" style={{ fontSize: "clamp(32px,4vw,52px)" }}>
            Visit the <em style={{ color: "var(--gold)" }}>Studio</em>
          </h2>

          {[
            { icon: <MapPin size={16} />, label: "Address", val: "2626 NE 2nd St Ste 82, Minneapolis,Minnesota " },
            { icon: <Phone size={16} />, label: "Phone", val: "+1 512-887-0942" },
            { icon: <Clock size={16} />, label: "Hours", val: null },
          ].map(item => (
            <div key={item.label} className="flex items-start gap-4 mb-7">
              <div className="rounded-2xl" style={{
                width: 40, height: 40, flexShrink: 0,
                background: "var(--gold-dim)", border: "1px solid rgba(201,168,76,0.2)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "var(--gold)",
              }}>{item.icon}</div>
              <div>
                <div style={{ fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 4 }}>{item.label}</div>
                {item.val
                  ? <div style={{ fontSize: 15, whiteSpace: "pre-line", lineHeight: 1.6 }}>{item.val}</div>
                  : <ul style={{ listStyle: "none", padding: 0 }}>
                    {days.map(d => (
                      <li key={d.day} className="flex justify-between" style={{ fontSize: 13, padding: "5px 0", borderBottom: "1px solid rgba(255,255,255,0.05)", color: "rgba(245,240,234,0.7)", gap: 20 }}>
                        <span>{d.day}</span><span style={{ color: d.day.includes("Tuesday") ? "var(--gold)" : "inherit" }}>{d.time}</span>
                      </li>
                    ))}
                  </ul>
                }
              </div>
            </div>
          ))}

          <a
            href="https://maps.google.com/?q=12636+Research+Blvd+c202+Austin+TX+78759"
            target="_blank" rel="noopener noreferrer"
            className="inline-flex rounded-2xl items-center gap-3 no-underline font-medium transition-all duration-300"
            style={{
              background: "linear-gradient(135deg,var(--gold),var(--gold-light))", color: "var(--black)",
              padding: "14px 28px", fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase",
              boxShadow: "0 0 20px rgba(201,168,76,0.25)", marginTop: 8,
            }}
          >
            <MapPin size={14} /> Get Directions
          </a>
        </motion.div>

        {/* Map */}
        <motion.div
          style={{ flex: "1 1 340px" }}
          initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
        >
          <div style={{ borderRadius: 4, overflow: "hidden", height: 420 }}>
            <iframe
              title="Anew Tattoo Co Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3440.9!2d-97.7517!3d30.4269!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8644cb8741e6d0b3%3A0x1!2s12636+Research+Blvd+%23C202%2C+Austin%2C+TX+78759!5e0!3m2!1sen!2sus!4v1"
              width="100%" height="100%" style={{ border: 0, display: "block" }} allowFullScreen loading="lazy" className="rounded-2xl"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── BOOKING FORM ─────────────────────────────────────────────────────────────
function Booking() {
  const [form, setForm] = useState({ name: "", phone: "", idea: "", style: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.phone.trim()) e.phone = "Phone is required";
    if (!form.idea.trim()) e.idea = "Tell us your idea";
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSent(true);
  };

  const inputStyle: React.CSSProperties = {
    background: "rgba(255,255,255,0.05)", border: "1px solid rgba(201,168,76,0.18)",
    borderRadius: 2, padding: "14px 16px", color: "var(--white)",
    fontFamily: "'DM Sans',sans-serif", fontSize: 14, width: "100%", outline: "none",
    transition: "border-color 0.2s",
  };

  const labelStyle: React.CSSProperties = {
    fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--muted)", display: "block", marginBottom: 7,
  };

  return (
    <section id="booking" className="relative"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1612538498456-e861df91d4d0?w=1400&auto=format&fit=crop')",
        backgroundSize: "cover", backgroundPosition: "center", backgroundAttachment: "fixed",
      }}>
      <div className="absolute inset-0" style={{ background: "rgba(8,8,8,0.9)" }} />
      <div className="relative z-10 mx-auto" style={{ maxWidth: 1200, padding: "100px 24px" }}>
        <div className="text-center mb-12">
          <Tag>Let&apos;s Create</Tag>
          <h2 className="crimson font-semibold" style={{ fontSize: "clamp(34px,5vw,60px)" }}>
            Book Your <em style={{ color: "var(--gold)" }}>Session</em>
          </h2>
        </div>

        <div className="mx-auto rounded-2xl border-[rgba(26,26,26,0.92)]"
          style={{
            maxWidth: 660,
            background: "rgba(26,26,26,0.92)", backdropFilter: "blur(12px)",
            padding: "48px 44px",
          }}>
          {sent ? (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
              <CheckCircle size={56} style={{ color: "var(--gold)", margin: "0 auto 20px" }} />
              <h3 className="crimson font-semibold mb-3" style={{ fontSize: 32, color: "var(--gold)" }}>You&apos;re Booked In!</h3>
              <p style={{ color: "var(--muted)", lineHeight: 1.7 }}>Jose will reach out within 24 hours to confirm your appointment and discuss your design.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div className="flex flex-wrap gap-5 mb-5">
                <div style={{ flex: "1 1 200px", display: "flex", flexDirection: "column" }}>
                  <label style={labelStyle}>Full Name</label>
                  <input style={inputStyle} placeholder="Your name" value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    onFocus={e => (e.target.style.borderColor = "var(--gold)")}
                    onBlur={e => (e.target.style.borderColor = "rgba(201,168,76,0.18)")} />
                  {errors.name && <span style={{ fontSize: 12, color: "var(--pink)", marginTop: 4 }}>{errors.name}</span>}
                </div>
                <div style={{ flex: "1 1 200px", display: "flex", flexDirection: "column" }}>
                  <label style={labelStyle}>Phone Number</label>
                  <input style={inputStyle} placeholder="+1 (512) …" value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    onFocus={e => (e.target.style.borderColor = "var(--gold)")}
                    onBlur={e => (e.target.style.borderColor = "rgba(201,168,76,0.18)")} />
                  {errors.phone && <span style={{ fontSize: 12, color: "var(--pink)", marginTop: 4 }}>{errors.phone}</span>}
                </div>
              </div>

              <div className="flex flex-wrap gap-5 mb-5">
                <div style={{ flex: "1 1 200px", display: "flex", flexDirection: "column" }}>
                  <label style={labelStyle}>Tattoo Idea</label>
                  <input style={inputStyle} placeholder="Describe your vision" value={form.idea}
                    onChange={e => setForm({ ...form, idea: e.target.value })}
                    onFocus={e => (e.target.style.borderColor = "var(--gold)")}
                    onBlur={e => (e.target.style.borderColor = "rgba(201,168,76,0.18)")} />
                  {errors.idea && <span style={{ fontSize: 12, color: "var(--pink)", marginTop: 4 }}>{errors.idea}</span>}
                </div>
                <div style={{ flex: "1 1 200px", display: "flex", flexDirection: "column" }}>
                  <label style={labelStyle}>Preferred Style</label>
                  <select style={inputStyle} value={form.style}
                    onChange={e => setForm({ ...form, style: e.target.value })}
                    onFocus={e => (e.target.style.borderColor = "var(--gold)")}
                    onBlur={e => (e.target.style.borderColor = "rgba(201,168,76,0.18)")}>
                    <option value="">Select style…</option>
                    <option>Custom Design</option>
                    <option>Fine Line</option>
                    <option>Black & Grey</option>
                    <option>Cover-Up</option>
                    <option>Traditional</option>
                    <option>Neo-Traditional</option>
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: 28 }}>
                <label style={labelStyle}>Additional Message</label>
                <textarea
                  rows={4}
                  style={{ ...inputStyle, resize: "vertical" }}
                  placeholder="Any other details, placement, size…"
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  onFocus={e => (e.target.style.borderColor = "var(--gold)")}
                  onBlur={e => (e.target.style.borderColor = "rgba(201,168,76,0.18)")}
                />
              </div>

              <button type="submit"
                className="w-full  rounded-2xl flex items-center justify-center gap-3 font-medium transition-all duration-300"
                style={{
                  background: "linear-gradient(135deg,var(--gold),var(--gold-light))", color: "var(--black)",
                  padding: "18px 32px", cursor: "pointer",
                  fontSize: 13, letterSpacing: "0.12em", textTransform: "uppercase",
                  boxShadow: "0 0 28px rgba(201,168,76,0.3)",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
              >
                <Sparkles size={16} /> Send Booking Request
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background: "var(--gray-dark)", borderTop: "1px solid rgba(201,168,76,0.12)", padding: "60px 40px 40px" }}>
      <div className="mx-auto flex flex-wrap gap-10 justify-between items-start mb-12" style={{ maxWidth: 1200 }}>
        {/* Brand */}
        <div style={{ flex: "1 1 240px" }}>
          <div className="crimson font-semibold mb-3" style={{ fontSize: 24 }}>
            Anew<span style={{ color: "var(--gold)" }}>Tattoo</span>{" "}
            <em style={{ color: "rgba(245,240,234,0.6)" }}>Co</em>
          </div>
          <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.75, maxWidth: 240 }}>
            Premium custom tattoos in Minneapolis, MN. Every piece tells a story.
          </p>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-5 no-underline"
            style={{ fontSize: 13, color: "var(--muted)" }}
            onMouseEnter={e => (e.currentTarget.style.color = "var(--gold)")}
            onMouseLeave={e => (e.currentTarget.style.color = "var(--muted)")}
          >
            <RiInstagramLine size={18} /> @anew_tattoo
          </a>
        </div>

        {/* Quick links */}
        <div style={{ flex: "1 1 160px" }}>
          <h4 style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 18 }}>Navigate</h4>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
            {NAV_LINKS.map(l => (
              <li key={l.href}>
                <a href={l.href} className="no-underline transition-colors duration-200"
                  style={{ color: "var(--muted)", fontSize: 14 }}
                  onMouseEnter={e => (e.currentTarget.style.color = "var(--gold)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "var(--muted)")}
                >{l.label}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div style={{ flex: "1 1 200px" }}>
          <h4 style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)", marginBottom: 18 }}>Contact</h4>
          <div className="flex flex-col gap-3">
            <a href="tel:+15128870942" className="flex items-center gap-3 no-underline"
              style={{ fontSize: 14, color: "var(--muted)" }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--gold)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--muted)")}
            >
              <FiPhone size={14} /> +1 512-887-0942
            </a>
            <div className="flex items-start gap-3" style={{ fontSize: 14, color: "var(--muted)" }}>
              <FiMapPin size={14} style={{ marginTop: 3, flexShrink: 0 }} />
              <span>2626 NE 2nd St Ste 82<br />Minneapolis, MN</span>
            </div>
            <div className="flex items-center gap-3" style={{ fontSize: 14, color: "var(--muted)" }}>
              <FiClock size={14} /> Opens 11 AM
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="mx-auto flex flex-wrap items-center justify-between gap-4"
        style={{ maxWidth: 1200, borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 28 }}>
        <span style={{ fontSize: 12, color: "var(--muted)", letterSpacing: "0.04em" }}>
          © {new Date().getFullYear()} Anew Tattoo Co · Minneapolis, MN. All rights reserved.
        </span>
        <div className="flex gap-4">
          {[
            { icon: <RiInstagramLine size={16} />, href: "https://instagram.com" },
            { icon: <FiPhone size={15} />, href: "tel:+15128870942" },
          ].map((s, i) => (
            <a key={i} href={s.href}
              className="flex rounded-2xl items-center justify-center no-underline transition-all duration-200"
              style={{
                width: 36, height: 36,
                border: "1px solid rgba(201,168,76,0.2)", color: "var(--muted)",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--gold)"; (e.currentTarget as HTMLElement).style.color = "var(--gold)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,168,76,0.2)"; (e.currentTarget as HTMLElement).style.color = "var(--muted)"; }}
            >{s.icon}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}

// ─── STICKY BOTTOM BAR ────────────────────────────────────────────────────────
// function StickyBar() {
//   return (
//     <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex gap-3"
//       style={{
//         background: "rgba(8,8,8,0.95)", backdropFilter: "blur(20px)",
//         borderTop: "1px solid rgba(201,168,76,0.2)", padding: "12px 16px",
//       }}>
//       <a href="tel:+15128870942"
//         className="flex-1 rounded-2xl flex items-center justify-center gap-2 no-underline transition-all duration-200"
//         style={{
//           padding: 13, borderRadius: 2, fontSize: 13, letterSpacing: "0.1em",
//           textTransform: "uppercase", fontFamily: "'DM Sans',sans-serif", fontWeight: 500,
//           background: "transparent", color: "var(--gold)",
//         }}>
//         <BsTelephoneFill size={13} /> Call Now
//       </a>
//       <a href="#booking"
//         className="flex-1 rounded-2xl flex items-center justify-center gap-2 no-underline transition-all duration-200"
//         style={{
//           padding: 13, fontSize: 13, letterSpacing: "0.1em",
//           textTransform: "uppercase", fontFamily: "'DM Sans',sans-serif", fontWeight: 500,
//           background: "linear-gradient(135deg,var(--gold),var(--gold-light))", color: "var(--black)",
//           boxShadow: "0 0 16px rgba(201,168,76,0.25)",
//         }}>
//         Book Now <HiOutlineArrowNarrowRight size={14} />
//       </a>
//     </div>
//   );
// }

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function GoldenLoveTattoo() {
  return (
    <>
      <GlobalStyles />
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Services />
        <Reviews />
        <About />
        <Gallery />
        <Process />
        <Location />
        <Booking />
      </main>
      <Footer />
      {/* <StickyBar /> */}
    </>
  );
}
