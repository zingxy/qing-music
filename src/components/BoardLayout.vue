<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import usePlayerStore from '../store/playerStore'

import NavBar from './nav/NavBar.vue'
import PlayerBoard from './player/PlayerBoard.vue'

import IconBack from '~icons/material-symbols/arrow-circle-left'
import IconForward from '~icons/material-symbols/arrow-circle-right'

import IconSun from '~icons/ph/sun-fill'
import IconMoon from '~icons/ph/moon-stars-duotone'

import IconFocus from '~icons/material-symbols/center-focus-strong'

const playerStore = usePlayerStore()

// 是否进入黑暗模式
const darkMode = ref(false)
// 是否进入全屏模式
/**
 * @type {HtmlElement } boardRef
 */
const boardRef = ref(null)
const fullscreen = ref(false)
const playerFullscreen = ref(false)

const router = useRouter()
// 前进后退按钮
function back() {
  router.back()
}
function forward() {
  router.forward()
}
// 黑夜模式
function switchMode() {
  darkMode.value = !darkMode.value
}

// 全屏/退出全屏

function togglePlayFullscreen() {
  fullscreen.value
    ? document.exitFullscreen()
    : boardRef.value.requestFullscreen()
  fullscreen.value = !fullscreen.value
}

function onPlayerFullscreen() {
  playerFullscreen.value = !playerFullscreen.value
}
</script>
<template>
  <div
    ref="boardRef"
    class="board flex w-[60vw] overflow-hidden rounded-2xl"
    :class="darkMode ? 'dark' : ''"
  >
    <NavBar
      v-show="!playerFullscreen"
      class="nav h-full dark:bg-black"
    />
    <div class="main translate-x-0 dark:bg-black">
      <header class="sticky top-0 flex justify-between text-slate-500">
        <div class="flex items-center gap-4">
          <IconBack
            class="cursor-pointer hover:text-red-300"
            @click.stop="back"
          />
          <IconForward
            class="cursor-pointer hover:text-red-300"
            @click.stop="forward"
          />
        </div>

        <div class="flex gap-2">
          <component
            :is="darkMode ? IconMoon : IconSun"
            class="cursor-pointer hover:text-red-300"
            @click="switchMode"
          />
          <IconFocus
            class="cursor-pointer hover:text-red-300"
            @click="togglePlayFullscreen"
          />
        </div>
      </header>
      <main class="h-[95%]">
        <RouterView #="{ Component }">
          <component
            :is="Component"
            class="h-full"
          />
        </RouterView>

        <footer
          v-if="playerStore.currentSong.name"
          class="backdrop-blur-3x fixed right-0 bottom-0 left-0 flex w-full items-center bg-white"
          :class="playerFullscreen ? 'top-0 text-white' : ''"
        >
          <PlayerBoard
            class="h-full w-full"
            @request-fullscreen="onPlayerFullscreen"
          />
          <!-- <PlayerControl class="h-full flex-1" /> -->
        </footer>
      </main>
    </div>
  </div>
</template>

<style lang="postcss">
.board {
  aspect-ratio: 8/5;
}
.board > * {
  padding: 1rem;
}

.nav {
  background-color: white;
}
.main {
  flex: 8;
  background-color: #f4f5fe;
  overflow-y: scroll;
}

::-webkit-scrollbar {
  width: 0px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 2rem;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
