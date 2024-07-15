import PrivateAuthProvider from "../Auth/PrivateAuthProvider"
import ChangePasswordForm from "../forms/ChangePasswordForm"

const ChangePasswordPage = () => {
    return (
        <>
            <PrivateAuthProvider />
            <div className="vh-100 vw-100 d-flex justify-content-center align-items-center">
                <ChangePasswordForm />
            </div>
        </>
    )
}

export default ChangePasswordPage
