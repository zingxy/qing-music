import { get } from './base'
export function getPlaylist(id) {
  const serverData = get('/playlist/track/all', {
    id,
  })
  return serverData
}
