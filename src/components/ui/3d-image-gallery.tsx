import React, { Suspense, useEffect, useMemo, useRef, useState, createContext, useContext } from "react"
import * as THREE from "three"
import { Canvas, useFrame } from "@react-three/fiber"
import {
  OrbitControls,
  Environment,
  Html,
  Plane,
  Sphere,
} from "@react-three/drei"
import { X, ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"

// Import Team Images
import anshajImage from "../../assets/team/Anshaj.jpg";
import georgeImage from "../../assets/team/George.jpg";
import alanImage from "../../assets/team/Alan.jpg";
import adityaImage from "../../assets/team/Aditya.jpg";
import adithyanImage from "../../assets/team/Adithyan.jpg";
import karanImage from "../../assets/team/Karan.jpg";

type Card = {
  id: string
  imageUrl: string
  alt: string
  title: string
  role: string
  description: string
  quote: string
  bgColor: string
  borderColor: string
  fontColor: string
  fontStyle: string
}

type CardContextType = {
  selectedCard: Card | null
  setSelectedCard: (card: Card | null) => void
  cards: Card[]
}

const CardContext = createContext<CardContextType | undefined>(undefined)

function useCard() {
  const ctx = useContext(CardContext)
  if (!ctx) throw new Error("useCard must be used within CardProvider")
  return ctx
}

function CardProvider({ children }: { children: React.ReactNode }) {
  const [selectedCard, setSelectedCard] = useState<Card | null>(null)

  const cards: Card[] = [
    { 
      id: "1", 
      imageUrl: anshajImage, 
      alt: "Annshaj", 
      title: "Annshaj",
      role: "Chief Executive Officer",
      description: "He runs the whole company but his main job is walking into rooms and looking important.",
      quote: "He's the main character and he knows it.",
      bgColor: "rgba(11, 19, 43, 0.75)",
      borderColor: "rgba(231, 187, 85, 0.5)",
      fontColor: "#FCD34D", // Amber Gold
      fontStyle: "font-serif italic font-medium"
    },
    { 
      id: "2", 
      imageUrl: georgeImage, 
      alt: "George Joseph", 
      title: "George Joseph",
      role: "Chief Marketing Officer",
      description: "He makes the company go viral for the wrong reasons and calls it \"brand awareness.\"",
      quote: "He put the logo on a tote bag and called it a campaign.",
      bgColor: "rgba(45, 11, 19, 0.75)",
      borderColor: "rgba(251, 113, 133, 0.5)",
      fontColor: "#FB7185", // Rose Coral
      fontStyle: "font-sans tracking-tight uppercase font-black"
    },
    { 
      id: "3", 
      imageUrl: alanImage, 
      alt: "Alan Biji Alex", 
      title: "Alan Biji Alex",
      role: "Chief Operating Officer",
      description: "He runs the meetings about other meetings and optimizes processes that were already fine, bestie.",
      quote: "He made a Notion page for the Notion page.",
      bgColor: "rgba(11, 45, 30, 0.75)",
      borderColor: "rgba(52, 211, 153, 0.5)",
      fontColor: "#34D399", // Emerald Mint
      fontStyle: "font-mono tracking-widest font-semibold"
    },
    { 
      id: "4", 
      imageUrl: adityaImage, 
      alt: "Aditya R", 
      title: "Aditya R",
      role: "Chief Technology Officer",
      description: "He has 47 browser tabs open, uses Linux btw, and hasn't touched actual code in 4 years.",
      quote: "He's rewriting it in Rust. Don't ask.",
      bgColor: "rgba(29, 14, 46, 0.75)",
      borderColor: "rgba(165, 180, 252, 0.5)",
      fontColor: "#A5B4FC", // Indigo Cyber
      fontStyle: "font-sans tracking-wider font-extrabold uppercase"
    },
    { 
      id: "5", 
      imageUrl: adithyanImage, 
      alt: "Adithyan S.M", 
      title: "Adithyan S.M.",
      role: "Chief Financial Officer",
      description: "He looks at every idea and says \"but where's the revenue?\" while crying in spreadsheet.",
      quote: "He said no to the team lunch upgrade. It's personal.",
      bgColor: "rgba(31, 36, 33, 0.75)",
      borderColor: "rgba(203, 213, 225, 0.5)",
      fontColor: "#E2E8F0", // Slate Platinum
      fontStyle: "font-sans font-light tracking-widest uppercase"
    },
    { 
      id: "6", 
      imageUrl: karanImage, 
      alt: "Karan A S", 
      title: "Karan A.S.",
      role: "Chief Design Officer",
      description: "He rejected the button color 11 times and spent 3 weeks debating whether the padding is \"off by 2px.\"",
      quote: "He says it's not about aesthetics. It's about the feeling.",
      bgColor: "rgba(46, 26, 14, 0.75)",
      borderColor: "rgba(253, 186, 116, 0.5)",
      fontColor: "#FDBA74", // Bronze Copper
      fontStyle: "font-display tracking-widest font-black uppercase italic"
    }
  ];

  return (
    <CardContext.Provider value={{ selectedCard, setSelectedCard, cards }}>
      {children}
    </CardContext.Provider>
  )
}

/* =========================
   Starfield Background (Inlined & Gold themed)
   ========================= */

function StarfieldBackground() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mountRef.current) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setClearColor(0x000000, 1)
    mountRef.current.appendChild(renderer.domElement)

    const starsGeometry = new THREE.BufferGeometry()
    const starsCount = 10000
    const positions = new Float32Array(starsCount * 3)
    for (let i = 0; i < starsCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 2000
      positions[i * 3 + 1] = (Math.random() - 0.5) * 2000
      positions[i * 3 + 2] = (Math.random() - 0.5) * 2000
    }
    starsGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))
    
    // Golden stars color: #E7BB55
    const starsMaterial = new THREE.PointsMaterial({ 
      color: 0xE7BB55, 
      size: 0.9, 
      sizeAttenuation: true 
    })
    const stars = new THREE.Points(starsGeometry, starsMaterial)
    scene.add(stars)

    camera.position.z = 10

    let animationId = 0
    const animate = () => {
      animationId = requestAnimationFrame(animate)
      stars.rotation.y += 0.00012
      stars.rotation.x += 0.00006
      renderer.render(scene, camera)
    }
    animate()

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationId)
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement)
      }
      renderer.dispose()
      starsGeometry.dispose()
      starsMaterial.dispose()
    }
  }, [])

  return <div ref={mountRef} className="fixed top-0 left-0 w-full h-full z-0 bg-black" />
}

/* =========================
   Floating Card (Inlined & Scroll adapted)
   ========================= */

function FloatingCard({
  card,
  position,
}: {
  card: Card
  position: { x: number; y: number; z: number; rotationX: number; rotationY: number; rotationZ: number }
}) {
  const groupRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)
  const { setSelectedCard } = useCard()

  useFrame(({ camera }) => {
    if (groupRef.current) {
      groupRef.current.lookAt(camera.position)
    }
  })

  const handleClick = (e: any) => {
    e.stopPropagation()
    setSelectedCard(card)
  }
  const handlePointerOver = (e: any) => {
    e.stopPropagation()
    setHovered(true)
    document.body.style.cursor = "pointer"
  }
  const handlePointerOut = (e: any) => {
    e.stopPropagation()
    setHovered(false)
    document.body.style.cursor = "auto"
  }

  return (
    <group ref={groupRef} position={[position.x, position.y, position.z]}>
      <Html
        transform
        distanceFactor={10}
        position={[0, 0, 0.01]}
        style={{
          transition: "all 0.3s ease",
          transform: hovered ? "scale(1.15)" : "scale(1)",
          pointerEvents: "auto",
        }}
      >
        <div
          onClick={handleClick}
          onMouseEnter={handlePointerOver}
          onMouseLeave={handlePointerOut}
          className="relative w-40 h-52 select-none border backdrop-blur-md rounded-lg p-3 transition-all duration-300 cursor-pointer"
          style={{
            backgroundColor: card.bgColor,
            borderColor: hovered ? card.fontColor : card.borderColor,
            boxShadow: hovered
              ? `0 20px 40px ${card.fontColor}40, 0 0 25px ${card.fontColor}25`
              : "0 10px 25px rgba(0, 0, 0, 0.8)",
            borderWidth: "1.5px"
          }}
        >
          {/* Faded highlight glow matching member color */}
          <div 
            className="absolute -inset-4 -z-10 rounded-xl filter blur-xl opacity-0 transition-opacity duration-300 pointer-events-none"
            style={{
              background: `radial-gradient(circle, ${card.fontColor}44 0%, transparent 80%)`,
              opacity: hovered ? 1 : 0,
            }}
          />

          <div className="w-full h-40 overflow-hidden rounded-md border border-white/5">
            <img
              src={card.imageUrl || "/placeholder.svg"}
              alt={card.alt}
              className="w-full h-full object-cover"
              loading="lazy"
              draggable={false}
            />
          </div>
          <div className="mt-2.5 text-center">
            <p 
              style={{ color: card.fontColor }} 
              className={`text-xs font-bold truncate tracking-wide ${card.fontStyle}`}
            >
              {card.title}
            </p>
          </div>
        </div>
      </Html>
    </group>
  )
}

/* =========================
   Card Modal (Inlined & Unique styled)
   ========================= */

function CardModal() {
  const { selectedCard, setSelectedCard } = useCard()
  const cardRef = useRef<HTMLDivElement>(null)

  if (!selectedCard) return null

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = (y - centerY) / 18
    const rotateY = (centerX - x) / 18
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
  }

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transition = "transform 0.5s ease-out"
      cardRef.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)"
    }
  }

  const handleClose = () => setSelectedCard(null)
  const handleBackdropClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.target === e.currentTarget) handleClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md" onClick={handleBackdropClick}>
      <div className="relative max-w-sm w-full mx-4">
        <button onClick={handleClose} className="absolute -top-12 right-0 text-[#E7BB55] hover:text-white transition-colors z-10">
          <X className="w-8 h-8" />
        </button>

        <div style={{ perspective: "1000px" }} className="w-full">
          <div
            ref={cardRef}
            className="relative cursor-pointer rounded-xl p-6 transition-all duration-500 ease-out w-full border backdrop-blur-lg"
            style={{
              backgroundColor: selectedCard.bgColor,
              borderColor: selectedCard.borderColor,
              transformStyle: "preserve-3d",
              boxShadow: "0 20px 50px rgba(0, 0, 0, 0.7), 0 0 30px rgba(231, 187, 85, 0.05)",
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div className="relative w-full mb-5 aspect-[4/5]">
              <img
                loading="lazy"
                className="absolute inset-0 h-full w-full rounded-lg bg-black object-cover border border-[#E7BB55]/15"
                alt={selectedCard.alt}
                src={selectedCard.imageUrl || "/placeholder.svg"}
                style={{ boxShadow: "rgba(0, 0, 0, 0.4) 0px 8px 16px" }}
              />
            </div>

            <h3 
              style={{ color: selectedCard.fontColor }} 
              className={`text-2xl font-black mb-1 text-center tracking-wide ${selectedCard.fontStyle}`}
            >
              {selectedCard.title}
            </h3>
            <p className="font-mono text-zinc-400 text-xs uppercase tracking-widest text-center mb-4">
              {selectedCard.role}
            </p>
            
            {selectedCard.description && (
              <p className="font-sans text-zinc-200 text-xs leading-relaxed text-center mb-4 px-2">
                {selectedCard.description}
              </p>
            )}

            {selectedCard.quote && (
              <p 
                style={{ color: `${selectedCard.fontColor}dd` }} 
                className="font-sans text-[11px] leading-relaxed text-center mb-6 italic px-4 py-2.5 rounded bg-black/40 border border-white/5"
              >
                "{selectedCard.quote}"
              </p>
            )}

            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleClose}
                className="inline-flex h-10 flex-1 items-center justify-center rounded-lg text-xs font-display font-bold uppercase tracking-wider text-black outline-none transition duration-300 ease-out hover:opacity-90 active:scale-[0.97]"
                style={{ backgroundColor: "#E7BB55" }}
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* =========================
   Card Galaxy (Scroll-Linked Rotation)
   ========================= */

function CardGalaxy() {
  const { cards } = useCard()
  const groupRef = useRef<THREE.Group>(null)
  
  // Track scroll activity to rotate galaxy
  const [scrollRotation, setScrollRotation] = useState(0)

  useEffect(() => {
    const handleScroll = (e: WheelEvent) => {
      setScrollRotation((prev) => prev + e.deltaY * 0.0012)
    }
    window.addEventListener("wheel", handleScroll, { passive: true })
    return () => window.removeEventListener("wheel", handleScroll)
  }, [])

  useFrame(() => {
    if (groupRef.current) {
      // Smoothly rotate the cards group based on scroll delta
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, scrollRotation, 0.06)
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, scrollRotation * 0.35, 0.06)
    }
  })

  // Distribute 6 cards in a ring orbiting the center
  const cardPositions = useMemo(() => {
    const positions: {
      x: number
      y: number
      z: number
      rotationX: number
      rotationY: number
      rotationZ: number
    }[] = []
    
    const count = cards.length
    const radius = 13 // Distance from center

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2
      positions.push({
        x: Math.cos(angle) * radius,
        y: (i % 2 === 0 ? 1.5 : -1.5), // Alternating height levels
        z: Math.sin(angle) * radius,
        rotationX: 0,
        rotationY: -angle,
        rotationZ: 0,
      })
    }
    return positions
  }, [cards.length])

  return (
    <group ref={groupRef}>
      {/* OUR TEAM Title in the center of the ring */}
      <Html
        position={[0, 0, 0]}
        center
        distanceFactor={10}
        style={{ pointerEvents: "none" }}
      >
        <div className="text-center select-none whitespace-nowrap">
          <h1 className="font-display text-transparent bg-clip-text bg-gradient-to-r from-yellow-100 via-yellow-400 to-yellow-600 text-3xl sm:text-5xl font-black uppercase tracking-widest drop-shadow-[0_0_20px_rgba(231,187,85,0.45)]">
            OUR TEAM
          </h1>
          <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-[#E7BB55] to-transparent mx-auto mt-2" />
        </div>
      </Html>

      {/* Decorative orbital wireframes */}
      <Sphere args={[2, 16, 16]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#E7BB55" transparent opacity={0.05} wireframe />
      </Sphere>
      <Sphere args={[13, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#E7BB55" transparent opacity={0.02} wireframe />
      </Sphere>

      {cards.map((card, i) => (
        <FloatingCard key={card.id} card={card} position={cardPositions[i]} />
      ))}
    </group>
  )
}

/* =========================
   Page/Component Export
   ========================= */

export default function StellarCardGallerySingle() {
  return (
    <CardProvider>
      <div className="w-full h-screen relative overflow-hidden bg-black text-white">
        <StarfieldBackground />

        {/* Back button overlay */}
        <div className="absolute top-24 left-6 z-30">
          <Link
            to="/about"
            className="inline-flex h-9 items-center justify-center rounded border border-[#E7BB55]/30 bg-black/60 px-4 py-2 text-xs font-display font-bold uppercase tracking-wider text-[#E7BB55] hover:bg-[#E7BB55] hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(231,187,85,0.15)]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to About
          </Link>
        </div>

        <Canvas
          camera={{ position: [0, 0, 18], fov: 55 }}
          className="absolute inset-0 z-10"
          onCreated={({ gl }) => {
            gl.domElement.style.pointerEvents = "auto"
          }}
        >
          <Suspense fallback={null}>
            <Environment preset="night" />
            <ambientLight intensity={0.45} />
            <pointLight position={[10, 10, 10]} intensity={0.7} />
            <pointLight position={[-10, -10, -10]} intensity={0.3} />
            <CardGalaxy />
            <OrbitControls
              enablePan={false}
              enableZoom={true}
              enableRotate={true}
              minDistance={6}
              maxDistance={30}
              autoRotate={false}
              rotateSpeed={0.5}
              zoomSpeed={1.2}
              panSpeed={0.8}
              target={[0, 0, 0]}
            />
          </Suspense>
        </Canvas>

        <CardModal />

        {/* Bottom instructions */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none text-center space-y-1">
          <p className="text-[9px] md:text-[10px] font-sans text-zinc-500 uppercase tracking-widest">
            Drag to Rotate • Scroll to Rotate & Zoom • Click Cards to View
          </p>
        </div>
      </div>
    </CardProvider>
  )
}
