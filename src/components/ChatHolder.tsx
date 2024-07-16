import { useEffect, useState } from 'react';
import MinimumNavbar from '../components/MinimumNavbar';
import MessageAppBackground from '../components/MessageAppBackground';
import { ProjectInfo } from '../Api/Interfaces';
// import PrivateAuthProvider from '../Auth/PrivateAuthProvider';


const ChatHolder = () => {

    const [projects, setProjects] = useState<ProjectInfo | undefined>(undefined)




    return (
        <>
            {/* <PrivateAuthProvider /> */}
            <MinimumNavbar />
            <div className="container">
                <div className="d-flex justify-content-center vh-100">
                    <div className="row w-100">
                        <MessageAppBackground className="col-4 mt-5 left-container">

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
