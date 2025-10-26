import { useRef } from 'react'
import './ChatFooter.css'

interface ChatFooterProps {
    sendMessage: (content: string) => void;
}

export default function ChatFooter({ sendMessage }: ChatFooterProps) {
    const textInput = useRef<HTMLInputElement>(null);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
        if (e.key === 'Enter') {
            e.preventDefault(); 
            CreateMessage();
        }
    };

    const CreateMessage = (): void => {
        const message = textInput.current?.value.trim();
        if (!message) return;

        sendMessage(message);

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

            <button className="chat-send-btn" onClick={CreateMessage}>Send</button>
        </div>
    )
}