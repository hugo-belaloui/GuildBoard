import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuest } from "../hooks/useQuest";
import { deleteQuest } from "../services/questService";
import { DifficultyBadge } from "../components/quests/DifficultyBadge";
import { StatusBadge } from "../components/quests/StatusBadge";
import { Button } from "../components/ui/Button";
import { LoadSpinner } from "../components/ui/LoadSpinner";
import { ErrorMessage } from "../components/ui/ErrorMessage";
import type { ApiError } from "../types/api";

export function QuestDetailsPage() {
    // useParams reads the :id from the URL, always as a string, so we convert it
    const { id } = useParams();
    // useNavigate : navigate from id, not from a clicked Link
    const navigate = useNavigate();
    const { quest, isLoading, error } = useQuest(Number(id));
    // no dedicated hook needed : just local state for its own error
    const [deleteError, setDeleteError] = useState<ApiError | null>(null);

    async function handleDelete() {
        if (!quest) return;
        try {
            await deleteQuest(quest.id);
            // redirect back to the list once deleted
            navigate("/quests");
        } catch (err) {
            setDeleteError(err as ApiError);
        }
    }

    if (isLoading) return <LoadSpinner />;
    if (error) return <ErrorMessage message={error.message} />;
    if (!quest) return null;

    // RG2 : edit only allowed if AVAILABLE, delete forbidden only if ON_GOING
    const canEdit = quest.status === "AVAILABLE";
    const canDelete = quest.status !== "ON_GOING";

    return (
        <div>
            <div className="flex items-center justify-between mb-3">
                <DifficultyBadge difficulty={quest.difficulty} />
                <StatusBadge status={quest.status} />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{quest.title}</h1>
            <p className="text-base text-gray-900 mb-4">{quest.description}</p>
            <div className="flex gap-4 text-sm font-semibold mb-6">
                <span className="text-amber-600">{quest.goldReward} Gold</span>
                <span className="text-blue-600">{quest.xpReward} XP</span>
            </div>

            {deleteError && <ErrorMessage message={deleteError.message} />}

            <div className="flex flex-col gap-3 max-w-sm">
                {/* a Link has no native disabled state, so we fake it : dim it and block clicks */}
                <Button
                    to={`/quests/${quest.id}/edit`}
                    variant="blue_outline"
                    className={canEdit ? "" : "opacity-20 pointer-events-none"}
                >
                    Edit Quest
                </Button>
                <Button
                    onClick={handleDelete}
                    variant="red_outline"
                    className={canDelete ? "" : "opacity-20 pointer-events-none"}
                >
                    Delete Quest
                </Button>
            </div>
        </div>
    );
}
