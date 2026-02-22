"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import {
  useThree,
} from "@react-three/fiber";
import{
  OrbitControls,
  Stars,
  Environment,
  useTexture,
  Html,
} from "@react-three/drei"
import { Suspense, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Linkedin, Send, Mail, Github } from "lucide-react";

function Earth() {
  const earthRef = useRef<THREE.Mesh>(null!);
  const cloudsRef = useRef<THREE.Mesh>(null!);

  const [dayMap, nightMap, cloudsMap] = useTexture([
    "/textures/earth/2k_earth_daymap.jpg",
    "/textures/earth/2k_earth_nightmap.jpg",
    "/textures/earth/2k_earth_clouds.jpg",
  ]);

  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.0006;
    }
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y -= 0.0004;
    }
  });

  return (
    <group>
      <mesh ref={earthRef}>
        <sphereGeometry args={[2.5, 64, 64]} />
        <meshPhongMaterial
          map={dayMap}
          emissiveMap={nightMap}
          emissive="#223366"
          emissiveIntensity={1.6}
          shininess={6}
        />
      </mesh>

      <mesh ref={cloudsRef} scale={1.005}>
        <sphereGeometry args={[2.5, 64, 64]} />
        <meshPhongMaterial map={cloudsMap} transparent opacity={0.65} />
      </mesh>
    </group>
  );
}

export default function Home() {
  return (
    <main className="relative h-screen w-full overflow-hidden bg-black">
      <Canvas className="z-10" camera={{ position: [0, 0, 8], fov: 60 }}>
        <color attach="background" args={["#000"]} />
        <ambientLight intensity={0.9} />
        <hemisphereLight intensity={0.7} groundColor="#111133" />
        <directionalLight position={[5, 3, 5]} intensity={1.8} castShadow />
        <pointLight position={[-10, 10, -10]} intensity={1.2} color="#c0d4ff" />

        <Suspense fallback={null}>
          <Earth />
          <Stars
            radius={120}
            depth={80}
            count={8000}
            factor={5}
            saturation={0.4}
            fade
            speed={0.3}
          />
          <Environment preset="night" background={false} />
        </Suspense>

        <OrbitControls enableZoom enablePan minDistance={4} maxDistance={12} />
      </Canvas>

      <div className="absolute top-8 left-8 pointer-events-auto z-30">
        <h2
          className="text-5xl md:text-7xl font-bold tracking-tight"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          <span className="text-blue-500">Solar</span>
          <span className="text-white italic">Forge</span>
        </h2>
      </div>

      <div className="absolute bottom-8 left-8 pointer-events-auto z-30">
        <h2
          className="text-1xl md:text-2xl font-bold tracking-tight"
          style={{ fontFamily: "Sans-serif" }}
        >
          <span className="text-white">Made By Fitsum</span>
        </h2>
      </div>
      <div className="absolute bottom-8 right-8 flex gap-6 pointer-events-auto z-30">
        {/* LinkedIn */}
        <motion.a 
          href="https://www.linkedin.com/in/fitsumfg01" 
          target="_blank" 
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1, color: "#0077b5" }}
        >
          <Linkedin className="text-white" size={28} />
        </motion.a>

        {/* Telegram */}
        <motion.a 
          href="https://t.me/fitsumfg01" 
          target="_blank" 
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1, color: "#229ED9" }}
        >
          <Send className="text-white" size={28} />
        </motion.a>

        {/* Email */}
        <motion.a 
          href="mailto:fitsumfg03@gmail.com" 
          whileHover={{ scale: 1.1 }}
        >
          <Mail className="text-white" size={28} />
        </motion.a>

        {/* Github */}
        <motion.a 
          href="https://github.com/fitsumfg01" 
          target="_blank" 
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }}
        >
          <Github className="text-white" size={28} />
        </motion.a>
      </div>
    </main>
  );
}