import React from 'react';
import { BaseInput, BaseInputProps } from './BaseInput';
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
} from 'react-hook-form';

type Props<
  T extends FieldValues = FieldValues,
  U extends FieldPath<T> = FieldPath<T>,
> = BaseInputProps &
  Pick<ControllerProps<T, U>, 'control' | 'name' | 'defaultValue'> & {};

export const Input = <
  T extends FieldValues = FieldValues,
  U extends FieldPath<T> = FieldPath<T>,
>({
  name,
  control,
  ...otherInputProps
}: Props<T, U>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ fieldState, field }) => {
        return (
          <BaseInput
            errorMessage={fieldState.error?.message}
            value={field.value}
            onChangeText={field.onChange}
            {...otherInputProps}
          />
        );
      }}
    />
  );
};
