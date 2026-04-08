import * as Sentry from "@sentry/react-native";
import { StreamChat } from "stream-chat";

const API_KEY = process.env.EXPO_PUBLIC_STREAM_API_KEY as string;
const SECRET_KEY = process.env.STREAM_SECRET_KEY as string;

export async function name(request: Request) {
    const clientt = StreamChat.getInstance(API_KEY, SECRET_KEY);
    const body = await request.json()

    const { userId, name, image } = body

    if (!userId) {
        return Response.json({ error: "User ID is required" }, { status: 400 })
    }

    try {
        await clientt.upsertUser({
            id: userId,
            name: name || "Guest",
            image: image,
        })

        return Response.json({ success: true, userId });

    } catch (error) {
        console.error("Error syncing user to Stream:", error);
        Sentry.captureException(error, {
            extra: { userId, name, image },
        });

        return Response.json({ error: "Failed to sync user" }, { status: 500 });
    }
}