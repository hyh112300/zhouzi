import * as THREE from 'three';
import type { DeviceInfo } from '../types';

export function createRenderer(
  container: HTMLElement,
  device: DeviceInfo,
): THREE.WebGLRenderer {
  const renderer = new THREE.WebGLRenderer({
    antialias: device.tier === 'high',
    alpha: false,
  });

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(device.dpr);

  if (device.tier === 'high') {
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  }

  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;

  container.appendChild(renderer.domElement);
  return renderer;
}

export function updateRendererSize(
  renderer: THREE.WebGLRenderer,
): void {
  renderer.setSize(window.innerWidth, window.innerHeight);
}
