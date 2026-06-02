'use client';

import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Info, X } from 'lucide-react';

type ToastType = 'success' | 'info' | 'error';

interface Toast {
    id: number;
    message: string;
    type: ToastType;
}

interface ToastContextValue {
    toast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);
    const counter = useRef(0);

    const dismiss = useCallback((id: number) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    const toast = useCallback(
        (message: string, type: ToastType = 'success') => {
            const id = ++counter.current;
            setToasts((prev) => [...prev, { id, message, type }]);
            window.setTimeout(() => dismiss(id), 3200);
        },
        [dismiss],
    );

    return (
        <ToastContext.Provider value={{ toast }}>
            {children}
            <div
                className="pointer-events-none fixed inset-x-0 bottom-4 z-[100] flex flex-col items-center gap-2 px-4 sm:bottom-6"
                role="region"
                aria-label="Notifications"
                aria-live="polite"
            >
                <AnimatePresence initial={false}>
                    {toasts.map((t) => (
                        <motion.div
                            key={t.id}
                            layout
                            initial={{ opacity: 0, y: 24, scale: 0.96 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 12, scale: 0.96 }}
                            transition={{ type: 'spring', stiffness: 420, damping: 30 }}
                            className="pointer-events-auto flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium text-card-foreground shadow-lg"
                        >
                            <span
                                className={
                                    t.type === 'error'
                                        ? 'text-destructive'
                                        : t.type === 'info'
                                          ? 'text-[#4F6815] dark:text-[#a3c14f]'
                                          : 'text-[#4F6815] dark:text-[#a3c14f]'
                                }
                            >
                                {t.type === 'info' ? <Info className="size-4" /> : <Check className="size-4" />}
                            </span>
                            <span>{t.message}</span>
                            <button
                                type="button"
                                onClick={() => dismiss(t.id)}
                                aria-label="Dismiss"
                                className="ml-1 rounded-md p-0.5 text-muted-foreground transition-colors hover:text-foreground"
                            >
                                <X className="size-3.5" />
                            </button>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    );
}

export function useToast() {
    const ctx = useContext(ToastContext);
    if (!ctx) throw new Error('useToast must be used within a ToastProvider');
    return ctx;
}
