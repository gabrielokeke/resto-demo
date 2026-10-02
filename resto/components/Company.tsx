"use client";

import React, {
  useRef,
  useEffect,
  useState,
  createContext,
  useContext,
} from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Menu,
  X,
  Check,
  Smartphone,
  Zap,
  Key,
  MessageCircle,
  MapPin,
  Compass,
  Sparkles,
  School,
  Scissors,
  HeartHandshake,
  UtensilsCrossed,
  Building2,
  User,
  Rocket,
  Layers,
  Mail,
  Phone,
  Plus,
  Minus,
} from "lucide-react";
import { FaWhatsapp, FaGithub, FaLinkedin, FaInstagram, FaXTwitter } from "react-icons/fa6";
import * as THREE from "three";

/* ==================================================
   PLACEHOLDER CONSTANTS  swap these before launch
================================================== */
const COMPANY_NAME = "G-TECH STUDIO";
const TAGLINE = "Connecting and inspiring the world through technology.";
const WHATSAPP_NUMBER = "2347039020886";
const WHATSAPP_DISPLAY = "+234 703 902 0886";
const EMAIL = "okekegabriel84@gmail.com";
const PORTFOLIO_URL = "https://yourcompany.com";
const FOUNDER_NAME = "Gabriel OKEKE";
const FOUNDER_ROLE = "Founder & Lead Developer";

/* ==================================================
   THEME TOKENS  Black & Gold
================================================== */
const COLORS = {
  primary: "#08070A",     // near-black, warm undertone
  secondary: "#141217",   // raised black surface
  accent: "#C9A24B",      // muted antique gold
  accentLight: "#E8CD82", // pale champagne gold
  accentDeep: "#8C6E2F",  // bronzed gold for depth/shadow
  background: "#FAF8F3",  // warm ivory (light sections)
  white: "#FFFFFF",
  text: "#0E0C10",
  muted: "#6B6459",
  hairline: "#E7E1D3",
};

const FONT_DISPLAY = "'Fraunces', ui-serif, Georgia, serif";
const FONT_BODY = "'Inter', ui-sans-serif, system-ui, sans-serif";
const FONT_MONO = "'JetBrains Mono', ui-monospace, monospace";

/* ==================================================
   REDUCED MOTION CONTEXT
================================================== */
const MotionPrefContext = createContext(false);
const useMotionPref = () => useContext(MotionPrefContext);

/* ==================================================
   FONT + GLOBAL TEXTURE STYLES
================================================== */
function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400..900&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500&display=swap');
      .gts-shine {
        position: relative;
        overflow: hidden;
      }
      .gts-shine::after {
        content: "";
        position: absolute;
        top: 0; left: -60%;
        width: 40%; height: 100%;
        background: linear-gradient(115deg, transparent, rgba(255,255,255,0.35), transparent);
        transform: skewX(-18deg);
        transition: left 0.65s ease;
      }
      .gts-shine:hover::after { left: 130%; }
      .gts-gold-text {
        background: linear-gradient(100deg, #8C6E2F 10%, #E8CD82 40%, #C9A24B 55%, #F3E2AE 70%, #8C6E2F 90%);
        background-size: 220% auto;
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        animation: gts-sheen 7s linear infinite;
      }
      @keyframes gts-sheen {
        0% { background-position: 0% 50%; }
        100% { background-position: 220% 50%; }
      }
      .gts-card-border {
        position: relative;
      }
      .gts-card-border::before {
        content: "";
        position: absolute;
        inset: 0;
        border-radius: inherit;
        padding: 1px;
        background: linear-gradient(135deg, rgba(201,162,75,0), rgba(201,162,75,0));
        -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
        mask-composite: exclude;
        transition: background 0.4s ease;
        pointer-events: none;
      }
      .gts-card-border:hover::before {
        background: linear-gradient(135deg, rgba(201,162,75,0.9), rgba(232,205,130,0.15) 40%, rgba(201,162,75,0.7));
      }
      @media (prefers-reduced-motion: reduce) {
        .gts-gold-text { animation: none; }
      }
      ::selection {
        background: rgba(201,162,75,0.35);
        color: #08070A;
      }
    `}</style>
  );
}

/* ==================================================
   GRAIN OVERLAY (fixed, whole-page texture)
================================================== */
function GrainOverlay() {
  return (
    <svg
      aria-hidden="true"
      className="fixed inset-0 w-full h-full pointer-events-none z-[55] opacity-[0.05] mix-blend-overlay"
    >
      <filter id="gts-grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#gts-grain)" />
    </svg>
  );
}

/* ==================================================
   AURORA  drifting gold glow field for dark sections
================================================== */
function AuroraGlow({ variant = "hero" }: { variant?: "hero" | "section" }) {
  const reduced = useMotionPref();
  const blobs =
    variant === "hero"
      ? [
          { size: 620, top: "-10%", left: "8%", color: "rgba(201,162,75,0.22)", dur: 22 },
          { size: 520, top: "35%", left: "68%", color: "rgba(140,110,47,0.28)", dur: 26 },
          { size: 420, top: "70%", left: "20%", color: "rgba(232,205,130,0.14)", dur: 30 },
        ]
      : [
          { size: 460, top: "0%", left: "70%", color: "rgba(201,162,75,0.16)", dur: 28 },
          { size: 380, top: "60%", left: "5%", color: "rgba(140,110,47,0.18)", dur: 24 },
        ];

  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none">
      {blobs.map((b, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-[90px]"
          style={{
            width: b.size,
            height: b.size,
            top: b.top,
            left: b.left,
            background: `radial-gradient(circle, ${b.color}, transparent 70%)`,
          }}
          animate={
            reduced
              ? {}
              : {
                  x: [0, 40, -20, 0],
                  y: [0, -30, 20, 0],
                  scale: [1, 1.08, 0.96, 1],
                }
          }
          transition={{ duration: b.dur, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

/* ==================================================
   PRIMITIVES
================================================== */

function SectionLabel({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <span
      className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.28em] uppercase mb-4"
      style={{ color: COLORS.accent, fontFamily: FONT_MONO }}
    >
      <span className="h-px w-6" style={{ backgroundColor: COLORS.accent }} />
      {children}
    </span>
  );
}

function SectionTitle({
  children,
  light = false,
  className = "",
}: {
  children: React.ReactNode;
  light?: boolean;
  className?: string;
}) {
  return (
    <h2
      className={`text-[clamp(1.9rem,4vw,3.25rem)] font-semibold leading-[1.08] tracking-tight ${className}`}
      style={{ color: light ? COLORS.white : COLORS.text, fontFamily: FONT_DISPLAY }}
    >
      {children}
    </h2>
  );
}

function RevealSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduced = useMotionPref();
  return (
    <motion.div
      ref={ref}
      initial={reduced ? { opacity: 1 } : { opacity: 0, y: 28, filter: "blur(4px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function StaggerGroup({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduced = useMotionPref();
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: reduced ? 0 : 0.09, delayChildren: 0.05 } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function StaggerItem({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const reduced = useMotionPref();
  return (
    <motion.div
      variants={{
        hidden: reduced ? { opacity: 1 } : { opacity: 0, y: 22 },
        show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function AnimatedCounter({ value, suffix = "", label }: { value: number; suffix?: string; label: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(0);
  const reduced = useMotionPref();

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setDisplay(value);
      return;
    }
    let start: number | null = null;
    const duration = 1100;
    const step = (ts: number) => {
      if (start === null) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, value, reduced]);

  return (
    <div ref={ref}>
      <div
        className="text-[clamp(1.9rem,3.2vw,2.75rem)] font-semibold tabular-nums gts-gold-text"
        style={{ fontFamily: FONT_DISPLAY }}
      >
        {display}
        {suffix}
      </div>
      <div className="text-sm mt-1" style={{ color: "#A79E8C", fontFamily: FONT_MONO }}>
        {label}
      </div>
    </div>
  );
}

/* ==================================================
   SCROLL PROGRESS
================================================== */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-[60] origin-left"
      style={{
        scaleX: scrollYProgress,
        background: `linear-gradient(90deg, ${COLORS.accentDeep}, ${COLORS.accent}, ${COLORS.accentLight})`,
      }}
    />
  );
}

/* ==================================================
   THREE.JS HERO  lightweight gold node network
================================================== */
function HeroCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);
  const reduced = useMotionPref();

  useEffect(() => {
    if (reduced) return;
    const mount = mountRef.current;
    if (!mount) return;

    const isMobile = window.innerWidth < 768;
    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 100);
    camera.position.z = 9;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.25 : 2));
    mount.appendChild(renderer.domElement);

    const count = isMobile ? 24 : 44;
    const radius = 6;
    const positions = new Float32Array(count * 3);
    const velocities: THREE.Vector3[] = [];

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * radius * 2;
      const y = (Math.random() - 0.5) * radius * 1.2;
      const z = (Math.random() - 0.5) * radius;
      positions.set([x, y, z], i * 3);
      velocities.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 0.004,
          (Math.random() - 0.5) * 0.004,
          (Math.random() - 0.5) * 0.004
        )
      );
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const pointMaterial = new THREE.PointsMaterial({
      color: 0xe8cd82,
      size: isMobile ? 0.055 : 0.065,
      transparent: true,
      opacity: 0.9,
      sizeAttenuation: true,
    });
    const points = new THREE.Points(geometry, pointMaterial);
    scene.add(points);

    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xc9a24b,
      transparent: true,
      opacity: 0.16,
    });
    const lineGeometry = new THREE.BufferGeometry();
    const maxLinePoints = count * count * 2;
    const linePositions = new Float32Array(maxLinePoints * 3);
    lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    let frameId: number;
    let mouseX = 0;
    let mouseY = 0;

    const onMouseMove = (e: MouseEvent) => {
      const rect = mount.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    if (!isMobile) mount.addEventListener("mousemove", onMouseMove);

    const connectDistance = 2.4;

    const animate = () => {
      const posAttr = geometry.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < count; i++) {
        let x = posAttr.getX(i) + velocities[i].x;
        let y = posAttr.getY(i) + velocities[i].y;
        let z = posAttr.getZ(i) + velocities[i].z;
        if (Math.abs(x) > radius) velocities[i].x *= -1;
        if (Math.abs(y) > radius * 0.7) velocities[i].y *= -1;
        if (Math.abs(z) > radius * 0.6) velocities[i].z *= -1;
        posAttr.setXYZ(i, x, y, z);
      }
      posAttr.needsUpdate = true;

      let lineIdx = 0;
      const lp = lineGeometry.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < count; i++) {
        for (let j = i + 1; j < count; j++) {
          const dx = posAttr.getX(i) - posAttr.getX(j);
          const dy = posAttr.getY(i) - posAttr.getY(j);
          const dz = posAttr.getZ(i) - posAttr.getZ(j);
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
          if (dist < connectDistance && lineIdx < maxLinePoints - 2) {
            lp.setXYZ(lineIdx, posAttr.getX(i), posAttr.getY(i), posAttr.getZ(i));
            lp.setXYZ(lineIdx + 1, posAttr.getX(j), posAttr.getY(j), posAttr.getZ(j));
            lineIdx += 2;
          }
        }
      }
      lineGeometry.setDrawRange(0, lineIdx);
      lp.needsUpdate = true;

      scene.rotation.y += 0.0009 + mouseX * 0.0006;
      scene.rotation.x += (mouseY * 0.15 - scene.rotation.x) * 0.02;

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", onResize);
      if (!isMobile) mount.removeEventListener("mousemove", onMouseMove);
      geometry.dispose();
      lineGeometry.dispose();
      pointMaterial.dispose();
      lineMaterial.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, [reduced]);

  return <div ref={mountRef} aria-hidden="true" className="absolute inset-0 pointer-events-none" />;
}

/* ==================================================
   NAVBAR
================================================== */
const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Industries", href: "#industries" },
  { label: "Process", href: "#process" },
  { label: "About", href: "#about" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? "rgba(8,7,10,0.86)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? `1px solid rgba(201,162,75,0.16)` : "1px solid transparent",
      }}
    >
      <nav className="max-w-7xl mx-auto px-5 sm:px-8 h-[72px] flex items-center justify-between">
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNav("#home");
          }}
          className="font-semibold text-lg tracking-tight"
          style={{ color: COLORS.white, fontFamily: FONT_DISPLAY }}
        >
          {COMPANY_NAME}
        </a>

        <ul className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNav(link.href);
                }}
                className="text-sm font-medium transition-colors hover:text-[#E8CD82]"
                style={{ color: "#C9C2B4" }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              handleNav("#contact");
            }}
            className="gts-shine inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-transform hover:-translate-y-0.5"
            style={{
              background: `linear-gradient(120deg, ${COLORS.accentDeep}, ${COLORS.accent})`,
              color: "#0E0C10",
            }}
          >
            Start a Project
            <ArrowRight size={16} />
          </a>
        </div>

        <button
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="lg:hidden p-2 rounded-full focus-visible:outline focus-visible:outline-2"
          style={{ color: COLORS.white, outlineColor: COLORS.accent }}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden overflow-hidden"
            style={{ backgroundColor: "rgba(8,7,10,0.98)" }}
          >
            <ul className="px-5 py-4 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNav(link.href);
                    }}
                    className="block py-3 text-base font-medium border-b"
                    style={{ color: "#E7E1D3", borderColor: "rgba(201,162,75,0.12)" }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-4">
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNav("#contact");
                  }}
                  className="flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold w-full"
                  style={{
                    background: `linear-gradient(120deg, ${COLORS.accentDeep}, ${COLORS.accent})`,
                    color: "#0E0C10",
                  }}
                >
                  Start a Project
                  <ArrowRight size={16} />
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ==================================================
   HERO
================================================== */
function Hero() {
  const reduced = useMotionPref();
  return (
    <section
      id="home"
      className="relative min-h-[100svh] flex items-center overflow-hidden"
      style={{ backgroundColor: COLORS.primary }}
    >
      <AuroraGlow variant="hero" />
      <HeroCanvas />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 55% at 50% 0%, rgba(201,162,75,0.14), transparent 60%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(201,162,75,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(201,162,75,0.6) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 30%, black, transparent)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 pt-28 pb-20 w-full">
        <motion.div
          initial={reduced ? { opacity: 1 } : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <span
            className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.28em] uppercase mb-6 rounded-full px-4 py-2 border"
            style={{ color: COLORS.accentLight, borderColor: "rgba(201,162,75,0.35)", fontFamily: FONT_MONO }}
          >
            <Sparkles size={13} />
            Web Design &amp; Development
          </span>

          <h1
            className="text-[clamp(2.5rem,6vw,4.8rem)] font-semibold leading-[1.04] tracking-tight"
            style={{ color: COLORS.white, fontFamily: FONT_DISPLAY }}
          >
            Websites that make businesses look{" "}
            <span className="gts-gold-text">ready for what&apos;s next.</span>
          </h1>

          <p
            className="mt-6 text-[clamp(1rem,1.3vw,1.2rem)] leading-relaxed max-w-xl"
            style={{ color: "#A79E8C" }}
          >
            {COMPANY_NAME} designs and develops modern, responsive websites for
            businesses, schools and organisations that want to look credible online
            and make it effortless for customers to reach them.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              className="gts-shine inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition-transform hover:-translate-y-0.5"
              style={{
                background: `linear-gradient(120deg, ${COLORS.accentDeep}, ${COLORS.accent} 55%, ${COLORS.accentLight})`,
                color: "#0E0C10",
              }}
            >
              Start a Project
              <ArrowRight size={16} />
            </a>
            <a
              href="#work"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold border transition-colors hover:bg-white/5"
              style={{ color: COLORS.white, borderColor: "rgba(201,162,75,0.3)" }}
            >
              View Our Work
            </a>
          </div>

          <p className="mt-8 text-xs tracking-wide" style={{ color: "#6B6459", fontFamily: FONT_MONO }}>
            Custom design &nbsp;•&nbsp; Responsive development &nbsp;•&nbsp; Built for business
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ==================================================
   TRUST STRIP
================================================== */
const TRUST_ITEMS = [
  { icon: Layers, label: "Custom-built websites" },
  { icon: Smartphone, label: "Mobile-first design" },
  { icon: Zap, label: "Fast modern development" },
  { icon: Key, label: "Clear ownership" },
  { icon: MessageCircle, label: "Direct communication" },
  { icon: Compass, label: "Flexible solutions" },
];

function TrustStrip() {
  return (
    <section className="border-b" style={{ backgroundColor: COLORS.white, borderColor: COLORS.hairline }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-8">
        <StaggerGroup className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {TRUST_ITEMS.map((item) => (
            <StaggerItem key={item.label} className="flex flex-col items-center text-center gap-2.5">
              <item.icon size={20} style={{ color: COLORS.accentDeep }} strokeWidth={1.75} />
              <span className="text-xs font-medium leading-snug" style={{ color: COLORS.muted }}>
                {item.label}
              </span>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}

/* ==================================================
   PROJECT BADGE
================================================== */
function ProjectBadge({ type }: { type: string }) {
  const styles: Record<string, { bg: string; text: string }> = {
    "Client Project": { bg: "rgba(201,162,75,0.16)", text: COLORS.accentDeep },
    Concept: { bg: "rgba(140,110,47,0.14)", text: "#8C6E2F" },
    Demo: { bg: "rgba(107,100,89,0.14)", text: COLORS.muted },
    Redesign: { bg: "rgba(16,122,87,0.12)", text: "#0F6B4C" },
  };
  const style = styles[type] ?? styles.Concept;
  return (
    <span
      className="inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold"
      style={{ backgroundColor: style.bg, color: style.text, fontFamily: FONT_MONO }}
    >
      {type}
    </span>
  );
}

/* ==================================================
   WORK / PORTFOLIO
================================================== */
const PROJECTS = [
  {
    name: "Premium Secondary School Website",
    industry: "School",
    type: "Concept",
    description:
      "A concept design for a secondary school focused on admissions clarity, programme information and building confidence with parents.",
    tech: "Next.js, Tailwind CSS",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200&q=80",
  },
  {
    name: "Beauty Studio Website",
    industry: "Beauty",
    type: "Concept",
    description:
      "A visual-first concept for a beauty studio, built around service menus, a gallery and simple booking contact flows.",
    tech: "React, Tailwind CSS",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200&q=80",
  },
  {
    name: "NGO Organisation Website",
    industry: "NGO",
    type: "Concept",
    description:
      "A design concept for a community organisation, structured to communicate mission, programmes and impact clearly.",
    tech: "Next.js, Node.js",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&q=80",
  },
  {
    name: "Restaurant Website",
    industry: "Restaurant",
    type: "Demo",
    description:
      "A demo build for a restaurant, showcasing a menu layout, location details and reservation-ready contact structure.",
    tech: "React, Tailwind CSS",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80",
  },
  {
    name: "Professional Personal Portfolio",
    industry: "Portfolio",
    type: "Demo",
    description:
      "A personal portfolio concept for a professional, built to present work, experience and contact information cleanly.",
    tech: "Next.js, TypeScript",
    image: "https://images.unsplash.com/photo-1487014679447-9f8336841d58?w=1200&q=80",
  },
  {
    name: "Local Business Website",
    industry: "Business",
    type: "Redesign",
    description:
      "A redesign concept for a local business moving from an outdated site to a faster, mobile-first experience.",
    tech: "Next.js, Tailwind CSS",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80",
  },
];

function ProjectCard({ project }: { project: (typeof PROJECTS)[number] }) {
  return (
    <StaggerItem className="group">
      <div
        className="gts-card-border rounded-xl overflow-hidden border transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
        style={{ borderColor: COLORS.hairline, backgroundColor: COLORS.white }}
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={project.image}
            alt={`${project.name} preview`}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: "linear-gradient(180deg, transparent 40%, rgba(8,7,10,0.55))" }}
          />
          <div className="absolute top-4 left-4">
            <ProjectBadge type={project.type} />
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between gap-3 mb-2">
            <span
              className="text-[11px] font-semibold tracking-wide uppercase"
              style={{ color: COLORS.accentDeep, fontFamily: FONT_MONO }}
            >
              {project.industry}
            </span>
          </div>
          <h3 className="text-lg font-semibold mb-2" style={{ color: COLORS.text, fontFamily: FONT_DISPLAY }}>
            {project.name}
          </h3>
          <p className="text-sm leading-relaxed mb-4" style={{ color: COLORS.muted }}>
            {project.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-xs" style={{ color: COLORS.muted }}>
              {project.tech}
            </span>
            <a
              href={PORTFOLIO_URL}
              className="inline-flex items-center gap-1 text-sm font-semibold"
              style={{ color: COLORS.accentDeep }}
            >
              View Project
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </StaggerItem>
  );
}

function Work() {
  return (
    <section id="work" className="py-24 sm:py-32" style={{ backgroundColor: COLORS.background }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <RevealSection className="max-w-2xl mb-14">
          <SectionLabel>Selected Work</SectionLabel>
          <SectionTitle>Selected Work</SectionTitle>
          <p className="mt-5 text-base leading-relaxed" style={{ color: COLORS.muted }}>
            Web experiences designed to help businesses look credible, communicate
            clearly and convert attention into action.
          </p>
        </RevealSection>

        <StaggerGroup className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((project) => (
            <ProjectCard project={project} key={project.name} />
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}

/* ==================================================
   SERVICES
================================================== */
const SERVICES = [
  {
    title: "Business Websites",
    description: "A professional website that establishes credibility and makes it easier for customers to find and contact you.",
    icon: Building2,
  },
  {
    title: "School Websites",
    description: "Modern school websites designed to improve parent confidence and make admissions information easy to access.",
    icon: School,
  },
  {
    title: "NGO Websites",
    description: "Professional websites for organisations that need to communicate their mission, programmes and impact.",
    icon: HeartHandshake,
  },
  {
    title: "Beauty & Local Business Websites",
    description: "Websites built around services, galleries, contact methods, bookings and local discovery.",
    icon: Scissors,
  },
  {
    title: "Landing Pages",
    description: "Focused pages designed around a specific campaign, product, service or offer.",
    icon: Rocket,
  },
  {
    title: "Website Redesign",
    description: "Modernising outdated websites for better mobile experience, usability, performance and credibility.",
    icon: Layers,
  },
  {
    title: "Custom Features",
    description: "Forms, WhatsApp integration, Google Maps, booking systems and other business-specific functionality.",
    icon: Sparkles,
  },
];

function ServiceCard({ service }: { service: (typeof SERVICES)[number] }) {
  return (
    <StaggerItem>
      <div
        className="gts-card-border h-full rounded-xl border p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
        style={{ borderColor: COLORS.hairline, backgroundColor: COLORS.white }}
      >
        <div
          className="w-11 h-11 rounded-lg flex items-center justify-center mb-5"
          style={{ backgroundColor: "rgba(201,162,75,0.12)" }}
        >
          <service.icon size={20} style={{ color: COLORS.accentDeep }} strokeWidth={1.75} />
        </div>
        <h3 className="text-base font-semibold mb-2.5" style={{ color: COLORS.text, fontFamily: FONT_DISPLAY }}>
          {service.title}
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: COLORS.muted }}>
          {service.description}
        </p>
      </div>
    </StaggerItem>
  );
}

function Services() {
  return (
    <section id="services" className="py-24 sm:py-32" style={{ backgroundColor: COLORS.white }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <RevealSection className="max-w-2xl mb-14">
          <SectionLabel>Services</SectionLabel>
          <SectionTitle>What We Build</SectionTitle>
          <p className="mt-5 text-base leading-relaxed" style={{ color: COLORS.muted }}>
            Focused services designed around one outcome: a website that works as
            hard as the business behind it.
          </p>
        </RevealSection>

        <StaggerGroup className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((service) => (
            <ServiceCard service={service} key={service.title} />
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}

/* ==================================================
   INDUSTRIES
================================================== */
const INDUSTRIES = [
  { title: "Schools", icon: School, description: "Admissions-ready websites that build parent confidence.", needs: "Programme pages, admissions info, staff directories" },
  { title: "Beauty Businesses", icon: Scissors, description: "Visual, service-led sites for salons and studios.", needs: "Service menus, galleries, booking contact" },
  { title: "Salons", icon: Sparkles, description: "Clean, local-first websites built for discovery.", needs: "Location details, service pricing, WhatsApp booking" },
  { title: "NGOs", icon: HeartHandshake, description: "Mission-driven sites that communicate impact clearly.", needs: "Programme pages, donation info, impact stories" },
  { title: "Restaurants", icon: UtensilsCrossed, description: "Menu-forward websites built for hungry visitors.", needs: "Digital menus, location maps, reservation contact" },
  { title: "Local Businesses", icon: Building2, description: "Websites that make local discovery effortless.", needs: "Google Maps, service listings, contact forms" },
  { title: "Professionals", icon: User, description: "Credibility-first sites for consultants and specialists.", needs: "Bios, service breakdowns, direct contact" },
  { title: "Startups", icon: Rocket, description: "Launch-ready sites that explain the product fast.", needs: "Landing pages, waitlists, product explainers" },
  { title: "Personal Brands", icon: Sparkles, description: "Portfolio sites that present work with clarity.", needs: "Project showcases, bios, social links" },
];

function Industries() {
  return (
    <section id="industries" className="py-24 sm:py-32" style={{ backgroundColor: COLORS.background }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <RevealSection className="max-w-2xl mb-14">
          <SectionLabel>Industries</SectionLabel>
          <SectionTitle>Built for Businesses That Want to Be Taken Seriously.</SectionTitle>
        </RevealSection>

        <StaggerGroup className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {INDUSTRIES.map((industry) => (
            <StaggerItem key={industry.title}>
              <div
                className="gts-card-border h-full rounded-xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                style={{ borderColor: COLORS.hairline, backgroundColor: COLORS.white }}
              >
                <industry.icon size={20} style={{ color: COLORS.accentDeep }} strokeWidth={1.75} />
                <h3 className="text-base font-semibold mt-4 mb-1.5" style={{ color: COLORS.text, fontFamily: FONT_DISPLAY }}>
                  {industry.title}
                </h3>
                <p className="text-sm mb-3" style={{ color: COLORS.muted }}>
                  {industry.description}
                </p>
                <p className="text-xs" style={{ color: "#8A8272" }}>
                  {industry.needs}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}

/* ==================================================
   WHY CHOOSE US
================================================== */
const WHY_US = [
  { title: "Custom Design", description: "No templates. Every site is designed for its business." },
  { title: "Mobile-First Development", description: "Built for how most visitors actually browse." },
  { title: "Performance-Focused", description: "Fast-loading pages that respect people's time." },
  { title: "Clear Communication", description: "You always know what stage the project is at." },
  { title: "Business-Focused Design", description: "Every decision serves a clear business goal." },
  { title: "Transparent Ownership", description: "You know exactly what you're paying for." },
  { title: "Scalable Technology", description: "Built on technology that grows with you." },
  { title: "Long-Term Support", description: "Available after launch, not just before it." },
];

function WhyChooseUs() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden" style={{ backgroundColor: COLORS.primary }}>
      <AuroraGlow variant="section" />
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        <RevealSection className="max-w-2xl mb-14">
          <SectionLabel>Why Choose Us</SectionLabel>
          <SectionTitle light>A Studio, Not a Freelance Gig</SectionTitle>
        </RevealSection>

        <StaggerGroup className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {WHY_US.map((item) => (
            <StaggerItem key={item.title}>
              <div
                className="h-full rounded-xl border p-6 transition-colors duration-300 hover:border-[rgba(201,162,75,0.5)]"
                style={{ borderColor: "rgba(201,162,75,0.14)", backgroundColor: "rgba(255,255,255,0.02)" }}
              >
                <Check size={18} style={{ color: COLORS.accentLight }} />
                <h3 className="text-sm font-semibold mt-4 mb-1.5" style={{ color: COLORS.white, fontFamily: FONT_DISPLAY }}>
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "#A79E8C" }}>
                  {item.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <div
          className="grid grid-cols-2 sm:grid-cols-4 gap-8 mt-20 pt-14 border-t"
          style={{ borderColor: "rgba(201,162,75,0.14)" }}
        >
          <AnimatedCounter value={5} suffix="+" label="Website concepts built" />
          <AnimatedCounter value={7} label="Core services offered" />
          <AnimatedCounter value={4} label="Markets served" />
          <AnimatedCounter value={100} suffix="%" label="Mobile-responsive builds" />
        </div>
      </div>
    </section>
  );
}

/* ==================================================
   PROCESS
================================================== */
const PROCESS_STEPS = [
  { step: "01", title: "Discovery", description: "Understand the business, goals, audience and requirements." },
  { step: "02", title: "Strategy & Design", description: "Create the visual direction and structure." },
  { step: "03", title: "Development", description: "Build the responsive website using modern technologies." },
  { step: "04", title: "Review & Refinement", description: "Client reviews the website and requested adjustments are made." },
  { step: "05", title: "Launch", description: "Deploy the website and provide the necessary access and handover." },
];

function Process() {
  return (
    <section id="process" className="py-24 sm:py-32" style={{ backgroundColor: COLORS.white }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <RevealSection className="max-w-2xl mb-16">
          <SectionLabel>Process</SectionLabel>
          <SectionTitle>A Clear Path from Idea to Launch</SectionTitle>
        </RevealSection>

        <div className="relative">
          <div className="hidden lg:block absolute top-8 left-0 right-0 h-px" style={{ backgroundColor: COLORS.hairline }} />
          <StaggerGroup className="grid lg:grid-cols-5 gap-10 lg:gap-6">
            {PROCESS_STEPS.map((item) => (
              <StaggerItem key={item.step} className="relative">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-sm font-semibold mb-5 relative z-10"
                  style={{
                    background: `linear-gradient(135deg, ${COLORS.accentDeep}, ${COLORS.accent})`,
                    color: "#0E0C10",
                    fontFamily: FONT_MONO,
                  }}
                >
                  {item.step}
                </div>
                <h3 className="text-base font-semibold mb-2" style={{ color: COLORS.text, fontFamily: FONT_DISPLAY }}>
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: COLORS.muted }}>
                  {item.description}
                </p>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </div>
    </section>
  );
}

/* ==================================================
   OWNERSHIP / TRANSPARENCY
================================================== */
const OWNERSHIP_POINTS = [
  "You receive the agreed website deliverables in full.",
  "Domain and hosting ownership can remain with you.",
  "Clear access and credentials are handed over.",
  "No unnecessary lock-in to a single provider.",
  "Maintenance arrangements are communicated clearly upfront.",
];

function Ownership() {
  return (
    <section className="py-24 sm:py-32" style={{ backgroundColor: COLORS.background }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <RevealSection>
            <SectionLabel>Transparency</SectionLabel>
            <SectionTitle>You Should Know What You&apos;re Paying For</SectionTitle>
            <p className="mt-5 text-base leading-relaxed max-w-lg" style={{ color: COLORS.muted }}>
              A website is a business asset. We believe clients deserve clarity on
              ownership, access and what happens after launch.
            </p>
          </RevealSection>

          <RevealSection delay={0.1}>
            <ul className="flex flex-col gap-4">
              {OWNERSHIP_POINTS.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span
                    className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "rgba(201,162,75,0.14)" }}
                  >
                    <Check size={12} style={{ color: COLORS.accentDeep }} />
                  </span>
                  <span className="text-sm leading-relaxed" style={{ color: COLORS.text }}>
                    {point}
                  </span>
                </li>
              ))}
            </ul>
          </RevealSection>
        </div>
      </div>
    </section>
  );
}

/* ==================================================
   ABOUT
================================================== */
function About() {
  return (
    <section id="about" className="py-24 sm:py-32" style={{ backgroundColor: COLORS.white }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <RevealSection>
            <div
              className="gts-card-border aspect-[4/5] rounded-2xl overflow-hidden border max-w-md"
              style={{ borderColor: COLORS.hairline }}
            >
              <img
                src="chibs.png"
                alt={`Portrait of ${FOUNDER_NAME}`}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          </RevealSection>

          <RevealSection delay={0.1}>
            <SectionLabel>About</SectionLabel>
            <SectionTitle>The Person Behind the Studio</SectionTitle>
            <p className="mt-5 text-base leading-relaxed" style={{ color: COLORS.muted }}>
              {COMPANY_NAME} is led by {FOUNDER_NAME}, {FOUNDER_ROLE.toLowerCase()},
              building a studio focused on helping businesses and organisations
              improve how they show up online.
            </p>
            <p className="mt-4 text-base leading-relaxed" style={{ color: COLORS.muted }}>
              The work is driven by a genuine interest in design, development and
              solving real business problems  with a long-term focus on
              reliability, clear communication and getting better with every
              project.
            </p>
            <div className="mt-7 flex items-center gap-4">
              <div>
                <div className="text-base font-semibold" style={{ color: COLORS.text, fontFamily: FONT_DISPLAY }}>
                  {FOUNDER_NAME}
                </div>
                <div className="text-sm" style={{ color: COLORS.muted }}>
                  {FOUNDER_ROLE}
                </div>
              </div>
            </div>
          </RevealSection>
        </div>
      </div>
    </section>
  );
}

/* ==================================================
   TECHNOLOGY  infinite marquee
================================================== */
const TECHNOLOGIES = ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "Node.js", "MongoDB"];

function Technology() {
  const reduced = useMotionPref();
  const loop = [...TECHNOLOGIES, ...TECHNOLOGIES];
  return (
    <section className="py-16 overflow-hidden" style={{ backgroundColor: COLORS.background }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 mb-8">
        <p
          className="text-center text-xs font-semibold tracking-[0.28em] uppercase"
          style={{ color: COLORS.muted, fontFamily: FONT_MONO }}
        >
          Built With Modern Technology
        </p>
      </div>
      <div className="relative">
        <div
          className="absolute inset-y-0 left-0 w-24 z-10"
          style={{ background: `linear-gradient(90deg, ${COLORS.background}, transparent)` }}
        />
        <div
          className="absolute inset-y-0 right-0 w-24 z-10"
          style={{ background: `linear-gradient(270deg, ${COLORS.background}, transparent)` }}
        />
        <motion.div
          className="flex gap-4 w-max"
          animate={reduced ? {} : { x: ["0%", "-50%"] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        >
          {loop.map((tech, i) => (
            <span
              key={`${tech}-${i}`}
              className="rounded-full border px-5 py-2.5 text-sm font-medium whitespace-nowrap"
              style={{ borderColor: COLORS.hairline, color: COLORS.text, backgroundColor: COLORS.white }}
            >
              {tech}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ==================================================
   VALUE SECTION
================================================== */
const VALUE_POINTS = [
  "Stronger first impression with visitors",
  "Easier customer contact and enquiries",
  "Better experience for mobile visitors",
  "Clearer presentation of services",
  "Better visibility for local discovery",
  "A more professional brand presence",
  "Easier access to key business information",
];

function ValueSection() {
  return (
    <section className="py-24 sm:py-32" style={{ backgroundColor: COLORS.white }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <RevealSection className="max-w-2xl mb-14">
          <SectionLabel>What You Gain</SectionLabel>
          <SectionTitle>What a Good Website Actually Changes</SectionTitle>
        </RevealSection>

        <StaggerGroup className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {VALUE_POINTS.map((point) => (
            <StaggerItem key={point}>
              <div className="flex items-start gap-3 rounded-lg border p-5" style={{ borderColor: COLORS.hairline }}>
                <Check size={16} style={{ color: COLORS.accentDeep }} className="mt-0.5 flex-shrink-0" />
                <span className="text-sm leading-relaxed" style={{ color: COLORS.text }}>
                  {point}
                </span>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}

/* ==================================================
   "WHAT WORKING WITH US LOOKS LIKE"
================================================== */
const WORKING_WITH_US = [
  "Clear communication from the first message",
  "Regular updates as the project progresses",
  "A transparent scope agreed before work begins",
  "A review stage before anything goes live",
  "A proper handover once the site launches",
];

function WorkingWithUs() {
  return (
    <section className="py-24 sm:py-32" style={{ backgroundColor: COLORS.background }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <RevealSection>
            <SectionLabel>What to Expect</SectionLabel>
            <SectionTitle>What Working With Us Looks Like</SectionTitle>
            <p className="mt-5 text-base leading-relaxed max-w-lg" style={{ color: COLORS.muted }}>
              No client testimonials are listed here yet  instead, here is exactly
              what you can expect from working with the studio.
            </p>
          </RevealSection>

          <RevealSection delay={0.1}>
            <div className="flex flex-col gap-3">
              {WORKING_WITH_US.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-lg border p-4"
                  style={{ borderColor: COLORS.hairline, backgroundColor: COLORS.white }}
                >
                  <span
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "rgba(201,162,75,0.12)" }}
                  >
                    <Check size={14} style={{ color: COLORS.accentDeep }} />
                  </span>
                  <span className="text-sm" style={{ color: COLORS.text }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </RevealSection>
        </div>
      </div>
    </section>
  );
}

/* ==================================================
   FAQ
================================================== */
const FAQS = [
  { q: "What types of websites do you build?", a: "Business websites, school websites, NGO websites, portfolios, landing pages and full redesigns of existing sites." },
  { q: "How long does a website take?", a: "Timelines depend on scope and complexity. Simpler landing pages move faster; multi-page business sites take longer. Timeframes are confirmed during discovery." },
  { q: "Can you redesign an existing website?", a: "Yes. We assess the current site and rebuild it with a modern, mobile-first structure while keeping what already works." },
  { q: "Will the website work on phones?", a: "Every site is built mobile-first, since most visitors will find you on a phone." },
  { q: "Can the website include WhatsApp?", a: "Yes. WhatsApp click-to-chat integration is a common addition for local and service-based businesses." },
  { q: "Can you integrate Google Maps?", a: "Yes. Google Maps integration is available for businesses with a physical location." },
  { q: "Will I own my website?", a: "Ownership of the agreed deliverables, domain and hosting arrangements is discussed clearly before the project starts." },
  { q: "Do you provide maintenance?", a: "Maintenance is available and arrangements are agreed upfront, so there are no surprises after launch." },
  { q: "Can you work with businesses outside Nigeria?", a: "Yes. We work with clients across Nigeria, the United States, the United Kingdom, Francophone Africa and beyond." },
  { q: "How do I start a project?", a: "Reach out through the contact form or WhatsApp with a short description of what you need, and we'll take it from there." },
];

function FAQItem({ faq, isOpen, onToggle }: { faq: (typeof FAQS)[number]; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b" style={{ borderColor: COLORS.hairline }}>
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between gap-4 py-5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
        style={{ outlineColor: COLORS.accent }}
      >
        <span className="text-base font-medium" style={{ color: COLORS.text, fontFamily: FONT_DISPLAY }}>
          {faq.q}
        </span>
        <span
          className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center"
          style={{ backgroundColor: "rgba(201,162,75,0.12)" }}
        >
          {isOpen ? <Minus size={14} style={{ color: COLORS.accentDeep }} /> : <Plus size={14} style={{ color: COLORS.accentDeep }} />}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm leading-relaxed max-w-2xl" style={{ color: COLORS.muted }}>
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  return (
    <section id="faq" className="py-24 sm:py-32" style={{ backgroundColor: COLORS.white }}>
      <div className="max-w-4xl mx-auto px-5 sm:px-8">
        <RevealSection className="max-w-2xl mb-12">
          <SectionLabel>FAQ</SectionLabel>
          <SectionTitle>Common Questions</SectionTitle>
        </RevealSection>

        <RevealSection delay={0.1}>
          {FAQS.map((faq, i) => (
            <FAQItem key={faq.q} faq={faq} isOpen={openIndex === i} onToggle={() => setOpenIndex(openIndex === i ? null : i)} />
          ))}
        </RevealSection>
      </div>
    </section>
  );
}

/* ==================================================
   CONTACT
================================================== */
const SERVICE_OPTIONS = ["Business Website", "School Website", "NGO Website", "Beauty / Local Business Website", "Landing Page", "Website Redesign", "Other"];
const BUDGET_OPTIONS = ["Not sure yet", "Under $500", "$500 – $1,500", "$1,500 – $5,000", "$5,000+"];

function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const required = ["name", "email", "service", "description"];
    const newErrors: Record<string, boolean> = {};
    required.forEach((field) => {
      const value = data.get(field);
      if (!value || String(value).trim() === "") newErrors[field] = true;
    });
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) setSubmitted(true);
  };

  const inputClass =
    "w-full rounded-lg border px-4 py-3 text-sm bg-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1";

  if (submitted) {
    return (
      <div className="rounded-xl border p-10 text-center" style={{ borderColor: COLORS.hairline, backgroundColor: COLORS.white }}>
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
          style={{ background: `linear-gradient(135deg, ${COLORS.accentDeep}, ${COLORS.accent})` }}
        >
          <Check size={24} color="#0E0C10" />
        </div>
        <h3 className="text-lg font-semibold mb-2" style={{ color: COLORS.text, fontFamily: FONT_DISPLAY }}>
          Message received
        </h3>
        <p className="text-sm" style={{ color: COLORS.muted }}>
          Thanks for reaching out. We'll get back to you shortly at the email you provided.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="block text-xs font-semibold mb-2" style={{ color: COLORS.text }}>
            Name
          </label>
          <input id="name" name="name" type="text" className={inputClass} style={{ borderColor: errors.name ? "#DC2626" : COLORS.hairline }} />
          {errors.name && <p className="text-xs mt-1.5 text-red-600">Please enter your name.</p>}
        </div>
        <div>
          <label htmlFor="business" className="block text-xs font-semibold mb-2" style={{ color: COLORS.text }}>
            Business
          </label>
          <input id="business" name="business" type="text" className={inputClass} style={{ borderColor: COLORS.hairline }} />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="email" className="block text-xs font-semibold mb-2" style={{ color: COLORS.text }}>
            Email
          </label>
          <input id="email" name="email" type="email" className={inputClass} style={{ borderColor: errors.email ? "#DC2626" : COLORS.hairline }} />
          {errors.email && <p className="text-xs mt-1.5 text-red-600">Please enter your email.</p>}
        </div>
        <div>
          <label htmlFor="phone" className="block text-xs font-semibold mb-2" style={{ color: COLORS.text }}>
            WhatsApp / Phone
          </label>
          <input id="phone" name="phone" type="tel" className={inputClass} style={{ borderColor: COLORS.hairline }} />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="service" className="block text-xs font-semibold mb-2" style={{ color: COLORS.text }}>
            Service Needed
          </label>
          <select id="service" name="service" className={inputClass} style={{ borderColor: errors.service ? "#DC2626" : COLORS.hairline }} defaultValue="">
            <option value="" disabled>
              Select a service
            </option>
            {SERVICE_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          {errors.service && <p className="text-xs mt-1.5 text-red-600">Please select a service.</p>}
        </div>
        <div>
          <label htmlFor="budget" className="block text-xs font-semibold mb-2" style={{ color: COLORS.text }}>
            Budget Range
          </label>
          <select id="budget" name="budget" className={inputClass} style={{ borderColor: COLORS.hairline }} defaultValue="">
            <option value="" disabled>
              Select a range
            </option>
            {BUDGET_OPTIONS.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="description" className="block text-xs font-semibold mb-2" style={{ color: COLORS.text }}>
          Project Description
        </label>
        <textarea id="description" name="description" rows={5} className={inputClass} style={{ borderColor: errors.description ? "#DC2626" : COLORS.hairline }} />
        {errors.description && <p className="text-xs mt-1.5 text-red-600">Tell us a little about the project.</p>}
      </div>

      <div className="flex flex-wrap gap-4 mt-2">
        <button
          type="submit"
          className="gts-shine inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition-transform hover:-translate-y-0.5"
          style={{ background: `linear-gradient(120deg, ${COLORS.accentDeep}, ${COLORS.accent} 60%, ${COLORS.accentLight})`, color: "#0E0C10" }}
        >
          Start a Conversation
          <ArrowRight size={16} />
        </button>
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold border"
          style={{ borderColor: COLORS.hairline, color: COLORS.text }}
        >
          <FaWhatsapp size={16} />
          Chat on WhatsApp
        </a>
      </div>
    </form>
  );
}

function Contact() {
  return (
    <section id="contact" className="py-24 sm:py-32" style={{ backgroundColor: COLORS.background }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-5 gap-14">
          <RevealSection className="lg:col-span-2">
            <SectionLabel>Contact</SectionLabel>
            <SectionTitle>Have a project in mind?</SectionTitle>
            <p className="mt-5 text-base leading-relaxed" style={{ color: COLORS.muted }}>
              Tell us what you're building, what you need, and where you want to go. We'll take it from there.
            </p>

            <div className="mt-10 flex flex-col gap-4">
              <a href={`mailto:${EMAIL}`} className="flex items-center gap-3 text-sm" style={{ color: COLORS.text }}>
                <Mail size={16} style={{ color: COLORS.accentDeep }} />
                {EMAIL}
              </a>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm"
                style={{ color: COLORS.text }}
              >
                <Phone size={16} style={{ color: COLORS.accentDeep }} />
                {WHATSAPP_DISPLAY}
              </a>
              <span className="flex items-center gap-3 text-sm" style={{ color: COLORS.text }}>
                <MapPin size={16} style={{ color: COLORS.accentDeep }} />
                Nigeria  working with clients worldwide
              </span>
            </div>
          </RevealSection>

          <RevealSection delay={0.1} className="lg:col-span-3">
            <ContactForm />
          </RevealSection>
        </div>
      </div>
    </section>
  );
}

/* ==================================================
   FLOATING WHATSAPP
================================================== */
function FloatingWhatsApp() {
  return (
    <motion.a
      href={`https://wa.me/${WHATSAPP_NUMBER}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.96 }}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
      style={{ backgroundColor: "#25D366", outlineColor: COLORS.accent }}
    >
      <FaWhatsapp size={26} color="#FFFFFF" />
    </motion.a>
  );
}

/* ==================================================
   FOOTER
================================================== */
function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden" style={{ backgroundColor: COLORS.primary }}>
      <AuroraGlow variant="section" />
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="font-semibold text-lg mb-3" style={{ color: COLORS.white, fontFamily: FONT_DISPLAY }}>
              {COMPANY_NAME}
            </div>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: "#A79E8C" }}>
              {TAGLINE}
            </p>
            <div className="flex items-center gap-4 mt-5">
              <a href="#" aria-label="GitHub" style={{ color: "#A79E8C" }}>
                <FaGithub size={18} />
              </a>
              <a href="#" aria-label="LinkedIn" style={{ color: "#A79E8C" }}>
                <FaLinkedin size={18} />
              </a>
              <a href="#" aria-label="Instagram" style={{ color: "#A79E8C" }}>
                <FaInstagram size={18} />
              </a>
              <a href="#" aria-label="X (Twitter)" style={{ color: "#A79E8C" }}>
                <FaXTwitter size={18} />
              </a>
            </div>
          </div>

          <div>
            <div className="text-xs font-semibold tracking-wide uppercase mb-4" style={{ color: "#6B6459", fontFamily: FONT_MONO }}>
              Navigation
            </div>
            <ul className="flex flex-col gap-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm" style={{ color: "#C9C2B4" }}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-xs font-semibold tracking-wide uppercase mb-4" style={{ color: "#6B6459", fontFamily: FONT_MONO }}>
              Services
            </div>
            <ul className="flex flex-col gap-2.5">
              {SERVICES.slice(0, 5).map((s) => (
                <li key={s.title} className="text-sm" style={{ color: "#C9C2B4" }}>
                  {s.title}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-xs font-semibold tracking-wide uppercase mb-4" style={{ color: "#6B6459", fontFamily: FONT_MONO }}>
              Contact
            </div>
            <ul className="flex flex-col gap-2.5 text-sm" style={{ color: "#C9C2B4" }}>
              <li>{EMAIL}</li>
              <li>{WHATSAPP_DISPLAY}</li>
              <li>Nigeria • Worldwide</li>
            </ul>
          </div>
        </div>

        <div
          className="mt-14 pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderColor: "rgba(201,162,75,0.14)" }}
        >
          <p className="text-xs" style={{ color: "#6B6459" }}>
            © {year} {COMPANY_NAME}. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: "#6B6459" }}>
            Designed &amp; built by {FOUNDER_NAME}
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ==================================================
   ROOT
================================================== */
export default function CompanyPage() {
  const systemReduced = useReducedMotion();
  const reduced = Boolean(systemReduced);

  useEffect(() => {
    document.title = `${COMPANY_NAME}  Web Design & Development for Modern Businesses`;
  }, []);

  return (
    <MotionPrefContext.Provider value={reduced}>
      <div style={{ backgroundColor: COLORS.background, fontFamily: FONT_BODY }}>
        <GlobalStyles />
        <GrainOverlay />
        <ScrollProgress />
        <Navbar />
        <main>
          <Hero />
          <TrustStrip />
          <Work />
          <Services />
          <Industries />
          <WhyChooseUs />
          <Process />
          <Ownership />
          <About />
          <Technology />
          <ValueSection />
          <WorkingWithUs />
          <FAQ />
          <Contact />
        </main>
        <Footer />
        <FloatingWhatsApp />
      </div>
    </MotionPrefContext.Provider>
  );
}