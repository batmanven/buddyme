import { EmptyState } from "@/components/chat/empty-sttate";
import { LoaderScreenFull } from "@/components/chat/loader-screen-full";
import { useAppContext } from "@/contexts/app-provider";
import { useHeaderHeight } from "@react-navigation/elements";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Channel, Thread } from "stream-chat-expo";

const ThreadScreen = () => {
  const { channel, thread, setThread } = useAppContext();
  const headerHeight = useHeaderHeight();

  if (channel === null) return <LoaderScreenFull message="Loading thread..." />;

  return (
    <SafeAreaView className="flex-1 bg-surface">
      <Channel
        channel={channel}
        keyboardVerticalOffset={headerHeight}
        thread={thread}
        threadList
        EmptyStateIndicator={() => (
          <EmptyState
            icon="book-outline"
            title="No messages yet"
            subtitle="Start a study conversation!"
          />
        )}
      >
        <View className="flex-1 justify-start">
          <Thread onThreadDismount={() => setThread(null)} />
        </View>
      </Channel>
    </SafeAreaView>
  );
};

export default ThreadScreen;