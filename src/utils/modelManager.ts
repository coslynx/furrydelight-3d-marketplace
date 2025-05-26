/**
 * @file src/utils/modelManager.ts
 * @description Manages 3D model caching and optimization for Three.js/React Three Fiber.
 */
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
type CacheEntry = {
  model: THREE.Group
  lastUsed: number
}
type LoadingOptions = {
  dracoDecoderPath?: string
  onProgress?: (event: ProgressEvent) => void
  onError?: (event: ErrorEvent) => void
}
const MODEL_CACHE = new Map<string, CacheEntry>()
const MAX_CACHE_SIZE = 50
let lruList: string[] = []
/**
 * @function cacheModel
 * @description Adds a model to the cache, updating its last used timestamp.
 * @param url The URL of the model.
 * @param model The THREE.Group model to cache.
 */
const cacheModel = (url: string, model: THREE.Group): void => {
  if (MODEL_CACHE.has(url)) {
    MODEL_CACHE.get(url)!.lastUsed = Date.now()
    updateLruList(url)
    return
  }
  if (MODEL_CACHE.size >= MAX_CACHE_SIZE) {
    const lruModelUrl = lruList.shift()
    if (lruModelUrl && MODEL_CACHE.has(lruModelUrl)) {
      disposeModel(MODEL_CACHE.get(lruModelUrl)!.model)
      MODEL_CACHE.delete(lruModelUrl)
    }
  }
  MODEL_CACHE.set(url, { model, lastUsed: Date.now() })
  lruList.push(url)
}
/**
 * @function getCachedModel
 * @description Retrieves a model from the cache, updating its last used timestamp.
 * @param url The URL of the model.
 * @returns The THREE.Group model if found, otherwise undefined.
 */
const getCachedModel = (url: string): THREE.Group | undefined => {
  const entry = MODEL_CACHE.get(url)
  if (entry) {
    entry.lastUsed = Date.now()
    updateLruList(url)
    return entry.model
  }
  return undefined
}
/**
 * @function removeModel
 * @description Removes a model from the cache, disposing its resources.
 * @param url The URL of the model to remove.
 */
const removeModel = (url: string): void => {
  if (MODEL_CACHE.has(url)) {
    disposeModel(MODEL_CACHE.get(url)!.model)
    MODEL_CACHE.delete(url)
    lruList = lruList.filter(item => item !== url)
  }
}
/**
 * @function clearCache
 * @description Clears the entire model cache, disposing of all resources.
 */
const clearCache = (): void => {
  MODEL_CACHE.forEach(entry => {
    disposeModel(entry.model)
  })
  MODEL_CACHE.clear()
  lruList = []
}
const updateLruList = (url: string): void => {
  lruList = lruList.filter(item => item !== url)
  lruList.push(url)
}
/**
 * @function loadModel
 * @description Asynchronously loads a 3D model (GLTF/GLB) with error handling and progress reporting.
 * @param url The URL of the model.
 * @param options Loading options, including Draco decoder path and progress/error callbacks.
 * @returns A Promise that resolves with the loaded THREE.Group model.
 */
const loadModel = (url: string, options: LoadingOptions = {}): Promise<THREE.Group> => {
  return new Promise((resolve, reject) => {
    const cachedModel = getCachedModel(url)
    if (cachedModel) {
      resolve(cachedModel)
      return
    }
    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath(options.dracoDecoderPath || '/draco/')
    const gltfLoader = new GLTFLoader()
    gltfLoader.setDRACOLoader(dracoLoader)
    gltfLoader.load(
      url,
      (gltf) => {
        const model = gltf.scene
        optimizeModel(model)
        cacheModel(url, model)
        resolve(model)
      },
      options.onProgress,
      (error) => {
        const errorMessage = `Error loading model from ${url}: ${error}`
        console.error(errorMessage)
        options.onError && options.onError(new ErrorEvent(errorMessage))
        reject(new Error(errorMessage))
      }
    )
  })
}
/**
 * @function loadTexture
 * @description Asynchronously loads a texture, managing caching and disposal.
 * @param url The URL of the texture.
 * @returns A Promise that resolves with the loaded THREE.Texture.
 */
const loadTexture = (url: string): Promise<THREE.Texture> => {
  return new Promise((resolve, reject) => {
    const textureLoader = new THREE.TextureLoader()
    textureLoader.load(
      url,
      (texture) => {
        texture.name = url
        resolve(texture)
      },
      undefined,
      (error) => {
        console.error(`Error loading texture: ${url}`, error)
        reject(error)
      }
    )
  })
}
/**
 * @function disposeTexture
 * @description Disposes of a texture to free memory.
 * @param texture The texture to dispose.
 */
const disposeTexture = (texture: THREE.Texture): void => {
  texture.dispose()
}
/**
 * @function optimizeModel
 * @description Optimizes model geometry and textures for web rendering.
 * @param model The THREE.Group model to optimize.
 */
const optimizeModel = (model: THREE.Group): void => {
  model.traverse((object) => {
    if (object instanceof THREE.Mesh) {
      if (object.geometry) {
        object.geometry.computeVertexNormals()
        object.geometry.computeBoundingSphere()
      }
      if (object.material instanceof THREE.Material) {
        const material = object.material
        material.side = THREE.DoubleSide
        material.flatShading = true
        if (material.map) {
          material.map.encoding = THREE.sRGBEncoding
          material.map.anisotropy = 4
          material.map.generateMipmaps = true
        }
        material.needsUpdate = true
      }
    }
  })
}
/**
 * @function disposeObject
 * @description Recursively disposes of model geometry, materials, and textures to prevent memory leaks.
 * @param object The THREE.Object3D to dispose.
 */
const disposeModel = (model: THREE.Object3D): void => {
  model.traverse((object) => {
    if (object instanceof THREE.Mesh) {
      if (object.geometry) {
        object.geometry.dispose()
      }
      if (object.material) {
        if (Array.isArray(object.material)) {
          object.material.forEach((material) => {
            if (material instanceof THREE.Material) {
              material.dispose()
              if (material.map) {
                disposeTexture(material.map)
              }
            }
          })
        } else if (object.material instanceof THREE.Material) {
          object.material.dispose()
          if (object.material.map) {
            disposeTexture(object.material.map)
          }
        }
      }
    }
  })
}
export { loadModel, cacheModel, getCachedModel, clearCache, disposeModel, loadTexture, disposeTexture, removeModel }