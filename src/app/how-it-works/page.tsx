"use client";

import React from "react";
import HeaderFooterLayout from "@/src/components/layout/HeaderFooterLayout"

export default function FeaturesSection() {
  return (
    <HeaderFooterLayout>

    <div className="w-full bg-[#f4f7f9] pt-14 pb-0 px-4 sm:px-6 lg:px-8 font-sans antialiased">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        {/* TOP HEADER BLOCK */}
        <div className="text-center space-y-2 mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-[#1e293b] tracking-tight">
            Fresh Fish, Delivered Without the Hassle
          </h2>
          <p className="text-xs sm:text-[13px] font-medium text-slate-500">
            From sea to your kitchen — cleaned, cut, and ready to cook.
          </p>
        </div>

        {/* INTERACTIVE CALL TO ACTION TRIGGER */}
        <button className="bg-[#d6685e] hover:bg-[#cc5b51] text-white font-bold text-xs px-5 py-2.5 rounded-lg shadow-xs transition-colors mb-12">
          Order Now
        </button>

        {/* THREE COLUMN GRID LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mb-14">
          
          {/* CARD 1: ORDER ONLINE */}
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-2xs flex flex-col items-center text-center">
            {/* Shopping Cart Custom Vector Graphic */}
            <div className="w-full aspect-[16/10] max-w-[180px] flex items-center justify-center mb-4">
              <svg viewBox="0 0 200 120" className="w-full h-full text-rose-500" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="60" cy="100" r="8" className="fill-rose-500" />
                <circle cx="140" cy="100" r="8" className="fill-rose-500" />
                <path d="M20 20h25l20 60h75l15-45H55" />
                <ellipse cx="90" cy="110" rx="40" ry="4" className="text-sky-200/60 fill-current stroke-none" />
              </svg>
            </div>
            <h3 className="text-sm font-bold text-slate-800 tracking-tight mb-2">
              Order Online
            </h3>
            <p className="text-[11px] font-medium text-slate-500 leading-relaxed max-w-[220px]">
              Choose your favorite fish on Fishlo.in in just a few clicks.
            </p>
          </div>

          {/* CARD 2: FRESHLY PREPARED */}
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-2xs flex flex-col items-center text-center">
            {/* Cutting Board and Knife Custom Vector Graphic */}
            <div className="w-full aspect-[16/10] max-w-[180px] flex items-center justify-center mb-4">
              <svg viewBox="0 0 200 120" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                {/* Wood Board Base */}
                <rect x="35" y="45" width="130" height="40" rx="8" className="fill-amber-100/70 text-amber-600" />
                <circle cx="48" cy="65" r="4" className="fill-amber-600" />
                {/* Fish on Board */}
                <path d="M60 65c15-10 45-10 60 0c-15 10-45 10-60 0z" className="fill-sky-100 text-sky-500" />
                {/* Knife Overlaid */}
                <path d="M140 35 L70 70 L80 78 L150 43 Z" className="fill-rose-500 text-rose-600" />
                <line x1="120" y1="45" x2="145" y2="33" stroke="white" strokeWidth="4" />
              </svg>
            </div>
            <h3 className="text-sm font-bold text-slate-800 tracking-tight mb-2">
              Freshly Prepared
            </h3>
            <p className="text-[11px] font-medium text-slate-500 leading-relaxed max-w-[220px]">
              We handpick the freshest catch, clean it thoroughly, and cut it just the way you like.
            </p>
          </div>

          {/* CARD 3: DELIVERED FRESH */}
          <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-2xs flex flex-col items-center text-center">
            {/* Delivery Truck Custom Vector Graphic */}
            <div className="w-full aspect-[16/10] max-w-[180px] flex items-center justify-center mb-4">
              <svg viewBox="0 0 200 120" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                {/* Motion horizontal streaks */}
                <line x1="15" y1="50" x2="30" y2="50" className="text-rose-400" />
                <line x1="10" y1="60" x2="25" y2="60" className="text-rose-400" />
                {/* Truck Cabin & Freight Cargo Body */}
                <rect x="40" y="35" width="90" height="50" rx="4" className="fill-stone-50 text-stone-400" />
                <path d="M130 45h25l15 15v25h-40Z" className="fill-rose-500 text-rose-600" />
                {/* Branding on truck panel */}
                <text x="55" y="65" className="font-black italic text-xs tracking-tighter stroke-none fill-slate-700">Fishlo</text>
                {/* Wheels */}
                <circle cx="65" cy="85" r="10" className="fill-slate-800 text-stone-400" />
                <circle cx="140" cy="85" r="10" className="fill-slate-800 text-stone-400" />
              </svg>
            </div>
            <h3 className="text-sm font-bold text-slate-800 tracking-tight mb-2">
              Delivered Fresh
            </h3>
            <p className="text-[11px] font-medium text-slate-500 leading-relaxed max-w-[220px]">
              Vacuum packed securely and delivered to your doorstep in our premium Fishlo box.
            </p>
          </div>

        </div>
      </div>

      {/* FULL WIDTH SOLID LOWER RED TAGLINE BAR */}
      <div className="w-full bg-[#d6685e] py-3.5 text-center text-white text-xs sm:text-sm font-bold tracking-wide select-none">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-2">
          {/* Subtle horizontal design lines mirroring screenshot decoration */}
          <div className="hidden md:block w-24 h-px bg-white/20"></div>
          <span>No Smell. No Mess. Just Fresh, Ready-to-Cook Fish.</span>
          <div className="hidden md:block w-24 h-px bg-white/20"></div>
        </div>
      </div>

    </div>
    </HeaderFooterLayout>

  );
}