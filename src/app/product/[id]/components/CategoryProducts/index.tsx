"use client";

import React from "react";
import { Plus, Bell, Zap } from "lucide-react";
import { useSelector } from "react-redux";
import { getProductUrl, shuffleList } from "@/src/utils";
import ProductCard from "@/src/components/ui/ProductCard"

interface Product {
  id: number;
  title: string;
  weightDescription?: string;
  description: string;
  price: number;
  originalPrice: number;
  discount: string;
  isOutOfStock: boolean;
  deliveryTime?: string;
}

export default function MasalaSection() {
const products = useSelector(state => state?.product?.items) 

  //  {
  //     id: 1,
  //     title: "Fishlo Signature Fish Fry Masala - Spicy - 100g",
  //     description: "Fishlo's signature homemade spicy fry masala, specially...",
  //     price: 65,
  //     originalPrice: 129,
  //     discount: "50% off",
  //     isOutOfStock: false,
  //     deliveryTime: "Today 12PM - 1PM",
  //   },

  return (
    <div className="w-full bg-white py-12 px-4 sm:px-6 lg:px-8 font-sans antialiased">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* SECTION HEADER CONTAINER WITH CUSTOM RIBBON BADGE */}
        <div className="relative pt-6">
          {/* Custom Red Ribbon Badge Shape */}
          <div className="absolute -top-3 left-0 z-10">
            <div className="relative bg-gradient-to-r from-[#b71c1c] to-[#d32f2f] text-white px-5 py-2.5 rounded-r-md rounded-tl-md shadow-md">
              <span className="font-serif italic text-base sm:text-lg font-medium tracking-wide block">
                Fishlo Signature Masala
              </span>
              {/* Ribbon Fold Effect Underneath */}
              <div className="absolute left-0 bottom-[-6px] w-0 h-0 border-t-[6px] border-t-[#7f0000] border-r-[6px] border-r-transparent"></div>
            </div>
          </div>
          {/* Bottom structural divider line matching screenshot whitespace */}
          <div className="w-full h-px bg-transparent border-b border-gray-100 pt-6"></div>
        </div>

        {/* PRODUCTS RESPONSIVE GRID GRID LAYOUT */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {!!products.length && shuffleList(products).map((product) => <ProductCard product={product}/>)}
        </div>

        {/* BOTTOM SUBTEXT PROMPT SECTION */}
        <div className="w-full bg-[#f8fafc] rounded-2xl p-5 border border-slate-200/50 mt-4 text-center sm:text-left">
          <p className="text-xs sm:text-sm font-bold text-slate-600 tracking-tight">
            Enjoy restaurant-style pomfret fry at home — without the hassle.
          </p>
        </div>

      </div>
    </div>
  );
}