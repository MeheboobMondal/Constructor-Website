import React from 'react'
import BlogCard from './BlogCard'
import image1 from '../../assets/img/construction7.jpg'
import image2 from '../../assets/img/engineer-4925135_1280.jpg'

const Blog = () => {
  return (
    <>
      <section className="py-5 mb-5">
  <div className="container-fluid">
    {/* <!-- Centered headings and paragraph --> */}
    <div className="text-center mb-5">
      <h5 className="text-uppercase custom-pink">Blogs</h5>
      <h1 className="mb-3 text-capitalize fw-bold">Articles & blog posts</h1>
      <p className="lead text-black fw-lighter">We offer a diverse array of construction services, spanning residential, commercial, and industrial projects.</p>
    </div>
    
    {/* <!-- Four cards in a single row --> */}
    <div className="container py-5">
        <div className="row">
            <BlogCard img={image1} title="One of the defining characteristics of civil construction" link="#" col4="col-lg-4"/>
            <BlogCard img={image2} title="Key Elements of Civil Construction within the construction" link="#" col4="col-lg-4"/>
        </div>
    </div>
  </div>
</section>
    </>
  )
}

export default Blog
