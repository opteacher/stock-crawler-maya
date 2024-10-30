<script setup lang="ts">
import { ref } from 'vue'
import { SearchOutlined, PlusOutlined } from '@ant-design/icons-vue'

const searchText = ref()
</script>

<template>
  <a-layout class="h-full">
    <a-layout-header theme="light">
      <a-space>
        <a-input size="large" v-model:value="searchText" placeholder="搜索股票">
          <template #suffix>
            <SearchOutlined />
          </template>
        </a-input>
        <a-button type="primary" size="large"><template #icon><PlusOutlined /></template></a-button>
      </a-space>
    </a-layout-header>
    <a-layout>
      <a-layout-sider theme="light" width="20%">关注股票</a-layout-sider>
      <a-layout-content>股票信息</a-layout-content>
    </a-layout>
    <a-layout-footer>爬取任务状态和控制</a-layout-footer>
  </a-layout>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
