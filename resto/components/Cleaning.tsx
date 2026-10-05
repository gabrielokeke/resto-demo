
// "use client";

// import { useEffect, useRef, useState, useCallback, memo } from "react";
// import * as THREE from "three";
// import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
// import {
//   Menu,
//   X,
//   Sparkles,
//   Building2,
//   Home as HomeIcon,
//   HardHat,
//   Warehouse,
//   Hotel,
//   Briefcase,
//   ShieldCheck,
//   Clock,
//   BadgeCheck,
//   Star,
//   ChevronRight,
//   ChevronLeft,
//   Phone,
//   Mail,
//   MapPin,
//   ArrowRight,
//   CalendarCheck,
//   ClipboardList,
//   SprayCan,
//   CheckCircle2,
// } from "lucide-react";
// import { FaWhatsapp, FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";

// /* ---------------------------------------------------------------------- */
// /* Data                                                                    */
// /* ---------------------------------------------------------------------- */

// type ServiceKey =
//   | "residential"
//   | "commercial"
//   | "janitorial"
//   | "deep"
//   | "postConstruction"
//   | "industrial"
//   | "office"
//   | "facility"
//   | "homeCare"
//   | "hospitality";

// interface ServiceContent {
//   key: ServiceKey;
//   title: string;
//   description: string;
//   icon: React.ReactNode;
// }

// interface CompanyProfile {
//   name: string;
//   tagline: string;
//   city: string;
//   heroHeadline: string;
//   heroSub: string;
//   primaryServiceKeys: ServiceKey[];
//   phone: string;
//   whatsapp: string;
//   email: string;
//   address: string;
// }

// const SERVICE_LIBRARY: Record<ServiceKey, ServiceContent> = {
//   residential: {
//     key: "residential",
//     title: "Residential Cleaning",
//     description:
//       "Tailored home cleaning schedules that respect your routine, your finishes, and your family.",
//     icon: <HomeIcon className="h-6 w-6" strokeWidth={1.75} />,
//   },
//   commercial: {
//     key: "commercial",
//     title: "Commercial Cleaning",
//     description:
//       "Consistent, discreet servicing for retail floors, showrooms, and client-facing spaces.",
//     icon: <Building2 className="h-6 w-6" strokeWidth={1.75} />,
//   },
//   janitorial: {
//     key: "janitorial",
//     title: "Janitorial Services",
//     description:
//       "Daily on-site janitorial teams keeping restrooms, corridors, and common areas guest-ready.",
//     icon: <SprayCan className="h-6 w-6" strokeWidth={1.75} />,
//   },
//   deep: {
//     key: "deep",
//     title: "Deep Cleaning",
//     description:
//       "Intensive, top-to-bottom resets for kitchens, upholstery, grout, and high-touch surfaces.",
//     icon: <Sparkles className="h-6 w-6" strokeWidth={1.75} />,
//   },
//   postConstruction: {
//     key: "postConstruction",
//     title: "Post-Construction Cleaning",
//     description:
//       "Dust, debris, and residue clearance that hands over a site ready for its first walkthrough.",
//     icon: <HardHat className="h-6 w-6" strokeWidth={1.75} />,
//   },
//   industrial: {
//     key: "industrial",
//     title: "Industrial Cleaning",
//     description:
//       "Heavy-duty degreasing, floor scrubbing, and compliance-grade sanitation for plant facilities.",
//     icon: <Warehouse className="h-6 w-6" strokeWidth={1.75} />,
//   },
//   office: {
//     key: "office",
//     title: "Office Cleaning",
//     description:
//       "Before-hours and after-hours servicing that keeps desks, glass, and pantries client-ready.",
//     icon: <Briefcase className="h-6 w-6" strokeWidth={1.75} />,
//   },
//   facility: {
//     key: "facility",
//     title: "Facility Management",
//     description:
//       "End-to-end upkeep of buildings, grounds, and vendors under one accountable team.",
//     icon: <ClipboardList className="h-6 w-6" strokeWidth={1.75} />,
//   },
//   homeCare: {
//     key: "homeCare",
//     title: "Home Care Services",
//     description:
//       "Gentle, dependable in-home support that pairs housekeeping with genuine care.",
//     icon: <ShieldCheck className="h-6 w-6" strokeWidth={1.75} />,
//   },
//   hospitality: {
//     key: "hospitality",
//     title: "Hospitality Cleaning",
//     description:
//       "Turnover-speed room servicing and public-area presentation built for hotel standards.",
//     icon: <Hotel className="h-6 w-6" strokeWidth={1.75} />,
//   },
// };

// const COMPANY: CompanyProfile = {
//   name: "Shelterspec Innov Ltd",
//   tagline: "Premium Cleaning, Quietly Done",
//   city: " Ilorin",
//   heroHeadline: "Spaces held to a standard you can feel the moment you walk in.",
//   heroSub:
//     "Shelterspec Innov Ltd delivers premium residential, commercial, and facility cleaning across  Ilorin   vetted teams, documented process, and results your guests notice before you point them out.",
//   primaryServiceKeys: [
//     "residential",
//     "commercial",
//     "office",
//     "deep",
//     "postConstruction",
//     "facility",
//   ],
//   phone: "+234 803 000 0000",
//   whatsapp: "2348030000000",
//   email: "hello@shelterspecinnovltd.ng",
//   address: "Plot 14, Gudu District,  Ilorin, Nigeria",
// };

// const PROCESS_STEPS = [
//   {
//     n: "01",
//     title: "Book a walkthrough",
//     desc: "Tell us your space and schedule. We confirm scope within one business day.",
//     icon: <CalendarCheck className="h-5 w-5" strokeWidth={1.75} />,
//   },
//   {
//     n: "02",
//     title: "We assess & scope",
//     desc: "A supervisor inspects the site and drafts a written cleaning plan and quote.",
//     icon: <ClipboardList className="h-5 w-5" strokeWidth={1.75} />,
//   },
//   {
//     n: "03",
//     title: "Trained teams clean",
//     desc: "Uniformed, background-checked crews execute to the documented checklist.",
//     icon: <SprayCan className="h-5 w-5" strokeWidth={1.75} />,
//   },
//   {
//     n: "04",
//     title: "Supervisor inspects",
//     desc: "Every job closes with a quality sign-off before we consider it complete.",
//     icon: <CheckCircle2 className="h-5 w-5" strokeWidth={1.75} />,
//   },
// ];

// const TESTIMONIALS = [
//   {
//     name: "Amara Nwosu",
//     role: "Facility Manager, Gudu Business Park",
//     quote:
//       "Verdant took over our office servicing last year. Zero complaints since, and their supervisor actually calls back.",
//     rating: 5,
//   },
//   {
//     name: "Tunde Bakare",
//     role: "Homeowner, Asokoro",
//     quote:
//       "They handled a full post-renovation clean in a day. I did not expect the marble to look that good again.",
//     rating: 5,
//   },
//   {
//     name: "Hauwa Ibrahim",
//     role: "Ops Lead, Lakeview Hotel",
//     quote:
//       "Room turnover times dropped noticeably after we switched. Their teams work fast without cutting corners.",
//     rating: 5,
//   },
// ];

// const STATS = [
//   { value: "12+", label: "Years servicing  Ilorin" },
//   { value: "340", label: "Active client sites" },
//   { value: "98%", label: "Contract renewal rate" },
//   { value: "24/7", label: "Emergency response" },
// ];

// /* ---------------------------------------------------------------------- */
// /* Three.js Hero Background                                                */
// /* ---------------------------------------------------------------------- */

// function HeroCanvas() {
//   const containerRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const container = containerRef.current;
//     if (!container) return;

//     const prefersReducedMotion = window.matchMedia(
//       "(prefers-reduced-motion: reduce)"
//     ).matches;

//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(
//       45,
//       container.clientWidth / container.clientHeight,
//       0.1,
//       100
//     );
//     camera.position.z = 12;

//     const renderer = new THREE.WebGLRenderer({
//       alpha: true,
//       antialias: true,
//       powerPreference: "low-power",
//     });
//     renderer.setSize(container.clientWidth, container.clientHeight);
//     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
//     container.appendChild(renderer.domElement);

//     const group = new THREE.Group();
//     scene.add(group);

//     const palette = [0xc9a227, 0x7fa684, 0xf7f5f0];
//     const count = 42;
//     const meshes: {
//       mesh: THREE.Mesh;
//       speed: number;
//       offset: number;
//       radius: number;
//     }[] = [];

//     for (let i = 0; i < count; i++) {
//       const radius = 0.05 + Math.random() * 0.16;
//       const geometry = new THREE.SphereGeometry(radius, 20, 20);
//       const color = palette[i % palette.length];
//       const material = new THREE.MeshBasicMaterial({
//         color,
//         transparent: true,
//         opacity: 0.16 + Math.random() * 0.22,
//       });
//       const mesh = new THREE.Mesh(geometry, material);
//       mesh.position.set(
//         (Math.random() - 0.5) * 16,
//         (Math.random() - 0.5) * 10,
//         (Math.random() - 0.5) * 8
//       );
//       group.add(mesh);
//       meshes.push({
//         mesh,
//         speed: 0.15 + Math.random() * 0.25,
//         offset: Math.random() * Math.PI * 2,
//         radius: 0.4 + Math.random() * 0.8,
//       });
//     }

//     let frameId: number;
//     let time = 0;

//     const animate = () => {
//       frameId = requestAnimationFrame(animate);
//       if (prefersReducedMotion) return;
//       time += 0.0035;
//       meshes.forEach(({ mesh, speed, offset, radius }) => {
//         mesh.position.y += Math.sin(time * speed + offset) * 0.0025;
//         mesh.position.x += Math.cos(time * speed * 0.6 + offset) * 0.0018;
//         mesh.rotation.z = time * speed * 0.2;
//       });
//       group.rotation.y = Math.sin(time * 0.08) * 0.06;
//       renderer.render(scene, camera);
//     };
//     animate();

//     const handleResize = () => {
//       if (!container) return;
//       camera.aspect = container.clientWidth / container.clientHeight;
//       camera.updateProjectionMatrix();
//       renderer.setSize(container.clientWidth, container.clientHeight);
//     };
//     window.addEventListener("resize", handleResize);

//     return () => {
//       window.removeEventListener("resize", handleResize);
//       cancelAnimationFrame(frameId);
//       meshes.forEach(({ mesh }) => {
//         mesh.geometry.dispose();
//         (mesh.material as THREE.Material).dispose();
//       });
//       renderer.dispose();
//       if (container.contains(renderer.domElement)) {
//         container.removeChild(renderer.domElement);
//       }
//     };
//   }, []);

//   return (
//     <div
//       ref={containerRef}
//       className="absolute inset-0 h-full w-full"
//       aria-hidden="true"
//     />
//   );
// }

// /* ---------------------------------------------------------------------- */
// /* Navbar                                                                   */
// /* ---------------------------------------------------------------------- */

// const NAV_LINKS = [
//   { label: "Services", href: "#services" },
//   { label: "Process", href: "#process" },
//   { label: "Why Us", href: "#why-us" },
//   { label: "Testimonials", href: "#testimonials" },
//   { label: "Contact", href: "#contact" },
// ];

// function Navbar() {
//   const [open, setOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);

//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 12);
//     window.addEventListener("scroll", onScroll);
//     onScroll();
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   return (
//     <header
//       className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
//         scrolled
//           ? "bg-[#0F3D2E]/95 backdrop-blur-md shadow-lg shadow-black/10"
//           : "bg-transparent"
//       }`}
//     >
//       <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-10">
//         <a href="#top" className="flex items-center gap-2.5">
//           <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#C9A227]">
//             <Sparkles className="h-4.5 w-4.5 text-[#0F3D2E]" strokeWidth={2} />
//           </span>
//           <span className="font-serif text-lg font-semibold tracking-tight text-[#F7F5F0]">
//             {COMPANY.name}
//           </span>
//         </a>

//         <ul className="hidden items-center gap-9 lg:flex">
//           {NAV_LINKS.map((link) => (
//             <li key={link.href}>
//               <a
//                 href={link.href}
//                 className="text-sm font-medium text-[#F7F5F0]/80 transition-colors hover:text-[#C9A227]"
//               >
//                 {link.label}
//               </a>
//             </li>
//           ))}
//         </ul>

//         <div className="hidden lg:block">
//           <a
//             href={`tel:${COMPANY.phone.replace(/\s/g, "")}`}
//             className="inline-flex items-center gap-2 rounded-full bg-[#C9A227] px-5 py-2.5 text-sm font-semibold text-[#0F3D2E] transition-transform hover:scale-[1.03] active:scale-[0.98]"
//           >
//             <Phone className="h-4 w-4" strokeWidth={2} />
//             Get a Quote
//           </a>
//         </div>

//         <button
//           onClick={() => setOpen((v) => !v)}
//           className="flex h-10 w-10 items-center justify-center rounded-full text-[#F7F5F0] lg:hidden"
//           aria-label={open ? "Close menu" : "Open menu"}
//           aria-expanded={open}
//         >
//           {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//         </button>
//       </nav>

//       <AnimatePresence>
//         {open && (
//           <motion.div
//             initial={{ height: 0, opacity: 0 }}
//             animate={{ height: "auto", opacity: 1 }}
//             exit={{ height: 0, opacity: 0 }}
//             transition={{ duration: 0.25, ease: "easeInOut" }}
//             className="overflow-hidden bg-[#0F3D2E] lg:hidden"
//           >
//             <ul className="flex flex-col gap-1 px-5 pb-6 pt-2">
//               {NAV_LINKS.map((link) => (
//                 <li key={link.href}>
//                   <a
//                     href={link.href}
//                     onClick={() => setOpen(false)}
//                     className="block rounded-lg px-3 py-3 text-base font-medium text-[#F7F5F0]/90 hover:bg-white/5"
//                   >
//                     {link.label}
//                   </a>
//                 </li>
//               ))}
//               <li className="pt-2">
//                 <a
//                   href={`tel:${COMPANY.phone.replace(/\s/g, "")}`}
//                   className="flex items-center justify-center gap-2 rounded-full bg-[#C9A227] px-5 py-3 text-sm font-semibold text-[#0F3D2E]"
//                 >
//                   <Phone className="h-4 w-4" strokeWidth={2} />
//                   Get a Quote
//                 </a>
//               </li>
//             </ul>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </header>
//   );
// }

// /* ---------------------------------------------------------------------- */
// /* Hero                                                                     */
// /* ---------------------------------------------------------------------- */

// function Hero() {
//   return (
//     <section
//       id="top"
//       className="relative flex min-h-[92vh] items-center overflow-hidden bg-[#0F3D2E] pt-24"
//     >
//       <HeroCanvas />
//       <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0F3D2E]/40 via-transparent to-[#0F3D2E]" />

//       <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10">
//         <motion.div
//           initial={{ opacity: 0, y: 24 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.7, ease: "easeOut" }}
//           className="max-w-2xl"
//         >
//           <span className="inline-flex items-center gap-2 rounded-full border border-[#C9A227]/40 bg-[#C9A227]/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-[#C9A227]">
//             Premium Cleaning · {COMPANY.city}
//           </span>

//           <h1 className="mt-6 font-serif text-4xl font-semibold leading-[1.08] tracking-tight text-[#F7F5F0] sm:text-5xl lg:text-6xl">
//             {COMPANY.heroHeadline}
//           </h1>

//           <p className="mt-6 max-w-xl text-base leading-relaxed text-[#F7F5F0]/75 sm:text-lg">
//             {COMPANY.heroSub}
//           </p>

//           <div className="mt-9 flex flex-wrap items-center gap-4">
//             <a
//               href="#contact"
//               className="inline-flex items-center gap-2 rounded-full bg-[#C9A227] px-6 py-3.5 text-sm font-semibold text-[#0F3D2E] transition-transform hover:scale-[1.03] active:scale-[0.98]"
//             >
//               Request a Quote
//               <ArrowRight className="h-4 w-4" strokeWidth={2} />
//             </a>

//             <a
//               href="#services"
//               className="inline-flex items-center gap-2 rounded-full border border-[#F7F5F0]/25 px-6 py-3.5 text-sm font-semibold text-[#F7F5F0] transition-colors hover:bg-white/5"
//             >
//               View Services
//             </a>
//           </div>

//           <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3">
//             {["Vetted & uniformed teams", "Written quality checklist", "Insured on every site"].map(
//               (item) => (
//                 <div key={item} className="flex items-center gap-2">
//                   <BadgeCheck className="h-4 w-4 text-[#C9A227]" strokeWidth={2} />
//                   <span className="text-sm text-[#F7F5F0]/70">{item}</span>
//                 </div>
//               )
//             )}
//           </div>
//         </motion.div>
//       </div>
//     </section>
//   );
// }

// /* ---------------------------------------------------------------------- */
// /* Services                                                                 */
// /* ---------------------------------------------------------------------- */

// function Services() {
//   const services = COMPANY.primaryServiceKeys.map((k) => SERVICE_LIBRARY[k]);

//   return (
//     <section id="services" className="bg-[#F7F5F0] py-24 sm:py-28">
//       <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
//         <div className="max-w-xl">
//           <span className="text-xs font-semibold uppercase tracking-widest text-[#7FA684]">
//             What We Do
//           </span>
//           <h2 className="mt-3 font-serif text-3xl font-semibold tracking-tight text-[#0F3D2E] sm:text-4xl">
//             One team, every kind of space.
//           </h2>
//           <p className="mt-4 text-base leading-relaxed text-[#0F3D2E]/65">
//             From a single apartment to a full facility contract, our crews are
//             trained and equipped for the specifics of each environment.
//           </p>
//         </div>

//         <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
//           {services.map((service, i) => (
//             <motion.div
//               key={service.key}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true, margin: "-60px" }}
//               transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
//               className="group rounded-2xl border border-[#0F3D2E]/8 bg-white p-7 transition-all hover:border-[#C9A227]/40 hover:shadow-xl hover:shadow-[#0F3D2E]/5"
//             >
//               <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0F3D2E]/5 text-[#0F3D2E] transition-colors group-hover:bg-[#C9A227]/15 group-hover:text-[#C9A227]">
//                 {service.icon}
//               </div>
//               <h3 className="mt-5 font-serif text-lg font-semibold text-[#0F3D2E]">
//                 {service.title}
//               </h3>
//               <p className="mt-2 text-sm leading-relaxed text-[#0F3D2E]/60">
//                 {service.description}
//               </p>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// /* ---------------------------------------------------------------------- */
// /* Why Choose Us + Stats                                                    */
// /* ---------------------------------------------------------------------- */

// function WhyUs() {
//   return (
//     <section id="why-us" className="bg-[#0F3D2E] py-24 sm:py-28">
//       <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
//         <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
//           <div>
//             <span className="text-xs font-semibold uppercase tracking-widest text-[#C9A227]">
//               Why Shelterspec Innov Ltd
//             </span>
//             <h2 className="mt-3 font-serif text-3xl font-semibold tracking-tight text-[#F7F5F0] sm:text-4xl">
//               Cleaning is easy to promise. We document it instead.
//             </h2>
//             <p className="mt-4 text-base leading-relaxed text-[#F7F5F0]/65">
//               Every contract runs on a written scope, a named supervisor, and a
//               closing inspection   so quality is never a matter of who showed
//               up that day.
//             </p>

//             <ul className="mt-9 space-y-5">
//               {[
//                 {
//                   icon: <ShieldCheck className="h-5 w-5" strokeWidth={1.75} />,
//                   title: "Vetted, insured teams",
//                   desc: "Background-checked staff, uniformed, and covered on every site we service.",
//                 },
//                 {
//                   icon: <Clock className="h-5 w-5" strokeWidth={1.75} />,
//                   title: "Built around your hours",
//                   desc: "Before-open, after-close, or weekend servicing   scheduled around your operation.",
//                 },
//                 {
//                   icon: <BadgeCheck className="h-5 w-5" strokeWidth={1.75} />,
//                   title: "Signed-off quality",
//                   desc: "A supervisor inspects and signs off before any job is marked complete.",
//                 },
//               ].map((item) => (
//                 <li key={item.title} className="flex gap-4">
//                   <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#C9A227]/12 text-[#C9A227]">
//                     {item.icon}
//                   </span>
//                   <div>
//                     <p className="font-medium text-[#F7F5F0]">{item.title}</p>
//                     <p className="mt-1 text-sm leading-relaxed text-[#F7F5F0]/60">
//                       {item.desc}
//                     </p>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           <div className="grid grid-cols-2 gap-5">
//             {STATS.map((stat, i) => (
//               <motion.div
//                 key={stat.label}
//                 initial={{ opacity: 0, y: 16 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ duration: 0.5, delay: i * 0.08 }}
//                 className="rounded-2xl border border-[#F7F5F0]/10 bg-[#F7F5F0]/5 p-7"
//               >
//                 <p className="font-serif text-3xl font-semibold text-[#C9A227] sm:text-4xl">
//                   {stat.value}
//                 </p>
//                 <p className="mt-2 text-sm text-[#F7F5F0]/65">{stat.label}</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// /* ---------------------------------------------------------------------- */
// /* Process                                                                  */
// /* ---------------------------------------------------------------------- */

// function Process() {
//   return (
//     <section id="process" className="bg-[#F7F5F0] py-24 sm:py-28">
//       <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
//         <div className="max-w-xl">
//           <span className="text-xs font-semibold uppercase tracking-widest text-[#7FA684]">
//             How It Works
//           </span>
//           <h2 className="mt-3 font-serif text-3xl font-semibold tracking-tight text-[#0F3D2E] sm:text-4xl">
//             Four steps, start to sign-off.
//           </h2>
//         </div>

//         <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
//           {PROCESS_STEPS.map((step, i) => (
//             <motion.div
//               key={step.n}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true, margin: "-60px" }}
//               transition={{ duration: 0.5, delay: i * 0.1 }}
//               className="relative"
//             >
//               <div className="flex items-center gap-3">
//                 <span className="font-serif text-4xl font-semibold text-[#0F3D2E]/10">
//                   {step.n}
//                 </span>
//                 <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0F3D2E] text-[#C9A227]">
//                   {step.icon}
//                 </span>
//               </div>
//               <h3 className="mt-4 font-serif text-lg font-semibold text-[#0F3D2E]">
//                 {step.title}
//               </h3>
//               <p className="mt-2 text-sm leading-relaxed text-[#0F3D2E]/60">
//                 {step.desc}
//               </p>
//               {i < PROCESS_STEPS.length - 1 && (
//                 <div className="mt-6 hidden h-px w-full bg-gradient-to-r from-[#0F3D2E]/15 to-transparent lg:block" />
//               )}
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

// /* ---------------------------------------------------------------------- */
// /* Testimonials                                                             */
// /* ---------------------------------------------------------------------- */

// function Testimonials() {
//   const [index, setIndex] = useState(0);

//   const next = useCallback(
//     () => setIndex((i) => (i + 1) % TESTIMONIALS.length),
//     []
//   );
//   const prev = useCallback(
//     () => setIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length),
//     []
//   );

//   useEffect(() => {
//     const id = setInterval(next, 6000);
//     return () => clearInterval(id);
//   }, [next]);

//   const current = TESTIMONIALS[index];

//   return (
//     <section id="testimonials" className="bg-[#0F3D2E] py-24 sm:py-28">
//       <div className="mx-auto max-w-3xl px-5 sm:px-8">
//         <div className="text-center">
//           <span className="text-xs font-semibold uppercase tracking-widest text-[#C9A227]">
//             Client Voices
//           </span>
//           <h2 className="mt-3 font-serif text-3xl font-semibold tracking-tight text-[#F7F5F0] sm:text-4xl">
//             Trusted across  Ilorin
//           </h2>
//         </div>

//         <div className="relative mt-14 min-h-[220px]">
//           <AnimatePresence mode="wait">
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, y: 12 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -12 }}
//               transition={{ duration: 0.4, ease: "easeInOut" }}
//               className="text-center"
//             >
//               <div className="flex justify-center gap-1">
//                 {Array.from({ length: current.rating }).map((_, i) => (
//                   <Star
//                     key={i}
//                     className="h-4 w-4 fill-[#C9A227] text-[#C9A227]"
//                   />
//                 ))}
//               </div>
//               <p className="mt-6 font-serif text-xl leading-relaxed text-[#F7F5F0] sm:text-2xl">
//                 &ldquo;{current.quote}&rdquo;
//               </p>
//               <p className="mt-6 text-sm font-medium text-[#F7F5F0]">
//                 {current.name}
//               </p>
//               <p className="text-sm text-[#F7F5F0]/55">{current.role}</p>
//             </motion.div>
//           </AnimatePresence>
//         </div>

//         <div className="mt-10 flex items-center justify-center gap-4">
//           <button
//             onClick={prev}
//             aria-label="Previous testimonial"
//             className="flex h-10 w-10 items-center justify-center rounded-full border border-[#F7F5F0]/20 text-[#F7F5F0] transition-colors hover:bg-white/5"
//           >
//             <ChevronLeft className="h-4 w-4" />
//           </button>
//           <div className="flex gap-2">
//             {TESTIMONIALS.map((_, i) => (
//               <button
//                 key={i}
//                 onClick={() => setIndex(i)}
//                 aria-label={`Go to testimonial ${i + 1}`}
//                 className={`h-1.5 rounded-full transition-all ${
//                   i === index ? "w-6 bg-[#C9A227]" : "w-1.5 bg-[#F7F5F0]/25"
//                 }`}
//               />
//             ))}
//           </div>
//           <button
//             onClick={next}
//             aria-label="Next testimonial"
//             className="flex h-10 w-10 items-center justify-center rounded-full border border-[#F7F5F0]/20 text-[#F7F5F0] transition-colors hover:bg-white/5"
//           >
//             <ChevronRight className="h-4 w-4" />
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// }

// /* ---------------------------------------------------------------------- */
// /* CTA                                                                      */
// /* ---------------------------------------------------------------------- */

// function CTA() {
//   return (
//     <section className="bg-[#F7F5F0] py-20 sm:py-24">
//       <div className="mx-auto max-w-5xl px-5 sm:px-8">
//         <div className="relative overflow-hidden rounded-3xl bg-[#0F3D2E] px-8 py-14 sm:px-16 sm:py-16">
//           <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#C9A227]/10" />
//           <div className="absolute -bottom-20 -left-10 h-64 w-64 rounded-full bg-[#7FA684]/10" />
//           <div className="relative z-10 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
//             <div className="max-w-md">
//               <h2 className="font-serif text-2xl font-semibold text-[#F7F5F0] sm:text-3xl">
//                 Ready for a cleaner standard?
//               </h2>
//               <p className="mt-3 text-sm leading-relaxed text-[#F7F5F0]/65 sm:text-base">
//                 Tell us about your space and we will respond with a scoped
//                 quote within one business day.
//               </p>
//             </div>
            
//             <a
//               href="#contact"
//               className="inline-flex flex-shrink-0 items-center gap-2 rounded-full bg-[#C9A227] px-6 py-3.5 text-sm font-semibold text-[#0F3D2E] transition-transform hover:scale-[1.03] active:scale-[0.98]"
//             >
//               Request a Quote
//               <ArrowRight className="h-4 w-4" strokeWidth={2} />
//             </a>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// /* ---------------------------------------------------------------------- */
// /* Contact / Footer                                                         */
// /* ---------------------------------------------------------------------- */

// function ContactFooter() {
//   const [submitted, setSubmitted] = useState(false);

//   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setSubmitted(true);
//   };

//   return (
//     <footer id="contact" className="bg-[#0F3D2E]">
//       <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24 lg:px-10">
//         <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
//           <div>
//             <span className="text-xs font-semibold uppercase tracking-widest text-[#C9A227]">
//               Get In Touch
//             </span>
//             <h2 className="mt-3 font-serif text-3xl font-semibold tracking-tight text-[#F7F5F0] sm:text-4xl">
//               Tell us about your space
//             </h2>
//             <p className="mt-4 max-w-md text-sm leading-relaxed text-[#F7F5F0]/65">
//               Share a few details and our team will follow up with a scoped
//               quote and available start dates.
//             </p>

//             {submitted ? (
//               <div className="mt-8 flex items-center gap-3 rounded-xl border border-[#7FA684]/30 bg-[#7FA684]/10 px-5 py-4">
//                 <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-[#7FA684]" />
//                 <p className="text-sm text-[#F7F5F0]">
//                   Thanks   we&apos;ve received your request and will reach out
//                   shortly.
//                 </p>
//               </div>
//             ) : (
//               <form onSubmit={handleSubmit} className="mt-8 space-y-4">
//                 <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//                   <input
//                     type="text"
//                     required
//                     placeholder="Full name"
//                     className="w-full rounded-lg border border-[#F7F5F0]/15 bg-[#F7F5F0]/5 px-4 py-3 text-sm text-[#F7F5F0] placeholder:text-[#F7F5F0]/40 focus:border-[#C9A227] focus:outline-none focus:ring-1 focus:ring-[#C9A227]"
//                   />
//                   <input
//                     type="tel"
//                     required
//                     placeholder="Phone number"
//                     className="w-full rounded-lg border border-[#F7F5F0]/15 bg-[#F7F5F0]/5 px-4 py-3 text-sm text-[#F7F5F0] placeholder:text-[#F7F5F0]/40 focus:border-[#C9A227] focus:outline-none focus:ring-1 focus:ring-[#C9A227]"
//                   />
//                 </div>
//                 <input
//                   type="email"
//                   required
//                   placeholder="Email address"
//                   className="w-full rounded-lg border border-[#F7F5F0]/15 bg-[#F7F5F0]/5 px-4 py-3 text-sm text-[#F7F5F0] placeholder:text-[#F7F5F0]/40 focus:border-[#C9A227] focus:outline-none focus:ring-1 focus:ring-[#C9A227]"
//                 />
//                 <textarea
//                   required
//                   rows={4}
//                   placeholder="What do you need cleaned?"
//                   className="w-full resize-none rounded-lg border border-[#F7F5F0]/15 bg-[#F7F5F0]/5 px-4 py-3 text-sm text-[#F7F5F0] placeholder:text-[#F7F5F0]/40 focus:border-[#C9A227] focus:outline-none focus:ring-1 focus:ring-[#C9A227]"
//                 />
//                 <button
//                   type="submit"
//                   className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#C9A227] px-6 py-3.5 text-sm font-semibold text-[#0F3D2E] transition-transform hover:scale-[1.02] active:scale-[0.98] sm:w-auto"
//                 >
//                   Send Request
//                   <ArrowRight className="h-4 w-4" strokeWidth={2} />
//                 </button>
//               </form>
//             )}
//           </div>

//           <div className="lg:pl-8">
//             <div className="flex items-center gap-2.5">
//               <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#C9A227]">
//                 <Sparkles className="h-4.5 w-4.5 text-[#0F3D2E]" strokeWidth={2} />
//               </span>
//               <span className="font-serif text-lg font-semibold text-[#F7F5F0]">
//                 {COMPANY.name}
//               </span>
//             </div>
//             <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#F7F5F0]/60">
//               {COMPANY.tagline}   premium cleaning services across{" "}
//               {COMPANY.city} and its surrounding districts.
//             </p>

//             <ul className="mt-8 space-y-4">
//               <li className="flex items-center gap-3">
//                 <Phone className="h-4 w-4 text-[#C9A227]" strokeWidth={1.75} />
//                 <a
//                   href={`tel:${COMPANY.phone.replace(/\s/g, "")}`}
//                   className="text-sm text-[#F7F5F0]/75 hover:text-[#C9A227]"
//                 >
//                   {COMPANY.phone}
//                 </a>
//               </li>
//               <li className="flex items-center gap-3">
//                 <Mail className="h-4 w-4 text-[#C9A227]" strokeWidth={1.75} />
//                 <a
//                   href={`mailto:${COMPANY.email}`}
//                   className="text-sm text-[#F7F5F0]/75 hover:text-[#C9A227]"
//                 >
//                   {COMPANY.email}
//                 </a>
//               </li>
//               <li className="flex items-start gap-3">
//                 <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#C9A227]" strokeWidth={1.75} />
//                 <span className="text-sm text-[#F7F5F0]/75">
//                   {COMPANY.address}
//                 </span>
//               </li>
//             </ul>

//             <div className="mt-8 flex gap-3">
//               {[FaFacebookF, FaInstagram, FaLinkedinIn].map((Icon, i) => (
//                 <a
//                   key={i}
//                   href="#"
//                   aria-label="Social link"
//                   className="flex h-10 w-10 items-center justify-center rounded-full border border-[#F7F5F0]/15 text-[#F7F5F0]/70 transition-colors hover:border-[#C9A227] hover:text-[#C9A227]"
//                 >
//                   <Icon className="h-4 w-4" />
//                 </a>
//               ))}
//             </div>
//           </div>
//         </div>

//         <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-[#F7F5F0]/10 pt-8 sm:flex-row">
//           <p className="text-xs text-[#F7F5F0]/45">
//             © {new Date().getFullYear()} {COMPANY.name}. All rights reserved.
//           </p>
//           <p className="text-xs text-[#F7F5F0]/45">
//             Registered cleaning services provider, {COMPANY.city}, Nigeria.
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// }

// /* ---------------------------------------------------------------------- */
// /* WhatsApp Floating Button                                                */
// /* ---------------------------------------------------------------------- */

// function WhatsAppButton() {
//   return (
//     <motion.a
//       href={`https://wa.me/${COMPANY.whatsapp}`}
//       target="_blank"
//       rel="noopener noreferrer"
//       aria-label="Chat on WhatsApp"
//       initial={{ opacity: 0, scale: 0.8 }}
//       animate={{ opacity: 1, scale: 1 }}
//       transition={{ duration: 0.4, delay: 0.6 }}
//       whileHover={{ scale: 1.08 }}
//       whileTap={{ scale: 0.94 }}
//       className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg shadow-black/20"
//     >
//       <FaWhatsapp className="h-7 w-7 text-white" />
//     </motion.a>
//   );
// }

// /* ---------------------------------------------------------------------- */
// /* Page                                                                     */
// /* ---------------------------------------------------------------------- */

// export default function CleaningCompanyPage() {
//   return (
//     <main className="font-sans antialiased">
//       <Navbar />
//       <Hero />
//       <Services />
//       <WhyUs />
//       <Process />
//       <Testimonials />
//       <CTA />
//       <ContactFooter />
//       <WhatsAppButton />
//     </main>
//   );
// }
