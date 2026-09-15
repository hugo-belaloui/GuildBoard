import type { ReactNode } from "react";

//ReactNode is the parent type of number, string, bool... means the button can contain anything 
interface ButtonProps { 
    children: ReactNode;
    onClick: () => void; 
    variant?: "blue" | "blue_outline" | "red" | "red_outline"; 
}

const VARIANT_STYLES: Record<"blue" | "blue_outline" | "red" | "red_outline", string> = { 
    blue: "bg-blue-600 text-white hover:bg-blue-700", 
    blue_outline: "bg-white text-blue-600 border border-blue-600 hover:bg-blue-50",
    red: "bg-red-600 text-white hover:bg-red-700", 
    red_outline: "bg-white text-red-600 border border-red-600 hover:bg-red-50"
};

export function Button({ children, onClick, variant="blue" }: ButtonProps){ 
    return (
        <button
            onClick = {onClick}
            className={`w-full rounded-lg px-4 py-3 font-bold uppercase tracking-wide text-sm 
                ${VARIANT_STYLES[variant]}`}
        > 
            {children} 
        </button>
    );
}