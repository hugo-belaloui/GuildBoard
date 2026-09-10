export interface Assignment { 
    id: number;
    adventurerId: number;
    questId: number;
    // no Date in JS/TS, a string for now, will be parsed 
    assignedAt: string;
    // can be both since none on creation 
    completedAt: string | null; 
}

// assign type, only need 1 field so "Pick" over "Omit"
export type AssignAdventurerRequest = Pick<Assignment, "adventurerId">;