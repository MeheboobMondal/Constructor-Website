import React, { useContext } from 'react'
import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from './context/Auth';
// import {login} from './context/Auth'

const Login = () => {
    const {login} = useContext(AuthContext)
    const navigate = useNavigate()
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = async (data) => {
        const req = await fetch('http://127.0.0.1:8000/api/login', {
            method : "POST",
            headers: {
                'content-type': "application/json",
            },
            body: JSON.stringify(data)
        })

        const result = await req.json()
        if(result.status == false){
            toast.error(result.message)
        }else{
            data = {
                id: result.id,
                token: result.token
            }
            localStorage.setItem('userData', JSON.stringify(data))
            login(data)
            toast(result.message)
            navigate('/admin/dashboard')
        }
    }
  return (
    <>
      <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <div className="card login-card">
            <div className="card-body p-5">
                <h2 className="card-title text-center mb-4">Login</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input
                        
                        type="email" 
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                        id="email" placeholder="Enter your email" name='email' 
                        {...register('email', {
                            required : true,
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'Please enter a valid email address'
                            }

                        })}
                        />
                    </div>
                    {errors.email && <p className="invalid-feedback">{errors.email.message}</p>}
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" 
                        className={`form-control ${errors.password ? 'is-invalid': ''}`}
                         id="password" placeholder="Enter your password" name='password'
                        {...register('password', {
                            required: true
                        })}
                        />
                    </div>
                    
                    <button type="submit" className="btn btn-primary w-100 mb-3">Login</button>
                   
                </form>
                
            </div>
        </div>
    </div>
    </>
  )
}

export default Login
