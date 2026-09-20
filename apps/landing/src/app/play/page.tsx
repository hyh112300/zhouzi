'use client'

import { useEffect, useRef, useState } from 'react'

declare global {
  interface Window {
    LBS?: {
      WebComponent?: {
        Geolocation: new (options: {
          key?: string
          domain?: string
          referer: string
        }) => {
          getLocation: (
            success: (result: Record<string, unknown>) => void,
            error?: ((err: Record<string, unknown>) => void) | null,
            options?: {
              timeout?: number
              highAccuracy?: boolean
              maximumAge?: number
            },
          ) => void
        }
      }
    }
  }
}

const REFERER = 'zhouzi'

export default function PlayPage() {
  const [logs, setLogs] = useState<string[]>([])
  const [ready, setReady] = useState(false)
  const [loading, setLoading] = useState(false)
  const geoRef = useRef<InstanceType<NonNullable<NonNullable<Window['LBS']>['WebComponent']>['Geolocation']> | null>(null)

  useEffect(() => {
    let cancelled = false
    const safe = (line: string) => {
      if (!cancelled) setLogs(prev => [...prev, line])
    }

    const init = async () => {
      const pageUrl = location.href.split('#')[0]
      safe(`页面 URL: ${pageUrl}`)

      // 注入腾讯位置服务前端定位组件脚本
      if (!window.LBS?.WebComponent?.Geolocation) {
        safe('加载腾讯位置服务定位组件 SDK...')
        await new Promise<void>((resolve, reject) => {
          const s = document.createElement('script')
          s.src = 'https://mapapi.qq.com/web/lbs/h5-components/geolocation/geolocation.min.js'
          s.onload = () => resolve()
          s.onerror = () => reject(new Error('定位组件 SDK 加载失败'))
          document.head.appendChild(s)
        })
        safe('定位组件 SDK 加载完成')
      }

      if (window.LBS?.WebComponent?.Geolocation) {
        // 使用同源 Node 代理，服务端注入 Key，前端完全不暴露
        geoRef.current = new window.LBS.WebComponent.Geolocation({
          domain: `${window.location.origin}/api/lbs-proxy`,
          referer: REFERER,
        })
        safe('定位组件实例初始化成功（代理模式），请点击按钮获取定位')
        if (!cancelled) setReady(true)
      } else {
        safe('初始化异常: 未找到 Geolocation 构造函数')
      }
    }

    init().catch(e => safe(`初始化异常: ${(e as Error).message}`))
    return () => {
      cancelled = true
    }
  }, [])

  const handleGetLocation = () => {
    if (!geoRef.current || loading) return
    setLoading(true)
    setLogs(prev => [...prev, '调用 getLocation...'])

    geoRef.current.getLocation(
      (result) => {
        setLogs(prev => [
          ...prev,
          `定位成功:\n${JSON.stringify(result, null, 2)}`,
        ])
        setLoading(false)
      },
      (error) => {
        setLogs(prev => [
          ...prev,
          `定位失败:\n${JSON.stringify(error, null, 2)}`,
        ])
        setLoading(false)
      },
      {
        timeout: 6000,
        highAccuracy: false,
      },
    )
  }

  return (
    <div
      style={{
        maxWidth: 640,
        margin: '48px auto',
        padding: '0 16px',
        fontFamily: 'monospace',
        fontSize: 14,
      }}
    >
      <h1 style={{ fontSize: 20, marginBottom: 8 }}>腾讯位置服务 H5 定位测试（/play）</h1>
      <p style={{ color: '#888', marginBottom: 16 }}>
        初始化完成后，点击下方按钮请求定位：
      </p>
      <div style={{ marginBottom: 16 }}>
        <button
          type="button"
          onClick={handleGetLocation}
          disabled={!ready || loading}
          style={{
            padding: '8px 16px',
            fontSize: 14,
            borderRadius: 6,
            border: 'none',
            background: ready && !loading ? '#07c160' : '#444',
            color: '#fff',
            cursor: ready && !loading ? 'pointer' : 'not-allowed',
          }}
        >
          {loading ? '定位中...' : ready ? '获取定位' : 'SDK 初始化中...'}
        </button>
      </div>
      <pre
        style={{
          whiteSpace: 'pre-wrap',
          background: '#111',
          color: '#3f6',
          padding: 16,
          borderRadius: 8,
          minHeight: 240,
        }}
      >
        {logs.length ? logs.join('\n') : '等待初始化...'}
      </pre>
    </div>
  )
}
