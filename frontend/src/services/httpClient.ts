import type { ApiError } from "../types/api";

const API_BASE_URL = "http://localhost:8080/api";

// async : return a promise, keep executing code while waiting
// <T> : generic, don't know the type yet, can be a quest, an adventurer... 
// options? : not mandatory, can be nothing (GET) or something (POST, PUT)
// RequestInit : a TypeScript type that knows fetch, no need to define it 
export async function request<T>(path: string, options?: RequestInit) : Promise<T> { 

    const response = await fetch(`${API_BASE_URL}${path}`, options); 

    // if the response was unsuccessful 
    if (!response.ok) { 
        // parse its content from JSON and throw it as an ApiError
        const error: ApiError = await response.json();
        throw error; 
    }

    // for DELETE, when successful, code is success 204 no content
    // such a call is a request<void> 
    if (response.status === 204) {
        // in that case, tell TypeScript "trust me, undefined is valid here" (type assertion)
        // (it wouldn't be for a request<Quest>), so nest it in a "if 204" condition
        return undefined as T;
    } 

    // if the response is successful, return the promise 
    return await response.json(); 

}