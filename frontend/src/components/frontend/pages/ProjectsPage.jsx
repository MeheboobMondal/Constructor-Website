import React, { useState, useEffect } from 'react'
import HeroOthers from '../HeroOthers'
import Projects from '../Projects'

import Card from '../Card'
import { fileUrl, apiUrl } from '../../backend/Http'

const ProjectsPage = () => {
  const [projects, setProjects] = useState([])
  const loadProjects = async () => {
      const req = await fetch(`${apiUrl}/get-all-projects`,{
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
      <HeroOthers subtitle="Quality. Integrity. Value." title="Our Projects" text="We excel at transforming visions into reality
through outstanding craftsmanship and precise." /> 
    <section class="py-5 mb-5">
  <div class="container-fluid">
    {/* <!-- Centered headings and paragraph --> */}
    <div class="text-center mb-5">
      <h6 class="text-uppercase custom-pink">OUR Projects</h6>
      <h1 class="mb-3 text-capitalize fw-bold">Discover our diverse range of projects</h1>
      <p class="lead text-black fw-lighter">We offer a diverse array of construction services, spanning residential, commercial, and industrial projects.</p>
    </div>
    
    {/* <!-- Four cards in a single row --> */}
    <div class="row g-4 container mx-auto">
      {/* <!-- Card 1 --> */}

      {projects && (
        projects.map((itm) => (

          <Card img={`${fileUrl}uploads/project/small/${itm.image}`} title={itm.title} text={itm.shortDesc} btn="Read More" col4="col-lg-4"/>
        ))
      )}
      
      
      
    </div>
  </div>
</section>
    </>
  )
}

export default ProjectsPage
