import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import AnimatedPage from '../components/AnimatedPage';

// --- 3D IMPORTS ---
import { Canvas } from '@react-three/fiber';
import { useGLTF, Stage, OrbitControls, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import InteractiveCanvasGrid from '../components/InteractiveCanvasGrid';

function Model() {
  const { scene } = useGLTF('/elsa-model.glb');
  const screenTexture = useTexture('/screen-texture.jpg');
  
  screenTexture.flipY = false; 
  screenTexture.colorSpace = THREE.SRGBColorSpace; 

  scene.traverse((child: any) => {
    if (child.isMesh && child.name === 'LEDScreen') {
      child.material = new THREE.MeshBasicMaterial({
        map: screenTexture,
        toneMapped: false, 
      });
    }
  });

  // LOCKED ORIENTATION: Front Facing + Mirrored to fix inversion
  return <primitive object={scene} rotation={[Math.PI / 2, 0, 0]} scale={[-1, 1, 1]} />;
}

export default function ProductInspect() {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const originalBodyBg = document.body.style.backgroundColor;
    document.body.style.backgroundColor = "#020203";

    return () => {
      document.body.style.overflow = "auto";
      document.body.style.backgroundColor = originalBodyBg;
    };
  }, []);

  return (
    <AnimatedPage>
      <Helmet>
        <title>Inspect ELSA | Plugged In</title>
        <meta name="description" content="Interactive 3D view of the ELSA Emergency Device." />
      </Helmet>

      {/* Styled in rich tech black to match the theme */}
      <div className="relative w-full h-screen bg-[#020203] overflow-hidden text-white">
        
        {/* Full-Screen Interactive Connected Particle Matrix Grid */}
        <div className="opacity-30 pointer-events-none">
          <InteractiveCanvasGrid />
        </div>

        {/* Header decoration line */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#E7BB55]/25 to-transparent z-40" />

        <div className="absolute top-24 left-6 z-50">
          <Button 
            variant="outline" 
            size="sm" 
            asChild 
            className="bg-black/60 border-[#E7BB55]/30 text-[#E7BB55] hover:bg-[#E7BB55] hover:text-black transition-all duration-300 rounded"
          >
            <Link to="/elsa">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Product
            </Link>
          </Button>
        </div>

        {/* 3D Canvas Scene */}
        <div className="w-full h-full cursor-move">
          <Canvas dpr={[1, 2]} camera={{ fov: 45 }}>
             <Stage environment="city" intensity={0.8} adjustCamera={1.5}>
                <Model />
             </Stage>

             {/* Orbit Controls with full vertical/horizontal rotation unlocked */}
             <OrbitControls 
                enablePan={false}
                minDistance={2}
                maxDistance={10}
                autoRotate={false}
                minPolarAngle={0} 
                maxPolarAngle={Math.PI}
             />
          </Canvas>
        </div>
        
        {/* Futuristic instruction prompt */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none text-center z-40 space-y-1">
           <p className="text-[10px] md:text-xs font-mono text-[#E7BB55] uppercase tracking-widest animate-pulse">
               DIAGNOSTICS_VIEW // INTERACTIVE_3D_MODEL
           </p>
           <p className="text-[9px] md:text-[10px] font-sans text-zinc-500 uppercase tracking-widest">
               Drag to Rotate • Scroll to Zoom
           </p>
        </div>
      </div>
    </AnimatedPage>
  );
}