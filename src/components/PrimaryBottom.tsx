import { ActivityIndicator, Pressable, PressableProps } from 'react-native';
import React, { useEffect, useState } from 'react';
import { cn } from '@/utils/cn';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import { COLORS } from '@/constants/color';
import { runOnJS } from 'react-native-worklets';

type Props = PressableProps & {
  title: string;
  titleClassName?: string;
  isLoading?: boolean;
};

export const PrimaryBottom = ({
  title,
  className,
  titleClassName,
  isLoading = false,
  ...otherProps
}: Props) => {
  const activityOpacity = useSharedValue(0);
  const textOpacity = useSharedValue(1);

  const [showActivity, setShowActivity] = useState(isLoading);
  const [showText, setShowText] = useState(!isLoading);

  const animatedTextStyle = useAnimatedStyle(() => ({
    opacity: interpolate(textOpacity.value, [0, 1], [0, 1]),
    transform: [
      {
        translateX: interpolate(
          textOpacity.value,
          [0, 1],
          [20, 0],
          Extrapolation.CLAMP,
        ),
      },
    ],
  }));

  const animatedLoadingStyle = useAnimatedStyle(() => ({
    opacity: interpolate(activityOpacity.value, [0, 1], [0, 1]),
    transform: [
      {
        translateY: interpolate(
          activityOpacity.value,
          [0, 1],
          [20, 0],
          Extrapolation.CLAMP,
        ),
      },
    ],
  }));

  /**
   * runOnJS is deprecated but scheduleOnRN is not working as expected here (app crashed)
   * because may be react-native-worklets is not fully compatible with react-native 0.82 yet.
   */
  useEffect(() => {
    if (isLoading) {
      // hide text first
      textOpacity.value = withTiming(0, { duration: 200 }, finished => {
        if (finished) runOnJS(setShowText)(false);
      });

      // show spinner after text fade out
      activityOpacity.value = withDelay(
        200,
        withTiming(1, { duration: 250 }, finished => {
          if (finished) runOnJS(setShowActivity)(true);
        }),
      );
    } else {
      // hide spinner first
      activityOpacity.value = withTiming(0, { duration: 200 }, finished => {
        if (finished) runOnJS(setShowActivity)(false);
      });

      // show text after spinner fade out
      textOpacity.value = withDelay(
        200,
        withTiming(1, { duration: 250 }, finished => {
          if (finished) runOnJS(setShowText)(true);
        }),
      );
    }
  }, [activityOpacity, isLoading, textOpacity]);

  return (
    <Pressable
      className={cn(
        'min-h-16 flex-row items-center justify-center rounded-full bg-slate-800 px-4 py-4 active:bg-slate-900 disabled:bg-slate-700',
        className,
      )}
      disabled={otherProps.disabled || isLoading}
      {...otherProps}
    >
      {showActivity && (
        <Animated.View style={animatedLoadingStyle}>
          <ActivityIndicator color={COLORS.WHITE} />
        </Animated.View>
      )}

      {showText && (
        <Animated.Text
          className={cn('text-lg font-semibold text-white', titleClassName)}
          style={animatedTextStyle}
          disabled
        >
          {title}
        </Animated.Text>
      )}
    </Pressable>
  );
};
