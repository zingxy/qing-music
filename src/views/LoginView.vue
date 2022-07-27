<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { beforeLogin, login, qrCheck } from '../services/login.js'

const key = ref('')
const qrStatus = ref(800)
const imgSrc = ref('')
let timerID = null

onMounted(async () => {
  key.value = await beforeLogin()

  timerID = setInterval(async () => {
    qrStatus.value = await qrCheck(key.value)
    console.log(qrStatus.value)
  }, 5000)
  imgSrc.value = await login(key.value)
})

onUnmounted(() => {
  clearInterval(timerID)
})

watch(qrStatus, newStatus => {
  if (newStatus === 803) {
    console.log('login susscess')
    clearInterval(timerID)
  }
})
</script>
<template>
  <Transition
    name="slide"
    appear
  >
    <div class="login w-full h-full flex justify-center items-center">
      <div>
        <img :src="imgSrc" />
        <span>{{ qrStatus }}</span>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 1s;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(100%);
}
</style>
