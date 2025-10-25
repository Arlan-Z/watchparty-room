// src/services/chatSocketService.ts
import { io, Socket } from "socket.io-client";
import type Message from "../models/message";

class ChatService {
  private socket: Socket | null = null;

  connect() {
    if (!this.socket) {
      this.socket = io("/", {
        path: "/chat-service/socket.io",
        transports: ["websocket"],
        upgrade: false,
      });
    }
  }

  joinRoom(roomId: string) {
    this.socket?.emit("join_room", roomId);
  }

  onMessage(handler: (message: Message) => void) {
    this.socket?.on("receive_message", handler);
  }

  offMessage(handler: (message: Message) => void) {
    this.socket?.off("receive_message", handler);
  }

  sendMessage(data: { senderId: string; content: string; roomId: string }) {
    this.socket?.emit("send_message", data);
  }

  disconnect() {
    this.socket?.disconnect();
    this.socket = null;
  }
}

const chatSocketService = new ChatService();
export default chatSocketService;
