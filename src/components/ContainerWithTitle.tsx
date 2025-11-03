import { Pressable, View } from 'react-native';
import React, { PropsWithChildren } from 'react';
import { ContainerProps } from './Container';
import { SafeAreaView } from 'react-native-safe-area-context';
import { cn } from '@/utils/cn';
import { Text } from './Text';
import { useNavigation } from '@react-navigation/native';
import { Icon } from './Icon';

type Props = ContainerProps & {
  title?: string;
  showBack?: boolean;
};

const ContainerWithTitle = ({
  saveAreaViewProps,
  className,
  children,
  title,
  showBack = true,
}: PropsWithChildren<Props>) => {
  const navigation = useNavigation();

  return (
    <SafeAreaView
      className={cn(
        'flex-1 bg-slate-100 dark:bg-slate-600',
        saveAreaViewProps?.className,
      )}
      {...saveAreaViewProps}
    >
      <View className={cn('flex-1')}>
        <View className="flex-row items-center justify-between px-6 py-4">
          <View className="flex-row items-center gap-4">
            {showBack && (
              <Pressable
                onPress={() => navigation.canGoBack() && navigation.goBack()}
              >
                <Icon name="arrow-back-outline" size={28} />
              </Pressable>
            )}
            {title && (
              <Text
                className="max-w-72 text-lg font-semibold"
                numberOfLines={1}
                value={title}
              />
            )}
          </View>
          <View className="h-2 w-4" />
        </View>
        <View className={cn('flex-1 px-6', className)}>{children}</View>
      </View>
    </SafeAreaView>
  );
};

export default ContainerWithTitle;
