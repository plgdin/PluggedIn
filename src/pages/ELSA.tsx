import React, { useRef } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom"; // Added Link
import { Button } from "@/components/ui/button"; // Added Button
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
  ArrowRight, // Added ArrowRight
  Cuboid // Added Cuboid for 3D icon
} from "lucide-react";

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

  // --- ANIMATION TIMELINE ---
  // 0.00 - 0.15: INTRO
  // 0.15 - 0.30: WHAT IS ELSA
  // 0.30 - 0.35: PREP (Center Product)
  // 0.35 - 0.90: CIRCLE ASSEMBLY
  // 0.90 - 1.00: OUTRO & CTA BUTTONS

  // 1. DEVICE SCALE
  // Stays small (0.35) from 0.35 to 0.90 (while features are visible)
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
  // Moves to 0vh (center) by 0.35 and STAYS THERE until the end.
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

  // --- INTRO INSPECT BUTTON (New) ---
  // Visible only at the very start (0 to 0.08), then fades out
  const introButtonOpacity = useTransform(smoothProgress, [0, 0.08], [1, 0]);
  // Hide pointer events when faded out so it doesn't block interactions
  const introButtonPointerEvents = useTransform(smoothProgress, (v) => v > 0.08 ? 'none' : 'auto');

  // --- END CTA BUTTONS ---
  // Appear at the very end of the scroll (0.94 to 1.0)
  const buttonsOpacity = useTransform(smoothProgress, [0.94, 0.98], [0, 1]);
  const buttonsYPos = useTransform(smoothProgress, [0.94, 0.98], [20, 0]);
  const buttonsDisplay = useTransform(smoothProgress, (v) => v < 0.9 ? "none" : "flex");

  // --- FEATURE DATA ---
  const features = [
    {
      title: "Context-Aware",
      description: "Clicks vs long-presses.",
      icon: <Brain className="h-5 w-5 text-[#C08B6B]" />,
    },
    {
      title: "Data-Enriched",
      description: "Sends key medical details.",
      icon: <Database className="h-5 w-5 text-[#C08B6B]" />,
    },
    {
      title: "Tiered Escalation",
      description: "Caretakers then Emergency.",
      icon: <Layers className="h-5 w-5 text-[#C08B6B]" />,
    },
    {
      title: "Centralized Hub",
      description: "Live dashboard status.",
      icon: <Monitor className="h-5 w-5 text-[#C08B6B]" />,
    },
    {
      title: "Easy Setup",
      description: "Instant deployability.",
      icon: <Users className="h-5 w-5 text-[#C08B6B]" />,
    },
    {
      title: "Voice Triggers",
      description: "Hands-free activation.",
      icon: <Mic className="h-5 w-5 text-[#C08B6B]" />,
    },
    {
      title: "Fall Detection",
      description: "Auto-detects falls.",
      icon: <Activity className="h-5 w-5 text-[#C08B6B]" />,
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
        className="relative h-[2000vh] bg-[#f0ebd8]" 
      >
        
        {/* STICKY STAGE */}
        <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center">

          {/* --- STAGE 1: INTRO TEXT --- */}
          <motion.div 
            className="absolute z-0 flex flex-col items-center justify-center pointer-events-none w-full px-4"
            style={{ opacity: headerTextGlobalOpacity }}
          >
             {/* REVERTED: Changed back to original "Emergency Link" */}
             <motion.h1 
               style={{ x: textTopX, y: textTopY, opacity: textOpacity }}
               className="font-serif text-[#3e2b26] text-5xl md:text-7xl lg:text-8xl tracking-wide text-center"
             >
               Emergency Link
             </motion.h1>

             <motion.h1 
                style={{ x: textBottomX, y: textBottomY, opacity: textOpacity }}
                className="font-serif text-[#3e2b26] text-4xl md:text-6xl lg:text-7xl italic tracking-wide mt-2 text-center"
             >
               For Smart Alert
             </motion.h1>
          </motion.div>

          {/* --- INTRO CTA BUTTON (NEW ADDITION) --- */}
          {/* Floats near the product at start, fades out on scroll */}
          <motion.div
            style={{ 
              opacity: introButtonOpacity,
              pointerEvents: introButtonPointerEvents 
            }}
            // ADDED: flex, flex-col, and gap-4 to stack the Header and Button
            className="absolute z-30 bottom-[20%] md:bottom-auto md:top-1/2 md:right-[15%] md:-translate-y-1/2 flex flex-col items-center md:items-start gap-4"
          >
            {/* ADDED: E.L.S.A Header here as requested */}
            <h1 className="font-serif text-[#3e2b26] text-6xl font-bold tracking-tight">
              E.L.S.A
            </h1>

            <Button 
              variant="secondary" 
              size="default" 
              className="shadow-xl border border-[#3e2b26]/20 bg-white/80 backdrop-blur-md hover:bg-white hover:scale-105 transition-all duration-300 text-[#3e2b26] rounded-full gap-2 pl-4 pr-5"
              asChild
            >
              <Link to="/product-inspect">
                <Cuboid className="h-5 w-5 stroke-1" />
                <span className="font-serif tracking-wide">Touch to Inspect</span>
              </Link>
            </Button>
          </motion.div>


          {/* --- THE DEVICE --- */}
          <motion.div
            className="relative z-10 w-[90vw] md:w-[60vw] max-w-[1000px] aspect-video" 
            style={{
              scale: deviceScale,
              x: deviceX,
              y: deviceY,
              rotate: deviceRotate, 
            }}
            transition={{ type: "spring", stiffness: 60, damping: 20 }}
          >
            <img 
              src={elsaDeviceImage} 
              alt="ELSA Device" 
              className="w-full h-full object-contain"
            />
          </motion.div>


          {/* --- STAGE 2: CONTENT --- */}
          <motion.div 
            style={{ opacity: infoOpacity, x: infoX }}
            // WIDER CONTAINER (max-w-2xl) to stretch towards the product
            className="absolute left-[5%] md:left-[10%] top-[20%] md:top-1/4 max-w-2xl z-20 pointer-events-none"
          >
            <h2 className="font-serif text-[#3e2b26] text-4xl md:text-7xl mb-6 md:mb-8 leading-tight">
              What is <br/> E.L.S.A?
            </h2>
            <p className="text-[#3e2b26] text-base md:text-xl leading-relaxed font-serif bg-white/30 backdrop-blur-sm p-4 rounded-xl md:bg-transparent md:backdrop-blur-none md:p-0">
              One of the core innovations we're developing is ELSA - Emergency Link for Smart Alert, a context-aware emergency response system.
            </p>
            {/* Box below description */}
            <div className="bg-[#3e2b26]/5 border border-[#3e2b26]/10 rounded-lg p-4 md:p-6 backdrop-blur-sm mt-6">
              <p className="text--[#3e2b26] text-sm md:text-base leading-relaxed font-sans">
                With a single or double press of a discreet button, users can trigger alerts to medical services or law enforcement, depending on the situation. ELSA's intelligent design ensures minimal false alarms, fast communication, and seamless integration with smart environments—making it a life-saving layer of security in modern homes.
              </p>
            </div>
          </motion.div>


          {/* --- STAGE 3: HEADER (FIXED HIGH) --- */}
          <motion.div 
            style={{ opacity: featuresHeaderOpacity }}
            className="absolute top-[12%] w-full z-20 text-center pointer-events-none"
          >
            <h2 className="font-serif text-[#3e2b26] text-4xl md:text-6xl font-bold">
              Features of E.L.S.A
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
            // Absolute positioning at bottom to clear the enlarged device
            className="absolute bottom-[10%] md:bottom-[15%] z-50 flex-col sm:flex-row gap-4 justify-center w-full px-4"
          >
              <Button 
                size="lg" 
                className="text-lg px-8 transition-transform duration-300 ease-in-out hover:scale-105" 
                asChild
              >
                {/* Linked to the correct route */}
                <Link to="/product-inspect"> 
                  Inspect the Product <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>

              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg px-8 bg-transparent border-[#3e2b26] text-[#3e2b26] hover:bg-[#3e2b26]/10 transition-transform duration-300 ease-in-out hover:scale-105" 
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
            <span className="font-serif text-[#3e2b26] text-sm tracking-[0.2em] uppercase opacity-80 animate-pulse">
              Scroll to Discover
            </span>
            <div className="w-[30px] h-[50px] border-2 border-[#3e2b26] rounded-full flex justify-center p-2 opacity-80">
              <motion.div 
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-1.5 h-1.5 bg-[#3e2b26] rounded-full"
              />
            </div>
          </motion.div>

        </div>

      </div>
    </AnimatedPage>
  );
};

// --- SUB-COMPONENT FOR ORBITING FEATURES ---
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
  // Start: 90 (Bottom) -> End: finalAngle
  const currentAngle = useTransform(scrollProgress,
    [myStart, animEnd], 
    [90, finalAngle] 
  );

  // 3. Radius Configuration
  const radiusX = 38; // vmin
  const radiusY = 27; // vmin (Squashed vertically as requested)

  // Math: Convert Polar to Cartesian
  const x = useTransform(currentAngle, (a) => {
    const rad = (a * Math.PI) / 180;
    return `${Math.cos(rad) * radiusX}vmin`; 
  });
  
  const y = useTransform(currentAngle, (a) => {
    const rad = (a * Math.PI) / 180;
    return `${Math.sin(rad) * radiusY}vmin`; 
  });

  return (
    <motion.div 
      style={{ x, y, opacity }}
      // Fixed center positioning (left-[43%] maintained from request)
      className="absolute top-1/2 left-[43%] -translate-x-1/2 -translate-y-1/2 z-30 flex justify-center items-center pointer-events-auto"
    >
      <motion.div 
        className="
          w-[160px] md:w-[200px] 
          bg-white/95 backdrop-blur-sm border border-[#3e2b26]/10 
          rounded-xl p-3 shadow-md cursor-default
          flex flex-col items-center text-center
        "
        whileHover={{ 
          scale: 1.1, 
          zIndex: 50,
          boxShadow: "0 10px 30px rgba(62, 43, 38, 0.25)",
          borderColor: "rgba(192, 139, 107, 0.6)"
        }}
      >
        <div className="p-1.5 bg-[#f0ebd8] rounded-full mb-1">
          {feature.icon}
        </div>
        <h3 className="font-serif text-[#3e2b26] text-sm font-bold leading-tight mb-1">
          {feature.title}
        </h3>
        <p className="text-[#3e2b26]/80 text-[10px] md:text-xs leading-tight font-sans line-clamp-2">
          {feature.description}
        </p>
      </motion.div>
    </motion.div>
  );
};

export default ELSA;