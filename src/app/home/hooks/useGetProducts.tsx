import { API_LIST } from '@/constants/apiList';
import { QUERY_KEYS } from '@/constants/queryKey';
import { getNextPageParam, PaginationResponse } from '@/utils/getNextPageParam';
import { httpClient } from '@/utils/httpClient';
import { useIsFocused } from '@react-navigation/native';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

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
  const [productsList, setProductsList] = useState<Product[]>([]);

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

  useEffect(() => {
    if (data?.pages) {
      const seen = new Set();
      const merged: Product[] = [];

      for (const page of data.pages) {
        for (const product of page?.data?.products ?? []) {
          if (!seen.has(product.id)) {
            seen.add(product.id);
            merged.push(product);
          }
        }
      }

      setProductsList(merged);
    }
  }, [data?.pages]);

  return {
    totalProducts: data?.pages?.[data.pages.length - 1]?.data.total || 0,
    productsList,
    isPendingProductsList: isPending,
    errorProductsList: error,
    hasNextPageProductsList: hasNextPage,
    isFetchingNextPageProductsList: isFetchingNextPage,
    fetchNextPageProductsList: fetchNextPage,
    refetchProductsList: refetch,
    isRefetchingProductsList: isRefetching,
  };
};
