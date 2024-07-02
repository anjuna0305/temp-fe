import React from "react"

interface Props {
    className?: string
    children?:React.ReactNode
}

const MessageAppBackground = (props:Props) => {
    return (
        <>
            <div className={`custom-card ${props.className}`}>{props.children}</div>
        </>
    )
}

export default MessageAppBackground
