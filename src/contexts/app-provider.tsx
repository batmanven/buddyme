import React, { useState } from "react";
import { Channel, LocalMessage } from "stream-chat";

type AppContextType = {
    channel: Channel | null;
    setChannel: (channel: Channel | null) => void;
    thread: LocalMessage | null;
    setThread: (thread: LocalMessage | null) => void;
}

export const AppContext = React.createContext<AppContextType>({
    channel: null,
    setChannel: (channel) => { },
    thread: null,
    setThread: (channel) => { },
});

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    const [channel, setChannel] = useState<Channel | null>(null);
    const [thread, setThread] = useState<LocalMessage | null>(null);

    return (
        <AppContext.Provider value={{ channel, setChannel, thread, setThread }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => React.useContext(AppContext);