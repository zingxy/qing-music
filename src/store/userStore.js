import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      userId: '',
      nickname: '',
      avatarUrl: '',
      backgroundUrl: '',
      playlistIds: [],
    }
  },
  actions: {
    setUser(user) {
      this.userId = user.userId
      this.nickname = user.nickname
      this.avatarUrl = user.avatarUrl
      this.backgroundUrl = user.backgroundUrl
    },
    // 设置用户歌单的ids
    setPlylist(playlistIds) {
      this.playlistIds = playlistIds
    },
  },
})

export default useUserStore
