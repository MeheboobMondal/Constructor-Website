import React from 'react'
import aboutImg from '../../assets/img/1.jpg'

const About = () => {
  return (
    <>
      <div className="container py-5 mb-5">
    <div className="row align-items-center">
        {/* <!-- Left side with rounded image and box shadow --> */}
        <div className="col-md-6 mb-4 mb-md-0">
            <img src={aboutImg} alt="About Us" className="img-fluid rounded shadow img w-100"/>
        </div>
        
        {/* <!-- Right side with content --> */}
        <div className="col-md-6">
            <h5 className="custom-pink">ABOUT US</h5>
            <h1 className="mb-3">Crafting structures that last a lifetime</h1>
            <p className="text-muted">
                Building enduring structures requires a comprehensive approach that combines advanced materials, resilient design, routine maintenance, and sustainable practices. By drawing on historical insights and utilizing modern technology.
            </p>
            <p className="text-muted">
                Designing structures that stand the test of time involves a seamless blend of cutting-edge materials, durable design, ongoing upkeep, and eco-friendly practices. By combining lessons from the past with the power of modern technology.
            </p>
        </div>
    </div>
</div>
    </>
  )
}

export default About
