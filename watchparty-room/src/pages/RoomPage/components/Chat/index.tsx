import type Message from '../../../../models/message';
import './Chat.css';

interface chatProps {
    messages: Message[],
    currentUserId: string
}

export default function Chat({ messages = [], currentUserId }: chatProps) {
    return (
        <div className="chat-wrapper">
            {messages.map((msg, index) => {
                return (
                    <>
                    <p className='msg-sender-id'>{msg.senderId}</p>
                    <div className={`message ${msg.senderId === currentUserId ? "current" : "other"}`} key={index}>{msg.content}</div>
                    </>
                );
            })}
        </div>
    );
}