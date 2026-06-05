"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, ArrowUpRight, ChevronDown } from "lucide-react";
import { FaInstagram, FaWhatsapp, FaBehance, FaPinterest, FaPlay } from "react-icons/fa";
import { MdPhotoCamera, MdMovieEdit, MdDiamond } from "react-icons/md";
import { RiFilmLine, RiStarFill, RiHeartLine, RiCameraLensLine, RiGlobeLine } from "react-icons/ri";
import { BiMovie } from "react-icons/bi";
import { HiSparkles } from "react-icons/hi";
import * as THREE from "three";

const BOOKING_URL = "https://wa.me/2340000000000?text=Hello%20I%20would%20like%20to%20book%20a%20photography%20session";

const navLinks = ["Home", "Portfolio", "Services", "Experience", "Testimonials", "Contact"];

const portfolioItems = [
  { category: "Portrait Photography", img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80", aspect: "tall" },
  { category: "Fashion Photography", img: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80", aspect: "tall" },
  { category: "Event Coverage", img: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80", aspect: "tall" },
  { category: "Lifestyle Shoots", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80", aspect: "tall" },
  { category: "Creative Direction", img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&q=80", aspect: "tall" },
  { category: "Cinematic Visuals", img: "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?w=800&q=80", aspect: "tall" },
];

const services = [
  { icon: <MdDiamond size={32} />, title: "Wedding Photography", desc: "Timeless narratives of your most sacred day  cinematic, emotional, unforgettable.", tag: "Signature" },
  { icon: <RiCameraLensLine size={32} />, title: "Fashion Shoots", desc: "Editorial-grade fashion captures that push boundaries and define aesthetic identities.", tag: "Premium" },
  { icon: <MdPhotoCamera size={32} />, title: "Portrait Sessions", desc: "Deeply personal, beautifully lit portraits that reveal the soul behind the face.", tag: "Intimate" },
  { icon: <BiMovie size={32} />, title: "Event Coverage", desc: "Every moment documented with cinematic precision  nothing escapes the lens.", tag: "Dynamic" },
  { icon: <RiGlobeLine size={32} />, title: "Brand Photography", desc: "Premium visual identity imagery that positions your brand as a luxury authority.", tag: "Strategic" },
  { icon: <MdMovieEdit size={32} />, title: "Creative Direction", desc: "Full creative concepting, styling, and execution for visionary visual campaigns.", tag: "Visionary" },
];

const stats = [
  { val: "100+", label: "Shoots Completed" },
  { val: "5★", label: "Client Experience" },
  { val: "4K", label: "Cinematic Editing" },
  { val: "∞", label: "Luxury Storytelling" },
];

const testimonials = [
  {
    name: "Adaeze Okonkwo",
    role: "Fashion Designer, Lagos",
    img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&q=80",
    text: "Evalenz captured something I didn't even know existed in me. Every frame felt like a luxury editorial campaign. I was blown away.",
    stars: 5,
  },
  {
    name: "Emeka & Chisom",
    role: "Newlyweds, Abuja",
    img: "https://images.unsplash.com/photo-1519741497674-611481863552?w=200&q=80",
    text: "Our wedding album looks like a Vogue spread. People still ask us who our photographer was. Evalenz is simply in another league.",
    stars: 5,
  },
  {
    name: "Tolu Adeyemi",
    role: "Creative Director, London",
    img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80",
    text: "Working with Evalenz elevated our entire brand campaign. The visual intelligence and cinematic eye here is genuinely world-class.",
    stars: 5,
  },
];

// ─── THREE.JS PARTICLE SCENE ──────────────────────────────────────────────────
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
    camera.position.z = 5;

    // Gold/amber particles
    const count = 1800;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
      const warm = Math.random();
      colors[i * 3] = 0.9 + warm * 0.1;
      colors[i * 3 + 1] = 0.65 + warm * 0.25;
      colors[i * 3 + 2] = 0.05 + warm * 0.2;
      sizes[i] = Math.random() * 2.5 + 0.5;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geo.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    const mat = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(geo, mat);
    scene.add(particles);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouseMove);

    const handleResize = () => {
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      particles.rotation.y = t * 0.02;
      particles.rotation.x = t * 0.008;

      camera.position.x += (mouseRef.current.x * 0.4 - camera.position.x) * 0.04;
      camera.position.y += (mouseRef.current.y * 0.3 - camera.position.y) * 0.04;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      geo.dispose();
      mat.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}

// ─── NAV ──────────────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-black/60 backdrop-blur-xl border-b border-white/5 shadow-2xl" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div className="flex items-center gap-2 cursor-pointer group" whileHover={{ scale: 1.02 }}>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/30">
              <RiFilmLine size={16} className="text-black" />
            </div>
            <span className="text-white font-bold text-xl tracking-[0.15em] uppercase" style={{ fontFamily: "'Playfair Display', serif" }}>
              Evalenz
            </span>
          </motion.div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <motion.a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-white/60 hover:text-amber-400 text-sm tracking-widest uppercase transition-colors duration-300"
                whileHover={{ y: -1 }}
              >
                {link}
              </motion.a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:block">
            <motion.a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 text-black text-sm font-bold tracking-wider uppercase shadow-lg shadow-amber-500/25 hover:shadow-amber-500/50 transition-all duration-300"
            >
              Book Session
            </motion.a>
          </div>

          {/* Mobile toggle */}
          <button className="md:hidden text-white" onClick={() => setOpen(!open)}>
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-10"
          >
            {navLinks.map((link, i) => (
              <motion.a
                key={link}
                href={`#${link.toLowerCase()}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                className="text-white text-3xl font-light tracking-[0.2em] uppercase"
                onClick={() => setOpen(false)}
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {link}
              </motion.a>
            ))}
            <motion.a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: navLinks.length * 0.07 }}
              className="mt-4 px-8 py-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 text-black font-bold tracking-wider uppercase"
            >
              Book Session
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── SECTION REVEAL WRAPPER ───────────────────────────────────────────────────
function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 180]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Particle canvas */}
      <ParticleCanvas />

      {/* Deep cinematic gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black z-10" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(217,119,6,0.08)_0%,transparent_65%)] z-10" />

      {/* Background photo */}
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1800&q=85"
          alt="Hero"
          className="w-full h-full object-cover opacity-20"
        />
      </motion.div>

      {/* Content */}
      <motion.div style={{ opacity }} className="relative z-20 max-w-6xl mx-auto px-6 md:px-10 pt-30 md:pt-40 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 backdrop-blur-sm"
        >
          <HiSparkles className="text-amber-400" size={14} />
          <span className="text-amber-400 text-[10px] md:text-xs tracking-[0.25em] uppercase font-medium">Luxury Visual Storytelling</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-white leading-[0.9] tracking-tight mb-8"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Every Frame
          <br />
          <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-amber-300 bg-clip-text text-transparent">
            Tells A Story.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.8 }}
          className="text-white/55 text-base md:text-lg max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Luxury photography, cinematic storytelling, emotional moments, and timeless visuals crafted into unforgettable experiences.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
        >
          <motion.a
            href="#portfolio"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className="group flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-bold tracking-wider uppercase text-sm hover:bg-amber-400 transition-all duration-300 shadow-2xl"
          >
            View Portfolio
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </motion.a>
          <motion.a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className="flex items-center gap-2 px-8 py-4 rounded-full border border-amber-500/50 text-amber-400 font-bold tracking-wider uppercase text-sm hover:bg-amber-500/10 transition-all duration-300"
          >
            Book A Session
          </motion.a>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {stats.map((s, i) => (
            <div
              key={i}
              className="px-6 py-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-amber-500/30 transition-all duration-300"
            >
              <div className="text-2xl md:text-3xl font-bold text-amber-400 mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                {s.val}
              </div>
              <div className="text-white/50 text-xs tracking-widest uppercase">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      {/* <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <div className="text-white/30 text-xs tracking-widest uppercase">Scroll</div>
        <ChevronDown size={16} className="text-amber-500/60" />
      </motion.div> */}
    </section>
  );
}

// ─── PORTFOLIO ────────────────────────────────────────────────────────────────
function Portfolio() {
  return (
    <section id="portfolio" className="bg-black py-32 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <Reveal className="text-center mb-20">
          <span className="text-amber-500 text-xs tracking-[0.3em] uppercase font-medium block mb-4">Selected Works</span>
          <h2 className="text-4xl md:text-6xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
            The Portfolio
          </h2>
          <p className="text-white/40 mt-4 max-w-xl mx-auto">Each image is a universe  composed, lit, and felt with intention.</p>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {portfolioItems.map((item, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className={`relative group overflow-hidden rounded-2xl cursor-pointer ${item.aspect === "tall" ? "row-span-2" : ""}`}
              >
                <div className={`w-full ${item.aspect === "tall" ? "h-96 md:h-[500px]" : item.aspect === "wide" ? "h-56 md:h-64" : "h-64 md:h-72"}`}>
                  <img
                    src={item.img}
                    alt={item.category}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <span className="text-amber-400 text-xs tracking-widest uppercase">{item.category}</span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-white font-semibold text-sm">View Project</span>
                    <ArrowUpRight size={14} className="text-amber-400" />
                  </div>
                </div>
                {/* Glow border */}
                <div className="absolute inset-0 rounded-2xl border border-amber-500/0 group-hover:border-amber-500/30 transition-all duration-500" />
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── SERVICES ─────────────────────────────────────────────────────────────────
function Services() {
  return (
    <section id="services" className="relative bg-black py-32 px-6 md:px-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(217,119,6,0.06)_0%,transparent_60%)]" />
      <div className="max-w-7xl mx-auto relative z-10">
        <Reveal className="text-center mb-20">
          <span className="text-amber-500 text-xs tracking-[0.3em] uppercase font-medium block mb-4">What I Offer</span>
          <h2 className="text-4xl md:text-6xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
            Services
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc, i) => (
            <Reveal key={i} delay={i * 0.07}>
              <motion.div
                whileHover={{ y: -8, scale: 1.01 }}
                className="group relative p-8 rounded-3xl bg-white/3 border border-white/8 hover:border-amber-500/30 backdrop-blur-sm transition-all duration-500 cursor-default overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 to-amber-500/0 group-hover:from-amber-500/5 group-hover:to-transparent transition-all duration-500 rounded-3xl" />
                <div className="absolute top-4 right-4 px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/20">
                  <span className="text-amber-400 text-[10px] tracking-widest uppercase font-medium">{svc.tag}</span>
                </div>
                <div className="text-amber-400 mb-5 group-hover:scale-110 transition-transform duration-300 w-fit">{svc.icon}</div>
                <h3 className="text-white font-bold text-xl mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>{svc.title}</h3>
                <p className="text-white/45 text-sm leading-relaxed">{svc.desc}</p>
                <div className="mt-6 flex items-center gap-2 text-amber-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <span>Learn more</span>
                  <ArrowRight size={14} />
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── EXPERIENCE ───────────────────────────────────────────────────────────────
function Experience() {
  return (
    <section id="experience" className="relative bg-black py-32 px-6 md:px-10 overflow-hidden">
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-amber-500/20 to-transparent" />
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Visual */}
          <Reveal>
            <div className="relative">
              <div className="rounded-3xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=900&q=85"
                  alt="Experience"
                  className="w-full h-[550px] object-cover"
                />
              </div>
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              {/* Float badge */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute -bottom-6 -right-6 p-6 rounded-2xl bg-black/80 backdrop-blur-xl border border-amber-500/20 shadow-2xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center">
                    <RiFilmLine size={18} className="text-black" />
                  </div>
                  <div>
                    <div className="text-white font-bold text-sm">Cinematic Grade</div>
                    <div className="text-white/40 text-xs">4K · Color Science · Emotion</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </Reveal>

          {/* Text */}
          <Reveal delay={0.2}>
            <span className="text-amber-500 text-xs tracking-[0.3em] uppercase font-medium block mb-6">The Experience</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
              Photography That
              <br />
              <span className="text-amber-400">Moves You.</span>
            </h2>
            <div className="space-y-6 text-white/50 leading-relaxed">
              <p>Every session begins with a conversation  understanding you, your story, your vision. Because the best photographs don't just capture moments, they interpret them.</p>
              <p>From pre-shoot creative direction to cinematic post-production, every frame is obsessively crafted with luxury lighting, emotional composition, and a director's eye.</p>
              <p>The result isn't just photos. It's a visual legacy  timeless, personal, and genuinely premium in every detail.</p>
            </div>
            <div className="mt-10 flex flex-wrap gap-4">
              {["Emotional Direction", "Cinematic Lighting", "Premium Editing", "Luxury Experience"].map((tag) => (
                <span key={tag} className="px-4 py-2 rounded-full border border-amber-500/25 text-amber-400/80 text-xs tracking-widest uppercase">
                  {tag}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// ─── TESTIMONIALS ─────────────────────────────────────────────────────────────
function Testimonials() {
  return (
    <section id="testimonials" className="bg-black py-32 px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        <Reveal className="text-center mb-20">
          <span className="text-amber-500 text-xs tracking-[0.3em] uppercase font-medium block mb-4">Client Stories</span>
          <h2 className="text-4xl md:text-6xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
            What They Say
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -6 }}
                className="group p-8 rounded-3xl bg-white/3 border border-white/8 hover:border-amber-500/25 transition-all duration-500 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl group-hover:bg-amber-500/10 transition-all duration-500" />
                {/* Stars */}
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <RiStarFill key={j} className="text-amber-400" size={14} />
                  ))}
                </div>
                <p className="text-white/65 leading-relaxed text-sm mb-6 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <img src={t.img} alt={t.name} className="w-10 h-10 rounded-full object-cover border border-amber-500/20" />
                  <div>
                    <div className="text-white font-semibold text-sm">{t.name}</div>
                    <div className="text-white/35 text-xs">{t.role}</div>
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

// ─── SPOTLIGHT ────────────────────────────────────────────────────────────────
function Spotlight() {
  return (
    <section className="relative bg-black py-24 px-6 md:px-10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <div className="relative rounded-3xl overflow-hidden group cursor-pointer">
            <img
              src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=1600&q=85"
              alt="Featured Project"
              className="w-full h-[60vh] object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent" />
            <div className="absolute inset-0 flex items-end md:items-center p-5 md:p-16">
              <div className="max-w-lg ">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/30 mb-6">
                  <HiSparkles className="text-amber-400" size={12} />
                  <span className="text-amber-400 text-[10px] tracking-[0.3em] uppercase font-bold">Featured Campaign</span>
                </div>
                <h3 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                  The Lumière
                  <br />
                  <span className="text-amber-400">Editorial Series</span>
                </h3>
                <p className="text-white/55 mb-8 leading-relaxed">A 3-day fashion campaign shot across Lagos and Paris  exploring the intersection of African identity and global luxury.</p>
                <motion.a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.96 }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-amber-500 text-black font-bold tracking-wider uppercase text-sm hover:bg-amber-400 transition-colors"
                >
                  <FaPlay size={10} />
                  View Campaign
                </motion.a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── CTA ─────────────────────────────────────────────────────────────────────
function CTA() {
  return (
    <section id="contact" className="relative bg-black py-36 px-6 md:px-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(217,119,6,0.12)_0%,transparent_65%)]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-amber-500/5 blur-3xl" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <Reveal>
          <span className="text-amber-500 text-xs tracking-[0.3em] uppercase font-medium block mb-6">Let's Create Together</span>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
            Your Story Deserves
            <br />
            <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              More Than Ordinary.
            </span>
          </h2>
          <p className="text-white/45 text-lg max-w-xl mx-auto mb-12 leading-relaxed">
            Step into a session crafted for people who refuse the average. Luxury, cinematic, and entirely yours.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.96 }}
              className="group flex items-center gap-3 px-10 py-5 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 text-black font-bold text-[13px] md:text-lg tracking-wider uppercase shadow-2xl shadow-amber-500/30 hover:shadow-amber-500/50 transition-all duration-300"
            >
              <FaWhatsapp size={20} />
              Book Your Session
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-black border-t border-white/5 py-16 px-6 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center">
                <RiFilmLine size={16} className="text-black" />
              </div>
              <span className="text-white font-bold text-xl tracking-[0.15em] uppercase" style={{ fontFamily: "'Playfair Display', serif" }}>
                Evalenz
              </span>
            </div>
            <p className="text-white/35 text-sm leading-relaxed max-w-xs">
              Luxury photography and cinematic storytelling for those who believe their moments deserve to be extraordinary.
            </p>
            <div className="flex items-center gap-4 mt-6">
              {[
                { icon: <FaInstagram size={18} />, href: "#" },
                { icon: <FaWhatsapp size={18} />, href: BOOKING_URL },
                { icon: <FaBehance size={18} />, href: "#" },
                { icon: <FaPinterest size={18} />, href: "#" },
              ].map((s, i) => (
                <motion.a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, color: "#f59e0b" }}
                  className="text-white/30 hover:text-amber-400 transition-colors duration-300"
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white/60 text-xs tracking-[0.25em] uppercase font-medium mb-5">Navigation</h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase()}`} className="text-white/30 hover:text-amber-400 text-sm transition-colors duration-300">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white/60 text-xs tracking-[0.25em] uppercase font-medium mb-5">Specialties</h4>
            <ul className="space-y-3">
              {["Portraits", "Weddings", "Fashion", "Events", "Brands", "Campaigns"].map((cat) => (
                <li key={cat}>
                  <a href="#portfolio" className="text-white/30 hover:text-amber-400 text-sm transition-colors duration-300">
                    {cat}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-xs tracking-widest">© {new Date().getFullYear()} Evalenz Photography. All rights reserved.</p>
          <p className="text-white/20 text-xs tracking-widest">Crafted with vision. Shot with soul.</p>
        </div>
      </div>
    </footer>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function EvalenzPortfolio() {
  useEffect(() => {
    // Inject Google Fonts
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }, []);

  return (
    <main className="bg-black min-h-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <Portfolio />
      <Services />
      <Experience />
      <Testimonials />
      <Spotlight />
      <CTA />
      <Footer />
    </main>
  );
}
