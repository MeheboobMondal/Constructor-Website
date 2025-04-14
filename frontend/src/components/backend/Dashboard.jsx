import React from 'react'
import Sidebar from './Sidebar'

const Dashboard = () => {
  return (
    <>
      <div className="container my-4">
        <div className="row g-4">
            {/* <!-- Sidebar Column (25%) --> */}
            <Sidebar />
            
            {/* <!-- Main Content Column (75%) --> */}
            <div className="col-md-9">
                <div className="main-content p-4 text-center">
                    <h1 className="welcome-heading">Welcome to Dashboard</h1>
                    <p className="mt-3">This is your main content area. You can add more components here.</p>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Dashboard
