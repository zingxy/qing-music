<script setup>
import { computed, ref } from 'vue'
// 3rd
import { useRoute, useRouter } from 'vue-router'

// icon
import IconHome from '~icons/mdi/home'
import IconPlaylist from '~icons/ph/playlist-fill'
import IconLib from '~icons/fluent/library-16-filled'

import IconTrends from '~icons/ph/trend-up'
import IconNew from '~icons/mdi/new-box'
import IconCal from '~icons/clarity/date-solid-badged'

import IconFav from '~icons/ic/sharp-favorite'
import IconArtist from '~icons/fluent/people-community-16-filled'
import IconAlbums from '~icons/ic/baseline-star-rate'

import IconClose from '~icons/ion/close-circle'
import IconExpand from '~icons/material-symbols/expand-circle-down'

const route = useRoute()
const router = useRouter()
const collapse = ref(false)
function toggle() {
  collapse.value = !collapse.value
}
const currentPath = computed(() => {
  return route.fullPath
})

// function display() {
//   console.log(route)
// }
function go(path) {
  router.push({
    path,
  })
}

const groups = {
  Basic: [
    {
      name: 'Home',
      link: '/home',
      icon: IconHome,
    },
    {
      name: 'Playlist',
      link: '/playlist',
      icon: IconPlaylist,
    },
    {
      name: 'Lib',
      link: '/lib',
      icon: IconLib,
    },
  ],
  Discover: [
    {
      name: 'Trends',
      link: '/trends',
      icon: IconTrends,
    },
    {
      name: 'New',
      link: '/new',
      icon: IconNew,
    },
    {
      name: 'Calendar',
      link: '/calendar',
      icon: IconCal,
    },
  ],
  Collection: [
    {
      name: 'Favorites',
      link: '/favorites',
      icon: IconFav,
    },
    {
      name: 'Artist',
      link: '/artist',
      icon: IconArtist,
    },
    {
      name: 'Albums',
      link: '/albums',
      icon: IconAlbums,
    },
  ],
}
</script>

<template>
  <div class="flex flex-col">
    <header class="flex justify-end">
      <component
        :is="collapse ? IconExpand : IconClose"
        class="cursor-pointer text-slate-500 hover:text-red-400"
        @click="toggle"
      />
    </header>
    <div class="groups flex flex-1 flex-col">
      <div
        v-for="(group, groupName) in groups"
        :key="groupName"
        class="group flex flex-1 flex-col"
      >
        <h2
          v-if="!collapse"
          class="text-xs text-slate-400"
        >
          {{ groupName }}
        </h2>
        <div class="item flex flex-1 flex-col">
          <p
            v-for="(item, idx) in group"
            :key="idx"
            :class="currentPath.startsWith(item.link) ? 'highlight' : ''"
            class="flex flex-1 cursor-pointer items-center gap-2 text-slate-500 hover:bg-slate-500 hover:text-white"
            @click="go(item.link)"
          >
            <Component :is="item.icon" />
            <span v-show="!collapse">{{ item.name }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.highlight {
  @apply bg-slate-300;
}
</style>
