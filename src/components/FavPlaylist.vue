<script setup>
import { onMounted, ref, watch, watchEffect } from 'vue'
import { useUserStore } from '../store/userStore'
import usePlayerStore from '../store/playerStore'
import { getUserPlaylist } from '../services/user'
import BasicPlaylist from './BasicPlaylist.vue'

const userStore = useUserStore()
const favListId = ref(0)

watchEffect(async () => {
  if (!userStore.userId) return
  // 获取用户的所有playlist
  let data = await getUserPlaylist(userStore.userId)
  userStore.setPlylist(data.playlist.map(item => item.id))
  // 第0项是我的喜欢歌单
  favListId.value = userStore.playlistIds[0]
})
</script>

<template>
  <div>
    <Suspense>
      <BasicPlaylist
        v-if="favListId"
        :id="favListId"
      />

      <!-- <AsyncTest /> -->
      <template #fallback>
        <div>loading</div>
      </template>
    </Suspense>
  </div>
</template>
<style scoped>
.song:hover {
  box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.2);
}
</style>
