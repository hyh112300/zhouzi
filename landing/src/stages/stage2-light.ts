import * as THREE from 'three';
import type { DeviceInfo, Stage } from '../types';

/**
 * Stage 2: 光影 - 动态光线扫过网格地面
 */
export function createStage2(
  scene: THREE.Scene,
  device: DeviceInfo,
): Stage {
  const group = new THREE.Group();

  // 网格地面 (仅 high/mid 端)
  if (device.tier !== 'low') {
    const gridHelper = new THREE.GridHelper(20, 20, 0x6666ff, 0x3333aa);
    gridHelper.position.y = -2;
    group.add(gridHelper);
  }

  // 几何体阵列
  const geo = new THREE.BoxGeometry(0.4, 0.4, 0.4);
  const columns: THREE.Mesh[] = [];
  const colsCount = 7;
  const spacing = 1.8;

  for (let i = 0; i < colsCount; i++) {
    for (let j = 0; j < colsCount; j++) {
      const mat = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color().setHSL(
          0.6 + (i / colsCount) * 0.3,
          0.8,
          0.4 + (j / colsCount) * 0.3,
        ),
        metalness: 0.6,
        roughness: 0.3,
        emissive: new THREE.Color().setHSL(0.65, 0.8, 0.1),
        emissiveIntensity: 0.3,
      });
      const box = new THREE.Mesh(geo, mat);
      const xOff = (i - colsCount / 2) * spacing;
      const zOff = (j - colsCount / 2) * spacing;
      box.position.set(xOff, -1.8, zOff);
      box.userData = {
        baseY: -1.8,
        phase: i * 0.5 + j * 0.3,
        xOff,
        zOff,
      };
      box.castShadow = device.tier === 'high';
      group.add(box);
      columns.push(box);
    }
  }

  // 动态光束
  const beamGeo = new THREE.PlaneGeometry(0.1, 8);
  const beamMat = new THREE.MeshBasicMaterial({
    color: 0x4488ff,
    transparent: true,
    opacity: 0.3,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
  });
  const beam = new THREE.Mesh(beamGeo, beamMat);
  beam.position.set(-8, 0, 0);
  group.add(beam);

  scene.add(group);

  return {
    id: 'light',
    label: '光影',
    start: 0.25,
    end: 0.50,
    update: (progress: number) => {
      const localProgress = (progress - 0.25) / 0.25;
      const time = performance.now() * 0.001;

      // 光束左右扫描
      beam.position.x = -8 + localProgress * 16;

      // 方块浮动动画
      for (const box of columns) {
        const { baseY, phase } = box.userData;
        box.position.y = baseY + Math.sin(time * 0.8 + phase) * 0.3;
        box.rotation.x = Math.sin(time * 0.5 + phase) * 0.2;
        box.rotation.z = Math.cos(time * 0.7 + phase) * 0.2;
      }

      // 淡出
      const fadeOut = Math.max(1 - (localProgress - 0.7) / 0.3, 0);
      group.children.forEach(child => {
        if (child instanceof THREE.Mesh && child !== beam) {
          if (child.material) {
            child.material.opacity = fadeOut;
          }
        }
      });
    },
    exit: () => {
      scene.remove(group);
      group.children.forEach(child => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose();
          child.material.dispose();
        }
      });
    },
  };
}
