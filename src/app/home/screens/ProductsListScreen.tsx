import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  View,
} from 'react-native';
import React from 'react';
import { CategoryList } from '../components/CategoryList';
import { ProductListItem } from '../components/ProductListItem';
import { ProductSkeletonListGroup } from '../components/ProductSkeletonListGroup';
import { useProductList } from '../hooks/useProductList';
import { useGetProducts } from '../hooks/useGetProducts';
import { useHandleTheme } from '@/hooks/useHandleTheme';
import { COLORS } from '@/constants/color';

const ITEM_HEIGHT = 252; // average

const ProductsListScreen = () => {
  const {
    categories,
    isPendingCategories,
    selectedCategory,
    setSelectedCategory,
    productByCategory,
    isFetchingNextPageProductByCategory,
    isPendingProductByCategory,
    hasNextPageProductByCategory,
    fetchNextPageProductByCategory,
    refetchProductByCategory,
  } = useProductList();

  const {
    productsList,
    isFetchingNextPageProductsList,
    hasNextPageProductsList,
    fetchNextPageProductsList,
    isPendingProductsList,
    refetchProductsList,
  } = useGetProducts();

  const handleOnEndRead = async () => {
    switch (selectedCategory) {
      case 'All': {
        if (hasNextPageProductsList) {
          await fetchNextPageProductsList();
        }
        return;
      }
      case selectedCategory: {
        if (hasNextPageProductByCategory) {
          await fetchNextPageProductByCategory();
        }
        return;
      }
      default:
        undefined;
    }
  };

  const { isDark } = useHandleTheme();

  const selectedProducts = productByCategory?.flatMap(
    product => product.data.products,
  );

  const isFetchingNextPages = isFetchingNextPageProductsList;

  return (
    <View className="pt-safe flex-1 bg-slate-100 dark:bg-slate-600">
      <View>
        <CategoryList
          categories={categories}
          isPending={isPendingCategories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </View>
      <View className="px-safe flex-1 overflow-hidden">
        {isPendingProductsList || isPendingProductByCategory ? (
          <ProductSkeletonListGroup />
        ) : (
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={false}
                onRefresh={refetchProductByCategory || refetchProductsList}
              />
            }
            showsVerticalScrollIndicator={false}
            contentContainerClassName="px-6 pt-10 gap-6 flex-grow pb-safe-offset-4"
            numColumns={2}
            columnWrapperClassName="justify-between"
            data={
              selectedCategory === 'All'
                ? productsList
                : selectedCategory && selectedProducts
                  ? selectedProducts
                  : []
            }
            keyExtractor={item => item?.id.toString()}
            initialNumToRender={6}
            maxToRenderPerBatch={4}
            onEndReached={handleOnEndRead}
            getItemLayout={(_data, index) => ({
              length: ITEM_HEIGHT,
              offset: ITEM_HEIGHT * index,
              index,
            })}
            ListFooterComponent={
              isFetchingNextPages || isFetchingNextPageProductByCategory ? (
                <View className="py-4">
                  <ActivityIndicator
                    color={isDark ? COLORS.WHITE : COLORS.SLATE_800}
                  />
                </View>
              ) : null
            }
            renderItem={({ item }) => <ProductListItem item={item} />}
          />
        )}
      </View>
    </View>
  );
};

export default ProductsListScreen;
