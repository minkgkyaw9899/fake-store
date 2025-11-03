import { ActivityIndicator, FlatList, Pressable, View } from 'react-native';
import React from 'react';
import { Icon, Text } from '@/components';
import ContainerWithTitle from '@/components/ContainerWithTitle';
import { useGetProducts } from '@/app/home/hooks/useGetProducts';
import { MyProductListItem } from '../components/MyProductListItem';
import { RefreshControl } from 'react-native-gesture-handler';
import { useDeleteProduct } from '../hooks/useDeleteProduct';
import { RootStackScreenProps } from '@/navigation/types';
import { QUERY_KEYS } from '@/constants/queryKey';
import { useQueryClient } from '@tanstack/react-query';
import { getProductById } from '@/app/product/services/getProductById';

const Separator = () => (
  <View className="my-2 border-b border-slate-300 dark:border-slate-500" />
);

const ITEM_HEIGHT = 80;

type Props = RootStackScreenProps<'MyProductsList'>;

const MyProductsListScreen = ({ navigation }: Props) => {
  const { handleDelete } = useDeleteProduct();

  const queryClient = useQueryClient();

  const handleEdit = async (productId: number) => {
    const productQueryKey = [QUERY_KEYS.PRODUCTS, productId];

    await queryClient.prefetchQuery({
      queryKey: productQueryKey,
      queryFn: async () => await getProductById(productId),
    });

    navigation.navigate('UpdateMyProductById', {
      id: productId,
    });
  };

  const handleCreateProduct = () => {
    navigation.navigate('CreateNewProduct');
  };

  const {
    totalProducts,
    productsList,
    isFetchingNextPageProductsList,
    hasNextPageProductsList,
    fetchNextPageProductsList,
    refetchProductsList,
  } = useGetProducts();

  console.log(
    'productsList',
    productsList.map(i => i.title),
  );
  return (
    <ContainerWithTitle
      saveAreaViewProps={{ edges: ['top'] }}
      title="My Products"
      className="flex-1 px-0"
    >
      <View className="flex-1">
        <View className="flex-row justify-between px-6 py-4">
          <View className="flex-row items-center justify-between gap-4">
            <Text className="text-xl" value="Total Products -" />
            <Text
              className="text-base font-semibold"
              value={`${totalProducts}`}
            />
          </View>
          <Pressable onPress={handleCreateProduct}>
            <Icon name="add-circle-outline" size={32} />
          </Pressable>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<ActivityIndicator />}
          contentContainerClassName="px-5 pb-safe-offset-8 flex-grow"
          data={productsList}
          ItemSeparatorComponent={Separator}
          keyExtractor={item => {
            return item.id.toString();
          }}
          renderItem={({ item }) => {
            return (
              <MyProductListItem
                item={item}
                handleEdit={() => handleEdit(item.id)}
                handleDelete={() => handleDelete(item.id)}
              />
            );
          }}
          refreshControl={
            <RefreshControl
              refreshing={false}
              onRefresh={refetchProductsList}
            />
          }
          onEndReached={() =>
            hasNextPageProductsList && fetchNextPageProductsList()
          }
          onEndReachedThreshold={0.1}
          getItemLayout={(data, index) => ({
            length: ITEM_HEIGHT,
            offset: ITEM_HEIGHT * index,
            index,
          })}
          ListFooterComponent={
            isFetchingNextPageProductsList ? (
              <View className="py-4">
                <ActivityIndicator />
              </View>
            ) : null
          }
        />
      </View>
    </ContainerWithTitle>
  );
};

export default MyProductsListScreen;
