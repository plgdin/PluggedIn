import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Badge } from "@/components/ui/badge";
import { Code, Smartphone, Cpu, CloudCog, Zap, Lightbulb, Star, ShieldCheck, Crosshair } from "lucide-react";
import AnimatedPage from "../components/AnimatedPage";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
// Import the SmoothScroll wrapper
import SmoothScroll from "../components/SmoothScroll"; 

// --- IMPORT ASSETS ---
import backgroundVideo from "../assets/services-bg.mp4"; 
import websiteDevImage from "../assets/services/website-dev.jpg";
import appDevImage from "../assets/services/app-dev.jpg";
import softwareDevImage from "../assets/services/software-dev.jpg";
import iotSolImage from "../assets/services/iot-sol.jpg";
import customDevImage from "../assets/services/custom-dev.jpg";
import consultingImage from "../assets/services/consulting.jpg";

// --- TYPE DEFINITIONS ---
interface Service {
  number: string;
  title: string;
  subtitle: string;
  lore: string;
  passive: string;
  stat: string;
  rarity: "LEGENDARY" | "EPIC" | "RARE" | "MYTHIC";
  icon: React.ReactNode;
  image: string;
}

// --- GAMIFIED DATA ---
const services: Service[] = [
  {
    number: "01",
    title: "Website Development", 
    subtitle: "WEB_DEV_PROTOCOL",
    lore: "Crafted from the digital ether. This construct enhances user perception and stabilizes brand reality.",
    passive: "Search Visibility +45%",
    stat: "Load Speed: S-Tier",
    rarity: "LEGENDARY",
    icon: <Code className="h-5 w-5" />,
    image: websiteDevImage,
  },
  {
    number: "02",
    title: "App Development",
    subtitle: "APP_CONSTRUCT_V2",
    lore: "A pocket-sized obelisk of power. Grants the user 'Omnipresence' across iOS and Android realms.",
    passive: "User Engagement +60%",
    stat: "Haptics: Enabled",
    rarity: "EPIC",
    icon: <Smartphone className="h-5 w-5" />,
    image: appDevImage,
  },
  {
    number: "03",
    title: "Custom Software",
    subtitle: "CUSTOM_CORE.EXE",
    lore: "Bespoke logic gates forged to automate the mundane. Wield this to banish inefficiency.",
    passive: "Workflow Drag -80%",
    stat: "Scalability: Infinite",
    rarity: "RARE",
    icon: <CloudCog className="h-5 w-5" />,
    image: softwareDevImage,
  },
  {
    number: "04",
    title: "IoT Solutions",
    subtitle: "IOT_NEURAL_LINK",
    lore: "The bridge between silicon and soul. Animates the inanimate objects of your domain.",
    passive: "Connectivity +100%",
    stat: "Latency: Near Zero",
    rarity: "MYTHIC",
    icon: <Zap className="h-5 w-5" />,
    image: iotSolImage,
  },
  {
    number: "05",
    title: "Custom Devices",
    subtitle: "HARDWARE_FORGE",
    lore: "Physical artifacts imbued with computational spirit. Prototype creates reality from thought.",
    passive: "Innovation Aura +30%",
    stat: "Durability: Max",
    rarity: "EPIC",
    icon: <Cpu className="h-5 w-5" />,
    image: customDevImage,
  },
  {
    number: "06",
    title: "Tech Consulting",
    subtitle: "STRATEGY_CODEX",
    lore: "Ancient wisdom for the modern era. Reveals the path through the fog of technical debt.",
    passive: "Clarity +99%",
    stat: "Risk: Minimized",
    rarity: "LEGENDARY",
    icon: <Lightbulb className="h-5 w-5" />,
    image: consultingImage,
  },
];

const Services: React.FC = () => {
  // --- FIXED SCROLL LOGIC ---
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  
  // "Press to Start" State
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Initial Setup
  useEffect(() => {
    // Check Mobile
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);

    // Force Dark Theme
    const originalBodyBg = document.body.style.backgroundColor;
    document.body.style.backgroundColor = "#0a0a0a";
    return () => {
      document.body.style.backgroundColor = originalBodyBg;
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <AnimatedPage>
      <Helmet>
        <title>Services | Plugged In</title>
        <meta name="description" content="Accessing Tech Archives..." />
      </Helmet>
      
      {/* WRAPPER: This adds the "Heavy" smooth scroll feel. */}
      <SmoothScroll>

      {/* --- HUD STYLES --- */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Syncopate:wght@400;700&display=swap');

        /* The "Merchant" Font Style */
        .font-hud { font-family: 'Space Mono', monospace; }
        .font-title { font-family: 'Syncopate', sans-serif; }

        /* Custom Scrollbar */
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #000; }
        ::-webkit-scrollbar-thumb { background: #333; border-radius: 3px; }
        
        /* Glitch Effect Class */
        .glitch-text:hover {
            text-shadow: 2px 0 #ff0000, -2px 0 #00ff00;
        }
        
        /* The "Item Card" Look */
        .archive-card {
            border: 1px solid rgba(255, 255, 255, 0.1);
            background: rgba(10, 10, 10, 0.6); /* Slightly lower opacity for better blur visibility */
            backdrop-filter: blur(24px); /* Increased blur as requested */
            transition: all 0.4s ease;
            /* PERFORMANCE: Promote to GPU layer */
            transform: translateZ(0); 
        }
        .archive-card:hover {
            border-color: rgba(192, 139, 107, 0.6);
            box-shadow: 0 0 30px rgba(192, 139, 107, 0.1);
        }

        /* Scanline Overlay */
        .scanlines {
            background: linear-gradient(
                to bottom,
                rgba(255,255,255,0),
                rgba(255,255,255,0) 50%,
                rgba(0,0,0,0.1) 50%,
                rgba(0,0,0,0.1)
            );
            background-size: 100% 4px;
            pointer-events: none;
        }
      `}</style>

      {/* --- PRESS TO START OVERLAY --- */}
      <AnimatePresence>
        {!hasStarted && (
            <motion.div 
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                transition={{ duration: 0.8 }}
                className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center cursor-pointer font-hud text-white"
                onClick={() => setHasStarted(true)}
                // PERFORMANCE: Hint browser to optimize for opacity changes
                style={{ willChange: "opacity, transform" }} 
            >
                <div className="absolute inset-0 scanlines opacity-20" />
                <motion.div 
                    animate={{ opacity: [0.5, 1, 0.5] }} 
                    transition={{ duration: 2, repeat: Infinity }}
                    className="mb-8 text-[#C08B6B] text-xs tracking-[0.3em]"
                >
                    SYSTEM READY // WAITING FOR INPUT
                </motion.div>
                <h1 className="text-4xl md:text-6xl font-title tracking-widest text-center hover:scale-105 transition-transform duration-300">
                    PRESS TO START
                </h1>
                <div className="mt-8 flex gap-4 text-xs text-white/30">
                      <span>[SECURE CONNECTION]</span>
                      <span>[V.2.0.4]</span>
                </div>
            </motion.div>
        )}
      </AnimatePresence>


      {/* --- MAIN CONTENT --- */}
      <div className={`relative min-h-screen bg-black text-white ${!hasStarted ? 'h-screen overflow-hidden' : ''}`}>
        
        {/* Background Video Layer (fixed effect, page-scoped) */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="sticky top-0 h-screen">
            <div className="absolute inset-0 bg-black/60 z-10" />
            <div className="absolute inset-0 scanlines z-20 opacity-10" />
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover opacity-40"
              // PERFORMANCE: Ensure video doesn't block main thread
              style={{ transform: "translateZ(0)" }} 
            >
              <source src={backgroundVideo} type="video/mp4" />
            </video>
          </div>
        </div>

        {/* --- HERO SECTION --- */}
        <section className="relative z-10 h-screen flex flex-col items-center justify-center p-4">
            <motion.div 
              style={{ opacity: heroOpacity, willChange: "opacity" }} 
              className="text-center space-y-6 max-w-4xl"
            >
                <div className="inline-block border border-white/20 px-4 py-1 rounded-full bg-white/5 backdrop-blur-sm">
                    <span className="font-hud text-xs text-[#C08B6B] tracking-[0.2em]">MERCHANT'S DEN // SERVICES</span>
                </div>
                <h1 className="text-6xl md:text-8xl font-title font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 leading-[0.9]">
                    TECH<br/>ARCHIVES
                </h1>
                <p className="font-hud text-sm md:text-base text-white/60 max-w-lg mx-auto leading-relaxed">
                    Browse our collection of high-grade digital artifacts. <br/>
                    Select a construct to inspect its properties.
                </p>
            </motion.div>
            
            {/* Scroll Indicator */}
            <motion.div 
                className="absolute bottom-12 left-1/2 -translate-x-1/2 font-hud text-[10px] text-white/40 tracking-widest flex flex-col items-center gap-2"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                SCROLL TO BROWSE
                <div className="h-12 w-[1px] bg-gradient-to-b from-white/0 via-white/50 to-white/0" />
            </motion.div>
        </section>


        {/* --- SERVICES (INVENTORY LIST STYLE) --- */}
        <div className="relative z-10 pb-20">
            {services.map((service, index) => (
                <section 
                    key={index} 
                    // UPDATED: bg-black/80 prevents overlapping glitch while maintaining semi-transparency
                    className="min-h-screen flex items-center justify-center p-4 md:p-12 sticky top-0 bg-black/80 backdrop-blur-md"
                >
                    <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
                        
                        {/* IMAGE SECTION (THE ITEM) 
                            - Order-2 on mobile (Bottom)
                            - Order-2 on desktop (Right) - (Keep consistent)
                            - w-3/4 on mobile (Smaller size & Centered)
                        */}
                        <motion.div 
                            className="lg:col-span-4 order-2 w-3/4 mx-auto lg:w-full"
                            // UPGRADED ANIMATION: Slide Up + Scale + Fade
                            initial={{ opacity: 0, y: 100, scale: 0.9, filter: "grayscale(100%)" }}
                            whileInView={{ opacity: 1, y: 0, scale: 1, filter: "grayscale(0%)" }}
                            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }} // Smooth Bezier
                            viewport={{ margin: "-10%", once: true }}
                            style={{ willChange: "opacity, transform, filter" }}
                        >
                            <div className="relative aspect-[4/3] md:aspect-[16/9] lg:aspect-[4/3] group overflow-hidden border border-white/10 bg-[#111] rounded-3xl">
                                {/* Decorative HUD corners */}
                                <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#C08B6B] z-20" />
                                <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[#C08B6B] z-20" />
                                
                                <img 
                                    src={service.image} 
                                    alt={service.title} 
                                    loading={index === 0 ? "eager" : "lazy"} 
                                    decoding="async" 
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100" 
                                />
                                
                                {/* Image Overlay Text */}
                                <div className="absolute bottom-4 left-4 font-hud text-xs text-white/50 bg-black/80 px-2 py-1 rounded-sm">
                                    IMG_SRC: {service.title}
                                </div>
                            </div>
                        </motion.div>

                        {/* TEXT/STATS SECTION (THE LORE) 
                            - Order-1 on mobile (Top)
                            - Order-1 on desktop (Left)
                        */}
                        <motion.div 
                            className="lg:col-span-8 order-1 flex flex-col gap-4 archive-card p-5 md:p-10 rounded-sm relative"
                            // UPGRADED ANIMATION: Slide Up with delay
                            initial={{ opacity: 0, y: 60 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                            viewport={{ margin: "-10%", once: true }}
                            style={{ willChange: "opacity, transform" }}
                        >
                            {/* Header */}
                            <div className="flex justify-between items-start border-b border-white/10 pb-4">
                                <div>
                                    <h2 className="font-title text-xl md:text-3xl font-bold uppercase glitch-text cursor-default">
                                        {service.title}
                                    </h2>
                                    <div className="font-hud text-xs text-[#C08B6B] mt-1 tracking-wider">
                                        // {service.subtitle}
                                    </div>
                                </div>
                                <Badge variant="outline" className="font-hud rounded-none border-white/20 text-xs py-1">
                                    {service.number}
                                </Badge>
                            </div>

                            {/* Rating & Rarity */}
                            <div className="flex items-center gap-4 font-hud text-xs">
                                <div className="flex text-[#C08B6B]">
                                    <Star className="w-3 h-3 fill-current" />
                                    <Star className="w-3 h-3 fill-current" />
                                    <Star className="w-3 h-3 fill-current" />
                                    <Star className="w-3 h-3 fill-current" />
                                    <Star className="w-3 h-3 fill-current" />
                                </div>
                                <span className="text-white/40">|</span>
                                <span className={
                                    service.rarity === 'LEGENDARY' ? 'text-yellow-400' : 
                                    service.rarity === 'MYTHIC' ? 'text-purple-400' : 
                                    service.rarity === 'EPIC' ? 'text-blue-400' : 'text-green-400'
                                }>
                                    {service.rarity} CLASS
                                </span>
                            </div>

                            {/* Description / Lore */}
                            <p className="font-hud text-sm text-white/70 leading-relaxed text-justify">
                                "{service.lore}"
                            </p>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-2 gap-4 mt-2">
                                <div className="bg-white/5 p-3 border border-white/10">
                                    <div className="flex items-center gap-2 text-xs text-white/50 font-hud mb-1">
                                        <ShieldCheck className="w-3 h-3" /> PASSIVE
                                    </div>
                                    <div className="text-sm font-bold text-white font-hud">
                                        {service.passive}
                                    </div>
                                </div>
                                <div className="bg-white/5 p-3 border border-white/10">
                                    <div className="flex items-center gap-2 text-xs text-white/50 font-hud mb-1">
                                        <Crosshair className="w-3 h-3" /> STAT
                                    </div>
                                    <div className="text-sm font-bold text-white font-hud">
                                        {service.stat}
                                    </div>
                                </div>
                            </div>

                            {/* Action Button */}
                            <button className="mt-4 w-full bg-[#C08B6B] hover:bg-[#a37053] text-black font-hud font-bold py-4 text-sm tracking-widest uppercase transition-colors flex items-center justify-center gap-2 group">
                                <span>Initialise Protocol</span>
                                <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </button>

                        </motion.div>
                    </div>
                </section>
            ))}
        </div>

      </div>
      </SmoothScroll>
    </AnimatedPage>
  );
};

export default Services;