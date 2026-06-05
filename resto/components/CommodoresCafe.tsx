"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useInView } from "framer-motion";
import * as THREE from "three";
import {
  Star,
  MapPin,
  Clock,
  Phone,
  Menu,
  X,
  ChevronDown,
  Anchor,
  Waves,
  Wine,
  Utensils,
  Camera,
  BookOpen,
  Users,
  Sparkles,
  ArrowRight,
  Send,
} from "lucide-react";

import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa"; 

// ─────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────
interface ExperienceCard {
  icon: React.ReactNode;
  title: string;
  description: string;
  image: string;
  accent: string;
}

interface MenuItem {
  name: string;
  description: string;
  price: string;
  rating: number;
  image: string;
  tag?: string;
}

interface GalleryItem {
  image: string;
  span: string;
  label: string;
}

interface Testimonial {
  name: string;
  location: string;
  review: string;
  rating: number;
  avatar: string;
  date: string;
}

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────
const NAV_LINKS = ["Home", "Experiences", "Menu", "Atmosphere", "Reviews", "Contact"];

const EXPERIENCES: ExperienceCard[] = [
  {
    icon: <Utensils size={22} />,
    title: "Premium Dining",
    description: "Curated dishes crafted with bold West African flavours, elevated by artisan technique and premium ingredients.",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
    accent: "from-teal-500/20 to-cyan-500/10",
  },
  {
    icon: <Waves size={22} />,
    title: "Ocean Lounge Atmosphere",
    description: "Step into a world of ocean-inspired decor, ambient lighting, and nautical artefacts that breathe serenity.",
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80",
    accent: "from-blue-500/20 to-indigo-500/10",
  },
  {
    icon: <Camera size={22} />,
    title: "Picture-Perfect Environment",
    description: "Every corner is a frame. Thoughtfully designed scenic spots made for memories, moments, and stories.",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
    accent: "from-cyan-500/20 to-teal-500/10",
  },
  {
    icon: <Anchor size={22} />,
    title: "Relaxation Space",
    description: "Unplug and exhale. Our lounge offers cushioned sanctuary away from the noise   calm, cool, and elegant.",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
    accent: "from-indigo-500/20 to-blue-500/10",
  },
  {
    icon: <Users size={22} />,
    title: "Social Hangout Experience",
    description: "From intimate dinners to lively group outings   the ideal social venue for every occasion.",
    image: "https://images.unsplash.com/photo-1529543544282-ea669407fca3?w=800&q=80",
    accent: "from-teal-400/20 to-cyan-400/10",
  },
  {
    icon: <BookOpen size={22} />,
    title: "Cozy Reading Corners",
    description: "Curated shelves, soft lighting, and undisturbed calm. A rare blend of café culture and intellectual retreat.",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80",
    accent: "from-blue-400/20 to-indigo-400/10",
  },
];

const MENU_ITEMS: MenuItem[] = [
  {
    name: "Chicken Suya",
    description: "Smoky, spiced & chargrilled   our suya is a nod to Northern heritage, served with fresh peppery garnish.",
    price: "₦3,500",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&q=80",
    tag: "Bestseller",
  },
  {
    name: "Signature Grill Platter",
    description: "A curated selection of grilled proteins with our house marinade, served with seasoned sides and dipping sauces.",
    price: "₦6,500",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80",
    tag: "Chef's Pick",
  },
  {
    name: "Artisan Ice Cream",
    description: "Handcrafted scoops in tropical and classic flavours   the perfect sweet finale to an elevated meal.",
    price: "₦1,800",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=600&q=80",
  },
  {
    name: "Luxury Milkshake",
    description: "Thick, indulgent, and visually stunning. Crafted milkshakes that are as much a treat to the eyes as the palate.",
    price: "₦2,200",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&q=80",
    tag: "Trending",
  },
  {
    name: "Spiced West African Meal",
    description: "Rich, aromatic, and deeply satisfying. Rooted in West African spice tradition   refined for the modern palate.",
    price: "₦4,200",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=600&q=80",
  },
  {
    name: "Premium Cocktails",
    description: "Signature lounge cocktails designed to complement the oceanic atmosphere   refreshing, bold, and beautiful.",
    price: "₦2,800",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1560508180-03f285f67ded?w=600&q=80",
    tag: "Signature",
  },
];

const GALLERY: GalleryItem[] = [
  { image: "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=900&q=80", span: "col-span-2 row-span-2", label: "Lounge Interior" },
  { image: "https://images.unsplash.com/photo-1514190051997-0f6f39ca5cde?w=600&q=80", span: "col-span-1 row-span-1", label: "Evening Ambience" },
  { image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80", span: "col-span-1 row-span-1", label: "Dining Space" },
  { image: "https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=600&q=80", span: "col-span-1 row-span-1", label: "Premium Bar" },
  { image: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=600&q=80", span: "col-span-1 row-span-1", label: "Scenic Corner" },
  { image: "https://images.unsplash.com/photo-1578474846511-04ba529f0b88?w=600&q=80", span: "col-span-1 row-span-1", label: "Cocktail Hour" },
];

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Aisha Balogun",
    location: "Ilorin, Kwara",
    review: "The ambience is absolutely perfect. From the ocean-inspired decor to the lighting   every detail has been thoughtfully curated. It genuinely feels like you've stepped into another world.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&q=80",
    date: "March 2025",
  },
  {
    name: "Tunde Oyelaran",
    location: "Ilorin, Kwara",
    review: "Best hangout spot in Ilorin hands down. The customer service is exceptional   warm, attentive, never intrusive. The scenery alone makes it worth every naira.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
    date: "January 2025",
  },
  {
    name: "Fatimah Abdullahi",
    location: "Abuja, FCT",
    review: "I visited during a work trip and was completely blown away. The cozy reading corner, the ocean artefacts, the picturesque spots   I spent three hours there without realising it.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=200&q=80",
    date: "February 2025",
  },
  {
    name: "Emeka Nwosu",
    location: "Lagos, Nigeria",
    review: "Commodores has the rare quality of feeling both cozy and premium simultaneously. The food is incredible, but the atmosphere is what will keep pulling me back.",
    rating: 4,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    date: "April 2025",
  },
];

const STATS = [
  { value: "280+", label: "Guest Reviews" },
  { value: "4.2★", label: "Average Rating" },
  { value: "Premium", label: "Lounge Atmosphere" },
  { value: "Daily", label: "Dining & Relaxation" },
];

const WA_LINK = "https://wa.me/2348132376936?text=Hello%20I%20would%20like%20to%20make%20a%20reservation";

// ─────────────────────────────────────────────
// THREE.JS HERO BACKGROUND
// ─────────────────────────────────────────────
function OceanCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 5);

    // Particle system   oceanic floating particles
    const count = 1800;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    const palette = [
      new THREE.Color("#0e7490"), // teal
      new THREE.Color("#0891b2"), // cyan
      new THREE.Color("#1e40af"), // deep blue
      new THREE.Color("#7dd3fc"), // sky
      new THREE.Color("#e0f2fe"), // ice white
    ];

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
      sizes[i] = Math.random() * 2.5 + 0.5;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geo.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    const mat = new THREE.PointsMaterial({
      size: 0.06,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geo, mat);
    scene.add(particles);

    // Gentle wave mesh
    const waveGeo = new THREE.PlaneGeometry(20, 12, 80, 50);
    const waveMat = new THREE.MeshBasicMaterial({
      color: 0x0e7490,
      wireframe: true,
      transparent: true,
      opacity: 0.06,
    });
    const wave = new THREE.Mesh(waveGeo, waveMat);
    wave.rotation.x = -Math.PI / 5;
    wave.position.y = -2;
    scene.add(wave);

    const onResize = () => {
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    };
    window.addEventListener("resize", onResize);

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove);

    const pos = geo.attributes.position as THREE.BufferAttribute;
    const originalY = new Float32Array(count);
    for (let i = 0; i < count; i++) originalY[i] = pos.getY(i);

    let t = 0;
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      t += 0.003;

      for (let i = 0; i < count; i++) {
        const x = pos.getX(i);
        const wave1 = Math.sin(x * 0.5 + t) * 0.15;
        const wave2 = Math.cos(x * 0.3 + t * 0.7) * 0.08;
        pos.setY(i, originalY[i] + wave1 + wave2);
      }
      pos.needsUpdate = true;

      // Wave mesh distortion
      const wavePos = waveGeo.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < wavePos.count; i++) {
        const wx = wavePos.getX(i);
        const wy = wavePos.getY(i);
        wavePos.setZ(i, Math.sin(wx * 0.5 + t) * 0.18 + Math.cos(wy * 0.4 + t * 0.8) * 0.12);
      }
      wavePos.needsUpdate = true;

      // Mouse parallax
      particles.rotation.y += (mouseRef.current.x * 0.05 - particles.rotation.y) * 0.02;
      particles.rotation.x += (mouseRef.current.y * 0.03 - particles.rotation.x) * 0.02;
      particles.rotation.z += 0.0003;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      renderer.dispose();
      geo.dispose();
      mat.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ display: "block" }}
    />
  );
}

// ─────────────────────────────────────────────
// REUSABLE COMPONENTS
// ─────────────────────────────────────────────
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={13}
          fill={i <= Math.floor(rating) ? "#06b6d4" : "none"}
          stroke={i <= rating ? "#06b6d4" : "#374151"}
        />
      ))}
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/5 mb-6">
      <Sparkles size={12} className="text-cyan-400" />
      <span className="text-cyan-400 text-xs tracking-[0.2em] uppercase font-medium">{children}</span>
    </div>
  );
}

function FadeInSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─────────────────────────────────────────────
// NAVBAR
// ─────────────────────────────────────────────
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "backdrop-blur-xl bg-[#020c1b]/80 border-b border-white/5 shadow-lg shadow-black/30" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="relative w-9 h-9 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 opacity-80 group-hover:opacity-100 transition-opacity" />
              <Anchor size={16} className="relative text-white z-10" />
            </div>
            <div>
              <p className="text-white font-bold text-sm tracking-widest uppercase leading-none">The Commodores</p>
              <p className="text-cyan-400/70 text-[9px] tracking-[0.3em] uppercase">Café & Grill</p>
            </div>
          </a>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-white/60 hover:text-white text-sm tracking-wide transition-colors duration-200 hover:text-cyan-300"
              >
                {link}
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:block">
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="relative group px-5 py-2.5 rounded-full text-sm font-semibold text-white overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 transition-opacity duration-300" />
              <span className="absolute inset-0 bg-gradient-to-r from-teal-400 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative">Reserve Table</span>
            </a>
          </div>

          {/* Mobile toggle */}
          <button className="lg:hidden text-white p-2" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-[#020c1b]/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-8"
          >
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link}
                href={`#${link.toLowerCase()}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="text-white text-2xl font-light tracking-widest uppercase hover:text-cyan-400 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {link}
              </motion.a>
            ))}
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 px-8 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold tracking-wide"
              onClick={() => setMenuOpen(false)}
            >
              Reserve Table
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ─────────────────────────────────────────────
// HERO SECTION
// ─────────────────────────────────────────────
function Hero() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  return (
    <section id="home" className="relative min-h-screen flex flex-col overflow-hidden bg-[#020c1b]">
      {/* Three.js canvas */}
      <div className="absolute inset-0">
        <OceanCanvas />
      </div>

      {/* Layered gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#020c1b]/40 via-transparent to-[#020c1b]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#020c1b]/70 via-transparent to-[#020c1b]/30" />
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#020c1b] to-transparent" />

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Floating image panel */}
      <motion.div
        style={{ y, opacity }}
        className="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:block overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#020c1b] via-[#020c1b]/40 to-transparent z-10" />
        <img
          src="https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=1200&q=80"
          alt="Commodores Interior"
          className="w-full h-full object-cover opacity-40 scale-105"
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center min-h-screen max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-24">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <SectionLabel>Premium Lounge & Restaurant   Ilorin</SectionLabel>

          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.04] tracking-tight text-white mb-6"
          >
            Where <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400">Ambience</span>{" "}
            Meets Experience.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="text-white/55 text-lg lg:text-xl leading-relaxed mb-10 max-w-xl"
          >
            A premium relaxation destination blending food, ocean-inspired aesthetics, cocktails, conversations, and unforgettable moments.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="flex flex-wrap gap-4 mb-16"
          >
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-7 py-3.5 rounded-full font-semibold text-white overflow-hidden flex items-center gap-2"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600" />
              <span className="absolute inset-0 bg-gradient-to-r from-teal-400 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative">Reserve Table</span>
              <ArrowRight size={16} className="relative group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#experiences"
              className="px-7 py-3.5 rounded-full font-semibold text-white/80 border border-white/15 hover:border-cyan-500/50 hover:text-white hover:bg-white/5 transition-all duration-300 flex items-center gap-2"
            >
              Explore Experience
              <ChevronDown size={15} />
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.85 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4"
          >
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9 + i * 0.08 }}
                className="rounded-2xl border border-white/8 bg-white/4 backdrop-blur-md px-4 py-3"
              >
                <p className="text-white font-bold text-xl mb-0.5">{s.value}</p>
                <p className="text-white/45 text-xs tracking-wide">{s.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Floating info cards */}
        <div className="absolute right-8 lg:right-12 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-4">
          {[
            { icon: <Clock size={14} />, label: "Opens Daily", value: "12:00 PM" },
            { icon: <MapPin size={14} />, label: "Location", value: "Phase 2, Ilorin" },
            { icon: <Waves size={14} />, label: "Experience", value: "Ocean Ambience" },
          ].map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1 + i * 0.1, duration: 0.6 }}
              className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 w-52"
            >
              <div className="w-8 h-8 rounded-xl bg-cyan-500/15 flex items-center justify-center text-cyan-400 shrink-0">
                {card.icon}
              </div>
              <div>
                <p className="text-white/40 text-[10px] uppercase tracking-widest">{card.label}</p>
                <p className="text-white text-sm font-medium">{card.value}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40"
      >
        <p className="text-white text-[10px] tracking-[0.3em] uppercase">Scroll</p>
        <ChevronDown size={16} className="text-white" />
      </motion.div>
    </section>
  );
}

// ─────────────────────────────────────────────
// EXPERIENCES SECTION
// ─────────────────────────────────────────────
function Experiences() {
  return (
    <section id="experiences" className="py-28 bg-[#020c1b] relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <FadeInSection className="text-center mb-16">
          <SectionLabel>Why Commodores</SectionLabel>
          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white tracking-tight">
            A Complete{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400">Lifestyle</span>{" "}
            Experience
          </h2>
          <p className="mt-4 text-white/45 max-w-xl mx-auto text-lg">
            Every visit is a curated journey. We've designed every space, scent, and service for one purpose   your experience.
          </p>
        </FadeInSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {EXPERIENCES.map((exp, i) => (
            <FadeInSection key={i} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -6, scale: 1.015 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="group relative rounded-3xl overflow-hidden border border-white/8 bg-white/3 backdrop-blur-sm cursor-default h-full"
              >
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <img src={exp.image} alt={exp.title} className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700" />
                  <div className={`absolute inset-0 bg-gradient-to-t ${exp.accent} from-[#020c1b] via-[#020c1b]/30 to-transparent`} />
                </div>
                {/* Content */}
                <div className="p-6">
                  <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-4">
                    {exp.icon}
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2 group-hover:text-cyan-300 transition-colors">{exp.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{exp.description}</p>
                </div>
                {/* Glow border on hover */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none border border-cyan-500/30 shadow-[inset_0_0_30px_rgba(6,182,212,0.05)]" />
              </motion.div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// MENU SECTION
// ─────────────────────────────────────────────
function MenuShowcase() {
  return (
    <section id="menu" className="py-28 bg-gradient-to-b from-[#020c1b] via-[#030f1f] to-[#020c1b] relative overflow-hidden">
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-blue-600/8 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <FadeInSection className="mb-16">
          <SectionLabel>Our Menu</SectionLabel>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white tracking-tight">
              Crafted For{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400">Connoisseurs</span>
            </h2>
            <p className="text-white/40 text-base max-w-xs lg:text-right">
              Bold flavours, premium ingredients, artisan presentation.
            </p>
          </div>
        </FadeInSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {MENU_ITEMS.map((item, i) => (
            <FadeInSection key={i} delay={i * 0.07}>
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 280, damping: 20 }}
                className="group rounded-3xl overflow-hidden border border-white/8 bg-white/3 backdrop-blur-sm"
              >
                <div className="relative h-56 overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020c1b] via-[#020c1b]/20 to-transparent" />
                  {item.tag && (
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/80 text-white backdrop-blur-sm">
                      {item.tag}
                    </span>
                  )}
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-white font-bold text-base group-hover:text-cyan-300 transition-colors">{item.name}</h3>
                    <span className="text-cyan-400 font-bold text-base shrink-0 ml-2">{item.price}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <StarRating rating={item.rating} />
                    <span className="text-white/40 text-xs">{item.rating}/5</span>
                  </div>
                  <p className="text-white/45 text-sm leading-relaxed">{item.description}</p>
                </div>
                {/* Hover glow */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none border border-cyan-500/25" />
              </motion.div>
            </FadeInSection>
          ))}
        </div>

        <FadeInSection className="text-center mt-12">
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/10 transition-all duration-300 font-medium"
          >
            View Full Menu on WhatsApp
            <ArrowRight size={16} />
          </a>
        </FadeInSection>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// ATMOSPHERE GALLERY
// ─────────────────────────────────────────────
function AtmosphereGallery() {
  return (
    <section id="atmosphere" className="py-28 bg-[#020c1b] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-80 h-80 bg-teal-500/6 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <FadeInSection className="text-center mb-16">
          <SectionLabel>Atmosphere Gallery</SectionLabel>
          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white tracking-tight">
            Breathtaking{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400">Interiors</span>
          </h2>
          <p className="mt-4 text-white/45 max-w-lg mx-auto text-lg">
            Every corner of Commodores is designed to inspire. Ocean artefacts, warm lighting, and premium aesthetics that beg to be photographed.
          </p>
        </FadeInSection>

        <div className="grid grid-cols-3 grid-rows-3 gap-4 h-[680px]">
          {GALLERY.map((item, i) => (
            <FadeInSection key={i} delay={i * 0.08} className={`${item.span} group relative rounded-3xl overflow-hidden`}>
              <img src={item.image} alt={item.label} className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020c1b]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                <span className="text-white text-sm font-semibold tracking-wide">{item.label}</span>
              </div>
              <div className="absolute inset-0 rounded-3xl border border-white/0 group-hover:border-cyan-500/30 transition-colors duration-500 pointer-events-none" />
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// TESTIMONIALS
// ─────────────────────────────────────────────
function Testimonials() {
  return (
    <section id="reviews" className="py-28 bg-gradient-to-b from-[#020c1b] to-[#030f1f] relative overflow-hidden">
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <FadeInSection className="text-center mb-16">
          <SectionLabel>Guest Reviews</SectionLabel>
          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white tracking-tight">
            What Guests{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400">Are Saying</span>
          </h2>
          <div className="flex items-center justify-center gap-3 mt-5">
            <div className="flex">
              {[1,2,3,4,5].map(i => (
                <Star key={i} size={18} fill={i <= 4 ? "#06b6d4" : "none"} stroke="#06b6d4" />
              ))}
            </div>
            <span className="text-white/60 text-sm">4.2 average from 280+ reviews</span>
          </div>
        </FadeInSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <FadeInSection key={i} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 280, damping: 20 }}
                className="group rounded-3xl border border-white/8 bg-white/3 backdrop-blur-sm p-7 relative overflow-hidden"
              >
                <div className="absolute -top-12 -right-12 w-40 h-40 bg-cyan-500/5 rounded-full blur-[40px] group-hover:bg-cyan-500/10 transition-colors duration-500" />
                {/* Quote */}
                <p className="text-white/60 text-base leading-relaxed mb-6 relative">"{t.review}"</p>
                {/* Author */}
                <div className="flex items-center gap-3 relative">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-cyan-500/30" />
                  <div>
                    <p className="text-white font-semibold text-sm">{t.name}</p>
                    <p className="text-white/40 text-xs">{t.location} · {t.date}</p>
                  </div>
                  <div className="ml-auto">
                    <StarRating rating={t.rating} />
                  </div>
                </div>
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none border border-cyan-500/20" />
              </motion.div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// EVENING EXPERIENCE FEATURE
// ─────────────────────────────────────────────
function EveningExperience() {
  return (
    <section className="py-28 bg-[#020c1b] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <FadeInSection>
          <div className="relative rounded-[2.5rem] overflow-hidden border border-white/8">
            {/* Background image */}
            <img
              src="https://images.unsplash.com/photo-1571204829887-3b8d69e4094d?w=1400&q=80"
              alt="Evening Experience"
              className="absolute inset-0 w-full h-full object-cover opacity-25"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#020c1b] via-[#020c1b]/80 to-[#041525]/90" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-cyan-900/20" />

            {/* Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/8 rounded-full blur-[100px]" />

            <div className="relative px-8 py-20 lg:px-20 max-w-3xl">
              {/* Badge */}
              <motion.div
                animate={{ boxShadow: ["0 0 20px rgba(6,182,212,0.2)", "0 0 40px rgba(6,182,212,0.4)", "0 0 20px rgba(6,182,212,0.2)"] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/15 border border-cyan-500/30 mb-8"
              >
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-cyan-300 text-xs tracking-widest uppercase font-semibold">Signature Experience</span>
              </motion.div>

              <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white tracking-tight mb-6 leading-tight">
                The Commodores <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400">Evening Experience</span>
              </h2>
              <p className="text-white/55 text-lg leading-relaxed mb-10 max-w-xl">
                As the evening sets in, Commodores transforms. Ambient lighting warms the ocean-themed interior, the lounge fills with gentle music, cocktails are crafted at the bar, and the perfect evening begins. This is more than dining. It's a full sensory escape.
              </p>

              <div className="flex flex-wrap gap-4">
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative group px-7 py-3.5 rounded-full font-semibold text-white overflow-hidden flex items-center gap-2"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600" />
                  <span className="absolute inset-0 bg-gradient-to-r from-teal-400 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative">Book Your Evening</span>
                  <ArrowRight size={16} className="relative group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              {/* Evening details */}
              <div className="flex flex-wrap gap-6 mt-10">
                {[
                  { label: "Opens", value: "12 PM Daily" },
                  { label: "Location", value: "Yoruba Rd, Phase 2" },
                  { label: "Dine-in", value: "Available" },
                  { label: "Pickup", value: "Kerbside Ready" },
                ].map((d) => (
                  <div key={d.label}>
                    <p className="text-white/35 text-xs uppercase tracking-widest mb-0.5">{d.label}</p>
                    <p className="text-white font-semibold text-sm">{d.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// CTA SECTION
// ─────────────────────────────────────────────
function CTASection() {
  return (
    <section className="py-28 bg-gradient-to-b from-[#030f1f] to-[#020c1b] relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-cyan-500/8 rounded-full blur-[120px]" />
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-blue-600/6 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative">
        <FadeInSection>
          <SectionLabel>Come Experience Us</SectionLabel>
          <h2 className="text-4xl lg:text-5xl xl:text-7xl font-bold text-white tracking-tight mb-6">
            Great Food. Beautiful Atmosphere.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400">Memorable Moments.</span>
          </h2>
          <p className="text-white/45 text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
            Your ideal retreat awaits in Ilorin. Whether it's a quiet afternoon or a social evening   Commodores is always the right choice.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <motion.a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="relative group px-10 py-4 rounded-full font-bold text-white text-lg overflow-hidden flex items-center gap-2"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600" />
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-teal-400 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
              <span className="relative">Reserve Your Table</span>
              <ArrowRight size={18} className="relative group-hover:translate-x-1 transition-transform" />
            </motion.a>
            <a
              href={`tel:+2348132376936`}
              className="px-10 py-4 rounded-full font-bold text-white/70 text-lg border border-white/12 hover:border-cyan-500/50 hover:text-white hover:bg-white/4 transition-all duration-300 flex items-center gap-2"
            >
              <Phone size={18} />
              Call Us
            </a>
          </div>

          {/* Service badges */}
          <div className="flex flex-wrap gap-3 justify-center mt-12">
            {["Dine-in Available", "Kerbside Pickup", "No-contact Delivery", "Opens 12PM Daily"].map((badge) => (
              <span key={badge} className="px-4 py-2 rounded-full text-sm text-white/50 border border-white/8 bg-white/3">
                {badge}
              </span>
            ))}
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────
function Footer() {
  return (
    <footer id="contact" className="bg-[#010810] border-t border-white/6 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                <Anchor size={16} className="text-white" />
              </div>
              <div>
                <p className="text-white font-bold text-sm tracking-widest uppercase leading-none">The Commodores</p>
                <p className="text-cyan-400/60 text-[9px] tracking-[0.3em] uppercase">Café & Grill</p>
              </div>
            </div>
            <p className="text-white/35 text-sm leading-relaxed mb-6">
              A premium relaxation destination blending food, ocean-inspired aesthetics, and unforgettable moments in the heart of Ilorin.
            </p>
            <div className="flex gap-3">
              {[FaInstagram, FaTwitter, FaFacebook].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-xl bg-white/5 border border-white/8 flex items-center justify-center text-white/40 hover:text-cyan-400 hover:border-cyan-500/30 transition-colors">
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-white text-xs tracking-widest uppercase mb-5 font-semibold">Explore</p>
            <ul className="space-y-3">
              {["Home", "Experiences", "Menu", "Atmosphere", "Reviews"].map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase()}`} className="text-white/40 hover:text-white text-sm transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Experiences */}
          <div>
            <p className="text-white text-xs tracking-widest uppercase mb-5 font-semibold">Experience</p>
            <ul className="space-y-3">
              {["Premium Dining", "Ocean Lounge", "Reading Corner", "Social Hangout", "Picture Spots", "Relaxation Space"].map((exp) => (
                <li key={exp}>
                  <span className="text-white/40 text-sm">{exp}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-white text-xs tracking-widest uppercase mb-5 font-semibold">Contact</p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin size={15} className="text-cyan-400 mt-0.5 shrink-0" />
                <p className="text-white/45 text-sm leading-relaxed">Yoruba Rd, Phase 2, Ilorin, Kwara State</p>
              </div>
              <div className="flex items-center gap-3">
                <Clock size={15} className="text-cyan-400 shrink-0" />
                <p className="text-white/45 text-sm">Open Daily from 12:00 PM</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={15} className="text-cyan-400 shrink-0" />
                <a href="tel:+2348132376936" className="text-white/45 text-sm hover:text-white transition-colors">
                  +234 813 237 6936
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Send size={15} className="text-cyan-400 shrink-0" />
                <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="text-cyan-400 text-sm hover:text-cyan-300 transition-colors">
                  WhatsApp Reservations
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/6 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/25 text-xs">© 2025 The Commodores Café & Grill. All rights reserved.</p>
          <p className="text-white/20 text-xs">Ilorin, Kwara State · Open 12PM Daily</p>
        </div>
      </div>
    </footer>
  );
}

// ─────────────────────────────────────────────
// ROOT APP
// ─────────────────────────────────────────────
export default function CommodoresCafe() {
  return (
    <main className="bg-[#020c1b] min-h-screen" style={{ fontFamily: "'Outfit', 'DM Sans', system-ui, sans-serif" }}>
      <Navbar />
      <Hero />
      <Experiences />
      <MenuShowcase />
      <AtmosphereGallery />
      <EveningExperience />
      <Testimonials />
      <CTASection />
      <Footer />
    </main>
  );
}
