import React, { useEffect, useState } from 'react'
import HeroOthers from '../HeroOthers'
import Services from '../Services'
import Card from '../Card'
import { apiUrl, fileUrl } from '../../backend/Http'
const ServicePage = () => {
  const [services, setServices] = useState([])
  const loadAllData = async() => {
    const res = await fetch(`${apiUrl}/get-all-services`, {
      method : "GET"
    })

    const result = await res.json()
    setServices(result.data)
  }

  useEffect(() => {
    loadAllData()
  }, [])
  return (
    <>
      <HeroOthers subtitle="Quality. Integrity. Value." title="Services" text="We excel at transforming visions into reality
through outstanding craftsmanship and precise." />
        <section className="py-5 mb-5">
  <div className="container-fluid">
    {/* <!-- Centered headings and paragraph --> */}
    <div className="text-center mb-5">
      <h6 className="text-uppercase custom-pink">OUR SERVICES</h6>
      <h1 className="mb-3 text-capitalize fw-bold">Our construction services</h1>
      <p className="lead text-black fw-lighter">We offer a diverse array of construction services, spanning residential, commercial, and industrial projects.</p>
    </div>
    
    {/* <!-- Four cards in a single row --> */}
    <div className="row g-4 container mx-auto">
      {/* <!-- Card 1 --> */}

      {services && (
        services.map((itm) => (
          
          <Card key={itm.id} img={`${fileUrl}uploads/service/small/${itm.image}`} title={itm.title} text={itm.shortDesc} btn="Read More" col4="col-lg-4"/>
        ))
      )}
     
      
      
    </div>
  </div>
</section>
    </>
  )
}

export default ServicePage
