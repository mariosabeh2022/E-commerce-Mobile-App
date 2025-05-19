import {useQuery} from '@tanstack/react-query';
import {fetchProducts} from 'lib/axiosInstance';

export const useProducts = (token: string, filter: string) => {
  return useQuery({
    queryKey: ['products', token, filter],
    queryFn: () =>
      fetchProducts({
        token,
        page: 1,
        limit: 10,
        sortBy: 'title',
        order: 'asc',
        ...(filter ? {minPrice: 0, maxPrice: 1000000} : {}),
      }),
    enabled: !!token,
  });
};
