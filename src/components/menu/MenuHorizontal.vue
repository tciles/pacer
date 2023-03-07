<template>
  <nav class="d-flex justify-content-center">
    <div class="container flex-grow-1">
      <a href="https://github.com/tciles/pacer" target="_blank"><GithubIcon class="icon"/><span class="text-small">v1.0.0</span></a>
    </div>
  </nav>
</template>

<style scoped>
nav {
  display: flex;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
  height: 50px;
  border-bottom: 1px solid var(--dark-3);
}
.icon {
  margin-right: 10px;
}
a {
  text-decoration: none;
  color: white;
}
.icon {
  width: 24px;
  height: 24px;
}
</style>

<script setup lang="ts">
import GithubIcon from "@/components/icons/GithubIcon.vue";
</script>