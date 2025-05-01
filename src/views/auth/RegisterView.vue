<script setup lang="ts">
import AppLogoIcon from '@/components/AppLogoIcon.vue'
import AppPasswordInput from '@/components/AppPasswordInput.vue'
import TextLink from '@/components/TextLink.vue'
import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useRegister } from '@/composables/useRegister'
import { toTypedSchema } from '@vee-validate/zod'
import { LoaderCircle } from 'lucide-vue-next'
import { useForm } from 'vee-validate'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { z } from 'zod'

const schema = toTypedSchema(
  z
    .object({
      fullName: z.string().min(2),
      email: z.string().email(),
      password: z.string().min(8),
      password_confirmation: z.string().min(8),
    })
    .refine((data) => data.password === data.password_confirmation),
)

const router = useRouter()

const { handleSubmit } = useForm({
  validationSchema: schema,
})

const { isLoading, isSuccess, data, register } = useRegister()

const submit = handleSubmit(async (values) => {
  register(values, {
    onSuccess: () => {
      router.replace({ name: 'login-view' })
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
      <span class="sr-only">Create an account</span>
    </RouterLink>
    <div class="space-y-2 text-center">
      <h1 class="text-xl font-medium">Create an account</h1>
      <p class="text-muted-foreground text-center text-sm">
        Enter your details below to create your account
      </p>
    </div>
    <form @submit.prevent="submit" class="w-full flex flex-col gap-6">
      <div class="grid gap-6">
        <FormField v-slot="{ componentField }" name="fullName">
          <FormItem class="grid gap-2">
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input
                type="text"
                required
                autofocus
                :tabindex="1"
                autocomplete="name"
                v-bind="componentField"
                placeholder="Full name" /></FormControl
            ><FormMessage /> </FormItem
        ></FormField>

        <FormField v-slot="{ componentField }" name="email">
          <FormItem class="grid gap-2">
            <FormLabel>Email address</FormLabel>
            <FormControl>
              <Input
                type="email"
                required
                :tabindex="2"
                autocomplete="email"
                v-bind="componentField"
                placeholder="email@example.com"
            /></FormControl>
            <FormMessage /> </FormItem
        ></FormField>

        <FormField v-slot="{ componentField }" name="password">
          <FormItem class="grid gap-2">
            <FormLabel>Password</FormLabel>
            <FormControl>
              <AppPasswordInput
                required
                :tabindex="3"
                autocomplete="new-password"
                v-bind="componentField"
                placeholder="Password"
            /></FormControl>
            <FormMessage /> </FormItem
        ></FormField>

        <FormField v-slot="{ componentField }" name="password_confirmation">
          <FormItem class="grid gap-2">
            <FormLabel>Confirm password</FormLabel>
            <FormControl>
              <AppPasswordInput
                required
                :tabindex="4"
                autocomplete="new-password"
                v-bind="componentField"
                placeholder="Confirm password"
            /></FormControl>
            <FormMessage /> </FormItem
        ></FormField>

        <Button type="submit" class="mt-2 w-full" tabindex="5" :disabled="isLoading">
          <LoaderCircle v-if="isLoading" class="h-4 w-4 animate-spin" />
          Create account
        </Button>
      </div>

      <div class="text-muted-foreground text-center text-sm">
        Already have an account?
        <TextLink href="/auth/login" class="underline underline-offset-4" :tabindex="6"
          >Log in</TextLink
        >
      </div>
    </form>
  </div>
</template>
