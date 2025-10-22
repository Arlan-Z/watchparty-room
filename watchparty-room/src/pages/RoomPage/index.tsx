import type Message from "../../models/message";
import Chat from "./components/Chat";

const currentUserId = '123';
const messages : Message[] = [
  {
    senderId: currentUserId,
    content: 'Hello'
  },
  {
    senderId: '234',
    content: 'Hello to you too!'
  },
];

export default function RoomPage() {
  return (
    <Chat messages={messages} currentUserId={currentUserId}/>
  );
}