import React from 'react'
import {
    Link,
    useLocation,
    useHistory
} from "react-router-dom";

const Navbar = () => {
    const history = useHistory()
    const location = useLocation().pathname

    const handleLogout = (e) => {
        e.preventDefault()
        localStorage.clear()
        history.push('/login')
    }

    const onchange = (e) => {
        const notebody = document.getElementsByClassName('notebody')
        Array.from(notebody).forEach((note) => {
            const title = note.getElementsByTagName('h5')[0].innerText
            const description = note.getElementsByTagName('p')[0].innerText
            if (title.includes(e.target.value) || description.includes(e.target.value)) {
                note.style.display = 'block'
            } else {
                note.style.display = 'none'
            }
        })
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: 'rgb(248 249 251)' }}>
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">NoteCloud</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location === '/' ? 'active' : ''}`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location === '/about' ? 'active' : ''}`} to="/about">About</Link>
                        </li>
                    </ul>

                    {
                        (!localStorage.getItem('token')) ? (<form className="d-flex">
                            <div className="container">
                                <Link style={{ textDecoration: 'none' }} className="text-muted mx-2" to="/login">Login</Link>
                                <span className="text-muted">|</span>
                                <Link style={{ textDecoration: 'none' }} className=' text-muted mx-2' to="/signup">Register</Link>
                            </div>
                        </form>) : <div className='d-flex'>
                            <input onChange={onchange} className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            {/* <i className="fas fa-search" style={{ "color": "white", "border": "1px solid white", "padding": "13px", "borderRadius": "5px" }}></i> */}
                            <button onClick={handleLogout} className="btn btn-outline-success ">Logout</button>

                        </div>
                    }
                </div>
            </div>
        </nav>
    )
}
export default Navbar