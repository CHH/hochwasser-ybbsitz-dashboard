<script setup>
import { useData } from 'vitepress'
import HomeLayout from './HomeLayout.vue';

// https://vitepress.dev/reference/runtime-api#usedata
const { site, frontmatter } = useData()
</script>

<template>
  <div class="p-3">
    <header>
      Hochwasser Pegel Ybbsitz
    </header>
    <div v-if="frontmatter.home">
      <HomeLayout/>
    </div>
    <div v-else>
      <Content />
    </div>
  </div>
</template>
