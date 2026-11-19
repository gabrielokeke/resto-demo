"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion, useScroll, useTransform, AnimatePresence, useInView,
} from "framer-motion";
import {
  Menu, X, Phone, ChevronRight, ArrowRight, MapPin,
  Home, Building2, Building, Store, Car, Droplets,
  Zap, Eye, Star, Shield, TrendingUp, Key, CheckCircle2,
  Ruler, FileText, Clock, Filter, Search,
} from "lucide-react";
import { FaWhatsapp, FaFacebook, FaBuilding, FaWarehouse } from "react-icons/fa";
import { MdApartment, MdVilla, MdStorefront, MdVerified, MdSecurity } from "react-icons/md";
import { BsHousesFill, BsBuildingsFill, BsFillLightningChargeFill } from "react-icons/bs";
import { HiOfficeBuilding } from "react-icons/hi";
import { IoIosWater } from "react-icons/io";
import { GiHouse, GiReceiveMoney } from "react-icons/gi";
import { PiCertificateFill } from "react-icons/pi";

// ─── CONFIG ──────────────────────────────────────────────────────────────────
const BRAND = {
  name: "Parcelle A Calavi",
  tagline: "Agence Immobilière · Calavi, Bénin",
  bio: "Nous sommes disponibles pour vous satisfaire dans tous vos besoins en immobilier.",
  phone1: "+229 01 97 33 20 03",
  phone2: "+229 01 97 33 20 03",
  whatsapp: "https://wa.me/22901964737 21?text=Bonjour%20Fataï%20Fadyl%2C%20je%20suis%20intéressé(e)%20par%20un%20bien%20immobilier",
  facebook: "https://facebook.com/FataiFadyl",
  followers: "6.1K",
  primaryColor: "#1E40AF",
  accentColor: "#F59E0B",
  heroImg: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600&q=90",
};

const WA = BRAND.whatsapp;

// ─── LISTINGS ─────────────────────────────────────────────────────────────────
type ListingType = "location" | "vente" | "commercial";

interface Listing {
  id: number;
  type: ListingType;
  badge: string;
  badgeColor: string;
  title: string;
  zone: string;
  quartier: string;
  tag: string;
  loyer?: string;
  prix?: string;
  revenu?: string;
  visite?: string;
  conditions?: string;
  superficie?: string;
  papier?: string;
  commission?: string;
  img: string;
  features: { icon: React.ReactNode; label: string }[];
  highlight?: string;
}

const listings: Listing[] = [
  {
    id: 1,
    type: "vente",
    badge: "À VENDRE",
    badgeColor: "#E63946",
    title: "Immeuble Locatif R+1",
    zone: "Calavi",
    quartier: "Calavi",
    tag: "Investissement",
    prix: "70 000 000 F",
    revenu: "380 000 F/mois",
    superficie: "346 m²",
    papier: "TF Personnel",
    commission: "5% acquéreur",
    img: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
    features: [
      { icon: <MdApartment size={13} />, label: "7 appartements" },
      { icon: <Home size={13} />, label: "3× chsl + 4× 2chsl" },
      { icon: <Zap size={13} />, label: "Compteurs SBEE/Soneb" },
      { icon: <IoIosWater size={13} />, label: "Surpression d'eau" },
      { icon: <Car size={13} />, label: "Accès véhicules" },
      { icon: <CheckCircle2 size={13} />, label: "Tous loués" },
    ],
    highlight: "Revenu locatif immédiat",
  },
  {
    id: 2,
    type: "location",
    badge: "À LOUER",
    badgeColor: "#16A34A",
    title: "Appartement 2 Chambres",
    zone: "Calavi",
    quartier: "Calavi ",
    tag: "Résidentiel",
    loyer: "250 000 F",
    conditions: "3+3+1+50 000 F",
    visite: "3 000 F",
    img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
    features: [
      { icon: <Home size={13} />, label: "2 chambres salon" },
      { icon: <Droplets size={13} />, label: "3 douches" },
      { icon: <Car size={13} />, label: "Garage 1 véhicule" },
      { icon: <MapPin size={13} />, label: "Au bord du pavé" },
      { icon: <Star size={13} />, label: "Très bien staffé" },
      { icon: <CheckCircle2 size={13} />, label: "Meublé dégagé" },
    ],
  },
  {
    id: 3,
    type: "location",
    badge: "À LOUER",
    badgeColor: "#16A34A",
    title: "Appartement 3 Chambres",
    zone: "Calavi",
    quartier: "Calavi Zone des Ambassades",
    tag: "Premium",
    loyer: "135 000 F",
    visite: "3 000 F",
    img: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80",
    features: [
      { icon: <Home size={13} />, label: "3 chambres salon" },
      { icon: <Droplets size={13} />, label: "3 douches" },
      { icon: <Building2 size={13} />, label: "Premier étage" },
      { icon: <Star size={13} />, label: "Très bien aéré" },
      { icon: <MapPin size={13} />, label: "Voie très accessible" },
    ],
  },
  {
    id: 4,
    type: "location",
    badge: "À LOUER",
    badgeColor: "#16A34A",
    title: "Villa Duplex 4 Chambres",
    zone: "Calavi",
    quartier: "Calavi Zone des Ambassades",
    tag: "Villa",
    loyer: "600 000 F",
    visite: "3 000 F",
    img: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
    features: [
      { icon: <GiHouse size={13} />, label: "4 chambres" },
      { icon: <Home size={13} />, label: "2 salons" },
      { icon: <Star size={13} />, label: "Très bien staffé" },
      { icon: <Car size={13} />, label: "Garage 2 véhicules" },
    ],
    highlight: "Bien de prestige",
  },
  {
    id: 5,
    type: "commercial",
    badge: "COMMERCIAL",
    badgeColor: "#7C3AED",
    title: "Grande Boutique Staffée",
    zone: "Calavi",
    quartier: "Fidjrossè Nouveau Goudron",
    tag: "Commerce",
    loyer: "300 000 F",
    conditions: "3+3+1+100 000 F",
    visite: "5 000 F",
    img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
    features: [
      { icon: <MdStorefront size={13} />, label: "Grand hall" },
      { icon: <BsFillLightningChargeFill size={13} />, label: "Staff & jeux de lumière" },
      { icon: <HiOfficeBuilding size={13} />, label: "1 bureau" },
      { icon: <Droplets size={13} />, label: "1 douche" },
      { icon: <Star size={13} />, label: "Carreaux miroirs" },
      { icon: <MapPin size={13} />, label: "Bord des nouveaux goudrons" },
    ],
    highlight: "Localisation stratégique",
  },
];

// ─── STATS ────────────────────────────────────────────────────────────────────
const stats = [
  { val: "6.1K+", label: "Abonnés Facebook", icon: <FaFacebook size={18} /> },
  { val: "100%", label: "Biens vérifiés", icon: <MdVerified size={18} /> },
  { val: "TF", label: "Papiers officiels", icon: <PiCertificateFill size={18} /> },
  { val: "24/7", label: "Disponible", icon: <Clock size={18} /> },
];

// ─── WHY US ───────────────────────────────────────────────────────────────────
const whyUs = [
  { icon: <MdVerified size={22} />, title: "Biens Vérifiés", desc: "Chaque propriété est inspectée et les documents légaux contrôlés avant publication.", color: "#1E40AF" },
  { icon: <GiReceiveMoney size={22} />, title: "Prix Transparents", desc: "Loyer, conditions et frais de visite affichés clairement. Aucune surprise.", color: "#F59E0B" },
  { icon: <MdSecurity size={22} />, title: "Sécurité Juridique", desc: "TF Personnel, acte de propriété vérifié pour chaque transaction.", color: "#16A34A" },
  { icon: <Clock size={22} />, title: "Réactivité Totale", desc: "Réponse immédiate sur WhatsApp. Visite organisée rapidement.", color: "#7C3AED" },
];

// ─── CATEGORIES ───────────────────────────────────────────────────────────────
const categories = [
  { label: "Tout", value: "all", icon: <BsHousesFill size={14} /> },
  { label: "À Louer", value: "location", icon: <Home size={14} /> },
  { label: "À Vendre", value: "vente", icon: <BsBuildingsFill size={14} /> },
  { label: "Commercial", value: "commercial", icon: <MdStorefront size={14} /> },
];

// ─── CANVAS ───────────────────────────────────────────────────────────────────
function ParticleCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d"); if (!ctx) return;
    let id: number;
    let W = (c.width = window.innerWidth), H = (c.height = window.innerHeight);
    const pts = Array.from({ length: 50 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      r: Math.random() * 1.8 + 0.4,
      vx: (Math.random() - 0.5) * 0.28, vy: (Math.random() - 0.5) * 0.28,
      a: Math.random() * 0.4 + 0.1,
      col: ["#1E40AF", "#F59E0B", "#ffffff", "#60A5FA"][Math.floor(Math.random() * 4)],
    }));
    const loop = () => {
      ctx.clearRect(0, 0, W, H);
      pts.forEach((p, i) => {
        pts.slice(i + 1).forEach(q => {
          const d = Math.hypot(p.x - q.x, p.y - q.y);
          if (d < 110) { ctx.beginPath(); ctx.strokeStyle = `rgba(30,64,175,${0.06*(1-d/110)})`; ctx.lineWidth=0.5; ctx.moveTo(p.x,p.y); ctx.lineTo(q.x,q.y); ctx.stroke(); }
        });
        p.x+=p.vx; p.y+=p.vy;
        if(p.x<0||p.x>W) p.vx*=-1; if(p.y<0||p.y>H) p.vy*=-1;
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle=p.col+Math.floor(p.a*255).toString(16).padStart(2,"0"); ctx.fill();
      });
      id=requestAnimationFrame(loop);
    };
    loop();
    const resize=()=>{W=c.width=window.innerWidth;H=c.height=window.innerHeight;};
    window.addEventListener("resize",resize);
    return ()=>{cancelAnimationFrame(id);window.removeEventListener("resize",resize);};
  }, []);
  return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none z-0" />;
}

function Reveal({ children, className="", delay=0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inV = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 44 }}
      animate={inV ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.68, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

function FloatBadge({ children, className, delay=0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div className={className}
      animate={{ y: [0,-10,0] }}
      transition={{ duration: 3.8+delay, repeat: Infinity, ease: "easeInOut", delay }}>
      {children}
    </motion.div>
  );
}

// ─── LISTING CARD ─────────────────────────────────────────────────────────────
function ListingCard({ item, index }: { item: Listing; index: number }) {
  const ref = useRef(null);
  const inV = useInView(ref, { once: true, margin: "-50px" });
  const waMsg = `${WA}&text=Bonjour%20Fataï%20Fadyl%2C%20je%20suis%20intéressé(e)%20par%20le%20bien%20suivant%20:%20${encodeURIComponent(item.title + " – " + item.quartier)}`;

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inV ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8 }}
      className="group relative rounded-3xl overflow-hidden border border-white/6 hover:border-white/14 transition-all duration-300"
      style={{ background: "rgba(255,255,255,0.03)", backdropFilter: "blur(16px)" }}>

      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <motion.img src={item.img} alt={item.title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.07 }}
          transition={{ duration: 0.5 }} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/30 to-transparent" />

        {/* Badge */}
        <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold text-white"
          style={{ background: item.badgeColor + "ee" }}>
          {item.badge}
        </div>

        {/* Highlight */}
        {item.highlight && (
          <motion.div
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold text-white"
            style={{ background: "rgba(245,158,11,0.9)" }}>
            {item.highlight}
          </motion.div>
        )}

        {/* Zone */}
        <div className="absolute bottom-3 left-3 flex items-center gap-1 text-xs text-white/75">
          <MapPin size={11} className="text-blue-400" />
          {item.quartier}
        </div>

        {/* Visite */}
        {item.visite && (
          <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded-full text-[10px] text-white/60 bg-black/40 backdrop-blur-sm">
            Visite {item.visite}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-bold text-base leading-tight">{item.title}</h3>
            <p className="text-white/35 text-xs mt-0.5">{item.zone} · {item.tag}</p>
          </div>
          <div className="text-right shrink-0 ml-3">
            {item.loyer && (
              <div className="text-lg font-bold text-blue-400">{item.loyer}<span className="text-xs text-white/30 font-normal">/mois</span></div>
            )}
            {item.prix && (
              <div className="text-lg font-bold text-amber-400">{item.prix}</div>
            )}
            {item.revenu && (
              <div className="text-xs text-green-400 mt-0.5">{item.revenu} rev.</div>
            )}
          </div>
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {item.features.map((f, i) => (
            <span key={i} className="flex items-center gap-1 px-2 py-1 rounded-full text-[10px] text-white/50"
              style={{ background: "rgba(255,255,255,0.05)" }}>
              <span className="text-blue-400">{f.icon}</span> {f.label}
            </span>
          ))}
        </div>

        {/* Conditions */}
        {item.conditions && (
          <p className="text-xs text-white/30 mb-3">Conditions : {item.conditions}</p>
        )}
        {item.superficie && (
          <div className="flex items-center gap-1 text-xs text-white/35 mb-3">
            <Ruler size={11} className="text-amber-400" /> Superficie : {item.superficie}
          </div>
        )}
        {item.papier && (
          <div className="flex items-center gap-1 text-xs text-green-400 mb-3">
            <PiCertificateFill size={11} /> {item.papier} · Commission {item.commission}
          </div>
        )}

        {/* CTA */}
        <a href={waMsg} target="_blank" rel="noreferrer"
          className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl text-sm font-semibold text-white transition-all hover:scale-[1.02]"
          style={{ background: "linear-gradient(135deg, #25D366, #128C7E)", boxShadow: "0 0 20px rgba(37,211,102,0.3)" }}>
          <FaWhatsapp size={15} /> Demander une visite
        </a>
      </div>

      {/* Hover glow */}
      <motion.div className="absolute inset-0 rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ boxShadow: `inset 0 0 0 1px ${item.badgeColor}30, 0 0 40px ${item.badgeColor}10` }} />
    </motion.div>
  );
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function FataiFadylImmo() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const { scrollY } = useScroll();
  const navBg = useTransform(scrollY, [0, 80], ["rgba(3,7,18,0)", "rgba(3,7,18,0.97)"]);
  const heroImgY = useTransform(scrollY, [0, 500], [0, 100]);

  const filtered = listings.filter(l => {
    const matchType = filter === "all" || l.type === filter;
    const q = search.toLowerCase();
    const matchSearch = !q || l.title.toLowerCase().includes(q) || l.quartier.toLowerCase().includes(q) || l.zone.toLowerCase().includes(q);
    return matchType && matchSearch;
  });

  const navLinks = ["Biens", "Services", "Pourquoi Nous", "Contact"];

  return (
    <div className="bg-[#030712] text-white overflow-x-hidden" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Cormorant+Garamond:ital,wght@0,600;0,700;1,500&display=swap');
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 3px; } ::-webkit-scrollbar-thumb { background: #1E40AF; border-radius: 2px; }
        .glass { backdrop-filter: blur(18px); background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.07); }
        .glass-blue { backdrop-filter: blur(18px); background: rgba(30,64,175,0.1); border: 1px solid rgba(30,64,175,0.25); }
        .glow-blue { box-shadow: 0 0 30px rgba(30,64,175,0.55), 0 0 60px rgba(30,64,175,0.15); }
        .glow-wa { box-shadow: 0 0 30px rgba(37,211,102,0.5), 0 0 60px rgba(37,211,102,0.12); }
        .glow-amber { box-shadow: 0 0 30px rgba(245,158,11,0.5), 0 0 60px rgba(245,158,11,0.12); }
        .bg-grid { background-image: linear-gradient(rgba(30,64,175,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(30,64,175,0.05) 1px, transparent 1px); background-size: 56px 56px; }
        .text-gradient { background: linear-gradient(135deg, #60A5FA, #1E40AF); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .shine { position:relative; overflow:hidden; }
        .shine::before { content:''; position:absolute; top:0; left:-100%; width:55%; height:100%; background:linear-gradient(90deg,transparent,rgba(255,255,255,0.04),transparent); transition:left .5s; }
        .shine:hover::before { left:150%; }
      `}</style>

      {/* ── NAV ── */}
      <motion.nav style={{ background: navBg }} className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-5 md:px-10 py-4 flex items-center justify-between">
          <motion.a href="#" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center glow-blue" style={{ background: "linear-gradient(135deg, #1E40AF, #1D4ED8)" }}>
                <BsBuildingsFill size={18} className="text-white" />
              </div>
              <div>
                <div className="font-bold text-base tracking-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Immobilier Sécurisé au Bénin</div>
                <div className="text-[9px] text-blue-400 tracking-widest uppercase -mt-0.5">Immobilier · Calavi</div>
              </div>
            </div>
          </motion.a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <a key={l} href={`#${l.toLowerCase().replace(/\s+/g,"-")}`} className="text-sm text-white/45 hover:text-blue-400 transition-colors">{l}</a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <a href={`tel:${BRAND.phone1}`} className="flex items-center gap-2 px-4 py-2 glass rounded-full text-sm text-white/50 hover:text-white transition-all">
              <Phone size={13} /> Appeler
            </a>
            <a href={WA} target="_blank" rel="noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-sm font-semibold glow-wa hover:scale-105 transition-transform"
              style={{ background: "linear-gradient(135deg, #25D366, #128C7E)" }}>
              <FaWhatsapp size={14} /> WhatsApp
            </a>
          </div>

          <button className="md:hidden p-2 text-white" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.28 }} className="md:hidden border-t border-white/5" style={{ background: "rgba(3,7,18,0.97)" }}>
              <div className="flex flex-col px-6 py-6 gap-5">
                {navLinks.map((l, i) => (
                  <motion.a key={l} href={`#${l.toLowerCase().replace(/\s+/g,"-")}`}
                    initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}
                    onClick={() => setMobileOpen(false)} className="text-white/60 hover:text-blue-400 font-medium transition-colors">{l}</motion.a>
                ))}
                <a href={WA} target="_blank" rel="noreferrer"
                  className="flex items-center justify-center gap-2 py-3.5 rounded-full text-white font-semibold glow-wa"
                  style={{ background: "linear-gradient(135deg, #25D366, #128C7E)" }}>
                  <FaWhatsapp size={17} /> Contacter sur WhatsApp
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-grid">
        <ParticleCanvas />

        {/* BG parallax */}
        <motion.div style={{ y: heroImgY }} className="absolute inset-0 z-[1]">
          <img src={BRAND.heroImg} alt="bg" className="w-full h-full object-cover opacity-18" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(3,7,18,0.8) 0%, rgba(3,7,18,0.55) 40%, rgba(3,7,18,1) 100%)" }} />
        </motion.div>

        {/* Glow orbs */}
        <div className="absolute top-1/3 left-0 w-[500px] h-[500px] rounded-full blur-[220px] opacity-12 z-[1]" style={{ background: "#1E40AF" }} />
        <div className="absolute bottom-1/3 right-0 w-[400px] h-[400px] rounded-full blur-[200px] opacity-10 z-[1]" style={{ background: "#F59E0B" }} />

        {/* Floating badges */}
        <FloatBadge delay={0} className="hidden lg:flex absolute top-36 right-20 z-10">
          <div className="glass-blue rounded-2xl px-4 py-3 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "rgba(245,158,11,0.2)", color: "#F59E0B" }}>
              <GiReceiveMoney size={20} />
            </div>
            <div>
              <div className="text-xs font-bold">380 000 F/mois</div>
              <div className="text-[10px] text-white/35">Revenu locatif</div>
            </div>
          </div>
        </FloatBadge>
        <FloatBadge delay={1.2} className="hidden lg:flex absolute top-56 right-56 z-10">
          <div className="glass rounded-2xl px-4 py-3 flex items-center gap-2">
            <MdVerified size={16} className="text-blue-400" />
            <span className="text-xs font-semibold">TF Personnel vérifié</span>
          </div>
        </FloatBadge>
        <FloatBadge delay={2} className="hidden lg:flex absolute bottom-48 right-16 z-10">
          <div className="glass rounded-2xl px-4 py-3">
            <div className="text-xs text-white/40 mb-1">Biens disponibles</div>
            <div className="text-2xl font-bold text-gradient">{listings.length}</div>
          </div>
        </FloatBadge>
        <FloatBadge delay={0.8} className="hidden lg:flex absolute bottom-64 right-60 z-10">
          <div className="glass-blue rounded-2xl px-3 py-2 flex items-center gap-2">
            <FaFacebook size={14} className="text-blue-400" />
            <span className="text-xs font-semibold">6.1K abonnés</span>
          </div>
        </FloatBadge>

        <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-10 w-full py-20">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-blue text-sm mb-7">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
              <span className="text-blue-400 font-medium">Disponible maintenant · Calavi, Bénin</span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-5"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Trouvez votre
              <span className="block text-gradient"> bien idéal</span>
              à Calavi.
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.22 }}
              className="text-lg text-white/45 mb-9 max-w-xl leading-relaxed">
              Appartements, Parcelles, boutiques et immeubles locatifs  tous vérifiés, tous documentés. Contactez-nous et trouvez votre prochain bien en moins de 24h.
            </motion.p>

            {/* Inline search */}
            <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="flex gap-3 mb-10 max-w-lg">
              <div className="flex-1 relative">
                <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25" />
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Quartier, type de bien..."
                  className="w-full pl-10 pr-4 py-3.5 rounded-xl text-sm text-white placeholder-white/25 outline-none border border-white/8 focus:border-blue-500/40 transition-all"
                  style={{ background: "rgba(255,255,255,0.05)", backdropFilter: "blur(16px)" }} />
              </div>
              <a href="#biens"
                className="flex items-center gap-2 px-6 py-3.5 rounded-xl text-white font-semibold text-sm glow-blue hover:scale-105 transition-transform"
                style={{ background: "linear-gradient(135deg, #1E40AF, #1D4ED8)" }}>
                <Search size={14} /> Chercher
              </a>
            </motion.div>

            {/* CTAs */}
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.38 }}
              className="flex flex-wrap gap-4 mb-14">
              <a href={WA} target="_blank" rel="noreferrer"
                className="flex items-center gap-2.5 px-7 py-4 rounded-full text-white font-bold text-base glow-wa hover:scale-105 transition-transform"
                style={{ background: "linear-gradient(135deg, #25D366, #128C7E)" }}>
                <FaWhatsapp size={20} /> Contacter sur WhatsApp
              </a>
              <a href="#biens" className="flex items-center gap-2 px-7 py-4 rounded-full glass text-white/65 hover:text-blue-400 font-medium border border-transparent hover:border-blue-500/25 transition-all">
                Voir tous les biens <ArrowRight size={16} />
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-8">
              {stats.map((s, i) => (
                <motion.div key={s.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 + i * 0.08 }}
                  className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "rgba(30,64,175,0.2)", color: "#60A5FA" }}>
                    {s.icon}
                  </div>
                  <div>
                    <div className="text-xl font-bold text-gradient">{s.val}</div>
                    <div className="text-[10px] text-white/30 mt-0.5 tracking-wide">{s.label}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#030712] to-transparent z-10" />
      </section>

      {/* ── WHY US ── */}
      <section id="pourquoi-nous" className="py-20 bg-[#020510]">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <Reveal className="text-center mb-14">
            <div className="text-xs font-semibold tracking-widest uppercase text-blue-400 mb-3">Notre Engagement</div>
            <h2 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Pourquoi choisir <span className="text-gradient">Immobilier Sécurisé au Bénin ?</span>
            </h2>
            <p className="text-white/30 mt-4 max-w-md mx-auto text-sm">Chaque bien est sélectionné, vérifié et présenté avec transparence totale. Votre confiance, notre priorité.</p>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {whyUs.map((w, i) => (
              <Reveal key={w.title} delay={i * 0.09}>
                <motion.div whileHover={{ y: -6 }} className="glass rounded-2xl p-6 text-center border border-white/5 hover:border-blue-500/20 transition-all group">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform"
                    style={{ background: w.color + "22", color: w.color }}>
                    {w.icon}
                  </div>
                  <div className="font-semibold text-sm mb-1.5">{w.title}</div>
                  <div className="text-white/30 text-xs leading-relaxed">{w.desc}</div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── LISTINGS ── */}
      <section id="biens" className="py-24">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-10">
            <div>
              <div className="text-xs font-semibold tracking-widest uppercase text-blue-400 mb-2">Biens Disponibles</div>
              <h2 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                <span className="text-gradient">{filtered.length} bien{filtered.length > 1 ? "s" : ""}</span> disponible{filtered.length > 1 ? "s" : ""}
              </h2>
            </div>
            {/* Search on desktop */}
            <div className="relative max-w-xs w-full">
              <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Rechercher..."
                className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm text-white placeholder-white/25 outline-none border border-white/7 focus:border-blue-500/40 transition-all"
                style={{ background: "rgba(255,255,255,0.05)", backdropFilter: "blur(16px)" }} />
            </div>
          </Reveal>

          {/* Category tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map(cat => (
              <button key={cat.value} onClick={() => setFilter(cat.value)}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-full text-sm font-medium transition-all ${filter === cat.value ? "text-white glow-blue" : "glass text-white/40 hover:text-white"}`}
                style={filter === cat.value ? { background: "linear-gradient(135deg, #1E40AF, #1D4ED8)" } : {}}>
                {cat.icon} {cat.label}
                {filter === cat.value && (
                  <span className="ml-1 text-xs bg-white/20 px-1.5 py-0.5 rounded-full">{filtered.length}</span>
                )}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20 text-white/25">
              <BsHousesFill size={40} className="mx-auto mb-4 opacity-20" />
              <p className="text-sm">Aucun bien ne correspond à votre recherche.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {filtered.map((item, i) => (
                  <ListingCard key={item.id} item={item} index={i} />
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>

      {/* ── FEATURED INVESTMENT ── */}
      <section className="py-20 bg-[#020510]">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <Reveal>
            <div className="relative glass rounded-3xl overflow-hidden border border-amber-500/20" style={{ background: "rgba(245,158,11,0.04)" }}>
              <div className="absolute inset-0 opacity-5"
                style={{ background: "radial-gradient(ellipse at right, #F59E0B 0%, transparent 70%)" }} />
              <div className="grid md:grid-cols-2 gap-0">
                <div className="p-10 md:p-14 flex flex-col justify-center relative z-10">
                  <motion.div animate={{ scale: [1, 1.04, 1] }} transition={{ duration: 2.2, repeat: Infinity }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-sm font-semibold mb-6 w-fit"
                    style={{ background: "rgba(245,158,11,0.15)", borderColor: "rgba(245,158,11,0.4)", color: "#F59E0B" }}>
                    <TrendingUp size={13} /> Opportunité d'Investissement
                  </motion.div>

                  <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    Immeuble Locatif<br /><span style={{ color: "#F59E0B" }}>R+1 · Calavi</span>
                  </h2>

                  <p className="text-white/40 text-sm mb-7 leading-relaxed max-w-sm">
                    7 appartements, tous loués. Revenu mensuel immédiat de 380 000 F. TF Personnel disponible. Propriétaire vivant. Une opportunité rare à Calavi.
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-8">
                    {[
                      { label: "Prix", val: "70 000 000 F", icon: <GiReceiveMoney size={16} />, color: "#F59E0B" },
                      { label: "Revenu/mois", val: "380 000 F", icon: <TrendingUp size={16} />, color: "#16A34A" },
                      { label: "Superficie", val: "346 m²", icon: <Ruler size={16} />, color: "#60A5FA" },
                      { label: "Commission", val: "5% acq.", icon: <FileText size={16} />, color: "#A78BFA" },
                    ].map(item => (
                      <div key={item.label} className="glass rounded-xl p-3">
                        <div className="flex items-center gap-1.5 mb-1" style={{ color: item.color }}>
                          {item.icon}
                          <span className="text-xs text-white/35">{item.label}</span>
                        </div>
                        <div className="font-bold text-sm">{item.val}</div>
                      </div>
                    ))}
                  </div>

                  <a href={`${WA}&text=Bonjour%2C%20je%20suis%20intéressé%20par%20l'immeuble%20locatif%20R%2B1%20à%20Calavi%20Avotrou%20(70M%20FCFA)`} target="_blank" rel="noreferrer"
                    className="flex items-center gap-2.5 px-7 py-4 rounded-full text-white font-semibold text-base glow-wa hover:scale-105 transition-transform w-fit"
                    style={{ background: "linear-gradient(135deg, #25D366, #128C7E)" }}>
                    <FaWhatsapp size={18} /> Renseignements
                  </a>
                </div>

                <div className="relative h-64 md:h-auto">
                  <img src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80" alt="Immeuble" className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#020510]/60" />
                  <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full text-xs font-bold text-white" style={{ background: "rgba(22,163,74,0.9)" }}>
                    Tous loués ✓
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section id="services" className="py-24">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <Reveal className="text-center mb-14">
            <div className="text-xs font-semibold tracking-widest uppercase text-blue-400 mb-3">Processus Simple</div>
            <h2 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Votre bien en <span className="text-gradient">3 étapes</span>
            </h2>
          </Reveal>
          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="hidden md:block absolute top-10 left-[calc(16.66%+24px)] right-[calc(16.66%+24px)] h-px"
              style={{ background: "linear-gradient(90deg, rgba(30,64,175,0.4), rgba(245,158,11,0.4), rgba(37,211,102,0.4))" }} />
            {[
              { n: "01", icon: <Search size={26} />, title: "Choisissez un bien", desc: "Parcourez nos annonces filtrées par type, quartier et budget. Chaque détail est visible instantanément.", color: "#1E40AF" },
              { n: "02", icon: <FaWhatsapp size={26} />, title: "Contactez sur WhatsApp", desc: "Un message suffit. Donnez-nous la référence du bien  nous organisons la visite rapidement.", color: "#25D366" },
              { n: "03", icon: <Key size={26} />, title: "Emménagez sereinement", desc: "Papiers vérifiés, conditions transparentes, accompagnement jusqu'à la signature.", color: "#F59E0B" },
            ].map((s, i) => (
              <Reveal key={s.n} delay={i * 0.12}>
                <motion.div whileHover={{ y: -6 }} className="glass rounded-3xl p-8 text-center border border-white/5 hover:border-blue-500/20 transition-all relative">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5"
                    style={{ background: s.color + "22", border: `1px solid ${s.color}44`, color: s.color }}>
                    {s.icon}
                  </div>
                  <div className="text-6xl font-black absolute top-5 right-5 text-white/4">{s.n}</div>
                  <h3 className="text-lg font-bold mb-2">{s.title}</h3>
                  <p className="text-white/35 text-sm leading-relaxed">{s.desc}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-28 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, rgba(30,64,175,0.15) 0%, transparent 70%)" }} />
        <div className="max-w-3xl mx-auto px-5 md:px-10 text-center relative z-10">
          <Reveal>
            <motion.div animate={{ rotate: [0, 8, -8, 0] }} transition={{ duration: 3, repeat: Infinity }} className="inline-block mb-8">
              <div className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto glow-blue" style={{ background: "linear-gradient(135deg, #1E40AF, #1D4ED8)" }}>
                <BsBuildingsFill size={36} className="text-white" />
              </div>
            </motion.div>

            <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
              Le bien que vous cherchez
              <span className="block text-gradient"> existe déjà.</span>
            </h2>

            <p className="text-white/35 text-lg mb-10 max-w-md mx-auto leading-relaxed">
              Un seul message et nous trouvons ensemble le bien qui correspond à votre budget et vos besoins à Calavi.
            </p>

            <div className="flex flex-wrap gap-4 justify-center mb-6">
              <motion.a href={WA} target="_blank" rel="noreferrer"
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}
                className="inline-flex items-center gap-3 px-10 py-5 rounded-full text-white font-bold text-lg glow-wa"
                style={{ background: "linear-gradient(135deg, #25D366, #128C7E)" }}>
                <FaWhatsapp size={22} /> Démarrer sur WhatsApp <ChevronRight size={18} />
              </motion.a>
              <motion.a href={`tel:${BRAND.phone1}`}
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}
                className="inline-flex items-center gap-3 px-10 py-5 rounded-full text-white font-bold text-lg glass border border-blue-500/25">
                <Phone size={18} /> Appeler
              </motion.a>
            </div>

            <p className="text-white/15 text-xs">{BRAND.phone1} · {BRAND.phone2}</p>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer id="contact" className="border-t border-white/5 py-14 bg-[#020510]">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #1E40AF, #1D4ED8)" }}>
                  <BsBuildingsFill size={16} className="text-white" />
                </div>
                <div>
                  <div className="font-bold" style={{ fontFamily: "'Cormorant Garamond', serif" }}>Immobilier Sécurisé au Bénin</div>
                  <div className="text-[9px] text-blue-400 tracking-widest uppercase">Immobilier · Calavi</div>
                </div>
              </div>
              <p className="text-white/25 text-sm leading-relaxed mb-5 max-w-xs">{BRAND.bio}</p>
              <div className="flex gap-3">
                {[
                  { I: FaWhatsapp, h: WA, c: "#25D366" },
                  { I: FaFacebook, h: BRAND.facebook, c: "#60A5FA" },
                ].map(({ I, h, c }, i) => (
                  <motion.a key={i} href={h} target="_blank" rel="noreferrer" whileHover={{ scale: 1.2 }}
                    className="w-9 h-9 glass rounded-full flex items-center justify-center text-white/30 transition-colors"
                    style={{}} onMouseEnter={e => (e.currentTarget.style.color = c)} onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.3)")}>
                    <I size={14} />
                  </motion.a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-xs tracking-widest uppercase text-white/30 mb-5">Types de Biens</h4>
              <div className="flex flex-col gap-2.5">
                {["Appartements à louer", "Villas & Duplex", "Immeubles à vendre", "Boutiques commerciales", "Investissement locatif"].map(l => (
                  <a key={l} href="#biens" className="text-white/30 hover:text-blue-400 text-sm transition-colors">{l}</a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-xs tracking-widest uppercase text-white/30 mb-5">Contact</h4>
              <div className="flex flex-col gap-3">
                <a href={`tel:${BRAND.phone1}`} className="flex items-center gap-2 text-sm text-white/30 hover:text-white transition-colors">
                  <Phone size={13} className="text-blue-400" /> {BRAND.phone1}
                </a>
                <a href={`tel:${BRAND.phone2}`} className="flex items-center gap-2 text-sm text-white/30 hover:text-white transition-colors">
                  <Phone size={13} className="text-blue-400" /> {BRAND.phone2}
                </a>
                <a href={WA} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-white/30 hover:text-white transition-colors">
                  <FaWhatsapp size={13} className="text-green-400" /> WhatsApp
                </a>
                <div className="flex items-center gap-2 text-sm text-white/25">
                  <MapPin size={13} className="text-amber-400" /> Calavi, Bénin
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/12 text-xs">© 2026 Immobilier Sécurisé au Bénin. Tous droits réservés.</p>
            <p className="text-white/8 text-xs">Built by GTECH · Calavi</p>
          </div>
        </div>
      </footer>
    </div>
  );
}