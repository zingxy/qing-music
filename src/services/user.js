import { get } from './base'
/* 认证后可以调用的接口 */
// 账号信息 用户信息
export async function getAccount() {
  const serverData = await get('user/account')
  return serverData
}
// 收藏信息
export async function getSubcount() {
  const serverData = await get('user/subcount')
  return serverData
}
// 用户歌单
export async function getUserPlaylist(uid) {
  console.log('uid', uid)
  const serverData = await get('user/playlist', { uid })
  return serverData
}
