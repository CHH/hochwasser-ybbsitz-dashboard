<script setup>
import { useData } from 'vitepress'
import HomeLayout from './HomeLayout.vue';

// https://vitepress.dev/reference/runtime-api#usedata
const { site, frontmatter } = useData()
</script>

<template>
  <div class="p-3 xl:p-6">
    <header>
      Hochwasser Pegel Ybbsitz
    </header>
    <div v-if="frontmatter.home">
      <HomeLayout/>
    </div>
    <div v-else>
      <Content />
    </div>
    <footer class="mt-3">
      <div>
        <b>Impressum: </b>
      </div>
      <div>
        Ing. Christoph Hochstrasser - hochstrasser web apps
      </div>
      <div>
        Haselgraben 23
      </div>
      <div>
        3341 Ybbsitz
      </div>
      <div class="space-x-3 flex">
        <a href="https://hochstrasser.io">Website &rarr;</a>
        <a href="https://hochstrasser.io/privacy">Datenschutz &rarr;</a>
      </div>
    </footer>
  </div>
</template>
