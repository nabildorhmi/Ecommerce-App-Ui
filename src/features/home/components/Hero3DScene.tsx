import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

/* ── colour palette (unchanged) ──────────────────────── */
const CYAN  = '#00C2FF';
const CYAN2 = '#0099CC';
const RED   = '#E63946';
const WHITE = '#F5F7FA';
const DARK  = '#0B0B0E';

/* ═════════════════════════════════════════════════════════ *
 *  NeonScooter – detailed procedural electric scooter      *
 * ═════════════════════════════════════════════════════════ */
function NeonScooter() {
    const group = useRef<THREE.Group>(null);
    const wheelFL = useRef<THREE.Group>(null);
    const wheelRL = useRef<THREE.Group>(null);

    useFrame(({ clock }) => {
        if (!group.current) return;
        const t = clock.elapsedTime;
        group.current.rotation.y = Math.sin(t * 0.25) * 0.2 + 0.3;
        group.current.position.y = Math.sin(t * 0.5) * 0.1;
        // spin wheels
        if (wheelFL.current) wheelFL.current.rotation.x = t * 3;
        if (wheelRL.current) wheelRL.current.rotation.x = t * 3;
    });

    const wire = useMemo(() => new THREE.MeshStandardMaterial({
        color: CYAN, emissive: CYAN, emissiveIntensity: 1.4, wireframe: true, transparent: true, opacity: 0.8,
    }), []);
    const solid = useMemo(() => new THREE.MeshStandardMaterial({
        color: CYAN, emissive: CYAN, emissiveIntensity: 0.5, transparent: true, opacity: 0.45,
    }), []);
    const accent = useMemo(() => new THREE.MeshStandardMaterial({
        color: RED, emissive: RED, emissiveIntensity: 1.0, transparent: true, opacity: 0.7,
    }), []);
    const dark = useMemo(() => new THREE.MeshStandardMaterial({
        color: '#0a0a10', emissive: CYAN, emissiveIntensity: 0.08, transparent: true, opacity: 0.6,
    }), []);

    return (
        <group ref={group} position={[0.4, -0.3, 0]} scale={0.9}>
            {/* ── Deck ──────────────────── */}
            <mesh material={wire} position={[0, 0.05, 0]}>
                <boxGeometry args={[2.8, 0.09, 0.5]} />
            </mesh>
            <mesh material={solid} position={[0, 0.07, 0]}>
                <boxGeometry args={[2.6, 0.04, 0.42]} />
            </mesh>
            {/* deck grip-tape pattern */}
            {Array.from({ length: 8 }).map((_, i) => (
                <mesh key={`grip-${i}`} position={[-1.0 + i * 0.3, 0.1, 0]}>
                    <boxGeometry args={[0.14, 0.005, 0.35]} />
                    <meshStandardMaterial color={CYAN} emissive={CYAN} emissiveIntensity={2} transparent opacity={0.15 + (i % 2) * 0.08} />
                </mesh>
            ))}

            {/* ── Steering column ────────── */}
            <mesh material={wire} position={[1.2, 0.9, 0]} rotation={[0, 0, -0.12]}>
                <cylinderGeometry args={[0.04, 0.05, 1.7, 8]} />
            </mesh>
            {/* column tech rings */}
            {[0.3, 0.6, 0.9].map((y, i) => (
                <mesh key={`cr-${i}`} position={[1.16 - y * 0.04, 0.15 + y, 0]} rotation={[Math.PI / 2, 0, 0.12]}>
                    <torusGeometry args={[0.06, 0.008, 6, 16]} />
                    <meshStandardMaterial color={CYAN} emissive={CYAN} emissiveIntensity={1.8} transparent opacity={0.4} />
                </mesh>
            ))}

            {/* ── Handlebars ────────────── */}
            <mesh material={wire} position={[1.3, 1.65, 0]}>
                <boxGeometry args={[0.06, 0.06, 1.0]} />
            </mesh>
            {/* grips */}
            <mesh material={accent} position={[1.3, 1.65, 0.52]}>
                <cylinderGeometry args={[0.055, 0.055, 0.16, 8]} />
            </mesh>
            <mesh material={accent} position={[1.3, 1.65, -0.52]}>
                <cylinderGeometry args={[0.055, 0.055, 0.16, 8]} />
            </mesh>
            {/* digital display (small glowing panel on bars) */}
            <mesh position={[1.28, 1.72, 0]}>
                <boxGeometry args={[0.02, 0.08, 0.18]} />
                <meshStandardMaterial color={CYAN} emissive={CYAN} emissiveIntensity={3} transparent opacity={0.6} />
            </mesh>

            {/* ── Front fork ────────────── */}
            <mesh material={wire} position={[1.22, -0.1, 0]} rotation={[0, 0, -0.12]}>
                <cylinderGeometry args={[0.03, 0.03, 0.65, 6]} />
            </mesh>

            {/* ── Front wheel assembly ──── */}
            <group ref={wheelFL} position={[1.28, -0.48, 0]} rotation={[0, 0, 0]}>
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                    <torusGeometry args={[0.3, 0.055, 16, 36]} />
                    <meshStandardMaterial color={CYAN} emissive={CYAN} emissiveIntensity={0.7} transparent opacity={0.55} />
                </mesh>
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                    <torusGeometry args={[0.3, 0.06, 6, 18]} />
                    <meshStandardMaterial color={CYAN} emissive={CYAN} emissiveIntensity={1.4} wireframe transparent opacity={0.7} />
                </mesh>
                {/* hub motor glow */}
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                    <cylinderGeometry args={[0.1, 0.1, 0.08, 12]} />
                    <meshStandardMaterial color={CYAN} emissive={CYAN} emissiveIntensity={2} transparent opacity={0.35} />
                </mesh>
                {/* spokes */}
                {[0, 60, 120].map((deg, i) => (
                    <mesh key={`sf-${i}`} rotation={[Math.PI / 2, 0, THREE.MathUtils.degToRad(deg)]}>
                        <boxGeometry args={[0.01, 0.04, 0.55]} />
                        <meshStandardMaterial color={CYAN} emissive={CYAN} emissiveIntensity={1.5} transparent opacity={0.3} />
                    </mesh>
                ))}
            </group>

            {/* ── Rear wheel assembly ──── */}
            <group ref={wheelRL} position={[-1.22, -0.48, 0]}>
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                    <torusGeometry args={[0.3, 0.055, 16, 36]} />
                    <meshStandardMaterial color={CYAN} emissive={CYAN} emissiveIntensity={0.7} transparent opacity={0.55} />
                </mesh>
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                    <torusGeometry args={[0.3, 0.06, 6, 18]} />
                    <meshStandardMaterial color={CYAN} emissive={CYAN} emissiveIntensity={1.4} wireframe transparent opacity={0.7} />
                </mesh>
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                    <cylinderGeometry args={[0.12, 0.12, 0.1, 12]} />
                    <meshStandardMaterial color={RED} emissive={RED} emissiveIntensity={1.2} transparent opacity={0.4} />
                </mesh>
                {[0, 60, 120].map((deg, i) => (
                    <mesh key={`sr-${i}`} rotation={[Math.PI / 2, 0, THREE.MathUtils.degToRad(deg)]}>
                        <boxGeometry args={[0.01, 0.04, 0.55]} />
                        <meshStandardMaterial color={CYAN} emissive={CYAN} emissiveIntensity={1.5} transparent opacity={0.3} />
                    </mesh>
                ))}
            </group>

            {/* ── Rear fender ───────────── */}
            <mesh material={accent} position={[-1.2, -0.16, 0]} rotation={[0, 0, 0.08]}>
                <boxGeometry args={[0.65, 0.03, 0.4]} />
            </mesh>

            {/* ── Battery housing ────────── */}
            <mesh material={dark} position={[-0.2, -0.08, 0]}>
                <boxGeometry args={[0.9, 0.12, 0.36]} />
            </mesh>
            {/* battery level indicator */}
            {[0, 1, 2, 3].map((i) => (
                <mesh key={`bat-${i}`} position={[-0.5 + i * 0.18, -0.05, 0.19]}>
                    <boxGeometry args={[0.1, 0.04, 0.005]} />
                    <meshStandardMaterial color={i < 3 ? CYAN : RED} emissive={i < 3 ? CYAN : RED} emissiveIntensity={2.5} transparent opacity={0.7 - i * 0.1} />
                </mesh>
            ))}

            {/* ── Neon LED understrip ───── */}
            <mesh position={[0, -0.04, 0]}>
                <boxGeometry args={[2.4, 0.012, 0.3]} />
                <meshStandardMaterial color={CYAN} emissive={CYAN} emissiveIntensity={3} transparent opacity={0.85} />
            </mesh>
            {/* side runner LEDs */}
            <mesh position={[0, 0, 0.24]}>
                <boxGeometry args={[2.4, 0.008, 0.005]} />
                <meshStandardMaterial color={CYAN} emissive={CYAN} emissiveIntensity={2.5} transparent opacity={0.5} />
            </mesh>
            <mesh position={[0, 0, -0.24]}>
                <boxGeometry args={[2.4, 0.008, 0.005]} />
                <meshStandardMaterial color={CYAN} emissive={CYAN} emissiveIntensity={2.5} transparent opacity={0.5} />
            </mesh>

            {/* ── Headlight cone ────────── */}
            <pointLight position={[1.4, 1.1, 0]} intensity={2} distance={5} color={CYAN} />
            <mesh position={[1.35, 1.55, 0]}>
                <sphereGeometry args={[0.04, 8, 8]} />
                <meshStandardMaterial color={WHITE} emissive={WHITE} emissiveIntensity={4} transparent opacity={0.8} />
            </mesh>
            {/* tail-light */}
            <pointLight position={[-1.3, -0.08, 0]} intensity={0.8} distance={3} color={RED} />
            <mesh position={[-1.35, -0.04, 0]}>
                <boxGeometry args={[0.04, 0.04, 0.25]} />
                <meshStandardMaterial color={RED} emissive={RED} emissiveIntensity={3} transparent opacity={0.7} />
            </mesh>
        </group>
    );
}

/* ═════════════════════════════════════════════════════════ *
 *  HolographicHUD – floating tech panels around scooter    *
 * ═════════════════════════════════════════════════════════ */
function HolographicHUD() {
    const group = useRef<THREE.Group>(null);

    useFrame(({ clock }) => {
        if (!group.current) return;
        const t = clock.elapsedTime;
        group.current.rotation.y = t * 0.08;
        group.current.children.forEach((child, i) => {
            child.position.y = Math.sin(t * 0.4 + i * 1.5) * 0.06;
        });
    });

    /* Little rectangular "data panels" */
    const panels = useMemo(() => [
        { pos: [2.8, 0.8, 0.5] as [number, number, number], size: [0.6, 0.35, 0.005] as [number, number, number], op: 0.12 },
        { pos: [2.5, 0.1, -1.0] as [number, number, number], size: [0.5, 0.28, 0.005] as [number, number, number], op: 0.1 },
        { pos: [-2.6, 1.2, 0.8] as [number, number, number], size: [0.55, 0.3, 0.005] as [number, number, number], op: 0.09 },
        { pos: [-2.2, -0.2, -0.6] as [number, number, number], size: [0.45, 0.25, 0.005] as [number, number, number], op: 0.11 },
    ], []);

    return (
        <group ref={group} position={[0.4, -0.1, 0]}>
            {panels.map((p, i) => (
                <group key={i} position={p.pos}>
                    {/* panel background */}
                    <mesh>
                        <boxGeometry args={p.size} />
                        <meshStandardMaterial color={CYAN} emissive={CYAN} emissiveIntensity={1.5} transparent opacity={p.op} />
                    </mesh>
                    {/* scan-lines inside */}
                    {[0, 1, 2, 3].map((j) => (
                        <mesh key={j} position={[0, -p.size[1] / 2 + (j + 0.5) * (p.size[1] / 4), 0.003]}>
                            <boxGeometry args={[p.size[0] * 0.85, 0.008, 0.001]} />
                            <meshStandardMaterial color={CYAN} emissive={CYAN} emissiveIntensity={2} transparent opacity={0.18} />
                        </mesh>
                    ))}
                    {/* border frame */}
                    <mesh>
                        <boxGeometry args={[p.size[0] + 0.02, p.size[1] + 0.02, 0.003]} />
                        <meshStandardMaterial color={CYAN} emissive={CYAN} emissiveIntensity={2} wireframe transparent opacity={0.15} />
                    </mesh>
                </group>
            ))}
        </group>
    );
}

/* ═════════════════════════════════════════════════════════ *
 *  HolographicRings – orbiting tech rings                  *
 * ═════════════════════════════════════════════════════════ */
function HolographicRings() {
    const g1 = useRef<THREE.Mesh>(null);
    const g2 = useRef<THREE.Mesh>(null);
    const g3 = useRef<THREE.Mesh>(null);
    const g4 = useRef<THREE.Mesh>(null);

    useFrame(({ clock }) => {
        const t = clock.elapsedTime;
        if (g1.current) { g1.current.rotation.x = t * 0.35; g1.current.rotation.y = t * 0.18; }
        if (g2.current) { g2.current.rotation.y = t * 0.3; g2.current.rotation.z = t * 0.12; }
        if (g3.current) { g3.current.rotation.z = t * 0.22; g3.current.rotation.x = t * 0.08; }
        if (g4.current) { g4.current.rotation.x = -t * 0.15; g4.current.rotation.y = t * 0.25; }
    });

    return (
        <group position={[0.4, -0.2, 0]}>
            <mesh ref={g1}>
                <torusGeometry args={[2.0, 0.015, 8, 80]} />
                <meshStandardMaterial color={CYAN} emissive={CYAN} emissiveIntensity={1.6} transparent opacity={0.22} />
            </mesh>
            <mesh ref={g2}>
                <torusGeometry args={[2.4, 0.01, 8, 90]} />
                <meshStandardMaterial color={CYAN2} emissive={CYAN2} emissiveIntensity={1.2} transparent opacity={0.16} />
            </mesh>
            <mesh ref={g3}>
                <torusGeometry args={[2.8, 0.008, 8, 100]} />
                <meshStandardMaterial color={RED} emissive={RED} emissiveIntensity={1.3} transparent opacity={0.12} />
            </mesh>
            <mesh ref={g4}>
                <torusGeometry args={[1.6, 0.018, 8, 64]} />
                <meshStandardMaterial color={CYAN} emissive={CYAN} emissiveIntensity={2.0} transparent opacity={0.18} />
            </mesh>
        </group>
    );
}

/* ═════════════════════════════════════════════════════════ *
 *  CircuitTraces – animated data-stream lines              *
 * ═════════════════════════════════════════════════════════ */
function CircuitTraces() {
    const ref = useRef<THREE.Group>(null);

    const traces = useMemo(() => {
        const items: { y: number; z: number; len: number; speed: number; color: string }[] = [];
        for (let i = 0; i < 18; i++) {
            items.push({
                y: (Math.random() - 0.5) * 6,
                z: (Math.random() - 0.3) * 10 - 2,
                len: 0.4 + Math.random() * 1.2,
                speed: 0.02 + Math.random() * 0.04,
                color: Math.random() > 0.8 ? RED : CYAN,
            });
        }
        return items;
    }, []);

    const meshRefs = useRef<(THREE.Mesh | null)[]>([]);

    useFrame(() => {
        meshRefs.current.forEach((m, i) => {
            if (!m) return;
            m.position.x -= traces[i].speed;
            if (m.position.x < -12) m.position.x = 12;
        });
    });

    return (
        <group ref={ref}>
            {traces.map((t, i) => (
                <mesh
                    key={i}
                    ref={(el) => { meshRefs.current[i] = el; }}
                    position={[(Math.random() - 0.5) * 20, t.y, t.z]}
                >
                    <boxGeometry args={[t.len, 0.008, 0.008]} />
                    <meshStandardMaterial color={t.color} emissive={t.color} emissiveIntensity={2.5} transparent opacity={0.35} />
                </mesh>
            ))}
        </group>
    );
}

/* ═════════════════════════════════════════════════════════ *
 *  CyberpunkGrid – perspective floor grid                  *
 * ═════════════════════════════════════════════════════════ */
function CyberpunkGrid() {
    const ref = useRef<THREE.GridHelper>(null);
    useFrame(({ clock }) => {
        if (ref.current) {
            (ref.current.material as THREE.Material).opacity = 0.18 + Math.sin(clock.elapsedTime * 0.6) * 0.06;
        }
    });

    return (
        <gridHelper
            ref={ref}
            args={[50, 70, CYAN, CYAN2]}
            position={[0, -2.8, -6]}
            material-transparent
            material-opacity={0.18}
        />
    );
}

/* ═════════════════════════════════════════════════════════ *
 *  SpeedParticles – streaming data/motion particles        *
 * ═════════════════════════════════════════════════════════ */
function SpeedParticles() {
    const ref = useRef<THREE.Points>(null);

    const { positions, speeds } = useMemo(() => {
        const count = 180;
        const pos = new Float32Array(count * 3);
        const sp = new Float32Array(count);
        for (let i = 0; i < count; i++) {
            pos[i * 3]     = (Math.random() - 0.5) * 24;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
            pos[i * 3 + 2] = (Math.random() - 0.3) * 16 - 2;
            sp[i] = 0.03 + Math.random() * 0.05;
        }
        return { positions: pos, speeds: sp };
    }, []);

    useFrame(({ clock }) => {
        if (!ref.current) return;
        const arr = ref.current.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < arr.length / 3; i++) {
            arr[i * 3] -= speeds[i];
            if (arr[i * 3] < -12) arr[i * 3] = 12;
        }
        ref.current.geometry.attributes.position.needsUpdate = true;
        ref.current.rotation.y = Math.sin(clock.elapsedTime * 0.08) * 0.015;
    });

    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[positions, 3]} />
            </bufferGeometry>
            <pointsMaterial size={0.035} color={CYAN} transparent opacity={0.5} sizeAttenuation />
        </points>
    );
}

/* ═════════════════════════════════════════════════════════ *
 *  EnergyField – pulsing spherical shield around scooter   *
 * ═════════════════════════════════════════════════════════ */
function EnergyField() {
    const ref = useRef<THREE.Mesh>(null);

    useFrame(({ clock }) => {
        if (!ref.current) return;
        const s = 2.2 + Math.sin(clock.elapsedTime * 0.8) * 0.08;
        ref.current.scale.set(s, s * 0.7, s);
        (ref.current.material as THREE.MeshStandardMaterial).opacity =
            0.04 + Math.sin(clock.elapsedTime * 1.2) * 0.015;
    });

    return (
        <mesh ref={ref} position={[0.4, -0.1, 0]}>
            <icosahedronGeometry args={[1, 2]} />
            <meshStandardMaterial color={CYAN} emissive={CYAN} emissiveIntensity={0.8} wireframe transparent opacity={0.04} />
        </mesh>
    );
}

/* ═════════════════════════════════════════════════════════ *
 *  CherryPetals – very subtle Japanese accent particles    *
 * ═════════════════════════════════════════════════════════ */
function CherryPetals() {
    const ref = useRef<THREE.Points>(null);

    const positions = useMemo(() => {
        const count = 35;
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            pos[i * 3]     = (Math.random() - 0.5) * 20;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
        }
        return pos;
    }, []);

    useFrame(({ clock }) => {
        if (!ref.current) return;
        const arr = ref.current.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < arr.length / 3; i++) {
            arr[i * 3 + 1] -= 0.004;
            arr[i * 3]     += Math.sin(clock.elapsedTime * 0.8 + i) * 0.002;
            if (arr[i * 3 + 1] < -6) arr[i * 3 + 1] = 6;
        }
        ref.current.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[positions, 3]} />
            </bufferGeometry>
            <pointsMaterial size={0.05} color={RED} transparent opacity={0.25} sizeAttenuation />
        </points>
    );
}

/* ═════════════════════════════════════════════════════════ *
 *  NeonKanji – very faint vertical accent (light JP touch) *
 * ═════════════════════════════════════════════════════════ */
function NeonKanji() {
    const group = useRef<THREE.Group>(null);

    useFrame(({ clock }) => {
        if (group.current) {
            group.current.position.y = Math.sin(clock.elapsedTime * 0.25) * 0.08;
        }
    });

    const strokes = useMemo(() => {
        const items: { pos: [number, number, number]; size: [number, number, number]; rot: number }[] = [];
        for (let row = 0; row < 4; row++) {
            const y = 2.0 - row * 1.2;
            items.push({ pos: [0, y, 0], size: [0.4, 0.035, 0.008], rot: 0 });
            if (row % 2 === 0) items.push({ pos: [0.08, y - 0.18, 0], size: [0.035, 0.3, 0.008], rot: 0 });
        }
        return items;
    }, []);

    return (
        <group ref={group} position={[6.5, 0.5, -4]}>
            {strokes.map((s, i) => (
                <mesh key={i} position={s.pos} rotation={[0, 0, s.rot]}>
                    <boxGeometry args={s.size} />
                    <meshStandardMaterial color={RED} emissive={RED} emissiveIntensity={1.2} transparent opacity={0.06} />
                </mesh>
            ))}
        </group>
    );
}

/* ═════════════════════════════════════════════════════════ *
 *  FloatingSpecs – tiny tech-spec text-like horizontal bars*
 * ═════════════════════════════════════════════════════════ */
function FloatingSpecs() {
    const group = useRef<THREE.Group>(null);

    useFrame(({ clock }) => {
        if (group.current) group.current.position.x = Math.sin(clock.elapsedTime * 0.15) * 0.2;
    });

    const specs = useMemo(() => {
        const items: { pos: [number, number, number]; w: number }[] = [];
        for (let i = 0; i < 6; i++) {
            items.push({
                pos: [0, 1.6 - i * 0.22, 0],
                w: 0.3 + Math.random() * 0.5,
            });
        }
        return items;
    }, []);

    return (
        <Float speed={1} rotationIntensity={0.1} floatIntensity={0.3}>
            <group ref={group} position={[-4.2, 1.0, -2]}>
                {specs.map((s, i) => (
                    <mesh key={i} position={s.pos}>
                        <boxGeometry args={[s.w, 0.018, 0.003]} />
                        <meshStandardMaterial color={CYAN} emissive={CYAN} emissiveIntensity={1.8} transparent opacity={0.12} />
                    </mesh>
                ))}
                {/* bracket marker */}
                <mesh position={[-0.28, 0.7, 0]}>
                    <boxGeometry args={[0.015, 1.6, 0.003]} />
                    <meshStandardMaterial color={CYAN} emissive={CYAN} emissiveIntensity={1.5} transparent opacity={0.1} />
                </mesh>
            </group>
        </Float>
    );
}

/* ═══════════════════════════════════════════════════════════ *
 *  SCENE ROOT                                                 *
 * ═══════════════════════════════════════════════════════════ */
export function Hero3DScene() {
    return (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}>
            <Canvas camera={{ position: [0, 1.0, 7.5], fov: 48 }} dpr={[1, 1.5]}>
                {/* lighting */}
                <ambientLight intensity={0.06} />
                <pointLight position={[6, 5, 5]} intensity={1.4} color={CYAN} distance={22} />
                <pointLight position={[-5, 3, -3]} intensity={0.5} color={RED} distance={14} />
                <pointLight position={[0, -3, 5]} intensity={0.5} color={CYAN2} distance={14} />
                <pointLight position={[3, 4, -6]} intensity={0.3} color={WHITE} distance={10} />

                {/* depth fog */}
                <fog attach="fog" args={[DARK, 9, 24]} />

                {/* cyberpunk floor grid */}
                <CyberpunkGrid />

                {/* ★ main scooter – centrepiece */}
                <NeonScooter />

                {/* tech holographic rings */}
                <HolographicRings />

                {/* HUD data panels */}
                <HolographicHUD />

                {/* energy shield */}
                <EnergyField />

                {/* circuit data streams */}
                <CircuitTraces />

                {/* streaming speed particles */}
                <SpeedParticles />

                {/* floating spec text bars */}
                <FloatingSpecs />

                {/* ✿ light Japanese accent – faint petals */}
                <CherryPetals />

                {/* ✿ light Japanese accent – faint kanji strokes */}
                <NeonKanji />
            </Canvas>
        </div>
    );
}
