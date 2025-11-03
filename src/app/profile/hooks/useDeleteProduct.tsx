import { Product } from '@/app/home/hooks/useGetProducts';
import { API_LIST } from '@/constants/apiList';
import { MUTATION_KEYS, QUERY_KEYS } from '@/constants/queryKey';
import { PaginationResponse } from '@/utils/getNextPageParam';
import { httpClient, ResponseModel } from '@/utils/httpClient';
import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { Alert } from 'react-native';
import Toast from 'react-native-toast-message';

export type InfiniteProducts = InfiniteData<
  ResponseModel<PaginationResponse & { products: Product[] }>
>;

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: deleteProduct } = useMutation({
    mutationKey: [MUTATION_KEYS.DELETE_PRODUCT],
    mutationFn: async (productId: number) => {
      return await httpClient.delete<number>(
        `${API_LIST.PRODUCTS}/${productId}`,
      );
    },
    onSuccess: () => {
      Toast.show({ type: 'info', text1: 'Product deleted' });
    },
    onMutate: async deleteProductId => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEYS.PRODUCTS] });

      const previousData = queryClient.getQueryData<InfiniteProducts>([
        QUERY_KEYS.PRODUCTS,
      ]);

      queryClient.setQueryData<InfiniteProducts>(
        [QUERY_KEYS.PRODUCTS],
        oldData => {
          if (!oldData) return previousData;

          return {
            ...oldData,
            pages: oldData.pages.map(page => ({
              ...page,
              data: {
                ...page.data,
                products: page.data.products.filter(
                  product => product.id !== deleteProductId,
                ),
              },
            })),
          };
        },
      );

      return { previousData };
    },
    onError: (_err, _variable, context) => {
      if (context?.previousData) {
        queryClient.setQueryData([QUERY_KEYS.PRODUCTS], context.previousData);
      }
    },
  });

  const handleDelete = (productId: number) => {
    return Alert.alert('Delete Product!', 'Are you sure want to delete?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: async () => {
          await deleteProduct(productId);
        },
        style: 'destructive',
      },
    ]);
  };

  return { handleDelete };
};
