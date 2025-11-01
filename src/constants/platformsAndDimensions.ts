import { Dimensions, Platform } from 'react-native';

export const isAndroid = Platform.OS === 'android';

export const isIos = Platform.OS === 'ios';

export const deviceWidth = Dimensions.get('window').width;

export const deviceHeight = Dimensions.get('window').height;
