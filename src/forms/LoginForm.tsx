import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup'
import { LoginPayload } from '../Api/Interfaces';
import { userLogin } from '../Api/ApiUser';
import { AxiosError, AxiosResponse } from 'axios';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const LoginForm = () => {
    const navigate = useNavigate()

    const [isWaiting, setIsWaiting] = useState(false)
    const [loginErrorMessage, setLoginErrorMessage] = useState('')

    const handleLogin = async (values: LoginPayload) => {
        console.log("handle login called")
        setIsWaiting(true)
        setLoginErrorMessage("")
        try {
            const response: AxiosResponse = await userLogin(values)
            if (response.status == 200) {
                console.log("handle login try called")
                navigate("/")
            }
        } catch (error) {
            if (error instanceof AxiosError && error.response) {
                setLoginErrorMessage(error.response.status == 400 ? "Invalid user name or password." : "Unknown error occured!")
            } else {
                setLoginErrorMessage("Unknown error occured!")
            }
        }
        setIsWaiting(false)
    }

    const loginFormValidationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string().required('Required')
    })

    return (
        <>
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                }}
                validationSchema={loginFormValidationSchema}
                onSubmit={values => {
                    handleLogin(values);
                }}
            >
                {({ errors, touched }) => (
                    <Form className="card p-4" style={{ width: "300px" }}>
                        {/* <h2>Login</h2> */}
                        {loginErrorMessage ? <small className="alert alert-danger d-flex align-items-center" role="alert">{loginErrorMessage}</small> : <></>}

                        <div className="btn btn-outline-dark btn-sm d-flex align-items-center justify-content-center gap-2">
                            <img src="src/assets/google_logo.png" alt="" style={{ height: "30px" }} />
                            Continue with Google
                        </div>
                        <div className="text-center pt-3">or</div>
                        <div className="mb-3 mt-1">
                            <label className="form-label">Email</label>
                            <Field className="form-control" id="exampleInputEmail1" name="email" />
                            {touched.email && errors.email && <div id="emailHelp" className="form-text text-danger">{errors.email}</div>}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <Field className="form-control" id="exampleInputPassword1" name="password" type="password" />
                            {touched.password && errors.password && <div id="emailHelp" className="form-text text-danger">{errors.password}</div>}
                        </div>
                        <button type="submit" className="btn btn-primary mt-3" disabled={isWaiting}>
                            <span className={`spinner-border spinner-border-sm ${isWaiting ? "" : "d-none"}`} role="status" aria-hidden="true"></span>
                            Login
                        </button>
                        <div className='text-center mt-3'>
                            <small>New user? Click here <Link to={"/register"}>Sign up</Link></small>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    )
}

export default LoginForm
