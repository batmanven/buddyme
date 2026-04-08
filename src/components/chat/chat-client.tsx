import { UserResource } from "@clerk/types";
import { useEffect, useRef } from "react";
import { STREAM_API_KEY, syncUserToStream } from "./chat-wrapper";

import { buddyMeTheme } from "@/lib/theme";
import * as Sentry from "@sentry/react-native";
import { Chat, OverlayProvider, useCreateChatClient } from "stream-chat-expo";
import { LoaderScreenFull } from "./loader-screen-full";

const ChatClient = ({ children, user }: { children: React.ReactNode, user: UserResource }) => {
    const syncedREFF = useRef(false)

    useEffect(() => {
        if (!syncedREFF.current) {
            syncedREFF.current = true
            syncUserToStream(user)
        }
    }, [user])

    const tokenProvider = async () => {
        try {
            const response = await fetch("/api/token", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId: user.id }),
            });
            const data = await response.json()
            return data.token
        } catch (error) {
            Sentry.logger.error("Failed to get Stream chat token", {
                userId: user.id,
                message: error instanceof Error ? error.message : String(error),
            });
            Sentry.captureException(error, { extra: { userId: user.id, hook: "tokenProvider" } });
        }
    }

    const chatClient = useCreateChatClient({
        apiKey: STREAM_API_KEY,
        userData: {
            id: user.id,
            name: user.fullName ?? user.username ?? user.emailAddresses[0].emailAddress.split("@")[0],
            image: user.imageUrl,
        },
        tokenOrProvider: tokenProvider,
    })

    if (!chatClient) return <LoaderScreenFull message="Loading chat..." />;

    return (
        <OverlayProvider value={{ style: buddyMeTheme }}>
            <Chat client={chatClient} style={buddyMeTheme}>
                {children}
            </Chat>
        </OverlayProvider>
    );

}

export default ChatClient