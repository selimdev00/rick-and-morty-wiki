<script setup lang="ts">
import type { NuxtError } from "#app";

defineProps({
  error: Object as () => NuxtError,
});

const handleError = () => clearError({ redirect: "/" });
</script>

<template>
  <NuxtLayout>
    <div
      class="bg-[url('/404.jpg')] bg-no-repeat bg-cover bg-right h-screen flex items-center justify-center text-center"
    >
      <div class="p-4 rounded-xl bg-black/80 space-y-2">
        <h2 class="text-3xl">
          {{ error.statusCode }}
        </h2>
        <p>It looks like something went really wrong :(</p>
        <Button @click="handleError"> Clear errors </Button>
      </div>
    </div>
  </NuxtLayout>
</template>
