<script setup lang="ts">
import { onMounted, reactive, ref, computed } from 'vue'
import { usePostsStore } from '@/stores/posts'
import { NDataTable, NLayout, NSpace, NButton, NInput } from 'naive-ui'
import { useRouter } from 'vue-router'

const router = useRouter()
const postsStore = usePostsStore()

const columns: any[] = [
  {
    key: 'id',
    title: 'ID',
    minWidth: 80,
    maxWidth: 150,
    sortOrder: 'true',
    sorter: (a: any, b: any) => a.id - b.id
  },
  {
    key: 'title',
    title: 'Title',
    sortOrder: 'true',
    sorter: (a: any, b: any) => a.title.localeCompare(b.title)
  },
  { key: 'body', title: 'Body' }
]
const search = ref('')
const rowClick = (row: any) => {
  router.push({
    name: 'ViewPost',
    params: { id: row.id }
  })
}
const rowProps = (row: any) => {
  return {
    style: 'cursor: pointer;',
    onClick: () => {
      rowClick(row)
    }
  }
}
const paginationReactive = reactive({
  page: 1,
  pageSize: 10,
  showSizePicker: true,
  pageSizes: [10, 20, 50],
  onChange: (page: number) => {
    paginationReactive.page = page
  },
  onUpdatePageSize: (pageSize: number) => {
    paginationReactive.pageSize = pageSize
    paginationReactive.page = 1
  }
})

const refresh = () => {
  paginationReactive.page = 1
  paginationReactive.pageSize = 10
  search.value = ''
}
const getList = () => {
  postsStore.fetchPosts('')
}
const filterPosts = computed(() => {
  return postsStore.posts.filter((post) => {
    return post.title.toLowerCase().includes(search.value.toLowerCase())
  })
})

onMounted(() => {
  getList()
})
</script>

<template>
  <n-layout content-class="p-6">
    <div v-if="postsStore.loading">Loading...</div>

    <div v-else>
      <n-space vertical :size="12">
        <n-space>
          <n-input v-model:value="search" type="text" placeholder="Search" round />
          <n-button @click="refresh">Clear</n-button>
        </n-space>
        <n-data-table
          :columns="columns"
          :data="filterPosts"
          :row-props="rowProps"
          :pagination="paginationReactive"
        />
      </n-space>
    </div>
  </n-layout>
</template>
