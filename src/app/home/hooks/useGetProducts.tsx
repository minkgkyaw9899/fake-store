import { API_LIST } from '@/constants/apiList';
import { QUERY_KEYS } from '@/constants/queryKey';
import { httpClient } from '@/utils/httpClient';
import { useIsFocused } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';

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

export const useGetProducts = ({
  subscribeOnFocusOnly,
}: {
  subscribeOnFocusOnly?: boolean;
}) => {
  const isFocused = useIsFocused();
  const { data, isPending, error } = useQuery({
    queryKey: [QUERY_KEYS.PRODUCTS],
    queryFn: async () => {
      const response = await httpClient.get<Product[]>(API_LIST.PRODUCTS);

      return response;
    },
    subscribed: subscribeOnFocusOnly ? isFocused : true,
  });

  return { data, isPending, error };
};
