import React, { useRef, useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  motion, 
  useScroll, 
  useTransform, 
  useSpring,
  MotionValue
} from "framer-motion";
import AnimatedPage from "../components/AnimatedPage";
import { 
  Brain,
  Database,
  Layers,
  Monitor,
  Users,
  Mic,
  Activity,
  ArrowRight,
  Cuboid
} from "lucide-react";
import InteractiveCanvasGrid from "../components/InteractiveCanvasGrid";

// --- ASSET IMPORT ---
import elsaDeviceImage from "../assets/Untitled@1-1536x730.png";

const ELSA = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smooth scroll
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Track global mouse coordinates for background spotlight
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty('--global-mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--global-mouse-y', `${e.clientY}px`);
    };
    window.addEventListener('mousemove', handleGlobalMouseMove);

    const originalBodyBg = document.body.style.backgroundColor;
    document.body.style.backgroundColor = "#020203";

    return () => {
      document.body.style.backgroundColor = originalBodyBg;
      window.removeEventListener('mousemove', handleGlobalMouseMove);
    };
  }, []);

  // --- ANIMATION TIMELINE ---
  // 1. DEVICE SCALE
  const deviceScale = useTransform(smoothProgress, 
    [0, 0.1, 0.3, 0.35, 0.9, 1], 
    [1, 0.6, 0.6, 0.35, 0.35, 1.4] 
  );

  // 2. DEVICE ROTATION
  const deviceRotate = useTransform(smoothProgress,
    [0, 0.1, 0.3],
    [0, -12, 0] 
  );

  // 3. DEVICE X POSITION
  const deviceX = useTransform(smoothProgress,
    [0, 0.15, 0.30, 0.35],
    ["0%", "35%", "35%", "0%"]
  );

  // 4. DEVICE Y POSITION (FIXED)
  const deviceY = useTransform(smoothProgress,
    [0, 0.1, 0.35, 1],
    ["0vh", "10vh", "0vh", "0vh"]
  );

  // --- TEXT ANIMATIONS ---
  const textOpacity = useTransform(smoothProgress, [0, 0.05], [0, 1]);
  const headerTextGlobalOpacity = useTransform(smoothProgress, [0.12, 0.15], [1, 0]);

  const textTopX = useTransform(smoothProgress, [0, 0.08, 0.15], ["0%", "-30%", "0%"]);
  const textTopY = useTransform(smoothProgress, [0, 0.08, 0.15], ["0%", "-120%", "-300%"]);
  
  const textBottomX = useTransform(smoothProgress, [0, 0.08, 0.15], ["0%", "30%", "0%"]);
  const textBottomY = useTransform(smoothProgress, [0, 0.08, 0.15], ["0%", "120%", "-300%"]);

  // --- "WHAT IS ELSA" ---
  const infoOpacity = useTransform(smoothProgress, [0.18, 0.20, 0.30, 0.32], [0, 1, 1, 0]);
  const infoX = useTransform(smoothProgress, [0.18, 0.20], ["-50%", "0%"]);

  // --- FEATURES HEADER ---
  const featuresHeaderOpacity = useTransform(smoothProgress, [0.32, 0.35, 0.9, 0.95], [0, 1, 1, 0]);

  const scrollIndicatorOpacity = useTransform(smoothProgress, [0, 0.02], [1, 0]);

  // --- INTRO INSPECT BUTTON ---
  const introButtonOpacity = useTransform(smoothProgress, [0, 0.08], [1, 0]);
  const introButtonPointerEvents = useTransform(smoothProgress, (v) => v > 0.08 ? 'none' : 'auto');

  // --- END CTA BUTTONS ---
  const buttonsOpacity = useTransform(smoothProgress, [0.94, 0.98], [0, 1]);
  const buttonsYPos = useTransform(smoothProgress, [0.94, 0.98], [20, 0]);
  const buttonsDisplay = useTransform(smoothProgress, (v) => v < 0.9 ? "none" : "flex");

  // --- FEATURE DATA ---
  const features = [
    {
      title: "Context-Aware",
      description: "Clicks vs long-presses.",
      icon: <Brain className="h-5 w-5" />,
    },
    {
      title: "Data-Enriched",
      description: "Sends key medical details.",
      icon: <Database className="h-5 w-5" />,
    },
    {
      title: "Tiered Escalation",
      description: "Caretakers then Emergency.",
      icon: <Layers className="h-5 w-5" />,
    },
    {
      title: "Centralized Hub",
      description: "Live dashboard status.",
      icon: <Monitor className="h-5 w-5" />,
    },
    {
      title: "Easy Setup",
      description: "Instant deployability.",
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: "Voice Triggers",
      description: "Hands-free activation.",
      icon: <Mic className="h-5 w-5" />,
    },
    {
      title: "Fall Detection",
      description: "Auto-detects falls.",
      icon: <Activity className="h-5 w-5" />,
    },
  ];

  return (
    <AnimatedPage>
      <Helmet>
        <title>E.L.S.A | Plugged In</title>
        <meta name="description" content="Emergency Link for Smart Alert." />
      </Helmet>

      {/* SCROLL CONTAINER */}
      <div 
        ref={containerRef} 
        style={{
          background: 'radial-gradient(circle 800px at var(--global-mouse-x, 50%) var(--global-mouse-y, 50%), rgba(231, 187, 85, 0.04) 0%, rgba(2, 2, 3, 1) 75%, #020203 100%)'
        }}
        className="relative h-[2000vh] text-white overflow-x-hidden" 
      >
        {/* Full-Screen Interactive Connected Particle Matrix Grid */}
        <InteractiveCanvasGrid />

        {/* Decorative Grid Mesh Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e7bb5503_1px,transparent_1px),linear-gradient(to_bottom,#e7bb5505_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none z-0" />
        
        {/* STICKY STAGE */}
        <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center">

          {/* --- STAGE 1: INTRO TEXT --- */}
          <motion.div 
            className="absolute z-0 flex flex-col items-center justify-center pointer-events-none w-full px-4"
            style={{ opacity: headerTextGlobalOpacity }}
          >
             <motion.h1 
               style={{ x: textTopX, y: textTopY, opacity: textOpacity }}
               className="font-display text-[#E7BB55] text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-widest text-center"
             >
               Emergency Link
             </motion.h1>
 
             <motion.h1 
                style={{ x: textBottomX, y: textBottomY, opacity: textOpacity }}
                className="font-display text-white text-4xl md:text-6xl lg:text-7xl font-extrabold uppercase tracking-wide mt-2 text-center"
             >
               For Smart Alert
             </motion.h1>
          </motion.div>

          {/* --- INTRO CTA BUTTON --- */}
          <motion.div
            style={{ 
              opacity: introButtonOpacity,
              pointerEvents: introButtonPointerEvents 
            }}
            className="absolute z-30 bottom-[20%] md:bottom-auto md:top-1/2 md:right-[15%] md:-translate-y-1/2 flex flex-col items-center md:items-start gap-4"
          >
            <h1 className="font-display text-[#E7BB55] text-6xl font-black tracking-widest mb-1">
              E.L.S.A
            </h1>

            <Button 
              variant="secondary" 
              size="default" 
              className="shadow-[0_0_20px_rgba(231,187,85,0.15)] border border-[#E7BB55]/30 bg-black text-[#E7BB55] hover:bg-[#E7BB55] hover:text-black hover:scale-105 transition-all duration-300 rounded-full gap-2 pl-4 pr-5 font-display font-bold uppercase tracking-wider text-xs"
              asChild
            >
              <Link to="/product-inspect">
                <Cuboid className="h-4 w-4 stroke-2" />
                <span>Touch to Inspect</span>
              </Link>
            </Button>
          </motion.div>


          {/* --- THE DEVICE --- */}
          <motion.div
            className="relative z-10 w-[90vw] md:w-[60vw] max-w-[1000px] aspect-video group" 
            style={{
              scale: deviceScale,
              x: deviceX,
              y: deviceY,
              rotate: deviceRotate, 
            }}
            transition={{ type: "spring", stiffness: 60, damping: 20 }}
          >
            {/* Ambient scanning aura */}
            <div className="absolute inset-0 bg-[#E7BB55]/5 filter blur-[60px] rounded-full pointer-events-none opacity-40 group-hover:opacity-80 transition-opacity duration-700" />
            
            <img 
              src={elsaDeviceImage} 
              alt="ELSA Device" 
              className="w-full h-full object-contain relative z-10"
            />

            {/* Futuristic target corner elements around the device view */}
            <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#E7BB55]/30 pointer-events-none z-20" />
            <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#E7BB55]/30 pointer-events-none z-20" />
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#E7BB55]/30 pointer-events-none z-20" />
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#E7BB55]/30 pointer-events-none z-20" />

            {/* Glowing scanning laser line */}
            <div className="absolute inset-x-4 top-0 bottom-0 bg-[linear-gradient(to_bottom,rgba(231,187,85,0)_40%,rgba(231,187,85,0.25)_50%,rgba(231,187,85,0)_60%)] bg-[size:100%_200%] pointer-events-none z-20 animate-laser-sweep" style={{ animationDuration: '4s' }} />
          </motion.div>


          {/* --- STAGE 2: CONTENT --- */}
          <motion.div 
            style={{ opacity: infoOpacity, x: infoX }}
            className="absolute left-[5%] md:left-[10%] top-[20%] md:top-1/4 max-w-2xl z-20 pointer-events-none"
          >
            <h2 className="font-display text-white text-4xl md:text-7xl font-extrabold mb-6 md:mb-8 leading-tight">
              What is <br/> <span className="text-[#E7BB55]">E.L.S.A?</span>
            </h2>
            <p className="text-zinc-300 text-base md:text-xl leading-relaxed font-modern bg-black/60 border border-zinc-800 backdrop-blur-md p-5 rounded-xl md:bg-transparent md:border-none md:backdrop-blur-none md:p-0">
              One of the core innovations we're developing is ELSA - Emergency Link for Smart Alert, a context-aware emergency response system.
            </p>
            {/* Box below description */}
            <div className="bg-black/75 border border-[#E7BB55]/15 rounded-lg p-5 md:p-6 backdrop-blur-md mt-6">
              <p className="text-zinc-400 text-sm md:text-base leading-relaxed font-modern font-medium">
                With a single or double press of a discreet button, users can trigger alerts to medical services or law enforcement, depending on the situation. ELSA's intelligent design ensures minimal false alarms, fast communication, and seamless integration with smart environments—making it a life-saving layer of security in modern homes.
              </p>
            </div>
          </motion.div>


          {/* --- STAGE 3: HEADER --- */}
          <motion.div 
            style={{ opacity: featuresHeaderOpacity }}
            className="absolute top-[12%] w-full z-20 text-center pointer-events-none"
          >
            <h2 className="font-display text-white text-4xl md:text-6xl font-black uppercase tracking-widest">
              Features of <span className="text-[#E7BB55]">E.L.S.A</span>
            </h2>
          </motion.div>


          {/* --- STAGE 4: ROTATING FEATURES --- */}
          {features.map((feature, index) => {
             const totalItems = features.length;
             const angleStep = 360 / totalItems;
             const targetAngleBase = 270; // Top
             
             // Calculate final slot
             const finalAngle = targetAngleBase + (index * angleStep);

             return (
               <FeatureOrb
                 key={index}
                 feature={feature}
                 index={index}
                 scrollProgress={smoothProgress}
                 finalAngle={finalAngle}
                 stayVisibleUntil={0.95} 
               />
             );
          })}

          {/* --- STAGE 5: CTA BUTTONS (END OF PAGE) --- */}
          <motion.div 
            style={{ 
              opacity: buttonsOpacity, 
              y: buttonsYPos,
              display: buttonsDisplay
            }}
            className="absolute bottom-[10%] md:bottom-[15%] z-50 flex-col sm:flex-row gap-4 justify-center w-full px-4"
          >
              <Button 
                size="lg" 
                className="text-sm font-display font-bold uppercase tracking-wider bg-[#E7BB55] text-black hover:bg-black hover:text-[#E7BB55] hover:border hover:border-[#E7BB55]/40 px-8 transition-transform duration-300 ease-in-out hover:scale-105 rounded shadow-[0_0_20px_rgba(231,187,85,0.2)]" 
                asChild
              >
                <Link to="/product-inspect"> 
                  Inspect the Product <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>

              <Button 
                variant="outline" 
                size="lg" 
                className="text-sm font-display font-bold uppercase tracking-wider bg-transparent border-[#E7BB55] text-[#E7BB55] hover:bg-[#E7BB55]/10 px-8 transition-transform duration-300 ease-in-out hover:scale-105 rounded" 
                asChild
              >
                <Link to="/contact">Contact Us</Link>
              </Button>
          </motion.div>


          {/* --- SCROLL INDICATOR --- */}
          <motion.div 
            style={{ opacity: scrollIndicatorOpacity }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-50 pointer-events-none"
          >
            <span className="font-display text-[#E7BB55] text-xs font-bold tracking-[0.2em] uppercase opacity-80 animate-pulse">
              Scroll to Discover
            </span>
            <div className="w-[30px] h-[50px] border-2 border-[#E7BB55]/40 rounded-full flex justify-center p-2 opacity-85">
              <motion.div 
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-1.5 h-1.5 bg-[#E7BB55] rounded-full"
              />
            </div>
          </motion.div>

        </div>

      </div>
    </AnimatedPage>
  );
};

// --- SUB-COMPONENT FOR ORBITING FEATURES WITH CONNECTION LINES ---
const FeatureOrb = ({ 
  feature, 
  index,
  scrollProgress, 
  finalAngle,
  stayVisibleUntil
}: { 
  feature: any, 
  index: number,
  scrollProgress: MotionValue<number>,
  finalAngle: number,
  stayVisibleUntil: number
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const animStart = 0.35;
  const animEnd = 0.90;
  
  // Stagger entry
  const entryDelay = 0.07 * index; 
  const myStart = animStart + entryDelay;
  
  // 1. Opacity
  const opacity = useTransform(scrollProgress, 
    [myStart, myStart + 0.05, stayVisibleUntil, stayVisibleUntil + 0.05], 
    [0, 1, 1, 0]
  );

  // 2. Angle Interpolation
  const currentAngle = useTransform(scrollProgress,
    [myStart, animEnd], 
    [90, finalAngle] 
  );

  // 3. Radius Configuration
  const radiusX = 38; // vmin
  const radiusY = 27; // vmin

  // Math: Convert Polar to Cartesian
  const x = useTransform(currentAngle, (a) => {
    const rad = (a * Math.PI) / 180;
    return `${Math.cos(rad) * radiusX}vmin`; 
  });
  
  const y = useTransform(currentAngle, (a) => {
    const rad = (a * Math.PI) / 180;
    return `${Math.sin(rad) * radiusY}vmin`; 
  });

  // Calculate negative vectors back to the absolute center of E.L.S.A
  const negX = useTransform(x, (v) => `-${v}`);
  const negY = useTransform(y, (v) => `-${v}`);

  return (
    <motion.div 
      style={{ x, y, opacity }}
      className="absolute top-1/2 left-[43%] -translate-x-1/2 -translate-y-1/2 z-30 flex justify-center items-center pointer-events-auto"
    >
      {/* Holographic Connecting Line */}
      <div className="absolute top-1/2 left-1/2 w-0 h-0 overflow-visible z-[-1] pointer-events-none">
        <svg className="overflow-visible w-0 h-0">
          <motion.line
            x1="0"
            y1="0"
            x2={negX}
            y2={negY}
            stroke="#E7BB55"
            strokeWidth={isHovered ? 2.5 : 1}
            strokeOpacity={isHovered ? 0.95 : 0.45}
            strokeDasharray={isHovered ? "none" : "6, 6"}
            animate={{ strokeDashoffset: [0, -24] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 1.2 }}
          />
        </svg>
      </div>

      <motion.div 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="
          w-[160px] md:w-[200px] 
          bg-black/90 backdrop-blur-md border border-[#E7BB55]/20 
          rounded-xl p-3.5 shadow-[0_0_15px_rgba(231,187,85,0.05)] cursor-default
          flex flex-col items-center text-center transition-all duration-300
        "
        whileHover={{ 
          scale: 1.1, 
          zIndex: 50,
          boxShadow: "0 0 25px rgba(231, 187, 85, 0.25)",
          borderColor: "rgba(231, 187, 85, 0.6)"
        }}
      >
        <div className="p-2 bg-[#E7BB55]/10 border border-[#E7BB55]/20 rounded-full mb-1 text-[#E7BB55] transition-colors duration-300">
          {feature.icon}
        </div>
        <h3 className="font-display text-[#E7BB55] text-sm font-bold leading-tight mb-1">
          {feature.title}
        </h3>
        <p className="text-zinc-400 text-[10px] md:text-xs leading-tight font-sans line-clamp-2">
          {feature.description}
        </p>
      </motion.div>
    </motion.div>
  );
};

export default ELSA;