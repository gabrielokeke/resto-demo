"use client";

import { JSX, useEffect, useRef, useState } from "react";
import {
  motion, useScroll, useTransform, AnimatePresence, useInView,
} from "framer-motion";
import {
  Search, MapPin, Phone, X, Menu, Star, Zap, Home, Building,
  Users, ShoppingBag, ChevronRight, ChevronDown, Filter, ArrowRight,
  CheckCircle2, Wifi, Zap as ZapIcon, Droplets, Shield, Clock, Eye
} from "lucide-react";
import { FaWhatsapp, FaTelegram, FaInstagram } from "react-icons/fa";

// ─── CONFIG ──────────────────────────────────────────────────────────────────
const BRAND = {
  name: "Safe Apart... Realty",
  short: "SLR",
  tagline: "Verified Rentals in Nigeria",
  description: "Connecting serious tenants with verified rental properties in Nigeria. No spam. No wasted time.",
  phone: "+234 905 652 4449",
  whatsapp: "https://wa.me/2348154237873?text=Hi%20Nigeria%20Apartment%20Hub%2C%20I%27m%20interested%20in%20a%20property",
  telegram: "#",
  instagram: "#",
  location: "Nigeria, Kwara State, Nigeria",
  primaryColor: "#16A34A",
  accentColor: "#F59E0B",
};

const WA = BRAND.whatsapp;

const CATEGORIES = [
  { label: "All", icon: <Home size={14} />, value: "all" },
  { label: "Self-Contain", icon: <Home size={14} />, value: "self-contain" },
  { label: "1 Bedroom", icon: <Building size={14} />, value: "1bed" },
  { label: "2 Bedroom", icon: <Building size={14} />, value: "2bed" },
  { label: "Hostel", icon: <Users size={14} />, value: "hostel" },
  { label: "Shops", icon: <ShoppingBag size={14} />, value: "shop" },
];

const LISTINGS = [
  {
    id: 1,
    type: "self-contain",
    title: "Pop Self-Containment",
    location: "Safari",
    price: "490,000",
    period: "Yearly",
    tag: "Solar 24/7",
    tagColor: "#F59E0B",
    img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80",
    features: ["Solar Powered 24/7", "Spacious Room", "Wardrobe", "Solar Pump"],
    badge: "Pay & Pack In",
    available: true,
  },
  {
    id: 2,
    type: "self-contain",
    title: "Pop Self-Containment",
    location: "Westend",
    price: "450,000",
    period: "Yearly",
    tag: "NEPA",
    tagColor: "#16A34A",
    img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80",
    features: ["NEPA", "Spacious Room", "Wardrobe Available", "Solar Pump"],
    badge: "Pay & Pack In",
    available: true,
  },
  {
    id: 3,
    type: "self-contain",
    title: "Pop Self-Containment",
    location: "Westend",
    price: "440,000",
    period: "Yearly",
    tag: "NEPA",
    tagColor: "#16A34A",
    img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&q=80",
    features: ["NEPA", "Spacious Room", "Wardrobe Available", "Solar Pump"],
    badge: "Pay & Pack In",
    available: true,
  },
  {
    id: 4,
    type: "self-contain",
    title: "Ceiling Self-Containment",
    location: "Safari",
    price: "400,000",
    period: "Yearly",
    tag: "Budget",
    tagColor: "#3B82F6",
    img: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&q=80",
    features: ["NEPA", "Spacious Room", "Wardrobe Available", "Solar Pump"],
    badge: "Pay & Pack In",
    available: true,
  },
  {
    id: 5,
    type: "hostel",
    title: "Female Roommate Needed",
    location: "School Road",
    price: "265,000",
    period: "Per Person",
    tag: "Female Only",
    tagColor: "#EC4899",
    img: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80",
    features: ["Shared Space", "School Road", "2 Slots Left", "Inspection Available"],
    badge: "2 Slots Left",
    available: true,
  },
  {
    id: 6,
    type: "hostel",
    title: "Female Roommate Needed",
    location: "School Road",
    price: "250,000",
    period: "Per Person",
    tag: "Female Only",
    tagColor: "#EC4899",
    img: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600&q=80",
    features: ["Shared Space", "School Road", "2 Slots  @all", "Inspection Available"],
    badge: "Hot Deal",
    available: true,
  },
  {
    id: 7,
    type: "1bed",
    title: "1 Bedroom Flat",
    location: "Nigeria",
    price: "350,000",
    period: "Yearly",
    tag: "NEPA",
    tagColor: "#16A34A",
    img: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&q=80",
    features: ["NEPA", "Living Room", "Kitchen", "Wardrobe"],
    badge: "Available",
    available: true,
  },
  {
    id: 8,
    type: "2bed",
    title: "2 Bedroom Flat",
    location: "Nigeria",
    price: "500,000",
    period: "Yearly",
    tag: "Premium",
    tagColor: "#8B5CF6",
    img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80",
    features: ["NEPA", "2 Rooms", "Kitchen", "Solar Pump"],
    badge: "New Listing",
    available: true,
  },
  {
    id: 9,
    type: "shop",
    title: "Commercial Space",
    location: "Nigeria Central",
    price: "200,000",
    period: "Yearly",
    tag: "Business",
    tagColor: "#F97316",
    img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80",
    features: ["Ground Floor", "High Traffic", "Flexible Size", "Inspection Available"],
    badge: "Prime Location",
    available: true,
  },
];

const STATS = [
  { val: "200+", label: "Properties Listed" },
  { val: "500+", label: "Happy Tenants" },
  { val: "5+", label: "Years in Nigeria" },
  { val: "100%", label: "Verified Listings" },
];

const FEATURES = [
  { icon: <Eye size={20} />, title: "Photo Galleries", desc: "See every room clearly before booking. No surprises on inspection day.", color: "#16A34A" },
  { icon: <Search size={20} />, title: "Smart Filtering", desc: "Filter by type, price and location in seconds. Find your budget instantly.", color: "#3B82F6" },
  { icon: <ZapIcon size={20} />, title: "Instant WhatsApp", desc: "One tap connects you directly to the agent. No middleman, no delay.", color: "#F59E0B" },
  { icon: <Shield size={20} />, title: "Verified Only", desc: "Every listing is confirmed available before it appears on the site.", color: "#EC4899" },
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
      vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
      a: Math.random() * 0.4 + 0.1,
      col: ["#16A34A", "#F59E0B", "#ffffff"][Math.floor(Math.random() * 3)],
    }));
    const loop = () => {
      ctx.clearRect(0, 0, W, H);
      pts.forEach((p, i) => {
        pts.slice(i + 1).forEach(q => {
          const d = Math.hypot(p.x - q.x, p.y - q.y);
          if (d < 100) { ctx.beginPath(); ctx.strokeStyle = `rgba(22,163,74,${0.05 * (1 - d / 100)})`; ctx.lineWidth = 0.5; ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke(); }
        });
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.col + Math.floor(p.a * 255).toString(16).padStart(2, "0");
        ctx.fill();
      });
      id = requestAnimationFrame(loop);
    };
    loop();
    const onResize = () => { W = c.width = window.innerWidth; H = c.height = window.innerHeight; };
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(id); window.removeEventListener("resize", onResize); };
  }, []);
  return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none z-0" />;
}

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inV = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 40 }}
      animate={inV ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}

const featureIcons: Record<string, JSX.Element> = {
  "NEPA": <ZapIcon size={12} />,
  "Solar Powered 24/7": <ZapIcon size={12} />,
  "Solar pump": <Droplets size={12} />,
  "Solar Pump": <Droplets size={12} />,
  "Wardrobe": <CheckCircle2 size={12} />,
  "Wardrobe Available": <CheckCircle2 size={12} />,
  "Spacious Room": <Home size={12} />,
  "Inspection Available": <Eye size={12} />,
};

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function MaleteApartmentHub() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 600]);
  const [showFilters, setShowFilters] = useState(false);
  const { scrollY } = useScroll();
  const navBg = useTransform(scrollY, [0, 80], ["rgba(5,46,22,0)", "rgba(5,46,22,0.97)"]);

  const filtered = LISTINGS.filter((l) => {
    const matchCat = activeFilter === "all" || l.type === activeFilter;
    const matchSearch = l.title.toLowerCase().includes(searchQuery.toLowerCase()) || l.location.toLowerCase().includes(searchQuery.toLowerCase());
    const price = parseInt(l.price.replace(/,/g, ""));
    const matchPrice = price >= priceRange[0] * 1000 && price <= priceRange[1] * 1000;
    return matchCat && matchSearch && matchPrice;
  });

  return (
    <div className="bg-[#030a05] text-white overflow-x-hidden" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Fraunces:ital,wght@0,700;1,400&display=swap');
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 3px; } ::-webkit-scrollbar-thumb { background: #16A34A; border-radius: 2px; }
        .glass { backdrop-filter: blur(18px); background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.07); }
        .glass-green { backdrop-filter: blur(18px); background: rgba(22,163,74,0.08); border: 1px solid rgba(22,163,74,0.2); }
        .glow-green { box-shadow: 0 0 28px rgba(22,163,74,0.5), 0 0 56px rgba(22,163,74,0.15); }
        .card-shine { position: relative; overflow: hidden; }
        .card-shine::before { content:''; position:absolute; top:0; left:-100%; width:55%; height:100%; background:linear-gradient(90deg,transparent,rgba(255,255,255,0.04),transparent); transition:left .5s; }
        .card-shine:hover::before { left:150%; }
        input[type=range] { -webkit-appearance:none; height:3px; background:rgba(255,255,255,0.1); border-radius:2px; outline:none; }
        input[type=range]::-webkit-slider-thumb { -webkit-appearance:none; width:16px; height:16px; background:#16A34A; border-radius:50%; cursor:pointer; }
      `}</style>

      {/* ── NAV ── */}
      <motion.nav style={{ background: navBg }} className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-5 md:px-10 py-4 flex items-center justify-between">
          <motion.a href="#" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg font-black text-white" style={{ background: "linear-gradient(135deg, #16A34A, #15803D)" }}>🏠</div>
            <div>
              <span className="text-sm font-bold tracking-tight leading-tight block" style={{ fontFamily: "'Fraunces', serif" }}>Safe Apart...</span>
              <span className="text-[10px] text-green-400 tracking-widest uppercase -mt-0.5 block">Realty</span>
            </div>
          </motion.a>

          <div className="hidden md:flex items-center gap-7">
            {["Listings", "How It Works", "About", "Contact"].map((l) => (
              <a key={l} href={`#${l.toLowerCase().replace(/\s+/g, "-")}`} className="text-sm text-white/45 hover:text-white transition-colors">{l}</a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <a href={`tel:${BRAND.phone}`} className="flex items-center gap-2 px-4 py-2 glass rounded-full text-sm text-white/55 hover:text-white transition-all">
              <Phone size={13} /> Call Agent
            </a>
            <a href={WA} target="_blank" rel="noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-sm font-semibold glow-green hover:scale-105 transition-transform"
              style={{ background: "linear-gradient(135deg, #16A34A, #15803D)" }}>
              <FaWhatsapp size={14} /> Find a Room
            </a>
          </div>
          <button className="md:hidden p-2 text-white" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.28 }}
              className="md:hidden border-t border-white/5" style={{ background: "rgba(5,46,22,0.97)" }}>
              <div className="flex flex-col px-6 py-6 gap-5">
                {["Listings", "How It Works", "About", "Contact"].map((l, i) => (
                  <motion.a key={l} href={`#${l.toLowerCase().replace(/\s+/g, "-")}`}
                    initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}
                    onClick={() => setMobileOpen(false)} className="text-white/60 hover:text-white font-medium">{l}</motion.a>
                ))}
                <a href={WA} target="_blank" rel="noreferrer"
                  className="flex items-center justify-center gap-2 py-3 rounded-full text-white font-semibold glow-green mt-2"
                  style={{ background: "linear-gradient(135deg, #16A34A, #15803D)" }}>
                  <FaWhatsapp size={17} /> Find a Room on WhatsApp
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <ParticleCanvas />
        <div className="absolute inset-0 z-1">
          <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600&q=80" alt="bg" className="w-full h-full object-cover opacity-15" />
          <div className="absolute inset-0 bg-linear-to-b from-[#030a05]/80 via-[#030a05]/60 to-[#030a05]" />
        </div>
        <div className="absolute top-1/3 left-1/3 w-125 h-125 bg-green-600 rounded-full blur-[200px] opacity-8 z-1" />

        <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-10 w-full py-20">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-green text-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-green-400 font-medium">Live Listings  Updated Daily</span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-5"
              style={{ fontFamily: "'Fraunces', serif" }}>
              Find Your Perfect{" "}
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #4ADE80, #16A34A)" }}>
                Room in Nigeria
              </span>
              {" "}In Minutes.
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.22 }}
              className="text-lg text-white/45 mb-10 max-w-xl leading-relaxed">
              Browse verified self-contains, flats, hostels and shops. See photos, compare prices, and connect with the agent instantly on WhatsApp.
            </motion.p>

            {/* Search bar */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.32 }}
              className="flex flex-col sm:flex-row gap-3 mb-12 max-w-xl">
              <div className="flex-1 relative">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by location or type..."
                  className="w-full pl-10 pr-4 py-3.5 glass rounded-xl text-sm text-white placeholder-white/25 outline-none focus:border-green-500/40 transition-all" />
              </div>
              <a href="#listings"
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-white font-semibold text-sm glow-green hover:scale-105 transition-transform"
                style={{ background: "linear-gradient(135deg, #16A34A, #15803D)" }}>
                <Search size={15} /> Search
              </a>
            </motion.div>

            {/* Quick filter pills */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45, duration: 0.5 }}
              className="flex flex-wrap gap-2 mb-14">
              {[
                { label: "Under ₦300k", tag: "budget" },
                { label: "Self-Contain", tag: "self-contain" },
                { label: "Hostel / Roommate", tag: "hostel" },
                { label: "Near School Road", tag: "school" },
              ].map((q) => (
                <button key={q.tag} onClick={() => { setActiveFilter(q.tag === "budget" || q.tag === "school" ? "all" : q.tag); document.getElementById("listings")?.scrollIntoView({ behavior: "smooth" }); }}
                  className="px-4 py-1.5 glass rounded-full text-xs text-white/50 hover:text-green-400 hover:border-green-500/30 transition-all border border-transparent">
                  {q.label}
                </button>
              ))}
            </motion.div>

            {/* Stats */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }} className="flex flex-wrap gap-8">
              {STATS.map((s, i) => (
                <motion.div key={s.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 + i * 0.08 }}>
                  <div className="text-2xl font-bold text-white">{s.val}</div>
                  <div className="text-[11px] text-white/30 mt-0.5 tracking-wide">{s.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-[#030a05] to-transparent z-10" />
      </section>

      {/* ── WHY THIS SITE ── */}
      <section id="how-it-works" className="py-20 bg-[#020804]">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <Reveal className="text-center mb-14">
            <div className="text-xs font-semibold tracking-widest uppercase text-green-400 mb-3">No More Scrolling</div>
            <h2 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: "'Fraunces', serif" }}>
              Everything you need,<br /><span className="text-green-400">one tap away</span>
            </h2>
            <p className="text-white/35 mt-4 max-w-md mx-auto text-sm">No more scrolling through 30 posts to find your budget. No more downloading 8MB videos to see a room.</p>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {FEATURES.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.1}>
                <motion.div whileHover={{ y: -5 }} className="glass rounded-2xl p-6 text-center border border-white/5 hover:border-white/12 transition-all">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4" style={{ background: f.color + "22", color: f.color }}>{f.icon}</div>
                  <div className="font-semibold text-sm mb-1">{f.title}</div>
                  <div className="text-white/30 text-xs leading-relaxed">{f.desc}</div>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── LISTINGS ── */}
      <section id="listings" className="py-24">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <Reveal className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <div className="text-xs font-semibold tracking-widest uppercase text-green-400 mb-2">Verified Listings</div>
              <h2 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: "'Fraunces', serif" }}>
                Available <span className="text-green-400">Right Now</span>
              </h2>
            </div>
            <button onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2.5 glass rounded-xl text-sm text-white/60 hover:text-white transition-all">
              <Filter size={14} /> Filters {showFilters ? <ChevronDown size={14} className="rotate-180" /> : <ChevronDown size={14} />}
            </button>
          </Reveal>

          {/* Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                className="mb-8 glass rounded-2xl p-6 border border-white/5">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <div className="text-xs text-white/40 mb-3 uppercase tracking-widest">Price Range (₦/year)</div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-green-400 w-20">₦{priceRange[0]}k</span>
                      <input type="range" min={0} max={600} step={50} value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])} className="flex-1" />
                      <span className="text-sm text-green-400 w-20 text-right">₦{priceRange[1]}k</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-white/40 mb-3 uppercase tracking-widest">Search</div>
                    <div className="relative">
                      <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/25" />
                      <input value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Location or type..." className="w-full pl-9 pr-3 py-2.5 glass rounded-xl text-sm text-white placeholder-white/20 outline-none" />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Category tabs */}
          <div className="flex gap-2 mb-8 overflow-x-auto pb-1 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button key={cat.value} onClick={() => setActiveFilter(cat.value)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-250 ${activeFilter === cat.value ? "text-white glow-green" : "glass text-white/40 hover:text-white"}`}
                style={activeFilter === cat.value ? { background: "linear-gradient(135deg, #16A34A, #15803D)" } : {}}>
                {cat.icon} {cat.label}
                {activeFilter === cat.value && <span className="ml-1 text-xs bg-white/20 px-1.5 py-0.5 rounded-full">{filtered.length}</span>}
              </button>
            ))}
          </div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-white/25">
              <Home size={40} className="mx-auto mb-4 opacity-30" />
              <p>No listings match your filters. Try adjusting the search.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {filtered.map((item, i) => {
                  const price = parseInt(item.price.replace(/,/g, ""));
                  const waLink = `${WA}&text=Hi%20Nigeria%20Apartment%20Hub%2C%20I'm%20interested%20in%20the%20${encodeURIComponent(item.title)}%20at%20${encodeURIComponent(item.location)}%20for%20%E2%82%A6${item.price}`;
                  return (
                    <motion.div key={item.id} layout
                      initial={{ opacity: 0, scale: 0.95, y: 30 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.4, delay: i * 0.05 }}
                      className="glass rounded-3xl overflow-hidden card-shine border border-white/5 hover:border-green-500/20 transition-all group"
                      whileHover={{ y: -5 }}>
                      {/* Image */}
                      <div className="relative h-48 overflow-hidden">
                        <motion.img src={item.img} alt={item.title} className="w-full h-full object-cover"
                          whileHover={{ scale: 1.06 }} transition={{ duration: 0.45 }} />
                        <div className="absolute inset-0 bg-linear-to-t from-[#030a05] via-transparent to-transparent" />
                        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold text-white"
                          style={{ background: item.tagColor + "33", border: `1px solid ${item.tagColor}55` }}>
                          {item.tag}
                        </div>
                        <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-bold text-white bg-black/40 backdrop-blur-sm">
                          {item.badge}
                        </div>
                        <div className="absolute bottom-3 left-3 flex items-center gap-1 text-xs text-white/70">
                          <MapPin size={11} className="text-green-400" /> {item.location}
                        </div>
                      </div>
                      {/* Content */}
                      <div className="p-5">
                        <h3 className="font-bold text-base mb-1">{item.title}</h3>
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {item.features.slice(0, 3).map((f) => (
                            <span key={f} className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] text-white/45 bg-white/5">
                              {featureIcons[f] || <CheckCircle2 size={10} />} {f}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-xl font-bold text-green-400">₦{item.price}</span>
                            <span className="text-xs text-white/25 ml-1">/{item.period}</span>
                          </div>
                          <a href={waLink} target="_blank" rel="noreferrer"
                            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold text-white glow-green"
                            style={{ background: "linear-gradient(135deg, #16A34A, #15803D)" }}>
                            <FaWhatsapp size={13} /> Inquire
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-20 bg-[#020804]">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <Reveal className="text-center mb-14">
            <div className="text-xs font-semibold tracking-widest uppercase text-green-400 mb-3">Simple Process</div>
            <h2 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: "'Fraunces', serif" }}>
              Room in hand,<br /><span className="text-green-400">3 steps away</span>
            </h2>
          </Reveal>
          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="hidden md:block absolute top-10 left-[calc(16.66%+24px)] right-[calc(16.66%+24px)] h-px bg-linear-to-r from-green-600/40 via-yellow-500/40 to-green-600/40" />
            {[
              { n: "01", icon: <Search size={26} />, title: "Browse & Filter", desc: "Use filters to find your type, location and budget in seconds  no endless scrolling.", color: "#16A34A" },
              { n: "02", icon: <Eye size={26} />, title: "View Photos & Details", desc: "See real photos of the room, amenities and full listing info before you visit.", color: "#F59E0B" },
              { n: "03", icon: <FaWhatsapp size={26} />, title: "WhatsApp to Book", desc: "One tap opens WhatsApp. Tell the agent which property  inspection is immediate.", color: "#25D366" },
            ].map((s, i) => (
              <Reveal key={s.n} delay={i * 0.12}>
                <motion.div whileHover={{ y: -6 }} className="glass rounded-3xl p-8 text-center border border-white/5 hover:border-white/12 transition-all relative">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5" style={{ background: s.color + "22", border: `1px solid ${s.color}44`, color: s.color }}>{s.icon}</div>
                  <div className="text-5xl font-black absolute top-5 right-6 text-white/4">{s.n}</div>
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
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, rgba(22,163,74,0.15) 0%, transparent 70%)" }} />
        <div className="max-w-3xl mx-auto px-5 md:px-10 text-center relative z-10">
          <Reveal>
            <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity }} className="text-5xl mb-7">🏠</motion.div>
            <h2 className="text-4xl md:text-6xl font-bold mb-5 leading-tight" style={{ fontFamily: "'Fraunces', serif" }}>
              Still searching? <span className="text-green-400">Let us find</span> your room right now.
            </h2>
            <p className="text-white/35 text-base mb-10 max-w-md mx-auto">Tell us your budget and preferred area  we'll match you with available listings instantly.</p>
            <motion.a href={WA} target="_blank" rel="noreferrer"
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-3 px-10 py-5 rounded-full text-white font-bold text-lg glow-green"
              style={{ background: "linear-gradient(135deg, #16A34A, #15803D)" }}>
              <FaWhatsapp size={22} /> Find My Room Now <ChevronRight size={18} />
            </motion.a>
            <p className="text-white/15 text-xs mt-5">Verified listings only · Inspection available on request</p>
          </Reveal>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer id="contact" className="border-t border-white/5 py-14 bg-[#020804]">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center text-base" style={{ background: "linear-gradient(135deg, #16A34A, #15803D)" }}>🏠</div>
                <span className="font-bold" style={{ fontFamily: "'Fraunces', serif" }}>Safe Apart... Realty</span>
              </div>
              <p className="text-white/25 text-sm leading-relaxed mb-5 max-w-xs">{BRAND.description}</p>
              <div className="flex gap-3">
                {[{ I: FaWhatsapp, h: WA }, { I: FaTelegram, h: BRAND.telegram }, { I: FaInstagram, h: BRAND.instagram }].map(({ I, h }, i) => (
                  <motion.a key={i} href={h} target="_blank" rel="noreferrer" whileHover={{ scale: 1.2 }}
                    className="w-9 h-9 glass rounded-full flex items-center justify-center text-white/30 hover:text-green-400 transition-colors">
                    <I size={14} />
                  </motion.a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-xs tracking-widest uppercase text-white/35 mb-5">Quick Links</h4>
              <div className="flex flex-col gap-3">
                {["Listings", "How It Works", "About", "Contact Agent"].map((l) => (
                  <a key={l} href={`#${l.toLowerCase().replace(/\s+/g, "-")}`} className="text-white/30 hover:text-white text-sm transition-colors">{l}</a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-xs tracking-widest uppercase text-white/35 mb-5">Contact</h4>
              <div className="flex flex-col gap-3">
                <div className="flex items-start gap-2 text-sm text-white/30"><MapPin size={13} className="mt-0.5 text-green-400 shrink-0" />{BRAND.location}</div>
                <a href={`tel:${BRAND.phone}`} className="flex items-center gap-2 text-sm text-white/30 hover:text-white"><Phone size={13} className="text-green-400" />{BRAND.phone}</a>
                <a href={WA} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-white/30 hover:text-white"><FaWhatsapp size={13} className="text-green-400" />WhatsApp Agent</a>
                <div className="flex items-center gap-2 text-sm text-white/30"><Clock size={13} className="text-yellow-500" />Available 24/7</div>
              </div>
            </div>
          </div>
          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/12 text-xs">© 2025 Safe Apart... Realty. All rights reserved.</p>
            <p className="text-white/10 text-xs">Built by GTECH in Nigeria · Powered by GTECH</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
