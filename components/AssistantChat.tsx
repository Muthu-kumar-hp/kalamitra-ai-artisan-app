import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChatMessage } from '../types';
import { streamChatResponse } from '../services/geminiService';
import { PaperAirplaneIcon, ArrowLeftIcon, ChatBubbleLeftRightIcon, MicrophoneIcon } from './Icons';
import { Button } from './common/Button';

interface AssistantChatProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const AssistantChat: React.FC<AssistantChatProps> = ({ isOpen, setIsOpen }) => {
    const [messages, setMessages] = useState<ChatMessage[]>([
        { role: 'model', text: "Hello! I'm Karigar Sahayak, your AI assistant. How can I help you today?" }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const recognitionRef = useRef<any>(null);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);
    
    useEffect(() => {
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (SpeechRecognition) {
            const recognition = new SpeechRecognition();
            recognition.continuous = false;
            recognition.lang = 'en-US';
            recognition.interimResults = false;
            recognition.maxAlternatives = 1;
            recognitionRef.current = recognition;
        } else {
            console.warn("Speech Recognition not supported by this browser.");
        }
    }, []);

    const handleSend = useCallback(async (messageText: string) => {
        const message = messageText.trim();
        if (message === '') return;

        setIsLoading(true);
        const userMessage: ChatMessage = { role: 'user', text: message };
        setMessages(prev => [...prev, userMessage]);
        setInput('');

        try {
            const stream = await streamChatResponse(message);
            setMessages(prev => [...prev, { role: 'model', text: '' }]);

            for await (const chunk of stream) {
                const chunkText = chunk.text;
                if(chunkText) {
                    setMessages(prev => {
                        const newMessages = [...prev];
                        const lastMessage = newMessages[newMessages.length - 1];
                        if (lastMessage && lastMessage.role === 'model') {
                           lastMessage.text += chunkText;
                        }
                        return newMessages;
                    });
                }
            }
        } catch (error) {
            console.error("Chat error:", error);
            setMessages(prev => [...prev, { role: 'model', text: "I'm having trouble connecting right now. Please try again later." }]);
        } finally {
            setIsLoading(false);
        }
    }, []);
    
    const handleListen = () => {
        const recognition = recognitionRef.current;
        if (!recognition) return;

        if (isListening) {
            recognition.stop();
        } else {
            recognition.start();
        }
    };
    
    useEffect(() => {
        const recognition = recognitionRef.current;
        if (!recognition) return;

        recognition.onstart = () => {
            setIsListening(true);
        };

        recognition.onresult = (event: any) => {
            const transcript = event.results[event.results.length - 1][0].transcript;
            handleSend(transcript);
        };

        recognition.onerror = (event: any) => {
            console.error('Speech recognition error', event.error);
        };
        
        recognition.onend = () => {
            setIsListening(false);
        };
    }, [handleSend]);


    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 bg-accent-primary dark:bg-indigo-600 ethnic:bg-ethnic-primary craftsman:bg-craftsman-primary handloom:bg-handloom-primary terracotta:bg-terracotta-primary tribal:bg-tribal-primary madhubani:bg-madhubani-primary text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform"
                aria-label="Open Chat"
            >
                <ChatBubbleLeftRightIcon className="w-8 h-8"/>
            </button>
        );
    }

    return (
        <div className={`fixed bottom-6 right-6 w-96 h-[600px] shadow-2xl rounded-lg flex flex-col z-50 animate-fade-in-up bg-bg-primary border border-border-color dark:bg-gray-900 dark:border-gray-700 ethnic:bg-ethnic-bg ethnic:border-ethnic-border craftsman:bg-craftsman-bg craftsman:border-craftsman-border handloom:bg-handloom-bg handloom:border-handloom-border terracotta:bg-terracotta-bg terracotta:border-terracotta-border tribal:bg-tribal-bg tribal:border-tribal-border madhubani:bg-madhubani-bg madhubani:border-madhubani-border`}>
            <header className="flex items-center gap-3 p-3 border-b border-border-color dark:border-gray-700 ethnic:border-ethnic-border craftsman:border-craftsman-border handloom:border-handloom-border terracotta:border-terracotta-border tribal:border-tribal-border madhubani:border-madhubani-border">
                <Button variant="secondary" onClick={() => setIsOpen(false)} className="px-3 py-1 text-sm shadow-none inline-flex items-center group">
                    <ArrowLeftIcon className="w-5 h-5 mr-1 transition-transform group-hover:-translate-x-1" />
                    <span>Back</span>
                </Button>
                <h3 className="font-bold text-lg text-text-primary dark:text-gray-100 ethnic:text-ethnic-text craftsman:text-craftsman-text handloom:text-handloom-text terracotta:text-terracotta-text tribal:text-tribal-text madhubani:text-madhubani-text">AI Assistant</h3>
            </header>
            <div ref={chatContainerRef} className="flex-1 p-4 overflow-y-auto">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}>
                        <div className={`max-w-xs px-4 py-2 rounded-xl ${
                            msg.role === 'user' 
                            ? 'bg-accent-primary dark:bg-indigo-600 ethnic:bg-ethnic-primary craftsman:bg-craftsman-primary handloom:bg-handloom-primary terracotta:bg-terracotta-primary tribal:bg-tribal-primary madhubani:bg-madhubani-primary text-white' 
                            : 'bg-bg-secondary dark:bg-gray-700 ethnic:bg-ethnic-secondary/30 craftsman:bg-craftsman-secondary/50 handloom:bg-handloom-secondary/50 terracotta:bg-terracotta-secondary/50 tribal:bg-tribal-secondary/50 madhubani:bg-madhubani-secondary/50 text-text-primary dark:text-gray-100 ethnic:text-ethnic-text craftsman:text-craftsman-text handloom:text-handloom-text terracotta:text-terracotta-text tribal:text-tribal-text madhubani:text-madhubani-text'
                        }`}>
                            <p className="whitespace-pre-wrap">{msg.text}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="p-4 border-t border-border-color dark:border-gray-700 ethnic:border-ethnic-border craftsman:border-craftsman-border handloom:border-handloom-border terracotta:border-terracotta-border tribal:border-tribal-border madhubani:border-madhubani-border">
                <div className="flex items-center rounded-lg bg-bg-secondary dark:bg-gray-700 ethnic:bg-ethnic-secondary/30 craftsman:bg-craftsman-secondary/50 handloom:bg-handloom-secondary/50 terracotta:bg-terracotta-secondary/50 tribal:bg-tribal-secondary/50 madhubani:bg-madhubani-secondary/50">
                    <input
                        type="text"
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyPress={e => e.key === 'Enter' && handleSend(input)}
                        placeholder="Ask me anything..."
                        className="flex-1 bg-transparent px-4 py-2 focus:outline-none text-text-primary dark:text-gray-100 ethnic:text-ethnic-text craftsman:text-craftsman-text handloom:text-handloom-text terracotta:text-terracotta-text tribal:text-tribal-text madhubani:text-madhubani-text"
                        disabled={isLoading}
                    />
                     <button 
                        onClick={handleListen} 
                        disabled={isLoading}
                        className={`p-3 transition-colors disabled:opacity-50 ${isListening ? 'text-red-500 animate-pulse' : 'text-text-secondary dark:text-gray-400 hover:text-text-primary dark:hover:text-gray-200'}`}
                        aria-label={isListening ? 'Stop listening' : 'Start listening'}
                    >
                        <MicrophoneIcon />
                    </button>
                    <button onClick={() => handleSend(input)} disabled={isLoading || input.trim() === ''} className="p-3 text-accent-primary dark:text-indigo-400 ethnic:text-ethnic-primary craftsman:text-craftsman-primary handloom:text-handloom-primary terracotta:text-terracotta-primary tribal:text-tribal-primary madhubani:text-madhubani-primary disabled:text-gray-400">
                        <PaperAirplaneIcon />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AssistantChat;