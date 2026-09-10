// enumerations in typescript are unions
export type Difficulty = "EASY" | "MEDIUM" | "HARD" | "EPIC";
export type QuestStatus = "AVAILABLE" | "ON_GOING" | "COMPLETED";

// a full quest with all its attribute
export interface Quest { 
    id: number;
    title: string; 
    description: string; 
    difficulty: Difficulty; 
    requiredLevel: number;
    goldReward: number; 
    xpReward: number; 
    status: QuestStatus; 
}

// a quest DTO without id or status using omit 
export type QuestRequest = Omit<Quest, "id" | "status">;