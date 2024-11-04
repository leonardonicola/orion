<script setup lang="ts">
  import { onBeforeUnmount, reactive } from 'vue'
  import { useAuthStore } from '../model'
  import { useRouter } from 'vue-router'

  const router = useRouter()
  const authStore = useAuthStore()
  const controller = new AbortController()

  const form = reactive({
    email: '',
    password: '',
  })

  const handleSubmit = async () => {
    const success = await authStore.login(form, controller.signal)
    if (success) {
      router.push('/dashboard')
    }
  }
  onBeforeUnmount(() => controller.abort())
</script>
<template>
  <form @submit.prevent="handleSubmit" class="flex w-1/3 flex-col gap-4">
    <input v-model="form.email" type="email" required class="input" />
    <input v-model="form.password" type="password" required class="input" />

    <button
      type="submit"
      :disabled="authStore.isLoading"
      class="size-fit rounded-xl border border-gray-100 px-4 py-2 transition-colors hover:border-gray-500"
    >
      {{ authStore.isLoading ? 'Logging in...' : 'Login' }}
    </button>
  </form>
</template>
<style lang="postcss" scoped>
  .input {
    @apply h-8 w-full rounded-lg border border-gray-200 p-2 outline-0 transition-colors focus:border-gray-500;
  }
</style>
