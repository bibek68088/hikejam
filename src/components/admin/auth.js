export const logout = () => {
    localStorage.removeItem("userRole")
    localStorage.setItem("isLoggedIn", "false")
    // You might want to add additional cleanup here
    window.location.href = "/"
  }
  
  export const isLoggedIn = () => {
    return localStorage.getItem("isLoggedIn") === "true"
  }
  
  export const getUserRole = () => {
    return localStorage.getItem("userRole")
  }
  
  