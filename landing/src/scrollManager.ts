import type { ScrollProgress } from './types';

type ProgressCallback = (progress: ScrollProgress) => void;

/**
 * 滚动进度管理器
 * 将页面滚动位置映射到 0-1 的全局进度和阶段进度
 */
export class ScrollManager {
  private stageCount: number;
  private callbacks: ProgressCallback[] = [];
  private ticking = false;
  private current: ScrollProgress = {
    global: 0,
    stage: 0,
    stageIndex: 0,
  };
  constructor(stageCount: number) {
    this.stageCount = stageCount;
  }

  /**
   * 获取当前滚动进度
   */
  getProgress(): ScrollProgress {
    return { ...this.current };
  }

  /**
   * 订阅进度变化
   */
  onProgress(cb: ProgressCallback): () => void {
    this.callbacks.push(cb);
    return () => {
      this.callbacks = this.callbacks.filter(c => c !== cb);
    };
  }

  /**
   * 计算页面应有多高（视口高度 × 阶段数）
   */
  getTotalHeight(): number {
    return window.innerHeight * this.stageCount;
  }

  /**
   * 初始化：设置页面高度、绑定滚动事件
   */
  init(): void {
    // 设置页面高度，保证有足够滚动距离
    document.body.style.height = `${this.getTotalHeight()}px`;

    // 绑定滚动事件
    window.addEventListener('scroll', this.onScroll, { passive: true });
    window.addEventListener('resize', this.onResize, { passive: true });

    // 初始计算
    this.updateProgress();
  }

  /**
   * 销毁：解绑事件
   */
  destroy(): void {
    window.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('resize', this.onResize);
    this.callbacks = [];
  }

  private onScroll = (): void => {
    if (!this.ticking) {
      requestAnimationFrame(() => {
        this.updateProgress();
        this.ticking = false;
      });
      this.ticking = true;
    }
  };

  private onResize = (): void => {
    document.body.style.height = `${this.getTotalHeight()}px`;
    this.updateProgress();
  };

  private updateProgress(): void {
    const scrollY = window.scrollY;
    const maxScroll = this.getTotalHeight() - window.innerHeight;
    const global = maxScroll > 0 ? Math.min(Math.max(scrollY / maxScroll, 0), 1) : 0;

    // 计算当前阶段
    const stageRaw = global * this.stageCount;
    const stageIndex = Math.min(Math.floor(stageRaw), this.stageCount - 1);
    const stage = stageRaw - stageIndex;

    this.current = { global, stage, stageIndex };

    // 通知订阅者
    for (const cb of this.callbacks) {
      cb(this.current);
    }
  }
}
