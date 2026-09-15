import { useState } from "react";
import { useQuests } from "../hooks/useQuests";
import { QuestFilters } from "../components/quests/QuestFilters";
import { QuestTable } from "../components/quests/QuestTable";
import { LoadSpinner } from "../components/ui/LoadSpinner";
import { ErrorMessage } from "../components/ui/ErrorMessage";
import { EmptyStateMessage } from "../components/ui/EmptyStateMessage";
import type { Difficulty, QuestStatus } from "../types/quest";
import { Button } from "../components/ui/Button";

export function AllQuestsPage() {
    const [status, setStatus] = useState<QuestStatus | undefined>(undefined);
    const [difficulty, setDifficulty] = useState<Difficulty | undefined>(undefined);

    const { quests, isLoading, error } = useQuests({ status, difficulty });

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Quests</h1>
            <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-4">
                <QuestFilters
                    status={status}
                    difficulty={difficulty}
                    onStatusChange={setStatus}
                    onDifficultyChange={setDifficulty}
                />
                <Button to="/quests/new" className="sm:w-auto">+ New Quest</Button>
            </div>
            {isLoading && <LoadSpinner />}
            {error && <ErrorMessage message={error.message} />}
            {!isLoading && !error && quests.length === 0 && <EmptyStateMessage message="No quest found." />}
            {!isLoading && !error && quests.length > 0 && <QuestTable quests={quests} />}
        </div>
    );
}
