<script setup lang="ts">
import { useCategories } from '@/composables/useCategories'

const { isLoading, isError, categories } = useCategories()
console.log('categories')
</script>

<template>
  <div class="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
    <div class="grid auto-rows-min gap-4 md:grid-cols-3">
      <div
        class="border-sidebar-border/70 dark:border-sidebar-border relative overflow-hidden rounded-xl border p-5"
      >
        <p class="text-2xl font-medium text-gray-900">1000 Ar</p>

        <p class="text-sm text-gray-500">Total Past Week Expenses</p>
      </div>
    </div>
  </div>
</template>
