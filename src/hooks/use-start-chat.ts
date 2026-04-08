import * as Sentry from "@sentry/react-native";
import { useRouter } from "expo-router";
import { Alert } from "react-native";
import type { Channel, StreamChat } from "stream-chat";

type UseStartChatParams = {
    client: StreamChat;
    userId: string;
    setChannel: (channel: Channel) => void;
    setCreating: (value: string | null) => void;
};

const useStartChat = ({ client, userId, setChannel, setCreating }: UseStartChatParams) => {
    const router = useRouter();

    const handleStartChat = async (targetId: string) => {
        setCreating(targetId); //only for partciaular user

        try {
            const channel = client.channel("messaging", { members: [userId, targetId] });

            if (!client.userID) {
                console.log("Client disconnected, skipping channel watch");
                return;
            }

            await channel.watch();
            setChannel(channel);
            router.push(`/channel/${channel.cid}`);
        } catch (error) {
            console.log("Error creating chat:", error);
            if (error instanceof Error && error.message.includes("client.disconnect")) {
                return;
            }

            Sentry.captureException(error, {
                extra: {
                    userId,
                    action: "createChannel",
                    channelType: "messaging"
                }
            });
            Alert.alert("Error", "Could not create chat. Please try again.");
        } finally {
            setCreating(null);
        }
    };

    return { handleStartChat };
};

export default useStartChat;