import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import LandingPage from './components/LandingPage/LandingPage'
import FeaturedSection from './components/FeatureSection/FeaturedSection'

const App = () => {
  return (
    <div>
        <Navbar/>
        <LandingPage/>
        <FeaturedSection/>

        <Footer/>
    </div>
  )
}

export default App