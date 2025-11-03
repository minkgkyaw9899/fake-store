import { onlineManager, QueryClient } from '@tanstack/react-query';
import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';
import Toast from 'react-native-toast-message';

onlineManager.setEventListener(setOnline => {
  return NetInfo.addEventListener(state => {
    setOnline(!!state.isConnected);
  });
});

const errorHandler = (error: unknown) => {
  let message = 'Something went wrong';
  if (axios.isAxiosError(error)) {
    if (error.response) {
      // backend custom error
      message = error.response.data?.meta?.message || 'Server error';
    } else if (error.request) {
      // network error or timeout
      message = 'Network error or request timed out';
    } else {
      // request setup error
      message = error.message;
    }
  } else if (error instanceof Error) {
    message = error.message;
  }

  Toast.show({ type: 'error', text1: message });
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      throwOnError(error) {
        errorHandler(error);
        return false;
      },
    },
    mutations: {
      onError: error => {
        errorHandler(error);
      },
    },
  },
});
