// import { useEffect } from 'react'

import { NavLink, Outlet } from 'react-router-dom'
import MinimumNavbar from '../components/MinimumNavbar'
// import { getServiceByServiceId } from '../Api/ApiService'
// import { ApiServiceData } from '../Api/Interfaces'

const AdminRootPage = () => {

    return (
        <>
            <MinimumNavbar />
            <div className='container'>
                <div className="row">
                    <div className='col-3 d-flex flex-column border p-3 py-3 apiInfoPage-height' id='left-section'>
                        <h5 className='pt-2'>Bonsoir, Admin</h5>

                        <ul className='p-4 px-1 pt-3 d-grid gap-2 overflowY-auto'>
                            <div className="list-group">
                                <NavLink className={"list-group-item list-group-item-action list-group-item-light"} to={"projects"}>Projects</NavLink>
                                {/* <NavLink className={"list-group-item list-group-item-action list-group-item-light"} to={"requests"}></NavLink> */}
                                {/* <NavLink className={"list-group-item list-group-item-action list-group-item-light"} to={"users"}>Users</NavLink> */}
                            </div>
                        </ul>

                        {/* <div className="pt-3 d-grid mt-auto gap-2">
                            <Link to={"request-access"} className='btn btn-primary' role='button'>Apply for access</Link>
                            <Link to={"request-access"} className='btn btn-primary' role='button'>Apply for access</Link>
                        </div> */}
                    </div>

                    <div className='col border border-start-0 p-3 overflowY-auto apiInfoPage-height' id='right-section'>
                        <Outlet />
                    </div>

                </div>
            </div>
        </>
    )
}

export default AdminRootPage
