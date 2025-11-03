import { QUERY_KEYS } from '@/constants/queryKey';
import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { getCategories } from '../services/getCategories';
import { useIsFocused } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { getNextPageParam } from '@/utils/getNextPageParam';
import { getProductByCategory } from '../services/getProductByCategory';

export const useProductList = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const isFocused = useIsFocused();

  const { data: categoriesData, isPending: isPendingCategories } = useQuery({
    queryKey: [QUERY_KEYS.CATEGORIES],
    queryFn: getCategories,
    subscribed: isFocused,
  });

  const queryClient = useQueryClient();

  // prefetch 1st category for better ux
  useEffect(() => {
    const firstCategory = categoriesData?.data?.[0];
    if (firstCategory) {
      queryClient.prefetchInfiniteQuery({
        queryKey: [QUERY_KEYS.CATEGORIES, firstCategory],
        queryFn: async () =>
          await getProductByCategory({
            pageParam: 1,
            selectedCategory: firstCategory,
          }),
        initialPageParam: 1,
        getNextPageParam,
      });
    }
  }, [categoriesData?.data, queryClient]);

  const {
    data,
    isLoading: isPendingProductByCategory,
    isFetchingNextPage: isFetchingNextPageProductByCategory,
    fetchNextPage: fetchNextPageProductByCategory,
    hasNextPage: hasNextPageProductByCategory,
    isRefetching: isRefetchingProductByCategory,
    refetch: refetchProductByCategory,
  } = useInfiniteQuery({
    queryKey: [
      QUERY_KEYS.CATEGORIES,
      selectedCategory !== 'All' && selectedCategory,
    ],
    queryFn: ({ pageParam = 1 }) =>
      getProductByCategory({ pageParam, selectedCategory }),
    enabled: !!selectedCategory && selectedCategory !== 'All',
    subscribed: isFocused || selectedCategory !== 'All',
    initialPageParam: 1,
    getNextPageParam,
  });

  return {
    categories: categoriesData?.data
      ? ['All', ...categoriesData?.data]
      : undefined,
    isPendingCategories,
    selectedCategory,
    setSelectedCategory,
    productByCategory: data?.pages || [],
    isPendingProductByCategory,
    isFetchingNextPageProductByCategory,
    hasNextPageProductByCategory,
    isRefetchingProductByCategory,
    refetchProductByCategory,
    fetchNextPageProductByCategory,
  };
};
