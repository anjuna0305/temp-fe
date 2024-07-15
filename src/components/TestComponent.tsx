import { useEffect, useState } from 'react';
import MinimumNavbar from './MinimumNavbar';
import MessageAppBackground from './MessageAppBackground';
import { getOngoingSentence, getResponses, getSourceSentences, sendResponse } from '../Api/ApiUser';
import { ResponseSentence, SourceSentence } from '../Api/Interfaces';

interface MessageInterface {
    type: 'source' | 'response' | 'error';
    content: string;
    status: 'sending' | 'sent' | 'failed';
}

const TestComponent = () => {
    const [projectId, setProjectId] = useState<number>(1);
    const [sourceId, setSourceId] = useState<number>(0);
    const [messages, setMessages] = useState<MessageInterface[]>([]);
    const [isMessageAllowed, setMessageAllowed] = useState<boolean>(false);
    const [msgSkip, setMsgSkip] = useState<number>(0);
    const msgLimit = 3;

    useEffect(() => {
        const fetchData = async () => {
            try {
                setProjectId(1);
                await fetchInitialMessages();
                await fetchOngoingSentence();
                setMessageAllowed(true);
            } catch (error) {
                console.error('Error fetching initial data:', error);
            }
        };
        fetchData();
    });

    const fetchInitialMessages = async () => {
        const initialResponseLoad = await fetchResponses();
        if (initialResponseLoad) {
            const messageInterfaces = await generateRequestResponseList(initialResponseLoad);
            setMessages(messageInterfaces);
        }
    };

    const fetchResponses = async (): Promise<ResponseSentence[] | undefined> => {
        const responses = await getResponses(projectId, msgSkip, msgLimit);
        console.log("mgskip, mglim", msgSkip, msgLimit)
        if (responses) {
            console.log("responses: ", responses)
            setMsgSkip(prevSkip => prevSkip + msgLimit);
        }
        return responses;
    };

    const fetchSourceSentence = async (id: number): Promise<SourceSentence | undefined> => {
        const sourceSentence = await getSourceSentences(id);
        return sourceSentence;
    };

    const fetchOngoingSentence = async () => {
        const ongoingSentence = await getOngoingSentence(projectId);
        if (ongoingSentence) {
            const sourceMessageInterface = sourceSentenceToMessageInterface(ongoingSentence);
            setSourceId(ongoingSentence.sentence_id)
            setMessages(prevMessages => [sourceMessageInterface, ...prevMessages]);
        }
    };

    const send = async () => {
        console.log('Sending message:', sourceId, projectId, messageInputValue);
        const isSent = await sendResponse(sourceId, projectId, messageInputValue);
        if (isSent) {
            console.log('Message sent successfully');
            setMessages(prevMessages => [responseSentenceToMessageInterface({ response_sentence: messageInputValue } as ResponseSentence), ...prevMessages]);
            fetchOngoingSentence()
        }
    };

    const loadMore = async () => {
        const newResponseSet = await fetchResponses();
        if (newResponseSet) {
            const newMessageInterfaceSet = await generateRequestResponseList(newResponseSet);
            setMessages(prevMessages => [...prevMessages, ...newMessageInterfaceSet]);
        }
    };

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
                            {/* Left container content */}
                        </MessageAppBackground>

                        <MessageAppBackground className="col-8 mt-5 right-container">
                            <div className="message-section" id="msg_application">
                                {messages.map((message, index) => (
                                    <div className={``} key={index}>
                                        <div className={`message-card ${message.type === 'response' ? 'reply' : 'message'}`}>
                                            {message.content}
                                        </div>
                                    </div>
                                ))}
                                <button onClick={loadMore}>Load More</button>
                            </div>
                            <div id="message_form">
                                <input
                                    type="text"
                                    name="message"
                                    id="message_text_input"
                                    value={messageInputValue}
                                    onChange={(e) => setMessageInputValue(e.target.value)}
                                />
                                <button disabled={!isMessageAllowed} onClick={send} id="send_button">
                                    Send
                                </button>
                            </div>
                        </MessageAppBackground>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TestComponent;
