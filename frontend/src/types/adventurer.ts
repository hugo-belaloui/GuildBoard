export type CharacterClass = "MAGE" | "WARRIOR" | "RANGER" | "CLERIC";

// a full adventurer interface
export interface Adventurer { 
    id: number; 
    name: string; 
    characterClass: CharacterClass; 
    level: number; 
    xp: number;
    gold: number; 
}

// an adventurer DTO 
export type AdventurerRequest = Omit<Adventurer, "id">;