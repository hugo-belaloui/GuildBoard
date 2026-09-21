import { useState, useEffect } from "react";
import type { Assignment } from "../types/assignment";
import type { ApiError } from "../types/api";
import { getQuestAssignment } from "../services/questService";

// questId is undefined when the quest is AVAILABLE (no assignment exists yet) : skip the call entirely
export function useQuestAssignment(questId: number | undefined) {
    const [assignment, setAssignment] = useState<Assignment | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<ApiError | null>(null);

    useEffect(() => {
        if (questId === undefined) {
            setIsLoading(false);
            return;
        }
        setIsLoading(true);
        getQuestAssignment(questId)
            .then(setAssignment)
            .catch(setError)
            .finally(() => setIsLoading(false));
    }, [questId]);

    return { assignment, isLoading, error };
}
