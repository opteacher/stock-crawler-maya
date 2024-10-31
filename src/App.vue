<script setup lang="ts">
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { SearchOutlined, PlusOutlined } from '@ant-design/icons-vue'
import dayjs, { Dayjs } from 'dayjs'

type Stock = { dm: string; mc: string; jys: 'sz' | 'sh' }
type New = { title: string; content: string; cover: string; create_time: Dayjs }

const searchData = ref<any[]>([])
const allStks = ref<Stock[]>([])
const relNews = ref<New[]>([])

onMounted(refresh)

async function refresh() {
  const resp = await axios.get('https://api.mairui.club/hslt/list/b997d4403688d5e66a')
  if (resp.status !== 200) {
    throw new Error('查询股票列表异常')
  }
  allStks.value = resp.data
}
function onSearchInput(inputText: string) {
  searchData.value.splice(0, searchData.value.length)
  for (const stock of allStks.value) {
    if (stock.dm.includes(inputText) || stock.mc.includes(inputText)) {
      searchData.value.push({ label: `${stock.mc} (${stock.dm})`, value: stock.dm })
    }
  }
}
async function onSearchSelect(selStk: Stock) {
  const resp = await axios.post('https://app.jiuyangongshe.com/jystock-app/api/v2/article/search', {
    back_garden: 0,
    keyword: selStk.mc,
    limit: 15,
    order: 1,
    start: 0,
    type: '2'
  })
  if (resp.status !== 200) {
    throw new Error('查询股票新闻异常')
  }
  console.log(resp.data)
  const { data } = resp.data
  relNews.value.splice(0, relNews.value.length)
  for (const item of data.result) {
    item.create_time = dayjs(item.create_time)
    relNews.value.push(item)
  }
  console.log(relNews.value)
}
</script>

<template>
  <a-layout class="h-full">
    <a-layout-header theme="light">
      <a-space>
        <a-select
          class="w-60"
          size="large"
          show-search
          placeholder="搜索股票"
          :default-active-first-option="false"
          :show-arrow="false"
          :filter-option="false"
          :not-found-content="null"
          :options="searchData"
          allowClear
          @search="onSearchInput"
          @change="onSearchSelect"
        >
          <template #suffixIcon>
            <SearchOutlined />
          </template>
        </a-select>
        <a-button type="primary" size="large">
          <template #icon><PlusOutlined /></template>
        </a-button>
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
