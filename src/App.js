import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import LandingPage from './components/LandingPage/LandingPage';
import FeaturedSection from './components/FeatureSection/FeaturedSection';
import Destination from './components/Destination/Destination';

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
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;