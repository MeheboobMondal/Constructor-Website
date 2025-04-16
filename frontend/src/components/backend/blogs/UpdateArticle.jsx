import React, { useState, useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';
import Sidebar from '../Sidebar'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { apiUrl, fileUrl, getToken } from '../Http';
import { toast } from 'react-toastify';

const UpdateArticle = ({placeholder}) => {
    const params = useParams()
    const navigate = useNavigate()

    // jodit editor
        const editor = useRef(null);
        const [content, setContent] = useState('');
        const [article, setArticle] = useState([]);
        const [imageId, setImageId] = useState('')
    
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
            defaultValues: async() => {
                const req = await fetch(`${apiUrl}/blogs/index/${params.id}`,{
                    method : "GET",
                    headers : {
                        'Authorization' : `Bearer ${getToken()}`
                    }
                })

                const result = await req.json()
                setContent(result.data.content)
                setArticle(result.data)
                return{
                    title : result.data.title,
                    slug : result.data.slug,
                    author : result.data.author,
                    status : result.data.status,
                    content : result.data.content,
                }
            }
          })

    const onSubmit = async (data) => {
            const allData = {...data, content, imageId}
    
            const req = await fetch(`${apiUrl}/blogs/update/${params.id}`, {
                method : 'PUT',
                headers : {
                    'Accept' : 'application/json',
                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${getToken()}`
                },
                body : JSON.stringify(allData)
            })
    
            const result = await req.json()
    
            if(result.status == false){
                toast.error(result.message)
            }else{
               navigate('/admin/blogs') 
               toast.success(result.message)
            }
    }

    

    // temp image uplaod

    const fileUpload = async (e) => {
        const formData = new FormData()
        const file = e.target.files[0]
        formData.append('image', file)

        const req = await fetch(`${apiUrl}/service/image`, {
          method : 'POST',
          headers : {
            'Accept' : 'application/json',
            'Authorization' : `Bearer ${getToken()}`
          },
          body : formData 
        })

        const result = await req.json()

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
        <h2 className="services-title">Blogs/Add New</h2>
       
      </div>
      <div className="col-md-4 text-sm-end">
        <Link to="/admin/blogs" className="btn btn-danger btn-md services-btn">Back</Link>
      </div>
    </div>
  <div className="row justify-content-center">
    <div className="col-lg-8">
      <div className="card shadow-sm">
        <div className="card-header">
          <h3 className="mb-0">Article Form</h3>
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
            
            

            {/* <!-- Sector and Status Field --> */}
            <div className="row">
                <div className="col-md-6">
                <div className="mb-3">
              <label htmlFor="sector" className="form-label">Author</label>
              <div className="input-group">
                <input 
                {...register('author')}
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
              type="file" className="form-control" id="file"  />

              <img className='w-50 mt-2 rounded' src={`${fileUrl}uploads/blogs/small/${article.image}`} alt="" />
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
    </>
  )
}

export default UpdateArticle
