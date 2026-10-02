"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { FaInstagram } from "react-icons/fa";
import { Phone, MapPin, Clock, Star, ChevronDown, ShoppingBag, BookOpen, Menu, X, ArrowRight, Sparkles, CheckCircle, Link } from "lucide-react";

const services = [
  {
    title: "Microshading",
    desc: "A soft, powdered brow technique that creates a flawless, makeup-like finish. Perfect for all skin types and those who want defined, long-lasting brows.",
    duration: "2–3 hrs",
    tag: "Most Popular",
  },
  {
    title: "Microblading",
    desc: "Ultra-fine, hair-stroke technique that mimics the natural look of brow hair. Ideal for sparse brows that need realistic fullness and shape.",
    duration: "2 hrs",
    tag: "Natural Look",
  },
  {
    title: "Combo Brows",
    desc: "The best of both worlds  microblading strokes at the front with microshading through the tail for definition and dimension.",
    duration: "2.5 hrs",
    tag: "Signature",
  },
  {
    title: "Brow Shaping & Design",
    desc: "Expert brow mapping and shaping to enhance your natural arch. Every treatment begins with precision brow design tailored to your face.",
    duration: "45 min",
    tag: "Prep & Style",
  },
];

const reviews = [
  {
    name: "Jasmine T.",
    rating: 5,
    text: "I love my brows and I get compliments every single day. RN is beyond talented  she took the time to understand exactly what I wanted and delivered perfection.",
    date: "2 weeks ago",
  },
  {
    name: "Monique R.",
    rating: 5,
    text: "She made me feel so comfortable the entire time. I was nervous but she walked me through every step. My brows are absolutely stunning.",
    date: "1 month ago",
  },
  {
    name: "Aaliyah K.",
    rating: 5,
    text: "My brows still look flawless after 2 years. I've gotten touch-ups and every time they look even better. Best investment I've ever made in myself.",
    date: "3 months ago",
  },
  {
    name: "Priya M.",
    rating: 5,
    text: "The studio is so clean and luxurious  the whole experience felt like a high-end spa. RN is a true artist and it shows in her work.",
    date: "5 months ago",
  },
  {
    name: "DeShea W.",
    rating: 5,
    text: "I drove from Milwaukee because the reviews were too good to ignore. Worth every mile. I wake up with perfect brows every morning now.",
    date: "6 months ago",
  },
];

const galleryImages = [
  {
    url: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&q=80",
    label: "Microshading",
    span: "col-span-1 row-span-2",
    h: "h-full min-h-[320px]",
  },
  {
    url: "https://images.unsplash.com/photo-1560869713-7d0a29430803?w=600&q=80",
    label: "Combo Brows",
    span: "col-span-1",
    h: "h-[180px]",
  },
  {
    url: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80",
    label: "Healing Results",
    span: "col-span-1",
    h: "h-[180px]",
  },
  {
    url: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&q=80",
    label: "Natural Microblading",
    span: "col-span-1",
    h: "h-[220px]",
  },
  {
    url: "https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=600&q=80",
    label: "Powder Brows",
    span: "col-span-1",
    h: "h-[220px]",
  },
];

function FadeIn({
  children,
  delay = 0,
  direction = "up",
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const dirMap = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { y: 0, x: 40 },
    right: { y: 0, x: -40 },
    none: { y: 0, x: 0 },
  };
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...dirMap[direction] }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);
  const links = ["Services", "Gallery", "Reviews", "About", "Contact"];
  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-[#0c0a09]/90 backdrop-blur-xl border-b border-[#c9a96e]/20 py-3" : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2">
            <span className="text-[#c9a96e] text-xs">✦</span>
            <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }} className="text-xl font-semibold tracking-widest text-white">
                Brows by RN
            </span>
            <span className="text-[#c9a96e] text-xs">✦</span>
          </a>
          <div className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <a key={l} href={`#${l.toLowerCase()}`} className="text-white/60 hover:text-[#c9a96e] transition-colors text-xs tracking-[0.15em] uppercase font-light">
                {l}
              </a>
            ))}
            <a href="tel:+16514024979" className="ml-4 bg-[#c9a96e] text-[#0c0a09] text-xs font-semibold tracking-[0.15em] uppercase px-5 py-2.5 rounded-full hover:bg-[#e0bf83] transition-all">
              Book Now
            </a>
          </div>
          <button onClick={() => setOpen(!open)} className="md:hidden text-white p-1" aria-label="Toggle menu">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-[#0c0a09]/97 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {links.map((l, i) => (
              <motion.a
                key={l}
                href={`#${l.toLowerCase()}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                onClick={() => setOpen(false)}
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                className="text-3xl text-white/80 hover:text-[#c9a96e] transition-colors tracking-widest"
              >
                {l}
              </motion.a>
            ))}
            <motion.a
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              href="tel:+16122420473"
              className="mt-4 bg-[#c9a96e] text-[#0c0a09] font-semibold tracking-[0.15em] uppercase px-8 py-3 rounded-full text-sm"
              onClick={() => setOpen(false)}
            >
              Book Appointment
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 120]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0c0a09]">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] rounded-full bg-[#c9a96e]/8 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[50vw] h-[50vw] rounded-full bg-[#8b6f47]/10 blur-[100px]" />
      </div>
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "200px",
        }}
      />
      <div className="absolute left-6 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-3">
        <div className="w-px h-24 bg-gradient-to-b from-transparent via-[#c9a96e]/40 to-transparent" />
        <span className="text-[#c9a96e]/50 text-[10px] tracking-[0.3em] uppercase rotate-90 whitespace-nowrap">Minneapolis, MN</span>
        <div className="w-px h-24 bg-gradient-to-b from-transparent via-[#c9a96e]/40 to-transparent" />
      </div>
      <motion.div style={{ y, opacity }} className="relative z-10 max-w-5xl mx-auto px-6 pt-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="hidden sm:inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border border-[#c9a96e]/30 bg-[#c9a96e]/5"
        >
          <Star size={12} className="fill-[#c9a96e] text-[#c9a96e] hidden sm:block" />
          <span className="text-[#c9a96e] hidden sm:block text-[8px] md:text-xs tracking-[0.2em] uppercase font-light">5.0 Rating · Minneapolis's Premier PMU Studio</span>
          <Star size={12} className="fill-[#c9a96e] text-[#c9a96e] hidden sm:block" />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          className="text-5xl sm:text-6xl md:text-7xl font-light text-white leading-[0.95] tracking-tight mb-6"
        >
          Wake Up With{" "}
          <span className="italic text-[#c9a96e]">Perfect Brows</span>
          <br />
          <span className="font-extralight"> Every Day</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.7 }}
          className="text-white/50 text-base sm:text-lg max-w-xl mx-auto mb-10 leading-relaxed font-light tracking-wide"
        >
          Permanent makeup artistry designed for effortless beauty. Expert precision that celebrates every skin tone, every face.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#booking"
            className="group relative overflow-hidden bg-[#c9a96e] text-[#0c0a09] font-semibold tracking-[0.15em] uppercase text-sm px-8 py-4 rounded-full transition-all hover:bg-[#e0bf83] hover:shadow-[0_0_40px_rgba(201,169,110,0.4)] flex items-center justify-center gap-2"
          >
            <Sparkles size={14} />
            Book Appointment
            <motion.span animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}>
              <ArrowRight size={14} />
            </motion.span>
          </a>
          <a
            href="tel:+16122420473"
            className="group border border-white/20 text-white/80 hover:border-[#c9a96e]/60 hover:text-[#c9a96e] font-light tracking-[0.15em] uppercase text-sm px-8 py-4 rounded-full transition-all flex items-center justify-center gap-2"
          >
            <Phone size={14} />
            Call Now
          </a>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="mt-16 flex justify-center gap-12 sm:gap-20"
        >
          {[{ num: "5.0", label: "Star Rating" }, { num: "50+", label: "Clients Served" }, { num: "2yr+", label: "Results Last" }].map(({ num, label }) => (
            <div key={label} className="text-center">
              <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }} className="text-3xl sm:text-4xl text-[#c9a96e] font-light">{num}</div>
              <div className="text-white/40 text-[10px] tracking-[0.2em] uppercase mt-1">{label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>
      {/* <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30 flex flex-col items-center gap-1"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <ChevronDown size={16} />
      </motion.div> */}
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="bg-[#0c0a09] py-28 px-6 relative">
      <div className="absolute right-0 top-1/2 w-[40vw] h-[40vw] rounded-full bg-[#c9a96e]/5 blur-[100px] pointer-events-none" />
      <div className="max-w-7xl mx-auto">
        <FadeIn className="text-center mb-16">
          <span className="text-[#c9a96e] text-[10px] tracking-[0.35em] uppercase">What We Offer</span>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }} className="text-4xl sm:text-6xl font-light text-white mt-3 leading-tight">
            Permanent Makeup <span className="italic text-[#c9a96e]">Services</span>
          </h2>
          <p className="text-white/40 max-w-md mx-auto mt-4 text-sm leading-relaxed">Each treatment is tailored to your unique features  crafted with precision and care that lasts.</p>
        </FadeIn>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((s, i) => (
            <FadeIn key={s.title} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="group relative bg-white/[0.03] border border-white/[0.07] hover:border-[#c9a96e]/30 rounded-2xl p-7 flex flex-col gap-4 transition-all duration-300 hover:bg-white/[0.055] cursor-default"
              >
                <span className="self-start text-[10px] tracking-[0.2em] uppercase text-[#c9a96e] bg-[#c9a96e]/10 px-3 py-1 rounded-full">{s.tag}</span>
                <div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }} className="text-xl text-white font-light tracking-wide">{s.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed mt-2">{s.desc}</p>
                </div>
                <div className="flex items-center gap-2 mt-auto pt-2 border-t border-white/[0.06]">
                  <Clock size={12} className="text-[#c9a96e]/60" />
                  <span className="text-white/30 text-xs tracking-wider">{s.duration}</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9a96e]/0 to-transparent group-hover:via-[#c9a96e]/40 transition-all duration-500 rounded-full" />
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  return (
    <section id="gallery" className="bg-[#080706] py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="text-center mb-16">
          <span className="text-[#c9a96e] text-[10px] tracking-[0.35em] uppercase">Real Results</span>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }} className="text-4xl sm:text-6xl font-light text-white mt-3">
            The Work Speaks <span className="italic text-[#c9a96e]">For Itself</span>
          </h2>
        </FadeIn>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          {galleryImages.map((item, i) => (
            <FadeIn key={i} delay={i * 0.08} className={item.span}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 200 }}
                className={`relative overflow-hidden rounded-xl ${item.h} cursor-pointer group bg-[#1a1510]`}
              >
                <img
                  src={item.url}
                  alt={item.label}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/25 group-hover:bg-black/10 transition-all duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-white/90 text-xs tracking-[0.2em] uppercase">{item.label}</span>
                </div>
                <div className="absolute top-3 right-3 w-6 h-6 border-t border-r border-[#c9a96e]/50" />
                <div className="absolute bottom-3 left-3 w-6 h-6 border-b border-l border-[#c9a96e]/50" />
              </motion.div>
            </FadeIn>
          ))}
        </div>
        <FadeIn className="text-center mt-10">
          <a
            href="https://www.instagram.com/beat.hive"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#c9a96e] border border-[#c9a96e]/30 px-6 py-3 rounded-full text-sm tracking-[0.15em] uppercase hover:bg-[#c9a96e]/10 transition-all"
          >
            <FaInstagram size={14} />
            View More on Instagram
          </a>
        </FadeIn>
      </div>
    </section>
  );
}

function Reviews() {
  const [activeIdx, setActiveIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActiveIdx((p) => (p + 1) % reviews.length), 4500);
    return () => clearInterval(t);
  }, []);
  return (
    <section id="reviews" className="bg-[#0c0a09] py-28 px-6 relative overflow-hidden">
      <div className="absolute left-0 top-1/2 w-[50vw] h-[50vw] rounded-full bg-[#c9a96e]/5 blur-[120px] pointer-events-none -translate-y-1/2" />
      <div className="max-w-5xl mx-auto relative z-10">
        <FadeIn className="text-center mb-16">
          <span className="text-[#c9a96e] text-[10px] tracking-[0.35em] uppercase">Client Love</span>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }} className="text-4xl sm:text-6xl font-light text-white mt-3">
            What They're <span className="italic text-[#c9a96e]">Saying</span>
          </h2>
          <div className="flex items-center justify-center gap-1.5 mt-5">
            {[...Array(5)].map((_, i) => <Star key={i} size={16} className="fill-[#c9a96e] text-[#c9a96e]" />)}
            <span className="text-white/40 text-sm ml-2">5.0 ·29+  Reviews</span>
          </div>
        </FadeIn>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIdx}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-12"
          >
            <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }} className="text-2xl sm:text-4xl font-light text-white/80 leading-relaxed max-w-2xl mx-auto italic">
              "{reviews[activeIdx].text}"
            </div>
            <div className="mt-6 flex items-center justify-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#c9a96e]/20 flex items-center justify-center text-[#c9a96e] text-xs font-semibold">{reviews[activeIdx].name[0]}</div>
              <div>
                <div className="text-white/70 text-sm tracking-wide">{reviews[activeIdx].name}</div>
                <div className="text-white/30 text-xs">{reviews[activeIdx].date}</div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
        <div className="flex justify-center gap-2 mb-14">
          {reviews.map((_, i) => (
            <button key={i} onClick={() => setActiveIdx(i)} className={`rounded-full transition-all ${i === activeIdx ? "w-8 h-1.5 bg-[#c9a96e]" : "w-1.5 h-1.5 bg-white/20 hover:bg-white/40"}`} />
          ))}
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {reviews.slice(0, 3).map((r, i) => (
            <FadeIn key={r.name} delay={i * 0.1}>
              <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6 flex flex-col gap-3">
                <div className="flex gap-1">{[...Array(r.rating)].map((_, j) => <Star key={j} size={11} className="fill-[#c9a96e] text-[#c9a96e]" />)}</div>
                <p className="text-white/50 text-sm leading-relaxed">"{r.text}"</p>
                <div className="flex items-center gap-2 mt-auto pt-3 border-t border-white/[0.06]">
                  <div className="w-7 h-7 rounded-full bg-[#c9a96e]/15 flex items-center justify-center text-[#c9a96e] text-xs">{r.name[0]}</div>
                  <div>
                    <div className="text-white/60 text-xs">{r.name}</div>
                    <div className="text-white/25 text-[10px]">{r.date}</div>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="bg-[#080706] py-28 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        <FadeIn direction="right">
          <div className="relative">
            {/* ── Artist photo: replace this src with RN's actual photo ── */}
            <div className="aspect-[3/4] max-w-sm mx-auto rounded-2xl overflow-hidden bg-[#1e1710] relative">
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#1e1710]">
                <div className="w-20 h-20 rounded-full border-2 border-dashed border-[#c9a96e]/40 flex items-center justify-center">
                  <svg viewBox="0 0 40 40" className="w-9 h-9 opacity-40" fill="none">
                    <circle cx="20" cy="14" r="7" stroke="#c9a96e" strokeWidth="1.5" />
                    <path d="M6 36c0-7.732 6.268-14 14-14s14 6.268 14 14" stroke="#c9a96e" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
                <span className="text-[#c9a96e]/50 text-[10px] tracking-[0.25em] uppercase text-center px-4">Add RN's photo here</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/90 to-transparent">
                <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }} className="text-2xl text-white font-light">Ron (RN)</div>
                <div className="text-[#c9a96e] text-xs tracking-[0.2em] uppercase mt-1">Lead PMU Artist</div>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 bg-[#c9a96e] text-[#0c0a09] px-5 py-3 rounded-xl text-center shadow-lg shadow-[#c9a96e]/20">
              <div className="text-2xl font-bold leading-none">5.0</div>
              <div className="text-[10px] tracking-[0.15em] uppercase font-semibold mt-0.5">Rated</div>
            </div>
          </div>
        </FadeIn>
        <FadeIn direction="left" delay={0.15}>
          <div>
            <span className="text-[#c9a96e] text-[10px] tracking-[0.35em] uppercase">The Artist Behind the Brows</span>
            <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }} className="text-4xl sm:text-5xl font-light text-white mt-3 leading-tight">
              Precision You Can <span className="italic text-[#c9a96e]">Trust</span>
            </h2>
            <p className="text-white/50 mt-5 text-sm leading-relaxed">
              RN is Minneapolis's go-to permanent makeup artist  known for her gentle touch, expert eye, and transformative results. With hundreds of happy clients and a 5-star reputation, she treats each appointment as a one-of-a-kind collaboration.
            </p>
            <p className="text-white/40 mt-4 text-sm leading-relaxed">
              Whether you're new to PMU or returning for a touch-up, you'll feel seen, heard, and completely at ease from the moment you walk in. The studio at  5451 Lyndale Ave S is a calm, luxurious space designed for your comfort.
            </p>
            <div className="mt-8 space-y-3">
              {["Certified permanent makeup specialist", "Inclusive beauty for all skin tones", "Sterile, spa-quality studio environment", "Personalized brow mapping every session"].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle size={14} className="text-[#c9a96e] shrink-0" />
                  <span className="text-white/50 text-sm">{item}</span>
                </div>
              ))}
            </div>
            <a href="#booking" className="mt-10 inline-flex items-center gap-2 bg-transparent border border-[#c9a96e]/40 text-[#c9a96e] hover:bg-[#c9a96e] hover:text-[#0c0a09] font-semibold tracking-[0.15em] uppercase text-xs px-7 py-3.5 rounded-full transition-all duration-300">
              Book With RN
              <ArrowRight size={12} />
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function Booking() {
  const [form, setForm] = useState({ name: "", phone: "", service: "", date: "", notes: "" });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.phone.trim()) e.phone = "Phone is required";
    if (!form.service) e.service = "Please select a service";
    if (!form.date) e.date = "Please pick a date";
    return e;
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setSubmitted(true);
  };
  return (
    <section id="booking" className="bg-[#0c0a09] py-28 px-6 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60vw] h-[60vw] rounded-full bg-[#c9a96e]/5 blur-[130px]" />
      </div>
      <div className="max-w-2xl mx-auto relative z-10">
        <FadeIn className="text-center mb-12">
          <span className="text-[#c9a96e] text-[10px] tracking-[0.35em] uppercase">Limited Spots Available</span>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }} className="text-4xl sm:text-6xl font-light text-white mt-3">
            Secure Your <span className="italic text-[#c9a96e]">Spot</span>
          </h2>
          <p className="text-white/40 mt-4 text-sm max-w-xs mx-auto">Fill out the form and we'll confirm your appointment within 24 hours.</p>
        </FadeIn>
        {submitted ? (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-16 bg-white/[0.03] border border-[#c9a96e]/20 rounded-2xl">
            <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 0.6 }} className="text-5xl mb-4">✨</motion.div>
            <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }} className="text-3xl text-white font-light">Request Sent!</h3>
            <p className="text-white/40 mt-3 text-sm">We'll be in touch within 24 hours to confirm your appointment.</p>
            <a href="tel:+16122420473" className="mt-6 inline-flex items-center gap-2 text-[#c9a96e] text-sm hover:underline"><Phone size={13} /> Or call us directly</a>
          </motion.div>
        ) : (
          <FadeIn delay={0.1}>
            <form onSubmit={handleSubmit} className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-8 sm:p-10 space-y-5">
              {[{ key: "name", label: "Full Name", type: "text", placeholder: "Your name" }, { key: "phone", label: "Phone Number", type: "tel", placeholder: "+1 (555) 000-0000" }].map(({ key, label, type, placeholder }) => (
                <div key={key}>
                  <label className="block text-white/40 text-[10px] tracking-[0.2em] uppercase mb-2">{label}</label>
                  <input type={type} placeholder={placeholder} value={form[key as keyof typeof form]} onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))} className="w-full bg-white/[0.04] border border-white/[0.08] focus:border-[#c9a96e]/40 rounded-xl px-4 py-3.5 text-white text-sm placeholder-white/20 outline-none transition-all" />
                  {errors[key] && <p className="text-red-400/70 text-xs mt-1">{errors[key]}</p>}
                </div>
              ))}
              <div>
                <label className="block text-white/40 text-[10px] tracking-[0.2em] uppercase mb-2">Service</label>
                <select value={form.service} onChange={(e) => setForm((f) => ({ ...f, service: e.target.value }))} className="w-full bg-white/[0.04] border border-white/[0.08] focus:border-[#c9a96e]/40 rounded-xl px-4 py-3.5 text-sm outline-none transition-all text-white/80 appearance-none">
                  <option value="" className="bg-[#1a1510]">Select a service…</option>
                  {services.map((s) => <option key={s.title} value={s.title} className="bg-[#1a1510]">{s.title}</option>)}
                </select>
                {errors.service && <p className="text-red-400/70 text-xs mt-1">{errors.service}</p>}
              </div>
              <div>
                <label className="block text-white/40 text-[10px] tracking-[0.2em] uppercase mb-2">Preferred Date</label>
                <input type="date" value={form.date} onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))} className="w-full bg-white/[0.04] border border-white/[0.08] focus:border-[#c9a96e]/40 rounded-xl px-4 py-3.5 text-white/80 text-sm outline-none transition-all" />
                {errors.date && <p className="text-red-400/70 text-xs mt-1">{errors.date}</p>}
              </div>
              <div>
                <label className="block text-white/40 text-[10px] tracking-[0.2em] uppercase mb-2">Notes (Optional)</label>
                <textarea placeholder="Any questions or special requests…" value={form.notes} onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))} rows={3} className="w-full bg-white/[0.04] border border-white/[0.08] focus:border-[#c9a96e]/40 rounded-xl px-4 py-3.5 text-white text-sm placeholder-white/20 outline-none transition-all resize-none" />
              </div>
              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" className="w-full bg-[#c9a96e] hover:bg-[#e0bf83] text-[#0c0a09] font-semibold tracking-[0.15em] uppercase text-sm py-4 rounded-xl transition-all hover:shadow-[0_0_40px_rgba(201,169,110,0.35)] flex items-center justify-center gap-2">
                <Sparkles size={14} />
                Secure Your Spot
              </motion.button>
            </form>
          </FadeIn>
        )}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="bg-[#080706] py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="text-center mb-14">
          <span className="text-[#c9a96e] text-[10px] tracking-[0.35em] uppercase">Find Us</span>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }} className="text-4xl sm:text-5xl font-light text-white mt-3">
            Visit the <span className="italic text-[#c9a96e]">Studio</span>
          </h2>
        </FadeIn>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { icon: <MapPin size={18} className="text-[#c9a96e]" />, title: "Location", lines: [" 5451 Lyndale Ave S", "Minneapolis, Minnesota"] },
            { icon: <Phone size={18} className="text-[#c9a96e]" />, title: "Phone", lines: ["+1 651-402-4979  "], link: "tel:+16122420473  " },
            { icon: <Clock size={18} className="text-[#c9a96e]" />, title: "Hours", lines: ["Mon – Sat: 10:30 AM – 7 PM", "Sun: By Appointment"] },
          ].map((item, i) => (
            <FadeIn key={item.title} delay={i * 0.1}>
              <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-7 flex flex-col gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#c9a96e]/10 flex items-center justify-center">{item.icon}</div>
                <div>
                  <div className="text-white/30 text-[10px] tracking-[0.2em] uppercase mb-1">{item.title}</div>
                  {item.lines.map((l) => item.link
                    ? <a key={l} href={item.link} className="block text-white/70 hover:text-[#c9a96e] transition-colors text-sm">{l}</a>
                    : <div key={l} className="text-white/60 text-sm">{l}</div>
                  )}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={0.2} className="mt-5">
          <div className="rounded-2xl overflow-hidden border border-white/[0.07] h-56">
            <iframe
              title="  Brows by RN Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2974.7!2d-87.6546!3d41.8240!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s928+W+38th+Pl+Minneapolis!5e0!3m2!1sen!2sus!4v1"
              width="100%" height="100%"
              style={{ border: 0, filter: "grayscale(100%) invert(90%)" }}
              allowFullScreen loading="lazy"
            />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function Links() {
  const items = [
    { icon: <ShoppingBag size={16} />, label: "Shop Products", href: "https://linktr.ee/Beat.hive" },
    { icon: <BookOpen size={16} />, label: "PMU Training", href: "https://linktr.ee/Beat.hive" },
    { icon: <FaInstagram size={16} />, label: "Instagram", href: "https://www.instagram.com/beat.hive" },
    { icon: <Phone size={16} />, label: "Call / Book", href: "tel:+16122420473 " },
    { icon: <Link size={16} />, label: "All Links", href: "https://linktr.ee/Beat.hive" },
  ];
  return (
    <section className="bg-[#0c0a09] border-t border-white/[0.05] py-16 px-6">
      <div className="max-w-xl mx-auto text-center">
        <FadeIn>
          <span className="text-[#c9a96e] text-[10px] tracking-[0.35em] uppercase">Connect With Us</span>
          <p className="text-white/25 text-xs mt-2 mb-6">
            <a href="https://linktr.ee/Beat.hive" target="_blank" rel="noopener noreferrer" className="hover:text-[#c9a96e] transition-colors underline-offset-2 hover:underline">See what RN's up to...</a>
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {items.map((item, i) => (
              <motion.a
                key={item.label}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -3 }}
                className="flex flex-col items-center gap-2 p-4 bg-white/[0.03] border border-white/[0.07] hover:border-[#c9a96e]/30 rounded-xl transition-all group"
              >
                <div className="text-[#c9a96e]/60 group-hover:text-[#c9a96e] transition-colors">{item.icon}</div>
                <span className="text-white/40 group-hover:text-white/70 text-xs tracking-wide transition-colors">{item.label}</span>
              </motion.a>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#080706] border-t border-white/[0.05] px-6 py-10">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-5">
        <div className="flex items-center gap-2">
          <span className="text-[#c9a96e] text-xs">✦</span>
          <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }} className="text-white/60 text-lg tracking-widest">  Brows by RN</span>
          <span className="text-[#c9a96e] text-xs">✦</span>
        </div>
        <div className="text-white/20 text-xs text-center">
          © {new Date().getFullYear()}   Brows by RN · 5451 Lyndale Ave S, Minneapolis, Minnesota ·{" "}
          <a href="tel:+16514024979" className="hover:text-[#c9a96e] transition-colors">+1 651-402-4979</a>
        </div>
        <div className="flex gap-4 items-center">
          <a href="https://www.instagram.com/beat.hive" target="_blank" rel="noopener noreferrer" className="text-white/20 hover:text-[#c9a96e] transition-colors" aria-label="Instagram">
            <FaInstagram size={16} />
          </a>
          <a href="https://linktr.ee/Beat.hive" target="_blank" rel="noopener noreferrer" className="text-white/20 hover:text-[#c9a96e] transition-colors" aria-label="Linktree">
            <Link size={16} />
          </a>
        </div>
      </div>
    </footer>
  );
}

function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return (
    <AnimatePresence>
      {visible && (
        <motion.div initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 80, opacity: 0 }} className="md:hidden fixed bottom-4 left-4 right-4 z-50 flex gap-3">
          <a href="tel:+16122420473  " className="flex-1 flex items-center justify-center gap-2 bg-white/10 backdrop-blur-xl border border-white/20 text-white font-semibold text-sm py-4 rounded-xl">
            <Phone size={15} />
            Call
          </a>
          <a href="#booking" className="flex-[2] flex items-center justify-center gap-2 bg-[#c9a96e] text-[#0c0a09] font-semibold text-sm py-4 rounded-xl hover:bg-[#e0bf83] transition-colors">
            <Sparkles size={15} />
            Book Appointment
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function BeatHivePage() {
  return (
    <>
    <div className="overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&display=swap');
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { background: #0c0a09; margin: 0; }
        input[type=date]::-webkit-calendar-picker-indicator { filter: invert(1) opacity(0.3); }
        select option { background: #1a1510; color: #fff; }
      `}</style>
      <Nav />
      <main>
        <Hero />
        <Services />
        <Gallery />
        <Reviews />
        <About />
        <Booking />
        <Contact />
        <Links />
        <Footer />
      </main>
      <StickyMobileCTA />
      </div>
    </>
  );
}
