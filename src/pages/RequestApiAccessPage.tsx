// import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getServiceByServiceId } from '../Api/ApiService'
import { ApiServiceData, Alert } from '../Api/Interfaces'
import PageLoadSpinner from '../components/PageLoadSpinner'
import { getApiAccessRequest, sendApiAccessRequest } from '../Api/ApiUser'
import { AxiosError } from 'axios'

const RequestApiAccessPage = () => {
    const params = useParams()
    const apiId = Number(params.id)
    if (isNaN(apiId)) {
        throw new Error("Invalid ID")
    }

    // hooks to hold service info
    const [pageLoadSpinner, setPageLoadSpinner] = useState(true)
    const [isService, setIsService] = useState<boolean>(true)
    const [serviceInfo, setServiceInfo] = useState<ApiServiceData>({} as ApiServiceData)
    const [alertState, setAlertState] = useState<Alert | undefined>(undefined)
    const [requestState, setRequestState] = useState(false) //true if req already sent, else falese
    const [waiting, setWaiting] = useState<boolean>(false)

    const loadApiserviceData = async (id: number) => {
        const service = await getServiceByServiceId(id)
        if (!service) {
            setIsService(false)
        }
        else {
            setIsService(true)
            setServiceInfo(service)
        }
    }

    const fetchRequestStatus = async () => {
        try {
            const request = await getApiAccessRequest(apiId)
            console.log("request code: ", request.status)
            if (request.status === 200) {
                setRequestState(false)
            }
        } catch (error) {
            setRequestState(true)
            if (error instanceof AxiosError)
                setAlertState({ type: "info", message: error.response?.data.detail })
        }
    }

    useEffect(() => {
        loadApiserviceData(apiId)
        fetchRequestStatus()
        setPageLoadSpinner(false)
    }, [])

    const handleSendRequest = async () => {
        setWaiting(true)
        try {
            const response = await sendApiAccessRequest(apiId)
            if (response.status === 200) {
                // request sent
                setAlertState({ type: "success", message: "Your request sent to admins." } as Alert)
                setRequestState(true)
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                //  thre is a error
                setAlertState({ type: "danger", message: error.response?.data.detail } as Alert)
            }
        }
        setWaiting(false)
    }

    return (
        <>
            <PageLoadSpinner active={pageLoadSpinner} />
            <div className='container'>
                <div className="card mt-5 p-4">
                    {
                        isService ?
                            //service not founcd
                            <>
                                {alertState ? <div className={`alert alert-${alertState.type}`} role="alert">{alertState.message}</div> : <></>}

                                <h3>Apply acces for - {serviceInfo.name}</h3>
                                <div className='mt-4'>
                                    <h5>Terms and conditions</h5>
                                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis adipisci assumenda illum voluptatem facere sit soluta quibusdam eius modi earum consectetur, atque, ab a accusamus ex. Ea sit corrupti autem impedit, voluptas minima saepe cumque provident recusandae rerum officia illo iusto eos similique mollitia sed unde? Non, natus minima. Veniam.</p>
                                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis adipisci assumenda illum voluptatem facere sit soluta quibusdam eius modi earum consectetur, atque, ab a accusamus ex. Ea sit corrupti autem impedit, voluptas minima saepe cumque provident recusandae rerum officia illo iusto eos similique mollitia sed unde? Non, natus minima. Veniam.</p>
                                    <h6>by applying the service you will approve terms and conditions</h6>
                                </div>
                                <div className='mt-4'>
                                    <button className='btn btn-primary' onClick={handleSendRequest} disabled={waiting || requestState}>
                                        <span className={`spinner-border spinner-border-sm ${waiting ? "" : "d-none"}`} aria-hidden="true"></span>
                                        Apply for access
                                    </button>
                                    <button className='btn btn-link' onClick={() => { window.history.go(-1); return false; }}>{requestState ? "" : "Cancel and "}Go back</button>
                                </div>
                            </>
                            :
                            //service not founcd
                            <>
                                {/* 'success' for success */}

                                <h3>Apply acces for a Service</h3>
                                <div className="alert alert-danger mt-3" role="alert">Service not found!</div>
                                <div className='mt-2'>
                                    <button className='btn btn-link' onClick={() => { window.history.go(-1); return false; }}>Go back</button>
                                </div>
                            </>
                    }

                </div>
            </div >
        </>
    )
}

export default RequestApiAccessPage
