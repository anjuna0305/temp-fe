import LoginForm from '../forms/LoginForm';

const LoginPage = () => {
    return (
        <>
            <div className="row vw-100 vh-100">
                <div className="col d-flex justify-content-center align-items-center">
                    <h1>Login to SUBASA</h1>
                </div>
                <div className="col d-flex justify-content-center align-items-center bg-secondary">
                    <LoginForm/>
                </div>
            </div>
        </>
    )
}

export default LoginPage