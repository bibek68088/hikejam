"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User, Mail, Phone, MapPin, Lock, Eye, EyeOff } from "lucide-react";
import { toast, Toaster } from "react-hot-toast";
import Image from "next/image";
import workspaceImg from "../../public/p2.jpg";

type FormData = {
  fullName: string;
  email: string;
  mobile: string;
  address: string;
  password: string;
};

type TouchedFields = {
  [K in keyof FormData]: boolean;
};

type Errors = {
  [K in keyof FormData]?: string;
};

const Signup = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    mobile: "",
    address: "",
    password: "",
  });

  const [touched, setTouched] = useState<TouchedFields>({
    fullName: false,
    email: false,
    mobile: false,
    address: false,
    password: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const validations: { [K in keyof FormData]: (value: string) => string } = {
    fullName: (value) => {
      if (!value.trim()) return "Full name is required";
      if (value.trim().length < 2)
        return "Full name must be at least 2 characters";
      return "";
    },
    email: (value) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value) return "Email is required";
      if (!emailRegex.test(value)) return "Please enter a valid email address";
      return "";
    },
    mobile: (value) => {
      const mobileRegex = /^\d{10}$/;
      if (!value) return "Mobile number is required";
      if (!mobileRegex.test(value))
        return "Please enter a valid 10-digit mobile number";
      return "";
    },
    address: (value) => {
      if (!value.trim()) return "Address is required";
      if (value.trim().length < 5) return "Please enter a complete address";
      return "";
    },
    password: (value) => {
      if (!value) return "Password is required";
      if (value.length < 8) return "Password must be at least 8 characters";
      if (!/(?=.*[a-z])/.test(value))
        return "Password must include a lowercase letter";
      if (!/(?=.*[A-Z])/.test(value))
        return "Password must include an uppercase letter";
      if (!/(?=.*\d)/.test(value)) return "Password must include a number";
      return "";
    },
  };

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

  const validate = (fieldName: keyof FormData, value: string) => {
    const error = validations[fieldName](value);
    setErrors((prev) => ({ ...prev, [fieldName]: error }));
    return !error;
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();

    const allTouched: TouchedFields = {
      fullName: true,
      email: true,
      mobile: true,
      address: true,
      password: true,
    };
    setTouched(allTouched);

    const isValid = Object.keys(formData).every((key) =>
      validate(key as keyof FormData, formData[key as keyof FormData])
    );

    if (isValid) {
      toast.success("Account created successfully!", {
        duration: 3000,
        position: "top-center",
      });

      setTimeout(() => {
        router.push("/login");
      }, 3000);
    }
  };

  // Inline styles
  const authContainerStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    backgroundColor: "white",
    padding: "20px",
    position: "relative" as const,
    overflow: "hidden",
  };

  const authCardStyle = {
    background: "white",
    borderRadius: "20px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.6)",
    width: "100%",
    maxWidth: "1000px",
    display: "flex",
    overflow: "hidden",
    flexDirection: isMobile ? ("column" as const) : ("row" as const),
  };

  const authIllustrationStyle = {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: isMobile ? "20px" : "40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const workspaceImageStyle = {
    width: "100%",
    maxWidth: isMobile ? "300px" : "400px",
    height: "auto",
  };

  const authFormStyle = {
    flex: 1,
    padding: isMobile ? "20px" : "40px",
    backgroundColor: "#ffffff",
  };

  const authFormH2Style = {
    color: "#4d43dc",
    fontSize: "24px",
    marginBottom: "18px",
    textAlign: "center" as const,
  };

  const authSubtitleStyle = {
    color: "#666",
    fontSize: "16px",
    textAlign: "justify" as const,
    marginBottom: "30px",
  };

  const formGroupStyle = {
    marginBottom: "20px",
  };

  const inputIconWrapperStyle = {
    position: "relative" as const,
    display: "flex",
    alignItems: "center",
  };

  const inputIconStyle = {
    position: "absolute" as const,
    left: "12px",
    color: "#666",
    transition: "color 0.3s ease",
  };

  const inputStyle = (hasError: boolean) => ({
    width: "100%",
    padding: "12px 15px 12px 40px",
    border: hasError ? "1px solid #ff4d4f" : "1px solid #ddd",
    borderRadius: "8px",
    fontSize: "14px",
    transition: "all 0.3s ease",
    backgroundColor: hasError ? "#fff1f0" : "white",
    outline: "none",
  });

  const passwordToggleStyle = {
    position: "absolute" as const,
    right: "12px",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#666",
    transition: "color 0.3s ease",
  };

  const errorMessageStyle = {
    color: "#ff4d4f",
    fontSize: "12px",
    marginTop: "4px",
    marginLeft: "4px",
    animation: "fadeIn 0.3s ease",
  };

  const authButtonStyle = {
    width: "100%",
    padding: "12px",
    backgroundColor: "#3e40c0",
    color: "white",
    border: "none",
    borderRadius: "25px",
    fontSize: "16px",
    cursor: "pointer",
    margin: "20px 0",
    transition: "background-color 0.3s ease",
  };

  const authFooterStyle = {
    textAlign: "center" as const,
    marginTop: "20px",
    color: "#666",
    fontSize: "14px",
  };

  const authFooterLinkStyle = {
    color: "#ff4aa2",
    textDecoration: "none",
    fontWeight: 500,
  };

  const renderInput = (
    name: keyof FormData,
    IconComponent: React.ElementType,
    type: string = "text",
    placeholder: string
  ) => {
    const isPassword = type === "password";
    const inputType = isPassword ? (showPassword ? "text" : "password") : type;
    const hasError = touched[name] && errors[name];

    return (
      <div style={formGroupStyle}>
        <div style={inputIconWrapperStyle}>
          <IconComponent style={inputIconStyle} size={18} />
          <input
            type={inputType}
            name={name}
            placeholder={placeholder}
            value={formData[name]}
            onChange={handleChange}
            style={{
              ...inputStyle(!!hasError),
              paddingRight: isPassword ? "40px" : "15px",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "#3e40c0";
              e.target.style.boxShadow = "0 0 0 2px rgba(62, 64, 192, 0.1)";
            }}
            onBlur={(e) => {
              handleBlur(e);
              if (!hasError) {
                e.target.style.borderColor = "#ddd";
                e.target.style.boxShadow = "none";
              }
            }}
          />
          {isPassword && (
            <button
              type="button"
              style={passwordToggleStyle}
              onClick={() => setShowPassword((prev) => !prev)}
              tabIndex={-1}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#3e40c0";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#666";
              }}
            >
              {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          )}
        </div>
        {hasError && <div style={errorMessageStyle}>{errors[name]}</div>}
      </div>
    );
  };

  return (
    <div style={authContainerStyle}>
      <Toaster />
      <div style={authCardStyle}>
        <div style={authIllustrationStyle}>
          <Image
            src={workspaceImg}
            alt="Workspace"
            style={workspaceImageStyle}
          />
        </div>
        <div style={authFormStyle}>
          <h2 style={authFormH2Style}>Welcome to HikeJam!</h2>
          <p style={authSubtitleStyle}>
            Our platform is designed for hiking enthusiasts to explore
            breathtaking trails, share experiences, and connect with fellow
            adventurers.
          </p>
          <form onSubmit={handleSignup}>
            {renderInput("fullName", User, "text", "Full Name")}
            {renderInput("email", Mail, "email", "E-mail")}
            {renderInput("mobile", Phone, "tel", "Mobile Number")}
            {renderInput("address", MapPin, "text", "Address")}
            {renderInput("password", Lock, "password", "Password")}
            <button
              type="submit"
              style={authButtonStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#4161d4";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#3e40c0";
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.transform = "scale(0.98)";
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              Sign Up
            </button>
          </form>
          <p style={authFooterStyle}>
            Already have an account?{" "}
            <a
              href="/login"
              style={authFooterLinkStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.textDecoration = "underline";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.textDecoration = "none";
              }}
            >
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
