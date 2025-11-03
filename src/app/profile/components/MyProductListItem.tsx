import { Pressable, StyleSheet, View } from 'react-native';
import React, { memo } from 'react';
import { FasterImageView } from '@rraut/react-native-faster-image';
import { Icon, Text } from '@/components';
import { Product } from '@/app/home/hooks/useGetProducts';
import { COLORS } from '@/constants/color';

type Props = {
  item: Product;
  handleDelete: () => void;
  handleEdit: () => void;
};

export const MyProductListItem = memo(
  ({ item, handleDelete, handleEdit }: Props) => {
    return (
      <View className="flex-row items-center justify-between gap-2">
        <FasterImageView
          style={styles.image}
          source={{ uri: item.image, resizeMode: 'contain' }}
        />
        <View className="flex-1 flex-row items-center justify-between">
          <Text className="w-3/5" value={item.title} />
          <View className="flex-row gap-6">
            <Pressable onPress={handleEdit}>
              <Icon name="create-outline" size={24} />
            </Pressable>
            <Pressable onPress={handleDelete}>
              <Icon name="trash-outline" size={24} color={COLORS.RED_500} />
            </Pressable>
          </View>
        </View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  image: { width: 80, height: 80 },
});
