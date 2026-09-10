import { request } from "./httpClient.ts" 
import type { Quest } from "../types/quest.ts"

export async function getQuests(): Promise<Quest[]> { 

    return request<Quest[]>("/quests"); 
    
}