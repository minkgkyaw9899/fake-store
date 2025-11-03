import { useForm } from 'react-hook-form';
import { ProductFormField, productSchema } from '../schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Image } from 'react-native-image-crop-picker';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MUTATION_KEYS, QUERY_KEYS } from '@/constants/queryKey';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import { createNewProduct } from '../services/createNewProduct';

export const useCreateNewProduct = () => {
  const navigation = useNavigation();

  const [imgError, setImgError] = useState<string | undefined>(undefined);

  const { control, handleSubmit } = useForm<ProductFormField>({
    resolver: zodResolver(productSchema),
    defaultValues: {},
  });

  const [image, setImage] = useState<Image | undefined>(undefined);

  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationKey: [MUTATION_KEYS.CREATE_PRODUCT],
    mutationFn: createNewProduct,
    onSuccess: res => {
      if (res.meta.status === 200) {
        Toast.show({ type: 'success', text1: 'Product Updated' });
      }

      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.PRODUCTS] });

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.CATEGORIES, res.data.category],
      });

      navigation.canGoBack() && navigation.goBack();
    },
  });

  const createHandler = handleSubmit(async data => {
    if (!image) {
      setImgError('Image is required!');
      return null;
    }

    const reqData = {
      ...data,
    };

    await mutateAsync({
      ...reqData,
      image: {
        type: image.mime,
        uri: image.path,
        name: image.filename || 'fake_store_product',
      },
    });
  });

  return { createHandler, setImage, image, control, isPending, imgError };
};
