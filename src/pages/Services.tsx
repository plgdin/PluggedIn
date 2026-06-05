import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { 
  Code, 
  Smartphone, 
  Cpu, 
  CloudCog, 
  Zap, 
  Lightbulb, 
  ArrowRight, 
  Terminal, 
  ChevronRight, 
  Monitor, 
  Database, 
  Network,
  Cpu as ChipIcon,
  LineChart
} from "lucide-react";
import AnimatedPage from "../components/AnimatedPage";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import SmoothScroll from "../components/SmoothScroll"; 
import InteractiveCanvasGrid from "../components/InteractiveCanvasGrid";

// --- IMPORT ASSETS ---
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
  image: string;
  icon: React.ReactNode;
}

// --- SERVICES DATA ---
const services: Service[] = [
  {
    number: "01",
    title: "Website Development", 
    subtitle: "WEB_DEV_PROTOCOL",
    lore: "High-performance web frameworks crafted to load instantly, feel buttery smooth, and capture search presence with absolute optimization.",
    passive: "Search Visibility +45%",
    stat: "Load Speed: S-Tier",
    image: websiteDevImage,
    icon: <Code className="h-5 w-5" />
  },
  {
    number: "02",
    title: "App Development",
    subtitle: "APP_CONSTRUCT_V2",
    lore: "Fully native and cross-platform mobile environments built to keep users engaged and deliver smooth, fluid interactions.",
    passive: "User Engagement +60%",
    stat: "Haptics: Optimized",
    image: appDevImage,
    icon: <Smartphone className="h-5 w-5" />
  },
  {
    number: "03",
    title: "Custom Software",
    subtitle: "CUSTOM_CORE.EXE",
    lore: "Bespoke operations platforms built to automate workflows, connect fragmented databases, and eliminate structural inefficiencies.",
    passive: "Workflow Drag -80%",
    stat: "Scalability: Infinite",
    image: softwareDevImage,
    icon: <CloudCog className="h-5 w-5" />
  },
  {
    number: "04",
    title: "IoT Solutions",
    subtitle: "IOT_NEURAL_LINK",
    lore: "Edge device networks that bridge real-world hardware nodes to real-time cloud data pipelines with ultra-low latency.",
    passive: "Connectivity +100%",
    stat: "Latency: Near Zero",
    image: iotSolImage,
    icon: <Zap className="h-5 w-5" />
  },
  {
    number: "05",
    title: "Custom Devices",
    subtitle: "HARDWARE_FORGE",
    lore: "Bespoke PCB design, mechanical engineering, and micro-controller software designed to bring physical hardware to market.",
    passive: "Innovation Aura +30%",
    stat: "Durability: Maximum",
    image: customDevImage,
    icon: <Cpu className="h-5 w-5" />
  },
  {
    number: "06",
    title: "Tech Consulting",
    subtitle: "STRATEGY_CODEX",
    lore: "Advanced systems audits, architectural planning, and technology roadmap consulting to navigate and resolve technical debt.",
    passive: "Clarity +99%",
    stat: "Risk: Minimized",
    image: consultingImage,
    icon: <Lightbulb className="h-5 w-5" />
  },
];

// --- TELEMETRY GRAPHICS (SVG WIDGETS) ---

// 1. Website Development: Typing brackets console
const WebTelemetryWidget: React.FC = () => {
  const [typedLines, setTypedLines] = useState<string[]>([]);
  const codeLines = [
    "import { WebBuilder } from 'core';",
    "const site = new WebBuilder({ fast: true });",
    "site.injectStyles({ theme: 'gold' });",
    "site.compile(); // S-Tier Load",
    "// Render Success 200 OK"
  ];

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTypedLines(prev => [...prev, codeLines[index]]);
      index++;
      if (index >= codeLines.length) {
        clearInterval(interval);
      }
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full bg-[#060608] border border-[#E7BB55]/20 rounded-xl p-4 flex flex-col font-mono text-[10px] text-zinc-400 overflow-hidden relative min-h-[160px]">
      <div className="flex justify-between items-center border-b border-[#E7BB55]/10 pb-2 mb-2">
        <span className="text-white flex items-center gap-1.5"><Terminal className="w-3.5 h-3.5 text-[#E7BB55]" /> WEB_IDE_SIMULATOR</span>
        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
      </div>
      <div className="flex-1 space-y-1.5 overflow-y-auto">
        {typedLines.map((line, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, x: -5 }} 
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className={i === 4 ? "text-[#E7BB55]" : ""}
          >
            {`> ${line}`}
          </motion.div>
        ))}
        <div className="w-1.5 h-3.5 bg-[#E7BB55] animate-pulse inline-block" />
      </div>
    </div>
  );
};

// 2. App Development: Dual Sliding Mobile Mockup
const AppTelemetryWidget: React.FC = () => {
  return (
    <div className="w-full h-full bg-[#060608] border border-[#E7BB55]/20 rounded-xl p-4 flex items-center justify-center min-h-[160px] relative overflow-hidden">
      <div className="absolute top-2 left-4 font-mono text-[9px] text-[#E7BB55]/60 uppercase tracking-widest">
        MOBILE_FRAMEWORK
      </div>
      <div className="w-20 h-36 border-2 border-zinc-700 rounded-2xl relative bg-zinc-950 flex flex-col items-center p-1.5 shadow-[0_0_20px_rgba(231,187,85,0.05)]">
        {/* Notch */}
        <div className="w-8 h-2 bg-zinc-800 rounded-full mb-2" />
        
        {/* Content Slider */}
        <div className="w-full flex-1 rounded bg-[#060608] overflow-hidden relative">
          <motion.div
            className="w-[200%] h-full flex absolute left-0 top-0"
            animate={{ x: ["0%", "-50%", "-50%", "0%", "0%"] }}
            transition={{ repeat: Infinity, duration: 8, ease: "easeInOut", times: [0, 0.45, 0.5, 0.95, 1] }}
          >
            {/* Screen 1 */}
            <div className="w-1/2 h-full p-2 flex flex-col justify-between">
              <div className="space-y-1">
                <div className="w-full h-2 bg-[#E7BB55]/20 rounded" />
                <div className="w-2/3 h-1.5 bg-[#E7BB55]/10 rounded" />
              </div>
              <div className="w-full aspect-[4/3] bg-zinc-900 rounded border border-[#E7BB55]/10 flex items-center justify-center">
                <Smartphone className="w-5 h-5 text-[#E7BB55] opacity-50" />
              </div>
            </div>
            {/* Screen 2 */}
            <div className="w-1/2 h-full p-2 flex flex-col justify-between">
              <div className="space-y-1">
                <div className="w-full h-2 bg-zinc-800 rounded" />
                <div className="w-1/2 h-1.5 bg-zinc-900 rounded" />
              </div>
              <div className="space-y-1.5">
                <div className="w-full h-3 bg-zinc-800 rounded flex justify-between px-1 items-center">
                  <div className="w-4 h-1.5 bg-green-500 rounded-full" />
                  <div className="w-2 h-1.5 bg-zinc-600 rounded-full" />
                </div>
                <div className="w-full h-3 bg-zinc-800 rounded flex justify-between px-1 items-center">
                  <div className="w-4 h-1.5 bg-[#E7BB55] rounded-full" />
                  <div className="w-2 h-1.5 bg-zinc-600 rounded-full" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// 3. Custom Software: Data Pipeline Cylinders
const SoftwareTelemetryWidget: React.FC = () => {
  return (
    <div className="w-full h-full bg-[#060608] border border-[#E7BB55]/20 rounded-xl p-4 flex flex-col justify-between min-h-[160px] relative overflow-hidden font-mono text-[9px]">
      <div className="flex justify-between items-center text-[#E7BB55] border-b border-[#E7BB55]/10 pb-2">
        <span>LOGIC_PIPELINE</span>
        <span>SYS: 99.8%</span>
      </div>
      <div className="flex justify-around items-center flex-1 py-4">
        {/* Node A */}
        <div className="flex flex-col items-center gap-1">
          <Database className="w-6 h-6 text-[#E7BB55] animate-pulse" />
          <span className="text-zinc-500">DB_CORE</span>
        </div>
        {/* Connection Pulse */}
        <div className="relative w-12 h-1 bg-zinc-800 rounded">
          <motion.div 
            className="absolute top-0 bottom-0 bg-[#E7BB55] rounded-full"
            animate={{ left: ["0%", "100%"], width: ["20%", "40%", "20%"] }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          />
        </div>
        {/* Node B */}
        <div className="flex flex-col items-center gap-1">
          <Network className="w-6 h-6 text-white" />
          <span className="text-zinc-500">NET_HUB</span>
        </div>
      </div>
    </div>
  );
};

// 4. IoT Solutions: Radiating wireless nodes
const IotTelemetryWidget: React.FC = () => {
  return (
    <div className="w-full h-full bg-[#060608] border border-[#E7BB55]/20 rounded-xl p-4 flex items-center justify-center min-h-[160px] relative overflow-hidden">
      <div className="absolute top-2 left-4 font-mono text-[9px] text-[#E7BB55]/60">
        NEURAL_MESH_STATUS
      </div>
      <div className="relative flex items-center justify-center">
        {/* Concentric rings */}
        <motion.div 
          className="absolute border border-[#E7BB55]/30 rounded-full w-24 h-24"
          animate={{ scale: [0.3, 1.3], opacity: [1, 0] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "easeOut" }}
        />
        <motion.div 
          className="absolute border border-[#E7BB55]/20 rounded-full w-24 h-24 animate-ping"
          style={{ animationDuration: '4s' }}
        />
        <div className="w-8 h-8 rounded-full bg-black border-2 border-[#E7BB55] flex items-center justify-center z-10">
          <Zap className="w-4 h-4 text-[#E7BB55]" />
        </div>
      </div>
    </div>
  );
};

// 5. Custom Devices: PCB trace line
const DeviceTelemetryWidget: React.FC = () => {
  return (
    <div className="w-full h-full bg-[#060608] border border-[#E7BB55]/20 rounded-xl p-4 flex flex-col justify-between min-h-[160px] relative overflow-hidden font-mono text-[9px]">
      <div className="text-[#E7BB55] border-b border-[#E7BB55]/10 pb-2">
        HARDWARE_TRACE
      </div>
      <div className="flex-1 flex items-center justify-center py-2 relative">
        <svg className="w-32 h-20" viewBox="0 0 100 60">
          {/* Circuit Paths */}
          <path d="M 10,30 L 40,30 L 50,15 L 80,15" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />
          <path d="M 10,30 L 40,30 L 50,45 L 80,45" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />
          {/* Active Traced Path */}
          <motion.path 
            d="M 10,30 L 40,30 L 50,15 L 80,15" 
            fill="none" 
            stroke="#E7BB55" 
            strokeWidth="1.5"
            strokeDasharray="100"
            animate={{ strokeDashoffset: [100, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
          />
          <motion.path 
            d="M 10,30 L 40,30 L 50,45 L 80,45" 
            fill="none" 
            stroke="#E7BB55" 
            strokeWidth="1.5"
            strokeDasharray="100"
            animate={{ strokeDashoffset: [100, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "linear", delay: 1.5 }}
          />
          {/* Chip Center */}
          <rect x="36" y="22" width="16" height="16" rx="2" fill="#000" stroke="#E7BB55" strokeWidth="1.5" />
          <rect x="42" y="28" width="4" height="4" fill="#E7BB55" className="animate-pulse" />
        </svg>
      </div>
    </div>
  );
};

// 6. Tech Consulting: Bezier graph trends
const ConsultingTelemetryWidget: React.FC = () => {
  return (
    <div className="w-full h-full bg-[#060608] border border-[#E7BB55]/20 rounded-xl p-4 flex flex-col justify-between min-h-[160px] relative overflow-hidden font-mono text-[9px]">
      <div className="flex justify-between items-center text-[#E7BB55] border-b border-[#E7BB55]/10 pb-2">
        <span>ARCHITECTURAL_AUDIT</span>
        <span>DEBT: -80%</span>
      </div>
      <div className="flex-1 relative mt-2">
        <svg className="w-full h-24" viewBox="0 0 100 50">
          {/* Grid lines */}
          <line x1="0" y1="10" x2="100" y2="10" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
          <line x1="0" y1="25" x2="100" y2="25" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
          <line x1="0" y1="40" x2="100" y2="40" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
          {/* Trend line */}
          <motion.path
            d="M 0,45 Q 25,40 50,25 T 100,5"
            fill="none"
            stroke="#E7BB55"
            strokeWidth="1.5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          />
          <motion.circle
            cx="100"
            cy="5"
            r="3"
            fill="#E7BB55"
            animate={{ scale: [1, 2, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </svg>
      </div>
    </div>
  );
};

// Map configurations containing unique styles and entrance transitions for each active workspace
const serviceConfigs = [
  {
    type: 'web',
    rarity: 'ALPHA PROTOCOL',
    metric: 'LOAD_SPEED: S-TIER',
    cardClass: "border-[#E7BB55]/30 bg-[#040406]/90 shadow-[0_0_20px_rgba(231,187,85,0.05)]",
    tagColor: "text-[#E7BB55]",
    btnClass: "bg-black text-[#E7BB55] border-[#E7BB55]/30 hover:bg-[#E7BB55] hover:text-black",
    visualizer: <WebTelemetryWidget />,
    variants: {
      initial: { x: -80, opacity: 0 },
      animate: { x: 0, opacity: 1 },
      exit: { x: 80, opacity: 0 },
      transition: { type: "spring", stiffness: 90, damping: 14 }
    }
  },
  {
    type: 'app',
    rarity: 'OMNI CONSTRUCT',
    metric: 'HAPTICS: ENABLED',
    cardClass: "border-zinc-700 bg-zinc-950/85 shadow-[0_0_20px_rgba(255,255,255,0.02)]",
    tagColor: "text-white/90",
    btnClass: "bg-white text-black hover:bg-black hover:text-white border-white/20",
    visualizer: <AppTelemetryWidget />,
    variants: {
      initial: { rotateY: 90, opacity: 0 },
      animate: { rotateY: 0, opacity: 1 },
      exit: { rotateY: -90, opacity: 0 },
      transition: { duration: 0.6, ease: "easeOut" }
    }
  },
  {
    type: 'software',
    rarity: 'BESPOKE LOGIC',
    metric: 'SCALABILITY: MAX',
    cardClass: "border-zinc-800 bg-[#070709]/95 shadow-[0_0_15px_rgba(231,187,85,0.02)]",
    tagColor: "text-[#E7BB55]/80",
    btnClass: "bg-[#E7BB55]/10 text-white border-[#E7BB55]/20 hover:bg-[#E7BB55] hover:text-black",
    visualizer: <SoftwareTelemetryWidget />,
    variants: {
      initial: { scale: 0.7, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
      exit: { scale: 0.7, opacity: 0 },
      transition: { type: "spring", stiffness: 100, damping: 12 }
    }
  },
  {
    type: 'iot',
    rarity: 'NEURAL LINK',
    metric: 'LATENCY: < 2ms',
    cardClass: "border-[#E7BB55]/20 bg-black/90 shadow-[0_0_30px_rgba(231,187,85,0.08)]",
    tagColor: "text-[#E7BB55]",
    btnClass: "bg-black text-[#E7BB55] border-[#E7BB55]/40 hover:border-[#E7BB55] hover:shadow-[0_0_15px_rgba(231,187,85,0.3)]",
    visualizer: <IotTelemetryWidget />,
    variants: {
      initial: { clipPath: "circle(0% at 50% 50%)", opacity: 0 },
      animate: { clipPath: "circle(100% at 50% 50%)", opacity: 1 },
      exit: { clipPath: "circle(0% at 50% 50%)", opacity: 0 },
      transition: { duration: 0.8, ease: "easeInOut" }
    }
  },
  {
    type: 'device',
    rarity: 'HARDWARE FORGE',
    metric: 'THERMALS: STABLE',
    cardClass: "border-zinc-850 bg-zinc-900/80 shadow-[0_0_20px_rgba(255,255,255,0.03)]",
    tagColor: "text-zinc-300",
    btnClass: "bg-zinc-800 text-white hover:bg-white hover:text-black border-none",
    visualizer: <DeviceTelemetryWidget />,
    variants: {
      initial: { y: -80, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      exit: { y: 80, opacity: 0 },
      transition: { type: "spring", stiffness: 80, damping: 13 }
    }
  },
  {
    type: 'consulting',
    rarity: 'STRATEGY CODEX',
    metric: 'RISK RATIO: MIN',
    cardClass: "border-[#E7BB55]/45 bg-[#0f0e0b]/95 shadow-[0_0_30px_rgba(231,187,85,0.2)]",
    tagColor: "text-[#E7BB55]",
    btnClass: "bg-[#E7BB55] text-black border-none hover:bg-black hover:text-[#E7BB55] hover:border hover:border-[#E7BB55]/50",
    visualizer: <ConsultingTelemetryWidget />,
    variants: {
      initial: { x: 100, skewX: -6, opacity: 0 },
      animate: { x: 0, skewX: 0, opacity: 1 },
      exit: { x: -100, skewX: 6, opacity: 0 },
      transition: { duration: 0.65, ease: "easeOut" }
    }
  }
];

const Services: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState<number>(0);

  // Setup cursor global position tracking for background spotlight
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

  const activeService = services[activeIdx];
  const config = serviceConfigs[activeIdx];

  return (
    <AnimatedPage>
      <Helmet>
        <title>Our Services | Plugged In</title>
        <meta name="description" content="Explore custom website development, mobile apps, enterprise custom software, IoT neural links, hardware engineering, and strategy consulting." />
      </Helmet>
      
      <SmoothScroll>
        {/* Terminal CSS Styles */}
        <style>{`
          .font-hud { font-family: 'Space Mono', monospace; }
          .font-title { font-family: 'Syncopate', sans-serif; }
          
          .terminal-sidebar {
              border-right: 1px solid rgba(231, 187, 85, 0.15);
              background: rgba(4, 4, 6, 0.85);
              backdrop-filter: blur(15px);
          }

          .terminal-glow {
              box-shadow: 0 0 30px rgba(231, 187, 85, 0.08);
          }

          .tech-corners::before {
              content: '';
              position: absolute;
              top: 0; left: 0; width: 8px; height: 8px;
              border-t: 2px solid #E7BB55;
              border-l: 2px solid #E7BB55;
              pointer-events: none;
          }
        `}</style>

        {/* Main Page Wrapper with moving mouse spotlight */}
        <div 
          style={{
            background: 'radial-gradient(circle 800px at var(--global-mouse-x, 50%) var(--global-mouse-y, 50%), rgba(231, 187, 85, 0.04) 0%, rgba(2, 2, 3, 1) 75%, #020203 100%)'
          }}
          className="relative min-h-screen overflow-x-hidden text-white font-modern transition-colors duration-500 pt-20 pb-16"
        >
          {/* Full-Screen Interactive Connected Particle Matrix Grid */}
          <InteractiveCanvasGrid />

          {/* Decorative Grid Mesh Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e7bb5503_1px,transparent_1px),linear-gradient(to_bottom,#e7bb5505_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none z-0" />

          <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 space-y-8">
            
            {/* Header Readout Bar */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-[#E7BB55]/10 pb-6 gap-4">
              <div>
                <div className="inline-flex items-center gap-2 border border-[#E7BB55]/30 px-3 py-0.5 rounded bg-black/60 backdrop-blur-md mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E7BB55] animate-ping" />
                  <span className="font-hud text-[9px] text-[#E7BB55] tracking-widest">SYS_SERVICE_CATALOG // DIRECT_BOOT</span>
                </div>
                <h1 className="font-tech text-3xl md:text-5xl font-black tracking-widest text-white">
                  CORE <span className="text-[#E7BB55]">CAPABILITIES</span>
                </h1>
              </div>
              <div className="font-hud text-[10px] text-zinc-500 flex flex-col items-end">
                <span>SECTOR: DIGITAL_COMMERCE</span>
                <span>STATUS: OPERATIONAL_OK</span>
              </div>
            </div>

            {/* Split Console Terminal Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch min-h-[580px]">
              
              {/* Left Column: Technical Navigation Console */}
              <div className="lg:col-span-4 flex flex-col justify-between border border-[#E7BB55]/20 bg-[#040406]/95 rounded-xl p-6 terminal-glow relative overflow-hidden">
                {/* Decorative border grid lines */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#E7BB55]" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#E7BB55]" />

                <div className="space-y-6">
                  <div className="font-hud text-[10px] text-[#E7BB55] tracking-widest border-b border-[#E7BB55]/10 pb-2 flex justify-between items-center">
                    <span>SELECT PROTOCOL</span>
                    <span>[6 ACTIVE]</span>
                  </div>

                  {/* Vertically stacked service navigation buttons */}
                  <div className="space-y-2.5">
                    {services.map((svc, i) => {
                      const isActive = activeIdx === i;
                      return (
                        <button
                          key={i}
                          onClick={() => setActiveIdx(i)}
                          className={`w-full flex items-center justify-between p-3.5 rounded-lg border font-tech text-xs tracking-wider uppercase transition-all duration-300 ${
                            isActive
                              ? "bg-[#E7BB55]/10 border-[#E7BB55] text-white shadow-[0_0_15px_rgba(231,187,85,0.1)]"
                              : "bg-black/40 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span className={`font-hud text-[10px] ${isActive ? "text-[#E7BB55]" : "text-zinc-600"}`}>
                              ({svc.number})
                            </span>
                            <span>{svc.title}</span>
                          </div>
                          <ChevronRight className={`w-3.5 h-3.5 transition-transform duration-300 ${isActive ? "text-[#E7BB55] translate-x-0.5" : "text-zinc-700"}`} />
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Subsystem Telemetry Readout */}
                <div className="mt-8 border-t border-[#E7BB55]/10 pt-4 font-hud text-[9px] text-zinc-500 space-y-1.5">
                  <div className="flex justify-between">
                    <span>SECTOR_LOAD:</span>
                    <span className="text-white">STABLE // 12.4ms</span>
                  </div>
                  <div className="flex justify-between">
                    <span>INTELLIGENCE_MESH:</span>
                    <span className="text-[#E7BB55]">CONNECTED</span>
                  </div>
                  <div className="flex justify-between">
                    <span>DIAG_WIDGET:</span>
                    <span className="text-zinc-400 uppercase">{config.type}_DECOR_ACTIVE</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Main Console Workspace with Custom transitions per active tab */}
              <div className="lg:col-span-8 flex flex-col">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIdx}
                    initial={config.variants.initial}
                    animate={config.variants.animate}
                    exit={config.variants.exit}
                    transition={config.variants.transition as any}
                    className={`flex-1 border p-6 md:p-8 rounded-xl relative flex flex-col justify-between overflow-hidden transition-all duration-300 ${config.cardClass}`}
                  >
                    {/* Corner Tech Markings */}
                    <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#E7BB55]" />
                    <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[#E7BB55]" />

                    {/* Content Top: Header readout */}
                    <div className="space-y-4">
                      <div className="flex justify-between items-start border-b border-[#E7BB55]/10 pb-4">
                        <div>
                          <div className="font-hud text-[10px] text-[#E7BB55]/60 uppercase tracking-widest mb-1 flex items-center gap-1.5">
                            {activeService.icon}
                            <span>{activeService.subtitle}</span>
                          </div>
                          <h2 className="font-tech text-2xl md:text-4xl font-black uppercase tracking-wider text-white">
                            {activeService.title}
                          </h2>
                        </div>
                        <span className="font-hud text-xs text-[#E7BB55]/40 border border-[#E7BB55]/20 px-2.5 py-1 rounded bg-[#E7BB55]/5">
                          SEC_{activeService.number}
                        </span>
                      </div>

                      {/* Content Middle: Description & custom telemetry columns */}
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch pt-2">
                        {/* Text detail / Metrics (7 cols) */}
                        <div className="md:col-span-7 flex flex-col justify-between space-y-4">
                          <p className="font-modern text-sm text-zinc-300 leading-relaxed text-justify">
                            "{activeService.lore}"
                          </p>

                          {/* Detail readouts */}
                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-black/50 p-4 border border-[#E7BB55]/10 rounded-lg">
                              <div className="text-[9px] text-[#E7BB55]/60 font-tech mb-1 uppercase tracking-widest">
                                PRIMARY_IMPACT
                              </div>
                              <div className="text-xs font-hud font-bold text-white">
                                {activeService.passive}
                              </div>
                            </div>
                            <div className="bg-black/50 p-4 border border-[#E7BB55]/10 rounded-lg">
                              <div className="text-[9px] text-[#E7BB55]/60 font-tech mb-1 uppercase tracking-widest">
                                SYSTEM_TELEMETRY
                              </div>
                              <div className="text-xs font-hud font-bold text-white">
                                {activeService.stat}
                              </div>
                            </div>
                          </div>

                          <div className="font-hud text-[10px] flex items-center gap-3 text-zinc-500 uppercase border-t border-[#E7BB55]/10 pt-4">
                            <span className={config.tagColor}>{config.rarity}</span>
                            <span>|</span>
                            <span>{config.metric}</span>
                          </div>
                        </div>

                        {/* Interactive Diagnostic SVG widget (5 cols) */}
                        <div className="md:col-span-5 flex flex-col gap-4">
                          <div className="flex-1">
                            {config.visualizer}
                          </div>
                          
                          {/* Image preview frame with scanlines */}
                          <div className="relative aspect-[16/10] overflow-hidden border border-[#E7BB55]/20 bg-[#060608] rounded-xl">
                            <img 
                              src={activeService.image} 
                              alt={activeService.title} 
                              className="w-full h-full object-cover opacity-60 hover:opacity-85 transition-opacity duration-500" 
                            />
                            {/* Decorative scanline overlay */}
                            <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0)_90%,rgba(231,187,85,0.1)_95%)] bg-[size:100%_10px] pointer-events-none" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Content Bottom: Action Button */}
                    <div className="pt-6 mt-6 border-t border-[#E7BB55]/10 flex flex-col sm:flex-row justify-between items-center gap-4">
                      <div className="font-hud text-[9px] text-zinc-500 flex gap-4 uppercase">
                        <span>PORT: SECURE_8080</span>
                        <span>ENC: TLS_AES_256</span>
                      </div>
                      <Link 
                        to="/contact" 
                        state={{ transition: "flipRotate" }}
                        className={`w-full sm:w-auto px-8 py-3.5 text-xs font-tech font-bold tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2 rounded border shadow-[0_0_15px_rgba(231,187,85,0.02)] ${config.btnClass}`}
                      >
                        <span>Initialise Protocol</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>

                  </motion.div>
                </AnimatePresence>
              </div>

            </div>

          </div>
        </div>
      </SmoothScroll>
    </AnimatedPage>
  );
};

export default Services;