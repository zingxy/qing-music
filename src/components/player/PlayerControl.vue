<script setup>
import { computed } from 'vue'

import IconAddToList from '~icons/ic/round-playlist-add'
import IconPlayerFullScreen from '~icons/mdi/arrow-expand'

import IconPrevious from '~icons/ic/round-skip-previous'
import IconNext from '~icons/ic/round-skip-next'

import PlayerTime from './PlayerTime.vue'
import ProgressBar from './ProgressBar.vue'

import usePlaying from './usePlaying'
import useFavorite from './useFavorite'
import usePlayerStore from '../..//store/playerStore'

const emit = defineEmits(['fullscreen'])

const playerStore = usePlayerStore()
const { IconPlayingStatus, togglePlay } = usePlaying()
const { IconFav, toggleFav } = useFavorite()

const duration = computed(() => playerStore.currentSong.dt || 0)

function previous() {
  playerStore.setCurrentIndex(playerStore.currentIndex - 1)
}

function next() {
  playerStore.setCurrentIndex(playerStore.currentIndex + 1)
}

function format(timestamp) {
  const delta = Math.floor(timestamp / 1000)
  const mins = Math.floor(delta / 60)
    .toString()
    .padStart(2, 0)
  const secs = (delta % 60).toString().padStart(2, 0)
  return `${mins}:${secs}`
}

function onFullscreen() {
  emit('fullscreen')
}
</script>
<template>
  <div class="flex flex-col">
    <div class="flex flex-1">
      <section class="flex flex-1 items-center justify-center gap-4">
        <span>
          <component
            :is="IconFav"
            class="cursor-pointer text-red-500"
            @click="toggleFav"
          />
        </span>
        <span>
          <IconAddToList />
        </span>
        <span>
          <IconPlayerFullScreen @click="onFullscreen" />
        </span>
        <p
          class="flex w-20 flex-col overflow-hidden text-ellipsis whitespace-nowrap text-[0.5rem]"
        >
          <span>{{ playerStore.songName }}</span>
          <span> {{ playerStore.singerName }} </span>
        </p>
      </section>
      <section class="flex flex-1 items-center justify-center gap-4">
        <span @click="previous">
          <IconPrevious class="cursor-pointer" />
        </span>
        <span @click="togglePlay">
          <IconPlayingStatus class="cursor-pointer" />
        </span>
        <span @click="next">
          <IconNext class="cursor-pointer" />
        </span>
      </section>
      <section class="flex flex-1 items-center justify-center gap-4">
        <span>left</span>
        <span>mid</span>
        <span>right</span>
      </section>
    </div>
    <div class="flex">
      <PlayerTime class="flex-1">
        <template #default="{ currentTime }">
          <ProgressBar :progress="(currentTime * 1000) / duration">
            <template #prefix>
              {{ format(currentTime * 1000) }}
            </template>
            <template #postfix>
              {{ format(duration) }}
            </template>
          </ProgressBar>
        </template>
      </PlayerTime>
    </div>
  </div>
</template>
