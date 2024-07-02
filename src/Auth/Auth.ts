import Cookies from "js-cookie"
import { getLoggedUserInfo, isValidAdminToken, isValidToken } from "../Api/ApiAuth"
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
    console.log("token payload is: ", token_payload)
    if (token_payload === "" || token_signature === "")
        return null

    const token = token_payload + '.' + token_signature
    return token
}

export const removeStoredToken = (): boolean => {
    try {
        console.log("calleddddd")
        localStorage.removeItem("token_payload")
        Cookies.remove("token_signature")
        console.log("after called: ", localStorage.getItem("token_payload"))
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
        return true
    } catch (error) {
        console.log("Failed to save userdata to local storage.")
        return false
    }

}

export const getSavedUserInfoFromLocalstorage = (): LoggedUserInfo | null => {
    try {
        return {
            id: Number(localStorage.getItem("id") ?? 0),
            username: localStorage.getItem("username") ?? "",
            email: localStorage.getItem("email") ?? ""
        }
    } catch (error) {
        console.log("Failed to retriew data from local storage.")
        return null
    }
}

// export const useAuth = async (): Promise<boolean> => {
//     // const user = localStorage.getItem("Token")
//     if (getStoredToken()) {
//         try {
//             const validToken = await isValidToken()
//             if (!validToken)
//                 return false
//             const currentUser = await getLoggedUserInfo()
//             if (!currentUser)
//                 return false
//             saveUserInfoLocalstorage(currentUser)
//             return true
//         } catch (error) {
//             return false
//         }
//     }
//     else {
//         return false
//     }
// }

export const useAuth = async (): Promise<boolean> => {
    // const user = localStorage.getItem("Token")
    await new Promise(resolve => setTimeout(resolve, 2000)); // Introducing 5-second delay
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

export const useAdminAuth = async (): Promise<boolean> => {
    if (getStoredToken()) {
        try {
            const validToken = await isValidAdminToken()
            if (!validToken)
                return false
            Cookies.set("isAdmin", "true")
            return true
        } catch (error) {
            return false
        }
    }
    else {
        return false
    }
}

export const useMinAuth = (): boolean => { // Introducing 5-second delay
    const token = getStoredToken()
    console.log("from min auth, token is: ", token)
    if (token) {
        return true
    } {
        return false
    }
}

// const PrivateRouteProvider = () => {
//     const isLoggedIn = useAuth()
//     isLoggedIn ? <Outlet /> : <Navigate replace to={"/login"} />
// }

// export default PrivateRouteProvider