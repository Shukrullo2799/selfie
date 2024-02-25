<script setup lang="ts">
import { onMounted } from 'vue'

import { usePostsStore } from '@/stores/posts'

const postsStore = usePostsStore()

const getList = () => {
  postsStore.fetchPosts('views_gt=9000')
}
onMounted(() => {
  getList()
})
</script>

<template>
  <main>
    <div v-if="postsStore.loading">Loading...</div>

    <div v-else>
      {{ postsStore.posts }}
    </div>
  </main>
</template>
