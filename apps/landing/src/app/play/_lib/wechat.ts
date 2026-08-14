import { createHash } from 'node:crypto'
import process from 'node:process'

const APPID = process.env.WECHAT_APPID ?? ''
const SECRET = process.env.WECHAT_SECRET ?? ''

// access_token / jsapi_ticket 有效期 7200s，必须在服务端全局缓存，否则触发微信频率限制
let token = { value: '', expires: 0 }
let ticket = { value: '', expires: 0 }

async function getAccessToken(): Promise<string> {
  if (token.value && Date.now() < token.expires) return token.value
  if (!APPID || !SECRET) throw new Error('未配置 WECHAT_APPID / WECHAT_SECRET')
  const res = await fetch(
    `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${APPID}&secret=${SECRET}`,
  )
  const data = (await res.json()) as { access_token?: string, expires_in?: number, errmsg?: string }
  if (!data.access_token)
    throw new Error(`获取 access_token 失败: ${data.errmsg ?? JSON.stringify(data)}`)
  token = { value: data.access_token, expires: Date.now() + ((data.expires_in ?? 7200) - 300) * 1000 }
  return data.access_token
}

async function getJsapiTicket(accessToken: string): Promise<string> {
  if (ticket.value && Date.now() < ticket.expires) return ticket.value
  const res = await fetch(
    `https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${accessToken}&type=jsapi`,
  )
  const data = (await res.json()) as { ticket?: string, expires_in?: number, errmsg?: string }
  if (!data.ticket) throw new Error(`获取 jsapi_ticket 失败: ${data.errmsg ?? JSON.stringify(data)}`)
  ticket = { value: data.ticket, expires: Date.now() + ((data.expires_in ?? 7200) - 300) * 1000 }
  return data.ticket
}

export async function getJsapiConfig(pageUrl: string) {
  const accessToken = await getAccessToken()
  const jsapiTicket = await getJsapiTicket(accessToken)
  const nonceStr = Math.random().toString(36).slice(2, 15)
  const timestamp = Math.floor(Date.now() / 1000)
  const string1 = `jsapi_ticket=${jsapiTicket}&noncestr=${nonceStr}&timestamp=${timestamp}&url=${pageUrl}`
  const signature = createHash('sha1').update(string1).digest('hex')
  return { appId: APPID, timestamp: String(timestamp), nonceStr, signature }
}
