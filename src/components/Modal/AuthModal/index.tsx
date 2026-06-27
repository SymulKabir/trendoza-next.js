"use client";

import React, { useState, ChangeEvent, FocusEvent, FormEvent } from "react";
import { X, Eye, EyeOff, Check, AlertCircle } from "lucide-react";
import Signup from "./components/Signup";
import Signin from "./components/Signin";

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
  const [pageView, setPageView] = useState("sign-in");

  if (!isOpen) return null;

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
            Create an account to explore today&apos;s premium seafood selections
            immediately.
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
              {pageView === "sign-up" && "Create Account"}
              {pageView === "sign-in" && "Sign Account"}
            </h2>
            <p className="text-xs text-slate-400 font-medium mt-0.5">
              Join us to get immediate access to premium features
            </p>
          </div>

          {/* Form Element */}
          {pageView === "sign-up" && <Signup onClose={onClose}  setPageView={setPageView} />}
          {pageView === "sign-in" && <Signin onClose={onClose}  setPageView={setPageView} />}

          {/* Compliance Footer Disclaimer */}
          <div className="mt-5 text-center">
            <p className="text-[10px] text-stone-400 font-medium leading-relaxed max-w-xs mx-auto">
              By continuing, you agree to our{" "}
              <a
                href="/terms"
                className="text-emerald-600 hover:underline transition-all font-semibold"
              >
                Terms & Conditions
              </a>{" "}
              and{" "}
              <a
                href="/privacy"
                className="text-emerald-600 hover:underline transition-all font-semibold"
              >
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
