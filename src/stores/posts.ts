import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { IPost, IComment } from '@/models/basic'

export const usePostsStore = defineStore('posts', () => {
  const posts = ref<IPost[]>([])
  const post = ref<IPost | null>(null)
  const loading = ref<boolean>(false)
  const postComments = ref<IComment[]>([])

  const fetchPosts = async (params: string) => {
    loading.value = true
    fetch(`https://jsonplaceholder.typicode.com/posts?${params}`)
      .then((response) => response.json())
      .then((data) => {
        posts.value = data
        loading.value = false
      })
  }

  const fetchPost = async (id: number) => {
    loading.value = true
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((response) => response.json())
      .then((data) => {
        post.value = data
        loading.value = false
      })
  }

  const fetchComments = async (id: number) => {
    loading.value = true
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
      .then((response) => response.json())
      .then((data) => {
        postComments.value = data
        loading.value = false
      })
  }

  return { posts, post, postComments, loading, fetchPosts, fetchPost, fetchComments }
})
