"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function MasalaSection() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-12 select-none space-y-16">
      {/* 1. TOP PROMOTIONAL BANNER */}
      <div className="relative w-full h-32 sm:h-40 md:h-48 lg:h-56 rounded-2xl overflow-hidden shadow-sm bg-[#3a444d]">
        {/* Placeholder for the full width promotional artwork banner */}
        <Image
          src="https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?w=1600&auto=format&fit=crop&q=80"
          alt="Super Sale Offer Banner"
          fill
          priority
          className="object-cover opacity-90"
        />
        {/* Dark overlay to match contrast theme if needed */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/20" />

        {/* Simple inline textual representation of the banner elements for context */}
        <div className="absolute inset-0 flex items-center justify-between px-6 md:px-12 text-white">
          <div className="space-y-1">
            <span className="text-xs font-bold tracking-widest text-amber-400 bg-black/30 px-2 py-0.5 rounded">
              SPECIAL OFFER
            </span>
            <h3 className="text-xl md:text-3xl font-extrabold tracking-tight">
              SUPER SALE
            </h3>
          </div>
          <button className="bg-amber-400 hover:bg-amber-500 text-slate-900 font-bold text-xs md:text-sm px-4 py-2 rounded-lg transition-transform active:scale-95">
            Order Now
          </button>
        </div>
      </div>

      {/* 2. ASYMMETRIC CONTENT SPLIT SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ">
        {/* LEFT COLUMN: ASYMMETRIC MASONRY IMAGE CONFIGURATION */}
        <div className="lg:col-span-6 grid grid-cols-12 gap-4 items-end relative">
          {/* Main Large Left Image - Smooth Top Right Asymmetric Corner Mask */}
          <div className="col-span-9 relative h-[380px] sm:h-[450px] w-full rounded-bl-3xl rounded-tl-3xl rounded-br-3xl rounded-tr-[100px] overflow-hidden bg-slate-100 shadow-sm">
            <Image
              src="/assets/home/Fishlo_Premium_Fish_Curr_ Masala _Medium_Spicy.png"
              alt="Fish Fry Signature Pack"
              fill
              className="object-cover"
            />
          </div>

          {/* Right Nested Stack Pair */}
          <div className=" flex flex-col w-[40%] h-[70%] absolute right-0 bottom-0  ">
            {/* Small Top Right Cutout item */}
            <div className="relative h-28 sm:h-36 w-full rounded-2xl overflow-hidden bg-slate-100 shadow-sm">
              <Image
                src="/assets/home/fish-fry.webp"
                alt="Prepared Masala Dish cooked"
                fill
                className="object-cover rounded-2xl"
              />
            </div>

            {/* Bottom Vertical Pack item */}
            <div
              className="
    relative
    h-[240px] sm:h-[290px]
    w-full
    rounded-2xl
    bg-white
    p-[15px]
    pb-0
    pr-0

 relative
  before:content-['']
  before:absolute
  before:w-[15px]
  before:h-[15px]
  before:top-[-15px]
  before:left-[70px]
  before:bg-[url('/assets/home/shape.png')]
  before:bg-no-repeat

 
  "
            >
              <Image
                src="/assets/home/masala_one_bg.png"
                alt="Fish Curry Premium Pack"
                width={500}
                height={500}
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: BRAND VALUE PROPOSITION DETAILS */}
        <div className="lg:col-span-6 lg:pl-6 space-y-6">
          <div>
            <span className="text-xs font-semibold text-slate-400 tracking-wide block mb-1">
              Crafted in our kitchens, inspired by coastal homes.
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight leading-tight">
              Fishlo Signature Homemade Masalas
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed mt-3 max-w-xl">
              Rooted in the coastal kitchens of Mangalore, Fishlo Signature
              Masalas bring the bold, aromatic flavours of Kudla straight to
              your home. Carefully crafted in small batches, our blends capture
              the soul of traditional Mangalorean seafood—fresh, fiery, and full
              of character.
            </p>
          </div>

          {/* Core Feature Value Stack Items */}
          <div className="space-y-6 pt-2">
            {/* Item 1: Homemade Blend */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 border border-dashed border-rose-200 rounded-xl bg-rose-50/30 flex items-center justify-center text-rose-500">
                {/* Custom Mortar/Bowl Mockup Icon */}
                <img
                  className="w-6 h-6 stroke-current fill-none"
                  src={"/assets/icons/chemical-free.svg"}
                />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-700">
                  Homemade & Small-Batch Prepared
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed mt-1 max-w-md">
                  Carefully prepared in small batches using traditional methods,
                  allowing us to maintain freshness, consistency, and the
                  authentic taste that homemade masalas are known for.
                </p>
              </div>
            </div>

            {/* Item 2: No Preservatives */}
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 border border-dashed border-slate-200 rounded-xl bg-slate-50 flex items-center justify-center text-slate-500">
                {/* No Chemicals Mockup Flask Cross Icon */}
                <img
                  className="w-6 h-6 stroke-current fill-none"
                  src={"/assets/icons/homemade.svg"}
                />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-700">
                  No Preservatives or Artificial Colours
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed mt-1 max-w-md">
                  Crafted using high-quality natural spices, without adding
                  preservatives, artificial colours, or chemicals—just pure
                  ingredients and honest flavour.
                </p>
              </div>
            </div>
          </div>

          {/* Order Action Button Trigger */}
          <div className="pt-2">
            <button className="inline-flex items-center gap-2 bg-rose-500 text-white font-bold text-xs px-5 py-2.5 rounded-lg shadow-sm shadow-rose-500/20 hover:bg-rose-600 transition-colors duration-150 group">
              Order Now
              <ArrowRight
                size={14}
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
