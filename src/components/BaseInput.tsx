import { Pressable, TextInput, TextInputProps, View } from 'react-native';
import React, { Ref, useState } from 'react';
import { cn } from '@/utils/cn';
import { Text } from './Text';
import EyeIcon from '@/assets/svg/eye.svg';
import EyeOffIcon from '@/assets/svg/eye-off.svg';
import { useHandleTheme } from '@/hooks/useHandleTheme';
import { COLORS } from '@/constants/color';

export type BaseInputProps = TextInputProps & {
  label: string;
  containerClassName?: string;
  labelClassName?: string;
  ref?: Ref<TextInput>;
  errorMessage?: string;
  isRequired?: boolean;
  isPassword?: boolean;
};

export const BaseInput = ({
  ref,
  errorMessage,
  containerClassName,
  labelClassName,
  label,
  isRequired,
  placeholder,
  isPassword = false,
  ...textInputProps
}: BaseInputProps) => {
  const [showText, setShowText] = useState(isPassword);

  const { isDark } = useHandleTheme();

  return (
    <View className={cn('gap-1.5', containerClassName)}>
      <View className="flex-row items-center gap-2">
        <Text
          className={`text-lg font-semibold text-slate-800 dark:text-white ${labelClassName}`}
          value={label}
        />
        {isRequired && <Text className="font-bold text-red-500" value={'*'} />}
      </View>
      <View className="relative">
        <TextInput
          className="rounded-2xl bg-white px-4 py-5 text-slate-800 placeholder:font-medium placeholder:text-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-200"
          ref={ref}
          placeholder={label || placeholder}
          placeholderClassName="text-slate-800 font-semibold"
          secureTextEntry={textInputProps.secureTextEntry || showText}
          {...textInputProps}
        />
        {isPassword && (
          <Pressable
            onPress={() => setShowText(!showText)}
            className="absolute bottom-4 right-5"
          >
            {showText ? (
              <EyeIcon
                width={20}
                height={20}
                color={isDark ? COLORS.SLATE_100 : COLORS.SLATE_800}
              />
            ) : (
              <EyeOffIcon
                width={20}
                height={20}
                color={isDark ? COLORS.SLATE_100 : COLORS.SLATE_800}
              />
            )}
          </Pressable>
        )}
      </View>
      <Text
        className="text-sm font-semibold text-red-500"
        value={errorMessage}
      />
    </View>
  );
};
