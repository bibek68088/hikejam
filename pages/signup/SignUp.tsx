"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User, Mail, Phone, MapPin, Lock, Eye, EyeOff } from "lucide-react";
import { toast, Toaster } from "react-hot-toast";
import Image from "next/image";
import { useAuth } from "../../components/auth-provider";
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

export default function Signup() {
  const { login } = useAuth();
  const router = useRouter();

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
  const [isLoading, setIsLoading] = useState(false);

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

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

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
      try {
        await new Promise((res) => setTimeout(res, 1000));

        const userData = {
          email: formData.email,
          name: formData.fullName,
        };

        login("user", userData);

        toast.success(
          "Account created successfully! Redirecting to dashboard...",
          {
            duration: 2000,
            position: "top-center",
          }
        );

        setTimeout(() => {
          router.push("/user/dashboard");
        }, 1000);
      } catch (error) {
        toast.error("Signup failed. Please try again.", {
          duration: 3000,
          position: "top-center",
        });
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  };

  const renderInput = (
    name: keyof FormData,
    IconComponent: React.ElementType,
    type = "text",
    placeholder: string
  ) => {
    const isPassword = type === "password";
    const inputType = isPassword ? (showPassword ? "text" : "password") : type;
    const hasError = touched[name] && errors[name];

    return (
      <div className="mb-5">
        <div className="relative flex items-center">
          <IconComponent
            className="absolute left-3 text-gray-600 transition-colors duration-300"
            size={18}
          />
          <input
            type={inputType}
            name={name}
            placeholder={placeholder}
            value={formData[name]}
            onChange={handleChange}
            disabled={isLoading}
            onBlur={handleBlur}
            className={`w-full py-3 px-4 pl-10 border rounded-lg text-sm transition-all duration-300 outline-none ${
              isPassword ? "pr-10" : "pr-4"
            } ${
              hasError
                ? "border-red-500 bg-red-50 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                : "border-gray-300 bg-white focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100"
            } ${isLoading ? "opacity-70 cursor-not-allowed" : "cursor-auto"}`}
          />
          {isPassword && (
            <button
              type="button"
              className="absolute right-3 bg-transparent border-none cursor-pointer p-0 flex items-center justify-center text-gray-600 transition-colors duration-300 hover:text-indigo-600 disabled:cursor-not-allowed"
              onClick={() => setShowPassword((prev) => !prev)}
              disabled={isLoading}
              tabIndex={-1}
            >
              {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
            </button>
          )}
        </div>
        {hasError && (
          <div className="text-red-500 text-xs mt-1 ml-1 animate-fade-in">
            {errors[name]}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white p-5 relative overflow-hidden">
      <Toaster />
      <div
        className={`bg-white rounded-3xl shadow-2xl w-full max-w-4xl flex overflow-hidden ${
          isMobile ? "flex-col" : "flex-row"
        }`}
      >
        {/* Image Section */}
        <div
          className={`flex-1 bg-white flex items-center justify-center ${
            isMobile ? "p-5" : "p-10"
          }`}
        >
          <Image
            src={workspaceImg}
            alt="Workspace"
            width={400}
            height={400}
            className={`w-full h-auto ${isMobile ? "max-w-xs" : "max-w-md"}`}
            priority
          />
        </div>

        {/* Form Section */}
        <div className={`flex-1 bg-white ${isMobile ? "p-5" : "p-10"}`}>
          <h2 className="text-indigo-600 text-2xl mb-5 text-center font-semibold">
            Welcome to HikeJam!
          </h2>
          <p className="text-gray-600 text-base text-justify mb-8">
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
              disabled={isLoading}
              className={`w-full py-3 px-4 text-white border-none rounded-full text-base my-5 transition-all duration-300 transform ${
                isLoading
                  ? "bg-indigo-300 cursor-not-allowed opacity-70"
                  : "bg-indigo-700 hover:bg-indigo-800 hover:scale-[0.98] active:scale-95 cursor-pointer"
              }`}
            >
              {isLoading ? "Creating Account..." : "Sign Up"}
            </button>
          </form>

          <p className="text-center mt-5 text-gray-600 text-sm">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-pink-500 no-underline font-medium hover:underline transition-all duration-200"
            >
              Login
            </a>
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease;
        }
      `}</style>
    </div>
  );
}
