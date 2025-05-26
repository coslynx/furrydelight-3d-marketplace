/**
 * @file src/utils/three-helpers.ts
 * @description Provides utility functions for simplifying common Three.js operations.
 */
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';

/**
 * @function createCamera
 * @description Creates and configures a THREE.PerspectiveCamera.
 * @param fov Field of view in degrees.
 * @param aspect Aspect ratio (width / height).
 * @param near Near clipping plane.
 * @param far Far clipping plane.
 * @returns A configured THREE.PerspectiveCamera instance.
 */
const createCamera = (fov: number, aspect: number, near: number, far: number): THREE.PerspectiveCamera => {
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  return camera;
};

/**
 * @function createOrthographicCamera
 * @description Creates and configures a THREE.OrthographicCamera.
 * @param left Camera frustum left plane.
 * @param right Camera frustum right plane.
 * @param top Camera frustum top plane.
 * @param bottom Camera frustum bottom plane.
 * @param near Near clipping plane.
 * @param far Far clipping plane.
 * @returns A configured THREE.OrthographicCamera instance.
 */
const createOrthographicCamera = (left: number, right: number, top: number, bottom: number, near: number, far: number): THREE.OrthographicCamera => {
  const camera = new THREE.OrthographicCamera(left, right, top, bottom, near, far);
  return camera;
};
/**
 * @function createLights
 * @description Creates and adds ambient and directional lights to a THREE.Scene.
 * @param scene The THREE.Scene to add the lights to.
 * @param intensity The intensity of the lights.
 */
const createLights = (scene: THREE.Scene, intensity: number): void => {
  const ambientLight = new THREE.AmbientLight('#ffffff', intensity / 2);
  scene.add(ambientLight);
  const directionalLight = new THREE.DirectionalLight('#ffffff', intensity);
  directionalLight.position.set(10, 10, 10);
  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.width = 1024;
  directionalLight.shadow.mapSize.height = 1024;
  directionalLight.shadow.camera.near = 0.1;
  directionalLight.shadow.camera.far = 50;
  scene.add(directionalLight);
};
/**
 * @function loadModel
 * @description Asynchronously loads a 3D model from a URL using THREE.GLTFLoader.
 * @param url The URL of the 3D model (GLTF format).
 * @returns A Promise that resolves with the loaded THREE.Group.
 */
const loadModel = (url: string): Promise<THREE.Group> => {
  return new Promise((resolve, reject) => {
    try {
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath('/draco/');
      const gltfLoader = new GLTFLoader();
      gltfLoader.setDRACOLoader(dracoLoader);
      gltfLoader.load(
        url,
        (gltf) => {
          const model = gltf.scene;
          resolve(model);
        },
        undefined,
        (error) => {
          console.error('loadModel: Error loading model:', url, error);
          reject(error);
        }
      );
    } catch (error: any) {
      console.error('loadModel: Error loading model:', url, error);
      reject(error);
    }
  });
};
/**
 * @function createMaterial
 * @description Creates a THREE.MeshStandardMaterial with the specified color.
 * @param color The hexadecimal color string (e.g., "#ffffff").
 * @returns A THREE.MeshStandardMaterial instance.
 */
const createMaterial = (color: string): THREE.MeshStandardMaterial => {
  const material = new THREE.MeshStandardMaterial({ color });
  return material;
};
/**
 * @function optimizeModel
 * @description Optimizes the model for web rendering by enabling shadow casting and receiving for all meshes.
 * @param model The THREE.Group representing the 3D model.
 */
const optimizeModel = (model: THREE.Group): void => {
  model.traverse((object) => {
    if (object instanceof THREE.Mesh) {
      object.castShadow = true;
      object.receiveShadow = true;
    }
  });
};
/**
 * @function createDirectionalLight
 * @description Creates a directional light with specified parameters.
 * @param color The hexadecimal color string (e.g., "#ffffff").
 * @param intensity The intensity of the light.
 * @param position The position of the light (THREE.Vector3).
 * @returns A configured THREE.DirectionalLight instance.
 */
const createDirectionalLight = (color: string, intensity: number, position: THREE.Vector3): THREE.DirectionalLight => {
  const light = new THREE.DirectionalLight(color, intensity);
  light.position.copy(position);
  return light;
};
/**
 * @function createAmbientLight
 * @description Creates an ambient light with specified parameters.
 * @param color The hexadecimal color string (e.g., "#ffffff").
 * @param intensity The intensity of the light.
 * @returns A configured THREE.AmbientLight instance.
 */
const createAmbientLight = (color: string, intensity: number): THREE.AmbientLight => {
  const light = new THREE.AmbientLight(color, intensity);
  return light;
};
/**
 * @function createPointLight
 * @description Creates a point light with specified parameters.
 * @param color The hexadecimal color string.
 * @param intensity The intensity of the light.
 * @param distance The maximum range of the light.
 * @param decay The light's falloff.
 * @returns A configured THREE.PointLight instance.
 */
const createPointLight = (color: string, intensity: number, distance: number, decay: number): THREE.PointLight => {
  const light = new THREE.PointLight(color, intensity, distance, decay);
  return light;
};

/**
 * @function disposeObject
 * @description Recursively disposes of an object's resources (geometry, material, textures) to prevent memory leaks.
 * @param object The THREE.Object3D to dispose.
 */
const disposeObject = (object: THREE.Object3D): void => {
    if (!object) return;
    object.traverse((child) => {
        if (child instanceof THREE.Mesh) {
            if (child.geometry) {
                child.geometry.dispose();
            }
            if (child.material) {
                if (Array.isArray(child.material)) {
                    child.material.forEach((material) => {
                        if (material instanceof THREE.Material) {
                            material.dispose();
                            if (material.map) {
                                material.map.dispose();
                            }
                        }
                    });
                } else if (child.material instanceof THREE.Material) {
                    child.material.dispose();
                    if (child.material.map) {
                        child.map.dispose();
                    }
                }
            }
        }
    });
}
export {
  createCamera,
  createOrthographicCamera,
  createLights,
  loadModel,
  createMaterial,
  optimizeModel,
  createDirectionalLight,
  createAmbientLight,
  createPointLight,
  disposeObject
}