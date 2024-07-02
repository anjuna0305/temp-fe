import axiosInstance from "./AxiosConfig"
import { ApiServiceData } from "./Interfaces"


export const getAllServices = async (): Promise<ApiServiceData[] | null> => {
    try {
        const response = await axiosInstance.get("api/api-services")
        if (response.status === 200) {
            console.log(response.data)
            return response.data as ApiServiceData[]
        }
        throw new Error("Failed to fetch data");
    } catch (error) {
        console.log(error)
        return null
    }
}

export const getServiceByServiceId = async (apiId: number): Promise<ApiServiceData | undefined> => {
    try {
        const serviceInfo = await axiosInstance.get(`api/api-service/${apiId}`)
        if (serviceInfo) {
            return serviceInfo.data as ApiServiceData
        }
    } catch (error) {
        console.log(error)
        return undefined
    }
}