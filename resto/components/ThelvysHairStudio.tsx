"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
} from "framer-motion";
import {
  Scissors,
  Sparkles,
  Phone,
  MapPin,
  Clock,
  Star,
  ChevronDown,
  Menu,
  X,
  Send,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { FaInstagram, FaFacebookF, FaTiktok, FaYelp } from "react-icons/fa";

/* ───────────────────────── DATA ───────────────────────── */
const NAV_LINKS = ["about", "services", "why", "gallery", "contact"];

const SERVICES = [
  { icon: <Scissors className="w-7 h-7" />, title: "Precision Cuts", desc: "Tailored to your face shape, lifestyle, and personal style vision   every single time." },
  { icon: <Sparkles className="w-7 h-7" />, title: "Hair Styling", desc: "From sleek blowouts to elegant updos, we bring your vision to life for any occasion." },
  { icon: <span className="text-2xl">🎨</span>, title: "Color & Balayage", desc: "Vibrant balayage, bold color, subtle highlights. Expert color chemistry every time." },
  { icon: <span className="text-2xl">✨</span>, title: "Treatments", desc: "Nourishing keratin, deep conditioning, and repair treatments for your healthiest hair." },
  { icon: <span className="text-2xl">👧</span>, title: "Kids Haircuts", desc: "Gentle, fun, and stress-free cuts for the little ones   they'll love the experience." },
];

const WHY_US = [
  { icon: "☀️", text: "Clean & bright studio environment" },
  { icon: "🏆", text: "Professional, skilled stylist" },
  { icon: "💰", text: "Affordable, transparent pricing" },
  { icon: "💛", text: "Warm, friendly atmosphere" },
  { icon: "⭐", text: "5.0 -star rated by 16+ happy clients" },
];

const TESTIMONIALS = [
  { name: "Janelle M.", text: "Clean and bright studio, professional hair cuts at reasonable price. I keep coming back!", stars: 5, role: "Regular Client" },
  { name: "Tasha R.", text: "Excellent service, always! She knows exactly what I want before I even finish describing it.", stars: 5, role: "Loyal Client" },
  { name: "Priya K.", text: "Highly recommend for anyone looking for a great hairstylist. My hair has never looked better.", stars: 5, role: "New Client" },
  { name: "Carmen L.", text: "Such a welcoming environment. The results are always stunning. Worth every penny.", stars: 5, role: "Happy Client" },
];

const GALLERY = [
  { url: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=85", label: "Box Braids" },
  { url: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&q=85", label: "Styling" },
  { url: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=800&q=85", label: "Color" },
  { url: "https://images.unsplash.com/photo-1634449571010-02389ed0f9b0?w=800&q=85", label: "Treatment" },
  { url: "https://images.unsplash.com/photo-1634449571010-02389ed0f9b0?w=800&q=85", label: "Updo" },
  { url: "https://images.unsplash.com/photo-1500840216050-6ffa99d75160?w=800&q=85", label: "Natural" },
];

/* ───────────────────────── ANIMATION VARIANTS ───────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

/* ───────────────────────── REVEAL WRAPPER ───────────────────────── */
function RevealSection({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.section ref={ref} id={id} className={className}
      initial="hidden" animate={inView ? "visible" : "hidden"} variants={stagger}>
      {children}
    </motion.section>
  );
}

/* ───────────────────────── REUSABLE ATOMS ───────────────────────── */
function Label({ children }: { children: React.ReactNode }) {
  return (
    <motion.span variants={fadeUp}
      className="block text-[11px] font-semibold tracking-[0.28em] uppercase text-[#C8A97E] mb-4">
      {children}
    </motion.span>
  );
}
function Title({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <motion.h2 variants={fadeUp} custom={1}
      className={`display font-normal leading-tight ${light ? "text-[#FFFDF9]" : "text-[#211C18]"}`}
      style={{ fontSize: "clamp(1.9rem, 4vw, 3.4rem)" }}>
      {children}
    </motion.h2>
  );
}
function Gold({ center = false }: { center?: boolean }) {
  return (
    <motion.div variants={fadeUp} custom={2}
      className={`w-12 h-px bg-[#C8A97E] mt-7 mb-10 ${center ? "mx-auto" : ""}`} />
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════════════ */
export default function ThelvysHairStudio() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTesti, setActiveTesti] = useState(0);
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const { scrollYProgress } = useScroll();
  const barWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setActiveTesti(p => (p + 1) % TESTIMONIALS.length), 4500);
    return () => clearInterval(t);
  }, []);

  const goto = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="font-[Jost] bg-[#F8F3EE] text-[#211C18] overflow-x-hidden">

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Jost:wght@300;400;500;600&display=swap');
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-thumb { background: #C8A97E; }
        .display { font-family: 'Playfair Display', Georgia, serif; }
      `}</style>

      {/* PROGRESS BAR */}
      <motion.div className="fixed top-0 left-0 h-[2px] z-[9999] origin-left"
        style={{ width: barWidth, background: "linear-gradient(90deg,#C8A97E,#A07D52)" }} />

      {/* ════════════ NAV ════════════ */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed inset-x-0 top-0 z-[998] flex items-center justify-between px-6 md:px-[6%] transition-all duration-500
          ${scrolled
            ? "h-[64px] bg-[rgba(248,243,238,0.95)] backdrop-blur-xl shadow-[0_1px_0_rgba(200,169,126,0.25),0_8px_32px_rgba(33,28,24,0.07)]"
            : "h-[80px] bg-transparent"}`}>

        <motion.a href="#" className={`display text-2xl font-semibold no-underline transition-colors duration-300 ${scrolled ? "text-[#211C18]" : "text-white"}`}
          whileHover={{ scale: 1.02 }}>
          Studio M 
        </motion.a>

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-8 list-none m-0 p-0">
          {NAV_LINKS.map(s => (
            <li key={s}>
              <motion.span onClick={() => goto(s)}
                className={`text-[11px] font-medium tracking-[0.12em] uppercase cursor-pointer transition-colors duration-300 ${scrolled ? "text-[#3A2F28]" : "text-white/85"}`}
                whileHover={{ color: "#C8A97E" }}>
                {s === "why" ? "Why Us" : s[0].toUpperCase() + s.slice(1)}
              </motion.span>
            </li>
          ))}
          <li>
            <motion.a href="tel:+17737217880"
              className="bg-[#C8A97E] text-[#211C18] px-5 py-2 rounded-2xl text-[11px] font-semibold tracking-[0.12em] uppercase no-underline"
              whileHover={{ backgroundColor: "#A07D52", color: "#fff", y: -2 }} transition={{ duration: 0.2 }}>
              Book Now
            </motion.a>
          </li>
        </ul>

        {/* Hamburger */}
        <motion.button onClick={() => setMenuOpen(!menuOpen)} whileTap={{ scale: 0.9 }}
          className={`md:hidden bg-transparent border-0 cursor-pointer p-1 ${scrolled ? "text-[#211C18]" : "text-white"}`}>
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </motion.button>
      </motion.nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0, x: "100%" }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.38, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed inset-0 z-[997] bg-[#FFFDF9] flex flex-col items-center justify-center gap-10 px-6">
            {NAV_LINKS.map((s, i) => (
              <motion.span key={s} onClick={() => goto(s)}
                initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                className="display text-[2.1rem] italic text-[#211C18] cursor-pointer"
                whileHover={{ color: "#C8A97E", x: 8 }}>
                {s === "why" ? "Why Us" : s[0].toUpperCase() + s.slice(1)}
              </motion.span>
            ))}
            <motion.span onClick={() => goto("contact")}
              initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 }}
              className="display text-[2.1rem] italic text-[#C8A97E] cursor-pointer"
              whileHover={{ x: 8 }}>
              Book Now
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ════════════ HERO ════════════ */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1562322140-8baeececf3df?w=1600&q=85')" }} />
        <div className="absolute inset-0"
          style={{ background: "linear-gradient(160deg,rgba(33,28,24,0.76) 0%,rgba(58,47,40,0.48) 100%)" }} />

        {/* Deco rings   desktop only */}
        <motion.div animate={{ y: [0, -18, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[18%] right-[8%] w-44 h-44 rounded-full border border-[rgba(200,169,126,0.2)] pointer-events-none hidden lg:block" />
        <motion.div animate={{ y: [0, 12, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[22%] left-[5%] w-24 h-24 rounded-full border border-[rgba(200,169,126,0.15)] pointer-events-none hidden lg:block" />

        {/* Hero content */}
        <div className="relative z-10 flex flex-col items-center text-center w-full max-w-3xl px-6 py-24">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }}
            className="text-[11px] font-medium tracking-[0.28em] uppercase text-[#C8A97E] mb-5">
            ✦ Minneapolis's Premier Hair Studio ✦
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.9 }}
            className="display font-normal text-white leading-[1.12] mb-5"
            style={{ fontSize: "clamp(2.6rem,7vw,5.4rem)" }}>
            Where Beauty<br />
            Meets{" "}
            <motion.em className="italic text-[#C8A97E]"
              animate={{ opacity: [1, 0.65, 1] }} transition={{ duration: 3, repeat: Infinity }}>
              Confidence
            </motion.em>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8 }}
            className="font-light text-white/80 mb-12 leading-relaxed"
            style={{ fontSize: "clamp(0.95rem,2vw,1.2rem)" }}>
            Professional hair care, styling & treatments<br className="hidden sm:block" />in the heart of Minneapolis, MN
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto justify-center">
            <motion.a href="tel:+17737217880"
              className="flex items-center justify-center gap-2 bg-[#C8A97E] text-[#211C18] px-8 py-4 rounded-2xl text-[13px] font-semibold tracking-[0.12em] uppercase no-underline"
              whileHover={{ backgroundColor: "#A07D52", color: "#fff", y: -3 }} transition={{ duration: 0.25 }}>
              Book Appointment <ArrowRight size={15} />
            </motion.a>
            <motion.a href="tel:+17737217880"
              className="flex items-center justify-center gap-2 bg-transparent text-white border border-white/50 px-8 py-4 rounded-2xl text-[13px] font-medium tracking-[0.12em] uppercase no-underline"
              whileHover={{ backgroundColor: "rgba(255,255,255,0.1)", borderColor: "#fff", y: -3 }} transition={{ duration: 0.25 }}>
              <Phone size={15} /> Call Now
            </motion.a>
          </motion.div>
        </div>

        {/* Rating badge */}
        <motion.div initial={{ opacity: 0, scale: 0.8, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.7 }}
          className="absolute bottom-14 right-[6%] hidden md:flex flex-col items-center gap-1 bg-white/10 backdrop-blur-xl border border-[rgba(200,169,126,0.4)] px-5 py-4 rounded text-white text-center">
          <span className="text-[#C8A97E] text-sm tracking-[2px]">★★★★★</span>
          <span className="display text-[2rem] font-semibold leading-none">5.0 </span>
          <span className="text-[11px] opacity-75 tracking-[0.1em]">38 Reviews</span>
        </motion.div>

        {/* Scroll cue */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }}
          onClick={() => goto("about")}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer">
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
            <ChevronDown size={20} color="rgba(255,255,255,0.6)" />
          </motion.div>
          <span className="text-[10px] tracking-[0.2em] uppercase text-white/50">Scroll</span>
        </motion.div>
      </section>

      {/* ════════════ ABOUT ════════════ */}
      <RevealSection id="about" className="bg-[#FFFDF9] py-24 px-6 md:px-[6%]">
        <div className="max-w-[1280px] mx-auto flex flex-col lg:flex-row items-center gap-14 lg:gap-24">

          {/* Image */}
          <motion.div variants={fadeUp} className="relative w-full lg:w-1/2 shrink-0">
            <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.5 }}
              className="overflow-hidden rounded-2xl">
              <img src="https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=800&q=85"
                alt="Studio M Hair Studio"
                className="w-full object-cover block h-[360px] sm:h-[460px] lg:h-[540px]" />
            </motion.div>
            <motion.div initial={{ scale: 0, rotate: -20 }} whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.3 }}
              className="absolute -bottom-6 right-0 md:-right-6 w-24 h-24 md:w-[110px] md:h-[110px] rounded-full bg-[#C8A97E] text-[#211C18] flex flex-col items-center justify-center shadow-[0_12px_40px_rgba(200,169,126,0.4)]">
              <span className="display text-2xl font-bold leading-none">10+</span>
              <span className="text-[9px] font-semibold tracking-[0.1em] uppercase text-center leading-tight mt-1">Years Exp.</span>
            </motion.div>
          </motion.div>

          {/* Text */}
          <div className="w-full lg:w-1/2 flex flex-col">
            <Label>Our Story</Label>
            <Title>Crafting Beauty,<br /><em className="italic text-[#C8A97E]">Building Confidence</em></Title>
            <Gold />
            <motion.p variants={fadeUp} custom={2} className="text-[#8A7A70] leading-[1.9] mb-5 font-light text-[1rem] md:text-[1.02rem]">
              At Studio M Hair Studio, we believe that great hair is more than just a style   it's a feeling. Nestled in Minneapolis's South Side, we've built a sanctuary where every client is welcomed like family and leaves feeling their absolute best.
            </motion.p>
            <motion.p variants={fadeUp} custom={3} className="text-[#8A7A70] leading-[1.9] font-light text-[1rem] md:text-[1.02rem]">
              Our studio is bright, immaculate, and designed to make you feel at ease. With expertise in a wide range of styles and treatments, we deliver precision and artistry with every appointment.
            </motion.p>
            <motion.div variants={fadeUp} custom={4}
              className="flex flex-wrap gap-8 mt-10 pt-10 border-t border-[#EDE0D4]">
              {[["5.0 ⭐", "Average Rating"], ["16+", "Happy Reviews"], ["100%", "Satisfaction Goal"]].map(([n, l]) => (
                <div key={l} className="flex flex-col">
                  <span className="display text-[2.2rem] font-semibold text-[#211C18] leading-none">{n}</span>
                  <span className="text-[12px] text-[#8A7A70] tracking-[0.05em] mt-1">{l}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </RevealSection>

      {/* ════════════ SERVICES ════════════ */}
      <RevealSection id="services" className="bg-[#F8F3EE] py-24 px-6 md:px-[6%]">
        <div className="max-w-[1280px] mx-auto">

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
            <div>
              <Label>What We Offer</Label>
              <Title>Our <em className="italic text-[#C8A97E]">Signature</em><br />Services</Title>
              <Gold />
            </div>
            <motion.a variants={fadeUp} custom={2} href="tel:+17737217880"
              className="self-start sm:self-auto flex items-center gap-2 bg-[#C8A97E] text-[#211C18] px-8 py-[14px] rounded-2xl text-[13px] font-semibold tracking-[0.12em] uppercase no-underline shrink-0"
              whileHover={{ backgroundColor: "#A07D52", color: "#fff", y: -2 }}>
              Book a Service <ArrowRight size={14} />
            </motion.a>
          </div>

          {/* Cards */}
          <div className="flex flex-wrap gap-[2px] bg-[#D9C9B8] border border-[#D9C9B8]">
            {SERVICES.map((s, i) => (
              <motion.div key={s.title} variants={fadeUp} custom={i}
                className="relative overflow-hidden bg-[#FFFDF9] p-8 md:p-10 flex flex-col"
                style={{ flex: "1 1 180px", minWidth: "160px" }}
                whileHover={{ y: -5, boxShadow: "0 20px 48px rgba(33,28,24,0.11)", backgroundColor: "#FFFBF6" }}
                transition={{ duration: 0.3 }}>
                <motion.div className="absolute bottom-0 left-0 h-[2px] bg-[#C8A97E] origin-left"
                  style={{ scaleX: 0 }} whileHover={{ scaleX: 1 }} transition={{ duration: 0.4 }} />
                <div className="text-[#C8A97E] mb-5">{s.icon}</div>
                <h3 className="display text-[1.3rem] font-semibold mb-3">{s.title}</h3>
                <p className="text-[0.87rem] text-[#8A7A70] leading-[1.8] font-light">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </RevealSection>

      {/* ════════════ WHY US ════════════ */}
      <RevealSection id="why" className="bg-[#211C18] py-24 px-6 md:px-[6%]">
        <div className="max-w-[1280px] mx-auto flex flex-col lg:flex-row items-center gap-14 lg:gap-24">

          {/* Text */}
          <div className="w-full lg:w-1/2 flex flex-col">
            <motion.span variants={fadeUp}
              className="block text-[11px] font-semibold tracking-[0.28em] uppercase text-[#C8A97E] mb-4">
              Why Choose Us
            </motion.span>
            <motion.h2 variants={fadeUp} custom={1}
              className="display font-normal leading-tight text-[#FFFDF9]"
              style={{ fontSize: "clamp(1.9rem,4vw,3.4rem)" }}>
              The Studio M <br /><em className="italic text-[#C8A97E]">Difference</em>
            </motion.h2>
            <motion.div variants={fadeUp} custom={2} className="w-12 h-px bg-[#C8A97E] mt-7 mb-10" />
            <ul className="flex flex-col gap-3 list-none p-0 m-0">
              {WHY_US.map((w, i) => (
                <motion.li key={w.text} variants={fadeUp} custom={i + 2}
                  className="flex items-center gap-4 px-5 py-4 border border-[rgba(200,169,126,0.15)] rounded-2xl"
                  whileHover={{ borderColor: "#C8A97E", backgroundColor: "rgba(200,169,126,0.05)", x: 6 }}
                  transition={{ duration: 0.25 }}>
                  <span className="text-2xl w-9 text-center shrink-0">{w.icon}</span>
                  <span className="flex-1 text-[0.94rem] text-white/80 font-light tracking-[0.02em]">{w.text}</span>
                  <CheckCircle2 size={15} color="rgba(200,169,126,0.4)" className="shrink-0" />
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Image */}
          <motion.div variants={fadeUp} custom={2}
            className="hidden lg:block w-full lg:w-1/2 overflow-hidden rounded-2xl">
            <motion.img src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?w=800&q=85"
              alt="Studio interior" className="w-full h-[500px] object-cover block"
              whileHover={{ scale: 1.05 }} transition={{ duration: 0.6 }} />
          </motion.div>
        </div>
      </RevealSection>

      {/* ════════════ TESTIMONIALS ════════════ */}
      <RevealSection id="testimonials" className="bg-[#EDE0D4] py-24 px-6 md:px-[6%]">
        <div className="max-w-[860px] mx-auto flex flex-col items-center text-center">
          <Label>Client Love</Label>
          <motion.h2 variants={fadeUp} custom={1}
            className="display font-normal leading-tight text-[#211C18]"
            style={{ fontSize: "clamp(1.9rem,4vw,3.4rem)" }}>
            What Our <em className="italic text-[#C8A97E]">Clients</em> Say
          </motion.h2>
          <Gold center />

          <motion.div variants={fadeUp} custom={3} className="w-full min-h-[180px]">
            <AnimatePresence mode="wait">
              <motion.div key={activeTesti}
                initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="flex flex-col items-center">
                <p className="display italic font-normal text-[#3A2F28] leading-relaxed mb-8"
                  style={{ fontSize: "clamp(1.15rem,2.8vw,1.85rem)" }}>
                  <span style={{ fontFamily: "Georgia, serif", fontSize: "3.8rem", lineHeight: 0, verticalAlign: "-1.4rem", marginRight: "4px", color: "#C8A97E" }}>"</span>
                  {TESTIMONIALS[activeTesti].text}
                </p>
                <div className="flex gap-1 mb-3">
                  {[...Array(TESTIMONIALS[activeTesti].stars)].map((_, i) => (
                    <Star key={i} size={15} fill="#C8A97E" color="#C8A97E" />
                  ))}
                </div>
                <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-[#8A7A70]">
                    {TESTIMONIALS[activeTesti].name} · {TESTIMONIALS[activeTesti].role}
                </p>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          <div className="flex gap-2 mt-10">
            {TESTIMONIALS.map((_, i) => (
              <motion.button key={i} onClick={() => setActiveTesti(i)}
                animate={{ scale: i === activeTesti ? 1.4 : 1, backgroundColor: i === activeTesti ? "#C8A97E" : "#D9C9B8" }}
                className="w-2 h-2 rounded-full border-0 cursor-pointer p-0" />
            ))}
          </div>
        </div>
      </RevealSection>

      {/* ════════════ GALLERY ════════════ */}
      <RevealSection id="gallery" className="bg-[#FFFDF9] py-24 px-6 md:px-[6%]">
        <div className="max-w-[1280px] mx-auto">
          <div className="mb-14">
            <Label>Portfolio</Label>
            <Title>Our <em className="italic text-[#C8A97E]">Work</em> Speaks<br />for Itself</Title>
            <Gold />
          </div>

          {/* Flex gallery layout   responsive */}
          <motion.div variants={fadeUp} custom={2} className="flex flex-col sm:flex-row gap-[6px]">

            {/* Tall left image */}
            <motion.div
              className="relative overflow-hidden rounded-2xl cursor-pointer w-full sm:w-[32%] h-[280px] sm:h-auto"
              style={{ minHeight: "280px" }}
              whileHover="hover">
              <motion.img src={GALLERY[0].url} alt={GALLERY[0].label}
                className="w-full h-full object-cover block absolute inset-0"
                variants={{ hover: { scale: 1.08 } }}
                transition={{ duration: 0.65 }} />
              <motion.div variants={{ hover: { opacity: 1 }, initial: { opacity: 0 } }} initial="initial"
                className="absolute inset-0 flex items-end p-5"
                style={{ background: "linear-gradient(to top,rgba(33,28,24,0.65) 0%,transparent 60%)" }}>
                <span className="text-[12px] font-semibold tracking-[0.12em] uppercase text-white">{GALLERY[0].label}</span>
              </motion.div>
            </motion.div>

            {/* Right column: 2 rows of 2 on sm+, 1 col on mobile */}
            <div className="flex flex-col gap-[6px] flex-1 min-w-0">
              {[[1, 2], [3, 4, 5]].map((row, ri) => (
                <div key={ri} className="flex gap-[6px]">
                  {row.map(idx => (
                    <motion.div key={idx}
                      className="relative overflow-hidden rounded-2xl cursor-pointer flex-1 h-[160px] sm:h-[190px] md:h-[220px]"
                      whileHover="hover">
                      <motion.img src={GALLERY[idx].url} alt={GALLERY[idx].label}
                        className="w-full h-full object-cover block"
                        variants={{ hover: { scale: 1.08 } }}
                        transition={{ duration: 0.65 }} />
                      <motion.div variants={{ hover: { opacity: 1 }, initial: { opacity: 0 } }} initial="initial"
                        className="absolute inset-0 flex items-end p-4"
                        style={{ background: "linear-gradient(to top,rgba(33,28,24,0.65) 0%,transparent 60%)" }}>
                        <span className="text-[11px] font-semibold tracking-[0.12em] uppercase text-white">{GALLERY[idx].label}</span>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </RevealSection>

      {/* ════════════ CONTACT ════════════ */}
      <RevealSection id="contact" className="bg-[#F8F3EE] py-24 px-6 md:px-[6%]">
        <div className="max-w-[1280px] mx-auto flex flex-col lg:flex-row gap-14 lg:gap-24">

          {/* Info */}
          <div className="w-full lg:w-1/2 flex flex-col">
            <Label>Get In Touch</Label>
            <Title>Visit Us or<br /><em className="italic text-[#C8A97E]">Book Online</em></Title>
            <Gold />

            <div className="flex flex-col gap-6 mb-8">
              {[
                { icon: <MapPin size={17} color="#A07D52" />, title: "Location", val: " 2626 NE 2nd St Ste 42, Minneapolis,Minnesota ", href: "https://www.google.com/maps/search/?api=1&query=Studio%20M&query_place_id=ChIJLU5P5FAzs1IRbgsIJ0lPdZ4" },
                { icon: <Phone size={17} color="#A07D52" />, title: "Phone", val: "+1 612-386-6897 ", href: "tel:+16123866897" },
                { icon: <Clock size={17} color="#A07D52" />, title: "Hours", val: "Opens at 10 AM · Mon–Sat", href: null },
              ].map((item, i) => (
                <motion.div key={item.title} variants={fadeUp} custom={i + 2}
                  className="flex items-start gap-4">
                  <div className="w-[42px] h-[42px] rounded-full bg-[#EDE0D4] flex items-center justify-center shrink-0">
                    {item.icon}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#8A7A70] mb-1">{item.title}</span>
                    {item.href
                      ? <motion.a href={item.href} className="text-[0.96rem] text-[#211C18] no-underline" whileHover={{ color: "#A07D52" }}>{item.val}</motion.a>
                      : <span className="text-[0.96rem] text-[#211C18]">{item.val}</span>}
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.iframe variants={fadeUp} custom={5}
              src="https://www.google.com/maps/search/?api=1&query=Studio%20M&query_place_id=ChIJLU5P5FAzs1IRbgsIJ0lPdZ4"
              className="w-full h-[200px] border-0 rounded-2xl block mt-2"
              style={{ filter: "grayscale(0.4) contrast(0.95)" }}
              allowFullScreen loading="lazy" title="Location" />
          </div>

          {/* Form */}
          <div className="w-full lg:w-1/2 flex flex-col">
            <motion.h3 variants={fadeUp} className="display text-[1.85rem] font-normal mb-8 leading-snug">
              Send Us a <em className="italic text-[#C8A97E]">Message</em>
            </motion.h3>

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div key="ok" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-16 px-6 text-center gap-4 border border-[#EDE0D4] rounded bg-[#FFFDF9]">
                  <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 0.5 }}>
                    <CheckCircle2 size={46} color="#C8A97E" />
                  </motion.div>
                  <h4 className="display text-2xl">Thank you!</h4>
                  <p className="text-[#8A7A70]">We'll be in touch soon.</p>
                  <motion.button onClick={() => setSubmitted(false)}
                    className="mt-3 bg-transparent border border-[#C8A97E] text-[#C8A97E] px-6 py-2 rounded-2xl cursor-pointer text-[12px] font-semibold tracking-[0.1em] uppercase"
                    whileHover={{ backgroundColor: "#C8A97E", color: "#211C18" }}>
                    Send Another
                  </motion.button>
                </motion.div>
              ) : (
                <motion.form key="form" className="flex flex-col gap-5"
                  onSubmit={e => { e.preventDefault(); setSubmitted(true); setForm({ name: "", phone: "", message: "" }); }}>
                  {[
                    { label: "Your Name", type: "text", placeholder: "Jane Smith", field: "name" as const },
                    { label: "Phone Number", type: "tel", placeholder: "+1 (773) 000-0000", field: "phone" as const },
                  ].map((f, i) => (
                    <motion.div key={f.field} variants={fadeUp} custom={i + 1} className="flex flex-col gap-1.5">
                      <label className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#8A7A70]">{f.label}</label>
                      <input type={f.type} placeholder={f.placeholder}
                        value={form[f.field]}
                        onChange={e => setForm({ ...form, [f.field]: e.target.value })}
                        required
                        className="bg-[#FFFDF9] border border-[#D9C9B8] px-4 py-[13px] rounded-2xl text-[0.94rem] text-[#211C18] outline-none w-full transition-all focus:border-[#C8A97E] focus:shadow-[0_0_0_3px_rgba(200,169,126,0.14)]"
                        style={{ fontFamily: "Jost, sans-serif" }} />
                    </motion.div>
                  ))}
                  <motion.div variants={fadeUp} custom={3} className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[#8A7A70]">Message</label>
                    <textarea placeholder="Tell us about the service you're interested in..."
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      required rows={5}
                      className="bg-[#FFFDF9] border border-[#D9C9B8] px-4 py-[13px] rounded-2xl text-[0.94rem] text-[#211C18] outline-none w-full resize-y transition-all focus:border-[#C8A97E] focus:shadow-[0_0_0_3px_rgba(200,169,126,0.14)]"
                      style={{ fontFamily: "Jost, sans-serif" }} />
                  </motion.div>
                  <motion.button variants={fadeUp} custom={4} type="submit"
                    className="self-start flex items-center gap-2 bg-[#211C18] text-[#FFFDF9] px-9 py-4 border-2 border-[#211C18] rounded-2xl text-[13px] font-semibold tracking-[0.14em] uppercase cursor-pointer"
                    whileHover={{ backgroundColor: "#C8A97E", borderColor: "#C8A97E", color: "#211C18", y: -2 }}
                    transition={{ duration: 0.25 }}>
                    Send Message <Send size={14} />
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </RevealSection>

      {/* ════════════ FOOTER ════════════ */}
      <footer className="bg-[#211C18] text-white/65 px-6 md:px-[6%]" style={{ paddingTop: "72px", paddingBottom: "36px" }}>
        <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row flex-wrap gap-12 pb-12 border-b border-[rgba(200,169,126,0.15)]">

          {/* Brand */}
          <div className="flex flex-col w-full md:w-auto" style={{ flex: "2 1 220px" }}>
            <span className="display text-[1.55rem] font-semibold text-[#FFFDF9] mb-4 block">Studio M Hair Studio</span>
            <p className="text-[0.87rem] leading-[1.8] max-w-[300px]">
              Your confidence is our craft. Premium hair care in Minneapolis's South Side   where every client leaves feeling beautiful and empowered.
            </p>
            <div className="flex gap-3 mt-7">
              {[<FaInstagram size={14} />, <FaFacebookF size={14} />, <FaTiktok size={14} />, <FaYelp size={14} />].map((icon, i) => (
                <motion.a key={i} href="#" aria-label="Social"
                  className="w-[38px] h-[38px] rounded-full border border-[rgba(200,169,126,0.3)] flex items-center justify-center text-[#C8A97E] no-underline"
                  whileHover={{ backgroundColor: "#C8A97E", color: "#211C18", borderColor: "#C8A97E", scale: 1.1 }}
                  transition={{ duration: 0.22 }}>
                  {icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col" style={{ flex: "1 1 130px" }}>
            <h4 className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#C8A97E] mb-5">Quick Links</h4>
            <ul className="flex flex-col gap-3 list-none p-0 m-0">
              {[["About", "about"], ["Services", "services"], ["Gallery", "gallery"], ["Why Choose Us", "why"], ["Contact", "contact"]].map(([l, id]) => (
                <li key={l}>
                  <motion.span onClick={() => goto(id)} className="text-white/60 text-[0.88rem] font-light cursor-pointer"
                    whileHover={{ color: "#C8A97E", x: 4 }} transition={{ duration: 0.2 }}>{l}</motion.span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div className="flex flex-col" style={{ flex: "1 1 150px" }}>
            <h4 className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#C8A97E] mb-5">Contact</h4>
            <ul className="flex flex-col gap-3 list-none p-0 m-0">
              <li>
                <motion.a href="https://www.google.com/maps/search/?api=1&query=Studio%20M&query_place_id=ChIJLU5P5FAzs1IRbgsIJ0lPdZ4"
                  className="text-white/60 text-[0.88rem] font-light no-underline"
                  whileHover={{ color: "#C8A97E" }}>
                  2626 NE 2nd St Ste 42,<br />Minneapolis, Minnesota 
                </motion.a>
              </li>
              <li>
                <motion.a href="tel:+17737217880" className="text-white/60 text-[0.88rem] font-light no-underline"
                  whileHover={{ color: "#C8A97E" }}>+1 773-721-7880</motion.a>
              </li>
              <li><span className="text-[0.88rem] font-light">Opens at 10 AM</span></li>
            </ul>
          </div>
        </div>

        <div className="max-w-[1280px] mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 mt-9 text-[12px]">
          <p>© {new Date().getFullYear()} <span className="text-[#C8A97E]">Studio M Hair Studio</span>. All rights reserved.</p>
          <p>Made with ♥ in Minneapolis</p>
        </div>
      </footer>

      {/* FLOATING CTA */}
      <motion.a href="tel:+17737217880"
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 1.5, type: "spring", stiffness: 200 }}
        className="fixed bottom-6 right-6 z-[990] flex items-center gap-2 bg-[#C8A97E] text-[#211C18] px-5 py-3 rounded-2xl text-[12px] font-bold tracking-[0.14em] uppercase no-underline"
        style={{ boxShadow: "0 8px 28px rgba(200,169,126,0.5)" }}
        whileHover={{ backgroundColor: "#A07D52", color: "#fff", y: -3, boxShadow: "0 14px 40px rgba(160,125,82,0.55)" }}
        whileTap={{ scale: 0.96 }}>
        <Sparkles size={13} /> Book Now
      </motion.a>
    </div>
  );
}
