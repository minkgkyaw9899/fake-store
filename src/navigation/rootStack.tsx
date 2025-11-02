import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuthStore } from '@/stores/useAuthStore';
import { RootStackParamList } from './types';
import { lazy } from 'react';
import { LayoutScreen } from '@/components';

const HomeTabs = lazy(() => import('./HomeTabs'));
const AuthStack = lazy(() => import('./authStack'));

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStack = () => {
  const isAuth = useAuthStore.use.isAuth();

  return (
    <Stack.Navigator
      screenLayout={LayoutScreen}
      screenOptions={{
        headerShown: false,
      }}
    >
      {isAuth ? (
        <Stack.Screen name="Home" component={HomeTabs} />
      ) : (
        <>
          <Stack.Screen name="Auth" component={AuthStack} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default RootStack;
