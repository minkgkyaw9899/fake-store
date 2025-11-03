import React from 'react';
import Ionicons, {
  IoniconsIconName,
} from '@react-native-vector-icons/ionicons';
import { useHandleTheme } from '@/hooks/useHandleTheme';
import { COLORS } from '@/constants/color';

type Props = {
  name: IoniconsIconName;
  size?: number;
  color?: string;
};

export const Icon = ({ name, size, color }: Props) => {
  const { isDark } = useHandleTheme();
  return (
    <Ionicons
      name={name}
      size={size ? size : 18}
      color={color ? color : isDark ? COLORS.WHITE : COLORS.SLATE_800}
    />
  );
};
