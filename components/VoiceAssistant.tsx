import React, { useState, useEffect } from 'react';
import { Page } from '../types';
import { PAGES } from '../constants';
import { MicrophoneIcon } from './Icons';

interface VoiceAssistantProps {
    setActivePage: (page: Page) => void;
}

// Check for SpeechRecognition API
const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
let recognition: any | null = null;
if (SpeechRecognition) {
    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
}


export const VoiceAssistant: React.FC<VoiceAssistantProps> = ({ setActivePage }) => {
    const [isListening, setIsListening] = useState(false);
    const [feedback, setFeedback] = useState('');

    const handleListen = () => {
        if (!recognition) {
            setFeedback('Voice recognition not supported in this browser.');
            setTimeout(() => setFeedback(''), 3000);
            return;
        }
        if (isListening) {
            recognition.stop();
            setIsListening(false);
        } else {
            setIsListening(true);
            setFeedback('Listening...');
            recognition.start();
        }
    };

    const processCommand = (transcript: string) => {
        const command = transcript.toLowerCase();
        console.log(`Voice command received: ${command}`);

        const foundPage = PAGES.find(page => {
             const pageName = page.name.toLowerCase().replace('ai ', '').replace(' tools', '').replace(' my', '');
             return command.includes(pageName);
        });


        if (foundPage) {
            setActivePage(foundPage);
            setFeedback(`Navigating to ${foundPage.name}...`);
        } else {
            setFeedback("Sorry, I didn't understand that.");
        }
        
        setTimeout(() => setFeedback(''), 3000);
    };

    useEffect(() => {
        if (!recognition) return;

        recognition.onresult = (event: any) => {
            const transcript = event.results[event.results.length - 1][0].transcript;
            processCommand(transcript);
        };

        recognition.onerror = (event: any) => {
            console.error('Speech recognition error', event.error);
            setFeedback(`Error: ${event.error}`);
            setIsListening(false);
            setTimeout(() => setFeedback(''), 3000);
        };
        
        recognition.onend = () => {
            setIsListening(false);
            if (feedback === 'Listening...') {
                 setFeedback('');
            }
        };

        return () => {
            if(recognition) {
                recognition.abort();
                recognition.onresult = null;
                recognition.onerror = null;
                recognition.onend = null;
            }
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [feedback]);


    return (
         <div className="relative flex items-center">
            <button
                onClick={handleListen}
                className={`p-2 rounded-full transition-colors relative
                    ${isListening 
                        ? 'bg-red-500/20 text-red-500' 
                        : 'hover:bg-bg-secondary dark:hover:bg-gray-700 ethnic:hover:bg-ethnic-secondary/20 craftsman:hover:bg-craftsman-secondary handloom:hover:bg-handloom-secondary terracotta:hover:bg-terracotta-secondary tribal:hover:bg-tribal-secondary madhubani:hover:bg-madhubani-secondary'
                    }`}
                aria-label="Use voice assistant"
            >
                <MicrophoneIcon />
                {isListening && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>}
            </button>
            {feedback && <span className="ml-2 text-sm text-text-secondary dark:text-gray-400 ethnic:text-ethnic-text/80 craftsman:text-craftsman-text/80 handloom:text-handloom-text/80 terracotta:text-terracotta-text/80 tribal:text-tribal-text/80 madhubani:text-madhubani-text/80">{feedback}</span>}
        </div>
    );
};
