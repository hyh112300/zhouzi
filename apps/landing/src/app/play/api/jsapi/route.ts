import type { NextRequest } from 'next/server'
import { getJsapiConfig } from '../../_lib/wechat'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const pageUrl = req.nextUrl.searchParams.get('url')
  if (!pageUrl) return Response.json({ errMsg: '缺少 url 参数' }, { status: 400 })

  // 只允许为本站域名签名，防止签名接口被第三方滥用
  let host: string
  try {
    host = new URL(pageUrl).hostname
  } catch {
    return Response.json({ errMsg: 'url 非法' }, { status: 400 })
  }
  if (!host.endsWith('zhouzi.icu')) {
    return Response.json({ errMsg: `域名 ${host} 不允许签名` }, { status: 403 })
  }

  try {
    return Response.json(await getJsapiConfig(pageUrl))
  } catch (e) {
    return Response.json({ errMsg: (e as Error).message }, { status: 500 })
  }
}
