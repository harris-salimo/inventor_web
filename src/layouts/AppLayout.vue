<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppContent from '@/components/AppContent.vue';
import AppHeader from '@/components/AppHeader.vue';
import AppShell from '@/components/AppShell.vue';
</script>

<template>
  <AppShell class="flex-col">
        <AppHeader />
        <AppContent>
            <RouterView />
        </AppContent>
    </AppShell>
</template>
