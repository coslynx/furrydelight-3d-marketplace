/**
 * @file src/hooks/use3DInteraction.ts
 * @description A React hook for managing user interactions (click, hover, drag) with 3D objects in a Three.js scene.
 */
import { useState, useRef, useEffect, useCallback } from 'react'
import * as THREE from 'three'
import { useThree } from '@react-three/fiber'

/**
 * @interface InteractionHandlers
 * @description Defines the handlers for 3D object interaction events.
 */
interface InteractionHandlers {
  /** Callback fired when a 3D object is clicked. */
  onClick?: (object: THREE.Object3D, point: THREE.Vector3) => void
  /** Callback fired when the mouse hovers over a 3D object. */
  onHover?: (object: THREE.Object3D, point: THREE.Vector3) => void
  /** Callback fired when dragging starts on a 3D object. */
  onDragStart?: (object: THREE.Object3D, point: THREE.Vector3) => void
  /** Callback fired when a 3D object is dragged. */
  onDrag?: (object: THREE.Object3D, point: THREE.Vector3) => void
  /** Callback fired when dragging ends on a 3D object. */
  onDragEnd?: (object: THREE.Object3D, point: THREE.Vector3) => void
}

/**
 * @function use3DInteraction
 * @description A React hook for managing user interactions with 3D objects in a Three.js scene.
 * @param scene The Three.js scene to interact with.
 * @param camera The Three.js camera used for raycasting.
 * @param handlers An object containing the interaction handlers.
 */
const use3DInteraction = (
  scene: THREE.Scene,
  camera: THREE.Camera,
  handlers: InteractionHandlers
): void => {
  const raycaster = useRef(new THREE.Raycaster())
  const mouse = useRef(new THREE.Vector2())
  const dragStart = useRef<{ object: THREE.Object3D | null; point: THREE.Vector3 | null }>({ object: null, point: null })
  const { gl } = useThree()

  const handleIntersect = useCallback((event: MouseEvent | TouchEvent):{object:THREE.Object3D|null, point:THREE.Vector3|null} => {
    const rect = gl.domElement.getBoundingClientRect()
    if (event instanceof MouseEvent) {
      mouse.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
      mouse.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1
    } else {
      if (event.touches.length > 0) {
        mouse.current.x = ((event.touches[0].clientX - rect.left) / rect.width) * 2 - 1
        mouse.current.y = -((event.touches[0].clientY - rect.top) / rect.height) * 2 + 1
      }
    }
    raycaster.current.setFromCamera(mouse.current, camera)
    const intersects = raycaster.current.intersectObjects(scene.children, true)
    if (intersects.length > 0) {
      const intersected = intersects[0].object
      const point = intersects[0].point
      return {object:intersected, point:point}
    }
    return {object:null, point:null}
  }, [camera, gl, scene])

  const handleClick = useCallback((event: MouseEvent | TouchEvent) => {
    const {object, point} = handleIntersect(event)
    if(object && point && handlers.onClick){
      try{
        handlers.onClick(object, point)
      }catch(e:any){
        console.error('Error during onClick handler:', e)
      }
    }
  }, [handleIntersect, handlers.onClick])

  const handleMove = useCallback((event: MouseEvent | TouchEvent) => {
    const {object, point} = handleIntersect(event)
    if(object && point && handlers.onHover){
      try{
        handlers.onHover(object, point)
      }catch(e:any){
        console.error('Error during onHover handler:', e)
      }
    }
    if (dragStart.current.object && point) {
      if (handlers.onDrag) {
        try {
          handlers.onDrag(dragStart.current.object, point)
        } catch (e: any) {
          console.error('Error during onDrag handler:', e)
        }
      }
    }
  }, [handleIntersect, handlers.onHover, handlers.onDrag])

  const handleMouseDown = useCallback((event: MouseEvent | TouchEvent) => {
    const {object, point} = handleIntersect(event)
    if (object && point) {
      dragStart.current = { object:object, point:point }
      if (handlers.onDragStart) {
        try {
          handlers.onDragStart(object, point)
        } catch (e: any) {
          console.error('Error during onDragStart handler:', e)
        }
      }
    }
  }, [handleIntersect, handlers.onDragStart])

  const handleMouseUp = useCallback(() => {
    if (dragStart.current.object && handlers.onDragEnd) {
      try {
        if(dragStart.current.point){
          handlers.onDragEnd(dragStart.current.object, dragStart.current.point)
        }
      } catch (e: any) {
        console.error('Error during onDragEnd handler:', e)
      }
      dragStart.current = { object: null, point: null }
    }
  }, [handlers.onDragEnd])

  useEffect(() => {
    const element = gl.domElement
    element.addEventListener('click', handleClick)
    element.addEventListener('mousemove', handleMove)
    element.addEventListener('mousedown', handleMouseDown)
    element.addEventListener('mouseup', handleMouseUp)
    element.addEventListener('touchstart', handleClick)
    element.addEventListener('touchmove', handleMove)
    element.addEventListener('touchstart', handleMouseDown)
    element.addEventListener('touchend', handleMouseUp)
    return () => {
      element.removeEventListener('click', handleClick)
      element.removeEventListener('mousemove', handleMove)
      element.removeEventListener('mousedown', handleMouseDown)
      element.removeEventListener('mouseup', handleMouseUp)
      element.removeEventListener('touchstart', handleClick)
      element.removeEventListener('touchmove', handleMove)
      element.removeEventListener('touchstart', handleMouseDown)
      element.removeEventListener('touchend', handleMouseUp)
    }
  }, [gl, handleClick, handleMove, handleMouseDown, handleMouseUp])
}

export default use3DInteraction
export type { InteractionHandlers }