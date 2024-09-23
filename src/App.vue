<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav>Front-end Engineer Interview Task</nav>
  </header>

  <RouterView />
</template>

<style lang="scss" scoped>
header {
  background-color: var(--color-background-secondary);
  width: 100vw;
  min-height: 50px;

  nav {
    display: flex;
    color: #fff;
    justify-content: center;
    align-items: center;
    padding: 10px;
  }
}
</style>
