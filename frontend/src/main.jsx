import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, useLoaderData } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './components/frontend/pages/Home.jsx'
import AboutPage from './components/frontend/pages/AboutPage.jsx'
import ServicePage from './components/frontend/pages/ServicePage.jsx'
import ProjectsPage from './components/frontend/pages/ProjectsPage.jsx'
import BlogsPage from './components/frontend/pages/BlogsPage.jsx'
import Contact from './components/frontend/pages/Contact.jsx'
import Login from './components/backend/Login.jsx'
import Dashboard from './components/backend/Dashboard.jsx'
import { ToastContainer, toast } from 'react-toastify';
import { AuthProvider } from './components/backend/context/Auth.jsx'
import RequireAuth from './components/RequireAuth.jsx'
import Service from './components/backend/Service.jsx'
import AddService from './components/backend/AddService.jsx'
import EditService from './components/backend/EditService.jsx'
import ShowProject from './components/backend/projects/ShowProject.jsx'
import AddProjects from './components/backend/projects/AddProjects.jsx'
import UpdateProject from './components/backend/projects/UpdateProject.jsx'
import ShowArticle from './components/backend/blogs/ShowArticle.jsx'
import CreateArticle from './components/backend/blogs/CreateArticle.jsx'
import UpdateArticle from './components/backend/blogs/UpdateArticle.jsx'
import ShowTestimonial from './components/backend/testimonial/ShowTestimonial.jsx'
import CreateTestimonial from './components/backend/testimonial/CreateTestimonial.jsx'
import UpdateTestimonial from './components/backend/testimonial/UpdateTestimonial.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='' element={<Home />} />
      <Route path='about' element={<AboutPage />} />
      <Route path='service' element={<ServicePage />} />
      <Route path='projects' element={<ProjectsPage />} />
      <Route path='blogs' element={<BlogsPage />} />
      <Route path='contact' element={<Contact />} />
      <Route path='admin/login' element={<Login />} />
      
        <Route path='admin/dashboard' element={
          <RequireAuth>
          <Dashboard />
          </RequireAuth>
          } />
        

        <Route path='admin/service' element={
          <RequireAuth>
            <Service />
          </RequireAuth>
          } /> 
          
          <Route path='admin/service/addnew' element={
          <RequireAuth>
            <AddService />
          </RequireAuth>
          } /> 
          
          <Route path='admin/service/edit/:id' element={
          <RequireAuth>
            <EditService />
          </RequireAuth>
          } />
          
          <Route path='admin/projects' element={
          <RequireAuth>
            <ShowProject />
          </RequireAuth>
          } />
          
          <Route path='admin/project/create' element={
          <RequireAuth>
            <AddProjects />
          </RequireAuth>
          } />
          
          <Route path='admin/project/edit/:id' element={
          <RequireAuth>
            <UpdateProject />
          </RequireAuth>
          } />
          
          <Route path='admin/blogs' element={
          <RequireAuth>
            <ShowArticle />
          </RequireAuth>
          } />
          
          <Route path='admin/blogs/create' element={
          <RequireAuth>
            <CreateArticle />
          </RequireAuth>
          } />
          
          <Route path='admin/blogs/update/:id' element={
          <RequireAuth>
            <UpdateArticle />
          </RequireAuth>
          } />
          
          <Route path='admin/testimonials' element={
          <RequireAuth>
            <ShowTestimonial />
          </RequireAuth>
          } />
          
          <Route path='admin/testimonial/create' element={
          <RequireAuth>
            <CreateTestimonial />
          </RequireAuth>
          } />
          
          <Route path='admin/testimonial/update/:id' element={
          <RequireAuth>
            <UpdateTestimonial />
          </RequireAuth>
          } />
        

      </Route>  
  )
)


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
          <RouterProvider router={router} />
          <ToastContainer position="top-center"/>
    </AuthProvider>

  </StrictMode>,
)
