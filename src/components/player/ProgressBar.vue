<script setup>
import { computed, ref, watch } from 'vue'

const props = defineProps({
  progress: {
    type: Number, // 百分比例
    default: 0,
  },
})

const emit = defineEmits(['seeking', 'seeked'])

// dom ref
const wrapperRef = ref(null)
// dom ref
const thumbRef = ref(null)

const offset = ref(0)

watch(
  () => props.progress,
  () => {
    offset.value = props.progress * wrapperRef.value.clientWidth
  }
)

// 进度条的动态样式:宽度
const progressStyle = computed(() => {
  const width = offset.value + 'px'
  return {
    width,
  }
})

let start = 0
let end = 0
let delta = 0
function onMouseDown(e) {
  console.log('down')
  thumbRef.value.onmousemove = onMouseMove
}
function onMouseMove(e) {
  console.log('move')
}
function onMouseUp(e) {
  console.log('up')
  thumbRef.value.onmousemove = null
}
</script>

<template>
  <div class="flex items-center justify-center gap-1">
    <slot
      name="prefix"
      class="flex"
    >
      00:00
    </slot>
    <div
      ref="wrapperRef"
      class="relative h-0.5 flex-1 overflow-visible bg-slate-400"
    >
      <p
        class="progress absolute h-full bg-green-300"
        :style="progressStyle"
      >
        <span
          ref="thumbRef"
          class="thumb absolute right-0 inline-block h-2 w-2 -translate-y-[25%] rounded-[50%] bg-green-400 transition duration-100 ease-in-out"
          @mousedown.stop="onMouseDown"
          @mouseup.stop="onMouseUp"
        />
      </p>
    </div>
    <slot
      name="postfix"
      class="flex"
    >
      00:00
    </slot>
  </div>
</template>
