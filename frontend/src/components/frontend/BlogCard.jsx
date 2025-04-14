import React from 'react'

const BlogCard = ({img, title, link, col4}) => {
  return (
    <>
      <div className="col-md-4">
                <div className="custom-card card rounded-5">
                    <img src={img} className="card-img-top" alt="Card Image" />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <a href={link} className="btn btn-custom read-more-btn">Read More</a>
                    </div>
                </div>
        </div>
    </>
  )
}

export default BlogCard
