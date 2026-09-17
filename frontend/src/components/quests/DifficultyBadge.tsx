// Import the generic badge from components/ui, and apply the quests colors 

import type { Difficulty } from "../../types/quest";
import { Badge } from "../ui/Badge";

const DIFFICULTY_STYLES: Record<Difficulty, { label: string; color: "green" | "yellow" | "red" | "purple" }> = {
    EASY: { label: "EASY", color: "green" },
    MEDIUM: { label: "MEDIUM", color: "yellow" },
    HARD: { label: "HARD", color: "red" },
    EPIC: { label: "EPIC", color: "purple" },
};

interface DifficultyBadgeProps {
    difficulty: Difficulty;
}

export function DifficultyBadge({ difficulty }: DifficultyBadgeProps) {
    const { label, color } = DIFFICULTY_STYLES[difficulty];
    return <Badge label={label} color={color} />;
}
