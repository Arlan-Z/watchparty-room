import { useEffect, useState } from "react";
import type Message from "../../../../models/message";
import userUtils from "../../../../utils/userUtils";
import ChatFooter from "./ChatFooter";
import MessageBox from "./MessageBox";
import "./Chat.css";
import chatSocketService from "./services/chatService";

interface ChatProps {
  roomId: string;
}

const userId = userUtils.getUserId();

export default function Chat({ roomId }: ChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    chatSocketService.connect();
    chatSocketService.joinRoom(roomId);

    const handleReceive = (newMessage: Message) => {
      setMessages((prev) => [...prev, newMessage]);
    };

    chatSocketService.onMessage(handleReceive);

    fetch(`/chat-service/api/chat/${roomId}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setMessages(data);
      })
      .catch((err) => console.error("Failed to fetch message history:", err));

    return () => {
      chatSocketService.offMessage(handleReceive);
      chatSocketService.disconnect();
    };
  }, [roomId]);

  const handleSendMessage = (content: string) => {
    if (!content.trim()) return;

    chatSocketService.sendMessage({
      senderId: userId,
      content,
      roomId,
    });
  };

  return (
    <div className="chat-wrapper">
      <MessageBox messages={messages} currentUserId={userId} />
      <ChatFooter sendMessage={handleSendMessage} />
    </div>
  );
}
