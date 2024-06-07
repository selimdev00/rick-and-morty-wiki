<script lang="ts" setup>
import { useDark } from "@vueuse/core";

const isDark = useDark();

isDark.value = true;
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
