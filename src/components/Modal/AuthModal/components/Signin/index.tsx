"use client";

import React, {
  useState,
  ChangeEvent,
  FocusEvent,
  FormEvent,
  useEffect,
} from "react";
import { Eye, EyeOff, Check, AlertCircle } from "lucide-react";
import { setAdminToken, setUserToken } from "@/src/utils/authTokens/client";
import { successToast } from "@/src/utils/toast";

interface SignInFormProps {
  onClose?: (user: any) => void;
  setPageView?: (user: any) => void;
}

interface FormState {
  email: string;
  password: string;
  isAdmin: boolean;
}

interface FormErrors {
  email?: string;
  password?: string;
}

export default function SignInForm({
  onClose,
  setPageView,
}: SignInFormProps) {
  const [formData, setFormData] = useState<FormState>({
    email: "",
    password: "",
    isAdmin: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validateField = (name: string, value: string): string => {
    let error = "";

    switch (name) {
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.trim()) {
          error = "Email address is required";
        } else if (!emailRegex.test(value)) {
          error = "Please enter a valid email address";
        }
        break;
      case "password":
        if (!value) {
          error = "Password is required";
        }
        break;
      default:
        break;
    }
    return error;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const finalValue = type === "checkbox" ? checked : value;

    const updatedData = { ...formData, [name]: finalValue };
    setFormData(updatedData);

    if (touched[name] && type !== "checkbox") {
      const error = validateField(name, finalValue as string);
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
    setSubmitError(null);

    const newErrors: FormErrors = {};
    const fieldsToValidate: (keyof FormErrors)[] = ["email", "password"];
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
      setIsLoading(true);
      try {
        // Dynamically point to either user or admin authentication routes
        const url = formData.isAdmin ? "/api/admin/signin" : "/api/user/signin";

        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          setSubmitError(data.message || "Invalid email or password.");
          setIsLoading(false);
          return;
        }

        console.log("SUCCESSFULLY SIGNED IN:", data.user);
 
        if (data.token) {
          if (url.includes("admin")) {
            setAdminToken(data.token);
          } else {
            setUserToken(data.token);
          }
        }
        successToast("Account login successfully!")
        onClose()
      } catch (error) {
        console.error("Network error running signin:", error);
        setSubmitError("Network error. Please check your internet connection.");
      } finally {
        setIsLoading(false);
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
      {/* GLOBAL DISMISSABLE ERROR BANNER */}
      {submitError && (
        <div className="p-3 text-xs font-semibold text-red-600 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 animate-in fade-in duration-200">
          <AlertCircle size={14} className="shrink-0" />
          <span>{submitError}</span>
        </div>
      )}

      {/* EMAIL FIELD */}
      <div className="space-y-1">
        <label className="text-xs font-semibold text-slate-700 block pl-0.5">
          Email Address
        </label>
        <div className={getInputStyles("email").container}>
          <input
            type="email"
            name="email"
            placeholder="name@example.com"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isLoading}
            className={getInputStyles("email").input}
          />
        </div>
        {touched.email && errors.email && (
          <p className="text-[11px] text-red-500 font-medium flex items-center gap-1 pl-0.5 animate-in fade-in slide-in-from-top-1 duration-150">
            <AlertCircle size={12} /> {errors.email}
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
            disabled={isLoading}
            className={getInputStyles("password").input}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            disabled={isLoading}
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

      {/* TICK MARK SIGNIN AS ADMIN SWITCH BUTTON */}
      <div className="pt-1">
        <label className="relative flex items-center gap-3 cursor-pointer select-none group w-fit">
          <input
            type="checkbox"
            name="isAdmin"
            checked={formData.isAdmin}
            onChange={handleChange}
            disabled={isLoading}
            className="sr-only peer"
          />
          <div className="w-5 h-5 border-2 border-stone-300 rounded-md bg-white transition-all duration-200 flex items-center justify-center group-hover:border-rose-400 peer-checked:bg-rose-500 peer-checked:border-rose-500 shadow-xs">
            <Check
              size={14}
              className="text-white scale-0 transition-transform duration-200 font-black peer-checked:scale-100"
            />
          </div>
          <span className="text-xs font-semibold text-slate-600 group-hover:text-slate-900 transition-colors">
            Signin as Admin
          </span>
        </label>
      </div>

      {/* SUBMIT BUTTON */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full mt-2 bg-rose-500 hover:bg-rose-600 text-white font-bold text-sm py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg active:scale-[0.99] transform select-none flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <span className="inline-block animate-pulse">Authenticating...</span>
        ) : (
          "Sign In"
        )}
      </button>
      <div className="text-center pt-2">
        <p className="text-xs text-slate-500">
          Don't have an account?{" "}
          <button
            type="button"
            onClick={() => {
              setPageView("sign-up");
            }}
            className="text-rose-500 font-bold hover:underline"
          >
            Create an account
          </button>
        </p>
      </div>
    </form>
  );
}
