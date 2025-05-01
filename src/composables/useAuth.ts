import type { Auth } from "@/types"
import { useSessionStorage } from "./useSessionStorage"

export const useAuth = () => {
  const { storedValue } = useSessionStorage<Auth>('auth')

  return {
    auth: storedValue
  }
}
