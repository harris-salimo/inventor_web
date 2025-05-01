<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
        <div class="w-full max-w-sm">
            <div class="flex flex-col gap-8">
                <RouterView />
            </div>
        </div>
    </div>
</template>
