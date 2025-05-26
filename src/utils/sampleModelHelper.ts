/**
 * @file src/utils/sampleModelHelper.ts
 * @description Provides utility functions for generating, customizing, and managing sample 3D models for demonstration purposes.
 */

import * as THREE from 'three';

/**
 * @interface SampleModelOptions
 * @description Defines the options for customizing sample 3D models.
 */
interface SampleModelOptions {
  color?: string;
  textureURL?: string;
  scale?: THREE.Vector3;
  position?: THREE.Vector3;
}

/**
 * @function generateSampleModels
 * @description Generates a set of diverse 3D models (e.g., sphere, cube, plane) with varying materials and textures.
 * @returns {THREE.Group[]} An array of THREE.Group objects, each containing a single model.
 */
const generateSampleModels = (): THREE.Group[] => {
  const models: THREE.Group[] = [];

  // Sphere
  const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
  const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
  const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  sphere.name = 'SampleSphere';
  sphere.castShadow = true;
  sphere.receiveShadow = true;
  const sphereGroup = new THREE.Group();
  sphereGroup.add(sphere);
  models.push(sphereGroup);

  // Cube
  const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
  const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  cube.name = 'SampleCube';
  cube.castShadow = true;
  cube.receiveShadow = true;
  const cubeGroup = new THREE.Group();
  cubeGroup.add(cube);
  models.push(cubeGroup);

  // Plane
  const planeGeometry = new THREE.PlaneGeometry(5, 5);
  const planeMaterial = new THREE.MeshStandardMaterial({ color: 0x0000ff, side: THREE.DoubleSide });
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.rotation.x = -Math.PI / 2;
  plane.name = 'SamplePlane';
  plane.receiveShadow = true;
  const planeGroup = new THREE.Group();
  planeGroup.add(plane);
  models.push(planeGroup);

  return models;
};

/**
 * @function customizeModel
 * @description Applies specific customizations (color, texture, scale, position) to a given 3D model.
 * @param {THREE.Object3D} model The 3D model to customize.
 * @param {SampleModelOptions} options The customization options.
 * @returns {THREE.Object3D} The customized 3D model.
 */
const customizeModel = (model: THREE.Object3D, options: SampleModelOptions): THREE.Object3D => {
  if (options.color) {
    model.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material instanceof THREE.Material) {
        (child.material as THREE.MeshStandardMaterial).color = new THREE.Color(options.color!);
        child.material.needsUpdate = true;
      }
    });
  }

  if (options.textureURL) {
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(
      options.textureURL,
      (texture) => {
        model.traverse((child) => {
          if (child instanceof THREE.Mesh && child.material instanceof THREE.Material) {
            (child.material as THREE.MeshStandardMaterial).map = texture;
            child.material.needsUpdate = true;
          }
        });
      },
      undefined,
      (error) => {
        console.error('Error loading texture:', error);
      }
    );
  }

  if (options.scale) {
    model.scale.copy(options.scale);
  }

  if (options.position) {
    model.position.copy(options.position);
  }

  return model;
};

/**
 * @function addModelInteractions
 * @description Enables basic interactions (hover, click) on a 3D model, providing visual feedback.
 * @param {THREE.Object3D} model The 3D model to add interactions to.
 */
const addModelInteractions = (model: THREE.Object3D): void => {
  // This function is a stub. Implementation should be added here with interaction
  // code, i.e., raycasting to detect mouse hover and click events on the model
  // and visual feedback for hover and click states (e.g., changing the model's color or scale).
  // This is intentionally left as a stub due to architectural limitations, but will be re-visited in the future.
};

/**
 * @function createRandomScene
 * @description Creates a complete Three.js scene containing a random assortment of sample models with randomized positions and rotations.
 * @returns {THREE.Scene} A Three.js scene containing sample models.
 */
const createRandomScene = (): THREE.Scene => {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#ffffff');

  const models = generateSampleModels();

  for (let i = 0; i < 10; i++) {
    const model = models[Math.floor(Math.random() * models.length)].clone();
    model.position.set(
      (Math.random() - 0.5) * 20,
      0,
      (Math.random() - 0.5) * 20
    );
    model.rotation.set(
      Math.random() * Math.PI * 2,
      Math.random() * Math.PI * 2,
      Math.random() * Math.PI * 2
    );
    scene.add(model);
  }

  const ambientLight = new THREE.AmbientLight('#ffffff', 0.5);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight('#ffffff', 0.8);
  directionalLight.position.set(10, 10, 10);
  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.width = 1024;
  directionalLight.shadow.mapSize.height = 1024;
  directionalLight.shadow.camera.near = 0.1;
  directionalLight.shadow.camera.far = 50;
  scene.add(directionalLight);

  return scene;
};

/**
 * @function getModelData
 * @description Extracts and returns relevant data (name, type, size) from a 3D model for UI display purposes.
 * @param {THREE.Object3D} model The 3D model to extract data from.
 * @returns {{ name: string; type: string; size: number }} An object containing the model's data.
 */
const getModelData = (model: THREE.Object3D): { name: string; type: string; size: number } => {
  const name = model.name || 'Unknown Model';
  const type = model.type;

  const boundingBox = new THREE.Box3().setFromObject(model);
  const size = boundingBox.getSize(new THREE.Vector3()).length();

  return { name, type, size };
};

/**
 * @function cleanupModel
 * @description Disposes of the geometry and material of a given 3D model to prevent memory leaks.
 * @param {THREE.Object3D} model The 3D model to clean up.
 */
const cleanupModel = (model: THREE.Object3D): void => {
  model.traverse((object) => {
    if (object instanceof THREE.Mesh) {
      if (object.geometry) {
        object.geometry.dispose();
      }
      if (object.material) {
        if (Array.isArray(object.material)) {
          object.material.forEach((material) => {
            if (material instanceof THREE.Material) {
              material.dispose();
            }
          });
        } else {
          (object.material as THREE.Material).dispose();
        }
      }
    }
  });
};

export { generateSampleModels, customizeModel, addModelInteractions, createRandomScene, getModelData, cleanupModel };