// "use client";

// import React, { useState, useEffect, useRef } from "react";
// import {
//   motion,
//   AnimatePresence,
//   useScroll,
//   useTransform,
//   useReducedMotion,
// } from "framer-motion";
// import {
//   Menu,
//   X,
//   // Instagram,
//   Mail,
//   ArrowRight,
//   ArrowUpRight,
//   ChevronDown,
//   MapPin,
//   Star,
//   Quote,
// } from "lucide-react";
// import { FaWhatsapp, FaInstagram } from "react-icons/fa";

// /* ==================================================
//    FONTS
//    ================================================== */

// function FontImports() {
//   return (
//     <style jsx global>{`
//       @import url("https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400&family=Manrope:wght@300;400;500;600;700&display=swap");

//       .font-display {
//         font-family: "Cormorant Garamond", serif;
//       }
//       .font-body {
//         font-family: "Manrope", sans-serif;
//       }

//       html {
//         scroll-behavior: smooth;
//       }

//       ::selection {
//         background-color: #c9a961;
//         color: #1a1714;
//       }
//     `}</style>
//   );
// }

// /* ==================================================
//    TOKENS
//    ================================================== */

// const COLORS = {
//   charcoal: "#1A1714",
//   charcoalSoft: "#241F1B",
//   ivory: "#F6F1E9",
//   nude: "#DCC9B6",
//   champagne: "#C9A961",
//   rose: "#C0897C",
// };

// /* ==================================================
//    DATA
//    ================================================== */

// const NAV_LINKS = [
//   { label: "Home", href: "#home" },
//   { label: "About", href: "#about" },
//   { label: "Services", href: "#services" },
//   { label: "Portfolio", href: "#portfolio" },
//   { label: "Reviews", href: "#reviews" },
//   { label: "Contact", href: "#contact" },
// ];

// const SERVICES = [
//   {
//     title: "Body Makeup",
//     price: "Starting from £150",
//     description:
//       "A bespoke body look, trialled in advance and perfected for your day   timeless, radiant and entirely you.",
//     image:
//       "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
//   },
//   {
//     title: "Soft Glam",
//     price: "Starting from £85",
//     description:
//       "Luminous skin, softly defined eyes and a polished finish   glamour that never feels overdone.",
//     image:
//       "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=1200&q=80",
//   },
//   {
//     title: "Special Occasion",
//     price: "Starting from £95",
//     description:
//       "Tailored artistry for the moments that call for something more   parties, premieres and celebrations.",
//     image:
//       "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1200&q=80",
//   },
//   {
//     title: "Editorial & Shoots",
//     price: "Bespoke pricing",
//     description:
//       "Creative collaboration for campaigns, editorials and portfolio work, from concept through to final frame.",
//     image:
//       "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=80",
//   },
// ];

// const PORTFOLIO_ITEMS = [
//   {
//     category: "Bridal",
//     image:
//       "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
//     orientation: "portrait",
//   },
//   {
//     category: "Editorial",
//     image:
//       "https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=1200&q=80",
//     orientation: "landscape",
//   },
//   {
//     category: "Soft Glam",
//     image:
//       "https://images.unsplash.com/photo-1526045478516-99145907023c?auto=format&fit=crop&w=1000&q=80",
//     orientation: "portrait",
//   },
//   // {
//   //   category: "Beauty",
//   //   image:
//   //     "https://images.unsplash.com/photo-1523264939339-c89f9dadde2d?auto=format&fit=crop&w=1000&q=80",
//   //   orientation: "portrait",
//   // },
//   // {
//   //   category: "Editorial",
//   //   image:
//   //     "https://images.unsplash.com/photo-1487412912498-0447579c8d4e?auto=format&fit=crop&w=1200&q=80",
//   //   orientation: "landscape",
//   // },
//   {
//     category: "Bridal",
//     image:
//         "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1920&q=80",
//     orientation: "portrait",
//   },
//   {
//     category: "Soft Glam",
//     image:
//       "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=1200&q=80",
//     orientation: "landscape",
//   },
//   {
//     category: "Beauty",
//     image:
//       "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=80",
//     orientation: "portrait",
//   },
// ];

// const PORTFOLIO_FILTERS = ["All", "Bridal", "Soft Glam", "Editorial", "Beauty"];

// const PROCESS_STEPS = [
//   {
//     number: "01",
//     title: "Your Vision",
//     description:
//       "We talk about your occasion, style and the look you want to create.",
//   },
//   {
//     number: "02",
//     title: "The Details",
//     description:
//       "Every detail is considered, from skin preparation to the final finish.",
//   },
//   {
//     number: "03",
//     title: "Your Moment",
//     description:
//       "Step out feeling confident, polished and completely yourself.",
//   },
// ];

// const TESTIMONIALS = [
//   {
//     quote:
//       "Absolutely flawless. I felt like the best version of myself.",
//     name: "Amelia",
//     location: "Manchester",
//   },
//   {
//     quote:
//       "She listened to exactly what I wanted and somehow made it even better.",
//     name: "Priya",
//     location: "Richmond",
//   },
//   {
//     quote:
//       "My bridal makeup lasted the entire day, through tears and dancing.",
//     name: "Freya",
//     location: "Chiswick",
//   },
//   {
//     quote:
//       "Professional, calm and so talented. I've never felt more photographed.",
//     name: "Nadia",
//     location: "Shoreditch",
//   },
// ];

// const SERVICE_OPTIONS = [
//   "Bridal Makeup",
//   "Soft Glam",
//   "Special Occasion",
//   "Editorial & Shoots",
//   "Something else",
// ];

// /* ==================================================
//    SHARED SUB-COMPONENTS
//    ================================================== */

// function Eyebrow({ children }: { children: React.ReactNode }) {
//   return (
//     <span className="font-body text-xs md:text-sm tracking-[0.35em] uppercase text-[#C9A961]">
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
//           className="mb-4"
//         >
//           <Eyebrow>{eyebrow}</Eyebrow>
//         </motion.div>
//       )}
//       <h2
//         className={`font-display font-medium leading-[0.95] ${
//           dark ? "text-[#1A1714]" : "text-[#F6F1E9]"
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
//   const base =
//     "group relative inline-flex items-center gap-3 px-8 py-4 font-body text-xs md:text-sm tracking-[0.2em] uppercase overflow-hidden transition-colors duration-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C9A961]";
//   const solid =
//     "bg-[#C9A961] text-[#1A1714] hover:text-[#F6F1E9]";
//   const outline =
//     "border border-[#F6F1E9]/40 text-[#F6F1E9] hover:border-[#F6F1E9]";

//   const content = (
//     <>
//       {variant === "solid" && (
//         <span className="absolute inset-0 -translate-x-full bg-[#1A1714] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0" />
//       )}
//       <span className="relative z-10">{children}</span>
//       <ArrowRight className="relative z-10 w-4 h-4 transition-transform duration-500 group-hover:translate-x-1" />
//     </>
//   );

//   const classes = `${base} ${variant === "solid" ? solid : outline} ${className}`;

//   if (href) {
//     return (
//       <a href={href} className={classes}>
//         {content}
//       </a>
//     );
//   }
//   return (
//     <button onClick={onClick} className={classes}>
//       {content}
//     </button>
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
//             ? "bg-[#1A1714]/80 backdrop-blur-md py-4 shadow-[0_1px_0_rgba(246,241,233,0.08)]"
//             : "bg-transparent py-6 md:py-8"
//         }`}
//       >
//         <nav className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
//           <a
//             href="#home"
//             className="font-display text-xl md:text-2xl tracking-[0.15em] text-[#F6F1E9]"
//           >
//             BODY  <span className="text-[#C9A961]"> WAX & BEAUTY </span>
//           </a>

//           <ul className="hidden lg:flex items-center gap-10 font-body text-xs tracking-[0.2em] uppercase text-[#F6F1E9]/90">
//             {NAV_LINKS.map((link) => (
//               <li key={link.label}>
//                 <a
//                   href={link.href}
//                   className="relative py-1 transition-colors hover:text-[#C9A961] focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-[#C9A961] after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-[#C9A961] after:transition-all after:duration-300 hover:after:w-full"
//                 >
//                   {link.label}
//                 </a>
//               </li>
//             ))}
//           </ul>

//           <div className="hidden lg:block">
//             <a
//               href="#contact"
//               className="font-body text-xs tracking-[0.2em] uppercase border border-[#C9A961] text-[#C9A961] px-6 py-3 transition-all duration-300 hover:bg-[#C9A961] hover:text-[#1A1714]  rounded-3xl focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-[#C9A961]"
//             >
//               Book Your Look
//             </a>
//           </div>

//           <button
//             aria-label="Open menu"
//             onClick={() => setMobileOpen(true)}
//             className="lg:hidden text-[#F6F1E9] focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-[#C9A961]"
//           >
//             <Menu className="w-7 h-7" />
//           </button>
//         </nav>
//       </motion.header>

//       <AnimatePresence>
//         {mobileOpen && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.3 }}
//             className="fixed inset-0 z-60 bg-[#1A1714] flex flex-col"
//           >
//             <div className="flex items-center justify-between px-6 py-6">
//               <span className="font-display text-xl tracking-[0.15em] text-[#F6F1E9]">
//                 BODY  <span className="text-[#C9A961]">WAX & BEAUTY </span>
//               </span>
//               <button
//                 aria-label="Close menu"
//                 onClick={() => setMobileOpen(false)}
//                 className="text-[#F6F1E9] focus-visible:outline focus-visible:outline-offset-4 focus-visible:outline-[#C9A961]"
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
//                   className="w-full border-b border-[#F6F1E9]/10 py-4"
//                 >
//                   <a
//                     href={link.href}
//                     onClick={() => setMobileOpen(false)}
//                     className="font-display text-4xl text-[#F6F1E9] hover:text-[#C9A961] transition-colors"
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
//                 className="inline-flex items-center gap-3 bg-[#C9A961] text-[#1A1714] px-8 py-4 font-body text-xs tracking-[0.2em] uppercase"
//               >
//                 Book Your Look <ArrowRight className="w-4 h-4" />
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
//   const y = useTransform(scrollYProgress, [0, 1], ["0%", shouldReduceMotion ? "0%" : "20%"]);
//   const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

//   const headline = ["BEAUTY,", "WITHOUT", "COMPROMISE."];

//   return (
//     <section
//       id="home"
//       ref={ref}
//       className="relative min-h-160 w-full overflow-hidden bg-[#1A1714]"
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
//           alt="Editorial close-up of a model with soft, radiant makeup"
//           className="w-full h-full object-cover"
//         />
//       </motion.div>

//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 1.8 }}
//         className="absolute inset-0 bg-linear-to-t from-[#1A1714] via-[#1A1714]/50 to-[#1A1714]/30"
//       />
//       <div className="absolute inset-0 bg-linear-to-r from-[#1A1714]/60 via-transparent to-[#1A1714]/40" />

//       {/* decorative floating orb */}
//       {!shouldReduceMotion && (
//         <motion.div
//           animate={{ y: [0, -24, 0], x: [0, 14, 0] }}
//           transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
//           className="absolute top-1/4 right-[8%] w-64 h-64 rounded-full bg-[#C9A961]/10 blur-3xl"
//         />
//       )}

//       <motion.div style={{ opacity }} className="relative z-10 h-full flex flex-col justify-end">
//         <div className="max-w-7xl mx-auto w-full px-6 md:px-10 md:pt-28 pt-24 pb-16 md:pb-20">
//           <motion.div
//             initial={{ opacity: 0, y: 12 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.9, duration: 0.8 }}
//             className="flex items-center gap-3 mb-6"
//           >
//             <span className="h-px w-10 bg-[#C9A961]" />
//             <Eyebrow>Manchester-Based Makeup Artist</Eyebrow>
//           </motion.div>

//           <h1 className="font-display font-medium text-[#F6F1E9] leading-[0.9] text-6xl sm:text-7xl md:text-8xl lg:text-[8.5rem]">
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
//                   {word}
//                 </motion.span>
//               </span>
//             ))}
//           </h1>

//           <motion.p
//             initial={{ opacity: 0, y: 16 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 1.7, duration: 0.8 }}
//             className="font-body text-[#F6F1E9]/80 text-base md:text-lg max-w-md mt-4 leading-relaxed"
//           >
//             Professional waxing and beauty treatments in Manchester.
//             Clean comfortable and tailored for you.
//           </motion.p>

//                     {/* <motion.p
//             initial={{ opacity: 0, y: 16 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 1.7, duration: 0.8 }}
//             className="font-body text-[#F6F1E9]/80 text-base md:text-lg max-w-md mt-4 leading-relaxed"
//           >
//             Luxury makeup artistry for weddings, special occasions and
//             unforgettable moments across Manchester.
//           </motion.p> */}

//           <motion.div
//             initial={{ opacity: 0, y: 16 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 1.9, duration: 0.8 }}
//             className="flex flex-wrap items-center gap-4 mt-10"
//           >
//             <MagneticButton className=" rounded-3xl" href="#contact">Book an Appointment</MagneticButton>
//             <MagneticButton className=" rounded-3xl" href="#portfolio" variant="outline">
//               View My Work
//             </MagneticButton>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 2.2, duration: 0.8 }}
//             className="flex items-center gap-2 mt-12 text-[#F6F1E9]/60 font-body text-xs tracking-[0.2em] uppercase"
//           >
//             <MapPin className="w-3.5 h-3.5" />
//             Manchester, United Kingdom
//           </motion.div>
//         </div>
//       </motion.div>

//       {/* <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 2.4, duration: 1 }}
//         className="absolute bottom-8 right-6 md:right-10 z-10 flex flex-col items-center gap-2 text-[#F6F1E9]/70"
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
//    ABOUT
//    ================================================== */

// function About() {
//   return (
//     <section id="about" className="relative bg-[#F6F1E9] py-28 md:py-40 overflow-hidden">
//       <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
//         <div className="lg:col-span-5 order-2 lg:order-1">
//           <SectionHeading
//             eyebrow="About BODY WAX & BEAUTY"
//             lines={["MORE THAN MAKEUP.", "IT'S HOW", "YOU FEEL."]}
//             dark
//           />
//           <motion.p
//             initial={{ opacity: 0, y: 16 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true, margin: "-80px" }}
//             transition={{ duration: 0.7, delay: 0.3 }}
//             className="font-body text-[#1A1714]/70 text-base md:text-lg leading-relaxed mt-8 max-w-md"
//           >
//             Body Wax & Beauty Hair & Makeup Artist was founded on a simple belief: makeup should
//             reveal you, not replace you. Every appointment begins with a
//             conversation, not a formula   your skin, your features and your
//             occasion shape every decision that follows.
//           </motion.p>
//           <motion.p
//             initial={{ opacity: 0, y: 16 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true, margin: "-80px" }}
//             transition={{ duration: 0.7, delay: 0.45 }}
//             className="font-body text-[#1A1714]/70 text-base md:text-lg leading-relaxed mt-4 max-w-md"
//           >
//             Trained across body, editorial and fashion makeup, I bring the
//             precision of a shoot to every wedding, and the warmth of a
//             wedding to every shoot.
//           </motion.p>
//           <motion.div
//             initial={{ opacity: 0, y: 16 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.7, delay: 0.6 }}
//             className="mt-10"
//           >
//             <MagneticButton href="#services" variant="outline" className="text-[#1A1714]! border-[#1A1714]/30! hover:border-[#1A1714]!  rounded-3xl">
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
//             className="relative aspect-4/5 md:aspect-16/11 w-full overflow-hidden"
//           >
//             <img
//               src="https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=800&q=80"
//               alt="Makeup artist applying foundation to a client's face"
//               className="w-full h-full object-cover rounded-4xl"
//             />
//           </motion.div>
//           <motion.div
//             initial={{ opacity: 0, x: -30, y: 30 }}
//             whileInView={{ opacity: 1, x: 0, y: 0 }}
//             viewport={{ once: true, margin: "-60px" }}
//             transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
//             className="hidden rounded-4xl md:block absolute -bottom-10 -left-10 w-56 aspect-3/4 overflow-hidden shadow-2xl"
//           >
//             <img
//               src="https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=800&q=80"
//               alt="Close-up detail of luxury cosmetics and makeup brushes"
//               className="w-full rounded-4xl h-full object-cover"
//             />
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
//     <section id="services" className="relative bg-[#1A1714] py-28 md:py-40">
//       <div className="max-w-7xl mx-auto px-6 md:px-10">
//         <div className="max-w-2xl mb-16 md:mb-24">
//           <SectionHeading eyebrow="Services" lines={["YOUR MOMENT.", "YOUR LOOK."]} />
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
//           {SERVICES.map((service, i) => (
//             <motion.div
//               key={service.title}
//               initial={{ opacity: 0, y: 40 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true, margin: "-60px" }}
//               transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
//               className="group relative overflow-hidden aspect-4/5"
//             >
//               <img
//                 src={service.image}
//                 alt={`${service.title} makeup styling`}
//                 className="w-full rounded-3xl md:rounded-4xl h-full object-cover transition-transform duration-1200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
//               />
//               <div className="absolute inset-0 bg-linear-to-t from-[#1A1714] via-[#1A1714]/30 to-transparent" />
//               <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
//                 <span className="font-body text-[#C9A961] text-xs tracking-[0.2em] uppercase mb-2">
//                   {service.price}
//                 </span>
//                 <h3 className="font-display text-[#F6F1E9] text-3xl md:text-4xl mb-3">
//                   {service.title}
//                 </h3>
//                 <p className="font-body text-[#F6F1E9]/70 text-sm leading-relaxed max-h-0 opacity-0 translate-y-2 group-hover:max-h-24 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 overflow-hidden">
//                   {service.description}
//                 </p>
//               </div>
//               <div className="absolute top-6 right-6 w-9 h-9 rounded-full border border-[#F6F1E9]/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:rotate-45">
//                 <ArrowUpRight className="w-4 h-4 text-[#F6F1E9]" />
//               </div>
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
//     <section ref={ref} className="relative h-[80vh] min-h-130 overflow-hidden">
//       <motion.div style={{ y }} className="absolute inset-0 scale-110">
//         <img
//           src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1920&q=80"
//           alt="Editorial portrait of a model with bold, confident makeup"
//           className="w-full h-full object-cover"
//         />
//       </motion.div>
//       <div className="absolute inset-0 bg-[#1A1714]/55" />
//       <div className="relative z-10 h-full flex items-center justify-center px-6">
//         <motion.blockquote
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true, margin: "-100px" }}
//           transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
//           className="text-center max-w-4xl"
//         >
//           <Quote className="w-8 h-8 text-[#C9A961] mx-auto mb-6" />
//           <p className="font-display text-[#F6F1E9] text-3xl sm:text-4xl md:text-6xl leading-tight">
//             &ldquo;Confidence is the most beautiful thing you can wear.&rdquo;
//           </p>
//         </motion.blockquote>
//       </div>
//     </section>
//   );
// }

// /* ==================================================
//    PORTFOLIO
//    ================================================== */

// function Portfolio() {
//   const [filter, setFilter] = useState("All");
//   const items =
//     filter === "All"
//       ? PORTFOLIO_ITEMS
//       : PORTFOLIO_ITEMS.filter((item) => item.category === filter);

//   return (
//     <section id="portfolio" className="relative bg-[#F6F1E9] py-28 md:py-40">
//       <div className="max-w-7xl mx-auto px-6 md:px-10">
//         <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14">
//           <SectionHeading eyebrow="Portfolio" lines={["A LOOK AT", "THE WORK."]} dark />

//           <div className="flex flex-wrap gap-2">
//             {PORTFOLIO_FILTERS.map((f) => (
//               <button
//                 key={f}
//                 onClick={() => setFilter(f)}
//                 className={`font-body text-xs tracking-[0.15em] uppercase rounded-3xl px-5 py-2.5 border transition-all duration-300 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#C9A961] ${
//                   filter === f
//                     ? "bg-[#1A1714] text-[#F6F1E9] border-[#1A1714]"
//                     : "border-[#1A1714]/25 text-[#1A1714]/70 hover:border-[#1A1714]"
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
//                 className={`group relative overflow-hidden break-inside-avoid ${
//                   item.orientation === "landscape" ? "aspect-3/4" : "aspect-3/4"
//                 }`}
//               >
//                 <img
//                   src={item.image}
//                   alt={`${item.category} makeup portfolio piece`}
//                   className="w-full h-full rounded-4xl object-cover transition-transform duration-1100 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
//                 />
//                 <div className="absolute inset-0 bg-[#1A1714]/0 group-hover:bg-[#1A1714]/40 transition-colors duration-500 flex items-end p-5">
//                   <span className="font-body text-[#F6F1E9] text-xs tracking-[0.2em] uppercase opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
//                     {item.category}
//                   </span>
//                 </div>
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
//     <section className="relative bg-[#1A1714] py-28 md:py-40">
//       <div className="max-w-7xl mx-auto px-6 md:px-10">
//         <div className="max-w-2xl mb-16 md:mb-24">
//           <SectionHeading eyebrow="The Experience" lines={["A PROCESS", "BUILT ON TRUST."]} />
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
//           {PROCESS_STEPS.map((step, i) => (
//             <motion.div
//               key={step.number}
//               initial={{ opacity: 0, y: 40 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true, margin: "-80px" }}
//               transition={{ duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
//               className="relative border-t border-[#F6F1E9]/15 pt-8"
//             >
//               <span className="font-display text-[#C9A961] text-lg block mb-6">
//                 {step.number}
//               </span>
//               <h3 className="font-display text-[#F6F1E9] text-3xl md:text-4xl mb-4">
//                 {step.title}
//               </h3>
//               <p className="font-body text-[#F6F1E9]/65 text-base leading-relaxed max-w-xs">
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
//     <section id="reviews" className="relative bg-[#F6F1E9] py-28 md:py-40 overflow-hidden">
//       <div className="max-w-4xl mx-auto px-6 md:px-10 text-center">
//         <SectionHeading eyebrow="Reviews" lines={["KIND WORDS,", "REAL MOMENTS."]} dark align="center" />

//         <div className="relative h-56 md:h-44 mt-16 flex items-center justify-center">
//           <AnimatePresence mode="wait">
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
//               className="absolute inset-0 flex flex-col items-center justify-center gap-6"
//             >
//               <div className="flex gap-1 text-[#C9A961]">
//                 {Array.from({ length: 5 }).map((_, i) => (
//                   <Star key={i} className="w-4 h-4 fill-current" />
//                 ))}
//               </div>
//               <p className="font-display text-[#1A1714] text-2xl md:text-3xl leading-snug max-w-2xl">
//                 &ldquo;{TESTIMONIALS[index].quote}&rdquo;
//               </p>
//               <span className="font-body text-[#1A1714]/60 text-xs tracking-[0.2em] uppercase">
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
//               className={`h-1.5 rounded-full transition-all duration-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#C9A961] ${
//                 i === index ? "w-8 bg-[#1A1714]" : "w-1.5 bg-[#1A1714]/25"
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
//   const shouldReduceMotion = useReducedMotion();
//   return (
//     <section className="relative py-40 md:py-56 overflow-hidden">
//       <div className="absolute inset-0">
//         <img
//           src="https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=1920&q=80"
//           alt="Soft-focus beauty portrait with warm lighting"
//           className="w-full h-full object-cover"
//         />
//         <div className="absolute inset-0 bg-[#1A1714]/70" />
//         <div className="absolute inset-0 bg-linear-to-t from-[#1A1714] via-transparent to-[#1A1714]/40" />
//       </div>

//       {!shouldReduceMotion && (
//         <>
//           <motion.div
//             animate={{ opacity: [0.2, 0.5, 0.2] }}
//             transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
//             className="absolute top-1/3 left-1/4 w-72 h-72 rounded-full bg-[#C9A961]/20 blur-3xl"
//           />
//           <motion.div
//             animate={{ opacity: [0.4, 0.15, 0.4] }}
//             transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
//             className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-[#C0897C]/15 blur-3xl"
//           />
//         </>
//       )}

//       <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
//         <SectionHeading lines={["READY FOR", "YOUR MOMENT?"]} align="center" />
//         <motion.p
//           initial={{ opacity: 0, y: 16 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.7, delay: 0.4 }}
//           className="font-body text-[#F6F1E9]/75 text-base md:text-lg mt-8 max-w-lg mx-auto leading-relaxed"
//         >
//           Let&rsquo;s create a look you&rsquo;ll remember long after the
//           photographs are taken.
//         </motion.p>
//         <motion.div
//           initial={{ opacity: 0, y: 16 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.7, delay: 0.55 }}
//           className="mt-10 flex justify-center"
//         >
//           <MagneticButton className="rounded-3xl" href="#contact">Book Your Look</MagneticButton>
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
//     <section id="contact" className="relative bg-[#1A1714] py-28 md:py-40">
//       <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-16">
//         <div className="lg:col-span-5">
//           <SectionHeading eyebrow="Get in Touch" lines={["LET'S PLAN", "YOUR LOOK."]} />
//           <motion.p
//             initial={{ opacity: 0, y: 16 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.7, delay: 0.3 }}
//             className="font-body text-[#F6F1E9]/65 text-base leading-relaxed mt-8 max-w-sm"
//           >
//             Based in Manchester and available for selected bookings across the
//             UK. Enquiries are typically answered within 48 hours.
//           </motion.p>

//           <motion.div
//             initial={{ opacity: 0, y: 16 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.7, delay: 0.45 }}
//             className="flex items-center gap-5 mt-10"
//           >
//             <a
//               href="https://instagram.com/lumiereManchester"
//               aria-label="Instagram"
//               className="w-11 h-11 rounded-full border border-[#F6F1E9]/25 flex items-center justify-center text-[#F6F1E9] hover:border-[#C9A961] hover:text-[#C9A961] transition-colors duration-300 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#C9A961]"
//             >
//               <FaInstagram className="w-4.5 h-4.5" />
//             </a>
//             <a
//               href="mailto:hello@bodywaxandbeauty.co.uk"
//               aria-label="Email"
//               className="w-11 h-11 rounded-full border border-[#F6F1E9]/25 flex items-center justify-center text-[#F6F1E9] hover:border-[#C9A961] hover:text-[#C9A961] transition-colors duration-300 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#C9A961]"
//             >
//               <Mail className="w-4.5 h-4.5" />
//             </a>
//             <a
//               href="https://wa.me/447000000000"
//               aria-label="WhatsApp"
//               className="w-11 h-11 rounded-full border border-[#F6F1E9]/25 flex items-center justify-center text-[#F6F1E9] hover:border-[#C9A961] hover:text-[#C9A961] transition-colors duration-300 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#C9A961]"
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
//                 className="h-full flex flex-col items-center justify-center text-center border border-[#F6F1E9]/15 py-24 px-8"
//               >
//                 <span className="font-display text-[#C9A961] text-4xl mb-4">
//                   Thank You
//                 </span>
//                 <p className="font-body text-[#F6F1E9]/70 max-w-sm">
//                   Your enquiry has been received. I&rsquo;ll be in touch
//                   within 48 hours to talk through your look.
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
//                     className="font-body text-xs tracking-[0.2em] uppercase text-[#F6F1E9]/50"
//                   >
//                     Service
//                   </label>
//                   <select
//                     id="service"
//                     className="bg-transparent border-b border-[#F6F1E9]/25 py-3 font-body text-[#F6F1E9] focus:outline-none focus:border-[#C9A961] transition-colors [&>option]:text-[#1A1714]"
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
//                     className="font-body text-xs tracking-[0.2em] uppercase text-[#F6F1E9]/50"
//                   >
//                     Tell me about your event
//                   </label>
//                   <textarea
//                     id="message"
//                     rows={4}
//                     className="bg-transparent border-b border-[#F6F1E9]/25 py-3 font-body text-[#F6F1E9] focus:outline-none focus:border-[#C9A961] transition-colors resize-none"
//                   />
//                 </div>
//                 <div className="sm:col-span-2 mt-4">
//                   <button
//                     type="submit"
//                     className="group relative inline-flex items-center gap-3 bg-[#C9A961] text-[#1A1714] px-8 py-4 font-body text-xs tracking-[0.2em] uppercase overflow-hidden focus-visible:outline-2  rounded-3xl focus-visible:outline-offset-4 focus-visible:outline-[#F6F1E9]"
//                   >
//                     <span className="absolute inset-0 -translate-x-full bg-[#F6F1E9] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0" />
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
//         className="font-body text-xs tracking-[0.2em] uppercase text-[#F6F1E9]/50"
//       >
//         {label}
//         {required && <span className="text-[#C9A961]"> *</span>}
//       </label>
//       <input
//         id={id}
//         type={type}
//         required={required}
//         className="bg-transparent border-b border-[#F6F1E9]/25 py-3 font-body text-[#F6F1E9] focus:outline-none focus:border-[#C9A961] transition-colors"
//       />
//     </div>
//   );
// }

// /* ==================================================
//    FOOTER
//    ================================================== */

// function Footer() {
//   return (
//     <footer className="relative bg-[#151210] pt-20 pb-10">
//       <div className="max-w-7xl mx-auto px-6 md:px-10">
//         <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10 pb-14 border-b border-[#F6F1E9]/10">
//           <div>
//             <span className="font-display text-3xl tracking-widest text-[#F6F1E9]">
//               BODY  <span className="text-[#C9A961]">WAX & BEAUTY </span>
//             </span>
//             <p className="font-body text-[#F6F1E9]/50 text-xs tracking-[0.25em] uppercase mt-3">
//               Makeup. Made Memorable.
//             </p>
//           </div>

//           <ul className="flex flex-wrap gap-x-8 gap-y-3 font-body text-xs tracking-[0.15em] uppercase text-[#F6F1E9]/60">
//             {NAV_LINKS.map((link) => (
//               <li key={link.label}>
//                 <a href={link.href} className="hover:text-[#C9A961] transition-colors">
//                   {link.label}
//                 </a>
//               </li>
//             ))}
//           </ul>

//           <div className="flex items-center gap-4">
//             <a
//               href="https://instagram.com/lumiereManchester"
//               aria-label="Instagram"
//               className="w-10 h-10 rounded-full border border-[#F6F1E9]/20 flex items-center justify-center text-[#F6F1E9]/70 hover:text-[#C9A961] hover:border-[#C9A961] transition-colors"
//             >
//               <FaInstagram className="w-4 h-4" />
//             </a>
//             <a
//               href="mailto:hello@lumiereManchester.co.uk"
//               aria-label="Email"
//               className="w-10 h-10 rounded-full border border-[#F6F1E9]/20 flex items-center justify-center text-[#F6F1E9]/70 hover:text-[#C9A961] hover:border-[#C9A961] transition-colors"
//             >
//               <Mail className="w-4 h-4" />
//             </a>
//             <a
//               href="https://wa.me/447000000000"
//               aria-label="WhatsApp"
//               className="w-10 h-10 rounded-full border border-[#F6F1E9]/20 flex items-center justify-center text-[#F6F1E9]/70 hover:text-[#C9A961] hover:border-[#C9A961] transition-colors"
//             >
//               <FaWhatsapp className="w-4 h-4" />
//             </a>
//           </div>
//         </div>

//         <p className="font-body text-[#F6F1E9]/35 text-xs tracking-widest text-center pt-8">
//           © 2026 BODY WAX & BEAUTY. All rights reserved.
//         </p>
//       </div>
//     </footer>
//   );
// }

// /* ==================================================
//    PAGE
//    ================================================== */

// export default function LumiereLondon() {
//   return (
//     <main className="bg-[#1A1714] antialiased">
//       <FontImports />
//       <Navigation />
//       <Hero />
//       <About />
//       <Services />
//       <CinematicStatement />
//       <Portfolio />
//       <Process />
//       <Testimonials />
//       <CallToAction />
//       <Contact />
//       <Footer />
//     </main>
//   );
// }