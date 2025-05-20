<script setup lang="ts">
import { useForm } from 'vee-validate'
import { ref } from 'vue'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import TextLink from '@/components/TextLink.vue'
import AppPasswordInput from '@/components/AppPasswordInput.vue'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { LoaderCircle } from 'lucide-vue-next'
import { Input } from '@/components/ui/input'
import AppLogoIcon from '@/components/AppLogoIcon.vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const schema = toTypedSchema(
  z.object({
    email: z.string().email(),
    password: z.string().min(8),
    remember: z.boolean().optional(),
  }),
)

const { setAuth, isLoading, isSuccess, data, login, isError, error } = useAuth()
const router = useRouter()
const canResetPassword = ref<boolean | null>(false)
const statusError = ref<string | undefined>(undefined)

const { handleSubmit, setErrors } = useForm({
  validationSchema: schema,
})

const submit = handleSubmit(async (values) => {
  login(values, {
    onSuccess: (data) => {
      setAuth({ user: data.user, token: data.token })
      router.replace({ name: 'home-view' })
    },
  })
})
</script>

<template>
  <div class="flex flex-col items-center gap-4">
    <RouterLink to="/" class="flex flex-col items-center gap-2 font-medium">
      <div class="mb-1 flex h-9 w-9 items-center justify-center rounded-md">
        <AppLogoIcon class="size-9 fill-current text-[var(--foreground)] dark:text-white" />
      </div>
      <span class="sr-only">Log in to your account</span>
    </RouterLink>
    <div class="space-y-2 text-center">
      <h1 class="text-xl font-medium">Log in to your account</h1>
      <p class="text-muted-foreground text-center text-sm">
        Enter your email and password below to log in
      </p>
    </div>
    <div v-if="isSuccess" class="mb-4 text-center text-sm font-medium text-green-600">
      {{ data.status }}
    </div>

    <form @submit.prevent="submit" class="w-full flex flex-col gap-6">
      <div class="grid gap-6">
        <FormField v-slot="{ componentField }" name="email">
          <FormItem class="grid gap-2">
            <FormLabel>Email address</FormLabel>
            <FormControl
              ><Input
                type="email"
                required
                autofocus
                :tabindex="1"
                autocomplete="email"
                v-bind="componentField"
                placeholder="email@example.com"
            /></FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="password">
          <FormItem class="grid gap-2">
            <div class="flex items-center justify-between">
              <FormLabel>Password</FormLabel>
              <TextLink
                v-if="canResetPassword"
                href="/auth/forgot-password"
                class="text-sm"
                :tabindex="5"
              >
                Forgot password?
              </TextLink>
            </div>
            <FormControl>
              <AppPasswordInput
                required
                :tabindex="2"
                autocomplete="current-password"
                v-bind="componentField"
                placeholder="Password"
            /></FormControl>
            <FormMessage /></FormItem
        ></FormField>

        <FormField v-slot="{ componentField }" name="remember">
          <FormItem class="flex items-center justify-between" :tabindex="3">
            <FormLabel class="flex items-center space-x-3">
              <FormControl> <Checkbox v-bind="componentField" :tabindex="4" /></FormControl>
              <span>Remember me</span>
            </FormLabel>
          </FormItem></FormField
        >

        <Button type="submit" class="mt-4 w-full" :tabindex="4" :disabled="isLoading">
          <LoaderCircle v-if="isLoading" class="h-4 w-4 animate-spin" />
          Log in
        </Button>
      </div>

      <div class="text-muted-foreground text-center text-sm">
        Don't have an account?
        <TextLink href="/auth/register" :tabindex="5">Sign up</TextLink>
      </div>
    </form>
  </div>
</template>
