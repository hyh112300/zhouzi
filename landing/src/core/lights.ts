import * as THREE from 'three';

export function createLights(scene: THREE.Scene): {
  ambient: THREE.AmbientLight;
  main: THREE.DirectionalLight;
  accent: THREE.PointLight;
} {
  const ambient = new THREE.AmbientLight(0x222244, 0.5);
  scene.add(ambient);

  const main = new THREE.DirectionalLight(0x8888ff, 1.5);
  main.position.set(5, 10, 7);
  main.castShadow = true;
  main.shadow.mapSize.width = 1024;
  main.shadow.mapSize.height = 1024;
  scene.add(main);

  const accent = new THREE.PointLight(0xff4488, 1, 20);
  accent.position.set(-3, 2, 4);
  scene.add(accent);

  return { ambient, main, accent };
}

export function animateLights(
  accent: THREE.PointLight,
  time: number,
): void {
  accent.position.x = Math.sin(time * 0.3) * 4;
  accent.position.z = Math.cos(time * 0.5) * 4;
  accent.intensity = 0.8 + Math.sin(time * 0.7) * 0.4;
}
