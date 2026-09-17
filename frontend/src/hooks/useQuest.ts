import { useState, useEffect } from "react"; 
import type { Quest } from "../types/quest";
import type { ApiError } from "../types/api";
import { getQuest } from "../services/questService";

// Here to grab a single quest we need an id
export function useQuest(id : number | undefined) { 

    // So instead of an empty array, we start with null 
    const [quest, setQuest] = useState<Quest | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<ApiError | null>(null);

    useEffect(() => {
        if (id === undefined) {
            setIsLoading(false);
            return;
        }
        setIsLoading(true);
        getQuest(id)
            .then(setQuest)
            .catch(setError)
            .finally(() => setIsLoading(false));
    // add id to the dependencies array, so it refreshes if the id changes 
    }, [id]);

    return { quest, isLoading, error };
}

