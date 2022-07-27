import IconLike from '~icons/bi/arrow-through-heart-fill'
import IconsDislike from '~icons/bi/arrow-through-heart'
import { computed, ref } from 'vue'

export default function useFavorite() {
  const fav = ref(false)

  const IconFav = computed(() => (fav.value ? IconLike : IconsDislike))

  function toggleFav() {
    fav.value = !fav.value
  }

  return {
    IconFav,
    toggleFav,
  }
}
