import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import LandingPage from "./components/LandingPage/LandingPage";
import TopContent from "./components/Contents/components/TopContent";
import AboutUs from "./components/AboutUs/AboutUs";
import Destination from "./components/Destination/Destination";
import Gallery from "./components/Gallery/Gallery";
import ContactUs from "./components/Navbar/components/ContactPage";
import Signup from "./components/Users/SignUp";
import Login from "./components/Users/Login";
import Blog from "./components/Blog/Blog";
import AdminDashboard from "./components/admin/AdminDashboard";
import { ProtectedAdminRoute } from "./components/admin/ProtectedRoute";
import { AuthProvider } from "./components/admin/AuthContent";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div>
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <LandingPage />
                  <TopContent />
                </>
              }
            />
            <Route
              path="/admin-dashboard"
              element={
                <ProtectedAdminRoute>
                  <AdminDashboard />
                </ProtectedAdminRoute>
              }
            />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/destinations" element={<Destination />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
