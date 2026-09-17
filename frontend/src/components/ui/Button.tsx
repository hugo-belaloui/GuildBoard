import type { ReactNode } from "react";
import { Link } from "react-router-dom";

interface ButtonProps {
    children: ReactNode;
    variant?: "blue" | "blue_outline" | "red" | "red_outline";
    className?: string;
    onClick?: () => void;
    to?: string;
    // by default in a form, a button is of type "submit"
    // need a parameter to override it for the "cancel" 
    type?: "button" | "submit"; 
}



const VARIANT_STYLES: Record<"blue" | "blue_outline" | "red" | "red_outline", string> = {
    blue: "bg-blue-600 text-white hover:bg-blue-700",
    blue_outline: "bg-white text-blue-600 border border-blue-600 hover:bg-blue-50",
    red: "bg-red-600 text-white hover:bg-red-700",
    red_outline: "bg-white text-red-600 border border-red-600 hover:bg-red-50"
};

export function Button({ children, onClick, to, variant = "blue", className = "", type}: ButtonProps) {
    const styles = `w-full text-center rounded-lg px-4 py-3 font-bold uppercase tracking-wide text-sm ${VARIANT_STYLES[variant]} ${className}`;

    if (to) {
        return (
            <Link to={to} className={styles}>
                {children}
            </Link>
        );
    }

    return (
        <button type={type ?? "submit"} onClick={onClick} className={styles}>
            {children}
        </button>
    );
}
