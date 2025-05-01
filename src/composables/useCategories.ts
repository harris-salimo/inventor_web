import axios from "@/lib/axios"
import { useQuery } from "@tanstack/vue-query"

export const useCategories = () => {
  const { isPending, isFetching, isError, data, error } = useQuery({
    queryKey: ['categories'],
    queryFn: fetcher,
  })

  return {
    isLoading: isPending || isFetching,
    isError,
    categories: data,
    error
  }
}

async function fetcher() {
  const response = await axios.get('/categories')
  return response.data
}
