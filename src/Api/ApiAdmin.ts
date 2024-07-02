import axiosInstance from "./AxiosConfig"
import { AccessRequestData, ApiServiceData, CreateApiServicePayload, UserApiServiceData, UserInfo } from "./Interfaces"

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
        if (response.status !== 200)
            return false
        return true
    } catch (error) {
        return false
    }
}

export const unBlockUser = async (userId: number): Promise<boolean> => {
    await delay(3000)
    try {
        const response = await axiosInstance.patch(`admin/users/${userId}/unblock`)
        if (response.status !== 200)
            return false
        return true
    } catch (error) {
        return false
    }
}

export const getRequests = async (status: string, skip: number, limit: number): Promise<AccessRequestData[]> => {
    // pending || approved || rejected
    try {
        const response = await axiosInstance.get("admin/requests", {
            params: {
                status: status,
                skip: skip,
                limit: limit
            }
        })
        return response.data as AccessRequestData[]
    } catch (error) {
        return [] as AccessRequestData[]
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


export const getServicesByUserId = async (userId: number): Promise<UserApiServiceData[]> => {
    try {
        const response = await axiosInstance.get(`admin/users/${userId}/api`)
        if (response.status !== 200)
            return [] as UserApiServiceData[]
        return response.data as UserApiServiceData[]
    } catch (error) {
        return [] as UserApiServiceData[]
    }
}

export const blockService = async (userId: number, apiId: number): Promise<boolean> => {
    await delay(2000)
    try {
        const response = await axiosInstance.patch(`admin/users/${userId}/api/${apiId}/block`)
        if (response.status !== 200) {
            return false
        }
        return true
    } catch (error) {
        return false
    }

}

export const unblockService = async (userId: number, apiId: number): Promise<boolean> => {
    await delay(2000)
    try {
        const response = await axiosInstance.patch(`admin/users/${userId}/api/${apiId}/unblock`)
        if (response.status !== 200) {
            return false
        }
        return true
    } catch (error) {
        return false
    }
}

export const createService = async (values: CreateApiServicePayload) => {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('port', values.port.toString());
    formData.append('description', values.description);
    if (values.documentation) {
        formData.append('documentation', values.documentation);
    }

    const response = await axiosInstance.post("admin/services/new", values, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
    return response
}


export const updateService = async (values: CreateApiServicePayload, apiId: number) => {
    const formData = new FormData()
    formData.append('name', values.name)
    formData.append('port', values.port.toString())
    formData.append('description', values.description)
    if (values.documentation) {
        formData.append('documentation', values.documentation)
    }

    const response = await axiosInstance.put(`/admin/services/${apiId}`, values, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
    return response
}

export const stopService = async (apiId: number) => {
    try {
        const response = await axiosInstance.patch(`admin/api/${apiId}/stop`)
        if (response.status !== 200)
            return false
        return true
    } catch (error) {
        return true
    }
}

export const startService = async (apiId: number) => {
    try {
        const response = await axiosInstance.patch(`admin/api/${apiId}/start`)
        if (response.status !== 200)
            return false
        return true
    } catch (error) {
        return true
    }
}
