import React from 'react'
import Header from './components/frontend/Header'
import Footer from './components/frontend/Footer'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <>
        <Header />
        <Outlet /> 
        <Footer />
    </>
  )
}

export default Layout
