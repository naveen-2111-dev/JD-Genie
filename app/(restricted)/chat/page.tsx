"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot } from 'lucide-react';
import Image from 'next/image';

const ChatPage = () => {
    const [messages, setMessages] = useState([
        { id: 1, text: "Hello! How can I help you today?", sender: "bot", timestamp: new Date() }
    ]);
    const [inputMessage, setInputMessage] = useState('');
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = () => {
        if (inputMessage.trim() === '') return;

        const userMessage = {
            id: messages.length + 1,
            text: inputMessage,
            sender: "user",
            timestamp: new Date()
        };

        setMessages([...messages, userMessage]);
        setInputMessage('');

        setTimeout(() => {
            const botMessage = {
                id: messages.length + 2,
                text: "Thanks for your message! This is a demo response.",
                sender: "bot",
                timestamp: new Date()
            };
            setMessages(prev => [...prev, botMessage]);
        }, 1000);
    };

    return (
        <div className="flex flex-col h-screen bg-gray-50">
            <div className="flex justify-between items-center bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
                <Image src="/logo.png" alt="Logo" width={100} height={100} />
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`flex items-start gap-3 ${message.sender === 'user' ? 'flex-row-reverse' : ''
                            }`}
                    >
                        <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${message.sender === 'user'
                                ? 'bg-teal-600'
                                : 'bg-gray-300'
                                }`}
                        >
                            {message.sender === 'user' ? (
                                <User className="w-5 h-5 text-white" />
                            ) : (
                                <Bot className="w-5 h-5 text-gray-700" />
                            )}
                        </div>

                        <div
                            className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${message.sender === 'user'
                                ? 'bg-teal-600 text-white'
                                : 'bg-white text-gray-800 border border-gray-200'
                                }`}
                        >
                            <p className="text-sm">{message.text}</p>
                            <span
                                className={`text-xs mt-1 block ${message.sender === 'user'
                                    ? 'text-blue-100'
                                    : 'text-gray-500'
                                    }`}
                            >
                                {message.timestamp.toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                            </span>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <div className="bg-white border-t border-gray-200 px-6 py-4">
                <div className="flex gap-3">
                    <input
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                    <button
                        onClick={handleSend}
                        className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors flex items-center gap-2"
                    >
                        <Send className="w-4 h-4" />
                        <span>Send</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatPage;