import { StyleSheet, View } from 'react-native';
import React, { memo } from 'react';
import { FasterImageView } from '@rraut/react-native-faster-image';
import { OrderProduct } from '../screens/OrderProductsScreen';
import { Text } from '@/components';

type Props = {
  item: OrderProduct;
};

export const OrderItem = memo(({ item }: Props) => {
  const totalPrice = item.qty * item.price;
  return (
    <View className="flex-row items-center justify-between gap-4 rounded-xl px-4">
      <View className="rounded-xl bg-slate-200 px-2 py-2 dark:bg-slate-600">
        <FasterImageView
          source={{ uri: item.image, resizeMode: 'stretch' }}
          style={styles.image}
        />
      </View>
      <View className="flex-1 justify-between overflow-hidden">
        <View className="flex-row items-start justify-between">
          <Text
            numberOfLines={3}
            className="w-40 text-wrap"
            value={item.title}
          />
          <Text
            className="text-wrap text-base font-semibold"
            value={`$${totalPrice}`}
          />
        </View>
        <Text
          value={`Quantity - ${item.qty}`}
          className="text-sm text-slate-600 dark:text-slate-400"
        />
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  image: { aspectRatio: 4 / 3, width: 60 },
});
