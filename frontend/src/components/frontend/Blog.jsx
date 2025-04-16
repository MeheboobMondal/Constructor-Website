import React, { useEffect, useState } from 'react'
import BlogCard from './BlogCard'
import {apiUrl, fileUrl} from '../backend/Http'

const Blog = () => {
  const [articles, setArticles] = useState([])
  const limit = 4
  const loadBlogs = async () => {
    const req = await fetch(`${apiUrl}/blogs/get-limit-article?limit=${limit}`,{
      method : "GET",
      'Accept' : 'application/json'
    })
    const result =await req.json()

    setArticles(result.data)
  }

  useEffect(() => {
    loadBlogs()
  }, [])
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

          {articles && (
            articles.map((itm) => (

              <BlogCard img={`${fileUrl}uploads/blogs/small/${itm.image}`} title={itm.title} link="#" col4="col-lg-4"/>
            ))
          )}
        </div>
    </div>
  </div>
</section>
    </>
  )
}

export default Blog
