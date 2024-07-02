import HamburgerMenu from "./HamburgerMenu"
import { useEffect, useState } from "react"
import { useAuth } from "../Auth/Auth"
import { Link } from "react-router-dom"

const MinimulNavbar = () => {
    const [isLogged, setIsLogged] = useState<boolean | undefined>(undefined)

    useEffect(() => {
        const getLoggingState = async () => {
            try {
                const loggingState = await useAuth()
                setIsLogged(loggingState)
            } catch (error) {
                setIsLogged(false)
            }
        }
        getLoggingState()
    }, [])

    return (
        <>
            <nav style={{ height: "64px", zIndex: "100" }} className={`container-fluid d-flex align-items-center justify-content-between px-4 bg-secondary`}>
                <div className="d-flex align-items-center">
                    <div><img src={`src/assets/subasa_new_white.png`} alt="" style={{ height: "60px" }} /></div>
                </div>
                {/* // import hamburger here */}
                {
                    isLogged === undefined ?
                        <></>
                        :
                        <div>
                            {isLogged ? <></> : <Link className="btn btn-link" to="/login" role="button">Login</Link>}
                            {isLogged ? <HamburgerMenu /> : <Link className="btn btn-primary" to="/register" role="button">sign in</Link>}
                        </div>
                }
            </nav>
        </>
    )
}

export default MinimulNavbar
