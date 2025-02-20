import { ProtectedUserRoute } from "./ProtectedUserRoute"
import UserDashboard from "../components/user/UserDashboard"

export const userRoutes = [
  {
    path: "/user/dashboard",
    element: (
      <ProtectedUserRoute>
        <UserDashboard />
      </ProtectedUserRoute>
    ),
  },
]

