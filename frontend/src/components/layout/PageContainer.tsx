// A page wrapper with a max width, centered, with padding and margins 

import type { ReactNode } from "react";

interface PageContainerProps { 
    children: ReactNode; 
}

export function PageContainer({ children} : PageContainerProps) { 
    return (
        <div className="max-w-5xl mx-auto px-4 py-6">
            {children}
        </div>
    );
}