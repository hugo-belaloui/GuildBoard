import { useState, useEffect } from "react"; 
import type { Adventurer } from "../types/adventurer";
import type { ApiError } from "../types/api";
import { getAdventurer } from "../services/adventurerService";

// Here to grab a single adventurer we need an id
export function useAdventurer(id : number) { 

    // So instead of an empty array, we start with null 
    const [adventurer, setAdventurer] = useState<Adventurer | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<ApiError | null>(null);

    useEffect(() => {
        setIsLoading(true);
        getAdventurer(id)
            .then(setAdventurer)
            .catch(setError)
            .finally(() => setIsLoading(false));
    // add id to the dependencies array, so it refreshes if the id changes 
    }, [id]);

    return { adventurer, isLoading, error };
}