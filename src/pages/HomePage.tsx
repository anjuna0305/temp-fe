import { useEffect, useState } from 'react';
import MinimumNavbar from '../components/MinimumNavbar';
import MessageAppBackground from '../components/MessageAppBackground';
import { getLastId, getOngoingSentence, getProjects, getResponses, getSourceSentences, sendResponse } from '../Api/ApiUser';
import { ProjectInfo, ResponseSentence, SourceSentence } from '../Api/Interfaces';

interface MessageInterface {
    type: 'source' | 'response' | 'error';
    content: string;
    status: 'sending' | 'sent' | 'failed';
}

const HomePage = () => {
    const [projectId, setProjectId] = useState<number | undefined>(undefined);
    const [sourceId, setSourceId] = useState<number | undefined>(0);
    const [lastResponseId, setLastResponseId] = useState<number | undefined>(undefined)
    const [lastId, setLastId] = useState<number>(0)
    const [messages, setMessages] = useState<MessageInterface[]>([]);
    const [isMessageAllowed, setMessageAllowed] = useState<boolean>(false);
    const [msgSkip, setMsgSkip] = useState<number>(0);
    const [projects, setProjects] = useState<ProjectInfo[] | undefined>(undefined)
    const msgLimit = 20;

    useEffect(() => {
        fetchData();
        fetchProjects()
    }, []);

    useEffect(() => {
        fetchData();
    }, [projectId])

    const fetchData = async () => {
        try {
            if (projectId) {
                await fetchLastId()
                await fetchInitialMessages();
                await fetchOngoingSentence();
                setMessageAllowed(true);
            }
        } catch (error) {
            console.error('Error fetching initial data:', error);
        }
    };

    const fetchLastId = async () => {
        if (projectId) {
            const finalIdOFProject = await getLastId(projectId)
            setLastId(finalIdOFProject)
            console.log("last id called: ", finalIdOFProject)
            console.log("source id called: ", sourceId)
        }
    }

    const handleProjectChange = async (newProjectId: number) => {
        if (projectId !== newProjectId) {
            setSourceId(0)
            setMessages([])
            setMessageAllowed(true)
            setMsgSkip(0)
            setProjectId(newProjectId)
        }
    }


    const fetchProjects = async () => {
        const fetchedProjects = await getProjects()
        if (fetchedProjects)
            setProjects(fetchedProjects)
        else
            setProjects(undefined)
    }

    const fetchInitialMessages = async () => {
        const initialResponseLoad = await fetchResponses();
        if (initialResponseLoad) {
            const messageInterfaces = await generateRequestResponseList(initialResponseLoad);
            setMessages(messageInterfaces);
        }
    };

    const fetchResponses = async (): Promise<ResponseSentence[] | undefined> => {
        if (projectId) {
            const responses = await getResponses(projectId, msgSkip, msgLimit);
            console.log("mgskip, mglim", msgSkip, msgLimit)
            if (responses) {
                setMsgSkip(prevSkip => prevSkip + msgLimit);
                setLastResponseId(responses[0].source_sentence_id)
            }
            return responses;
        }
    }

    const fetchSourceSentence = async (id: number): Promise<SourceSentence | undefined> => {
        const sourceSentence = await getSourceSentences(id);
        return sourceSentence;
    };

    const fetchOngoingSentence = async () => {
        if (projectId && lastResponseId != lastId) {
            const ongoingSentence = await getOngoingSentence(projectId)
            if (ongoingSentence) {
                const sourceMessageInterface = sourceSentenceToMessageInterface(ongoingSentence);
                setSourceId(ongoingSentence.sentence_id)
                setMessages(prevMessages => [sourceMessageInterface, ...prevMessages])
            }
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            send();
            setMessageInputValue('')
        }
    };

    const send = async () => {
        if (projectId && sourceId) {
            console.log('Sending message:', sourceId, projectId, messageInputValue);
            const isSent = await sendResponse(sourceId, projectId, messageInputValue);
            if (isSent) {
                console.log('Message sent successfully');
                setMessages(prevMessages => [responseSentenceToMessageInterface({ response_sentence: messageInputValue } as ResponseSentence), ...prevMessages]);
                setLastResponseId(sourceId)
                fetchOngoingSentence()
            }
        }
    };

    // const loadMore = async () => {
    //     const newResponseSet = await fetchResponses();
    //     if (newResponseSet) {
    //         const newMessageInterfaceSet = await generateRequestResponseList(newResponseSet);
    //         setMessages(prevMessages => [...prevMessages, ...newMessageInterfaceSet]);
    //     }
    // };

    const generateRequestResponseList = async (responseList: ResponseSentence[]): Promise<MessageInterface[]> => {
        const messageInterfaceList: MessageInterface[] = [];
        for (let i = 0; i < responseList.length; i++) {
            const responseMessage = responseSentenceToMessageInterface(responseList[i]);
            messageInterfaceList.push(responseMessage);

            const sourceSentence = await fetchSourceSentence(responseList[i].source_sentence_id);
            if (sourceSentence) {
                const sourceMessage = sourceSentenceToMessageInterface(sourceSentence);
                messageInterfaceList.push(sourceMessage);
            }
        }
        return messageInterfaceList;
    };

    const responseSentenceToMessageInterface = (responseMsg: ResponseSentence): MessageInterface => {
        return { type: 'response', content: responseMsg.response_sentence, status: 'sent' };
    };

    const sourceSentenceToMessageInterface = (sourceMsg: SourceSentence): MessageInterface => {
        return { type: 'source', content: sourceMsg.source_sentence, status: 'sent' };
    };

    const [messageInputValue, setMessageInputValue] = useState<string>('');

    return (
        <>
            <MinimumNavbar />
            <div className="container">
                <div className="d-flex justify-content-center vh-100">
                    <div className="row w-100">
                        <MessageAppBackground className="col-4 mt-5 left-container">
                            {projects ?
                                projects.map((project, index) => (
                                    // <ProjectChat key={index} to={`${project.project_id}`} >{project.project_name}</ProjectChat>
                                    <div className={"project-chat"} key={index} onClick={() => { handleProjectChange(project.project_id) }}>{project.project_name}</div>
                                ))
                                :
                                <><div className="alert alert-danger" role="alert">No published projects</div></>
                            }
                        </MessageAppBackground>

                        <MessageAppBackground className="col-8 mt-5 right-container">
                            <div className="message-section" id="msg_application">
                                {lastId === lastResponseId ? <div className="alert alert-info m-2" role="alert">You have responded all sentences.</div> : <></>}
                                {messages.map((message, index) => (
                                    <div className={``} key={index}>
                                        <div className={`message-card ${message.type === 'response' ? 'reply' : 'message'}`}>
                                            {message.content}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div id="message_form">
                                <input
                                    disabled={!isMessageAllowed || lastId === lastResponseId}
                                    type="text"
                                    name="message"
                                    id="message_text_input"
                                    value={messageInputValue}
                                    onChange={(e) => setMessageInputValue(e.target.value)}
                                    onKeyUpCapture={handleKeyPress}
                                />
                                <button disabled={!isMessageAllowed || lastId === lastResponseId} onClick={send} id="send_button">Send</button>
                            </div>
                        </MessageAppBackground>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomePage;
