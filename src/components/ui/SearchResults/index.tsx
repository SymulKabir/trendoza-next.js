"use client";

import React from "react";
import { TrendingUp, Bell } from "lucide-react";

interface SearchItem {
  id: number;
  title: string;
  imagePlaceholderText: string;
  price: number;
  originalPrice: number;
  discount: string;
  unit?: string;
  isOutOfStock: boolean;
  hasAddButton: boolean;
}

const Index = ({ isOpen }: { isOpen: boolean }) => {
  if (!isOpen) return null;
  const popularSearches = [
    "Pomfret",
    "Surmai",
    "Mackerel",
    "Prawns",
    "Sardines",
    "Lobster",
  ];

  // Exact data from Screenshot 2026-06-15 at 12.00.36 PM.jpg
  const items: SearchItem[] = [
    {
      id: 1,
      title: "Fresh Bangda (Mackerel) – Cleaned, Never Frozen - LARGE",
      imagePlaceholderText: "Mackerel Fish",
      price: 175.0,
      originalPrice: 250.0,
      discount: "30% off",
      unit: "/500g",
      isOutOfStock: false,
      hasAddButton: false, // matches empty status space from your capture
    },
    {
      id: 2,
      title: "Fishlo Signature Fish Fry Masala - Spicy - 100g",
      imagePlaceholderText: "Masala 100g",
      price: 65.0,
      originalPrice: 129.0,
      discount: "50% off",
      isOutOfStock: false,
      hasAddButton: true,
    },
    {
      id: 3,
      title: "Fresh Black Pomfret (Premium Quality) - Halwa",
      imagePlaceholderText: "Black Pomfret",
      price: 550.0,
      originalPrice: 675.0,
      discount: "19% off",
      unit: "/500g",
      isOutOfStock: false,
      hasAddButton: false,
    },
    {
      id: 4,
      title: "Fishlo Signature Fish Fry Masala - Spicy - 250g",
      imagePlaceholderText: "Masala 250g",
      price: 159.0,
      originalPrice: 322.0,
      discount: "51% off",
      isOutOfStock: false,
      hasAddButton: true,
    },
    {
      id: 5,
      title: "Fresh Squid / Calamari / Koonthal / Premium Bondas",
      imagePlaceholderText: "Fresh Squid",
      price: 300.0,
      originalPrice: 425.0,
      discount: "29% off",
      unit: "/500g",
      isOutOfStock: false,
      hasAddButton: false,
    },
    {
      id: 6,
      title: "Fresh Vannamei Prawns (Premium Quality)",
      imagePlaceholderText: "Prawns",
      price: 320.0,
      originalPrice: 350.0,
      discount: "8% off",
      unit: "/500g",
      isOutOfStock: true,
      hasAddButton: false,
    },
    {
      id: 7,
      title: "Fresh Seer Fish (Surmai / King Fish) Mangalore Anjal - LARGE",
      imagePlaceholderText: "Seer Fish",
      price: 700.0,
      originalPrice: 1150.0,
      discount: "39% off",
      unit: "/500g",
      isOutOfStock: true,
      hasAddButton: false,
    },
    {
      id: 8,
      title: "Premium Fresh Bombay Duck (Bombil)",
      imagePlaceholderText: "Bombay Duck",
      price: 225.0,
      originalPrice: 325.0,
      discount: "31% off",
      unit: "/500g",
      isOutOfStock: true,
      hasAddButton: false,
    },
  ];

  return (
    <div className="w-full bg-white py-8 px-4 sm:px-6 lg:px-8 font-sans antialiased text-slate-800">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* POPULAR SEARCHES CHIP BAR */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Popular Searches
          </h3>
          <div className="flex flex-wrap gap-2.5">
            {popularSearches.map((search, idx) => (
              <button
                key={idx}
                className="flex items-center gap-1.5 px-4 py-2 border border-slate-200 bg-white rounded-full text-xs font-semibold text-slate-600 hover:border-emerald-500 hover:text-emerald-600 transition-colors cursor-pointer shadow-2xs"
              >
                <TrendingUp size={13} className="text-emerald-500" />
                {search}
              </button>
            ))}
          </div>
        </div>

        {/* SEARCH RESULTS METADATA LINE */}
        <div className="flex items-baseline justify-between border-b border-slate-100 pb-3">
          <h2 className="text-xl font-bold text-slate-800 tracking-tight">
            Search Results
          </h2>
          <span className="text-xs font-medium text-slate-400">20 Items</span>
        </div>

        {/* RESULTS GRID PATTERN */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-start gap-4 p-1 rounded-xl hover:bg-slate-50/50 transition-colors group"
            >
              {/* Image Box Section */}
              <div className="relative w-36 sm:w-44 aspect-[4/2.6] rounded-xl overflow-hidden bg-slate-100 border border-slate-200/60 shrink-0 shadow-3xs">
                {/* Fallback Label Representation */}
                <div className="absolute inset-0 flex items-center justify-center p-2 text-center bg-stone-200/80">
                  <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">
                    {item.imagePlaceholderText}
                  </span>
                </div>

                {/* Condition: Out of stock Overlay Strip */}
                {item.isOutOfStock && (
                  <div className="absolute inset-0 bg-black/20 flex flex-col justify-between z-10">
                    <div className="w-full bg-black/70 text-white text-[9px] font-extrabold tracking-widest text-center py-1 uppercase">
                      Out of Stock
                    </div>
                    <div></div>
                  </div>
                )}
              </div>

              {/* Item Content Descriptions Stack */}
              <div className="flex-1 min-w-0 flex flex-col justify-between self-stretch py-0.5">
                <div className="space-y-1">
                  <h4 className="text-xs sm:text-[13px] font-bold text-slate-800 leading-snug line-clamp-2">
                    {item.title}
                  </h4>

                  {/* Pricing Matrix */}
                  <div className="space-y-0.5">
                    <div className="flex items-baseline gap-1">
                      <span className="text-sm font-extrabold text-slate-900">
                        ₹{item.price.toFixed(2)}
                      </span>
                      {item.unit && (
                        <span className="text-[10px] text-slate-400 font-semibold">
                          {item.unit}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px]">
                      <span className="line-through text-slate-400">
                        ₹{item.originalPrice.toFixed(2)}
                      </span>
                      <span className="font-bold text-emerald-500">
                        ({item.discount})
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Footers Block */}
                <div className="flex justify-end pt-2">
                  {item.hasAddButton && !item.isOutOfStock && (
                    <button className="px-5 py-1.5 border border-rose-200 bg-rose-50/30 text-rose-500 hover:bg-rose-50 hover:border-rose-300 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-0.5">
                      Add{" "}
                      <span className="text-xs font-normal text-rose-400/80">
                        +
                      </span>
                    </button>
                  )}

                  {item.isOutOfStock && (
                    <button className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 bg-white rounded-lg text-[10px] font-bold text-slate-400 hover:text-rose-500 hover:border-rose-200 transition-colors cursor-pointer">
                      <span>Get notified when available</span>
                      <Bell size={11} className="text-slate-400 fill-current" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
