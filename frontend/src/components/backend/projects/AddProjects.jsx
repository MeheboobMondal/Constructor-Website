import React, { useState, useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';
import Sidebar from '../Sidebar'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { apiUrl, getToken } from '../Http';
import { toast } from 'react-toastify';


const AddProjects = ({placeholder}) => {
    const navigate = useNavigate()
    const[imageId, setImageId] = useState()
    // joditEditor Confiratin
    const editor = useRef(null);
	const [content, setContent] = useState('');

	const config = useMemo(() => ({
			readonly: false, // all options from https://xdsoft.net/jodit/docs/,
			placeholder: placeholder || 'Start typings...'
		}),
		[placeholder]
	);

    // react hook form

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm()
    
      const onSubmit = async(data) => {
        const finalData = {...data, content, imageId}
        const req = await fetch(`${apiUrl}/project/create`, {
            method : "POST",
            headers : {
                'Content-Type' : 'application/json',
                'Accept' : 'application/json',
                'Authorization' : `Bearer ${getToken()}`
            },
            body : JSON.stringify(finalData)
        })

        const result =await req.json()

        if(result.status == false){
            toast.error(result.message)
        }else{
            toast.success(result.message)
            navigate('/admin/projects')
        }
      }

    //   temp file upload

    const fileUpload = async(e) => {
        const formData = new FormData()
        let file = e.target.files[0]
        formData.append("image", file)

        const req = await fetch(`${apiUrl}/service/image`,{
            method : "POST",
            headers : {
                'Accept' : 'application/json',
                'Authorization' : `Bearer ${getToken()}`
            },
            body : formData
        })

        const result =await req.json()
        console.log(result.data.id)
    
        if(result.status == false){
            toast.error(result.message)
        }else{
            setImageId(result.data.id)
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
            <div className="container my-5">
            <div className="row align-items-center mb-5">
      <div className="col-md-8">
        <h2 className="services-title">Projects/Add New</h2>
       
      </div>
      <div className="col-md-4 text-sm-end">
        <Link to="/admin/projects" className="btn btn-danger btn-md services-btn">Back</Link>
      </div>
    </div>
  <div className="row justify-content-center">
    <div className="col-lg-8">
      <div className="card shadow-sm">
        <div className="card-header">
          <h3 className="mb-0">Project Form</h3>
        </div>
        <div className="card-body">
          <form id="contentForm" onSubmit={handleSubmit(onSubmit)}>
            {/* <!-- Title Field --> */}
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Title</label>
              <input 
              {...register('title',{
                required:true
              })}
              type="text" className="form-control" id="title" required />
              {errors.title && <p className='text-danger text-sm'>This field is required</p>}
            </div>
            
            {/* <!-- Slug Field --> */}
            <div className="mb-3">
              <label htmlFor="slug" className="form-label">Slug</label>
              <div className="input-group">
                <input 
                {...register('slug', {
                    required:true
                })}
                type="text" className="form-control" id="slug" required />
                {errors.slug && <p className='text-danger text-sm'>This field is required</p>}
              </div>
            </div>
            
            {/* <!-- Location and Construction Field --> */}
            <div className="row">
                <div className="col-md-6">
                <div className="mb-3">
              <label htmlFor="location" className="form-label">Location</label>
              <div className="input-group">
                <input 
                {...register('location')}
                type="text" className="form-control" id="location" required />
                
              </div>
            </div>
                </div>
                <div className="col-md-6">
                <div className="mb-3">
                              <label
                                htmlFor="construciton"
                                className="form-label"
                              >
                                Construction Type
                              </label>
                              <div className="mb-3">
                                <div className="input-group">
                                  <select
                                    {...register("constructionType", {
                                      required:
                                        "Please select a construction type",
                                    })}
                                    id="construction"
                                    className={`form-control ${
                                      errors.constructionType
                                        ? "is-invalid"
                                        : ""
                                    }`}
                                  >
                                    <option value="">Select Option</option>
                                    <option value="Luxury Villa Development">
                                      Luxury Villa Development
                                    </option>
                                    <option value="Apartment High-Rise Tower">
                                      Apartment High-Rise Tower
                                    </option>
                                    <option value="Retirement Village">
                                      Retirement Village
                                    </option>
                                  </select>
                                  {errors.constructionType && (
                                    <div className="invalid-feedback">
                                      {errors.constructionType.message}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                </div>
            </div>

            {/* <!-- Sector and Status Field --> */}
            <div className="row">
                <div className="col-md-6">
                <div className="mb-3">
              <label htmlFor="sector" className="form-label">Sector</label>
              <div className="input-group">
                <input 
                {...register('sector')}
                type="text" className="form-control" id="sector" required />
                
              </div>
            </div>
                </div>
                <div className="col-md-6">
                <div className="mb-3">
              <label htmlFor="construciton" className="form-label">Status</label>
              <div className="input-group">
              <select 
              {...register('status')}
              className="form-select" id="status" required>
                <option value=""selected disabled>Select status</option>
                <option value="1">Active</option>
                <option value="0">Block</option>
              </select>
                
              </div>
            </div>
                </div>
            </div>
            
            {/* <!-- Short Description --> */}
            <div className="mb-3">
              <label htmlFor="shortDescription" className="form-label">Short Description</label>
              <textarea 
              {...register('shortDesc')}
              className="form-control" id="shortDescription" rows="3" required></textarea>
            </div>
            
            {/* <!-- Content --> */}
            <div className="mb-3">
              <label htmlFor="content" className="form-label">Content</label>
              <JoditEditor
			ref={editor}
			value={content}
			config={config}
			tabIndex={1} // tabIndex of textarea
			onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
			onChange={newContent => {}}
		/>
            </div> 
            
            {/* <!-- File Upload --> */}
            <div className="mb-3">
              <label htmlFor="file" className="form-label">Chose Image</label>
              <input
              {...register('image')}
              onChange={(e) => fileUpload(e)}
              type="file" className="form-control" id="file" required />
            </div>


            
           
            
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <button type="reset" className="btn btn-outline-secondary me-md-2">Reset</button>
              <button type="submit" className="btn btn-primary">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>
            </div>
        </div>
    </div>
    </>
  )
}

export default AddProjects
