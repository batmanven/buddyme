import { useUser } from "@clerk/expo";
// import type { UserResource } from "@clerk/types";
import React from 'react';
import ChatClient from './chat-client';
import { LoaderScreenFull } from "./loader-screen-full";

export const STREAM_API_KEY = process.env.EXPO_PUBLIC_STREAM_API_KEY!;

export const syncUserToStream = async (user: any) => {
    try {
        await fetch("/api/sync-user", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userId: user.id,
                name: user.fullName ?? user.username ?? user.emailAddresses[0].emailAddress.split("@")[0],
                image: user.imageUrl,
            })
        })
    } catch (error) {
        console.error("Failed to sync user to Stream", error);
    }
}

const ChatWrapper = ({ children }: { children: React.ReactNode }) => {

    const { user, isLoaded } = useUser()

    if (!isLoaded) return <LoaderScreenFull message="Loading chat..." />;

    if (!user) return <>{children}</>;

    return (
        <ChatClient user={user as any}>
            {children}
        </ChatClient>
    )
}

export default ChatWrapper