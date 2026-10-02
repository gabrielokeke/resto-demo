// "use client";

// import React, {
//   useEffect,
//   useMemo,
//   useRef,
//   useState,
//   createContext,
//   useContext,
// } from "react";
// import { motion, AnimatePresence, useScroll, useSpring, Variants } from "framer-motion";
// import * as THREE from "three";
// import {
//   Menu,
//   X,
//   Phone,
//   Mail,
//   MapPin,
//   Clock,
//   ChevronRight,
//   ChevronDown,
//   Star,
//   BookOpen,
//   Users,
//   ShieldCheck,
//   Laptop2,
//   Palette,
//   Bus,
//   Trophy,
//   GraduationCap,
//   Heart,
//   Music4,
//   Building2,
//   Stethoscope,
//   Dumbbell,
//   Library,
//   ArrowRight,
//   Quote,
//   CalendarCheck,
//   Send,
//   ChevronLeft,
// } from "lucide-react";
// import { FaWhatsapp, FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";

// /* ------------------------------------------------------------------------------------------------
//    DATA
// ------------------------------------------------------------------------------------------------ */

// const SCHOOL = {
//   name: "Ayobami May Star Basic School",
//   shortName: "Ayobami May Star Basic School  ",
//   motto: "Nurturing Minds, Building Futures",
//   type: "Primary School",
//   ownership: "Private",
//   established: "2008",
//   location: "Ilorin",
//   state: "Kwara State",
//   country: "Nigeria",
//   headTeacher: "Mrs. Folake Adeyemi",
//   ageRange: "6 months – 11 years",
//   studentPopulation: 480,
//   teacherPopulation: 42,
//   email: "info@ayobamimaystar.ng",
//   phone: "+234 817 294 0194",
//   address: "Babalaje, Abayawo Rd, Oko Erin, Kwara",
//   hours: "Mon – Fri: 7:30am – 4:00pm",
//   mapEmbed:
//     "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31743.0!2d4.5421!3d8.4966!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sIlorin%2C+Kwara!5e0!3m2!1sen!2sng!4v1700000000000",
// };

// const NAV_LINKS = [
//   { label: "Home", href: "#home" },
//   { label: "About", href: "#about" },
//   { label: "Programs", href: "#programs" },
//   { label: "Admissions", href: "#admissions" },
//   { label: "Gallery", href: "#gallery" },
//   { label: "Contact", href: "#contact" },
// ];

// const STATS = [
//   { label: "Years of Excellence", value: 16, suffix: "+" },
//   { label: "Happy Pupils", value: 480, suffix: "+" },
//   { label: "Qualified Teachers", value: 42, suffix: "" },
//   { label: "Parent Satisfaction", value: 98, suffix: "%" },
// ];

// const CORE_VALUES = [
//   { title: "Integrity", desc: "We teach children to be honest, respectful and accountable in all they do." },
//   { title: "Excellence", desc: "We pursue the highest standard in academics, character and creativity." },
//   { title: "Compassion", desc: "We nurture warmth, kindness and empathy for one another." },
//   { title: "Curiosity", desc: "We encourage every child to ask questions and explore the world." },
// ];

// const WHY_US = [
//   { icon: ShieldCheck, title: "Safe Learning Environment", desc: "A secure, fully supervised campus with round-the-clock security and CCTV monitoring." },
//   { icon: Users, title: "Qualified Teachers", desc: "Experienced, certified educators dedicated to bringing out the best in every child." },
//   { icon: Heart, title: "Small Class Sizes", desc: "Low pupil-to-teacher ratios that guarantee personal attention for every child." },
//   { icon: GraduationCap, title: "Character Development", desc: "Moral instruction and leadership training woven into everyday learning." },
//   { icon: Laptop2, title: "Technology Integration", desc: "Modern ICT-driven learning that prepares pupils for a digital future." },
//   { icon: Palette, title: "Creative Learning", desc: "Music, arts and play-based learning that keep curiosity alive." },
//   { icon: BookOpen, title: "Child-Centered Teaching", desc: "A Montessori-inspired approach that respects each child's pace and style." },
//   { icon: Trophy, title: "Strong Academic Foundation", desc: "A rigorous curriculum in literacy, numeracy and continuous assessment." },
// ];

// const PROGRAMS = [
//   {
//     title: "Creche",
//     age: "6 months – 18 months",
//     desc: "A warm, nurturing space where our littlest learners are cared for by trained caregivers in a home-like setting.",
//     image: "https://images.unsplash.com/photo-1560785496-3c9d27877182?auto=format&fit=crop&w=800&q=80",
//   },
//   {
//     title: "Playgroup",
//     age: "18 months – 2 years",
//     desc: "Sensory play and guided exploration that build early social skills and confidence.",
//     image: "https://images.unsplash.com/photo-1560785496-3c9d27877182?auto=format&fit=crop&w=800&q=80",
//   },
//   {
//     title: "Nursery",
//     age: "3 – 4 years",
//     desc: "Montessori-based, play-driven learning that introduces letters, numbers and independence.",
//     image: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&w=800&q=80",
//   },
//   {
//     title: "Kindergarten",
//     age: "4 – 5 years",
//     desc: "Structured phonics, numeracy and creative arts that prepare pupils for primary school.",
//     image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80",
//   },
//   {
//     title: "Primary",
//     age: "6 – 11 years",
//     desc: "A robust curriculum covering literacy, numeracy, ICT, creative arts and moral instruction.",
//     image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80",
//   },
//   {
//     title: "After School Support",
//     age: "All ages",
//     desc: "Homework assistance, enrichment clubs and safe supervised care until pick-up.",
//     image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80",
//   },
// ];

// const FACILITIES = [
//   { icon: Building2, title: "Modern Classrooms", desc: "Bright, well-ventilated classrooms equipped for interactive learning." },
//   { icon: Laptop2, title: "ICT Room", desc: "A dedicated computer lab introducing pupils to digital literacy." },
//   { icon: Library, title: "Library", desc: "A well-stocked library that nurtures a lifelong love for reading." },
//   { icon: Users, title: "Playground", desc: "A safe, spacious outdoor play area with age-appropriate equipment." },
//   { icon: Bus, title: "School Bus", desc: "A reliable, monitored school bus service across Ilorin metropolis." },
//   { icon: Stethoscope, title: "School Clinic", desc: "An on-site clinic staffed by a qualified nurse for immediate care." },
//   { icon: ShieldCheck, title: "Security", desc: "24-hour security personnel and CCTV coverage across the campus." },
//   { icon: Dumbbell, title: "Sports Area", desc: "A dedicated field for football, athletics and physical education." },
//   { icon: Palette, title: "Creative Arts Room", desc: "A vibrant studio for painting, craft-making and creative expression." },
// ];

// const STUDENT_LIFE = [
//   { title: "Music", image: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=600&q=80" },
//   { title: "Dance", image: "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?auto=format&fit=crop&w=600&q=80" },
//   { title: "Arts & Crafts", image: "https://images.unsplash.com/photo-1499892477393-f675706cbe6e?auto=format&fit=crop&w=600&q=80" },
//   { title: "Coding", image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80" },
//   { title: "Sports", image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=600&q=80" },
//   { title: "Excursions", image: "https://images.unsplash.com/photo-1472162072942-cd5147eb3902?auto=format&fit=crop&w=600&q=80" },
//   { title: "Spelling Bee", image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=80" },
//   { title: "Reading Club", image: "https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=600&q=80" },
//   { title: "Leadership Activities", image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=600&q=80" },
// ];

// const GALLERY_IMAGES = [
//   "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=80",
//   "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80",
//   "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80",
//   "https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&w=800&q=80",
//   "https://images.unsplash.com/photo-1560785496-3c9d27877182?auto=format&fit=crop&w=800&q=80",
//   "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
//   "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=800&q=80",
//   "https://images.unsplash.com/photo-1518834107812-67b0b7c58434?auto=format&fit=crop&w=800&q=80",
// ];

// const TESTIMONIALS = [
//   {
//     name: "Mrs. Bukola Ogundipe",
//     role: "Parent",
//     text: "Ayobami May Star Basic School   has been more than a school for my daughter   it is a second home. The teachers are patient, attentive and genuinely invested in her growth.",
//     image: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&w=200&q=80",
//   },
//   {
//     name: "Tunde Abioye",
//     role: "Pupil, Primary 5",
//     text: "I love coding class and the school library. My teachers always make learning fun and I look forward to school every day.",
//     image: "https://images.unsplash.com/photo-1503457574465-1ce3aa60ef0f?auto=format&fit=crop&w=200&q=80",
//   },
//   {
//     name: "Engr. Kayode Fashola",
//     role: "Graduate Parent",
//     text: "Both my children graduated from Ayobami May Star Basic School   and went on to excel in secondary school. The foundation they received here was outstanding.",
//     image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80",
//   },
// ];

// const FAQS = [
//   { q: "What is the admission process at Ayobami May Star Basic School  ?", a: "Admission begins with an application form, followed by a friendly assessment for the child and an interview with parents. Successful applicants receive an offer letter within one week." },
//   { q: "What are the school fees?", a: "School fees vary by class level and are payable termly. Please contact our admissions office for the current fee schedule and available payment plans." },
//   { q: "Does the school provide a bus service?", a: "Yes, our monitored school bus service covers most parts of Ilorin metropolis. Routes and pick-up points can be confirmed with our transport office." },
//   { q: "What curriculum does Ayobami May Star Basic School   follow?", a: "We follow the Nigerian national curriculum enriched with Montessori-inspired, play-based learning, phonics, ICT education and continuous assessment." },
//   { q: "Is a school uniform required?", a: "Yes, all pupils are required to wear the official Ayobami May Star Basic School   uniform, available for purchase at the school store at the start of each session." },
//   { q: "What extracurricular activities are available?", a: "Pupils can join music, dance, arts and crafts, coding, sports, spelling bee, reading club and leadership clubs throughout the term." },
// ];

// /* ------------------------------------------------------------------------------------------------
//    SHARED ANIMATION VARIANTS
// ------------------------------------------------------------------------------------------------ */

// const fadeUp: Variants = {
//   hidden: { opacity: 0, y: 32 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
// };

// const fadeLeft: Variants = {
//   hidden: { opacity: 0, x: -32 },
//   visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
// };

// const fadeRight: Variants = {
//   hidden: { opacity: 0, x: 32 },
//   visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
// };

// const staggerContainer: Variants = {
//   hidden: {},
//   visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
// };

// /* ------------------------------------------------------------------------------------------------
//    PRIMITIVE / REUSABLE COMPONENTS
// ------------------------------------------------------------------------------------------------ */

// function RevealSection({
//   children,
//   className = "",
//   variant = fadeUp,
//   id,
// }: {
//   children: React.ReactNode;
//   className?: string;
//   variant?: Variants;
//   id?: string;
// }) {
//   return (
//     <motion.section
//       id={id}
//       className={className}
//       initial="hidden"
//       whileInView="visible"
//       viewport={{ once: true, amount: 0.15 }}
//       variants={variant}
//     >
//       {children}
//     </motion.section>
//   );
// }

// function SectionLabel({ children }: { children: React.ReactNode }) {
//   return (
//     <motion.span
//       variants={fadeUp}
//       className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-blue-600 ring-1 ring-blue-100"
//     >
//       <span className="h-1.5 w-1.5 rounded-full bg-yellow-400" />
//       {children}
//     </motion.span>
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
//     <motion.h2
//       variants={fadeUp}
//       className={`mt-4 font-poppins text-3xl font-bold leading-tight text-slate-900 sm:text-4xl md:text-[2.75rem] ${
//         center ? "text-center mx-auto" : ""
//       }`}
//     >
//       {children}
//     </motion.h2>
//   );
// }

// function Divider({ center = false }: { center?: boolean }) {
//   return (
//     <div className={`mt-5 flex items-center gap-2 ${center ? "justify-center" : ""}`}>
//       <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
//       <span className="h-1.5 w-10 rounded-full bg-gradient-to-r from-blue-600 to-sky-400" />
//       <span className="h-1.5 w-1.5 rounded-full bg-yellow-400" />
//     </div>
//   );
// }

// function GlassCard({
//   children,
//   className = "",
// }: {
//   children: React.ReactNode;
//   className?: string;
// }) {
//   return (
//     <div
//       className={`rounded-3xl border border-white/60 bg-white/80 p-6 shadow-[0_8px_30px_rgb(37,99,235,0.08)] backdrop-blur-md ${className}`}
//     >
//       {children}
//     </div>
//   );
// }

// function CTASection() {
//   return (
//     <RevealSection className="relative overflow-hidden bg-linear-to-br from-blue-600 via-blue-600 to-sky-500 py-16 sm:py-20">
//       <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-yellow-400/20 blur-3xl" />
//       <div className="pointer-events-none absolute -bottom-20 -left-10 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
//       <div className="relative mx-auto flex max-w-4xl flex-col items-center gap-6 px-6 text-center">
//         <motion.h3 variants={fadeUp} className="font-poppins text-2xl font-bold text-white sm:text-3xl">
//           Give your child the strong foundation they deserve
//         </motion.h3>
//         <motion.p variants={fadeUp} className="max-w-xl text-blue-50">
//           Book a tour today and see why hundreds of Ilorin families trust {SCHOOL.shortName} with their children's early years.
//         </motion.p>
//         <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-4">
//           <a
//             href="#admissions"
//             className="inline-flex items-center gap-2 rounded-full bg-yellow-400 px-7 py-3 text-sm font-semibold text-slate-900 shadow-lg transition hover:scale-105 hover:shadow-xl"
//           >
//             Enroll Now <ArrowRight className="h-4 w-4" />
//           </a>
//           <a
//             href="#contact"
//             className="inline-flex items-center gap-2 rounded-full border border-white/70 px-7 py-3 text-sm font-semibold text-white transition hover:scale-105 hover:bg-white/10"
//           >
//             Book a School Tour
//           </a>
//         </motion.div>
//       </div>
//     </RevealSection>
//   );
// }

// /* ------------------------------------------------------------------------------------------------
//    CARD COMPONENTS
// ------------------------------------------------------------------------------------------------ */

// function ProgramCard({ program, index }: { program: (typeof PROGRAMS)[number]; index: number }) {
//   return (
//     <motion.div
//       variants={fadeUp}
//       whileHover={{ y: -6 }}
//       className="group overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-100 transition hover:shadow-xl"
//     >
//       <div className="relative h-48 overflow-hidden">
//         <img
//           src={program.image}
//           alt={program.title}
//           className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
//           loading="lazy"
//         />
//         <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 via-transparent to-transparent" />
//         <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-blue-600">
//           {program.age}
//         </span>
//       </div>
//       <div className="p-6">
//         <h3 className="font-poppins text-lg font-bold text-slate-900">{program.title}</h3>
//         <p className="mt-2 text-sm leading-relaxed text-slate-600">{program.desc}</p>
//         <a
//           href="#admissions"
//           className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-blue-600 transition group-hover:gap-2"
//         >
//           Learn more <ChevronRight className="h-4 w-4" />
//         </a>
//       </div>
//     </motion.div>
//   );
// }

// function FacilityCard({ facility }: { facility: (typeof FACILITIES)[number] }) {
//   const Icon = facility.icon;
//   return (
//     <motion.div
//       variants={fadeUp}
//       whileHover={{ scale: 1.03 }}
//       className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100 transition hover:shadow-lg"
//     >
//       <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
//         <Icon className="h-6 w-6" />
//       </div>
//       <h4 className="mt-4 font-poppins text-base font-bold text-slate-900">{facility.title}</h4>
//       <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{facility.desc}</p>
//     </motion.div>
//   );
// }

// function FeatureCard({ feature }: { feature: (typeof WHY_US)[number] }) {
//   const Icon = feature.icon;
//   return (
//     <motion.div
//       variants={fadeUp}
//       whileHover={{ y: -4 }}
//       className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition hover:shadow-lg hover:ring-1 hover:ring-blue-100"
//     >
//       <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-sky-400 text-white shadow-md">
//         <Icon className="h-5 w-5" />
//       </div>
//       <h4 className="mt-4 font-poppins text-base font-bold text-slate-900">{feature.title}</h4>
//       <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{feature.desc}</p>
//     </motion.div>
//   );
// }

// function GalleryCard({ src, index }: { src: string; index: number }) {
//   return (
//     <motion.div
//       variants={fadeUp}
//       whileHover={{ scale: 1.03 }}
//       className={`group relative overflow-hidden rounded-2xl shadow-sm ${
//         index === 0 || index === 5 ? "row-span-1" : ""
//       }`}
//     >
//       <img
//         src={src}
//         alt="Ayobami May Star Basic School   school life"
//         className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
//         loading="lazy"
//       />
//       <div className="absolute inset-0 bg-blue-900/0 transition group-hover:bg-blue-900/20" />
//     </motion.div>
//   );
// }

// function StatCard({ stat }: { stat: (typeof STATS)[number] }) {
//   const [count, setCount] = useState(0);
//   const ref = useRef<HTMLDivElement | null>(null);
//   const started = useRef(false);

//   useEffect(() => {
//     const el = ref.current;
//     if (!el) return;
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting && !started.current) {
//           started.current = true;
//           const duration = 1400;
//           const start = performance.now();
//           const animate = (now: number) => {
//             const progress = Math.min((now - start) / duration, 1);
//             setCount(Math.floor(progress * stat.value));
//             if (progress < 1) requestAnimationFrame(animate);
//             else setCount(stat.value);
//           };
//           requestAnimationFrame(animate);
//         }
//       },
//       { threshold: 0.4 }
//     );
//     observer.observe(el);
//     return () => observer.disconnect();
//   }, [stat.value]);

//   return (
//     <div ref={ref} className="text-center">
//       <div className="font-poppins text-3xl font-extrabold text-white sm:text-4xl">
//         {count}
//         {stat.suffix}
//       </div>
//       <div className="mt-1 text-xs font-medium uppercase tracking-wide text-blue-100 sm:text-sm">
//         {stat.label}
//       </div>
//     </div>
//   );
// }

// function TeacherCard() {
//   return (
//     <motion.div variants={fadeRight} className="relative mx-auto max-w-md lg:mx-0">
//       <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-br from-blue-100 to-sky-50" />
//       <div className="overflow-hidden rounded-[1.75rem] shadow-xl">
//         <img
//           src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=700&q=80"
//           alt={SCHOOL.headTeacher}
//           className="h-[420px] w-full object-cover"
//         />
//       </div>
//       <div className="absolute -bottom-6 left-1/2 w-[85%] -translate-x-1/2 rounded-2xl bg-white px-6 py-4 text-center shadow-lg ring-1 ring-slate-100">
//         <p className="font-poppins font-bold text-slate-900">{SCHOOL.headTeacher}</p>
//         <p className="text-xs font-medium text-blue-600">Head Teacher</p>
//       </div>
//     </motion.div>
//   );
// }

// function ContactCard({
//   icon: Icon,
//   title,
//   value,
// }: {
//   icon: React.ElementType;
//   title: string;
//   value: string;
// }) {
//   return (
//     <motion.div variants={fadeUp} className="flex items-start gap-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100">
//       <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
//         <Icon className="h-5 w-5" />
//       </div>
//       <div>
//         <p className="text-sm font-semibold text-slate-900">{title}</p>
//         <p className="mt-0.5 text-sm text-slate-600">{value}</p>
//       </div>
//     </motion.div>
//   );
// }

// function TestimonialCard({ testimonial }: { testimonial: (typeof TESTIMONIALS)[number] }) {
//   return (
//     <GlassCard className="mx-auto flex h-full max-w-xl flex-col items-center text-center">
//       <Quote className="h-8 w-8 text-yellow-400" />
//       <p className="mt-4 text-base leading-relaxed text-slate-700 sm:text-lg">"{testimonial.text}"</p>
//       <div className="mt-6 flex items-center gap-3">
//         <img
//           src={testimonial.image}
//           alt={testimonial.name}
//           className="h-12 w-12 rounded-full object-cover ring-2 ring-blue-100"
//         />
//         <div className="text-left">
//           <p className="text-sm font-bold text-slate-900">{testimonial.name}</p>
//           <p className="text-xs text-slate-500">{testimonial.role}</p>
//         </div>
//       </div>
//       <div className="mt-3 flex gap-1">
//         {Array.from({ length: 5 }).map((_, i) => (
//           <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
//         ))}
//       </div>
//     </GlassCard>
//   );
// }

// function FAQCard({
//   item,
//   isOpen,
//   onToggle,
// }: {
//   item: (typeof FAQS)[number];
//   isOpen: boolean;
//   onToggle: () => void;
// }) {
//   return (
//     <motion.div variants={fadeUp} className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100">
//       <button
//         onClick={onToggle}
//         className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
//       >
//         <span className="font-poppins text-sm font-semibold text-slate-900 sm:text-base">{item.q}</span>
//         <ChevronDown
//           className={`h-5 w-5 shrink-0 text-blue-600 transition-transform ${isOpen ? "rotate-180" : ""}`}
//         />
//       </button>
//       <AnimatePresence initial={false}>
//         {isOpen && (
//           <motion.div
//             initial={{ height: 0, opacity: 0 }}
//             animate={{ height: "auto", opacity: 1 }}
//             exit={{ height: 0, opacity: 0 }}
//             transition={{ duration: 0.3, ease: "easeInOut" }}
//             className="px-6"
//           >
//             <p className="pb-5 text-sm leading-relaxed text-slate-600">{item.a}</p>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </motion.div>
//   );
// }

// /* ------------------------------------------------------------------------------------------------
//    THREE.JS HERO BACKGROUND
// ------------------------------------------------------------------------------------------------ */

// function HeroCanvas() {
//   const mountRef = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     const mount = mountRef.current;
//     if (!mount) return;

//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(60, mount.clientWidth / mount.clientHeight, 0.1, 100);
//     camera.position.z = 12;

//     const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
//     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
//     renderer.setSize(mount.clientWidth, mount.clientHeight);
//     mount.appendChild(renderer.domElement);

//     const particleCount = 140;
//     const positions = new Float32Array(particleCount * 3);
//     const colors = new Float32Array(particleCount * 3);
//     const palette = [
//       new THREE.Color("#60A5FA"),
//       new THREE.Color("#FACC15"),
//       new THREE.Color("#22C55E"),
//       new THREE.Color("#FFFFFF"),
//     ];

//     for (let i = 0; i < particleCount; i++) {
//       positions[i * 3] = (Math.random() - 0.5) * 26;
//       positions[i * 3 + 1] = (Math.random() - 0.5) * 16;
//       positions[i * 3 + 2] = (Math.random() - 0.5) * 12;
//       const c = palette[Math.floor(Math.random() * palette.length)];
//       colors[i * 3] = c.r;
//       colors[i * 3 + 1] = c.g;
//       colors[i * 3 + 2] = c.b;
//     }

//     const geometry = new THREE.BufferGeometry();
//     geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
//     geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

//     const material = new THREE.PointsMaterial({
//       size: 0.22,
//       vertexColors: true,
//       transparent: true,
//       opacity: 0.85,
//       depthWrite: false,
//     });

//     const points = new THREE.Points(geometry, material);
//     scene.add(points);

//     let frameId = 0;
//     let mouseX = 0;
//     let mouseY = 0;

//     const handleMouseMove = (e: MouseEvent) => {
//       const rect = mount.getBoundingClientRect();
//       mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
//       mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
//     };
//     mount.addEventListener("mousemove", handleMouseMove);

//     const clock = new THREE.Clock();
//     const animate = () => {
//       const t = clock.getElapsedTime();
//       points.rotation.y = t * 0.03 + mouseX * 0.15;
//       points.rotation.x = Math.sin(t * 0.15) * 0.05 + mouseY * 0.1;
//       const posAttr = geometry.attributes.position as THREE.BufferAttribute;
//       for (let i = 0; i < particleCount; i++) {
//         const y = posAttr.getY(i);
//         posAttr.setY(i, y + Math.sin(t + i) * 0.0015);
//       }
//       posAttr.needsUpdate = true;
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
//       mount.removeEventListener("mousemove", handleMouseMove);
//       geometry.dispose();
//       material.dispose();
//       renderer.dispose();
//       if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
//     };
//   }, []);

//   return <div ref={mountRef} className="pointer-events-none absolute inset-0 opacity-70 sm:opacity-90" />;
// }

// /* ------------------------------------------------------------------------------------------------
//    NAVBAR
// ------------------------------------------------------------------------------------------------ */

// function Navbar() {
//   const [scrolled, setScrolled] = useState(false);
//   const [open, setOpen] = useState(false);

//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 24);
//     window.addEventListener("scroll", onScroll);
//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   return (
//     <header
//       className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
//         scrolled ? "bg-white/90 shadow-sm backdrop-blur-md" : "bg-transparent"
//       }`}
//     >
//       {/* Capital Comment */}
//       <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
//         <a href="#home" className="flex items-center gap-2">
//           <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-sky-400 font-poppins text-lg font-extrabold text-white shadow-md">
//             F
//           </span>
//           <span className={`font-poppins text-lg font-bold ${scrolled ? "text-slate-900" : "text-slate-900"}`}>
//             {SCHOOL.shortName}
//           </span>
//         </a>

//         <div className="hidden items-center gap-8 lg:flex">
//           {NAV_LINKS.map((link) => (
//             <a
//               key={link.href}
//               href={link.href}
//               className="text-sm font-semibold text-slate-700 transition hover:text-blue-600"
//             >
//               {link.label}
//             </a>
//           ))}
//         </div>

//         <div className="hidden lg:block">
//           <a
//             href="#admissions"
//             className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:scale-105 hover:bg-blue-700"
//           >
//             Enroll Now <ArrowRight className="h-4 w-4" />
//           </a>
//         </div>

//         <button
//           className="rounded-lg p-2 text-slate-900 lg:hidden"
//           onClick={() => setOpen(!open)}
//           aria-label="Toggle menu"
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
//             className="overflow-hidden bg-white lg:hidden"
//           >
//             <div className="flex flex-col gap-1 px-6 pb-6">
//               {NAV_LINKS.map((link) => (
//                 <a
//                   key={link.href}
//                   href={link.href}
//                   onClick={() => setOpen(false)}
//                   className="rounded-lg px-3 py-3 text-sm font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-600"
//                 >
//                   {link.label}
//                 </a>
//               ))}
//               <a
//                 href="#admissions"
//                 onClick={() => setOpen(false)}
//                 className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white"
//               >
//                 Enroll Now <ArrowRight className="h-4 w-4" />
//               </a>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </header>
//   );
// }

// /* ------------------------------------------------------------------------------------------------
//    HERO
// ------------------------------------------------------------------------------------------------ */

// function Hero() {
//   return (
//     <section id="home" className="relative overflow-hidden bg-gradient-to-b from-sky-50 via-white to-white pt-32 pb-16 sm:pt-40 sm:pb-24">
//       <HeroCanvas />
//       <div className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-blue-200/30 blur-3xl" />
//       <div className="pointer-events-none absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-yellow-200/40 blur-3xl" />

//       <div className="relative mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:items-center">
//         <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
//           <motion.span
//             variants={fadeUp}
//             className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-blue-600 shadow-sm ring-1 ring-blue-100"
//           >
//             <span className="h-1.5 w-1.5 rounded-full bg-yellow-400" />
//             {SCHOOL.type} &middot; {SCHOOL.location}, {SCHOOL.state}
//           </motion.span>

//           <motion.h1
//             variants={fadeUp}
//             className="mt-6 font-poppins text-4xl font-extrabold leading-[1.1] text-slate-900 sm:text-5xl md:text-6xl"
//           >
//             Where Little Minds
//             <span className="block bg-gradient-to-r from-blue-600 to-sky-400 bg-clip-text text-transparent">
//               Grow Into Great Leaders
//             </span>
//           </motion.h1>

//           <motion.p variants={fadeUp} className="mt-6 max-w-lg text-base leading-relaxed text-slate-600 sm:text-lg">
//             {SCHOOL.name} offers a safe, joyful and academically rich environment where every child from creche to
//             primary six is nurtured to reach their full potential. Established {SCHOOL.established}.
//           </motion.p>

//           <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-4">
//             <a
//               href="#admissions"
//               className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:scale-105 hover:bg-blue-700 hover:shadow-xl"
//             >
//               Enroll Now <ArrowRight className="h-4 w-4" />
//             </a>
//             <a
//               href="#contact"
//               className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-7 py-3.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:scale-105 hover:border-blue-200 hover:text-blue-600"
//             >
//               <CalendarCheck className="h-4 w-4" /> Book a School Tour
//             </a>
//           </motion.div>

//           <motion.div variants={fadeUp} className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-4">
//             {STATS.map((stat) => (
//               <div key={stat.label}>
//                 <p className="font-poppins text-2xl font-extrabold text-blue-600 sm:text-3xl">
//                   {stat.value}
//                   {stat.suffix}
//                 </p>
//                 <p className="mt-1 text-xs font-medium text-slate-500">{stat.label}</p>
//               </div>
//             ))}
//           </motion.div>
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0, scale: 0.92 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
//           className="relative"
//         >
//           <div className="relative overflow-hidden rounded-[2rem] shadow-2xl">
//             <img
//               src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1000&q=80"
//               alt="Happy children learning at Ayobami May Star Basic School  "
//               className="h-[420px] w-full object-cover sm:h-[480px]"
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 via-transparent to-transparent" />
//           </div>

//           <motion.div
//             animate={{ y: [0, -10, 0] }}
//             transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
//             className="absolute -left-6 top-8 hidden rounded-2xl bg-white px-5 py-4 shadow-xl ring-1 ring-slate-100 sm:block"
//           >
//             <div className="flex items-center gap-3">
//               <span className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100 text-green-600">
//                 <ShieldCheck className="h-5 w-5" />
//               </span>
//               <div>
//                 <p className="text-xs font-semibold text-slate-900">Safe Campus</p>
//                 <p className="text-[11px] text-slate-500">24/7 Security</p>
//               </div>
//             </div>
//           </motion.div>

//           <motion.div
//             animate={{ y: [0, 10, 0] }}
//             transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
//             className="absolute -bottom-6 -right-4 hidden rounded-2xl bg-white px-5 py-4 shadow-xl ring-1 ring-slate-100 sm:block"
//           >
//             <div className="flex items-center gap-3">
//               <span className="flex h-9 w-9 items-center justify-center rounded-full bg-yellow-100 text-yellow-600">
//                 <Trophy className="h-5 w-5" />
//               </span>
//               <div>
//                 <p className="text-xs font-semibold text-slate-900">Top Performing</p>
//                 <p className="text-[11px] text-slate-500">Kwara State Schools</p>
//               </div>
//             </div>
//           </motion.div>
//         </motion.div>
//       </div>
//     </section>
//   );
// }

// /* ------------------------------------------------------------------------------------------------
//    PAGE SECTIONS
// ------------------------------------------------------------------------------------------------ */

// function AboutSection() {
//   return (
//     <RevealSection id="about" variant={staggerContainer} className="bg-white py-20 sm:py-28">
//       <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:items-center">
//         <motion.div variants={fadeLeft} className="relative">
//           <div className="overflow-hidden rounded-[2rem] shadow-xl">
//             <img
//               src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=900&q=80"
//               alt="Classroom activities at Ayobami May Star Basic School  "
//               className="h-[420px] w-full object-cover"
//             />
//           </div>
//           <div className="absolute -bottom-8 -right-6 hidden w-52 rounded-2xl bg-blue-600 p-5 text-white shadow-xl sm:block">
//             <p className="font-poppins text-3xl font-extrabold">{SCHOOL.established}</p>
//             <p className="mt-1 text-xs text-blue-100">Established, proudly serving Ilorin families ever since</p>
//           </div>
//         </motion.div>

//         <div>
//           <SectionLabel>About {SCHOOL.shortName}</SectionLabel>
//           <SectionTitle>A trusted foundation for your child's brightest future</SectionTitle>
//           <Divider />
//           <motion.p variants={fadeUp} className="mt-6 text-base leading-relaxed text-slate-600">
//             Founded in {SCHOOL.established}, {SCHOOL.name} has grown into one of Ilorin's most trusted early
//             childhood and Nursery And Primary institutions. We combine a Montessori-inspired, play-based approach with a
//             rigorous academic curriculum, giving every child the confidence, character and knowledge they need
//             to thrive.
//           </motion.p>

//           <div className="mt-8 grid gap-6 sm:grid-cols-2">
//             <motion.div variants={fadeUp}>
//               <h4 className="font-poppins text-sm font-bold uppercase tracking-wide text-blue-600">Our Mission</h4>
//               <p className="mt-2 text-sm leading-relaxed text-slate-600">
//                 To provide a safe, stimulating and inclusive environment where every child develops academically,
//                 socially and morally.
//               </p>
//             </motion.div>
//             <motion.div variants={fadeUp}>
//               <h4 className="font-poppins text-sm font-bold uppercase tracking-wide text-blue-600">Our Vision</h4>
//               <p className="mt-2 text-sm leading-relaxed text-slate-600">
//                 To be the leading nursery And primary school in Kwara State, raising confident, curious and
//                 principled young leaders.
//               </p>
//             </motion.div>
//           </div>

//           <motion.div variants={staggerContainer} className="mt-8 grid grid-cols-2 gap-4">
//             {CORE_VALUES.map((value) => (
//               <motion.div
//                 key={value.title}
//                 variants={fadeUp}
//                 className="rounded-xl bg-slate-50 p-4 ring-1 ring-slate-100"
//               >
//                 <p className="font-poppins text-sm font-bold text-slate-900">{value.title}</p>
//                 <p className="mt-1 text-xs leading-relaxed text-slate-500">{value.desc}</p>
//               </motion.div>
//             ))}
//           </motion.div>
//         </div>
//       </div>
//     </RevealSection>
//   );
// }

// function HeadTeacherSection() {
//   return (
//     <RevealSection variant={staggerContainer} className="bg-slate-50 py-20 sm:py-28">
//       <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:items-center">
//         <TeacherCard />
//         <div>
//           <SectionLabel>Head Teacher's Message</SectionLabel>
//           <SectionTitle>A warm welcome from our Head Teacher</SectionTitle>
//           <Divider />
//           <motion.p variants={fadeUp} className="mt-6 text-base italic leading-relaxed text-slate-600">
//             "At {SCHOOL.shortName}, we believe every child deserves to be seen, heard and celebrated. Our dedicated
//             teachers work hand in hand with parents to build a strong academic and moral foundation that will
//             carry your child far beyond our gates. I warmly welcome you to become part of our growing family."
//           </motion.p>
//           <motion.div variants={fadeUp} className="mt-6 flex items-center gap-3">
//             <Quote className="h-8 w-8 text-blue-200" />
//             <div>
//               <p className="font-poppins font-bold text-slate-900">{SCHOOL.headTeacher}</p>
//               <p className="text-xs text-slate-500">Head Teacher, {SCHOOL.shortName}</p>
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </RevealSection>
//   );
// }

// function WhyChooseUsSection() {
//   return (
//     <RevealSection variant={staggerContainer} className="bg-white py-20 sm:py-28">
//       <div className="mx-auto max-w-7xl px-6">
//         <div className="mx-auto max-w-2xl text-center">
//           <SectionLabel>Why Choose Us</SectionLabel>
//           <SectionTitle center>Everything your child needs to thrive</SectionTitle>
//           <Divider center />
//         </div>
//         <motion.div
//           variants={staggerContainer}
//           className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
//         >
//           {WHY_US.map((feature) => (
//             <FeatureCard key={feature.title} feature={feature} />
//           ))}
//         </motion.div>
//       </div>
//     </RevealSection>
//   );
// }

// function ProgramsSection() {
//   return (
//     <RevealSection id="programs" variant={staggerContainer} className="bg-slate-50 py-20 sm:py-28">
//       <div className="mx-auto max-w-7xl px-6">
//         <div className="mx-auto max-w-2xl text-center">
//           <SectionLabel>Our Programs</SectionLabel>
//           <SectionTitle center>A learning journey for every age</SectionTitle>
//           <Divider center />
//         </div>
//         <motion.div variants={staggerContainer} className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
//           {PROGRAMS.map((program, index) => (
//             <ProgramCard key={program.title} program={program} index={index} />
//           ))}
//         </motion.div>
//       </div>
//     </RevealSection>
//   );
// }

// function FacilitiesSection() {
//   return (
//     <RevealSection variant={staggerContainer} className="bg-white py-20 sm:py-28">
//       <div className="mx-auto max-w-7xl px-6">
//         <div className="mx-auto max-w-2xl text-center">
//           <SectionLabel>Our Facilities</SectionLabel>
//           <SectionTitle center>A campus built for growth and safety</SectionTitle>
//           <Divider center />
//         </div>
//         <motion.div
//           variants={staggerContainer}
//           className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
//         >
//           {FACILITIES.map((facility) => (
//             <FacilityCard key={facility.title} facility={facility} />
//           ))}
//         </motion.div>
//       </div>
//     </RevealSection>
//   );
// }

// function StudentLifeSection() {
//   return (
//     <RevealSection variant={staggerContainer} className="bg-slate-50 py-20 sm:py-28">
//       <div className="mx-auto max-w-7xl px-6">
//         <div className="mx-auto max-w-2xl text-center">
//           <SectionLabel>Student Life</SectionLabel>
//           <SectionTitle center>Beyond the classroom</SectionTitle>
//           <Divider center />
//         </div>
//         <motion.div
//           variants={staggerContainer}
//           className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3"
//         >
//           {STUDENT_LIFE.map((item) => (
//             <motion.div
//               key={item.title}
//               variants={fadeUp}
//               whileHover={{ scale: 1.03 }}
//               className="group relative overflow-hidden rounded-2xl shadow-sm"
//             >
//               <img
//                 src={item.image}
//                 alt={item.title}
//                 className="h-44 w-full object-cover transition duration-500 group-hover:scale-110 sm:h-52"
//                 loading="lazy"
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/10 to-transparent" />
//               <p className="absolute bottom-4 left-4 font-poppins text-sm font-bold text-white sm:text-base">
//                 {item.title}
//               </p>
//             </motion.div>
//           ))}
//         </motion.div>
//       </div>
//     </RevealSection>
//   );
// }

// function AchievementsSection() {
//   return (
//     <RevealSection variant={staggerContainer} className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-sky-500 py-20 sm:py-28">
//       <div className="pointer-events-none absolute -left-10 top-10 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
//       <div className="pointer-events-none absolute -right-10 bottom-0 h-72 w-72 rounded-full bg-yellow-400/20 blur-3xl" />
//       <div className="relative mx-auto max-w-7xl px-6">
//         <div className="mx-auto max-w-2xl text-center">
//           <motion.span
//             variants={fadeUp}
//             className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white ring-1 ring-white/30"
//           >
//             <span className="h-1.5 w-1.5 rounded-full bg-yellow-400" />
//             Our Achievements
//           </motion.span>
//           <motion.h2 variants={fadeUp} className="mt-4 font-poppins text-3xl font-bold text-white sm:text-4xl">
//             Numbers that reflect our commitment
//           </motion.h2>
//         </div>
//         <motion.div variants={staggerContainer} className="mt-14 grid grid-cols-2 gap-8 sm:grid-cols-4">
//           {STATS.map((stat) => (
//             <motion.div key={stat.label} variants={fadeUp}>
//               <StatCard stat={stat} />
//             </motion.div>
//           ))}
//         </motion.div>
//         <motion.div variants={staggerContainer} className="mt-16 grid gap-6 sm:grid-cols-3">
//           {[
//             { icon: Trophy, title: "Kwara State Spelling Bee", desc: "Champions, three consecutive years running." },
//             { icon: GraduationCap, title: "100% Transition Rate", desc: "Every Primary 6 graduate placed in a top secondary school." },
//             { icon: Star, title: "Best Private School Award", desc: "Recognized by the Kwara State Association of Private Schools." },
//           ].map((item) => (
//             <motion.div key={item.title} variants={fadeUp} className="rounded-2xl bg-white/10 p-6 backdrop-blur-md ring-1 ring-white/20">
//               <item.icon className="h-7 w-7 text-yellow-400" />
//               <p className="mt-4 font-poppins font-bold text-white">{item.title}</p>
//               <p className="mt-1.5 text-sm text-blue-50">{item.desc}</p>
//             </motion.div>
//           ))}
//         </motion.div>
//       </div>
//     </RevealSection>
//   );
// }

// function GallerySection() {
//   return (
//     <RevealSection id="gallery" variant={staggerContainer} className="bg-white py-20 sm:py-28">
//       <div className="mx-auto max-w-7xl px-6">
//         <div className="mx-auto max-w-2xl text-center">
//           <SectionLabel>Gallery</SectionLabel>
//           <SectionTitle center>Moments from our Ayobami May Star Basic School   family</SectionTitle>
//           <Divider center />
//         </div>
//         <motion.div
//           variants={staggerContainer}
//           className="mt-14 grid auto-rows-[160px] grid-cols-2 gap-4 sm:auto-rows-[200px] sm:grid-cols-4"
//         >
//           {GALLERY_IMAGES.map((src, index) => (
//             <GalleryCard key={src} src={src} index={index} />
//           ))}
//         </motion.div>
//       </div>
//     </RevealSection>
//   );
// }

// function TestimonialsSection() {
//   const [index, setIndex] = useState(0);

//   const next = () => setIndex((i) => (i + 1) % TESTIMONIALS.length);
//   const prev = () => setIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

//   return (
//     <RevealSection variant={staggerContainer} className="bg-slate-50 py-20 sm:py-28">
//       <div className="mx-auto max-w-4xl px-6">
//         <div className="mx-auto max-w-2xl text-center">
//           <SectionLabel>Testimonials</SectionLabel>
//           <SectionTitle center>What our families say</SectionTitle>
//           <Divider center />
//         </div>

//         <div className="relative mt-14">
//           <AnimatePresence mode="wait">
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, x: 40 }}
//               animate={{ opacity: 1, x: 0 }}
//               exit={{ opacity: 0, x: -40 }}
//               transition={{ duration: 0.4 }}
//             >
//               <TestimonialCard testimonial={TESTIMONIALS[index]} />
//             </motion.div>
//           </AnimatePresence>

//           <div className="mt-8 flex items-center justify-center gap-4">
//             <button
//               onClick={prev}
//               className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-blue-600 shadow-sm ring-1 ring-slate-200 transition hover:scale-105"
//               aria-label="Previous testimonial"
//             >
//               <ChevronLeft className="h-5 w-5" />
//             </button>
//             <div className="flex gap-2">
//               {TESTIMONIALS.map((_, i) => (
//                 <button
//                   key={i}
//                   onClick={() => setIndex(i)}
//                   className={`h-2 w-2 rounded-full transition ${i === index ? "w-6 bg-blue-600" : "bg-slate-300"}`}
//                   aria-label={`Go to testimonial ${i + 1}`}
//                 />
//               ))}
//             </div>
//             <button
//               onClick={next}
//               className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-blue-600 shadow-sm ring-1 ring-slate-200 transition hover:scale-105"
//               aria-label="Next testimonial"
//             >
//               <ChevronRight className="h-5 w-5" />
//             </button>
//           </div>
//         </div>
//       </div>
//     </RevealSection>
//   );
// }

// function AdmissionsSection() {
//   const steps = [
//     { title: "Submit Application", desc: "Complete the online or in-person application form with your child's details." },
//     { title: "Assessment & Interview", desc: "A friendly, age-appropriate assessment for the child and a chat with parents." },
//     { title: "Receive Offer", desc: "Successful applicants receive an admission offer within one week." },
//     { title: "Complete Enrollment", desc: "Submit required documents and pay fees to secure your child's place." },
//   ];

//   const documents = [
//     "Completed application form",
//     "Birth certificate or age declaration",
//     "Immunization/medical records",
//     "Two recent passport photographs",
//     "Previous school report (if applicable)",
//   ];

//   return (
//     <RevealSection id="admissions" variant={staggerContainer} className="bg-white py-20 sm:py-28">
//       <div className="mx-auto max-w-7xl px-6">
//         <div className="mx-auto max-w-2xl text-center">
//           <SectionLabel>Admissions</SectionLabel>
//           <SectionTitle center>Join the Ayobami May Star Basic School   family</SectionTitle>
//           <Divider center />
//         </div>

//         <div className="mt-14 grid gap-10 lg:grid-cols-2">
//           <motion.div variants={fadeLeft}>
//             <h3 className="font-poppins text-xl font-bold text-slate-900">Enrollment Process</h3>
//             <div className="mt-6 space-y-6">
//               {steps.map((step, i) => (
//                 <div key={step.title} className="flex gap-4">
//                   <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 font-poppins text-sm font-bold text-white shadow-md">
//                     {i + 1}
//                   </div>
//                   <div>
//                     <p className="font-poppins font-bold text-slate-900">{step.title}</p>
//                     <p className="mt-1 text-sm leading-relaxed text-slate-600">{step.desc}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </motion.div>

//           <motion.div variants={fadeRight}>
//             <GlassCard>
//               <h3 className="font-poppins text-xl font-bold text-slate-900">Required Documents</h3>
//               <ul className="mt-6 space-y-3">
//                 {documents.map((doc) => (
//                   <li key={doc} className="flex items-start gap-3 text-sm text-slate-600">
//                     <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
//                     {doc}
//                   </li>
//                 ))}
//               </ul>
//               <a
//                 href="#contact"
//                 className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-md transition hover:scale-[1.02] hover:bg-blue-700"
//               >
//                 Book a Visit <CalendarCheck className="h-4 w-4" />
//               </a>
//             </GlassCard>
//           </motion.div>
//         </div>
//       </div>
//     </RevealSection>
//   );
// }

// function FAQSection() {
//   const [openIndex, setOpenIndex] = useState<number | null>(0);

//   return (
//     <RevealSection variant={staggerContainer} className="bg-slate-50 py-20 sm:py-28">
//       <div className="mx-auto max-w-3xl px-6">
//         <div className="mx-auto max-w-2xl text-center">
//           <SectionLabel>FAQ</SectionLabel>
//           <SectionTitle center>Frequently asked questions</SectionTitle>
//           <Divider center />
//         </div>
//         <motion.div variants={staggerContainer} className="mt-12 space-y-4">
//           {FAQS.map((item, i) => (
//             <FAQCard
//               key={item.q}
//               item={item}
//               isOpen={openIndex === i}
//               onToggle={() => setOpenIndex(openIndex === i ? null : i)}
//             />
//           ))}
//         </motion.div>
//       </div>
//     </RevealSection>
//   );
// }

// function ContactSection() {
//   const [submitted, setSubmitted] = useState(false);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     setSubmitted(true);
//     setTimeout(() => setSubmitted(false), 4000);
//   };

//   return (
//     <RevealSection id="contact" variant={staggerContainer} className="bg-white py-20 sm:py-28">
//       <div className="mx-auto max-w-7xl px-6">
//         <div className="mx-auto max-w-2xl text-center">
//           <SectionLabel>Contact Us</SectionLabel>
//           <SectionTitle center>We would love to hear from you</SectionTitle>
//           <Divider center />
//         </div>

//         <div className="mt-14 grid gap-10 lg:grid-cols-5">
//           <motion.div variants={staggerContainer} className="space-y-4 lg:col-span-2">
//             <ContactCard icon={MapPin} title="Address" value={SCHOOL.address} />
//             <ContactCard icon={Phone} title="Phone" value={SCHOOL.phone} />
//             <ContactCard icon={Mail} title="Email" value={SCHOOL.email} />
//             <ContactCard icon={Clock} title="Working Hours" value={SCHOOL.hours} />
//           </motion.div>

//           <motion.form variants={fadeUp} onSubmit={handleSubmit} className="rounded-3xl bg-slate-50 p-8 shadow-sm ring-1 ring-slate-100 lg:col-span-3">
//             <div className="grid gap-5 sm:grid-cols-2">
//               <div>
//                 <label className="text-xs font-semibold text-slate-700">Full Name</label>
//                 <input
//                   required
//                   type="text"
//                   placeholder="Your full name"
//                   className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
//                 />
//               </div>
//               <div>
//                 <label className="text-xs font-semibold text-slate-700">Phone Number</label>
//                 <input
//                   required
//                   type="tel"
//                   placeholder="080X XXX XXXX"
//                   className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
//                 />
//               </div>
//             </div>
//             <div className="mt-5">
//               <label className="text-xs font-semibold text-slate-700">Email Address</label>
//               <input
//                 required
//                 type="email"
//                 placeholder="you@example.com"
//                 className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
//               />
//             </div>
//             <div className="mt-5">
//               <label className="text-xs font-semibold text-slate-700">Message</label>
//               <textarea
//                 required
//                 rows={4}
//                 placeholder="Tell us about your child and how we can help..."
//                 className="mt-1.5 w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
//               />
//             </div>
//             <button
//               type="submit"
//               className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-md transition hover:scale-[1.02] hover:bg-blue-700 sm:w-auto"
//             >
//               Send Message <Send className="h-4 w-4" />
//             </button>
//             <AnimatePresence>
//               {submitted && (
//                 <motion.p
//                   initial={{ opacity: 0, y: -8 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0 }}
//                   className="mt-4 text-sm font-medium text-green-600"
//                 >
//                   Thank you! Your message has been received and we will respond shortly.
//                 </motion.p>
//               )}
//             </AnimatePresence>
//           </motion.form>
//         </div>

//         <motion.div variants={fadeUp} className="mt-14 overflow-hidden rounded-3xl shadow-sm ring-1 ring-slate-100">
//           <iframe
//             src={SCHOOL.mapEmbed}
//             width="100%"
//             height="360"
//             loading="lazy"
//             style={{ border: 0 }}
//             title="Ayobami May Star Basic School   location map"
//           />
//         </motion.div>
//       </div>
//     </RevealSection>
//   );
// }

// function Footer() {
//   return (
//     <footer className="bg-slate-900 pt-16 text-slate-300">
//       <div className="mx-auto max-w-7xl px-6">
//         <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
//           <div className="lg:col-span-2">
//             <div className="flex items-center gap-2">
//               <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-sky-400 font-poppins text-lg font-extrabold text-white">
//                 B
//               </span>
//               <span className="font-poppins text-lg font-bold text-white">{SCHOOL.shortName}</span>
//             </div>
//             <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
//               {SCHOOL.motto}. Nurturing confident, curious and principled children in {SCHOOL.location},{" "}
//               {SCHOOL.state}, since {SCHOOL.established}.
//             </p>
//             <div className="mt-6 flex gap-3">
//               {[FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube].map((Icon, i) => (
//                 <a
//                   key={i}
//                   href="#"
//                   className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-blue-600"
//                 >
//                   <Icon className="h-4 w-4" />
//                 </a>
//               ))}
//             </div>
//           </div>

//           <div>
//             <h4 className="font-poppins text-sm font-bold text-white">Quick Links</h4>
//             <ul className="mt-4 space-y-2.5 text-sm">
//               {NAV_LINKS.map((link) => (
//                 <li key={link.href}>
//                   <a href={link.href} className="text-slate-400 transition hover:text-white">
//                     {link.label}
//                   </a>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           <div>
//             <h4 className="font-poppins text-sm font-bold text-white">Programs</h4>
//             <ul className="mt-4 space-y-2.5 text-sm">
//               {PROGRAMS.slice(0, 5).map((p) => (
//                 <li key={p.title} className="text-slate-400">
//                   {p.title}
//                 </li>
//               ))}
//             </ul>
//           </div>

//           <div>
//             <h4 className="font-poppins text-sm font-bold text-white">Newsletter</h4>
//             <p className="mt-4 text-sm text-slate-400">Get school updates and events in your inbox.</p>
//             <form className="mt-4 flex overflow-hidden rounded-full bg-white/10">
//               <input
//                 type="email"
//                 placeholder="Your email"
//                 className="w-full bg-transparent px-4 py-2.5 text-sm text-white placeholder:text-slate-500 outline-none"
//               />
//               <button
//                 type="submit"
//                 className="flex items-center justify-center bg-blue-600 px-4 text-white transition hover:bg-blue-700"
//                 aria-label="Subscribe"
//               >
//                 <Send className="h-4 w-4" />
//               </button>
//             </form>
//           </div>
//         </div>

//         <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 py-6 text-xs text-slate-500 sm:flex-row">
//           <p>&copy; {new Date().getFullYear()} {SCHOOL.name}. All rights reserved.</p>
//           <p>Designed with care for Ilorin's brightest young minds.</p>
//         </div>
//       </div>
//     </footer>
//   );
// }

// function WhatsAppButton() {
//   return (
//     <motion.a
//       href="https://wa.me/2348032147765"
//       target="_blank"
//       rel="noopener noreferrer"
//       initial={{ scale: 0 }}
//       animate={{ scale: 1 }}
//       transition={{ delay: 1, type: "spring", stiffness: 200 }}
//       whileHover={{ scale: 1.1 }}
//       className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-xl"
//       aria-label="Chat on WhatsApp"
//     >
//       <FaWhatsapp className="h-7 w-7" />
//     </motion.a>
//   );
// }

// function ScrollProgressBar() {
//   const { scrollYProgress } = useScroll();
//   const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25, restDelta: 0.001 });
//   return (
//     <motion.div
//       style={{ scaleX }}
//       className="fixed inset-x-0 top-0 z-[60] h-1 origin-left bg-gradient-to-r from-blue-600 via-sky-400 to-yellow-400"
//     />
//   );
// }

// /* ------------------------------------------------------------------------------------------------
//    PAGE
// ------------------------------------------------------------------------------------------------ */

// export default function BrightpathAcademyPage() {
//   return (
//     <div className="min-h-screen bg-white font-inter antialiased">
//       <style jsx global>{`
//         html {
//           scroll-behavior: smooth;
//         }
//         .font-poppins {
//           font-family: "Poppins", ui-sans-serif, system-ui, sans-serif;
//         }
//         .font-inter {
//           font-family: "Inter", ui-sans-serif, system-ui, sans-serif;
//         }
//         @media (prefers-reduced-motion: reduce) {
//           * {
//             animation-duration: 0.01ms !important;
//             animation-iteration-count: 1 !important;
//             transition-duration: 0.01ms !important;
//             scroll-behavior: auto !important;
//           }
//         }
//         :focus-visible {
//           outline: 2px solid #2563eb;
//           outline-offset: 2px;
//         }
//       `}</style>

//       <ScrollProgressBar />
//       <Navbar />
//       <Hero />
//       <AboutSection />
//       <HeadTeacherSection />
//       <WhyChooseUsSection />
//       <ProgramsSection />
//       <FacilitiesSection />
//       <StudentLifeSection />
//       <AchievementsSection />
//       <GallerySection />
//       <TestimonialsSection />
//       <AdmissionsSection />
//       <FAQSection />
//       <ContactSection />
//       <CTASection />
//       <Footer />
//       <WhatsAppButton />
//     </div>
//   );
// }
