import * as THREE from 'three';
import type { DeviceInfo, Stage } from '../types';

/**
 * Stage 1: 序幕 - 抽象几何空间
 * 旋转的二十面体/环面结，粒子背景
 */
export function createStage1(
  scene: THREE.Scene,
  device: DeviceInfo,
): Stage {
  const group = new THREE.Group();

  // 主几何体：环面结
  const torusKnotGeo = new THREE.TorusKnotGeometry(1.2, 0.4, device.tier === 'low' ? 48 : 128, 16);
  const torusKnotMat = new THREE.MeshPhysicalMaterial({
    color: 0x6666ff,
    metalness: 0.3,
    roughness: 0.4,
    wireframe: false,
    emissive: 0x2222aa,
    emissiveIntensity: 0.2,
    transparent: true,
    opacity: 0.9,
  });
  const torusKnot = new THREE.Mesh(torusKnotGeo, torusKnotMat);
  torusKnot.castShadow = device.tier === 'high';
  group.add(torusKnot);

  // 辅助几何体：小二十面体环绕
  const icosaGeo = new THREE.IcosahedronGeometry(0.3, 0);
  const icosaMat = new THREE.MeshPhysicalMaterial({
    color: 0xff4488,
    metalness: 0.8,
    roughness: 0.2,
    emissive: 0xff2266,
    emissiveIntensity: 0.3,
  });

  const satellites: THREE.Mesh[] = [];
  const satCount = device.tier === 'low' ? 4 : device.tier === 'mid' ? 6 : 10;
  for (let i = 0; i < satCount; i++) {
    const sat = new THREE.Mesh(icosaGeo, icosaMat);
    const angle = (i / satCount) * Math.PI * 2;
    const radius = 2.5 + Math.random() * 0.5;
    sat.position.set(
      Math.cos(angle) * radius,
      Math.sin(angle * 2) * 1.5,
      Math.sin(angle) * radius,
    );
    sat.userData = { angle, radius, speed: 0.3 + Math.random() * 0.2 };
    group.add(sat);
    satellites.push(sat);
  }

  scene.add(group);

  return {
    id: 'intro',
    label: '序幕',
    start: 0,
    end: 0.25,
    update: (progress: number) => {
      // 环面结自转
      torusKnot.rotation.x += 0.005;
      torusKnot.rotation.y += 0.01;

      // 卫星旋转
      const time = performance.now() * 0.001;
      for (const sat of satellites) {
        const { angle, radius, speed } = sat.userData;
        sat.position.x = Math.cos(time * speed + angle) * radius;
        sat.position.z = Math.sin(time * speed + angle) * radius;
        sat.position.y = Math.sin(time * speed * 1.5 + angle) * 1.5;
        sat.rotation.x += 0.02;
        sat.rotation.y += 0.03;
      }

      // 透明度淡出
      const fadeOut = Math.max(1 - (progress - 0.15) / 0.1, 0);
      group.children.forEach(child => {
        if (child instanceof THREE.Mesh) {
          child.material.opacity = fadeOut;
        }
      });
    },
    exit: () => {
      scene.remove(group);
      // 清理几何体和材质
      group.children.forEach(child => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose();
          child.material.dispose();
        }
      });
    },
  };
}
