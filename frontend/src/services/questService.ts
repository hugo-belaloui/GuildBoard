import { request } from "./httpClient.ts" 
import type { Difficulty, Quest, QuestStatus, QuestRequest } from "../types/quest.ts"

// GET a list of quests, with optional status and difficulty 
export async function getQuests(filters?: { status?: QuestStatus; difficulty?: Difficulty })
: Promise<Quest[]> { 
    
    // URLSearchParams : a class to build a query string, handling special character encoding
    const params = new URLSearchParams();

    // if one/two filters are on 
    if (filters?.status) {
        params.append("status", filters.status); 
    }
    if (filters?.difficulty) {
        params.append("difficulty", filters.difficulty); 
    }

    // parse the URLSearchParams into a string 
    const query = params.toString(); 

    // ternary condition : if the query exists, append its parameters to the URL, else do nothing
    return request<Quest[]>(`/quests${query ? "?" + query : ""}`);
}

// GET a quest with its id 
export async function getQuest(id: number) : Promise<Quest> { 

    return request<Quest>(`/quests/${id}`);

}

// POST a quest 
export async function createQuest(quest: QuestRequest) : Promise<Quest> { 

    const options: RequestInit = {
        // GET is default, else needs to be precised 
        method: "POST",
        // Tell the server "the content i'm sending is JSON, now you know how to deserialize it"
        headers: { "Content-Type": "application/json" },
        // The body of a request is a string, so the JSON needs to be parsed
        body: JSON.stringify(quest),
    };

    return request<Quest>("/quests", options);

}

// PUT a quest 
export async function updateQuest(id: number, quest: QuestRequest) : Promise<Quest> { 

    const options: RequestInit = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(quest),
    };

    return request<Quest>(`/quests/${id}`, options);

}

// DELETE a quest

export async function deleteQuest(id: number) : Promise<void> {
    
    return request<void>(`/quests/${id}`, { method: "DELETE" });

}

