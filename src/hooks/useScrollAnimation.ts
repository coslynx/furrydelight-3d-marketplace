<structure>
/**
 * @file src/hooks/useScrollAnimation.ts
 * @description A React hook for creating scroll-based animations.
 */
import { useState, useEffect, useCallback, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)
/**
 * @interface UseScrollAnimationProps
 * @description Defines the properties for the useScrollAnimation hook.
 */
interface UseScrollAnimationProps {
  /** The scroll position (0-1) at which the animation should start. */
  start: number
  /** The scroll position (0-1) at which the animation should end. */
  end: number
  /** A callback function that takes the animation progress (0-1) as an argument and applies the animation logic. */
  animation: (progress: number) => void
   /** Optional. The element to observe. If not provided, the entire document should be observed. */
  element?:React.RefObject<HTMLElement>
}
/**
 * @function useScrollAnimation
 * @description A React hook for creating scroll-based animations.
 * @param props The properties for the hook.
 */
const useScrollAnimation = ({ start, end, animation,element }: UseScrollAnimationProps):{scrollY:number} => {
  const [scrollY, setScrollY] = useState(0)
  const animationCallbackRef = useRef(animation)
  useEffect(() => {
    animationCallbackRef.current = animation
  }, [animation])
  useEffect(() => {
    let scrollYSetter:(scrollValue:number)=>void
    const elementValue=element&&element.current?element.current:window
    gsap.to(elementValue,{
      scrollTrigger:{
        trigger:elementValue,
        start:`top+=${start*100}% top`,
        end:`top+=${end*100}% top`,
        scrub:true,
        onUpdate:({progress})=>{
          setScrollY(progress);
          animationCallbackRef.current(progress)
        }
      }
    })
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [start, end, animation,element])
  return {scrollY}
}
export { useScrollAnimation }