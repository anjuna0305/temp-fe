import Cookies from "js-cookie"
import { getLoggedUserInfo,  isValidToken } from "../Api/ApiAuth"
import { LoggedUserInfo } from "../Api/Interfaces"

export interface SpliToken {
    payload: string
    signature: string
}

export const splitToken = (token: string): SpliToken => {
    const split_token = token.split('.')
    const token_payload = split_token[0] + '.' + split_token[1]
    const token_signature = split_token[2]
    return { payload: token_payload, signature: token_signature }
}

export const saveToken = (splitToken: SpliToken): boolean => {
    try {
        localStorage.setItem("token_payload", splitToken.payload);
        Cookies.set("token_signature", splitToken.signature)
        return true
    } catch {
        return false
    }
}

export const getStoredToken = (): string | null => {
    const token_payload = localStorage.getItem("token_payload") ? localStorage.getItem("token_payload") : ""
    const token_signature = Cookies.get("token_signature") ? Cookies.get("token_signature") : ""
    if (token_payload === "" || token_signature === "")
        return null

    const token = token_payload + '.' + token_signature
    return token
}

export const removeStoredToken = (): boolean => {
    try {
        localStorage.removeItem("token_payload")
        Cookies.remove("token_signature")
        return true
    } catch (error) {
        return false
    }
}

// redirect link
export const setRedirectFrom = (url: string) => { //if logged: 1 else 0
    localStorage.setItem("redirect_from", url)
}

export const getRedirectFrom = () => {
    localStorage.getItem("redirect_from")
}

// sessio state
export const setSessionState = (state: number) => { //if logged: 1 else 0
    localStorage.setItem("session_state", `${state}`)
}

export const getSessionState = () => {
    const stateStr = localStorage.getItem("session_state")
    if (stateStr)
        return parseInt(stateStr)
    else
        return 0
}

export const saveUserInfoLocalstorage = (userData: LoggedUserInfo): boolean => {
    try {
        localStorage.setItem("id", `${userData?.id}`)
        localStorage.setItem("username", userData?.username)
        localStorage.setItem("email", userData?.email)
        localStorage.setItem("role", userData?.role)
        return true
    } catch (error) {
        return false
    }
}

export const getSavedUserInfoFromLocalstorage = (): LoggedUserInfo | null => {
    try {
        return {
            id: Number(localStorage.getItem("id") ?? 0),
            username: localStorage.getItem("username") ?? "",
            email: localStorage.getItem("email") ?? "",
            role: localStorage.getItem("role") ?? ""
        }
    } catch (error) {
        return null
    }
}

export const useAuth = async (): Promise<boolean> => {
    if (getStoredToken()) {
        try {
            const validToken = await isValidToken()
            if (!validToken)
                return false
            const currentUser = await getLoggedUserInfo()
            if (!currentUser)
                return false
            saveUserInfoLocalstorage(currentUser)
            return true
        } catch (error) {
            return false
        }
    }
    else {
        return false
    }
}

export const AdminMinAuth = (): boolean => {
    const loggedUserData = getSavedUserInfoFromLocalstorage()
    const token = getStoredToken()
    if (loggedUserData && token) {
        return loggedUserData.role === "admin" ? true : false
    }
    return false
}

export const MinAuth = (): boolean => { // Introducing 5-second delay
    const loggedUserData = getSavedUserInfoFromLocalstorage()
    const token = getStoredToken()
    if (loggedUserData && token) {
        return loggedUserData.role === "reg_user" ? true : false
    }
    return false
}
