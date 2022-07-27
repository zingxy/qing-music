import { defineStore } from 'pinia'

const usePlayerStore = defineStore('player', {
  state: () => {
    return {
      sequenceList: [], // ；原始歌曲列表，可以根据播放模式对应不同的playlist
      playing: false, // 是否正在播放
      playMode: 0, // 播放模式， 随机 顺序
      currentIndex: 0, // 当前播放歌曲在playlist中的索引
      fullScreen: false, // 是否全屏播放
      audio: new Audio(), // audio
    }
  },
  getters: {
    // 当前正在播放的歌
    currentSong: state => state.playlist[state.currentIndex] || {},
    // 当前正在播放的列表
    playlist: state => state.sequenceList,
    songName: state => state.currentSong.name || '~',
    singerName: state =>
      state.currentSong.ar ? state.currentSong.ar[0].name : '~',
  },
  actions: {
    async play() {
      this.audio.play().then()
    },
    pause() {
      this.audio.pause()
    },

    setPlaying(playing) {
      this.playing = playing
    },
    setList(list) {
      this.sequenceList = list
    },
    setCurrentIndex(index) {
      const length = this.playlist.length
      if (index < 0) this.currentIndex = length - 1
      else this.currentIndex = index % length
    },
  },
})

export default usePlayerStore
