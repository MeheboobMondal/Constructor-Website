import React from 'react'

const Footer = () => {
  return (
    <>
      <footer className="footer-section pt-5 pb-3">
  <div className="container">
    <div className="row g-4">
      {/* <!-- Column 1: About --> */}
      <div className="col-lg-3 col-md-6">
        <h3 className="footer-heading text-yellow">UrbanEdge Constructions</h3>
        <p className="footer-text">Our post-construction services gives you peace of mind knowing that we are still here for you even after.</p>
      </div>
      
      {/* <!-- Column 2: Services --> */}
      <div className="col-lg-3 col-md-6">
        <h4 className="footer-subheading text-yellow">Our Services</h4>
        <ul className="footer-links list-unstyled">
          <li><a href="#" className="footer-link">Residential Construction</a></li>
          <li><a href="#" className="footer-link">Commercial Projects</a></li>
          <li><a href="#" className="footer-link">Interior Design</a></li>
          <li><a href="#" className="footer-link">Renovation Services</a></li>
        </ul>
      </div>
      
      {/* <!-- Column 3: Quick Links --> */}
      <div className="col-lg-3 col-md-6">
        <h4 className="footer-subheading text-yellow">Quick Links</h4>
        <ul className="footer-links list-unstyled">
          <li><a href="#" className="footer-link">About Us</a></li>
          <li><a href="#" className="footer-link">Services</a></li>
          <li><a href="#" className="footer-link">Contact Us</a></li>
          <li><a href="#" className="footer-link">Blogs</a></li>
        </ul>
      </div>
      
      {/* <!-- Column 4: Contact --> */}
      <div className="col-lg-3 col-md-6">
        <h4 className="footer-subheading text-yellow">Contact Us</h4>
        <ul className="footer-contact list-unstyled">
          <li className="d-flex align-items-center mb-2">
            <i className="fas fa-phone-alt footer-icon me-2"></i>
            <a href="tel:+15551234567"><span>+1 (555) 123-4567</span></a>
          </li>
          <li className="d-flex align-items-center mb-2">
            <i className="fas fa-envelope footer-icon me-2"></i>
            <span>info@urbanedge.com</span>
          </li>
          <li className="d-flex align-items-start mb-2">
            <i className="fas fa-map-marker-alt footer-icon me-2 mt-1"></i>
            <span>123 Construction Ave, Building City, BC 12345</span>
          </li>
        </ul>
      </div>
    </div>
    
    <hr className="footer-divider my-4" />
    
    <div className="row">
      <div className="col-12 text-center">
        <p className="copyright-text">Copyright © 2024 UrbanEdge Constructions. All Rights Reserved.</p>
      </div>
    </div>
  </div>
</footer>
    </>
  )
}

export default Footer
