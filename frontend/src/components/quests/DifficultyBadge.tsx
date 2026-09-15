// Import the generic badge from components/ui, and apply the quests colors 

import type { Difficulty } from "../../types/quest";
import { Badge } from "../ui/Badge";

const DIFFICULTY_STYLES: Record<Difficulty, { label: string; color: "green" | "yellow" | "red" | "purple" }> = {
    EASY: { label: "Easy", color: "green" },
    MEDIUM: { label: "Medium", color: "yellow" },
    HARD: { label: "Hard", color: "red" },
    EPIC: { label: "Epic", color: "purple" },
};

interface DifficultyBadgeProps {
    difficulty: Difficulty;
}

export function DifficultyBadge({ difficulty }: DifficultyBadgeProps) {
    const { label, color } = DIFFICULTY_STYLES[difficulty];
    return <Badge label={label} color={color} />;
}
