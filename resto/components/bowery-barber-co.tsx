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
//   Scissors,
//   Phone,
// } from "lucide-react";
// import { FaWhatsapp, FaInstagram } from "react-icons/fa";

// /* ==================================================
//    FONTS
//    ================================================== */

// function FontImports() {
//   return (
//     <style jsx global>{`
//       @import url("https://fonts.googleapis.com/css2?family=Anton&family=Space+Grotesk:wght@300;400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap");

//       .font-display {
//         font-family: "Anton", sans-serif;
//       }
//       .font-body {
//         font-family: "Space Grotesk", sans-serif;
//       }
//       .font-mono {
//         font-family: "IBM Plex Mono", monospace;
//       }

//       html {
//         scroll-behavior: smooth;
//       }

//       ::selection {
//         background-color: #7a2426;
//         color: #ede6d6;
//       }
//     `}</style>
//   );
// }

// /* ==================================================
//    DATA
//    ================================================== */

// const NAV_LINKS = [
//   { label: "Home", href: "#home" },
//   { label: "Heritage", href: "#heritage" },
//   { label: "Services", href: "#services" },
//   { label: "Gallery", href: "#gallery" },
//   { label: "Reviews", href: "#reviews" },
//   { label: "Book", href: "#contact" },
// ];

// const TICKER_ITEMS = [
//   "SKIN FADES",
//   "HOT TOWEL SHAVES",
//   "BEARD SCULPTING",
//   "WALK-INS WELCOME",
//   "EST. 2011",
//   "LOWER EAST SIDE, NYC",
// ];

// const SERVICES = [
//   {
//     number: "01",
//     title: "The Classic Cut",
//     price: "$45",
//     description:
//       "Scissor and clipper work tailored to your head shape, finished with a straight-razor neckline.",
//     image:
//       "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1200&q=80",
//   },
//   {
//     number: "02",
//     title: "Skin Fade",
//     price: "$50",
//     description:
//       "A precision fade blended down to bare skin, blow-dried and styled to leave clean.",
//     image:
//       "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=1200&q=80",
//   },
//   {
//     number: "03",
//     title: "Hot Towel Shave",
//     price: "$40",
//     description:
//       "Traditional straight-razor shave with hot towels, pre-shave oil and a cold finish.",
//     image:
//       "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=1200&q=80",
//   },
//   {
//     number: "04",
//     title: "The Full Service",
//     price: "$85",
//     description:
//       "Cut, beard sculpt and hot towel shave   the entire chair experience, no rushing.",
//     image:
//       "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=1200&q=80",
//   },
// ];

// const GALLERY_ITEMS = [
//   {
//     category: "Fades",
//     image:
//       "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=1000&q=80",
//     orientation: "portrait",
//   },
//   {
//     category: "Shop",
//     image:
//       "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=1200&q=80",
//     orientation: "landscape",
//   },
//   {
//     category: "Beards",
//     image:
//       "https://images.unsplash.com/photo-1587909209111-5097ee578ec3?auto=format&fit=crop&w=1000&q=80",
//     orientation: "portrait",
//   },
//   // {
//   //   category: "Shaves",
//   //   image:
//   //     "https://images.unsplash.com/photo-1583500178690-f7fd8d54c1b0?auto=format&fit=crop&w=1000&q=80",
//   //   orientation: "portrait",
//   // },
//   // {
//   //   category: "Shop",
//   //   image:
//   //     "https://images.unsplash.com/photo-1512690459411-b9245aed614b?auto=format&fit=crop&w=1200&q=80",
//   //   orientation: "landscape",
//   // },
//   {
//     category: "Fades",
//     image:
//       "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=1000&q=80",
//     orientation: "portrait",
//   },
//   {
//     category: "Beards",
//     image:
//       "https://images.unsplash.com/photo-1622287162716-f311baa1a2b8?auto=format&fit=crop&w=1200&q=80",
//     orientation: "landscape",
//   },
//   {
//     category: "Shaves",
//     image:
//       "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=1200&q=80",
//     orientation: "portrait",
//   },
// ];

// const GALLERY_FILTERS = ["All", "Fades", "Beards", "Shaves", "Shop"];

// const PROCESS_STEPS = [
//   {
//     number: "01",
//     title: "Walk In",
//     description:
//       "No appointment, no problem   take a seat, grab a coffee, we'll call your name.",
//   },
//   {
//     number: "02",
//     title: "Sit Down",
//     description:
//       "Tell your barber what you want. If you're not sure, we'll figure it out together.",
//   },
//   {
//     number: "03",
//     title: "Walk Out",
//     description:
//       "Sharp, clean, and ready for whatever the city throws at you next.",
//   },
// ];

// const TESTIMONIALS = [
//   {
//     quote: "Best fade I've had in this city, and I've tried them all.",
//     name: "Marcus",
//     location: "East Village",
//   },
//   {
//     quote: "The hot towel shave alone is worth the trip downtown.",
//     name: "Daniel",
//     location: "Williamsburg",
//   },
//   {
//     quote: "My barber remembers my cut better than I do.",
//     name: "Andre",
//     location: "Harlem",
//   },
//   {
//     quote: "Old-school service, no attitude, always on point.",
//     name: "Jonah",
//     location: "Lower East Side",
//   },
// ];

// const SERVICE_OPTIONS = [
//   "Classic Cut",
//   "Skin Fade",
//   "Hot Towel Shave",
//   "The Full Service",
//   "Something else",
// ];

// /* ==================================================
//    SHARED SUB-COMPONENTS
//    ================================================== */

// function Eyebrow({ children }: { children: React.ReactNode }) {
//   return (
//     <span className="font-mono text-[11px] md:text-xs tracking-[0.3em] uppercase text-[#B08D57]">
//       {children}
//     </span>
//   );
// }

// function MaskedHeading({
//   lines,
//   align = "left",
//   dark = false,
//   size = "large",
// }: {
//   lines: string[];
//   align?: "left" | "center";
//   dark?: boolean;
//   size?: "large" | "medium";
// }) {
//   const sizeClasses =
//     size === "large"
//       ? "text-5xl sm:text-6xl md:text-7xl lg:text-8xl"
//       : "text-4xl sm:text-5xl md:text-6xl";
//   return (
//     <h2
//       className={`font-display uppercase leading-[0.88] ${
//         dark ? "text-[#14110F]" : "text-[#EDE6D6]"
//       } ${sizeClasses} ${align === "center" ? "text-center" : "text-left"}`}
//     >
//       {lines.map((line, i) => (
//         <span key={i} className="block overflow-hidden">
//           <motion.span
//             initial={{ y: "100%", skewY: 4 }}
//             whileInView={{ y: 0, skewY: 0 }}
//             viewport={{ once: true, margin: "-80px" }}
//             transition={{
//               duration: 0.75,
//               delay: i * 0.1,
//               ease: [0.22, 1, 0.36, 1],
//             }}
//             className="block"
//           >
//             {line}
//           </motion.span>
//         </span>
//       ))}
//     </h2>
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
//           className="mb-4 flex items-center gap-3 justify-start"
//           style={{ justifyContent: align === "center" ? "center" : "flex-start" }}
//         >
//           <span className="h-px w-8 bg-[#B08D57]" />
//           <Eyebrow>{eyebrow}</Eyebrow>
//         </motion.div>
//       )}
//       <MaskedHeading lines={lines} align={align} dark={dark} />
//     </div>
//   );
// }

// /* Magnetic button: follows cursor slightly within its bounds */
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
//   const springX = useSpring(x, { stiffness: 200, damping: 15, mass: 0.3 });
//   const springY = useSpring(y, { stiffness: 200, damping: 15, mass: 0.3 });

//   const handleMouseMove = (e: React.MouseEvent) => {
//     const el = ref.current;
//     if (!el) return;
//     const rect = el.getBoundingClientRect();
//     const relX = e.clientX - rect.left - rect.width / 2;
//     const relY = e.clientY - rect.top - rect.height / 2;
//     x.set(relX * 0.25);
//     y.set(relY * 0.4);
//   };

//   const handleMouseLeave = () => {
//     x.set(0);
//     y.set(0);
//   };

//   const base =
//     "group relative inline-flex items-center gap-3 px-8 py-4 font-mono text-xs tracking-[0.2em] uppercase overflow-hidden transition-colors duration-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B08D57]";
//   const solid = "bg-[#7A2426] text-[#EDE6D6] hover:text-[#EDE6D6]";
//   const outline = "border border-[#EDE6D6]/40 text-[#EDE6D6] hover:border-[#EDE6D6]";

//   const content = (
//     <>
//       {variant === "solid" && (
//         <span className="absolute inset-0 -translate-x-full bg-[#14110F] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0" />
//       )}
//       <span className="relative z-10">{children}</span>
//       <Scissors className="relative z-10 w-3.5 h-3.5 transition-transform duration-500 group-hover:rotate-[20deg]" />
//     </>
//   );

//   const classes = `${base} ${variant === "solid" ? solid : outline} ${className}`;

//   const motionProps = {
//     style: { x: springX, y: springY },
//     onMouseMove: handleMouseMove,
//     onMouseLeave: handleMouseLeave,
//   };

//   if (href) {
//     return (
//       <motion.a ref={ref} href={href} className={classes} {...motionProps}>
//         {content}
//       </motion.a>
//     );
//   }
//   return (
//     <motion.button ref={ref} onClick={onClick} className={classes} {...motionProps}>
//       {content}
//     </motion.button>
//   );
// }

// /* Rotating brass seal   the signature element */
// function BarberSeal({ className = "" }: { className?: string }) {
//   const shouldReduceMotion = useReducedMotion();
//   return (
//     <motion.div
//       animate={shouldReduceMotion ? {} : { rotate: 360 }}
//       transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
//       className={className}
//     >
//       <svg viewBox="0 0 200 200" className="w-full h-full">
//         <defs>
//           <path
//             id="sealCircle"
//             d="M 100,100 m -78,0 a 78,78 0 1,1 156,0 a 78,78 0 1,1 -156,0"
//           />
//         </defs>
//         <circle
//           cx="100"
//           cy="100"
//           r="98"
//           fill="none"
//           stroke="#B08D57"
//           strokeWidth="1"
//           opacity="0.6"
//         />
//         <circle
//           cx="100"
//           cy="100"
//           r="62"
//           fill="none"
//           stroke="#B08D57"
//           strokeWidth="1"
//           opacity="0.6"
//         />
//         <text fill="#B08D57" fontSize="13" letterSpacing="3">
//           <textPath href="#sealCircle" startOffset="0%">
//             • EST. 2011 • DE EXTREMO CO. • NEW YORK CITY
//           </textPath>
//         </text>
//         <circle cx="100" cy="100" r="6" fill="#B08D57" />
//       </svg>
//     </motion.div>
//   );
// }

// function Ticker() {
//   const loopItems = [...TICKER_ITEMS, ...TICKER_ITEMS];
//   return (
//     <div className="relative bg-[#7A2426] py-3 overflow-hidden border-y border-[#B08D57]/30">
//       <motion.div
//         animate={{ x: ["0%", "-50%"] }}
//         transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
//         className="flex whitespace-nowrap"
//       >
//         {loopItems.map((item, i) => (
//           <span
//             key={i}
//             className="font-mono text-xs md:text-sm tracking-[0.25em] uppercase text-[#EDE6D6]/90 mx-6 flex items-center gap-6"
//           >
//             {item}
//             <span className="text-[#B08D57]">✂</span>
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
//         transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
//         className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
//           scrolled
//             ? "bg-[#14110F]/90 backdrop-blur-md py-4 shadow-[0_1px_0_rgba(237,230,214,0.08)]"
//             : "bg-transparent py-6 md:py-7"
//         }`}
//       >
//         <nav className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
//           <a
//             href="#home"
//             className="font-display text-xl md:text-2xl tracking-[0.08em] text-[#EDE6D6] uppercase"
//           >
//             DE <span className="text-[#B08D57]">EXTREMO Co.</span>
//           </a>

//           <ul className="hidden lg:flex items-center gap-9 font-mono text-xs tracking-[0.15em] uppercase text-[#EDE6D6]/85">
//             {NAV_LINKS.map((link) => (
//               <li key={link.label}>
//                 <a
//                   href={link.href}
//                   className="relative py-1 transition-colors hover:text-[#B08D57] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B08D57] after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-[#B08D57] after:transition-all after:duration-300 hover:after:w-full"
//                 >
//                   {link.label}
//                 </a>
//               </li>
//             ))}
//           </ul>

//           <div className="hidden lg:block">
//             <a
//               href="#contact"
//               className="font-mono rounded-3xl text-xs tracking-[0.2em] uppercase bg-[#7A2426] text-[#EDE6D6] px-6 py-3 transition-all duration-300 hover:bg-[#B08D57] hover:text-[#14110F] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B08D57]"
//             >
//               Book a Chair
//             </a>
//           </div>

//           <button
//             aria-label="Open menu"
//             onClick={() => setMobileOpen(true)}
//             className="lg:hidden text-[#EDE6D6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B08D57]"
//           >
//             <Menu className="w-7 h-7" />
//           </button>
//         </nav>
//       </motion.header>

//       <AnimatePresence>
//         {mobileOpen && (
//           <motion.div
//             initial={{ clipPath: "circle(0% at 100% 0%)" }}
//             animate={{ clipPath: "circle(150% at 100% 0%)" }}
//             exit={{ clipPath: "circle(0% at 100% 0%)" }}
//             transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
//             className="fixed inset-0 z-[60] bg-[#14110F] flex flex-col"
//           >
//             <div className="flex items-center justify-between px-6 py-6">
//               <span className="font-display text-xl tracking-[0.08em] text-[#EDE6D6] uppercase">
//                 DE <span className="text-[#B08D57]">EXTREMO Co.</span>
//               </span>
//               <button
//                 aria-label="Close menu"
//                 onClick={() => setMobileOpen(false)}
//                 className="text-[#EDE6D6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B08D57]"
//               >
//                 <X className="w-7 h-7" />
//               </button>
//             </div>
//             <ul className="flex-1 flex flex-col items-start justify-center gap-1 px-8">
//               {NAV_LINKS.map((link, i) => (
//                 <motion.li
//                   key={link.label}
//                   initial={{ opacity: 0, x: -20 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ delay: 0.15 + i * 0.07 }}
//                   className="w-full border-b border-[#EDE6D6]/10 py-4"
//                 >
//                   <a
//                     href={link.href}
//                     onClick={() => setMobileOpen(false)}
//                     className="font-display text-4xl uppercase text-[#EDE6D6] hover:text-[#B08D57] transition-colors"
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
//                 className="inline-flex rounded-3xl items-center gap-3 bg-[#7A2426] text-[#EDE6D6] px-8 py-4 font-mono text-xs tracking-[0.2em] uppercase"
//               >
//                 Book a Chair <ArrowRight className="w-4 h-4" />
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

//   const headline = ["SHARP", "CUTS.", "HONEST WORK."];

//   return (
//     <section
//       id="home"
//       ref={ref}
//       className="relative  min-h-[640px] w-full overflow-hidden bg-[#14110F]"
//     >
//       <motion.div
//         style={{ y }}
//         initial={{ scale: 1.18, filter: "grayscale(40%)" }}
//         animate={{ scale: 1, filter: "grayscale(0%)" }}
//         transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1] }}
//         className="absolute inset-0"
//       >
//         <img
//           src="https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=1200&q=80"

//           alt="Vintage barbershop chair inside a New York City barbershop"
//           className="w-full h-full object-cover"
//         />
//       </motion.div>

//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 1.8 }}
//         className="absolute inset-0 bg-gradient-to-t from-[#14110F] via-[#14110F]/55 to-[#14110F]/25"
//       />
//       <div className="absolute inset-0 bg-gradient-to-r from-[#14110F]/70 via-transparent to-[#14110F]/30" />

//       {!shouldReduceMotion && (
//         <motion.div
//           animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
//           transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
//           className="absolute top-1/4 left-[6%] w-72 h-72 rounded-full bg-[#7A2426]/15 blur-3xl"
//         />
//       )}

//       <motion.div
//         initial={{ opacity: 0, scale: 0.8, rotate: -20 }}
//         animate={{ opacity: 1, scale: 1, rotate: 0 }}
//         transition={{ delay: 1.2, duration: 1, ease: [0.22, 1, 0.36, 1] }}
//         className="hidden md:block absolute top-28 right-10 w-32 h-32 lg:w-40 lg:h-40"
//       >
//         <BarberSeal className="w-full h-full" />
//       </motion.div>

//       <motion.div style={{ opacity }} className="relative pt-28 z-10 h-full flex flex-col justify-end">
//         <div className="max-w-7xl mx-auto w-full px-6 md:px-10 pb-16">
//           <motion.div
//             initial={{ opacity: 0, y: 12 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.8, duration: 0.8 }}
//             className="flex items-center gap-3 mb-6"
//           >
//             <span className="h-px  w-10 bg-[#B08D57]" />
//             <Eyebrow>Since 2011   Lower East Side, NYC</Eyebrow>
//           </motion.div>

//           <h1 className="font-display uppercase text-[#EDE6D6]  text-6xl sm:text-7xl md:text-8xl lg:text-[9rem]">
//             {headline.map((word, i) => (
//               <span key={word} className="block overflow-hidden">
//                 <motion.span
//                   initial={{ y: "110%", skewY: 6 }}
//                   animate={{ y: 0, skewY: 0 }}
//                   transition={{
//                     delay: 1 + i * 0.15,
//                     duration: 0.9,
//                     ease: [0.22, 1, 0.36, 1],
//                   }}
//                   className="block"
//                 >
//                   {i === 2 ? <span className="text-[#7A2426]">{word}</span> : word}
//                 </motion.span>
//               </span>
//             ))}
//           </h1>

//           <motion.p
//             initial={{ opacity: 0, y: 16 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 1.7, duration: 0.8 }}
//             className="font-body text-[#EDE6D6]/80 text-base md:text-lg max-w-md mt-8 leading-relaxed"
//           >
//             A traditional barbershop for the city that never sits still  
//             fades, shaves and beard work done right, every time.
//           </motion.p>

//           <motion.div
//             initial={{ opacity: 0, y: 16 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 1.9, duration: 0.8 }}
//             className="flex flex-wrap items-center gap-4 mt-10"
//           >
//             <MagneticButton className="rounded-3xl" href="#contact">Book a Chair</MagneticButton>
//             <MagneticButton className="rounded-3xl" href="#gallery" variant="outline">
//               See the Work
//             </MagneticButton>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 2.2, duration: 0.8 }}
//             className="flex items-center gap-2 mt-10 text-[#EDE6D6]/60 font-mono text-xs tracking-[0.2em] uppercase"
//           >
//             <MapPin className="w-3.5 h-3.5" />
//             Bronx, New York, NY
//           </motion.div>
//         </div>
//       </motion.div>

//       {/* <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ delay: 2.4, duration: 1 }}
//         className="absolute bottom-8 right-6 md:right-10 z-10 flex flex-col items-center gap-2 text-[#EDE6D6]/70"
//       >
//         <span className="font-mono text-[10px] tracking-[0.3em] uppercase [writing-mode:vertical-rl]">
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
//    HERITAGE / ABOUT
//    ================================================== */

// function Heritage() {
//   return (
//     <section id="heritage" className="relative bg-[#EDE6D6] py-28 md:py-40 overflow-hidden">
//       <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
//         <div className="lg:col-span-5 order-2 lg:order-1">
//           <SectionHeading
//             eyebrow="Our Heritage"
//             lines={["A CHAIR", "PASSED DOWN,", "NOT SOLD."]}
//             dark
//           />
//           <motion.p
//             initial={{ opacity: 0, y: 16 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true, margin: "-80px" }}
//             transition={{ duration: 0.7, delay: 0.3 }}
//             className="font-body text-[#14110F]/70 text-base md:text-lg leading-relaxed mt-8 max-w-md"
//           >
//             De Extremo Co. opened its doors in 2011 in a shopfront that
//             had housed a barbershop since the 1940s. We kept the tile, the
//             chairs, and the standard   every cut earns its keep.
//           </motion.p>
//           <motion.p
//             initial={{ opacity: 0, y: 16 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true, margin: "-80px" }}
//             transition={{ duration: 0.7, delay: 0.45 }}
//             className="font-body text-[#14110F]/70 text-base md:text-lg leading-relaxed mt-4 max-w-md"
//           >
//             No membership, no upsell   just barbers who've done this for
//             years, tools kept sharp, and a shop that still smells like bay
//             rum.
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
//               className="!text-[#14110F] rounded-3xl !border-[#14110F]/30 hover:!border-[#14110F]"
//             >
//               See Our Services
//             </MagneticButton>
//           </motion.div>
//         </div>

//         <div className="lg:col-span-7 order-1 lg:order-2 relative">
//           <motion.div
//             initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
//             whileInView={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
//             viewport={{ once: true, margin: "-100px" }}
//             transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
//             className="relative aspect-[4/5] rounded-3xl md:aspect-[16/11] w-full overflow-hidden"
//           >
//             <img
//               src="https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=1400&q=80"
//               alt="Barber giving a client a precision fade haircut"
//               className="w-full rounded-3xl h-full object-cover grayscale-[15%]"
//             />
//           </motion.div>
//           <motion.div
//             initial={{ opacity: 0, x: -30, y: 30, rotate: -6 }}
//             whileInView={{ opacity: 1, x: 0, y: 0, rotate: -4 }}
//             viewport={{ once: true, margin: "-60px" }}
//             transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
//             className="hidden rounded-3xl md:block absolute -bottom-10 -left-10 w-56 aspect-[3/4] overflow-hidden shadow-2xl border-4 border-[#EDE6D6]"
//           >
//             <img
//               src="https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=1200&q=80"
//               alt="Close-up detail of a straight razor and barber tools"
//               className="w-full rounded-3xl h-full object-cover"
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
//     <section id="services" className="relative bg-[#14110F] py-28 md:py-40">
//       <div className="max-w-7xl mx-auto px-6 md:px-10">
//         <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16 md:mb-24">
//           <SectionHeading eyebrow="The Menu" lines={["EVERY CUT", "EARNS ITS KEEP."]} />
//           <p className="font-body text-[#EDE6D6]/50 text-sm max-w-xs">
//             Prices reflect standard chair time. Walk-ins seated in order of
//             arrival; appointments held for ten minutes.
//           </p>
//         </div>

//         <div className="flex flex-col">
//           {SERVICES.map((service, i) => (
//             <motion.div
//               key={service.title}
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true, margin: "-60px" }}
//               transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
//               className="group relative grid grid-cols-1 md:grid-cols-12 items-center gap-6 py-8 border-t border-[#EDE6D6]/12 last:border-b"
//             >
//               <span className="md:col-span-1 font-mono text-[#B08D57] text-sm">
//                 {service.number}
//               </span>

//               <div className="md:col-span-4 flex items-center gap-5">
//                 <div className="relative rounded-3xl w-20 h-20 md:w-24 md:h-24 overflow-hidden flex-shrink-0">
//                   <img
//                     src={service.image}
//                     alt={`${service.title} at De Extremo Co.`}
//                     className="w-full rounded-3xl h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-125"
//                   />
//                 </div>
//                 <h3 className="font-display uppercase text-[#EDE6D6] text-2xl md:text-3xl leading-none">
//                   {service.title}
//                 </h3>
//               </div>

//               <p className="md:col-span-5 font-body text-[#EDE6D6]/55 text-sm leading-relaxed">
//                 {service.description}
//               </p>

//               <div className="md:col-span-2 flex items-center justify-between md:justify-end gap-4">
//                 <span className="font-mono text-[#EDE6D6] text-xl md:text-2xl">
//                   {service.price}
//                 </span>
//                 <ArrowUpRight className="w-5 h-5 text-[#B08D57] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-400" />
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
//     <section ref={ref} className="relative h-[80vh] min-h-[520px] overflow-hidden">
//       <motion.div style={{ y }} className="absolute inset-0 scale-110">
//         <img
//           src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1200&q=80"

//           alt="Barber focused on a precision haircut in a New York shop"
//           className="w-full h-full object-cover grayscale-[20%]"
//         />
//       </motion.div>
//       <div className="absolute inset-0 bg-[#14110F]/60" />
//       <div className="relative z-10 h-full flex items-center justify-center px-6">
//         <motion.blockquote
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true, margin: "-100px" }}
//           transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
//           className="text-center max-w-4xl"
//         >
//           <p className="font-display uppercase text-[#EDE6D6] text-3xl sm:text-4xl md:text-6xl leading-tight">
//             A Good Cut Doesn&rsquo;t Ask
//             <br />
//             <span className="text-[#B08D57]">For Your Attention.</span>
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
//     <section id="gallery" className="relative bg-[#EDE6D6] py-28 md:py-40">
//       <div className="max-w-7xl mx-auto px-6 md:px-10">
//         <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14">
//           <SectionHeading eyebrow="Gallery" lines={["THE PROOF", "IS IN THE CUT."]} dark />

//           <div className="flex flex-wrap gap-2">
//             {GALLERY_FILTERS.map((f) => (
//               <button
//                 key={f}
//                 onClick={() => setFilter(f)}
//                 className={`font-mono text-xs rounded-3xl tracking-[0.15em] uppercase px-5 py-2.5 border transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B08D57] ${
//                   filter === f
//                     ? "bg-[#14110F] text-[#EDE6D6] border-[#14110F]"
//                     : "border-[#14110F]/25 text-[#14110F]/70 hover:border-[#14110F]"
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
//                 className={`group rounded-3xl relative overflow-hidden break-inside-avoid ${
//                   item.orientation === "landscape" ? "aspect-[3/4]" : "aspect-[3/4]"
//                 }`}
//               >
//                 <img
//                   src={item.image}
//                   alt={`${item.category} work at De Extremo Co.`}
//                   className="w-full rounded-3xl h-full object-cover grayscale-[30%] transition-all duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110 group-hover:grayscale-0"
//                 />
//                 <div className="absolute inset-0 bg-[#14110F]/0 group-hover:bg-[#14110F]/35 transition-colors duration-500 flex items-end p-5">
//                   <span className="font-mono text-[#EDE6D6] text-xs tracking-[0.2em] uppercase opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
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
//     <section className="relative bg-[#14110F] py-28 md:py-40">
//       <div className="max-w-7xl mx-auto px-6 md:px-10">
//         <div className="max-w-2xl mb-16 md:mb-24">
//           <SectionHeading eyebrow="How It Works" lines={["WALK IN.", "SIT DOWN.", "WALK OUT."]} />
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
//           {PROCESS_STEPS.map((step, i) => (
//             <motion.div
//               key={step.number}
//               initial={{ opacity: 0, y: 40 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true, margin: "-80px" }}
//               transition={{ duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
//               className="relative border-t border-[#EDE6D6]/15 pt-8"
//             >
//               <span className="font-mono text-[#B08D57] text-lg block mb-6">
//                 {step.number}
//               </span>
//               <h3 className="font-display uppercase text-[#EDE6D6] text-3xl md:text-4xl mb-4">
//                 {step.title}
//               </h3>
//               <p className="font-body text-[#EDE6D6]/65 text-base leading-relaxed max-w-xs">
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
//     <section id="reviews" className="relative bg-[#EDE6D6] py-28 md:py-40 overflow-hidden">
//       <div className="max-w-4xl mx-auto px-6 md:px-10 text-center">
//         <SectionHeading eyebrow="Reviews" lines={["THE REGULARS", "SAY IT BEST."]} dark align="center" />

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
//               <div className="flex gap-1 text-[#B08D57]">
//                 {Array.from({ length: 5 }).map((_, i) => (
//                   <Star key={i} className="w-4 h-4 fill-current" />
//                 ))}
//               </div>
//               <p className="font-display uppercase text-[#14110F] text-2xl md:text-3xl leading-snug max-w-2xl">
//                 &ldquo;{TESTIMONIALS[index].quote}&rdquo;
//               </p>
//               <span className="font-mono text-[#14110F]/60 text-xs tracking-[0.2em] uppercase">
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
//               className={`h-1.5 rounded-full transition-all duration-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B08D57] ${
//                 i === index ? "w-8 bg-[#14110F]" : "w-1.5 bg-[#14110F]/25"
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
//           src="https://images.unsplash.com/photo-1512690459411-b9245aed614b?auto=format&fit=crop&w=1920&q=80"
//           alt="Interior of a classic New York City barbershop"
//           className="w-full h-full object-cover grayscale-[25%]"
//         />
//         <div className="absolute inset-0 bg-[#14110F]/75" />
//         <div className="absolute inset-0 bg-gradient-to-t from-[#14110F] via-transparent to-[#14110F]/50" />
//       </div>

//       {!shouldReduceMotion && (
//         <>
//           <motion.div
//             animate={{ opacity: [0.2, 0.5, 0.2] }}
//             transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
//             className="absolute top-1/3 left-1/4 w-72 h-72 rounded-full bg-[#7A2426]/25 blur-3xl"
//           />
//           <motion.div
//             animate={{ opacity: [0.4, 0.15, 0.4] }}
//             transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
//             className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-[#B08D57]/15 blur-3xl"
//           />
//         </>
//       )}

//       <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
//         <SectionHeading lines={["THE CHAIR IS", "WARMING UP."]} align="center" />
//         <motion.p
//           initial={{ opacity: 0, y: 16 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.7, delay: 0.4 }}
//           className="font-body text-[#EDE6D6]/75 text-base md:text-lg mt-8 max-w-lg mx-auto leading-relaxed"
//         >
//           Whether it's a quick cleanup or the full service, we'll have you
//           out the door looking sharper than when you walked in.
//         </motion.p>
//         <motion.div
//           initial={{ opacity: 0, y: 16 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.7, delay: 0.55 }}
//           className="mt-10 flex justify-center"
//         >
//           <MagneticButton className="rounded-3xl" href="#contact">Book a Chair</MagneticButton>
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
//     <section id="contact" className="relative bg-[#14110F] py-28 md:py-40">
//       <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-16">
//         <div className="lg:col-span-5">
//           <SectionHeading eyebrow="Book a Chair" lines={["RESERVE", "YOUR SPOT."]} />
//           <motion.p
//             initial={{ opacity: 0, y: 16 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.7, delay: 0.3 }}
//             className="font-body text-[#EDE6D6]/65 text-base leading-relaxed mt-8 max-w-sm"
//           >
//             Walk-ins always welcome. Send an enquiry to hold a slot, and
//             we'll confirm your time same day.
//           </motion.p>

//           <motion.div
//             initial={{ opacity: 0, y: 16 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.7, delay: 0.4 }}
//             className="flex items-center gap-3 mt-8 text-[#EDE6D6]/70 font-mono text-sm"
//           >
//             <Phone className="w-4 h-4 text-[#B08D57]" />
//             (917) 346-9091 
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, y: 16 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.7, delay: 0.5 }}
//             className="flex items-center gap-5 mt-8"
//           >
//             <a
//               href="https://instagram.com/boweryybarberco"
//               aria-label="Instagram"
//               className="w-11 h-11 rounded-full border border-[#EDE6D6]/25 flex items-center justify-center text-[#EDE6D6] hover:border-[#B08D57] hover:text-[#B08D57] transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B08D57]"
//             >
//               <FaInstagram className="w-4.5 h-4.5" />
//             </a>
//             <a
//               href="mailto:hello@bowerybarberco.nyc"
//               aria-label="Email"
//               className="w-11 h-11 rounded-full border border-[#EDE6D6]/25 flex items-center justify-center text-[#EDE6D6] hover:border-[#B08D57] hover:text-[#B08D57] transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B08D57]"
//             >
//               <Mail className="w-4.5 h-4.5" />
//             </a>
//             <a
//               href="https://wa.me/12125550148"
//               aria-label="WhatsApp"
//               className="w-11 h-11 rounded-full border border-[#EDE6D6]/25 flex items-center justify-center text-[#EDE6D6] hover:border-[#B08D57] hover:text-[#B08D57] transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B08D57]"
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
//                 className="h-full flex flex-col rounded-3xl items-center justify-center text-center border border-[#EDE6D6]/15 py-24 px-8"
//               >
//                 <span className="font-display uppercase text-[#B08D57] text-4xl mb-4">
//                   You're In
//                 </span>
//                 <p className="font-body text-[#EDE6D6]/70 max-w-sm">
//                   Your enquiry has been received. We'll confirm your slot
//                   same day   see you in the chair.
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
//                     className="font-mono text-xs tracking-[0.2em] uppercase text-[#EDE6D6]/50"
//                   >
//                     Service
//                   </label>
//                   <select
//                     id="service"
//                     className="bg-transparent border-b border-[#EDE6D6]/25 py-3 font-body text-[#EDE6D6] focus:outline-none focus:border-[#B08D57] transition-colors [&>option]:text-[#14110F]"
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
//                     className="font-mono text-xs tracking-[0.2em] uppercase text-[#EDE6D6]/50"
//                   >
//                     Anything we should know?
//                   </label>
//                   <textarea
//                     id="message"
//                     rows={4}
//                     className="bg-transparent border-b border-[#EDE6D6]/25 py-3 font-body text-[#EDE6D6] focus:outline-none focus:border-[#B08D57] transition-colors resize-none"
//                   />
//                 </div>
//                 <div className="sm:col-span-2 mt-4">
//                   <button
//                     type="submit"
//                     className="group rounded-3xl relative inline-flex items-center gap-3 bg-[#7A2426] text-[#EDE6D6] px-8 py-4 font-mono text-xs tracking-[0.2em] uppercase overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#EDE6D6]"
//                   >
//                     <span className="absolute inset-0 -translate-x-full bg-[#B08D57] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0" />
//                     <span className="relative  z-10 group-hover:text-[#14110F] transition-colors duration-500">
//                       Send Enquiry
//                     </span>
//                     <Scissors className="relative z-10 w-4 h-4 transition-transform duration-500 group-hover:rotate-[20deg] group-hover:text-[#14110F]" />
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
//         className="font-mono text-xs tracking-[0.2em] uppercase text-[#EDE6D6]/50"
//       >
//         {label}
//         {required && <span className="text-[#B08D57]"> *</span>}
//       </label>
//       <input
//         id={id}
//         type={type}
//         required={required}
//         className="bg-transparent border-b border-[#EDE6D6]/25 py-3 font-body text-[#EDE6D6] focus:outline-none focus:border-[#B08D57] transition-colors"
//       />
//     </div>
//   );
// }

// /* ==================================================
//    FOOTER
//    ================================================== */

// function Footer() {
//   return (
//     <footer className="relative bg-[#0F0D0B] pt-20 pb-10">
//       <div className="max-w-7xl mx-auto px-6 md:px-10">
//         <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10 pb-14 border-b border-[#EDE6D6]/10">
//           <div>
//             <span className="font-display text-3xl tracking-[0.05em] text-[#EDE6D6] uppercase">
//               DE <span className="text-[#B08D57]">EXTREMO Co.</span>
//             </span>
//             <p className="font-mono text-[#EDE6D6]/50 text-xs tracking-[0.2em] uppercase mt-3">
//               Sharp Cuts. Honest Work.
//             </p>
//           </div>

//           <ul className="flex flex-wrap gap-x-8 gap-y-3 font-mono text-xs tracking-[0.15em] uppercase text-[#EDE6D6]/60">
//             {NAV_LINKS.map((link) => (
//               <li key={link.label}>
//                 <a href={link.href} className="hover:text-[#B08D57] transition-colors">
//                   {link.label}
//                 </a>
//               </li>
//             ))}
//           </ul>

//           <div className="flex items-center gap-4">
//             <a
//               href="https://instagram.com/boweryybarberco"
//               aria-label="Instagram"
//               className="w-10 h-10 rounded-full border border-[#EDE6D6]/20 flex items-center justify-center text-[#EDE6D6]/70 hover:text-[#B08D57] hover:border-[#B08D57] transition-colors"
//             >
//               <FaInstagram className="w-4 h-4" />
//             </a>
//             <a
//               href="mailto:hello@bowerybarberco.nyc"
//               aria-label="Email"
//               className="w-10 h-10 rounded-full border border-[#EDE6D6]/20 flex items-center justify-center text-[#EDE6D6]/70 hover:text-[#B08D57] hover:border-[#B08D57] transition-colors"
//             >
//               <Mail className="w-4 h-4" />
//             </a>
//             <a
//               href="https://wa.me/12125550148"
//               aria-label="WhatsApp"
//               className="w-10 h-10 rounded-full border border-[#EDE6D6]/20 flex items-center justify-center text-[#EDE6D6]/70 hover:text-[#B08D57] hover:border-[#B08D57] transition-colors"
//             >
//               <FaWhatsapp className="w-4 h-4" />
//             </a>
//           </div>
//         </div>

//         <p className="font-mono text-[#EDE6D6]/35 text-xs tracking-[0.1em] text-center pt-8">
//           © 2026 De Extremo Co. All rights reserved.
//         </p>
//       </div>
//     </footer>
//   );
// }

// /* ==================================================
//    PAGE
//    ================================================== */

// export default function BoweryBarberCo() {
//   return (
//     <main className="bg-[#14110F] antialiased">
//       <FontImports />
//       <Navigation />
//       <Hero />
//       <Ticker />
//       <Heritage />
//       <Services />
//       <CinematicStatement />
//       <Gallery />
//       <Process />
//       <Testimonials />
//       <CallToAction />
//       <Contact />
//       <Footer />
//     </main>
//   );
// }
