export interface LoginPayload {
    email: string,
    password: string
}

export interface BinaryResponse {
    result: boolean
    message: string
}

export interface signupPayload {
    username: string
    email: string
    password: string
    scopes: string
}

export interface LoggedUserInfo {
    id: number
    username: string
    email: string
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