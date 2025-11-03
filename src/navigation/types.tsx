import { OrderProduct } from '@/app/product/screens/OrderProductsScreen';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Home: NavigatorScreenParams<HomeTabParamList>;
  ProductDetail: {
    id: number;
    image: string;
    title: string;
  };
  OrderProducts: {
    orders: OrderProduct[];
  };
  OrderSuccess: undefined;
  ChangeTheme: undefined;
  EditProfile: undefined;
  MyProductsList: undefined;
  UpdateMyProduct: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export type HomeTabParamList = {
  ProductsList: undefined;
  MyProfile: undefined;
  Cart: undefined;
};

export type HomeTabScreenProps<T extends keyof HomeTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<HomeTabParamList, T>,
    RootStackScreenProps<'Home'>
  >;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
