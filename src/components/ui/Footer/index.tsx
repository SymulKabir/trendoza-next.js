"use client";

import React from "react";
import Link from "next/link";
import { Phone, Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full bg-[#f4f7f9] text-slate-700 select-none pt-20">
      
      {/* SVG Smooth Wave Border Top */}
      <div className="absolute top-0 left-0 w-full overflow-hidden line-height-0 transform rotate-180 bg-white">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-12 sm:h-16 md:h-20 text-[#f4f7f9] fill-current"
        >
          <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V30.27C1122.6,39.3,1054.49,111,985.66,92.83Z" />
        </svg>
      </div>

      {/* Main Grid Content Area */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 pb-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
        
        {/* Brand Information Column */}
        <div className="lg:col-span-4 space-y-4">
          {/* Logo Brand Frame */}
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-rose-500 flex items-center justify-center text-white font-black text-xl italic tracking-tighter">
              f
            </div>
            <span className="text-2xl font-extrabold text-slate-800 tracking-tight">
              fish<span className="text-rose-500">lo.</span>
            </span>
          </div>
          
          {/* Brand Mission Description Paragraph */}
          <p className="text-xs sm:text-[13px] text-slate-500 leading-relaxed max-w-sm">
            Fishlo is not just an online seafood store. It&apos;s a modern, hygienic seafood 
            platform designed to bring clean, carefully handled fish straight to your doorstep. 
            We source fresh seafood, clean it in controlled environments, and pack it with 
            precision — without chemicals or preservatives. Our promise is simple: premium 
            freshness, transparent pricing, and reliable delivery.
          </p>
        </div>

        {/* Links Column 1: The Fishlo Experience */}
        <div className="lg:col-span-2 space-y-4">
          <h4 className="text-sm font-bold text-slate-800 tracking-tight border-b border-slate-200/60 pb-2">
            The Fishlo Experience
          </h4>
          <ul className="space-y-2.5 text-xs sm:text-[13px] font-medium text-slate-500">
            <li>
              <Link href="/how-it-works" className="hover:text-rose-500 transition-colors">
                How Fishlo Works
              </Link>
            </li>
            <li>
              <Link href="/quality-promise" className="hover:text-rose-500 transition-colors">
                Quality Promise
              </Link>
            </li>
            <li>
              <Link href="/faqs" className="hover:text-rose-500 transition-colors">
                FAQs
              </Link>
            </li>
          </ul>
        </div>

        {/* Links Column 2: Trust & Support */}
        <div className="lg:col-span-3 space-y-4">
          <h4 className="text-sm font-bold text-slate-800 tracking-tight border-b border-slate-200/60 pb-2">
            Trust & Support
          </h4>
          <ul className="space-y-2.5 text-xs sm:text-[13px] font-medium text-slate-500">
            <li>
              <Link href="/delivery-info" className="hover:text-rose-500 transition-colors">
                Delivery Information
              </Link>
            </li>
            <li>
              <Link href="/refund-policy" className="hover:text-rose-500 transition-colors">
                Cancellation & Refund Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-rose-500 transition-colors">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-rose-500 transition-colors">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* Links Column 3: Contact Channels */}
        <div className="lg:col-span-3 space-y-4">
          <h4 className="text-sm font-bold text-slate-800 tracking-tight border-b border-slate-200/60 pb-2">
            Contact & Availability
          </h4>
          <ul className="space-y-3 text-xs sm:text-[13px] font-medium text-slate-500">
            <li className="flex items-center gap-2.5">
              <Phone size={14} className="text-slate-400" />
              <a href="tel:+919619600049" className="hover:text-rose-500 transition-colors">
                +919619600049
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail size={14} className="text-slate-400" />
              <a href="mailto:support@fishlo.in" className="hover:text-rose-500 transition-colors">
                support@fishlo.in
              </a>
            </li>
          </ul>
        </div>

      </div>

      {/* Deep Rose Colored Base Copyright Bar */}
      <div className="w-full bg-[#d6685e] text-white/90 py-4 text-xs font-medium">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>
            Copyright © {currentYear} Fishlo Technologies. All rights reserved.
          </span>
          
          {/* Social Platform Meta Icon Row - Swapped out for clean inline SVGs */}
          <div className="flex items-center gap-4">
            {/* Instagram SVG */}
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-white transition-opacity duration-150 opacity-90 hover:opacity-100"
              aria-label="Instagram"
            >
              <svg className="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" w="20" h="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            
            {/* YouTube SVG */}
            <a 
              href="https://youtube.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-white transition-opacity duration-150 opacity-90 hover:opacity-100"
              aria-label="YouTube"
            >
              <svg className="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
              </svg>
            </a>
          </div>
        </div>
      </div>

    </footer>
  );
}