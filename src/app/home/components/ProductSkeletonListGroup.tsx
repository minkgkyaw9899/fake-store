import { Spacer } from '@/components';
import { COLORS } from '@/constants/color';
import { MotiView } from 'moti';
import { Skeleton } from 'moti/skeleton';
import { View } from 'react-native';

export const ProductSkeletonListGroup = () => {
  return (
    <View className="flex flex-row flex-wrap justify-between px-6">
      {[1, 2, 3, 4, 5, 6].map(i => (
        <MotiView
          key={i}
          className="mb-6 h-[200px] w-[47%] rounded-xl"
          animate={{ backgroundColor: COLORS.SLATE_100 }}
        >
          <Skeleton colorMode="light" width="100%" height={100} />
          <Spacer height={16} />
          <Skeleton colorMode="light" width="80%" height={40} />
          <Spacer height={16} />
          <Skeleton colorMode="light" width="50%" height={24} />
        </MotiView>
      ))}
    </View>
  );
};
