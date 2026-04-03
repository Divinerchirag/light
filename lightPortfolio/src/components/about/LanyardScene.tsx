"use client";

import React, { useRef, useState } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { RigidBody, useSphericalJoint, BallCollider, CuboidCollider, RapierRigidBody } from "@react-three/rapier";
import LanyardCard from "./LanyardCard";

// Tuned constants — keep everything inside the camera frustum
const ANCHOR_Y = 3.8;
const SEGMENT_COUNT = 12;
const SEGMENT_LENGTH = 0.18;
const CARD_WIDTH = 1.6;
const CARD_HEIGHT = 2.2;
const ROPE_RADIUS = 0.03;

// Individual Spherical Joint Wrapper
function RopeSegment({ bodyA, bodyB, anchorA, anchorB }: any) {
   useSphericalJoint(bodyA, bodyB, [anchorA, anchorB]);
   return null;
}

export default function LanyardScene() {
   const curve = useRef(new THREE.CatmullRomCurve3(Array.from({ length: SEGMENT_COUNT + 1 }, () => new THREE.Vector3()), false, "chordal", 0.5));
   const tubeMeshRef = useRef<THREE.Mesh>(null);

   const [refs] = useState(() => Array.from({ length: SEGMENT_COUNT + 1 }, () => React.createRef<RapierRigidBody>()));
   const [dragTarget, setDragTarget] = useState<RapierRigidBody | null>(null);

   const handlePointerDown = (e: any) => {
      e.stopPropagation();
      if (refs[SEGMENT_COUNT].current) {
         setDragTarget(refs[SEGMENT_COUNT].current);
         document.body.style.cursor = "grabbing";
         (window as any).__lenis?.stop();
      }
   };

   const handlePointerUp = () => {
      setDragTarget(null);
      document.body.style.cursor = "auto";
      (window as any).__lenis?.start();
   };

   const handlePointerMove = (e: any) => {
      if (dragTarget) {
         const impulseX = e.movementX * 0.8;
         const impulseY = -e.movementY * 0.8;
         dragTarget.applyImpulse({ x: impulseX, y: impulseY, z: 0 }, true);
      }
   };

   useFrame(() => {
      if (!tubeMeshRef.current) return;
      const currentCurve = curve.current;

      for (let i = 0; i <= SEGMENT_COUNT; i++) {
         const body = refs[i].current;
         if (body) {
            const pos = body.translation();
            currentCurve.points[i].set(pos.x, pos.y, pos.z);
         }
      }

      currentCurve.updateArcLengths();
      tubeMeshRef.current.geometry.dispose();
      tubeMeshRef.current.geometry = new THREE.TubeGeometry(currentCurve, 30, ROPE_RADIUS, 8, false);
   });

   return (
      <group onPointerMove={handlePointerMove} onPointerUp={handlePointerUp} onPointerLeave={handlePointerUp}>
         {/* Fixed anchor at top */}
         <RigidBody ref={refs[0]} type="fixed" position={[0, ANCHOR_Y, 0]}>
            <BallCollider args={[0.05]} />
         </RigidBody>

         {/* Rope segments + Card */}
         {Array.from({ length: SEGMENT_COUNT }).map((_, i) => (
            <React.Fragment key={i}>
               <RigidBody
                  ref={refs[i + 1]}
                  position={[0, ANCHOR_Y - (i + 1) * SEGMENT_LENGTH, 0]}
                  linearDamping={2.5}
                  angularDamping={2.5}
                  colliders={false}
                  mass={i === SEGMENT_COUNT - 1 ? 2 : 0.2}
               >
                  {i === SEGMENT_COUNT - 1 ? (
                     // Card body at end of rope
                     <group onPointerDown={handlePointerDown}>
                        <CuboidCollider args={[CARD_WIDTH / 2, CARD_HEIGHT / 2, 0.01]} position={[0, -CARD_HEIGHT / 2 - 0.2, 0]} />
                        {/* Visible card backing mesh */}
                        <mesh position={[0, -CARD_HEIGHT / 2 - 0.2, 0]}>
                           <boxGeometry args={[CARD_WIDTH, CARD_HEIGHT, 0.02]} />
                           <meshStandardMaterial color="#f8f4ee" roughness={0.3} />
                        </mesh>
                        {/* HTML card overlay */}
                        <group scale={0.005} position={[0, -CARD_HEIGHT / 2 - 0.2, 0.02]}>
                           <LanyardCard />
                        </group>
                     </group>
                  ) : (
                     <BallCollider args={[0.04]} />
                  )}
               </RigidBody>

               <RopeSegment
                  bodyA={refs[i]}
                  bodyB={refs[i + 1]}
                  anchorA={[0, -SEGMENT_LENGTH / 2, 0]}
                  anchorB={[0, SEGMENT_LENGTH / 2, 0]}
               />
            </React.Fragment>
         ))}

         {/* Rope tube mesh */}
         <mesh ref={tubeMeshRef}>
            <meshStandardMaterial color="#2a2a2a" roughness={0.8} />
         </mesh>
      </group>
   );
}
