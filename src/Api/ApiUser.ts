import axiosInstance from "./AxiosConfig"
import { LoginPayload, ResponseSentence, signupPayload, SourceSentence } from "./Interfaces"
import { saveToken, saveUserInfoLocalstorage, splitToken } from "../Auth/Auth"
import { getLoggedUserInfo } from "./ApiAuth"


// user login
export const userLogin = async ({ email, password }: LoginPayload) => {
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

    return await axiosInstance.post("auth/create-user", payload)
}


export const getSourceSentences = async (sentence_id: number): Promise<SourceSentence | undefined> => {
    const response = await axiosInstance.get(`user/source/${sentence_id}`)
    if (response.data)
        return response.data as SourceSentence
    else
        return undefined
}

export const getOngoingSentence = async (projectId:number): Promise<SourceSentence | undefined> => {
    const response = await axiosInstance.get(`user/source?project_id=${projectId}`)
    if (response.data)
        return response.data as SourceSentence
    else
        return undefined
}

export const getNextSourceSentences = async (projectId: number): Promise<SourceSentence | undefined> => {
    const response = await axiosInstance.get(`user/source?project_id=${projectId}`)
    if (response.data)
        return response.data as SourceSentence
    else
        return undefined
}

export const getResponses = async (projectId:number, skip: number, limit: number = 5): Promise<ResponseSentence[] | undefined> => {
    const response = await axiosInstance.get(`user/responses?project_id=${projectId}&limit=${limit}&skip=${skip}`)
    if (response)
        return response.data
    else
        return undefined
}

export const sendResponse = async (sourceSentenceId: number, projectId: number, responseSentence: string): Promise<boolean> => {
    const responseData = {
        "source_id": sourceSentenceId,
        "project_id": projectId,
        "sentence": responseSentence
    }
    return await axiosInstance.post("user/response/new", responseData) ? true : false
}