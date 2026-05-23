"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useInView } from "framer-motion";
import { Star, Clock, ShoppingBag, ChevronRight, Menu, X, MapPin, Phone,  Zap, MessageCircle, ArrowRight, Award, Flame } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";

const WHATSAPP_URL = "https://wa.me/2290191823921?text=Hello%20I%20want%20to%20place%20an%20order";

const navLinks = ["Menu", "How It Works", "Testimonials", "Contact"];

const menuItems = [
  {
    id: 1,
    name: "Jollof Rice",
    desc: "Smoky, party-style West African jollof with caramelized tomatoes & secret spice blend.",
    price: "₦2,500",
    rating: 4.9,
    tag: "Fan Favorite",
    img: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=600&q=80",
    color: "#FF6B35",
  },
  {
    id: 2,
    name: "Shawarma",
    desc: "Loaded wrap with tender marinated chicken, garlic sauce, crisp veggies & warm flatbread.",
    price: "₦3,200",
    rating: 4.8,
    tag: "Best Seller",
    img: "https://images.unsplash.com/photo-1561651188-d207bbec4ec3?w=600&q=80",
    color: "#FFB347",
  },
  {
    id: 3,
    name: "Fried Rice",
    desc: "Wok-tossed basmati with fresh vegetables, seasoned prawns & our signature soy glaze.",
    price: "₦2,800",
    rating: 4.7,
    tag: "Quick Serve",
    img: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=600&q=80",
    color: "#4CAF50",
  },
  {
    id: 4,
    name: "Grilled Chicken",
    desc: "Slow-marinated whole chicken, wood-fire grilled with suya spice & smoky herb butter.",
    price: "₦4,500",
    rating: 5.0,
    tag: "Premium",
    img: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=600&q=80",
    color: "#E74C3C",
  },
  {
    id: 5,
    name: "Burger Deluxe",
    desc: "Double smash patty, pepper jack cheese, caramelized onions & signature smoky Arena sauce.",
    price: "₦3,800",
    rating: 4.9,
    tag: "New",
    img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80",
    color: "#9B59B6",
  },
  {
    id: 6,
    name: "Tropical Drinks",
    desc: "Fresh-blended zobo, pineapple ginger & tamarind coolers. Made daily, zero preservatives.",
    price: "₦1,200",
    rating: 4.8,
    tag: "Refreshing",
    img: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=600&q=80",
    color: "#1ABC9C",
  },
];

const steps = [
  {
    num: "01",
    title: "Choose Your Meal",
    desc: "Browse our premium menu and pick your favorites from smoky jollof to loaded shawarmas.",
    icon: <ShoppingBag size={28} />,
    color: "#FF6B35",
  },
  {
    num: "02",
    title: "Message on WhatsApp",
    desc: "One tap opens WhatsApp. Tell us what you want, where you are  we handle the rest.",
    icon: <FaWhatsapp size={28} />,
    color: "#25D366",
  },
  {
    num: "03",
    title: "Instant Confirmation",
    desc: "Your order is confirmed in under 2 minutes. Fresh food is already on its way to you.",
    icon: <Zap size={28} />,
    color: "#FFB347",
  },
];

const testimonials = [
  {
    name: "Adaeze Okafor",
    role: "Food Blogger, Lagos",
    text: "Arena is genuinely the best jollof rice I've ever ordered. The smokiness is just unreal. My followers went crazy when I shared it.",
    rating: 5,
    img: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&q=80",
  },
  {
    name: "Chukwuemeka Eze",
    role: "Entrepreneur, Abuja",
    text: "The WhatsApp ordering is genius. I order for my whole team on Fridays  always arrives fast, always perfect. Nothing comes close.",
    rating: 5,
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
  },
  {
    name: "Fatima Aliyu",
    role: "Marketing Lead, Lagos",
    text: "The Grilled Chicken is absolutely premium. You can taste the suya spice through every bite. This is what real street food elevation looks like.",
    rating: 5,
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80",
  },
];

const stats = [
  { value: "500+", label: "Daily Orders" },
  { value: "4.9★", label: "Customer Rating" },
  { value: "15min", label: "Avg. Delivery" },
];

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

    const particles: { x: number; y: number; r: number; vx: number; vy: number; alpha: number; color: string }[] = [];
    const colors = ["#FF6B35", "#FFB347", "#25D366", "#FFD700", "#FF8C00"];

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 2.5 + 0.5,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        alpha: Math.random() * 0.6 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    function draw() {
      ctx!.clearRect(0, 0, W, H);

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx!.beginPath();
            ctx!.strokeStyle = `rgba(255,107,53,${0.08 * (1 - dist / 120)})`;
            ctx!.lineWidth = 0.5;
            ctx!.moveTo(particles[i].x, particles[i].y);
            ctx!.lineTo(particles[j].x, particles[j].y);
            ctx!.stroke();
          }
        }
      }

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
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

    const onResize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}

function FloatingCard({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      animate={{ y: [0, -12, 0] }}
      transition={{ duration: 3.5 + delay, repeat: Infinity, ease: "easeInOut", delay }}
    >
      {children}
    </motion.div>
  );
}

function SectionReveal({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function MalleteBites() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const { scrollY } = useScroll();
  const navBg = useTransform(scrollY, [0, 80], ["rgba(10,10,10,0)", "rgba(10,10,10,0.95)"]);

  return (
    <div className="bg-[#0a0a0a] text-white font-sans overflow-x-hidden" style={{ fontFamily: "'Sora', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,700;1,400&display=swap');
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #111; }
        ::-webkit-scrollbar-thumb { background: #FF6B35; border-radius: 2px; }
        .glow-orange { box-shadow: 0 0 30px rgba(255,107,53,0.4), 0 0 60px rgba(255,107,53,0.15); }
        .glow-green { box-shadow: 0 0 30px rgba(37,211,102,0.4), 0 0 60px rgba(37,211,102,0.15); }
        .glow-text { text-shadow: 0 0 40px rgba(255,107,53,0.5); }
        .glass { backdrop-filter: blur(16px); background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); }
        .glass-dark { backdrop-filter: blur(20px); background: rgba(10,10,10,0.7); border: 1px solid rgba(255,255,255,0.06); }
        .card-shine::before { content: ''; position: absolute; top: 0; left: -100%; width: 60%; height: 100%; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent); transition: left 0.6s ease; }
        .card-shine:hover::before { left: 150%; }
        .grain { background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E"); }
      `}</style>

      {/* NAVBAR */}
      <motion.nav
        style={{ background: navBg }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-white/5"
      >
        <div className="max-w-7xl mx-auto px-5 md:px-10 py-4 flex items-center justify-between">
          <motion.a
            href="#"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#FF6B35] to-[#FFB347] flex items-center justify-center shadow-lg glow-orange">
              <Flame size={18} className="text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              <span className="text-[#FF6B35]"> Arena</span>
              
            </span>
          </motion.a>

          {/* Desktop nav */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hidden md:flex items-center gap-8"
          >
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-sm text-white/60 hover:text-white transition-colors duration-200 tracking-wide"
              >
                {link}
              </a>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden md:flex"
          >
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white text-sm font-semibold glow-green transition-all duration-300 hover:scale-105"
            >
              <FaWhatsapp size={16} />
              Order Now
            </a>
          </motion.div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden border-t border-white/5 glass-dark"
            >
              <div className="flex flex-col px-6 py-6 gap-5">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link}
                    href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                    onClick={() => setMenuOpen(false)}
                    className="text-white/70 hover:text-white text-lg font-medium"
                  >
                    {link}
                  </motion.a>
                ))}
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white font-semibold mt-2 glow-green"
                >
                  <FaWhatsapp size={18} />
                  Order on WhatsApp
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
        <ParticleCanvas />

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-transparent to-[#0a0a0a] z-[1]" />
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#FF6B35] rounded-full blur-[180px] opacity-10 z-[1]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#25D366] rounded-full blur-[160px] opacity-8 z-[1]" />

        <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-10 w-full py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left content */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm text-[#FF6B35] font-medium mb-6"
              >
                <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
                Now Delivering in Malete & Surroundings
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight mb-6"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Order Your
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B35] to-[#FFB347] glow-text">
                  Favorite Meals
                </span>
                Instantly.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="text-lg text-white/50 mb-10 max-w-md leading-relaxed"
              >
                Fast. Fresh. Delivered through WhatsApp in minutes. Real African flavors, premium quality  every single time.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
                className="flex flex-wrap gap-4 mb-14"
              >
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2.5 px-7 py-4 rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white font-semibold text-base glow-green hover:scale-105 transition-transform duration-300"
                >
                  <FaWhatsapp size={20} />
                  Order Now
                </a>
                <a
                  href="#menu"
                  className="flex items-center gap-2 px-7 py-4 rounded-full glass text-white/80 hover:text-white font-medium text-base hover:border-[#FF6B35]/40 border border-transparent transition-all duration-300"
                >
                  View Menu
                  <ArrowRight size={16} />
                </a>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="flex gap-8"
              >
                {stats.map((s, i) => (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.55 + i * 0.1 }}
                  >
                    <div className="text-2xl md:text-3xl font-bold text-white">{s.value}</div>
                    <div className="text-xs text-white/40 mt-0.5 tracking-wide">{s.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Right: floating food cards */}
            <div className="hidden lg:flex relative h-[580px] items-center justify-center">
              {/* Main image */}
              <FloatingCard className="absolute w-72 h-72 rounded-3xl overflow-hidden shadow-2xl z-20" delay={0}>
                <img
                  src="https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=600&q=80"
                  alt="Jollof Rice"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="text-sm font-semibold">Jollof Rice</div>
                  <div className="text-xs text-white/70">₦2,500</div>
                </div>
              </FloatingCard>

              {/* Top right card */}
              <FloatingCard className="absolute top-8 right-0 w-52 h-52 rounded-2xl overflow-hidden shadow-xl z-10" delay={0.8}>
                <img
                  src="https://images.unsplash.com/photo-1561651188-d207bbec4ec3?w=400&q=80"
                  alt="Shawarma"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-3 text-white">
                  <div className="text-xs font-semibold">Shawarma</div>
                </div>
              </FloatingCard>

              {/* Bottom left card */}
              <FloatingCard className="absolute bottom-16 -left-4 w-48 h-48 rounded-2xl overflow-hidden shadow-xl z-10" delay={1.4}>
                <img
                  src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80"
                  alt="Burger"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-3 text-white">
                  <div className="text-xs font-semibold">Burger Deluxe</div>
                </div>
              </FloatingCard>

              {/* Rating badge */}
              <FloatingCard className="absolute top-0 left-8 glass rounded-2xl px-4 py-3 z-30" delay={1.8}>
                <div className="flex items-center gap-2">
                  <div className="text-yellow-400">★★★★★</div>
                  <div>
                    <div className="text-sm font-bold">4.9/5</div>
                    <div className="text-xs text-white/40">500+ reviews</div>
                  </div>
                </div>
              </FloatingCard>

              {/* Delivery badge */}
              <FloatingCard className="absolute bottom-4 right-0 glass rounded-2xl px-4 py-3 z-30" delay={2.2}>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#25D366]/20 flex items-center justify-center">
                    <Clock size={14} className="text-[#25D366]" />
                  </div>
                  <div>
                    <div className="text-xs font-bold">15 min</div>
                    <div className="text-[10px] text-white/40">delivery time</div>
                  </div>
                </div>
              </FloatingCard>
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent z-10" />
      </section>

      {/* MENU */}
      <section id="menu" className="py-24 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-[#FF6B35]/40 to-transparent" />
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <SectionReveal className="text-center mb-16">
            <div className="text-[#FF6B35] text-sm font-semibold tracking-widest uppercase mb-3">Our Menu</div>
            <h2 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
              Crafted with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B35] to-[#FFB347]">
                passion
              </span>
            </h2>
            <p className="text-white/40 mt-4 max-w-md mx-auto">
              Every dish is prepared fresh with premium ingredients. Taste the difference quality makes.
            </p>
          </SectionReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuItems.map((item, i) => {
              const ref = useRef(null);
              const inView = useInView(ref, { once: true, margin: "-60px" });
              return (
                <motion.div
                  key={item.id}
                  ref={ref}
                  initial={{ opacity: 0, y: 60 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative rounded-3xl overflow-hidden glass border border-white/5 card-shine cursor-pointer"
                  onHoverStart={() => setActiveMenu(item.id)}
                  onHoverEnd={() => setActiveMenu(null)}
                  whileHover={{ y: -6, scale: 1.01 }}
                >
                  <div className="h-52 overflow-hidden relative">
                    <motion.img
                      src={item.img}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.5 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
                    <div
                      className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold text-white"
                      style={{ background: item.color + "33", border: `1px solid ${item.color}55` }}
                    >
                      {item.tag}
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-bold">{item.name}</h3>
                      <div className="flex items-center gap-1 text-yellow-400 text-sm">
                        <Star size={13} fill="currentColor" />
                        <span className="text-white/70 text-xs">{item.rating}</span>
                      </div>
                    </div>
                    <p className="text-white/40 text-sm mb-5 leading-relaxed">{item.desc}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold" style={{ color: item.color }}>
                        {item.price}
                      </span>
                      <motion.a
                        href={WHATSAPP_URL}
                        target="_blank"
                        rel="noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-[#25D366] to-[#128C7E] glow-green"
                      >
                        <FaWhatsapp size={14} />
                        Order
                      </motion.a>
                    </div>
                  </div>

                  {/* Glow on hover */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl pointer-events-none"
                    animate={activeMenu === item.id ? { opacity: 1 } : { opacity: 0 }}
                    style={{ boxShadow: `inset 0 0 0 1px ${item.color}40, 0 0 40px ${item.color}20` }}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* TODAY'S SPECIAL */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#FF6B35]/10 to-transparent" />
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <SectionReveal>
            <div className="relative rounded-3xl overflow-hidden glass border border-[#FF6B35]/20">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="p-10 md:p-14 flex flex-col justify-center">
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FF6B35]/20 border border-[#FF6B35]/40 text-[#FF6B35] text-sm font-semibold mb-6 w-fit"
                  >
                    <Flame size={14} />
                    Today's Special
                  </motion.div>

                  <h2
                    className="text-4xl md:text-5xl font-bold mb-4"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    Suya Grilled
                    <br />
                    <span className="text-[#FF6B35]">Platter</span>
                  </h2>

                  <p className="text-white/50 mb-6 leading-relaxed">
                    Our signature combo: suya-spiced chicken, smoky jollof rice, plantains, and a chilled zobo drink. The perfect Nigerian feast for two  now at a special price.
                  </p>

                  <div className="flex items-baseline gap-3 mb-8">
                    <span className="text-4xl font-bold text-[#FF6B35]">₦5,500</span>
                    <span className="text-white/30 line-through text-xl">₦7,200</span>
                    <span className="px-2 py-0.5 rounded-full bg-[#FF6B35] text-white text-xs font-bold">24% OFF</span>
                  </div>

                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2.5 px-7 py-4 rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white font-semibold text-base glow-green hover:scale-105 transition-transform duration-300 w-fit"
                  >
                    <FaWhatsapp size={20} />
                    Claim This Deal
                  </a>
                </div>

                <div className="relative h-64 md:h-auto">
                  <img
                    src="https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=800&q=80"
                    alt="Special"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#0a0a0a]/60" />
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-24">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <SectionReveal className="text-center mb-16">
            <div className="text-[#25D366] text-sm font-semibold tracking-widest uppercase mb-3">Process</div>
            <h2 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
              Order in{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#25D366] to-[#FFB347]">
                3 simple steps
              </span>
            </h2>
          </SectionReveal>

          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-12 left-[calc(16.66%+24px)] right-[calc(16.66%+24px)] h-px bg-gradient-to-r from-[#FF6B35]/40 via-[#25D366]/40 to-[#FFB347]/40" />

            {steps.map((step, i) => {
              const ref = useRef(null);
              const inView = useInView(ref, { once: true, margin: "-50px" });
              return (
                <motion.div
                  key={step.num}
                  ref={ref}
                  initial={{ opacity: 0, y: 50 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.65, delay: i * 0.15 }}
                  className="relative glass rounded-3xl p-8 text-center hover:border-white/15 border border-white/5 transition-all duration-300 group"
                  whileHover={{ y: -6 }}
                >
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300"
                    style={{ background: step.color + "22", border: `1px solid ${step.color}44` }}
                  >
                    <span style={{ color: step.color }}>{step.icon}</span>
                  </div>
                  <div className="text-5xl font-bold text-white/5 absolute top-6 right-8">{step.num}</div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-white/40 leading-relaxed text-sm">{step.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="py-24 bg-[#060606]">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <SectionReveal className="text-center mb-16">
            <div className="text-[#FFB347] text-sm font-semibold tracking-widest uppercase mb-3">Reviews</div>
            <h2 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
              What our customers{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B35] to-[#FFB347]">say</span>
            </h2>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => {
              const ref = useRef(null);
              const inView = useInView(ref, { once: true, margin: "-40px" });
              return (
                <motion.div
                  key={t.name}
                  ref={ref}
                  initial={{ opacity: 0, y: 50 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.12 }}
                  whileHover={{ y: -5 }}
                  className="glass rounded-3xl p-7 border border-white/5 hover:border-[#FF6B35]/20 transition-all duration-300"
                >
                  <div className="flex gap-1 text-yellow-400 mb-5">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} size={14} fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-white/60 leading-relaxed mb-6 text-sm">"{t.text}"</p>
                  <div className="flex items-center gap-3">
                    <img
                      src={t.img}
                      alt={t.name}
                      className="w-11 h-11 rounded-full object-cover border-2 border-[#FF6B35]/30"
                    />
                    <div>
                      <div className="font-semibold text-sm">{t.name}</div>
                      <div className="text-xs text-white/30">{t.role}</div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B35]/15 via-transparent to-[#25D366]/10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FF6B35] rounded-full blur-[200px] opacity-8" />

        <div className="max-w-4xl mx-auto px-5 md:px-10 text-center relative z-10">
          <SectionReveal>
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-6xl mb-8"
            >
              🍽️
            </motion.div>

            <h2
              className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Hungry?{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B35] to-[#FFB347]">
                Your next meal
              </span>
              <br />
              is one message away.
            </h2>

            <p className="text-white/40 text-lg mb-10 max-w-lg mx-auto">
              Don't wait. Don't wonder. Just tap the button below and we'll take care of everything  fast, fresh, and unforgettable.
            </p>

            <motion.a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-5 md:px-10 py-5 rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white font-bold text-lg glow-green"
            >
              <FaWhatsapp size={24} />
              Start Your Order Now
              <ChevronRight size={20} />
            </motion.a>

            <p className="text-white/20 text-sm mt-6">No app download. No account needed. Just WhatsApp.</p>
          </SectionReveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact" className="border-t border-white/5 bg-[#050505] py-16">
        <div className="max-w-7xl mx-auto px-5 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#FF6B35] to-[#FFB347] flex items-center justify-center">
                  <Flame size={18} className="text-white" />
                </div>
                <span className="text-xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
                  <span className="text-[#FF6B35]"> Arena</span>
                </span>
              </div>
              <p className="text-white/30 text-sm leading-relaxed mb-6 max-w-xs">
                Premium African street food, delivered to your door through WhatsApp. Real flavor, real fast.
              </p>
              <div className="flex gap-4">
                {[FaInstagram, FaTwitter, FaFacebook].map((Icon, i) => (
                  <motion.a
                    key={i}
                    href="#"
                    whileHover={{ scale: 1.2, color: "#FF6B35" }}
                    className="w-10 h-10 glass rounded-full flex items-center justify-center text-white/40 hover:text-[#FF6B35] transition-colors"
                  >
                    <Icon size={16} />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-sm mb-4 text-white/60 tracking-widest uppercase">Quick Links</h4>
              <div className="flex flex-col gap-3">
                {["Menu", "How It Works", "Testimonials", "Order Now"].map((link) => (
                  <a
                    key={link}
                    href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-white/30 hover:text-white text-sm transition-colors"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold text-sm mb-4 text-white/60 tracking-widest uppercase">Contact</h4>
              <div className="flex flex-col gap-3">
                <div className="flex items-start gap-2 text-sm text-white/30">
                  <MapPin size={14} className="mt-0.5 shrink-0 text-[#FF6B35]" />
                  Malete, Kwara State, Nigeria
                </div>
                <div className="flex items-center gap-2 text-sm text-white/30">
                  <Phone size={14} className="shrink-0 text-[#FF6B35]" />
                  +234 000 000 0000
                </div>
                <div className="flex items-center gap-2 text-sm text-white/30">
                  <FaWhatsapp size={14} className="shrink-0 text-[#25D366]" />
                  WhatsApp Orders
                </div>
                <div className="mt-2">
                  <div className="text-xs text-white/20 mb-1">Opening Hours</div>
                  <div className="text-sm text-white/40">Daily: 9am – 10pm</div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/20 text-xs">
              © 2026 Arena. All rights reserved.
            </p>
            <p className="text-white/10 text-xs">
              Made with ❤️ for premium food lovers
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
