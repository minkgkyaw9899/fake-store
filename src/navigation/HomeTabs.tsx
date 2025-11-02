import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeTabParamList } from './types';
import ProductsListScreen from '@/app/home/screens/ProductsListScreen';
import MyProfileScreen from '@/app/home/screens/MyProfileScreen';

const Tab = createBottomTabNavigator<HomeTabParamList>();

const HomeTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'shift',
      }}
    >
      <Tab.Screen
        name="ProductsList"
        options={{
          tabBarLabel: 'Home',
          tabBarIcon() {
            return null;
          },
        }}
        component={ProductsListScreen}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon() {
            return null;
          },
        }}
        name="MyProfile"
        component={MyProfileScreen}
      />
    </Tab.Navigator>
  );
};

export default HomeTabs;
