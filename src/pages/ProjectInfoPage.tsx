import { useEffect, useState } from "react"
import { downloadResponses, getProjectInfo, uploadSourceSentenceFiles } from "../Api/ApiAdmin"
import { ProjectInfo } from "../Api/Interfaces"
import { saveAs } from 'file-saver'
import AdminAuthProvider from "../Auth/AdminAuthProvider"

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
    const [projectInfo, setProjectInfo] = useState<ProjectInfo>({} as ProjectInfo)
    const [alert, setAlert] = useState<Alert | undefined>(undefined)

    const projectId = 1

    const resetAlert = () => {
        if (alert)
            setAlert(undefined)
    }

    const fetchProjectInfo = async () => {
        const projectInfo = await getProjectInfo(projectId)
        if (projectInfo) {
            setProjectInfo(projectInfo)
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

    const getSourceSentences = async () => {
        // implement this function
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
        fetchProjectInfo()
    }, [])

    useEffect(() => {
        setTimeout(resetAlert, 3000)
    }, [alert])

    return (
        <>
            <AdminAuthProvider />
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
                <h5>Download Sentences</h5>
                <button className="btn btn-primary btn-sm" onClick={getSourceSentences}>Download sentences</button>
            </section>

            <section className="mb-5">
                <h5>Download Responses</h5>
                <button className="btn btn-primary btn-sm" onClick={getResponses}>Download responses</button>
            </section>
        </>
    )
}

export default ProjectInfoPage
