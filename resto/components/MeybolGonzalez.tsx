// "use client";

// import { useEffect, useRef, useState, useCallback } from "react";
// import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
// import { Star, Phone, MapPin, ChevronDown, ArrowRight, Quote, Menu, X, Sparkles, Heart, Award, Clock } from "lucide-react";
// import { FaInstagram, FaWhatsapp } from "react-icons/fa";
// import * as THREE from "three";

// // ─── DESIGN TOKENS ───────────────────────────────────────────────────────────
// const COLORS = {
//   ivory: "#FAF7F2",
//   blush: "#F2C4CE",
//   mauve: "#C9A0A8",
//   deepRose: "#9B6B75",
//   dustyPink: "#E8B4BC",
//   warmCream: "#F5EFE6",
//   muted: "#8C7B82",
//   dark: "#2D2028",
//   glass: "rgba(250,247,242,0.08)",
// };

// // ─── COMPONENT: LABEL ────────────────────────────────────────────────────────
// const Label = ({ children, light = false }: { children: React.ReactNode; light?: boolean }) => (
//   <span
//     className="inline-block text-xs tracking-[0.3em] uppercase font-medium mb-3"
//     style={{ color: light ? COLORS.blush : COLORS.mauve }}
//   >
//     {children}
//   </span>
// );

// // ─── COMPONENT: DIVIDER ──────────────────────────────────────────────────────
// const Divider = ({ light = false }: { light?: boolean }) => (
//   <div className="flex items-center gap-3 my-4">
//     <div className="h-px w-8 rounded-full" style={{ background: light ? COLORS.blush : COLORS.mauve }} />
//     <div className="w-1.5 h-1.5 rounded-full" style={{ background: light ? COLORS.dustyPink : COLORS.deepRose }} />
//     <div className="h-px w-8 rounded-full" style={{ background: light ? COLORS.blush : COLORS.mauve }} />
//   </div>
// );

// // ─── COMPONENT: GLASS CARD ───────────────────────────────────────────────────
// const GlassCard = ({
//   children,
//   className = "",
//   dark = false,
// }: {
//   children: React.ReactNode;
//   className?: string;
//   dark?: boolean;
// }) => (
//   <div
//     className={`rounded-2xl backdrop-blur-md border ${className}`}
//     style={{
//       background: dark ? "rgba(45,32,40,0.6)" : "rgba(250,247,242,0.55)",
//       borderColor: dark ? "rgba(201,160,168,0.2)" : "rgba(201,160,168,0.3)",
//       boxShadow: "0 8px 32px rgba(155,107,117,0.12)",
//     }}
//   >
//     {children}
//   </div>
// );

// // ─── COMPONENT: REVEAL SECTION ───────────────────────────────────────────────
// const RevealSection = ({
//   children,
//   className = "",
//   delay = 0,
// }: {
//   children: React.ReactNode;
//   className?: string;
//   delay?: number;
// }) => {
//   const ref = useRef(null);
//   const inView = useInView(ref, { once: true, margin: "-80px" });
//   return (
//     <motion.div
//       ref={ref}
//       initial={{ opacity: 0, y: 40 }}
//       animate={inView ? { opacity: 1, y: 0 } : {}}
//       transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
//       className={className}
//     >
//       {children}
//     </motion.div>
//   );
// };

// // ─── COMPONENT: SCROLL PROGRESS ──────────────────────────────────────────────
// const ScrollProgress = () => {
//   const { scrollYProgress } = useScroll();
//   return (
//     <motion.div
//       className="fixed top-0 left-0 right-0 z-[100] h-[2px]"
//       style={{
//         scaleX: scrollYProgress,
//         transformOrigin: "0%",
//         background: `linear-gradient(90deg, ${COLORS.blush}, ${COLORS.deepRose})`,
//       }}
//     />
//   );
// };

// // ─── THREE.JS HERO CANVAS ────────────────────────────────────────────────────
// const ThreeHero = () => {
//   const mountRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (!mountRef.current) return;
//     const w = mountRef.current.clientWidth;
//     const h = mountRef.current.clientHeight;

//     const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
//     renderer.setSize(w, h);
//     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
//     mountRef.current.appendChild(renderer.domElement);

//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 100);
//     camera.position.z = 5;

//     // Floating petals / orbs
//     const group = new THREE.Group();
//     scene.add(group);

//     const geo = new THREE.SphereGeometry(0.06, 12, 12);
//     const particles: THREE.Mesh[] = [];

//     for (let i = 0; i < 120; i++) {
//       const mat = new THREE.MeshBasicMaterial({
//         color: new THREE.Color(
//           Math.random() > 0.5
//             ? "#F2C4CE"
//             : Math.random() > 0.5
//             ? "#C9A0A8"
//             : "#E8B4BC"
//         ),
//         transparent: true,
//         opacity: Math.random() * 0.6 + 0.15,
//       });
//       const mesh = new THREE.Mesh(geo, mat);
//       mesh.position.set(
//         (Math.random() - 0.5) * 12,
//         (Math.random() - 0.5) * 8,
//         (Math.random() - 0.5) * 6
//       );
//       (mesh as any)._speed = Math.random() * 0.003 + 0.001;
//       (mesh as any)._offset = Math.random() * Math.PI * 2;
//       group.add(mesh);
//       particles.push(mesh);
//     }

//     // Thin ring
//     const ringGeo = new THREE.TorusGeometry(2.2, 0.008, 8, 120);
//     const ringMat = new THREE.MeshBasicMaterial({ color: "#C9A0A8", transparent: true, opacity: 0.18 });
//     const ring = new THREE.Mesh(ringGeo, ringMat);
//     ring.rotation.x = Math.PI / 3;
//     scene.add(ring);

//     const ring2 = new THREE.Mesh(
//       new THREE.TorusGeometry(3.1, 0.005, 8, 120),
//       new THREE.MeshBasicMaterial({ color: "#F2C4CE", transparent: true, opacity: 0.1 })
//     );
//     ring2.rotation.x = Math.PI / 2.2;
//     ring2.rotation.y = 0.4;
//     scene.add(ring2);

//     let frame: number;
//     const clock = new THREE.Clock();

//     const animate = () => {
//       frame = requestAnimationFrame(animate);
//       const t = clock.getElapsedTime();
//       group.rotation.y = t * 0.04;
//       particles.forEach((p) => {
//         p.position.y += Math.sin(t * (p as any)._speed * 10 + (p as any)._offset) * 0.003;
//       });
//       ring.rotation.z = t * 0.015;
//       ring2.rotation.z = -t * 0.01;
//       renderer.render(scene, camera);
//     };
//     animate();

//     const handleResize = () => {
//       if (!mountRef.current) return;
//       const nw = mountRef.current.clientWidth;
//       const nh = mountRef.current.clientHeight;
//       camera.aspect = nw / nh;
//       camera.updateProjectionMatrix();
//       renderer.setSize(nw, nh);
//     };
//     window.addEventListener("resize", handleResize);

//     return () => {
//       cancelAnimationFrame(frame);
//       window.removeEventListener("resize", handleResize);
//       renderer.dispose();
//       if (mountRef.current && renderer.domElement.parentNode === mountRef.current) {
//         mountRef.current.removeChild(renderer.domElement);
//       }
//     };
//   }, []);

//   return <div ref={mountRef} className="absolute inset-0 z-0" />;
// };

// // ─── DATA ─────────────────────────────────────────────────────────────────────
// const SERVICES = [
//   {
//     title: "Bridal Makeup",
//     desc: "Timeless elegance crafted for your most cherished day. Long-wear formulas that last from ceremony to celebration.",
//     icon: "💍",
//     img: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80",
//   },
//   {
//     title: "Glam & Editorial",
//     desc: "Bold, high-fashion looks for photoshoots, galas, and moments that demand a statement.",
//     icon: "✨",
//     img: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&q=80",
//   },
//   {
//     title: "Natural Everyday",
//     desc: "Effortless, luminous looks that enhance your best features while feeling completely like you.",
//     icon: "🌸",
//     img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80",
//   },
//   {
//     title: "Hair Styling",
//     desc: "From romantic waves to sleek updos  complete transformations that complement every makeup vision.",
//     icon: "💫",
//     img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80",
//   },
//   {
//     title: "Graduation & Events",
//     desc: "Look your absolute best for milestone moments, reunions, and every celebration worth remembering.",
//     icon: "🎓",
//     img: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&q=80",
//   },
//   {
//     title: "Brow Artistry",
//     desc: "Precision-sculpted brows that frame the face beautifully  from defined arches to natural fills.",
//     icon: "👁",
//     img: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=600&q=80",
//   },
// ];

// const TESTIMONIALS = [
//   {
//     name: "Camila Raad",
//     text: "They're super talented, professional, and made me feel so confident with my makeup. It lasted all day, and I received so many compliments. Highly recommend  they really listens to what you want and delivers beautifully!",
//     rating: 5,
//     date: "8 months ago",
//   },
//   {
//     name: "Danny Mera",
//     text: "My wife had an incredible experience at  Dead Rose Salon. Their makeup was absolutely flawless  elegant, natural, and enhanced her beauty perfectly. The waves in her hair were soft, defined, and looked amazing the entire day.",
//     rating: 5,
//     date: "8 months ago",
//   },
//   {
//     name: "Ruth Alvarado",
//     text: "I don't usually wear makeup and Dead Rose Salon  knew exactly what to do! they did my makeup for my college graduation and they are very fun to be with, will be back.",
//     rating: 5,
//     date: "10 months ago",
//   },
//   {
//     name: "Verified Client",
//     text: "We highly recommend Dead Rose Salon  to anyone looking for top-notch beauty services! An incredible experience  very professional and with a lot of talent. They welcome their clients with so much love and responsibility.",
//     rating: 5,
//     date: "5 months ago",
//   },
// ];

// const WHY_ITEMS = [
//   { icon: <Award size={22} />, title: "4.7  Rated", desc: "Perfect rating across all 32 verified reviews." },
//   { icon: <Heart size={22} />, title: "Inclusive Studio", desc: "LGBTQ+ friendly, woman & Latino-owned business." },
//   { icon: <Sparkles size={22} />, title: "All-Day Wear", desc: "Formulas and techniques that last from AM to PM." },
//   { icon: <Clock size={22} />, title: "On Your Schedule", desc: "Flexible appointments for events of every scale." },
// ];

// const GALLERY_IMGS = [
//   "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&q=80",
//   "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80",
//   "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80",
//   "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=800&q=80",
//   "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80",
//   "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
// ];

// // ─── NAVBAR ───────────────────────────────────────────────────────────────────
// const Navbar = () => {
//   const [open, setOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);

//   useEffect(() => {
//     const fn = () => setScrolled(window.scrollY > 40);
//     window.addEventListener("scroll", fn);
//     return () => window.removeEventListener("scroll", fn);
//   }, []);

//   const links = ["About", "Services", "Gallery", "Testimonials", "Contact"];

//   return (
//     <>
//       <motion.nav
//         initial={{ y: -80, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
//         className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 transition-all duration-500"
//         style={{
//           background: scrolled ? "rgba(250,247,242,0.92)" : "transparent",
//           backdropFilter: scrolled ? "blur(16px)" : "none",
//           borderBottom: scrolled ? `1px solid rgba(201,160,168,0.2)` : "none",
//         }}
//       >
//         <a href="#hero" className="flex flex-col leading-tight">
//           <span
//             className="text-xl font-light tracking-widest"
//             style={{ fontFamily: "'Cormorant Garamond', serif", color: scrolled ? COLORS.dark : COLORS.ivory }}
//           >
//             Dead Rose Salon 
//           </span>
//           <span className="text-[10px] tracking-[0.35em] uppercase" style={{ color: scrolled ? COLORS.mauve : COLORS.blush }}>
//             Beauty Salon
//           </span>
//         </a>

//         <ul className="hidden md:flex items-center gap-8">
//           {links.map((l) => (
//             <li key={l}>
//               <a
//                 href={`#${l.toLowerCase()}`}
//                 className="text-sm tracking-widest uppercase transition-colors duration-300 hover:opacity-60"
//                 style={{ color: scrolled ? COLORS.dark : COLORS.ivory, fontFamily: "'Jost', sans-serif" }}
//               >
//                 {l}
//               </a>
//             </li>
//           ))}
//         </ul>

//         <a
//           href="tel:+19293952731"
//           className="hidden md:inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm tracking-wider transition-all duration-300 hover:scale-105"
//           style={{
//             background: `linear-gradient(135deg, ${COLORS.blush}, ${COLORS.mauve})`,
//             color: COLORS.ivory,
//             fontFamily: "'Jost', sans-serif",
//           }}
//         >
//           <Phone size={13} /> Book Now
//         </a>

//         <button className="md:hidden" onClick={() => setOpen(!open)}>
//           {open ? (
//             <X size={22} style={{ color: scrolled ? COLORS.dark : COLORS.ivory }} />
//           ) : (
//             <Menu size={22} style={{ color: scrolled ? COLORS.dark : COLORS.ivory }} />
//           )}
//         </button>
//       </motion.nav>

//       <AnimatePresence>
//         {open && (
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8"
//             style={{ background: COLORS.dark }}
//           >
//             {links.map((l) => (
//               <a
//                 key={l}
//                 href={`#${l.toLowerCase()}`}
//                 onClick={() => setOpen(false)}
//                 className="text-3xl font-light tracking-widest"
//                 style={{ fontFamily: "'Cormorant Garamond', serif", color: COLORS.ivory }}
//               >
//                 {l}
//               </a>
//             ))}
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// };

// // ─── HERO ─────────────────────────────────────────────────────────────────────
// const Hero = () => {
//   const { scrollY } = useScroll();
//   const y = useTransform(scrollY, [0, 600], [0, 160]);
//   const opacity = useTransform(scrollY, [0, 400], [1, 0]);

//   return (
//     <section
//       id="hero"
//       className="relative min-h-screen flex items-center justify-center overflow-hidden"
//       style={{ background: COLORS.dark }}
//     >
//       <ThreeHero />

//       {/* BG image */}
//       <motion.div className="absolute inset-0 z-[1]" style={{ y }}>
//         <div
//           className="absolute inset-0"
//           style={{
//             backgroundImage: `url(https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1600&q=80)`,
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//             opacity: 0.25,
//           }}
//         />
//       </motion.div>
//       <div
//         className="absolute inset-0 z-[2]"
//         style={{
//           background: `linear-gradient(160deg, rgba(45,32,40,0.7) 0%, rgba(45,32,40,0.4) 50%, rgba(155,107,117,0.2) 100%)`,
//         }}
//       />

//       <motion.div
//         className="relative z-3 text-center md:pt-8 pt-24 px-6 max-w-4xl mx-auto"
//         style={{ opacity }}
//       >
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1, delay: 0.2 }}
//         >
//           <Label light>Minneapolis, Minnesota</Label>
//         </motion.div>

//         <motion.h1
//           initial={{ opacity: 0, y: 40 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1.1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
//           className="text-6xl md:text-8xl font-light leading-[0.95] mb-6"
//           style={{ fontFamily: "'Cormorant Garamond', serif", color: COLORS.ivory }}
//         >
//           Art That Lives
//           <br />
//           <em style={{ color: COLORS.blush }}>On Your Skin.</em>
//         </motion.h1>

//         <motion.p
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1, delay: 0.55 }}
//           className="text-lg md:text-xl font-light tracking-wide max-w-xl mx-auto mb-10"
//           style={{ color: "rgba(242,196,206,0.8)", fontFamily: "'Jost', sans-serif" }}
//         >
//           Dead Rose Salon Artistry · Makeup Artist · Hairstylist · Bridal, Editorial & Beyond...
//         </motion.p>

//         {/* Stats row */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1, delay: 0.7 }}
//           className="flex items-center justify-center gap-8 mb-10"
//         >
//           {[
//             { val: "4.7 ", label: "Rating" },
//             { val: "48+", label: "Reviews" },
//             { val: "100%", label: "Satisfaction" },
//           ].map((s) => (
//             <div key={s.label} className="text-center">
//               <div
//                 className="text-3xl font-light"
//                 style={{ fontFamily: "'Cormorant Garamond', serif", color: COLORS.blush }}
//               >
//                 {s.val}
//               </div>
//               <div className="text-[10px] tracking-[0.3em] uppercase" style={{ color: COLORS.mauve }}>
//                 {s.label}
//               </div>
//             </div>
//           ))}
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.8, delay: 0.9 }}
//           className="flex flex-col sm:flex-row items-center justify-center gap-4"
//         >
//           <a
//             href="tel:+19293952731"
//             className="group flex items-center gap-3 px-8 py-4 rounded-full text-sm tracking-widest uppercase transition-all duration-500 hover:scale-105 hover:shadow-2xl"
//             style={{
//               background: `linear-gradient(135deg, ${COLORS.blush}, ${COLORS.deepRose})`,
//               color: COLORS.ivory,
//               fontFamily: "'Jost', sans-serif",
//               boxShadow: "0 8px 32px rgba(155,107,117,0.4)",
//             }}
//           >
//             <Phone size={14} />
//             Book Your Session
//             <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
//           </a>
//           <a
//             href="#gallery"
//             className="flex items-center gap-2 px-8 py-4 rounded-full text-sm tracking-widest uppercase border transition-all duration-500 hover:scale-105"
//             style={{
//               borderColor: "rgba(242,196,206,0.4)",
//               color: COLORS.ivory,
//               fontFamily: "'Jost', sans-serif",
//             }}
//           >
//             View Gallery
//           </a>
//         </motion.div>
//       </motion.div>

//       {/* Scroll indicator */}
//       {/* <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 1.5 }}
//         className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[3] flex flex-col items-center gap-2"
//       >
//         <span className="text-[10px] tracking-[0.3em] uppercase" style={{ color: COLORS.mauve }}>
//           Scroll
//         </span>
//         <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}>
//           <ChevronDown size={16} style={{ color: COLORS.blush }} />
//         </motion.div>
//       </motion.div> */}
//     </section>
//   );
// };

// // ─── ABOUT ────────────────────────────────────────────────────────────────────
// const About = () => (
//   <section id="about" className="py-28 relative overflow-hidden" style={{ background: COLORS.warmCream }}>
//     <div
//       className="absolute right-0 top-0 w-1/2 h-full opacity-30"
//       style={{
//         backgroundImage: `url(https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=900&q=80)`,
//         backgroundSize: "cover",
//         backgroundPosition: "center left",
//       }}
//     />
//     <div
//       className="absolute right-0 top-0 w-1/2 h-full"
//       style={{ background: `linear-gradient(90deg, ${COLORS.warmCream} 0%, transparent 60%)` }}
//     />

//     <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-16 items-center">
//       <RevealSection>
//         <Label>The Artist</Label>
//         <Divider />
//         <h2
//           className="text-5xl md:text-6xl font-light leading-tight mb-6"
//           style={{ fontFamily: "'Cormorant Garamond', serif", color: COLORS.dark }}
//         >
//           Where Craft Meets
//           <br />
//           <em style={{ color: COLORS.deepRose }}>Pure Feeling.</em>
//         </h2>
//         <p
//           className="text-base leading-relaxed mb-5 max-w-md"
//           style={{ color: COLORS.muted, fontFamily: "'Jost', sans-serif" }}
//         >
//           Based in Minneapolis, Dead Rose Salon is a makeup artist and hairstylist celebrated for creating looks
//           that feel as good as they appear. With a deep respect for each client's individuality, they blends technical
//           mastery with an intuitive touch.
//         </p>
//         <p
//           className="text-base leading-relaxed mb-8 max-w-md"
//           style={{ color: COLORS.muted, fontFamily: "'Jost', sans-serif" }}
//         >
//           A proudly woman-owned, Latino-owned, LGBTQ+ friendly studio  because beauty belongs to everyone.
//         </p>
//         <div className="flex flex-wrap gap-3">
//           {["Women-Owned", "Latino-Owned", "LGBTQ+ Friendly"].map((tag) => (
//             <span
//               key={tag}
//               className="px-4 py-1.5 rounded-full text-xs tracking-widest uppercase"
//               style={{
//                 background: "rgba(201,160,168,0.12)",
//                 color: COLORS.deepRose,
//                 border: `1px solid rgba(201,160,168,0.3)`,
//                 fontFamily: "'Jost', sans-serif",
//               }}
//             >
//               {tag}
//             </span>
//           ))}
//         </div>
//       </RevealSection>

//       <RevealSection delay={0.2}>
//         <div className="grid grid-cols-2 gap-4">
//           {[
//             { n: "4.7 ", l: "Perfect Rating" },
//             { n: "48+", l: "Happy Clients" },
//             { n: "2+", l: "Years of Art" },
//             { n: "∞", l: "Possibilities" },
//           ].map((s) => (
//             <GlassCard key={s.l} className="p-6 text-center">
//               <div
//                 className="text-4xl font-light mb-1"
//                 style={{ fontFamily: "'Cormorant Garamond', serif", color: COLORS.deepRose }}
//               >
//                 {s.n}
//               </div>
//               <div className="text-xs tracking-[0.25em] uppercase" style={{ color: COLORS.muted, fontFamily: "'Jost', sans-serif" }}>
//                 {s.l}
//               </div>
//             </GlassCard>
//           ))}
//         </div>
//       </RevealSection>
//     </div>
//   </section>
// );

// // ─── SERVICES ─────────────────────────────────────────────────────────────────
// const Services = () => (
//   <section id="services" className="py-28 relative" style={{ background: COLORS.dark }}>
//     <div
//       className="absolute inset-0 opacity-5"
//       style={{
//         backgroundImage: `url(https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1600&q=80)`,
//         backgroundSize: "cover",
//       }}
//     />
//     <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
//       <RevealSection className="text-center mb-16">
//         <Label light>What I Offer</Label>
//         <Divider light />
//         <h2
//           className="text-5xl md:text-6xl font-light"
//           style={{ fontFamily: "'Cormorant Garamond', serif", color: COLORS.ivory }}
//         >
//           Services
//         </h2>
//       </RevealSection>

//       <div className="grid md:grid-cols-3 gap-5">
//         {SERVICES.map((svc, i) => (
//           <RevealSection key={svc.title} delay={i * 0.07}>
//             <motion.div
//               whileHover={{ scale: 1.02, y: -4 }}
//               transition={{ duration: 0.4 }}
//               className="group relative rounded-2xl overflow-hidden cursor-pointer"
//               style={{ height: 280 }}
//             >
//               <div
//                 className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
//                 style={{
//                   backgroundImage: `url(${svc.img})`,
//                   backgroundSize: "cover",
//                   backgroundPosition: "center",
//                 }}
//               />
//               <div
//                 className="absolute inset-0 transition-opacity duration-500"
//                 style={{ background: "linear-gradient(180deg, rgba(45,32,40,0.1) 0%, rgba(45,32,40,0.85) 100%)" }}
//               />
//               <div className="absolute inset-0 p-6 flex flex-col justify-end">
//                 <div className="text-2xl mb-2">{svc.icon}</div>
//                 <h3
//                   className="text-xl font-light mb-2"
//                   style={{ fontFamily: "'Cormorant Garamond', serif", color: COLORS.ivory }}
//                 >
//                   {svc.title}
//                 </h3>
//                 <p className="text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 max-h-0 group-hover:max-h-20 overflow-hidden"
//                   style={{ color: "rgba(250,247,242,0.75)", fontFamily: "'Jost', sans-serif" }}>
//                   {svc.desc}
//                 </p>
//               </div>
//             </motion.div>
//           </RevealSection>
//         ))}
//       </div>
//     </div>
//   </section>
// );

// // ─── WHY CHOOSE US ────────────────────────────────────────────────────────────
// const WhyUs = () => (
//   <section className="py-24 relative" style={{ background: COLORS.warmCream }}>
//     <div className="max-w-5xl mx-auto px-6 md:px-12">
//       <RevealSection className="text-center mb-14">
//         <Label>The Difference</Label>
//         <Divider />
//         <h2
//           className="text-4xl md:text-5xl font-light"
//           style={{ fontFamily: "'Cormorant Garamond', serif", color: COLORS.dark }}
//         >
//           Why Clients Choose Dead Rose Salon
//         </h2>
//       </RevealSection>
//       <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
//         {WHY_ITEMS.map((item, i) => (
//           <RevealSection key={item.title} delay={i * 0.08}>
//             <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.3 }}>
//               <GlassCard className="p-7 text-center h-full">
//                 <div
//                   className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
//                   style={{ background: `linear-gradient(135deg, ${COLORS.blush}, ${COLORS.mauve})`, color: COLORS.ivory }}
//                 >
//                   {item.icon}
//                 </div>
//                 <h3
//                   className="text-lg font-light mb-2"
//                   style={{ fontFamily: "'Cormorant Garamond', serif", color: COLORS.dark }}
//                 >
//                   {item.title}
//                 </h3>
//                 <p className="text-sm leading-relaxed" style={{ color: COLORS.muted, fontFamily: "'Jost', sans-serif" }}>
//                   {item.desc}
//                 </p>
//               </GlassCard>
//             </motion.div>
//           </RevealSection>
//         ))}
//       </div>
//     </div>
//   </section>
// );

// // ─── TESTIMONIALS ─────────────────────────────────────────────────────────────
// const Testimonials = () => {
//   const [active, setActive] = useState(0);

//   useEffect(() => {
//     const t = setInterval(() => setActive((p) => (p + 1) % TESTIMONIALS.length), 5000);
//     return () => clearInterval(t);
//   }, []);

//   return (
//     <section id="testimonials" className="py-28 relative overflow-hidden" style={{ background: COLORS.dark }}>
//       <div
//         className="absolute inset-0 opacity-10"
//         style={{
//           backgroundImage: `url(https://images.unsplash.com/photo-1560066984-138daaa5eae6?w=1600&q=80)`,
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//         }}
//       />
//       <div className="absolute inset-0" style={{ background: "rgba(45,32,40,0.7)" }} />

//       <div className="relative z-10 max-w-3xl mx-auto px-6 md:px-12 text-center">
//         <RevealSection>
//           <Label light>Kind Words From Happy Clients</Label>
//           <Divider light />
//           <h2
//             className="text-4xl md:text-5xl font-light mb-16"
//             style={{ fontFamily: "'Cormorant Garamond', serif", color: COLORS.ivory }}
//           >
//             Client Love
//           </h2>
//         </RevealSection>

//         <div className="relative min-h-[280px]">
//           <AnimatePresence mode="wait">
//             <motion.div
//               key={active}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               transition={{ duration: 0.6 }}
//             >
//               <Quote
//                 size={32}
//                 className="mx-auto mb-6"
//                 style={{ color: COLORS.blush, opacity: 0.5 }}
//               />
//               <p
//                 className="text-xl md:text-2xl font-light leading-relaxed mb-8"
//                 style={{ fontFamily: "'Cormorant Garamond', serif", color: COLORS.ivory }}
//               >
//                 "{TESTIMONIALS[active].text}"
//               </p>
//               <div className="flex items-center justify-center gap-1 mb-3">
//                 {Array.from({ length: 5 }).map((_, i) => (
//                   <Star key={i} size={14} fill={COLORS.blush} stroke="none" />
//                 ))}
//               </div>
//               <p className="text-sm tracking-widest uppercase" style={{ color: COLORS.mauve, fontFamily: "'Jost', sans-serif" }}>
//                 {TESTIMONIALS[active].name}
//               </p>
//               <p className="text-xs mt-1" style={{ color: "rgba(201,160,168,0.5)", fontFamily: "'Jost', sans-serif" }}>
//                 {TESTIMONIALS[active].date}
//               </p>
//             </motion.div>
//           </AnimatePresence>
//         </div>

//         <div className="flex justify-center gap-2 mt-8">
//           {TESTIMONIALS.map((_, i) => (
//             <button
//               key={i}
//               onClick={() => setActive(i)}
//               className="rounded-full transition-all duration-300"
//               style={{
//                 width: i === active ? 24 : 8,
//                 height: 8,
//                 background: i === active ? COLORS.blush : "rgba(201,160,168,0.3)",
//               }}
//             />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// // ─── GALLERY ─────────────────────────────────────────────────────────────────
// const Gallery = () => (
//   <section id="gallery" className="py-28" style={{ background: COLORS.warmCream }}>
//     <div className="max-w-6xl mx-auto px-6 md:px-12">
//       <RevealSection className="text-center mb-14">
//         <Label>Portfolio</Label>
//         <Divider />
//         <h2
//           className="text-4xl md:text-5xl font-light"
//           style={{ fontFamily: "'Cormorant Garamond', serif", color: COLORS.dark }}
//         >
//           The Work
//         </h2>
//       </RevealSection>

//       <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
//         {GALLERY_IMGS.map((src, i) => (
//           <RevealSection key={i} delay={i * 0.06}>
//             <motion.div
//               whileHover={{ scale: 1.03 }}
//               transition={{ duration: 0.4 }}
//               className="relative rounded-2xl overflow-hidden"
//               style={{ aspectRatio: i % 3 === 1 ? "3/4" : "3/4" }}
//             >
//               <div
//                 className="absolute inset-0 transition-transform duration-700 hover:scale-110"
//                 style={{ backgroundImage: `url(${src})`, backgroundSize: "cover", backgroundPosition: "center" }}
//               />
//               <div
//                 className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500 flex items-center justify-center"
//                 style={{ background: "rgba(155,107,117,0.5)" }}
//               >
//                 <Sparkles size={24} style={{ color: COLORS.ivory }} />
//               </div>
//             </motion.div>
//           </RevealSection>
//         ))}
//       </div>
//     </div>
//   </section>
// );

// // ─── CONTACT ─────────────────────────────────────────────────────────────────
// const Contact = () => (
//   <section id="contact" className="py-28 relative" style={{ background: COLORS.dark }}>
//     <div className="max-w-5xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-16 items-start">
//       <RevealSection>
//         <Label light>Get In Touch</Label>
//         <Divider light />
//         <h2
//           className="text-4xl md:text-5xl font-light mb-6"
//           style={{ fontFamily: "'Cormorant Garamond', serif", color: COLORS.ivory }}
//         >
//           Let's Create
//           <br />
//           <em style={{ color: COLORS.blush }}>Something Beautiful.</em>
//         </h2>
//         <p className="text-base leading-relaxed mb-10" style={{ color: "rgba(250,247,242,0.55)", fontFamily: "'Jost', sans-serif" }}>
//           Ready to book your next look? Reach out via phone or Instagram and let's talk about your vision.
//         </p>

//         <div className="space-y-5">
//           {[
//             { icon: <Phone size={16} />, label: "Phone", val: " +1 612-000-000    ", href: "tel: +12677967212 " },
//             { icon: <MapPin size={16} />, label: "Location", val: "1625 Washington St NE, Minneapolis,Minnesota ", href: "#map" },
//             { icon: <FaInstagram size={16} />, label: "Instagram", val: "dead_rose_salon", href: "https://instagram.com" },
//           ].map((c) => (
//             <a
//               key={c.label}
//               href={c.href}
//               className="flex items-center gap-4 group"
//             >
//               <div
//                 className="w-10 h-10 rounded-full flex items-center justify-center transition-transform group-hover:scale-110"
//                 style={{ background: "rgba(242,196,206,0.12)", color: COLORS.blush }}
//               >
//                 {c.icon}
//               </div>
//               <div>
//                 <div className="text-[10px] tracking-[0.3em] uppercase mb-0.5" style={{ color: COLORS.mauve, fontFamily: "'Jost', sans-serif" }}>
//                   {c.label}
//                 </div>
//                 <div className="text-sm" style={{ color: COLORS.ivory, fontFamily: "'Jost', sans-serif" }}>
//                   {c.val}
//                 </div>
//               </div>
//             </a>
//           ))}
//         </div>

//         <div className="flex gap-4 mt-10">
//           <a
//             href="https://instagram.com"
//             target="_blank"
//             className="w-11 h-11 rounded-full flex items-center justify-center transition-all hover:scale-110"
//             style={{ background: "rgba(242,196,206,0.12)", color: COLORS.blush }}
//           >
//             <FaInstagram size={18} />
//           </a>
//           <a
//             href="https://wa.me/19293952731"
//             target="_blank"
//             className="w-11 h-11 rounded-full flex items-center justify-center transition-all hover:scale-110"
//             style={{ background: "rgba(242,196,206,0.12)", color: COLORS.blush }}
//           >
//             <FaWhatsapp size={18} />
//           </a>
//         </div>
//       </RevealSection>

//       <RevealSection delay={0.15}>
//         <GlassCard dark className="p-8">
//           <h3
//             className="text-2xl font-light mb-6"
//             style={{ fontFamily: "'Cormorant Garamond', serif", color: COLORS.ivory }}
//           >
//             Send a Message
//           </h3>
//           <div className="space-y-4">
//             {["Your Name", "Email Address", "Phone Number"].map((ph) => (
//               <input
//                 key={ph}
//                 type="text"
//                 placeholder={ph}
//                 className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-300 focus:ring-1"
//                 style={{
//                   background: "rgba(250,247,242,0.06)",
//                   border: `1px solid rgba(201,160,168,0.2)`,
//                   color: COLORS.ivory,
//                   fontFamily: "'Jost', sans-serif",
//                 }}
//               />
//             ))}
//             <textarea
//               placeholder="Tell me about your vision..."
//               rows={4}
//               className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none transition-all duration-300"
//               style={{
//                 background: "rgba(250,247,242,0.06)",
//                 border: `1px solid rgba(201,160,168,0.2)`,
//                 color: COLORS.ivory,
//                 fontFamily: "'Jost', sans-serif",
//               }}
//             />
//             <motion.button
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               className="w-full py-4 rounded-xl text-sm tracking-widest uppercase transition-all duration-300"
//               style={{
//                 background: `linear-gradient(135deg, ${COLORS.blush}, ${COLORS.deepRose})`,
//                 color: COLORS.ivory,
//                 fontFamily: "'Jost', sans-serif",
//                 boxShadow: "0 8px 24px rgba(155,107,117,0.35)",
//               }}
//             >
//               Send Message
//             </motion.button>
//           </div>
//         </GlassCard>
//       </RevealSection>
//     </div>
//   </section>
// );

// // ─── MAP ──────────────────────────────────────────────────────────────────────
// const MapSection = () => (
//   <section id="map" style={{ background: COLORS.dark }}>
//     <div className="max-w-6xl mx-auto px-6 md:px-12 pb-12">
//       <div className="rounded-2xl overflow-hidden" style={{ height: 360 }}>
//         <iframe
//           title="Malyuun Artistry Location"
//           src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3020.8765!2d-73.8450!3d40.7835!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQ3JzAwLjYiTiA3M8KwNTAnNDIuMCJX!5e0!3m2!1sen!2sus!4v1680000000000!5m2!1sen!2sus"
//           width="100%"
//           height="100%"
//           style={{ border: 0, filter: "grayscale(30%) contrast(0.9) sepia(15%)" }}
//           allowFullScreen
//           loading="lazy"
//         />
//       </div>
//     </div>
//   </section>
// );

// // ─── FOOTER ───────────────────────────────────────────────────────────────────
// const Footer = () => (
//   <footer className="py-12 border-t" style={{ background: COLORS.dark, borderColor: "rgba(201,160,168,0.12)" }}>
//     <div className="max-w-6xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
//       <div>
//         <div
//           className="text-2xl font-light tracking-widest"
//           style={{ fontFamily: "'Cormorant Garamond', serif", color: COLORS.ivory }}
//         >
//           Dead Rose Salon
//         </div>
//         <div className="text-xs tracking-[0.3em] uppercase mt-1" style={{ color: COLORS.mauve, fontFamily: "'Jost', sans-serif" }}>
//           Beauty Salon · Minneapolis, MN
//         </div>
//       </div>
//       <div className="text-xs text-center" style={{ color: "rgba(201,160,168,0.4)", fontFamily: "'Jost', sans-serif" }}>
//         © {new Date().getFullYear()} Dead Rose Salon Beauty Salon. All rights reserved.
//       </div>
//       <div className="flex gap-4">
//         <a href="https://instagram.com" target="_blank" className="transition-opacity hover:opacity-60" style={{ color: COLORS.blush }}>
//           <FaInstagram size={18} />
//         </a>
//         <a href="https://wa.me/19293952731" target="_blank" className="transition-opacity hover:opacity-60" style={{ color: COLORS.blush }}>
//           <FaWhatsapp size={18} />
//         </a>
//       </div>
//     </div>
//   </footer>
// );

// // ─── FLOATING CTA ─────────────────────────────────────────────────────────────
// const FloatingCTA = () => {
//   const [visible, setVisible] = useState(false);
//   useEffect(() => {
//     const fn = () => setVisible(window.scrollY > 400);
//     window.addEventListener("scroll", fn);
//     return () => window.removeEventListener("scroll", fn);
//   }, []);

//   return (
//     <AnimatePresence>
//       {visible && (
//         <motion.a
//           href="tel:+19293952731"
//           initial={{ opacity: 0, scale: 0.8, y: 20 }}
//           animate={{ opacity: 1, scale: 1, y: 0 }}
//           exit={{ opacity: 0, scale: 0.8, y: 20 }}
//           whileHover={{ scale: 1.06 }}
//           className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3 rounded-full shadow-2xl text-sm tracking-wider"
//           style={{
//             background: `linear-gradient(135deg, ${COLORS.blush}, ${COLORS.deepRose})`,
//             color: COLORS.ivory,
//             fontFamily: "'Jost', sans-serif",
//             boxShadow: "0 8px 32px rgba(155,107,117,0.5)",
//           }}
//         >
//           <Phone size={14} />
//           Book Now
//         </motion.a>
//       )}
//     </AnimatePresence>
//   );
// };

// // ─── FONT LOADER ─────────────────────────────────────────────────────────────
// const FontLoader = () => (
//   <style>{`
//     @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@300;400;500&display=swap');
//     * { box-sizing: border-box; }
//     html { scroll-behavior: smooth; }
//     ::placeholder { color: rgba(201,160,168,0.45) !important; }
//   `}</style>
// );

// // ─── PAGE EXPORT ─────────────────────────────────────────────────────────────
// export default function MeybolGonzalezPage() {
//   return (
//     <>
//       <FontLoader />
//       <ScrollProgress />
//       <Navbar />
//       <main>
//         <Hero />
//         <About />
//         <Services />
//         <WhyUs />
//         <Testimonials />
//         <Gallery />
//         <Contact />
//         <MapSection />
//       </main>
//       <Footer />
//       <FloatingCTA />
//     </>
//   );
// }