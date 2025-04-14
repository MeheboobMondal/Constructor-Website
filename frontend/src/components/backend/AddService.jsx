import React, { useState, useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';
import { Link, useNavigate } from 'react-router-dom'
import Sidebar from './Sidebar'
import { useForm  } from "react-hook-form"
import { apiUrl, getToken } from './Http'
import { toast } from 'react-toastify'

const AddService = ({placeholder}) => {
    // editor
    const editor = useRef(null);
	const [content, setContent] = useState('');
  const [isdisebled, setIsdisebled] = useState(false)
  const [imageId, setImageId] = useState(null)

	const config = useMemo(() => ({
			readonly: false, // all options from https://xdsoft.net/jodit/docs/,
			placeholder: placeholder || 'Start typings...'
		}),
		[placeholder]
	);


    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm()
    
      const onSubmit = async(data) => {
        const allData = {...data, content,  imageId}
        // console.log(allData)
        const req =await fetch(`${apiUrl}/service/create`, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
                "Accept" : "application/json",
                "Authorization" : `Bearer ${getToken()}`,
            },
            body : JSON.stringify(allData) 
        })

        const result = await req.json()

        if(result.status == false){
            toast.error(result.message)
        }else{
            toast.success(result.message)
            navigate('/admin/service')
        }
      }

      // FILE UPLOAD 

      const fileUpload = async(e) => {
        const formData = new FormData()
        const file = e.target.files[0]
        formData.append("image", file)

        const res = await fetch(apiUrl+"/service/image", {
          method : "POST",
          headers : {
            'Accept' : 'applicaiton/json',
            'Authorization' : `Bearer ${getToken()}`
          },
          body : formData
        })

        const result = await res.json()
        console.log(result)
        if(result.status == false){
          toast.error(result.message)
        }else{
          setImageId(result.data.id)
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
        <h2 className="services-title">Services/Add New</h2>
       
      </div>
      <div className="col-md-4 text-sm-end">
        <Link to="/admin/service" className="btn btn-danger btn-sm services-btn">Back</Link>
      </div>
    </div>

    {/* <!-- Add new Form --> */}
    <div className="row justify-content-center">
    <div className="col-lg-8">
      <div className="card shadow-sm">
        <div className="card-header">
          <h3 className="mb-0">Service Form</h3>
        </div>
        <div className="card-body">
          <form id="contentForm" onSubmit={handleSubmit(onSubmit)}>
            {/* <!-- Title Field --> */}
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Title</label>
              <input type="text"
              {...register("title", {
                required:true
              })}
              className={`form-control ${errors.title ? 'is-invalid': ''}`}
               id="title" required />
              {errors.title && <p className='text-danger'>This field is required</p>}
            </div>
            
            {/* <!-- Slug Field --> */}
            <div className="mb-3">
              <label htmlFor="slug" className="form-label">Slug</label>
              <div className="input-group">
                <input type="text" 
                {...register("slug", {
                    required :true
                })}
                className={`form-control ${errors.slug ? 'is-invalid' : ''}`}
                id="slug" required />
                {errors.slug && <p className='text-danger'>this field is required</p>}
                
              </div>
              <div className="form-text">URL-friendly version of the title</div>
            </div>
            
            {/* <!-- Short Description --> */}
            <div className="mb-3">
              <label htmlFor="shortDescription" className="form-label">Short Description</label>
              <textarea 
              {...register("short", {
                required:true
              })}
              className={`form-control ${errors.short ? 'is-invalid' : ''}`}
                id="shortDescription" rows="3" required></textarea>
                {errors.short && <p className='text-danger'>This field is required</p>}
            </div>
            
            {/* <!-- Content --> */}
            <div className="mb-3">
              <label htmlFor="content" className="form-label">Content</label>
            <JoditEditor
			    ref={editor}
			    value={content}
			    config={config}
			    tabIndex={1} // tabIndex of textarea
			    onBlur={newContent => setContent(newContent)} 
			    onChange={newContent => {}}
		    />
              {errors.desc && <p className='text-danger'>This field is required</p>}
            </div>
            {/* file image upload */}
            <div className="mb-3">
              <label htmlFor="file" className="form-label">Image Upload</label>
              <input 
              onChange={fileUpload}
              
              className={`form-control ${errors.file ? 'is-invalid' : ''}`}
              type="file" name="" id="file" />
            </div>
            {/* <!-- Status --> */}
            <div className="mb-3">
              <label htmlFor="status" className="form-label">Status</label>
              <select 
              {...register("status", {
                required:true
              })}
              className={`form-select ${errors.status ? 'is-invalid' : ''}` }
              id="status" required  defaultValue="1">
                <option  selected disabled>Select status</option>
                <option value="1">Active</option>
                <option value="0">Block</option>
              </select>
              {errors.status && <p className='text-danger'>This field is required</p>}
            </div>
            
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <button type="reset" className="btn btn-outline-secondary me-md-2">Reset</button>
              <button disabled={isdisebled} type="submit" className="btn btn-primary">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
    
  </div>
</section>
            </div>
        </div>
    </div>
  )
}




export default AddService
