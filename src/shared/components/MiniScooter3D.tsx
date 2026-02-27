import { useRef, Suspense, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import Box from '@mui/material/Box';

const CYAN = '#00C2FF';
const RED  = '#E63946';
const DARK = '#0B0B0E';

/* ─── Scooter geometry ─────────────────────────────────────────────── */
function MiniScoot() {
  const groupRef  = useRef<THREE.Group>(null!);
  const wheel1Ref = useRef<THREE.Mesh>(null!);
  const wheel2Ref = useRef<THREE.Mesh>(null!);
  const ring1Ref  = useRef<THREE.Mesh>(null!);
  const ring2Ref  = useRef<THREE.Mesh>(null!);
  const glowRef   = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    groupRef.current.rotation.y  = Math.sin(t * 0.45) * 0.28 - 0.2;
    groupRef.current.position.y  = Math.sin(t * 0.9) * 0.055;

    wheel1Ref.current.rotation.x += 0.045;
    wheel2Ref.current.rotation.x += 0.045;

    ring1Ref.current.rotation.z += 0.014;
    ring2Ref.current.rotation.x  += 0.009;
    ring2Ref.current.rotation.z  += 0.006;

    const pulse = 0.35 + Math.sin(t * 2.5) * 0.15;
    (glowRef.current.material as THREE.MeshBasicMaterial).opacity = pulse;
  });

  const dark  = new THREE.Color(DARK);
  const cyan  = new THREE.Color(CYAN);

  return (
    <group ref={groupRef}>
      {/* Body */}
      <mesh position={[0, 0.12, 0]}>
        <boxGeometry args={[0.85, 0.16, 0.19]} />
        <meshStandardMaterial color={dark} metalness={0.92} roughness={0.12}
          emissive={cyan} emissiveIntensity={0.18} />
      </mesh>

      {/* Deck */}
      <mesh position={[0.12, 0.03, 0]}>
        <boxGeometry args={[0.52, 0.045, 0.13]} />
        <meshStandardMaterial color="#111116" metalness={0.8} roughness={0.22} />
      </mesh>

      {/* Handlebar column */}
      <mesh position={[-0.37, 0.32, 0]} rotation={[0, 0, -0.14]}>
        <cylinderGeometry args={[0.026, 0.026, 0.48, 8]} />
        <meshStandardMaterial color={dark} metalness={0.92} roughness={0.1}
          emissive={cyan} emissiveIntensity={0.35} />
      </mesh>

      {/* Handlebar H-bar */}
      <mesh position={[-0.41, 0.54, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.016, 0.016, 0.3, 8]} />
        <meshStandardMaterial color={dark} metalness={0.92} roughness={0.1}
          emissive={cyan} emissiveIntensity={0.35} />
      </mesh>

      {/* Front fork */}
      <mesh position={[-0.37, 0.0, 0]} rotation={[0, 0, -0.14]}>
        <cylinderGeometry args={[0.014, 0.014, 0.24, 6]} />
        <meshStandardMaterial color="#1a1a22" metalness={0.9} roughness={0.15} />
      </mesh>

      {/* Front wheel */}
      <mesh ref={wheel1Ref} position={[-0.38, -0.1, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.19, 0.042, 8, 20]} />
        <meshStandardMaterial color="#1a1a1f" metalness={0.9} roughness={0.15}
          emissive={cyan} emissiveIntensity={0.22} />
      </mesh>

      {/* Rear wheel */}
      <mesh ref={wheel2Ref} position={[0.38, -0.1, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.19, 0.042, 8, 20]} />
        <meshStandardMaterial color="#1a1a1f" metalness={0.9} roughness={0.15}
          emissive={cyan} emissiveIntensity={0.22} />
      </mesh>

      {/* Glow disc under chassis */}
      <mesh ref={glowRef} position={[0, -0.14, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.8, 0.2]} />
        <meshBasicMaterial color={CYAN} transparent opacity={0.3} />
      </mesh>

      {/* Holographic ring 1 (horizontal tilt) */}
      <mesh ref={ring1Ref} rotation={[0.3, 0, 0]}>
        <torusGeometry args={[0.58, 0.008, 4, 48]} />
        <meshBasicMaterial color={CYAN} transparent opacity={0.55} />
      </mesh>

      {/* Holographic ring 2 (vertical) */}
      <mesh ref={ring2Ref} rotation={[Math.PI / 2, 0, 0.4]}>
        <torusGeometry args={[0.72, 0.005, 4, 48]} />
        <meshBasicMaterial color={RED} transparent opacity={0.28} />
      </mesh>

      {/* Lights */}
      <pointLight position={[0, -0.22, 0]}  color={CYAN} intensity={0.7} distance={1.2} />
      <pointLight position={[-0.48, 0.12, 0]} color={CYAN} intensity={0.5} distance={0.9} />
      <pointLight position={[0.5, 0.5,  1]}  color={CYAN} intensity={0.35} distance={2} />
    </group>
  );
}

/* ─── Speed particles ───────────────────────────────────────────────── */
const PARTICLE_COUNT = 36;

// Initialise positions once at module level (avoids impure-function-during-render lint)
const INITIAL_POSITIONS = (() => {
  const arr = new Float32Array(PARTICLE_COUNT * 3);
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    arr[i * 3]     = (Math.random() - 0.5) * 2.2;
    arr[i * 3 + 1] = (Math.random() - 0.5) * 1.1;
    arr[i * 3 + 2] = (Math.random() - 0.5) * 0.4;
  }
  return arr;
})();

function SpeedParticles() {
  const meshRef = useRef<THREE.Points>(null!);

  const positions = useMemo(() => new Float32Array(INITIAL_POSITIONS), []);

  useFrame(() => {
    const pos = meshRef.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pos[i * 3] -= 0.025;
      if (pos[i * 3] < -1.3) {
        pos[i * 3]     = 1.3;
        pos[i * 3 + 1] = (Math.random() - 0.5) * 1.1;
      }
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute args={[positions, 3]} attach="attributes-position" />
      </bufferGeometry>
      <pointsMaterial color={CYAN} size={0.016} transparent opacity={0.45} />
    </points>
  );
}

/* ─── Public component ──────────────────────────────────────────────── */
interface MiniScooter3DProps {
  width?:  number | string;
  height?: number | string;
}

export function MiniScooter3D({ width = 200, height = 140 }: MiniScooter3DProps) {
  return (
    <Box sx={{ width, height, pointerEvents: 'none', flexShrink: 0, userSelect: 'none' }}>
      <Canvas
        camera={{ position: [0, 0.55, 2.5], fov: 40 }}
        gl={{ alpha: true, antialias: true }}
        style={{ width: '100%', height: '100%' }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.15} />
        <pointLight position={[3, 3, 2]} color={CYAN} intensity={0.6} />
        <pointLight position={[-2, -1, 1]} color={RED} intensity={0.25} />
        <Suspense fallback={null}>
          <MiniScoot />
          <SpeedParticles />
        </Suspense>
      </Canvas>
    </Box>
  );
}
