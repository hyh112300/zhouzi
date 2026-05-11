import type { DeviceInfo } from './types';

/**
 * 检测设备信息，返回性能等级和触控支持
 */
export function detectDevice(): DeviceInfo {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const touch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hardwareConcurrency = navigator.hardwareConcurrency ?? 4;

  // 低端设备判定
  const isLow =
    width < 480 ||
    hardwareConcurrency <= 4 ||
    prefersReducedMotion;

  // 中端设备判定
  const isMid =
    width < 768 ||
    touch;

  let tier: DeviceInfo['tier'];
  if (isLow) tier = 'low';
  else if (isMid) tier = 'mid';
  else tier = 'high';

  // DPR 限制
  const rawDpr = window.devicePixelRatio;
  const dpr = tier === 'low'
    ? Math.min(rawDpr, 1.5)
    : tier === 'mid'
      ? Math.min(rawDpr, 2)
      : Math.min(rawDpr, 2);

  return { tier, touch, dpr, width, height, prefersReducedMotion };
}

/**
 * 监听设备变化（横竖屏、窗口resize）
 */
export function onDeviceChange(callback: (info: DeviceInfo) => void): () => void {
  const handler = () => callback(detectDevice());
  window.addEventListener('resize', handler);
  window.addEventListener('orientationchange', handler);
  return () => {
    window.removeEventListener('resize', handler);
    window.removeEventListener('orientationchange', handler);
  };
}
