import React from 'react';
import { ArrowRight, Heart, Shield, DollarSign, Zap, Code, Smartphone, Cpu, CloudCog, Palette } from "lucide-react";
import { Link } from "react-router-dom";
import AnimatedPage from "../components/AnimatedPage";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import InteractiveCanvasGrid from "../components/InteractiveCanvasGrid";
import GlowButton from "../components/GlowButton";

// Custom Tech Card with 3D Tilt Effect on Cursor Hover
const DynamicTiltCard = ({ icon, title, desc, linkTo, stateTransition }: { 
  icon: React.ReactNode; 
  title: string; 
  desc: string;
  linkTo?: string;
  stateTransition?: any;
}) => {
  const [tilt, setTilt] = React.useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;
    
    // Tilt calculations (subtle max tilt of 12 degrees)
    const tiltX = (y / (box.height / 2)) * -12;
    const tiltY = (x / (box.width / 2)) * 12;

    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const cardInner = (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: tilt.x,
        rotateY: tilt.y,
        scale: tilt.x !== 0 || tilt.y !== 0 ? 1.04 : 1.0,
      }}
      transition={{ type: "spring", stiffness: 200, damping: 22 }}
      style={{ transformStyle: "preserve-3d" }}
      className="group relative bg-[#060608]/85 border border-[#E7BB55]/10 rounded-lg p-8 overflow-hidden transition-all duration-500 hover:shadow-[0_0_35px_rgba(231,187,85,0.2)] hover:border-[#E7BB55]/50 cursor-pointer h-full"
    >
      {/* 3D Depth Card Details */}
      <div style={{ transform: "translateZ(30px)" }} className="relative z-10">
        
        {/* Animated Icon Container */}
        <div className="h-14 w-14 rounded-lg bg-black border border-[#E7BB55]/20 flex items-center justify-center mb-6 text-[#E7BB55] group-hover:bg-[#E7BB55] group-hover:text-black group-hover:shadow-[0_0_15px_rgba(231,187,85,0.4)] transition-all duration-500">
          <motion.div whileHover={{ rotate: 12, scale: 1.15 }} transition={{ type: "spring", stiffness: 300 }}>
            {icon}
          </motion.div>
        </div>

        {/* Title */}
        <h3 className="font-tech text-lg uppercase tracking-wider mb-3 text-white group-hover:text-[#E7BB55] transition-colors duration-300">
          {title}
        </h3>

        {/* Description */}
        <p className="font-modern text-sm text-zinc-400 tracking-wide leading-relaxed">
          {desc}
        </p>

        {/* Action Link Indicator */}
        {linkTo && (
          <div className="flex items-center gap-1.5 text-xs text-[#E7BB55]/60 group-hover:text-[#E7BB55] mt-6 transition-colors duration-300">
            <span>Explore Details</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </div>
        )}
      </div>

      {/* Cybernetic Border Line Drawings */}
      <span className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#E7BB55] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out origin-left" />
      <span className="absolute bottom-0 right-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#E7BB55] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out origin-right" />
      <span className="absolute top-0 right-0 w-[1px] h-full bg-gradient-to-b from-transparent via-[#E7BB55] to-transparent scale-y-0 group-hover:scale-y-100 transition-transform duration-700 ease-out origin-top" />
      <span className="absolute bottom-0 left-0 w-[1px] h-full bg-gradient-to-b from-transparent via-[#E7BB55] to-transparent scale-y-0 group-hover:scale-y-100 transition-transform duration-700 ease-out origin-bottom" />

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#E7BB55_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.02] group-hover:opacity-[0.05] transition-opacity duration-500 pointer-events-none" />

      {/* Corner Tech Marks */}
      <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#E7BB55]/30 group-hover:border-[#E7BB55]" />
      <span className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#E7BB55]/30 group-hover:border-[#E7BB55]" />
      <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#E7BB55]/30 group-hover:border-[#E7BB55]" />
      <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#E7BB55]/30 group-hover:border-[#E7BB55]" />
    </motion.div>
  );

  if (linkTo) {
    return (
      <Link to={linkTo} state={stateTransition} className="block h-full">
        {cardInner}
      </Link>
    );
  }

  return cardInner;
};

// Specialized Holographic HUD Card with spring bounce reveal and micro-animations
const HolographicHudCard = ({ 
  icon, 
  title, 
  desc, 
  type 
}: { 
  icon: React.ReactNode; 
  title: string; 
  desc: string; 
  type: 'comfort' | 'safety' | 'budget';
}) => {
  const [tilt, setTilt] = React.useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = React.useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;
    
    // Smooth 3D tilt calculation
    const tiltX = (y / (box.height / 2)) * -10;
    const tiltY = (x / (box.width / 2)) * 10;

    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => setIsHovered(true)}
      animate={{
        rotateX: tilt.x,
        rotateY: tilt.y,
        scale: isHovered ? 1.05 : 1.0,
      }}
      transition={{ type: "spring", stiffness: 220, damping: 18 }}
      style={{ transformStyle: "preserve-3d" }}
      className="group relative bg-[#060608]/75 backdrop-blur-md border border-[#E7BB55]/15 rounded-lg p-8 overflow-hidden transition-all duration-300 hover:shadow-[0_0_45px_rgba(231,187,85,0.22)] hover:border-[#E7BB55]/45 cursor-pointer h-full"
    >
      {/* 3D Depth Details */}
      <div style={{ transform: "translateZ(30px)" }} className="relative z-10 flex flex-col h-full justify-between">
        <div>
          {/* Animated Icon Container */}
          <div className="h-14 w-14 rounded-lg bg-black border border-[#E7BB55]/20 flex items-center justify-center mb-6 text-[#E7BB55] group-hover:bg-[#E7BB55] group-hover:text-black group-hover:shadow-[0_0_15px_rgba(231,187,85,0.4)] transition-all duration-500">
            <motion.div 
              animate={isHovered ? { scale: [1, 1.25, 1, 1.25, 1], rotate: type === 'safety' ? [0, 90, 180, 270, 360] : 0 } : {}}
              transition={{ repeat: type === 'safety' ? Infinity : 0, duration: type === 'safety' ? 4 : 1.2, ease: "easeInOut" }}
            >
              {icon}
            </motion.div>
          </div>

          {/* Title with Tech glow scan trigger */}
          <h3 className="font-tech text-lg uppercase tracking-wider mb-3 text-white group-hover:text-[#E7BB55] transition-colors duration-300">
            {title}
          </h3>

          {/* Description */}
          <p className="font-modern text-sm text-zinc-400 tracking-wide leading-relaxed mb-6">
            {desc}
          </p>
        </div>

        {/* Dynamic Holographic Sub-Panels (Popup effect inside card) */}
        <div className="mt-auto border-t border-[#E7BB55]/10 pt-4 relative overflow-hidden min-h-[120px]">
          {type === 'comfort' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center text-[10px] font-tech text-zinc-500 uppercase tracking-widest">
                <span>Sys Mode: Optimal</span>
                <span className="text-[#E7BB55] animate-pulse">Pulse: Active</span>
              </div>
              <svg className="w-full h-12 text-[#E7BB55]" viewBox="0 0 200 50">
                {/* Background Grid Lines */}
                <line x1="0" y1="25" x2="200" y2="25" stroke="rgba(231,187,85,0.08)" strokeWidth="0.5" strokeDasharray="2 2" />
                <line x1="50" y1="0" x2="50" y2="50" stroke="rgba(231,187,85,0.08)" strokeWidth="0.5" strokeDasharray="2 2" />
                <line x1="100" y1="0" x2="100" y2="50" stroke="rgba(231,187,85,0.08)" strokeWidth="0.5" strokeDasharray="2 2" />
                <line x1="150" y1="0" x2="150" y2="50" stroke="rgba(231,187,85,0.08)" strokeWidth="0.5" strokeDasharray="2 2" />
                {/* Heartbeat EKG Path */}
                <motion.path
                  d="M 0 25 L 45 25 L 52 10 L 60 40 L 68 5 L 75 32 L 82 25 L 200 25"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  initial={{ pathLength: 0.15 }}
                  animate={isHovered ? { pathLength: 1 } : { pathLength: 0.35 }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                />
              </svg>
              <div className="flex justify-between items-center text-[10px] font-tech text-zinc-400">
                <span>UX SATISFACTION</span>
                <span className="text-white font-bold">98.4%</span>
              </div>
            </div>
          )}

          {type === 'safety' && (
            <div className="space-y-3">
              <div className="flex justify-between items-center text-[10px] font-tech text-zinc-500 uppercase tracking-widest">
                <span>Radar Scan</span>
                <span className="text-[#E7BB55] animate-pulse">Failsafe: ON</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative w-14 h-14 border border-[#E7BB55]/30 rounded-full flex items-center justify-center overflow-hidden shrink-0">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,rgba(231,187,85,0.08)_50%)]" />
                  {/* Rotating Sweeper */}
                  <motion.div 
                    className="absolute w-full h-[1px] bg-gradient-to-r from-transparent to-[#E7BB55] origin-center"
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
                  />
                  {/* Glowing blips */}
                  <div className="absolute top-3 left-4 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_8px_white] animate-ping" />
                  <div className="absolute bottom-4 right-3 w-1 h-1 bg-[#E7BB55] rounded-full shadow-[0_0_6px_#E7BB55] animate-pulse" />
                </div>
                <div className="flex-1 space-y-1 text-[9px] font-tech text-zinc-400">
                  <div className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#E7BB55]" />
                    <span>AES-256 OVERLAY</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#E7BB55]" />
                    <span>24/7 DYNAMIC MONITOR</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#E7BB55]" />
                    <span>ZERO SHUTDOWN TRIPS</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {type === 'budget' && (
            <div className="space-y-2">
              <div className="flex justify-between items-center text-[10px] font-tech text-zinc-500 uppercase tracking-widest">
                <span>Value Meter</span>
                <span className="text-[#E7BB55]">+140% ROI</span>
              </div>
              <div className="space-y-1.5">
                {[
                  { label: "EFFICIENCY", val: 92 },
                  { label: "QUALITY RATE", val: 96 },
                  { label: "UNIT COST RATIO", val: 32 }
                ].map((item, idx) => (
                  <div key={idx} className="space-y-0.5">
                    <div className="flex justify-between text-[9px] font-tech text-zinc-400">
                      <span>{item.label}</span>
                      <span>{item.val}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-black border border-[#E7BB55]/10 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-[#E7BB55]/50 to-[#E7BB55]"
                        initial={{ width: "15%" }}
                        animate={isHovered ? { width: `${item.val}%` } : { width: "15%" }}
                        transition={{ duration: 1.2, ease: "easeOut", delay: idx * 0.1 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Cybernetic Scan Laser Line Sweep */}
      <div 
        className="absolute left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#E7BB55]/40 to-transparent pointer-events-none"
        style={{
          animation: "scanline 4s linear infinite",
        }}
      />

      {/* Grid Overlay inside card */}
      <div className="absolute inset-0 bg-[radial-gradient(#E7BB55_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.015] group-hover:opacity-[0.04] transition-opacity duration-300 pointer-events-none" />

      {/* Corner Tech Marks */}
      <span className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#E7BB55]/20 group-hover:border-[#E7BB55] transition-colors duration-300" />
      <span className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#E7BB55]/20 group-hover:border-[#E7BB55] transition-colors duration-300" />
      <span className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#E7BB55]/20 group-hover:border-[#E7BB55] transition-colors duration-300" />
      <span className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#E7BB55]/20 group-hover:border-[#E7BB55] transition-colors duration-300" />
    </motion.div>
  );
};

// Custom interactive HUD Card specifically built for Services
const ServiceHudCard = ({ 
  icon, 
  title, 
  desc, 
  linkTo,
  stateTransition,
  type
}: { 
  icon: React.ReactNode; 
  title: string; 
  desc: string;
  linkTo: string;
  stateTransition: any;
  type: 'web' | 'app' | 'software' | 'iot' | 'device' | 'consulting';
}) => {
  const [tilt, setTilt] = React.useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = React.useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left - box.width / 2;
    const y = e.clientY - box.top - box.height / 2;
    
    const tiltX = (y / (box.height / 2)) * -10;
    const tiltY = (x / (box.width / 2)) * 10;

    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <Link to={linkTo} state={stateTransition} className="block h-full">
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={() => setIsHovered(true)}
        animate={{
          rotateX: tilt.x,
          rotateY: tilt.y,
          scale: isHovered ? 1.05 : 1.0,
        }}
        transition={{ type: "spring", stiffness: 220, damping: 18 }}
        style={{ transformStyle: "preserve-3d" }}
        className="group relative bg-[#060608]/75 backdrop-blur-md border border-[#E7BB55]/15 rounded-lg p-8 overflow-hidden transition-all duration-300 hover:shadow-[0_0_45px_rgba(231,187,85,0.22)] hover:border-[#E7BB55]/45 cursor-pointer h-full flex flex-col justify-between"
      >
        {/* 3D Depth Content */}
        <div style={{ transform: "translateZ(30px)" }} className="relative z-10 flex flex-col h-full justify-between">
          <div>
            {/* Animated Icon Container */}
            <div className="h-14 w-14 rounded-lg bg-black border border-[#E7BB55]/20 flex items-center justify-center mb-6 text-[#E7BB55] group-hover:bg-[#E7BB55] group-hover:text-black group-hover:shadow-[0_0_15px_rgba(231,187,85,0.4)] transition-all duration-500 animate-glow">
              <motion.div 
                animate={isHovered ? { scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] } : {}}
                transition={{ duration: 0.5 }}
              >
                {icon}
              </motion.div>
            </div>

            {/* Title */}
            <h3 className="font-tech text-lg uppercase tracking-wider mb-3 text-white group-hover:text-[#E7BB55] transition-colors duration-300">
              {title}
            </h3>

            {/* Description */}
            <p className="font-modern text-sm text-zinc-400 tracking-wide leading-relaxed mb-6">
              {desc}
            </p>
          </div>

          {/* Interactive Graphic Module (Transitions under topics) */}
          <div className="mt-auto border-t border-[#E7BB55]/10 pt-4 min-h-[110px] relative overflow-hidden flex flex-col justify-center">
            
            {type === 'web' && (
              <div className="font-mono text-[10px] text-zinc-500 space-y-1">
                <div className="flex justify-between items-center text-[9px] font-tech text-zinc-500 mb-1">
                  <span>DEV PANEL: ACTIVE</span>
                  <span className="text-[#E7BB55] animate-pulse">HTML5 / TSX</span>
                </div>
                <div className="bg-black/50 p-2.5 rounded border border-[#E7BB55]/15">
                  <motion.div 
                    animate={isHovered ? { opacity: [0.5, 1, 0.5] } : {}} 
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className="text-[#E7BB55]/90"
                  >
                    &lt;div className="website"&gt;
                  </motion.div>
                  <div className="pl-3 text-white/80">
                    &lt;span&gt;Building Value&lt;/span&gt;
                  </div>
                  <div className="text-[#E7BB55]/90">&lt;/div&gt;</div>
                </div>
              </div>
            )}

            {type === 'app' && (
              <div className="relative w-full h-16 flex items-center justify-center">
                {/* Phone mockup */}
                <div className="w-20 h-16 border border-zinc-700 bg-black/50 rounded-md relative overflow-hidden p-1">
                  {/* Status bar */}
                  <div className="h-1 bg-[#E7BB55]/20 rounded-full mb-1 flex items-center justify-between px-1">
                    <span className="w-1 h-1 bg-[#E7BB55] rounded-full" />
                    <span className="w-2 h-0.5 bg-zinc-500 rounded-full" />
                  </div>
                  {/* Interactive Screen slides transitioning between screens */}
                  <div className="relative w-full h-11 overflow-hidden">
                    <motion.div
                      className="absolute inset-0 flex"
                      animate={isHovered ? { x: ["0%", "-100%", "0%"] } : { x: "0%" }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                      {/* Screen 1 */}
                      <div className="w-full h-full shrink-0 flex flex-col justify-around p-1">
                        <div className="w-full h-2 bg-zinc-800 rounded flex items-center px-1">
                          <span className="w-3 h-1 bg-[#E7BB55]/70 rounded-full" />
                        </div>
                        <div className="w-full h-5 bg-zinc-900 border border-[#E7BB55]/20 rounded flex items-center justify-center text-[7px] font-tech text-[#E7BB55]">HOME</div>
                      </div>
                      {/* Screen 2 */}
                      <div className="w-full h-full shrink-0 flex flex-col justify-around p-1">
                        <div className="w-full h-2 bg-zinc-800 rounded flex items-center px-1">
                          <span className="w-2 h-1 bg-white/60 rounded-full" />
                        </div>
                        <div className="w-full h-5 bg-zinc-900 border border-white/20 rounded flex items-center justify-center text-[7px] font-tech text-white">DETAILS</div>
                      </div>
                    </motion.div>
                  </div>
                </div>
                <div className="absolute right-2 text-[8px] font-tech text-zinc-500 flex flex-col items-end">
                  <span>SCREEN 01/02</span>
                  <span className="text-white text-[7px] animate-pulse">SLIDING</span>
                </div>
              </div>
            )}

            {type === 'software' && (
              <div className="space-y-2">
                <div className="flex justify-between items-center text-[9px] font-tech text-zinc-500">
                  <span>SaaS Cloud Infrastructure</span>
                  <span className="text-[#E7BB55]">ACTIVE</span>
                </div>
                <div className="flex items-center justify-around h-12">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="relative flex flex-col items-center">
                      <motion.div 
                        animate={isHovered ? { scale: [1, 1.15, 1], borderColor: ["#27272a", "#E7BB55", "#27272a"] } : {}}
                        transition={{ duration: 1, delay: i * 0.2, repeat: isHovered ? Infinity : 0 }}
                        className="w-8 h-4 border border-zinc-700 rounded-sm bg-black/50 flex flex-col justify-around p-0.5"
                      >
                        <div className="w-full h-0.5 bg-[#E7BB55]/40 rounded-full" />
                        <div className="w-full h-0.5 bg-zinc-800 rounded-full" />
                      </motion.div>
                      {i < 2 && (
                        <div className="absolute top-2 left-8 w-10 h-[1px] bg-zinc-800 overflow-hidden">
                          <motion.div 
                            className="h-full w-3 bg-[#E7BB55]/60"
                            animate={isHovered ? { x: ["-100%", "300%"] } : {}}
                            transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {type === 'iot' && (
              <div className="space-y-2">
                <div className="flex justify-between items-center text-[9px] font-tech text-zinc-500">
                  <span>MESH NETWORK SIGNAL</span>
                  <span className="text-[#E7BB55]">CONNECT</span>
                </div>
                <div className="relative w-full h-12 flex items-center justify-center">
                  <div className="w-2 h-2 bg-[#E7BB55] rounded-full shadow-[0_0_8px_#E7BB55]" />
                  <motion.div 
                    className="absolute w-2 h-2 border border-[#E7BB55]/40 rounded-full"
                    animate={isHovered ? { scale: [1, 6], opacity: [1, 0] } : {}}
                    transition={{ repeat: Infinity, duration: 1.8, ease: "easeOut" }}
                  />
                  <motion.div 
                    className="absolute w-2 h-2 border border-[#E7BB55]/40 rounded-full"
                    animate={isHovered ? { scale: [1, 4], opacity: [1, 0] } : {}}
                    transition={{ repeat: Infinity, duration: 1.8, delay: 0.6, ease: "easeOut" }}
                  />
                  <div className="absolute top-2 left-6 w-1.5 h-1.5 bg-zinc-600 rounded-full" />
                  <div className="absolute bottom-2 right-8 w-1.5 h-1.5 bg-zinc-600 rounded-full" />
                  <div className="absolute top-4 right-4 w-1.5 h-1.5 bg-zinc-600 rounded-full" />
                </div>
              </div>
            )}

            {type === 'device' && (
              <div className="space-y-2">
                <div className="flex justify-between items-center text-[9px] font-tech text-zinc-500">
                  <span>PCB TRACE PATH</span>
                  <span className="text-[#E7BB55]">VERIFIED</span>
                </div>
                <svg className="w-full h-12 text-[#E7BB55]" viewBox="0 0 200 50">
                  <rect x="80" y="15" width="40" height="20" rx="2" fill="none" stroke="rgba(231,187,85,0.2)" strokeWidth="1" />
                  <motion.path 
                    d="M 20 25 L 80 25 M 120 25 L 180 25 M 100 0 L 100 15 M 100 35 L 100 50" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="1.2"
                    strokeDasharray="10 5"
                    animate={isHovered ? { strokeDashoffset: [-15, 0] } : {}}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                  />
                </svg>
              </div>
            )}

            {type === 'consulting' && (
              <div className="space-y-2">
                <div className="flex justify-between items-center text-[9px] font-tech text-zinc-500">
                  <span>GROWTH ANALYTICS</span>
                  <span className="text-[#E7BB55]">+350%</span>
                </div>
                <svg className="w-full h-12 text-[#E7BB55]" viewBox="0 0 200 50">
                  <motion.path 
                    d="M 10 45 Q 60 40 100 25 T 190 5" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2.5" 
                    initial={{ pathLength: 0.2 }}
                    animate={isHovered ? { pathLength: 1 } : { pathLength: 0.35 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                  />
                  <line x1="10" y1="45" x2="190" y2="45" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
                </svg>
              </div>
            )}

          </div>
        </div>

        {/* Action Link Indicator */}
        <div className="flex items-center gap-1.5 text-xs text-[#E7BB55]/60 group-hover:text-[#E7BB55] mt-6 transition-colors duration-300 relative z-10">
          <span>Explore Details</span>
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </div>

        {/* Cyber Border Overlay lines */}
        <span className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#E7BB55] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out origin-left" />
        <span className="absolute bottom-0 right-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#E7BB55] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out origin-right" />
        <span className="absolute top-0 right-0 w-[1px] h-full bg-gradient-to-b from-transparent via-[#E7BB55] to-transparent scale-y-0 group-hover:scale-y-100 transition-transform duration-700 ease-out origin-top" />
        <span className="absolute bottom-0 left-0 w-[1px] h-full bg-gradient-to-b from-transparent via-[#E7BB55] to-transparent scale-y-0 group-hover:scale-y-100 transition-transform duration-700 ease-out origin-bottom" />

        {/* Grid Overlay inside card */}
        <div className="absolute inset-0 bg-[radial-gradient(#E7BB55_1px,transparent_1px)] [background-size:16px_16px] opacity-[0.015] group-hover:opacity-[0.04] transition-opacity duration-300 pointer-events-none" />

        {/* Corner Tech Marks */}
        <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#E7BB55]/30 group-hover:border-[#E7BB55] transition-colors" />
        <span className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#E7BB55]/30 group-hover:border-[#E7BB55] transition-colors" />
        <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#E7BB55]/30 group-hover:border-[#E7BB55] transition-colors" />
        <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#E7BB55]/30 group-hover:border-[#E7BB55] transition-colors" />
      </motion.div>
    </Link>
  );
};

const Home = () => {
  // Setup cursor global position tracking for GPU-driven background spotlight styling
  React.useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty('--global-mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--global-mouse-y', `${e.clientY}px`);
    };
    window.addEventListener('mousemove', handleGlobalMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
    };
  }, []);

  return (
    <AnimatedPage>
      <Helmet>
        <title>Plugged In (PLGDIN) | Smart Products, IoT & Software Solutions</title>
        <meta
          name="description"
          content="Plugged In (PLGDIN) builds smart products like E.L.S.A emergency systems and SnuggleIt pet beds, along with IoT, web, app, and software development solutions."
        />
      </Helmet>

      {/* Inject custom animations via native style block */}
      <style>{`
        @keyframes scanline {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 0.8; }
          90% { opacity: 0.8; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes scan-glow {
          0%, 100% { filter: drop-shadow(0 0 2px rgba(231,187,85,0.35)); }
          50% { filter: drop-shadow(0 0 8px rgba(231,187,85,0.75)); }
        }
        .animate-tech-glow {
          animation: scan-glow 2.5s ease-in-out infinite;
        }
      `}</style>

      {/* Main Page Wrapper: Sleek Jet Black background with moving radial spotlight */}
      <div 
        style={{
          background: 'radial-gradient(circle 800px at var(--global-mouse-x, 50%) var(--global-mouse-y, 50%), rgba(231, 187, 85, 0.06) 0%, rgba(2, 2, 3, 1) 75%, #020203 100%)'
        }}
        className="relative min-h-screen overflow-x-hidden text-white font-modern transition-colors duration-500"
      >
        {/* Full-Screen Interactive Connected Particle Matrix Grid */}
        <InteractiveCanvasGrid />

        {/* Decorative Grid Mesh Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e7bb5507_1px,transparent_1px),linear-gradient(to_bottom,#e7bb5507_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none z-0" />

        {/* Hero Section */}
        <section className="relative py-24 px-4 md:py-36 lg:py-48 min-h-[98vh] flex items-center overflow-hidden border-b border-[#E7BB55]/10">
          
          {/* Note: InteractiveCanvasGrid moved to parent wrapper for global backdrop coverage */}

          {/* Vignette overlays to blend canvas edges */}
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#020203] to-transparent pointer-events-none z-10" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#020203] to-transparent pointer-events-none z-10" />

          <div className="container mx-auto relative z-20">
            <div className="max-w-4xl mx-auto text-center">
              
              {/* Title with Tech/Futuristic Font */}
              <div className="relative inline-block mb-8">
                {/* Background Golden Cyber Aura */}
                <motion.div 
                  animate={{
                    scale: [1, 1.18, 1],
                    opacity: [0.5, 0.85, 0.5]
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 4.5,
                    ease: "easeInOut"
                  }}
                  className="absolute inset-x-[-50px] top-1/4 bottom-1/4 bg-[#E7BB55]/12 filter blur-[95px] rounded-full pointer-events-none z-0" 
                />

                <motion.h1 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.15 }}
                  className="font-tech font-black text-4xl md:text-6xl lg:text-7xl tracking-tighter leading-[1.05] text-balance text-white relative z-10"
                >
                  BUILDING PRODUCTS THAT
                  <span className="text-[#E7BB55] block animate-tech-glow">MATTER</span>
                </motion.h1>
              </div>
              
              {/* Sub-paragraph with modern Sans font */}
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="font-modern tracking-wider text-base md:text-lg text-zinc-400 mb-12 max-w-2xl mx-auto leading-relaxed"
              >
                At PluggedIn, we fuse custom hardware engineering with cloud architecture. From emergency safety devices to pet comforts, we manufacture solutions that impact lives.
              </motion.p>
              
              {/* Interactive buttons with route-specific transitions */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.45 }}
                className="flex flex-col sm:flex-row gap-5 justify-center items-center"
              >
                {/* E.L.S.A triggers 'cyberSlide' transition */}
                <GlowButton to="/elsa" state={{ transition: "cyberSlide" }} variant="primary">
                  Explore Products <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </GlowButton>
                
                {/* About triggers 'circleExpand' transition */}
                <GlowButton to="/about" state={{ transition: "circleExpand" }} variant="outline">
                  Learn More
                </GlowButton>
              </motion.div>

            </div>
          </div>
        </section>

        {/* Why Choose Us Grid with Holographic Popup HUD style */}
        <section className="py-24 px-4 relative z-20">
          <div className="container mx-auto">
            
            {/* Header section with scroll fade */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="font-tech text-2xl md:text-4xl tracking-widest uppercase mb-4 text-[#E7BB55]">
                Why Choose PluggedIn?
              </h2>
              <p className="font-modern text-zinc-400 max-w-2xl mx-auto text-sm md:text-base">
                We bridge the gap between complex engineering, industrial elegance, and user usability.
              </p>
            </motion.div>

            {/* Staggered dynamic HUD cards with spring bounce popup entries */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { type: "comfort" as const, icon: <Heart className="h-6 w-6" />, title: "Comfort First", desc: "Every product is designed with comfort and user experience as the top priority." },
                { type: "safety" as const, icon: <Shield className="h-6 w-6" />, title: "Safety & Reliability", desc: "Built with safety in mind, ensuring reliable performance when it matters most." },
                { type: "budget" as const, icon: <DollarSign className="h-6 w-6" />, title: "Budget-Conscious", desc: "Quality products without the premium price tag—innovation for everyone." }
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.5, y: 90 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ type: "spring", stiffness: 100, damping: 14, delay: i * 0.15 }}
                >
                  <HolographicHudCard 
                    type={feature.type}
                    icon={feature.icon} 
                    title={feature.title} 
                    desc={feature.desc} 
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-24 px-4 bg-[#030305]/60 backdrop-blur-sm relative z-20 border-t border-[#E7BB55]/10">
          <div className="container mx-auto">
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-20"
            >
              <h2 className="font-tech text-2xl md:text-4xl tracking-widest uppercase mb-4 text-white">
                Our Services
              </h2>
              <p className="font-modern text-zinc-400 max-w-3xl mx-auto text-sm md:text-base">
                Beyond our core product lines, we offer a range of end-to-end custom engineering, IoT development, and technical consultation.
              </p>
            </motion.div>

            {/* Grid of cybernetic service buttons/cards with interactive topic animations */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { type: "web" as const, icon: <Code />, title: "Website Development", desc: "Modern, high-performance web systems built with cutting-edge tech stacks." },
                { type: "app" as const, icon: <Smartphone />, title: "App Development", desc: "Native & cross-platform mobile experiences that users love." },
                { type: "software" as const, icon: <CloudCog />, title: "Software Development", desc: "Custom backends, SaaS architecture, and enterprise software solutions." },
                { type: "iot" as const, icon: <Zap />, title: "IoT Solutions", desc: "Seamless integration between hardware sensors, microcontrollers, and cloud databases." },
                { type: "device" as const, icon: <Cpu />, title: "Custom Devices", desc: "Prototypes, custom PCB design, and firmware for smart physical devices." },
                { type: "consulting" as const, icon: <Palette />, title: "Tech Consulting", desc: "Strategic advice on system architecture, cloud scaling, and digital transformation." }
              ].map((service, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                >
                  <ServiceHudCard 
                    type={service.type}
                    icon={service.icon} 
                    title={service.title} 
                    desc={service.desc}
                    linkTo="/services"
                    stateTransition={{ transition: "pixelTransition" }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section id="contact" className="py-24 px-4 relative z-20 border-y border-[#E7BB55]/10 overflow-hidden">
          {/* Subtle gold radial background glow */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#E7BB55]/5 blur-[120px] rounded-full pointer-events-none z-0" />

          <div className="container mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-tech text-3xl md:text-5xl tracking-widest uppercase mb-6 text-white leading-tight">
                Ready to Learn More?
              </h2>
              
              <p className="font-modern text-zinc-400 text-sm md:text-base mb-12 max-w-2xl mx-auto leading-relaxed">
                Connect with our engineering team to design custom systems or discover how our consumer smart products can elevate your environment.
              </p>
              
              <div className="flex justify-center">
                {/* Contact triggers 'flipRotate' transition */}
                <GlowButton to="/contact" state={{ transition: "flipRotate" }} variant="primary">
                  Contact Us
                </GlowButton>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </AnimatedPage>
  );
};

export default Home;