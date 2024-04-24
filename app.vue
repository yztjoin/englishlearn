<template>
  <div>
    <n-space>
      <n-button type="primary">naive-ui</n-button>
      <n-button type="info">naive-ui</n-button>
      <n-button type="warning">naive-ui</n-button>
      <n-popover trigger="hover">
        <template #trigger>
          <n-button>悬浮</n-button>
        </template>
        <span>或许不想知道你的花园长得咋样</span>
      </n-popover>
    </n-space>
  </div>
</template>
<script lang="ts" setup>
import { NButton } from 'naive-ui'
</script>