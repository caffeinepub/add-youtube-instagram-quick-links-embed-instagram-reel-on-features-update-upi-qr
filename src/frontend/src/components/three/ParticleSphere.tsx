import { useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
import ThreeCanvas from "./ThreeCanvas";

// Pre-compute letter positions for "ZEROX"
function getZeroxTextPositions(): THREE.Vector3[] {
  // Pixel-art style letter positions for Z-E-R-O-X
  const letters: [number, number][][] = [
    // Z
    [
      [0, 3],
      [1, 3],
      [2, 3],
      [2, 2],
      [1, 1],
      [0, 0],
      [1, 0],
      [2, 0],
    ],
    // E
    [
      [4, 3],
      [5, 3],
      [6, 3],
      [4, 2],
      [5, 2],
      [4, 1],
      [4, 0],
      [5, 0],
      [6, 0],
    ],
    // R
    [
      [8, 3],
      [9, 3],
      [10, 3],
      [8, 2],
      [9, 2],
      [10, 1],
      [8, 1],
      [8, 0],
    ],
    // O
    [
      [12, 3],
      [13, 3],
      [14, 3],
      [12, 2],
      [14, 2],
      [12, 1],
      [14, 1],
      [12, 0],
      [13, 0],
      [14, 0],
    ],
    // X
    [
      [16, 3],
      [18, 3],
      [17, 2],
      [16, 1],
      [18, 1],
      [16, 0],
      [18, 0],
    ],
  ];

  const positions: THREE.Vector3[] = [];
  for (const letter of letters) {
    for (const [x, y] of letter) {
      positions.push(new THREE.Vector3((x - 9) * 0.2, (y - 1.5) * 0.2, 0));
    }
  }
  return positions;
}

const PARTICLE_COUNT = 800;

function ParticleSphereInner() {
  const pointsRef = useRef<THREE.Points>(null);
  const [morphed, setMorphed] = useState(false);
  const morphProgress = useRef(0);
  const isDragging = useRef(false);
  const previousMouse = useRef({ x: 0, y: 0 });
  const dragRotation = useRef({ x: 0, y: 0 });

  // Sphere positions
  const spherePositions = useMemo(() => {
    const arr = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const phi = Math.acos(-1 + (2 * i) / PARTICLE_COUNT);
      const theta = Math.sqrt(PARTICLE_COUNT * Math.PI) * phi;
      arr[i * 3] = Math.cos(theta) * Math.sin(phi) * 1.5;
      arr[i * 3 + 1] = Math.sin(theta) * Math.sin(phi) * 1.5;
      arr[i * 3 + 2] = Math.cos(phi) * 1.5;
    }
    return arr;
  }, []);

  // Text positions
  const textPositions = useMemo(() => {
    const basePositions = getZeroxTextPositions();
    const arr = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const base = basePositions[i % basePositions.length];
      const jitter = 0.05;
      arr[i * 3] = base.x + (Math.random() - 0.5) * jitter;
      arr[i * 3 + 1] = base.y + (Math.random() - 0.5) * jitter;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 0.1;
    }
    return arr;
  }, []);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute(
      "position",
      new THREE.BufferAttribute(spherePositions.slice(), 3),
    );
    return geo;
  }, [spherePositions]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();

    // Morph progress
    if (morphed) {
      morphProgress.current = Math.min(morphProgress.current + 0.03, 1);
    } else {
      morphProgress.current = Math.max(morphProgress.current - 0.03, 0);
    }

    const t = morphProgress.current;
    const positions = pointsRef.current.geometry.attributes.position
      .array as Float32Array;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3] =
        spherePositions[i * 3] * (1 - t) + textPositions[i * 3] * t;
      positions[i * 3 + 1] =
        spherePositions[i * 3 + 1] * (1 - t) + textPositions[i * 3 + 1] * t;
      positions[i * 3 + 2] =
        spherePositions[i * 3 + 2] * (1 - t) + textPositions[i * 3 + 2] * t;
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    // Auto-rotate when not morphed and not dragging
    if (!morphed && !isDragging.current) {
      pointsRef.current.rotation.y = time * 0.3 + dragRotation.current.y;
      pointsRef.current.rotation.x =
        Math.sin(time * 0.2) * 0.1 + dragRotation.current.x;
    } else if (!morphed && isDragging.current) {
      pointsRef.current.rotation.y = dragRotation.current.y;
      pointsRef.current.rotation.x = dragRotation.current.x;
    } else {
      // When morphed, face forward
      pointsRef.current.rotation.y += (0 - pointsRef.current.rotation.y) * 0.05;
      pointsRef.current.rotation.x += (0 - pointsRef.current.rotation.x) * 0.05;
    }
  });

  return (
    <group>
      <points
        ref={pointsRef}
        geometry={geometry}
        onPointerDown={(e) => {
          isDragging.current = true;
          previousMouse.current = { x: e.clientX, y: e.clientY };
          setMorphed(true);
          e.stopPropagation();
        }}
        onPointerMove={(e) => {
          if (!isDragging.current) return;
          const dx = e.clientX - previousMouse.current.x;
          const dy = e.clientY - previousMouse.current.y;
          dragRotation.current.y += dx * 0.01;
          dragRotation.current.x += dy * 0.01;
          previousMouse.current = { x: e.clientX, y: e.clientY };
        }}
        onPointerUp={() => {
          isDragging.current = false;
          setMorphed(false);
        }}
        onPointerLeave={() => {
          isDragging.current = false;
          setMorphed(false);
        }}
      >
        <pointsMaterial
          size={0.05}
          color="#00d9ff"
          transparent
          opacity={0.9}
          sizeAttenuation
        />
      </points>

      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={2} color="#00ffff" />
      <pointLight position={[-5, -5, -5]} intensity={1} color="#7700ff" />
    </group>
  );
}

export default function ParticleSphere() {
  return (
    <ThreeCanvas className="w-full h-full">
      <ParticleSphereInner />
    </ThreeCanvas>
  );
}
