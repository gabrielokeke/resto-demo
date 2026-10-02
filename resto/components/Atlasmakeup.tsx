"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useInView } from "framer-motion";
import { twMerge } from "tailwind-merge";
import {
  MapPin,
  Phone,
  Clock,
  Instagram,
  ChevronDown,
  Star,
  Send,
  ArrowRight,
  Sparkles,
  Heart,
  Award,
  Users,
} from "lucide-react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";

// ─── Color Palette ───────────────────────────────────────────────
// ivory: #FAF7F2
// blush: #F2D4C8
// mauve: #C4A0A0
// dustyrose: #B07070
// warm-neutral: #E8DDD5
// text-dark: #3A2E2E

// ─── Types ───────────────────────────────────────────────────────
interface ServiceItem {
  title: string;
  description: string;
  icon: string;
}

interface TestimonialItem {
  name: string;
  role: string;
  text: string;
  rating: number;
}

// ─── Data ────────────────────────────────────────────────────────
const SERVICES: ServiceItem[] = [
  {
    title: "Bridal Makeup",
    description:
      "Timeless, flawless looks crafted to last all day. Every stroke honors the most important moment of your life.",
    icon: "💍",
  },
  {
    title: "Editorial & Photoshoot",
    description:
      "Camera-ready artistry that translates beautifully on screen — bold, natural, or anywhere in between.",
    icon: "📸",
  },
  {
    title: "Special Occasion Glam",
    description:
      "Baby showers, quinceañeras, galas. Arrive feeling like the best version of yourself.",
    icon: "✨",
  },
  {
    title: "Natural Everyday Look",
    description:
      "Effortlessly polished — enhancing your features while keeping your skin the star of the show.",
    icon: "🌿",
  },
  {
    title: "Airbrush Makeup",
    description:
      "Ultra-smooth, weightless finish with professional airbrush technology for a skin-like effect.",
    icon: "🪄",
  },
  {
    title: "Group & Bridal Party",
    description:
      "Coordinated, stress-free glam sessions for your entire party. Consistency and calm on your big day.",
    icon: "👯",
  },
];

const TESTIMONIALS: TestimonialItem[] = [
  {
    name: "Josefina",
    role: "Photoshoot Client",
    text: "I cannot say enough amazing things about Vanessa! Not only is she incredibly talented, but she is also such a beautiful human being inside and out. She created the most flawless, natural look for my photoshoot — exactly what I wanted.",
    rating: 5,
  },
  {
    name: "G.F.",
    role: "Bride",
    text: "Vanessa was amazing! She did my bridal makeup just as I wanted. It looked natural and lasted all day. She is a true professional, very accommodating, and she loves what she does. I highly recommend Vanessa to get you glammed up for your special occasion!",
    rating: 5,
  },
  {
    name: "Paula Castillo",
    role: "Baby Shower",
    text: "Worth every penny! I booked Vanessa for my baby shower and not only was my makeup flawless, I have never felt more beautiful. She is very lovely and professional while also making you feel at home. She took her time and checked in throughout.",
    rating: 5,
  },
  {
    name: "Maria L.",
    role: "Quinceañera Mother",
    text: "Each time she has made the whole experience feel relaxed and empowering. Vanessa has a gift for making every client feel seen and beautiful. We will not go to anyone else.",
    rating: 5,
  },
];

const GALLERY_IMAGES = [
  "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&q=80",
  "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=600&q=80",
  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80",
  "https://images.unsplash.com/photo-1515688594390-b649af70d282?w=600&q=80",
  "https://images.unsplash.com/photo-1560869713-7d0a29430803?w=600&q=80",
  "https://images.unsplash.com/photo-1503236823255-94609f598e71?w=600&q=80",
  "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&q=80",
  "https://images.unsplash.com/photo-1519415943484-9fa1873496d4?w=600&q=80",
];

// ─── Animation Variants ──────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1, ease: "easeOut" } },
};

// ─── Sub-components ──────────────────────────────────────────────

function SectionTag({ label }: { label: string }) {
  return (
    <motion.div
      variants={fadeUp}
      className="inline-flex items-center gap-2 text-[#B07070] text-xs tracking-[0.25em] uppercase font-medium mb-4"
    >
      <span className="block w-6 h-px bg-[#B07070]" />
      {label}
      <span className="block w-6 h-px bg-[#B07070]" />
    </motion.div>
  );
}

function StarRow({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={13} className="fill-[#C4A0A0] text-[#C4A0A0]" />
      ))}
    </div>
  );
}

// ─── Section: Hero ───────────────────────────────────────────────
function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Parallax Background */}
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1519415943484-9fa1873496d4?w=1600&q=85"
          alt="Hero background"
          className="w-full h-full object-cover object-center scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#FAF7F2]/30 via-[#FAF7F2]/50 to-[#FAF7F2]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAF7F2]/60 via-transparent to-[#FAF7F2]/20" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
      >
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
          className="text-[#B07070] tracking-[0.3em] uppercase text-xs font-medium mb-6 flex items-center justify-center gap-3"
        >
          <span className="w-8 h-px bg-[#B07070] inline-block" />
          Bronx, New York · Est. Artist
          <span className="w-8 h-px bg-[#B07070] inline-block" />
        </motion.p>

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
          className="font-['Cormorant_Garamond',Georgia,serif] text-[#3A2E2E] text-5xl md:text-7xl lg:text-8xl font-light leading-[1.05] mb-6"
        >
          The Art of
          <br />
          <em className="italic font-normal text-[#B07070]">Feeling Beautiful</em>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
          className="text-[#6B5050] text-lg md:text-xl font-light max-w-xl mx-auto mb-10 leading-relaxed"
          style={{ fontFamily: "'Jost', 'DM Sans', sans-serif" }}
        >
          Vanessa Alas crafts flawless, natural looks for brides, photoshoots &
          every occasion that deserves to be remembered.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={3}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a
            href="#contact"
            className="group bg-[#B07070] hover:bg-[#9a5f5f] text-white px-8 py-4 text-sm tracking-widest uppercase transition-all duration-300 flex items-center gap-2"
          >
            Book Your Session
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#services"
            className="border border-[#C4A0A0] text-[#6B5050] hover:bg-[#F2D4C8]/40 px-8 py-4 text-sm tracking-widest uppercase transition-all duration-300"
          >
            View Services
          </a>
        </motion.div>

        {/* Rating Badge */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={4}
          className="mt-14 flex items-center justify-center gap-6"
        >
          <div className="flex flex-col items-center">
            <span className="font-['Cormorant_Garamond',Georgia,serif] text-3xl text-[#3A2E2E] font-light">5.0</span>
            <StarRow />
            <span className="text-[10px] tracking-widest text-[#9a7070] uppercase mt-1">26 Reviews</span>
          </div>
          <div className="w-px h-12 bg-[#C4A0A0]/50" />
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-1.5 text-[#9a7070] text-xs tracking-wider">
              <Heart size={12} className="fill-[#C4A0A0] text-[#C4A0A0]" />
              Women-Owned
            </div>
            <div className="flex items-center gap-1.5 text-[#9a7070] text-xs tracking-wider">
              <Award size={12} className="text-[#C4A0A0]" />
              Latino-Owned
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[#9a7070]"
      >
        <span className="text-[9px] tracking-[0.3em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
        >
          <ChevronDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  );
}

// ─── Section: About ──────────────────────────────────────────────
function AboutSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      id="about"
      className="relative py-28 overflow-hidden bg-[#FAF7F2]"
    >
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1400&q=60')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(2px)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#FAF7F2] via-[#FAF7F2]/95 to-[#FAF7F2]/80" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        {/* Image col */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="aspect-[4/5] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=700&q=85"
              alt="Vanessa at work"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </div>
          {/* Decorative frame */}
          <div className="absolute -bottom-6 -right-6 w-full h-full border border-[#C4A0A0]/40 -z-10" />
          {/* Badge */}
          <div className="absolute -top-4 -left-4 bg-[#B07070] text-white px-5 py-3 text-center">
            <div className="font-['Cormorant_Garamond',Georgia,serif] text-3xl font-light leading-none">5.0</div>
            <div className="text-[9px] tracking-widest uppercase mt-0.5 opacity-80">Rated</div>
          </div>
        </motion.div>

        {/* Text col */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <SectionTag label="About Vanessa" />
          <h2
            className="font-['Cormorant_Garamond',Georgia,serif] text-4xl md:text-5xl text-[#3A2E2E] font-light leading-tight mb-6"
          >
            More Than Makeup —<br />
            <em className="italic text-[#B07070]">It's Confidence.</em>
          </h2>
          <p
            className="text-[#6B5050] leading-relaxed mb-5 text-base"
            style={{ fontFamily: "'Jost', 'DM Sans', sans-serif" }}
          >
            Based in the Bronx, New York, Vanessa Alas is a passionate makeup
            artist dedicated to making every client feel empowered and
            beautiful. From intimate bridal mornings to high-energy photoshoots,
            Vanessa brings a calm, professional energy that puts every client at
            ease.
          </p>
          <p
            className="text-[#6B5050] leading-relaxed mb-8 text-base"
            style={{ fontFamily: "'Jost', 'DM Sans', sans-serif" }}
          >
            Currently booking brides for <strong className="text-[#B07070]">2026–2027</strong>. Her
            philosophy is simple: understand your vision, honor your features,
            and create a look that is entirely, unmistakably you.
          </p>

          <div className="flex flex-wrap gap-3 mb-8">
            {["Women-Owned", "Latino-Owned", "Bridal Specialist"].map((tag) => (
              <span
                key={tag}
                className="border border-[#C4A0A0] text-[#9a7070] text-xs px-4 py-2 tracking-wider uppercase"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-6 pt-6 border-t border-[#E8DDD5]">
            {[
              { value: "26+", label: "Reviews" },
              { value: "5★", label: "Rating" },
              { value: "100%", label: "Love" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-['Cormorant_Garamond',Georgia,serif] text-3xl text-[#B07070] font-light">
                  {stat.value}
                </div>
                <div className="text-[10px] tracking-widest text-[#9a7070] uppercase mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Section: Services ───────────────────────────────────────────
function ServicesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      id="services"
      className="relative py-28 overflow-hidden"
    >
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1515688594390-b649af70d282?w=1600&q=70')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#FAF7F2] via-[#FAF7F2]/92 to-[#FAF7F2]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
          className="text-center mb-16"
        >
          <SectionTag label="Services" />
          <h2 className="font-['Cormorant_Garamond',Georgia,serif] text-4xl md:text-6xl text-[#3A2E2E] font-light leading-tight">
            Every Look, <em className="italic text-[#B07070]">Perfected</em>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="group bg-white/70 backdrop-blur-sm border border-[#E8DDD5] hover:border-[#C4A0A0] p-8 hover:shadow-lg hover:shadow-[#C4A0A0]/10 transition-all duration-500 hover:-translate-y-1"
            >
              <div className="text-3xl mb-4">{service.icon}</div>
              <h3
                className="font-['Cormorant_Garamond',Georgia,serif] text-xl text-[#3A2E2E] mb-3 group-hover:text-[#B07070] transition-colors duration-300"
              >
                {service.title}
              </h3>
              <p
                className="text-[#6B5050] text-sm leading-relaxed"
                style={{ fontFamily: "'Jost', 'DM Sans', sans-serif" }}
              >
                {service.description}
              </p>
              <div className="mt-5 w-0 group-hover:w-8 h-px bg-[#B07070] transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section: Testimonials ───────────────────────────────────────
function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      ref={ref}
      id="testimonials"
      className="relative py-28 overflow-hidden"
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1503236823255-94609f598e71?w=1600&q=70')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#F2D4C8]/80 via-[#FAF7F2]/90 to-[#FAF7F2]" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
        >
          <SectionTag label="Client Love" />
          <h2 className="font-['Cormorant_Garamond',Georgia,serif] text-4xl md:text-6xl text-[#3A2E2E] font-light mb-16">
            Words from Our <em className="italic text-[#B07070]">Clients</em>
          </h2>
        </motion.div>

        {/* Active Card */}
        <div className="relative h-64 sm:h-48 mb-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 bg-white/60 backdrop-blur-md border border-[#E8DDD5] p-8 md:p-10 flex flex-col items-center justify-center"
            >
              <StarRow />
              <p
                className="text-[#4A3535] text-base md:text-lg leading-relaxed my-5 max-w-2xl mx-auto italic font-light"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                "{TESTIMONIALS[active].text}"
              </p>
              <div>
                <div
                  className="text-[#3A2E2E] font-medium text-sm tracking-wide"
                  style={{ fontFamily: "'Jost', sans-serif" }}
                >
                  {TESTIMONIALS[active].name}
                </div>
                <div className="text-[#9a7070] text-xs tracking-widest uppercase mt-0.5">
                  {TESTIMONIALS[active].role}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={twMerge(
                "w-2 h-2 rounded-full transition-all duration-300",
                i === active ? "bg-[#B07070] w-6" : "bg-[#C4A0A0]/50"
              )}
            />
          ))}
        </div>

        {/* All Cards grid (sm+) */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-16">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
              onClick={() => setActive(i)}
              className={twMerge(
                "cursor-pointer bg-white/50 backdrop-blur border border-[#E8DDD5] p-5 text-left transition-all duration-300",
                active === i && "border-[#C4A0A0] shadow-md shadow-[#C4A0A0]/15"
              )}
            >
              <StarRow />
              <p
                className="text-[#4A3535] text-xs leading-relaxed mt-3 line-clamp-3 italic"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                "{t.text}"
              </p>
              <div className="mt-3 text-[10px] text-[#9a7070] tracking-widest uppercase">
                — {t.name}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section: Gallery ────────────────────────────────────────────
function GallerySection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} id="gallery" className="relative py-28 bg-[#FAF7F2] overflow-hidden">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1560869713-7d0a29430803?w=1600&q=50')",
          backgroundSize: "cover",
        }}
      />
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
          className="text-center mb-16"
        >
          <SectionTag label="Gallery" />
          <h2 className="font-['Cormorant_Garamond',Georgia,serif] text-4xl md:text-6xl text-[#3A2E2E] font-light">
            The <em className="italic text-[#B07070]">Portfolio</em>
          </h2>
        </motion.div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {GALLERY_IMAGES.map((src, i) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className={twMerge(
                "group relative overflow-hidden",
                i === 0 || i === 5 ? "md:row-span-2" : ""
              )}
              style={{ aspectRatio: i === 0 || i === 5 ? "3/4" : "1/1" }}
            >
              <img
                src={src}
                alt={`Gallery ${i + 1}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-[#B07070]/0 group-hover:bg-[#B07070]/20 transition-all duration-500 flex items-center justify-center">
                <Sparkles
                  size={24}
                  className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 text-[#B07070] border border-[#C4A0A0] px-8 py-4 text-xs tracking-widest uppercase hover:bg-[#F2D4C8]/40 transition-all duration-300"
          >
            <FaInstagram size={16} />
            View More on Instagram
          </a>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Section: Contact ────────────────────────────────────────────
function ContactSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3500);
  };

  return (
    <section
      ref={ref}
      id="contact"
      className="relative py-28 overflow-hidden"
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1600&q=70')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#FAF7F2] via-[#FAF7F2]/92 to-[#FAF7F2]" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-start">
        {/* Info */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9 }}
        >
          <SectionTag label="Get in Touch" />
          <h2 className="font-['Cormorant_Garamond',Georgia,serif] text-4xl md:text-5xl text-[#3A2E2E] font-light mb-8">
            Book Your <em className="italic text-[#B07070]">Session</em>
          </h2>
          <p
            className="text-[#6B5050] leading-relaxed mb-10"
            style={{ fontFamily: "'Jost', 'DM Sans', sans-serif" }}
          >
            Now booking brides for 2026–2027. Reach out for availability,
            pricing, and to schedule your consultation. Vanessa looks forward
            to meeting you.
          </p>

          <div className="space-y-5">
            {[
              {
                icon: <MapPin size={16} />,
                label: "Location",
                value: "531 Tinton Ave, Bronx, NY 10455",
              },
              {
                icon: <Phone size={16} />,
                label: "Phone",
                value: "+1 347-681-3859",
              },
              {
                icon: <Clock size={16} />,
                label: "Hours",
                value: "Opens 7 AM · By Appointment",
              },
              {
                icon: <Instagram size={16} />,
                label: "Instagram",
                value: "instagram.com/vanessaalasmua",
              },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-4">
                <div className="w-9 h-9 border border-[#C4A0A0] flex items-center justify-center text-[#B07070] shrink-0 mt-0.5">
                  {item.icon}
                </div>
                <div>
                  <div className="text-[10px] tracking-widest uppercase text-[#9a7070] mb-0.5">
                    {item.label}
                  </div>
                  <div
                    className="text-[#3A2E2E] text-sm"
                    style={{ fontFamily: "'Jost', sans-serif" }}
                  >
                    {item.value}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-4 mt-10">
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noreferrer"
              className="w-10 h-10 border border-[#C4A0A0] flex items-center justify-center text-[#B07070] hover:bg-[#F2D4C8] transition-colors duration-300"
            >
              <FaInstagram size={16} />
            </a>
            <a
              href="tel:+13476813859"
              className="w-10 h-10 border border-[#C4A0A0] flex items-center justify-center text-[#B07070] hover:bg-[#F2D4C8] transition-colors duration-300"
            >
              <FaWhatsapp size={16} />
            </a>
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="bg-white/70 backdrop-blur-sm border border-[#E8DDD5] p-8"
        >
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-16 text-center"
              >
                <Heart size={36} className="fill-[#C4A0A0] text-[#C4A0A0] mb-4" />
                <h3 className="font-['Cormorant_Garamond',Georgia,serif] text-2xl text-[#3A2E2E] mb-2">
                  Message Sent!
                </h3>
                <p className="text-[#9a7070] text-sm">
                  Vanessa will be in touch soon.
                </p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                <h3
                  className="font-['Cormorant_Garamond',Georgia,serif] text-2xl text-[#3A2E2E] font-light mb-6"
                >
                  Send a Message
                </h3>
                {[
                  { label: "Your Name", type: "text", placeholder: "Jane Doe" },
                  { label: "Email", type: "email", placeholder: "jane@email.com" },
                  { label: "Event Date", type: "date", placeholder: "" },
                ].map((field) => (
                  <div key={field.label}>
                    <label
                      className="block text-[9px] tracking-widest uppercase text-[#9a7070] mb-2"
                      style={{ fontFamily: "'Jost', sans-serif" }}
                    >
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      required
                      className="w-full border border-[#E8DDD5] bg-white/60 px-4 py-3 text-[#3A2E2E] text-sm focus:outline-none focus:border-[#C4A0A0] transition-colors placeholder-[#9a7070]/50"
                      style={{ fontFamily: "'Jost', sans-serif" }}
                    />
                  </div>
                ))}
                <div>
                  <label
                    className="block text-[9px] tracking-widest uppercase text-[#9a7070] mb-2"
                    style={{ fontFamily: "'Jost', sans-serif" }}
                  >
                    Message
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell me about your event..."
                    required
                    className="w-full border border-[#E8DDD5] bg-white/60 px-4 py-3 text-[#3A2E2E] text-sm focus:outline-none focus:border-[#C4A0A0] transition-colors resize-none placeholder-[#9a7070]/50"
                    style={{ fontFamily: "'Jost', sans-serif" }}
                  />
                </div>
                <button
                  type="submit"
                  className="group w-full bg-[#B07070] hover:bg-[#9a5f5f] text-white px-8 py-4 text-xs tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Send Message
                  <Send size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Section: Map ────────────────────────────────────────────────
function MapSection() {
  return (
    <section id="map" className="relative h-80 md:h-[420px] overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#FAF7F2] to-transparent z-10" />
      <iframe
        title="Vanessa Alas Location"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3020.8219153820207!2d-73.9108!3d40.8096!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2f3e1a0f0d00b%3A0x1234567890abcdef!2s531%20Tinton%20Ave%2C%20Bronx%2C%20NY%2010455!5e0!3m2!1sen!2sus!4v1610000000000!5m2!1sen!2sus"
        width="100%"
        height="100%"
        style={{ border: 0, filter: "saturate(0.6) contrast(1.05)" }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="absolute inset-0"
      />
      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#FAF7F2] to-transparent z-10" />
    </section>
  );
}

// ─── Section: Footer ─────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-[#FAF7F2] border-t border-[#E8DDD5] py-12 px-6">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="text-center md:text-left">
          <div className="font-['Cormorant_Garamond',Georgia,serif] text-2xl text-[#3A2E2E] font-light tracking-wide">
            Vanessa Alas
          </div>
          <div className="text-[10px] tracking-widest text-[#9a7070] uppercase mt-1">
            Makeup Artist · Bronx, New York
          </div>
        </div>

        <nav className="flex flex-wrap justify-center gap-6">
          {["About", "Services", "Gallery", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-[10px] tracking-widest uppercase text-[#9a7070] hover:text-[#B07070] transition-colors duration-300"
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="w-8 h-8 border border-[#C4A0A0] flex items-center justify-center text-[#B07070] hover:bg-[#F2D4C8] transition-colors"
          >
            <FaInstagram size={13} />
          </a>
          <a
            href="tel:+13476813859"
            className="w-8 h-8 border border-[#C4A0A0] flex items-center justify-center text-[#B07070] hover:bg-[#F2D4C8] transition-colors"
          >
            <Phone size={13} />
          </a>
        </div>
      </div>

      <div className="max-w-5xl mx-auto mt-8 pt-8 border-t border-[#E8DDD5] flex flex-col md:flex-row items-center justify-between gap-3">
        <p
          className="text-[10px] tracking-wider text-[#9a7070]"
          style={{ fontFamily: "'Jost', sans-serif" }}
        >
          © {new Date().getFullYear()} Vanessa Alas Makeup Artist. All rights reserved.
        </p>
        <div className="flex items-center gap-1.5">
          <Heart size={10} className="fill-[#C4A0A0] text-[#C4A0A0]" />
          <span className="text-[10px] tracking-wider text-[#9a7070]">
            Women-Owned · Latino-Owned
          </span>
        </div>
      </div>
    </footer>
  );
}

// ─── Nav ─────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={twMerge(
        "fixed top-0 inset-x-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#E8DDD5] py-4"
          : "bg-transparent py-6"
      )}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <a
          href="#"
          className="font-['Cormorant_Garamond',Georgia,serif] text-xl text-[#3A2E2E] font-light tracking-wide"
        >
          Vanessa Alas
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {["About", "Services", "Gallery", "Testimonials", "Contact"].map(
            (item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-[10px] tracking-widest uppercase text-[#6B5050] hover:text-[#B07070] transition-colors duration-300"
              >
                {item}
              </a>
            )
          )}
          <a
            href="#contact"
            className="border border-[#C4A0A0] text-[#B07070] px-5 py-2.5 text-[10px] tracking-widest uppercase hover:bg-[#F2D4C8]/50 transition-all duration-300"
          >
            Book Now
          </a>
        </nav>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Menu"
        >
          <span
            className={twMerge(
              "block w-6 h-px bg-[#3A2E2E] transition-all duration-300",
              open && "rotate-45 translate-y-2.5"
            )}
          />
          <span
            className={twMerge(
              "block w-6 h-px bg-[#3A2E2E] transition-all duration-300",
              open && "opacity-0"
            )}
          />
          <span
            className={twMerge(
              "block w-6 h-px bg-[#3A2E2E] transition-all duration-300",
              open && "-rotate-45 -translate-y-2.5"
            )}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-[#FAF7F2] border-t border-[#E8DDD5]"
          >
            <nav className="flex flex-col px-6 py-6 gap-5">
              {["About", "Services", "Gallery", "Testimonials", "Contact"].map(
                (item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    onClick={() => setOpen(false)}
                    className="text-xs tracking-widest uppercase text-[#6B5050] hover:text-[#B07070] transition-colors"
                  >
                    {item}
                  </a>
                )
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

// ─── Main Export ─────────────────────────────────────────────────
export default function VanessaAlasMakeupArtistPage() {
  return (
    <>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@300;400;500&display=swap');
        html { scroll-behavior: smooth; }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #FAF7F2; }
      `}</style>

      <div className="min-h-screen bg-[#FAF7F2]" style={{ fontFamily: "'Jost', sans-serif" }}>
        <Navbar />
        <main>
          <HeroSection />
          <AboutSection />
          <ServicesSection />
          <TestimonialsSection />
          <GallerySection />
          <ContactSection />
          <MapSection />
        </main>
        <Footer />
      </div>
    </>
  );
}