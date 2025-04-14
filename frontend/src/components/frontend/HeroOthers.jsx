import React from 'react'
import {Link} from 'react-router-dom'

const Hero = ({subtitle, title, text, pmbtn, secbtn}) => {
  return (
    <>
    {/* <!-- Hero Section --> */}
    <section className="hero-section heroOthers mb-5 h-25">
        <div className="hero-overlay"></div>
        <div className="hero-content container ">
            <h3 className="hero-subtitle text-start">{subtitle}</h3>
            <h1 className="hero-title text-start">{title}</h1>
            <p className="hero-text text-start">
                {text}
            </p>
            {pmbtn && ( <Link to="#" className="btn btn-primary">
              {pmbtn}
            </Link>)}
            {secbtn && ( <Link to="#" className="btn btn-secondry"> {secbtn}</Link>)}
        </div>
    </section>
    
    </>
  )
}

export default Hero
