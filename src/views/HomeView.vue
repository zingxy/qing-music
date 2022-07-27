<script setup>
import { onMounted } from 'vue'
import { useUserStore } from '../store/userStore'
import { getAccount, getSubcount } from '../services/user'
import FavPlaylist from '../components/FavPlaylist.vue'

const userStore = useUserStore()

//
onMounted(async () => {
  const data = await getAccount()
  const { profile } = data
  const user = {
    userId: profile.userId,
    nickname: profile.nickname,
    avatarUrl: profile.avatarUrl,
    backgroundUrl: profile.backgroundUrl,
  }
  userStore.setUser(user)
})
</script>

<template>
  <div class="home relative">
    <div
      class="basic-info w-full h-[30%] rounded-md flex items-center justify-around dark:shadow-xl"
      :style="{ backgroundImage: `url(${userStore.backgroundUrl})` }"
    >
      <img
        class="w-20 h-20 rounded-[50%]"
        :src="userStore.avatarUrl"
      />
      <h1 class="text-white text-3xl">
        {{ userStore.nickname }}
      </h1>
    </div>
    <div class="shortcut h-[70%] flex justify-around">
      <FavPlaylist class="flex-1 overflow-y-scroll" />
    </div>
  </div>
</template>

<style scoped>
.basic-info {
  box-shadow: 0px 0px 5px 0px white;
}
</style>
