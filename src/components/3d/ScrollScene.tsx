import React,{useRef,useEffect} from 'react'
import {useFrame,useThree} from '@react-three/fiber'
import {useGLTF} from '@react-three/drei'
import * as THREE from 'three'
import {useScrollAnimation} from 'src/hooks/useScrollAnimation.ts'
import {ThreeScene} from 'src/components/3d/ThreeScene.tsx'
import 'src/styles/components/scroll-scene.css'
import {ComponentBaseProps} from 'src/types'
interface ScrollSceneProps extends ComponentBaseProps{modelPath:string;animationStart:number;animationEnd:number
}export const ScrollScene:React.FC<ScrollSceneProps>=({modelPath,animationStart=0,animationEnd=1,style,className,...restProps})=>{const modelRef=useRef<THREE.Group>(null)const{scene,camera,gl}=useThree()const{nodes,scene:loadedScene}=useGLTF(modelPath)as any
useEffect(()=>{if(!scene||!loadedScene)return;scene.add(loadedScene);return()=>{scene.remove(loadedScene)}},[scene,loadedScene])
const{scrollY}=useScrollAnimation({start:animationStart,end:animationEnd,animation:(progress)=>{if(!camera)return;camera.position.lerp(new THREE.Vector3(0,10,30),progress);if(!modelRef.current)return;modelRef.current.rotation.y=progress*Math.PI*2}})
useFrame(()=>{if(!modelRef.current)return;modelRef.current.rotation.x+=0.01})
useEffect(()=>{return()=>{scene.traverse((object)=>{if(object instanceof THREE.Mesh){if(object.geometry)object.geometry.dispose();if(object.material){if(Array.isArray(object.material)){object.material.forEach((material)=>{material.dispose()})}else{object.material.dispose()}}}})if(loadedScene){scene.remove(loadedScene)}}},[scene,loadedScene])
return(<ThreeScene><group ref={modelRef}><primitiveobject={nodes?.Scene}/></group></ThreeScene>)}