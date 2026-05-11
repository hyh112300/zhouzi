import './style.css'
import { SceneManager } from './sceneManager'

// 等待DOM加载
document.addEventListener('DOMContentLoaded', () => {
  const app = document.querySelector<HTMLDivElement>('#app')!

  // 创建并初始化场景管理器
  const sceneManager = new SceneManager(app)
  sceneManager.init()
})
