export interface LoginPayload {
    email: string,
    password: string
}

export interface CreateProjectPayload {
    project_name: string
}

export interface BinaryResponse {
    result: boolean
    message: string
}

export interface signupPayload {
    username: string
    email: string
    password: string
}

export interface LoggedUserInfo {
    id: number
    username: string
    email: string
    role: string
}

export interface UserInfo {
    id: number
    username: string
    email: string
    disabled: boolean
}

export interface Alert {
    type: string
    message: string
}

export interface SourceSentence {
    "sentence_id": number,
    "project_id": number,
    "source_sentence": string
}

export interface ResponseSentence {
    "project_id": number,
    "source_sentence_id": number,
    "user_id": number,
    "sentence_id": number,
    "response_sentence": string,
    "created_at": string
}

export interface ProjectInfo {
    "project_name": string,
    "created_at": string,
    "project_id": number,
    "is_published": boolean
}