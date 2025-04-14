import React from 'react'
import HeroOthers from '../HeroOthers'

const Contact = () => {
  return (
    <>
      <HeroOthers subtitle="Quality. Integrity. Value." title="Contact Us" text="We excel at transforming visions into reality
      through outstanding craftsmanship and precise." /> 
      <section class="py-5 mb-5">
  <div class="container">
    {/* <!-- Centered headings and paragraph --> */}
    <div class="text-center mb-5">
      {/* <h6 class="text-uppercase custom-pink">OUR Projects</h6> */}
      <h1 class="mb-3 text-capitalize fw-bold">Contact Us</h1>
      <p class="lead text-black fw-lighter fw-regular">Our dedicated experts are here to help you with any of your questions, contact us by <br />
      filling out the form below and we will be in touch shortly.</p>
    </div>
    
    {/* <!-- Four cards in a single row --> */}
    <div class="row">
            {/* <!-- Left Column (25%) --> */}
            <div class="col-md-3">
                <div class="contact-info">
                    <h3 class="contact-heading">Call Us</h3>
                    <p class="contact-detail">+1 (123) 456-7890</p>
                    <p class="contact-detail">+1 (234) 567-8901</p>
                    
                    <h3 class="contact-heading mt-4">Write Us</h3>
                    <p class="contact-detail">info@example.com</p>
                    <p class="contact-detail">support@example.com</p>
                    
                    <h3 class="contact-heading mt-4">Address</h3>
                    <p class="contact-detail">123 Business Street<br />Suite 456<br />New York, NY 10001<br />United States</p>
                </div>
            </div>
            
            {/* <!-- Right Column (75%) --> */}
            <div class="col-md-9">
                <div class="contact-form">
                    {/* <h2 class="form-title">Get in Touch</h2> */}
                    <form>
                        <div class="row mb-3">
                            <div class="col-md-6">
                                <label for="name" class="form-label">Name</label>
                                <input type="text" class="form-control" id="name" required />
                            </div>
                            <div class="col-md-6">
                                <label for="email" class="form-label">Email</label>
                                <input type="email" class="form-control" id="email" required />
                            </div>
                        </div>
                        
                        <div class="row mb-3">
                            <div class="col-md-6">
                                <label for="phone" class="form-label">Phone</label>
                                <input type="tel" class="form-control" id="phone" />
                            </div>
                            <div class="col-md-6">
                                <label for="subject" class="form-label">Subject</label>
                                <input type="text" class="form-control" id="subject" required />
                            </div>
                        </div>
                        
                        <div class="mb-3">
                            <label for="message" class="form-label">Message</label>
                            <textarea class="form-control" id="message" rows="5" required></textarea>
                        </div>
                        
                        <div class="text-center">
                            <button type="submit" class="btn btn-primary submit-btn">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
  </div>
</section>
    </>
  )
}

export default Contact
