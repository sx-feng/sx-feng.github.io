<template>
  <div class="profile-page">
    <!-- 顶部返回按钮 -->
    <div class="top-bar">
      <button class="cute-back-btna" @click="goBack">🔙</button>
      
    </div>

    <!-- 头像和基本信息 -->
    <div class="profile-header">
      <img class="avatar" src="@/assets/ME.jpg" alt="avatar" />
      <h1 class="name">长风</h1>
      <p class="bio">你好！我是青青草原霸主🌿  
        欢迎光临૮ ˙Ⱉ˙ ა
      </p>
    </div>

    <!-- 简介卡片 -->
    <div class="carda">
      <h3>✨ 关于我</h3>
      <p>
        一个热爱前端与创意设计的开发者，喜欢eat🍰🍅🍌🍞不喜欢写无趣的项目。
      </p>
    </div>

    <div class="carda">
      <h3>📘 我的技能</h3>
      <ul>
        <li>Vue3 + Element Plus 前端开发</li>
        <li>Flutter 桌面与移动端应用</li>
        <li>PHP / Node.js 后端接口开发</li>
        <li>UI 设计与交互优化</li>
      </ul>
    </div>

    <div class="carda">
      <h3>📫 联系我</h3>
      <p>Email: <a href="mailto:example@mail.com">202859483@qq.com</a></p>
      <p>GitHub: <a href="https://github.com/" target="_blank">github.com/sx-feng</a></p>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
// eslint-disable-next-line no-unused-vars
const goBack = () => {
  router.back() // 返回上一页
}
</script>

<style>
.profile-page {
  min-height: 100vh;
  background: linear-gradient(160deg, #f8fbff, #e6f0ff);
  color: #333;
  font-family: "Poppins", "PingFang SC", "Segoe UI", sans-serif;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* 顶部栏 */
.top-bar {
  position: absolute;      /* 固定在页面左上角区域 */
  top: 2%;                 /* 距顶部2% */
  left: 3%;                /* 距左侧3%，随屏幕大小自适应 */
  display: flex;
  align-items: center;
  gap: 1.5%;
  width: auto;
}

.cute-back-btna {
   background: linear-gradient(90deg, #ecd9dc, #ebdfe2);
  color: white;
  border: none;
  border-radius: 25px;
  padding: 0.5em 1.2em;
  font-size: 1rem;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(255, 192, 203, 0.3);
  transition: all 0.2s ease;
}
.cute-back-btna:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(255, 192, 203, 0.4);
}

.title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #4a5568;
}


/* 头像区域 */
.profile-header {
  text-align: center;
  margin-bottom: 24px;
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 3px solid #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  object-fit: cover;
  margin-bottom: 10px;
}

.name {
  font-size: 22px;
  font-weight: 600;
  color: #2d3748;
  margin: 0;
}

.bio {
  font-size: 14px;
  color: #555;
  opacity: 0.9;
  margin-top: 6px;
  line-height: 1.6;
}

/* 卡片 */
.carda {
  width: 94%;
  background: #fff;
  border-radius: 12px;
  padding: 18px 22px;
  margin-bottom: 16px;
  border: 1px solid #e0e0e0;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
  transition: all 0.2s ease;
}
.carda:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0,0,0,0.08);
}

.carda h3 {
  margin: 0 0 8px;
  font-size: 16px;
  font-weight: 600;
  color: #2b6cb0;
  border-left: 3px solid #63b3ed;
  padding-left: 6px;
}

.carda p,
.carda li {
  font-size: 14px;
  color: #444;
  line-height: 1.7;
}

.carda ul {
  padding-left: 16px;
  margin: 0;
}
.carda li {
  list-style-type: "🌿 ";
}

.carda a {
  color: #3182ce;
  text-decoration: none;
}
.carda a:hover {
  text-decoration: underline;
}

/* ✅ 响应式优化 */
@media (max-width: 768px) {
  .profile-page {
    padding: 14px;
  }

  .avatar {
    width: 80px;
    height: 80px;
  }

  .name {
    font-size: 18px;
  }

  .carda {
    padding: 14px 16px;
    width: 91%;
  }

  .carda h3 {
    font-size: 14.5px;
  }

  .carda p,
  .carda li {
    font-size: 13px;
  }

  .title {
    font-size: 16px;
  }
}

</style>