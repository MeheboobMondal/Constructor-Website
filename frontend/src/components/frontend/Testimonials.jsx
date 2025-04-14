import React from 'react';
import image1 from '../../assets/img/pexels-sindre-fs-1040880.jpg';
import image2 from '../../assets/img/pexels-pixabay-220453.jpg';
import image3 from '../../assets/img/author-2.jpg';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import {  Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const Testimonials = () => {
  return (
    <>
<section className="py-5 mb-5">
  <div className="container">
    {/* <!-- Centered headings and paragraph --> */}
    <div className="text-center mb-5">
      <h5 className="text-uppercase custom-pink">Testimonials</h5>
      <h1 className="mb-3 text-capitalize fw-bold">What people are saying about us</h1>
      <p className="lead text-black fw-lighter">We offer a diverse array of construction services, spanning residential, commercial, and industrial projects.</p>
    </div>
    <Swiper
     modules={[Navigation, Pagination, Scrollbar]}
     spaceBetween={30}
     slidesPerView={3}
     navigation
     pagination={{ clickable: true }}
     scrollbar={{ draggable: true }}
     onSwiper={(swiper) => console.log(swiper)}
     onSlideChange={() => console.log('slide change')}
    >
      <SwiperSlide>
      <div className="">
        <div className="review-card h-100">
          <div className="stars">
            <span className="star">★</span>
            <span className="star">★</span>
            <span className="star">★</span>
            <span className="star">★</span>
            <span className="star">★</span>
          </div>
          <p className="review-text">This product exceeded all my expectations. The quality is outstanding and the customer service was exceptional. I would definitely recommend this to anyone looking for premium quality.</p>
          <hr className="divider" />
          <div className="reviewer-info">
            <img src={image1} alt="Reviewer" className="reviewer-img" />
            <div className="reviewer-details">
              <h5 className="reviewer-name">John Doe</h5>
              <p className="reviewer-title">CEO</p>
            </div>
          </div>
        </div>
      </div>
      </SwiperSlide>
      <SwiperSlide>
      <div className="">
        <div className="review-card h-100">
          <div className="stars">
            <span className="star">★</span>
            <span className="star">★</span>
            <span className="star">★</span>
            <span className="star">★</span>
            <span className="star">★</span>
          </div>
          <p className="review-text">The team delivered our project ahead of schedule while maintaining excellent quality standards. Their attention to detail was impressive throughout the entire process.</p>
          <hr className="divider" />
          <div className="reviewer-info">
            <img src={image2} alt="Reviewer" className="reviewer-img" />
            <div className="reviewer-details">
              <h5 className="reviewer-name">Jane Smith</h5>
              <p className="reviewer-title">Project Manager</p>
            </div>
          </div>
        </div>
      </div>
      </SwiperSlide>
      <SwiperSlide>
      <div className="">
        <div className="review-card h-100">
          <div className="stars">
            <span className="star">★</span>
            <span className="star">★</span>
            <span className="star">★</span>
            <span className="star">★</span>
            <span className="star">★</span>
          </div>
          <p className="review-text">Working with this company was a pleasure. They understood our vision and executed it perfectly. The communication was excellent at every stage of the project.</p>
          <hr className="divider" />
          <div className="reviewer-info">
            <img src={image3} alt="Reviewer" className="reviewer-img" />
            <div className="reviewer-details">
              <h5 className="reviewer-name">Michael Johnson</h5>
              <p className="reviewer-title">Director</p>
            </div>
          </div>
        </div>
      </div>
      </SwiperSlide>
      <SwiperSlide>
      <div className="">
        <div className="review-card h-100">
          <div className="stars">
            <span className="star">★</span>
            <span className="star">★</span>
            <span className="star">★</span>
            <span className="star">★</span>
            <span className="star">★</span>
          </div>
          <p className="review-text">This product exceeded all my expectations. The quality is outstanding and the customer service was exceptional. I would definitely recommend this to anyone looking for premium quality.</p>
          <hr className="divider" />
          <div className="reviewer-info">
            <img src={image1} alt="Reviewer" className="reviewer-img" />
            <div className="reviewer-details">
              <h5 className="reviewer-name">John Doe</h5>
              <p className="reviewer-title">CEO</p>
            </div>
          </div>
        </div>
      </div>
      </SwiperSlide>
      
    </Swiper>
    
    
  </div>
</section>
    </>
  )
}

export default Testimonials
