import React, { useContext } from 'react'
import { AuthContext } from './context/Auth'
import {Link} from 'react-router-dom'

const Sidebar = () => {
    const {logout} = useContext(AuthContext)
  return (
    <div className="col-md-3">
                <div className="sidebar p-3">
                    <h4 className="sidebar-title">Menu</h4>
                    <ul className="nav flex-column">
                        <li className="nav-item">
                            <Link className="nav-link active" to="/admin/dashboard">Dashboard</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/admin/service">Service</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/admin/projects">Projects</Link>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Reports</a>
                        </li>
                        <li className="nav-item">
                            <button onClick={logout} className="nav-link">Logout</button>
                        </li>
                    </ul>
                </div>
            </div>
  )
}

export default Sidebar
