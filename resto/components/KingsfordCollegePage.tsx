// "use client";

// import { useEffect, useRef, useState } from "react";
// import { motion, AnimatePresence, useScroll, useSpring, useInView, Variants } from "framer-motion";
// import {
//   GraduationCap,
//   BookOpen,
//   FlaskConical,
//   Laptop,
//   Library,
//   Trophy,
//   Users,
//   Shield,
//   Sparkles,
//   Award,
//   Quote,
//   ChevronDown,
//   ChevronRight,
//   Menu,
//   X,
//   Phone,
//   Mail,
//   MapPin,
//   Clock,
//   Send,
//   ArrowRight,
//   CheckCircle2,
//   Star,
//   Bus,
//   Stethoscope,
//   Volleyball,
//   Mic2,
//   Code2,
//   Cpu,
//   Building2,
// } from "lucide-react";
// import { FaWhatsapp, FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
// import * as THREE from "three";

// /* ------------------------------------------------------------------ */
// /*  SCHOOL DATA                                                        */
// /* ------------------------------------------------------------------ */

// const SCHOOL = {
//   name: "His Grace Schools ",
//   motto: "Excellence in Character and Learning",
//   type: "General education school ",
//   ownership: "Privately Owned",
//   established: "1900",
//   location: "Ilorin",
//   state: "Kwara State",
//   country: "Nigeria",
//   principal: "Mrs. Adeola Fashola",
//   email: "info@hisgraceschool.edu.ng",
//   website: "www.His Grace college.edu.ng",
//   phone: "+234 818 564 8398",
//   address: "15 Unity Road, GRA, Ilorin, Kwara State, Nigeria",
//   hours: "Mon - Fri: 7:00 AM - 4:00 PM",
//   waec: "98%",
//   neco: "96%",
//   jamb: "91%",
//   students: "1,240",
//   teachers: "96",
// };

// const NAV_LINKS = [
//   { label: "Home", href: "#home" },
//   { label: "About", href: "#about" },
//   { label: "Academics", href: "#academics" },
//   { label: "Admissions", href: "#admissions" },
//   { label: "Facilities", href: "#facilities" },
//   { label: "Gallery", href: "#gallery" },
//   { label: "Contact", href: "#contact" },
// ];

// const DEPARTMENTS = [
//   {
//     icon: FlaskConical,
//     title: "Science Department",
//     description:
//       "Rigorous instruction in Physics, Chemistry, Biology and Further Mathematics, preparing students for careers in medicine, engineering and technology.",
//   },
//   {
//     icon: Building2,
//     title: "Commercial Department",
//     description:
//       "A foundation in Accounting, Commerce and Economics that equips students for business, finance and entrepreneurship pathways.",
//   },
//   {
//     icon: BookOpen,
//     title: "Arts Department",
//     description:
//       "Literature, Government, History and Languages taught with depth, nurturing articulate thinkers and confident communicators.",
//   },
// ];

// const PROGRAMS = [
//   { icon: GraduationCap, title: "Junior Secondary (JSS 1 - 3)", description: "A broad, balanced curriculum that builds strong academic and moral foundations." },
//   { icon: Award, title: "Senior Secondary (SS 1 - 3)", description: "Specialised tracks in Science, Commercial and Arts, aligned to WAEC and NECO syllabi." },
//   { icon: Star, title: "WAEC & NECO Preparation", description: "Structured revision classes, mock examinations and past-question drills." },
//   { icon: CheckCircle2, title: "JAMB Preparation", description: "Dedicated tutorials and computer-based practice tests for university entry." },
//   { icon: Cpu, title: "ICT Education", description: "Hands-on computer literacy, coding and digital citizenship from JSS 1." },
//   { icon: Sparkles, title: "Entrepreneurship & Leadership", description: "Practical projects that build initiative, teamwork and business thinking." },
// ];

// const FACILITIES = [
//   { icon: FlaskConical, title: "Science Laboratories", description: "Fully equipped Physics, Chemistry and Biology labs for hands-on experiments.", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80" },
//   { icon: Laptop, title: "ICT Laboratory", description: "Modern computer suite with high-speed internet for coding and research.", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80" },
//   { icon: Library, title: "Modern Library", description: "An extensive collection of academic and recreational reading resources.", image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=900&q=80" },
//   { icon: Stethoscope, title: "School Clinic", description: "On-site medical care staffed by a qualified nurse during school hours.", image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=900&q=80" },
//   { icon: Volleyball, title: "Sports Complex", description: "Football pitch, basketball and volleyball courts for physical development.", image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=900&q=80" },
//   { icon: Bus, title: "School Bus Service", description: "Safe, supervised transportation covering major routes across Ilorin.", image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=900&q=80" },
// ];

// const CLUBS = [
//   { icon: Code2, title: "Coding & Robotics Club" },
//   { icon: Mic2, title: "Debate & Press Club" },
//   { icon: FlaskConical, title: "Science Club" },
//   { icon: BookOpen, title: "Literary & Debating Society" },
//   { icon: Volleyball, title: "Sports & Athletics" },
//   { icon: Users, title: "Community Service Corps" },
// ];

// const ACHIEVEMENTS = [
//   { icon: Trophy, value: "98%", label: "WAEC Success Rate" },
//   { icon: Award, value: "96%", label: "NECO Success Rate" },
//   { icon: GraduationCap, value: "91%", label: "JAMB Success Rate" },
//   { icon: Star, value: "40+", label: "State & National Awards" },
// ];

// const GALLERY_IMAGES = [
//   "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
//   "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
//   "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80",
//   "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=800&q=80",
//   "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80",
//   "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80",
// ];

// const TESTIMONIALS = [
//   {
//     name: "Mr. & Mrs. Ibrahim",
//     role: "Parent",
//     quote:
//       "His Grace Schools  has shaped our daughter into a disciplined, confident young lady. The teachers genuinely care about every child's progress.",
//   },
//   {
//     name: "Fatima Bello",
//     role: "SS 3 Student",
//     quote:
//       "The science laboratories and JAMB preparation classes gave me the confidence to aim for medicine. I'm grateful for the mentorship I received here.",
//   },
//   {
//     name: "Tunde Adebayo",
//     role: "Alumnus, Class of 2019",
//     quote:
//       "The leadership training and debate club shaped the way I communicate today. His Grace  built the foundation for everything I've achieved since.",
//   },
// ];

// const FAQS = [
//   { question: "What is the admission process for new students?", answer: "Prospective students sit for an entrance examination, followed by an oral interview with parents and a review of previous academic records." },
//   { question: "What are the school fees for the current session?", answer: "Fees vary by class level and are detailed in our admissions package. Please contact our admissions office for the current fee schedule." },
//   { question: "Does the school provide transportation?", answer: "Yes, our school bus service covers major routes across Ilorin with trained drivers and supervised pick-up points." },
//   { question: "What is the school's uniform policy?", answer: "All students are required to wear the official His Grace Schools  uniform, available through our approved school outfitters." },
//   { question: "What extracurricular activities are available?", answer: "Students may join clubs including Coding & Robotics, Debate, Science, Sports and Community Service, alongside inter-house sports and competitions." },
// ];

// /* ------------------------------------------------------------------ */
// /*  ANIMATION VARIANTS                                                 */
// /* ------------------------------------------------------------------ */

// const fadeUp: Variants = {
//   hidden: { opacity: 0, y: 32 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
// };

// const fadeLeft: Variants = {
//   hidden: { opacity: 0, x: -32 },
//   visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
// };

// const fadeRight: Variants = {
//   hidden: { opacity: 0, x: 32 },
//   visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
// };

// const staggerContainer: Variants = {
//   hidden: {},
//   visible: { transition: { staggerChildren: 0.12 } },
// };

// /* ------------------------------------------------------------------ */
// /*  UTILITY COMPONENTS                                                  */
// /* ------------------------------------------------------------------ */

// function RevealSection({
//   children,
//   className = "",
//   variant = fadeUp,
// }: {
//   children: React.ReactNode;
//   className?: string;
//   variant?: Variants;
// }) {
//   const ref = useRef(null);
//   const inView = useInView(ref, { once: true, margin: "-80px" });
//   return (
//     <motion.div
//       ref={ref}
//       initial="hidden"
//       animate={inView ? "visible" : "hidden"}
//       variants={variant}
//       className={className}
//     >
//       {children}
//     </motion.div>
//   );
// }

// function SectionLabel({ children }: { children: React.ReactNode }) {
//   return (
//     <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-2 md:px-4 py-1.5 text-sm font-semibold tracking-wide text-blue-600">
//       <Sparkles className="h-3.5 w-3.5" />
//       {children}
//     </span>
//   );
// }

// function SectionTitle({
//   children,
//   center = false,
// }: {
//   children: React.ReactNode;
//   center?: boolean;
// }) {
//   return (
//     <h2
//       className={`mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl ${
//         center ? "text-center" : ""
//       }`}
//     >
//       {children}
//     </h2>
//   );
// }

// function Divider() {
//   return <div className="mx-auto my-6 h-1 w-16 rounded-full bg-gradient-to-r from-blue-600 to-blue-400" />;
// }

// function GlassCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
//   return (
//     <div
//       className={`rounded-2xl border border-white/60 bg-white/80 p-6 shadow-lg shadow-slate-200/50 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${className}`}
//     >
//       {children}
//     </div>
//   );
// }

// /* ------------------------------------------------------------------ */
// /*  THREE.JS HERO PARTICLES                                            */
// /* ------------------------------------------------------------------ */

// function HeroParticles() {
//   const mountRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const mount = mountRef.current;
//     if (!mount) return;

//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(60, mount.clientWidth / mount.clientHeight, 0.1, 1000);
//     camera.position.z = 30;

//     const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
//     renderer.setSize(mount.clientWidth, mount.clientHeight);
//     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
//     mount.appendChild(renderer.domElement);

//     const particleCount = 260;
//     const positions = new Float32Array(particleCount * 3);
//     for (let i = 0; i < particleCount; i++) {
//       positions[i * 3] = (Math.random() - 0.5) * 60;
//       positions[i * 3 + 1] = (Math.random() - 0.5) * 40;
//       positions[i * 3 + 2] = (Math.random() - 0.5) * 40;
//     }

//     const geometry = new THREE.BufferGeometry();
//     geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

//     const material = new THREE.PointsMaterial({
//       color: 0x60a5fa,
//       size: 0.35,
//       transparent: true,
//       opacity: 0.55,
//     });

//     const points = new THREE.Points(geometry, material);
//     scene.add(points);

//     let frameId: number;
//     const animate = () => {
//       points.rotation.y += 0.0009;
//       points.rotation.x += 0.0003;
//       renderer.render(scene, camera);
//       frameId = requestAnimationFrame(animate);
//     };
//     animate();

//     const handleResize = () => {
//       if (!mount) return;
//       camera.aspect = mount.clientWidth / mount.clientHeight;
//       camera.updateProjectionMatrix();
//       renderer.setSize(mount.clientWidth, mount.clientHeight);
//     };
//     window.addEventListener("resize", handleResize);

//     return () => {
//       cancelAnimationFrame(frameId);
//       window.removeEventListener("resize", handleResize);
//       geometry.dispose();
//       material.dispose();
//       renderer.dispose();
//       if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
//     };
//   }, []);

//   return <div ref={mountRef} className="absolute inset-0 -z-10" aria-hidden="true" />;
// }

// /* ------------------------------------------------------------------ */
// /*  SCROLL PROGRESS BAR                                                 */
// /* ------------------------------------------------------------------ */

// function ScrollProgressBar() {
//   const { scrollYProgress } = useScroll();
//   const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25, restDelta: 0.001 });
//   return (
//     <motion.div
//       style={{ scaleX }}
//       className="fixed left-0 top-0 z-[60] h-1 w-full origin-left bg-gradient-to-r from-blue-600 to-amber-500"
//     />
//   );
// }

// /* ------------------------------------------------------------------ */
// /*  NAVBAR                                                              */
// /* ------------------------------------------------------------------ */

// function Navbar() {
//   const [open, setOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);

//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 20);
//     window.addEventListener("scroll", onScroll);
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   return (
//     <header
//       className={`fixed top-0 z-50 w-full transition-all duration-300 ${
//         scrolled ? "bg-white/90 shadow-md backdrop-blur-md" : "bg-white/40 backdrop-blur-sm"
//       }`}
//     >
//       <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
//         <a href="#home" className="flex items-center gap-2">
//           <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md">
//             <GraduationCap className="h-6 w-6" />
//           </div>
//           <div className="leading-tight">
//             <p className="text-base font-bold text-slate-900">{SCHOOL.name}</p>
//             <p className="text-xs font-medium text-slate-500">{SCHOOL.location}, {SCHOOL.state}</p>
//           </div>
//         </a>

//         <ul className="hidden items-center gap-8 lg:flex">
//           {NAV_LINKS.map((link) => (
//             <li key={link.href}>
//               <a
//                 href={link.href}
//                 className="text-sm font-medium text-slate-700 transition-colors hover:text-blue-600"
//               >
//                 {link.label}
//               </a>
//             </li>
//           ))}
//         </ul>

//         <a
//           href="#admissions"
//           className="hidden rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-600/20 transition-all hover:bg-blue-700 hover:shadow-lg lg:inline-flex"
//         >
//           Apply Now
//         </a>

//         <button
//           aria-label="Toggle navigation menu"
//           className="text-slate-800 lg:hidden"
//           onClick={() => setOpen(!open)}
//         >
//           {open ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
//         </button>
//       </nav>

//       <AnimatePresence>
//         {open && (
//           <motion.div
//             initial={{ height: 0, opacity: 0 }}
//             animate={{ height: "auto", opacity: 1 }}
//             exit={{ height: 0, opacity: 0 }}
//             className="overflow-hidden bg-white shadow-lg lg:hidden"
//           >
//             <ul className="flex flex-col gap-1 px-6 pb-6 pt-2">
//               {NAV_LINKS.map((link) => (
//                 <li key={link.href}>
//                   <a
//                     href={link.href}
//                     onClick={() => setOpen(false)}
//                     className="block rounded-lg px-3 py-3 text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-600"
//                   >
//                     {link.label}
//                   </a>
//                 </li>
//               ))}
//               <li>
//                 <a
//                   href="#admissions"
//                   onClick={() => setOpen(false)}
//                   className="mt-2 block rounded-full bg-blue-600 px-4 py-3 text-center text-sm font-semibold text-white"
//                 >
//                   Apply Now
//                 </a>
//               </li>
//             </ul>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </header>
//   );
// }

// /* ------------------------------------------------------------------ */
// /*  ANIMATED COUNTER                                                    */
// /* ------------------------------------------------------------------ */

// function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
//   const ref = useRef(null);
//   const inView = useInView(ref, { once: true });
//   const [count, setCount] = useState(0);

//   useEffect(() => {
//     if (!inView) return;
//     let start = 0;
//     const duration = 1400;
//     const stepTime = 16;
//     const steps = duration / stepTime;
//     const increment = target / steps;
//     const timer = setInterval(() => {
//       start += increment;
//       if (start >= target) {
//         setCount(target);
//         clearInterval(timer);
//       } else {
//         setCount(Math.floor(start));
//       }
//     }, stepTime);
//     return () => clearInterval(timer);
//   }, [inView, target]);

//   return (
//     <span ref={ref}>
//       {count.toLocaleString()}
//       {suffix}
//     </span>
//   );
// }

// /* ------------------------------------------------------------------ */
// /*  HERO SECTION                                                        */
// /* ------------------------------------------------------------------ */

// function Hero() {
//   return (
//     <section
//       id="home"
//       className="relative flex min-h-screen items-center overflow-hidden bg-gradient-to-b from-slate-50 to-white pt-8 md:pt-24"
//     >
//       <div
//         className="absolute inset-0 bg-cover bg-center opacity-[0.06]"
//         style={{
//           backgroundImage:
//             "url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1600&q=80')",
//         }}
//         aria-hidden="true"
//       />
//       <HeroParticles />

//       <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-2 lg:items-center lg:px-8">
//         <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
//           <motion.div variants={fadeUp}>
//             <SectionLabel>{SCHOOL.type} • Est. {SCHOOL.established}</SectionLabel>
//           </motion.div>

//           <motion.h1
//             variants={fadeUp}
//             className="mt-5 text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl"
//           >
//             Shaping Nigeria&apos;s{" "}
//             <span className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
//               Future Leaders
//             </span>
//           </motion.h1>

//           <motion.p variants={fadeUp} className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
//             {SCHOOL.name} is a premier secondary school in {SCHOOL.location}, {SCHOOL.state}, committed to
//             academic excellence, strong character and university preparation for every student who walks
//             through our gates.
//           </motion.p>

//           <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-4">
//             <a
//               href="#admissions"
//               className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition-all hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl"
//             >
//               Apply Now <ArrowRight className="h-4 w-4" />
//             </a>
//             <a
//               href="#contact"
//               className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-7 py-3.5 text-sm font-semibold text-slate-700 transition-all hover:-translate-y-0.5 hover:border-blue-300 hover:text-blue-600"
//             >
//               Contact Us
//             </a>
//           </motion.div>

//           <motion.div variants={fadeUp} className="mt-14 grid grid-cols-3 gap-6 border-t border-slate-200 pt-8">
//             <div>
//               <p className="text-3xl font-bold text-slate-900">
//                 <Counter target={98} suffix="%" />
//               </p>
//               <p className="mt-1 text-sm text-slate-500">WAEC Success</p>
//             </div>
//             <div>
//               <p className="text-3xl font-bold text-slate-900">
//                 <Counter target={1240} />
//               </p>
//               <p className="mt-1 text-sm text-slate-500">Students</p>
//             </div>
//             <div>
//               <p className="text-3xl font-bold text-slate-900">
//                 <Counter target={27} />
//               </p>
//               <p className="mt-1 text-sm text-slate-500">Years of Excellence</p>
//             </div>
//           </motion.div>
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0, scale: 0.95 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.7, ease: "easeOut" }}
//           className="relative hidden lg:block"
//         >
//           <div className="overflow-hidden rounded-3xl shadow-2xl">
//             <img
//               src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1000&q=80"
//               alt="Students studying at His Grace Schools "
//               className="h-[560px] w-full object-cover"
//             />
//           </div>
//           <GlassCard className="absolute -bottom-8 -left-10 w-64">
//             <div className="flex items-center gap-3">
//               <div className="flex h-11 w-11 items-center justify-center rounded-full bg-amber-100 text-amber-600">
//                 <Trophy className="h-5 w-5" />
//               </div>
//               <div>
//                 <p className="text-sm font-bold text-slate-900">Top Rated School</p>
//                 <p className="text-xs text-slate-500">Kwara State, 2025</p>
//               </div>
//             </div>
//           </GlassCard>
//         </motion.div>
//       </div>

//       <a
//         href="#about"
//         className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-400 transition-colors hover:text-blue-600"
//         aria-label="Scroll to About section"
//       >
//         <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
//           <ChevronDown className="h-7 w-7" />
//         </motion.div>
//       </a>
//     </section>
//   );
// }

// /* ------------------------------------------------------------------ */
// /*  ABOUT SECTION                                                       */
// /* ------------------------------------------------------------------ */

// function About() {
//   const values = ["Integrity", "Excellence", "Discipline", "Respect", "Innovation", "Service"];
//   return (
//     <section id="about" className="bg-white py-24">
//       <div className="mx-auto max-w-7xl px-6 lg:px-8">
//         <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
//           <RevealSection variant={fadeLeft} className="relative">
//             <div className="overflow-hidden rounded-3xl shadow-xl">
//               <img
//                 src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1000&q=80"
//                 alt="His Grace Schools  campus building"
//                 className="h-[440px] w-full object-cover"
//               />
//             </div>
//           </RevealSection>

//           <RevealSection variant={fadeRight}>
//             <SectionLabel>About Our School</SectionLabel>
//             <SectionTitle>
//               A Legacy of Academic Excellence Since {SCHOOL.established}
//             </SectionTitle>
//             <p className="mt-5 leading-relaxed text-slate-600">
//               Founded in {SCHOOL.established}, {SCHOOL.name} has grown into one of {SCHOOL.state}&apos;s most
//               trusted institutions for secondary education. We combine a rigorous academic curriculum with
//               strong moral instruction, producing graduates who excel at WAEC, NECO and JAMB, and who go on to
//               thrive at Nigeria&apos;s leading universities.
//             </p>
//             <p className="mt-4 leading-relaxed text-slate-600">
//               Our mission is to nurture confident, disciplined and innovative young Nigerians equipped for
//               leadership in a changing world. Our vision is to be the reference point for premium, values-led
//               secondary education in West Africa.
//             </p>

//             <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
//               {values.map((value) => (
//                 <div key={value} className="flex items-center gap-2 rounded-xl bg-slate-50 px-4 py-3">
//                   <CheckCircle2 className="h-4 w-4 shrink-0 text-blue-600" />
//                   <span className="text-sm font-medium text-slate-700">{value}</span>
//                 </div>
//               ))}
//             </div>
//           </RevealSection>
//         </div>
//       </div>
//     </section>
//   );
// }

// /* ------------------------------------------------------------------ */
// /*  PRINCIPAL'S MESSAGE                                                 */
// /* ------------------------------------------------------------------ */

// function PrincipalMessage() {
//   return (
//     <section className="bg-slate-50 py-24">
//       <div className="mx-auto max-w-6xl px-6 lg:px-8">
//         <RevealSection className="grid gap-12 rounded-3xl bg-white p-8 shadow-xl shadow-slate-200/60 sm:p-12 lg:grid-cols-[280px_1fr] lg:items-center">
//           <div className="mx-auto overflow-hidden rounded-2xl shadow-lg lg:mx-0">
//             <img
//               src="https://images.unsplash.com/photo-1580894732444-8ecded7900cd?auto=format&fit=crop&w=600&q=80"
//               alt={`Portrait of Principal ${SCHOOL.principal}`}
//               className="h-72 w-full object-cover lg:w-[280px]"
//             />
//           </div>
//           <div>
//             <Quote className="h-9 w-9 text-blue-200" />
//             <p className="mt-4 text-lg italic leading-relaxed text-slate-700">
//               &ldquo;At {SCHOOL.name}, we believe every child carries the seed of greatness. Our duty is to
//               provide the discipline, the mentorship and the opportunity for that greatness to take root. We
//               welcome you to a community where academic rigour meets genuine care.&rdquo;
//             </p>
//             <div className="mt-6">
//               <p className="font-bold text-slate-900">{SCHOOL.principal}</p>
//               <p className="text-sm text-slate-500">Principal, {SCHOOL.name}</p>
//             </div>
//           </div>
//         </RevealSection>
//       </div>
//     </section>
//   );
// }

// /* ------------------------------------------------------------------ */
// /*  WHY CHOOSE US                                                       */
// /* ------------------------------------------------------------------ */

// function FeatureCard({ icon: Icon, title, description }: { icon: any; title: string; description: string }) {
//   return (
//     <motion.div variants={fadeUp}>
//       <GlassCard className="h-full">
//         <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600/10 text-blue-600">
//           <Icon className="h-6 w-6" />
//         </div>
//         <h3 className="mt-4 text-lg font-bold text-slate-900">{title}</h3>
//         <p className="mt-2 text-sm leading-relaxed text-slate-600">{description}</p>
//       </GlassCard>
//     </motion.div>
//   );
// }

// function WhyChooseUs() {
//   const features = [
//     { icon: GraduationCap, title: "Academic Excellence", description: "Consistently outstanding WAEC, NECO and JAMB results year after year." },
//     { icon: Users, title: "Qualified Teachers", description: "Experienced, dedicated educators committed to every student's growth." },
//     { icon: Building2, title: "Modern Facilities", description: "Well-equipped laboratories, ICT suites and a state-of-the-art library." },
//     { icon: BookOpen, title: "Small Class Sizes", description: "Focused attention that allows every student to be seen and supported." },
//     { icon: Laptop, title: "Technology Integration", description: "Coding, robotics and digital literacy woven into everyday learning." },
//     { icon: Shield, title: "Character Development", description: "Moral instruction and mentorship that build integrity and discipline." },
//     { icon: CheckCircle2, title: "Safe Environment", description: "A secure, nurturing campus with round-the-clock supervision." },
//     { icon: Trophy, title: "Leadership Training", description: "Structured programmes that raise confident, capable young leaders." },
//   ];

//   return (
//     <section className="bg-white py-24">
//       <div className="mx-auto max-w-7xl px-6 lg:px-8">
//         <RevealSection className="mx-auto max-w-2xl text-center">
//           <SectionLabel>Why Families Choose Us</SectionLabel>
//           <SectionTitle center>The His Grace  Advantage</SectionTitle>
//           <Divider />
//         </RevealSection>

//         <motion.div
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, margin: "-80px" }}
//           variants={staggerContainer}
//           className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
//         >
//           {features.map((f) => (
//             <FeatureCard key={f.title} {...f} />
//           ))}
//         </motion.div>
//       </div>
//     </section>
//   );
// }

// /* ------------------------------------------------------------------ */
// /*  ACADEMIC DEPARTMENTS                                                */
// /* ------------------------------------------------------------------ */

// function DepartmentCard({ icon: Icon, title, description }: { icon: any; title: string; description: string }) {
//   return (
//     <motion.div variants={fadeUp} whileHover={{ y: -6 }} className="group">
//       <div className="h-full rounded-2xl border border-slate-100 bg-white p-8 shadow-md shadow-slate-100 transition-shadow duration-300 group-hover:shadow-xl">
//         <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-md shadow-blue-600/30">
//           <Icon className="h-7 w-7" />
//         </div>
//         <h3 className="mt-5 text-xl font-bold text-slate-900">{title}</h3>
//         <p className="mt-3 text-sm leading-relaxed text-slate-600">{description}</p>
//       </div>
//     </motion.div>
//   );
// }

// function ProgramCard({ icon: Icon, title, description }: { icon: any; title: string; description: string }) {
//   return (
//     <motion.div variants={fadeUp}>
//       <div className="flex items-start gap-4 rounded-2xl bg-slate-50 p-6 transition-colors duration-300 hover:bg-blue-50">
//         <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
//           <Icon className="h-5 w-5" />
//         </div>
//         <div>
//           <h4 className="font-bold text-slate-900">{title}</h4>
//           <p className="mt-1 text-sm leading-relaxed text-slate-600">{description}</p>
//         </div>
//       </div>
//     </motion.div>
//   );
// }

// function Academics() {
//   return (
//     <section id="academics" className="bg-slate-50 py-24">
//       <div className="mx-auto max-w-7xl px-6 lg:px-8">
//         <RevealSection className="mx-auto max-w-2xl text-center">
//           <SectionLabel>Academics</SectionLabel>
//           <SectionTitle center>Academic Departments</SectionTitle>
//           <Divider />
//           <p className="text-slate-600">
//             Structured, examination-focused departments preparing students for WAEC, NECO, BECE and JAMB.
//           </p>
//         </RevealSection>

//         <motion.div
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, margin: "-80px" }}
//           variants={staggerContainer}
//           className="mt-12 grid gap-6 sm:grid-cols-3"
//         >
//           {DEPARTMENTS.map((d) => (
//             <DepartmentCard key={d.title} {...d} />
//           ))}
//         </motion.div>

//         <div className="mt-24">
//           <RevealSection className="mx-auto max-w-2xl text-center">
//             <SectionLabel>Our Programs</SectionLabel>
//             <SectionTitle center>Comprehensive Learning Pathways</SectionTitle>
//             <Divider />
//           </RevealSection>

//           <motion.div
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true, margin: "-80px" }}
//             variants={staggerContainer}
//             className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
//           >
//             {PROGRAMS.map((p) => (
//               <ProgramCard key={p.title} {...p} />
//             ))}
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// }

// /* ------------------------------------------------------------------ */
// /*  FACILITIES                                                          */
// /* ------------------------------------------------------------------ */

// function FacilityCard({ icon: Icon, title, description, image }: { icon: any; title: string; description: string; image: string }) {
//   return (
//     <motion.div variants={fadeUp} className="group relative overflow-hidden rounded-2xl shadow-lg">
//       <img
//         src={image}
//         alt={title}
//         className="h-72 w-full object-cover transition-transform duration-500 group-hover:scale-105"
//       />
//       <div className="absolute inset-0 bg-gradient-to-t from-slate-900/85 via-slate-900/20 to-transparent" />
//       <div className="absolute inset-x-0 bottom-0 p-6">
//         <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-white backdrop-blur-sm">
//           <Icon className="h-5 w-5" />
//         </div>
//         <h3 className="mt-3 text-lg font-bold text-white">{title}</h3>
//         <p className="mt-1 text-sm text-slate-200">{description}</p>
//       </div>
//     </motion.div>
//   );
// }

// function Facilities() {
//   return (
//     <section id="facilities" className="bg-white py-24">
//       <div className="mx-auto max-w-7xl px-6 lg:px-8">
//         <RevealSection className="mx-auto max-w-2xl text-center">
//           <SectionLabel>Our Campus</SectionLabel>
//           <SectionTitle center>World-Class Facilities</SectionTitle>
//           <Divider />
//           <p className="text-slate-600">Purpose-built spaces designed to support every dimension of student growth.</p>
//         </RevealSection>

//         <motion.div
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, margin: "-80px" }}
//           variants={staggerContainer}
//           className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
//         >
//           {FACILITIES.map((f) => (
//             <FacilityCard key={f.title} {...f} />
//           ))}
//         </motion.div>
//       </div>
//     </section>
//   );
// }

// /* ------------------------------------------------------------------ */
// /*  STUDENT LIFE                                                        */
// /* ------------------------------------------------------------------ */

// function StudentLife() {
//   return (
//     <section className="bg-slate-50 py-24">
//       <div className="mx-auto max-w-7xl px-6 lg:px-8">
//         <RevealSection className="mx-auto max-w-2xl text-center">
//           <SectionLabel>Beyond the Classroom</SectionLabel>
//           <SectionTitle center>Student Life & Clubs</SectionTitle>
//           <Divider />
//           <p className="text-slate-600">
//             A vibrant calendar of clubs, sports and community service that builds well-rounded character.
//           </p>
//         </RevealSection>

//         <motion.div
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, margin: "-80px" }}
//           variants={staggerContainer}
//           className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
//         >
//           {CLUBS.map((club) => (
//             <motion.div
//               key={club.title}
//               variants={fadeUp}
//               className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
//             >
//               <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
//                 <club.icon className="h-6 w-6" />
//               </div>
//               <p className="font-semibold text-slate-900">{club.title}</p>
//             </motion.div>
//           ))}
//         </motion.div>
//       </div>
//     </section>
//   );
// }

// /* ------------------------------------------------------------------ */
// /*  RESULTS & ACHIEVEMENTS                                              */
// /* ------------------------------------------------------------------ */

// function AchievementCard({ icon: Icon, value, label }: { icon: any; value: string; label: string }) {
//   return (
//     <motion.div variants={fadeUp} className="text-center">
//       <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-amber-400">
//         <Icon className="h-8 w-8" />
//       </div>
//       <p className="mt-4 text-4xl font-bold text-white">{value}</p>
//       <p className="mt-1 text-sm text-slate-300">{label}</p>
//     </motion.div>
//   );
// }

// function Achievements() {
//   return (
//     <section className="relative overflow-hidden bg-slate-900 py-24">
//       <div
//         className="absolute inset-0 bg-cover bg-center opacity-10"
//         style={{
//           backgroundImage:
//             "url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80')",
//         }}
//         aria-hidden="true"
//       />
//       <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
//         <RevealSection className="mx-auto max-w-2xl text-center">
//           <SectionLabel>Results That Speak</SectionLabel>
//           <SectionTitle center>
//             <span className="text-white">Results & Achievements</span>
//           </SectionTitle>
//           <Divider />
//         </RevealSection>

//         <motion.div
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, margin: "-80px" }}
//           variants={staggerContainer}
//           className="mt-12 grid grid-cols-2 gap-8 lg:grid-cols-4"
//         >
//           {ACHIEVEMENTS.map((a) => (
//             <AchievementCard key={a.label} {...a} />
//           ))}
//         </motion.div>

//         <RevealSection className="mt-16 text-center text-sm text-slate-400">
//           Recognised for excellence in the Kwara State Science Competition, National Debate Championship and
//           Regional Robotics Olympiad, with over a dozen scholarship awards secured for graduating students
//           annually.
//         </RevealSection>
//       </div>
//     </section>
//   );
// }

// /* ------------------------------------------------------------------ */
// /*  GALLERY                                                              */
// /* ------------------------------------------------------------------ */

// function GalleryCard({ image, index }: { image: string; index: number }) {
//   return (
//     <motion.div
//       variants={fadeUp}
//       className={`group overflow-hidden rounded-2xl shadow-md ${index % 5 === 0 ? "sm:row-span-1" : ""}`}
//     >
//       <img
//         src={image}
//         alt="His Grace Schools  campus life"
//         className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
//       />
//     </motion.div>
//   );
// }

// function Gallery() {
//   return (
//     <section id="gallery" className="bg-white py-24">
//       <div className="mx-auto max-w-7xl px-6 lg:px-8">
//         <RevealSection className="mx-auto max-w-2xl text-center">
//           <SectionLabel>Campus Moments</SectionLabel>
//           <SectionTitle center>Gallery</SectionTitle>
//           <Divider />
//         </RevealSection>

//         <motion.div
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, margin: "-80px" }}
//           variants={staggerContainer}
//           className="mt-12 grid auto-rows-[180px] grid-cols-2 gap-4 sm:grid-cols-3"
//         >
//           {GALLERY_IMAGES.map((img, i) => (
//             <GalleryCard key={img} image={img} index={i} />
//           ))}
//         </motion.div>
//       </div>
//     </section>
//   );
// }

// /* ------------------------------------------------------------------ */
// /*  TESTIMONIALS                                                        */
// /* ------------------------------------------------------------------ */

// function TestimonialCard({ name, role, quote }: { name: string; role: string; quote: string }) {
//   return (
//     <motion.div variants={fadeUp}>
//       <GlassCard className="h-full">
//         <Quote className="h-7 w-7 text-blue-200" />
//         <p className="mt-4 text-sm leading-relaxed text-slate-600">{quote}</p>
//         <div className="mt-6 flex items-center gap-1 text-amber-400">
//           {Array.from({ length: 5 }).map((_, i) => (
//             <Star key={i} className="h-4 w-4 fill-amber-400" />
//           ))}
//         </div>
//         <p className="mt-3 font-bold text-slate-900">{name}</p>
//         <p className="text-xs text-slate-500">{role}</p>
//       </GlassCard>
//     </motion.div>
//   );
// }

// function Testimonials() {
//   return (
//     <section className="bg-slate-50 py-24">
//       <div className="mx-auto max-w-7xl px-6 lg:px-8">
//         <RevealSection className="mx-auto max-w-2xl text-center">
//           <SectionLabel>What People Say</SectionLabel>
//           <SectionTitle center>Testimonials</SectionTitle>
//           <Divider />
//         </RevealSection>

//         <motion.div
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, margin: "-80px" }}
//           variants={staggerContainer}
//           className="mt-12 grid gap-6 lg:grid-cols-3"
//         >
//           {TESTIMONIALS.map((t) => (
//             <TestimonialCard key={t.name} {...t} />
//           ))}
//         </motion.div>
//       </div>
//     </section>
//   );
// }

// /* ------------------------------------------------------------------ */
// /*  ADMISSIONS                                                          */
// /* ------------------------------------------------------------------ */

// function CTASection() {
//   return (
//     <section id="admissions" className="relative overflow-hidden bg-blue-600 py-24">
//       <div
//         className="absolute inset-0 bg-cover bg-center opacity-15"
//         style={{
//           backgroundImage:
//             "url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=80')",
//         }}
//         aria-hidden="true"
//       />
//       <div className="relative mx-auto max-w-5xl px-6 text-center lg:px-8">
//         <RevealSection>
//           <SectionLabel>Admissions Open</SectionLabel>
//           <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
//             Begin Your Child&apos;s Journey to Excellence
//           </h2>
//           <p className="mx-auto mt-4 max-w-xl text-blue-100">
//             Applications for the new academic session are now open. Secure a place for your child at
//             {" "}{SCHOOL.name} today.
//           </p>

//           <div className="mx-auto mt-10 grid gap-6 text-left sm:grid-cols-3">
//             {[
//               { step: "Step 1", title: "Submit Application", description: "Complete the online or in-person application form." },
//               { step: "Step 2", title: "Entrance Examination", description: "Sit for our subject-based entrance examination." },
//               { step: "Step 3", title: "Interview & Enrolment", description: "Attend a family interview and complete enrolment." },
//             ].map((s) => (
//               <div key={s.step} className="rounded-2xl bg-white/10 p-6 backdrop-blur-sm">
//                 <p className="text-xs font-semibold uppercase tracking-wider text-blue-200">{s.step}</p>
//                 <p className="mt-2 font-bold text-white">{s.title}</p>
//                 <p className="mt-1 text-sm text-blue-100">{s.description}</p>
//               </div>
//             ))}
//           </div>

//           <div className="mt-10 flex flex-wrap justify-center gap-4">
//             <a
//               href="#contact"
//               className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-blue-600 shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl"
//             >
//               Apply Now <ArrowRight className="h-4 w-4" />
//             </a>
//             <a
//               href={`tel:${SCHOOL.phone.replace(/\s/g, "")}`}
//               className="inline-flex items-center gap-2 rounded-full border border-white/40 px-7 py-3.5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-white/10"
//             >
//               Call Admissions Office
//             </a>
//           </div>
//         </RevealSection>
//       </div>
//     </section>
//   );
// }

// /* ------------------------------------------------------------------ */
// /*  FAQ                                                                  */
// /* ------------------------------------------------------------------ */

// function FAQCard({ question, answer }: { question: string; answer: string }) {
//   const [open, setOpen] = useState(false);
//   return (
//     <motion.div variants={fadeUp} className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
//       <button
//         onClick={() => setOpen(!open)}
//         className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
//         aria-expanded={open}
//       >
//         <span className="font-semibold text-slate-900">{question}</span>
//         <ChevronDown
//           className={`h-5 w-5 shrink-0 text-blue-600 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
//         />
//       </button>
//       <AnimatePresence>
//         {open && (
//           <motion.div
//             initial={{ height: 0, opacity: 0 }}
//             animate={{ height: "auto", opacity: 1 }}
//             exit={{ height: 0, opacity: 0 }}
//             className="overflow-hidden"
//           >
//             <p className="px-6 pb-5 text-sm leading-relaxed text-slate-600">{answer}</p>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </motion.div>
//   );
// }

// function FAQ() {
//   return (
//     <section className="bg-slate-50 py-24">
//       <div className="mx-auto max-w-4xl px-6 lg:px-8">
//         <RevealSection className="mx-auto max-w-2xl text-center">
//           <SectionLabel>Have Questions?</SectionLabel>
//           <SectionTitle center>Frequently Asked Questions</SectionTitle>
//           <Divider />
//         </RevealSection>

//         <motion.div
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, margin: "-80px" }}
//           variants={staggerContainer}
//           className="mt-10 space-y-4"
//         >
//           {FAQS.map((f) => (
//             <FAQCard key={f.question} {...f} />
//           ))}
//         </motion.div>
//       </div>
//     </section>
//   );
// }

// /* ------------------------------------------------------------------ */
// /*  CONTACT                                                              */
// /* ------------------------------------------------------------------ */

// function ContactCard({ icon: Icon, title, value }: { icon: any; title: string; value: string }) {
//   return (
//     <div className="flex items-start gap-4 rounded-2xl bg-white p-5 shadow-sm">
//       <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600/10 text-blue-600">
//         <Icon className="h-5 w-5" />
//       </div>
//       <div>
//         <p className="text-sm font-semibold text-slate-900">{title}</p>
//         <p className="mt-0.5 text-sm text-slate-600">{value}</p>
//       </div>
//     </div>
//   );
// }

// function Contact() {
//   const [submitted, setSubmitted] = useState(false);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     setSubmitted(true);
//   };

//   return (
//     <section id="contact" className="bg-white py-24">
//       <div className="mx-auto max-w-7xl px-6 lg:px-8">
//         <RevealSection className="mx-auto max-w-2xl text-center">
//           <SectionLabel>Get In Touch</SectionLabel>
//           <SectionTitle center>Contact Us</SectionTitle>
//           <Divider />
//         </RevealSection>

//         <div className="mt-12 grid gap-10 lg:grid-cols-5">
//           <RevealSection variant={fadeLeft} className="space-y-4 lg:col-span-2">
//             <ContactCard icon={MapPin} title="Address" value={SCHOOL.address} />
//             <ContactCard icon={Phone} title="Phone" value={SCHOOL.phone} />
//             <ContactCard icon={Mail} title="Email" value={SCHOOL.email} />
//             <ContactCard icon={Clock} title="Working Hours" value={SCHOOL.hours} />
//           </RevealSection>

//           <RevealSection variant={fadeRight} className="lg:col-span-3">
//             <form onSubmit={handleSubmit} className="rounded-3xl bg-slate-50 p-8 shadow-sm">
//               <div className="grid gap-5 sm:grid-cols-2">
//                 <div>
//                   <label className="mb-1.5 block text-sm font-medium text-slate-700">Full Name</label>
//                   <input
//                     required
//                     type="text"
//                     className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-colors focus:border-blue-500"
//                     placeholder="Enter your full name"
//                   />
//                 </div>
//                 <div>
//                   <label className="mb-1.5 block text-sm font-medium text-slate-700">Phone Number</label>
//                   <input
//                     required
//                     type="tel"
//                     className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-colors focus:border-blue-500"
//                     placeholder="080X XXX XXXX"
//                   />
//                 </div>
//               </div>
//               <div className="mt-5">
//                 <label className="mb-1.5 block text-sm font-medium text-slate-700">Email Address</label>
//                 <input
//                   required
//                   type="email"
//                   className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-colors focus:border-blue-500"
//                   placeholder="you@example.com"
//                 />
//               </div>
//               <div className="mt-5">
//                 <label className="mb-1.5 block text-sm font-medium text-slate-700">Message</label>
//                 <textarea
//                   required
//                   rows={4}
//                   className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-colors focus:border-blue-500"
//                   placeholder="Tell us how we can help..."
//                 />
//               </div>

//               <button
//                 type="submit"
//                 className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-blue-700 sm:w-auto"
//               >
//                 Send Message <Send className="h-4 w-4" />
//               </button>

//               <AnimatePresence>
//                 {submitted && (
//                   <motion.p
//                     initial={{ opacity: 0, y: -8 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0 }}
//                     className="mt-4 flex items-center gap-2 text-sm font-medium text-green-600"
//                   >
//                     <CheckCircle2 className="h-4 w-4" /> Thank you — our admissions team will reach out shortly.
//                   </motion.p>
//                 )}
//               </AnimatePresence>
//             </form>
//           </RevealSection>
//         </div>

//         <RevealSection className="mt-14 overflow-hidden rounded-3xl shadow-lg">
//           <iframe
//             title="His Grace Schools  location map"
//             src="https://www.google.com/maps?q=Ilorin,Kwara%20State,Nigeria&output=embed"
//             className="h-96 w-full border-0"
//             loading="lazy"
//             referrerPolicy="no-referrer-when-downgrade"
//           />
//         </RevealSection>
//       </div>
//     </section>
//   );
// }

// /* ------------------------------------------------------------------ */
// /*  FOOTER                                                               */
// /* ------------------------------------------------------------------ */

// function Footer() {
//   const year = new Date().getFullYear();
//   const linkGroups = [
//     {
//       title: "Quick Links",
//       links: [
//         { label: "About Us", href: "#about" },
//         { label: "Academics", href: "#academics" },
//         { label: "Admissions", href: "#admissions" },
//         { label: "Gallery", href: "#gallery" },
//       ],
//     },
//     {
//       title: "Academics",
//       links: [
//         { label: "Science Department", href: "#academics" },
//         { label: "Commercial Department", href: "#academics" },
//         { label: "Arts Department", href: "#academics" },
//         { label: "JAMB Preparation", href: "#academics" },
//       ],
//     },
//     {
//       title: "Facilities",
//       links: [
//         { label: "Science Laboratories", href: "#facilities" },
//         { label: "ICT Laboratory", href: "#facilities" },
//         { label: "Library", href: "#facilities" },
//         { label: "Sports Complex", href: "#facilities" },
//       ],
//     },
//   ];

//   return (
//     <footer className="bg-slate-900 pt-20 text-slate-300">
//       <div className="mx-auto max-w-7xl px-6 lg:px-8">
//         <div className="grid gap-12 pb-14 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
//           <div>
//             <div className="flex items-center gap-2">
//               <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white">
//                 <GraduationCap className="h-6 w-6" />
//               </div>
//               <p className="text-lg font-bold text-white">{SCHOOL.name}</p>
//             </div>
//             <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">
//               A premier secondary school in {SCHOOL.location}, {SCHOOL.state}, dedicated to academic
//               excellence, discipline and the holistic development of every student.
//             </p>
//             <div className="mt-6 flex gap-3">
//               {[FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube].map((SocialIcon, i) => (
//                 <a
//                   key={i}
//                   href="#"
//                   aria-label="Social media link"
//                   className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-slate-300 transition-colors hover:bg-blue-600 hover:text-white"
//                 >
//                   <SocialIcon className="h-4 w-4" />
//                 </a>
//               ))}
//             </div>
//           </div>

//           {linkGroups.map((group) => (
//             <div key={group.title}>
//               <p className="text-sm font-bold uppercase tracking-wider text-white">{group.title}</p>
//               <ul className="mt-4 space-y-3">
//                 {group.links.map((link) => (
//                   <li key={link.label}>
//                     <a href={link.href} className="text-sm text-slate-400 transition-colors hover:text-blue-400">
//                       {link.label}
//                     </a>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))}

//           <div>
//             <p className="text-sm font-bold uppercase tracking-wider text-white">Newsletter</p>
//             <p className="mt-4 text-sm text-slate-400">Stay updated on admissions and school events.</p>
//             <form className="mt-4 flex gap-2" onSubmit={(e) => e.preventDefault()}>
//               <input
//                 type="email"
//                 required
//                 placeholder="Your email"
//                 className="w-full rounded-full border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-slate-500 outline-none focus:border-blue-500"
//               />
//               <button
//                 type="submit"
//                 aria-label="Subscribe to newsletter"
//                 className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white transition-colors hover:bg-blue-700"
//               >
//                 <ChevronRight className="h-4 w-4" />
//               </button>
//             </form>
//           </div>
//         </div>

//         <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-6 text-xs text-slate-500 sm:flex-row">
//           <p>© {year} {SCHOOL.name}. All rights reserved.</p>
//           <p>{SCHOOL.address}</p>
//         </div>
//       </div>
//     </footer>
//   );
// }

// /* ------------------------------------------------------------------ */
// /*  FLOATING WHATSAPP BUTTON                                            */
// /* ------------------------------------------------------------------ */

// function WhatsAppButton() {
//   return (
//     <motion.a
//       href="https://wa.me/2348034567890"
//       target="_blank"
//       rel="noopener noreferrer"
//       aria-label="Chat with us on WhatsApp"
//       initial={{ scale: 0, opacity: 0 }}
//       animate={{ scale: 1, opacity: 1 }}
//       transition={{ delay: 1, type: "spring", stiffness: 200, damping: 15 }}
//       whileHover={{ scale: 1.08 }}
//       className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-xl shadow-green-500/30"
//     >
//       <FaWhatsapp className="h-7 w-7" />
//     </motion.a>
//   );
// }

// /* ------------------------------------------------------------------ */
// /*  PAGE EXPORT                                                         */
// /* ------------------------------------------------------------------ */

// export default function KingsfordCollegePage() {
//   return (
//     <main className="min-h-screen bg-white font-sans antialiased">
//       <ScrollProgressBar />
//       <Navbar />
//       <Hero />
//       <About />
//       <PrincipalMessage />
//       <WhyChooseUs />
//       <Academics />
//       <Facilities />
//       <StudentLife />
//       <Achievements />
//       <Gallery />
//       <Testimonials />
//       <CTASection />
//       <FAQ />
//       <Contact />
//       <Footer />
//       <WhatsAppButton />
//     </main>
//   );
// }
