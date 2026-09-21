import { createContext, useContext, useState, type ReactNode } from "react";

interface Toast {
    id: number;
    message: string;
}

interface ToastContextValue {
    showToast: (message: string) => void;
}

// null by default 
const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    function showToast(message: string) {
        const id = Date.now();
        setToasts((prev) => [...prev, { id, message }]);
        // disappear after 3 sec
        setTimeout(() => {
            setToasts((prev) => prev.filter((toast) => toast.id !== id));
        }, 3000);
    }

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            {/* bottom right */}
            <div className="toast toast-bottom toast-end">
                {toasts.map((toast) => (
                    <div key={toast.id} className="alert alert-success">
                        <span>{toast.message}</span>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
}

// le hook que les autres composants utiliseront réellement
export function useToast() {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
}
