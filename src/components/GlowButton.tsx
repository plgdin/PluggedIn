import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface GlowButtonProps {
  children: React.ReactNode;
  to?: string;
  state?: any;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary" | "outline";
}

export const GlowButton: React.FC<GlowButtonProps> = ({
  children,
  to,
  state,
  onClick,
  className = "",
  variant = "primary",
}) => {
  const content = (
    <motion.span
      className="relative z-10 flex items-center justify-center gap-2"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.span>
  );

  // Variant classes mapping
  const baseClasses =
    "relative px-8 py-3.5 font-tech text-xs uppercase tracking-widest transition-all duration-300 overflow-hidden select-none border";

  const variantClasses = {
    primary:
      "bg-black text-[#E7BB55] border-[#E7BB55]/40 hover:border-[#E7BB55] hover:text-black shadow-[0_0_15px_rgba(231,187,85,0.1)] hover:shadow-[0_0_25px_rgba(231,187,85,0.3)]",
    secondary:
      "bg-[#E7BB55] text-black border-[#E7BB55] hover:bg-transparent hover:text-[#E7BB55] hover:border-[#E7BB55]/50",
    outline:
      "bg-transparent text-[#E7BB55]/80 border-[#E7BB55]/20 hover:border-[#E7BB55] hover:text-[#E7BB55] hover:bg-[#E7BB55]/5",
  };

  const buttonInner = (
    <>
      {/* Corner Tech Ticks */}
      <span className="absolute top-0 left-0 w-2 h-[2px] bg-[#E7BB55] transition-all duration-300" />
      <span className="absolute top-0 left-0 w-[2px] h-2 bg-[#E7BB55] transition-all duration-300" />
      <span className="absolute bottom-0 right-0 w-2 h-[2px] bg-[#E7BB55] transition-all duration-300" />
      <span className="absolute bottom-0 right-0 w-[2px] h-2 bg-[#E7BB55] transition-all duration-300" />

      {/* Sliding Gold Background fill (only for primary variant) */}
      {variant === "primary" && (
        <span className="absolute inset-0 w-full h-full bg-[#E7BB55] scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100 -z-0" />
      )}

      {content}
    </>
  );

  const mergedClasses = `${baseClasses} ${variantClasses[variant]} group ${className}`;

  if (to) {
    return (
      <Link to={to} state={state} className={mergedClasses} onClick={onClick}>
        {buttonInner}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={mergedClasses}>
      {buttonInner}
    </button>
  );
};

export default GlowButton;
