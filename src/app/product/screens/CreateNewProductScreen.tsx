import React from 'react';
import ContainerWithTitle from '@/components/ContainerWithTitle';
import { RootStackScreenProps } from '@/navigation/types';
import { DropdownInput, ImagePicker, Input, PrimaryBottom } from '@/components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { useProductList } from '@/app/home/hooks/useProductList';
import { View } from 'react-native';
import { useCreateNewProduct } from '../hooks/useCreateNewProduct';

type Props = RootStackScreenProps<'CreateNewProduct'>;

/**
 * should be filter file size in production but skip this time
 */
// const MAX_FILE_SIZE = 5000000; // 5MB

// const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

const CreateNewProductScreen = ({}: Props) => {
  const { categories } = useProductList();

  const { control, image, isPending, setImage, createHandler, imgError } =
    useCreateNewProduct();

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
        <ImagePicker
          errorMessage={imgError}
          image={image}
          setImage={setImage}
        />

        <View className="mt-12">
          <PrimaryBottom
            title="Update"
            isLoading={isPending}
            onPress={createHandler}
          />
          <View className="mb-safe-offset-4" />
        </View>
      </KeyboardAwareScrollView>
    </ContainerWithTitle>
  );
};

export default CreateNewProductScreen;
