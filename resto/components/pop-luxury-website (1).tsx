"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import * as THREE from "three";
import { MapPin, Clock, Phone, ChevronDown, Star, ArrowRight, Menu, X, Instagram, Twitter, Facebook, Utensils, Music, Film, Palette, Gamepad2, Trees, Sparkles, Zap } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Experience {
  icon: React.ReactNode;
  title: string;
  desc: string;
  img: string;
  tag: string;
}

interface MenuItem {
  name: string;
  desc: string;
  price: string;
  img: string;
  rating: number;
}

interface Testimonial {
  name: string;
  role: string;
  text: string;
  rating: number;
  avatar: string;
}

interface GalleryImage {
  src: string;
  span: string;
  label: string;
}

interface SpecialEvent {
  title: string;
  desc: string;
  badge: string;
  img: string;
  time: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const WA_LINK = "https://wa.me/2348087009701?text=Hello%20I%20would%20like%20to%20make%20a%20reservation";

const NAV_LINKS = ["Home", "Experiences", "Menu", "Gallery", "Reviews", "Contact"];

const EXPERIENCES: Experience[] = [
  {
    icon: <Utensils size={22} />,
    title: "Luxury Dining",
    desc: "Savor curated dishes in an atmosphere that blends warmth with sophistication. Every meal is an event.",
    img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
    tag: "Signature",
  },
  {
    icon: <Palette size={22} />,
    title: "Sip & Paint",
    desc: "Uncork your creativity. Guided canvas sessions with premium cocktails in a gallery-worthy setting.",
    img: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&q=80",
    tag: "Creative",
  },
  {
    icon: <Music size={22} />,
    title: "Karaoke Nights",
    desc: "Own the stage. Private booths and open-floor nights powered by premium sound and electric energy.",
    img: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80",
    tag: "Nightlife",
  },
  {
    icon: <Film size={22} />,
    title: "Cinema Lounge",
    desc: "Cinematic escapes in plush comfort. Private screenings and curated film nights in a velvet-dark setting.",
    img: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&q=80",
    tag: "Immersive",
  },
  {
    icon: <Trees size={22} />,
    title: "Picnic & Hangout",
    desc: "Lush outdoor spaces for intimate gatherings, Sunday brunches, and laid-back luxury moments.",
    img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    tag: "Outdoor",
  },
  {
    icon: <Gamepad2 size={22} />,
    title: "Game Arena",
    desc: "Compete, laugh, and connect. A curated selection of premium social games for every crew.",
    img: "https://images.unsplash.com/photo-1511882150382-421056c89033?w=800&q=80",
    tag: "Social",
  },
];

const MENU_ITEMS: MenuItem[] = [
  {
    name: "Signature Shawarma",
    desc: "Slow-marinated premium cuts, house-made sauces, toasted brioche wrap",
    price: "₦2,500",
    img: "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?w=600&q=80",
    rating: 4.9,
  },
  {
    name: "P.O.P Signature Rice",
    desc: "Fragrant long-grain rice, aromatic spice blend, protein of choice",
    price: "₦3,500",
    img: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&q=80",
    rating: 4.8,
  },
  {
    name: "Premium Grills",
    desc: "Charcoal-kissed proteins, house pepper sauce, roasted sides",
    price: "₦5,500",
    img: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80",
    rating: 4.9,
  },
  {
    name: "Craft Cocktails",
    desc: "House-infused spirits, tropical fusions, premium garnishes",
    price: "₦2,000",
    img: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&q=80",
    rating: 4.7,
  },
  {
    name: "Artisan Desserts",
    desc: "Rich molten lava cake, sorbets, chef's seasonal creation",
    price: "₦1,500",
    img: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&q=80",
    rating: 4.8,
  },
  {
    name: "Small Chops Platter",
    desc: "Puff puff, spring rolls, samosas, mini skewers — the ultimate starter",
    price: "₦2,800",
    img: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=600&q=80",
    rating: 4.9,
  },
];

const GALLERY_IMAGES: GalleryImage[] = [
  { src: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&q=80", span: "col-span-2 row-span-2", label: "The Lounge" },
  { src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80", span: "col-span-1 row-span-1", label: "Fine Dining" },
  { src: "https://images.unsplash.com/photo-1541614101331-1a5a3a194e92?w=600&q=80", span: "col-span-1 row-span-1", label: "Ambience" },
  { src: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&q=80", span: "col-span-1 row-span-2", label: "Night Vibes" },
  { src: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&q=80", span: "col-span-1 row-span-1", label: "Craft Bar" },
  { src: "https://images.unsplash.com/photo-1529543544282-ea669407fca3?w=600&q=80", span: "col-span-1 row-span-1", label: "Social Moments" },
];

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Amara Okonkwo",
    role: "Ilorin, Lifestyle Blogger",
    text: "P.O.P isn't just a restaurant — it's a whole mood. The ambience hit different the moment I walked in. We did sip & paint and the cocktails were unreal. Already planning my next visit.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&q=80",
  },
  {
    name: "Tunde Adeyemi",
    role: "Events Curator",
    text: "Took my team for karaoke night and it was the best team bonding we've had. The sound system, the lighting, the energy — everything was premium. This is Ilorin's best-kept secret.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&q=80",
  },
  {
    name: "Fatima Bello",
    role: "Fashion Designer",
    text: "The pictures don't do it justice. You have to be there in person. The picnic area is breathtaking, the food is excellent, and the whole vibe is something else. Absolutely obsessed.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80",
  },
  {
    name: "Emeka Nwachukwu",
    role: "Entrepreneur",
    text: "Best date night spot in Kwara, full stop. Surprised my partner with the cinema lounge and she was blown away. The attention to detail from the staff to the decor — world class.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80",
  },
];

const SPECIAL_EVENTS: SpecialEvent[] = [
  {
    title: "Sip & Paint Night",
    desc: "Canvas, cocktails, and conversation. Every Friday. Limited spots — reserve yours.",
    badge: "Every Friday",
    img: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=700&q=80",
    time: "7PM – 10PM",
  },
  {
    title: "Karaoke Saturdays",
    desc: "Take the mic. Private booths or open stage. Unforgettable nights guaranteed.",
    badge: "Every Saturday",
    img: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=700&q=80",
    time: "8PM – Midnight",
  },
  {
    title: "Weekend Chill Sessions",
    desc: "Sundays done right. Brunch, hangout, games, and good music. The reset you deserve.",
    badge: "Every Sunday",
    img: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=700&q=80",
    time: "12PM – 6PM",
  },
];

// ─── Three.js Hero Background ─────────────────────────────────────────────────

function ThreeBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const el = mountRef.current;
    const w = el.clientWidth, h = el.clientHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 1000);
    camera.position.z = 80;

    // Particle system
    const COUNT = 1800;
    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    const sizes = new Float32Array(COUNT);

    const palette = [
      new THREE.Color("#f59e0b"),
      new THREE.Color("#d97706"),
      new THREE.Color("#fbbf24"),
      new THREE.Color("#78350f"),
      new THREE.Color("#ffffff"),
    ];

    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 200;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 200;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100;
      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
      sizes[i] = Math.random() * 2.5 + 0.3;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geo.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    const mat = new THREE.ShaderMaterial({
      uniforms: { time: { value: 0 } },
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        varying vec3 vColor;
        varying float vAlpha;
        uniform float time;
        void main() {
          vColor = color;
          vec3 pos = position;
          pos.y += sin(time * 0.3 + position.x * 0.05) * 2.0;
          pos.x += cos(time * 0.2 + position.z * 0.04) * 1.5;
          vec4 mvp = modelViewMatrix * vec4(pos, 1.0);
          vAlpha = smoothstep(-100.0, 0.0, mvp.z);
          gl_PointSize = size * (200.0 / -mvp.z);
          gl_Position = projectionMatrix * mvp;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vAlpha;
        void main() {
          float d = length(gl_PointCoord - 0.5) * 2.0;
          if (d > 1.0) discard;
          float alpha = (1.0 - smoothstep(0.4, 1.0, d)) * vAlpha * 0.85;
          gl_FragColor = vec4(vColor, alpha);
        }
      `,
      transparent: true,
      vertexColors: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geo, mat);
    scene.add(particles);

    // Mouse interaction
    const mouse = { x: 0, y: 0 };
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 0.6;
      mouse.y = -(e.clientY / window.innerHeight - 0.5) * 0.6;
    };
    window.addEventListener("mousemove", onMouseMove);

    let raf: number;
    const clock = new THREE.Clock();
    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      mat.uniforms.time.value = t;
      particles.rotation.y = t * 0.015 + mouse.x * 0.3;
      particles.rotation.x = t * 0.008 + mouse.y * 0.2;
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      const nw = el.clientWidth, nh = el.clientHeight;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 w-full h-full" />;
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setOpen(false);
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-black/80 backdrop-blur-2xl border-b border-amber-900/20 shadow-2xl shadow-black/50" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <motion.div className="flex items-center gap-3 cursor-pointer" whileHover={{ scale: 1.02 }}>
          <div className="relative w-10 h-10">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-400 to-orange-600 opacity-90" />
            <div className="absolute inset-0 rounded-full flex items-center justify-center">
              <span className="text-black font-black text-xs tracking-tight">P.O.P</span>
            </div>
          </div>
          <div>
            <span className="text-white font-bold tracking-widest text-sm">PLACE OF PLEASURE</span>
            <div className="h-px bg-gradient-to-r from-amber-400 to-transparent" />
          </div>
        </motion.div>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              className="text-white/70 hover:text-amber-400 transition-colors text-sm tracking-wider font-medium"
            >
              {link}
            </button>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <motion.a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-orange-600 text-black font-bold text-sm tracking-wider rounded-full shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 transition-shadow"
          >
            Reserve Now
          </motion.a>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="lg:hidden text-white p-2">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-black/95 backdrop-blur-2xl border-t border-amber-900/20"
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.06 }}
                  onClick={() => scrollTo(link)}
                  className="text-white/80 hover:text-amber-400 text-left text-lg font-medium tracking-wide transition-colors"
                >
                  {link}
                </motion.button>
              ))}
              <motion.a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-black font-bold text-center rounded-full"
              >
                Reserve Now
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

const STATS = [
  { value: "150+", label: "Reviews" },
  { value: "4.9", label: "Experience Rating" },
  { value: "Daily", label: "Entertainment" },
  { value: "Premium", label: "Lounge Atmosphere" },
];

function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      <ThreeBackground />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black pointer-events-none z-10" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/40 pointer-events-none z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />

      {/* Glow orbs */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none z-10" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-orange-600/8 rounded-full blur-3xl pointer-events-none z-10" />

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 pt-32 pb-20">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-xs font-semibold tracking-widest uppercase mb-8"
          >
            <Sparkles size={12} />
            Ilorin&apos;s Premier Luxury Destination
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.95] tracking-tight mb-8"
            style={{ fontFamily: "'Georgia', serif" }}
          >
            More Than A<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-300">
              Restaurant.
            </span>
            <br />
            <span className="text-white/90">An Experience.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="text-white/60 text-lg md:text-xl leading-relaxed max-w-2xl mb-12"
          >
            Luxury dining, nightlife, games, cinema, sip & paint, and unforgettable moments — all in one destination.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="flex flex-wrap gap-4 mb-20"
          >
            <motion.a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(245,158,11,0.5)" }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-black font-bold rounded-full tracking-wide flex items-center gap-2 shadow-xl shadow-amber-500/25"
            >
              Reserve Experience <ArrowRight size={18} />
            </motion.a>
            <motion.button
              onClick={() => document.getElementById("experiences")?.scrollIntoView({ behavior: "smooth" })}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-4 border border-white/20 text-white font-semibold rounded-full tracking-wide backdrop-blur-sm bg-white/5 hover:border-amber-400/50 hover:bg-white/10 transition-all"
            >
              Explore Experiences
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9 + i * 0.1 }}
                className="relative p-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent" />
                <div className="text-2xl font-black text-amber-400 mb-1">{s.value}</div>
                <div className="text-white/50 text-xs tracking-wide">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-white/30"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <ChevronDown size={16} />
      </motion.div>
    </section>
  );
}

// ─── Section Wrapper ──────────────────────────────────────────────────────────

function FadeSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.75, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ text }: { text: string }) {
  return (
    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-xs font-semibold tracking-widest uppercase mb-4">
      <Zap size={11} />
      {text}
    </div>
  );
}

// ─── Experiences ──────────────────────────────────────────────────────────────

function Experiences() {
  return (
    <section id="experiences" className="py-32 bg-black relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <FadeSection className="text-center mb-20">
          <SectionLabel text="What We Offer" />
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight mt-2 mb-4" style={{ fontFamily: "'Georgia', serif" }}>
            Six Ways to <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Lose Yourself</span>
          </h2>
          <p className="text-white/40 max-w-xl mx-auto text-lg">
            Every visit, a different adventure. Every moment, a new memory.
          </p>
        </FadeSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {EXPERIENCES.map((exp, i) => (
            <motion.div
              key={exp.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative rounded-3xl overflow-hidden border border-white/8 cursor-default"
            >
              <div className="absolute inset-0">
                <img src={exp.img} alt={exp.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/10" />
              </div>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-amber-900/50 to-transparent" />

              <div className="relative z-10 p-7 h-72 flex flex-col justify-end">
                <div className="mb-3 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-400 text-xs font-semibold tracking-wider w-fit">
                  {exp.tag}
                </div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
                    {exp.icon}
                  </div>
                  <h3 className="text-white text-xl font-bold">{exp.title}</h3>
                </div>
                <p className="text-white/60 text-sm leading-relaxed">{exp.desc}</p>
              </div>

              {/* Glow border on hover */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[inset_0_0_0_1px_rgba(245,158,11,0.4)]" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Menu ─────────────────────────────────────────────────────────────────────

function MenuSection() {
  return (
    <section id="menu" className="py-32 bg-neutral-950 relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-600/8 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <FadeSection className="text-center mb-20">
          <SectionLabel text="Culinary Highlights" />
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight mt-2 mb-4" style={{ fontFamily: "'Georgia', serif" }}>
            Food That <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Stays With You</span>
          </h2>
          <p className="text-white/40 max-w-xl mx-auto text-lg">₦1,000 – ₦10,000 · Dine-in · Drive-through · Delivery</p>
        </FadeSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {MENU_ITEMS.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="group relative rounded-3xl bg-white/3 border border-white/8 overflow-hidden hover:border-amber-500/30 transition-all duration-400"
            >
              <div className="relative h-52 overflow-hidden">
                <img src={item.img} alt={item.name} className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-108" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-4 left-4 flex items-center gap-1">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={11} className="fill-amber-400 text-amber-400" />
                  ))}
                  <span className="text-amber-400 text-xs ml-1 font-bold">{item.rating}</span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-white font-bold text-lg leading-tight">{item.name}</h3>
                  <span className="text-amber-400 font-black text-lg whitespace-nowrap ml-3">{item.price}</span>
                </div>
                <p className="text-white/40 text-sm leading-relaxed mb-4">{item.desc}</p>
                <motion.a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 text-amber-400 text-sm font-semibold hover:text-amber-300 transition-colors"
                >
                  Order Now <ArrowRight size={14} />
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Gallery ──────────────────────────────────────────────────────────────────

function Gallery() {
  return (
    <section id="gallery" className="py-32 bg-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <FadeSection className="text-center mb-16">
          <SectionLabel text="Gallery" />
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight mt-2 mb-4" style={{ fontFamily: "'Georgia', serif" }}>
            See the <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Atmosphere</span>
          </h2>
          <p className="text-white/40 max-w-xl mx-auto">Every corner, a photo moment. Every visit, a story.</p>
        </FadeSection>

        <div className="grid grid-cols-3 grid-rows-3 gap-3 h-[600px] md:h-[700px]">
          {GALLERY_IMAGES.map((img, i) => (
            <motion.div
              key={img.src}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.02, zIndex: 10 }}
              className={`group relative rounded-2xl overflow-hidden cursor-pointer ${img.span}`}
            >
              <img src={img.src} alt={img.label} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
              <div className="absolute bottom-3 left-3 text-white font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                {img.label}
              </div>
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 shadow-[inset_0_0_0_1.5px_rgba(245,158,11,0.5)]" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

function Testimonials() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive((p) => (p + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="reviews" className="py-32 bg-neutral-950 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6">
        <FadeSection className="text-center mb-20">
          <SectionLabel text="What People Say" />
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight mt-2 mb-4" style={{ fontFamily: "'Georgia', serif" }}>
            Real <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Stories</span>, Real Love
          </h2>
        </FadeSection>

        <div className="grid md:grid-cols-2 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              whileHover={{ y: -4 }}
              className="relative p-7 rounded-3xl border border-white/8 bg-white/3 backdrop-blur-sm hover:border-amber-500/25 transition-all duration-400"
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent rounded-t-3xl" />
              <div className="flex items-center gap-1 mb-5">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} size={14} className="fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-white/70 leading-relaxed mb-6 text-[15px]">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center gap-3">
                <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover border border-amber-500/30" />
                <div>
                  <div className="text-white font-semibold text-sm">{t.name}</div>
                  <div className="text-white/40 text-xs">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Special Events ───────────────────────────────────────────────────────────

function SpecialEvents() {
  return (
    <section className="py-32 bg-black relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/8 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <FadeSection className="text-center mb-20">
          <SectionLabel text="Special Events" />
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight mt-2 mb-4" style={{ fontFamily: "'Georgia', serif" }}>
            The Nights You'll <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Talk About</span>
          </h2>
        </FadeSection>

        <div className="grid md:grid-cols-3 gap-6">
          {SPECIAL_EVENTS.map((ev, i) => (
            <motion.div
              key={ev.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.14 }}
              whileHover={{ y: -8 }}
              className="group relative rounded-3xl overflow-hidden border border-white/8 hover:border-amber-500/30 transition-all duration-400"
            >
              <div className="relative h-64">
                <img src={ev.img} alt={ev.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-amber-500 text-black text-xs font-black tracking-wider shadow-lg shadow-amber-500/30">
                    {ev.badge}
                  </span>
                </div>
              </div>
              <div className="p-6 bg-gradient-to-b from-neutral-950 to-black">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-white font-bold text-xl">{ev.title}</h3>
                  <span className="text-amber-400/70 text-xs font-medium">{ev.time}</span>
                </div>
                <p className="text-white/50 text-sm leading-relaxed mb-5">{ev.desc}</p>
                <motion.a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-500/15 border border-amber-500/30 text-amber-400 rounded-full text-sm font-semibold hover:bg-amber-500/25 transition-all"
                >
                  Book a Spot <ArrowRight size={14} />
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA Section ──────────────────────────────────────────────────────────────

function CTASection() {
  return (
    <section className="py-40 relative overflow-hidden bg-neutral-950">
      <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-transparent to-orange-900/15" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-amber-500/12 rounded-full blur-3xl pointer-events-none" />

      <FadeSection className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-400 text-xs font-semibold tracking-widest uppercase mb-8">
          <Sparkles size={11} />
          Reserve Your Experience
        </div>
        <h2 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-6 leading-tight" style={{ fontFamily: "'Georgia', serif" }}>
          Your Next Favorite<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-300">
            Memory Starts Here.
          </span>
        </h2>
        <p className="text-white/50 text-xl mb-12 max-w-xl mx-auto">
          Open daily, 9AM – 8:30PM. Nexs Plaza, 13 Unity Rd, Oko Erin, Ilorin.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <motion.a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05, boxShadow: "0 0 60px rgba(245,158,11,0.5)" }}
            whileTap={{ scale: 0.97 }}
            className="px-10 py-4 bg-gradient-to-r from-amber-500 to-orange-600 text-black font-black rounded-full tracking-wide text-lg shadow-2xl shadow-amber-500/30"
          >
            Reserve via WhatsApp
          </motion.a>
          <motion.a
            href={`tel:+2348087009701`}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="px-10 py-4 border border-white/20 text-white font-semibold rounded-full backdrop-blur-sm bg-white/5 hover:border-amber-400/40 transition-all text-lg"
          >
            Call Us
          </motion.a>
        </div>
      </FadeSection>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer id="contact" className="bg-black border-t border-white/6 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center">
                <span className="text-black font-black text-xs">P.O.P</span>
              </div>
              <span className="text-white font-bold tracking-widest text-sm">PLACE OF PLEASURE</span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed mb-6">
              Ilorin&apos;s most immersive luxury destination. Dining, nightlife, cinema, sip & paint — all in one place.
            </p>
            <div className="flex gap-4">
              {[Instagram, Twitter, Facebook].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-amber-400 hover:border-amber-400/50 transition-all">
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Hours & Location */}
          <div>
            <h4 className="text-white font-semibold mb-5 tracking-wide">Find Us</h4>
            <div className="space-y-3 text-sm text-white/40">
              <div className="flex items-start gap-2">
                <MapPin size={14} className="text-amber-400 mt-0.5 flex-shrink-0" />
                <span>Nexs Plaza, 13 Unity Rd, Oko Erin, Ilorin, Kwara State</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-amber-400 flex-shrink-0" />
                <span>Open Daily: 9:00 AM – 8:30 PM</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-amber-400 flex-shrink-0" />
                <a href="tel:+2348087009701" className="hover:text-amber-400 transition-colors">+234 808 700 9701</a>
              </div>
            </div>
          </div>

          {/* Experiences */}
          <div>
            <h4 className="text-white font-semibold mb-5 tracking-wide">Experiences</h4>
            <div className="space-y-2 text-sm text-white/40">
              {["Luxury Dining", "Sip & Paint", "Karaoke Nights", "Cinema Lounge", "Game Arena", "Picnic & Hangout"].map(e => (
                <div key={e} className="hover:text-amber-400 transition-colors cursor-pointer">{e}</div>
              ))}
            </div>
          </div>

          {/* Reservation */}
          <div>
            <h4 className="text-white font-semibold mb-5 tracking-wide">Reservations</h4>
            <p className="text-white/40 text-sm mb-5">Ready for an unforgettable experience? Reserve your spot now.</p>
            <motion.a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-black font-bold rounded-full text-sm shadow-lg shadow-amber-500/25"
            >
              Book via WhatsApp <ArrowRight size={14} />
            </motion.a>
            <p className="text-white/25 text-xs mt-3">Price range: ₦1,000 – ₦10,000</p>
          </div>
        </div>

        <div className="border-t border-white/6 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/25 text-xs">© {year} Place of Pleasure (P.O.P). All rights reserved.</p>
          <p className="text-white/20 text-xs">Luxury Hospitality · Ilorin, Nigeria</p>
        </div>
      </div>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function POPWebsite() {
  return (
    <main className="bg-black min-h-screen overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700;800&display=swap');
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #000; }
        ::-webkit-scrollbar-thumb { background: #d97706; border-radius: 2px; }
      `}</style>
      <Navbar />
      <Hero />
      <Experiences />
      <MenuSection />
      <Gallery />
      <Testimonials />
      <SpecialEvents />
      <CTASection />
      <Footer />
    </main>
  );
}
