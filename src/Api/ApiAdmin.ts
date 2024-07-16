import axiosInstance from "./AxiosConfig"
import { UserInfo, ProjectInfo, CreateProjectPayload } from "./Interfaces"

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getUsers = async (limit: number = 10, skip: number): Promise<UserInfo[]> => {
    try {
        const response = await axiosInstance.get("admin/users", {
            params: {
                limit: limit,
                skip: skip
            }
        })
        return response.data
    } catch (error) {
        return []
    }
}

export const getUserById = async (userId: number): Promise<UserInfo | null> => {
    try {
        const response = await axiosInstance.get(`admin/users/${userId}`)
        if (response.status !== 200)
            return null
        return response.data as UserInfo
    } catch (error) {
        return null
    }
}

export const blockUser = async (userId: number): Promise<boolean> => {
    await delay(3000)
    try {
        const response = await axiosInstance.patch(`admin/users/${userId}/block`)
        return response.status === 200;

    } catch (error) {
        return false
    }
}

export const unBlockUser = async (userId: number): Promise<boolean> => {
    await delay(3000)
    try {
        const response = await axiosInstance.patch(`admin/users/${userId}/unblock`)
        return response.status === 200;

    } catch (error) {
        return false
    }
}



export const approveRequest = async (userId: number, apiServiceId: number) => {
    // await delay(5000)
    try {
        await axiosInstance.put("admin/request/approve", {
            user_id: userId,
            api_service_id: apiServiceId
        })
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}

export const rejectRequest = async (userId: number, apiServiceId: number) => {
    // await delay(5000)
    try {
        await axiosInstance.put("admin/request/reject", {
            user_id: userId,
            api_service_id: apiServiceId
        })
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}



export const blockService = async (userId: number, apiId: number): Promise<boolean> => {
    await delay(2000)
    try {
        const response = await axiosInstance.patch(`admin/users/${userId}/api/${apiId}/block`)
        return response.status === 200;

    } catch (error) {
        return false
    }

}

export const unblockService = async (userId: number, apiId: number): Promise<boolean> => {
    await delay(2000)
    try {
        const response = await axiosInstance.patch(`admin/users/${userId}/api/${apiId}/unblock`)
        return response.status === 200;

    } catch (error) {
        return false
    }
}


export const stopService = async (apiId: number) => {
    try {
        const response = await axiosInstance.patch(`admin/api/${apiId}/stop`)
        return response.status === 200;

    } catch (error) {
        return true
    }
}


export const downloadResponses = async (projectId: number) => {
    return await axiosInstance.get(`admin/responses?project_id=${projectId}`, { responseType: 'blob' })
}


export const getProjects = async (): Promise<ProjectInfo[] | undefined> => {
    try {
        const projects = await axiosInstance.get("admin/project")
        return projects.data
    } catch (error) {
        return undefined
    }
}

export const getProjectInfo = async (projectId: number): Promise<ProjectInfo | undefined> => {
    try {
        const response = await axiosInstance.get(`admin/project/${projectId}`)
        if (projectId)
            return response.data
    } catch (error) {
        return undefined
    }
}

export const uploadSourceSentenceFiles = async (projectId: number, formData: FormData): Promise<boolean> => {
    try {
        const response = await axiosInstance.post(`admin/add_sentence?project_id=${projectId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        if (response)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}


export const createProject = async (values: CreateProjectPayload) => {
    try {
        const response = await axiosInstance.post(`admin/project/new`, values)
        if (response.data)
            return response.data as ProjectInfo
        else
            return undefined
    } catch (error) {
        return undefined
    }
}