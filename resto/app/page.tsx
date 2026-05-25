// "use client";

// import { useEffect, useRef, useState } from "react";
// import { motion, useScroll, useTransform, AnimatePresence, useInView } from "framer-motion";
// import { Star, Clock, ShoppingBag, ChevronRight, Menu, X, MapPin, Phone,  Zap, MessageCircle, ArrowRight, Award, Flame } from "lucide-react";
// import { FaWhatsapp } from "react-icons/fa";
// import { FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";

// const WHATSAPP_URL = "https://wa.me/2290191823921?text=Hello%20I%20want%20to%20place%20an%20order";

// const navLinks = ["Menu", "How It Works", "Testimonials", "Contact"];

// const menuItems = [
//   {
//     id: 1,
//     name: "Jollof Rice",
//     desc: "Smoky, party-style West African jollof with caramelized tomatoes & secret spice blend.",
//     price: "₦2,500",
//     rating: 4.9,
//     tag: "Fan Favorite",
//     img: "https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=600&q=80",
//     color: "#FF6B35",
//   },
//   {
//     id: 2,
//     name: "Shawarma",
//     desc: "Loaded wrap with tender marinated chicken, garlic sauce, crisp veggies & warm flatbread.",
//     price: "₦3,200",
//     rating: 4.8,
//     tag: "Best Seller",
//     img: "https://images.unsplash.com/photo-1561651188-d207bbec4ec3?w=600&q=80",
//     color: "#FFB347",
//   },
//   {
//     id: 3,
//     name: "Fried Rice",
//     desc: "Wok-tossed basmati with fresh vegetables, seasoned prawns & our signature soy glaze.",
//     price: "₦2,800",
//     rating: 4.7,
//     tag: "Quick Serve",
//     img: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=600&q=80",
//     color: "#4CAF50",
//   },
//   {
//     id: 4,
//     name: "Grilled Chicken",
//     desc: "Slow-marinated whole chicken, wood-fire grilled with suya spice & smoky herb butter.",
//     price: "₦4,500",
//     rating: 5.0,
//     tag: "Premium",
//     img: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=600&q=80",
//     color: "#E74C3C",
//   },
//   {
//     id: 5,
//     name: "Burger Deluxe",
//     desc: "Double smash patty, pepper jack cheese, caramelized onions & signature smoky Arena sauce.",
//     price: "₦3,800",
//     rating: 4.9,
//     tag: "New",
//     img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80",
//     color: "#9B59B6",
//   },
//   {
//     id: 6,
//     name: "Tropical Drinks",
//     desc: "Fresh-blended zobo, pineapple ginger & tamarind coolers. Made daily, zero preservatives.",
//     price: "₦1,200",
//     rating: 4.8,
//     tag: "Refreshing",
//     img: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=600&q=80",
//     color: "#1ABC9C",
//   },
// ];

// const steps = [
//   {
//     num: "01",
//     title: "Choose Your Meal",
//     desc: "Browse our premium menu and pick your favorites from smoky jollof to loaded shawarmas.",
//     icon: <ShoppingBag size={28} />,
//     color: "#FF6B35",
//   },
//   {
//     num: "02",
//     title: "Message on WhatsApp",
//     desc: "One tap opens WhatsApp. Tell us what you want, where you are  we handle the rest.",
//     icon: <FaWhatsapp size={28} />,
//     color: "#25D366",
//   },
//   {
//     num: "03",
//     title: "Instant Confirmation",
//     desc: "Your order is confirmed in under 2 minutes. Fresh food is already on its way to you.",
//     icon: <Zap size={28} />,
//     color: "#FFB347",
//   },
// ];

// const testimonials = [
//   {
//     name: "Adaeze Okafor",
//     role: "Food Blogger, Lagos",
//     text: "Arena is genuinely the best jollof rice I've ever ordered. The smokiness is just unreal. My followers went crazy when I shared it.",
//     rating: 5,
//     img: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&q=80",
//   },
//   {
//     name: "Chukwuemeka Eze",
//     role: "Entrepreneur, Abuja",
//     text: "The WhatsApp ordering is genius. I order for my whole team on Fridays  always arrives fast, always perfect. Nothing comes close.",
//     rating: 5,
//     img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
//   },
//   {
//     name: "Fatima Aliyu",
//     role: "Marketing Lead, Lagos",
//     text: "The Grilled Chicken is absolutely premium. You can taste the suya spice through every bite. This is what real street food elevation looks like.",
//     rating: 5,
//     img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80",
//   },
// ];

// const stats = [
//   { value: "500+", label: "Daily Orders" },
//   { value: "4.9★", label: "Customer Rating" },
//   { value: "15min", label: "Avg. Delivery" },
// ];

// function ParticleCanvas() {
//   const canvasRef = useRef<HTMLCanvasElement>(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;

//     let animId: number;
//     let W = (canvas.width = window.innerWidth);
//     let H = (canvas.height = window.innerHeight);

//     const particles: { x: number; y: number; r: number; vx: number; vy: number; alpha: number; color: string }[] = [];
//     const colors = ["#FF6B35", "#FFB347", "#25D366", "#FFD700", "#FF8C00"];

//     for (let i = 0; i < 80; i++) {
//       particles.push({
//         x: Math.random() * W,
//         y: Math.random() * H,
//         r: Math.random() * 2.5 + 0.5,
//         vx: (Math.random() - 0.5) * 0.4,
//         vy: (Math.random() - 0.5) * 0.4,
//         alpha: Math.random() * 0.6 + 0.2,
//         color: colors[Math.floor(Math.random() * colors.length)],
//       });
//     }

//     function draw() {
//       ctx!.clearRect(0, 0, W, H);

//       // Draw connections
//       for (let i = 0; i < particles.length; i++) {
//         for (let j = i + 1; j < particles.length; j++) {
//           const dx = particles[i].x - particles[j].x;
//           const dy = particles[i].y - particles[j].y;
//           const dist = Math.sqrt(dx * dx + dy * dy);
//           if (dist < 120) {
//             ctx!.beginPath();
//             ctx!.strokeStyle = `rgba(255,107,53,${0.08 * (1 - dist / 120)})`;
//             ctx!.lineWidth = 0.5;
//             ctx!.moveTo(particles[i].x, particles[i].y);
//             ctx!.lineTo(particles[j].x, particles[j].y);
//             ctx!.stroke();
//           }
//         }
//       }

//       particles.forEach((p) => {
//         p.x += p.vx;
//         p.y += p.vy;
//         if (p.x < 0 || p.x > W) p.vx *= -1;
//         if (p.y < 0 || p.y > H) p.vy *= -1;

//         ctx!.beginPath();
//         ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
//         ctx!.fillStyle = p.color + Math.floor(p.alpha * 255).toString(16).padStart(2, "0");
//         ctx!.fill();
//       });

//       animId = requestAnimationFrame(draw);
//     }

//     draw();

//     const onResize = () => {
//       W = canvas.width = window.innerWidth;
//       H = canvas.height = window.innerHeight;
//     };
//     window.addEventListener("resize", onResize);

//     return () => {
//       cancelAnimationFrame(animId);
//       window.removeEventListener("resize", onResize);
//     };
//   }, []);

//   return (
//     <canvas
//       ref={canvasRef}
//       className="absolute inset-0 w-full h-full pointer-events-none"
//       style={{ zIndex: 0 }}
//     />
//   );
// }

// function FloatingCard({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
//   return (
//     <motion.div
//       className={className}
//       animate={{ y: [0, -12, 0] }}
//       transition={{ duration: 3.5 + delay, repeat: Infinity, ease: "easeInOut", delay }}
//     >
//       {children}
//     </motion.div>
//   );
// }

// function SectionReveal({ children, className }: { children: React.ReactNode; className?: string }) {
//   const ref = useRef(null);
//   const inView = useInView(ref, { once: true, margin: "-80px" });

//   return (
//     <motion.div
//       ref={ref}
//       initial={{ opacity: 0, y: 50 }}
//       animate={inView ? { opacity: 1, y: 0 } : {}}
//       transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
//       className={className}
//     >
//       {children}
//     </motion.div>
//   );
// }

// export default function MalleteBites() {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [activeMenu, setActiveMenu] = useState<number | null>(null);
//   const { scrollY } = useScroll();
//   const navBg = useTransform(scrollY, [0, 80], ["rgba(10,10,10,0)", "rgba(10,10,10,0.95)"]);

//   return (
//     <div className="bg-[#0a0a0a] text-white font-sans overflow-x-hidden" style={{ fontFamily: "'Sora', sans-serif" }}>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,700;1,400&display=swap');
//         html { scroll-behavior: smooth; }
//         ::-webkit-scrollbar { width: 4px; }
//         ::-webkit-scrollbar-track { background: #111; }
//         ::-webkit-scrollbar-thumb { background: #FF6B35; border-radius: 2px; }
//         .glow-orange { box-shadow: 0 0 30px rgba(255,107,53,0.4), 0 0 60px rgba(255,107,53,0.15); }
//         .glow-green { box-shadow: 0 0 30px rgba(37,211,102,0.4), 0 0 60px rgba(37,211,102,0.15); }
//         .glow-text { text-shadow: 0 0 40px rgba(255,107,53,0.5); }
//         .glass { backdrop-filter: blur(16px); background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); }
//         .glass-dark { backdrop-filter: blur(20px); background: rgba(10,10,10,0.7); border: 1px solid rgba(255,255,255,0.06); }
//         .card-shine::before { content: ''; position: absolute; top: 0; left: -100%; width: 60%; height: 100%; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent); transition: left 0.6s ease; }
//         .card-shine:hover::before { left: 150%; }
//         .grain { background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E"); }
//       `}</style>

//       {/* NAVBAR */}
//       <motion.nav
//         style={{ background: navBg }}
//         className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-white/5"
//       >
//         <div className="max-w-7xl mx-auto px-5 md:px-10 py-4 flex items-center justify-between">
//           <motion.a
//             href="#"
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.5 }}
//             className="flex items-center gap-2"
//           >
//             <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#FF6B35] to-[#FFB347] flex items-center justify-center shadow-lg glow-orange">
//               <Flame size={18} className="text-white" />
//             </div>
//             <span className="text-xl font-bold tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
//               <span className="text-[#FF6B35]"> Arena</span>
              
//             </span>
//           </motion.a>

//           {/* Desktop nav */}
//           <motion.div
//             initial={{ opacity: 0, y: -10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.1 }}
//             className="hidden md:flex items-center gap-8"
//           >
//             {navLinks.map((link) => (
//               <a
//                 key={link}
//                 href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
//                 className="text-sm text-white/60 hover:text-white transition-colors duration-200 tracking-wide"
//               >
//                 {link}
//               </a>
//             ))}
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, x: 20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.5, delay: 0.2 }}
//             className="hidden md:flex"
//           >
//             <a
//               href={WHATSAPP_URL}
//               target="_blank"
//               rel="noreferrer"
//               className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white text-sm font-semibold glow-green transition-all duration-300 hover:scale-105"
//             >
//               <FaWhatsapp size={16} />
//               Order Now
//             </a>
//           </motion.div>

//           {/* Mobile hamburger */}
//           <button
//             className="md:hidden text-white p-2"
//             onClick={() => setMenuOpen(!menuOpen)}
//           >
//             {menuOpen ? <X size={24} /> : <Menu size={24} />}
//           </button>
//         </div>

//         {/* Mobile Menu */}
//         <AnimatePresence>
//           {menuOpen && (
//             <motion.div
//               initial={{ opacity: 0, height: 0 }}
//               animate={{ opacity: 1, height: "auto" }}
//               exit={{ opacity: 0, height: 0 }}
//               transition={{ duration: 0.3, ease: "easeInOut" }}
//               className="md:hidden border-t border-white/5 glass-dark"
//             >
//               <div className="flex flex-col px-6 py-6 gap-5">
//                 {navLinks.map((link, i) => (
//                   <motion.a
//                     key={link}
//                     href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ delay: i * 0.07 }}
//                     onClick={() => setMenuOpen(false)}
//                     className="text-white/70 hover:text-white text-lg font-medium"
//                   >
//                     {link}
//                   </motion.a>
//                 ))}
//                 <a
//                   href={WHATSAPP_URL}
//                   target="_blank"
//                   rel="noreferrer"
//                   className="flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white font-semibold mt-2 glow-green"
//                 >
//                   <FaWhatsapp size={18} />
//                   Order on WhatsApp
//                 </a>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </motion.nav>

//       {/* HERO */}
//       <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
//         <ParticleCanvas />

//         {/* Gradient overlays */}
//         <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-transparent to-[#0a0a0a] z-[1]" />
//         <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#FF6B35] rounded-full blur-[180px] opacity-10 z-[1]" />
//         <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#25D366] rounded-full blur-[160px] opacity-8 z-[1]" />

//         <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-10 w-full py-20">
//           <div className="grid lg:grid-cols-2 gap-16 items-center">
//             {/* Left content */}
//             <div>
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.5 }}
//                 className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm text-[#FF6B35] font-medium mb-6"
//               >
//                 <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
//                 Now Delivering in Malete & Surroundings
//               </motion.div>

//               <motion.h1
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.7, delay: 0.1 }}
//                 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight mb-6"
//                 style={{ fontFamily: "'Playfair Display', serif" }}
//               >
//                 Order Your
//                 <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B35] to-[#FFB347] glow-text">
//                   Favorite Meals
//                 </span>
//                 Instantly.
//               </motion.h1>

//               <motion.p
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6, delay: 0.25 }}
//                 className="text-lg text-white/50 mb-10 max-w-md leading-relaxed"
//               >
//                 Fast. Fresh. Delivered through WhatsApp in minutes. Real African flavors, premium quality  every single time.
//               </motion.p>

//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6, delay: 0.35 }}
//                 className="flex flex-wrap gap-4 mb-14"
//               >
//                 <a
//                   href={WHATSAPP_URL}
//                   target="_blank"
//                   rel="noreferrer"
//                   className="flex items-center gap-2.5 px-7 py-4 rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white font-semibold text-base glow-green hover:scale-105 transition-transform duration-300"
//                 >
//                   <FaWhatsapp size={20} />
//                   Order Now
//                 </a>
//                 <a
//                   href="#menu"
//                   className="flex items-center gap-2 px-7 py-4 rounded-full glass text-white/80 hover:text-white font-medium text-base hover:border-[#FF6B35]/40 border border-transparent transition-all duration-300"
//                 >
//                   View Menu
//                   <ArrowRight size={16} />
//                 </a>
//               </motion.div>

//               {/* Stats */}
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 transition={{ duration: 0.8, delay: 0.5 }}
//                 className="flex gap-8"
//               >
//                 {stats.map((s, i) => (
//                   <motion.div
//                     key={s.label}
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.55 + i * 0.1 }}
//                   >
//                     <div className="text-2xl md:text-3xl font-bold text-white">{s.value}</div>
//                     <div className="text-xs text-white/40 mt-0.5 tracking-wide">{s.label}</div>
//                   </motion.div>
//                 ))}
//               </motion.div>
//             </div>

//             {/* Right: floating food cards */}
//             <div className="hidden lg:flex relative h-[580px] items-center justify-center">
//               {/* Main image */}
//               <FloatingCard className="absolute w-72 h-72 rounded-3xl overflow-hidden shadow-2xl z-20" delay={0}>
//                 <img
//                   src="https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=600&q=80"
//                   alt="Jollof Rice"
//                   className="w-full h-full object-cover"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
//                 <div className="absolute bottom-4 left-4 text-white">
//                   <div className="text-sm font-semibold">Jollof Rice</div>
//                   <div className="text-xs text-white/70">₦2,500</div>
//                 </div>
//               </FloatingCard>

//               {/* Top right card */}
//               <FloatingCard className="absolute top-8 right-0 w-52 h-52 rounded-2xl overflow-hidden shadow-xl z-10" delay={0.8}>
//                 <img
//                   src="https://images.unsplash.com/photo-1561651188-d207bbec4ec3?w=400&q=80"
//                   alt="Shawarma"
//                   className="w-full h-full object-cover"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
//                 <div className="absolute bottom-3 left-3 text-white">
//                   <div className="text-xs font-semibold">Shawarma</div>
//                 </div>
//               </FloatingCard>

//               {/* Bottom left card */}
//               <FloatingCard className="absolute bottom-16 -left-4 w-48 h-48 rounded-2xl overflow-hidden shadow-xl z-10" delay={1.4}>
//                 <img
//                   src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80"
//                   alt="Burger"
//                   className="w-full h-full object-cover"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
//                 <div className="absolute bottom-3 left-3 text-white">
//                   <div className="text-xs font-semibold">Burger Deluxe</div>
//                 </div>
//               </FloatingCard>

//               {/* Rating badge */}
//               <FloatingCard className="absolute top-0 left-8 glass rounded-2xl px-4 py-3 z-30" delay={1.8}>
//                 <div className="flex items-center gap-2">
//                   <div className="text-yellow-400">★★★★★</div>
//                   <div>
//                     <div className="text-sm font-bold">4.9/5</div>
//                     <div className="text-xs text-white/40">500+ reviews</div>
//                   </div>
//                 </div>
//               </FloatingCard>

//               {/* Delivery badge */}
//               <FloatingCard className="absolute bottom-4 right-0 glass rounded-2xl px-4 py-3 z-30" delay={2.2}>
//                 <div className="flex items-center gap-2">
//                   <div className="w-8 h-8 rounded-full bg-[#25D366]/20 flex items-center justify-center">
//                     <Clock size={14} className="text-[#25D366]" />
//                   </div>
//                   <div>
//                     <div className="text-xs font-bold">15 min</div>
//                     <div className="text-[10px] text-white/40">delivery time</div>
//                   </div>
//                 </div>
//               </FloatingCard>
//             </div>
//           </div>
//         </div>

//         {/* Bottom fade */}
//         <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent z-10" />
//       </section>

//       {/* MENU */}
//       <section id="menu" className="py-24 relative">
//         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-[#FF6B35]/40 to-transparent" />
//         <div className="max-w-7xl mx-auto px-5 md:px-10">
//           <SectionReveal className="text-center mb-16">
//             <div className="text-[#FF6B35] text-sm font-semibold tracking-widest uppercase mb-3">Our Menu</div>
//             <h2 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
//               Crafted with{" "}
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B35] to-[#FFB347]">
//                 passion
//               </span>
//             </h2>
//             <p className="text-white/40 mt-4 max-w-md mx-auto">
//               Every dish is prepared fresh with premium ingredients. Taste the difference quality makes.
//             </p>
//           </SectionReveal>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {menuItems.map((item, i) => {
//               const ref = useRef(null);
//               const inView = useInView(ref, { once: true, margin: "-60px" });
//               return (
//                 <motion.div
//                   key={item.id}
//                   ref={ref}
//                   initial={{ opacity: 0, y: 60 }}
//                   animate={inView ? { opacity: 1, y: 0 } : {}}
//                   transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
//                   className="group relative rounded-3xl overflow-hidden glass border border-white/5 card-shine cursor-pointer"
//                   onHoverStart={() => setActiveMenu(item.id)}
//                   onHoverEnd={() => setActiveMenu(null)}
//                   whileHover={{ y: -6, scale: 1.01 }}
//                 >
//                   <div className="h-52 overflow-hidden relative">
//                     <motion.img
//                       src={item.img}
//                       alt={item.name}
//                       className="w-full h-full object-cover"
//                       whileHover={{ scale: 1.08 }}
//                       transition={{ duration: 0.5 }}
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
//                     <div
//                       className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold text-white"
//                       style={{ background: item.color + "33", border: `1px solid ${item.color}55` }}
//                     >
//                       {item.tag}
//                     </div>
//                   </div>

//                   <div className="p-5">
//                     <div className="flex items-start justify-between mb-2">
//                       <h3 className="text-lg font-bold">{item.name}</h3>
//                       <div className="flex items-center gap-1 text-yellow-400 text-sm">
//                         <Star size={13} fill="currentColor" />
//                         <span className="text-white/70 text-xs">{item.rating}</span>
//                       </div>
//                     </div>
//                     <p className="text-white/40 text-sm mb-5 leading-relaxed">{item.desc}</p>
//                     <div className="flex items-center justify-between">
//                       <span className="text-xl font-bold" style={{ color: item.color }}>
//                         {item.price}
//                       </span>
//                       <motion.a
//                         href={WHATSAPP_URL}
//                         target="_blank"
//                         rel="noreferrer"
//                         whileHover={{ scale: 1.05 }}
//                         whileTap={{ scale: 0.95 }}
//                         className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-[#25D366] to-[#128C7E] glow-green"
//                       >
//                         <FaWhatsapp size={14} />
//                         Order
//                       </motion.a>
//                     </div>
//                   </div>

//                   {/* Glow on hover */}
//                   <motion.div
//                     className="absolute inset-0 rounded-3xl pointer-events-none"
//                     animate={activeMenu === item.id ? { opacity: 1 } : { opacity: 0 }}
//                     style={{ boxShadow: `inset 0 0 0 1px ${item.color}40, 0 0 40px ${item.color}20` }}
//                   />
//                 </motion.div>
//               );
//             })}
//           </div>
//         </div>
//       </section>

//       {/* TODAY'S SPECIAL */}
//       <section className="py-20 relative overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-r from-[#FF6B35]/10 to-transparent" />
//         <div className="max-w-7xl mx-auto px-5 md:px-10">
//           <SectionReveal>
//             <div className="relative rounded-3xl overflow-hidden glass border border-[#FF6B35]/20">
//               <div className="grid md:grid-cols-2 gap-0">
//                 <div className="p-10 md:p-14 flex flex-col justify-center">
//                   <motion.div
//                     animate={{ scale: [1, 1.05, 1] }}
//                     transition={{ duration: 2, repeat: Infinity }}
//                     className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FF6B35]/20 border border-[#FF6B35]/40 text-[#FF6B35] text-sm font-semibold mb-6 w-fit"
//                   >
//                     <Flame size={14} />
//                     Today's Special
//                   </motion.div>

//                   <h2
//                     className="text-4xl md:text-5xl font-bold mb-4"
//                     style={{ fontFamily: "'Playfair Display', serif" }}
//                   >
//                     Suya Grilled
//                     <br />
//                     <span className="text-[#FF6B35]">Platter</span>
//                   </h2>

//                   <p className="text-white/50 mb-6 leading-relaxed">
//                     Our signature combo: suya-spiced chicken, smoky jollof rice, plantains, and a chilled zobo drink. The perfect Nigerian feast for two  now at a special price.
//                   </p>

//                   <div className="flex items-baseline gap-3 mb-8">
//                     <span className="text-4xl font-bold text-[#FF6B35]">₦5,500</span>
//                     <span className="text-white/30 line-through text-xl">₦7,200</span>
//                     <span className="px-2 py-0.5 rounded-full bg-[#FF6B35] text-white text-xs font-bold">24% OFF</span>
//                   </div>

//                   <a
//                     href={WHATSAPP_URL}
//                     target="_blank"
//                     rel="noreferrer"
//                     className="flex items-center gap-2.5 px-7 py-4 rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white font-semibold text-base glow-green hover:scale-105 transition-transform duration-300 w-fit"
//                   >
//                     <FaWhatsapp size={20} />
//                     Claim This Deal
//                   </a>
//                 </div>

//                 <div className="relative h-64 md:h-auto">
//                   <img
//                     src="https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=800&q=80"
//                     alt="Special"
//                     className="absolute inset-0 w-full h-full object-cover"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#0a0a0a]/60" />
//                 </div>
//               </div>
//             </div>
//           </SectionReveal>
//         </div>
//       </section>

//       {/* HOW IT WORKS */}
//       <section id="how-it-works" className="py-24">
//         <div className="max-w-7xl mx-auto px-5 md:px-10">
//           <SectionReveal className="text-center mb-16">
//             <div className="text-[#25D366] text-sm font-semibold tracking-widest uppercase mb-3">Process</div>
//             <h2 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
//               Order in{" "}
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#25D366] to-[#FFB347]">
//                 3 simple steps
//               </span>
//             </h2>
//           </SectionReveal>

//           <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
//             {/* Connecting line */}
//             <div className="hidden md:block absolute top-12 left-[calc(16.66%+24px)] right-[calc(16.66%+24px)] h-px bg-gradient-to-r from-[#FF6B35]/40 via-[#25D366]/40 to-[#FFB347]/40" />

//             {steps.map((step, i) => {
//               const ref = useRef(null);
//               const inView = useInView(ref, { once: true, margin: "-50px" });
//               return (
//                 <motion.div
//                   key={step.num}
//                   ref={ref}
//                   initial={{ opacity: 0, y: 50 }}
//                   animate={inView ? { opacity: 1, y: 0 } : {}}
//                   transition={{ duration: 0.65, delay: i * 0.15 }}
//                   className="relative glass rounded-3xl p-8 text-center hover:border-white/15 border border-white/5 transition-all duration-300 group"
//                   whileHover={{ y: -6 }}
//                 >
//                   <div
//                     className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300"
//                     style={{ background: step.color + "22", border: `1px solid ${step.color}44` }}
//                   >
//                     <span style={{ color: step.color }}>{step.icon}</span>
//                   </div>
//                   <div className="text-5xl font-bold text-white/5 absolute top-6 right-8">{step.num}</div>
//                   <h3 className="text-xl font-bold mb-3">{step.title}</h3>
//                   <p className="text-white/40 leading-relaxed text-sm">{step.desc}</p>
//                 </motion.div>
//               );
//             })}
//           </div>
//         </div>
//       </section>

//       {/* TESTIMONIALS */}
//       <section id="testimonials" className="py-24 bg-[#060606]">
//         <div className="max-w-7xl mx-auto px-5 md:px-10">
//           <SectionReveal className="text-center mb-16">
//             <div className="text-[#FFB347] text-sm font-semibold tracking-widest uppercase mb-3">Reviews</div>
//             <h2 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
//               What our customers{" "}
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B35] to-[#FFB347]">say</span>
//             </h2>
//           </SectionReveal>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {testimonials.map((t, i) => {
//               const ref = useRef(null);
//               const inView = useInView(ref, { once: true, margin: "-40px" });
//               return (
//                 <motion.div
//                   key={t.name}
//                   ref={ref}
//                   initial={{ opacity: 0, y: 50 }}
//                   animate={inView ? { opacity: 1, y: 0 } : {}}
//                   transition={{ duration: 0.6, delay: i * 0.12 }}
//                   whileHover={{ y: -5 }}
//                   className="glass rounded-3xl p-7 border border-white/5 hover:border-[#FF6B35]/20 transition-all duration-300"
//                 >
//                   <div className="flex gap-1 text-yellow-400 mb-5">
//                     {Array.from({ length: t.rating }).map((_, j) => (
//                       <Star key={j} size={14} fill="currentColor" />
//                     ))}
//                   </div>
//                   <p className="text-white/60 leading-relaxed mb-6 text-sm">"{t.text}"</p>
//                   <div className="flex items-center gap-3">
//                     <img
//                       src={t.img}
//                       alt={t.name}
//                       className="w-11 h-11 rounded-full object-cover border-2 border-[#FF6B35]/30"
//                     />
//                     <div>
//                       <div className="font-semibold text-sm">{t.name}</div>
//                       <div className="text-xs text-white/30">{t.role}</div>
//                     </div>
//                   </div>
//                 </motion.div>
//               );
//             })}
//           </div>
//         </div>
//       </section>

//       {/* CTA */}
//       <section className="py-28 relative overflow-hidden">
//         <div className="absolute inset-0 bg-gradient-to-br from-[#FF6B35]/15 via-transparent to-[#25D366]/10" />
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FF6B35] rounded-full blur-[200px] opacity-8" />

//         <div className="max-w-4xl mx-auto px-5 md:px-10 text-center relative z-10">
//           <SectionReveal>
//             <motion.div
//               animate={{ rotate: [0, 10, -10, 0] }}
//               transition={{ duration: 3, repeat: Infinity }}
//               className="text-6xl mb-8"
//             >
//               🍽️
//             </motion.div>

//             <h2
//               className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
//               style={{ fontFamily: "'Playfair Display', serif" }}
//             >
//               Hungry?{" "}
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B35] to-[#FFB347]">
//                 Your next meal
//               </span>
//               <br />
//               is one message away.
//             </h2>

//             <p className="text-white/40 text-lg mb-10 max-w-lg mx-auto">
//               Don't wait. Don't wonder. Just tap the button below and we'll take care of everything  fast, fresh, and unforgettable.
//             </p>

//             <motion.a
//               href={WHATSAPP_URL}
//               target="_blank"
//               rel="noreferrer"
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               className="inline-flex items-center gap-3 px-5 md:px-10 py-5 rounded-full bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white font-bold text-lg glow-green"
//             >
//               <FaWhatsapp size={24} />
//               Start Your Order Now
//               <ChevronRight size={20} />
//             </motion.a>

//             <p className="text-white/20 text-sm mt-6">No app download. No account needed. Just WhatsApp.</p>
//           </SectionReveal>
//         </div>
//       </section>

//       {/* FOOTER */}
//       <footer id="contact" className="border-t border-white/5 bg-[#050505] py-16">
//         <div className="max-w-7xl mx-auto px-5 md:px-10">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
//             {/* Brand */}
//             <div className="md:col-span-2">
//               <div className="flex items-center gap-2 mb-4">
//                 <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#FF6B35] to-[#FFB347] flex items-center justify-center">
//                   <Flame size={18} className="text-white" />
//                 </div>
//                 <span className="text-xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
//                   <span className="text-[#FF6B35]"> Arena</span>
//                 </span>
//               </div>
//               <p className="text-white/30 text-sm leading-relaxed mb-6 max-w-xs">
//                 Premium African street food, delivered to your door through WhatsApp. Real flavor, real fast.
//               </p>
//               <div className="flex gap-4">
//                 {[FaInstagram, FaTwitter, FaFacebook].map((Icon, i) => (
//                   <motion.a
//                     key={i}
//                     href="#"
//                     whileHover={{ scale: 1.2, color: "#FF6B35" }}
//                     className="w-10 h-10 glass rounded-full flex items-center justify-center text-white/40 hover:text-[#FF6B35] transition-colors"
//                   >
//                     <Icon size={16} />
//                   </motion.a>
//                 ))}
//               </div>
//             </div>

//             {/* Quick Links */}
//             <div>
//               <h4 className="font-semibold text-sm mb-4 text-white/60 tracking-widest uppercase">Quick Links</h4>
//               <div className="flex flex-col gap-3">
//                 {["Menu", "How It Works", "Testimonials", "Order Now"].map((link) => (
//                   <a
//                     key={link}
//                     href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
//                     className="text-white/30 hover:text-white text-sm transition-colors"
//                   >
//                     {link}
//                   </a>
//                 ))}
//               </div>
//             </div>

//             {/* Contact */}
//             <div>
//               <h4 className="font-semibold text-sm mb-4 text-white/60 tracking-widest uppercase">Contact</h4>
//               <div className="flex flex-col gap-3">
//                 <div className="flex items-start gap-2 text-sm text-white/30">
//                   <MapPin size={14} className="mt-0.5 shrink-0 text-[#FF6B35]" />
//                   Malete, Kwara State, Nigeria
//                 </div>
//                 <div className="flex items-center gap-2 text-sm text-white/30">
//                   <Phone size={14} className="shrink-0 text-[#FF6B35]" />
//                   +234 000 000 0000
//                 </div>
//                 <div className="flex items-center gap-2 text-sm text-white/30">
//                   <FaWhatsapp size={14} className="shrink-0 text-[#25D366]" />
//                   WhatsApp Orders
//                 </div>
//                 <div className="mt-2">
//                   <div className="text-xs text-white/20 mb-1">Opening Hours</div>
//                   <div className="text-sm text-white/40">Daily: 9am – 10pm</div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
//             <p className="text-white/20 text-xs">
//               © 2026 Arena. All rights reserved.
//             </p>
//             <p className="text-white/10 text-xs">
//               Made with ❤️ for premium food lovers
//             </p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }


// "use client";

// import { useEffect, useRef, useState, useCallback } from "react";
// import { motion, useScroll, useTransform, AnimatePresence, useInView } from "framer-motion";
// import {
//   Heart, Globe, BookOpen, Utensils, Stethoscope, Users, Shield, Building2,
//   ChevronDown, Menu, X, Star, ArrowRight, MapPin, Phone, Mail, Clock,
//   Send, Leaf, Zap, CheckCircle, TrendingUp, Award
// } from "lucide-react";
// import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
// import { FiExternalLink } from "react-icons/fi";
// import { MdVolunteerActivism, MdHandshake } from "react-icons/md";

// // ─── Types ───────────────────────────────────────────────────────────────────
// interface NavItem { label: string; href: string; }
// interface Program { title: string; desc: string; icon: React.ReactNode; img: string; color: string; }
// interface Stat { value: string; label: string; icon: React.ReactNode; }
// interface Step { num: string; title: string; desc: string; icon: React.ReactNode; }
// interface Testimonial { name: string; role: string; quote: string; img: string; rating: number; }

// // ─── Constants ────────────────────────────────────────────────────────────────
// const NAV_ITEMS: NavItem[] = [
//   { label: "Home", href: "#home" },
//   { label: "About", href: "#about" },
//   { label: "Programs", href: "#programs" },
//   { label: "Impact", href: "#impact" },
//   { label: "Stories", href: "#testimonials" },
//   { label: "Contact", href: "#contact" },
// ];

// const PROGRAMS: Program[] = [
//   {
//     title: "Education Support",
//     desc: "Providing access to quality education, scholarships, school supplies, and trained educators to underserved children across conflict-affected regions.",
//     icon: <BookOpen size={22} />,
//     img: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&q=80",
//     color: "from-sky-500/20 to-blue-600/20",
//   },
//   {
//     title: "Food Relief",
//     desc: "Delivering emergency food packages, nutritional support, and sustainable food programs to families facing hunger and food insecurity.",
//     icon: <Utensils size={22} />,
//     img: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&q=80",
//     color: "from-amber-500/20 to-orange-600/20",
//   },
//   {
//     title: "Healthcare Outreach",
//     desc: "Mobilizing medical teams, free clinics, vaccinations, and maternal health programs to communities with zero access to formal healthcare.",
//     icon: <Stethoscope size={22} />,
//     img: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&q=80",
//     color: "from-emerald-500/20 to-teal-600/20",
//   },
//   {
//     title: "Women Empowerment",
//     desc: "Building economic independence, legal literacy, and leadership skills among women in marginalized communities through targeted programs.",
//     icon: <Heart size={22} />,
//     img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80",
//     color: "from-rose-500/20 to-pink-600/20",
//   },
//   {
//     title: "Child Protection",
//     desc: "Shielding vulnerable children from exploitation, abuse, and neglect through advocacy, safe houses, and psychosocial support services.",
//     icon: <Shield size={22} />,
//     img: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=800&q=80",
//     color: "from-violet-500/20 to-purple-600/20",
//   },
//   {
//     title: "Community Development",
//     desc: "Building infrastructure, clean water access, sanitation, and social cohesion frameworks that uplift entire communities for generations.",
//     icon: <Building2 size={22} />,
//     img: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?w=800&q=80",
//     color: "from-cyan-500/20 to-sky-600/20",
//   },
// ];

// const STATS: Stat[] = [
//   { value: "25,000+", label: "Lives Reached", icon: <Users size={20} /> },
//   { value: "120+", label: "Communities Supported", icon: <Globe size={20} /> },
//   { value: "10 Yrs", label: "Humanitarian Impact", icon: <Award size={20} /> },
// ];

// const STEPS: Step[] = [
//   {
//     num: "01",
//     title: "Identify Communities in Need",
//     desc: "Our field teams and global partners conduct rigorous needs assessments, mapping the most vulnerable populations across crisis zones and underserved regions.",
//     icon: <MapPin size={26} />,
//   },
//   {
//     num: "02",
//     title: "Deliver Humanitarian Support",
//     desc: "We mobilize resources swiftly — food, medicine, education, protection — through coordinated ground operations and trusted local partner networks.",
//     icon: <MdVolunteerActivism size={26} />,
//   },
//   {
//     num: "03",
//     title: "Create Sustainable Impact",
//     desc: "Beyond emergency relief, we build lasting systems: schools, clinics, cooperatives, and community structures that thrive independently.",
//     icon: <Leaf size={26} />,
//   },
// ];

// const TESTIMONIALS: Testimonial[] = [
//   {
//     name: "Amara Diallo",
//     role: "Program Beneficiary, Sierra Leone",
//     quote: "Before Horizon Humanity came to our village, I had given up on my children going to school. Today, my daughter is studying to become a nurse. This foundation gave us back our future.",
//     img: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&q=80",
//     rating: 5,
//   },
//   {
//     name: "Dr. James Okafor",
//     role: "Medical Volunteer, Nigeria",
//     quote: "I have volunteered with many organizations across Africa, but Horizon Humanity's operational precision and genuine human-first approach is extraordinary. Every dollar here creates real change.",
//     img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&q=80",
//     rating: 5,
//   },
//   {
//     name: "Sophie Marchetti",
//     role: "Major Donor, Italy",
//     quote: "As someone who has donated to dozens of NGOs, I can say with complete confidence that Horizon Humanity's transparency and measurable outcomes are unlike anything I have ever seen.",
//     img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80",
//     rating: 5,
//   },
//   {
//     name: "Kwame Asante",
//     role: "Community Leader, Ghana",
//     quote: "They did not just bring aid — they trained us, equipped us, and trusted us to lead. Our community is now running its own nutrition program. We are the change they helped us become.",
//     img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
//     rating: 5,
//   },
// ];

// const IMPACT_STATS = [
//   { value: 25000, suffix: "+", label: "Lives Directly Reached", icon: <Heart size={18} /> },
//   { value: 120, suffix: "+", label: "Communities Transformed", icon: <Globe size={18} /> },
//   { value: 47, suffix: "", label: "Countries Served", icon: <MapPin size={18} /> },
//   { value: 98, suffix: "%", label: "Funds to Programs", icon: <TrendingUp size={18} /> },
//   { value: 3200, suffix: "+", label: "Active Volunteers", icon: <Users size={18} /> },
//   { value: 850, suffix: "+", label: "Partner Organizations", icon: <Building2 size={18} /> },
// ];

// const DONATE_URL = "https://wa.me/2340000000000?text=Hello%20I%20would%20like%20to%20support%20your%20mission";

// // ─── Animated Counter ─────────────────────────────────────────────────────────
// function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
//   const [count, setCount] = useState(0);
//   const ref = useRef<HTMLSpanElement>(null);
//   const inView = useInView(ref, { once: true });

//   useEffect(() => {
//     if (!inView) return;
//     const duration = 2000;
//     const steps = 60;
//     const increment = value / steps;
//     let current = 0;
//     const timer = setInterval(() => {
//       current += increment;
//       if (current >= value) {
//         setCount(value);
//         clearInterval(timer);
//       } else {
//         setCount(Math.floor(current));
//       }
//     }, duration / steps);
//     return () => clearInterval(timer);
//   }, [inView, value]);

//   return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
// }

// // ─── Particle Canvas ──────────────────────────────────────────────────────────
// function ParticleCanvas() {
//   const canvasRef = useRef<HTMLCanvasElement>(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;

//     let animId: number;
//     const particles: { x: number; y: number; vx: number; vy: number; r: number; alpha: number }[] = [];
//     const COUNT = 80;

//     const resize = () => {
//       canvas.width = window.innerWidth;
//       canvas.height = window.innerHeight;
//     };
//     resize();
//     window.addEventListener("resize", resize);

//     for (let i = 0; i < COUNT; i++) {
//       particles.push({
//         x: Math.random() * canvas.width,
//         y: Math.random() * canvas.height,
//         vx: (Math.random() - 0.5) * 0.4,
//         vy: (Math.random() - 0.5) * 0.4,
//         r: Math.random() * 2 + 0.5,
//         alpha: Math.random() * 0.5 + 0.1,
//       });
//     }

//     const draw = () => {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
//       particles.forEach((p) => {
//         p.x += p.vx;
//         p.y += p.vy;
//         if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
//         if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

//         ctx.beginPath();
//         ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
//         ctx.fillStyle = `rgba(147, 197, 253, ${p.alpha})`;
//         ctx.fill();
//       });

//       // Draw connections
//       for (let i = 0; i < particles.length; i++) {
//         for (let j = i + 1; j < particles.length; j++) {
//           const dx = particles[i].x - particles[j].x;
//           const dy = particles[i].y - particles[j].y;
//           const dist = Math.sqrt(dx * dx + dy * dy);
//           if (dist < 120) {
//             ctx.beginPath();
//             ctx.moveTo(particles[i].x, particles[i].y);
//             ctx.lineTo(particles[j].x, particles[j].y);
//             ctx.strokeStyle = `rgba(147, 197, 253, ${0.12 * (1 - dist / 120)})`;
//             ctx.lineWidth = 0.5;
//             ctx.stroke();
//           }
//         }
//       }
//       animId = requestAnimationFrame(draw);
//     };
//     draw();

//     return () => {
//       cancelAnimationFrame(animId);
//       window.removeEventListener("resize", resize);
//     };
//   }, []);

//   return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }} />;
// }

// // ─── Navbar ───────────────────────────────────────────────────────────────────
// function Navbar() {
//   const [scrolled, setScrolled] = useState(false);
//   const [open, setOpen] = useState(false);

//   useEffect(() => {
//     const handler = () => setScrolled(window.scrollY > 30);
//     window.addEventListener("scroll", handler);
//     return () => window.removeEventListener("scroll", handler);
//   }, []);

//   const scrollTo = (href: string) => {
//     document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
//     setOpen(false);
//   };

//   return (
//     <>
//       <motion.nav
//         initial={{ y: -80, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ duration: 0.7, ease: "easeOut" }}
//         className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
//           scrolled
//             ? "bg-slate-950/80 backdrop-blur-xl border-b border-white/5 shadow-2xl"
//             : "bg-transparent"
//         }`}
//       >
//         <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between h-16 sm:h-20">
//           {/* Logo */}
//           <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => scrollTo("#home")}>
//             <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-400 to-teal-500 flex items-center justify-center shadow-lg shadow-sky-500/30">
//               <Globe size={18} className="text-white" />
//             </div>
//             <div className="flex flex-col leading-none">
//               <span className="text-white font-bold text-sm tracking-wide" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>HORIZON</span>
//               <span className="text-sky-400 text-[10px] tracking-[0.15em] uppercase font-medium">Humanity Foundation</span>
//             </div>
//           </div>

//           {/* Desktop Nav */}
//           <div className="hidden lg:flex items-center gap-1">
//             {NAV_ITEMS.map((item) => (
//               <button
//                 key={item.label}
//                 onClick={() => scrollTo(item.href)}
//                 className="px-4 py-2 text-slate-300 hover:text-white text-sm font-medium transition-colors duration-200 rounded-lg hover:bg-white/5"
//               >
//                 {item.label}
//               </button>
//             ))}
//           </div>

//           {/* Donate CTA */}
//           <div className="hidden lg:block">
//             <a
//               href={DONATE_URL}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white overflow-hidden group"
//               style={{ background: "linear-gradient(135deg, #0ea5e9, #14b8a6)" }}
//             >
//               <span className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300" />
//               <Heart size={14} />
//               Donate Now
//             </a>
//           </div>

//           {/* Mobile Hamburger */}
//           <button
//             className="lg:hidden text-white p-2 rounded-lg hover:bg-white/10 transition"
//             onClick={() => setOpen(!open)}
//           >
//             {open ? <X size={22} /> : <Menu size={22} />}
//           </button>
//         </div>
//       </motion.nav>

//       {/* Mobile Menu */}
//       <AnimatePresence>
//         {open && (
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             transition={{ duration: 0.3 }}
//             className="fixed inset-0 z-40 bg-slate-950/95 backdrop-blur-xl flex flex-col pt-24 px-8 gap-2"
//           >
//             {NAV_ITEMS.map((item, i) => (
//               <motion.button
//                 key={item.label}
//                 initial={{ opacity: 0, x: -20 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: i * 0.06 }}
//                 onClick={() => scrollTo(item.href)}
//                 className="text-left text-xl font-semibold text-white py-3 border-b border-white/5 hover:text-sky-400 transition-colors"
//                 style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
//               >
//                 {item.label}
//               </motion.button>
//             ))}
//             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mt-8">
//               <a
//                 href={DONATE_URL}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl text-white font-bold text-lg"
//                 style={{ background: "linear-gradient(135deg, #0ea5e9, #14b8a6)" }}
//               >
//                 <Heart size={18} /> Donate Now
//               </a>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// }

// // ─── Hero ─────────────────────────────────────────────────────────────────────
// function Hero() {
//   const { scrollY } = useScroll();
//   const y = useTransform(scrollY, [0, 600], [0, 120]);

//   return (
//     <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950">
//       {/* Deep gradient background */}
//       <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
//       <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(14,165,233,0.12) 0%, transparent 70%)" }} />
//       <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 50% 50% at 80% 80%, rgba(20,184,166,0.08) 0%, transparent 60%)" }} />

//       {/* Particle canvas */}
//       <ParticleCanvas />

//       {/* Hero image overlay */}
//       <motion.div style={{ y }} className="absolute inset-0 z-0">
//         <div
//           className="absolute inset-0 bg-cover bg-center opacity-10"
//           style={{ backgroundImage: "url('https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=1600&q=80')" }}
//         />
//         <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
//       </motion.div>

//       {/* Content */}
//       <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 pt-24 pb-16 flex flex-col items-center text-center">
//         {/* Badge */}
//         <motion.div
//           initial={{ opacity: 0, scale: 0.8 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.6 }}
//           className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-sky-500/30 bg-sky-500/10 text-sky-400 text-xs font-semibold tracking-widest uppercase mb-8"
//         >
//           <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
//           Humanitarian Action Since 2014
//         </motion.div>

//         {/* Headline */}
//         <motion.h1
//           initial={{ opacity: 0, y: 40 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.9, delay: 0.1 }}
//           className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-6 leading-[1.05] tracking-tight"
//           style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
//         >
//           Changing Lives Through{" "}
//           <span className="bg-gradient-to-r from-sky-400 to-teal-400 bg-clip-text text-transparent">
//             Compassion
//           </span>{" "}
//           &{" "}
//           <span className="bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
//             Action
//           </span>
//         </motion.h1>

//         {/* Subtitle */}
//         <motion.p
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, delay: 0.25 }}
//           className="text-slate-300 text-base sm:text-lg lg:text-xl max-w-2xl mb-10 leading-relaxed"
//         >
//           Empowering vulnerable communities through education, healthcare, food support, and humanitarian outreach — across borders, with purpose.
//         </motion.p>

//         {/* CTAs */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.7, delay: 0.4 }}
//           className="flex flex-col sm:flex-row gap-4 mb-16"
//         >
//           <a
//             href={DONATE_URL}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-white font-bold text-base overflow-hidden shadow-2xl shadow-sky-500/20 hover:shadow-sky-500/40 transition-all duration-300 hover:scale-105"
//             style={{ background: "linear-gradient(135deg, #0ea5e9, #14b8a6)" }}
//           >
//             <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
//             <Heart size={16} />
//             Support Our Mission
//           </a>
//           <button
//             onClick={() => document.querySelector("#impact")?.scrollIntoView({ behavior: "smooth" })}
//             className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl border border-white/10 text-white font-semibold text-base hover:bg-white/5 hover:border-white/20 transition-all duration-300 backdrop-blur-sm"
//           >
//             Explore Our Impact
//             <ArrowRight size={16} />
//           </button>
//         </motion.div>

//         {/* Stats row */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8, delay: 0.6 }}
//           className="grid grid-cols-3 gap-4 sm:gap-8 w-full max-w-2xl"
//         >
//           {STATS.map((s, i) => (
//             <div key={i} className="flex flex-col items-center gap-1 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
//               <span className="text-sky-400 mb-1">{s.icon}</span>
//               <span className="text-white font-bold text-xl sm:text-2xl" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{s.value}</span>
//               <span className="text-slate-400 text-xs text-center leading-tight">{s.label}</span>
//             </div>
//           ))}
//         </motion.div>

//         {/* Scroll cue */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 1.4 }}
//           className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-500 flex flex-col items-center gap-1"
//         >
//           <span className="text-[10px] tracking-widest uppercase">Scroll</span>
//           <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
//             <ChevronDown size={16} />
//           </motion.div>
//         </motion.div>
//       </div>
//     </section>
//   );
// }

// // ─── Scroll reveal wrapper ────────────────────────────────────────────────────
// function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
//   const ref = useRef(null);
//   const inView = useInView(ref, { once: true, margin: "-80px" });
//   return (
//     <motion.div
//       ref={ref}
//       initial={{ opacity: 0, y: 40 }}
//       animate={inView ? { opacity: 1, y: 0 } : {}}
//       transition={{ duration: 0.7, delay, ease: "easeOut" }}
//     >
//       {children}
//     </motion.div>
//   );
// }

// // ─── About ────────────────────────────────────────────────────────────────────
// function About() {
//   return (
//     <section id="about" className="py-24 sm:py-32 bg-white relative overflow-hidden">
//       {/* decorative */}
//       <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-sky-50 blur-3xl opacity-60 -translate-y-1/2 translate-x-1/3" />
//       <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-teal-50 blur-3xl opacity-60 translate-y-1/2 -translate-x-1/4" />

//       <div className="max-w-7xl mx-auto px-5 sm:px-8 relative">
//         <div className="grid lg:grid-cols-2 gap-16 items-center">
//           {/* Images */}
//           <Reveal>
//             <div className="relative">
//               <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-slate-200">
//                 <img
//                   src="https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=800&q=80"
//                   alt="Community work"
//                   className="w-full h-80 sm:h-96 object-cover"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
//               </div>
//               {/* floating card */}
//               <motion.div
//                 animate={{ y: [0, -8, 0] }}
//                 transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
//                 className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-5 border border-slate-100 max-w-[200px]"
//               >
//                 <div className="flex items-center gap-2 mb-2">
//                   <div className="w-8 h-8 rounded-full bg-gradient-to-br from-sky-400 to-teal-500 flex items-center justify-center">
//                     <CheckCircle size={16} className="text-white" />
//                   </div>
//                   <span className="font-bold text-slate-800 text-sm">Verified NGO</span>
//                 </div>
//                 <p className="text-xs text-slate-500 leading-relaxed">UN-registered & internationally certified humanitarian organization.</p>
//               </motion.div>
//               {/* second image */}
//               <div className="absolute -top-6 -left-6 w-32 h-32 rounded-2xl overflow-hidden shadow-xl border-4 border-white">
//                 <img src="https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=300&q=80" alt="Field work" className="w-full h-full object-cover" />
//               </div>
//             </div>
//           </Reveal>

//           {/* Text */}
//           <div>
//             <Reveal delay={0.1}>
//               <span className="inline-block text-sky-600 text-xs font-bold tracking-widest uppercase mb-3">Our Story</span>
//               <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6 leading-tight" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
//                 A Decade of Standing With the Vulnerable
//               </h2>
//             </Reveal>
//             <Reveal delay={0.2}>
//               <p className="text-slate-600 text-base leading-relaxed mb-6">
//                 Founded in 2014 by a coalition of humanitarian professionals, Horizon Humanity Foundation was born from a simple but urgent conviction: that every person, regardless of geography or circumstance, deserves dignity, safety, and opportunity. What began as a small emergency response team in West Africa has grown into a globally-recognized humanitarian force operating across 47 countries.
//               </p>
//             </Reveal>
//             <Reveal delay={0.3}>
//               <p className="text-slate-600 text-base leading-relaxed mb-8">
//                 We believe that sustainable impact is not delivered — it is built together with communities, honoring their knowledge, leadership, and resilience.
//               </p>
//             </Reveal>

//             {/* Mission / Vision */}
//             <div className="grid sm:grid-cols-2 gap-4">
//               {[
//                 {
//                   label: "Our Mission",
//                   text: "To deliver life-saving humanitarian support while building long-term community resilience across the world's most vulnerable regions.",
//                   icon: <Heart size={18} />,
//                   bg: "bg-sky-50",
//                   border: "border-sky-100",
//                   iconBg: "from-sky-400 to-blue-500",
//                 },
//                 {
//                   label: "Our Vision",
//                   text: "A world where every human being lives in safety, health, and dignity — free from poverty, conflict, and exclusion.",
//                   icon: <Globe size={18} />,
//                   bg: "bg-teal-50",
//                   border: "border-teal-100",
//                   iconBg: "from-teal-400 to-emerald-500",
//                 },
//               ].map((item, i) => (
//                 <Reveal key={i} delay={0.4 + i * 0.1}>
//                   <div className={`${item.bg} ${item.border} border rounded-2xl p-5`}>
//                     <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${item.iconBg} flex items-center justify-center text-white mb-3`}>
//                       {item.icon}
//                     </div>
//                     <h4 className="font-bold text-slate-800 text-sm mb-2">{item.label}</h4>
//                     <p className="text-slate-600 text-xs leading-relaxed">{item.text}</p>
//                   </div>
//                 </Reveal>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// // ─── Programs ─────────────────────────────────────────────────────────────────
// function Programs() {
//   return (
//     <section id="programs" className="py-24 sm:py-32 bg-slate-50">
//       <div className="max-w-7xl mx-auto px-5 sm:px-8">
//         <Reveal>
//           <div className="text-center mb-16">
//             <span className="text-sky-600 text-xs font-bold tracking-widest uppercase">What We Do</span>
//             <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mt-3 mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
//               Our Core Programs
//             </h2>
//             <p className="text-slate-500 max-w-xl mx-auto text-base leading-relaxed">
//               Six pillars of intervention, designed to address the most critical dimensions of human suffering and community flourishing.
//             </p>
//           </div>
//         </Reveal>

//         <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {PROGRAMS.map((p, i) => (
//             <Reveal key={p.title} delay={i * 0.08}>
//               <motion.div
//                 whileHover={{ y: -6, scale: 1.02 }}
//                 transition={{ duration: 0.3 }}
//                 className="group relative bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl hover:shadow-slate-200 border border-slate-100 transition-all duration-400 cursor-pointer"
//               >
//                 {/* Image */}
//                 <div className="relative h-48 overflow-hidden">
//                   <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
//                   <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
//                   <div className={`absolute inset-0 bg-gradient-to-br ${p.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
//                 </div>

//                 {/* Content */}
//                 <div className="p-6">
//                   <div className="flex items-center gap-3 mb-3">
//                     <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-teal-500 flex items-center justify-center text-white shadow-lg shadow-sky-200 group-hover:shadow-sky-300 transition-shadow">
//                       {p.icon}
//                     </div>
//                     <h3 className="font-bold text-slate-900 text-base group-hover:text-sky-700 transition-colors" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
//                       {p.title}
//                     </h3>
//                   </div>
//                   <p className="text-slate-500 text-sm leading-relaxed">{p.desc}</p>
//                   <div className="mt-4 flex items-center gap-1.5 text-sky-600 font-semibold text-xs group-hover:gap-3 transition-all duration-300">
//                     Learn More <ArrowRight size={12} />
//                   </div>
//                 </div>
//               </motion.div>
//             </Reveal>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// // ─── How We Help ──────────────────────────────────────────────────────────────
// function HowWeHelp() {
//   return (
//     <section className="py-24 sm:py-32 bg-slate-950 relative overflow-hidden">
//       <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(14,165,233,0.07) 0%, transparent 70%)" }} />
//       <div className="max-w-7xl mx-auto px-5 sm:px-8 relative">
//         <Reveal>
//           <div className="text-center mb-16">
//             <span className="text-sky-400 text-xs font-bold tracking-widest uppercase">Our Approach</span>
//             <h2 className="text-4xl sm:text-5xl font-bold text-white mt-3 mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
//               How We Create Change
//             </h2>
//             <p className="text-slate-400 max-w-xl mx-auto text-base leading-relaxed">
//               A proven three-stage methodology that moves from crisis to transformation.
//             </p>
//           </div>
//         </Reveal>

//         <div className="relative grid lg:grid-cols-3 gap-8">
//           {/* Connecting line */}
//           <div className="hidden lg:block absolute top-1/3 left-[16.67%] right-[16.67%] h-px bg-gradient-to-r from-sky-500/50 via-teal-500/50 to-emerald-500/50" />

//           {STEPS.map((step, i) => (
//             <Reveal key={step.num} delay={i * 0.15}>
//               <motion.div
//                 whileHover={{ scale: 1.03 }}
//                 transition={{ duration: 0.3 }}
//                 className="relative p-8 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/8 hover:border-white/20 transition-all group"
//               >
//                 {/* Step number */}
//                 <div className="absolute -top-4 left-8 bg-gradient-to-br from-sky-500 to-teal-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg shadow-sky-500/30">
//                   {step.num}
//                 </div>

//                 <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-500/20 to-teal-500/20 border border-sky-500/30 flex items-center justify-center text-sky-400 mb-6 group-hover:scale-110 transition-transform">
//                   {step.icon}
//                 </div>

//                 <h3 className="text-white font-bold text-xl mb-3" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
//                   {step.title}
//                 </h3>
//                 <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
//               </motion.div>
//             </Reveal>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// // ─── Impact ───────────────────────────────────────────────────────────────────
// function Impact() {
//   return (
//     <section id="impact" className="py-24 sm:py-32 bg-white relative overflow-hidden">
//       <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-sky-50 blur-3xl opacity-50 -translate-y-1/2" />
//       <div className="max-w-7xl mx-auto px-5 sm:px-8 relative">
//         <Reveal>
//           <div className="text-center mb-16">
//             <span className="text-sky-600 text-xs font-bold tracking-widest uppercase">Our Impact</span>
//             <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mt-3 mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
//               Numbers That Tell Human Stories
//             </h2>
//             <p className="text-slate-500 max-w-xl mx-auto text-base leading-relaxed">
//               Every statistic represents a real person, a transformed community, a life rebuilt with dignity.
//             </p>
//           </div>
//         </Reveal>

//         <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
//           {IMPACT_STATS.map((s, i) => (
//             <Reveal key={s.label} delay={i * 0.1}>
//               <motion.div
//                 whileHover={{ scale: 1.04 }}
//                 className="relative p-6 sm:p-8 rounded-3xl border border-slate-100 bg-gradient-to-br from-white to-slate-50 shadow-md hover:shadow-xl hover:shadow-slate-100 transition-all group overflow-hidden"
//               >
//                 <div className="absolute inset-0 bg-gradient-to-br from-sky-500/0 to-teal-500/0 group-hover:from-sky-500/5 group-hover:to-teal-500/5 transition-all duration-500" />
//                 <div className="flex items-center gap-2 text-sky-500 mb-3">
//                   {s.icon}
//                   <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide">{s.label}</span>
//                 </div>
//                 <div className="text-3xl sm:text-4xl font-bold text-slate-900" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
//                   <AnimatedCounter value={s.value} suffix={s.suffix} />
//                 </div>
//               </motion.div>
//             </Reveal>
//           ))}
//         </div>

//         {/* Additional impact imagery */}
//         <Reveal delay={0.3}>
//           <div className="mt-16 grid sm:grid-cols-3 gap-4 rounded-3xl overflow-hidden">
//             {[
//               "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=600&q=80",
//               "https://images.unsplash.com/photo-1524069290683-0457abfe42c3?w=600&q=80",
//               "https://images.unsplash.com/photo-1578357078586-491adf1aa5ba?w=600&q=80",
//             ].map((src, i) => (
//               <div key={i} className="relative h-48 overflow-hidden rounded-2xl">
//                 <img src={src} alt="Impact" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
//                 <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
//               </div>
//             ))}
//           </div>
//         </Reveal>
//       </div>
//     </section>
//   );
// }

// // ─── Testimonials ─────────────────────────────────────────────────────────────
// function Testimonials() {
//   const [active, setActive] = useState(0);

//   return (
//     <section id="testimonials" className="py-24 sm:py-32 bg-slate-50 relative overflow-hidden">
//       <div className="max-w-7xl mx-auto px-5 sm:px-8">
//         <Reveal>
//           <div className="text-center mb-16">
//             <span className="text-sky-600 text-xs font-bold tracking-widest uppercase">Human Stories</span>
//             <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mt-3 mb-4" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
//               Voices of Change
//             </h2>
//           </div>
//         </Reveal>

//         <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
//           {TESTIMONIALS.map((t, i) => (
//             <Reveal key={t.name} delay={i * 0.1}>
//               <motion.div
//                 whileHover={{ y: -6 }}
//                 className="bg-white rounded-3xl p-6 shadow-md hover:shadow-xl transition-all border border-slate-100 flex flex-col h-full"
//               >
//                 {/* Stars */}
//                 <div className="flex gap-0.5 mb-4">
//                   {Array.from({ length: t.rating }).map((_, j) => (
//                     <Star key={j} size={13} className="text-amber-400 fill-amber-400" />
//                   ))}
//                 </div>
//                 <p className="text-slate-600 text-sm leading-relaxed flex-1 mb-5 italic">&ldquo;{t.quote}&rdquo;</p>
//                 <div className="flex items-center gap-3">
//                   <img src={t.img} alt={t.name} className="w-10 h-10 rounded-full object-cover border-2 border-sky-100" />
//                   <div>
//                     <div className="font-bold text-slate-900 text-sm">{t.name}</div>
//                     <div className="text-slate-400 text-xs">{t.role}</div>
//                   </div>
//                 </div>
//               </motion.div>
//             </Reveal>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// // ─── Emergency Appeal ─────────────────────────────────────────────────────────
// function EmergencyAppeal() {
//   return (
//     <section className="py-20 sm:py-28 bg-slate-950 relative overflow-hidden">
//       <div className="absolute inset-0">
//         <img
//           src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=1600&q=80"
//           alt="Emergency"
//           className="w-full h-full object-cover opacity-20"
//         />
//         <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-950/80" />
//       </div>

//       <div className="relative max-w-4xl mx-auto px-5 sm:px-8 text-center">
//         <Reveal>
//           <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold tracking-widest uppercase mb-8 animate-pulse">
//             <Zap size={12} />
//             Current Emergency Appeal
//           </div>
//           <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
//             Displaced Families Need Your Help{" "}
//             <span className="text-red-400">Right Now</span>
//           </h2>
//           <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-4 max-w-2xl mx-auto">
//             Thousands of families displaced by conflict and climate crisis are without food, clean water, or shelter. Our emergency teams are on the ground — but we need resources immediately.
//           </p>
//           <p className="text-slate-400 text-sm mb-10 max-w-xl mx-auto">
//             Help provide emergency food packages, medical aid, and temporary shelter to displaced families in active crisis zones across three continents.
//           </p>

//           <a
//             href={DONATE_URL}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-2xl text-white font-bold text-lg overflow-hidden shadow-2xl shadow-red-500/20 hover:shadow-red-500/40 transition-all duration-300 hover:scale-105"
//             style={{ background: "linear-gradient(135deg, #ef4444, #f97316)" }}
//           >
//             <span className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all duration-300" />
//             <Heart size={20} />
//             Respond to the Emergency
//             <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
//           </a>
//         </Reveal>
//       </div>
//     </section>
//   );
// }

// // ─── CTA Section ──────────────────────────────────────────────────────────────
// function CTA() {
//   return (
//     <section className="py-24 sm:py-32 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #0c4a6e 0%, #0e7490 50%, #0f766e 100%)" }}>
//       <div className="absolute inset-0 opacity-10">
//         <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-white blur-3xl" />
//         <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-white blur-3xl" />
//       </div>

//       <div className="relative max-w-4xl mx-auto px-5 sm:px-8 text-center">
//         <Reveal>
//           <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
//             Your Support Can Change Someone&apos;s Entire Future Today
//           </h2>
//           <p className="text-sky-100 text-base sm:text-lg mb-10 max-w-xl mx-auto leading-relaxed">
//             Whether you donate, volunteer, or spread the word — every action creates a ripple of humanity that reaches far beyond what you can see.
//           </p>

//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <a
//               href={DONATE_URL}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="group relative inline-flex items-center justify-center gap-2 px-9 py-4 rounded-2xl bg-white text-slate-900 font-bold text-base shadow-2xl hover:shadow-white/20 hover:scale-105 transition-all duration-300 overflow-hidden"
//             >
//               <span className="absolute inset-0 bg-gradient-to-r from-sky-500/0 via-teal-500/10 to-sky-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
//               <Heart size={16} className="text-rose-500" />
//               Donate Now
//             </a>
//             <button className="inline-flex items-center justify-center gap-2 px-9 py-4 rounded-2xl border-2 border-white/40 text-white font-bold text-base hover:bg-white/10 hover:border-white/60 transition-all duration-300">
//               <Users size={16} />
//               Become a Volunteer
//             </button>
//           </div>
//         </Reveal>
//       </div>
//     </section>
//   );
// }

// // ─── Footer ───────────────────────────────────────────────────────────────────
// function Footer() {
//   const [email, setEmail] = useState("");

//   return (
//     <footer id="contact" className="bg-slate-950 border-t border-white/5 pt-20 pb-8">
//       <div className="max-w-7xl mx-auto px-5 sm:px-8">
//         <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
//           {/* Brand */}
//           <div className="lg:col-span-1">
//             <div className="flex items-center gap-2.5 mb-5">
//               <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-400 to-teal-500 flex items-center justify-center">
//                 <Globe size={18} className="text-white" />
//               </div>
//               <div className="flex flex-col leading-none">
//                 <span className="text-white font-bold text-sm tracking-wide" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>HORIZON</span>
//                 <span className="text-sky-400 text-[10px] tracking-[0.15em] uppercase font-medium">Humanity Foundation</span>
//               </div>
//             </div>
//             <p className="text-slate-400 text-sm leading-relaxed mb-6">
//               Standing with the vulnerable. Building resilient communities. Creating lasting humanitarian change since 2014.
//             </p>
//             <div className="flex gap-3">
//               {[
//                 { icon: <FaFacebookF size={14} />, href: "#" },
//                 { icon: <FaTwitter size={14} />, href: "#" },
//                 { icon: <FaInstagram size={14} />, href: "#" },
//                 { icon: <FaLinkedinIn size={14} />, href: "#" },
//                 { icon: <FaYoutube size={14} />, href: "#" },
//               ].map((s, i) => (
//                 <a
//                   key={i}
//                   href={s.href}
//                   className="w-9 h-9 rounded-xl bg-white/5 hover:bg-sky-500/20 hover:text-sky-400 text-slate-400 flex items-center justify-center transition-all duration-200"
//                 >
//                   {s.icon}
//                 </a>
//               ))}
//             </div>
//           </div>

//           {/* Quick Links */}
//           <div>
//             <h4 className="text-white font-bold text-sm mb-5 tracking-wide">Quick Links</h4>
//             <ul className="space-y-3">
//               {["About Us", "Our Programs", "Impact Stories", "Volunteer", "Donate", "Annual Reports", "Press Room"].map((link) => (
//                 <li key={link}>
//                   <a href="#" className="text-slate-400 text-sm hover:text-sky-400 transition-colors flex items-center gap-1.5 group">
//                     <ArrowRight size={10} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-200" />
//                     {link}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Contact */}
//           <div>
//             <h4 className="text-white font-bold text-sm mb-5 tracking-wide">Contact Us</h4>
//             <div className="space-y-4">
//               {[
//                 { icon: <MapPin size={15} />, text: "14 Solidarity Drive, Lagos, Nigeria" },
//                 { icon: <Phone size={15} />, text: "+234 000 000 0000" },
//                 { icon: <Mail size={15} />, text: "hello@horizonhumanity.org" },
//                 { icon: <Clock size={15} />, text: "Mon – Fri: 8:00 AM – 6:00 PM WAT" },
//               ].map((item, i) => (
//                 <div key={i} className="flex items-start gap-3 text-slate-400 text-sm">
//                   <span className="text-sky-400 mt-0.5 flex-shrink-0">{item.icon}</span>
//                   {item.text}
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Newsletter */}
//           <div>
//             <h4 className="text-white font-bold text-sm mb-5 tracking-wide">Stay Informed</h4>
//             <p className="text-slate-400 text-sm mb-4 leading-relaxed">
//               Join 12,000+ supporters receiving our humanitarian updates and impact stories.
//             </p>
//             <div className="flex gap-2">
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="Your email address"
//                 className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-sky-500 transition-colors"
//               />
//               <button className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-teal-500 flex items-center justify-center text-white hover:scale-105 transition-transform flex-shrink-0">
//                 <Send size={14} />
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Bottom */}
//         <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
//           <p className="text-slate-500 text-xs">
//             &copy; 2024 Horizon Humanity Foundation. All rights reserved. Registered Humanitarian Organization.
//           </p>
//           <div className="flex gap-4 text-slate-500 text-xs">
//             <a href="#" className="hover:text-sky-400 transition-colors">Privacy Policy</a>
//             <a href="#" className="hover:text-sky-400 transition-colors">Terms of Use</a>
//             <a href="#" className="hover:text-sky-400 transition-colors">Cookie Policy</a>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }

// // ─── Main Page ────────────────────────────────────────────────────────────────
// export default function HorizonHumanityFoundation() {
//   useEffect(() => {
//     // Load Google Font
//     const link = document.createElement("link");
//     link.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800&display=swap";
//     link.rel = "stylesheet";
//     document.head.appendChild(link);
//     document.documentElement.style.scrollBehavior = "smooth";
//   }, []);

//   return (
//     <div className="min-h-screen antialiased">
//       <Navbar />
//       <Hero />
//       <About />
//       <Programs />
//       <HowWeHelp />
//       <Impact />
//       <Testimonials />
//       <EmergencyAppeal />
//       <CTA />
//       <Footer />
//     </div>
//   );
// }


"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";
import { MapPin, Clock, Phone, ChevronDown, Star, ArrowRight, Menu, X, Utensils, Music, Film, Palette, Gamepad2, Trees, Sparkles, Zap } from "lucide-react";

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
    geo.setAttribute("aColor", new THREE.BufferAttribute(colors, 3));
    geo.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    const mat = new THREE.ShaderMaterial({
      uniforms: { time: { value: 0 } },
      vertexShader: `
        attribute float size;
        attribute vec3 aColor;
        varying vec3 vColor;
        varying float vAlpha;
        uniform float time;
        void main() {
          vColor = aColor;
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
              {[
                { label: "Instagram", d: <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg> },
                { label: "X", d: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
                { label: "Facebook", d: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg> },
              ].map((s) => (
                <a key={s.label} href="#" aria-label={s.label} className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-amber-400 hover:border-amber-400/50 transition-all">
                  {s.d}
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
