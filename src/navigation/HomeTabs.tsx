import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeTabParamList } from './types';
import ProductsListScreen from '@/app/home/screens/ProductsListScreen';
import MyProfileScreen from '@/app/home/screens/MyProfileScreen';
import { COLORS } from '@/constants/color';
import {
  Ionicons,
  IoniconsIconName,
} from '@react-native-vector-icons/ionicons';
import { Text } from '@/components';
import Animated from 'react-native-reanimated';
import { useHandleTheme } from '@/hooks/useHandleTheme';
import CartScreen from '@/app/home/screens/CartScreen';

const Tab = createBottomTabNavigator<HomeTabParamList>();

type TabBarIconProps = {
  focused: boolean;
  color: string;
  size: number;
  routeName: keyof HomeTabParamList;
};

const CustomTabBarIcon = ({
  focused,
  color,
  size,
  routeName,
}: TabBarIconProps) => {
  let iconName: IoniconsIconName = 'alert-circle';
  switch (routeName) {
    case 'ProductsList':
      iconName = focused ? 'home' : 'home-outline';
      break;
    case 'MyProfile':
      iconName = focused ? 'person' : 'person-outline';
      break;
    case 'Cart':
      iconName = focused ? 'cart' : 'cart-outline';
      break;
    default:
      iconName = 'alert-circle';
  }
  return <Ionicons name={iconName} size={size} color={color} />;
};

type CustomTabBarLabelProps = {
  name: string;
  focused: boolean;
};

const CustomTabBarLabel = ({ name, focused }: CustomTabBarLabelProps) => {
  return focused ? <Text value={name} className="text-lg font-bold" /> : null;
};

const ProductTabBarLabel = ({
  focused,
}: Omit<CustomTabBarLabelProps, 'name'>) => (
  <CustomTabBarLabel focused={focused} name="Home" />
);

const CartTabBarLabel = ({ focused }: Omit<CustomTabBarLabelProps, 'name'>) => (
  <CustomTabBarLabel focused={focused} name="Cart" />
);

const ProfileTabBarLabel = ({
  focused,
}: Omit<CustomTabBarLabelProps, 'name'>) => (
  <CustomTabBarLabel focused={focused} name="Profile" />
);

const ProductsTabBarIcon = ({
  focused,
  color,
  size,
}: Omit<TabBarIconProps, 'routeName'>) => (
  <CustomTabBarIcon
    routeName="ProductsList"
    focused={focused}
    color={color}
    size={size}
  />
);

const ProfileTabBarIcon = ({
  focused,
  color,
  size,
}: Omit<TabBarIconProps, 'routeName'>) => (
  <CustomTabBarIcon
    routeName="MyProfile"
    focused={focused}
    color={color}
    size={size}
  />
);

const CartTabBarIcon = ({
  focused,
  color,
  size,
}: Omit<TabBarIconProps, 'routeName'>) => (
  <CustomTabBarIcon
    routeName="Cart"
    focused={focused}
    color={color}
    size={size}
  />
);

const HomeTabs = () => {
  const { isDark } = useHandleTheme();
  return (
    <Animated.View className={'flex-1'}>
      <Tab.Navigator
        screenOptions={({}) => ({
          headerShown: false,
          animation: 'shift',
          tabBarActiveTintColor: isDark ? COLORS.WHITE : COLORS.SLATE_800,
          tabBarInactiveTintColor: isDark ? COLORS.SLATE_100 : COLORS.SLATE_500,
          tabBarLabelPosition: 'beside-icon',
          tabBarStyle: {
            backgroundColor: isDark ? COLORS.SLATE_600 : COLORS.SLATE_100,
          },
        })}
      >
        <Tab.Screen
          name="ProductsList"
          options={{
            tabBarIcon: ProductsTabBarIcon,
            tabBarLabel: ProductTabBarLabel,
          }}
          component={ProductsListScreen}
        />
        <Tab.Screen
          options={{
            tabBarBadge: 10,
            tabBarIcon: CartTabBarIcon,
            tabBarLabel: CartTabBarLabel,
            tabBarItemStyle: { display: 'none' },
          }}
          name="Cart"
          component={CartScreen}
        />
        <Tab.Screen
          options={{
            tabBarIcon: ProfileTabBarIcon,
            tabBarLabel: ProfileTabBarLabel,
          }}
          name="MyProfile"
          component={MyProfileScreen}
        />
      </Tab.Navigator>
    </Animated.View>
  );
};

export default HomeTabs;
