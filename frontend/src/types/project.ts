import type { ThemeResponse } from "./theme"

export interface ProjectRequest {
    name: string,
    description: string,
    theme_id: number
}

export interface ProjectResponse {
    id: number,
    name: string,
    description: string,
    theme: ThemeResponse
}
