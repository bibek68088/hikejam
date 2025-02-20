import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, MapPin, Lock, Eye, EyeOff } from 'lucide-react';
import './user.css';
import workspaceImg from '../assets/p2.jpg';

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    address: '',
    password: ''
  });
  const [touched, setTouched] = useState({
    fullName: false,
    email: false,
    mobile: false,
    address: false,
    password: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validations = {
    fullName: (value) => {
      if (!value.trim()) return 'Full name is required';
      if (value.trim().length < 2) return 'Full name must be at least 2 characters';
      return '';
    },
    email: (value) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value) return 'Email is required';
      if (!emailRegex.test(value)) return 'Please enter a valid email address';
      return '';
    },
    mobile: (value) => {
      const mobileRegex = /^\d{10}$/;
      if (!value) return 'Mobile number is required';
      if (!mobileRegex.test(value)) return 'Please enter a valid 10-digit mobile number';
      return '';
    },
    address: (value) => {
      if (!value.trim()) return 'Address is required';
      if (value.trim().length < 5) return 'Please enter a complete address';
      return '';
    },
    password: (value) => {
      if (!value) return 'Password is required';
      if (value.length < 8) return 'Password must be at least 8 characters';
      if (!/(?=.*[a-z])/.test(value)) return 'Password must include a lowercase letter';
      if (!/(?=.*[A-Z])/.test(value)) return 'Password must include an uppercase letter';
      if (!/(?=.*\d)/.test(value)) return 'Password must include a number';
      return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Validate field on change if it's been touched
    if (touched[name]) {
      validate(name, value);
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
    validate(name, formData[name]);
  };

  const validate = (fieldName, value) => {
    const validationError = validations[fieldName](value);
    setErrors(prev => ({
      ...prev,
      [fieldName]: validationError
    }));
    return !validationError;
  };

  const handleSignup = (e) => {
    e.preventDefault();

    // Mark all fields as touched
    const allTouched = Object.keys(formData).reduce((acc, key) => ({
      ...acc,
      [key]: true
    }), {});
    setTouched(allTouched);

    // Validate all fields
    const validationResults = Object.keys(formData).map(key => 
      validate(key, formData[key])
    );

    if (validationResults.every(Boolean)) {
      alert('Account created successfully!');
      navigate('/login');
    }
  };

  const renderInput = (name, icon, type = 'text', placeholder) => {
    const Icon = icon;
    const isPassword = type === 'password';
    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

    return (
      <div className="form-group">
        <div className="input-icon-wrapper">
          <Icon className="input-icon" size={18} />
          <input
            type={inputType}
            name={name}
            placeholder={placeholder}
            value={formData[name]}
            onChange={handleChange}
            onBlur={handleBlur}
            className={touched[name] && errors[name] ? 'error' : ''}
          />
          {isPassword && (
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex="-1"
            >
              {showPassword ? 
                <Eye size={18} className="password-toggle-icon" /> : 
                <EyeOff size={18} className="password-toggle-icon" />
              }
            </button>
          )}
        </div>
        {touched[name] && errors[name] && (
          <div className="error-message">{errors[name]}</div>
        )}
      </div>
    );
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-illustration">
          <img src={workspaceImg} alt="Workspace" className="workspace-image" />
        </div>
        <div className="auth-form">
          <h2>Welcome to HikeJam!</h2>
          <p className="auth-subtitle">
            Our platform is designed for hiking enthusiasts to explore
            breathtaking trials, share experiences, and connect with fellow
            adventures.
          </p>
          <form onSubmit={handleSignup}>
            {renderInput('fullName', User, 'text', 'Full Name')}
            {renderInput('email', Mail, 'email', 'E-mail')}
            {renderInput('mobile', Phone, 'tel', 'Mobile Number')}
            {renderInput('address', MapPin, 'text', 'Address')}
            {renderInput('password', Lock, 'password', 'Password')}
            <button type="submit" className="auth-button">Sign Up</button>
          </form>
          <p className="auth-footer">
            Already have an account? <a href="/login">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;