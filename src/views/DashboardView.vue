<script setup lang="ts">
import AppDataTable from '@/components/AppDataTable.vue'
import AppDataTableDropdownAction from '@/components/AppDataTableDropdownAction.vue'
import { Button } from '@/components/ui/button'
import { useCategories } from '@/composables/useCategories'
import type { Category } from '@/types'
import type { ColumnDef } from '@tanstack/vue-table'
import { ArrowUpDown } from 'lucide-vue-next'
import { h } from 'vue'

const { isLoading, isError, categories } = useCategories()

const columns: ColumnDef<Category>[] = [
  {
    accessorKey: 'createdAt',
    header: ({ column }) => {
      return h(Button, {
        variant: 'ghost',
        onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
      }, () => ['Created At', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })])
    },
    cell: ({ row }) => h('div', { class: 'lowercase' }, row.getValue('email')),
  },
  {
    accessorKey: 'name',
    header: 'Category',
    cell: ({ row }) => h('div', { class: 'capitalize' }, row.getValue('status')),
  },
  // {
  //   accessorKey: 'amount',
  //   header: () => h('div', { class: 'text-right' }, 'Amount'),
  //   cell: ({ row }) => {
  //     const amount = Number.parseFloat(row.getValue('amount'))

  //     // Format the amount as a dollar amount
  //     const formatted = new Intl.NumberFormat('en-US', {
  //       style: 'currency',
  //       currency: 'USD',
  //     }).format(amount)

  //     return h('div', { class: 'text-right font-medium' }, formatted)
  //   },
  // },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const data = row.original

      return h(AppDataTableDropdownAction, {
        data: { id: data.id.toString() },
        onExpand: row.toggleExpanded,
      })
    },
  },
]
</script>

<template>
  <div class="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
    <div class="border-sidebar-border/70 dark:border-sidebar-border relative rounded-xl border p-5">
      <AppDataTable :columns="columns" :data="[]" />
    </div>
  </div>
</template>
