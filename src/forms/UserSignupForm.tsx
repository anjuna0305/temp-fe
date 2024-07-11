import { Formik, Form, Field } from "formik"
import * as yup from 'yup'
import { signupPayload, Alert } from "../Api/Interfaces"
import { userSignup } from "../Api/ApiUser"
import { useState } from "react"
import { AxiosError, AxiosResponse } from "axios"
import { Link } from "react-router-dom"

const UserSignupForm = () => {
    const [alertState, setAlertState] = useState<Alert | undefined>(undefined)
    const [waiting, setWaiting] = useState<boolean>(false)

    const handleSignUp = async (payload: signupPayload) => {
        setWaiting(true) //loading animation on button
        setAlertState(undefined) //set alert

        try {
            const response: AxiosResponse = await userSignup(payload)
            console.log("this is it ", response.status)
            if (response.status === 201) {
                setAlertState({ type: "success", message: "User created succesfully. Now you can log in to the system." } as Alert)
                // user created
            } else {
                setAlertState({ type: "danger", message: "Unable to create a user" } as Alert)
                // failed to create user
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                setAlertState({ type: "danger", message: error.response?.data.detail } as Alert)
            }
        }

        setWaiting(false)
    }


    const userSingupFormValidationSchema = yup.object().shape({
        username: yup.string().required('Required'),
        email: yup.string().email('Invalid email').required('Required'),
        password: yup.string().required('Required').min(8, 'At least 8 characters required.'),
        password2: yup.string().required('Required').min(8, 'At least 8 characters required.').oneOf([yup.ref('password')], 'Passwords must match'),
    })

    return (
        <>
            <Formik
                initialValues={{
                    username: '',
                    email: '',
                    password: '',
                    password2: ''
                }}
                validationSchema={userSingupFormValidationSchema}
                onSubmit={values => {
                    const payload: signupPayload = {
                        username: values.username,
                        email: values.email,
                        password: values.password,
                        scopes: "regular_user"
                    }
                    handleSignUp(payload)
                }}
            >
                {({ errors, touched }) => (
                    <Form className="card p-4" style={{ width: "450px" }}>
                        {alertState && alertState.type === "danger" ?
                            <div className={`alert alert-danger`} role="alert">
                                {alertState.message}
                            </div>
                            :
                            <></>
                        }

                        <h2>Sign Up</h2>
                        <div className="mb-3">
                            <label className="form-label">User Name</label>
                            <Field className="form-control" id="username" name="username" />
                            {touched.username && errors.username && <div id="username-error" className="form-text text-danger">{errors.username}</div>}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <Field className="form-control" id="email" name="email" />
                            {touched.email && errors.email && <div id="email-error" className="form-text text-danger">{errors.email}</div>}
                        </div>
                        <div className="row">
                            <div className="mb-3 col">
                                <label className="form-label">Password</label>
                                <Field className="form-control" id="password" name="password" type="password" />
                                {touched.password && errors.password && <div id="password-error" className="form-text text-danger">{errors.password}</div>}
                            </div>
                            <div className="mb-3 col">
                                <label className="form-label">Re-Enter Password</label>
                                <Field className="form-control" id="password2" name="password2" type="password" />
                                {touched.password2 && errors.password2 && <div id="password2-error" className="form-text text-danger">{errors.password2}</div>}
                            </div>
                        </div>
                        {alertState && alertState.type === "success" ?
                            <div className={`alert alert-success`} role="alert">
                                {alertState.message}
                                {<Link to={"/login"}> Click here to login</Link>}
                            </div>
                            :
                            <></>
                        }
                        <button type="submit" className="btn btn-primary mt-3" disabled={waiting}>
                            <span className={`spinner-border spinner-border-sm ${waiting ? "" : "d-none"}`} role="status" aria-hidden="true"></span>
                            Sign In
                        </button>
                    </Form>
                )}
            </Formik>
        </>
    )
}

export default UserSignupForm
