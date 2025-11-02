import { StyleSheet, View } from 'react-native';
import React, { memo } from 'react';
import { FasterImageView } from '@rraut/react-native-faster-image';
import { Product } from '../hooks/useGetProducts';
import { Text } from '@/components';
import Ionicons from '@react-native-vector-icons/ionicons';

type Props = {
  item: Product;
};

export const ProductListItem = memo(({ item }: Props) => {
  return (
    <View className="w-[47%] justify-between rounded-xl bg-white px-2 pt-4">
      <View className="mb-6 h-36 w-full rounded-t-xl">
        <FasterImageView
          source={{ uri: item.image, resizeMode: 'contain' }}
          style={styles.img}
          className="h-full w-full"
        />
      </View>
      <View className="flex-grow justify-start">
        <Text className="text-start text-sm" value={item.title} />
      </View>
      <View className="mb-2 mt-2 flex-row items-center justify-between pr-2">
        <Text
          className="text-lg font-medium"
          value={`$${item.price.toString()}`}
        />
        <Ionicons size={24} name="add" />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  img: { width: '100%', height: '100%' },
});
