<!-- 与时间相关的 -->

<script setup>
import { ref, computed } from 'vue'
import usePlayerStore from '../../store/playerStore'

const playerStore = usePlayerStore()
const audio = computed(() => playerStore.audio)
const currentTime = ref(0)

audio.value.addEventListener(
  'timeupdate',
  e => (currentTime.value = e.target.currentTime)
)
</script>

<template>
  <div>
    <slot :current-time="currentTime">
      {{ currentTime }}
    </slot>
  </div>
</template>
