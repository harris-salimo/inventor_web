import axios from '@/lib/axios'
import { useMutation } from '@tanstack/vue-query'

export const useLogin = () => {
  const { isPending, isSuccess, isError, data, error, mutate } = useMutation({
    mutationFn: mutater,
  })

  return {
    isLoading: isPending,
    isSuccess,
    isError,
    data,
    error,
    login: mutate
  }
}

async function mutater(payload: { email: string; password: string }) {
  const response = await axios.post('/login', payload)
  console.log(response.data)
  return response.data
}
