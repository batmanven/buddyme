import { StreamChat } from "stream-chat";

const API_KEY = process.env.EXPO_PUBLIC_STREAM_API_KEY as string;
const SECRET_KEY = process.env.STREAM_SECRET_KEY as string;

export async function POST(request: Request) {
    const clientt = StreamChat.getInstance(API_KEY, SECRET_KEY);

    const body = await request.json();

    const userId = body?.userId;

    if (!userId) {
        return Response.json({ error: "User ID is required" }, { status: 400 });
    }

    const token = clientt.createToken(userId);

    return Response.json({ token }, { status: 200 });
}