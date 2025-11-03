import React, { useState } from 'react';
import { BaseInput } from './BaseInput';
import { Controller, FieldPath, FieldValues } from 'react-hook-form';
import { InputProps } from './Input';
import Modal from 'react-native-modal';
import { Pressable, StyleSheet, View } from 'react-native';
import { Text } from './Text';
import { cn } from '@/utils/cn';

type Props<
  T extends FieldValues = FieldValues,
  U extends FieldPath<T> = FieldPath<T>,
> = InputProps<T, U> & {
  data: string[];
};

export const DropdownInput = <
  T extends FieldValues = FieldValues,
  U extends FieldPath<T> = FieldPath<T>,
>({
  name,
  control,
  data,
  ...otherInputProps
}: Props<T, U>) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => setShowModal(prev => !prev);

  return (
    <Controller
      name={name}
      control={control}
      render={({ fieldState, field }) => {
        return (
          <>
            <BaseInput
              errorMessage={fieldState.error?.message}
              value={field.value}
              onChangeText={field.onChange}
              editable={false}
              selectTextOnFocus={false}
              onPress={toggleModal}
              customIcon={showModal ? 'chevron-up' : 'chevron-down'}
              iconAction={toggleModal}
              {...otherInputProps}
            />
            <Modal
              style={styles.modal}
              isVisible={showModal}
              onBackdropPress={toggleModal}
            >
              <View className="min-h-30 rounded-t-xl bg-white px-6 pt-6 dark:bg-slate-700">
                <Text
                  className="mb-8 text-center text-lg"
                  value="Please select a value"
                />
                <View className="mb-safe-offset-6 gap-5">
                  {data?.map(str => (
                    <Pressable
                      className={cn(
                        'w-full items-center rounded-full px-4 py-2',
                        str === field.value
                          ? 'bg-blue-100 dark:bg-blue-700'
                          : 'bg-slate-100 dark:bg-slate-800',
                      )}
                      onPress={() => {
                        field.onChange(str);
                        toggleModal();
                      }}
                      key={str}
                    >
                      <Text
                        className={cn(
                          'capitalize',
                          str === field.value
                            ? 'text-lg font-semibold text-blue-600'
                            : 'text-base text-slate-700 dark:text-slate-300',
                        )}
                        value={str}
                      />
                    </Pressable>
                  ))}
                </View>
              </View>
            </Modal>
          </>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  modal: { margin: 0, justifyContent: 'flex-end' },
});
