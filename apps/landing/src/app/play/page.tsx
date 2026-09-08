'use client'

import { useEffect, useState } from 'react'

declare global {
  interface Window {
    wx?: {
      config: (cfg: Record<string, unknown>) => void
      ready: (cb: () => void) => void
      error: (cb: (err: unknown) => void) => void
      getLocation: (opts: Record<string, unknown>) => void
    }
  }
}

export default function PlayPage() {
  const [logs, setLogs] = useState<string[]>([])
  const [ready, setReady] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let cancelled = false
    const safe = (line: string) => {
      if (!cancelled) setLogs(prev => [...prev, line])
    }

    const init = async () => {
      const pageUrl = location.href.split('#')[0]
      safe(`页面 URL: ${pageUrl}`)

      // 注入 jweixin
      if (!window.wx) {
        safe('加载 jweixin-1.6.0...')
        await new Promise<void>((resolve, reject) => {
          const s = document.createElement('script')
          s.src = 'https://res.wx.qq.com/open/js/jweixin-1.6.0.js'
          s.onload = () => resolve()
          s.onerror = () => reject(new Error('jweixin 加载失败'))
          document.head.appendChild(s)
        })
        safe('jweixin 加载完成')
      }

      const res = await fetch(`/play/api/jsapi?url=${encodeURIComponent(pageUrl)}`)
      const cfg = (await res.json()) as { appId?: string, signature?: string, errMsg?: string }
      if (!cfg.signature) {
        safe(`签名接口错误: ${JSON.stringify(cfg)}`)
        return
      }
      safe(`config: appId=${cfg.appId}`)

      window.wx!.config({ ...cfg, jsApiList: ['getLocation'] })
      window.wx!.ready(() => {
        safe('wx.ready: JS-SDK 就绪，请点击按钮获取定位')
        if (!cancelled) setReady(true)
      })
      window.wx!.error(err => safe(`wx.error: ${JSON.stringify(err)}`))
    }

    init().catch(e => safe(`初始化异常: ${(e as Error).message}`))
    return () => {
      cancelled = true
    }
  }, [])

  const handleGetLocation = () => {
    if (!window.wx || loading) return
    setLoading(true)
    setLogs(prev => [...prev, '调用 getLocation...'])
    window.wx.getLocation({
      type: 'gcj02',
      success: (r: { latitude: number, longitude: number, accuracy: number }) =>
        setLogs(prev => [...prev, `OK: lat=${r.latitude}  lng=${r.longitude}  accuracy=${r.accuracy}m`]),
      fail: (err: { errMsg?: string }) =>
        setLogs(prev => [...prev, `getLocation 失败: ${err?.errMsg ?? JSON.stringify(err)}`]),
      complete: () => setLoading(false),
    })
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
      <h1 style={{ fontSize: 20, marginBottom: 8 }}>微信 H5 定位测试（/play）</h1>
      <p style={{ color: '#888', marginBottom: 16 }}>
        用微信打开本页。初始化完成后，点击下方按钮请求定位：
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
