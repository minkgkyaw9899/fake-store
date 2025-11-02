import { Container, Input, PrimaryBottom, Text } from '@/components';
import { Pressable, TextInput, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { useRef } from 'react';
import SignUpIcon from '@/assets/svg/signup.svg';
import { AuthStackScreenProps } from '@/navigation/types';
import { useSignUp } from '../hooks/useSignUp';

const SignUpScreen = ({ navigation }: AuthStackScreenProps<'Signup'>) => {
  const { handleSubmit, isPending, control } = useSignUp();

  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);

  return (
    <Container
      className="flex-1 px-0"
      saveAreaViewProps={{ edges: ['top', 'left', 'right'] }}
    >
      <KeyboardAwareScrollView
        extraKeyboardSpace={120}
        bottomOffset={120}
        contentContainerClassName="px-4 flex-grow"
      >
        <View className="items-center justify-center gap-4 py-6">
          <Text
            className="text-center text-3xl font-semibold"
            value="Create New Account"
          />
          <Text
            className="mb-8 text-center font-semibold text-slate-500 dark:text-slate-200"
            value="Signup and Get Started"
          />
          <SignUpIcon width={120} height={120} />
        </View>

        <View className="flex-1">
          <Input
            name="username"
            label="Username"
            control={control}
            onSubmitEditing={() => emailRef.current?.focus()}
            editable={!isPending}
            maxLength={20}
          />
          <Input
            name="email"
            label="Email"
            control={control}
            ref={emailRef}
            onSubmitEditing={() => passwordRef.current?.focus()}
            editable={!isPending}
            maxLength={60}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Input
            name="password"
            label="Password"
            control={control}
            ref={passwordRef}
            onSubmitEditing={() => confirmPasswordRef.current?.focus()}
            editable={!isPending}
            isPassword
          />
          <Input
            name="confirmPassword"
            label="Confirm Password"
            control={control}
            ref={confirmPasswordRef}
            editable={!isPending}
            isPassword
            maxLength={60}
          />
          <PrimaryBottom
            onPress={handleSubmit}
            isLoading={isPending}
            title="Sign Up"
            className="mt-10"
          />
          <View className="pb-safe-offset-2 my-4 flex-row items-center justify-center gap-1">
            <Text value="Already have an account?" />
            <Pressable onPress={() => navigation.navigate('Login')}>
              <Text className="font-semibold underline" value="Login" />
            </Pressable>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </Container>
  );
};

export default SignUpScreen;
