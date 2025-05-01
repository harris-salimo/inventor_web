import { computed, ref } from 'vue'

export const useSessionStorage = <T extends Record<string, any>>(keyName: string, defaultValue: T = {} as T) => {
  const state = ref<string | null>(window.sessionStorage.getItem(keyName))

  const storedValue = computed<T>(() => {
    if (state.value) {
      return JSON.parse(state.value) as T
    }

    window.sessionStorage.setItem(keyName, JSON.stringify(defaultValue))

    return defaultValue
  })

  return { storedValue }
}
