import { useState, useEffect } from "react"; 
import type { Adventurer } from "../types/adventurer";
import type { ApiError } from "../types/api";
import { getAdventurers } from "../services/adventurerService";

export function useAdventurers() { 

    const [adventurers, setAdventurers] = useState<Adventurer[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<ApiError | null>(null);

    useEffect(() => {
        setIsLoading(true);
        getAdventurers()
            .then(setAdventurers)
            .catch(setError)
            .finally(() => setIsLoading(false));
    }, []);

    return { adventurers, isLoading, error };
}