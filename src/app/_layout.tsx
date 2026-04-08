import ChatWrapper from '@/components/chat/chat-wrapper';
import { AppProvider } from '@/contexts/app-provider';
import { ClerkProvider, useAuth } from '@clerk/expo';
import { tokenCache } from '@clerk/expo/token-cache';
import * as Sentry from '@sentry/react-native';
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from 'react';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "../../global.css";

Sentry.init({
  dsn: process.env.EXPO_PUBLIC_SENTRY_DSN,

  sendDefaultPii: true,

  enableLogs: true,

  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [Sentry.mobileReplayIntegration(), Sentry.feedbackIntegration()],
});

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!

if (!publishableKey) {
  throw new Error('Add your Clerk Publishable Key to the .env file')
}

function InitialLayout() {
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;

    const inAuthGroup = segments[0] === '(auth)';
    const inTabsGroup = segments[0] === '(tabs)';

    if (isSignedIn && !inTabsGroup) {
      router.replace('/(tabs)');
    } else if (!isSignedIn && !inAuthGroup) {
      router.replace('/(auth)');
    }
  }, [isSignedIn, isLoaded]);

  return <Stack screenOptions={{ headerShown: false }}>
    <Stack.Screen name='(auth)' />
    <Stack.Screen name='(tabs)' />
  </Stack>;
}

function RootLayout() {
  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <GestureHandlerRootView className='flex-1'>
        <ChatWrapper>
          <AppProvider>
            <InitialLayout />
          </AppProvider>
        </ChatWrapper>
      </GestureHandlerRootView>
    </ClerkProvider>
  )
}

export default Sentry.wrap(RootLayout);
