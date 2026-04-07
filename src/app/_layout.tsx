import { ClerkProvider, useAuth } from '@clerk/expo';
import { tokenCache } from '@clerk/expo/token-cache';
import * as Sentry from '@sentry/react-native';
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from 'react';
import "../../global.css";

Sentry.init({
  dsn: 'https://aeb43652dc7fe2d9d7bb7769ea5ebcb0@o4511178199203840.ingest.us.sentry.io/4511180204277761',

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

    if (isSignedIn && inAuthGroup) {
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
      <InitialLayout />
    </ClerkProvider>
  )
}

export default Sentry.wrap(RootLayout);
