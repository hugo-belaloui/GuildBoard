// in React, a component always receive ONE argument called a props 
interface EmptyStateProps { 
    message: string;
}

export function EmptyStateMessage({message}: EmptyStateProps) { 
    return ( 
        <div className="bg-gray-100 text-gray-600 border border-gray rounded-lg p-4">
            {message}
        </div>
    )
}