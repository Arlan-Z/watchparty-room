import type Message from '../models/message';
import './MessageBox.css';

interface chatProps {
    messages: Message[],
    currentUserId: string
}

export default function MessageBox({ messages = [], currentUserId }: chatProps) {
    return (
        <div className="message-box-wrapper">
            {messages.map((msg, index) => {
                const prevMessage = messages[index - 1];
                const showSenderId = !prevMessage || prevMessage.senderId !== msg.senderId;
                const isContinuation = !showSenderId;

                return (
                    <div className={`message-group ${isContinuation ? 'continuation' : ''}`} key={index}>
                        {showSenderId && <p className='msg-sender-id'>{msg.senderId}</p>}
                        <div className={`message ${msg.senderId === currentUserId ? "current" : "other"}`}>
                            {msg.content}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}