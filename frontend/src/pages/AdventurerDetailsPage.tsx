import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAdventurer } from "../hooks/useAdventurer";
import { useAdventurerHistory } from "../hooks/useAdventurerHistory";
import { useQuests } from "../hooks/useQuests";
import { deleteAdventurer } from "../services/adventurerService";
import { Button } from "../components/ui/Button";
import { ProgressBar } from "../components/ui/ProgressBar";
import { LoadSpinner } from "../components/ui/LoadSpinner";
import { ErrorMessage } from "../components/ui/ErrorMessage";
import { EmptyStateMessage } from "../components/ui/EmptyStateMessage";
import { useToast } from "../components/ui/ToastProvider";
import type { ApiError } from "../types/api";

export function AdventurerDetailsPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { showToast } = useToast();
    const { adventurer, isLoading, error } = useAdventurer(Number(id));
    // renamed on destructure : two hooks both return "isLoading"/"error", need distinct names to use both
    const { history, isLoading: isLoadingHistory, error: historyError } = useAdventurerHistory(Number(id));
    // whole quest catalog already loaded once, reused here to resolve each entry's title from its questId
    const { quests } = useQuests();
    const [actionError, setActionError] = useState<ApiError | null>(null);

    async function handleDelete() {
        if (!adventurer) return;
        try {
            await deleteAdventurer(adventurer.id);
            showToast("Adventurer deleted!");
            navigate("/adventurers");
        } catch (err) {
            setActionError(err as ApiError);
        }
    }

    if (isLoading) return <LoadSpinner />;
    if (error) return <ErrorMessage message={error.message} />;
    if (!adventurer) return null;

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{adventurer.name}</h1>
            <div className="flex items-center gap-4 mb-4">
                <span className="text-sm font-semibold text-gray-900">LVL {adventurer.level} {adventurer.characterClass}</span>
                <span className="text-sm font-semibold text-amber-600">{adventurer.gold} Gold</span>
            </div>
            {/* RG3 threshold : level up happens at level * 100 xp, same formula as the back */}
            <ProgressBar value={adventurer.xp} max={adventurer.level * 100} />

            <h2 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Quests History</h2>
            {/* this section has its own loading/error/empty/data states, independent from the adventurer's */}
            {isLoadingHistory && <LoadSpinner />}
            {historyError && <ErrorMessage message={historyError.message} />}
            {!isLoadingHistory && !historyError && history.length === 0 && (
                <EmptyStateMessage message="No quest history yet." />
            )}
            {!isLoadingHistory && !historyError && history.length > 0 && (
                <div className="flex flex-col gap-3">
                    {history.map((entry) => {
                        const quest = quests.find((q) => q.id === entry.questId);
                        return (
                        <div key={entry.id}>
                            <Link to={`/quests/${entry.questId}`} className="font-semibold text-blue-600">
                                {quest?.title ?? `Quest #${entry.questId}`}
                            </Link>
                            {/* assignedAt/completedAt are strings (see types/assignment.ts) :
                                new Date(string) parses them, .toLocaleDateString() formats for display */}
                            <p className="text-sm text-gray-600">
                                Assigned {new Date(entry.assignedAt).toLocaleDateString()}
                                {entry.completedAt
                                    ? ` · Completed ${new Date(entry.completedAt).toLocaleDateString()}`
                                    : " · In progress"}
                            </p>
                        </div>
                        );
                    })}
                </div>
            )}

            {actionError && <ErrorMessage message={actionError.message} />}

            <div className="flex flex-col gap-3 max-w-sm mt-6">
                <Button to={`/adventurers/${adventurer.id}/edit`} variant="blue_outline">
                    Edit Adventurer
                </Button>
                <Button onClick={handleDelete} variant="red_outline">
                    Delete Adventurer
                </Button>
            </div>
        </div>
    );
}
