import { useAuth } from "@clerk/expo";
import { Redirect } from "expo-router";
import { ActivityIndicator, Pressable, Text, View } from "react-native";

export default function Index() {

  const { isSignedIn, isLoaded, signOut } = useAuth()

  if (!isLoaded) {
    return (
      <ActivityIndicator className="flex-1 items-center justify-center bg-white" />
    );
  }

  if (!isSignedIn) {
    return <Redirect href={'/(auth)'} />
  }

  return (
    <View className="flex-1 items-center justify-center bg-white px-6">
      <Text className="text-3xl font-bold text-red-500">NativeWind is working!</Text>
      <Text className="text-lg mt-4 text-center">Edit src/app/index.tsx to edit this screen.</Text>

      <Pressable
        onPress={() => signOut()}
        className="mt-10 bg-red-500 px-8 py-4 rounded-2xl active:opacity-80"
      >
        <Text className="font-bold text-white text-lg">Sign Out</Text>
      </Pressable>
    </View>
  );
}
