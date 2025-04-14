import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar'
import { apiUrl, getToken } from '../Http'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

const ShowProject = () => {
    const [projects, setProjects] = useState()
    const showData = async() => {
        const req = await fetch(`${apiUrl}/project/show`, {
            method : "GET",
            headers : {
                'Content-Type' : 'application/json',
                'Accept' : 'application/json',
                'Authorization' : `Bearer ${getToken()}`
            }
        })

        let result = await req.json()
        console.log(result)
        setProjects(result.data)
    }

    useEffect(() => {
        showData()
    }, [])

    // delete project 

    const deleteProject = async (id) => {
      const req = await fetch(`${apiUrl}/project/delete/${id}`, {
        method : 'DELETE',
        headers : {
          'Content-Type' : 'application/json',
          'Accept' : 'application/json',
          'Authorization' : `Bearer ${getToken()}`
        }
      })

      const result = await req.json()
      if(result == false){
        toast.error(result.message)
      }else{
        toast.success(result.message)
        let updateData = projects.filter((itm) => itm.id != id)
        setProjects(updateData)
      }
    }
  return (
    <>
         <div className="container my-4">
        <div className="row g-4">
            {/* <!-- Sidebar Column (25%) --> */}
            <Sidebar />
            
            {/* <!-- Main Content Column (75%) --> */}
            <div className="col-md-9">
            {/* <!-- Services Section --> */}
<section className="services-section py-5">
  <div className="container">
    <div className="row align-items-center mb-5">
      <div className="col-md-8">
        <h2 className="services-title">Our Projects</h2>
        
      </div>
      <div className="col-md-4 text-md-end">
        <Link to="/admin/project/create" className="btn btn-primary btn-sm services-btn">Add New Project</Link>
      </div>
    </div>

    {/* <!-- Services Table --> */}
    <div className="table-responsive">
      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Title</th>
            <th scope="col">Slug</th>
            <th scope="col">Status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {projects && (
            projects.map((itm) => (
                <tr key={itm.id}>
            <th scope="row">{itm.id}</th>
            <td>{itm.title}</td>
            <td>{itm.slug}</td>
            <td><span className="badge bg-success">{itm.status == 1 ?'Active':'Draft'}</span></td>
            <td>
              <Link to={`/admin/project/edit/${itm.id}`} className="btn btn-sm btn-outline-primary me-2">Edit</Link>
              <button onClick={() => deleteProject(itm.id)} className="btn btn-sm btn-outline-danger">Delete</button>
            </td>
          </tr>
            ))
          )}
          
        </tbody>
      </table>
    </div>
  </div>
</section>
            </div>
        </div>
    </div>
    </>
  )
}

export default ShowProject
