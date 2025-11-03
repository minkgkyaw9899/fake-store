import { View } from 'react-native';
import React from 'react';
import { Icon, PrimaryBottom, Text } from '@/components';
import { COLORS } from '@/constants/color';
import { useNavigation } from '@react-navigation/native';
import { RootStackScreenProps } from '@/navigation/types';

export const OrderItemSeparator = () => (
  <View className="w-full border-b border-slate-400 dark:border-slate-300" />
);

const OrderRowItem = ({ title, value }: { title: string; value: string }) => {
  return (
    <View className="flex-row items-center justify-between px-6">
      <Text
        className="text-base text-slate-600 dark:text-slate-300"
        value={title}
      />
      <Text
        className="text-lg font-semibold dark:text-slate-100"
        value={value}
      />
    </View>
  );
};

type Navigation = RootStackScreenProps<'OrderProducts'>['navigation'];

export const OrderConfirmFooter = () => {
  const navigation = useNavigation<Navigation>();
  return (
    <View className="mt-4 flex-1">
      <OrderItemSeparator />
      <View className="gap-3 py-4">
        <OrderRowItem title="Total Amount" value={'0'} />
        <OrderRowItem
          title="Order Date"
          value={new Date().toLocaleDateString()}
        />
        <OrderRowItem title="Order No" value={'#ORD-55555'} />
      </View>
      <OrderItemSeparator />
      <View className="mx-4 mb-2 mt-8 flex-1 gap-4">
        <PrimaryBottom
          onPress={() => navigation.navigate('OrderSuccess')}
          title="Confirm Order"
        />
        <View className="mt-2 flex-1 flex-row gap-4 overflow-hidden">
          <Icon name="alert-circle" size={16} color={COLORS.RED_500} />
          <Text
            className="w-[90%] text-wrap text-sm text-slate-500 dark:text-slate-600"
            value="Please double check your order before confirm!"
          />
        </View>
      </View>
    </View>
  );
};
