import { useEffect, useState } from "react"
import { createProject, getProjects } from "../Api/ApiAdmin"
import { CreateProjectPayload, ProjectInfo } from "../Api/Interfaces"
import { Link, useNavigate } from "react-router-dom"
import AdminAuthProvider from "../Auth/AdminAuthProvider"
import { Formik, Field, Form } from "formik"
import * as Yup from 'yup'

const AdminProjectPage = () => {
    const [projects, setProjects] = useState<ProjectInfo[] | undefined>([{} as ProjectInfo])
    const [createProjectWaiting, setCreateProjectWaiting] = useState<boolean>(false)
    const [createProjectError, setCreateProjectError] = useState<string | undefined>(undefined)

    const navigate = useNavigate()

    const fetchAllProjects = async () => {
        const fetchedProjects = await getProjects()
        if (fetchedProjects) {
            console.log("set projects called")
            setProjects(fetchedProjects)
        }
        else {
            setProjects(undefined)
        }
    }


    const handleCreateProject = async (values: CreateProjectPayload) => {
        setCreateProjectWaiting(true)
        setCreateProjectError("")
        try {
            const projectInfo = await createProject(values)
            if (projectInfo) {
                console.log("project info available")
                navigate(`${projectInfo.project_id}`)
            }
        } catch (error) {
            setCreateProjectError("Operation failed.")
        }
        setCreateProjectWaiting(false)
        fetchAllProjects()
    }

    const createProjectValidationSchema = Yup.object().shape({
        project_name: Yup.string().required('Required')
    })

    const SToStdTime = (timeString: string): string => {
        const date = new Date(timeString);
        return date.toLocaleString();
    }

    useEffect(() => {
        fetchAllProjects()
    }, [])


    return (
        <>
            <AdminAuthProvider />
            <section className="mb-5">
                <h3>Create a new project</h3>

                <Formik
                    initialValues={{
                        project_name: '',
                    }}
                    validationSchema={createProjectValidationSchema}
                    onSubmit={values => {
                        handleCreateProject(values);
                    }}
                >
                    {({ errors, touched }) => (
                        <Form className="card p-4" style={{ width: "300px" }}>
                            {/* <h2>Login</h2> */}
                            {createProjectError ? <small className="alert alert-danger d-flex align-items-center" role="alert">{createProjectError}</small> : <></>}

                            <div className="mb-3">
                                <label className="form-label">Project Name</label>
                                <Field className="form-control" id="project_name" name="project_name" type="project_name" />
                                {touched.project_name && errors.project_name && <div id="emailHelp" className="form-text text-danger">{errors.project_name}</div>}
                            </div>
                            <button type="submit" className="btn btn-primary mt-3" disabled={createProjectWaiting}>
                                <span className={`spinner-border spinner-border-sm ${createProjectWaiting ? "" : "d-none"}`} role="status" aria-hidden="true"></span>
                                Create Project
                            </button>
                        </Form>
                    )}
                </Formik>
            </section>


            <section className="mb-5">
                <h3>Projects</h3>
                {projects ?
                    <>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Created date</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {projects.map((project, index) => (
                                    <tr key={index}>
                                        <td>{project.project_name}</td>
                                        <td>{SToStdTime(project.created_at)}</td>
                                        <td><Link to={`${project.project_id}`} role="button" className="btn btn-success btn-sm">project info</Link></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>
                    :
                    <>
                        <div className={`alert alert-warning`} role="alert">No project to show</div>
                    </>
                }
            </section>
        </>
    )
}

export default AdminProjectPage
