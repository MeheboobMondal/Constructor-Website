import React, { useEffect, useState } from 'react';
import image1 from '../../assets/img/pexels-sindre-fs-1040880.jpg';
import {apiUrl, fileUrl} from '../backend/Http'


// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import {  Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const Testimonials = () => {
  const [data, setData] = useState([])
  const getData = async () => {
    const req = await fetch(`${apiUrl}/get-all-testimonials`,{
      method : "GET",
      headers : {
        'Accept' : 'applcation/json',
      }
    })
    const result = await req.json()

    if(result.status == true){
      setData(result.data)
      setMessage(result.message)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  
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
     onSwiper={(swiper) => console.log(swiper)}
     onSlideChange={() => console.log('slide change')}
     breakpoints={{
      200: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 40,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 50,
      },
    }}
    >
      {data && (
            data.map((itm) => (
      <SwiperSlide>
      <div className="">
        <div className="review-card h-100">
          
          
              <div key={itm.id}>
                {/* <p className="review-text">{itm.message}</p> */}
                <p className="review-text" dangerouslySetInnerHTML={{ __html: itm.message }} ></p>
              <hr className="divider" />
            <div className="reviewer-info">
            <img src={`${fileUrl}uploads/testimonial/${itm.image}`} alt="Reviewer" className="reviewer-img" />
            <div className="reviewer-details">
              <h5 className="reviewer-name">{itm.citation}</h5>
            </div>
          </div>
              </div>
            
        </div>
      </div>
      </SwiperSlide>
      ))
    )}
     
      
    </Swiper>
    
    
  </div>
</section>
    </>
  )
}

export default Testimonials
