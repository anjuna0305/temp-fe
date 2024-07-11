import { Formik, Form, Field } from "formik";
import * as yup from 'yup'

const ChangePasswordForm = () => {
    const changePasswordFormValidationSchema = yup.object().shape({
        currentPassword: yup.string().required('Required'),
        newPassword: yup.string().required('Required'),
        newPassword2: yup.string().required('Required'),
    })

    return (
        <>
            <Formik
                initialValues={{
                    currentPassword: '',
                    newPassword: '',
                    newPassword2: '',
                }}
                validationSchema={changePasswordFormValidationSchema}
                onSubmit={values => {
                    console.log(values);
                }}
            >
                {({ errors, touched }) => (
                    <Form className="card p-4" style={{ width: "400px" }}>
                        <p className="text-secondary" onClick={() => { window.history.go(-1); return false; }} role="button">⬅ Back</p>

                        <h2>Change Password</h2>
                        <div className="mb-3 mt-3 mt-1">
                            <label className="form-label">Current Password</label>
                            <Field className="form-control" id="currentPassword" name="currentPassword" type="password" />
                            {touched.currentPassword && errors.currentPassword && <div id="emailHelp" className="form-text text-danger">{errors.currentPassword}</div>}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">New Password</label>
                            <Field className="form-control" id="newPassword" name="newPassword" type="password" />
                            {touched.newPassword && errors.newPassword && <div id="emailHelp" className="form-text text-danger">{errors.newPassword}</div>}
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Confirm Password</label>
                            <Field className="form-control" id="newPassword" name="newPassword2" type="password" />
                            {touched.newPassword2 && errors.newPassword2 && <div id="emailHelp" className="form-text text-danger">{errors.newPassword2}</div>}
                        </div>
                        <button type="submit" className="btn btn-primary mt-3">Change Password</button>
                    </Form>
                )}
            </Formik>
        </>
    )
}

export default ChangePasswordForm
