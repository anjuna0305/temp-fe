import React from "react"

interface Props {
    className?: string | undefined
    children: React.ReactNode
    disabled?: boolean
}


const Button = (props: Props) => {
    return (
        <button className={props.className} disabled={!!props.disabled}>{props.children}</button>
    )
}

export default Button
