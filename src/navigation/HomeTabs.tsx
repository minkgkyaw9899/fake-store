import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { lazy } from 'react';

const ProductsListScreen = lazy(
  () => import('@/app/home/screens/ProductsListScreen'),
);
const MyProfileScreen = lazy(
  () => import('@/app/home/screens/MyProfileScreen'),
);

export type HomeTabParamList = {
  ProductsList: undefined;
  MyProfile: undefined;
};

const Tab = createBottomTabNavigator<HomeTabParamList>();

const HomeTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="ProductsList" component={ProductsListScreen} />
      <Tab.Screen name="MyProfile" component={MyProfileScreen} />
    </Tab.Navigator>
  );
};

export default HomeTabs;
