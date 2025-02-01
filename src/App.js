import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import LandingPage from './components/LandingPage/LandingPage'
import TopContent from './components/Contents/components/TopContent'

const App = () => {
  return (
    <div>
        <Navbar/>
        <LandingPage/>
        <TopContent />
        <Footer/>
    </div>
  )
}

export default App
