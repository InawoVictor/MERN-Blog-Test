import React from 'react'
import Header from './Header'
import Navbar from './Navbar'

const Layout = ({children}) => {
  return (
    <div>
      <Navbar />
      <Header />
      {children}
    </div>
  )
}

export default Layout