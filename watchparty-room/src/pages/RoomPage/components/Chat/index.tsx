import type Message from '../../../../models/message';
import './Chat.css';
import { useState } from 'react'
import MessageBox from './MessageBox';
import ChatFooter from './ChatFooter';
import userUtils from '../../../../utils/userUtils';

interface ChatProps {
    roomId: string
};

export default function Chat({ roomId } : ChatProps) {
    const [messages, setMessages] = useState<Message[]>([]);
    console.log(roomId);

    const createMessageFunction = (message: Message) => {
        setMessages([...messages, message]);
    };

    return (
        <div className="chat-wrapper">
            <MessageBox messages={messages} currentUserId={userUtils.getUserId()}/>
            <ChatFooter createMessageFunction={createMessageFunction} currentUserId={userUtils.getUserId()}/>
        </div>
    );
}