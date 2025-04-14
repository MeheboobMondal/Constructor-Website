import React from 'react'
import Hero from '../Hero'
import About from '../About'
import Services from '../Services'
import icon1 from '../../../assets/img/icon-1.svg'
import icon2 from '../../../assets/img/icon-2.svg'
import icon3 from '../../../assets/img/icon-3.svg'
import Projects from '../Projects'
import Testimonials from '../Testimonials'
import Blog from '../Blog'


const Home = () => {
  return (
    <>
      <Hero subtitle="Welcome to amazing construction" title="Crafting dreams with precision and excellence." text="We excel at transforming visions into reality through outstanding craftsmanship and precise
                attention to detail. With years of experience and a dedication to quality." pmbtn="Contact Now" secbtn="View Projects"/>

        <About />
        <Services />
        <section className="py-5">
    <div className="container text-center">
        <h5 className='custom-pink'>Why Choose Us</h5>
        <h1 className="my-3 fw-bold">Discover our wide variety of projects.</h1>
        <p className="lead mb-5 mx-auto w-75 fw-regular">
            Created in close partnership with our clients and collaborators, this approach merges industry expertise,
            decades of experience, innovation, and flexibility to consistently deliver excellence.
        </p>
        
        <div className="row g-4 height">
            {/* Card 1 */}
            <div className="col-md-4">
                <div className="card h-100 border-0 shadow-lg p-4 rounded-5">
                    <div className="card-body text-center rounded-4">
                        <div className="bg-light rounded-4 p-2 mb-4 mx-auto" style={{width: "60px", height: "60px"}}>
                            {/* <i className="bi bi-lightbulb fs-4 text-primary"></i> */}
                            {/* <FontAwesomeIcon icon={faCat}/> */}
                            <img src={icon1} alt="" />
                        </div>
                        <h4 className="card-title mb-3">Innovation</h4>
                        <p className="card-text">We bring cutting-edge solutions and creative approaches to every project we undertake.</p>
                    </div>
                </div>
            </div>
            
            {/* Card 2 */}
            <div className="col-md-4">
                <div className="card h-100 border-0 shadow-lg p-4 rounded-5">
                    <div className="card-body text-center">
                        <div className="bg-light rounded-circle p-2 mb-4 mx-auto" style={{width: "60px", height: "60px"}}>
                            <img src={icon2} alt="" />
                            {/* <i className="bi bi-award fs-4 text-primary"></i> */}
                        </div>
                        <h4 className="card-title mb-3">Experience</h4>
                        <p className="card-text">Decades of industry knowledge ensure we deliver exceptional results every time.</p>
                    </div>
                </div>
            </div>
            
            {/* Card 3 */}
            <div className="col-md-4">
                <div className="card h-100 border-0 shadow-lg p-4 rounded-5">
                    <div className="card-body text-center">
                        <div className="bg-light rounded-circle p-2 mb-4 mx-auto" style={{width: "60px", height: "60px"}}>
                            {/* <i className="bi bi-people fs-4 text-primary"></i> */}
                            <img src={icon3} alt="" />
                        </div>
                        <h4 className="card-title mb-3">Collaboration</h4>
                        <p className="card-text">We work closely with clients to understand and exceed their expectations.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
    <Projects />
    <Testimonials />
    <Blog />
    </>
  )
}

export default Home
