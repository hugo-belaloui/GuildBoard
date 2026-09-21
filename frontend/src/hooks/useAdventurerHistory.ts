import { useState, useEffect } from "react";
import type { Assignment } from "../types/assignment";
import type { ApiError } from "../types/api";
import { getAdventurerHistory } from "../services/adventurerService";

// same pattern as useQuest/useAdventurer, but the result is a list, so we start with []
export function useAdventurerHistory(id: number | undefined) {
    const [history, setHistory] = useState<Assignment[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<ApiError | null>(null);

    useEffect(() => {
        // no id (create mode / not ready yet) : skip the call entirely
        if (id === undefined) {
            setIsLoading(false);
            return;
        }
        setIsLoading(true);
        getAdventurerHistory(id)
            .then(setHistory)
            .catch(setError)
            .finally(() => setIsLoading(false));
    // add id to the dependencies array, so it refreshes if the id changes
    }, [id]);

    return { history, isLoading, error };
}
