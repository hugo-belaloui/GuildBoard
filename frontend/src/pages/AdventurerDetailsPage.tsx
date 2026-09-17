import { Link, useParams } from "react-router-dom";
import { useAdventurer } from "../hooks/useAdventurer";
import { useAdventurerHistory } from "../hooks/useAdventurerHistory";
import { ProgressBar } from "../components/ui/ProgressBar";
import { LoadSpinner } from "../components/ui/LoadSpinner";
import { ErrorMessage } from "../components/ui/ErrorMessage";
import { EmptyStateMessage } from "../components/ui/EmptyStateMessage";

export function AdventurerDetailsPage() {
    const { id } = useParams();
    const { adventurer, isLoading, error } = useAdventurer(Number(id));
    // renamed on destructure : two hooks both return "isLoading"/"error", need distinct names to use both
    const { history, isLoading: isLoadingHistory, error: historyError } = useAdventurerHistory(Number(id));

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
                    {history.map((entry) => (
                        <div key={entry.id}>
                            <Link to={`/quests/${entry.questId}`} className="font-semibold text-blue-600">
                                Quest #{entry.questId}
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
                    ))}
                </div>
            )}
        </div>
    );
}
