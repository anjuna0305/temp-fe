import { number } from "yup"
import Button from "./Button"
import MessageAppBackground from "./MessageAppBackground"
import MinimulNavbar from "./MinimulNavbar"
import { useState } from "react"

const TestComponent = () => {

    const [messages, setMessages] = useState<any[]>(["message 1", "message 2"])
    // const fetchLastReponses = async(limit:number)=>{

    // }
    const lastRespones = [
        {
            response_id: 11,
            source_id: 12,
            sentence: "dummy sentence 1"
        },
        {
            response_id: 12,
            source_id: 13,
            sentence: "dummy sentence 1"
        },
        {
            response_id: 13,
            source_id: 14,
            sentence: "dummy sentence 1"
        },
        {
            response_id: 14,
            source_id: 15,
            sentence: "dummy sentence 1"
        },
        {
            response_id: 15,
            source_id: 16,
            sentence: "dummy sentence 1"
        },
        {
            response_id: 16,
            source_id: 17,
            sentence: "dummy sentence 1"
        },
        {
            response_id: 17,
            source_id: 18,
            sentence: "dummy sentence 1"
        },
        {
            response_id: 18,
            source_id: 19,
            sentence: "dummy sentence 1"
        },
    ]

    let responseIdList: number[] = []

    lastRespones.map(response => {
        responseIdList.push(response.response_id)
    })

    responseIdList.map(id => console.log(id))

    const reverseList = (inputList: any[]) => {
        let i = 0
        let j = inputList.length - 1

        while (i < j) {
            const temp = inputList[i]
            inputList[i++] = inputList[j]
            inputList[j--] = temp
        }
    }

    const appendMessage = (message: string, type: string) => {
        const messageElement = document.querySelector<HTMLDivElement>("#msg_application")
        if (messageElement) {
            console.log("message element available")
        }
        messageElement?.appendChild
    }
    appendMessage()

    reverseList(responseIdList)
    console.log("reversed list")
    responseIdList.map(id => console.log(id))

    return (
        <>
            <MinimulNavbar />
            <div className="container">
                <div className="d-flex justify-content-center vh-100">
                    <div className="row w-100">
                        <MessageAppBackground className="col-4 mt-5 left-container">This is lef</MessageAppBackground>

                        <MessageAppBackground className="col-8 mt-5 right-contaienr" >
                            <div className="message-section" id="msg_application">
                                {/* <div className="message">
                                    <div className="message-card "> Message 1</div>
                                </div>
                                <div className="reply">
                                    <div className="message-card"> reply 1</div>
                                </div>
                                <div className="message">
                                    <div className="message-card"> Message 2</div>
                                </div>
                                <div className="reply">
                                    <div className="message-card"> reply 1</div>
                                </div>
                                <div className="message">
                                    <div className="message-card"> Message 1</div>
                                </div>
                                <div className="reply">
                                    <div className="message-card"> reply 1</div>
                                </div>
                                <div className="message">
                                    <div className="message-card"> Message 2</div>
                                </div>
                                <div className="reply">
                                    <div className="message-card"> reply 1</div>
                                </div>
                                <div className="message">
                                    <div className="message-card"> Message 1</div>
                                </div>
                                <div className="reply">
                                    <div className="message-card"> reply 1</div>
                                </div>
                                <div className="message">
                                    <div className="message-card"> Message 2</div>
                                </div>
                                <div className="reply">
                                    <div className="message-card"> reply 1</div>
                                </div>
                                <div className="message">
                                    <div className="message-card"> Message 1</div>
                                </div>
                                <div className="reply">
                                    <div className="message-card"> reply 1</div>
                                </div>
                                <div className="message">
                                    <div className="message-card"> Message 2</div>
                                </div>
                                <div className="reply">
                                    <div className="message-card"> reply 1</div>
                                </div>
                                <div className="message">
                                    <div className="message-card"> Message 1</div>
                                </div>
                                <div className="reply">
                                    <div className="message-card"> reply 1</div>
                                </div>
                                <div className="message">
                                    <div className="message-card"> Message 2</div>
                                </div>
                                <div className="reply">
                                    <div className="message-card"> reply 1</div>
                                </div>
                                <div className="message">
                                    <div className="message-card"> Message 1</div>
                                </div>
                                <div className="reply">
                                    <div className="message-card"> reply 1</div>
                                </div>
                                <div className="message">
                                    <div className="message-card"> Message 2</div>
                                </div>
                                <div className="reply">
                                    <div className="message-card"> reply 1</div>
                                </div>
                                <div className="message">
                                    <div className="message-card"> Message 1</div>
                                </div>
                                <div className="reply">
                                    <div className="message-card"> reply 1</div>
                                </div>
                                <div className="message">
                                    <div className="message-card"> Message 2</div>
                                </div>
                                <div className="reply">
                                    <div className="message-card"> reply 1</div>
                                </div>
                                <div className="message">
                                    <div className="message-card"> Message 1</div>
                                </div>
                                <div className="reply">
                                    <div className="message-card"> reply 1</div>
                                </div>
                                <div className="message">
                                    <div className="message-card"> Message 2</div>
                                </div>
                                <div className="reply">
                                    <div className="message-card"> reply 1</div>
                                </div>
                                <div className="message">
                                    <div className="message-card"> Message 1</div>
                                </div>
                                <div className="reply">
                                    <div className="message-card"> reply 1</div>
                                </div>
                                <div className="message">
                                    <div className="message-card"> Message 2</div>
                                </div>
                                <div className="reply">
                                    <div className="message-card"> reply 1</div>
                                </div>
                                <div className="message">
                                    <div className="message-card"> Message 1</div>
                                </div>
                                <div className="reply">
                                    <div className="message-card"> reply 1</div>
                                </div>
                                <div className="message">
                                    <div className="message-card"> Message 2</div>
                                </div>
                                <div className="reply">
                                    <div className="message-card"> reply 1</div>
                                </div>
                                <div className="message">
                                    <div className="message-card"> Message 1</div>
                                </div>
                                <div className="reply">
                                    <div className="message-card"> reply 1</div>
                                </div>
                                <div className="message">
                                    <div className="message-card"> Message 2</div>
                                </div>
                                <div className="reply">
                                    <div className="message-card"> reply 1</div>
                                </div> */}


                                {messages.map(message => (
                                    <div className="message">
                                        <div className="message-card"> {message}</div>
                                    </div>
                                ))}
                            </div>
                            <div className="form-section">
                                <input type="text" name="message" id="" />
                                <button>Send</button>
                            </div>
                        </MessageAppBackground>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TestComponent
