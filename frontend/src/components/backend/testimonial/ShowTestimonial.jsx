import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar'
import { apiUrl, getToken } from '../Http'
import { data, Link } from 'react-router-dom'
import { toast } from 'react-toastify'

const ShowTestimonial = () => {
    const [testimonial, setTestimonial] = useState([])

    const getData = async() => {
        const req = await fetch(`${apiUrl}/testimonial/index`, {
            method : 'GET',
            headers : {
                'Authorization' : `Bearer ${getToken()}`
            }
        })

        const result = await req.json()

        if(result.status == true){
            setTestimonial(result.data)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    const deleteTesti = async(id) => {
        const req = await fetch(`${apiUrl}/testimonial/delete/${id}`, {
            method : "DELETE",
            headers : {
                'Accept' : 'application/json',
                'Authorization' : `Bearer ${getToken()}`
            }
        })

        const result = await req.json()

        if(result.status == true){
            const newData = testimonial.filter((itm) => itm.id != id)
            setTestimonial(newData)
            toast.success(result.message)
        }else{
            toast.error(result.message)
        }
    }
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
    <h2 className="services-title">Our Testimonials</h2>
    
  </div>
  <div className="col-md-4 text-md-end">
    <Link to="/admin/testimonial/create" className="btn btn-primary btn-sm services-btn">Add New Testimonial</Link>
  </div>
</div>

{/* <!-- Services Table --> */}
<div className="table-responsive">
  <table className="table table-striped table-hover">
    <thead className="table-dark">
      <tr>
        <th scope="col">ID</th>
        <th scope="col">Name</th>
        <th scope="col">Status</th>
        <th scope="col">Action</th>
      </tr>
    </thead>
    <tbody>
      {testimonial && (
        testimonial.map((itm) => (
            <tr key={itm.id}>
        <th scope="row">{itm.id}</th>
        <td>{itm.citation}</td>
        <td><span className="badge bg-success">{itm.status == 1 ?'Active':'Draft'}</span></td>
        <td>
          <Link to={`/admin/testimonial/update/${itm.id}`} className="btn btn-sm btn-outline-primary me-2">Edit</Link>
          <button onClick={() => deleteTesti(itm.id)} className="btn btn-sm btn-outline-danger">Delete</button>
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

export default ShowTestimonial
