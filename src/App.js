import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import LandingPage from './components/LandingPage/LandingPage';
import TopContent from './components/Contents/components/TopContent';
import AboutUs from './components/AboutUs/AboutUs';
import Destination from './components/Destination/Destination';
import Gallery from './components/Gallery/Gallery';
import ContactUs from './components/Navbar/components/ContactPage';

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Navbar/>
        <Routes>
          <Route path="/" element={
            <>
              <LandingPage/>
              <TopContent />
            </>
          } />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/destinations" element={<Destination />} />

          <Route path="/aboutus" element={<AboutUs/>}/>
          <Route path ="/gallery" element={<Gallery/>}/>
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<ContactUs />} />
        </Routes>
        <Footer/>
      </div>
    </BrowserRouter>
  )
}

export default App