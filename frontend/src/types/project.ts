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

export interface ProjectError {
    message: string,
    errors: {
        name?: string[]
        description?: string[]
        theme_id?: string[]
    }
}
