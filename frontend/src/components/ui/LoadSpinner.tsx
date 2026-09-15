export function LoadSpinner() { 
    // role = status : tell accessibility this zone might change
    // a grey circle border with a blue top, spinning 
    // "sr-only" for screen readers 
    return (
        <div role="status" className="animate-spin h-8 w-8 rounded-full 
        border-4 border-gray-300 border-t-blue-500">
            <span className="sr-only">Loading...</span>
        </div>
    )
}