import { View } from 'react-native';
import React from 'react';
import { Container, PrimaryBottom, Text } from '@/components';
import OrderSuccessIcon from '@/assets/svg/order-success.svg';
import { CommonActions, useNavigation } from '@react-navigation/native';

const OrderSuccessScreen = () => {
  const navigation = useNavigation();
  return (
    <Container>
      <View className="flex-1 items-center justify-center gap-4">
        <OrderSuccessIcon width={160} height={160} />
        <Text className="text-3xl font-bold" value="Order Success" />
        <Text
          className="w-3/4 text-center text-base"
          value="Thank you for your purchase. We are working to ship your items as soon as possible."
        />
        <PrimaryBottom
          onPress={() =>
            navigation.dispatch(state => {
              const index = state.routes.findIndex(r => r.name === 'Home');

              const routes = state.routes.slice(0, index + 1);

              console.log('index', index);
              console.log('routes', routes);

              console.log(state.routes);

              return CommonActions.reset({
                ...state,
                routes,
                index: routes.length - 1,
              });
            })
          }
          className="w-3/4"
          title="Shopping Again"
        />
      </View>
    </Container>
  );
};

export default OrderSuccessScreen;
