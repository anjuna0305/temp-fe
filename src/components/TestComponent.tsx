import MessageAppBackground from "./MessageAppBackground"
import MinimulNavbar from "./MinimulNavbar"
import { useEffect, useState } from "react"

interface MessageInterface {
    type: string        /*to indicate message or a reply "source", "response", "error" */
    content: string     /* to hold message content */
    status: string      /*to indicate message status (sending|sent) */
}


interface ResponseMessage {
    sentenceId: number
    sourceId: number
    sentence: string
}

interface SourceMessage {
    sentenceId: number
    sentence: string
}

const responseMessageToMessageInterface = (responseMsg: ResponseMessage): MessageInterface => {
    return { type: "response", content: responseMsg.sentence, status: "sent" } as MessageInterface
}

const sourceMessageToMessageInterface = (sourceMsg: SourceMessage): MessageInterface => {
    return { type: "source", content: sourceMsg.sentence, status: "sent" } as MessageInterface
}




const fakeResponse = [
    { "sentenceId": 1001, "sourceId": 1, "sentence": "The quick brown fox ." },
    { "sentenceId": 1002, "sourceId": 2, "sentence": "A journey of a thousand." },
    { "sentenceId": 1003, "sourceId": 3, "sentence": "To be or not to be, that is the question." },
    { "sentenceId": 1004, "sourceId": 4, "sentence": "All that glitters is not gold." },
    { "sentenceId": 1005, "sourceId": 5, "sentence": "The pen is mightier than the sword." },
    { "sentenceId": 1006, "sourceId": 6, "sentence": "A picture is worth a thousand words." },
    { "sentenceId": 1007, "sourceId": 7, "sentence": "When in Rome, do as the Romans do." },
    { "sentenceId": 1008, "sourceId": 8, "sentence": "The early bird catches the worm." },
    { "sentenceId": 1009, "sourceId": 9, "sentence": "Actions speak louder than words." },
    { "sentenceId": 1010, "sourceId": 10, "sentence": "Beauty is in the eye of the beholder." },
    { "sentenceId": 1011, "sourceId": 11, "sentence": "Necessity is the mother of invention." },
    { "sentenceId": 1012, "sourceId": 12, "sentence": "A watched pot never boils." },
    { "sentenceId": 1013, "sourceId": 13, "sentence": "Don't count your chickens before they hatch." },
    { "sentenceId": 1014, "sourceId": 14, "sentence": "Too many cooks spoil the broth." },
    { "sentenceId": 1015, "sourceId": 15, "sentence": "You can't judge a book by its cover." },
    { "sentenceId": 1016, "sourceId": 16, "sentence": "The grass is always greener on the other side." },
    { "sentenceId": 1017, "sourceId": 17, "sentence": "A stitch in time saves nine." },
    { "sentenceId": 1018, "sourceId": 18, "sentence": "Birds of a feather flock together." },
    { "sentenceId": 1019, "sourceId": 19, "sentence": "Every cloud has a silver lining." },
    { "sentenceId": 1020, "sourceId": 20, "sentence": "A penny saved is a penny earned." }
]

const fakeSource = [
    { "sentenceId": 1, "sentence": "The quick brown fox jumps over the lazy dog." },
    { "sentenceId": 2, "sentence": "A journey of a thousand miles begins with a single step." },
    { "sentenceId": 3, "sentence": "To be or not to be, that is the question." },
    { "sentenceId": 4, "sentence": "All that glitters is not gold." },
    { "sentenceId": 5, "sentence": "The pen is mightier than the sword." },
    { "sentenceId": 6, "sentence": "A picture is worth a thousand words." },
    { "sentenceId": 7, "sentence": "When in Rome, do as the Romans do." },
    { "sentenceId": 8, "sentence": "The early bird catches the worm." },
    { "sentenceId": 9, "sentence": "Actions speak louder than words." },
    { "sentenceId": 10, "sentence": "Beauty is in the eye of the beholder." },
    { "sentenceId": 11, "sentence": "Necessity is the mother of invention." },
    { "sentenceId": 12, "sentence": "A watched pot never boils." },
    { "sentenceId": 13, "sentence": "Don't count your chickens before they hatch." },
    { "sentenceId": 14, "sentence": "Too many cooks spoil the broth." },
    { "sentenceId": 15, "sentence": "You can't judge a book by its cover." },
    { "sentenceId": 16, "sentence": "The grass is always greener on the other side." },
    { "sentenceId": 17, "sentence": "A stitch in time saves nine." },
    { "sentenceId": 18, "sentence": "Birds of a feather flock together." },
    { "sentenceId": 19, "sentence": "Every cloud has a silver lining." },
    { "sentenceId": 20, "sentence": "A penny saved is a penny earned." }
]




const TestComponent = () => {
    let msgSkip = 0
    let msgLimit = 3

    const [isMessageAllowes, setMessageAllowed] = useState<boolean>(false)
    const [messages, setMessages] = useState<MessageInterface[]>([])

    //replace with real endpoint
    const fetchSourceSentence = async (id: number) => {
        return fakeSource[id - 1]
    }

    //replace with real endpoint
    const fetchResponses = async () => {
        let results = []
        for (let i = msgSkip; i < msgLimit; i++) {
            results.push(fakeResponse[i])
        }
        msgSkip += 3
        return results
    }

    const sendResponse = () => {
        setMessages((prev) => {
            const newMessages = [{ type: "response", content: "this is new message", status: "sending" }, ...prev]
            return newMessages
        })
    }

    const loadMore = async () => {
        const newResponseSet = await fetchResponses()
        const newMessageInterfaceSet = await generateRequestResponseList(newResponseSet)

        setMessages((prev) => prev.concat(newMessageInterfaceSet))
    }

    /*activity handlers
        *these functions are used to handle user interraction with the page
    */
    const sendReplyHandler = async () => {

    }


    const generateRequestResponseList = async (reaponseList: ResponseMessage[]) => {
        console.log("start executing! 1")
        let sourceIds: number[] = []
        for (let i = 0; i < reaponseList.length; i++) {
            sourceIds.push(reaponseList[i].sourceId)
        }
        console.log("start executing! 2")
        let sourceList: SourceMessage[] = []
        for (let i = 0; i < reaponseList.length; i++) {
            const sourceSentence = await fetchSourceSentence(sourceIds[i])
            sourceList.push(sourceSentence)
        }
        console.log("start executing! 3")
        let messageInterfaceList = []
        for (let i = 0; i < reaponseList.length; i++) {
            messageInterfaceList.push(responseMessageToMessageInterface(reaponseList[i]))
            messageInterfaceList.push(sourceMessageToMessageInterface(sourceList[i]))
        }
        return messageInterfaceList
    }

    useEffect(() => {
        const loadInitialMessages = async () => {
            const initialResponseLoad = await fetchResponses()
            const messageInterfaces = await generateRequestResponseList(initialResponseLoad)
            const newSourceSentence = await fetchSourceSentence(10)

            setMessages([sourceMessageToMessageInterface(newSourceSentence), ...messageInterfaces])
        }
        loadInitialMessages()
        setMessageAllowed(true)
    }, [])


    return (
        <>
            <MinimulNavbar />
            <div className="container">
                <div className="d-flex justify-content-center vh-100">
                    <div className="row w-100">
                        <MessageAppBackground className="col-4 mt-5 left-container">This is lef</MessageAppBackground>

                        <MessageAppBackground className="col-8 mt-5 right-contaienr" >
                            <div className="message-section" id="msg_application">
                                {messages.map((message, index) => (
                                    <div className={message.type == "response" ? "reply" : "message"} key={index}>
                                        <div className="message-card"> {message.content}</div>
                                    </div>
                                ))}
                                <button onClick={loadMore}>loadmore</button>
                            </div>
                            <div className="form-section">
                                <input type="text" name="message" id="" />
                                <button disabled={!isMessageAllowes} onClick={sendResponse}>Send</button>
                            </div>
                        </MessageAppBackground>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TestComponent
