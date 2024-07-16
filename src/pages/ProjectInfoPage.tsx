import { useEffect, useState } from "react"
import { downloadResponses, getProjectInfo, uploadSourceSentenceFiles } from "../Api/ApiAdmin"
import { ProjectInfo } from "../Api/Interfaces"
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

const ProjectInfoPage = () => {
    const [projectInfo, setProjectInfo] = useState<ProjectInfo | undefined>({} as ProjectInfo)
    const [alert, setAlert] = useState<Alert | undefined>(undefined)

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

    const getResponses = async () => {
        const response = await downloadResponses(projectId)
        if (response) {
            const contentType = response.headers['content-type'] || 'application/octet-stream'
            const blob = new Blob([response.data], { type: contentType })
            saveAs(blob, `project_${projectId}_responses.zip`)
        }
    }

    const uploadFile = async () => {
        resetAlert()

        const fileInput = document.getElementById('sourceSentenceFile') as HTMLInputElement;
        const file = fileInput?.files?.[0];
        if (file) {
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
        } else {
            setAlert({ message: "Please select a file.", alertClass: alerTypes.error } as Alert)
            return false
        }
    }

    useEffect(() => {
        if (projectId) {
            fetchProjectInfo()
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
                    <h3 className="mb-5">{projectInfo.project_name}</h3>
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
                            <button className="btn btn-success btn-sm" onClick={uploadFile}>Upload file</button>
                        </div>
                    </section >

                    <section className="mb-5">
                        <h5>Download Responses</h5>
                        <button className="btn btn-primary btn-sm" onClick={getResponses}>Download responses</button>
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
