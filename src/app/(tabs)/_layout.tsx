import { Tabs } from 'expo-router';
import { NativeTabs } from 'expo-router/unstable-native-tabs';
import { Compass, MessageSquare, User } from 'lucide-react-native';
import { Platform, Pressable, View } from 'react-native';

const CustomAndroidTabBar = ({ state, descriptors, navigation }: any) => {
    return (
        <View className="absolute bottom-6 left-6 right-6">
            <View
                className="flex-row h-16 rounded-3xl border border-white/20 overflow-hidden shadow-2xl bg-white/20"
                style={{ elevation: 8 }}
            >
                {state.routes.map((route: any, index: number) => {
                    const isFocused = state.index === index;

                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name);
                        }
                    };

                    let Icon = MessageSquare;
                    if (route.name === "explore") Icon = Compass;
                    if (route.name === "profile") Icon = User;

                    return (
                        <Pressable
                            key={route.name}
                            onPress={onPress}
                            className="flex-1 items-center justify-center"
                        >
                            <View className={`p-2.5 rounded-2xl ${isFocused ? 'bg-primary' : ''}`}>
                                <Icon
                                    size={22}
                                    color={isFocused ? '#FFFFFF' : '#A7A9BE'}
                                    strokeWidth={isFocused ? 2.5 : 2}
                                />
                            </View>
                            {isFocused && (
                                <View className="absolute bottom-2 w-1 h-1 rounded-full bg-primary" />
                            )}
                        </Pressable>
                    );
                })}
            </View>
        </View>
    );
};

export default function TabLayout() {
    if (Platform.OS === 'ios') {
        return (
            <NativeTabs>
                <NativeTabs.Trigger name="index">
                    <NativeTabs.Trigger.Label>Chats</NativeTabs.Trigger.Label>
                    <NativeTabs.Trigger.Icon sf="message.fill" md="chat" selectedColor={"#6C5CE7"} />
                </NativeTabs.Trigger>
                <NativeTabs.Trigger name="explore">
                    <NativeTabs.Trigger.Label>Explore</NativeTabs.Trigger.Label>
                    <NativeTabs.Trigger.Icon sf="safari" md="explore" selectedColor={"#6C5CE7"} />
                </NativeTabs.Trigger>
                <NativeTabs.Trigger name="profile">
                    <NativeTabs.Trigger.Label>Profile</NativeTabs.Trigger.Label>
                    <NativeTabs.Trigger.Icon sf="person.fill" md="person" selectedColor={"#6C5CE7"} />
                </NativeTabs.Trigger>
            </NativeTabs>
        );
    }

    return (
        <Tabs
            tabBar={(props) => <CustomAndroidTabBar {...props} />}
            screenOptions={{
                headerShown: false,
            }}
        >
            <Tabs.Screen name="index" options={{ title: 'Chats' }} />
            <Tabs.Screen name="explore" options={{ title: 'Explore' }} />
            <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
        </Tabs>
    );
}