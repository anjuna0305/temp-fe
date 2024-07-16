import { useEffect, useState } from 'react';
import MinimumNavbar from '../components/MinimumNavbar';
import MessageAppBackground from '../components/MessageAppBackground';
import { ProjectInfo } from '../Api/Interfaces';
import { getProjects } from '../Api/ApiUser';
import ProjectChat from './ProjectChat';
// import PrivateAuthProvider from '../Auth/PrivateAuthProvider';


const ChatHolder = () => {

    const [projects, setProjects] = useState<ProjectInfo[] | undefined>(undefined)

    const fetchProjects = async () => {
        const fetchedProjects = await getProjects()
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
                            <ProjectChat to='/12' /><ProjectChat to='13' /><ProjectChat to='14' />
                        </MessageAppBackground>

                        <MessageAppBackground className="col-8 mt-5 right-container">

                        </MessageAppBackground>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChatHolder;
