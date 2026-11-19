// "use client";

// import { useEffect, useRef, useState } from "react";
// import {
//   motion, useScroll, useTransform, AnimatePresence, useInView,
// } from "framer-motion";
// import {
//   Menu, X, Phone, Mail, ChevronRight, ArrowRight,
//   BookOpen, Award, CreditCard, FileText, CheckCircle,
//   GraduationCap, Zap, Shield, Clock, Star, Users,
//   Search, Building2, Scroll, BadgeCheck, Landmark,
// } from "lucide-react";
// import {
//   FaWhatsapp, FaTelegram, FaGraduationCap, FaFileAlt,
//   FaUniversity, FaIdCard, FaMoneyBillWave, FaClipboardList,
//   FaCertificate, FaPassport, FaHandshake, FaBolt,
// } from "react-icons/fa";
// import {
//   MdSchool, MdPayment, MdAssignment, MdVerified,
//   MdSupportAgent, MdDocumentScanner,
// } from "react-icons/md";
// import { IoDocumentText, IoSchool } from "react-icons/io5";
// import { BsPersonBadge, BsPeopleFill, BsFillLightningChargeFill } from "react-icons/bs";
// import { HiDocumentDuplicate, HiAcademicCap } from "react-icons/hi";

// // ─── CONFIG ──────────────────────────────────────────────────────────────────
// const BRAND = {
//   name: "Tobi_blaq",
//   full: "TOBI_BLAQ EDU.CONSULT",
//   tagline: "Education · Finance · Investment",
//   description: "Nigeria's most trusted student consultancy. WAEC, JAMB, admissions, documents, payments — all from the comfort of your home.",
//   phone: "+234 907 645 9155",
//   email: "tobiblaqq@gmail.com",
//   whatsapp: "https://wa.me/2349076459155?text=Hi%20Tobi_blaq%2C%20I%20need%20help%20with%20my%20education%20services",
//   telegram: "https://t.me/tobi_blaqq",
//   hours: "Mon–Sat: 9:00 AM – 6:00 PM",
//   primaryColor: "#F59E0B",
//   accentColor: "#7C3AED",
//   heroImg: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1600&q=90",
// };

// const WA = BRAND.whatsapp;

// // ─── SERVICES ────────────────────────────────────────────────────────────────
// const services = [
//   {
//     icon: <FaFileAlt size={22} />,
//     title: "WAEC, NECO & JAMB",
//     desc: "Registration, result checking, scratch cards, e-verification and WAEC original certificates from 1999–2026.",
//     color: "#F59E0B",
//     img: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=600&q=80",
//   },
//   {
//     icon: <FaUniversity size={22} />,
//     title: "Admission Processing",
//     desc: "Post-UTME registration, DE, application forms and admission processing into any Nigerian university.",
//     color: "#7C3AED",
//     img: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=600&q=80",
//   },
//   {
//     icon: <FaMoneyBillWave size={22} />,
//     title: "School Payments",
//     desc: "School fees, acceptance fee, clearance, harmonised association fee, sponsored data, substance screening and more.",
//     color: "#16A34A",
//     img: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&q=80",
//   },
//   {
//     icon: <HiDocumentDuplicate size={22} />,
//     title: "Original Documents",
//     desc: "WAEC, NABTEB, NECO certificates. JAMB result slips & admission letters. NIN, birth certificate, state of origin.",
//     color: "#E63946",
//     img: "https://images.unsplash.com/photo-1568667256549-094345857637?w=600&q=80",
//   },
//   {
//     icon: <IoSchool size={22} />,
//     title: "IJMB / JUPEB / Diploma",
//     desc: "Full registration, lectures and admission support directly into 200 level at top Nigerian universities.",
//     color: "#0EA5E9",
//     img: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600&q=80",
//   },
//   {
//     icon: <MdSupportAgent size={22} />,
//     title: "NYSC & Campus Updates",
//     desc: "NYSC registration, school of nursing forms, post-UTME exam prep and real-time campus updates.",
//     color: "#10B981",
//     img: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=600&q=80",
//   },
// ];

// // ─── DOCUMENTS LIST ───────────────────────────────────────────────────────────
// const docCategories = [
//   {
//     label: "Academic Certificates",
//     icon: <FaCertificate size={16} />,
//     color: "#F59E0B",
//     items: [
//       "WAEC Original Certificate (1999–2026)",
//       "NECO Certificate / E-Verification",
//       "NABTEB Certificate",
//       "JAMB Original Result Slip",
//       "JAMB Admission Letter",
//     ],
//   },
//   {
//     label: "Identity Documents",
//     icon: <BsPersonBadge size={16} />,
//     color: "#7C3AED",
//     items: [
//       "Birth Certificate",
//       "State of Origin Certificate",
//       "Local Government Certificate",
//       "All 36 States Citizenship Certificate",
//       "Plastic NIN Slip",
//       "Court Affidavit",
//     ],
//   },
//   {
//     label: "School Registration",
//     icon: <FaClipboardList size={16} />,
//     color: "#16A34A",
//     items: [
//       "Application Form (Any Institution)",
//       "Acceptance Fee Payment",
//       "Course Registration",
//       "SIWES Registration",
//       "SIWES & Projects Write-up",
//       "School Forms",
//     ],
//   },
//   {
//     label: "Portal Payments",
//     icon: <MdPayment size={16} />,
//     color: "#0EA5E9",
//     items: [
//       "School Fees Payment",
//       "Harmonized Association Fee",
//       "Sponsored Data",
//       "Substance Screening Charges",
//       "Professional Fee",
//       "Summer Registration",
//       "Online Payment & Other Registration",
//     ],
//   },
// ];

// // ─── STATS ────────────────────────────────────────────────────────────────────
// const stats = [
//   { val: "5,000+", label: "Students Helped" },
//   { val: "100%", label: "Success Rate" },
//   { val: "36", label: "States Covered" },
//   { val: "24/7", label: "Support Available" },
// ];

// // ─── WHY CHOOSE ───────────────────────────────────────────────────────────────
// const whyUs = [
//   { icon: <Shield size={20} />, title: "100% Verified", desc: "Every document and service is authentic and officially processed.", color: "#16A34A" },
//   { icon: <BsFillLightningChargeFill size={20} />, title: "Fast Turnaround", desc: "Most services delivered same day or within 24–48 hours.", color: "#F59E0B" },
//   { icon: <MdSupportAgent size={20} />, title: "Home Delivery", desc: "Get everything from the comfort of your home. No stress, no travel.", color: "#7C3AED" },
//   { icon: <Users size={20} />, title: "5,000+ Served", desc: "Trusted by thousands of Nigerian students across all 36 states.", color: "#0EA5E9" },
// ];

// // ─── CANVAS ───────────────────────────────────────────────────────────────────
// function ParticleCanvas() {
//   const ref = useRef<HTMLCanvasElement>(null);
//   useEffect(() => {
//     const c = ref.current; if (!c) return;
//     const ctx = c.getContext("2d"); if (!ctx) return;
//     let id: number;
//     let W = (c.width = window.innerWidth), H = (c.height = window.innerHeight);
//     const pts = Array.from({ length: 55 }, () => ({
//       x: Math.random() * W, y: Math.random() * H,
//       r: Math.random() * 2 + 0.5,
//       vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.28,
//       a: Math.random() * 0.45 + 0.1,
//       col: ["#F59E0B", "#7C3AED", "#ffffff", "#FCD34D"][Math.floor(Math.random() * 4)],
//     }));
//     const loop = () => {
//       ctx.clearRect(0, 0, W, H);
//       pts.forEach((p, i) => {
//         pts.slice(i + 1).forEach(q => {
//           const d = Math.hypot(p.x - q.x, p.y - q.y);
//           if (d < 110) { ctx.beginPath(); ctx.strokeStyle = `rgba(245,158,11,${0.055 * (1 - d / 110)})`; ctx.lineWidth = 0.5; ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke(); }
//         });
//         p.x += p.vx; p.y += p.vy;
//         if (p.x < 0 || p.x > W) p.vx *= -1;
//         if (p.y < 0 || p.y > H) p.vy *= -1;
//         ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
//         ctx.fillStyle = p.col + Math.floor(p.a * 255).toString(16).padStart(2, "0");
//         ctx.fill();
//       });
//       id = requestAnimationFrame(loop);
//     };
//     loop();
//     const resize = () => { W = c.width = window.innerWidth; H = c.height = window.innerHeight; };
//     window.addEventListener("resize", resize);
//     return () => { cancelAnimationFrame(id); window.removeEventListener("resize", resize); };
//   }, []);
//   return <canvas ref={ref} className="absolute inset-0 w-full h-full pointer-events-none z-0" />;
// }

// function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
//   const ref = useRef(null);
//   const inV = useInView(ref, { once: true, margin: "-60px" });
//   return (
//     <motion.div ref={ref} className={className}
//       initial={{ opacity: 0, y: 44 }}
//       animate={inV ? { opacity: 1, y: 0 } : {}}
//       transition={{ duration: 0.68, delay, ease: [0.22, 1, 0.36, 1] }}>
//       {children}
//     </motion.div>
//   );
// }

// // Floating animated icon
// function FloatIcon({ icon, className, delay = 0 }: { icon: React.ReactNode; className?: string; delay?: number }) {
//   return (
//     <motion.div className={className}
//       animate={{ y: [0, -12, 0], rotate: [0, 3, -3, 0] }}
//       transition={{ duration: 4 + delay, repeat: Infinity, ease: "easeInOut", delay }}>
//       {icon}
//     </motion.div>
//   );
// }

// // ─── MAIN ─────────────────────────────────────────────────────────────────────
// export default function TobiBlaqEduConsult() {
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [activeDoc, setActiveDoc] = useState(0);
//   const { scrollY } = useScroll();
//   const navBg = useTransform(scrollY, [0, 80], ["rgba(10,7,2,0)", "rgba(10,7,2,0.97)"]);
//   const heroY = useTransform(scrollY, [0, 400], [0, 80]);

//   const navLinks = ["Services", "Documents", "Payments", "Why Us", "Contact"];

//   return (
//     <div className="bg-[#0a0702] text-white overflow-x-hidden" style={{ fontFamily: "'DM Sans', sans-serif" }}>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,700;0,800;1,500&display=swap');
//         html { scroll-behavior: smooth; }
//         ::-webkit-scrollbar { width: 3px; }
//         ::-webkit-scrollbar-thumb { background: #F59E0B; border-radius: 2px; }
//         .glass { backdrop-filter: blur(18px); background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.07); }
//         .glass-gold { backdrop-filter: blur(18px); background: rgba(245,158,11,0.08); border: 1px solid rgba(245,158,11,0.2); }
//         .glow-gold { box-shadow: 0 0 32px rgba(245,158,11,0.5), 0 0 64px rgba(245,158,11,0.15); }
//         .glow-purple { box-shadow: 0 0 32px rgba(124,58,237,0.5), 0 0 64px rgba(124,58,237,0.15); }
//         .glow-wa { box-shadow: 0 0 32px rgba(37,211,102,0.5), 0 0 64px rgba(37,211,102,0.15); }
//         .shine { position: relative; overflow: hidden; }
//         .shine::before { content:''; position:absolute; top:0; left:-100%; width:55%; height:100%; background:linear-gradient(90deg,transparent,rgba(255,255,255,0.05),transparent); transition:left .5s; }
//         .shine:hover::before { left:150%; }
//         .text-gradient-gold { background: linear-gradient(135deg, #F59E0B, #FCD34D, #F59E0B); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
//         .bg-grid { background-image: linear-gradient(rgba(245,158,11,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(245,158,11,0.04) 1px, transparent 1px); background-size: 60px 60px; }
//       `}</style>

//       {/* ── NAV ── */}
//       <motion.nav style={{ background: navBg }} className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-white/5">
//         <div className="max-w-7xl mx-auto px-5 md:px-10 py-4 flex items-center justify-between">
//           <motion.a href="#" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-3">
//             <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #F59E0B, #D97706)" }}>
//               <HiAcademicCap size={20} className="text-white" />
//             </div>
//             <div>
//               <div className="text-sm font-bold tracking-tight text-gradient-gold" style={{ fontFamily: "'Playfair Display', serif" }}>Tobi_blaq✨</div>
//               <div className="text-[9px] text-white/30 tracking-widest uppercase -mt-0.5">Edu.Consult</div>
//             </div>
//           </motion.a>

//           <div className="hidden md:flex items-center gap-7">
//             {navLinks.map((l) => (
//               <a key={l} href={`#${l.toLowerCase().replace(/\s+/g, "-")}`} className="text-sm text-white/45 hover:text-[#F59E0B] transition-colors duration-200">{l}</a>
//             ))}
//           </div>

//           <div className="hidden md:flex items-center gap-3">
//             <a href={`tel:${BRAND.phone}`} className="flex items-center gap-2 px-4 py-2 glass rounded-full text-sm text-white/50 hover:text-white transition-all">
//               <Phone size={13} /> Call Now
//             </a>
//             <a href={WA} target="_blank" rel="noreferrer"
//               className="flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-sm font-semibold glow-wa hover:scale-105 transition-transform"
//               style={{ background: "linear-gradient(135deg, #25D366, #128C7E)" }}>
//               <FaWhatsapp size={14} /> Get Help Now
//             </a>
//           </div>
//           <button className="md:hidden p-2 text-white" onClick={() => setMobileOpen(!mobileOpen)}>
//             {mobileOpen ? <X size={22} /> : <Menu size={22} />}
//           </button>
//         </div>

//         <AnimatePresence>
//           {mobileOpen && (
//             <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.28 }}
//               className="md:hidden border-t border-white/5" style={{ background: "rgba(10,7,2,0.97)" }}>
//               <div className="flex flex-col px-6 py-6 gap-5">
//                 {navLinks.map((l, i) => (
//                   <motion.a key={l} href={`#${l.toLowerCase().replace(/\s+/g, "-")}`}
//                     initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}
//                     onClick={() => setMobileOpen(false)} className="text-white/60 hover:text-[#F59E0B] font-medium transition-colors">{l}</motion.a>
//                 ))}
//                 <a href={WA} target="_blank" rel="noreferrer"
//                   className="flex items-center justify-center gap-2 py-3.5 rounded-full text-white font-semibold glow-wa mt-2"
//                   style={{ background: "linear-gradient(135deg, #25D366, #128C7E)" }}>
//                   <FaWhatsapp size={17} /> WhatsApp Us Now
//                 </a>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </motion.nav>

//       {/* ── HERO ── */}
//       <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-grid">
//         <ParticleCanvas />

//         {/* BG image */}
//         <motion.div style={{ y: heroY }} className="absolute inset-0 z-1">
//           <img src={BRAND.heroImg} alt="bg" className="w-full h-full object-cover opacity-20" />
//           <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(10,7,2,0.75) 0%, rgba(10,7,2,0.5) 40%, rgba(10,7,2,1) 100%)" }} />
//         </motion.div>

//         {/* Glow blobs */}
//         <div className="absolute top-1/4 -left-20 w-125 h-125 rounded-full blur-[220px] opacity-12 z-1" style={{ background: "#F59E0B" }} />
//         <div className="absolute bottom-1/4 right-0 w-100 h-100 rounded-full blur-[200px] opacity-10 z-1" style={{ background: "#7C3AED" }} />

//         {/* Floating icons */}
//         <FloatIcon delay={0} className="hidden lg:flex absolute top-32 right-24 w-14 h-14 rounded-2xl glass-gold items-center justify-center text-[#F59E0B] z-10" icon={<FaGraduationCap size={24} />} />
//         <FloatIcon delay={1} className="hidden lg:flex absolute top-52 right-64 w-11 h-11 rounded-xl glass items-center justify-center text-[#7C3AED] z-10" icon={<FaFileAlt size={18} />} />
//         <FloatIcon delay={1.5} className="hidden lg:flex absolute bottom-40 right-32 w-12 h-12 rounded-2xl items-center justify-center z-10" style={{ background: "rgba(124,58,237,0.2)", border: "1px solid rgba(124,58,237,0.3)" }} icon={<MdSchool size={22} className="text-purple-400" />} />
//         <FloatIcon delay={2.2} className="hidden lg:flex absolute top-40 left-[52%] w-10 h-10 rounded-xl items-center justify-center z-10" style={{ background: "rgba(16,185,129,0.2)", border: "1px solid rgba(16,185,129,0.3)" }} icon={<MdVerified size={18} className="text-emerald-400" />} />

//         <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-10 w-full py-20">
//           <div className="max-w-3xl">
//             {/* Badge */}
//             <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
//               className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-gold text-sm mb-7">
//               <BsFillLightningChargeFill size={12} className="text-[#F59E0B]" />
//               <span className="text-[#F59E0B] font-medium">I'm Active — Responding Now</span>
//               <span className="w-2 h-2 rounded-full bg-[#F59E0B] animate-pulse" />
//             </motion.div>

//             {/* Headline */}
//             <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, delay: 0.1 }}
//               className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-5"
//               style={{ fontFamily: "'Playfair Display', serif" }}>
//               Get Every Document
//               <span className="block text-gradient-gold">From Home.</span>
//               <span className="block text-white">Stress-Free.</span>
//             </motion.h1>

//             <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: 0.22 }}
//               className="text-lg text-white/45 mb-8 max-w-xl leading-relaxed">
//               WAEC. JAMB. Admissions. School fees. NYSC. All 36-state documents. Handled professionally — delivered to you without leaving your house.
//             </motion.p>

//             {/* Service quick-tags */}
//             <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
//               className="flex flex-wrap gap-2 mb-10">
//               {["WAEC/NECO/JAMB", "Admissions", "Original Documents", "School Payments", "NYSC", "IJMB/JUPEB"].map((tag) => (
//                 <span key={tag} className="px-3 py-1.5 glass-gold rounded-full text-xs text-[#F59E0B] font-medium border border-[#F59E0B]/20">{tag}</span>
//               ))}
//             </motion.div>

//             {/* CTAs */}
//             <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.38 }}
//               className="flex flex-wrap gap-4 mb-14">
//               <a href={WA} target="_blank" rel="noreferrer"
//                 className="flex items-center gap-2.5 px-7 py-4 rounded-full text-white font-bold text-base glow-wa hover:scale-105 transition-transform duration-300"
//                 style={{ background: "linear-gradient(135deg, #25D366, #128C7E)" }}>
//                 <FaWhatsapp size={20} /> Message Us Now
//               </a>
//               <a href="#services" className="flex items-center gap-2 px-7 py-4 rounded-full glass text-white/70 hover:text-[#F59E0B] font-medium text-base border border-transparent hover:border-[#F59E0B]/25 transition-all duration-300">
//                 Explore Services <ArrowRight size={16} />
//               </a>
//             </motion.div>

//             {/* Stats */}
//             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.52 }} className="flex flex-wrap gap-8">
//               {stats.map((s, i) => (
//                 <motion.div key={s.label} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.58 + i * 0.08 }}>
//                   <div className="text-2xl font-bold text-gradient-gold">{s.val}</div>
//                   <div className="text-[11px] text-white/30 mt-0.5 tracking-wide">{s.label}</div>
//                 </motion.div>
//               ))}
//             </motion.div>
//           </div>
//         </div>

//         <div className="absolute bottom-0 left-0 right-0 h-36 bg-linear-to-t from-[#0a0702] to-transparent z-10" />
//       </section>

//       {/* ── WHY US ── */}
//       <section id="why-us" className="py-20 bg-[#070503]">
//         <div className="max-w-7xl mx-auto px-5 md:px-10">
//           <Reveal className="text-center mb-14">
//             <div className="text-xs font-semibold tracking-widest uppercase text-[#F59E0B] mb-3">Why Students Trust Us</div>
//             <h2 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
//               Zero stress.{" "}
//               <span className="text-gradient-gold">100% delivered.</span>
//             </h2>
//           </Reveal>
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
//             {whyUs.map((w, i) => (
//               <Reveal key={w.title} delay={i * 0.09}>
//                 <motion.div whileHover={{ y: -6, scale: 1.02 }} className="glass rounded-2xl p-6 text-center border border-white/5 hover:border-white/12 transition-all group">
//                   <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform" style={{ background: w.color + "22", color: w.color }}>
//                     {w.icon}
//                   </div>
//                   <div className="font-semibold text-sm mb-1.5">{w.title}</div>
//                   <div className="text-white/30 text-xs leading-relaxed">{w.desc}</div>
//                 </motion.div>
//               </Reveal>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ── SERVICES ── */}
//       <section id="services" className="py-24">
//         <div className="max-w-7xl mx-auto px-5 md:px-10">
//           <Reveal className="text-center mb-14">
//             <div className="text-xs font-semibold tracking-widest uppercase text-[#F59E0B] mb-3">What We Handle</div>
//             <h2 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
//               All your <span className="text-gradient-gold">education needs,</span><br />one place
//             </h2>
//             <p className="text-white/30 mt-4 max-w-md mx-auto text-sm">From your first JAMB registration to your final NYSC clearance — we're with you every step.</p>
//           </Reveal>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {services.map((s, i) => {
//               const ref = useRef(null);
//               const inV = useInView(ref, { once: true, margin: "-50px" });
//               return (
//                 <motion.div key={s.title} ref={ref}
//                   initial={{ opacity: 0, y: 60 }} animate={inV ? { opacity: 1, y: 0 } : {}}
//                   transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
//                   className="group relative glass rounded-3xl overflow-hidden shine border border-white/5 hover:border-white/12 transition-all"
//                   whileHover={{ y: -6 }}>

//                   {/* Image */}
//                   <div className="relative h-44 overflow-hidden">
//                     <motion.img src={s.img} alt={s.title} className="w-full h-full object-cover" whileHover={{ scale: 1.08 }} transition={{ duration: 0.45 }} />
//                     <div className="absolute inset-0 bg-linear-to-t from-[#0a0702] via-[#0a0702]/40 to-transparent" />
//                     <div className="absolute top-3 right-3 w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: s.color + "33", border: `1px solid ${s.color}55`, color: s.color }}>
//                       {s.icon}
//                     </div>
//                   </div>

//                   <div className="p-6">
//                     <h3 className="font-bold text-base mb-2">{s.title}</h3>
//                     <p className="text-white/35 text-sm leading-relaxed mb-5">{s.desc}</p>
//                     <a href={`${WA}&text=Hi%20Tobi_blaq%2C%20I%20need%20help%20with%20${encodeURIComponent(s.title)}`} target="_blank" rel="noreferrer"
//                       className="flex items-center gap-1.5 text-sm font-semibold transition-colors" style={{ color: s.color }}>
//                       Get Started <ChevronRight size={15} />
//                     </a>
//                   </div>

//                   {/* Bottom glow line */}
//                   <div className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: `linear-gradient(90deg, transparent, ${s.color}, transparent)` }} />
//                 </motion.div>
//               );
//             })}
//           </div>
//         </div>
//       </section>

//       {/* ── DOCUMENTS ── */}
//       <section id="documents" className="py-24 bg-[#070503] relative overflow-hidden">
//         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-200 rounded-full blur-[300px] opacity-5" style={{ background: "#F59E0B" }} />

//         <div className="max-w-7xl mx-auto px-5 md:px-10 relative z-10">
//           <Reveal className="text-center mb-14">
//             <div className="text-xs font-semibold tracking-widest uppercase text-[#F59E0B] mb-3">Document Services</div>
//             <h2 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
//               Every document.<br /><span className="text-gradient-gold">Delivered to your door.</span>
//             </h2>
//             <p className="text-white/30 mt-4 max-w-md mx-auto text-sm">From original certificates to identity documents — we handle everything remotely.</p>
//           </Reveal>

//           {/* Category tabs */}
//           <Reveal className="flex flex-wrap justify-center gap-3 mb-10">
//             {docCategories.map((cat, i) => (
//               <button key={cat.label} onClick={() => setActiveDoc(i)}
//                 className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${activeDoc === i ? "text-white" : "glass text-white/40 hover:text-white"}`}
//                 style={activeDoc === i ? { background: `linear-gradient(135deg, ${cat.color}, ${cat.color}cc)`, boxShadow: `0 0 20px ${cat.color}44` } : {}}>
//                 {cat.icon} {cat.label}
//               </button>
//             ))}
//           </Reveal>

//           <AnimatePresence mode="wait">
//             <motion.div key={activeDoc}
//               initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.4 }}
//               className="glass rounded-3xl p-8 border border-white/5 max-w-2xl mx-auto">
//               <div className="flex items-center gap-3 mb-7">
//                 <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: docCategories[activeDoc].color + "22", color: docCategories[activeDoc].color }}>
//                   {docCategories[activeDoc].icon}
//                 </div>
//                 <h3 className="text-xl font-bold">{docCategories[activeDoc].label}</h3>
//               </div>
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                 {docCategories[activeDoc].items.map((item, i) => (
//                   <motion.div key={item} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}
//                     className="flex items-center gap-2.5 py-2">
//                     <CheckCircle size={14} style={{ color: docCategories[activeDoc].color, flexShrink: 0 }} />
//                     <span className="text-sm text-white/65">{item}</span>
//                   </motion.div>
//                 ))}
//               </div>
//               <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
//                 <p className="text-white/30 text-sm">Need any of these documents?</p>
//                 <a href={`${WA}&text=Hi%2C%20I%20need%20help%20with%20${encodeURIComponent(docCategories[activeDoc].label)}`} target="_blank" rel="noreferrer"
//                   className="flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-sm font-semibold glow-wa"
//                   style={{ background: "linear-gradient(135deg, #25D366, #128C7E)" }}>
//                   <FaWhatsapp size={13} /> Get it now
//                 </a>
//               </div>
//             </motion.div>
//           </AnimatePresence>
//         </div>
//       </section>

//       {/* ── PAYMENTS ── */}
//       <section id="payments" className="py-24">
//         <div className="max-w-7xl mx-auto px-5 md:px-10">
//           <div className="grid lg:grid-cols-2 gap-16 items-center">
//             <Reveal>
//               <div className="text-xs font-semibold tracking-widest uppercase text-[#F59E0B] mb-4">School Payments</div>
//               <h2 className="text-4xl md:text-5xl font-bold mb-5" style={{ fontFamily: "'Playfair Display', serif" }}>
//                 Smooth &amp; stress-free{" "}
//                 <span className="text-gradient-gold">payment assistance</span>
//               </h2>
//               <p className="text-white/40 mb-8 leading-relaxed">
//                 Stuck on the portal? Payment failing? We handle all school-related payments and online transactions for you — fast, safe, and confirmed.
//               </p>
//               <a href={WA} target="_blank" rel="noreferrer"
//                 className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full text-white font-semibold text-base glow-wa hover:scale-105 transition-transform duration-300"
//                 style={{ background: "linear-gradient(135deg, #25D366, #128C7E)" }}>
//                 <FaWhatsapp size={18} /> Send Us a DM
//               </a>
//             </Reveal>

//             <div className="grid grid-cols-2 gap-4">
//               {[
//                 { icon: <MdPayment size={20} />, label: "School Fees Payment", color: "#F59E0B" },
//                 { icon: <FaHandshake size={20} />, label: "Acceptance Fee", color: "#7C3AED" },
//                 { icon: <BsPeopleFill size={20} />, label: "Harmonized Assoc. Fee", color: "#16A34A" },
//                 { icon: <FaBolt size={20} />, label: "Sponsored Data", color: "#0EA5E9" },
//                 { icon: <Shield size={20} />, label: "Substance Screening", color: "#E63946" },
//                 { icon: <IoDocumentText size={20} />, label: "Professional Fee", color: "#F59E0B" },
//                 { icon: <FaClipboardList size={20} />, label: "Summer Registration", color: "#10B981" },
//                 { icon: <MdAssignment size={20} />, label: "JAMB Admission Letter", color: "#7C3AED" },
//               ].map((item, i) => (
//                 <Reveal key={item.label} delay={i * 0.07}>
//                   <motion.div whileHover={{ y: -4, scale: 1.03 }}
//                     className="glass rounded-2xl p-4 border border-white/5 hover:border-white/12 flex items-center gap-3 transition-all">
//                     <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: item.color + "22", color: item.color }}>
//                       {item.icon}
//                     </div>
//                     <span className="text-sm text-white/65 leading-tight">{item.label}</span>
//                   </motion.div>
//                 </Reveal>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ── PROCESS ── */}
//       <section className="py-20 bg-[#070503]">
//         <div className="max-w-7xl mx-auto px-5 md:px-10">
//           <Reveal className="text-center mb-14">
//             <div className="text-xs font-semibold tracking-widest uppercase text-[#F59E0B] mb-3">How It Works</div>
//             <h2 className="text-4xl md:text-5xl font-bold" style={{ fontFamily: "'Playfair Display', serif" }}>
//               3 steps.<br /><span className="text-gradient-gold">Done and delivered.</span>
//             </h2>
//           </Reveal>
//           <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8">
//             <div className="hidden md:block absolute top-10 left-[calc(16.66%+24px)] right-[calc(16.66%+24px)] h-px"
//               style={{ background: "linear-gradient(90deg, rgba(245,158,11,0.4), rgba(124,58,237,0.4), rgba(37,211,102,0.4))" }} />
//             {[
//               { n: "01", icon: <FaWhatsapp size={26} />, title: "Send a DM", desc: "Message us on WhatsApp or Telegram. Tell us what you need — document, payment, admission, or registration.", color: "#25D366" },
//               { n: "02", icon: <MdDocumentScanner size={26} />, title: "We Process It", desc: "Our team handles everything remotely. No queues, no stress, no travel required from you.", color: "#F59E0B" },
//               { n: "03", icon: <MdVerified size={26} />, title: "You Receive It", desc: "Your document or confirmation is delivered directly to you — original, verified and ready to use.", color: "#7C3AED" },
//             ].map((s, i) => (
//               <Reveal key={s.n} delay={i * 0.12}>
//                 <motion.div whileHover={{ y: -6 }} className="glass rounded-3xl p-8 text-center border border-white/5 hover:border-white/12 transition-all relative">
//                   <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5" style={{ background: s.color + "22", border: `1px solid ${s.color}44`, color: s.color }}>{s.icon}</div>
//                   <div className="text-6xl font-black absolute top-5 right-5 text-white/4">{s.n}</div>
//                   <h3 className="text-lg font-bold mb-2">{s.title}</h3>
//                   <p className="text-white/35 text-sm leading-relaxed">{s.desc}</p>
//                 </motion.div>
//               </Reveal>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ── CTA ── */}
//       <section className="py-28 relative overflow-hidden">
//         <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, rgba(245,158,11,0.12) 0%, transparent 70%)" }} />
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-175 h-175 rounded-full blur-[250px] opacity-8" style={{ background: "#F59E0B" }} />

//         <div className="max-w-3xl mx-auto px-5 md:px-10 text-center relative z-10">
//           <Reveal>
//             <motion.div animate={{ rotate: [0, 10, -8, 0], scale: [1, 1.1, 1] }} transition={{ duration: 3.5, repeat: Infinity }}
//               className="text-6xl mb-8 inline-block">
//               <HiAcademicCap size={64} className="text-[#F59E0B] mx-auto" />
//             </motion.div>

//             <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
//               Need a document?
//               <span className="block text-gradient-gold">One message away.</span>
//             </h2>

//             <p className="text-white/40 text-lg mb-10 max-w-md mx-auto leading-relaxed">
//               Stop stressing over portals, queues and agents. We handle it all from the comfort of your home — fast, verified, professional.
//             </p>

//             <div className="flex flex-wrap justify-center gap-4">
//               <motion.a href={WA} target="_blank" rel="noreferrer"
//                 whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}
//                 className="inline-flex items-center gap-3 px-10 py-5 rounded-full text-white font-bold text-lg glow-wa"
//                 style={{ background: "linear-gradient(135deg, #25D366, #128C7E)" }}>
//                 <FaWhatsapp size={22} /> Message on WhatsApp
//               </motion.a>
//               <motion.a href={BRAND.telegram} target="_blank" rel="noreferrer"
//                 whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}
//                 className="inline-flex items-center gap-3 px-10 py-5 rounded-full text-white font-bold text-lg glass border border-blue-500/30"
//                 style={{ background: "rgba(0,136,204,0.15)" }}>
//                 <FaTelegram size={22} className="text-blue-400" /> Telegram
//               </motion.a>
//             </div>

//             <p className="text-white/15 text-xs mt-6">Open Mon–Sat · 9:00 AM – 6:00 PM · Active 24/7 on WhatsApp</p>
//           </Reveal>
//         </div>
//       </section>

//       {/* ── FOOTER ── */}
//       <footer id="contact" className="border-t border-white/5 py-14 bg-[#070503]">
//         <div className="max-w-7xl mx-auto px-5 md:px-10">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
//             <div className="md:col-span-1">
//               <div className="flex items-center gap-3 mb-4">
//                 <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #F59E0B, #D97706)" }}>
//                   <HiAcademicCap size={18} className="text-white" />
//                 </div>
//                 <div>
//                   <div className="font-bold text-gradient-gold" style={{ fontFamily: "'Playfair Display', serif" }}>Tobi_blaq✨</div>
//                   <div className="text-[9px] text-white/25 tracking-widest uppercase">Edu.Consult</div>
//                 </div>
//               </div>
//               <p className="text-white/25 text-sm leading-relaxed mb-5 max-w-xs">{BRAND.description}</p>
//               <div className="flex gap-3">
//                 {[
//                   { I: FaWhatsapp, h: WA, c: "#25D366" },
//                   { I: FaTelegram, h: BRAND.telegram, c: "#0088cc" },
//                 ].map(({ I, h, c }, i) => (
//                   <motion.a key={i} href={h} target="_blank" rel="noreferrer" whileHover={{ scale: 1.2 }}
//                     className="w-9 h-9 glass rounded-full flex items-center justify-center transition-colors"
//                     style={{ color: "rgba(255,255,255,0.3)" }}
//                     onMouseEnter={(e) => (e.currentTarget.style.color = c)}
//                     onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.3)")}>
//                     <I size={14} />
//                   </motion.a>
//                 ))}
//               </div>
//             </div>

//             <div>
//               <h4 className="font-semibold text-xs tracking-widest uppercase text-white/30 mb-5">Services</h4>
//               <div className="flex flex-col gap-2.5">
//                 {["WAEC / NECO / JAMB", "Admission Processing", "School Payments", "Original Documents", "IJMB / JUPEB / Diploma", "NYSC & Campus Updates"].map((l) => (
//                   <a key={l} href={`#services`} className="text-white/30 hover:text-[#F59E0B] text-sm transition-colors">{l}</a>
//                 ))}
//               </div>
//             </div>

//             <div>
//               <h4 className="font-semibold text-xs tracking-widest uppercase text-white/30 mb-5">Contact</h4>
//               <div className="flex flex-col gap-3">
//                 <a href={`tel:${BRAND.phone}`} className="flex items-center gap-2 text-sm text-white/30 hover:text-white transition-colors"><Phone size={13} className="text-[#F59E0B]" />{BRAND.phone}</a>
//                 <a href={`mailto:${BRAND.email}`} className="flex items-center gap-2 text-sm text-white/30 hover:text-white transition-colors"><Mail size={13} className="text-[#F59E0B]" />{BRAND.email}</a>
//                 <a href={WA} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-white/30 hover:text-white transition-colors"><FaWhatsapp size={13} className="text-green-400" />WhatsApp</a>
//                 <a href={BRAND.telegram} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-white/30 hover:text-white transition-colors"><FaTelegram size={13} className="text-blue-400" />t.me/tobi_blaqq</a>
//                 <div className="flex items-center gap-2 text-sm text-white/25"><Clock size={13} className="text-[#F59E0B]" />{BRAND.hours}</div>
//               </div>
//             </div>
//           </div>

//           <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
//             <p className="text-white/12 text-xs">© 2025 TOBI_BLAQ EDU.CONSULT. All rights reserved.</p>
//             <p className="text-white/8 text-xs">Built by GTECH</p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }
