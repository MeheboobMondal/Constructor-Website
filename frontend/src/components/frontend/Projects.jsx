import React, { useEffect, useState } from 'react'
import Card from './Card'
import {apiUrl, fileUrl} from '../backend/Http'

const Projects = () => {
  const [projects, setProjects] = useState([])
  const limit = 4
  const loadProjects = async () => {
    const req = await fetch(`${apiUrl}/get-limit-projects?limit=${limit}`,{
      method : "GET",
      
    })
    const result = await req.json()
    console.log(result)
    if(result.status == true){
      setProjects(result.data)
    }
  }

  useEffect(() => {
    loadProjects()
  }, [])
  return (
    <>
      <section className="py-5 mb-5">
  <div className="container-fluid">
    {/* <!-- Centered headings and paragraph --> */}
    <div className="text-center mb-5">
      <h6 className="text-uppercase custom-pink">OUR Projects</h6>
      <h1 className="mb-3 text-capitalize fw-bold">Discover our diverse range of projects</h1>
      <p className="lead text-black fw-lighter">We offer a diverse array of construction services, spanning residential, commercial, and industrial projects.</p>
    </div>
    
    {/* <!-- Four cards in a single row --> */}
    <div className="row g-4">
      {/* <!-- Card 1 --> */}
      {projects && (
        projects.map((itm) => (
          // console.log(itm.title)
          <Card key={itm.id} img={`${fileUrl}uploads/project/small/${itm.image}`} title={itm.title} text={itm.shortDesc} btn="Read More"/>
        ))
      )}
      
      
      
    </div>
  </div>
</section>
    </>
  )
}

export default Projects
