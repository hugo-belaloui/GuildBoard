import { useState, useEffect } from "react"; 
import type { Quest } from "../types/quest";
import type { ApiError } from "../types/api";
import { getQuests } from "../services/questService";

// React : a hook re-executes itself when the UI updates. 
// a normal let quests = [] would be reset on every execution, and would not
// survive a display refresh 
// comes in *** useState *** : a variable that persists between renders, AND renders a new
// display when it's modified 

export function useQuests() { 
    // create a state variable of type Quest[], initialized empty
    // always returns a pair : the current value, and a setter to modify it  
    const [quests, setQuests] = useState<Quest[]>([]);

    // at start, before any network call : it's loading
    const [isLoading, setIsLoading] = useState(true);
    // at start, before any network call : it cannot be an error 
    const [error, setError] = useState<ApiError | null>(null);

    // arrow function, quick local definition (parameters) => return 
    useEffect(() => {
        // before the call, set as loading 
        setIsLoading(true);
        getQuests()
            // when the promise succeeds, update the quests with the result 
            .then(setQuests)
            // if getQuests() throw, catch it 
            .catch(setError)
            // wheter it succeeds or fails, exit the loading state 
            .finally(() => setIsLoading(false));
    }, []);

    // NOTE on parameters
    // .then(callback) resolves callback(promise result) if success
    // .catch(callback) resolves callback(throw) if throw 
    // .finally(callback) ALWAYS RESOLVES without an argument 
    // so we feed it one with the () => 

    return { quests, isLoading, error };
}