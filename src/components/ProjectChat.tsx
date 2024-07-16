import { NavLink } from "react-router-dom"

interface Props {
    to: string
}

const ProjectChat = (props: Props) => {
    return (
        <NavLink to={props.to} className={"project-chat"}></NavLink>

    )
}

export default ProjectChat
