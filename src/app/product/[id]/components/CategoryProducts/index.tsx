"use client";

import React from "react";
import { Plus, Bell, Zap } from "lucide-react";

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
  const products: Product[] = [
    {
      id: 1,
      title: "Fishlo Signature Fish Fry Masala - Spicy - 100g",
      description: "Fishlo's signature homemade spicy fry masala, specially...",
      price: 65,
      originalPrice: 129,
      discount: "50% off",
      isOutOfStock: false,
      deliveryTime: "Today 12PM - 1PM",
    },
    {
      id: 2,
      title: "Fishlo Signature Fish Fry Masala - Spicy - 250g",
      description: "Fishlo's signature homemade spicy fry masala, specially...",
      price: 159,
      originalPrice: 322,
      discount: "51% off",
      isOutOfStock: false,
      deliveryTime: "Today 12PM - 1PM",
    },
    {
      id: 3,
      title: "Fishlo Signature Fish Curry Masala - Medium Spicy - 100g",
      description: "A balanced, aromatic spice blend crafted for flavourful,...",
      price: 55,
      originalPrice: 129,
      discount: "57% off",
      isOutOfStock: true,
    },
    {
      id: 4,
      title: "Fishlo Signature Fish Fry Masala – Extra Spicy (Green Chilli Blend)",
      description: "A fiery green chilli–based masala crafted for bold, spicy...",
      price: 179,
      originalPrice: 258,
      discount: "31% off",
      isOutOfStock: true,
    },
  ];

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
          {products.map((product) => (
            <div key={product.id} className="flex flex-col justify-between group">
              
              {/* Image Window Frame */}
              <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-stone-100 border border-stone-200/60 shadow-xs mb-3.5">
                {/* Product Image Dynamic State Overlay */}
                <div className="absolute inset-0 bg-stone-200 flex items-center justify-center text-center p-4">
                  <span className="text-xs font-semibold text-stone-400">
                    Product Image Placeholder
                  </span>
                </div>

                {/* If Out of Stock: Dimming Veil Overlay + Dark Label Strip */}
                {product.isOutOfStock && (
                  <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px] flex flex-col justify-between">
                    <div className="w-full bg-black/70 text-white text-[10px] font-bold tracking-wider text-center py-1.5 uppercase">
                      Out Of Stock
                    </div>
                    <div></div>
                  </div>
                )}

                {/* If In Stock: Float Modern Plus Action Button Accent */}
                {!product.isOutOfStock && (
                  <button className="absolute bottom-2.5 right-2.5 w-8 h-8 rounded-lg bg-white border border-stone-200 shadow-sm flex items-center justify-center text-rose-500 hover:bg-rose-50 hover:border-rose-300 transition-all z-20">
                    <Plus size={16} strokeWidth={2.5} />
                  </button>
                )}
              </div>

              {/* Text Product Content Metas */}
              <div className="space-y-1.5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xs sm:text-[13px] font-bold text-slate-800 leading-snug line-clamp-2">
                    {product.title}
                  </h3>
                  <p className="text-[11px] text-slate-400 font-medium leading-relaxed mt-0.5 line-clamp-2">
                    {product.description}
                  </p>
                </div>

                <div className="pt-2 space-y-2">
                  {/* Pricing Metadata */}
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm font-bold text-slate-800">₹{product.price}</span>
                    <span className="text-xs line-through text-slate-400">₹{product.originalPrice}</span>
                    <span className="text-xs font-bold text-[#10b981]">{product.discount}</span>
                  </div>

                  {/* Contextual Footer Element Based on Stock State */}
                  {product.isOutOfStock ? (
                    <div className="flex items-center justify-between gap-2 bg-stone-50 p-2 rounded-xl border border-stone-100">
                      <span className="text-[10px] font-medium text-slate-500 leading-tight">
                        Get notified when available
                      </span>
                      <button className="flex items-center gap-1 px-2.5 py-1.5 border border-stone-200 bg-white rounded-lg text-[10px] font-bold text-slate-600 hover:bg-stone-100 hover:text-rose-500 transition-colors whitespace-nowrap">
                        Notify
                        <Bell size={10} className="fill-current text-rose-500/80" />
                      </button>
                    </div>
                  ) : (
                    /* Delivery Timeline Pill Badge */
                    <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-500">
                      <Zap size={11} className="fill-amber-500 text-amber-500" />
                      <span>{product.deliveryTime}</span>
                    </div>
                  )}
                </div>

              </div>
            </div>
          ))}
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