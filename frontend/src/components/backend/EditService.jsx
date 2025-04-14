import React, { useState, useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';
import { Link, useNavigate, useParams } from 'react-router-dom'
import Sidebar from './Sidebar'
import { useForm  } from "react-hook-form"
import { apiUrl, getToken, fileUrl } from './Http'
import { toast } from 'react-toastify'


const EditService = ({placeholder}) => {
    const editor = useRef(null)
    const [content, setContent] = useState('');
    const [service, setService] = useState('');
    const [isdisebled, setIsdisebled] = useState(false)
    const params = useParams()
    const navigate = useNavigate()
    const [imageId, setImageId] = useState()

    // editor setting
    const config = useMemo(() => ({
                readonly: false, // all options from https://xdsoft.net/jodit/docs/,
                placeholder: placeholder || ''
            }),
            [placeholder]
    );

        const {
            register,
            handleSubmit,
            watch,
            formState: { errors },
          } = useForm({
            defaultValues: async () => {
            const res = await fetch(`${apiUrl}/service/${params.id}`,{
              method: "GET",
              headers : {
                'Content-Type': 'application/json',
                'Accept' : 'application/json',
                'Authorization' : `Bearer ${getToken()}`
              }  
            })
            const result = await res.json()
            setContent(result.data.content)
            setService(result.data)
            // setImageId(result.data.imageId)
            return{
                title: result.data.title,
                slug: result.data.slug,
                short: result.data.shortDesc,
                status: result.data.status

            }
          }
        })
        

    const onSubmit = async(data) => {
        const newData = {...data, content, imageId}
         const req =await fetch(`${apiUrl}/service/${params.id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type" : "application/json",
                        "Accept" : "application/json",
                        "Authorization" : `Bearer ${getToken()}`,
                    },
                    body : JSON.stringify(newData) 
                })
        
                const result = await req.json()
        
                if(result.status == false){
                    toast.error(result.message)
                }else{
                    toast.success(result.message)
                    navigate('/admin/service')
                }
    }
    const fileUpload = async(e) => {
        const formData = new FormData()
        const file = e.target.files[0]
        formData.append('image', file)

        const res = await fetch(`${apiUrl}/service/image`, {
            method : "POST",
            headers : {
                'Accept' : 'application/json',
                'Authorization' : `Bearer ${getToken()}`
            },
            body : formData
        })

        const result =await res.json()

        if(result.status == false){
            toast.error(result.message)
        }else{
            setImageId(result.data.id)
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
        <h2 className="services-title">Services/Update</h2>
       
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
            <div className=''>
                {service.image && <img src={`${fileUrl}uploads/service/small/${service.image}`} alt="" className='w-50 rounded' />}
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

export default EditService
