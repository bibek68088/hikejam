import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Navbar from "./components/Navbar/Navbar"
import Footer from "./components/Footer/Footer"
import LandingPage from "./components/LandingPage/LandingPage"
import TopContent from "./components/Contents/components/TopContent"
import AboutUs from "./components/AboutUs/AboutUs"
import Destination from "./components/Destination/Destination"
import Gallery from "./components/Gallery/Gallery"
import ContactUs from "./components/Navbar/components/ContactPage"
import Signup from "./components/Users/SignUp"
import Login from "./components/Users/Login"
import Blog from "./components/Blog/Blog"
import AdminDashboard from "./components/admin/AdminDashboard"
import UserDashboard from "./components/Users/UserDashboard"
import { ProtectedAdminRoute } from "./routes/ProtectedAdminRoute"
import { ProtectedUserRoute } from "./routes/ProtectedUserRoute"

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
              <TopContent />
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

