import type { Auth } from '@/types'
import { computed, ref } from 'vue'

export const useAuth = () => {
  const authValue = localStorage.getItem('auth')
  const _value = ref<Partial<Auth>>(authValue ? JSON.parse(authValue) : {})
  const storedValue = computed(() => _value.value)

  const setValue = (value: Partial<Auth>) => {
    _value.value = value
    localStorage.setItem('auth', JSON.stringify(value))
  }

  return {
    auth: storedValue,
    setAuth: setValue,
  }
}
