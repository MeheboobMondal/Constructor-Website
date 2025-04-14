import React from 'react'

const Team = () => {
  return (
    <>
      <section className="py-5 mb-5">
  <div className="container-fluid">
    {/* <!-- Centered headings and paragraph --> */}
    <div className="text-center mb-5">
      <h5 className="text-uppercase custom-pink">Team</h5>
      <h1 className="mb-3 text-capitalize fw-bold">Our Team</h1>
      <p className="lead text-black fw-lighter">We specialize in a wide range of construction services, including residential, commercial, and industrial projects.</p>
    </div>
    
    {/* <!-- Four cards in a single row --> */}
    <section className="team-section py-5">
        <div className="container">
            <div className="row g-4">
                {/* <!-- Card 1 --> */}
                <div className="col-md-6 col-lg-3">
                    <div className="team-card rounded-lg text-center p-4">
                        <div className="team-img-wrapper mb-4">
                            <img src="https://randomuser.me/api/portraits/women/43.jpg" alt="Team Member" className="img-fluid rounded-circle" />
                        </div>
                        <h3 className="team-member-name">Sarah Johnson</h3>
                        <p className="team-member-role text-muted">CEO & Founder</p>
                        <div className="social-links">
                            <a href="#" className="text-decoration-none"><i className="fab fa-linkedin-in"></i></a>
                            <a href="#" className="text-decoration-none"><i className="fab fa-twitter"></i></a>
                            <a href="#" className="text-decoration-none"><i className="fab fa-github"></i></a>
                        </div>
                    </div>
                </div>
                
                {/* <!-- Card 2 --> */}
                <div className="col-md-6 col-lg-3">
                    <div className="team-card rounded-lg text-center p-4">
                        <div className="team-img-wrapper mb-4">
                            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Team Member" className="img-fluid rounded-circle" />
                        </div>
                        <h3 className="team-member-name">Michael Chen</h3>
                        <p className="team-member-role text-muted">CTO</p>
                        <div className="social-links">
                            <a href="#" className="text-decoration-none"><i className="fab fa-linkedin-in"></i></a>
                            <a href="#" className="text-decoration-none"><i className="fab fa-twitter"></i></a>
                            <a href="#" className="text-decoration-none"><i className="fab fa-github"></i></a>
                        </div>
                    </div>
                </div>
                
                {/* <!-- Card 3 --> */}
                <div className="col-md-6 col-lg-3">
                    <div className="team-card rounded-lg text-center p-4">
                        <div className="team-img-wrapper mb-4">
                            <img src="https://randomuser.me/api/portraits/women/65.jpg" alt="Team Member" className="img-fluid rounded-circle" />
                        </div>
                        <h3 className="team-member-name">Emily Rodriguez</h3>
                        <p className="team-member-role text-muted">Marketing Director</p>
                        <div className="social-links">
                            <a href="#" className="text-decoration-none"><i className="fab fa-linkedin-in"></i></a>
                            <a href="#" className="text-decoration-none"><i className="fab fa-twitter"></i></a>
                            <a href="#" className="text-decoration-none"><i className="fab fa-instagram"></i></a>
                        </div>
                    </div>
                </div>
                
                {/* <!-- Card 4 --> */}
                <div className="col-md-6 col-lg-3">
                    <div className="team-card rounded-lg text-center p-4">
                        <div className="team-img-wrapper mb-4">
                            <img src="https://randomuser.me/api/portraits/men/75.jpg" alt="Team Member" className="img-fluid rounded-circle" />
                        </div>
                        <h3 className="team-member-name">David Kim</h3>
                        <p className="team-member-role text-muted">Lead Developer</p>
                        <div className="social-links">
                            <a href="#" className="text-decoration-none"><i className="fab fa-linkedin-in"></i></a>
                            <a href="#" className="text-decoration-none"><i className="fab fa-twitter"></i></a>
                            <a href="#" className="text-decoration-none"><i className="fab fa-github"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  </div>
</section>
    </>
  )
}

export default Team
