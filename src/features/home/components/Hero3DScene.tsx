import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Float } from '@react-three/drei';
import * as THREE from 'three';

function AbstractShape({ position, scale, rotation, color, speed }: { position: [number, number, number], scale: number, rotation: [number, number, number], color: string, speed: number }) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.elapsedTime * speed;
            meshRef.current.rotation.y = state.clock.elapsedTime * (speed * 1.5);
        }
    });

    return (
        <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
            <mesh
                ref={meshRef}
                position={position}
                scale={scale}
                rotation={rotation}
            >
                <icosahedronGeometry args={[1, 0]} />
                <meshStandardMaterial color={color} wireframe emissive={color} emissiveIntensity={0.5} colorWrite />
            </mesh>
        </Float>
    );
}

function Particles() {
    const count = 100;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 15;
    }

    const meshRef = useRef<THREE.Points>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.05;
        }
    });

    return (
        <points ref={meshRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                />
            </bufferGeometry>
            <pointsMaterial size={0.05} color="#00C2FF" transparent opacity={0.6} sizeAttenuation />
        </points>
    );
}

export function Hero3DScene() {
    return (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}>
            <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                <ambientLight intensity={0.2} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#00C2FF" />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#0099CC" />

                <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />

                <AbstractShape position={[4, 2, -2]} scale={1.5} rotation={[0.5, 0.5, 0]} color="#00C2FF" speed={0.2} />
                <AbstractShape position={[-4, -2, -3]} scale={1.2} rotation={[-0.5, 0.2, 0.5]} color="#E63946" speed={0.15} />
                <AbstractShape position={[-3, 3, -4]} scale={0.8} rotation={[0, 0, 0]} color="#F5F7FA" speed={0.3} />

                <Particles />
            </Canvas>
        </div>
    );
}
