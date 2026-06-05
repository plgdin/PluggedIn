import { motion } from "framer-motion";
import { ReactNode } from "react";
import { useLocation } from "react-router-dom";

type AnimatedPageProps = {
  children: ReactNode;
};

// Transition Types:
// 1. 'cyberSlide' - Golden solid sweep panel
// 2. 'glitchSplit' - Vertical shutter door clip-path reveal
// 3. 'circleExpand' - Expanding circular lens mask
// 4. 'flipRotate' - 3D card perspective card flip
// 5. Default - Clean springy slide + fade

const transitionVariants = {
  // Default Transition
  default: {
    initial: { opacity: 0, y: 25 },
    animate: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } },
    exit: { opacity: 0, y: -25, transition: { duration: 0.25 } }
  },
  
  // Shutter clip-path split reveal
  glitchSplit: {
    initial: { clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" },
    animate: { 
      clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] } 
    },
    exit: { 
      clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
      transition: { duration: 0.65, ease: [0.76, 0, 0.24, 1] } 
    }
  },

  // Radial Circle Expand Mask
  circleExpand: {
    initial: { clipPath: "circle(0% at 50% 50%)" },
    animate: { 
      clipPath: "circle(150% at 50% 50%)",
      transition: { duration: 0.85, ease: "easeInOut" } 
    },
    exit: { 
      clipPath: "circle(0% at 50% 50%)",
      transition: { duration: 0.75, ease: "easeInOut" } 
    }
  },

  // 3D Perspective Flip
  flipRotate: {
    initial: { rotateY: 90, opacity: 0, transformPerspective: 1200 },
    animate: { 
      rotateY: 0, 
      opacity: 1,
      transition: { duration: 0.7, ease: [0.34, 1.56, 0.64, 1] } // spring-like bounce
    },
    exit: { 
      rotateY: -90, 
      opacity: 0,
      transition: { duration: 0.5, ease: "easeIn" } 
    }
  },

  // Content fade-in for cyberSlide (overlay sweep does the heavy visual lifting)
  cyberSlide: {
    initial: { opacity: 0, x: 50 },
    animate: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.5, delay: 0.3 } 
    },
    exit: { 
      opacity: 0, 
      x: -50,
      transition: { duration: 0.3 } 
    }
  }
} as const;

const AnimatedPage = ({ children }: AnimatedPageProps) => {
  const location = useLocation();
  const transitionType = (location.state as any)?.transition || "default";
  
  const activeVariants = transitionVariants[transitionType as keyof typeof transitionVariants] || transitionVariants.default;

  return (
    <div className="relative w-full h-full overflow-hidden" style={{ perspective: "1200px" }}>
      
      {/* Golden Shutter Panel (Only for 'cyberSlide') */}
      {transitionType === "cyberSlide" && (
        <>
          {/* Cover Panel sliding out on entry */}
          <motion.div
            className="fixed inset-0 bg-[#E7BB55] z-50 pointer-events-none"
            initial={{ x: "0%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          />
          {/* Cover Panel sliding in on exit */}
          <motion.div
            className="fixed inset-0 bg-[#E7BB55] z-50 pointer-events-none"
            initial={{ x: "-100%" }}
            exit={{ x: "0%" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          />
        </>
      )}

      {/* Main Page Content wrapper */}
      <motion.div
        variants={activeVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </div>
  );
};

export default AnimatedPage;
