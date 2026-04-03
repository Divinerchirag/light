"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import LanyardScene from "./LanyardScene";

export default function LanyardCanvas() {
  return (
    <div className="w-full h-[600px] lg:h-[800px] cursor-grab active:cursor-grabbing relative">
      <Canvas
        camera={{ position: [0, 0, 30], fov: 20 }}
        style={{ width: "100%", height: "100%", background: "transparent" }}
        gl={{ alpha: true, antialias: true }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
      >
        <ambientLight intensity={2} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} />
        <directionalLight position={[-5, -5, -5]} intensity={0.5} />
        <Suspense fallback={null}>
          <Physics gravity={[0, -40, 0]} timeStep="vary">
            <LanyardScene />
          </Physics>
        </Suspense>
      </Canvas>
      <div className="absolute bottom-4 right-8 text-xs text-muted-hero font-medium tracking-wide">
        ● DRAG TO INTERACT
      </div>
    </div>
  );
}
