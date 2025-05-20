<script setup lang="ts">
import AppDataTable from '@/components/AppDataTable.vue'
import { useCategories } from '@/composables/useCategories'

const { isLoading, isError, categories } = useCategories()
console.log(categories)
</script>

<template>
  <div class="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
    <div class="border-sidebar-border/70 dark:border-sidebar-border relative rounded-xl border p-5">
      <AppDataTable :columns="[]" :data="[]" />
    </div>
  </div>
</template>
