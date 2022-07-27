/*  */
import IconPause from '~icons/ic/sharp-pause-circle'
import IconStart from '~icons/ic/round-play-circle'
import { ref, computed } from 'vue'
import usePlayerStore from '../../store/playerStore'

export default function usePlaying() {
  const playerStore = usePlayerStore()
  const playing = computed(() => playerStore.playing)

  const IconPlayingStatus = computed(() =>
    playing.value ? IconPause : IconStart
  )

  function togglePlay() {
    playing.value ? playerStore.pause() : playerStore.play()
    playerStore.setPlaying(!playing.value)
  }

  return {
    IconPlayingStatus,
    togglePlay,
  }
}
