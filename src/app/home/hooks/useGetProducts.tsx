import { API_LIST } from '@/constants/apiList';
import { QUERY_KEYS } from '@/constants/queryKey';
import { getNextPageParam, PaginationResponse } from '@/utils/getNextPageParam';
import { httpClient } from '@/utils/httpClient';
import { useIsFocused } from '@react-navigation/native';
import { useInfiniteQuery } from '@tanstack/react-query';

type Response = PaginationResponse & {
  products: Product[];
};

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

export const useGetProducts = () => {
  const isFocused = useIsFocused();
  const {
    data,
    isPending,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isRefetching,
    refetch,
  } = useInfiniteQuery({
    queryKey: [QUERY_KEYS.PRODUCTS],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await httpClient.get<Response>(
        `${API_LIST.PRODUCTS}?page=${pageParam}`,
      );

      return response;
    },
    subscribed: isFocused,
    initialPageParam: 1,
    getNextPageParam,
  });

  return {
    productsList: data?.pages?.flatMap(product => product.data.products) || [],
    isPendingProductsList: isPending,
    errorProductsList: error,
    hasNextPageProductsList: hasNextPage,
    isFetchingNextPageProductsList: isFetchingNextPage,
    fetchNextPageProductsList: fetchNextPage,
    refetchProductsList: refetch,
    isRefetchingProductsList: isRefetching,
  };
};
