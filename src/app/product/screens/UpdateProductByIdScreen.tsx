import React from 'react';
import ContainerWithTitle from '@/components/ContainerWithTitle';
import { useSuspenseQuery } from '@tanstack/react-query';
import { RootStackScreenProps } from '@/navigation/types';
import { QUERY_KEYS } from '@/constants/queryKey';
import { getProductById } from '../services/getProductById';
import { useIsFocused } from '@react-navigation/native';
import { DropdownInput, ImagePicker, Input, PrimaryBottom } from '@/components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { useProductList } from '@/app/home/hooks/useProductList';
import { View } from 'react-native';
import { useUpdateProductById } from '../hooks/useUpdateProductById';

type Props = RootStackScreenProps<'UpdateMyProductById'>;

/**
 * should be filter file size in production but skip this time
 */
// const MAX_FILE_SIZE = 5000000; // 5MB

// const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

const UpdateProductByIdScreen = ({ route }: Props) => {
  const productId = route.params.id;

  const isFocused = useIsFocused();

  const { data: productData } = useSuspenseQuery({
    queryKey: [QUERY_KEYS.PRODUCTS, productId],
    queryFn: async () => getProductById(productId),
    subscribed: !!productId && isFocused,
  });

  const { categories } = useProductList();

  const { control, image, isPending, setImage, updateHandler } =
    useUpdateProductById(productData.data);

  return (
    <ContainerWithTitle
      title="Update Product"
      className="px-0"
      saveAreaViewProps={{ edges: ['top'] }}
    >
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        extraKeyboardSpace={120}
        bottomOffset={120}
        contentContainerClassName="flex-grow py-6 px-6"
      >
        <Input control={control} name="title" label="Title" isRequired />
        <Input
          control={control}
          name="price"
          label="Price"
          keyboardType="numeric"
          isRequired
        />
        <Input
          control={control}
          name="description"
          label="Description"
          multiline
          isRequired
        />
        <DropdownInput
          control={control}
          name="category"
          label="Category"
          multiline
          isRequired
          data={categories?.filter(category => category !== 'All') || []}
        />
        <ImagePicker image={image} setImage={setImage} />

        <View className="mt-12">
          <PrimaryBottom
            title="Update"
            isLoading={isPending}
            onPress={updateHandler}
          />
          <View className="mb-safe-offset-4" />
        </View>
      </KeyboardAwareScrollView>
    </ContainerWithTitle>
  );
};

export default UpdateProductByIdScreen;
