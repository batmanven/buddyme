import { COLORS } from "@/lib/theme";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

export default function ListEmptyComponent() {
    return (
        <View className="flex-1 items-center justify-center pt-20">
            <Ionicons name="people-outline" size={40} color={COLORS.textSubtle} />
            <Text className="text-base font-medium text-foreground-muted mt-3">
                No users found
            </Text>
        </View>
    );
}