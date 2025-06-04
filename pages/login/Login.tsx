"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { toast, Toaster } from "react-hot-toast";
import { useAuth } from "../../components/auth-provider";
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

export default function Login() {
  const router = useRouter();
  const { login } = useAuth();

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

        const userData = {
          email: formData.email,
          name: isAdmin ? "Admin User" : "Regular User",
        };

        login(isAdmin ? "admin" : "user", userData);

        toast.success(`${isAdmin ? "Admin" : "User"} login successful!`, {
          duration: 2000,
          position: "top-center",
        });

        setTimeout(() => {
          router.push(isAdmin ? "/admin/dashboard" : "/user/dashboard");
        }, 1000);
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
    <div className="flex items-center justify-center min-h-screen bg-white p-5 relative overflow-hidden">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl flex overflow-hidden">
        {/* Image Section */}
        <div className="flex-1 bg-white p-10 flex items-center justify-center">
          <Image
            src={workspaceImg}
            alt="Workspace"
            width={400}
            height={400}
            className="w-full max-w-md h-auto"
            priority
          />
        </div>

        {/* Form Section */}
        <form
          className="flex-1 p-10 bg-white"
          onSubmit={handleLogin}
          noValidate
        >
          <h2 className="text-indigo-600 text-2xl mb-5 text-center font-semibold">
            Welcome Back
          </h2>
          <p className="text-gray-600 text-base text-justify mb-8">
            Please enter your email and password to log in to your account.
          </p>

          {/* General Error */}
          {errors.general && (
            <div
              role="alert"
              className="bg-red-50 border border-red-400 text-red-600 p-3 rounded-md mb-4 text-center"
            >
              {errors.general}
            </div>
          )}

          {/* Email Field */}
          <div className="mb-5 relative">
            <div className="relative flex items-center">
              <Mail
                size={18}
                className="absolute left-3 text-gray-600 transition-colors duration-300"
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
                className={`w-full py-3 px-4 pl-10 border rounded-lg text-sm transition-all duration-300 outline-none ${
                  errors.email
                    ? "border-red-500 shadow-red-200 shadow-sm"
                    : "border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                } ${isLoading ? "bg-gray-100 cursor-not-allowed" : "bg-white"}`}
                required
              />
            </div>
            {errors.email && touched.email && (
              <div
                id="email-error"
                role="alert"
                className="text-red-500 text-xs mt-1 ml-1"
              >
                {errors.email}
              </div>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-5 relative">
            <div className="relative flex items-center">
              <Lock
                size={18}
                className="absolute left-3 text-gray-600 transition-colors duration-300"
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
                className={`w-full py-3 px-4 pl-10 pr-10 border rounded-lg text-sm transition-all duration-300 outline-none ${
                  errors.password
                    ? "border-red-500 shadow-red-200 shadow-sm"
                    : "border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                } ${isLoading ? "bg-gray-100 cursor-not-allowed" : "bg-white"}`}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3 bg-transparent border-none cursor-pointer p-0 flex items-center justify-center text-gray-600 transition-colors duration-300 hover:text-gray-800"
                tabIndex={0}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && touched.password && (
              <div
                id="password-error"
                role="alert"
                className="text-red-500 text-xs mt-1 ml-1"
              >
                {errors.password}
              </div>
            )}
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={isLoading}
            aria-busy={isLoading}
            className={`w-full py-3 px-4 text-white border-none rounded-full text-base my-5 transition-all duration-300 ${
              isLoading
                ? "bg-indigo-300 cursor-not-allowed opacity-70"
                : "bg-indigo-700 hover:bg-indigo-800 cursor-pointer"
            }`}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>

          {/* Footer */}
          <p className="text-center mt-5 text-gray-600 text-sm">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="text-pink-500 no-underline font-medium hover:underline transition-all duration-200"
            >
              Register
            </a>
          </p>

          {/* Demo Credentials */}
          <div className="mt-5 p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-600 m-0 mb-2 font-bold">
              Demo Credentials:
            </p>
            <p className="text-xs text-gray-600 my-1">
              <strong>Admin:</strong> admin@hikejam.com / admin123
            </p>
            <p className="text-xs text-gray-600 my-1">
              <strong>User:</strong> user@example.com / password
            </p>
          </div>
        </form>
      </div>
      <Toaster />
    </div>
  );
}
