import { View } from 'react-native';
import React, { FC, PropsWithChildren } from 'react';
import {
  SafeAreaView,
  SafeAreaViewProps,
} from 'react-native-safe-area-context';
import { cn } from '@/utils/cn';

type Props = {
  saveAreaViewProps?: SafeAreaViewProps;
  className?: string;
};

export const Container: FC<PropsWithChildren<Props>> = ({
  children,
  saveAreaViewProps,
  className,
}) => {
  return (
    <SafeAreaView
      {...saveAreaViewProps}
      className={cn(
        'flex-1 bg-slate-100 dark:bg-slate-600',
        saveAreaViewProps?.className,
      )}
    >
      <View className={cn('flex-1 px-6', className)}>{children}</View>
    </SafeAreaView>
  );
};
