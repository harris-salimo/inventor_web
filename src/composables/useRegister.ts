import axios from "@/lib/axios";
import { useMutation } from "@tanstack/vue-query";

export const useRegister = () => {
  const { isPending, isSuccess, isError, data, error, mutate } = useMutation({
    mutationFn: mutater,
  })

  return {
    isLoading: isPending,
    isSuccess,
    isError,
    data,
    error,
    register: mutate,
  }
}

async function mutater(payload: { email: string; password: string }) {
  const response = await axios.post('/register', payload)
  return response.data
}
