import { useState, useCallback } from 'react';
import { Toast, ToastType } from './toast';

export interface ToastMessage {
    id: string;
    type: ToastType;
    message: string;
}

export function ToastContainer() {
    const [toasts, setToasts] = useState<ToastMessage[]>([]);

    const removeToast = useCallback((id: string) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, []);

    return (
        <div className="fixed top-0 right-0 z-50 p-4 space-y-4">
            {toasts.map((toast) => (
                <Toast
                    key={toast.id}
                    type={toast.type}
                    message={toast.message}
                    onClose={() => removeToast(toast.id)}
                />
            ))}
        </div>
    );
}

export const useToast = () => {
    const [, setToasts] = useState<ToastMessage[]>([]);

    const showToast = useCallback((type: ToastType, message: string) => {
        const id = Math.random().toString(36).substring(7);
        setToasts((prev) => [...prev, { id, type, message }]);
    }, []);

    return {
        success: (message: string) => showToast('success', message),
        warning: (message: string) => showToast('warning', message),
        error: (message: string) => showToast('error', message),
    };
};