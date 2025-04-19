import React, { useState, useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';
import Sidebar from '../Sidebar'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { apiUrl, fileUrl, getToken } from '../Http';
import { toast } from 'react-toastify';

const UpdateTestimonial = ({placeholder}) => {
    const [message, setMessage] = useState()
    const [imageId, setImageId] = useState()
    const [data, setData] = useState([])
    const navigate = useNavigate()
    const param = useParams()

    // editor configure
    const editor = useRef(null)
    
        const config = useMemo(() => ({
                readonly: false, // all options from https://xdsoft.net/jodit/docs/,
                placeholder: placeholder || ''
            }),
            [placeholder]
        );

    // react hook form
    
        const {
            register,
            handleSubmit,
            watch,
            formState: { errors },
          } = useForm({
                defaultValues : async() => {
                    const req = await fetch(`${apiUrl}/testimonial/index/${param.id}`, {
                        method : "GET",
                        headers : {
                            'Accept': "application/json",
                            'Authorization' : `Bearer ${getToken()}`
                        }
                    })

                    const result = await req.json()

                    if(result.status == false){
                        console.log(result.message)
                    }else{
                        
                        setMessage(result.data.message)
                        setData(result.data)
                        return {
                            citation : result.data.citation,
                            status : result.data.status
                        }
                    }
                    
                }
            }
          )

    // api handling 
    //create testimonial data   
    const onSubmit = async(data) => {
        const allData = {...data, message, imageId}
        const req =await fetch(`${apiUrl}/testimonial/update/${param.id}`, {
            method : 'PUT',
            headers : {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${getToken()}`
            },
            body : JSON.stringify(allData)
        })

        const result =await req.json()

        if(result.status == false){
            toast.error(result.message)
        }else{
            toast.success(result.message)
            navigate('/admin/testimonials')
        }
    }

    // temp image upload

    const fileUpload =async (e) => {
        const formData = new FormData()
        const file = e.target.files[0]
        formData.append('image', file)

        const req = await fetch(`${apiUrl}/service/image`, {
            method : 'POST',
            headers : {
                'Authorization' : `Bearer ${getToken()}`
            },
            body : formData
        })

        const result =await req.json()
       
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
            <div className="container my-5">
            <div className="row align-items-center mb-5">
      <div className="col-md-8">
        <h2 className="services-title">testimonial/update</h2>
       
      </div>
      <div className="col-md-4 text-sm-end">
        <Link to="/admin/testimonials" className="btn btn-danger btn-md services-btn">Back</Link>
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
              <label htmlFor="citation" className="form-label">Name</label>
              <input 
              {...register('citation',{
                required:true
              })}
              type="text" className="form-control" id="citation" required />
              {errors.citation && <p className='text-danger text-sm'>This field is required</p>}
            </div>
            
           
            

            
              
            
           
            
            {/* <!-- Content --> */}
            <div className="mb-3">
              <label htmlFor="content" className="form-label">Content</label>
              <JoditEditor
			ref={editor}
			value={message}
			config={config}
			tabIndex={1} // tabIndex of textarea
			onBlur={newContent => setMessage(newContent)} // preferred to use only this option to update the content for performance reasons
			onChange={newContent => {}}
		    />
            </div> 

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
            
            {/* <!-- File Upload --> */}
            <div className="mb-3">
              <label htmlFor="file" className="form-label">Chose Image</label>
              <input
              {...register('image')}
              onChange={(e) => fileUpload(e)}
              type="file" className="form-control" id="file"  />
              <img className="mt-3 rounded w-25" src={`${fileUrl}uploads/testimonial/${data.image}`} alt="" />
            </div>


            
           
            
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <button type="reset" className="btn btn-outline-secondary me-md-2">Reset</button>
              <button type="submit" className="btn btn-primary">Update</button>
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
  )
}

export default UpdateTestimonial
