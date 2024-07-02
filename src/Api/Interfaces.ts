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

export interface ApiServiceData {
    name: string,
    description: string,
    id: number
    port: number
    documentation: string
    is_active: boolean
}

export interface UserApiServiceData {
    api_service_id: number
    api_service_name: string
    status: string
    access: boolean
    request_per_action: number
    exp_date: string
}

export interface Alert {
    type: string
    message: string
}

export interface AccessRequestData {
    user_id: number
    api_service_id: number
    status: string
    request_per_action: number
    created_at: string
    exp_date: string
    username: string
    api_service_name: string
}

export interface CreateApiServicePayload {
    name: string,
    port: number,
    description: string,
    documentation: null | File
}