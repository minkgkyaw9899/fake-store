import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStack from './authStack';
import { useAuthStore } from '@/stores/useAuthStore';
import HomeTabs from './HomeTabs';

export type RootStackParamList = {
  Auth: undefined;
  Home: undefined;
};
const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStack = () => {
  const isAuth = useAuthStore.use.isAuth();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {isAuth ? (
        <Stack.Screen name="Auth" component={AuthStack} />
      ) : (
        <Stack.Screen name="Home" component={HomeTabs} />
      )}
    </Stack.Navigator>
  );
};

export default RootStack;
