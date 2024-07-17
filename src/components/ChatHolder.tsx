import { useEffect, useState } from 'react';
import MinimumNavbar from '../components/MinimumNavbar';
import MessageAppBackground from '../components/MessageAppBackground';
import { ProjectInfo } from '../Api/Interfaces';
import { getProjects } from '../Api/ApiUser';
import ProjectChat from './ProjectChat';
import { Outlet } from 'react-router-dom';
// import PrivateAuthProvider from '../Auth/PrivateAuthProvider';


const ChatHolder = () => {

    const [projects, setProjects] = useState<ProjectInfo[] | undefined>(undefined)

    const fetchProjects = async () => {
        const fetchedProjects = await getProjects()
        console.log("projects: ", fetchProjects)
        if (fetchedProjects)
            setProjects(fetchedProjects)
        else
            setProjects(undefined)
    }

    useEffect(() => {
        fetchProjects()
    }, [])

    return (
        <>
            {/* <PrivateAuthProvider /> */}
            <MinimumNavbar />
            <div className="container">
                <div className="d-flex justify-content-center vh-100">
                    <div className="row w-100">
                        <MessageAppBackground className="col-4 mt-5 left-container">
                            {projects ?
                                projects.map((project, index) => (
                                    <ProjectChat key={index} to={`${project.project_id}`} >{project.project_name}</ProjectChat>
                                ))
                                :
                                <><div className="alert alert-danger" role="alert">No published projects</div></>
                            }
                        </MessageAppBackground>

                        <MessageAppBackground className="col-8 mt-5 right-container">
                            <Outlet />
                        </MessageAppBackground>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChatHolder;
