<template>
  <div class="home">
    <h2 class="title">📚 我的博客文章</h2>
    <div class="card-list">
      <div
        v-for="post in posts"
        :key="post.id"
        class="card"
      >
        <img :src="post.cover" class="cover" />
        <div class="info">
          <h3>{{ post.title }}</h3>
          <p class="desc">{{ post.description }}</p>
          <p class="meta">🕒 {{ post.date }} ｜ 🏷️ {{ post.category }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const posts = ref([])

onMounted(async () => {
  const res = await fetch('/src/data/posts.json')
  posts.value = await res.json()
})
</script>

<style scoped>
.home {
  max-width: 900px;
  margin: 20px auto;
  padding: 0 16px;
}
.title {
  font-size: 22px;
  margin-bottom: 20px;
}
.card-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 20px;
}
.card {
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease;
}
.card:hover {
  transform: translateY(-5px);
}
.cover {
  width: 100%;
  height: 150px;
  object-fit: cover;
}
.info {
  padding: 12px;
}
.desc {
  color: #666;
  font-size: 14px;
  margin: 5px 0;
}
.meta {
  font-size: 12px;
  color: #999;
}
</style>
