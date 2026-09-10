// reflect the JSON error from backend @RestControllerAdvice
export interface ApiError {
    status: number; 
    code: string; 
    message: string; 
}