import React, { useEffect } from 'react';
import { Container, SecondaryBottom, Text } from '@/components';
import { useAuthStore } from '@/stores/useAuthStore';
import { deleteToken } from '@/utils/keyChainService';
import { ScrollView, View } from 'react-native';
import AvatarIcon from '@/assets/svg/avatar.svg';
import { useUserStore } from '@/stores/useUserInfoStore';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/queryKey';
import { useIsFocused } from '@react-navigation/native';
import { getUserById } from '@/app/auth/services/getUserById';
import { ProfileListItem } from '../components/ProfileListItem';
import { HomeTabScreenProps } from '@/navigation/types';

type Props = HomeTabScreenProps<'MyProfile'>;

const MyProfileScreen = ({ navigation }: Props) => {
  const userInfo = useUserStore.use.authUser();
  const setAuthUser = useUserStore.use.setAuthUser();

  const isFocused = useIsFocused();
  const { data, isSuccess } = useQuery({
    queryKey: [QUERY_KEYS.USERS, userInfo?.id],
    subscribed: isFocused && !!userInfo?.id,
    enabled: !!userInfo?.id,
    queryFn: async () => getUserById(userInfo?.id!),
    initialData: { data: userInfo!, meta: { status: 200, message: 'success' } },
  });

  useEffect(() => {
    if (isSuccess && data.data) {
      setAuthUser(data.data);
    }
  }, [data.data, isSuccess, setAuthUser]);

  const resetToken = useAuthStore.use.reset();

  const handleLogout = async () => {
    await deleteToken();
    resetToken();
    setAuthUser(undefined);
  };
  return (
    <Container className="px-0" saveAreaViewProps={{ edges: ['top'] }}>
      <View className="pt-safe flex-1">
        <Text className="px-6 text-2xl font-semibold" value="My Account" />
        <ScrollView contentContainerClassName="flex-grow px-6">
          <View className="my-8 items-center justify-center">
            <AvatarIcon width={120} height={120} />

            {userInfo && (
              <View className="my-4">
                <Text
                  className="text-center text-2xl font-bold capitalize"
                  value={`${userInfo.name.firstname} ${userInfo.name.lastname}`}
                />
                <Text className="text-lg font-bold" value={userInfo.email} />
              </View>
            )}
          </View>

          <View className="flex-1 gap-8">
            <ProfileListItem
              onPress={() => navigation.navigate('MyProductsList')}
              iconName="bag-add-outline"
              title="My Products"
            />
            <ProfileListItem
              onPress={() => navigation.navigate('EditProfile')}
              iconName="person-add-outline"
              title="Edit Profile"
            />
            <ProfileListItem
              onPress={() => navigation.navigate('ChangeTheme')}
              iconName="moon-outline"
              title="Change Theme"
            />
          </View>

          <View className="mb-safe-offset-4">
            <SecondaryBottom
              onPress={handleLogout}
              iconName="log-out"
              title="Logout"
            />
          </View>
        </ScrollView>
      </View>
    </Container>
  );
};

export default MyProfileScreen;
