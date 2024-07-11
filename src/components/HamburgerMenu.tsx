import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { getSavedUserInfoFromLocalstorage, removeStoredToken } from "../Auth/Auth"
import { LoggedUserInfo } from "../Api/Interfaces"
// import PageLoadSpinner from "./PageLoadSpinner"

const HamburgerMenu = () => {
    const navigate = useNavigate()

    const [pageLoading, setPageLoading] = useState(true)
    const [isHamburgerMenuOpen, setIsHamburgerMenuOpen] = useState(false)
    const [savedUserInfo, setSavedUserInfo] = useState<LoggedUserInfo>({
        id: 0,
        username: "",
        email: ""
    })

    const logout = async () => {
        setPageLoading(true)
        // async function to mark logout
        removeStoredToken()
        navigate("/")
        window.location.reload()
    }

    const toggleHamburgerMenu = () => {
        console.log("toggle called: ", isHamburgerMenuOpen)
        isHamburgerMenuOpen ? setIsHamburgerMenuOpen(false) : setIsHamburgerMenuOpen(true)
    }

    useEffect(() => {
        document.addEventListener('click', (event: MouseEvent) => {
            const hamburgerElement = document.getElementById("hamburger-menu")
            const hamburgerTogglerElement = document.getElementById("hamburger-menu-toggler")

            if (event.target == hamburgerTogglerElement) {
                return
            }
            setIsHamburgerMenuOpen((event.target instanceof Node && hamburgerElement?.contains(event.target)) ? true : false)
            // setIsHamburgerMenuOpen((event.target instanceof Node && hamburgerElement?.contains(event.target)) ? true : false)
        })

        const loggedUserInfo = getSavedUserInfoFromLocalstorage()
        if (loggedUserInfo)
            setSavedUserInfo(loggedUserInfo)

        setIsHamburgerMenuOpen(false)
        setPageLoading(false)
    }, [])

    return (
        <>
            {/* <PageLoadSpinner active={pageLoading} /> */}
            <div className="d-flex align-items-center gap-3 user-select-none" style={{ position: "relative" }}>
                <div
                    style={{ borderRadius: "50%", backgroundColor: "white", width: "42px", height: "42px", cursor: "pointer" }}
                    className="border"
                    onClick={toggleHamburgerMenu}
                    id="hamburger-menu-toggler"
                ></div>
                <div
                    className={`card grid p-2 ${isHamburgerMenuOpen ? '' : 'd-none'}`}
                    style={{ position: "absolute", top: "45px", right: "4px", width: "200px", height: "300px" }}
                    id="hamburger-menu"
                >
                    <h6>Hi {savedUserInfo.username}</h6>
                    <Link className="btn btn-light" role="button" to={"/change-password"}>Change Password</Link>
                    <button className="btn btn-light" onClick={logout}>Log Out</button>
                </div>
            </div>
        </>
    )
}

export default HamburgerMenu
