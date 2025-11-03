import { View } from 'react-native';
import React from 'react';
import Ionicons, {
  IoniconsIconName,
} from '@react-native-vector-icons/ionicons';
import { cn } from '@/utils/cn';
import { Text } from '@/components';
import { useHandleTheme } from '@/hooks/useHandleTheme';
import { COLORS } from '@/constants/color';

type Props = {
  iconName: IoniconsIconName;
  text: string;
  isPrice?: boolean;
};

export const ProductDescription = ({ iconName, text, isPrice }: Props) => {
  const { isDark } = useHandleTheme();

  return (
    <View
      className={cn(
        'my-2 flex-row justify-start gap-4',
        text.length < 40 ? 'items-center' : 'items-start',
      )}
    >
      <Ionicons
        name={iconName}
        size={24}
        color={isDark ? COLORS.WHITE : COLORS.SLATE_800}
      />
      <Text
        value={text}
        className={cn(
          'mr-14 text-wrap text-justify text-base',
          isPrice && 'text-2xl font-semibold',
        )}
      />
    </View>
  );
};
