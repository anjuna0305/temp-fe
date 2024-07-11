import MessageAppBackground from "./MessageAppBackground"
import MinimumNavbar from "./MinimumNavbar.tsx"
import { useEffect, useState } from "react"
import { getOngoingSentence, getResponses, getSourceSentences, sendResponse } from "../Api/ApiUser.ts";
import { ResponseSentence, SourceSentence } from "../Api/Interfaces.ts";

interface MessageInterface {
    type: string        /*to indicate message or a reply "source", "response", "error" */
    content: string     /* to hold message content */
    status: string      /*to indicate message status (sending|sent) */
}


const responseSentenceToMessageInterface = (responseMsg: ResponseSentence): MessageInterface => {
    return { type: "response", content: responseMsg.response_sentence, status: "sent" } as MessageInterface
}

const sourceSentenceToMessageInterface = (sourceMsg: SourceSentence): MessageInterface => {
    return { type: "source", content: sourceMsg.source_sentence, status: "sent" } as MessageInterface
}


// const useMessages = () => {
//     const [responses, setResponses] = useState([]);

//     useEffect(() => {
//          setResponses(data))

// }, []); // This effect runs only once on component mount

//     return { responses, setResponses };
//   };


const TestComponent = () => {
    let msgSkip = 0
    const msgLimit = 3

    const [isMessageAllowed, setMessageAllowed] = useState<boolean>(false)
    const [projectId, setPorjectId] = useState<number>(1)
    const [sourceId, setSourceId] = useState<number>(0)
    const [messages, setMessages] = useState<MessageInterface[]>([])


    const messageInput = document.getElementById("message_text_input") as HTMLInputElement

    // const changeProject = async (pId: number) => {
    //     const loadInitialMessages = async () => {
    //         const initialResponseLoad = await fetchResponses()
    //         const messageInterfaces = await generateRequestResponseList(initialResponseLoad)

    //         setMessages([sourceSentenceToMessageInterface(newSourceSentence), ...messageInterfaces])
    //     }
    //     loadInitialMessages()
    //     setMessageAllowed(true)



    //     setPorjectId(pId)
    // }

    //replace with real endpoint
    const fetchSourceSentence = async (id: number) => {
        console.log("saurce sentence fetch called for ", id)
        const sourceSentence = await getSourceSentences(id)
        if (sourceSentence) {
            console.log(`source centence for ${id}: `, sourceSentence.source_sentence)
            return sourceSentence
        }
        else
            return {} as SourceSentence
    }

    const fetchOngoingSentence = async () => {
        const sourceSentence = await getOngoingSentence(projectId)
        if (sourceSentence) {
            const sourceMessageInterface = sourceSentenceToMessageInterface(sourceSentence)
            const messageList = [...messages, sourceMessageInterface]
            console.log("basvdvhbsdkvbbbbbaasdj", messageList)
            setMessages(messageList)
            console.log('here', messages)
        }
    }

    //replace with real endpoint
    const fetchResponses = async (): Promise<ResponseSentence[] | undefined> => {
        const responses = await getResponses(projectId, msgSkip, msgLimit)
        if (responses) {
            msgSkip += msgLimit
        }
        console.log("response fetched", responses)
        return responses
    }

    const send = async () => {
        const isSent = await sendResponse(sourceId, projectId, messageInput.value)
        if (isSent) {
            console.log("Message sent")
        }
    }

    const loadMore = async () => {
        const newResponseSet = await fetchResponses()
        if (newResponseSet) {
            const newMessageInterfaceSet = await generateRequestResponseList(newResponseSet)
            setMessages((prev) => prev.concat(newMessageInterfaceSet))
        }
    }


    const generateRequestResponseList = async (responseList: ResponseSentence[]) => {
        const sourceIds: number[] = []
        for (let i = 0; i < responseList.length; i++) {
            sourceIds.push(responseList[i].source_sentence_id)
        }

        const sourceList: SourceSentence[] = []
        for (let i = 0; i < responseList.length; i++) {
            const sourceSentence = await fetchSourceSentence(sourceIds[i])
            sourceList.push(sourceSentence)
        }
        console.log("start executing! 3")
        const messageInterfaceList = []
        for (let i = 0; i < responseList.length; i++) {
            messageInterfaceList.push(responseSentenceToMessageInterface(responseList[i]))
            messageInterfaceList.push(sourceSentenceToMessageInterface(sourceList[i]))
        }
        return messageInterfaceList
    }

    useEffect(() => {
        setPorjectId(1);
        const loadInitialMessages = async () => {
            const initialResponseLoad = await fetchResponses()
            if (initialResponseLoad) {
                const messageInterfaces = await generateRequestResponseList(initialResponseLoad)
                setMessages([...messageInterfaces])
            }
        }
        loadInitialMessages()
        fetchOngoingSentence()
        setMessageAllowed(true)
    }, [])

    console.log(messages)

    return (
        <>
            <MinimumNavbar />
            <div className="container">
                <div className="d-flex justify-content-center vh-100">
                    <div className="row w-100">
                        <MessageAppBackground className="col-4 mt-5 left-container">
                            <div className={"project-chat"}>Test component</div>
                            <div className={"project-chat"}>Test component</div>
                            <div className={"project-chat"}>Test component</div>
                            <div className={"project-chat"}>Test component</div>
                        </MessageAppBackground>

                        <MessageAppBackground className="col-8 mt-5 right-container">
                            <div className="message-section" id="msg_application">
                                {messages.map((message, index) => (
                                    <div className={``} key={index}>
                                        <div
                                            className={`message-card ${message.type == "response" ? "reply" : "message"}`}> {message.content}</div>
                                    </div>
                                ))}
                                <button onClick={loadMore}>load more</button>
                            </div>
                            <div id="message_form">
                                <input type="text" name="message" id="message_text_input" />
                                <button disabled={!isMessageAllowed} onClick={send} id="send_button">Send
                                </button>
                            </div>
                        </MessageAppBackground>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TestComponent
