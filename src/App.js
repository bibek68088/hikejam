import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import LandingPage from './components/LandingPage/LandingPage';
import FeaturedSection from './components/FeatureSection/FeaturedSection';
import Destination from './components/Destination/Destination';
import AboutUs from './components/AboutUs/AboutUs';
import Gallery from './components/Gallery/Gallery';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              <LandingPage />
              <FeaturedSection />
            </>
          } />
          <Route path="/destinations" element={<Destination />} />
          <Route path="/aboutus" element={<AboutUs/>}/>
          <Route path ="/gallery" element={<Gallery/>}/>
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;