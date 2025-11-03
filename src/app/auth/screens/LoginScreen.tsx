import { Pressable, TextInput, View } from 'react-native';
import React, { useLayoutEffect, useRef } from 'react';
import { Container, Input, PrimaryBottom } from '@/components';
import { LoginShoppingIcon } from '@/assets/svg';
import { Text } from '@/components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { useLogin } from '../hooks/useLogin';
import Toast from 'react-native-toast-message';
import { RootStackScreenProps } from '@/navigation/types';

const LoginScreen = ({ navigation }: RootStackScreenProps<'Login'>) => {
  const { control, isPending, isSuccess, handleSubmit } = useLogin();

  const passwordRef = useRef<TextInput>(null);

  useLayoutEffect(() => {
    if (isSuccess) {
      Toast.show({
        type: 'success',
        text1: 'Login Successful',
      });
    }
  }, [isSuccess]);

  return (
    <Container className="flex-1 px-0">
      <KeyboardAwareScrollView
        extraKeyboardSpace={120}
        bottomOffset={120}
        contentContainerClassName="px-4 flex-grow"
      >
        <View className="items-center justify-center gap-4 py-6">
          <Text
            className="text-center text-3xl font-semibold"
            value="Are you ready to go shop?"
          />
          <Text
            className="mb-8 text-center font-semibold text-slate-500 dark:text-slate-200"
            value="Login and Get Started"
          />
          <LoginShoppingIcon width={160} height={160} />
        </View>

        <View className="flex-1">
          <Input
            name="username"
            label="Username"
            control={control}
            onSubmitEditing={() => passwordRef.current?.focus()}
            editable={!isPending}
            maxLength={20}
          />
          <Input
            name="password"
            label="Password"
            control={control}
            ref={passwordRef}
            editable={!isPending}
            isPassword
            maxLength={60}
          />
          <PrimaryBottom
            onPress={handleSubmit}
            isLoading={isPending}
            title="Login"
            className="mt-10"
          />
          <View className="my-4 flex-row items-center justify-center gap-1">
            <Text value="Don't have an account?" />
            <Pressable onPress={() => navigation.navigate('Signup')}>
              <Text className="font-semibold underline" value="Sign Up" />
            </Pressable>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </Container>
  );
};

export default LoginScreen;
