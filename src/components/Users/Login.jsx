// Login.jsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import "./user.css";
import workspaceImg from "../assets/p4.jpg";
import { useAuth } from "../admin/AuthContent";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return "Email is required";
    if (!emailRegex.test(email)) return "Please enter a valid email address";
    return "";
  };

  const validatePassword = (password) => {
    if (!password) return "Password is required";
    if (password.length < 6)
      return "Password must be at least 6 characters long";
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Validate field on change if it's been touched
    if (touched[name]) {
      validate(name, value);
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
    validate(name, formData[name]);
  };

  const validate = (fieldName, value) => {
    let newErrors = { ...errors };

    switch (fieldName) {
      case "email":
        const emailError = validateEmail(value);
        if (emailError) {
          newErrors.email = emailError;
        } else {
          delete newErrors.email;
        }
        break;
      case "password":
        const passwordError = validatePassword(value);
        if (passwordError) {
          newErrors.password = passwordError;
        } else {
          delete newErrors.password;
        }
        break;
      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // Mark all fields as touched
    setTouched({
      email: true,
      password: true,
    });

    // Validate all fields
    const isEmailValid = validate("email", formData.email);
    const isPasswordValid = validate("password", formData.password);

    if (isEmailValid && isPasswordValid) {
      const isAdmin =
        formData.email === "bibeks337@gmail.com" &&
        formData.password === "Bibek123";

      if (isAdmin) {
        login({ email: formData.email }, true);
        navigate("/admin-dashboard");
      } else {
        // Regular user login logic
        login({ email: formData.email }, false);
        navigate(from);
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-illustration">
          <img src={workspaceImg} alt="Workspace" className="workspace-image" />
        </div>
        <div className="auth-form">
          <h2>Welcome Back Adventurer!</h2>
          <p className="auth-subtitle">Continue to find hidden paradise.</p>
          <form onSubmit={handleLogin}>
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
                />
              </div>
              {touched.email && errors.email && (
                <div className="error-message">{errors.email}</div>
              )}
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
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex="-1"
                >
                  {showPassword ? (
                    <Eye size={18} className="password-toggle-icon" />
                  ) : (
                    <EyeOff size={18} className="password-toggle-icon" />
                  )}
                </button>
              </div>
              {touched.password && errors.password && (
                <div className="error-message">{errors.password}</div>
              )}
            </div>
            <button type="submit" className="auth-button">
              Login
            </button>
          </form>
          <p className="auth-footer">
            Don't have an account? <a href="/signup">Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
