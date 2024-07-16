import { Outlet } from "react-router-dom"
import UserSignupForm from "../forms/UserSignupForm"

const SignUpPage = () => {
    return (
        <>
            <div className="row vw-100 vh-100">
                <div className="col-4 d-flex justify-content-center align-items-center">
                    <h1>Sign up to subasa</h1>
                </div>
                <div className="col d-flex justify-content-center align-items-center bg-secondary">
                    <UserSignupForm />
                </div>
            </div>
        </>
    )
}

export default SignUpPage
