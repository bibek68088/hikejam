import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Navbar from "../pages/Navbar/Navbar"
import Footer from "../components/Footer/Footer"
import LandingPage from "../pages/LandingPage/LandingPage"
import TopContent from "../pages/Contents/components/TopContent"
import AboutUs from "../pages/AboutUs/AboutUs"
import Destination from "../pages/Destination/Destination"
import Gallery from "../pages/Gallery/Gallery"
import ContactUs from "../pages/Navbar/components/ContactPage"
import Signup from "../pages/Users/SignUp"
import Login from "../pages/Users/Login"
import Blog from "../pages/Blog/Blog"
import AdminDashboard from "../pages/admin/AdminDashboard"
import UserDashboard from "../pages/Users/UserDashboard"
import { ProtectedAdminRoute } from "./routes/ProtectedAdminRoute"
import { ProtectedUserRoute } from "./routes/ProtectedUserRoute"
import FeaturedSection from "../pages/FeatureSection/FeaturedSection"
const App = () => {
  // Helper function to wrap elements with Navbar and Footer
  const withLayout = (element) => (
    <>
      <Navbar />
      {element}
      <Footer />
    </>
  )

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={withLayout(
            <>
              <LandingPage />
              <FeaturedSection/>
              
            </>,
          )}
        />
        <Route path="/aboutus" element={withLayout(<AboutUs />)} />
        <Route path="/blog" element={withLayout(<Blog />)} />
        <Route path="/destinations" element={withLayout(<Destination />)} />
        <Route path="/gallery" element={withLayout(<Gallery />)} />
        <Route path="/contact" element={withLayout(<ContactUs />)} />

        {/* Auth Routes */}
        <Route path="/login" element={withLayout(<Login />)} />
        <Route path="/signup" element={withLayout(<Signup />)} />

        {/* Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={<ProtectedAdminRoute>{withLayout(<AdminDashboard />)}</ProtectedAdminRoute>}
        />

        {/* User Routes */}
        <Route
          path="/user/dashboard"
          element={<ProtectedUserRoute>{withLayout(<UserDashboard />)}</ProtectedUserRoute>}
        />

        {/* Catch all route for 404 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

