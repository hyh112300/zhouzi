import * as THREE from 'three';

export function createCamera(): THREE.PerspectiveCamera {
  const aspect = window.innerWidth / window.innerHeight;
  const camera = new THREE.PerspectiveCamera(60, aspect, 0.1, 100);
  camera.position.set(0, 0, 8);
  camera.lookAt(0, 0, 0);
  return camera;
}

export function updateCameraAspect(
  camera: THREE.PerspectiveCamera,
): void {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}
