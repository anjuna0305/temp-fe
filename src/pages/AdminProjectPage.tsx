import { useEffect, useState } from "react"
import { getProjects } from "../Api/ApiAdmin"
import { ProjectInfo } from "../Api/Interfaces"
import { Link } from "react-router-dom"
import AdminAuthProvider from "../Auth/AdminAuthProvider"

const AdminProjectPage = () => {

    const [projects, setProjects] = useState<ProjectInfo[]>([{} as ProjectInfo])

    const fetchAllProjects = async () => {
        const fetchedProjects = await getProjects()
        if (fetchedProjects) {
            setProjects(fetchedProjects)
        }
    }

    useEffect(() => {
        fetchAllProjects()
    }, [])


    return (
        <>
            <AdminAuthProvider />
            <section className="mb-5">
                <h3>Create a new project</h3>

                <form className="mt-4">
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Project name</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <button type="submit" className="btn btn-primary">Create project</button>
                </form>
            </section>


            <section className="mb-5">
                <h3>Projects</h3>
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
                                <td>{project.created_at}</td>
                                <td><Link to={`${project.project_id}`} role="button" className="btn btn-success btn-sm">project info</Link></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </>
    )
}

export default AdminProjectPage
