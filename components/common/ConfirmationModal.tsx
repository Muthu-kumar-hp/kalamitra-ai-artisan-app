import React from 'react';
import { Button } from './Button';

interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    children: React.ReactNode;
    confirmText?: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onClose, onConfirm, title, children, confirmText = "Confirm" }) => {
    if (!isOpen) return null;

    const handleConfirm = () => {
        onConfirm();
    };

    return (
        <div 
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fade-in" 
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="confirmation-modal-title"
        >
            <div 
                className="bg-bg-primary dark:bg-gray-800 ethnic:bg-ethnic-bg craftsman:bg-craftsman-bg handloom:bg-handloom-bg terracotta:bg-terracotta-bg tribal:bg-tribal-bg madhubani:bg-madhubani-bg w-full max-w-sm p-6 rounded-2xl shadow-xl" 
                onClick={e => e.stopPropagation()}
            >
                <h2 id="confirmation-modal-title" className="text-xl font-bold mb-4 text-center text-text-primary dark:text-gray-100 ethnic:text-ethnic-text craftsman:text-craftsman-text handloom:text-handloom-text terracotta:text-terracotta-text tribal:text-tribal-text madhubani:text-madhubani-text">
                    {title}
                </h2>
                <div className="text-center text-text-secondary dark:text-gray-400 ethnic:text-ethnic-text/80 craftsman:text-craftsman-text/80 handloom:text-handloom-text/80 terracotta:text-terracotta-text/80 tribal:text-tribal-text/80 madhubani:text-madhubani-text/80 mb-6">
                    {children}
                </div>
                <div className="flex justify-center gap-4">
                    <Button type="button" variant="secondary" onClick={onClose} className="w-full">Cancel</Button>
                    <Button type="button" variant="primary" onClick={handleConfirm} className="w-full">
                        {confirmText}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModal;
