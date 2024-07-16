import { Outlet, Link } from 'react-router-dom'
import { getSessionState,  AdminMinAuth } from './Auth'
import { useState, useEffect } from 'react'
// import PageLoadSpinner from '../components/PageLoadSpinner'
import PageLoadSpinner from '../components/PageLoadSpinner'


const AdminAuthProvider = () => {
    const [logged, setLogged] = useState<boolean>(false)
    const [waiting, setWaiting] = useState<boolean>(true)

    const isLoggedBefore = getSessionState()

    useEffect(() => {
        const auth = async () => {
            setWaiting(true)
            const authResult = AdminMinAuth()
            setLogged(authResult)
            setWaiting(false)
        }
        setLogged(true)
        setWaiting(false)

        auth()
    }, [])

    return (
        <>
            {waiting ? <PageLoadSpinner active /> :
                logged ?
                    <Outlet />
                    :
                    <>
                        <div className='authProvider-overlay'>
                            <div className="card p-4">
                                <h4>
                                    {
                                        isLoggedBefore ?
                                            "Your session is end. Please login again."
                                            :
                                            "You need to Login to view this page"
                                    }
                                </h4>
                                <div className='mt-3 d-flex gap-2 justify-content-center'>
                                    <Link className='btn btn-primary' to={"/login"}>Login</Link>
                                    <Link className='btn btn-secondary' to={"/register"}>Sign up</Link>
                                </div>
                                <div className='text-center mt-3'>or</div>
                                <button className='btn btn-link' onClick={() => { window.history.go(-1); return false; }}>Go back</button>
                            </div>
                        </div>
                    </>
            }
        </>
    )
}

export default AdminAuthProvider


