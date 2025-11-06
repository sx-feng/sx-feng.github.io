<template>
  <header
    class="chat-header"
    :style="{
      height: headerHeight + 'px',
      backgroundImage: `url(${currentBg})`,
      backgroundSize: bgSize
    }"
  >
    <div v-if="!expanded" class="content" @click="goProfile">
      <img class="avatar" src="@/assets/ME.jpg" alt="avatar" />
      <div class="info">
        <h1 class="name">{{ name }}</h1>
        <div class="tags">
          <span v-for="t in tags" :key="t" class="tag">{{ t }}</span>
        </div>
      </div>
    </div>
  </header>

  <!-- 🌸 搜索 + 分类栏 -->
  <section class="filter-bar">
    <input
      v-model="keyword"
      type="text"
      class="search-input"
      placeholder="🔍 搜索标题 / 描述 / 标签..."
    />
    <select v-model="selectedCategory" class="category-select">
      <option value="">全部分类</option>
      <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
    </select>
    <button v-if="selectedTag" class="clear-tag" @click="selectedTag = ''">
      清除标签：#{{ selectedTag }}
    </button>
  </section>

  <!-- 📚 文章卡片 -->
  <section class="posts">
    <h2 class="MYBLOG">📚🌿 My Little Blog ✧˖°</h2>
    <div class="card-list">
      <div
        v-for="post in filteredPosts"
        :key="post.id"
        class="card"
        @click="goPost(post)"
      >
        <img :src="post.cover" class="cover" />
        <div class="info">
          <h3>{{ post.title }}</h3>
          <p class="desc">{{ post.description }}</p>
          <p class="meta">🕒 {{ post.date }} ｜ 🏷️ {{ post.category }}</p>

          <div class="tag-list">
            <span
              v-for="tag in post.tags"
              :key="tag"
              class="post-tag"
              :class="{ active: tag === selectedTag }"
              @click.stop="selectedTag = tag"
            >
              #{{ tag }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <p v-if="filteredPosts.length === 0" class="no-result">
      😿 没有找到符合条件的文章...
    </p>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
// eslint-disable-next-line no-unused-vars
const goProfile = () => router.push('/profile')

// 背景与头图逻辑
const bgList = [
  new URL('@/assets/bg.jpg', import.meta.url).href,
  new URL('@/assets/bg1.jpg', import.meta.url).href,
  new URL('@/assets/bg2.jpg', import.meta.url).href,
  new URL('@/assets/bg3.jpg', import.meta.url).href
]
// eslint-disable-next-line no-unused-vars
const currentBg = ref(bgList[Math.floor(Math.random() * bgList.length)])
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  name: { type: String, default: '长风' },
  tags: { type: Array, default: () => ['欢迎来到青青草原霸主的Blog૮ ˙Ⱉ˙ ა'] }
})

// 拖拽背景逻辑（不动）
const minHeight = window.innerHeight * 0.2
const maxHeight = window.innerHeight * 0.4
const headerHeight = ref(minHeight)
const expanded = ref(false)
const bgSize = ref('cover')

let startY = 0
let currentY = 0
let baseHeight = minHeight
let dragging = false

const startDrag = (e, type) => {
  dragging = true
  startY = type === 'touch' ? e.touches[0].clientY : e.clientY
}
const moveDrag = (e, type) => {
  if (!dragging) return
  currentY = type === 'touch' ? e.touches[0].clientY : e.clientY
  const delta = currentY - startY
  if (delta > 0) headerHeight.value = Math.min(baseHeight + delta, maxHeight)
  else if (delta < 0) headerHeight.value = Math.max(baseHeight + delta, minHeight)
  expanded.value = headerHeight.value > minHeight * 1.5
  bgSize.value = expanded.value ? '120%' : 'cover'
}
const endDrag = () => {
  if (!dragging) return
  dragging = false
  baseHeight = headerHeight.value
}
onMounted(() => {
  window.addEventListener('mousedown', (e) => startDrag(e, 'mouse'))
  window.addEventListener('mousemove', (e) => moveDrag(e, 'mouse'))
  window.addEventListener('mouseup', () => endDrag('mouse'))
  window.addEventListener('touchstart', (e) => startDrag(e, 'touch'))
  window.addEventListener('touchmove', (e) => moveDrag(e, 'touch'))
  window.addEventListener('touchend', () => endDrag('touch'))
})
onBeforeUnmount(() => {
  window.removeEventListener('mousedown', (e) => startDrag(e, 'mouse'))
  window.removeEventListener('mousemove', (e) => moveDrag(e, 'mouse'))
  window.removeEventListener('mouseup', () => endDrag('mouse'))
  window.removeEventListener('touchstart', (e) => startDrag(e, 'touch'))
  window.removeEventListener('touchmove', (e) => moveDrag(e, 'touch'))
  window.removeEventListener('touchend', () => endDrag('touch'))
})

// ✨ 搜索 + 分类 + 标签逻辑
const posts = ref([])
const keyword = ref('')
const selectedCategory = ref('')
const selectedTag = ref('')
const categories = ref([])

onMounted(async () => {
  const res = await fetch('/data/posts.json')
  posts.value = await res.json()
  categories.value = [...new Set(posts.value.map(p => p.category))]
})

// eslint-disable-next-line no-unused-vars
const filteredPosts = computed(() =>
  posts.value.filter(p => {
    const kw = keyword.value.toLowerCase()
    const matchKeyword =
      !kw ||
      p.title.toLowerCase().includes(kw) ||
      p.description.toLowerCase().includes(kw) ||
      p.tags.some(t => t.toLowerCase().includes(kw))
    const matchCategory =
      !selectedCategory.value || p.category === selectedCategory.value
    const matchTag = !selectedTag.value || p.tags.includes(selectedTag.value)
    return matchKeyword && matchCategory && matchTag
  })
)

// eslint-disable-next-line no-unused-vars
const goPost = post => {
  router.push(`/post?file=${encodeURIComponent(post.file)}`)
}
</script>

<style scoped>
.chat-header {
  width: 100%;
  overflow: hidden;
  position: relative;
  transition: height 0.3s ease, background-size 0.3s ease;
}

/* ================= 顶部头像与信息区域 ================= */
.content {
  position: absolute;
  bottom: 3%;
  left: 4%;
  display: flex;
  align-items: center;
  color: #fff;
}

/* 🌸 头像放大、边框柔和 */
.avatar {
  width: 7vw;
  height: 7vw;
  min-width: 80px;
  min-height: 80px;
  border-radius: 50%;
  border: 0.3vw solid #fff;
  margin-right: 1vw;
  box-shadow: 0 0.5vw 1vw rgba(0, 0, 0, 0.25);
}

/* ✨ 名字放大 */
.name {
  font-size: 2vw;
  font-weight: 700;
  margin: 0;
  letter-spacing: 0.05vw;
}

/* 🌿 标签文字稍大，字体间距更自然 */
.tag {
  font-size: 1.3vw;
  opacity: 0.95;
  margin-right: 0.6vw;
  display: inline-block;
}

/* ================= 搜索 + 分类栏 ================= */
.filter-bar {
  width: 88%;
  margin: 3vw auto 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.2vw;
}

/* 🔍 搜索框放大、圆角更柔和 */
.search-input {
  flex: 1;
  max-width: 480px;
  padding: 0.9vw 1.4vw;
  border-radius: 2vw;
  border: 1px solid #ddd;
  font-size: 1.1vw;
  outline: none;
  transition: box-shadow 0.2s ease;
}
.search-input:focus {
  box-shadow: 0 0 0.8vw rgba(255, 155, 191, 0.4);
  border-color: #ff9bbf;
}

/* 🧭 分类下拉框 */
.category-select {
  border: 1px solid #ddd;
  border-radius: 2vw;
  padding: 0.9vw 1.4vw;
  font-size: 1.1vw;
}

/* ✨ 清除标签按钮 */
.clear-tag {
  background: linear-gradient(90deg, #f5a3c4, #ffccde);
  border: none;
  border-radius: 2vw;
  padding: 0.9vw 1.6vw;
  font-size: 1vw;
  color: #fff;
  cursor: pointer;
}

/* 📘 主区域 */
.posts {
  background: linear-gradient(160deg, #f8fbff, #e6f0ff);
  padding: 4vw 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
.MYBLOG {
  font-size: 3vw;
  color: #ff7eb6;
  margin-bottom: 2vw;
}
.card-list {
  width: 88%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.4vw;
}

/* 📑 卡片左右布局 */
.card {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 1.6vw;
  padding: 1.2vw 1.6vw;
  border-radius: 1vw;
  background: #fff;
  box-shadow: 0 0.5vw 1vw rgba(0, 0, 0, 0.05);
  transition: all 0.25s ease;
  cursor: pointer;
}
.card:hover {
  transform: translateY(-0.3vw);
  box-shadow: 0 1vw 2vw rgba(0, 0, 0, 0.08);
}

/* 图片左 */
.cover {
  width: 20%;
  min-width: 180px;
  aspect-ratio: 16 / 10;
  object-fit: cover;
  border-radius: 0.8vw;
  flex-shrink: 0;
  transition: transform 0.3s ease;
}
.card:hover .cover {
  transform: scale(1.03);
}

/* 文字右 */
.card .info {
  flex: 1;
}
.card h3 {
  font-size: 1.4vw;
  color: #2d3748;
  border-left: 0.4vw solid #63b3ed;
  padding-left: 0.6vw;
  margin: 0 0 0.5vw;
  font-weight: 600;
}
.desc {
  font-size: 1vw;
  color: #555;
  margin-bottom: 0.4vw;
  line-height: 1.5;
}
.meta {
  font-size: 0.9vw;
  color: #888;
}

/* 标签 */
.tag-list {
  margin-top: 0.4vw;
  display: flex;
  flex-wrap: wrap;
  gap: 0.4vw;
}
.post-tag {
  background: #f8f8f8;
  border-radius: 1vw;
  padding: 0.2vw 0.8vw;
  font-size: 0.9vw;
  color: #555;
  cursor: pointer;
  transition: all 0.2s;
}
.post-tag:hover {
  background: #ffeaf3;
  color: #ff5f9f;
}
.post-tag.active {
  background: linear-gradient(90deg, #ff9bbf, #ffcce1);
  color: #fff;
}

/* 📱 手机端优化：仍然左右布局但缩小比例 */
@media (max-width: 768px) {
  .avatar {
    width: 18vw;
    height: 18vw;
    border-width: 0.8vw;
  }

  .name {
    font-size: 5vw;
  }

  .tag {
    font-size: 3.6vw;
  }

  .filter-bar {
    width: 92%;
    margin-top: 5vw;
    gap: 2vw;
  }

  .search-input,
  .category-select,
  .clear-tag {
    font-size: 3.6vw;
    border-radius: 4vw;
    padding: 2.4vw 3vw;
  }

  .card-list {
    width: 92%;
    gap: 2vw;
  }
  .card {
    flex-direction: row;
    align-items: center;
    padding: 2vw 2.5vw;
    border-radius: 2vw;
    box-shadow: 0 0.8vw 1.2vw rgba(0, 0, 0, 0.05);
    transform: scale(0.95);
  }
  .cover {
    width: 38%;
    min-width: 100px;
    border-radius: 2vw;
  }
  .card h3 {
    font-size: 4vw;
    border-left: 1vw solid #63b3ed;
    padding-left: 1.5vw;
    margin-bottom: 1vw;
  }
  .desc {
    font-size: 3.2vw;
    line-height: 1.4;
    margin-bottom: 0.6vw;
  }
  .meta {
    font-size: 2.8vw;
    color: #777;
  }
  .post-tag {
    font-size: 2.8vw;
    border-radius: 2vw;
    padding: 0.8vw 1.6vw;
  }
}
</style>