import axiosInstance from "./AxiosConfig"
import {LoginPayload, signupPayload, SourceSentence} from "./Interfaces"
import {saveToken, saveUserInfoLocalstorage, splitToken} from "../Auth/Auth"
import {getLoggedUserInfo} from "./ApiAuth"


// user login
export const userLogin = async ({email, password}: LoginPayload) => {
    // prepare the login form
    const form_data = new FormData()
    form_data.append("username", email)
    form_data.append("password", password)

    // send post request to backend
    const response = await axiosInstance.post("/auth/token", form_data, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
    if (response.data.access_token) {
        /*
            token will split to 3 parts fom '.'
            first two parts will re-concatinate with '.' and store in local storage
            and the 3rd part(the signature will be stored in Cookie storage.)
            when user send request to backend those parts will concatinate with '.' 
            the reason for doing this is - security puposes.
        */
        const token: string = response.data.access_token
        const split_token = splitToken(token)

        saveToken(split_token)
        // Cookies.set("refreshToken", response.data.refreshToken, { expires: 1 });

        const userData = await getLoggedUserInfo()
        if (userData) {
            saveUserInfoLocalstorage(userData)
        }
    }
    return response
}


export const userSignup = async (payload: signupPayload) => {
    try {
        return await axiosInstance.post("auth/create-user", payload)
    } catch (error) {
        throw error
    }
}


export const getSourceSentences = async (sentence_id: number): Promise<SourceSentence | undefined> => {
    try {
        const response = await axiosInstance.get(`user/source/${sentence_id}`)
        if (response.data)
            return response.data as SourceSentence
        else
            return undefined
    } catch (error) {
        throw error
    }
}

export const getNextSourceSentences = async (projectId: number): Promise<SourceSentence | undefined> => {
    try {
        const response = await axiosInstance.get(`user/source?project_id=${projectId}`)
        if (response.data)
            return response.data as SourceSentence
        else
            return undefined
    } catch (error) {
        throw error
    }
}