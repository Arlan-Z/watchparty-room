import { useRef } from 'react'
import './ChatFooter.css'
import type Message from '../../../../../models/message';

interface ChatFooterProps {
    createMessageFunction: (message: Message) => void,
    currentUserId: string
}

export default function ChatFooter({ createMessageFunction, currentUserId }: ChatFooterProps) {
    const textInput = useRef<HTMLInputElement>(null);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
        if (e.key === 'Enter') {
            e.preventDefault(); 
            sendMessage();
        }
    };

    const sendMessage = (): void => {
        const message = textInput.current?.value.trim();
        if (!message) return;

        createMessageFunction({
            senderId: currentUserId,
            content: message,
        });

        textInput.current!.value = '';
    };

    return (
        <div className="chat-footer-wrapper">
            <input 
                className="chat-input" 
                type="text" 
                placeholder="Type your message..." ref={textInput}
                onKeyDown={handleKeyDown}
            />

            <button className="chat-send-btn" onClick={sendMessage}>Send</button>
        </div>
    )
}