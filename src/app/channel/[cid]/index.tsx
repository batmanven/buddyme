import { useAppContext } from '@/contexts/app-provider'
import { COLORS } from '@/lib/theme'
import { useHeaderHeight } from '@react-navigation/elements'
import { useNavigation, useRouter } from 'expo-router'
import React, { useLayoutEffect } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { Channel, MessageInput, MessageList, useChatContext } from 'stream-chat-expo'

import { EmptyState } from '@/components/chat/empty-sttate'
import { LoaderScreenFull } from '@/components/chat/loader-screen-full'
import { Ionicons } from "@expo/vector-icons"
import { Image } from 'expo-image'

const ChannelScreen = () => {

    const { channel, setThread } = useAppContext()
    const { client } = useChatContext()


    const router = useRouter();
    const navigation = useNavigation();

    const headerHeight = useHeaderHeight();

    let displayName = "";
    let avatarUrl = "";

    if (channel) {
        const members = Object.values(channel.state.members)
        // fnind the other member
        const otherMember = members.find((member) => member.user_id !== client.userID);
        displayName = otherMember?.user?.name!;
        avatarUrl = otherMember?.user?.image || "";
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerStyle: {
                backgroundColor: COLORS.surface,
            },
            headerTintColor: COLORS.text,
            headerLeft: () => (
                <TouchableOpacity onPress={() => router.back()} className="ml-2 flex-row items-center">
                    <Ionicons name="arrow-back" size={24} color={COLORS.text} />
                </TouchableOpacity>
            ),
            headerTitle: () => (
                <View className="flex-row items-center">
                    {avatarUrl ? (
                        <Image
                            source={avatarUrl}
                            style={{ width: 32, height: 32, borderRadius: 16, marginRight: 10 }}
                        />
                    ) : (
                        <View
                            className="mr-2.5 h-8 w-8 items-center justify-center rounded-full"
                            style={{ backgroundColor: COLORS.primary }}
                        >
                            <Text className="text-base font-semibold text-foreground">
                                {displayName.charAt(0).toUpperCase()}
                            </Text>
                        </View>
                    )}
                    <Text className="font-semibold text-foreground">{displayName}</Text>
                </View>
            ),
            headerRight: () => (
                <TouchableOpacity
                    onPress={() => {
                        router.push({
                            pathname: "/call/[callId]",
                            params: { callId: channel?.id! },
                        });
                    }}
                >
                    <Ionicons name="videocam-outline" size={24} color={COLORS.primary} />
                </TouchableOpacity>
            ),
        })
    }, [navigation, displayName, avatarUrl, channel?.cid, channel?.id, router]);

    if (!channel) return <LoaderScreenFull message="Loading study room..." />;

    return (
        <View className="flex-1 bg-border">
            <Channel
                channel={channel}
                keyboardVerticalOffset={headerHeight}
                EmptyStateIndicator={() => (
                    <EmptyState
                        icon="book-outline"
                        title="No messages yet"
                        subtitle="Start a study conversation!"
                    />
                )}
            >
                <MessageList
                    onThreadSelect={(thread) => {
                        setThread(thread);
                        router.push(`/channel/${channel.cid}/thread/${thread?.cid}`);
                    }}
                />

                <View className="pb-5 bg-surface">
                    <MessageInput audioRecordingEnabled />
                </View>
            </Channel>
        </View>
    )
}

export default ChannelScreen