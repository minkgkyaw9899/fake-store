import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import React from 'react';
import { RootStackScreenProps } from '@/navigation/types';
import { PrimaryBottom, SecondaryBottom, Text } from '@/components';
import ContainerWithTitle from '@/components/ContainerWithTitle';
import { FasterImageView } from '@rraut/react-native-faster-image';
import { ProductDescription } from '@/app/product/components/ProductDescription';
import { useProductDetail } from '../hooks/useProductDetail';

const ProductDetail = ({ route }: RootStackScreenProps<'ProductDetail'>) => {
  const { title, image } = route.params;

  const {
    handleQuickBuy,
    qtyIncrement,
    qtyDecrement,
    refetch,
    isRefetching,
    qty,
    disabled,
    product,
  } = useProductDetail();

  return (
    <ContainerWithTitle title={title} className="flex-1">
      <View className="flex-1 justify-between overflow-hidden">
        <View className="flex-1">
          <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
            }
          >
            <FasterImageView
              style={styles.image}
              source={{ uri: image, resizeMode: 'contain' }}
            />

            <View className="py-6">
              <Text className="text-wrap text-3xl font-bold" value={title} />
              {product ? (
                <View className="mt-8">
                  <View className="mr-2 flex-row items-center justify-between">
                    <ProductDescription
                      iconName="pricetag"
                      text={'$' + product.price.toString()}
                      isPrice
                    />
                    <View className="flex-row items-center gap-2">
                      <SecondaryBottom
                        className="min-h-12 w-12 rounded-xl"
                        title="-"
                        disabled={qty === 1}
                        onPress={qtyDecrement}
                      />
                      <View className="min-w-14 items-center">
                        <Text
                          className="text-3xl font-bold"
                          value={qty.toString()}
                        />
                      </View>
                      <SecondaryBottom
                        className="min-h-12 w-12 rounded-xl"
                        title="+"
                        disabled={qty === 20}
                        onPress={qtyIncrement}
                      />
                    </View>
                  </View>
                  <ProductDescription
                    iconName="star"
                    text={product.rating.rate.toString()}
                  />
                  <ProductDescription
                    iconName="layers-sharp"
                    text={product.description}
                  />
                  <ProductDescription
                    iconName="sparkles"
                    text={product.category}
                  />
                </View>
              ) : (
                <View className="min-h-40 flex-1 items-center justify-center">
                  <ActivityIndicator />
                </View>
              )}
            </View>
          </ScrollView>
        </View>
        {!disabled && (
          <View className="flex-row items-center justify-between pt-2">
            <View className="w-3/6">
              <SecondaryBottom
                disabled={disabled || !product}
                iconName="cart-outline"
                title="Add to Cart"
              />
            </View>
            <View className="w-2/5">
              <PrimaryBottom
                title="Quick Buy"
                onPress={handleQuickBuy}
                disabled={disabled || !product}
              />
            </View>
          </View>
        )}
      </View>
    </ContainerWithTitle>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  image: { width: '100%', height: 260 },
});
