import { Text as RnText, TextProps as RnTextProps } from 'react-native';
import React, { Ref } from 'react';
import { cn } from '@/utils/cn';

type Props = RnTextProps & {
  ref?: Ref<RnText>;
  value: string | undefined;
};

export const Text = ({ value, ref, className, ...otherTextProps }: Props) => {
  return (
    <RnText
      ref={ref}
      className={cn('text-slate-800 dark:text-slate-100', className)}
      {...otherTextProps}
    >
      {value}
    </RnText>
  );
};
