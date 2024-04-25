<template>
  <div>
    测试标题 {{ counter }}
  </div>
</template>
<script lang="ts" setup>
const counter = useState('counter')
useHead({
  title: '测试！！！！！',
  meta: [
    { name: 'description', content: '测试！！！！！' }
  ],
  bodyAttrs: {
    class: 'test'
  },
})
</script>
<style></style>