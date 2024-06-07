<script setup lang="ts">
const nav = [
  {
    label: 'Characters',
    to: '/',
  },
  {
    label: 'Locations',
    to: '/locations',
  },
  {
    label: 'Episodes',
    to: '/episodes',
  },
]

const route = useRoute()
</script>

<template>
  <div class="sticky top-4 space-y-2 p-4">
    <p class="text-sm text-gray-400">
      See also
    </p>

    <nav>
      <ul>
        <li
          v-for="item in nav"
          :key="item.label"
        >
          <nuxt-link
            class="hover:text-primary transition-colors"
            :to="item.to"
            :class="{ 'text-primary': route.path === item.to }"
          >
            {{ item.label }}
          </nuxt-link>
        </li>
      </ul>
    </nav>
  </div>
</template>
