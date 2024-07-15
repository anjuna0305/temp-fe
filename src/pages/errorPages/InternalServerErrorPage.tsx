const InternalServerErrorPage = () => {
    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="text-center">
                <h1 className="display-1">500</h1>
                <p className="lead">Internal Server Error</p>
                <p className="lead">Oops! Something went wrong on our end.</p>
                <p className="lead">Please try again later or contact support.</p>
                {/* <Link to="/" className="btn btn-primary mt-3">Go back to Home</Link> */}
            </div>
        </div>
    )
}

export default InternalServerErrorPage
