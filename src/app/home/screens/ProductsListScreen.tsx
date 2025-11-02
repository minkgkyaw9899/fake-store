import { FlatList, View } from 'react-native';
import React, { useState } from 'react';
import { useProductCategories } from '../hooks/useProductCategories';
import { CategoryList } from '../components/CategoryList';
import { ProductListItem } from '../components/ProductListItem';
import { ProductSkeletonListGroup } from '../components/ProductSkeletonListGroup';

const ITEM_HEIGHT = 252; // average

const ProductsListScreen = () => {
  const { categories, productsByCategory, allProducts, isPending } =
    useProductCategories();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  return (
    <View className="pt-safe flex-1">
      <View>
        <CategoryList
          categories={categories}
          isPending={isPending}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </View>
      <View className="px-safe flex-1 overflow-hidden">
        {isPending ? (
          <ProductSkeletonListGroup />
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            contentContainerClassName="px-6 pt-10 gap-6 flex-grow pb-safe-offset-4"
            numColumns={2}
            columnWrapperClassName="justify-between"
            data={
              selectedCategory === 'All'
                ? allProducts
                : productsByCategory[selectedCategory]
            }
            keyExtractor={item => item.id.toString()}
            initialNumToRender={6}
            maxToRenderPerBatch={4}
            getItemLayout={(data, index) => ({
              length: ITEM_HEIGHT,
              offset: ITEM_HEIGHT * index,
              index,
            })}
            renderItem={({ item }) => <ProductListItem item={item} />}
          />
        )}
      </View>
    </View>
  );
};

export default ProductsListScreen;
