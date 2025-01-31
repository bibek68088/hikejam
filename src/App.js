import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import LandingPage from './components/LandingPage/LandingPage'

const App = () => {
  return (
    <div>
        <Navbar/>
        <LandingPage/>

        <Footer/>
    </div>
  )
}

export default App