import * as THREE from 'three';
import type { DeviceInfo, Stage } from '../types';

/**
 * Stage 3: 粒子宇宙 - 粒子汇聚成文字后散开
 */
export function createStage3(
  scene: THREE.Scene,
  device: DeviceInfo,
): Stage {
  // 粒子数量根据设备等级调整
  const particleCount = device.tier === 'low'
    ? 500
    : device.tier === 'mid'
      ? 1500
      : 4000;

  // 创建BufferGeometry
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const targetPositions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  const sizes = new Float32Array(particleCount);

  // 初始化粒子在随机位置
  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3;
    // 初始随机分散位置
    positions[i3] = (Math.random() - 0.5) * 30;
    positions[i3 + 1] = (Math.random() - 0.5) * 20;
    positions[i3 + 2] = (Math.random() - 0.5) * 15;

    // 目标位置：汇聚成球体形状
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    const radius = 2 + Math.random() * 1.5;
    targetPositions[i3] = Math.sin(phi) * Math.cos(theta) * radius;
    targetPositions[i3 + 1] = Math.sin(phi) * Math.sin(theta) * radius;
    targetPositions[i3 + 2] = Math.cos(phi) * radius;

    // 颜色：蓝紫渐变
    const color = new THREE.Color().setHSL(
      0.65 + Math.random() * 0.15,
      0.8,
      0.5 + Math.random() * 0.3,
    );
    colors[i3] = color.r;
    colors[i3 + 1] = color.g;
    colors[i3 + 2] = color.b;

    sizes[i] = 0.05 + Math.random() * 0.1;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

  // 保存目标位置用于动画插值
  geometry.userData.targetPositions = targetPositions;
  geometry.userData.initialPositions = new Float32Array(positions);

  const material = new THREE.PointsMaterial({
    size: device.tier === 'low' ? 0.15 : 0.1,
    vertexColors: true,
    transparent: true,
    opacity: 1,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true,
    depthWrite: false,
  });

  const particles = new THREE.Points(geometry, material);
  scene.add(particles);

  // 额外粒子光晕
  let glowParticles: THREE.Points | null = null;
  if (device.tier === 'high') {
    const glowCount = 200;
    const glowGeo = new THREE.BufferGeometry();
    const glowPos = new Float32Array(glowCount * 3);
    for (let i = 0; i < glowCount * 3; i++) {
      glowPos[i] = (Math.random() - 0.5) * 20;
    }
    glowGeo.setAttribute('position', new THREE.BufferAttribute(glowPos, 3));
    const glowMat = new THREE.PointsMaterial({
      color: 0x4488ff,
      size: 0.02,
      transparent: true,
      opacity: 0.3,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    glowParticles = new THREE.Points(glowGeo, glowMat);
    scene.add(glowParticles);
  }

  return {
    id: 'particle',
    label: '粒子宇宙',
    start: 0.50,
    end: 0.75,
    update: (progress: number) => {
      const localProgress = (progress - 0.50) / 0.25;
      const pos = geometry.attributes.position as THREE.BufferAttribute;
      const target = geometry.userData.targetPositions as Float32Array;
      const initial = geometry.userData.initialPositions as Float32Array;
      const array = pos.array as Float32Array;

      // 汇聚因子：0→1 粒子从分散到汇聚，再散开
      let converge: number;
      if (localProgress < 0.6) {
        // 汇聚阶段 0→0.6
        converge = localProgress / 0.6;
      } else {
        // 散开阶段 0.6→1.0
        converge = 1 - (localProgress - 0.6) / 0.4;
      }

      // 平滑插值
      const ease = easeInOutCubic(converge);
      for (let i = 0; i < array.length; i++) {
        array[i] = initial[i] + (target[i] - initial[i]) * ease;
      }
      pos.needsUpdate = true;

      // 光晕旋转
      if (glowParticles) {
        glowParticles.rotation.y += 0.002;
      }

      // 透明度
      material.opacity = localProgress > 0.95
        ? Math.max(1 - (localProgress - 0.95) / 0.05, 0)
        : Math.min(localProgress * 2, 1);
    },
    exit: () => {
      scene.remove(particles);
      particles.geometry.dispose();
      if (particles.material instanceof THREE.Material) {
        particles.material.dispose();
      }
      if (glowParticles) {
        scene.remove(glowParticles);
        glowParticles.geometry.dispose();
        if (glowParticles.material instanceof THREE.Material) {
          glowParticles.material.dispose();
        }
      }
    },
  };
}

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
