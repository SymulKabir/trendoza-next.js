"use client";

import React, { useState, ChangeEvent, FocusEvent, FormEvent } from "react";
import { X, Eye, EyeOff, Check, AlertCircle } from "lucide-react";
import { successToast } from "@/src/utils/toast";

interface AuthModalProps {
  setPageView: () => void;
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

export default function Index({ onClose, setPageView }: AuthModalProps) {
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

  const validateField = (
    name: string,
    value: string,
    currentData = formData,
  ): string => {
    let error = "";

    switch (name) {
      case "name":
        if (!value.trim()) error = "Name is required";
        else if (value.trim().length < 2)
          error = "Name must be at least 2 characters";
        break;
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.trim()) error = "Email address is required";
        else if (!emailRegex.test(value))
          error = "Please enter a valid email address";
        break;
      case "phone":
        const phoneRegex = /^[0-9]{10,11}$/;
        if (!value) error = "Phone number is required";
        else if (!phoneRegex.test(value))
          error = "Enter a valid 10-11 digit number";
        break;
      case "password":
        if (!value) error = "Password is required";
        else if (value.length < 6)
          error = "Password must be at least 6 characters";
        break;
      case "confirmPassword":
        if (!value) error = "Please confirm your password";
        else if (value !== currentData.password)
          error = "Passwords do not match";
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
      const error = validateField(
        name,
        type === "checkbox" ? "" : (finalValue as string),
        updatedData,
      );
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const newErrors: FormErrors = {};
    const fieldsToValidate: (keyof FormErrors)[] = [
      "name",
      "email",
      "phone",
      "password",
      "confirmPassword",
    ];

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

    // Replace your existing `if (isFormValid)` block in AuthModal.tsx with this:

    if (isFormValid) {
      try {
        const url = formData.isAdmin ? "/api/admin/signup" : "/api/user/signup";
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            password: formData.password,
            isAdmin: formData.isAdmin, // The API maps this directly to "ADMIN" role
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          // You can handle this by setting a global form error state
          alert(data.message || "Something went wrong during signup.");
          return;
        }

        console.log("SUCCESSFULLY REGISTERED:", data.user);

        // Reset form states and close modal
        setFormData({
          name: "",
          email: "",
          phone: "",
          password: "",
          confirmPassword: "",
          isAdmin: false,
        });
        setTouched({});
        onClose();
        successToast("Account created successfully!");
      } catch (error) {
        console.error("Network error running signup:", error);
        alert("Network error. Please check your connection.");
      }
    }
  };

  const getInputStyles = (fieldName: keyof FormErrors) => {
    const baseStyle =
      "w-full pl-3 text-sm font-medium text-slate-800 placeholder-stone-400 focus:outline-none bg-transparent";
    const containerBase =
      "relative flex items-center border rounded-xl px-4 py-2.5 transition-all bg-white shadow-xs focus-within:ring-2";

    if (touched[fieldName] && errors[fieldName]) {
      return {
        container: `${containerBase} border-red-400 focus-within:border-red-500 focus-within:ring-red-100`,
        input: baseStyle,
      };
    }
    if (touched[fieldName] && !errors[fieldName] && formData[fieldName]) {
      return {
        container: `${containerBase} border-emerald-300 focus-within:border-emerald-500 focus-within:ring-emerald-50`,
        input: baseStyle,
      };
    }
    return {
      container: `${containerBase} border-stone-200 focus-within:border-rose-400 focus-within:ring-rose-100`,
      input: baseStyle,
    };
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-3.5">
      {/* NAME FIELD */}
      <div className="space-y-1">
        <label className="text-xs font-semibold text-slate-700 block pl-0.5">
          Full Name
        </label>
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
        <label className="text-xs font-semibold text-slate-700 block pl-0.5">
          Email Address
        </label>
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
        <label className="text-xs font-semibold text-slate-700 block pl-0.5">
          Phone Number
        </label>
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
        <label className="text-xs font-semibold text-slate-700 block pl-0.5">
          Password
        </label>
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
        <label className="text-xs font-semibold text-slate-700 block pl-0.5">
          Confirm Password
        </label>
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
            <Check
              size={14}
              className="text-white scale-0 transition-transform duration-200 font-black peer-checked:scale-100"
            />
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
      <div className="text-center pt-2">
        <p className="text-xs text-slate-500">
          Have an account?{" "}
          <button
            type="button"
            onClick={() => {
              setPageView("sign-in");
            }}
            className="text-rose-500 font-bold hover:underline"
          >
            Sing In
          </button>
        </p>
      </div>
    </form>
  );
}
