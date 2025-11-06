<template>
  <div class="post-page">
   <button class="cute-back-btn" @click="goBack">🔙</button>

    <div v-if="post" class="post-header">
      <h1>{{ post.title }}</h1>
      <p class="meta">
        🕒 {{ post.date }}
        🏷️ {{ post.category }}
      </p>
    </div>


    <div v-if="htmlContent" class="post-content" v-html="htmlContent"></div>
    <div v-else class="loading">正在加载文章内容...</div>
    <!-- 💬 评论区 -->
<div class="comments-section">
  <h3>💬 评论区</h3>
  <div id="giscus-container"></div>
</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { marked } from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'

const htmlContent = ref('')
const post = ref(null)
const route = useRoute()
const router = useRouter()

// eslint-disable-next-line no-unused-vars
const goBack = () => router.back()

marked.setOptions({
  highlight(code, lang) {
    if (hljs.getLanguage(lang)) {
      return hljs.highlight(code, { language: lang }).value
    }
    return hljs.highlightAuto(code).value
  }
})

onMounted(async () => {
  const file = route.query.file
  if (!file) {
    htmlContent.value = '❌ 未找到文件路径'
    return
  }

  // 渲染 Markdown
  const res = await fetch(file)
  const text = await res.text()
  htmlContent.value = marked.parse(text)

  // 从本地 posts.json 中找到对应文章信息（标题、时间等）
  const postsRes = await fetch('/data/posts.json')
  const posts = await postsRes.json()
  post.value = posts.find(p => p.file === file)
  // ✅ 动态加载 Giscus 脚本（评论区）
  const giscus = document.createElement('script')
  giscus.src = 'https://giscus.app/client.js'
  giscus.setAttribute('data-repo', '你的GitHub用户名/你的仓库名')
  giscus.setAttribute('data-repo-id', '你的repo-id')
  giscus.setAttribute('data-category', 'General')
  giscus.setAttribute('data-category-id', '你的category-id')
  giscus.setAttribute('data-mapping', 'pathname')
  giscus.setAttribute('data-reactions-enabled', '1')
  giscus.setAttribute('data-emit-metadata', '0')
  giscus.setAttribute('data-theme', 'light')
  giscus.setAttribute('crossorigin', 'anonymous')
  giscus.async = true
  document.getElementById('giscus-container').appendChild(giscus)
})
</script>


<style>
.post-page {
  min-height: 100vh;
  padding: 4vw 6vw;
  box-sizing: border-box;
  background: linear-gradient(160deg, #f8fbff, #e6f0ff);
  color: #2d3748;
  font-family: "Poppins", "PingFang SC", "Segoe UI", sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* 返回按钮 */
/* ✅ 返回按钮始终浮在最上层且不会被遮挡 */
.cute-back-btn {
  position: fixed; /* 改为 fixed，避免被内部元素遮挡 */
  top: 2.5vw;
  left: 3vw;
  z-index: 9999; /* 强制层级最高 */
  background: linear-gradient(90deg, #ecd9dc, #ebdfe2);
  color: #ffffff;
  border: none;
  border-radius: 25px;
  padding: 0.5em 1.2em;
  font-size: 1vw;
  cursor: pointer;
  box-shadow: 0 0.4vw 0.8vw rgba(255, 192, 203, 0.4);
  transition: all 0.25s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}
.cute-back-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 0.6vw 1.2vw rgba(255, 192, 203, 0.5);
}

/* 文章头部 */
.post-header {
  width: 90%;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 1vw;
  padding: 2vw 2.5vw;
  box-shadow: 0 0.6vw 1.2vw rgba(0, 0, 0, 0.05);
  margin-bottom: 2vw;
  text-align: center;
}

.post-header h1 {
  font-size: 2vw;
  font-weight: 600;
  margin: 0.5vw 0;
  color: #2b6cb0;
}

.meta {
  color: #718096;
  font-size: 1vw;
  margin-top: 0.5vw;
}

/* 正文内容 */
.post-content {
  width: 92%;
  background: rgba(255, 255, 255, 0.96);
  backdrop-filter: blur(8px);
  border-radius: 1vw;
  padding: 2.5vw 3vw;
  box-shadow: 0 0.6vw 1.5vw rgba(0, 0, 0, 0.06);
  font-size: 1.1vw;
  line-height: 1.9;
  color: #333;
}

.post-content h2 {
  font-size: 1.5vw;
  margin: 1.5vw 0 1vw;
  border-left: 0.4vw solid #63b3ed;
  padding-left: 0.6vw;
  color: #2b6cb0;
}

.post-content h3 {
  font-size: 1.3vw;
  margin: 1.2vw 0 0.8vw;
  color: #2b6cb0;
}

.post-content p {
  margin-bottom: 1vw;
}

.post-content code {
  background: #f6f8fa;
  border-radius: 0.3vw;
  padding: 0.2vw 0.5vw;
  font-family: "JetBrains Mono", monospace;
  font-size: 0.9vw;
}

.post-content pre {
  background: #f6f8fa;
  border-radius: 0.8vw;
  padding: 1.2vw;
  overflow-x: auto;
  box-shadow: 0 0.3vw 1vw rgba(0, 0, 0, 0.05);
}

.loading {
  text-align: center;
  color: #888;
  font-size: 1.2vw;
  padding: 3vw;
}

/* ✅ 响应式：小屏优化（重新调小比例） */
@media (max-width: 768px) {
  .post-page {
    padding: 5vw 3vw;
  }
  .cute-back-btn {
    top: 4vw;
    left: 2vw;
    font-size: 4vw;
    padding: 2vw 3vw;
    border-radius: 6vw;
    box-shadow: 0 1vw 2vw rgba(0, 0, 0, 0.1);
  }

  .post-header {
    width: 94%;
    margin-top: 10vw;
    padding: 3.2vw 4vw;
    border-radius: 3vw;
    margin-bottom: 4vw;
  }

  .post-header h1 {
    font-size: 4.2vw; /* ✅ 原5vw太大，现在更协调 */
  }

  .meta {
    font-size: 2.6vw;
  }

  .post-content {
    width: 94%;
    padding: 3.8vw 4vw;
    font-size: 2.9vw; /* ✅ 减小字体但保持清晰 */
    border-radius: 3vw;
    line-height: 1.7;
  }

  .post-content h2 {
    font-size: 3.6vw;
    border-left: 0.8vw solid #63b3ed;
    padding-left: 1.8vw;
  }

  .post-content h3 {
    font-size: 3.2vw;
  }

  .post-content pre {
    font-size: 2.6vw;
    padding: 3vw;
  }

  .loading {
    font-size: 3vw;
  }
}
/* 评论区 */
.comments-section {
  width: 92%;
  background: #fff;
  border-radius: 1vw;
  padding: 2vw 3vw;
  margin-top: 3vw;
  box-shadow: 0 0.6vw 1.2vw rgba(0,0,0,0.05);
}

.comments-section h3 {
  font-size: 1.4vw;
  color: #2b6cb0;
  margin-bottom: 1vw;
}

@media (max-width: 768px) {
  .comments-section {
    width: 96%;
    padding: 5vw 4vw;
    border-radius: 3vw;
  }

  .comments-section h3 {
    font-size: 4vw;
    text-align: center;
  }
}


</style>
