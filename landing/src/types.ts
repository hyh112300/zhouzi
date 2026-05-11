import type * as THREE from 'three';

/** 设备性能等级 */
export type DeviceTier = 'low' | 'mid' | 'high';

/** 设备信息 */
export interface DeviceInfo {
  tier: DeviceTier;
  touch: boolean;
  dpr: number;
  width: number;
  height: number;
  prefersReducedMotion: boolean;
}

/** 叙事阶段定义 */
export interface Stage {
  id: string;
  label: string;
  start: number;   // 0-1 滚动进度起始
  end: number;     // 0-1 滚动进度结束
  enter?: () => void;
  update?: (progress: number) => void;
  exit?: () => void;
}

/** 滚动进度信息 */
export interface ScrollProgress {
  /** 0-1 全局进度 */
  global: number;
  /** 当前阶段的内部进度 0-1 */
  stage: number;
  /** 当前阶段索引 */
  stageIndex: number;
}

/** 场景核心组件 */
export interface SceneCore {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
}
