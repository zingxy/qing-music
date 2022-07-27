<script setup>
import usePlayerStore from '@/store/playerStore'
import useFavorite from './player/useFavorite'
const props = defineProps({
  songs: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['select'])

const playerStore = usePlayerStore()

const { IconFav, toggleFav } = useFavorite()

function onSelect(song, index) {
  console.log(song)
  emit('select', song, index)
}
</script>
<template>
  <div>
    <ul class="playlist">
      <li
        v-for="(song, idx) of props.songs"
        :key="song.id"
      >
        <p
          class="song flex items-center justify-around text-slate-500 hover:rounded-sm hover:bg-white hover:py-2 hover:text-black"
          :class="song.id === playerStore.currentSong.id ? 'text-red-300' : ''"
          @click.stop="onSelect(song, idx)"
        >
          <span class="flex-[.5] text-center">{{
            (idx + 1).toString().padStart(2, '0')
          }}</span>
          <span
            class="flex-[1.2] overflow-hidden text-ellipsis whitespace-nowrap text-xs"
          >
            {{ song.name }}
          </span>
          <span class="flex-[.5] cursor-pointer">
            <component
              :is="IconFav"
              class="text-red-400 dark:text-slate-400"
              @click.stop="toggleFav"
            />
          </span>

          <span class="flex-[.8] cursor-pointer text-xs">
            {{ song.ar[0].name }}
          </span>
          <span
            class="flex-[.5] cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap text-xs"
          >
            {{ song.al.name ? song.al.name : 'unknown' }}
          </span>
        </p>
      </li>
    </ul>
  </div>
</template>
