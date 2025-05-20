<script setup lang="ts">
import { useAuth } from '@/composables/useAuth'
import { useInitials } from '@/composables/useInitials'
import { RouterLink } from 'vue-router'
import { Button } from './ui/button'
import { Search } from 'lucide-vue-next'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import AppLogo from './AppLogo.vue'
import UserMenuContent from './UserMenuContent.vue'

const { auth } = useAuth()
const { getInitials } = useInitials()
</script>

<template>
  <div>
    <div class="border-sidebar-border/80 border-b">
      <div class="mx-auto flex h-16 items-center px-4 md:max-w-7xl">
        <RouterLink to="/dashboard" class="flex items-center gap-x-2">
          <AppLogo />
        </RouterLink>
        <div class="ml-auto flex items-center space-x-2">
          <div class="relative flex items-center space-x-1">
            <Button variant="ghost" size="icon" class="group h-9 w-9 cursor-pointer">
              <Search class="size-5 opacity-80 group-hover:opacity-100" />
            </Button>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger :as-child="true">
              <Button
                variant="ghost"
                size="icon"
                class="focus-within:ring-primary relative size-10 w-auto rounded-full p-1 focus-within:ring-2"
              >
                <Avatar class="size-8 overflow-hidden rounded-full">
                  <AvatarImage
                    v-if="auth.user?.avatar"
                    :src="auth.user.avatar"
                    :alt="auth.user.fullName"
                  />
                  <AvatarFallback
                    class="rounded-lg bg-neutral-200 font-semibold text-black dark:bg-neutral-700 dark:text-white"
                  >
                    {{ getInitials(auth.user?.fullName) }}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" class="w-56">
              <UserMenuContent :user="auth.user" />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>

    <!-- <div v-if="props.breadcrumbs.length > 1" class="border-sidebar-border/70 flex w-full border-b">
            <div class="mx-auto flex h-12 w-full items-center justify-start px-4 text-neutral-500 md:max-w-7xl">
                <Breadcrumbs :breadcrumbs="breadcrumbs" />
            </div>
        </div> -->
  </div>
</template>
