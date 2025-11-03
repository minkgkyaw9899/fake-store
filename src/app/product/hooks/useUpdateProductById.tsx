import { Product } from '@/app/home/hooks/useGetProducts';
import { useForm } from 'react-hook-form';
import { ProductFormField, productSchema } from '../schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Image } from 'react-native-image-crop-picker';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MUTATION_KEYS, QUERY_KEYS } from '@/constants/queryKey';
import { updateProductById } from '../services/updateProductById';
import Toast from 'react-native-toast-message';
import { InfiniteProducts } from '@/app/profile/hooks/useDeleteProduct';
import { useNavigation } from '@react-navigation/native';

export const useUpdateProductById = (product: Product) => {
  const navigation = useNavigation();

  const { control, handleSubmit } = useForm<ProductFormField>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: product.title,
      price: product.price.toString(),
      description: product.description,
      category: product.category,
    },
  });

  const [image, setImage] = useState<Image | string | undefined>(product.image);

  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: [MUTATION_KEYS.UPDATE_PRODUCT],
    mutationFn: updateProductById,
    onSuccess: async res => {
      if (res.meta.status === 200) {
        Toast.show({ type: 'success', text1: 'Product Updated' });
      }
      const updatedProduct = res.data;

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
                products: page.data.products.map(p =>
                  p.id === updatedProduct.id
                    ? {
                        ...updatedProduct,
                      }
                    : p,
                ),
              },
            })),
          };
        },
      );
      navigation.canGoBack() && navigation.goBack();
    },
  });

  const updateHandler = handleSubmit(async data => {
    const reqData = {
      id: product.id,
      ...data,
    };

    if (image && typeof image !== 'string') {
      await mutateAsync({
        ...reqData,
        image: {
          type: image.mime,
          uri: image.path,
          name: image.filename || 'fake_store_product',
        },
      });
    } else {
      await mutateAsync(reqData);
    }
  });

  return { updateHandler, setImage, image, control, isPending };
};
