// "use client";

// import React, { useState, useEffect, useRef } from "react";
// import {
//   motion,
//   AnimatePresence,
//   useScroll,
//   useTransform,
//   useReducedMotion,
//   useMotionValue,
//   useSpring,
// } from "framer-motion";
// import {
//   Menu,
//   X,
//   Mail,
//   ArrowRight,
//   ArrowUpRight,
//   ChevronDown,
//   MapPin,
//   Star,
//   Sparkles,
//   Quote,
// } from "lucide-react";
// import { FaInstagram, FaWhatsapp, FaTiktok } from "react-icons/fa";

// /* ==================================================
//    FONTS
//    ================================================== */

// function FontImports() {
//   return (
//     <style jsx global>{`
//       @import url("https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,wght@0,400;0,500;0,600;0,700;1,500&family=Outfit:wght@300;400;500;600;700&family=Give+You+Glory&display=swap");

//       .font-display {
//         font-family: "Bodoni Moda", serif;
//       }
//       .font-body {
//         font-family: "Outfit", sans-serif;
//       }
//       .font-script {
//         font-family: "Give You Glory", cursive;
//       }

//       html {
//         scroll-behavior: smooth;
//       }

//       ::selection {
//         background-color: #e8407a;
//         color: #f7ecf3;
//       }
//     `}</style>
//   );
// }

// /* ==================================================
//    DATA
//    ================================================== */

// const RATING = 4.8;
// const REVIEW_COUNT = 23;

// const NAV_LINKS = [
//   { label: "Home", href: "#home" },
//   { label: "Studio", href: "#studio" },
//   { label: "Services", href: "#services" },
//   { label: "Gallery", href: "#gallery" },
//   { label: "Reviews", href: "#reviews" },
//   { label: "Book", href: "#contact" },
// ];

// const TICKER_ITEMS = [
//   "BALAYAGE & COLOUR",
//   "BRIDAL GLAM",
//   "LASH & BROW",
//   "4.8 ★ ON GOOGLE",
//   "MANCHESTER, M1",
//   "BOOK ONLINE",
// ];

// const SERVICES = [
//   {
//     title: "Signature Glam",
//     price: "From £45",
//     description:
//       "Full makeup application tailored to your features, event and personal style.",
//     image:
//       "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1000&q=80",
//   },
//   {
//     title: "Balayage & Colour",
//     price: "From £120",
//     description:
//       "Hand-painted colour and dimension, finished with a gloss and blow-dry.",
//     image:
//       "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1000&q=80",
//   },
//   {
//     title: "Lash Extensions",
//     price: "From £55",
//     description:
//       "Classic, hybrid or volume sets, customised to your natural lash line.",
//     image:
//       "https://images.unsplash.com/photo-1583001931096-959e9a1a6223?auto=format&fit=crop&w=1000&q=80",
//   },
//   {
//     title: "Brow Sculpt & Tint",
//     price: "From £25",
//     description:
//       "Shape, tint and laminate for brows that frame your face perfectly.",
//     image:
//       "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80",
//   },
//   {
//     title: "Luxury Facial",
//     price: "From £65",
//     description:
//       "A results-driven treatment facial, personalised to your skin's needs.",
//     image:
//       "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=1000&q=80",
//   },
//   {
//     title: "Bridal Package",
//     price: "Bespoke pricing",
//     description:
//       "Hair, makeup and skin prep for your wedding day, trial included.",
//     image:
//       "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80",
//   },
// ];

// const GALLERY_ITEMS = [
//   {
//     category: "Makeup",
//     image:
//       "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=1000&q=80",
//     orientation: "portrait",
//   },
//   {
//     category: "Hair",
//     image:
//       "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=1200&q=80",
//     orientation: "landscape",
//   },
//   {
//     category: "Lashes",
//     image:
//       "https://images.unsplash.com/photo-1610555356070-d0efb6505f81?auto=format&fit=crop&w=1000&q=80",
//     orientation: "portrait",
//   },
// //   {
// //     category: "Bridal",
// //     image:
// //       "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?auto=format&fit=crop&w=1000&q=80",
// //     orientation: "portrait",
// //   },
//   {
//     category: "Studio",
//     image:
//       "https://images.unsplash.com/photo-1633681926035-ec1ac984418a?auto=format&fit=crop&w=1200&q=80",
//     orientation: "landscape",
//   },
//   {
//     category: "Makeup",
//     image:
//       "https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=1000&q=80",
//     orientation: "portrait",
//   },
//   {
//     category: "Hair",
//     image:
//       "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80",
//     orientation: "landscape",
//   },
// //   {
// //     category: "Lashes",
// //     image:
// //       "https://images.unsplash.com/photo-1583001931096-959e9a1a6223?auto=format&fit=crop&w=1000&q=80",
// //     orientation: "portrait",
// //   },
// ];

// const GALLERY_FILTERS = ["All", "Makeup", "Hair", "Lashes", "Bridal", "Studio"];

// const PROCESS_STEPS = [
//   {
//     number: "01",
//     title: "Consult",
//     description:
//       "We talk through your look, your skin or hair goals, and what the occasion calls for.",
//   },
//   {
//     number: "02",
//     title: "Transform",
//     description:
//       "Premium products, precise technique, and an eye for detail at every stage.",
//   },
//   {
//     number: "03",
//     title: "Glow",
//     description:
//       "Leave feeling like the best, most polished version of yourself   every time.",
//   },
// ];

// const TESTIMONIALS = [
//   {
//     quote:
//       "Booked in for a bridal trial and left in tears   happy ones. Perfection.",
//     name: "Chloe",
//     location: "Didsbury",
//   },
//   {
//     quote: "My balayage has never looked this natural. Genuinely obsessed.",
//     name: "Amara",
//     location: "Northern Quarter",
//   },
//   {
//     quote: "The lash tech has magic hands. Fullest, softest set I've had.",
//     name: "Erin",
//     location: "Chorlton",
//   },
//   {
//     quote: "Walked in stressed, walked out glowing. Worth every penny.",
//     name: "Priya",
//     location: "Salford Quays",
//   },
// ];

// const SERVICE_OPTIONS = [
//   "Signature Glam",
//   "Balayage & Colour",
//   "Lash Extensions",
//   "Brow Sculpt & Tint",
//   "Luxury Facial",
//   "Bridal Package",
// ];

// /* ==================================================
//    RATING WIDGET
//    ================================================== */

// function RatingStars({
//   size = "w-4 h-4",
//   light = false,
// }: {
//   size?: string;
//   light?: boolean;
// }) {
//   const fillPercent = (RATING / 5) * 100;
//   return (
//     <div className="relative inline-flex">
//       <div className={`flex gap-0.5 ${light ? "text-[#F7ECF3]/25" : "text-[#1A0E17]/20"}`}>
//         {Array.from({ length: 5 }).map((_, i) => (
//           <Star key={i} className={`${size} fill-current`} />
//         ))}
//       </div>
//       <motion.div
//         initial={{ width: "0%" }}
//         whileInView={{ width: `${fillPercent}%` }}
//         viewport={{ once: true }}
//         transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
//         className="absolute inset-y-0 left-0 overflow-hidden"
//       >
//         <div className="flex gap-0.5 text-[#D9B36C]">
//           {Array.from({ length: 5 }).map((_, i) => (
//             <Star key={i} className={`${size} fill-current flex-shrink-0`} />
//           ))}
//         </div>
//       </motion.div>
//     </div>
//   );
// }

// function RatingBadge({ light = false }: { light?: boolean }) {
//   return (
//     <div className="inline-flex items-center gap-2.5">
//       <RatingStars light={light} />
//       <span
//         className={`font-body text-sm ${light ? "text-[#F7ECF3]/85" : "text-[#1A0E17]/75"}`}
//       >
//         <strong className="font-semibold">{RATING}</strong> · {REVIEW_COUNT} reviews
//       </span>
//     </div>
//   );
// }

// /* ==================================================
//    SHARED SUB-COMPONENTS
//    ================================================== */

// function Eyebrow({ children }: { children: React.ReactNode }) {
//   return (
//     <span className="font-body text-xs md:text-sm tracking-[0.35em] uppercase text-[#E8407A]">
//       {children}
//     </span>
//   );
// }

// function SectionHeading({
//   eyebrow,
//   lines,
//   align = "left",
//   dark = false,
// }: {
//   eyebrow?: string;
//   lines: string[];
//   align?: "left" | "center";
//   dark?: boolean;
// }) {
//   return (
//     <div className={align === "center" ? "text-center" : "text-left"}>
//       {eyebrow && (
//         <motion.div
//           initial={{ opacity: 0, y: 12 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true, margin: "-80px" }}
//           transition={{ duration: 0.6 }}
//           className="mb-4 flex items-center gap-3"
//           style={{ justifyContent: align === "center" ? "center" : "flex-start" }}
//         >
//           <span className="h-px w-8 bg-[#E8407A]" />
//           <Eyebrow>{eyebrow}</Eyebrow>
//         </motion.div>
//       )}
//       <h2
//         className={`font-display font-medium italic leading-[0.95] ${
//           dark ? "text-[#1A0E17]" : "text-[#F7ECF3]"
//         } text-4xl sm:text-5xl md:text-6xl lg:text-7xl`}
//       >
//         {lines.map((line, i) => (
//           <span key={i} className="block overflow-hidden">
//             <motion.span
//               initial={{ y: "100%" }}
//               whileInView={{ y: 0 }}
//               viewport={{ once: true, margin: "-80px" }}
//               transition={{
//                 duration: 0.8,
//                 delay: i * 0.12,
//                 ease: [0.22, 1, 0.36, 1],
//               }}
//               className="block"
//             >
//               {line}
//             </motion.span>
//           </span>
//         ))}
//       </h2>
//     </div>
//   );
// }

// /* Magnetic + glowing button */
// function MagneticButton({
//   children,
//   variant = "solid",
//   href,
//   onClick,
//   className = "",
// }: {
//   children: React.ReactNode;
//   variant?: "solid" | "outline";
//   href?: string;
//   onClick?: () => void;
//   className?: string;
// }) {
//   const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
//   const x = useMotionValue(0);
//   const y = useMotionValue(0);
//   const springX = useSpring(x, { stiffness: 220, damping: 16, mass: 0.3 });
//   const springY = useSpring(y, { stiffness: 220, damping: 16, mass: 0.3 });

//   const handleMouseMove = (e: React.MouseEvent) => {
//     const el = ref.current;
//     if (!el) return;
//     const rect = el.getBoundingClientRect();
//     x.set((e.clientX - rect.left - rect.width / 2) * 0.3);
//     y.set((e.clientY - rect.top - rect.height / 2) * 0.4);
//   };
//   const handleMouseLeave = () => {
//     x.set(0);
//     y.set(0);
//   };

//   const base =
//     "group relative inline-flex items-center gap-3 px-8 py-4 font-body text-xs md:text-sm tracking-[0.2em] uppercase overflow-hidden transition-colors duration-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E8407A]";
//   const solid =
//     "bg-gradient-to-r from-[#E8407A] to-[#D9B36C] text-[#1A0E17] hover:text-[#F7ECF3]";
//   const outline = "border border-[#F7ECF3]/40 text-[#F7ECF3] hover:border-[#F7ECF3]";

//   const content = (
//     <>
//       {variant === "solid" && (
//         <span className="absolute inset-0 -translate-x-full bg-[#1A0E17] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0" />
//       )}
//       <span className="relative z-10">{children}</span>
//       <ArrowRight className="relative z-10 w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" />
//     </>
//   );

//   return React.createElement(
//     href ? motion.a : motion.button,
//     {
//       ref,
//       href,
//       onClick,
//       style: { x: springX, y: springY },
//       onMouseMove: handleMouseMove,
//       onMouseLeave: handleMouseLeave,
//       className: `${base} ${variant === "solid" ? solid : outline} ${className}`,
//     },
//     content
//   );
// }

// /* Tilt card wrapper   3D hover tilt for gallery/service cards */
// function TiltCard({
//   children,
//   className = "",
// }: {
//   children: React.ReactNode;
//   className?: string;
// }) {
//   const ref = useRef<HTMLDivElement>(null);
//   const rotateX = useMotionValue(0);
//   const rotateY = useMotionValue(0);
//   const sRotateX = useSpring(rotateX, { stiffness: 200, damping: 20 });
//   const sRotateY = useSpring(rotateY, { stiffness: 200, damping: 20 });

//   const handleMove = (e: React.MouseEvent) => {
//     const el = ref.current;
//     if (!el) return;
//     const rect = el.getBoundingClientRect();
//     const px = (e.clientX - rect.left) / rect.width - 0.5;
//     const py = (e.clientY - rect.top) / rect.height - 0.5;
//     rotateY.set(px * 10);
//     rotateX.set(py * -10);
//   };
//   const handleLeave = () => {
//     rotateX.set(0);
//     rotateY.set(0);
//   };

//   return (
//     <motion.div
//       ref={ref}
//       onMouseMove={handleMove}
//       onMouseLeave={handleLeave}
//       style={{
//         rotateX: sRotateX,
//         rotateY: sRotateY,
//         transformPerspective: 800,
//       }}
//       className={className}
//     >
//       {children}
//     </motion.div>
//   );
// }

// /* Blob field   animated gradient blobs used behind hero / CTA */
// function BlobField({ variant = "hero" }: { variant?: "hero" | "cta" }) {
//   const shouldReduceMotion = useReducedMotion();
//   if (shouldReduceMotion) return null;
//   return (
//     <div className="absolute inset-0 overflow-hidden pointer-events-none">
//       <motion.div
//         animate={{
//           x: [0, 60, -20, 0],
//           y: [0, -40, 30, 0],
//           scale: [1, 1.15, 0.95, 1],
//         }}
//         transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
//         className={`absolute w-[32rem] h-[32rem] rounded-full blur-[100px] ${
//           variant === "hero"
//             ? "top-[-10%] right-[-5%] bg-[#E8407A]/25"
//             : "top-1/4 left-1/5 bg-[#E8407A]/25"
//         }`}
//       />
//       <motion.div
//         animate={{
//           x: [0, -50, 30, 0],
//           y: [0, 40, -20, 0],
//           scale: [1, 0.9, 1.1, 1],
//         }}
//         transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
//         className={`absolute w-[28rem] h-[28rem] rounded-full blur-[100px] ${
//           variant === "hero"
//             ? "bottom-[-15%] left-[-5%] bg-[#D9B36C]/20"
//             : "bottom-1/4 right-1/5 bg-[#D9B36C]/20"
//         }`}
//       />
//     </div>
//   );
// }

// /* Cursor spotlight for hero */
// function CursorSpotlight() {
//   const [pos, setPos] = useState({ x: -300, y: -300 });
//   const shouldReduceMotion = useReducedMotion();

//   if (shouldReduceMotion) return null;

//   return (
//     <div
//       onMouseMove={(e) => {
//         const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
//         setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
//       }}
//       className="absolute inset-0 z-[1]"
//     >
//       <div
//         className="absolute w-[420px] h-[420px] rounded-full pointer-events-none transition-transform duration-100 ease-out"
//         style={{
//           left: pos.x - 210,
//           top: pos.y - 210,
//           background:
//             "radial-gradient(circle, rgba(232,64,122,0.18) 0%, rgba(217,179,108,0.08) 45%, transparent 70%)",
//         }}
//       />
//     </div>
//   );
// }

// function Ticker() {
//   const loopItems = [...TICKER_ITEMS, ...TICKER_ITEMS];
//   return (
//     <div className="relative bg-gradient-to-r from-[#E8407A] to-[#D9B36C] py-3 overflow-hidden">
//       <motion.div
//         animate={{ x: ["0%", "-50%"] }}
//         transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
//         className="flex whitespace-nowrap"
//       >
//         {loopItems.map((item, i) => (
//           <span
//             key={i}
//             className="font-body font-medium text-xs md:text-sm tracking-[0.25em] uppercase text-[#1A0E17] mx-6 flex items-center gap-6"
//           >
//             {item}
//             <Sparkles className="w-3.5 h-3.5" />
//           </span>
//         ))}
//       </motion.div>
//     </div>
//   );
// }

// /* ==================================================
//    NAVIGATION
//    ================================================== */

// function Navigation() {
//   const [scrolled, setScrolled] = useState(false);
//   const [mobileOpen, setMobileOpen] = useState(false);

//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 40);
//     window.addEventListener("scroll", onScroll);
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   return (
//     <>
//       <motion.header
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
//         className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
//           scrolled
//             ? "bg-[#1A0E17]/85 backdrop-blur-md py-4 shadow-[0_1px_0_rgba(247,236,243,0.08)]"
//             : "bg-transparent py-6 md:py-8"
//         }`}
//       >
//         <nav className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
//           <a href="#home" className="flex flex-col leading-none">
//             <span className="font-display italic text-xl md:text-2xl tracking-[0.05em] text-[#F7ECF3]">
//               Glamour Studio
//             </span>
//             <span className="font-body text-[10px] tracking-[0.4em] text-[#D9B36C] mt-0.5">
//               MANCHESTER
//             </span>
//           </a>

//           <ul className="hidden lg:flex items-center gap-9 font-body text-xs tracking-[0.2em] uppercase text-[#F7ECF3]/90">
//             {NAV_LINKS.map((link) => (
//               <li key={link.label}>
//                 <a
//                   href={link.href}
//                   className="relative py-1 transition-colors hover:text-[#E8407A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E8407A] after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-[#E8407A] after:transition-all after:duration-300 hover:after:w-full"
//                 >
//                   {link.label}
//                 </a>
//               </li>
//             ))}
//           </ul>

//           <div className="hidden lg:block">
//             <a
//               href="#contact"
//               className="font-body rounded-full text-xs tracking-[0.2em] uppercase bg-gradient-to-r from-[#E8407A] to-[#D9B36C] text-[#1A0E17] px-6 py-3 transition-transform duration-300 hover:scale-105 inline-block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F7ECF3]"
//             >
//               Book Now
//             </a>
//           </div>

//           <button
//             aria-label="Open menu"
//             onClick={() => setMobileOpen(true)}
//             className="lg:hidden text-[#F7ECF3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E8407A]"
//           >
//             <Menu className="w-7 h-7" />
//           </button>
//         </nav>
//       </motion.header>

//       <AnimatePresence>
//         {mobileOpen && (
//           <motion.div
//             initial={{ opacity: 0, scale: 1.05 }}
//             animate={{ opacity: 1, scale: 1 }}
//             exit={{ opacity: 0, scale: 1.05 }}
//             transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
//             className="fixed inset-0 z-[60] bg-[#1A0E17] flex flex-col"
//           >
//             <div className="flex items-center justify-between px-6 py-6">
//               <span className="font-display italic text-xl text-[#F7ECF3]">
//                 Glamour Studio MCR
//               </span>
//               <button
//                 aria-label="Close menu"
//                 onClick={() => setMobileOpen(false)}
//                 className="text-[#F7ECF3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E8407A]"
//               >
//                 <X className="w-7 h-7" />
//               </button>
//             </div>
//             <ul className="flex-1 flex flex-col items-start justify-center gap-2 px-8">
//               {NAV_LINKS.map((link, i) => (
//                 <motion.li
//                   key={link.label}
//                   initial={{ opacity: 0, x: -20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ delay: 0.1 + i * 0.07 }}
//                   className="w-full border-b border-[#F7ECF3]/10 py-4"
//                 >
//                   <a
//                     href={link.href}
//                     onClick={() => setMobileOpen(false)}
//                     className="font-display italic text-4xl text-[#F7ECF3] hover:text-[#E8407A] transition-colors"
//                   >
//                     {link.label}
//                   </a>
//                 </motion.li>
//               ))}
//             </ul>
//             {/* <div className="px-8 pb-10">
//               <a
//                 href="#contact"
//                 onClick={() => setMobileOpen(false)}
//                 className="inline-flex rounded-full items-center gap-3 bg-gradient-to-r from-[#E8407A] to-[#D9B36C] text-[#1A0E17] px-8 py-4 font-body text-xs tracking-[0.2em] uppercase"
//               >
//                 Book Now <ArrowRight className="w-4 h-4" />
//               </a>
//             </div> */}
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </>
//   );
// }

// /* ==================================================
//    HERO
//    ================================================== */

// function Hero() {
//   const shouldReduceMotion = useReducedMotion();
//   const ref = useRef<HTMLDivElement>(null);
//   const { scrollYProgress } = useScroll({
//     target: ref,
//     offset: ["start start", "end start"],
//   });
//   const y = useTransform(scrollYProgress, [0, 1], ["0%", shouldReduceMotion ? "0%" : "22%"]);
//   const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

//   const headline = ["GLAMOUR", "MEETS", "BEAUTY & GRACE."];

//   return (
//     <section
//       id="home"
//       ref={ref}
//       className="relative  min-h-[680px] w-full overflow-hidden bg-[#1A0E17]"
//     >
//       <motion.div
//         style={{ y }}
//         initial={{ scale: 1.15 }}
//         animate={{ scale: 1 }}
//         transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
//         className="absolute inset-0"
//       >
//         <img
//           src="https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=1920&q=80"
//           alt="Editorial beauty portrait with radiant glam makeup"
//           className="w-full h-full object-cover"
//         />
//       </motion.div>

//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 1.8 }}
//         className="absolute inset-0 bg-gradient-to-t from-[#1A0E17] via-[#1A0E17]/55 to-[#1A0E17]/20"
//       />
//       <div className="absolute inset-0 bg-gradient-to-r from-[#1A0E17]/70 via-transparent to-[#2B0F23]/40" />

//       <BlobField variant="hero" />
//       <CursorSpotlight />

//       <motion.div style={{ opacity }} className="relative z-10 h-full flex flex-col justify-end">
//         <div className="max-w-7xl mx-auto w-full px-6 md:px-10 pb-20 md:pb-24">
//           <motion.div
//             initial={{ opacity: 0, y: 12 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.9, duration: 0.8 }}
//             className="flex pt-32 flex-wrap items-center gap-x-4 gap-y-2 mb-6"
//           >
//             <div className="flex items-center gap-3">
//               <span className="h-px w-10 bg-[#D9B36C]" />
//               <Eyebrow>Manchester's Glam Destination</Eyebrow>
//             </div>
//             <RatingBadge light />
//           </motion.div>

//           <h1 className="font-display italic font-medium text-[#F7ECF3] leading-[0.92] text-6xl sm:text-7xl md:text-8xl lg:text-[7.5rem]">
//             {headline.map((word, i) => (
//               <span key={word} className="block overflow-hidden">
//                 <motion.span
//                   initial={{ y: "110%" }}
//                   animate={{ y: 0 }}
//                   transition={{
//                     delay: 1.1 + i * 0.15,
//                     duration: 0.9,
//                     ease: [0.22, 1, 0.36, 1],
//                   }}
//                   className="block"
//                 >
//                   {i === 1 ? (
//                     <>
//                       <span className="not-italic bg-gradient-to-r from-[#E8407A] to-[#D9B36C] bg-clip-text text-transparent">
//                         MEETS
//                       </span>{" "}
//                       {/* POSTCODE. */}
//                     </>
//                   ) : (
//                     word
//                   )}
//                 </motion.span>
//               </span>
//             ))}
//           </h1>

//           <motion.p
//             initial={{ opacity: 0, y: 16 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 1.7, duration: 0.8 }}
//             className="font-body text-[#F7ECF3]/80 text-base md:text-lg max-w-md mt-8 leading-relaxed"
//           >
//             Hair, makeup, lashes and skin   all under one roof in the heart
//             of Manchester, for every occasion that calls for a little
//             sparkle.
//           </motion.p>

//           <motion.div
//             initial={{ opacity: 0, y: 16 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 1.9, duration: 0.8 }}
//             className="flex flex-wrap items-center gap-4 mt-10"
//           >
//             <MagneticButton className="rounded-full" href="#contact">Book Your Appointment</MagneticButton>
//             <MagneticButton className="rounded-full" href="#gallery" variant="outline">
//               View the Gallery
//             </MagneticButton>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 2.2, duration: 0.8 }}
//             className="flex items-center gap-2 mt-12 text-[#F7ECF3]/60 font-body text-xs tracking-[0.2em] uppercase"
//           >
//             <MapPin className="w-3.5 h-3.5" />
//             King Street, Manchester, M2
//           </motion.div>
//         </div>
//       </motion.div>

//       {/* <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 2.4, duration: 1 }}
//         className="absolute bottom-8 right-6 md:right-10 z-10 flex flex-col items-center gap-2 text-[#F7ECF3]/70"
//       >
//         <span className="font-body text-[10px] tracking-[0.3em] uppercase [writing-mode:vertical-rl]">
//           Scroll
//         </span>
//         <motion.div
//           animate={shouldReduceMotion ? {} : { y: [0, 8, 0] }}
//           transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
//         >
//           <ChevronDown className="w-4 h-4" />
//         </motion.div>
//       </motion.div> */}
//     </section>
//   );
// }

// /* ==================================================
//    STUDIO / ABOUT
//    ================================================== */

// function Studio() {
//   return (
//     <section id="studio" className="relative bg-[#F7ECF3] py-28 md:py-40 overflow-hidden">
//       <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
//         <div className="lg:col-span-5 order-2 lg:order-1">
//           <SectionHeading
//             eyebrow="The Studio"
//             lines={["Made For The", "Way You", "Want To Feel."]}
//             dark
//           />
//           <motion.p
//             initial={{ opacity: 0, y: 16 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true, margin: "-80px" }}
//             transition={{ duration: 0.7, delay: 0.3 }}
//             className="font-body text-[#1A0E17]/70 text-base md:text-lg leading-relaxed mt-8 max-w-md"
//           >
//             Glamour Studio MCR brings hair, makeup, lashes and skin together
//             in one bright, sociable space in the city centre. No two
//             appointments look the same   because no two clients do.
//           </motion.p>
//           <motion.p
//             initial={{ opacity: 0, y: 16 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true, margin: "-80px" }}
//             transition={{ duration: 0.7, delay: 0.45 }}
//             className="font-body text-[#1A0E17]/70 text-base md:text-lg leading-relaxed mt-4 max-w-md"
//           >
//             Rated <strong className="text-[#1A0E17]">{RATING} stars</strong>{" "}
//             from {REVIEW_COUNT} reviews, we're proud to be one of Manchester's
//             most-loved beauty studios.
//           </motion.p>
//           <motion.div
//             initial={{ opacity: 0, y: 16 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.7, delay: 0.6 }}
//             className="mt-10"
//           >
//             <MagneticButton
//               href="#services"
//               variant="outline"
//               className="!text-[#1A0E17] rounded-full !border-[#1A0E17]/30 hover:!border-[#1A0E17]"
//             >
//               Explore Services
//             </MagneticButton>
//           </motion.div>
//         </div>

//         <div className="lg:col-span-7 order-1 lg:order-2 relative">
//           <motion.div
//             initial={{ opacity: 0, scale: 1.08 }}
//             whileInView={{ opacity: 1, scale: 1 }}
//             viewport={{ once: true, margin: "-100px" }}
//             transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
//             className="relative rounded-4xl aspect-[4/5] md:aspect-[16/11] w-full overflow-hidden"
//           >
//             <img
//               src="https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=1000&q=80"

//               alt="Interior of Glamour Studio MCR beauty salon in Manchester"
//               className="w-full h-full object-cover"
//             />
//           </motion.div>
//           <motion.div
//             initial={{ opacity: 0, x: -30, y: 30, rotate: -4 }}
//             whileInView={{ opacity: 1, x: 0, y: 0, rotate: -3 }}
//             viewport={{ once: true, margin: "-60px" }}
//             transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
//             className="hidden rounded-4xl md:block absolute -bottom-10 -left-10 w-56 aspect-[3/4] overflow-hidden shadow-2xl border-4 border-[#F7ECF3]"
//           >
//             <img
//               src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80"

//               alt="Close-up of makeup application at Glamour Studio MCR"
//               className="w-full rounded-4xl h-full object-cover"
//             />
//           </motion.div>
//           <motion.div
//             initial={{ opacity: 0, scale: 0.8 }}
//             whileInView={{ opacity: 1, scale: 1 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.7, delay: 0.7 }}
//             className="hidden md:flex absolute rounded-4xl top-6 right-6 items-center gap-2 bg-[#1A0E17]/80 backdrop-blur-sm px-4 py-3"
//           >
//             <RatingStars size="w-3.5 h-3.5" light />
//             <span className="font-body text-xs text-[#F7ECF3]/90">
//               {RATING} ({REVIEW_COUNT})
//             </span>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// }

// /* ==================================================
//    SERVICES
//    ================================================== */

// function Services() {
//   return (
//     <section id="services" className="relative bg-[#1A0E17] py-28 md:py-40">
//       <div className="max-w-7xl mx-auto px-6 md:px-10">
//         <div className="max-w-2xl mb-16 md:mb-24">
//           <SectionHeading eyebrow="Services" lines={["Your Look.", "Your Way."]} />
//         </div>

//         <div className="grid grid-cols-1 rounded-4xl sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
//           {SERVICES.map((service, i) => (
//             <motion.div
//               key={service.title}
//               initial={{ opacity: 0, y: 40 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true, margin: "-60px" }}
//               transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
//             >
//               <TiltCard className="group relative overflow-hidden aspect-[4/5]">
//                 <img
//                   src={service.image}
//                   alt={`${service.title} at Glamour Studio MCR`}
//                   className="w-full rounded-4xl h-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-[#1A0E17] via-[#1A0E17]/30 to-transparent" />
//                 <div className="absolute inset-0 flex flex-col justify-end p-6">
//                   <span className="font-body text-[#D9B36C] text-xs tracking-[0.2em] uppercase mb-2">
//                     {service.price}
//                   </span>
//                   <h3 className="font-display italic text-[#F7ECF3] text-2xl md:text-3xl mb-3">
//                     {service.title}
//                   </h3>
//                   <p className="font-body text-[#F7ECF3]/70 text-sm leading-relaxed max-h-0 opacity-0 translate-y-2 group-hover:max-h-24 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 overflow-hidden">
//                     {service.description}
//                   </p>
//                 </div>
//                 <div className="absolute top-5 right-5 w-9 h-9 rounded-full bg-gradient-to-br from-[#E8407A] to-[#D9B36C] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:rotate-45">
//                   <ArrowUpRight className="w-4 h-4 text-[#1A0E17]" />
//                 </div>
//               </TiltCard>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// /* ==================================================
//    CINEMATIC STATEMENT
//    ================================================== */

// function CinematicStatement() {
//   const shouldReduceMotion = useReducedMotion();
//   const ref = useRef<HTMLDivElement>(null);
//   const { scrollYProgress } = useScroll({
//     target: ref,
//     offset: ["start end", "end start"],
//   });
//   const y = useTransform(scrollYProgress, [0, 1], ["-8%", shouldReduceMotion ? "-8%" : "8%"]);

//   return (
//     <section ref={ref} className="relative h-[80vh] min-h-[520px] overflow-hidden">
//       <motion.div style={{ y }} className="absolute inset-0 scale-110">
//         <img
//           src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1920&q=80"
//           alt="Editorial close-up portrait with bold glamour makeup"
//           className="w-full h-full object-cover"
//         />
//       </motion.div>
//       <div className="absolute inset-0 bg-gradient-to-t from-[#1A0E17] via-[#1A0E17]/50 to-[#2B0F23]/40" />
//       <div className="relative z-10 h-full flex items-center justify-center px-6">
//         <motion.blockquote
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true, margin: "-100px" }}
//           transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
//           className="text-center max-w-4xl"
//         >
//           <Quote className="w-8 h-8 text-[#D9B36C] mx-auto mb-6" />
//           <p className="font-display italic text-[#F7ECF3] text-3xl sm:text-4xl md:text-6xl leading-tight">
//             &ldquo;Glow isn&rsquo;t given.
//             <br />
//             <span className="bg-gradient-to-r from-[#E8407A] to-[#D9B36C] bg-clip-text text-transparent">
//               It&rsquo;s crafted.&rdquo;
//             </span>
//           </p>
//         </motion.blockquote>
//       </div>
//     </section>
//   );
// }

// /* ==================================================
//    GALLERY
//    ================================================== */

// function Gallery() {
//   const [filter, setFilter] = useState("All");
//   const items =
//     filter === "All"
//       ? GALLERY_ITEMS
//       : GALLERY_ITEMS.filter((item) => item.category === filter);

//   return (
//     <section id="gallery" className="relative bg-[#F7ECF3] py-28 md:py-40">
//       <div className="max-w-7xl mx-auto px-6 md:px-10">
//         <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14">
//           <SectionHeading eyebrow="Gallery" lines={["Real Clients.", "Real Glow."]} dark />

//           <div className="flex  flex-wrap gap-2">
//             {GALLERY_FILTERS.map((f) => (
//               <button
//                 key={f}
//                 onClick={() => setFilter(f)}
//                 className={`font-body rounded-full text-xs tracking-[0.15em] uppercase px-5 py-2.5 border transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E8407A] ${
//                   filter === f
//                     ? "bg-[#1A0E17] text-[#F7ECF3] border-[#1A0E17]"
//                     : "border-[#1A0E17]/25 text-[#1A0E17]/70 hover:border-[#1A0E17]"
//                 }`}
//               >
//                 {f}
//               </button>
//             ))}
//           </div>
//         </div>

//         <motion.div layout className="columns-2 md:columns-3 gap-4 md:gap-6 space-y-4 md:space-y-6">
//           <AnimatePresence>
//             {items.map((item, i) => (
//               <motion.div
//                 layout
//                 key={item.image}
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, scale: 0.96 }}
//                 transition={{ duration: 0.5, delay: i * 0.05 }}
//                 className="break-inside-avoid"
//               >
//                 <TiltCard
//                   className={`group relative overflow-hidden ${
//                     item.orientation === "landscape" ? "aspect-[4/3]" : "aspect-[4/3]"
//                   }`}
//                 >
//                   <img
//                     src={item.image}
//                     alt={`${item.category} work at Glamour Studio MCR`}
//                     className="w-full h-full object-cover transition-transform duration-[1100ms] rounded-4xl ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-[#1A0E17]/0 to-transparent group-hover:from-[#1A0E17]/50 transition-colors duration-500 flex items-end p-5">
//                     <span className="font-body text-[#F7ECF3] text-xs tracking-[0.2em] uppercase opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
//                       {item.category}
//                     </span>
//                   </div>
//                 </TiltCard>
//               </motion.div>
//             ))}
//           </AnimatePresence>
//         </motion.div>
//       </div>
//     </section>
//   );
// }

// /* ==================================================
//    PROCESS
//    ================================================== */

// function Process() {
//   return (
//     <section className="relative bg-[#1A0E17] py-28 md:py-40">
//       <div className="max-w-7xl mx-auto px-6 md:px-10">
//         <div className="max-w-2xl mb-16 md:mb-24">
//           <SectionHeading eyebrow="The Experience" lines={["Consult.", "Transform.", "Glow."]} />
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
//           {PROCESS_STEPS.map((step, i) => (
//             <motion.div
//               key={step.number}
//               initial={{ opacity: 0, y: 40 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true, margin: "-80px" }}
//               transition={{ duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
//               className="relative border-t border-[#F7ECF3]/15 pt-8"
//             >
//               <span className="font-display italic text-[#D9B36C] text-lg block mb-6">
//                 {step.number}
//               </span>
//               <h3 className="font-display italic text-[#F7ECF3] text-3xl md:text-4xl mb-4">
//                 {step.title}
//               </h3>
//               <p className="font-body text-[#F7ECF3]/65 text-base leading-relaxed max-w-xs">
//                 {step.description}
//               </p>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// /* ==================================================
//    TESTIMONIALS
//    ================================================== */

// function Testimonials() {
//   const [index, setIndex] = useState(0);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setIndex((prev) => (prev + 1) % TESTIMONIALS.length);
//     }, 5500);
//     return () => clearInterval(timer);
//   }, []);

//   return (
//     <section id="reviews" className="relative bg-[#F7ECF3] py-28 md:py-40 overflow-hidden">
//       <div className="max-w-4xl mx-auto px-6 md:px-10 text-center">
//         <SectionHeading eyebrow="Reviews" lines={["Loved Across", "Manchester."]} dark align="center" />

//         <motion.div
//           initial={{ opacity: 0, y: 16 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.6, delay: 0.3 }}
//           className="flex justify-center mt-10"
//         >
//           <RatingBadge />
//         </motion.div>

//         <div className="relative h-56 md:h-44 mt-12 flex items-center justify-center">
//           <AnimatePresence mode="wait">
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
//               className="absolute inset-0 flex flex-col items-center justify-center gap-6"
//             >
//               <div className="flex gap-1 text-[#D9B36C]">
//                 {Array.from({ length: 5 }).map((_, i) => (
//                   <Star key={i} className="w-4 h-4 fill-current" />
//                 ))}
//               </div>
//               <p className="font-display italic text-[#1A0E17] text-2xl md:text-3xl leading-snug max-w-2xl">
//                 &ldquo;{TESTIMONIALS[index].quote}&rdquo;
//               </p>
//               <span className="font-body text-[#1A0E17]/60 text-xs tracking-[0.2em] uppercase">
//                   {TESTIMONIALS[index].name}, {TESTIMONIALS[index].location}
//               </span>
//             </motion.div>
//           </AnimatePresence>
//         </div>

//         <div className="flex justify-center gap-2 mt-10">
//           {TESTIMONIALS.map((_, i) => (
//             <button
//               key={i}
//               aria-label={`Show testimonial ${i + 1}`}
//               onClick={() => setIndex(i)}
//               className={`h-1.5 rounded-full transition-all duration-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E8407A] ${
//                 i === index ? "w-8 bg-[#1A0E17]" : "w-1.5 bg-[#1A0E17]/25"
//               }`}
//             />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// /* ==================================================
//    CALL TO ACTION
//    ================================================== */

// function CallToAction() {
//   return (
//     <section className="relative py-40 md:py-56 overflow-hidden bg-[#2B0F23]">
//       <div className="absolute inset-0">
//         <img
//           src="https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=1920&q=80"
//           alt="Soft-focus glam beauty portrait with warm lighting"
//           className="w-full h-full object-cover opacity-40"
//         />
//         <div className="absolute inset-0 bg-[#1A0E17]/60" />
//         <div className="absolute inset-0 bg-gradient-to-t from-[#1A0E17] via-transparent to-[#1A0E17]/40" />
//       </div>

//       <BlobField variant="cta" />

//       <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
//         <SectionHeading lines={["Ready To", "Sparkle?"]} align="center" />
//         <motion.p
//           initial={{ opacity: 0, y: 16 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.7, delay: 0.4 }}
//           className="font-body text-[#F7ECF3]/75 text-base md:text-lg mt-8 max-w-lg mx-auto leading-relaxed"
//         >
//           Book your slot at Manchester's {RATING}-star beauty studio and
//           leave feeling every bit as good as you look.
//         </motion.p>
//         <motion.div
//           initial={{ opacity: 0, y: 16 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.7, delay: 0.55 }}
//           className="mt-10 flex justify-center"
//         >
//           <MagneticButton className="rounded-full" href="#contact">Book Your Appointment</MagneticButton>
//         </motion.div>
//       </div>
//     </section>
//   );
// }

// /* ==================================================
//    CONTACT
//    ================================================== */

// function Contact() {
//   const [submitted, setSubmitted] = useState(false);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     setSubmitted(true);
//   };

//   return (
//     <section id="contact" className="relative bg-[#1A0E17] py-28 md:py-40">
//       <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-16">
//         <div className="lg:col-span-5">
//           <SectionHeading eyebrow="Get In Touch" lines={["Let's Book", "Your Glow."]} />
//           <motion.p
//             initial={{ opacity: 0, y: 16 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.7, delay: 0.3 }}
//             className="font-body text-[#F7ECF3]/65 text-base leading-relaxed mt-8 max-w-sm"
//           >
//             Based in Manchester city centre, open six days a week.
//             Enquiries are usually answered within 24 hours.
//           </motion.p>

//           <motion.div
//             initial={{ opacity: 0, y: 16 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.7, delay: 0.45 }}
//             className="flex items-center gap-5 mt-10"
//           >
//             <a
//               href="https://instagram.com/glamourstudiomcr"
//               aria-label="Instagram"
//               className="w-11 h-11 rounded-full border border-[#F7ECF3]/25 flex items-center justify-center text-[#F7ECF3] hover:border-[#E8407A] hover:text-[#E8407A] transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E8407A]"
//             >
//               <FaInstagram className="w-4.5 h-4.5" />
//             </a>
//             <a
//               href="https://tiktok.com/@glamourstudiomcr"
//               aria-label="TikTok"
//               className="w-11 h-11 rounded-full border border-[#F7ECF3]/25 flex items-center justify-center text-[#F7ECF3] hover:border-[#E8407A] hover:text-[#E8407A] transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E8407A]"
//             >
//               <FaTiktok className="w-4 h-4" />
//             </a>
//             <a
//               href="mailto:hello@glamourstudiomcr.co.uk"
//               aria-label="Email"
//               className="w-11 h-11 rounded-full border border-[#F7ECF3]/25 flex items-center justify-center text-[#F7ECF3] hover:border-[#E8407A] hover:text-[#E8407A] transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E8407A]"
//             >
//               <Mail className="w-4.5 h-4.5" />
//             </a>
//             <a
//               href="https://wa.me/447000000000"
//               aria-label="WhatsApp"
//               className="w-11 h-11 rounded-full border border-[#F7ECF3]/25 flex items-center justify-center text-[#F7ECF3] hover:border-[#E8407A] hover:text-[#E8407A] transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E8407A]"
//             >
//               <FaWhatsapp className="w-4.5 h-4.5" />
//             </a>
//           </motion.div>
//         </div>

//         <div className="lg:col-span-7">
//           <AnimatePresence mode="wait">
//             {submitted ? (
//               <motion.div
//                 key="thanks"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className="h-full flex flex-col items-center justify-center text-center border border-[#F7ECF3]/15 py-24 px-8"
//               >
//                 <span className="font-display italic bg-gradient-to-r from-[#E8407A] to-[#D9B36C] bg-clip-text text-transparent text-4xl mb-4">
//                   Thank You
//                 </span>
//                 <p className="font-body text-[#F7ECF3]/70 max-w-sm">
//                   Your enquiry has been received. We'll be in touch within
//                   24 hours to lock in your appointment.
//                 </p>
//               </motion.div>
//             ) : (
//               <motion.form
//                 key="form"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -20 }}
//                 onSubmit={handleSubmit}
//                 className="grid grid-cols-1 sm:grid-cols-2 gap-6"
//               >
//                 <Field label="Full Name" id="name" type="text" required />
//                 <Field label="Email Address" id="email" type="email" required />
//                 <Field label="Phone Number" id="phone" type="tel" />
//                 <div className="flex flex-col gap-2">
//                   <label
//                     htmlFor="service"
//                     className="font-body text-xs tracking-[0.2em] uppercase text-[#F7ECF3]/50"
//                   >
//                     Service
//                   </label>
//                   <select
//                     id="service"
//                     className="bg-transparent border-b border-[#F7ECF3]/25 py-3 font-body text-[#F7ECF3] focus:outline-none focus:border-[#E8407A] transition-colors [&>option]:text-[#1A0E17]"
//                   >
//                     {SERVICE_OPTIONS.map((opt) => (
//                       <option key={opt} value={opt}>
//                         {opt}
//                       </option>
//                     ))}
//                   </select>
//                 </div>
//                 <Field label="Preferred Date" id="date" type="date" />
//                 <div className="sm:col-span-2 flex flex-col gap-2">
//                   <label
//                     htmlFor="message"
//                     className="font-body text-xs tracking-[0.2em] uppercase text-[#F7ECF3]/50"
//                   >
//                     Tell us about your occasion
//                   </label>
//                   <textarea
//                     id="message"
//                     rows={4}
//                     className="bg-transparent border-b border-[#F7ECF3]/25 py-3 font-body text-[#F7ECF3] focus:outline-none focus:border-[#E8407A] transition-colors resize-none"
//                   />
//                 </div>
//                 <div className="sm:col-span-2 mt-4">
//                   <button
//                     type="submit"
//                     className="group relative rounded-full inline-flex items-center gap-3 bg-gradient-to-r from-[#E8407A] to-[#D9B36C] text-[#1A0E17] px-8 py-4 font-body text-xs tracking-[0.2em] uppercase overflow-hidden transition-transform duration-300 hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F7ECF3]"
//                   >
//                     <span className="relative z-10">Send Enquiry</span>
//                     <ArrowRight className="relative z-10 w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" />
//                   </button>
//                 </div>
//               </motion.form>
//             )}
//           </AnimatePresence>
//         </div>
//       </div>
//     </section>
//   );
// }

// function Field({
//   label,
//   id,
//   type,
//   required,
// }: {
//   label: string;
//   id: string;
//   type: string;
//   required?: boolean;
// }) {
//   return (
//     <div className="flex flex-col gap-2">
//       <label
//         htmlFor={id}
//         className="font-body text-xs tracking-[0.2em] uppercase text-[#F7ECF3]/50"
//       >
//         {label}
//         {required && <span className="text-[#E8407A]"> *</span>}
//       </label>
//       <input
//         id={id}
//         type={type}
//         required={required}
//         className="bg-transparent border-b border-[#F7ECF3]/25 py-3 font-body text-[#F7ECF3] focus:outline-none focus:border-[#E8407A] transition-colors"
//       />
//     </div>
//   );
// }

// /* ==================================================
//    FOOTER
//    ================================================== */

// function Footer() {
//   return (
//     <footer className="relative bg-[#150912] pt-20 pb-10">
//       <div className="max-w-7xl mx-auto px-6 md:px-10">
//         <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10 pb-14 border-b border-[#F7ECF3]/10">
//           <div>
//             <span className="font-display italic text-3xl tracking-[0.02em] text-[#F7ECF3]">
//               Glamour Studio <span className="text-[#D9B36C]">MCR</span>
//             </span>
//             <p className="font-body text-[#F7ECF3]/50 text-xs tracking-[0.25em] uppercase mt-3">
//               Manchester's Glam Destination
//             </p>
//             <div className="mt-3">
//               <RatingStars size="w-3.5 h-3.5" light />
//             </div>
//           </div>

//           <ul className="flex flex-wrap gap-x-8 gap-y-3 font-body text-xs tracking-[0.15em] uppercase text-[#F7ECF3]/60">
//             {NAV_LINKS.map((link) => (
//               <li key={link.label}>
//                 <a href={link.href} className="hover:text-[#E8407A] transition-colors">
//                   {link.label}
//                 </a>
//               </li>
//             ))}
//           </ul>

//           <div className="flex items-center gap-4">
//             <a
//               href="https://instagram.com/glamourstudiomcr"
//               aria-label="Instagram"
//               className="w-10 h-10 rounded-full border border-[#F7ECF3]/20 flex items-center justify-center text-[#F7ECF3]/70 hover:text-[#E8407A] hover:border-[#E8407A] transition-colors"
//             >
//               <FaInstagram className="w-4 h-4" />
//             </a>
//             <a
//               href="https://tiktok.com/@glamourstudiomcr"
//               aria-label="TikTok"
//               className="w-10 h-10 rounded-full border border-[#F7ECF3]/20 flex items-center justify-center text-[#F7ECF3]/70 hover:text-[#E8407A] hover:border-[#E8407A] transition-colors"
//             >
//               <FaTiktok className="w-3.5 h-3.5" />
//             </a>
//             <a
//               href="mailto:hello@glamourstudiomcr.co.uk"
//               aria-label="Email"
//               className="w-10 h-10 rounded-full border border-[#F7ECF3]/20 flex items-center justify-center text-[#F7ECF3]/70 hover:text-[#E8407A] hover:border-[#E8407A] transition-colors"
//             >
//               <Mail className="w-4 h-4" />
//             </a>
//             <a
//               href="https://wa.me/447000000000"
//               aria-label="WhatsApp"
//               className="w-10 h-10 rounded-full border border-[#F7ECF3]/20 flex items-center justify-center text-[#F7ECF3]/70 hover:text-[#E8407A] hover:border-[#E8407A] transition-colors"
//             >
//               <FaWhatsapp className="w-4 h-4" />
//             </a>
//           </div>
//         </div>

//         <p className="font-body text-[#F7ECF3]/35 text-xs tracking-[0.1em] text-center pt-8">
//           © 2026 Glamour Studio MCR. All rights reserved.
//         </p>
//       </div>
//     </footer>
//   );
// }

// /* ==================================================
//    FLOATING BOOK CTA (appears on scroll)
//    ================================================== */

// function FloatingBookButton() {
//   const [visible, setVisible] = useState(false);

//   useEffect(() => {
//     const onScroll = () => setVisible(window.scrollY > 900);
//     window.addEventListener("scroll", onScroll);
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   return (
//     <AnimatePresence>
//       {visible && (
//         <motion.a
//           href="#contact"
//           initial={{ opacity: 0, y: 30, scale: 0.9 }}
//           animate={{ opacity: 1, y: 0, scale: 1 }}
//           exit={{ opacity: 0, y: 30, scale: 0.9 }}
//           transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
//           className="fixed bottom-6 right-6 z-40 hidden md:inline-flex items-center gap-2 bg-gradient-to-r from-[#E8407A] to-[#D9B36C] text-[#1A0E17] px-6 py-3.5 rounded-full font-body text-xs tracking-[0.15em] uppercase shadow-[0_8px_30px_rgba(232,64,122,0.35)] hover:scale-105 transition-transform duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F7ECF3]"
//         >
//           <Sparkles className="w-4 h-4" />
//           Book Now
//         </motion.a>
//       )}
//     </AnimatePresence>
//   );
// }

// /* ==================================================
//    PAGE
//    ================================================== */

// export default function GlamourStudioMCR() {
//   return (
//     <main className="bg-[#1A0E17] antialiased">
//       <FontImports />
//       <Navigation />
//       <Hero />
//       <Ticker />
//       <Studio />
//       <Services />
//       <CinematicStatement />
//       <Gallery />
//       <Process />
//       <Testimonials />
//       <CallToAction />
//       <Contact />
//       <Footer />
//       <FloatingBookButton />
//     </main>
//   );
// }
