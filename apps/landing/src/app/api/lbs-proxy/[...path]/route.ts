import type { NextRequest } from 'next/server'
import process from 'node:process'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> },
) {
  // 等待 Next.js 15 的 params 解析
  await params

  const key = process.env.TENCENT_LBS_KEY
  if (!key) {
    return NextResponse.json(
      { status: 500, message: '服务端未配置 TENCENT_LBS_KEY' },
      { status: 500 },
    )
  }

  // 提取 /api/lbs-proxy 后面的真实请求路径（保留末尾斜杠）
  const subPath = request.nextUrl.pathname.replace(/^\/api\/lbs-proxy/, '')
  const searchParams = new URLSearchParams(request.nextUrl.searchParams)
  searchParams.set('key', key)

  const targetUrl = `https://apis.map.qq.com${subPath}?${searchParams.toString()}`

  try {
    const res = await fetch(targetUrl, {
      headers: {
        // 透传当前页面的 referer
        referer: request.headers.get('referer') || '',
      },
    })

    const data = await res.text()

    return new NextResponse(data, {
      status: res.status,
      headers: {
        'content-type':
          res.headers.get('content-type')
          || 'application/javascript; charset=utf-8',
      },
    })
  } catch (err) {
    return NextResponse.json(
      { status: 500, message: (err as Error).message },
      { status: 500 },
    )
  }
}
