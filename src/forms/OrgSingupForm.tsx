import { Formik, Form, Field } from "formik"
import * as yup from 'yup'

const OrgSingupForm = () => {
    const userSingupFormValidationSchema = yup.object().shape({
        orgName: yup.string().required('Required'),
        email: yup.string().email('Invalid email').required('Required'),
        password: yup.string().required('Required').min(8, 'At least 8 characters required.'),
        password2: yup.string().required('Required').min(8, 'At least 8 characters required.').oneOf([yup.ref('password')], 'Passwords must match'),
    })

    return (
        <>
            <Formik
                initialValues={{
                    orgName: '',
                    email: '',
                    password: '',
                    password2: ''
                }}
                validationSchema={userSingupFormValidationSchema}
                onSubmit={values => {
                    console.log(values);
                }}
            >
                {({ errors, touched }) => (
                    <Form className="card p-4" style={{ width: "450px" }}>
                        <h2>Sign Up</h2>

                        <div className="mt-3 mb-3 col">
                            <label className="form-label">Organization Name</label>
                            <Field className="form-control" id="orgName" name="orgName" />
                            {touched.orgName && errors.orgName && <div id="orgName-error" className="form-text text-danger">{errors.orgName}</div>}
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
                        <button type="submit" className="btn btn-primary mt-3">Sign In</button>
                    </Form>
                )}
            </Formik>
        </>
    )
}

export default OrgSingupForm
