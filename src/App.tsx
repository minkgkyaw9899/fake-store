/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StatusBar, useColorScheme } from 'react-native';
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

function App() {
  const isAppReady = useRunOnStartupApp();

  const isDarkMode = useColorScheme() === 'dark';

  const navigationRef = useNavigationContainerRef();

  useLogger(navigationRef);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <GestureHandlerRootView>
          <SafeAreaProvider>
            <StatusBar
              barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            />
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
