"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Mail, Lock, Eye, EyeOff } from "lucide-react"
import { toast, Toaster } from "react-hot-toast"
import "./user.css"
import workspaceImg from "../assets/p4.jpg"

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [touched, setTouched] = useState({
    email: false,
    password: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  // Add admin credentials (In a real app, this would be handled securely on the backend)
  const ADMIN_CREDENTIALS = {
    email: "admin@hikejam.com",
    password: "admin123",
  }

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email) return "Email is required"
    if (!emailRegex.test(email)) return "Please enter a valid email address"
    return ""
  }

  const validatePassword = (password) => {
    if (!password) return "Password is required"
    if (password.length < 6) return "Password must be at least 6 characters long"
    return ""
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    if (touched[name]) {
      validate(name, value)
    }
  }

  const handleBlur = (e) => {
    const { name } = e.target
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }))
    validate(name, formData[name])
  }

  const validate = (fieldName, value) => {
    const newErrors = { ...errors }

    switch (fieldName) {
      case "email":
        const emailError = validateEmail(value)
        if (emailError) {
          newErrors.email = emailError
        } else {
          delete newErrors.email
        }
        break
      case "password":
        const passwordError = validatePassword(value)
        if (passwordError) {
          newErrors.password = passwordError
        } else {
          delete newErrors.password
        }
        break
      default:
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const checkIfAdmin = (email, password) => {
    return email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Mark all fields as touched
    setTouched({
      email: true,
      password: true,
    })

    // Validate all fields
    const isEmailValid = validate("email", formData.email)
    const isPasswordValid = validate("password", formData.password)

    if (isEmailValid && isPasswordValid) {
      try {
        // Simulate API call with timeout
        await new Promise((resolve) => setTimeout(resolve, 1000))

        const isAdmin = checkIfAdmin(formData.email, formData.password)

        if (isAdmin) {
          // Store admin status in localStorage or state management system
          localStorage.setItem("userRole", "admin")
          localStorage.setItem("isLoggedIn", "true")
          toast.success("Admin login successful!", {
            duration: 3000,
            position: "top-center",
          })
          setTimeout(() => {
            navigate("/admin/dashboard")
          }, 3000)
        } else {
          // Regular user login
          localStorage.setItem("userRole", "user")
          localStorage.setItem("isLoggedIn", "true")
          toast.success("Login successful!", {
            duration: 3000,
            position: "top-center",
          })
          setTimeout(() => {
            navigate("/dashboard")
          }, 3000)
        }
      } catch (error) {
        toast.error("Login failed. Please try again.", {
          duration: 3000,
          position: "top-center",
        })
        setErrors({
          ...errors,
          general: "Login failed. Please try again.",
        })
      } finally {
        setIsLoading(false)
      }
    } else {
      setIsLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <Toaster />
      <div className="auth-card">
        <div className="auth-illustration">
          <img src={workspaceImg || "/placeholder.svg"} alt="Workspace" className="workspace-image" />
        </div>
        <div className="auth-form">
          <h2>Welcome Back Adventurer!</h2>
          <p className="auth-subtitle">Continue to find hidden paradise.</p>
          <form onSubmit={handleLogin}>
            {errors.general && <div className="error-message general">{errors.general}</div>}
            <div className="form-group">
              <div className="input-icon-wrapper">
                <Mail className="input-icon" size={18} />
                <input
                  type="email"
                  name="email"
                  placeholder="E-mail"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={touched.email && errors.email ? "error" : ""}
                  disabled={isLoading}
                />
              </div>
              {touched.email && errors.email && <div className="error-message">{errors.email}</div>}
            </div>
            <div className="form-group">
              <div className="input-icon-wrapper">
                <Lock className="input-icon" size={18} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={touched.password && errors.password ? "error" : ""}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex="-1"
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <Eye size={18} className="password-toggle-icon" />
                  ) : (
                    <EyeOff size={18} className="password-toggle-icon" />
                  )}
                </button>
              </div>
              {touched.password && errors.password && <div className="error-message">{errors.password}</div>}
            </div>
            <button type="submit" className={`auth-button ${isLoading ? "loading" : ""}`} disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>
          <p className="auth-footer">
            Don't have an account? <a href="/signup">Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login

