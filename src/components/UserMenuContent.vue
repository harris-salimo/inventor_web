<script setup lang="ts">
import UserInfo from '@/components/UserInfo.vue'
import {
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { useAuth } from '@/composables/useAuth'
import type { User } from '@/types'
import { LogOut, Settings } from 'lucide-vue-next'
import { useRouter } from 'vue-router'

interface Props {
  user: User
}

defineProps<Props>()

const router = useRouter()

const { setAuth, logout } = useAuth()

const handleLogout = async () => {
  logout({}, {
    onSuccess: () => {
      setAuth({})
      router.replace({ name: 'login-view' })
    }
  })
}
</script>

<template>
  <DropdownMenuLabel class="p-0 font-normal">
    <div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
      <UserInfo :user="user" :show-email="true" />
    </div>
  </DropdownMenuLabel>
  <DropdownMenuSeparator />
  <DropdownMenuGroup>
    <DropdownMenuItem :as-child="true">
      <RouterLink class="block w-full" to="/settings/profile" as="button">
        <Settings class="mr-2 h-4 w-4" />
        Settings
      </RouterLink>
    </DropdownMenuItem>
  </DropdownMenuGroup>
  <DropdownMenuSeparator />
  <DropdownMenuItem :as-child="true">
    <button class="block w-full" @click="handleLogout">
      <LogOut class="mr-2 h-4 w-4" />
      Log out
    </button>
  </DropdownMenuItem>
</template>
