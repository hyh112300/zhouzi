import * as THREE from 'three';
import type { DeviceInfo, Stage, ScrollProgress } from './types';
import { createScene } from './core/scene';
import { createCamera, updateCameraAspect } from './core/camera';
import { createRenderer, updateRendererSize } from './core/renderer';
import { createLights, animateLights } from './core/lights';
import { createStage1 } from './stages/stage1-intro';
import { createStage2 } from './stages/stage2-light';
import { createStage3 } from './stages/stage3-particle';
import { createStage4 } from './stages/stage4-finale';
import { ScrollManager } from './scrollManager';
import { detectDevice, onDeviceChange } from './responsive';

/**
 * 场景管理器
 * 负责所有3D场景的初始化、更新和销毁
 */
export class SceneManager {
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private lights!: ReturnType<typeof createLights>;
  private stages: Stage[] = [];
  private activeStageIndex = -1;
  private scrollManager!: ScrollManager;
  private device!: DeviceInfo;
  private animFrameId = 0;
  private timer = new THREE.Timer();
  private container: HTMLElement;

  // UI 元素
  private stageLabelEl!: HTMLElement;
  private progressDotsEl!: HTMLElement;
  private scrollHintEl!: HTMLElement;
  private ctaEl!: HTMLAnchorElement;

  constructor(container: HTMLElement) {
    this.container = container;
  }

  init(): void {
    this.device = detectDevice();

    // 初始化3D核心
    this.scene = createScene();
    this.camera = createCamera();
    this.renderer = createRenderer(this.container, this.device);
    this.lights = createLights(this.scene);

    // 低端设备直接跳过WebGL，展示降级内容
    if (this.device.tier === 'low') {
      this.initLowEndFallback();
      return;
    }

    // 初始化各叙事阶段
    this.stages = [
      createStage1(this.scene, this.device),
      createStage2(this.scene, this.device),
      createStage3(this.scene, this.device),
      createStage4(this.scene, this.device),
    ];

    // 先创建UI，再初始化滚动管理器（避免回调时UI未就绪）
    this.createUI();

    // 初始化滚动管理器
    this.scrollManager = new ScrollManager(this.stages.length);
    this.scrollManager.onProgress(this.onScrollProgress);
    this.scrollManager.init();

    // 设备变化监听
    onDeviceChange((info) => {
      this.device = info;
      updateCameraAspect(this.camera);
      updateRendererSize(this.renderer);
    });

    // 窗口resize
    window.addEventListener('resize', this.onResize);

    // 启动渲染循环
    this.timer.connect(document);
    this.animate();
  }

  /**
   * 低端设备降级：不需要WebGL，显示静态降级页面
   */
  private initLowEndFallback(): void {
    // 清除渲染器canvas
    const canvas = this.renderer.domElement;
    canvas.style.display = 'none';

    // 显示CSS降级内容
    const fallback = document.createElement('div');
    fallback.className = 'fallback-content';
    fallback.innerHTML = `
      <div class="fallback-stage">
        <div class="fallback-particle-bg"></div>
        <div class="fallback-title">肘子香香</div>
        <div class="fallback-subtitle">个人空间 · 探索 · 记录</div>
        <div class="fallback-scroll-indicator">↓ 向下滚动</div>
      </div>
      <div class="fallback-stage">
        <div class="fallback-grid"></div>
        <div class="fallback-text">代码 · 设计 · 生活</div>
      </div>
      <div class="fallback-stage">
        <div class="fallback-particle-simple"></div>
        <div class="fallback-text">汇聚热爱</div>
      </div>
      <div class="fallback-stage finale">
        <div class="fallback-logo-pulse"></div>
        <div class="fallback-title">欢迎来到我的世界</div>
        <a href="/blog" class="fallback-cta">进入博客 →</a>
      </div>
    `;
    this.container.appendChild(fallback);

    // 滚动进度适配
    const stages = fallback.querySelectorAll('.fallback-stage');
    const totalHeight = window.innerHeight * stages.length;
    document.body.style.height = `${totalHeight}px`;

    window.addEventListener('scroll', () => {
      const progress = window.scrollY / (totalHeight - window.innerHeight);
      const activeIdx = Math.min(Math.floor(progress * stages.length), stages.length - 1);

      stages.forEach((el, i) => {
        el.classList.toggle('active', i === activeIdx);
      });
    }, { passive: true });
  }

  private createUI(): void {
    // 阶段标签
    this.stageLabelEl = document.createElement('div');
    this.stageLabelEl.className = 'ui-stage-label';
    this.stageLabelEl.textContent = this.stages[0]?.label ?? '';
    document.body.appendChild(this.stageLabelEl);

    // 进度小圆点
    this.progressDotsEl = document.createElement('div');
    this.progressDotsEl.className = 'ui-progress-dots';
    for (let i = 0; i < this.stages.length; i++) {
      const dot = document.createElement('span');
      dot.className = 'ui-dot';
      this.progressDotsEl.appendChild(dot);
    }
    document.body.appendChild(this.progressDotsEl);

    // 滚动提示
    this.scrollHintEl = document.createElement('div');
    this.scrollHintEl.className = 'ui-scroll-hint';
    this.scrollHintEl.innerHTML = `
      <span class="scroll-arrow"></span>
      <span class="scroll-text">向下滚动探索</span>
    `;
    document.body.appendChild(this.scrollHintEl);

    // CTA按钮（终章出现）
    this.ctaEl = document.createElement('a');
    this.ctaEl.className = 'ui-cta-button';
    this.ctaEl.href = '/blog';
    this.ctaEl.textContent = '进入博客 →';
    this.ctaEl.style.opacity = '0';
    this.ctaEl.style.pointerEvents = 'none';
    document.body.appendChild(this.ctaEl);
  }

  private onScrollProgress = (progress: ScrollProgress): void => {
    const { global, stageIndex } = progress;

    // 阶段切换
    if (stageIndex !== this.activeStageIndex) {
      if (this.activeStageIndex >= 0) {
        this.stages[this.activeStageIndex]?.exit?.();
      }
      this.activeStageIndex = stageIndex;
      this.stages[stageIndex]?.enter?.();
      this.stageLabelEl.textContent = this.stages[stageIndex]?.label ?? '';
    }

    // 更新当前阶段
    this.stages[stageIndex]?.update?.(global);

    // 更新UI
    this.updateUI(global, stageIndex);

    // 相机跟随滚动
    this.updateCamera(global);
  };

  private updateCamera(global: number): void {
    // 相机位置随滚动在 Z 轴移动
    const zStart = 8;
    const zEnd = 3;
    this.camera.position.z = zStart + (zEnd - zStart) * global;

    // 相机轻微上下浮动
    this.camera.position.y = Math.sin(global * Math.PI) * 0.5;

    this.camera.lookAt(0, 0, 0);
  }

  private updateUI(global: number, stageIndex: number): void {
    // 更新进度点
    const dots = this.progressDotsEl.querySelectorAll('.ui-dot');
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === stageIndex);
      dot.classList.toggle('done', i < stageIndex);
    });

    // 滚动提示淡出
    const hintOpacity = Math.max(1 - global * 5, 0);
    this.scrollHintEl.style.opacity = String(hintOpacity);
    this.scrollHintEl.style.pointerEvents = hintOpacity > 0 ? 'auto' : 'none';

    // 终章CTA出现
    if (global > 0.85) {
      const ctaOpacity = Math.min((global - 0.85) / 0.1, 1);
      this.ctaEl.style.opacity = String(ctaOpacity);
      this.ctaEl.style.pointerEvents = ctaOpacity > 0 ? 'auto' : 'none';
    } else {
      this.ctaEl.style.opacity = '0';
      this.ctaEl.style.pointerEvents = 'none';
    }
  }

  private onResize = (): void => {
    updateCameraAspect(this.camera);
    updateRendererSize(this.renderer);
  };

  private animate = (): void => {
    this.animFrameId = requestAnimationFrame(this.animate);

    // 光源动画
    const elapsed = this.timer.getElapsed();
    animateLights(this.lights.accent, elapsed);

    this.renderer.render(this.scene, this.camera);
  };

  destroy(): void {
    cancelAnimationFrame(this.animFrameId);
    this.scrollManager?.destroy();
    window.removeEventListener('resize', this.onResize);

    this.stages.forEach(s => s.exit?.());
    this.scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.geometry.dispose();
        if (child.material instanceof THREE.Material) {
          child.material.dispose();
        }
      }
    });
    this.renderer.dispose();
  }
}
