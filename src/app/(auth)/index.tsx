import useSocialAuth from '@/hooks/use-social-auth';
import { Ionicons } from "@expo/vector-icons";
import { Image } from 'expo-image';
import { LinearGradient } from "expo-linear-gradient";
import React from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SocialButton = ({
    label,
    icon,
    image,
    onPress,
    loading,
    variant = "dark"
}: any) => {
    return (
        <Pressable
            onPress={onPress}
            disabled={loading}
            style={({ pressed }) => ({
                transform: [{ scale: pressed ? 0.96 : 1 }],
                opacity: pressed ? 0.85 : 1,
            })}
            className={`h-14 rounded-2xl flex-row items-center justify-center gap-3 px-4
                ${variant === "light"
                    ? "bg-white"
                    : "bg-white/5 border border-white/10"}
            `}
        >
            {loading ? (
                <ActivityIndicator size="small" color="#8B5CF6" />
            ) : image ? (
                <Image source={image} style={{ width: 22, height: 22 }} />
            ) : (
                <Ionicons name={icon} size={20} color="#fff" />
            )}

            <Text className={`font-semibold ${variant === "light" ? "text-black" : "text-white"}`}>
                {label}
            </Text>
        </Pressable>
    );
};

const FeatureChip = ({ icon, label, color }: any) => (
    <View className="flex-row items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/15">
        <Ionicons name={icon} size={14} color={color} />
        <Text className="text-xs text-white/80 font-medium">{label}</Text>
    </View>
);

const AuthScreen = () => {

    const { handleSocialAuth, loadingStrategy } = useSocialAuth();
    const isLoading = loadingStrategy !== null;

    return (
        <View className="flex-1 bg-black">

            <View className="absolute inset-0">
                <LinearGradient
                    colors={["#030303", "#0B0B12", "#030303"]}
                    style={{ position: "absolute", width: "100%", height: "100%" }}
                />

                <View style={{
                    position: "absolute",
                    top: -120,
                    left: -80,
                    width: 320,
                    height: 320,
                    borderRadius: 320,
                    backgroundColor: "#7C3AED",
                    opacity: 0.25,
                }} />

                <View style={{
                    position: "absolute",
                    bottom: -140,
                    right: -60,
                    width: 300,
                    height: 300,
                    borderRadius: 300,
                    backgroundColor: "#2563EB",
                    opacity: 0.2,
                }} />

                <View style={{
                    position: "absolute",
                    top: "35%",
                    left: "20%",
                    width: 250,
                    height: 250,
                    borderRadius: 250,
                    backgroundColor: "#EC4899",
                    opacity: 0.12,
                }} />

                <LinearGradient
                    colors={["transparent", "#000"]}
                    style={{ position: "absolute", width: "100%", height: "100%" }}
                />
            </View>

            <SafeAreaView className="flex-1 justify-between px-6">

                <View className="items-center mt-10">

                    <Text
                        style={{
                            fontSize: 42,
                            fontWeight: "800",
                            color: "white",
                            textShadowColor: "rgba(124,58,237,0.8)",
                            textShadowRadius: 18,
                        }}
                    >
                        BuddyMe
                    </Text>

                    <Text className="text-white/60 text-sm mt-2">
                        Learn together. Grow faster.
                    </Text>

                    <View className="mt-8 items-center">
                        <View className="absolute w-72 h-72 bg-purple-600/20 rounded-full blur-3xl" />
                        <Image
                            source={require("@/assets/images/auth.png")}
                            style={{ width: 280, height: 280 }}
                            contentFit="contain"
                        />
                    </View>

                    <View className="mt-6 items-center">

                        <Text className="text-white text-base font-semibold">
                            Find your study circle
                        </Text>

                        <Text className="text-white/50 text-xs mt-1 text-center px-8">
                            Connect, collaborate, and stay consistent
                        </Text>

                        <View className="flex-row flex-wrap justify-center gap-3 mt-4">
                            <FeatureChip icon="videocam" label="Video Calls" color="#A78BFA" />
                            <FeatureChip icon="chatbubbles" label="Study Rooms" color="#FB7185" />
                            <FeatureChip icon="people" label="Partners" color="#34D399" />
                        </View>

                    </View>
                </View>

                <View className="mb-6">

                    <Text className="text-center text-white/40 text-xs mb-5 tracking-widest">
                        CONTINUE WITH
                    </Text>

                    <View className="gap-3">

                        <SocialButton
                            label="Continue with Google"
                            image={require("../../../assets/images/google.png")}
                            variant="light"
                            loading={loadingStrategy === "oauth_google"}
                            onPress={() => !isLoading && handleSocialAuth("oauth_google")}
                        />

                        <SocialButton
                            label="Continue with LinkedIn"
                            icon="logo-linkedin"
                            loading={loadingStrategy === "oauth_linkedin"}
                            onPress={() => !isLoading && handleSocialAuth("oauth_linkedin")}
                        />

                        <SocialButton
                            label="Continue with GitHub"
                            icon="logo-github"
                            loading={loadingStrategy === "oauth_github"}
                            onPress={() => !isLoading && handleSocialAuth("oauth_github")}
                        />

                    </View>

                    <Text className="text-white/40 text-[11px] text-center mt-5 leading-4">
                        By continuing, you agree to our{" "}
                        <Text className="text-violet-400">Terms</Text> and{" "}
                        <Text className="text-violet-400">Privacy Policy</Text>
                    </Text>

                </View>

            </SafeAreaView>
        </View>
    );
};

export default AuthScreen;