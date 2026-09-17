import type { Difficulty, QuestStatus } from "../../types/quest";

interface QuestFiltersProps {
    status?: QuestStatus;
    difficulty?: Difficulty;
    onStatusChange: (status: QuestStatus | undefined) => void;
    onDifficultyChange: (difficulty: Difficulty | undefined) => void;
}

export function QuestFilters({ status, difficulty, onStatusChange, onDifficultyChange }: QuestFiltersProps) {
    return (
        <div className="flex gap-4">
            <select
                // ?? : use status, but fall back to "" if it's undefined.
                value={status ?? ""}
                // e.target.value is always a plain string, TypeScript can't know it matches
                // our QuestStatus union on its own
                onChange={(e) => onStatusChange(e.target.value === "" ? undefined : e.target.value as QuestStatus)}
                className="border border-gray-100 rounded-lg px-3.5 py-2.5 bg-white"
            >
                <option value="">All statuses</option>
                <option value="AVAILABLE">Available</option>
                <option value="ON_GOING">On going</option>
                <option value="COMPLETED">Completed</option>
            </select>
            <select
                value={difficulty ?? ""}
                onChange={(e) => onDifficultyChange(e.target.value === "" ? undefined : e.target.value as Difficulty)}
                className="border border-gray-100 rounded-lg px-3.5 py-2.5 bg-white"
            >
                <option value="">All difficulties</option>
                <option value="EASY">Easy</option>
                <option value="MEDIUM">Medium</option>
                <option value="HARD">Hard</option>
                <option value="EPIC">Epic</option>
            </select>
        </div>
    );
}
