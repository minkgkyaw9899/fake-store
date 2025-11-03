import { Suspense } from 'react';
import { ActivityIndicator, View } from 'react-native';
import ShoppingBagsIcon from '@/assets/svg/shopping-bags.svg';
import { deviceWidth } from '@/constants/platformsAndDimensions';
import { Text } from './Text';

export const LayoutScreen = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<FallbackLoading />}>{children}</Suspense>
);

const FallbackLoading = () => {
  return (
    <View className="flex h-full w-full items-center justify-center gap-3 bg-slate-100 dark:bg-slate-600">
      <ShoppingBagsIcon width={deviceWidth / 2} height={deviceWidth / 2} />
      <Text
        className="text-2xl font-bold text-slate-600 dark:text-slate-200"
        value="Please wait ...."
      />
      <Text
        className="font-semibold text-slate-500 dark:text-slate-300"
        value="Your services are almost ready!"
      />
      <ActivityIndicator size="small" />
    </View>
  );
};
