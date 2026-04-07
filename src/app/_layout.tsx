import { ClerkProvider, useAuth } from '@clerk/expo';
import { tokenCache } from '@clerk/expo/token-cache';
import { Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from 'react';
import "../../global.css";

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

export default function RootLayout() {
  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <InitialLayout />
    </ClerkProvider>
  )
}
