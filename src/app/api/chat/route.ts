import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET all chat messages
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userType = searchParams.get("userType"); // "admin" or "student"
    const userId = searchParams.get("userId");
    
    let messages;
    
    if (userType === "admin") {
      // Admin sees all messages
      messages = await db.chatMessage.findMany({
        orderBy: { createdAt: "asc" },
        take: 100,
      });
    } else if (userType === "student" && userId) {
      // Student sees their own messages and admin responses
      messages = await db.chatMessage.findMany({
        where: {
          OR: [
            { senderId: userId, senderType: "student" },
            { receiverId: userId, receiverType: "student" },
            { receiverType: "broadcast" },
          ],
        },
        orderBy: { createdAt: "asc" },
        take: 100,
      });
    } else {
      messages = await db.chatMessage.findMany({
        orderBy: { createdAt: "asc" },
        take: 100,
      });
    }
    
    return NextResponse.json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
  }
}

// POST new message
export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { content, senderType, senderId, senderName, receiverType, receiverId } = data;
    
    if (!content || !senderType || !senderId || !senderName) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    
    const message = await db.chatMessage.create({
      data: {
        content,
        senderType,
        senderId,
        senderName,
        receiverType: receiverType || "admin",
        receiverId,
        isRead: false,
      },
    });
    
    return NextResponse.json(message);
  } catch (error) {
    console.error("Error creating message:", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}

// PATCH mark messages as read
export async function PATCH(request: NextRequest) {
  try {
    const data = await request.json();
    const { messageIds } = data;
    
    if (!messageIds || !Array.isArray(messageIds)) {
      return NextResponse.json({ error: "Message IDs required" }, { status: 400 });
    }
    
    await db.chatMessage.updateMany({
      where: { id: { in: messageIds } },
      data: { isRead: true },
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating messages:", error);
    return NextResponse.json({ error: "Failed to update messages" }, { status: 500 });
  }
}
