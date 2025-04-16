import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar'
import { Link } from 'react-router-dom'
import { apiUrl, getToken } from '../Http'
import { toast } from 'react-toastify'

const ShowArticle = () => {
    const [blogs, setBlogs] = useState([])

    const getBlogs = async () => {
        const req = await fetch(`${apiUrl}/blogs/show`,{
            method : "GET",
            headers : {
                'Authorization' : `Bearer ${getToken()}`
            }
        })

        const result = await req.json()
        // console.log('result')
        // console.log(result)
        if(result.status == true){
          setBlogs(result.data)
        }

    }

    useEffect(() => {
      getBlogs()
    }, [blogs])

    const deleteArticle = async(id) => {
      const req = await fetch(`${apiUrl}/blogs/delete/${id}`, {
        method : "DELETE",
        headers : {
          'Authorization' : `Bearer ${getToken()}`
        }
      })

      const result = await req.json()

      if(result.status == true){
        toast.success(result.message)
        const dataAfterDelete = blogs.filter((itm) => itm.id != id)
        setBlogs(blogs)
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
        <h2 className="services-title">Our Blogs</h2>
        
      </div>
      <div className="col-md-4 text-md-end">
        <Link to="/admin/blogs/create" className="btn btn-primary btn-sm services-btn">Add New Articles</Link>
      </div>
    </div>

    {/* <!-- Services Table --> */}
    <div className="table-responsive">
      <table className="table table-striped table-hover">
        <thead className="table-dark">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Title</th>
            {/* <th scope="col">Slug</th> */}
            <th scope="col">Status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {blogs && (
            blogs.map((itm) => (
                <tr key={itm.id}>
            <th scope="row">{itm.id}</th>
            <td>{itm.title}</td>
            {/* <td>{itm.slug}</td> */}
            <td><span className="badge bg-success">{itm.status == 1 ?'Active':'Draft'}</span></td>
            <td>
              <Link to={`/admin/blogs/update/${itm.id}`} className="btn btn-sm btn-outline-primary me-2">Edit</Link>
              <button onClick={() => deleteArticle(itm.id)} className="btn btn-sm btn-outline-danger">Delete</button>
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

export default ShowArticle
