import { useState, useEffect, ReactNode } from "react";
import { Droplets } from "lucide-react"; // Water icon

// --- INTERNAL COMPONENT REPLACEMENT ---
// Since we cannot import external files, we define a simple wrapper here.
const AnimatedPage = ({ children }: { children: ReactNode }) => (
  <div className="animate-page-entry w-full h-full">
    {children}
  </div>
);
// --------------------------------------

// --- CONTROLS for the random timer ---
const MIN_TICK_SECONDS = 3; // 3 seconds
const MAX_TICK_SECONDS = 120; // 120 seconds (2 minutes)
const DONATION_PER_TICK = 0.1;
// --- END CONTROLS ---

// Helper function to format the number
const formatCurrency = (amount: number) => {
  return amount.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

// Helper function to get random time in milliseconds
const getRandomInterval = () => {
  return (
    (Math.random() * (MAX_TICK_SECONDS - MIN_TICK_SECONDS) + MIN_TICK_SECONDS) * 1000
  );
};

const H2OPage = () => {
  // Fix: explicitly allow number or null
  const [displayAmount, setDisplayAmount] = useState<number | null>(null);

  // This useEffect handles the random visual ticking
  useEffect(() => {
    if (displayAmount === null) return;

    let timeoutId: ReturnType<typeof setTimeout>;

    const incrementCounter = () => {
      setDisplayAmount((prevAmount) => {
        if (prevAmount === null) return DONATION_PER_TICK;
        return parseFloat((prevAmount + DONATION_PER_TICK).toFixed(2));
      });

      timeoutId = setTimeout(incrementCounter, getRandomInterval());
    };

    timeoutId = setTimeout(incrementCounter, getRandomInterval());

    return () => clearTimeout(timeoutId);
  }, [displayAmount === null]);

  // This useEffect fetches the REAL server value, only once on page load
  useEffect(() => {
    const AVG_INTERVAL_SECONDS = (MIN_TICK_SECONDS + MAX_TICK_SECONDS) / 2;
    const RATE_PER_SECOND = DONATION_PER_TICK / AVG_INTERVAL_SECONDS;

    fetch("/api/get-counter")
      .then((res) => res.json())
      .then((data: { base_amount?: number; start_timestamp?: number }) => {
        if (data.base_amount == null || data.start_timestamp == null) {
          setDisplayAmount(0);
          console.warn("Counter not started. Visit /api/start-counter to begin.");
          return;
        }

        const now = Date.now();
        const elapsedMilliseconds = now - data.start_timestamp;
        const elapsedSeconds = elapsedMilliseconds / 1000;
        const earnedDonations = elapsedSeconds * RATE_PER_SECOND;
        const trueCurrentAmount = data.base_amount + earnedDonations;

        setDisplayAmount(trueCurrentAmount);
      })
      .catch((err) => {
        console.error("Failed to fetch counter data", err);
        // Fallback if API fails
        setDisplayAmount(0); 
      });
  }, []);

  return (
    <AnimatedPage>
      <div className="min-h-screen py-20 relative overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-transparent to-transparent">
        
        <div className="container px-4 relative z-20">
          {/* Header Section */}
          <section className="text-center mb-16">
            <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-6">
              <Droplets className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">H₂0 The Free Water</h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              For every bottle sold, <span className="font-bold text-primary">₹0.10</span> is donated to save water,
              supporting the various NGOs and other non-profit organizations.
            </p>
          </section>

          {/* Counter and Visual Section */}
          <section className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            {/* Live Counter */}
            <div className="bg-card border border-border rounded-lg p-8 shadow-lg text-center backdrop-blur-sm">
              <p className="text-2xl text-muted-foreground mb-2">Amount Donated So Far</p>
              <h2 className="text-6xl font-bold text-primary">₹{displayAmount !== null ? formatCurrency(displayAmount) : "..."}</h2>
            </div>

            {/* Interactive Water Bottle Visual */}
            <div className="flex justify-center items-center p-4">
              <div
                className="
                w-48 h-80 
                bg-background 
                border-4 border-primary/50 
                rounded-t-3xl rounded-b-xl 
                relative overflow-hidden
                shadow-inner
                "
              >
                {/* Bottle Cap */}
                <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 w-16 h-4 bg-primary/50 rounded-t-md z-30"></div>

                {/* Pouring Stream (Animation) */}
                <div className="stream-animation absolute top-0 left-1/2 -translate-x-1/2 w-3 bg-blue-400/50 z-20 rounded-b-full"></div>

                {/* Water Inside - Fills up then waves */}
                <div
                  className="
                    fill-animation
                    absolute bottom-0 left-0 w-full 
                    bg-blue-400/30 
                    rounded-t-xl
                    overflow-hidden
                    z-10
                  "
                >
                  {/* Wave effect */}
                  <div
                    className="
                      absolute top-[-20px] left-[-50px] w-[200%] h-12 
                      bg-background/80 
                      rounded-full wave-animation
                    "
                  ></div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Custom styles for fill and pour animations */}
        <style>{`
          .animate-page-entry {
            animation: fadeEntry 0.8s ease-out forwards;
          }
          @keyframes fadeEntry {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }

          /* Pouring Stream Animation */
          .stream-animation {
            height: 0;
            opacity: 0;
            animation: pourAction 2.5s ease-out forwards;
          }

          @keyframes pourAction {
            0% {
              height: 0;
              opacity: 0;
            }
            10% {
              height: 100%; /* Stream hits bottom */
              opacity: 1;
            }
            85% {
              height: 100%; /* Stream continues flowing */
              opacity: 1;
              top: 0;
            }
            100% {
              height: 0;
              top: 100%; /* Stream falls away at the end */
              opacity: 0;
            }
          }

          /* Filling Animation */
          .fill-animation {
            height: 0%; /* Start empty */
            animation: fillUp 2.2s ease-out forwards;
            animation-delay: 0.2s; /* Start slightly after stream appears */
          }

          @keyframes fillUp {
            0% {
              height: 0%;
            }
            100% {
              height: 75%; /* Target height */
            }
          }

          /* Continuous Wave Animation */
          .wave-animation {
            animation: wave 6s ease-in-out infinite;
            opacity: 0.9;
          }

          @keyframes wave {
            0% { transform: translateX(0) translateY(0) rotate(0); }
            50% { transform: translateX(15%) translateY(-4px) rotate(0.6deg); }
            100% { transform: translateX(0) translateY(0) rotate(0); }
          }

          @media (prefers-reduced-motion: reduce) {
            .stream-animation, .fill-animation, .wave-animation, .animate-page-entry {
              animation: none !important;
              opacity: 1;
            }
            .fill-animation {
              height: 75%;
            }
            .stream-animation {
                display: none;
            }
          }
        `}</style>
      </div>
    </AnimatedPage>
  );
};

export default H2OPage;