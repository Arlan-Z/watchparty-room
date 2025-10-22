import { useState, useEffect } from 'react';
import type Message from '../../../../models/message';
import userUtils from '../../../../utils/userUtils';
import ChatFooter from './ChatFooter';
import MessageBox from './MessageBox';
import './Chat.css';

import { io } from 'socket.io-client';
const socket = io("/");

interface ChatProps {
    roomId: string;
}

const userId = userUtils.getUserId();

export default function Chat({ roomId }: ChatProps) {
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        socket.connect();
        socket.emit('join_room', roomId);
        
        const receiveMessageHandler = (newMessage: Message) => {
            setMessages((prevMessages) => [...prevMessages, newMessage]);
        };
        socket.on('receive_message', receiveMessageHandler);

        fetch(`/api/chat/${roomId}`)
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setMessages(data);
                }
            })
            .catch(err => console.error("Failed to fetch message history:", err));

        return () => {
            socket.off('receive_message', receiveMessageHandler);
            socket.disconnect();
        };
    }, [roomId]); 

    const handleSendMessage = (content: string) => {
        if (content.trim() === '') return;

        const messageData = {
            senderId: userId,
            content,
            roomId,
        };

        socket.emit('send_message', messageData);
    };

    return (
        <div className="chat-wrapper">
            <MessageBox messages={messages} currentUserId={userId} />
            <ChatFooter sendMessage={handleSendMessage} />
        </div>
    );
}