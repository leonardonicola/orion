<script setup lang="ts">
  import { reactive } from 'vue'
  import { useAuthStore } from '../model'
  import { useRouter } from 'vue-router'

  const router = useRouter()
  const authStore = useAuthStore()

  const form = reactive({
    email: '',
    password: '',
  })

  const handleSubmit = async () => {
    const success = await authStore.login(form)
    if (success) {
      router.push('/dashboard')
    }
  }
</script>
<template>
  <form @submit.prevent="handleSubmit">
    <input v-model="form.email" type="email" required />
    <input v-model="form.password" type="password" required />

    <button type="submit" :disabled="authStore.isLoading">
      {{ authStore.isLoading ? 'Logging in...' : 'Login' }}
    </button>
  </form>
</template>
