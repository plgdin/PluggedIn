import React, { useRef, useEffect } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseVx: number;
  baseVy: number;
  radius: number;
}

export const InteractiveCanvasGrid: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const mouse = useRef({ x: -1000, y: -1000, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const PARTICLE_COUNT = 85;
    const CONNECTION_DIST = 145;
    const MAGNET_RADIUS = 280; // Interactive hover zone
    const MAGNET_FORCE = 0.15; // Strong magnet pull

    // Initialize particles randomly across the screen
    const initParticles = () => {
      particles.current = [];
      const width = window.innerWidth;
      const height = window.innerHeight;

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const vx = (Math.random() - 0.5) * 0.5;
        const vy = (Math.random() - 0.5) * 0.5;
        particles.current.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: vx,
          vy: vy,
          baseVx: vx,
          baseVy: vy,
          radius: Math.random() * 2.5 + 2, // Large, visible nodes
        });
      }
    };

    // Set canvas dimensions to fit viewport and scale for high-DPI screens
    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
      initParticles();
    };

    const animate = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      ctx.clearRect(0, 0, width, height);

      const len = particles.current.length;
      const time = Date.now() * 0.0012; // Time variable for rotations

      // Update particle positions
      for (let i = 0; i < len; i++) {
        const p = particles.current[i];

        let targetVx = p.baseVx;
        let targetVy = p.baseVy;

        // Mouse hover deformation
        if (mouse.current.active) {
          const dx = mouse.current.x - p.x;
          const dy = mouse.current.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAGNET_RADIUS) {
            const force = (1 - dist / MAGNET_RADIUS) * MAGNET_FORCE;
            targetVx += (dx / (dist || 1)) * force * 1.5;
            targetVy += (dy / (dist || 1)) * force * 1.5;
          }
        }

        // Apply velocities
        p.vx += (targetVx - p.vx) * 0.1;
        p.vy += (targetVy - p.vy) * 0.1;
        p.x += p.vx;
        p.y += p.vy;

        // Boundaries wrapping
        if (p.x < -20) p.x = width + 20;
        else if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        else if (p.y > height + 20) p.y = -20;
      }

      // Draw connection lines and translucent triangular faces
      for (let i = 0; i < len; i++) {
        const p1 = particles.current[i];

        for (let j = i + 1; j < len; j++) {
          const p2 = particles.current[j];
          const dx12 = p1.x - p2.x;
          const dy12 = p1.y - p2.y;
          const dist12 = Math.sqrt(dx12 * dx12 + dy12 * dy12);

          if (dist12 < CONNECTION_DIST) {
            let lineAlpha = (1 - dist12 / CONNECTION_DIST) * 0.25;

            // Fills/highlights lines closer to cursor
            if (mouse.current.active) {
              const d1m = Math.sqrt(Math.pow(mouse.current.x - p1.x, 2) + Math.pow(mouse.current.y - p1.y, 2));
              const d2m = Math.sqrt(Math.pow(mouse.current.x - p2.x, 2) + Math.pow(mouse.current.y - p2.y, 2));
              if (d1m < MAGNET_RADIUS && d2m < MAGNET_RADIUS) {
                lineAlpha += (1 - (d1m + d2m) / (MAGNET_RADIUS * 2)) * 0.35;
              }
            }

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(231, 187, 85, ${lineAlpha})`;
            ctx.lineWidth = mouse.current.active && lineAlpha > 0.4 ? 0.95 : 0.6;
            ctx.stroke();

            // Find a third particle to build a 3D mesh polygon face near the cursor
            for (let k = j + 1; k < len; k++) {
              const p3 = particles.current[k];
              const dx23 = p2.x - p3.x;
              const dy23 = p2.y - p3.y;
              const dist23 = Math.sqrt(dx23 * dx23 + dy23 * dy23);

              const dx31 = p3.x - p1.x;
              const dy31 = p3.y - p1.y;
              const dist31 = Math.sqrt(dx31 * dx31 + dy31 * dy31);

              if (dist23 < CONNECTION_DIST && dist31 < CONNECTION_DIST) {
                if (mouse.current.active) {
                  const d3m = Math.sqrt(Math.pow(mouse.current.x - p3.x, 2) + Math.pow(mouse.current.y - p3.y, 2));
                  const d1m = Math.sqrt(Math.pow(mouse.current.x - p1.x, 2) + Math.pow(mouse.current.y - p1.y, 2));
                  const d2m = Math.sqrt(Math.pow(mouse.current.x - p2.x, 2) + Math.pow(mouse.current.y - p2.y, 2));

                  const avgDistToMouse = (d1m + d2m + d3m) / 3;
                  
                  if (avgDistToMouse < MAGNET_RADIUS) {
                    const fillAlpha = (1 - avgDistToMouse / MAGNET_RADIUS) * 0.09;
                    ctx.fillStyle = `rgba(231, 187, 85, ${fillAlpha})`;
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.lineTo(p3.x, p3.y);
                    ctx.closePath();
                    ctx.fill();
                  }
                }
              }
            }
          }
        }
      }

      // Draw nodes on top (Rotating diamonds + Glowing spheres with white cores)
      for (let i = 0; i < len; i++) {
        const p = particles.current[i];
        
        let nodeAlpha = 0.65;
        let scale = 1.0;

        if (mouse.current.active) {
          const dist = Math.sqrt(Math.pow(mouse.current.x - p.x, 2) + Math.pow(mouse.current.y - p.y, 2));
          if (dist < MAGNET_RADIUS) {
            const factor = 1 - dist / MAGNET_RADIUS;
            nodeAlpha += factor * 0.35;
            scale += factor * 0.45; // Grow nodes near cursor
          }
        }

        ctx.shadowColor = "rgba(231, 187, 85, 0.9)";
        ctx.shadowBlur = mouse.current.active && scale > 1.2 ? 8 : 3;

        if (i % 2 === 0) {
          // Rotating Hollow Diamond Shape
          ctx.strokeStyle = `rgba(231, 187, 85, ${nodeAlpha})`;
          ctx.lineWidth = 1.3;
          
          ctx.save();
          ctx.translate(p.x, p.y);
          // Rotate alternating clockwise/counterclockwise
          ctx.rotate(time * (i % 4 === 0 ? 1 : -1) + i);
          
          ctx.beginPath();
          const r = 4.5 * scale;
          ctx.moveTo(0, -r);
          ctx.lineTo(r, 0);
          ctx.lineTo(0, r);
          ctx.lineTo(-r, 0);
          ctx.closePath();
          ctx.stroke();
          
          ctx.restore();
        } else {
          // Glowing Gold Sphere with White Inner Core
          ctx.fillStyle = `rgba(231, 187, 85, ${nodeAlpha * 0.85})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 3 * scale, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = `rgba(255, 255, 255, ${nodeAlpha})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 1.2 * scale, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.shadowBlur = 0; // Reset shadows

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      mouse.current.active = true;
    };

    const handleMouseLeave = () => {
      mouse.current.active = false;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("resize", handleResize);

    handleResize();
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0 mix-blend-screen opacity-90"
    />
  );
};

export default InteractiveCanvasGrid;
