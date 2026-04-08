import { useAppContext } from '@/contexts/app-provider';
import { COLORS } from '@/lib/theme';
import { getGreetingForHour } from '@/lib/utils';
import { useUser } from '@clerk/expo';
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import type { Channel } from "stream-chat";
import { ChannelList } from 'stream-chat-expo';



const ChatScreen = () => {

    const [search, setSearch] = useState("")
    const router = useRouter()
    const { user } = useUser()

    const { setChannel } = useAppContext()

    const firstName = user?.firstName || "there";

    const filters = { members: { $in: [user?.id!] }, type: "messaging" };

    const channelFilter = (channels: Channel[]) => {
        if (!search.trim()) return channels;

        const query = search.toLowerCase();

        return channels.filter((channel) => {
            const name = (channel.data?.name as string | undefined)?.toLowerCase() ?? "";
            const cid = channel.cid.toLowerCase();
            return name.includes(query) || cid.includes(query);
        });
    }

    const EmptyChatState = () => (
        <View className="flex-1 items-center justify-center px-8 pb-20">
            <View className="w-24 h-24 bg-primary/10 rounded-[32px] items-center justify-center mb-8 rotate-3">
                <View className="absolute inset-0 bg-primary/5 rounded-[32px] -rotate-6" />
                <Ionicons name="chatbubbles-outline" size={48} color={COLORS.primaryLight} />
            </View>

            <Text className="text-2xl font-bold text-foreground text-center mb-3 tracking-tight">
                No study circles yet
            </Text>

            <Text className="text-[15px] text-foreground-muted text-center leading-6 mb-10 px-4">
                You haven't joined any study rooms. Connect with others to start collaborating on your projects!
            </Text>

            <Pressable
                className="bg-primary px-10 py-4 rounded-2xl shadow-xl shadow-primary/30 active:opacity-90"
                style={({ pressed }) => ({
                    transform: [{ scale: pressed ? 0.98 : 1 }]
                })}
                onPress={() => router.push('/explore')}
            >
                <Text className="text-white font-bold text-base">Find a Chat</Text>
            </Pressable>
        </View>
    );


    return (
        <SafeAreaView className="flex-1 bg-background">
            <View className="px-5 pt-3 pb-2">
                <Text className="text-sm text-foreground-muted mb-0.5">
                    {getGreetingForHour()}, {firstName}
                </Text>
            </View>

            <View className="flex-row items-center bg-surface mx-5 mb-3 px-3.5 py-3 rounded-[14px] gap-2.5 border border-border">
                <Ionicons name="search" size={18} color={COLORS.textMuted} />
                <TextInput
                    className="flex-1 text-[15px] text-foreground"
                    placeholder="Search study rooms..."
                    placeholderTextColor={COLORS.textMuted}
                    value={search}
                    onChangeText={setSearch}
                />
            </View>

            <View className="flex-row items-center px-5 my-1.5 gap-2">
                <Ionicons name="chatbubbles" size={16} color={COLORS.primaryLight} />
                <Text className="text-[15px] font-semibold text-primary-light">Your Study Sessions</Text>
            </View>

            <ChannelList
                filters={filters}
                // state:true will fetch initial full data of the channel and watch:true will keep the channel updated with the latest data
                options={{ state: true, watch: true }}
                sort={{ last_updated: -1 }}
                channelRenderFilterFn={channelFilter}
                onSelect={(channel) => {
                    setChannel(channel);
                    // router.push(`/channel/${channel.id}`);
                }}
                additionalFlatListProps={{
                    contentContainerStyle: { flexGrow: 1 },
                }}
                EmptyStateIndicator={EmptyChatState}
            />

        </SafeAreaView>
    )
}

export default ChatScreen;