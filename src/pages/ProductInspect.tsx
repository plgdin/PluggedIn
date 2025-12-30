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
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <AnimatedPage>
      <Helmet>
        <title>Inspect ELSA | Plugged In</title>
        <meta name="description" content="Interactive 3D view of the ELSA Emergency Device." />
      </Helmet>

      <div className="relative w-full h-screen bg-[#f0ebd8] overflow-hidden">
        
        <div className="absolute top-24 left-4 z-50">
          <Button 
            variant="outline" 
            size="sm" 
            asChild 
            className="bg-white/80 backdrop-blur-sm border-[#3e2b26]/20 text-[#3e2b26] hover:bg-[#3e2b26]/10 hover:text-[#3e2b26]"
          >
            <Link to="/elsa">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Product
            </Link>
          </Button>
        </div>

        <div className="w-full h-full cursor-move">
          <Canvas dpr={[1, 2]} camera={{ fov: 45 }}>
             <Stage environment="city" intensity={0.6} adjustCamera={1.5}>
                <Model />
             </Stage>

             {/* --- ROTATION FIX IS HERE --- */}
             <OrbitControls 
                enablePan={false}
                minDistance={2}
                maxDistance={10}
                autoRotate={false}
                // These two lines UNLOCK the full 360 vertical rotation:
                minPolarAngle={0} 
                maxPolarAngle={Math.PI}
             />
          </Canvas>
        </div>
        
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none text-center opacity-50 z-40">
           <p className="text-xs md:text-sm font-sans text-[#3e2b26] uppercase tracking-wider">
               Drag to Rotate • Scroll to Zoom
           </p>
        </div>
      </div>
    </AnimatedPage>
  );
}