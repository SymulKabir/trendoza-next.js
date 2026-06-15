"use client";

import React, { useState } from "react";
import { X } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [phoneNumber, setPhoneNumber] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      
      {/* MAIN MODAL CONTAINER */}
      <div className="relative w-full max-w-3xl bg-white rounded-2xl overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-12 animate-in fade-in zoom-in-95 duration-200">
        
        {/* CLOSE BUTTON */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-1.5 rounded-full bg-white/80 md:bg-stone-50 text-stone-500 hover:text-stone-800 hover:bg-stone-100 transition-colors focus:outline-none"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {/* LEFT COLUMN: HERO MARKETING GRAPHIC */}
        <div className="relative md:col-span-5 h-48 md:h-full min-h-[180px] bg-stone-900 overflow-hidden">
          {/* Decorative placeholder background representing the crab imagery from your screenshot */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 z-10" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-stone-700 via-stone-900 to-black opacity-60" />
          
          {/* Copy typography stack layout */}
          <div className="absolute inset-0 z-20 p-6 flex flex-col justify-between text-white select-none">
            <div className="space-y-1 pt-4 md:pt-8">
              <span className="block font-serif italic text-2xl md:text-3xl font-medium tracking-wide leading-tight">
                Your Fresh Catch
              </span>
              <span className="block font-serif italic text-2xl md:text-3xl font-medium tracking-wide leading-tight text-rose-400">
                Is Waiting...
              </span>
            </div>
            
            <p className="text-[11px] font-medium text-stone-300/90 leading-relaxed max-w-[180px] pb-2">
              Login to explore today&apos;s premium seafood selection.
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: INTERACTIVE INTERFACE FORM */}
        <div className="md:col-span-7 p-8 sm:p-10 flex flex-col justify-center bg-white">
          
          {/* Logo Frame header matching brand format */}
          <div className="flex items-center justify-center gap-1.5 mb-2">
            <div className="w-6 h-6 rounded-lg bg-rose-500 flex items-center justify-center text-white font-black text-sm italic tracking-tighter">
              f
            </div>
            <span className="text-lg font-extrabold text-slate-800 tracking-tight">
              fish<span className="text-rose-500">lo.</span>
            </span>
          </div>

          {/* Form Prompts */}
          <div className="text-center space-y-1 mb-6">
            <h2 className="text-xl font-bold text-slate-800 tracking-tight">
              Welcome Back!
            </h2>
            <p className="text-xs text-slate-400 font-medium">
              Sign in or create an account with your phone number
            </p>
          </div>

          {/* Core Interactive input element flow */}
          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            
            {/* Phone Input Box row */}
            <div className="relative flex items-center border border-stone-300 rounded-xl px-4 py-3 focus-within:border-rose-400 focus-within:ring-1 focus-within:ring-rose-400/50 transition-all bg-white">
              <span className="text-sm font-bold text-rose-500 tracking-wide select-none pr-2.5 border-r border-stone-200">
                +91
              </span>
              <input
                type="tel"
                placeholder="Enter phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ""))}
                maxLength={10}
                className="w-full pl-3 text-sm font-medium text-slate-800 placeholder-stone-400 focus:outline-none bg-transparent"
              />
            </div>

            {/* Submit Action Trigger Button with screenshot matching light-coral shade */}
            <button
              type="submit"
              disabled={phoneNumber.length < 10}
              className="w-full bg-[#f19b8f] hover:bg-[#eb8678] disabled:bg-[#f5b3aa]/70 text-white font-bold text-sm py-3.5 rounded-xl transition-colors shadow-sm select-none"
            >
              Send OTP
            </button>

          </form>

          {/* Bottom Compliance Disclaimer Policy Meta Links */}
          <div className="mt-8 text-center">
            <p className="text-[10px] text-stone-400 font-medium leading-relaxed max-w-xs mx-auto">
              By continuing, you agree to our{" "}
              <a href="/terms" className="text-emerald-600 hover:underline transition-all">
                Terms & Conditions
              </a>{" "}
              and{" "}
              <a href="/privacy" className="text-emerald-600 hover:underline transition-all">
                Privacy Policy
              </a>
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}