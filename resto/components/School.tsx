"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useSpring, useInView, animate } from "framer-motion";
import {
  GraduationCap, BookOpen, Users, Trophy, Phone, Mail, MapPin,
  ArrowRight, Menu, X, ChevronDown, Globe, Send, Quote, Star,
  Clock, Award, Target, Eye, Heart, Zap, Shield, CheckCircle,
  ChevronRight, Building, Calendar
} from "lucide-react";
import { FaFacebook, FaTwitter, FaInstagram, FaWhatsapp } from "react-icons/fa";
import * as THREE from "three";

// ─── SCHOOL DATA ─────────────────────────────────────────
const SCHOOL = {
  name: "CS La Sonnette",
  type: "Établissement Secondaire Privé",
  tagline: "Former les esprits, bâtir l'avenir",
  headline: "L'excellence académique au cœur de chaque élève",
  subheadline:
    " La Sonnette offre un cadre rigoureux et bienveillant pour former des élèves compétents, responsables et prêts à relever les défis de demain.",
  location: "Cotonou",
  country: "Bénin",
  language: "Français",
  director: {
    name: "M. Jean Dupont",
    title: "Directeur Général",
    message:
      "Chers parents, chers élèves, bienvenue au CS La Sonnette. Notre engagement est de fournir une éducation de qualité supérieure, fondée sur des valeurs de rigueur, de respect et d'excellence. Chaque élève est unique, et nous mettons tout en œuvre pour développer ses talents et l'accompagner vers la réussite. Ensemble, construisons un avenir prometteur.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80",
  },
  description:
    " La Sonnette est une institution éducative de référence à Cotonou, dédiée à la formation académique rigoureuse et au développement global des élèves. Fondée sur des valeurs d'excellence, de discipline et d'innovation pédagogique, elle prépare chaque génération à réussir dans un monde en constante évolution.",
  mission:
    "Offrir une éducation rigoureuse et structurée qui développe la pensée critique, la discipline et l'excellence académique, tout en cultivant les valeurs humaines essentielles.",
  vision:
    "Former des élèves responsables, compétents et prêts à réussir dans un environnement national et international, en faisant d' La Sonnette l'établissement de référence au Bénin.",
  programs: [
    {
      level: "Cycle Primaire",
      icon: BookOpen,
      grades: "CP1 – CM2",
      description:
        "Un enseignement fondamental structuré qui pose les bases solides de l'apprentissage, de la lecture, des mathématiques et des sciences.",
      features: ["Lecture & Expression", "Mathématiques", "Sciences & Nature", "Langues"],
    },
    {
      level: "Cycle Secondaire",
      icon: GraduationCap,
      grades: "6ème – Terminale",
      description:
        "Un parcours académique complet préparant aux examens nationaux, avec un encadrement pédagogique de haut niveau.",
      features: ["Préparation BEPC & BAC", "Sciences exactes", "Lettres & Humanités", "Langues vivantes"],
    },
    {
      level: "Classes Préparatoires",
      icon: Trophy,
      grades: "Post-BAC",
      description:
        "Des classes d'excellence pour préparer les concours des grandes écoles et universités nationales et internationales.",
      features: ["Concours d'entrée", "Mathématiques avancées", "Sciences appliquées", "Méthodologie"],
    },
  ],
  activities: [
    { name: "Sport & EPS", icon: Trophy, desc: "Football, basketball, athlétisme et sports collectifs." },
    { name: "Arts & Culture", icon: Star, desc: "Musique, théâtre, arts plastiques et expression créative." },
    { name: "Club Sciences", icon: Zap, desc: "Expériences, olympiades scientifiques et projets innovants." },
    { name: "Leadership", icon: Shield, desc: "Conseil des élèves, débats et formation civique." },
    { name: "Bibliothèque", icon: BookOpen, desc: "Espace lecture, recherche documentaire et numérique." },
    { name: "Langues", icon: Globe, desc: "Clubs anglais, français et initiation aux langues étrangères." },
  ],
  whyUs: [
    { title: "Excellence Académique", icon: Award, desc: "Résultats constants aux examens nationaux avec un taux de réussite exceptionnel." },
    { title: "Corps Enseignant Qualifié", icon: Users, desc: "Enseignants expérimentés, formés et passionnés par la transmission du savoir." },
    { title: "Cadre Sécurisé", icon: Shield, desc: "Un environnement sûr, propre et propice à l'apprentissage et à l'épanouissement." },
    { title: "Suivi Personnalisé", icon: Heart, desc: "Accompagnement individualisé de chaque élève tout au long de son parcours." },
    { title: "Infrastructure Moderne", icon: Building, desc: "Salles équipées, laboratoires, bibliothèque et espaces sportifs de qualité." },
    { title: "Valeurs & Discipline", icon: CheckCircle, desc: "Une éducation fondée sur le respect, la responsabilité et l'engagement." },
  ],
  stats: [
    { value: 850, label: "Élèves inscrits", suffix: "+" },
    { value: 98, label: "Taux de réussite", suffix: "%" },
    { value: 45, label: "Enseignants qualifiés", suffix: "" },
    { value: 12, label: "Années d'expérience", suffix: "" },
  ],
  gallery: [
    "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=80",
    "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600&q=80",
    "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80",
    "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&q=80",
    "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&q=80",
    "https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?w=600&q=80",
  ],
  contact: {
    phone: "+229 01 96 58 71 71",
    email: "contact@lasonnette-cotonou.bj",
    address: "Quartier Zongo, Avenue de l'Éducation, Cotonou, Bénin",
    hours: "Lun – Ven : 07h30 – 17h00 | Sam : 08h00 – 12h00",
  },
  social: {
    facebook: "#",
    twitter: "#",
    instagram: "#",
    whatsapp: "#",
  },
};

const NAV_LINKS = [
  { href: "#accueil", label: "Accueil" },
  { href: "#apropos", label: "À Propos" },
  { href: "#programmes", label: "Programmes" },
  { href: "#admissions", label: "Admissions" },
  { href: "#contact", label: "Contact" },
];

// ─── DESIGN TOKENS ───────────────────────────────────────
const C = {
  blue: "#3B82C4",
  blueDark: "#1E40AF",
  blueLight: "#EFF6FF",
  gray: "#F8FAFC",
  text: "#1E293B",
  muted: "#64748B",
  white: "#FFFFFF",
};

// ─── UTILITY COMPONENTS ──────────────────────────────────
function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block text-xs font-semibold tracking-widest uppercase text-blue-500 mb-2">
      {children}
    </span>
  );
}

function Title({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <h2 className={`text-3xl md:text-4xl font-bold leading-tight mb-3 ${light ? "text-white" : "text-slate-800"}`}>
      {children}
    </h2>
  );
}

function Divider() {
  return <div className="w-12 h-1 bg-blue-500 mb-5 rounded-full" />;
}

function SectionTitle({ label, title, subtitle, light = false }: any) {
  return (
    <div className="mb-10">
      <Label>{label}</Label>
      <Title light={light}>{title}</Title>
      <Divider />
      {subtitle && (
        <p className={`text-base leading-relaxed max-w-2xl ${light ? "text-blue-100" : "text-slate-500"}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

function GlassCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`bg-white/80 backdrop-blur-sm border border-white/60 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 ${className}`}>
      {children}
    </div>
  );
}

function RevealSection({ children, delay = 0, className = "" }: any) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── ANIMATED COUNTER ────────────────────────────────────
function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView || !ref.current) return;
    const controls = animate(0, value, {
      duration: 2,
      ease: "easeOut",
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = Math.round(v) + suffix;
      },
    });
    return controls.stop;
  }, [inView, value, suffix]);
  return <span ref={ref}>0{suffix}</span>;
}

// ─── THREE.JS HERO BACKGROUND ────────────────────────────
function ThreeBG() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;
    const el = mountRef.current;
    const W = el.clientWidth || window.innerWidth;
    const H = el.clientHeight || 700;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    el.appendChild(renderer.domElement);

    // Floating particles
    const particleCount = 80;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 14;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const pMat = new THREE.PointsMaterial({ color: 0x93c5fd, size: 0.05, transparent: true, opacity: 0.7 });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    // Wireframe octahedron
    const geo = new THREE.OctahedronGeometry(1.4, 1);
    const mat = new THREE.MeshBasicMaterial({ color: 0x3b82c4, wireframe: true, transparent: true, opacity: 0.18 });
    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);

    // Secondary small sphere
    const sGeo = new THREE.IcosahedronGeometry(0.5, 1);
    const sMat = new THREE.MeshBasicMaterial({ color: 0xbfdbfe, wireframe: true, transparent: true, opacity: 0.22 });
    const sphere = new THREE.Mesh(sGeo, sMat);
    sphere.position.set(2.5, 1, -1);
    scene.add(sphere);

    camera.position.z = 5;

    let frame: number;
    const loop = () => {
      frame = requestAnimationFrame(loop);
      mesh.rotation.x += 0.0015;
      mesh.rotation.y += 0.002;
      sphere.rotation.y += 0.003;
      particles.rotation.y += 0.0005;
      renderer.render(scene, camera);
    };
    loop();

    const onResize = () => {
      const W2 = el.clientWidth || window.innerWidth;
      const H2 = el.clientHeight || 700;
      camera.aspect = W2 / H2;
      camera.updateProjectionMatrix();
      renderer.setSize(W2, H2);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 pointer-events-none" />;
}

// ─── SCROLL PROGRESS BAR ─────────────────────────────────
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });
  return (
    <motion.div
      style={{ scaleX, transformOrigin: "left" }}
      className="fixed top-0 left-0 right-0 h-0.5 bg-blue-500 z-100"
    />
  );
}

// ─── FLOATING CTA ────────────────────────────────────────
function FloatingCTA() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <motion.a
      href="#admissions"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0.8 }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-full shadow-lg flex items-center gap-2 text-sm font-semibold transition-colors"
    >
      <GraduationCap size={16} />
      S'inscrire
    </motion.a>
  );
}

// ─── NAVBAR ──────────────────────────────────────────────
function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0.5 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <GraduationCap size={18} className="text-white" />
          </div>
          <span className={`font-bold text-lg tracking-tight transition-colors ${scrolled ? "text-slate-800" : "text-white"}`}>
            {SCHOOL.name}
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`text-sm font-medium transition-colors hover:text-blue-500 ${
                scrolled ? "text-slate-600" : "text-white/90"
              }`}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#admissions"
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            S'inscrire
          </a>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className={`md:hidden transition-colors ${scrolled ? "text-slate-700" : "text-white"}`}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white border-t px-6 py-4 flex flex-col gap-4"
        >
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-slate-700 font-medium text-sm"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#admissions"
            className="bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-lg text-center"
          >
            S'inscrire
          </a>
        </motion.div>
      )}
    </nav>
  );
}

// ─── HERO ────────────────────────────────────────────────
function Hero() {
  return (
    <section id="accueil" className="relative min-h-screen flex items-center overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1800&q=80"
        alt=" La Sonnette"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-br from-slate-900/80 via-blue-900/60 to-slate-800/70" />
      <ThreeBG />

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-28 pb-16 w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="inline-block bg-blue-500/20 border border-blue-400/40 text-blue-200 text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full mb-6">
            {SCHOOL.type} — {SCHOOL.location}, {SCHOOL.country}
          </span>

          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6 max-w-3xl">
            {SCHOOL.headline}
          </h1>

          <p className="text-blue-100 text-lg max-w-2xl leading-relaxed mb-10">
            {SCHOOL.subheadline}
          </p>

          <div className="flex flex-wrap gap-4 mb-14">
            <a
              href="#admissions"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              <GraduationCap size={18} />
              S'inscrire maintenant
            </a>

            <a
              href="#contact"
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              <Phone size={18} />
              Nous contacter
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {SCHOOL.stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-5 text-center"
              >
                <div className="text-3xl font-bold text-white mb-1">
                  <Counter value={s.value} suffix={s.suffix} />
                </div>
                <p className="text-blue-200 text-xs font-medium">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <a
        href="#apropos"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/60 hover:text-white transition-colors"
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
          <ChevronDown size={28} />
        </motion.div>
      </a>
    </section>
  );
}

// ─── ABOUT ───────────────────────────────────────────────
function About() {
  return (
    <section id="apropos" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <RevealSection>
            <SectionTitle
              label="À propos de nous"
              title="Une institution au service de l'excellence"
              subtitle={SCHOOL.description}
            />
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0 mt-1">
                  <Target size={18} className="text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800 mb-1">Notre Mission</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">{SCHOOL.mission}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0 mt-1">
                  <Eye size={18} className="text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800 mb-1">Notre Vision</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">{SCHOOL.vision}</p>
                </div>
              </div>
            </div>
          </RevealSection>

          <RevealSection delay={0.15}>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=700&q=80"
                alt="Élèves en classe"
                className="rounded-2xl w-full object-cover shadow-lg"
              />
              <div className="absolute -bottom-5 -left-5 bg-blue-600 text-white rounded-xl px-5 py-4 shadow-lg">
                <p className="text-2xl font-bold">12+</p>
                <p className="text-blue-100 text-sm">Années d'expérience</p>
              </div>
            </div>
          </RevealSection>
        </div>
      </div>
    </section>
  );
}

// ─── DIRECTOR MESSAGE ─────────────────────────────────────
function DirectorMessage() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-5xl mx-auto px-6">
        <RevealSection>
          <GlassCard className="p-10 md:p-14">
            <div className="grid md:grid-cols-3 gap-10 items-start">
              <div className="text-center md:text-left">
                <img
                  src={SCHOOL.director.image}
                  alt={SCHOOL.director.name}
                  className="w-28 h-28 rounded-2xl object-cover mx-auto md:mx-0 mb-4 shadow"
                />
                <p className="font-bold text-slate-800">{SCHOOL.director.name}</p>
                <p className="text-blue-500 text-sm font-medium">{SCHOOL.director.title}</p>
              </div>
              <div className="md:col-span-2">
                <Label>Message du Directeur</Label>
                <h3 className="text-2xl font-bold text-slate-800 mb-4">
                  Un engagement envers votre réussite
                </h3>
                <Divider />
                <div className="relative">
                  <Quote size={32} className="text-blue-100 absolute -top-2 -left-2" />
                  <p className="text-slate-600 leading-relaxed pl-6 italic">
                    {SCHOOL.director.message}
                  </p>
                </div>
              </div>
            </div>
          </GlassCard>
        </RevealSection>
      </div>
    </section>
  );
}

// ─── PROGRAMS ────────────────────────────────────────────
function Programs() {
  return (
    <section id="programmes" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <RevealSection>
          <SectionTitle
            label="Nos Programmes"
            title="Un parcours académique structuré"
            subtitle="Du cycle primaire aux classes préparatoires, chaque niveau bénéficie d'un enseignement rigoureux et adapté."
          />
        </RevealSection>

        <div className="grid md:grid-cols-3 gap-6">
          {SCHOOL.programs.map((p, i) => (
            <RevealSection key={p.level} delay={i * 0.1}>
              <div className="group border border-slate-100 hover:border-blue-200 rounded-2xl p-7 bg-white hover:shadow-md transition-all duration-300 h-full">
                <div className="w-12 h-12 bg-blue-50 group-hover:bg-blue-600 rounded-xl flex items-center justify-center mb-5 transition-colors duration-300">
                  <p.icon size={22} className="text-blue-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <span className="text-xs font-semibold text-blue-500 uppercase tracking-wider">{p.grades}</span>
                <h3 className="text-xl font-bold text-slate-800 mt-1 mb-3">{p.level}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-5">{p.description}</p>
                <ul className="space-y-2">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-slate-600">
                      <CheckCircle size={14} className="text-blue-500 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── ACTIVITIES ──────────────────────────────────────────
function Activities() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <RevealSection>
          <SectionTitle
            label="Vie Scolaire"
            title="Activités Extrascolaires"
            subtitle="Au-delà des cours, nous développons les talents et la personnalité de chaque élève."
          />
        </RevealSection>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
          {SCHOOL.activities.map((a, i) => (
            <RevealSection key={a.name} delay={i * 0.08}>
              <GlassCard className="p-6 flex gap-4 items-start hover:border-blue-200 transition-colors group">
                <div className="w-10 h-10 rounded-lg bg-blue-50 group-hover:bg-blue-100 flex items-center justify-center shrink-0 transition-colors">
                  <a.icon size={18} className="text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800 mb-1">{a.name}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">{a.desc}</p>
                </div>
              </GlassCard>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── WHY US ──────────────────────────────────────────────
function WhyUs() {
  return (
    <section className="py-24 bg-blue-700 relative overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1800&q=80"
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-10"
      />
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <RevealSection>
          <SectionTitle
            label="Nos Atouts"
            title="Pourquoi Choisir CS La Sonnette ?"
            subtitle="Des raisons solides de nous faire confiance pour l'avenir de vos enfants."
            light
          />
        </RevealSection>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
          {SCHOOL.whyUs.map((w, i) => (
            <RevealSection key={w.title} delay={i * 0.08}>
              <div className="bg-white/10 hover:bg-white/15 border border-white/20 rounded-2xl p-6 transition-colors duration-300 group">
                <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center mb-4">
                  <w.icon size={18} className="text-white" />
                </div>
                <h4 className="font-semibold text-white mb-2">{w.title}</h4>
                <p className="text-blue-100 text-sm leading-relaxed">{w.desc}</p>
              </div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── STATS ───────────────────────────────────────────────
function Stats() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <RevealSection>
          <div className="text-center mb-12">
            <Label>Nos Résultats</Label>
            <Title> La Sonnette en chiffres</Title>
            <Divider />
          </div>
        </RevealSection>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {SCHOOL.stats.map((s, i) => (
            <RevealSection key={s.label} delay={i * 0.1}>
              <div className="text-center p-6 rounded-2xl bg-slate-50 border border-slate-100">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  <Counter value={s.value} suffix={s.suffix} />
                </div>
                <p className="text-slate-500 text-sm font-medium">{s.label}</p>
              </div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── GALLERY ─────────────────────────────────────────────
function Gallery() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <RevealSection>
          <SectionTitle
            label="Notre École"
            title="Galerie Photos"
            subtitle="Découvrez notre environnement scolaire, nos salles de classe et nos activités."
          />
        </RevealSection>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {SCHOOL.gallery.map((src, i) => (
            <RevealSection key={i} delay={i * 0.07}>
              <div className="overflow-hidden rounded-xl aspect-video group">
                <img
                  src={src}
                  alt={`Galerie ${i + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </RevealSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── ADMISSIONS ──────────────────────────────────────────
function Admissions() {
  return (
    <section id="admissions" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-br from-blue-50 to-white" />
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <RevealSection>
          <Label>Rejoignez-nous</Label>
          <Title>Inscrivez votre enfant dès aujourd'hui</Title>
          <Divider />
          <p className="text-slate-500 max-w-xl mx-auto mb-10 leading-relaxed">
            Les inscriptions pour la prochaine année scolaire sont ouvertes. Offrez à votre enfant une éducation de qualité dans un cadre sécurisé et stimulant.
          </p>

          <div className="grid md:grid-cols-3 gap-4 mb-10 text-left">
            {[
              { icon: Calendar, title: "Prendre rendez-vous", desc: "Visitez l'établissement et rencontrez notre équipe pédagogique." },
              { icon: BookOpen, title: "Constituer le dossier", desc: "Réunissez les documents scolaires, médicaux et administratifs." },
              { icon: CheckCircle, title: "Confirmer l'inscription", desc: "Finalisez l'inscription et accueillez votre enfant parmi nous." },
            ].map((step, i) => (
              <GlassCard key={step.title} className="p-5">
                <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center mb-3">
                  <step.icon size={17} className="text-blue-600" />
                </div>
                <p className="text-xs font-semibold text-blue-500 uppercase tracking-wider mb-1">Étape {i + 1}</p>
                <h4 className="font-semibold text-slate-800 mb-1">{step.title}</h4>
                <p className="text-slate-500 text-sm">{step.desc}</p>
              </GlassCard>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="#contact"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              <Send size={16} />
              Nous contacter
            </a>
            <a
              href={`tel:${SCHOOL.contact.phone}`}
              className="flex items-center gap-2 border border-blue-200 hover:border-blue-400 text-blue-700 font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              <Phone size={16} />
              {SCHOOL.contact.phone}
            </a>
          </div>
        </RevealSection>
      </div>
    </section>
  );
}

// ─── CONTACT ─────────────────────────────────────────────
function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <section id="contact" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <RevealSection>
          <SectionTitle
            label="Contact"
            title="Prenez contact avec nous"
            subtitle="Notre équipe est disponible pour répondre à toutes vos questions."
          />
        </RevealSection>

        <div className="grid md:grid-cols-2 gap-10">
          <RevealSection>
            <div className="space-y-6">
              {[
                { icon: MapPin, label: "Adresse", value: SCHOOL.contact.address },
                { icon: Phone, label: "Téléphone", value: SCHOOL.contact.phone },
                { icon: Mail, label: "Email", value: SCHOOL.contact.email },
                { icon: Clock, label: "Horaires", value: SCHOOL.contact.hours },
              ].map((item) => (
                <div key={item.label} className="flex gap-4 items-start">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center shrink-0">
                    <item.icon size={18} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-0.5">{item.label}</p>
                    <p className="text-slate-700 font-medium text-sm">{item.value}</p>
                  </div>
                </div>
              ))}

              <div className="flex gap-3 pt-2">
                {[
                  { icon: FaFacebook, href: SCHOOL.social.facebook },
                  { icon: FaTwitter, href: SCHOOL.social.twitter },
                  { icon: FaInstagram, href: SCHOOL.social.instagram },
                  { icon: FaWhatsapp, href: SCHOOL.social.whatsapp },
                ].map((s, i) => (
                  <a
                    key={i}
                    href={s.href}
                    className="w-9 h-9 bg-slate-100 hover:bg-blue-100 rounded-lg flex items-center justify-center text-slate-500 hover:text-blue-600 transition-colors"
                  >
                    <s.icon size={16} />
                  </a>
                ))}
              </div>
            </div>
          </RevealSection>

          <RevealSection delay={0.15}>
            <GlassCard className="p-7">
              {sent ? (
                <div className="text-center py-10">
                  <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
                  <h4 className="font-bold text-slate-800 text-lg mb-2">Message envoyé !</h4>
                  <p className="text-slate-500 text-sm">Nous vous répondrons dans les plus brefs délais.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <h3 className="font-bold text-slate-800 text-lg mb-4">Envoyer un message</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      placeholder="Votre nom"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="col-span-2 md:col-span-1 w-full px-4 py-3 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 transition-colors"
                    />
                    <input
                      placeholder="Votre email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="col-span-2 md:col-span-1 w-full px-4 py-3 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 transition-colors"
                    />
                  </div>
                  <input
                    placeholder="Objet du message"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 transition-colors"
                  />
                  <textarea
                    rows={4}
                    placeholder="Votre message..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-blue-400 transition-colors resize-none"
                  />
                  <button
                    onClick={handleSubmit}
                    className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
                  >
                    <Send size={16} />
                    Envoyer le message
                  </button>
                </div>
              )}
            </GlassCard>
          </RevealSection>
        </div>
      </div>
    </section>
  );
}

// ─── MAP ─────────────────────────────────────────────────
function MapSection() {
  return (
    <section className="h-72 relative overflow-hidden">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126672.18261060896!2d2.5823097!3d9.3372443!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1124e0b9e4b2f0c7%3A0x36b0a65f44a9c9b9!2sCotonou%2C%20B%C3%A9nin!5e0!3m2!1sfr!2sfr!4v1700000000000!5m2!1sfr!2sfr"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Localisation  La Sonnette"
      />
    </section>
  );
}

// ─── FOOTER ──────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <GraduationCap size={18} className="text-white" />
            </div>
            <span className="font-bold text-lg">{SCHOOL.name}</span>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed max-w-xs mb-5">
            {SCHOOL.tagline} — {SCHOOL.type}, {SCHOOL.location}, {SCHOOL.country}.
          </p>
          <div className="flex gap-3">
            {[FaFacebook, FaTwitter, FaInstagram, FaWhatsapp].map((Icon, i) => (
              <a key={i} href="#" className="w-8 h-8 bg-slate-800 hover:bg-blue-600 rounded-lg flex items-center justify-center text-slate-400 hover:text-white transition-colors">
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h5 className="font-semibold text-sm uppercase tracking-wider text-slate-300 mb-4">Navigation</h5>
          <ul className="space-y-2">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-slate-400 hover:text-white text-sm transition-colors">{l.label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h5 className="font-semibold text-sm uppercase tracking-wider text-slate-300 mb-4">Contact</h5>
          <ul className="space-y-3 text-slate-400 text-sm">
            <li className="flex gap-2 items-start"><MapPin size={14} className="mt-0.5 shrink-0 text-blue-400" />{SCHOOL.location}, {SCHOOL.country}</li>
            <li className="flex gap-2 items-center"><Phone size={14} className="shrink-0 text-blue-400" />{SCHOOL.contact.phone}</li>
            <li className="flex gap-2 items-center"><Mail size={14} className="shrink-0 text-blue-400" />{SCHOOL.contact.email}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-800 px-6 py-5 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2 text-slate-500 text-xs">
        <p>© {new Date().getFullYear()} {SCHOOL.name}. Tous droits réservés.</p>
        <p className="flex items-center gap-1">
          <Globe size={12} />
          {SCHOOL.location}, {SCHOOL.country}
        </p>
      </div>
    </footer>
  );
}

// ─── PAGE ────────────────────────────────────────────────
export default function AcademiaPage() {
  return (
    <main className="font-sans antialiased text-slate-800 bg-white">
      <ScrollProgress />
      <FloatingCTA />
      <Navbar />
      <Hero />
      <About />
      <DirectorMessage />
      <Programs />
      <Activities />
      <WhyUs />
      <Stats />
      <Gallery />
      <Admissions />
      <Contact />
      <MapSection />
      <Footer />
    </main>
  );
}