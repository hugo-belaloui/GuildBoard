// in React, a component always receive ONE argument called a props 
interface ErrorMessageProps { 
    message: string;
}

// {...} : type = destructuration, tell JS "the argument is an object", 
// but use its field message right away 
export function ErrorMessage({message}: ErrorMessageProps) { 
    return ( 
        <div role="alert" className="bg-red-100 text-red-800 border border-red-300 rounded-lg p-4">
            {message}
        </div>
    )
}