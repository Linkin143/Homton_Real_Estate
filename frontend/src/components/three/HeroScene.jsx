import { Environment, Float, PerspectiveCamera } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

// ─── Floating Geometric Building Abstraction ───────────────────────────────────
function BuildingAbstraction() {
  const groupRef  = useRef()
  const meshRef   = useRef()
  const mesh2Ref  = useRef()
  const mesh3Ref  = useRef()
  // Use delta accumulator instead of THREE.Clock to avoid deprecation warning
  const elapsed   = useRef(0)

  useFrame(({ delta }) => {
    elapsed.current += delta
    const t = elapsed.current
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.15) * 0.08
      groupRef.current.rotation.x = Math.sin(t * 0.1) * 0.04
    }
    if (meshRef.current) {
      meshRef.current.position.y = Math.sin(t * 0.4) * 0.06
    }
    if (mesh2Ref.current) {
      mesh2Ref.current.position.y = Math.sin(t * 0.35 + 1) * 0.05
    }
    if (mesh3Ref.current) {
      mesh3Ref.current.rotation.z = t * 0.08
    }
  })

  return (
    <group ref={groupRef} position={[0, 0, 0]} scale={1}>
      {/* Main tower */}
      <Float speed={1.2} rotationIntensity={0.08} floatIntensity={0.4}>
        <mesh ref={meshRef} position={[0, 0.5, 0]} castShadow>
          <boxGeometry args={[0.8, 3.2, 0.8, 2, 2, 2]} />
          <meshStandardMaterial
            color="#0A1628"
            metalness={0.8}
            roughness={0.15}
            envMapIntensity={1.5}
          />
        </mesh>
      </Float>

      {/* Wing left */}
      <Float speed={0.9} rotationIntensity={0.05} floatIntensity={0.3}>
        <mesh ref={mesh2Ref} position={[-1.1, -0.3, 0]} castShadow>
          <boxGeometry args={[0.55, 2.1, 0.6]} />
          <meshStandardMaterial
            color="#1B4FD8"
            metalness={0.9}
            roughness={0.1}
            envMapIntensity={2}
          />
        </mesh>
      </Float>

      {/* Wing right */}
      <Float speed={1.0} rotationIntensity={0.06} floatIntensity={0.35}>
        <mesh position={[1.1, -0.1, 0]} castShadow>
          <boxGeometry args={[0.5, 1.8, 0.55]} />
          <meshStandardMaterial
            color="#132E7A"
            metalness={0.85}
            roughness={0.12}
            envMapIntensity={1.8}
          />
        </mesh>
      </Float>

      {/* Floating accent ring */}
      <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.6}>
        <mesh ref={mesh3Ref} position={[0, 2.4, 0]}>
          <torusGeometry args={[0.45, 0.04, 16, 64]} />
          <meshStandardMaterial
            color="#60A5FA"
            metalness={1}
            roughness={0}
            emissive="#1B4FD8"
            emissiveIntensity={0.4}
          />
        </mesh>
      </Float>

      {/* Glass panels */}
      {[-0.28, 0, 0.28].map((x, i) => (
        <mesh key={i} position={[x, 0.5 + i * 0.3 - 0.3, 0.42]}>
          <planeGeometry args={[0.18, 0.5]} />
          <meshStandardMaterial
            color="#60A5FA"
            metalness={1}
            roughness={0}
            transparent
            opacity={0.35}
            side={THREE.DoubleSide}
            emissive="#3B82F6"
            emissiveIntensity={0.6}
          />
        </mesh>
      ))}

      {/* Ground plane shadow-catcher */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.8, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <shadowMaterial opacity={0.08} />
      </mesh>
    </group>
  )
}

// ─── Particle Field ────────────────────────────────────────────────────────────
function ParticleField({ count = 120 }) {
  const meshRef = useRef()
  const elapsed = useRef(0)

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 12
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8 - 2
    }
    return arr
  }, [count])

  useFrame(({ delta }) => {
    elapsed.current += delta
    if (meshRef.current) {
      meshRef.current.rotation.y = elapsed.current * 0.02
      meshRef.current.rotation.x = elapsed.current * 0.01
    }
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#60A5FA"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

// ─── Camera Rig (Mouse Parallax) ───────────────────────────────────────────────
function CameraRig({ mouse }) {
  const { camera } = useThree()

  useFrame(() => {
    camera.position.x += (mouse.current.x * 0.8 - camera.position.x) * 0.04
    camera.position.y += (-mouse.current.y * 0.5 - camera.position.y) * 0.04
    camera.lookAt(0, 0, 0)
  })

  return null
}

// ─── Ambient Grid Lines ────────────────────────────────────────────────────────
function GridLines() {
  const lines = useMemo(() => {
    const result = []
    for (let i = -3; i <= 3; i++) {
      result.push(
        <line key={`h${i}`}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array([-6, i * 0.8, -3, 6, i * 0.8, -3])}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#1B4FD8" transparent opacity={0.06} />
        </line>
      )
      result.push(
        <line key={`v${i}`}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array([i * 1.5, -3, -3, i * 1.5, 3, -3])}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#1B4FD8" transparent opacity={0.06} />
        </line>
      )
    }
    return result
  }, [])

  return <group>{lines}</group>
}

// ─── Main HeroScene Export ─────────────────────────────────────────────────────
export default function HeroScene({ mouse }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      shadows={{ type: THREE.PCFShadowMap }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      }}
      style={{ background: 'transparent' }}
    >
      <PerspectiveCamera makeDefault position={[0, 0.5, 6]} fov={42} />
      <CameraRig mouse={mouse} />

      {/* Lighting */}
      <ambientLight intensity={0.4} color="#EFF6FF" />
      <directionalLight
        position={[5, 10, 5]}
        intensity={1.2}
        color="#FFFFFF"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <pointLight position={[-3, 2, 4]} intensity={0.8} color="#60A5FA" />
      <pointLight position={[3, -2, 3]} intensity={0.5} color="#1B4FD8" />
      <spotLight
        position={[0, 6, 2]}
        angle={0.4}
        penumbra={0.8}
        intensity={1}
        color="#FFFFFF"
        castShadow
      />

      <Environment preset="city" />

      <BuildingAbstraction />
      <ParticleField count={100} />
      <GridLines />
    </Canvas>
  )
}
