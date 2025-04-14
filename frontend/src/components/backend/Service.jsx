import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import { getToken, apiUrl } from './Http'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Service = () => {
    const [services, setServices] = useState()
    const navigate = useNavigate()
   
        const fetchServices = async() => {
            const res = await fetch(`${apiUrl}/service/data`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept' : 'application/json',
                    'Authorization' : `Bearer ${getToken()}`
                }
            })

            let data = await res.json()
            setServices(data.data)
            
        }

    useEffect(() => {
        fetchServices()

    }, [])

    const deleteService = async(id) => {
      const res = await fetch(`${apiUrl}/service/${id}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Accept' : 'application/json',
            'Authorization' : `Bearer ${getToken()}`
        }
    })

    let result = await res.json()
    if(result.status == false){
      toast.error(result.message)
    }else{
      toast.success(result.message)
      let newservice = services.filter((itm) => itm.id != id)
      setServices(newservice)
    }
  }
    
    // console.log(services)
  return (
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
        <h2 className="services-title">Services</h2>
       
      </div>
      <div className="col-md-4 text-sm-end">
        <Link to="/admin/service/addnew" className="btn btn-primary btn-sm services-btn">Add New Service</Link>
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
          {services && (
            services.map((itm) => (
                <tr key={itm.id}>
            
            <td>{itm.id}</td>
            <td>{itm.title}</td>
            <td>{itm.slug}</td>
            <td><span className="badge bg-success">{itm.status == 1? 'Active':'inActive'}</span></td>
            <td>
              <Link to={`/admin/service/edit/${itm.id}`} className="btn btn-sm btn-outline-primary me-2">Edit</Link>
              <button onClick={() => deleteService(itm.id)} className="btn btn-sm btn-outline-danger">Delete</button>
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
  )
}

export default Service
