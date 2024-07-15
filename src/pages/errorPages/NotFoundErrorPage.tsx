const NotFoundErrorPage = () => {
    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="text-center">
                <h1 className="display-1">404</h1>
                <p className="lead">Oops! Page not found.</p>
                <p className="lead">The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
                {/* <Link to="/" className="btn btn-primary mt-3">Go back to Home</Link> */}
            </div>
        </div>
    )
}

export default NotFoundErrorPage
