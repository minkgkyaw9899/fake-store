import { GestureResponderEvent, Pressable, View } from 'react-native';
import React from 'react';
import { IoniconsIconName } from '@react-native-vector-icons/ionicons';
import { Icon, Text } from '@/components';

type Props = {
  iconName: IoniconsIconName;
  title: string;
  onPress: ((event: GestureResponderEvent) => void) | null | undefined;
};
export const ProfileListItem = ({ onPress, title, iconName }: Props) => {
  return (
    <Pressable
      onPress={onPress}
      className="flex-row items-center justify-between"
    >
      <View className="flex-row items-center gap-8">
        <Icon name={iconName} size={22} />
        <Text value={title} className="text-base" />
      </View>
      <Icon name="chevron-forward" size={16} />
    </Pressable>
  );
};
