import { ProtectedUserRoute } from "./ProtectedUserRoute"
import UserDashboard from "../../pages/user/UserDashboard"

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

