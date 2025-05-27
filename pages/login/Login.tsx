"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { toast, Toaster } from "react-hot-toast";
import { signin } from "../../lib/auth";
import Image from "next/image";
import workspaceImg from "../../public/p4.jpg";

interface FormData {
  email: string;
  password: string;
}

interface TouchedFields {
  email: boolean;
  password: boolean;
}

interface Errors {
  email?: string;
  password?: string;
  general?: string;
}

const ADMIN_CREDENTIALS = {
  email: "admin@hikejam.com",
  password: "admin123",
};

const styles = {
  authContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    backgroundColor: "white",
    padding: "20px",
    position: "relative" as const,
    overflow: "hidden",
  },
  authCard: {
    background: "white",
    borderRadius: "20px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.6)",
    width: "100%",
    maxWidth: "1000px",
    display: "flex",
    overflow: "hidden",
    flexDirection: "row" as const,
  },
  authIllustration: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  workspaceImage: {
    width: "100%",
    maxWidth: "400px",
    height: "auto",
  },
  authForm: {
    flex: 1,
    padding: "40px",
    backgroundColor: "#ffffff",
  },
  heading: {
    color: "#4d43dc",
    fontSize: "24px",
    marginBottom: "18px",
    textAlign: "center" as const,
  },
  subtitle: {
    color: "#666",
    fontSize: "16px",
    textAlign: "justify" as const,
    marginBottom: "30px",
  },
  formGroup: {
    marginBottom: "20px",
    position: "relative" as const,
  },
  inputIconWrapper: {
    position: "relative" as const,
    display: "flex",
    alignItems: "center",
  },
  inputIcon: {
    position: "absolute" as const,
    left: "12px",
    color: "#666",
    transition: "color 0.3s ease",
  },
  input: (hasError: boolean, disabled: boolean) => ({
    width: "100%",
    padding: "12px 15px 12px 40px",
    border: hasError ? "1px solid #ff4d4f" : "1px solid #ddd",
    borderRadius: "8px",
    fontSize: "14px",
    transition: "all 0.3s ease",
    outline: "none",
    backgroundColor: disabled ? "#f5f5f5" : "white",
    cursor: disabled ? "not-allowed" : "auto",
    boxShadow: hasError ? "0 0 0 2px rgba(255, 77, 79, 0.2)" : "none",
  }),
  passwordToggle: {
    position: "absolute" as const,
    right: "12px",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#666",
    transition: "color 0.3s ease",
  },
  passwordToggleHover: {
    color: "#3e40c0",
  },
  authButton: (loading: boolean) => ({
    width: "100%",
    padding: "12px",
    backgroundColor: loading ? "#818cf8" : "#3e40c0",
    color: "white",
    border: "none",
    borderRadius: "25px",
    fontSize: "16px",
    cursor: loading ? "not-allowed" : "pointer",
    margin: "20px 0",
    transition: "background-color 0.3s ease",
    opacity: loading ? 0.7 : 1,
  }),
  authFooter: {
    textAlign: "center" as const,
    marginTop: "20px",
    color: "#666",
    fontSize: "14px",
  },
  authFooterLink: {
    color: "#ff4aa2",
    textDecoration: "none",
    fontWeight: 500,
  },
  authFooterLinkHover: {
    textDecoration: "underline",
  },
  errorMessageGeneral: {
    backgroundColor: "#fee2e2",
    border: "1px solid #ef4444",
    color: "#ef4444",
    padding: "0.75rem",
    borderRadius: "0.375rem",
    marginBottom: "1rem",
    textAlign: "center" as const,
  },
  errorMessage: {
    color: "#ff4d4f",
    fontSize: "12px",
    marginTop: "4px",
    marginLeft: "4px",
  },
};

const Login = () => {
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });
  const [touched, setTouched] = useState<TouchedFields>({
    email: false,
    password: false,
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errors, setErrors] = useState<Errors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const validateEmail = (email: string): string => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return "Email is required";
    if (!emailRegex.test(email)) return "Please enter a valid email address";
    return "";
  };

  const validatePassword = (password: string): string => {
    if (!password) return "Password is required";
    if (password.length < 6)
      return "Password must be at least 6 characters long";
    return "";
  };

  const validate = (fieldName: keyof FormData, value: string): boolean => {
    const newErrors: Errors = { ...errors };

    switch (fieldName) {
      case "email":
        const emailError = validateEmail(value);
        if (emailError) newErrors.email = emailError;
        else delete newErrors.email;
        break;
      case "password":
        const passwordError = validatePassword(value);
        if (passwordError) newErrors.password = passwordError;
        else delete newErrors.password;
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const checkIfAdmin = (email: string, password: string): boolean =>
    email === ADMIN_CREDENTIALS.email &&
    password === ADMIN_CREDENTIALS.password;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name as keyof FormData]) {
      validate(name as keyof FormData, value);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    validate(name as keyof FormData, formData[name as keyof FormData]);
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setTouched({ email: true, password: true });

    const isEmailValid = validate("email", formData.email);
    const isPasswordValid = validate("password", formData.password);

    if (isEmailValid && isPasswordValid) {
      try {
        await new Promise((res) => setTimeout(res, 1000));
        const isAdmin = checkIfAdmin(formData.email, formData.password);
        signin(isAdmin ? "admin" : "user");

        toast.success(`${isAdmin ? "Admin" : "User"} login successful!`, {
          duration: 3000,
          position: "top-center",
        });

        setTimeout(() => {
          router.push(isAdmin ? "/admin/dashboard" : "/dashboard");
        }, 3000);
      } catch (error) {
        toast.error("Login failed. Please try again.", {
          duration: 3000,
          position: "top-center",
        });
        setErrors((prev) => ({
          ...prev,
          general: "Login failed. Please try again.",
        }));
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.authContainer}>
      <div style={styles.authCard}>
        {/* Left Illustration Section */}
        <div style={styles.authIllustration}>
          <Image
            src={workspaceImg}
            alt="Workspace"
            style={styles.workspaceImage}
            priority
          />
        </div>

        {/* Login Form Section */}
        <form style={styles.authForm} onSubmit={handleLogin} noValidate>
          <h2 style={styles.heading}>Welcome Back</h2>
          <p style={styles.subtitle}>
            Please enter your email and password to log in to your account.
          </p>

          {errors.general && (
            <div role="alert" style={styles.errorMessageGeneral}>
              {errors.general}
            </div>
          )}

          {/* Email Field */}
          <div style={styles.formGroup}>
            <div style={styles.inputIconWrapper}>
              <Mail
                size={18}
                style={styles.inputIcon}
                aria-hidden="true"
                aria-label="Email icon"
              />
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isLoading}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
                style={styles.input(!!errors.email, isLoading)}
                required
              />
            </div>
            {errors.email && touched.email && (
              <div id="email-error" role="alert" style={styles.errorMessage}>
                {errors.email}
              </div>
            )}
          </div>

          {/* Password Field */}
          <div style={styles.formGroup}>
            <div style={styles.inputIconWrapper}>
              <Lock
                size={18}
                style={styles.inputIcon}
                aria-hidden="true"
                aria-label="Password icon"
              />
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={isLoading}
                aria-invalid={!!errors.password}
                aria-describedby={
                  errors.password ? "password-error" : undefined
                }
                style={styles.input(!!errors.password, isLoading)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                style={styles.passwordToggle}
                tabIndex={0}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && touched.password && (
              <div id="password-error" role="alert" style={styles.errorMessage}>
                {errors.password}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            aria-busy={isLoading}
            style={styles.authButton(isLoading)}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>

          <p style={styles.authFooter}>
            Don't have an account?{" "}
            <a
              href="/signup"
              style={styles.authFooterLink}
              onMouseOver={(e) =>
                (e.currentTarget.style.textDecoration = "underline")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.textDecoration = "none")
              }
            >
              Register
            </a>
          </p>
        </form>
      </div>
      <Toaster />
    </div>
  );
};

export default Login;
