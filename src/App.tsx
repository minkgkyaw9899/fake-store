/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import './global.css';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './utils/queryClient';
import { useLogger } from '@react-navigation/devtools';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import RootStack from './navigation/rootStack';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { useRunOnStartupApp } from './hooks/useRunOnStartupApp';
import { useHandleTheme } from './hooks/useHandleTheme';

function App() {
  const isAppReady = useRunOnStartupApp();

  const { isDark } = useHandleTheme();

  console.log('isDarkMode', isDark);

  const navigationRef = useNavigationContainerRef();

  useLogger(navigationRef);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <GestureHandlerRootView>
          <SafeAreaProvider>
            <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
            <NavigationContainer ref={navigationRef}>
              <KeyboardProvider>
                {isAppReady ? <RootStack /> : null}
              </KeyboardProvider>
            </NavigationContainer>
          </SafeAreaProvider>
        </GestureHandlerRootView>
      </QueryClientProvider>
      <Toast />
    </>
  );
}

export default App;
