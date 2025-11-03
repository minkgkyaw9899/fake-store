import { Pressable, StyleSheet, View } from 'react-native';
import React, { memo } from 'react';
import { FasterImageView } from '@rraut/react-native-faster-image';
import { Product } from '../hooks/useGetProducts';
import { Icon, Text } from '@/components';
import { useNavigation } from '@react-navigation/native';
import { RootStackScreenProps } from '@/navigation/types';

type Props = {
  item: Product;
};

type Nav = RootStackScreenProps<'Home'>['navigation'];

export const ProductListItem = memo(({ item }: Props) => {
  const navigation = useNavigation<Nav>();

  return (
    <Pressable
      onPress={() => {
        navigation.navigate('ProductDetail', {
          id: item.id,
          image: item.image,
          title: item.title,
        });
      }}
      className="w-[47%] justify-between rounded-xl bg-white px-2 pt-4 dark:bg-slate-800"
    >
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
        <Icon size={24} name="add" />
      </View>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  img: { width: '100%', height: '100%' },
});
