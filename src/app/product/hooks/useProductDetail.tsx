import { QUERY_KEYS } from '@/constants/queryKey';
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { OrderProduct } from '../screens/OrderProductsScreen';
import Toast from 'react-native-toast-message';
import { getProductById } from '../services/getProductById';
import { RootStackScreenProps } from '@/navigation/types';

type Navigation = RootStackScreenProps<'ProductDetail'>['navigation'];
type Router = RootStackScreenProps<'ProductDetail'>['route'];

export const useProductDetail = () => {
  const navigation = useNavigation<Navigation>();
  const router = useRoute<Router>();

  const { id, title, image } = router.params;

  const isFocused = useIsFocused();

  const [qty, setQty] = useState(1);

  const { data, isPending, isError, refetch, isRefetching } = useQuery({
    queryKey: [QUERY_KEYS.PRODUCT_DETAIL, id],
    queryFn: () => getProductById(id),
    enabled: !!id,
    subscribed: isFocused,
  });

  useEffect(() => {
    if (isError) {
      Toast.show({
        type: 'error',
        text1: 'Something went wrong!',
        text2: 'Please try again by pull to refresh!',
      });
    }
  }, [isError]);

  const handleQuickBuy = () => {
    const order: OrderProduct = {
      id,
      title,
      image,
      price: data?.data?.price || 0,
      qty,
    };
    navigation.navigate('OrderProducts', { orders: [order] });
  };

  const qtyIncrement = () => {
    if (qty < 20) return setQty(qty + 1);
  };

  const qtyDecrement = () => {
    if (qty > 1) return setQty(qty - 1);
  };

  const disabled = isPending || isError || isRefetching;

  return {
    handleQuickBuy,
    qtyIncrement,
    qtyDecrement,
    refetch,
    isRefetching,
    isPending,
    qty,
    disabled,
    product: data?.data,
  };
};
