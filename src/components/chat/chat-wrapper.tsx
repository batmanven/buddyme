import { useUser } from "@clerk/expo";
// import type { UserResource } from "@clerk/types";
import React from 'react';
import ChatClient from './chat-client';
import { LoaderScreenFull } from "./loader-screen-full";

import { syncUserToStream } from '@/lib/stream';

const ChatWrapper = ({ children }: { children: React.ReactNode }) => {

    const { user, isLoaded } = useUser()

    if (!isLoaded) return <LoaderScreenFull message="Loading chats..." />;

    if (!user) return <>{children}</>;

    return (
        <ChatClient user={user as any}>
            {children}
        </ChatClient>
    )
}

export default ChatWrapper