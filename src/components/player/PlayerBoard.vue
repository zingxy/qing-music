<script setup>
import { ref, computed } from 'vue'
import IconExitFullscreen from '~icons/majesticons/arrows-collapse-full'

import usePlayerStore from '../../store/playerStore'
import PlayerControl from './PlayerControl.vue'

const emit = defineEmits(['requestFullscreen'])

const fullscreen = ref(false)
const playerStore = usePlayerStore()

const picUrl = computed(() =>
  playerStore.currentSong.al ? playerStore.currentSong.al.picUrl : ''
)

function onFullscreen() {
  fullscreen.value = !fullscreen.value
  emit('requestFullscreen')
}

const fullscreenStyle = computed(() => {
  if (!fullscreen.value) return

  return {
    backgroundImage: `url(${picUrl.value})`,
    color: 'white',
  }
})
</script>
<template>
  <Transition name="slide">
    <div
      v-show="fullscreen"
      class="relative h-full w-full rounded-2xl text-white dark:text-white"
      :style="fullscreenStyle"
    >
      <header class="absolute z-10 h-4 p-2 text-red-300">
        <IconExitFullscreen
          class="cursor-pointer"
          @click="onFullscreen"
        />
      </header>
      <div class="h-full w-full rounded-md backdrop-blur-3xl">
        <div class="flex h-full w-full items-center justify-center">
          <img
            :src="picUrl"
            class="h-[20rem]"
          />
        </div>
      </div>
    </div>
  </Transition>

  <PlayerControl
    class="absolute bottom-0 w-full rounded-md backdrop-blur-3xl"
    @fullscreen="onFullscreen"
  />
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(100%);
}
</style>
