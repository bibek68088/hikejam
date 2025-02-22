export const login = (role) => {
  localStorage.setItem("userRole", role)
  localStorage.setItem("isLoggedIn", "true")
}

export const logout = () => {
  localStorage.removeItem("userRole")
  localStorage.setItem("isLoggedIn", "false")
  window.location.href = "/"
}

export const isLoggedIn = () => {
  return localStorage.getItem("isLoggedIn") === "true"
}

export const getUserRole = () => {
  return localStorage.getItem("userRole")
}

