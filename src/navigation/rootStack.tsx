import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuthStore } from '@/stores/useAuthStore';
import { RootStackParamList } from './types';
import { lazy } from 'react';
import { LayoutScreen } from '@/components';
import ProductDetailScreen from '@/app/product/screens/ProductDetailScreen';
import OrderProductsScreen from '@/app/product/screens/OrderProductsScreen';
import OrderSuccessScreen from '@/app/product/screens/OrderSuccessScreen';
import LoginScreen from '@/app/auth/screens/LoginScreen';
import SignUpScreen from '@/app/auth/screens/SignUpScreen';
import ChangeThemeScreen from '@/app/profile/screens/ChangeThemeScreen';
import EditProfileScreen from '@/app/profile/screens/EditProfileScreen';
import MyProductsListScreen from '@/app/profile/screens/MyProductsListScreen';
import CreateNewProductScreen from '@/app/product/screens/CreateNewProductScreen';

const HomeTabs = lazy(() => import('./HomeTabs'));

const UpdateProductByIdScreen = lazy(
  () => import('@/app/product/screens/UpdateProductByIdScreen'),
);

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
        <Stack.Group>
          <Stack.Screen name="Home" component={HomeTabs} />
          <Stack.Screen name="ChangeTheme" component={ChangeThemeScreen} />
          <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
          <Stack.Screen name="OrderProducts" component={OrderProductsScreen} />
          <Stack.Screen name="OrderSuccess" component={OrderSuccessScreen} />
          <Stack.Screen name="EditProfile" component={EditProfileScreen} />
          <Stack.Screen
            name="MyProductsList"
            component={MyProductsListScreen}
          />
          <Stack.Screen
            name="UpdateMyProductById"
            component={UpdateProductByIdScreen}
          />
          <Stack.Screen
            name="CreateNewProduct"
            component={CreateNewProductScreen}
          />
        </Stack.Group>
      ) : (
        <Stack.Group>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignUpScreen} />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};

export default RootStack;
