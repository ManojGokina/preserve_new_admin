import { useEffect } from 'react';
import { CheckCircle, AlertCircle, XCircle, X } from 'lucide-react';

export type ToastType = 'success' | 'warning' | 'error';

interface ToastProps {
    type: ToastType;
    message: string;
    onClose: () => void;
    duration?: number;
}

const toastStyles = {
    success: {
        bg: 'bg-emerald-500/10',
        border: 'border-emerald-500/20',
        text: 'text-emerald-400',
        icon: CheckCircle,
    },
    warning: {
        bg: 'bg-yellow-500/10',
        border: 'border-yellow-500/20',
        text: 'text-yellow-400',
        icon: AlertCircle,
    },
    error: {
        bg: 'bg-red-500/10',
        border: 'border-red-500/20',
        text: 'text-red-400',
        icon: XCircle,
    },
};

export function Toast({ type, message, onClose, duration = 3000 }: ToastProps) {
    const styles = toastStyles[type];
    const Icon = styles.icon;

    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    return (
        <div
            className={`fixed top-4 right-4 flex items-center gap-3 p-4 rounded-lg ${styles.bg} ${styles.border} shadow-lg animate-slide-in`}
            role="alert"
        >
            <Icon className={`h-5 w-5 ${styles.text}`} />
            <p className={`${styles.text} font-medium`}>{message}</p>
            <button
                onClick={onClose}
                className={`ml-4 p-1 hover:bg-white/10 rounded-lg transition-colors ${styles.text}`}
            >
                <X className="h-4 w-4" />
            </button>
        </div>
    );
}