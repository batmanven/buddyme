import { Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-3xl font-bold text-red-500">NativeWind is working!</Text>
      <Text className="text-lg mt-4">Edit src/app/index.tsx to edit this screen.</Text>
    </View>
  );
}
