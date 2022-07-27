import { get } from './base'
// 获取歌曲对应的url
export async function getSongUrl(id) {
  const serverData = await get('/song/url', {
    id,
  })
  return serverData
}


