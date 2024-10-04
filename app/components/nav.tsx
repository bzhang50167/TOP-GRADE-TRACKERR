export default function Nav() {



    return (<div className="navbar bg-primary">
        <div className="navbar-start">
            <a className="navbar-item">Top Grade</a>
        </div>
        <div className="navbar-end">
            <a href= "/" className="navbar-item">Home</a>
            <a href="/jobs" className="navbar-item">Jobs</a>
            <a href="/findings" className="navbar-item">Findings</a>
            <a href="/recommendations" className="navbar-item">Recommendations</a>
        </div>
    </div>
    )

}
