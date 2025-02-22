import { Navigate } from "react-router-dom"
import { isLoggedIn, getUserRole } from "../components/admin/auth"

export const ProtectedUserRoute = ({ children }) => {
  const isAuthenticated = isLoggedIn()
  const userRole = getUserRole()

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />
  }

  if (userRole !== "user") {
    // Redirect to home or another appropriate page if not a user
    return <Navigate to="/" replace />
  }

  return children
}

