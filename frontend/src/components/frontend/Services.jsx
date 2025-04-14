import React, { useEffect, useState } from 'react'
import Card from './Card'
import {apiUrl, fileUrl} from '../backend/Http'

const Services = () => {
  const [services, setServices] = useState([])
  const getData = async() => {
    const res = await fetch(`${apiUrl}/get-limit-services?limit=4`, {
      method : "GET"
      
    })

    const result = await res.json()
    
    setServices(result.data)
  }

  useEffect(() => {
    getData()
  }, [])
  return (
    <>
      <section className="py-5 mb-5">
  <div className="container-fluid">
    {/* <!-- Centered headings and paragraph --> */}
    <div className="text-center mb-5">
      <h6 className="text-uppercase custom-pink">OUR SERVICES</h6>
      <h1 className="mb-3 text-capitalize fw-bold">Our construction services</h1>
      <p className="lead text-black fw-lighter">We offer a diverse array of construction services, spanning residential, commercial, and industrial projects.</p>
    </div>
    
    {/* <!-- Four cards in a single row --> */}
    <div className="row g-4">
      {/* <!-- Card 1 --> */}
      {services && (
        services.map((itm) => (
          <Card key={itm.id} img={`${fileUrl}uploads/service/small/${itm.image}`} title={itm.title} text={itm.shortDesc} btn="Read More" col3="col-lg-3"/>
        ))
      )}
      
      
      
      
    </div>
  </div>
</section>
    </>
  )
}

export default Services
