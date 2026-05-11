import * as THREE from 'three';
import type { DeviceInfo, Stage } from '../types';

/**
 * Stage 4: 终章 - 空间汇聚，显示品牌标语和CTA
 */
export function createStage4(
  scene: THREE.Scene,
  device: DeviceInfo,
): Stage {
  const group = new THREE.Group();

  // 中心发光球体
  const sphereGeo = new THREE.SphereGeometry(0.8, 32, 32);
  const sphereMat = new THREE.MeshPhysicalMaterial({
    color: 0x6666ff,
    emissive: 0x4444ff,
    emissiveIntensity: 0.5,
    metalness: 0.9,
    roughness: 0.1,
    transparent: true,
    opacity: 0,
  });
  const sphere = new THREE.Mesh(sphereGeo, sphereMat);
  group.add(sphere);

  // 环绕光环
  const ringGeo = new THREE.TorusGeometry(1.2, 0.02, 16, 64);
  const ringMat = new THREE.MeshBasicMaterial({
    color: 0x8888ff,
    transparent: true,
    opacity: 0,
    blending: THREE.AdditiveBlending,
  });
  const ring = new THREE.Mesh(ringGeo, ringMat);
  ring.rotation.x = Math.PI / 3;
  group.add(ring);

  // 第二个光环（垂直）
  const ring2Geo = new THREE.TorusGeometry(1.4, 0.015, 16, 64);
  const ring2Mat = new THREE.MeshBasicMaterial({
    color: 0xff4488,
    transparent: true,
    opacity: 0,
    blending: THREE.AdditiveBlending,
  });
  const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
  ring2.rotation.z = Math.PI / 4;
  ring2.rotation.x = Math.PI / 4;
  group.add(ring2);

  // 粒子光环（围绕球体的小粒子）
  const glowCount = device.tier === 'low' ? 30 : 80;
  const glowGeo = new THREE.BufferGeometry();
  const glowPos = new Float32Array(glowCount * 3);
  for (let i = 0; i < glowCount; i++) {
    const theta = (i / glowCount) * Math.PI * 2;
    const radius = 1.6;
    glowPos[i * 3] = Math.cos(theta) * radius;
    glowPos[i * 3 + 1] = Math.sin(theta) * radius * 0.3;
    glowPos[i * 3 + 2] = 0;
  }
  glowGeo.setAttribute('position', new THREE.BufferAttribute(glowPos, 3));
  const glowMat = new THREE.PointsMaterial({
    color: 0xaaaaff,
    size: 0.03,
    transparent: true,
    opacity: 0,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true,
  });
  const glowRing = new THREE.Points(glowGeo, glowMat);
  group.add(glowRing);

  scene.add(group);

  return {
    id: 'finale',
    label: '终章',
    start: 0.75,
    end: 1.00,
    update: (progress: number) => {
      const localProgress = (progress - 0.75) / 0.25;
      const time = performance.now() * 0.001;

      // 淡入
      const opacity = Math.min(localProgress * 2, 1);
      sphereMat.opacity = opacity;
      ringMat.opacity = opacity * 0.6;
      ring2Mat.opacity = opacity * 0.4;
      glowMat.opacity = opacity * 0.5;

      // 球体脉动
      const pulse = 1 + Math.sin(time * 2) * 0.05;
      sphere.scale.set(pulse, pulse, pulse);

      // 光环旋转
      ring.rotation.z += 0.01;
      ring2.rotation.y += 0.008;
      glowRing.rotation.z += 0.005;

      // 相机推近效果由 SceneManager 处理
    },
    exit: () => {
      scene.remove(group);
      sphereGeo.dispose();
      sphereMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      glowGeo.dispose();
      glowMat.dispose();
    },
  };
}
