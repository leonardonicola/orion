<script setup lang="ts">
  import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <nav
    class="sticky left-0 top-0 flex h-16 w-full items-center justify-end gap-16 bg-zinc-100 p-8"
  >
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/login">Login</RouterLink>
  </nav>

  <main class="min-h-dvh w-full px-28 pt-24">
    <RouterView />
  </main>
</template>
