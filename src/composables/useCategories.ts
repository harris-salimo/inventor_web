import axios from '@/lib/axios'
import { useQuery } from '@tanstack/vue-query'
import { useAuth } from './useAuth'

export const useCategories = () => {
  const { auth } = useAuth()

  const { isPending, isFetching, isError, data, error } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => await fetcher(auth.value.token!),
  })

  return {
    isLoading: isPending || isFetching,
    isError,
    categories: data,
    error,
  }
}

async function fetcher(token: string) {
  const authValue = localStorage.getItem('auth')
  const response = await axios.get('/categories', {
    headers: { Authorization: `Bearer ${JSON.parse(authValue).token}` },
  })
  
  return response.data
}
