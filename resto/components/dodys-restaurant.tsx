"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useInView } from "framer-motion";
import {
  Star, Clock, Menu, X, MapPin, Phone,
  Zap, ArrowRight, Flame, ChevronRight, MessageCircle, Wifi,
  Music, Wine, UtensilsCrossed, Award, TrendingUp
} from "lucide-react";
import { FaWhatsapp, FaTiktok, FaInstagram, FaFacebook, FaPizzaSlice, FaGlassMartini } from "react-icons/fa";

// ─── CONFIG — change these per client ───────────────────────────────────────
const BRAND = {
  name: "Dody's",
  tagline: "Pizza & Pasta",
  type: "Restaurant & Bar",
  description: "Le meilleur cadre de Parakou pour savourer pizzas, pâtes, cocktails et bien plus encore.",
  location: "9JGJ+W36, Unnamed Road, Parakou, Bénin",
  city: "Parakou",
  phone: "+229 01 62 77 77 77",
  whatsapp: "https://wa.me/22901627777?text=Bonjour%20Dody's%2C%20je%20voudrais%20passer%20une%20commande%20%F0%9F%8D%95",
  googleMaps: "https://maps.app.goo.gl/parkouLink",
  facebook: "https://www.facebook.com/Dodys-Pizza-Pasta-1719236721655505",
  instagram: "https://instagram.com/dodysrestaurant",
  tiktok: "#",
  hours: "Lun–Dim : 10h – 2h",
  rating: 4.1,
  reviewCount: 707,
  heroImg: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=1400&q=90",
  logoEmoji: "🍕",
  primaryColor: "#E63946",
  accentColor: "#F4A261",
};
const WHATSAPP_URL = BRAND.whatsapp;

// ─── NAV LINKS ────────────────────────────────────────────────────────────────
const navLinks = ["Menu", "Ambiance", "Avis", "Horaires", "Contact"];

// ─── MENU ITEMS (adapt per client) ───────────────────────────────────────────
const menuCategories = [
  {
    label: "Pizzas",
    icon: <FaPizzaSlice size={16} />,
    items: [
      {
        name: "Pizza Margherita",
        desc: "Sauce tomate maison, mozzarella fondante, basilic frais. Un classique intemporel.",
        price: "6 000 F",
        rating: 4.8,
        tag: "Best Seller",
        img: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600&q=80",
        color: "#E63946",
      },
      {
        name: "Pizza Forestière",
        desc: "Champignons sauvages, crème fraîche, fromage, ail rôti et herbes de Provence.",
        price: "7 500 F",
        rating: 4.7,
        tag: "Premium",
        img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=80",
        color: "#2D6A4F",
      },
    ],
  },
  {
    label: "Pâtes",
    icon: <UtensilsCrossed size={16} />,
    items: [
      {
        name: "Spaghetti Bolognaise",
        desc: "Viande hachée mijotée, sauce tomate riche, parmesan râpé. Réconfortant et savoureux.",
        price: "5 500 F",
        rating: 4.9,
        tag: "Favori",
        img: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=600&q=80",
        color: "#F4A261",
      },
      {
        name: "Penne Carbonara",
        desc: "Pâtes al dente, pancetta croustillante, œuf, pecorino. La vraie recette italienne.",
        price: "6 000 F",
        rating: 4.6,
        tag: "Nouveau",
        img: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600&q=80",
        color: "#9B59B6",
      },
    ],
  },
  {
    label: "Cocktails & Boissons",
    icon: <FaGlassMartini size={16} />,
    items: [
      {
        name: "Cocktail du Jour",
        desc: "Création du barman selon les saisons. Frais, équilibré, inoubliable. Offert avec 1 pizza.",
        price: "2 500 F",
        rating: 5.0,
        tag: "Offre Spéciale",
        img: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&q=80",
        color: "#25D366",
      },
      {
        name: "Jus Frais Maison",
        desc: "Mangue, ananas, gingembre ou bissap. Pressé à la commande, zéro conservateur.",
        price: "1 500 F",
        rating: 4.8,
        tag: "Naturel",
        img: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=600&q=80",
        color: "#F4A261",
      },
    ],
  },
];

// Flatten for the grid
const allMenuItems = menuCategories.flatMap((c) => c.items);

// ─── STEPS ───────────────────────────────────────────────────────────────────
const steps = [
  {
    num: "01",
    title: "Choisissez votre plat",
    desc: "Parcourez notre menu de pizzas, pâtes et cocktails. Quelque chose pour chaque envie.",
    icon: <UtensilsCrossed size={26} />,
    color: BRAND.primaryColor,
  },
  {
    num: "02",
    title: "Commandez sur WhatsApp",
    desc: "Un seul tap suffit. Envoyez-nous votre commande directement livraison ou sur place.",
    icon: <FaWhatsapp size={26} />,
    color: "#25D366",
  },
  {
    num: "03",
    title: "Savourez sans attendre",
    desc: "Confirmation instantanée. Votre repas arrive chaud, frais et préparé avec soin.",
    icon: <Zap size={26} />,
    color: BRAND.accentColor,
  },
];

// ─── TESTIMONIALS ─────────────────────────────────────────────────────────────
const testimonials = [
  {
    name: "Kolade A.",
    role: "Client fidèle, Parakou",
    text: "La meilleure pizza de Parakou, sans aucun doute. Le cadre est magnifique, l'ambiance du feu. On y revient chaque semaine.",
    rating: 5,
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    platform: "Google",
  },
  {
    name: "Ines F.",
    role: "Blogueuse food, Bénin",
    text: "Dody's c'est LE spot incontournable. La carbonara est parfaite, les cocktails créatifs. L'équipe est au petit soin.",
    rating: 5,
    img: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&q=80",
    platform: "Facebook",
  },
  {
    name: "Marc D.",
    role: "Entrepreneur, Parakou",
    text: "Idéal pour des déjeuners d'affaires ou des soirées entre amis. Le rapport qualité-prix est vraiment excellent.",
    rating: 4,
    img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80",
    platform: "Google",
  },
];

// ─── AMBIANCE FEATURES ────────────────────────────────────────────────────────
const ambianceFeatures = [
  { icon: <Wine size={22} />, label: "Bar & Cocktails", desc: "Sélection de cocktails artisanaux et vins" },
  { icon: <Music size={22} />, label: "Live Music", desc: "Ambiance musicale tous les week-ends" },
  { icon: <Wifi size={22} />, label: "Wi-Fi Gratuit", desc: "Connectez-vous pendant votre repas" },
  { icon: <UtensilsCrossed size={22} />, label: "À Volonté", desc: "Formules buffet disponibles" },
];

// ─── PARTICLE CANVAS ─────────────────────────────────────────────────────────
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animId: number;
    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);
    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 2 + 0.5,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      alpha: Math.random() * 0.5 + 0.15,
      color: ["#E63946", "#F4A261", "#FFD166", "#ffffff"][Math.floor(Math.random() * 4)],
    }));
    function draw() {
      ctx!.clearRect(0, 0, W, H);
      particles.forEach((p, i) => {
        particles.slice(i + 1).forEach((q) => {
          const d = Math.hypot(p.x - q.x, p.y - q.y);
          if (d < 110) {
            ctx!.beginPath();
            ctx!.strokeStyle = `rgba(230,57,70,${0.06 * (1 - d / 110)})`;
            ctx!.lineWidth = 0.5;
            ctx!.moveTo(p.x, p.y);
            ctx!.lineTo(q.x, q.y);
            ctx!.stroke();
          }
        });
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fillStyle = p.color + Math.floor(p.alpha * 255).toString(16).padStart(2, "0");
        ctx!.fill();
      });
      animId = requestAnimationFrame(draw);
    }
    draw();
    const onResize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", onResize); };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />;
}

function FloatingCard({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div className={className} animate={{ y: [0, -10, 0] }} transition={{ duration: 4 + delay, repeat: Infinity, ease: "easeInOut", delay }}>
      {children}
    </motion.div>
  );
}

function Reveal({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-70px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 44 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function DodysRestaurant() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const { scrollY } = useScroll();
  const navBg = useTransform(scrollY, [0, 80], ["rgba(8,8,8,0)", "rgba(8,8,8,0.97)"]);

  const stars = Array.from({ length: 5 }, (_, i) => i < Math.round(BRAND.rating));

  return (
    <div className="bg-[#080808] text-white overflow-x-hidden" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Cormorant+Garamond:ital,wght@0,600;0,700;1,400;1,600&display=swap');
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-thumb { background: ${BRAND.primaryColor}; border-radius: 2px; }
        .glass { backdrop-filter: blur(18px); background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); }
        .glow-red { box-shadow: 0 0 28px rgba(230,57,70,0.45), 0 0 56px rgba(230,57,70,0.15); }
        .glow-green { box-shadow: 0 0 28px rgba(37,211,102,0.45), 0 0 56px rgba(37,211,102,0.12); }
        .shine::before { content:''; position:absolute; top:0; left:-100%; width:55%; height:100%; background:linear-gradient(90deg,transparent,rgba(255,255,255,0.05),transparent); transition:left .5s ease; }
        .shine:hover::before { left:150%; }
      `}</style>

      {/* ── NAVBAR ── */}
      <motion.nav style={{ background: navBg }} className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-5 md:px-10 py-4 flex items-center justify-between">
          <motion.a href="#" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg" style={{ background: `linear-gradient(135deg, ${BRAND.primaryColor}, ${BRAND.accentColor})` }}>
              {BRAND.logoEmoji}
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{BRAND.name}</span>
              <span className="text-xs text-white/30 block -mt-1">{BRAND.tagline}</span>
            </div>
          </motion.a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <a key={l} href={`#${l.toLowerCase()}`} className="text-sm text-white/50 hover:text-white transition-colors tracking-wide">{l}</a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <a href={`tel:${BRAND.phone}`} className="flex items-center gap-2 px-4 py-2 glass rounded-full text-sm text-white/60 hover:text-white transition-all">
              <Phone size={14} /> Réserver
            </a>
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-sm font-semibold glow-green transition-all hover:scale-105"
              style={{ background: "linear-gradient(135deg, #25D366, #128C7E)" }}>
              <FaWhatsapp size={15} /> Commander
            </a>
          </div>

          <button className="md:hidden p-2 text-white" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }} className="md:hidden border-t border-white/5" style={{ background: "rgba(8,8,8,0.97)" }}>
              <div className="flex flex-col px-6 py-6 gap-5">
                {navLinks.map((l, i) => (
                  <motion.a key={l} href={`#${l.toLowerCase()}`} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }} onClick={() => setMobileOpen(false)} className="text-white/60 hover:text-white text-base font-medium">{l}</motion.a>
                ))}
                <a href={WHATSAPP_URL} target="_blank" rel="noreferrer"
                  className="flex items-center justify-center gap-2 py-3 rounded-full text-white font-semibold glow-green mt-2"
                  style={{ background: "linear-gradient(135deg, #25D366, #128C7E)" }}>
                  <FaWhatsapp size={18} /> Commander sur WhatsApp
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
        <ParticleCanvas />
        <div className="absolute inset-0 z-1">
          <img src={BRAND.heroImg} alt="Nabil's" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-linear-to-b from-[#080808]/70 via-[#080808]/50 to-[#080808]" />
        </div>
        <div className="absolute top-1/3 left-1/4 w-80 h-80 rounded-full blur-[160px] opacity-10 z-1" style={{ background: BRAND.primaryColor }} />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full blur-[140px] opacity-8 z-1" style={{ background: "#25D366" }} />

        <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-10 w-full py-24">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              {/* Rating badge */}
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm mb-6">
                <div className="flex text-yellow-400 gap-0.5">
                  {stars.map((full, i) => <Star key={i} size={11} fill={full ? "currentColor" : "none"} />)}
                </div>
                <span className="font-semibold">{BRAND.rating}</span>
                <span className="text-white/30">{BRAND.reviewCount} avis Google</span>
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-green-400 text-xs">Ouvert</span>
              </motion.div>

              <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
                className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight mb-5"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                La Meilleure
                <span className="block" style={{ WebkitTextStroke: `1px ${BRAND.primaryColor}`, color: "transparent" }}>
                  Table de
                </span>
                Parakou.
              </motion.h1>

              <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.22 }}
                className="text-lg text-white/45 mb-8 max-w-md leading-relaxed">
                Pizzas authentiques, pâtes maison, cocktails créatifs. Un cadre somptueux, une ambiance unique, ouvert jusqu'à 02h du matin.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.32 }}
                className="flex flex-wrap gap-4 mb-12">
                <a href={WHATSAPP_URL} target="_blank" rel="noreferrer"
                  className="flex items-center gap-2.5 px-7 py-4 rounded-full text-white font-semibold text-base glow-green hover:scale-105 transition-transform duration-300"
                  style={{ background: "linear-gradient(135deg, #25D366, #128C7E)" }}>
                  <FaWhatsapp size={19} /> Commander Maintenant
                </a>
                <a href="#menu" className="flex items-center gap-2 px-7 py-4 rounded-full glass text-white/70 hover:text-white font-medium border border-transparent hover:border-white/15 transition-all duration-300">
                  Voir le Menu <ArrowRight size={15} />
                </a>
              </motion.div>

              {/* Stats */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.6 }}
                className="flex gap-8">
                {[
                  { val: "707+", lbl: "Avis Google" },
                  { val: "4.1★", lbl: "Note moyenne" },
                  { val: "10h–2h", lbl: "Ouvert tous les jours" },
                ].map((s, i) => (
                  <motion.div key={s.lbl} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 + i * 0.09 }}>
                    <div className="text-2xl font-bold">{s.val}</div>
                    <div className="text-[11px] text-white/35 mt-0.5 tracking-wide">{s.lbl}</div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Floating cards */}
            <div className="hidden lg:flex relative h-140 items-center justify-center">
              <FloatingCard delay={0} className="absolute w-64 h-64 rounded-3xl overflow-hidden shadow-2xl z-20">
                <img src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&q=80" alt="Pizza" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4"><div className="text-sm font-semibold">Pizza Forestière</div><div className="text-xs text-white/60">7 500 F CFA</div></div>
              </FloatingCard>
              <FloatingCard delay={0.9} className="absolute top-6 right-4 w-48 h-48 rounded-2xl overflow-hidden shadow-xl z-10">
                <img src="https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&q=80" alt="Pasta" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-3 text-xs font-semibold">Penne Carbonara</div>
              </FloatingCard>
              <FloatingCard delay={1.6} className="absolute bottom-12 -left-4 w-44 h-44 rounded-2xl overflow-hidden shadow-xl z-10">
                <img src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400&q=80" alt="Cocktail" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-3 text-xs font-semibold">Cocktail du Jour</div>
              </FloatingCard>
              <FloatingCard delay={2} className="absolute top-0 left-10 glass rounded-2xl px-4 py-3 z-30">
                <div className="flex items-center gap-2">
                  <div className="text-yellow-400 text-sm">★★★★★</div>
                  <div><div className="text-xs font-bold">4.1 / 5</div><div className="text-[10px] text-white/35">707 avis</div></div>
                </div>
              </FloatingCard>
              <FloatingCard delay={2.4} className="absolute bottom-4 right-2 glass rounded-2xl px-4 py-3 z-30">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: "rgba(37,211,102,0.2)" }}>
                    <Clock size={12} className="text-green-400" />
                  </div>
                  <div><div className="text-xs font-bold">Ouvert</div><div className="text-[10px] text-white/35">Jusqu'à 02h</div></div>
                </div>
              </FloatingCard>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-28 bg-linear-to-t from-[#080808] to-transparent z-10" />
      </section>

      {/* ── MENU ── */}
      <section id="menu" className="py-24">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <Reveal className="text-center mb-12">
            <div className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: BRAND.primaryColor }}>Notre Menu</div>
            <h2 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Chaque plat, une <span style={{ color: BRAND.accentColor }}>expérience</span>
            </h2>
            <p className="text-white/35 mt-4 max-w-sm mx-auto text-sm">Préparés avec des produits frais, chaque jour, par notre équipe passionnée.</p>
          </Reveal>

          {/* Category tabs */}
          <Reveal className="flex justify-center gap-3 mb-10 flex-wrap">
            {menuCategories.map((cat, i) => (
              <button key={cat.label} onClick={() => setActiveTab(i)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${activeTab === i ? "text-white glow-red" : "glass text-white/50 hover:text-white"}`}
                style={activeTab === i ? { background: `linear-gradient(135deg, ${BRAND.primaryColor}, ${BRAND.accentColor})` } : {}}>
                {cat.icon} {cat.label}
              </button>
            ))}
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <AnimatePresence >
              {menuCategories[activeTab].items.map((item, i) => (
                <motion.div key={item.name} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                  className="relative glass rounded-3xl overflow-hidden shine cursor-pointer group" whileHover={{ y: -5 }}>
                  <div className="h-52 overflow-hidden relative">
                    <motion.img src={item.img} alt={item.name} className="w-full h-full object-cover" whileHover={{ scale: 1.07 }} transition={{ duration: 0.4 }} />
                    <div className="absolute inset-0 bg-linear-to-t from-[#080808] via-transparent to-transparent" />
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold text-white" style={{ background: item.color + "33", border: `1px solid ${item.color}55` }}>{item.tag}</div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-bold">{item.name}</h3>
                      <div className="flex items-center gap-1 text-yellow-400 text-xs"><Star size={12} fill="currentColor" /><span className="text-white/50">{item.rating}</span></div>
                    </div>
                    <p className="text-white/35 text-sm mb-5 leading-relaxed">{item.desc}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold" style={{ color: item.color }}>{item.price}</span>
                      <a href={`${WHATSAPP_URL}&text=Bonjour%20Chez%20Nabil%2C%20je%20voudrais%20commander%20${encodeURIComponent(item.name)}`} target="_blank" rel="noreferrer"
                        className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold text-white glow-green"
                        style={{ background: "linear-gradient(135deg, #25D366, #128C7E)" }}>
                        <FaWhatsapp size={13} /> Commander
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ── SPECIAL DU JOUR ── */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <Reveal>
            <div className="relative glass rounded-3xl overflow-hidden border border-white/8">
              <div className="grid md:grid-cols-2">
                <div className="py-10 px-5 md:px-10 md:p-14 flex flex-col justify-center">
                  <motion.div animate={{ scale: [1, 1.04, 1] }} transition={{ duration: 2.2, repeat: Infinity }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-sm font-semibold mb-6 w-fit"
                    style={{ background: `${BRAND.primaryColor}22`, borderColor: `${BRAND.primaryColor}55`, color: BRAND.primaryColor }}>
                    <Flame size={13} /> Offre du Jour
                  </motion.div>
                  <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    1 Pizza achetée<br /><span style={{ color: BRAND.accentColor }}>= 1 Cocktail offert</span>
                  </h2>
                  <p className="text-white/40 mb-7 text-sm leading-relaxed">Profitez de notre offre exclusive chaque soir. Choisissez votre pizza préférée et notre barman vous prépare le cocktail du moment  offert.</p>
                  <div className="flex items-center gap-3 mb-8">
                    <span className="px-3 py-1 rounded-full text-white text-[10px] md:text-xs font-bold" style={{ background: BRAND.primaryColor }}>OFFRE LIMITÉE</span>
                    <span className="text-white/30 text-sm">Valable ce soir uniquement</span>
                  </div>
                  <a href={WHATSAPP_URL} target="_blank" rel="noreferrer"
                    className="flex items-center gap-2.5 px-7 py-4 rounded-full text-white font-semibold text-base glow-green hover:scale-105 transition-transform duration-300 w-fit"
                    style={{ background: "linear-gradient(135deg, #25D366, #128C7E)" }}>
                    <FaWhatsapp size={18} /> Profiter de l'offre
                  </a>
                </div>
                <div className="relative h-60 md:h-auto">
                  <img src="https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=800&q=80" alt="Offre spéciale" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-linear-to-l from-transparent to-[#080808]/50" />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── AMBIANCE ── */}
      <section id="ambiance" className="py-20 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <Reveal className="text-center mb-14">
            <div className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: BRAND.accentColor }}>L'expérience</div>
            <h2 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Plus qu'un restaurant,<br /><span style={{ color: BRAND.primaryColor }}>un lieu de vie</span>
            </h2>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-14">
            {ambianceFeatures.map((f, i) => (
              <Reveal key={f.label} delay={i * 0.1}>
                <motion.div whileHover={{ y: -5 }} className="glass rounded-2xl p-6 text-center border border-white/5 hover:border-white/12 transition-all">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4" style={{ background: `${BRAND.primaryColor}22`, color: BRAND.primaryColor }}>
                    {f.icon}
                  </div>
                  <div className="font-semibold text-sm mb-1">{f.label}</div>
                  <div className="text-white/30 text-xs leading-relaxed">{f.desc}</div>
                </motion.div>
              </Reveal>
            ))}
          </div>

          {/* Photo grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&q=80",
              "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=80",
              "https://images.unsplash.com/photo-1544148103-0773bf10d330?w=400&q=80",
              "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400&q=80",
            ].map((src, i) => (
              <motion.div key={i} className="rounded-2xl overflow-hidden aspect-square" whileHover={{ scale: 1.03 }}>
                <img src={src} alt={`Ambiance ${i + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="py-24">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <Reveal className="text-center mb-14">
            <div className="text-sm font-semibold tracking-widest uppercase mb-3 text-green-400">Commande facile</div>
            <h2 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              3 étapes, <span style={{ color: BRAND.primaryColor }}>c'est tout</span>
            </h2>
          </Reveal>
          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="hidden md:block absolute top-12 left-[calc(16.66%+24px)] right-[calc(16.66%+24px)] h-px" style={{ background: `linear-gradient(90deg, ${BRAND.primaryColor}55, #25D36655, ${BRAND.accentColor}55)` }} />
            {steps.map((s, i) => (
              <Reveal key={s.num} delay={i * 0.12}>
                <motion.div whileHover={{ y: -6 }} className="glass rounded-3xl p-8 text-center border border-white/5 hover:border-white/12 transition-all relative">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5" style={{ background: s.color + "22", border: `1px solid ${s.color}44`, color: s.color }}>
                    {s.icon}
                  </div>
                  <div className="text-5xl font-bold absolute top-6 right-6 text-white/5">{s.num}</div>
                  <h3 className="text-lg font-bold mb-3">{s.title}</h3>
                  <p className="text-white/35 text-sm leading-relaxed">{s.desc}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section id="avis" className="py-24 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <Reveal className="text-center mb-14">
            <div className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: BRAND.accentColor }}>Ils nous font confiance</div>
            <h2 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Ce que disent <span style={{ color: BRAND.primaryColor }}>nos clients</span>
            </h2>
            <div className="flex items-center justify-center gap-2 mt-4">
              <div className="flex text-yellow-400 gap-0.5">{stars.map((f, i) => <Star key={i} size={16} fill={f ? "currentColor" : "none"} />)}</div>
              <span className="text-white/50 text-sm">{BRAND.rating} sur Google · {BRAND.reviewCount} avis</span>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.11}>
                <motion.div whileHover={{ y: -5 }} className="glass rounded-3xl p-7 border border-white/5 hover:border-white/12 transition-all">
                  <div className="flex gap-1 text-yellow-400 mb-5">
                    {Array.from({ length: t.rating }).map((_, j) => <Star key={j} size={13} fill="currentColor" />)}
                  </div>
                  <p className="text-white/55 text-sm leading-relaxed mb-6">"{t.text}"</p>
                  <div className="flex items-center gap-3">
                    <img src={t.img} alt={t.name} className="w-10 h-10 rounded-full object-cover border-2" style={{ borderColor: `${BRAND.primaryColor}44` }} />
                    <div>
                      <div className="font-semibold text-sm">{t.name}</div>
                      <div className="text-xs text-white/25">{t.role} · {t.platform}</div>
                    </div>
                  </div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-28 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at center, ${BRAND.primaryColor}18 0%, transparent 70%)` }} />
        <div className="max-w-3xl mx-auto px-5 md:px-10 text-center relative z-10">
          <Reveal>
            <motion.div animate={{ rotate: [0, 12, -12, 0] }} transition={{ duration: 3, repeat: Infinity }} className="text-5xl mb-7">🍕</motion.div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Envie d'une bonne <span style={{ color: BRAND.primaryColor }}>pizza ce soir ?</span>
            </h2>
            <p className="text-white/35 text-lg mb-10 max-w-md mx-auto">Un message suffit. Votre commande est confirmée en moins de 2 minutes.</p>
            <motion.a href={WHATSAPP_URL} target="_blank" rel="noreferrer"
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-3 px-10 py-5 rounded-full text-white font-bold text-lg glow-green"
              style={{ background: "linear-gradient(135deg, #25D366, #128C7E)" }}>
              <FaWhatsapp size={22} /> Commander sur WhatsApp <ChevronRight size={18} />
            </motion.a>
            <p className="text-white/15 text-xs mt-5">Aucun compte requis · Réponse en moins de 2 min</p>
          </Reveal>
        </div>
      </section>

      {/* ── HORAIRES & LOCALISATION ── */}
         <section id="horaires" className="py-16 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <div className="grid md:grid-cols-2 gap-8">
            <Reveal>
              <div className="glass rounded-3xl p-8 border border-white/5">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${BRAND.primaryColor}22`, color: BRAND.primaryColor }}>
                    <Clock size={20} />
                  </div>
                  <h3 className="text-xl font-bold">Horaires d'ouverture</h3>
                </div>
                {[
                  { day: "Lundi – Vendredi", hours: "10h00 – 2h00" },
                  { day: "Samedi", hours: "10h00 – 2h00" },
                  { day: "Dimanche", hours: "10h00 – 2h00" },
                ].map((h) => (
                  <div key={h.day} className="flex justify-between py-3 border-b border-white/5 last:border-0">
                    <span className="text-white/50 text-sm">{h.day}</span>
                    <span className="text-sm font-semibold">{h.hours}</span>
                  </div>
                ))}
                <div className="mt-5 flex items-center gap-2 text-green-400 text-sm">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  Actuellement ouvert
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="glass rounded-3xl p-8 border border-white/5">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${BRAND.accentColor}22`, color: BRAND.accentColor }}>
                    <MapPin size={20} />
                  </div>
                  <h3 className="text-xl font-bold">Nous trouver</h3>
                </div>
                <p className="text-white/45 text-sm mb-4 leading-relaxed">{BRAND.location}</p>
                <div className="flex flex-col gap-3">
                  <a href={`tel:${BRAND.phone}`} className="flex items-center gap-3 py-2.5 px-4 glass rounded-xl text-sm hover:text-white text-white/60 transition-colors">
                    <Phone size={15} style={{ color: BRAND.primaryColor }} /> {BRAND.phone}
                  </a>
                  <a href={WHATSAPP_URL} target="_blank" rel="noreferrer"
                    className="flex items-center gap-3 py-2.5 px-4 glass rounded-xl text-sm text-white/60 hover:text-white transition-colors">
                    <FaWhatsapp size={15} className="text-green-400" /> Commander sur WhatsApp
                  </a>
                  <a href={BRAND.googleMaps} target="_blank" rel="noreferrer"
                    className="flex items-center gap-3 py-2.5 px-4 glass rounded-xl text-sm text-white/60 hover:text-white transition-colors">
                    <MapPin size={15} style={{ color: BRAND.accentColor }} /> Voir sur Google Maps
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer id="contact" className="border-t border-white/5 py-14">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg" style={{ background: `linear-gradient(135deg, ${BRAND.primaryColor}, ${BRAND.accentColor})` }}>{BRAND.logoEmoji}</div>
                <div>
                  <span className="text-lg font-bold" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{BRAND.name}</span>
                  <span className="text-xs text-white/30 block -mt-0.5">{BRAND.tagline}</span>
                </div>
              </div>
              <p className="text-white/25 text-sm leading-relaxed mb-5 max-w-xs">{BRAND.description}</p>
              <div className="flex gap-3">
                {[{ Icon: FaFacebook, href: BRAND.facebook }, { Icon: FaInstagram, href: BRAND.instagram }, { Icon: FaTiktok, href: BRAND.tiktok }].map(({ Icon, href }, i) => (
                  <motion.a key={i} href={href} target="_blank" rel="noreferrer" whileHover={{ scale: 1.2 }}
                    className="w-9 h-9 glass rounded-full flex items-center justify-center text-white/35 hover:text-white transition-colors">
                    <Icon size={14} />
                  </motion.a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-xs tracking-widest uppercase text-white/40 mb-5">Liens rapides</h4>
              <div className="flex flex-col gap-3">
                {["Menu", "Ambiance", "Horaires", "Avis", "Commander"].map((l) => (
                  <a key={l} href={`#${l.toLowerCase()}`} className="text-white/30 hover:text-white text-sm transition-colors">{l}</a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-xs tracking-widest uppercase text-white/40 mb-5">Contact</h4>
              <div className="flex flex-col gap-3">
                <div className="flex items-start gap-2 text-sm text-white/30"><MapPin size={13} className="mt-0.5 shrink-0" style={{ color: BRAND.primaryColor }} />{BRAND.location}</div>
                <div className="flex items-center gap-2 text-sm text-white/30"><Phone size={13} style={{ color: BRAND.primaryColor }} />{BRAND.phone}</div>
                <div className="flex items-center gap-2 text-sm text-white/30"><Clock size={13} style={{ color: BRAND.accentColor }} />{BRAND.hours}</div>
              </div>
            </div>
          </div>
          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/15 text-xs">© 2026 {BRAND.name} {BRAND.tagline}. Tous droits réservés.</p>
            <p className="text-white/10 text-xs">Conçu par GTECH à Parakou</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
