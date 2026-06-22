"use client";

import React, { useState, ChangeEvent, FocusEvent, FormEvent } from "react";
import { X, Eye, EyeOff, Check, AlertCircle } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormState {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  isAdmin: boolean;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [formData, setFormData] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    isAdmin: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  if (!isOpen) return null;

  const validateField = (name: string, value: string, currentData = formData): string => {
    let error = "";

    switch (name) {
      case "name":
        if (!value.trim()) error = "Name is required";
        else if (value.trim().length < 2) error = "Name must be at least 2 characters";
        break;
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.trim()) error = "Email address is required";
        else if (!emailRegex.test(value)) error = "Please enter a valid email address";
        break;
      case "phone":
        const phoneRegex = /^[0-9]{10,11}$/;
        if (!value) error = "Phone number is required";
        else if (!phoneRegex.test(value)) error = "Enter a valid 10-11 digit number";
        break;
      case "password":
        if (!value) error = "Password is required";
        else if (value.length < 6) error = "Password must be at least 6 characters";
        break;
      case "confirmPassword":
        if (!value) error = "Please confirm your password";
        else if (value !== currentData.password) error = "Passwords do not match";
        break;
      default:
        break;
    }
    return error;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    let finalValue: string | boolean = type === "checkbox" ? checked : value;

    if (name === "phone") {
      finalValue = value.replace(/\D/g, "").slice(0, 11);
    }

    const updatedData = { ...formData, [name]: finalValue };
    setFormData(updatedData);

    if (touched[name]) {
      const error = validateField(name, type === "checkbox" ? "" : (finalValue as string), updatedData);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const newErrors: FormErrors = {};
    const fieldsToValidate: (keyof FormErrors)[] = ["name", "email", "phone", "password", "confirmPassword"];
    
    let isFormValid = true;
    const newTouched: Record<string, boolean> = {};

    fieldsToValidate.forEach((field) => {
      newTouched[field] = true;
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
        isFormValid = false;
      }
    });

    setTouched(newTouched);
    setErrors(newErrors);

    if (isFormValid) {
      console.log("SUCCESSFULLY SUBMITTED SIGNUP DATA:", formData);
      onClose(); 
    }
  };

  const getInputStyles = (fieldName: keyof FormErrors) => {
    const baseStyle = "w-full pl-3 text-sm font-medium text-slate-800 placeholder-stone-400 focus:outline-none bg-transparent";
    const containerBase = "relative flex items-center border rounded-xl px-4 py-2.5 transition-all bg-white shadow-xs focus-within:ring-2";
    
    if (touched[fieldName] && errors[fieldName]) {
      return {
        container: `${containerBase} border-red-400 focus-within:border-red-500 focus-within:ring-red-100`,
        input: baseStyle
      };
    }
    if (touched[fieldName] && !errors[fieldName] && formData[fieldName]) {
      return {
        container: `${containerBase} border-emerald-300 focus-within:border-emerald-500 focus-within:ring-emerald-50`,
        input: baseStyle
      };
    }
    return {
      container: `${containerBase} border-stone-200 focus-within:border-rose-400 focus-within:ring-rose-100`,
      input: baseStyle
    };
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      
      {/* MAIN MODAL CONTAINER */}
      <div className="relative w-full max-w-4xl max-h-[calc(100vh-2rem)] bg-white rounded-2xl overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-12 animate-in fade-in zoom-in-95 duration-200">
        
        {/* FIXED CLOSE BUTTON - Accessible across breakpoints */}
        <button 
          onClick={onClose}
          type="button"
          className="absolute top-4 right-4 z-50 p-2 rounded-full bg-stone-100/80 hover:bg-stone-200/90 text-stone-600 hover:text-stone-900 transition-colors shadow-xs focus:outline-none focus:ring-2 focus:ring-rose-400"
          aria-label="Close modal"
        >
          <X size={18} className="stroke-[2.5]" />
        </button>

        {/* LEFT COLUMN: BRAND GRAPHIC */}
        <div className="relative md:col-span-5 bg-stone-900 overflow-hidden hidden md:flex flex-col justify-between p-8 text-white select-none">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 z-10" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-stone-700 via-stone-900 to-black opacity-70" />
          
          <div className="relative z-20 space-y-1 pt-8">
            <span className="block font-serif italic text-3xl md:text-4xl font-medium tracking-wide leading-tight">
              Your Fresh Catch
            </span>
            <span className="block font-serif italic text-3xl md:text-4xl font-medium tracking-wide leading-tight text-rose-400">
              Is Waiting...
            </span>
          </div>
          
          <p className="relative z-20 text-xs font-medium text-stone-300/90 leading-relaxed max-w-[220px] pb-4">
            Create an account to explore today&apos;s premium seafood selections immediately.
          </p>
        </div>

        {/* RIGHT COLUMN: INTERACTIVE FORM INTERFACE */}
        <div className="col-span-1 md:col-span-7 p-6 sm:p-10 flex flex-col justify-center bg-stone-50/30 overflow-y-auto max-h-[calc(100vh-2rem)] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          
          {/* HEADER SECTION: Clean layout centering logo and introductory typography together */}
          <div className="flex flex-col items-center text-center mt-2 mb-5">
            <div className="flex items-center gap-1.5 mb-2.5">
              <div className="w-6 h-6 rounded-lg bg-rose-500 flex items-center justify-center text-white font-black text-sm italic tracking-tighter">
                f
              </div>
              <span className="text-xl font-extrabold text-slate-800 tracking-tight">
                fish<span className="text-rose-500">lo.</span>
              </span>
            </div>
            <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
              Create Account
            </h2>
            <p className="text-xs text-slate-400 font-medium mt-0.5">
              Join us to get immediate access to premium features
            </p>
          </div>

          {/* Form Element */}
          <form onSubmit={handleSubmit} noValidate className="space-y-3.5">
            
            {/* NAME FIELD */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 block pl-0.5">Full Name</label>
              <div className={getInputStyles("name").container}>
                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={getInputStyles("name").input}
                />
              </div>
              {touched.name && errors.name && (
                <p className="text-[11px] text-red-500 font-medium flex items-center gap-1 pl-0.5 animate-in fade-in slide-in-from-top-1 duration-150">
                  <AlertCircle size={12} /> {errors.name}
                </p>
              )}
            </div>

            {/* EMAIL FIELD */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 block pl-0.5">Email Address</label>
              <div className={getInputStyles("email").container}>
                <input
                  type="text"
                  name="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={getInputStyles("email").input}
                />
              </div>
              {touched.email && errors.email && (
                <p className="text-[11px] text-red-500 font-medium flex items-center gap-1 pl-0.5 animate-in fade-in slide-in-from-top-1 duration-150">
                  <AlertCircle size={12} /> {errors.email}
                </p>
              )}
            </div>

            {/* PHONE FIELD WITH +880 BADGE */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 block pl-0.5">Phone Number</label>
              <div className={getInputStyles("phone").container}>
                <span className="text-xs font-bold text-slate-500 tracking-wide select-none pr-2.5 border-r border-stone-200">
                  +880
                </span>
                <input
                  type="text"
                  name="phone"
                  placeholder="1XXXXXXXXX"
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={getInputStyles("phone").input}
                />
              </div>
              {touched.phone && errors.phone && (
                <p className="text-[11px] text-red-500 font-medium flex items-center gap-1 pl-0.5 animate-in fade-in slide-in-from-top-1 duration-150">
                  <AlertCircle size={12} /> {errors.phone}
                </p>
              )}
            </div>

            {/* PASSWORD FIELD */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 block pl-0.5">Password</label>
              <div className={getInputStyles("password").container}>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={getInputStyles("password").input}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-stone-400 hover:text-stone-600 focus:outline-none ml-2 mr-0.5"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {touched.password && errors.password && (
                <p className="text-[11px] text-red-500 font-medium flex items-center gap-1 pl-0.5 animate-in fade-in slide-in-from-top-1 duration-150">
                  <AlertCircle size={12} /> {errors.password}
                </p>
              )}
            </div>

            {/* CONFIRM PASSWORD FIELD */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-700 block pl-0.5">Confirm Password</label>
              <div className={getInputStyles("confirmPassword").container}>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={getInputStyles("confirmPassword").input}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="text-stone-400 hover:text-stone-600 focus:outline-none ml-2 mr-0.5"
                >
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {touched.confirmPassword && errors.confirmPassword && (
                <p className="text-[11px] text-red-500 font-medium flex items-center gap-1 pl-0.5 animate-in fade-in slide-in-from-top-1 duration-150">
                  <AlertCircle size={12} /> {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* TICK MARK SIGNUP AS ADMIN SWITCH BUTTON */}
            <div className="pt-1">
              <label className="relative flex items-center gap-3 cursor-pointer select-none group w-fit">
                <input
                  type="checkbox"
                  name="isAdmin"
                  checked={formData.isAdmin}
                  onChange={handleChange}
                  className="sr-only peer"
                />
                <div className="w-5 h-5 border-2 border-stone-300 rounded-md bg-white transition-all duration-200 flex items-center justify-center group-hover:border-rose-400 peer-checked:bg-rose-500 peer-checked:border-rose-500 shadow-xs">
                  <Check size={14} className="text-white scale-0 transition-transform duration-200 font-black peer-checked:scale-100" />
                </div>
                <span className="text-xs font-semibold text-slate-600 group-hover:text-slate-900 transition-colors">
                  Signup as Admin
                </span>
              </label>
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              className="w-full mt-2 bg-rose-500 hover:bg-rose-600 text-white font-bold text-sm py-3.5 rounded-xl transition-colors shadow-md hover:shadow-lg active:scale-[0.99] transform select-none"
            >
              Sign Up
            </button>
          </form>

          {/* Compliance Footer Disclaimer */}
          <div className="mt-5 text-center">
            <p className="text-[10px] text-stone-400 font-medium leading-relaxed max-w-xs mx-auto">
              By continuing, you agree to our{" "}
              <a href="/terms" className="text-emerald-600 hover:underline transition-all font-semibold">
                Terms & Conditions
              </a>{" "}
              and{" "}
              <a href="/privacy" className="text-emerald-600 hover:underline transition-all font-semibold">
                Privacy Policy
              </a>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}