import { request } from "./httpClient.ts" 
import type { Adventurer, AdventurerRequest } from "../types/adventurer.ts"
import type { Assignment } from "../types/assignment.ts"

// GET all adventurers
export async function getAdventurers() : Promise<Adventurer[]> { 

    return request<Adventurer[]>("/adventurers");
}

// GET an adventurer with its id 
export async function getAdventurer(id: number) : Promise<Adventurer> { 

    return request<Adventurer>(`/adventurers/${id}`);
}

// POST an adventurer
export async function createAdventurer(adventurer: AdventurerRequest) : Promise<Adventurer> { 

    const options: RequestInit = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(adventurer),
    };

    return request<Adventurer>("/adventurers", options);
}

// PUT update an adventurer
export async function updateAdventurer(id: number, adventurer: AdventurerRequest) : Promise<Adventurer> { 

    const options: RequestInit = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(adventurer),
    };
    
    return request<Adventurer>(`/adventurers/${id}`, options);
}

// DELETE an adventurer
export async function deleteAdventurer(id: number) : Promise<void> {
    
    return request<void>(`/adventurers/${id}`, { method: "DELETE" });
}

// GET an adventurer's assignments history
export async function getAdventurerHistory(id: number) : Promise<Assignment[]> {

    return request<Assignment[]>(`/adventurers/${id}/history`);
}