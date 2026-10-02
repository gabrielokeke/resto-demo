"use client";

/**
 * Cotonou La Mer La Mer page d'accueil
 * ---------------------------------------------------------------
 * Single-file Next.js (App Router) page component.
 * Drop this in as `app/page.tsx` in a Next.js + TypeScript +
 * Tailwind CSS project.
 *
 * Install:
 *   npm install framer-motion lucide-react
 *
 * Design tokens (see inline Tailwind arbitrary values, no
 * tailwind.config changes required):
 *   Abysse  #081826  La Mer deep navy, night ocean
 *   Marine  #0E3A56  La Mer ocean blue
 *   Lagon   #1C5C63  La Mer teal, secondary depth
 *   Sable   #C9A66B  La Mer warm sand
 *   Écume   #F4EFE3  La Mer soft cream / sea foam
 *   Corail  #D9603F  La Mer coral accent, used sparingly
 *
 * Type:
 *   Display La Mer Fraunces (editorial serif, optical sizing)
 *   Body    La Mer Manrope (warm geometric sans)
 *
 * Signature element: the "ligne d'horizon" La Mer a thin gold line
 * that draws itself on load, sits fixed as a scroll progress
 * indicator, and reappears as a divider between sections La Mer
 * echoing the line where the Atlantic meets the sky at dusk
 * in Cotonou.
 * ---------------------------------------------------------------
 */

import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import {
  Menu as MenuIcon,
  X,
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  ChevronDown,
  Fish,
  Flame,
  Waves,
  ArrowRight,
  Check,
} from "lucide-react";

/* Lucide dropped branded social icons La Mer small inline SVGs instead. */
function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
function FacebookIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
      <path d="M15 8.5h-2a1.5 1.5 0 0 0-1.5 1.5v2H15l-.5 3H11.5v7h-3v-7H7v-3h1.5V9.8A4.3 4.3 0 0 1 13 5.5h2v3z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const NAV_LINKS = [
  { label: "Accueil", href: "#accueil" },
  { label: "Notre Histoire", href: "#histoire" },
  { label: "La Carte", href: "#carte" },
  { label: "Galerie", href: "#galerie" },
  { label: "Réservation", href: "#reservation" },
  { label: "Contact", href: "#contact" },
];

const MENU_ITEMS = [
  {
    name: "Bar grillé aux épices",
    description:
      "Bar entier grillé au feu de bois, mariné aux épices côtières et à la lime.",
    price: "8 500",
    image:
      "https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?q=80&w=1400&auto=format&fit=crop",
  },
  {
    name: "Plateau Royal de Fruits de Mer",
    description:
      "Langouste, gambas, huîtres et calamars, servis sur glace pilée avec ses sauces maison.",
    price: "25 000",
    image:
      "https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?q=80&w=1400&auto=format&fit=crop",
  },
  {
    name: "Gambas flambées",
    description:
      "Gambas géantes flambées au rhum ambré, ail doré et piment doux.",
    price: "12 000",
    image:
      "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=1400&auto=format&fit=crop",
  },
  {
    name: "Homard grillé",
    description:
      "Homard entier grillé au beurre d'agrumes, servi avec légumes de saison.",
    price: "18 500",
    image:
      "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=1400&auto=format&fit=crop",
  },
  {
    name: "Calamars croustillants",
    description:
      "Calamars frits légèrement panés, sauce citronnée et piment doux.",
    price: "6 500",
    image:
     "https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=1200&auto=format&fit=crop",
  },
  {
    name: "Poisson braisé façon Cotonou",
    description:
      "Recette traditionnelle braisée lentement, tomate, oignon confit et piment local.",
    price: "7 500",
    image:
     "https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=1200&auto=format&fit=crop",
  },
];

const GALLERY_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1200&auto=format&fit=crop",
    alt: "Table élégante dressée pour un dîner en bord de mer",
    tall: true,
  },
  {
    src:"https://images.unsplash.com/photo-1505118380757-91f5f5632de0?q=80&w=600&auto=format&fit=crop",
    alt: "Vagues de l'océan Atlantique",
  },
  {
    src: "https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=1200&auto=format&fit=crop",
    alt: "Plateau de fruits de mer aux couleurs vives",
  },
  {
    src: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=1400&auto=format&fit=crop",
    alt: "Coucher de soleil sur la côte de Cotonou",
    tall: true,
  },
  // {
  //   src: "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=1200&auto=format&fit=crop",
  //   alt: "Plage tropicale bordée de palmiers",
  // },
  // {
  //   src: "https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=1200&auto=format&fit=crop",
  //   alt: "Assiette de fruits de mer raffinée",
  // },
  {
    src: "https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=2000&auto=format&fit=crop",
    alt: "Salle de restaurant élégante à la lueur des bougies",
    tall: true,
  },
  {
    src: "https://images.unsplash.com/photo-1439066615861-d1af74d74000?q=80&w=1200&auto=format&fit=crop",
    alt: "Palmiers et plage au coucher du soleil",
  },
];

const PILLARS = [
  {
    icon: Fish,
    title: "Produits frais",
    text: "Des produits sélectionnés avec soin pour une fraîcheur incomparable.",
  },
  {
    icon: Flame,
    title: "Cuisine authentique",
    text: "Des saveurs locales revisitées avec créativité et passion.",
  },
  {
    icon: Waves,
    title: "Cadre exceptionnel",
    text: "Une atmosphère unique inspirée par la beauté de la côte de Cotonou.",
  },
];

/* ------------------------------------------------------------------ */
/*  Fonts (Fraunces + Manrope) La Mer self-contained via Google Fonts       */
/* ------------------------------------------------------------------ */

const GLOBAL_STYLES = `
      @import url("https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300..700&family=Manrope:wght@400;500;600;700;800&display=swap");

      html {
        scroll-behavior: smooth;
      }
      body {
        background-color: #081826;
        color: #f4efe3;
        font-family: "Manrope", sans-serif;
      }
      .font-display {
        font-family: "Fraunces", serif;
      }
      ::selection {
        background-color: #d9603f;
        color: #f4efe3;
      }
      a:focus-visible,
      button:focus-visible,
      input:focus-visible,
      textarea:focus-visible {
        outline: 2px solid #c9a66b;
        outline-offset: 3px;
        border-radius: 2px;
      }
      .underline-reveal {
        position: relative;
      }
      .underline-reveal::after {
        content: "";
        position: absolute;
        left: 0;
        bottom: -0.2em;
        width: 100%;
        height: 1px;
        background: currentColor;
        transform: scaleX(0);
        transform-origin: right;
        transition: transform 0.5s cubic-bezier(0.65, 0, 0.35, 1);
      }
      .underline-reveal:hover::after,
      .underline-reveal:focus-visible::after {
        transform: scaleX(1);
        transform-origin: left;
      }
      @media (prefers-reduced-motion: reduce) {
        *,
        *::before,
        *::after {
          animation-duration: 0.001ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.001ms !important;
        }
      }
`;

function FontStyles() {
  // Plain <style> tag (no styled-jsx dependency) so this drops into
  // any React/Next.js setup without extra typings.
  return <style dangerouslySetInnerHTML={{ __html: GLOBAL_STYLES }} />;
}

/* ------------------------------------------------------------------ */
/*  SafeImage La Mer graceful fallback if an Unsplash URL fails             */
/* ------------------------------------------------------------------ */

function SafeImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div
        className={`bg-gradient-to-br from-[#0E3A56] via-[#1C5C63] to-[#081826] ${
          className || ""
        }`}
        role="img"
        aria-label={alt}
      />
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Reveal La Mer small reusable scroll/entrance animation wrapper          */
/* ------------------------------------------------------------------ */

function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? undefined : { opacity: 0, y }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Signature element: la ligne d'horizon (scroll progress + divider)  */
/* ------------------------------------------------------------------ */

function HorizonProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[2px] origin-left bg-gradient-to-r from-[#C9A66B] via-[#D9603F] to-[#C9A66B] z-[60]"
      aria-hidden="true"
    />
  );
}

function HorizonDivider() {
  const reduce = useReducedMotion();
  return (
    <div className="relative w-full h-px bg-[#C9A66B]/20 overflow-hidden">
      <motion.div
        className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-[#C9A66B] to-transparent"
        initial={reduce ? undefined : { x: "-100%" }}
        whileInView={reduce ? undefined : { x: "220%" }}
        viewport={{ once: true }}
        transition={{ duration: 2.2, ease: "easeInOut" }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Loader La Mer cinematic entrance, horizon line drawing itself           */
/* ------------------------------------------------------------------ */

function Loader({ show }: { show: boolean }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] bg-[#081826] flex flex-col items-center justify-center gap-6"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
        >
          <motion.p
            className="font-display text-[#F4EFE3] text-2xl tracking-[0.2em] uppercase"
            initial={{ opacity: 0, letterSpacing: "0.5em" }}
            animate={{ opacity: 1, letterSpacing: "0.2em" }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            Face A La Mer
          </motion.p>
          <motion.div
            className="h-px bg-[#C9A66B]"
            initial={{ width: 0 }}
            animate={{ width: 160 }}
            transition={{ duration: 1.1, delay: 0.3, ease: "easeInOut" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ------------------------------------------------------------------ */
/*  Navbar                                                             */
/* ------------------------------------------------------------------ */

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#081826]/85 backdrop-blur-md border-b border-[#C9A66B]/10 py-3"
          : "bg-transparent py-6"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
        <a
          href="#accueil"
          className="font-display text-lg md:text-xl tracking-[0.15em] text-[#F4EFE3] uppercase"
        >
          Face A <span className="text-[#D9603F]">La Mer</span>
        </a>

        <ul className="hidden lg:flex items-center gap-9 text-sm tracking-wide text-[#F4EFE3]/90">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="underline-reveal">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#reservation"
          className="hidden rounded-3xl lg:inline-flex items-center gap-2 border border-[#C9A66B] text-[#F4EFE3] text-sm tracking-wide px-5 py-2.5 hover:bg-[#C9A66B] hover:text-[#081826] transition-colors duration-300"
        >
          Réserver une table
        </a>

        <button
          className="lg:hidden text-[#F4EFE3]"
          onClick={() => setOpen(true)}
          aria-label="Ouvrir le menu de navigation"
        >
          <MenuIcon size={28} />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[70] bg-[#081826] flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex justify-end p-6">
              <button
                onClick={() => setOpen(false)}
                aria-label="Fermer le menu"
                className="text-[#F4EFE3]"
              >
                <X size={28} />
              </button>
            </div>
            <ul className="flex flex-col items-center gap-8 mt-10">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.06 }}
                >
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="font-display text-2xl text-[#F4EFE3]"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <a
              href="#reservation"
              onClick={() => setOpen(false)}
              className="mx-8 rounded-3xl mt-10 text-center border border-[#C9A66B] text-[#F4EFE3] py-3 tracking-wide"
            >
              Réserver une table
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero                                                               */
/* ------------------------------------------------------------------ */

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      id="accueil"
      ref={ref}
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden flex items-end"
    >
      <motion.div style={{ y }} className="absolute inset-0">
        <SafeImage
          src="https://images.unsplash.com/photo-1544148103-0773bf10d330?q=80&w=2000&auto=format&fit=crop"
          alt="Table de dégustation de fruits de mer face à l'océan au coucher du soleil"
          className="w-full h-[130%] object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#081826] via-[#081826]/50 to-[#081826]/10" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#081826]/60 via-transparent to-[#081826]/40" />

      {/* Floating decorative elements La Mer slow ocean drift */}
      {!reduce && (
        <>
          <motion.div
            className="absolute top-[18%] right-[10%] w-24 h-24 rounded-full bg-[#C9A66B]/10 blur-2xl"
            animate={{ y: [0, -18, 0], x: [0, 8, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-[35%] left-[6%] w-32 h-32 rounded-full bg-[#D9603F]/10 blur-3xl"
            animate={{ y: [0, 22, 0], x: [0, -10, 0] }}
            transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
          />
        </>
      )}

      <motion.div style={{ opacity }} className="relative z-10 w-full">
        <div className="max-w-7xl mx-auto px-6 md:px-10 pb-24 md:pb-28">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-[#C9A66B] tracking-[0.35em] text-xs md:text-sm uppercase mb-6"
          >
            Cotonou · Bénin · Cuisine de la mer
          </motion.p>

          <h1 className="font-display text-[#F4EFE3] text-4xl sm:text-5xl md:text-7xl leading-[1.08] max-w-4xl text-balance">
            {"Là où l'océan rencontre votre assiette.".split(" ").map((word, i) => (
              <motion.span
                key={i}
                className="inline-block mr-[0.28em]"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.9,
                  delay: 0.7 + i * 0.07,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.5 }}
            className="text-[#F4EFE3]/80 text-base md:text-lg max-w-xl mt-6 leading-relaxed"
          >
            Découvrez une expérience culinaire inspirée par les richesses de
            la mer, au cœur de la magnifique côte de Cotonou.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.75 }}
            className="flex flex-wrap items-center gap-4 mt-10"
          >
            <a
              href="#carte"
              className="inline-flex rounded-3xl items-center gap-2 bg-[#F4EFE3] text-[#081826] px-7 py-3.5 text-sm tracking-wide hover:bg-[#C9A66B] transition-colors duration-300"
            >
              Découvrir notre carte
              <ArrowRight size={16} />
            </a>
            <a
              href="#reservation"
              className="inline-flex rounded-3xl items-center gap-2 border border-[#F4EFE3]/50 text-[#F4EFE3] px-7 py-3.5 text-sm tracking-wide hover:border-[#F4EFE3] transition-colors duration-300"
            >
              Réserver une table
            </a>
          </motion.div>
        </div>

        {/* <motion.div
          className="hidden md:flex flex-col items-center gap-2 absolute right-10 bottom-10 text-[#F4EFE3]/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 1 }}
        >
          <span className="text-[10px] tracking-[0.3em] uppercase [writing-mode:vertical-rl]">
            Défiler
          </span>
          <motion.div
            animate={reduce ? undefined : { y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown size={18} />
          </motion.div>
        </motion.div> */}
      </motion.div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Story / Introduction                                               */
/* ------------------------------------------------------------------ */

function Story() {
  return (
    <section id="histoire" className="bg-[#081826] py-24 md:py-36">
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid md:grid-cols-2 gap-14 md:gap-20 items-center">
        <Reveal>
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden">
              <SafeImage
                src= "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1200&auto=format&fit=crop"
                alt="Palmiers et rivage de Cotonou au coucher du soleil"
                className="w-full h-[420px] md:h-[540px] object-cover"
              />
            </div>
            <div className="absolute rounded-3xl -bottom-8 -right-6 md:-right-10 w-40 md:w-52 border-4 border-[#081826] overflow-hidden shadow-2xl">
              <SafeImage
                src="https://images.unsplash.com/photo-1505118380757-91f5f5632de0?q=80&w=600&auto=format&fit=crop"
                alt="Détail des vagues de l'océan Atlantique"
                className="w-full h-40 md:h-52 object-cover"
              />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="text-[#C9A66B] tracking-[0.3em] text-xs uppercase mb-5">
            Notre histoire
          </p>
          <h2 className="font-display text-[#F4EFE3] text-3xl md:text-5xl leading-tight mb-6 text-balance">
            Une invitation au voyage
          </h2>
          <div className="space-y-5 text-[#F4EFE3]/75 leading-relaxed">
            <p>
              À Cotonou, l'océan Atlantique façonne chaque instant du
              quotidien. Le rythme des pêcheurs à l'aube, la lumière dorée
              du soir sur l'eau, le sel porté par le vent. Face a La Mer est
              né de cette rencontre entre la générosité de la mer et
              l'hospitalité chaleureuse du Bénin.
            </p>
            <p>
              Ici, chaque poisson, chaque crustacé raconte une histoire de
              fraîcheur et de tradition. Nos chefs subliment les produits du
              jour avec des gestes précis et des saveurs locales, dans un
              cadre pensé comme un prolongement du rivage.
            </p>
            <p>
              Venir chez nous, c'est s'asseoir face à l'horizon, laisser le
              temps ralentir, et se laisser porter par un voyage culinaire où
              la mer devient un art de vivre.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Menu La Mer Les saveurs de la mer                                       */
/* ------------------------------------------------------------------ */

function MenuSection() {
  return (
    <section id="carte" className="bg-[#0E3A56] py-24 md:py-36">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <Reveal className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-[#C9A66B] tracking-[0.3em] text-xs uppercase mb-5">
            La carte
          </p>
          <h2 className="font-display text-[#F4EFE3] text-3xl md:text-5xl leading-tight text-balance">
            Les saveurs de la mer
          </h2>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {MENU_ITEMS.map((item, i) => (
            <Reveal key={item.name} delay={(i % 3) * 0.1}>
              <article className="group relative overflow-hidden">
                <div className="relative rounded-3xl h-64 overflow-hidden">
                  <SafeImage
                    src={item.image}
                    alt={item.name}
                    className="w-full rounded-3xl h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#081826]/80 via-[#081826]/0 to-transparent" />
                </div>
                <div className="bg-[#0E3A56] pt-5">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="font-display text-[#F4EFE3] text-xl">
                      {item.name}
                    </h3>
                    <span className="text-[#C9A66B] whitespace-nowrap text-sm tracking-wide">
                      {item.price} FCFA
                    </span>
                  </div>
                  <p className="text-[#F4EFE3]/60 text-sm mt-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
                <div className="absolute top-4 left-4 h-px w-8 bg-[#C9A66B] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal className="text-center mt-16">
          <a
            href="#reservation"
            className="underline-reveal inline-flex items-center gap-2 text-[#F4EFE3] tracking-wide"
          >
            Voir la carte complète
            <ArrowRight size={16} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Immersive quote section with parallax                              */
/* ------------------------------------------------------------------ */

function ImmersiveQuote() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <section
      ref={ref}
      className="relative h-[70vh] min-h-[440px] w-full overflow-hidden flex items-center justify-center"
    >
      <motion.div style={{ y }} className="absolute inset-0">
        <SafeImage
          src= "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1200&auto=format&fit=crop"
          alt="Vue aérienne de l'océan Atlantique turquoise"
          className="w-full h-[130%] object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-[#081826]/55" />
      <Reveal className="relative z-10 max-w-3xl text-center px-6">
        <p className="font-display text-[#F4EFE3] text-2xl md:text-4xl leading-snug text-balance">
          « La mer nous inspire. La cuisine nous rassemble. »
        </p>
      </Reveal>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Experience La Mer three pillars                                         */
/* ------------------------------------------------------------------ */

function Experience() {
  return (
    <section className="bg-[#081826] py-24 md:py-36">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <Reveal className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-[#C9A66B] tracking-[0.3em] text-xs uppercase mb-5">
            L'expérience
          </p>
          <h2 className="font-display text-[#F4EFE3] text-3xl md:text-5xl leading-tight text-balance">
            L'esprit de la côte, dans chaque détail
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-8">
          {PILLARS.map((pillar, i) => (
            <Reveal key={pillar.title} delay={i * 0.15}>
              <div className="group border rounded-3xl border-[#C9A66B]/15 hover:border-[#C9A66B]/40 transition-colors duration-500 p-10 h-full">
                <pillar.icon
                  className="text-[#C9A66B] mb-6 transition-transform duration-500 group-hover:-translate-y-1"
                  size={30}
                  strokeWidth={1.5}
                />
                <h3 className="font-display text-[#F4EFE3] text-xl mb-3">
                  {pillar.title}
                </h3>
                <p className="text-[#F4EFE3]/65 leading-relaxed text-sm">
                  {pillar.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Gallery La Mer masonry                                                  */
/* ------------------------------------------------------------------ */

function Gallery() {
  return (
    <section id="galerie" className="bg-[#081826] py-24 md:py-36">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <Reveal className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-[#C9A66B] tracking-[0.3em] text-xs uppercase mb-5">
            Galerie
          </p>
          <h2 className="font-display text-[#F4EFE3] text-3xl md:text-5xl leading-tight text-balance">
            Un aperçu de l'ambiance
          </h2>
        </Reveal>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 [column-fill:balance]">
          {GALLERY_IMAGES.map((img, i) => (
            <Reveal key={img.src} delay={(i % 3) * 0.08} className="mb-5 break-inside-avoid">
              <div className="group relative rounded-3xl overflow-hidden">
                <SafeImage
                  src={img.src}
                  alt={img.alt}
                  className={`w-full object-cover transition-transform duration-1200 ease-out group-hover:scale-110 ${
                    img.tall ? "h-65" : "h-65"
                  }`}
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#081826]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-5">
                  <p className="text-[#F4EFE3] text-sm">{img.alt}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Reservation                                                        */
/* ------------------------------------------------------------------ */

function Reservation() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    nom: "",
    telephone: "",
    date: "",
    heure: "",
    personnes: "2",
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Brancher ici un appel API / service d'e-mail pour transmettre
    // la demande de réservation au restaurant.
    setSubmitted(true);
  }

  return (
    <section id="reservation" className="relative py-24 md:py-36 overflow-hidden">
      <div className="absolute inset-0">
        <SafeImage
          src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=2000&auto=format&fit=crop"
          alt="Table de restaurant dressée avec vue sur l'océan à la tombée de la nuit"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-[#081826]/85" />

      <div className="relative max-w-3xl mx-auto px-6 md:px-10">
        <Reveal className="text-center mb-14">
          <p className="text-[#C9A66B] tracking-[0.3em] text-xs uppercase mb-5">
            Réservation
          </p>
          <h2 className="font-display text-[#F4EFE3] text-3xl md:text-5xl leading-tight text-balance">
            Votre table vous attend
          </h2>
          <p className="text-[#F4EFE3]/65 mt-5 max-w-lg mx-auto">
            Complétez le formulaire ci-dessous. Votre demande sera confirmée
            personnellement par notre équipe dans les plus brefs délais.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          {submitted ? (
            <div className="border border-[#C9A66B]/40 bg-[#0E3A56]/40 p-10 text-center">
              <Check className="mx-auto text-[#C9A66B] mb-4" size={32} />
              <p className="font-display text-[#F4EFE3] text-xl mb-2">
                Merci, {form.nom.split(" ")[0] || "cher visiteur"} !
              </p>
              <p className="text-[#F4EFE3]/70">
                Votre demande de réservation a bien été envoyée. Notre équipe
                vous contactera très prochainement pour la confirmer.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="grid sm:grid-cols-2 gap-6 bg-[#081826]/40 backdrop-blur-sm border border-[#C9A66B]/15 p-8 md:p-10"
            >
              <label className="flex flex-col gap-2 sm:col-span-2">
                <span className="text-xs tracking-[0.2em] uppercase text-[#C9A66B]">
                  Nom
                </span>
                <input
                  required
                  type="text"
                  value={form.nom}
                  onChange={(e) => setForm({ ...form, nom: e.target.value })}
                  placeholder="Votre nom complet"
                  className="bg-transparent border-b border-[#F4EFE3]/25 text-[#F4EFE3] placeholder:text-[#F4EFE3]/30 py-2.5 focus:border-[#C9A66B] outline-none transition-colors"
                />
              </label>

              <label className="flex flex-col gap-2 sm:col-span-2">
                <span className="text-xs tracking-[0.2em] uppercase text-[#C9A66B]">
                  Numéro de téléphone
                </span>
                <input
                  required
                  type="tel"
                  value={form.telephone}
                  onChange={(e) =>
                    setForm({ ...form, telephone: e.target.value })
                  }
                  placeholder="+229 00 00 00 00"
                  className="bg-transparent border-b border-[#F4EFE3]/25 text-[#F4EFE3] placeholder:text-[#F4EFE3]/30 py-2.5 focus:border-[#C9A66B] outline-none transition-colors"
                />
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-xs tracking-[0.2em] uppercase text-[#C9A66B]">
                  Date
                </span>
                <input
                  required
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="bg-transparent border-b border-[#F4EFE3]/25 text-[#F4EFE3] py-2.5 focus:border-[#C9A66B] outline-none transition-colors [color-scheme:dark]"
                />
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-xs tracking-[0.2em] uppercase text-[#C9A66B]">
                  Heure
                </span>
                <input
                  required
                  type="time"
                  value={form.heure}
                  onChange={(e) => setForm({ ...form, heure: e.target.value })}
                  className="bg-transparent border-b border-[#F4EFE3]/25 text-[#F4EFE3] py-2.5 focus:border-[#C9A66B] outline-none transition-colors [color-scheme:dark]"
                />
              </label>

              <label className="flex flex-col gap-2 sm:col-span-2">
                <span className="text-xs tracking-[0.2em] uppercase text-[#C9A66B]">
                  Nombre de personnes
                </span>
                <select
                  value={form.personnes}
                  onChange={(e) =>
                    setForm({ ...form, personnes: e.target.value })
                  }
                  className="bg-transparent border-b border-[#F4EFE3]/25 text-[#F4EFE3] py-2.5 focus:border-[#C9A66B] outline-none transition-colors [color-scheme:dark]"
                >
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={n} className="bg-[#081826]">
                      {n} {n > 1 ? "personnes" : "personne"}
                    </option>
                  ))}
                </select>
              </label>

              <button
                type="submit"
                className="sm:col-span-2 rounded-3xl mt-4 inline-flex items-center justify-center gap-2 bg-[#F4EFE3] text-[#081826] py-4 tracking-wide hover:bg-[#C9A66B] transition-colors duration-300"
              >
                Demander une réservation
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Contact                                                            */
/* ------------------------------------------------------------------ */

function Contact() {
  return (
    <section id="contact" className="bg-[#0E3A56] py-24 md:py-36">
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid lg:grid-cols-2 gap-16 items-start">
        <Reveal>
          <p className="text-[#C9A66B] tracking-[0.3em] text-xs uppercase mb-5">
            Nous trouver
          </p>
          <h2 className="font-display text-[#F4EFE3] text-3xl md:text-5xl leading-tight mb-10 text-balance">
            Sur la route du littoral
          </h2>

          <ul className="space-y-6 text-[#F4EFE3]/80">
            <li className="flex items-start gap-4">
              <MapPin className="text-[#C9A66B] shrink-0 mt-1" size={20} />
              <span>Route de la Plage, Cotonou, Bénin</span>
            </li>
            <li className="flex items-start gap-4">
              <Phone className="text-[#C9A66B] shrink-0 mt-1" size={20} />
              <span>+229 01 00 00 00 00</span>
            </li>
            <li className="flex items-start gap-4">
              <MessageCircle className="text-[#C9A66B] shrink-0 mt-1" size={20} />
              <span>WhatsApp : +229 01 00 00 00 00</span>
            </li>
            <li className="flex items-start gap-4">
              <Clock className="text-[#C9A66B] shrink-0 mt-1" size={20} />
              <span>Lundi – Dimanche : 11h00 – 23h00</span>
            </li>
          </ul>

          <div className="flex items-center gap-4 mt-10">
            <a
              href="#"
              aria-label="Instagram"
              className="w-10 h-10 rounded-full border border-[#F4EFE3]/25 flex items-center justify-center hover:border-[#C9A66B] hover:text-[#C9A66B] transition-colors"
            >
              <InstagramIcon size={18} />
            </a>
            <a
              href="#"
              aria-label="Facebook"
              className="w-10 h-10 rounded-full border border-[#F4EFE3]/25 flex items-center justify-center hover:border-[#C9A66B] hover:text-[#C9A66B] transition-colors"
            >
              <FacebookIcon size={18} />
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          {/* Emplacement Google Maps La Mer remplacer par un vrai iframe */}
          <div className="relative h-[380px] md:h-[440px] border border-[#C9A66B]/20 overflow-hidden">
            <SafeImage
              src="https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=1200&auto=format&fit=crop"
              alt="Vue du littoral de Cotonou — emplacement de Google Maps à intégrer"
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#081826]/40">
              <MapPin className="text-[#C9A66B]" size={28} />
              <p className="text-[#F4EFE3]/80 text-sm tracking-wide text-center px-6">
                Intégration Google Maps à venir
                <br />
                Cotonou, Bénin
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Footer                                                             */
/* ------------------------------------------------------------------ */

function Footer() {
  return (
    <footer className="bg-[#081826] border-t border-[#C9A66B]/10 pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid md:grid-cols-3 gap-10 mb-14">
        <div>
          <p className="font-display text-xl text-[#F4EFE3] tracking-[0.1em] uppercase mb-4">
            Face a <span className="text-[#D9603F]">La Mer</span>
          </p>
          <p className="text-[#F4EFE3]/55 text-sm leading-relaxed max-w-xs">
            Une expérience culinaire inspirée par l'océan Atlantique, au cœur
            de Cotonou.
          </p>
        </div>

        <div>
          <p className="text-xs tracking-[0.25em] uppercase text-[#C9A66B] mb-5">
            Navigation
          </p>
          <ul className="space-y-3 text-[#F4EFE3]/65 text-sm">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="underline-reveal">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs tracking-[0.25em] uppercase text-[#C9A66B] mb-5">
            Contact
          </p>
          <ul className="space-y-3 text-[#F4EFE3]/65 text-sm">
            <li>Route de la Plage, Cotonou, Bénin</li>
            <li>+229 01 00 00 00 00</li>
            <li>contact@cotonoufacealamer.bj</li>
          </ul>
          <div className="flex items-center gap-3 mt-5">
            <a
              href="#"
              aria-label="Instagram"
              className="w-9 h-9 rounded-full border border-[#F4EFE3]/20 flex items-center justify-center hover:border-[#C9A66B] hover:text-[#C9A66B] transition-colors"
            >
              <InstagramIcon size={16} />
            </a>
            <a
              href="#"
              aria-label="Facebook"
              className="w-9 h-9 rounded-full border border-[#F4EFE3]/20 flex items-center justify-center hover:border-[#C9A66B] hover:text-[#C9A66B] transition-colors"
            >
              <FacebookIcon size={16} />
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-8 border-t border-[#F4EFE3]/10 text-center">
        <p className="text-[#F4EFE3]/40 text-xs tracking-wide">
          © 2026 Face A La Mer. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function OuidahSurMerPage() {
  const reduce = useReducedMotion();
  const [loading, setLoading] = useState(!reduce);

  useEffect(() => {
    if (reduce) {
      setLoading(false);
      return;
    }
    const t = setTimeout(() => setLoading(false), 1600);
    return () => clearTimeout(t);
  }, [reduce]);

  return (
    <main className="bg-[#081826] overflow-x-hidden">
      <FontStyles />
      <Loader show={loading} />
      <HorizonProgress />
      <Navbar />
      <Hero />
      <Story />
      <HorizonDivider />
      <MenuSection />
      <ImmersiveQuote />
      <Experience />
      <HorizonDivider />
      <Gallery />
      <Reservation />
      <Contact />
      <Footer />
    </main>
  );
}