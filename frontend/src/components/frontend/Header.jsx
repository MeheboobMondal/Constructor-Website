import React from 'react'
import { Link } from 'react-router-dom'


const Header = () => {
  return (
    <>  
       <nav className="navbar navbar-expand-lg navbar-light bg-white sticky-top py-3">
        <div className="container">
            {/* <!-- Brand/logo on the left --> */}
            <Link className="navbar-brand" to="">
                <span>UrbanEdge</span> <span>Constructions</span>
            </Link>
            
            {/* <!-- Hamburger button for mobile --> */}
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span className="navbar-toggler-icon"></span>
            </button>
            
            {/* <!-- Navigation links on the right --> */}
            <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/about">About Us</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/service">Services</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="projects">Projects</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="blogs">Blogs</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="contact">Contact Us</Link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    </>
  )
}

export default Header
