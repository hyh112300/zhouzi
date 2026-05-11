import * as THREE from 'three';

export function createScene(): THREE.Scene {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0a0a1a);
  scene.fog = new THREE.Fog(0x0a0a1a, 30, 60);
  return scene;
}
