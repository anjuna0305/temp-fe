import { NavLink } from "react-router-dom"

interface Props {
    to: string
    key: React.Key | undefined | null
    children:React.ReactNode
}

const ProjectChat = (props: Props) => {
    return (
        <NavLink to={props.to} className={"project-chat"} key={props.key}>{props.children}</NavLink>
    )
}

export default ProjectChat
