interface Props {
    active?: boolean
}

const PageLoadSpinner = ({ active = false }: Props) => {
    return (
        <>
            <div className={active ? "loading-overlay" : "d-none"}>
                <div className="spinner-border text-primary" role="status"></div>
            </div>
        </>
    )
}

export default PageLoadSpinner