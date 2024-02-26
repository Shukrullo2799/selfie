<template>
  <div v-if="postsStore.loading" class="loading">Loading...</div>

  <div v-else>
    <n-card :title="post.title">
      <p>{{ post.body }}</p>

      <div class="mt-4 flex flex-col gap-4 comments">
        <h3>Comments</h3>
        <n-input v-model:value="search" type="text" placeholder="Search by Email" round />
        <div v-for="comment in filterComments" :key="comment.id" id="observer">
          <n-card :title="comment.name">
            <p class="mb-1">Email: {{ comment.email }}</p>
            <p>{{ comment.body }}</p>
          </n-card>
        </div>
        <div v-if="postsStore.commentLoading" class="loadingComment">Loading comments...</div>
      </div>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { usePostsStore } from '@/stores/posts'
import { NCard, NInput } from 'naive-ui'

const postsStore = usePostsStore()
const route = useRoute()
const search = ref('')
const post = computed(() => postsStore.post)
const filter = ref<any>({
  start: 0,
  limit: 2
})
const getPost = () => {
  postsStore.fetchPost(+route.params.id)
}

const getComments = () => {
  postsStore.fetchComments(+route.params.id, filter.value).then(() => {
    setTimeout(() => {
      document.querySelectorAll('#observer').forEach((el) => {
        intersectionObserver.observe(el)
      })
    }, 0)
  })
}

const filterComments = computed(() => {
  return postsStore.postComments.filter((comment) => {
    // search by email and name
    return (
      comment.email.toLowerCase().includes(search.value.toLowerCase()) ||
      comment.name.toLowerCase().includes(search.value.toLowerCase())
    )
  })
})

const intersectionObserver = new IntersectionObserver((entries, observer) => {
  if (filter.value.start * filter.value.limit > postsStore.postComments.length) {
    return
  }
  entries.forEach((entry: any) => {
    if (entry.isIntersecting) {
      if (entry.target == document.querySelector('.comments > div:last-child')) {
        filter.value.start += 2
        getComments()
      }
    }
  })
})

onMounted(() => {
  getPost()
})

onMounted(() => {
  getPost()
  getComments()
})
</script>
