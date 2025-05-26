import React, { Suspense, useRef, useEffect, useMemo, useCallback } from 'react'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { ComponentBaseProps } from 'src/types'
import ModelLoader from 'src/components/3d/ModelLoader'
import { MinimalLayout } from 'src/components/layout/MinimalLayout'
import { useThree } from '@react-three/fiber'
import { three3DHelpersUtil } from 'src/utils/three-helpers'
interface ExperiencePageProps extends ComponentBaseProps {}
const ExperiencePage: React.FC<ExperiencePageProps> = ({ className = '', style }) => {
const modelPaths = useMemo(() => [
'/models/kibble.glb',
'/models/bowl.glb',
'/models/bag.glb'
], [])
const { scene } = useThree()
const threeScene = useMemo(() => {
const newScene = new THREE.Scene()
newScene.background = new THREE.Color('#ffffff')
return newScene
}, [])
useEffect(() => {
modelPaths.forEach(modelPath => {
const loader = new THREE.GLTFLoader()
loader.load(
modelPath,
(gltf) => {
gltf.scene.position.set(
(Math.random() - 0.5) * 10,
0,
(Math.random() - 0.5) * 10
)
scene.add(gltf.scene)
},
undefined,
(err) => {
console.error(`Error loading model: ${modelPath}`, err)
}
)
})
}, [scene, modelPaths])
return (
<MinimalLayout showBackButton backButtonHref="/">
<div className={`experience-page ${className}`} style={{
width: '100%',
height: '100%',
overflow: 'hidden',
...style
}}>
<Canvas shadows dpr={[1, 1]} gl={{ alpha: false, stencil: false, depth: true, antialias: true }} camera={{ fov: 75, position: [0, 5, 15] }}>
<ambientLight intensity={0.5} />
<directionalLight position={[10, 10, 10]} intensity={0.8} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} shadow-camera-near={0.1} shadow-camera-far={50} />
<OrbitControls makeDefault minDistance={5} maxDistance={15} />
<axesHelper scale={5} />
<mesh scale={3} position={[0, 0, 0]} castShadow receiveShadow>
<sphereGeometry args={[1, 32, 32]} />
<meshStandardMaterial color={'white'} />
</mesh>
{modelPaths.map((modelPath, index) => (
<Suspense key={index} fallback={<LoadingSpinner />}>
<ModelLoader modelPath={modelPath} lodDistances={[5, 15, 30]} />
</Suspense>
))}
</Canvas>
</div>
</MinimalLayout>
)
}
const LoadingSpinner = () => {
const meshRef = useRef<THREE.Mesh>(null)
useFrame(() => {
if (meshRef.current) {
meshRef.current.rotation.x += 0.01
meshRef.current.rotation.y += 0.01
}
})
return (
<mesh ref={meshRef} position={[0, 0, 0]}>
<sphereGeometry args={[1, 32, 32]} />
<meshBasicMaterial color={'#fff'} />
</mesh>
)
}
export default ExperiencePage
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react'
import { ThreeSceneProps } from 'src/types'
interface MinimalLayoutProps extends ComponentBaseProps{showBackButton?:boolean;backButtonHref?:string;children:React.ReactNode
}
export const MinimalLayout:React.FC<MinimalLayoutProps>=({children,showBackButton=false,backButtonHref='/'})=>{return(<divclassName="relative w-full h-screen overflow-hidden"><divclassName="absolute inset-0">{children}</div>{showBackButton&&(<Link to={backButtonHref}aria-label="Go back"className="absolute top-4 left-4 z-10 bg-gray-800 text-white rounded-full p-2 hover:bg-gray-700 transition-colors"><svgxmlns="http://www.w3.org/2000/svg"className="h-6 w-6"fill="none"viewBox="0 0 24 24"stroke="currentColor"strokeWidth="2"><pathstrokeLinecap="round"strokeLinejoin="round"d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg></Link>)}</div>)}