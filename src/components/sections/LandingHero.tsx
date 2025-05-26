import React, {useState, useRef, useEffect, useCallback} from 'react'
import {NavLink} from 'react-router-dom'
import {useInViewport} from '@react-three/drei'
import {useThree} from '@react-three/fiber'
import {motion} from 'framer-motion'
import {ThreeScene} from 'src/components/3d/ThreeScene.tsx'
import {ComponentBaseProps} from 'src/types'
import 'src/styles/components/landing-hero.css'
interface LandingHeroProps extends ComponentBaseProps{title:string;subtitle:string;ctaText:string;ctaHref:string;modelPath:string
}
export const LandingHero:React.FC<LandingHeroProps>=({className='',style,title,subtitle,ctaText,ctaHref,modelPath,...restProps})=>{const[isHovered,setIsHovered]=useState(false)
const sectionRef=useRef<HTMLElement>(null)
const threeSceneRef=useRef<any>(null)
const isInViewport=useInViewport(sectionRef)
const{gl}=useThree()
const handlePointerOver=()=>{setIsHovered(true);document.body.style.cursor='pointer'}
const handlePointerOut=()=>{setIsHovered(false);document.body.style.cursor='auto'}
const handleClick=useCallback(()=>{window.location.href=ctaHref},[ctaHref])
useEffect(()=>{if(isInViewport){threeSceneRef.current?.start()}return()=>{threeSceneRef.current?.stop()}},[isInViewport])
return(
<sectionref={sectionRef}className={`relative w-full h-screen flex items-center justify-center overflow-hidden ${className}`}style={style}{...restProps}>
<divclassName="container mx-auto px-4 py-8 text-center relative z-10">
<h1className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">{title}</h1>
<pclassName="text-lg md:text-xl text-gray-200 mb-8">{subtitle}</p>
<motion.button
whileHover={{scale:1.1}}
whileTap={{scale:0.9}}
className="bg-blue-500 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-300"onClick={handleClick}onPointerOver={handlePointerOver}onPointerOut={handlePointerOut}>{ctaText}</motion.button>
</div>
<divclassName="absolute inset-0"><ThreeSceneref={threeSceneRef}modelPath={modelPath}intensity={0.75}/></div></section>)}