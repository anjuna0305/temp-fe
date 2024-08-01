import { useEffect, useState } from "react"
import { downloadResponses, downloadResponsesByUser, getProjectInfo, getRespondedUsers, getResponseCount, getSourceSentenceCount, publishProject, unPublishProject, uploadSourceSentenceFiles } from "../Api/ApiAdmin"
import { ProjectInfo, UserInfo } from "../Api/Interfaces"
import { saveAs } from 'file-saver'
import AdminAuthProvider from "../Auth/AdminAuthProvider"
import { useParams } from "react-router-dom"

const alerTypes = {
    success: "success",
    error: "warning",
    info: "info"
}

interface Alert {
    message: string,
    alertClass: string
}

interface MoreProjectInfo {
    totalSource: string
    totalResponse: string
    projectState: boolean
}

const ProjectInfoPage = () => {
    const [projectInfo, setProjectInfo] = useState<ProjectInfo | undefined>({} as ProjectInfo)
    const [alert, setAlert] = useState<Alert | undefined>(undefined)
    const [isUploadWaiting, setIsUploadWaiting] = useState(false)

    const [moreProjectInfo, setMoreProjectInfo] = useState<MoreProjectInfo | undefined | null>(undefined)
    const [isMoreInfoLoading, setMoreInfoLoading] = useState(false)

    const [publishAlert, setPublishAlert] = useState<Alert | undefined>(undefined)
    const [isPublishWaiting, setIsPublishWaiting] = useState(false)

    const [respondedUsers, setRespondedUsers] = useState<UserInfo[] | undefined>()

    const params = useParams()
    const projectId = Number(params.id)

    const resetAlert = () => {
        if (alert)
            setAlert(undefined)
    }

    const fetchProjectInfo = async () => {
        const projectInfo = await getProjectInfo(projectId)
        console.log("project info: ", projectInfo)
        if (projectInfo) {
            setProjectInfo(projectInfo)
        } else {
            setProjectInfo(undefined)
        }
    }

    const fetchRespondedUsers = async () => {
        const users = await getRespondedUsers(projectId)
        users ? setRespondedUsers(users) : setRespondedUsers(undefined)
    }


    const getResponsesByUser = async (userId: number, userName: string) => {
        const response = await downloadResponsesByUser(projectId, userId)
        if (response) {
            const contentType = response.headers['content-type'] || 'application/octet-stream'
            const blob = new Blob([response.data], { type: contentType })
            saveAs(blob, `project_${projectId}_${userName}_responses.zip`)
        }
    }

    const getResponses = async () => {
        const response = await downloadResponses(projectId)
        if (response) {
            const contentType = response.headers['content-type'] || 'application/octet-stream'
            const blob = new Blob([response.data], { type: contentType })
            saveAs(blob, `project_${projectId}_responses.zip`)
        }
    }


    const fetchMoreProjectInfo = async () => {
        setMoreInfoLoading(true)
        const infoObj = {} as MoreProjectInfo

        // fetch source sentence count
        const sourceSentenceCount = await getSourceSentenceCount(projectId)
        infoObj.totalSource = sourceSentenceCount ? sourceSentenceCount.toString() : "---"

        // fetch response count
        const responseCount = await getResponseCount(projectId)
        infoObj.totalResponse = responseCount ? responseCount.toString() : "---"

        setMoreInfoLoading(false)
        setMoreProjectInfo(infoObj)
    }

    const uploadFile = async () => {
        resetAlert()

        const fileInput = document.getElementById('sourceSentenceFile') as HTMLInputElement;
        const file = fileInput?.files?.[0];
        if (file) {
            try {
                setIsUploadWaiting(true);
                const formData = new FormData();
                formData.append('file', file);
                const response = await uploadSourceSentenceFiles(projectId, formData)

                if (response) {
                    fileInput.value = '';
                    setAlert({ message: "File uploaded successfully.", alertClass: alerTypes.success } as Alert)
                    return true
                }
                else {
                    setAlert({ message: "Something went wrong.", alertClass: alerTypes.error } as Alert)
                    return false
                }

            } catch (error) {
                setAlert({ message: "Error uploading file.", alertClass: alerTypes.error } as Alert)
                return false;
            }
            finally {
                setIsUploadWaiting(false)
            }
        } else {
            setAlert({ message: "Please select a file.", alertClass: alerTypes.error } as Alert)
            return false
        }
    }

    const handlePublish = async () => {
        try {
            setIsPublishWaiting(true)

            if (projectInfo?.is_published) {
                const result = await unPublishProject(projectId)
                if (result && projectInfo) {
                    const updatedProjectInfo = { ...projectInfo, is_published: false }
                    setProjectInfo(updatedProjectInfo)
                }
            } else {
                const result = await publishProject(projectId)
                if (result && projectInfo) {
                    const updatedProjectInfo = { ...projectInfo, is_published: true }
                    setProjectInfo(updatedProjectInfo)
                }
            }
        } catch (error) {
            console.log(error)
        } finally {
            setIsPublishWaiting(false)
        }

    }

    useEffect(() => {
        if (projectId) {
            fetchProjectInfo()
            fetchMoreProjectInfo()
            fetchRespondedUsers()
        }
    }, [])

    useEffect(() => {
        setTimeout(resetAlert, 3000)
    }, [alert])

    return (
        <>
            <AdminAuthProvider />

            {projectInfo ?
                <>
                    <div className="mb-5">
                        <h3 >Project name: {projectInfo.project_name}</h3>
                        <button
                            className={`btn btn-${projectInfo.is_published ? "danger" : "success"} btn-sm`}
                            disabled={isPublishWaiting}
                            onClick={handlePublish}
                        >{projectInfo.is_published ? "Unpublish" : "Publish"} project</button>
                    </div>

                    <section className="mb-5">
                        <h5>Project information</h5>

                        <div className="card px-3 py-1" style={{ width: "450px" }}>
                            {moreProjectInfo ?
                                <>
                                    <div className="row py-2">
                                        <div className="col-7">Project Name</div>
                                        <strong className="col-5">{projectInfo.project_name}</strong>
                                    </div>
                                    <div className="row py-2">
                                        <div className="col-7">Total sentences</div>
                                        <strong className="col-5">{moreProjectInfo.totalSource}</strong>
                                    </div>
                                    <div className="row py-2">
                                        <div className="col-7">Total responses</div>
                                        <strong className="col-5">{moreProjectInfo.totalResponse}</strong>
                                    </div>
                                    <div className="row py-2">
                                        <div className="col-7">Project State</div>
                                        <strong className="col-5">{projectInfo.is_published ? "published" : "unpublished"}</strong>
                                    </div>
                                    <button className="btn btn-outline-secondary btn-sm m-2" disabled={isMoreInfoLoading} onClick={fetchMoreProjectInfo}>Refesh data</button>
                                </>
                                :
                                <>
                                    {projectInfo === null ?
                                        <><button className="btn btn-outline-secondary btn-sm m-4" disabled={isMoreInfoLoading} onClick={fetchMoreProjectInfo}>Load data</button></>
                                        :
                                        <>
                                            <div className={`alert alert-danger m-2`} role="alert">something went wrong!</div>
                                            <button className="btn btn-outline-secondary btn-sm m-2" disabled={isMoreInfoLoading} onClick={fetchMoreProjectInfo}>Retry again</button>
                                        </>
                                    }

                                </>
                            }
                        </div>
                    </section>

                    <section className="mb-4">
                        <h5>Upload Sentences</h5>
                        {alert ?
                            (
                                <div className={`alert alert-${alert.alertClass}`} role="alert">{alert.message}</div>
                            )
                            :
                            <></>
                        }

                        <div className="input-group mb-5 w-50">
                            <input type="file" className="form-control" id="sourceSentenceFile" />
                            <button className="btn btn-success btn-sm" onClick={uploadFile} disabled={isUploadWaiting}>Upload file</button>
                        </div>
                    </section >

                    <section className="mb-5">
                        <h5>Download Responses</h5>
                        <button className="btn btn-warning btn-sm" onClick={getResponses}>Download All responses</button>
                        <h6 className="mt-4">Responded users</h6>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">User</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {respondedUsers ?
                                    respondedUsers.map((user, index) => (
                                        <tr key={index}>
                                            <td>{user.username}</td>
                                            <td><button className="btn btn-sm btn-warning" onClick={() => getResponsesByUser(user.id, user.username)}>Download responses</button></td>
                                        </tr>)
                                    )

                                    :
                                    <div className={`alert alert-danger`} role="alert">No responses yet.</div>
                                }

                            </tbody>
                        </table>
                    </section>
                </>
                :
                <>
                    <div className={`alert alert-danger`} role="alert">Invalid project id, or something went wrong.</div>
                </>
            }
        </>
    )
}

export default ProjectInfoPage
