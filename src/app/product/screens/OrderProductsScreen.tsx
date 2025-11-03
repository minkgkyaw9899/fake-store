import { FlatList } from 'react-native';
import React from 'react';
import ContainerWithTitle from '@/components/ContainerWithTitle';
import { OrderItem } from '../components/OrderItem';
import {
  OrderConfirmFooter,
  OrderItemSeparator,
} from '../components/OrderConfirmFooter';
import { RootStackScreenProps } from '@/navigation/types';

export type OrderProduct = {
  id: number;
  image: string;
  title: string;
  price: number;
  qty: number;
};

type Props = RootStackScreenProps<'OrderProducts'>;

const OrderProductsScreen = ({ route }: Props) => {
  const { orders } = route.params;

  return (
    <ContainerWithTitle className="px-0" title="Confirm Order">
      <FlatList
        contentContainerClassName="mx-6 mt-12 py-4 bg-white dark:bg-slate-950 rounded-xl"
        data={orders}
        keyExtractor={item => item.id.toString()}
        ItemSeparatorComponent={OrderItemSeparator}
        renderItem={({ item }) => <OrderItem item={item} />}
        ListFooterComponent={OrderConfirmFooter}
      />
    </ContainerWithTitle>
  );
};

export default OrderProductsScreen;
