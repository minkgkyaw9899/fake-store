import React, { useRef } from 'react';
import ContainerWithTitle from '@/components/ContainerWithTitle';
import { Keyboard, TextInput, View } from 'react-native';
import { Input, PrimaryBottom, Text } from '@/components';
import { useEditProfile } from '../hooks/useEditProfile';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';

const EditProfileScreen = () => {
  const { control, isPending, handleUpdate } = useEditProfile();

  const firstNameRef = useRef<TextInput>(null);
  const lastNameRef = useRef<TextInput>(null);
  const usernameRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  return (
    <ContainerWithTitle className="px-0" title="Edit Profile">
      <KeyboardAwareScrollView
        extraKeyboardSpace={120}
        bottomOffset={120}
        contentContainerClassName="flex-grow gap-4 px-6"
      >
        <Text
          className="mb-4 mt-2 text-center text-2xl"
          value="Update Your Profile"
        />
        <View className="flex-row items-center justify-between">
          <View className="w-[46%]">
            <Input
              control={control}
              editable={!isPending}
              name="firstname"
              label="Fist name"
              autoCapitalize="words"
              ref={firstNameRef}
              onSubmitEditing={() => lastNameRef.current?.focus()}
            />
          </View>
          <View className="w-[46%]">
            <Input
              control={control}
              editable={!isPending}
              name="lastname"
              label="Last name"
              autoCapitalize="words"
              ref={lastNameRef}
              onSubmitEditing={() => usernameRef.current?.focus()}
            />
          </View>
        </View>
        <Input
          control={control}
          editable={!isPending}
          name="username"
          label="Username"
          ref={usernameRef}
          onSubmitEditing={() => emailRef.current?.focus()}
        />
        <Input
          control={control}
          editable={!isPending}
          name="email"
          label="Email address"
          keyboardType="email-address"
          ref={emailRef}
          onSubmitEditing={() => passwordRef.current?.focus()}
        />
        <Input
          control={control}
          editable={!isPending}
          name="password"
          label="Password"
          isPassword
          ref={passwordRef}
          onSubmitEditing={() => Keyboard.dismiss()}
        />

        <View className="my-8">
          <PrimaryBottom
            title="Update"
            disabled={isPending}
            isLoading={isPending}
            onPress={handleUpdate}
          />
        </View>
      </KeyboardAwareScrollView>
    </ContainerWithTitle>
  );
};

export default EditProfileScreen;
