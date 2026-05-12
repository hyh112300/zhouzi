---
title: All Posts
---

<script setup>
import { data as posts } from '../.vitepress/posts.data.ts'
</script>

# All Posts

<ul class="post-list">
  <li v-for="post of posts" :key="post.url" class="post-item">
    <article>
      <time :datetime="post.date" class="post-date">{{ post.date }}</time>
      <a :href="post.url" class="post-title">
        {{ post.title }}
      </a>
      <p v-if="post.description" class="post-desc">{{ post.description }}</p>
      <div class="post-tags">
        <span v-for="tag in post.tags" :key="tag" class="tag">{{ tag }}</span>
      </div>
    </article>
  </li>
</ul>

<style scoped>
.post-list {
  list-style: none;
  padding: 0;
}

.post-item {
  padding: 1.5rem 0;
  border-bottom: 1px solid var(--vp-c-divider);
}

.post-date {
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
}

.post-title {
  display: block;
  font-size: 1.25rem;
  font-weight: 600;
  margin-top: 0.25rem;
  color: var(--vp-c-text-1);
  text-decoration: none;
  transition: color 0.2s;
}

.post-title:hover {
  color: var(--vp-c-brand-1);
}

.post-desc {
  margin-top: 0.5rem;
  color: var(--vp-c-text-2);
  font-size: 0.9375rem;
  line-height: 1.6;
}

.post-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.75rem;
}

.tag {
  display: inline-flex;
  align-items: center;
  padding: 0.125rem 0.625rem;
  font-size: 0.8125rem;
  border-radius: 999px;
  background: rgba(212, 168, 83, 0.1);
  color: var(--vp-c-brand-1);
  border: 1px solid rgba(212, 168, 83, 0.2);
}
</style>
