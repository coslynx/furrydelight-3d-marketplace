/**
 * @file src/hooks/use3DAnimation.ts
 * @description A React hook for managing 3D animations using Three.js and GSAP.
 */
import {useState,useRef,useEffect,useCallback} from 'react';
import * as THREE from 'three';
import {useFrame} from '@react-three/fiber';
import gsap from 'gsap';
/**
 * @interface AnimationControls
 * @description Defines the controls for managing 3D animations.
 */
interface AnimationControls{
  /** Starts the animation. */
  play:()=>void;
  /** Pauses the animation. */
  pause:()=>void;
  /** Stops the animation and resets it to the beginning. */
  stop:()=>void;
  /** The Three.js AnimationMixer instance. */
  animationMixer:THREE.AnimationMixer;
}
/**
 * @function use3DAnimation
 * @description A React hook for managing 3D animations using Three.js and GSAP.
 * @param model The 3D model to animate.
 * @param animationName The name of the animation to play.
 * @returns An object containing animation controls and the animation mixer.
 */
const use3DAnimation=(model:THREE.Object3D,animationName:string):AnimationControls=>{
  const animationMixerRef=useRef<THREE.AnimationMixer>(new THREE.AnimationMixer(model));
  const[isPlaying,setIsPlaying]=useState(false);
  const play=useCallback(()=>{setIsPlaying(true);},[]);
  const pause=useCallback(()=>{setIsPlaying(false);},[]);
  const stop=useCallback(()=>{
    setIsPlaying(false);
    animationMixerRef.current.time=0;
    animationMixerRef.current.update(0);
  },[]);
  useEffect(()=>{
    const mixer=animationMixerRef.current;
    const animationClip=model.animations.find((clip)=>clip.name===animationName);
    if(!animationClip){
      console.error(`Animation clip "${animationName}" not found in model.`);
      return;
    }
    const animationAction=mixer.clipAction(animationClip);
    if(!animationAction){
      console.error(`Animation action "${animationName}" not found in model.`);
      return;
    }
    animationAction.play();
    animationAction.paused=!isPlaying;
    return()=>{
      mixer.stopAllAction();
    };
  },[model,animationName,isPlaying]);
  useFrame((clockState,deltaTime)=>{
    if(isPlaying){
      animationMixerRef.current.update(deltaTime);
    }
  });
  return{
    play,
    pause,
    stop,
    animationMixer:animationMixerRef.current
  };
};
export default use3DAnimation;