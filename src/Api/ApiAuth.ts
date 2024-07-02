import { removeStoredToken } from "../Auth/Auth"
import axiosInstance from "./AxiosConfig"
import { LoggedUserInfo } from "./Interfaces"

export const isValidToken = async (): Promise<boolean> => {
    try {
        const response = await axiosInstance.get("auth/current-user")
        if (response.status == 200) {
            return true
        } else {
            removeStoredToken()
            return false
        }
    } catch (error) {
        return false
    }

}

export const isValidAdminToken = async (): Promise<boolean> => {
    try {
        const response = await axiosInstance.get("auth/admin-token")
        if (response.status == 200) {
            return true
        } else {
            removeStoredToken()
            return false
        }
    } catch (error) {
        return false
    }

}

export const getLoggedUserInfo = async (): Promise<LoggedUserInfo | null> => {
    try {
        const response = await axiosInstance.get("auth/current-user")
        if (response.status == 200) {
            const loggedUserInfo: LoggedUserInfo = response.data
            return loggedUserInfo
        } else {
            removeStoredToken()
            return null
        }
    } catch (error) {
        return null
    }

}