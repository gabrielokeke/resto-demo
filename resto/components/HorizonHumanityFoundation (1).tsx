"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useInView } from "framer-motion";
import {
  Heart, Globe, BookOpen, Utensils, Stethoscope, Users, Shield, Building2,
  ChevronDown, Menu, X, Star, ArrowRight, MapPin, Phone, Mail, Clock,
  Send, Leaf, Zap, CheckCircle, TrendingUp, Award
} from "lucide-react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import { MdVolunteerActivism, MdHandshake } from "react-icons/md";

// ─── Types ───────────────────────────────────────────────────────────────────
interface NavItem { label: string; href: string; }
interface Program { title: string; desc: string; icon: React.ReactNode; img: string; color: string; }
interface Stat { value: string; label: string; icon: React.ReactNode; }
interface Step { num: string; title: string; desc: string; icon: React.ReactNode; }
interface Testimonial { name: string; role: string; quote: string; img: string; rating: number; }

// ─── Constants ────────────────────────────────────────────────────────────────
const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Programs", href: "#programs" },
  { label: "Impact", href: "#impact" },
  { label: "Stories", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

const PROGRAMS: Program[] = [
  {
    title: "Education Support",
    desc: "Providing access to quality education, scholarships, school supplies, and trained educators to underserved children across conflict-affected regions.",
    icon: <BookOpen size={22} />,
    img: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&q=80",
    color: "from-sky-500/20 to-blue-600/20",
  },
  {
    title: "Food Relief",
    desc: "Delivering emergency food packages, nutritional support, and sustainable food programs to families facing hunger and food insecurity.",
    icon: <Utensils size={22} />,
    img: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80",
    color: "from-amber-500/20 to-orange-600/20",
  },
  {
    title: "Healthcare Outreach",
    desc: "Mobilizing medical teams, free clinics, vaccinations, and maternal health programs to communities with zero access to formal healthcare.",
    icon: <Stethoscope size={22} />,
    img: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&q=80",
    color: "from-emerald-500/20 to-teal-600/20",
  },
  {
    title: "Women Empowerment",
    desc: "Building economic independence, legal literacy, and leadership skills among women in marginalized communities through targeted programs.",
    icon: <Heart size={22} />,
    img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80",
    color: "from-rose-500/20 to-pink-600/20",
  },
  {
    title: "Child Protection",
    desc: "Shielding vulnerable children from exploitation, abuse, and neglect through advocacy, safe houses, and psychosocial support services.",
    icon: <Shield size={22} />,
    img: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=800&q=80",
    color: "from-violet-500/20 to-purple-600/20",
  },
  {
    title: "Community Development",
    desc: "Building infrastructure, clean water access, sanitation, and social cohesion frameworks that uplift entire communities for generations.",
    icon: <Building2 size={22} />,
    img: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?w=800&q=80",
    color: "from-cyan-500/20 to-sky-600/20",
  },
];

const STATS: Stat[] = [
  { value: "25,000+", label: "Lives Reached", icon: <Users size={20} /> },
  { value: "120+", label: "Communities Supported", icon: <Globe size={20} /> },
  { value: "10 Yrs", label: "Humanitarian Impact", icon: <Award size={20} /> },
];

const STEPS: Step[] = [
  {
    num: "01",
    title: "Identify Communities in Need",
    desc: "Our field teams and global partners conduct rigorous needs assessments, mapping the most vulnerable populations across crisis zones and underserved regions.",
    icon: <MapPin size={26} />,
  },
  {
    num: "02",
    title: "Deliver Humanitarian Support",
    desc: "We mobilize resources swiftly — food, medicine, education, protection — through coordinated ground operations and trusted local partner networks.",
    icon: <MdVolunteerActivism size={26} />,
  },
  {
    num: "03",
    title: "Create Sustainable Impact",
    desc: "Beyond emergency relief, we build lasting systems: schools, clinics, cooperatives, and community structures that thrive independently.",
    icon: <Leaf size={26} />,
  },
];

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Amara Diallo",
    role: "Program Beneficiary, Sierra Leone",
    quote: "Before Horizon Humanity came to our village, I had given up on my children going to school. Today, my daughter is studying to become a nurse. This foundation gave us back our future.",
    img: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&q=80",
    rating: 5,
  },
  {
    name: "Dr. James Okafor",
    role: "Medical Volunteer, Nigeria",
    quote: "I have volunteered with many organizations across Africa, but Horizon Humanity's operational precision and genuine human-first approach is extraordinary. Every dollar here creates real change.",
    img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=80",
    rating: 5,
  },
  {
    name: "Sophie Marchetti",
    role: "Major Donor, Italy",
    quote: "As someone who has donated to dozens of NGOs, I can say with complete confidence that Horizon Humanity's transparency and measurable outcomes are unlike anything I have ever seen.",
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80",
    rating: 5,
  },
  {
    name: "Kwame Asante",
    role: "Community Leader, Ghana",
    quote: "They did not just bring aid — they trained us, equipped us, and trusted us to lead. Our community is now running its own nutrition program. We are the change they helped us become.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    rating: 5,
  },
];

const IMPACT_STATS = [
  { value: 25000, suffix: "+", label: "Lives Directly Reached", icon: <Heart size={18} /> },
  { value: 120, suffix: "+", label: "Communities Transformed", icon: <Globe size={18} /> },
  { value: 47, suffix: "", label: "Countries Served", icon: <MapPin size={18} /> },
  { value: 98, suffix: "%", label: "Funds to Programs", icon: <TrendingUp size={18} /> },
  { value: 3200, suffix: "+", label: "Active Volunteers", icon: <Users size={18} /> },
  { value: 850, suffix: "+", label: "Partner Organizations", icon: <Building2 size={18} /> },
];

const DONATE_URL = "https://wa.me/2340000000000?text=Hello%20I%20would%20like%20to%20support%20your%20mission";

// ─── Animated Counter ─────────────────────────────────────────────────────────
function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, value]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

// ─── Particle Canvas ──────────────────────────────────────────────────────────
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const particles: { x: number; y: number; vx: number; vy: number; r: number; alpha: number }[] = [];
    const COUNT = 80;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < COUNT; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 2 + 0.5,
        alpha: Math.random() * 0.5 + 0.1,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(147, 197, 253, ${p.alpha})`;
        ctx.fill();
      });

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(147, 197, 253, ${0.12 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }} />;
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-slate-950/80 backdrop-blur-xl border-b border-white/5 shadow-2xl"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => scrollTo("#home")}>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-400 to-teal-500 flex items-center justify-center shadow-lg shadow-sky-500/30">
              <Globe size={18} className="text-white" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-white font-bold text-sm tracking-wide" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>HORIZON</span>
              <span className="text-sky-400 text-[10px] tracking-[0.15em] uppercase font-medium">Humanity Foundation</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollTo(item.href)}
                className="px-4 py-2 text-slate-300 hover:text-white text-sm font-medium transition-colors duration-200 rounded-lg hover:bg-white/5"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Donate CTA */}
          <div className="hidden lg:block">
            <a
              href={DONATE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white overflow-hidden group"
              style={{ background: "linear-gradient(135deg, #0ea5e9, #14b8a6)" }}
            >
              <span className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300" />
              <Heart size={14} />
              Donate Now
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden text-white p-2 rounded-lg hover:bg-white/10 transition"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-slate-950/95 backdrop-blur-xl flex flex-col pt-24 px-8 gap-2"
          >
            {NAV_ITEMS.map((item, i) => (
              <motion.button
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                onClick={() => scrollTo(item.href)}
                className="text-left text-xl font-semibold text-white py-3 border-b border-white/5 hover:text-sky-400 transition-colors"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {item.label}
              </motion.button>
            ))}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mt-8">
              <a
                href={DONATE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl text-white font-bold text-lg"
                style={{ background: "linear-gradient(135deg, #0ea5e9, #14b8a6)" }}
              >
                <Heart size={18} /> Donate Now
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 120]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950">
      {/* Deep gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(14,165,233,0.12) 0%, transparent 70%)" }} />
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 50% 50% at 80% 80%, rgba(20,184,166,0.08) 0%, transparent 60%)" }} />

      {/* Particle canvas */}
      <ParticleCanvas />

      {/* Hero image overlay */}
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=1600&q=80')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 pt-24 pb-16 flex flex-col items-center text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-sky-500/30 bg-sky-500/10 text-sky-400 text-xs font-semibold tracking-widest uppercase mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
          Humanitarian Action Since 2014
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-6 leading-[1.05] tracking-tight"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          Changing Lives Through{" "}
          <span className="bg-gradient-to-r from-sky-400 to-teal-400 bg-clip-text text-transparent">
            Compassion
          </span>{" "}
          &{" "}
          <span className="bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
            Action
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="text-slate-300 text-base sm:text-lg lg:text-xl max-w-2xl mb-10 leading-relaxed"
        >
          Empowering vulnerable communities through education, healthcare, food support, and humanitarian outreach — across borders, with purpose.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 mb-16"
        >
          <a
            href={DONATE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-white font-bold text-base overflow-hidden shadow-2xl shadow-sky-500/20 hover:shadow-sky-500/40 transition-all duration-300 hover:scale-105"
            style={{ background: "linear-gradient(135deg, #0ea5e9, #14b8a6)" }}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            <Heart size={16} />
            Support Our Mission
          </a>
          <button
            onClick={() => document.querySelector("#impact")?.scrollIntoView({ behavior: "smooth" })}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl border border-white/10 text-white font-semibold text-base hover:bg-white/5 hover:border-white/20 transition-all duration-300 backdrop-blur-sm"
          >
            Explore Our Impact
            <ArrowRight size={16} />
          </button>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-3 gap-4 sm:gap-8 w-full max-w-2xl"
        >
          {STATS.map((s, i) => (
            <div key={i} className="flex flex-col items-center gap-1 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <span className="text-sky-400 mb-1">{s.icon}</span>
              <span className="text-white font-bold text-xl sm:text-2xl" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{s.value}</span>
              <span className="text-slate-400 text-xs text-center leading-tight">{s.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-500 flex flex-col items-center gap-1"
        >
          <span className="text-[10px] tracking-widest uppercase">Scroll</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
            <ChevronDown size={16} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Scroll reveal wrapper ────────────────────────────────────────────────────
function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

// ─── About ────────────────────────────────────────────────────────────────────
function About() {
  return (
    <section id="about" className="py-24 sm:py-32 bg-white relative overflow-hidden">
      {/* decorative */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-sky-50 blur-3xl opacity-60 -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-teal-50 blur-3xl opacity-60 translate-y-1/2 -translate-x-1/4" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Images */}
          <Reveal>
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-slate-200">
                <img
                  src="https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=800&q=80"
                  alt="Community work"
                  className="w-full h-80 sm:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
              </div>
              {/* floating card */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-5 border border-slate-100 max-w-[200px]"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-400 to-teal-500 flex items-center justify-center">
                    <CheckCircle size={16} className="text-white" />
                  </div>
                  <span className="font-bold text-slate-800 text-sm">Verified NGO</span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">UN-registered & internationally certified humanitarian organization.</p>
              </motion.div>
              {/* second image */}
              <div className="absolute -top-6 -left-6 w-32 h-32 rounded-2xl overflow-hidden shadow-xl border-4 border-white">
                <img src="https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=300&q=80" alt="Field work" className="w-full h-full object-cover" />
              </div>
            </div>
          </Reveal>

          {/* Text */}
          <div>
            <Reveal delay={0.1}>
              <span className="inline-block text-sky-600 text-xs font-bold tracking-widest uppercase mb-3">Our Story</span>
              <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6 leading-tight" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                A Decade of Standing With the Vulnerable
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-slate-600 text-base leading-relaxed mb-6">
                Founded in 2014 by a coalition of humanitarian professionals, Horizon Humanity Foundation was born from a simple but urgent conviction: that every person, regardless of geography or circumstance, deserves dignity, safety, and opportunity. What began as a small emergency response team in West Africa has grown into a globally-recognized humanitarian force operating across 47 countries.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="text-slate-600 text-base leading-relaxed mb-8">
                We believe that sustainable impact is not delivered — it is built together with communities, honoring their knowledge, leadership, and resilience.
              </p>
            </Reveal>

            {/* Mission / Vision */}
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  label: "Our Mission",
                  text: "To deliver life-saving humanitarian support while building long-term community resilience across the world's most vulnerable regions.",
                  icon: <Heart size={18} />,
                  bg: "bg-sky-50",
                  border: "border-sky-100",
                  iconBg: "from-sky-400 to-blue-500",
                },
                {
                  label: "Our Vision",
                  text: "A world where every human being lives in safety, health, and dignity — free from poverty, conflict, and exclusion.",
                  icon: <Globe size={18} />,
                  bg: "bg-teal-50",
                  border: "border-teal-100",
                  iconBg: "from-teal-400 to-emerald-500",
                },
              ].map((item, i) => (
                <Reveal key={i} delay={0.4 + i * 0.1}>
                  <div className={`${item.bg} ${item.border} border rounded-2xl p-5`}>
                    <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${item.iconBg} flex items-center justify-center text-white mb-3`}>
                      {item.icon}
                    </div>
                    <h4 className="font-bold text-slate-800 text-sm mb-2">{item.label}</h4>
                    <p className="text-slate-600 text-xs leading-relaxed">{item.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Programs ─────────────────────────────────────────────────────────────────
function Programs() {
  return (
    <section id="programs" className="py-24 sm:py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <Reveal>
          <div className="text-center mb-16">
            <span className="text-sky-600 text-xs font-bold tracking-widest uppercase">What We Do</span>
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mt-3 mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              Our Core Programs
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto text-base leading-relaxed">
              Six pillars of intervention, designed to address the most critical dimensions of human suffering and community flourishing.
            </p>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROGRAMS.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="group relative bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl hover:shadow-slate-200 border border-slate-100 transition-all duration-400 cursor-pointer"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                  <div className={`absolute inset-0 bg-gradient-to-br ${p.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-teal-500 flex items-center justify-center text-white shadow-lg shadow-sky-200 group-hover:shadow-sky-300 transition-shadow">
                      {p.icon}
                    </div>
                    <h3 className="font-bold text-slate-900 text-base group-hover:text-sky-700 transition-colors" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                      {p.title}
                    </h3>
                  </div>
                  <p className="text-slate-500 text-sm leading-relaxed">{p.desc}</p>
                  <div className="mt-4 flex items-center gap-1.5 text-sky-600 font-semibold text-xs group-hover:gap-3 transition-all duration-300">
                    Learn More <ArrowRight size={12} />
                  </div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── How We Help ──────────────────────────────────────────────────────────────
function HowWeHelp() {
  return (
    <section className="py-24 sm:py-32 bg-slate-950 relative overflow-hidden">
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(14,165,233,0.07) 0%, transparent 70%)" }} />
      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative">
        <Reveal>
          <div className="text-center mb-16">
            <span className="text-sky-400 text-xs font-bold tracking-widest uppercase">Our Approach</span>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mt-3 mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              How We Create Change
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto text-base leading-relaxed">
              A proven three-stage methodology that moves from crisis to transformation.
            </p>
          </div>
        </Reveal>

        <div className="relative grid lg:grid-cols-3 gap-8">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-1/3 left-[16.67%] right-[16.67%] h-px bg-gradient-to-r from-sky-500/50 via-teal-500/50 to-emerald-500/50" />

          {STEPS.map((step, i) => (
            <Reveal key={step.num} delay={i * 0.15}>
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
                className="relative p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/8 hover:border-white/20 transition-all group"
              >
                {/* Step number */}
                <div className="absolute -top-4 left-8 bg-gradient-to-br from-sky-500 to-teal-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg shadow-sky-500/30">
                  {step.num}
                </div>

                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-500/20 to-teal-500/20 border border-sky-500/30 flex items-center justify-center text-sky-400 mb-6 group-hover:scale-110 transition-transform">
                  {step.icon}
                </div>

                <h3 className="text-white font-bold text-xl mb-3" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                  {step.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Impact ───────────────────────────────────────────────────────────────────
function Impact() {
  return (
    <section id="impact" className="py-24 sm:py-32 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-sky-50 blur-3xl opacity-50 -translate-y-1/2" />
      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative">
        <Reveal>
          <div className="text-center mb-16">
            <span className="text-sky-600 text-xs font-bold tracking-widest uppercase">Our Impact</span>
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mt-3 mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              Numbers That Tell Human Stories
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto text-base leading-relaxed">
              Every statistic represents a real person, a transformed community, a life rebuilt with dignity.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
          {IMPACT_STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1}>
              <motion.div
                whileHover={{ scale: 1.04 }}
                className="relative p-6 sm:p-8 rounded-3xl border border-slate-100 bg-gradient-to-br from-white to-slate-50 shadow-md hover:shadow-xl hover:shadow-slate-100 transition-all group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-sky-500/0 to-teal-500/0 group-hover:from-sky-500/5 group-hover:to-teal-500/5 transition-all duration-500" />
                <div className="flex items-center gap-2 text-sky-500 mb-3">
                  {s.icon}
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">{s.label}</span>
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-slate-900" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                  <AnimatedCounter value={s.value} suffix={s.suffix} />
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>

        {/* Additional impact imagery */}
        <Reveal delay={0.3}>
          <div className="mt-16 grid sm:grid-cols-3 gap-4 rounded-3xl overflow-hidden">
            {[
              "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=600&q=80",
              "https://images.unsplash.com/photo-1524069290683-0457abfe42c3?w=600&q=80",
              "https://images.unsplash.com/photo-1578357078586-491adf1aa5ba?w=600&q=80",
            ].map((src, i) => (
              <div key={i} className="relative h-48 overflow-hidden rounded-2xl">
                <img src={src} alt="Impact" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
function Testimonials() {
  const [active, setActive] = useState(0);

  return (
    <section id="testimonials" className="py-24 sm:py-32 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <Reveal>
          <div className="text-center mb-16">
            <span className="text-sky-600 text-xs font-bold tracking-widest uppercase">Human Stories</span>
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mt-3 mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              Voices of Change
            </h2>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -6 }}
                className="bg-white rounded-3xl p-6 shadow-md hover:shadow-xl transition-all border border-slate-100 flex flex-col h-full"
              >
                {/* Stars */}
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={13} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed flex-1 mb-5 italic">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <img src={t.img} alt={t.name} className="w-10 h-10 rounded-full object-cover border-2 border-sky-100" />
                  <div>
                    <div className="font-bold text-slate-900 text-sm">{t.name}</div>
                    <div className="text-slate-400 text-xs">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Emergency Appeal ─────────────────────────────────────────────────────────
function EmergencyAppeal() {
  return (
    <section className="py-20 sm:py-28 bg-slate-950 relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=1600&q=80"
          alt="Emergency"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/80" />
      </div>

      <div className="relative max-w-4xl mx-auto px-5 sm:px-8 text-center">
        <Reveal>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold tracking-widest uppercase mb-8 animate-pulse">
            <Zap size={12} />
            Current Emergency Appeal
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            Displaced Families Need Your Help{" "}
            <span className="text-red-400">Right Now</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-4 max-w-2xl mx-auto">
            Thousands of families displaced by conflict and climate crisis are without food, clean water, or shelter. Our emergency teams are on the ground — but we need resources immediately.
          </p>
          <p className="text-slate-400 text-sm mb-10 max-w-xl mx-auto">
            Help provide emergency food packages, medical aid, and temporary shelter to displaced families in active crisis zones across three continents.
          </p>

          <a
            href={DONATE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-2xl text-white font-bold text-lg overflow-hidden shadow-2xl shadow-red-500/20 hover:shadow-red-500/40 transition-all duration-300 hover:scale-105"
            style={{ background: "linear-gradient(135deg, #ef4444, #f97316)" }}
          >
            <span className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300" />
            <Heart size={20} />
            Respond to the Emergency
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

// ─── CTA Section ──────────────────────────────────────────────────────────────
function CTA() {
  return (
    <section className="py-24 sm:py-32 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0c4a6e 0%, #0e7490 50%, #0f766e 100%)" }}>
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-white blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-white blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto px-5 sm:px-8 text-center">
        <Reveal>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            Your Support Can Change Someone&apos;s Entire Future Today
          </h2>
          <p className="text-sky-100 text-base sm:text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Whether you donate, volunteer, or spread the word — every action creates a ripple of humanity that reaches far beyond what you can see.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={DONATE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center gap-2 px-9 py-4 rounded-2xl bg-white text-slate-900 font-bold text-base shadow-2xl hover:shadow-white/20 hover:scale-105 transition-all duration-300 overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-sky-500/0 via-teal-500/10 to-sky-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              <Heart size={16} className="text-rose-500" />
              Donate Now
            </a>
            <button className="inline-flex items-center justify-center gap-2 px-9 py-4 rounded-2xl border-2 border-white/40 text-white font-bold text-base hover:bg-white/10 hover:border-white/60 transition-all duration-300">
              <Users size={16} />
              Become a Volunteer
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer id="contact" className="bg-slate-950 border-t border-white/5 pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-400 to-teal-500 flex items-center justify-center">
                <Globe size={18} className="text-white" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-white font-bold text-sm tracking-wide" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>HORIZON</span>
                <span className="text-sky-400 text-[10px] tracking-[0.15em] uppercase font-medium">Humanity Foundation</span>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Standing with the vulnerable. Building resilient communities. Creating lasting humanitarian change since 2014.
            </p>
            <div className="flex gap-3">
              {[
                { icon: <FaFacebookF size={14} />, href: "#" },
                { icon: <FaTwitter size={14} />, href: "#" },
                { icon: <FaInstagram size={14} />, href: "#" },
                { icon: <FaLinkedinIn size={14} />, href: "#" },
                { icon: <FaYoutube size={14} />, href: "#" },
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  className="w-9 h-9 rounded-xl bg-white/5 hover:bg-sky-500/20 hover:text-sky-400 text-slate-400 flex items-center justify-center transition-all duration-200"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm mb-5 tracking-wide">Quick Links</h4>
            <ul className="space-y-3">
              {["About Us", "Our Programs", "Impact Stories", "Volunteer", "Donate", "Annual Reports", "Press Room"].map((link) => (
                <li key={link}>
                  <a href="#" className="text-slate-400 text-sm hover:text-sky-400 transition-colors flex items-center gap-1.5 group">
                    <ArrowRight size={10} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-200" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold text-sm mb-5 tracking-wide">Contact Us</h4>
            <div className="space-y-4">
              {[
                { icon: <MapPin size={15} />, text: "14 Solidarity Drive, Lagos, Nigeria" },
                { icon: <Phone size={15} />, text: "+234 000 000 0000" },
                { icon: <Mail size={15} />, text: "hello@horizonhumanity.org" },
                { icon: <Clock size={15} />, text: "Mon – Fri: 8:00 AM – 6:00 PM WAT" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 text-slate-400 text-sm">
                  <span className="text-sky-400 mt-0.5 flex-shrink-0">{item.icon}</span>
                  {item.text}
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-bold text-sm mb-5 tracking-wide">Stay Informed</h4>
            <p className="text-slate-400 text-sm mb-4 leading-relaxed">
              Join 12,000+ supporters receiving our humanitarian updates and impact stories.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-sky-500 transition-colors"
              />
              <button className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-teal-500 flex items-center justify-center text-white hover:scale-105 transition-transform flex-shrink-0">
                <Send size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-xs">
            &copy; 2024 Horizon Humanity Foundation. All rights reserved. Registered Humanitarian Organization.
          </p>
          <div className="flex gap-4 text-slate-500 text-xs">
            <a href="#" className="hover:text-sky-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-sky-400 transition-colors">Terms of Use</a>
            <a href="#" className="hover:text-sky-400 transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function HorizonHumanityFoundation() {
  useEffect(() => {
    // Load Google Font
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  return (
    <div className="min-h-screen antialiased">
      <Navbar />
      <Hero />
      <About />
      <Programs />
      <HowWeHelp />
      <Impact />
      <Testimonials />
      <EmergencyAppeal />
      <CTA />
      <Footer />
    </div>
  );
}
