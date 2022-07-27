<script setup>
/* 这是一个异步组件 */
import { ref, watch, computed } from 'vue'
import { getPlaylist } from '../services/playlist'
import { getSongUrl } from '../services/song'
import MusicList from './MusicList.vue'
import usePlayerStore from '../store/playerStore'

const props = defineProps({
  id: {
    type: Number, // 歌单ID
    default: 0,
  },
})
const playerStore = usePlayerStore()
// 获取一个歌单
const playlist = ref([])
const currentSong = computed(() => playerStore.currentSong)
playlist.value = await getPlaylist(props.id)

watch(currentSong, async (newSong, oldSong, onInvalidate) => {
  // console.log(currentSong.value.id)
  let expired = false

  onInvalidate(() => {
    expired = true
  })
  const { code, data } = await getSongUrl(newSong.id)
  // console.log(data)
  if (code !== 200) console.log('歌曲获取失败')
  // 该副作用已经过期
  if (expired) return
  playerStore.audio.src = data[0].url
  playerStore.play()
  playerStore.setPlaying(true)
})

function onSelect(song, index) {
  // 切换为当前歌单
  playerStore.setList(playlist.value.songs)
  // 设置歌曲索引
  playerStore.setCurrentIndex(index)
  // console.log(song)
}
</script>

<template>
  <MusicList
    :songs="playlist.songs"
    @select="onSelect"
  />
</template>
