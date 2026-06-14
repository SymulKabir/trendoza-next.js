"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Bell, ArrowRight, Minus, Plus } from "lucide-react";

interface Product {
  id: string;
  name: string;
  meta?: string; // e.g., "120g | 1 Pieces | Serves 1"
  image: string;
  price: number;
  originalPrice: number;
  discount: number;
  weightLabel: string; // e.g., "/500g" or just item price
  isOutOfStock: boolean;
  deliveryTime?: string;
  initialQuantity?: number; // to demonstrate the active quantity state
}

const products: Product[] = [
  {
    id: "1",
    name: "Authentic Surmai Fish Fry - (Seer Fish Steak) – Ready To Eat",
    meta: "120g | 1 Pieces | Serves 1",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=500&auto=format&fit=crop&q=60",
    price: 289,
    originalPrice: 499,
    discount: 42,
    weightLabel: "",
    isOutOfStock: false,
    deliveryTime: "Today 10AM - 11AM",
  },
  {
    id: "2",
    name: "Fresh Marinated Seer Fish | Surmai Slices (Ready To Cook)",
    meta: "300g | 2 Pieces | Serves 1-2",
    image: "https://images.unsplash.com/photo-1599250300435-b9693edd4843?w=500&auto=format&fit=crop&q=60",
    price: 399,
    originalPrice: 499,
    discount: 20,
    weightLabel: "",
    isOutOfStock: false,
    deliveryTime: "Today 10AM - 11AM",
  },
  {
    id: "3",
    name: "Marinated White Pomfret (Whole, Slit Cut) | Ready To Cook | Pack Of 1",
    meta: "200g | 1 Pieces | Serves 1",
    image: "https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?w=500&auto=format&fit=crop&q=60",
    price: 349,
    originalPrice: 450,
    discount: 22,
    weightLabel: "",
    isOutOfStock: false,
    deliveryTime: "Today 10AM - 11AM",
    initialQuantity: 2, // Active Counter state
  },
  {
    id: "4",
    name: "Fresh Squid / Calamari / Koonthal / Premium Bondas",
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=500&auto=format&fit=crop&q=60",
    price: 300,
    originalPrice: 425,
    discount: 29,
    weightLabel: "/500g",
    isOutOfStock: false,
    deliveryTime: "Today 10AM - 11AM",
  },
  {
    id: "5",
    name: "Fresh Black Pomfret (Premium Quality) - Halwa",
    image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=500&auto=format&fit=crop&q=60",
    price: 550,
    originalPrice: 675,
    discount: 19,
    weightLabel: "/500g",
    isOutOfStock: false,
    deliveryTime: "Today 10AM - 11AM",
  },
  {
    id: "6",
    name: "Fresh Bangda (Mackerel) – Cleaned, Never Frozen - Large",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=500&auto=format&fit=crop&q=60",
    price: 175,
    originalPrice: 250,
    discount: 30,
    weightLabel: "/500g",
    isOutOfStock: false,
    deliveryTime: "Today 10AM - 11AM",
  },
  {
    id: "7",
    name: "Premium White Pomfret (Paplet) – Sea Fresh - Medium",
    image: "https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?w=500&auto=format&fit=crop&q=60",
    price: 700,
    originalPrice: 800,
    discount: 12,
    weightLabel: "/500g",
    isOutOfStock: true,
  },
  {
    id: "8",
    name: "Fresh Indian Salmon (Rawas / Raavas / Vazhmeen)",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=500&auto=format&fit=crop&q=60",
    price: 550,
    originalPrice: 850,
    discount: 35,
    weightLabel: "/500g",
    isOutOfStock: true,
  },
  {
    id: "9",
    name: "Fresh Bangda (Mackerel) – Cleaned, Never Frozen - Small",
    image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=500&auto=format&fit=crop&q=60",
    price: 125,
    originalPrice: 175,
    discount: 29,
    weightLabel: "/500g",
    isOutOfStock: true,
  },
];

export default function SignatureSeafood() {
  // Simple state dictionary tracking individual quantities per product ID
  const [quantities, setQuantities] = useState<Record<string, number>>(
    products.reduce((acc, p) => ({ ...acc, [p.id]: p.initialQuantity || 0 }), {})
  );

  const updateQty = (id: string, delta: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(0, prev[id] + delta),
    }));
  };

  return (
    <section className="py-12 bg-white w-full max-w-7xl mx-auto px-4 select-none">
      {/* Title Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-800 tracking-tight">
          Fishlo&apos;s Signature Seafood
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          A curated collection of our finest, premium-grade seafood.
        </p>
      </div>

      {/* Grid Layout Layout Matrix */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {products.map((product) => {
          const qty = quantities[product.id];

          return (
            <div
              key={product.id}
              className="bg-white border border-dashed border-slate-200 rounded-2xl p-3 flex flex-col justify-between transition-shadow duration-300 hover:shadow-md"
            >
              {/* Product Thumbnail Window */}
              <div className="relative w-full h-40 rounded-xl overflow-hidden bg-slate-50 group">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 220px"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* Out Of Stock Dark Banner */}
                {product.isOutOfStock && (
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-[0.5px] flex items-start justify-center pt-2">
                    <span className="text-[10px] tracking-wider uppercase font-semibold text-white bg-black/60 px-6 py-1 rounded-sm">
                      OUT OF STOCK
                    </span>
                  </div>
                )}

                {/* Dynamic Cart Action Pill (Floating right over image) */}
                {!product.isOutOfStock && (
                  <div className="absolute bottom-2 right-2 z-10">
                    {qty === 0 ? (
                      <button
                        onClick={() => updateQty(product.id, 1)}
                        className="w-7 h-7 flex items-center justify-center bg-white rounded-lg shadow-md text-rose-500 font-bold hover:bg-rose-50 transition-colors border border-slate-100"
                      >
                        <Plus size={16} strokeWidth={3} />
                      </button>
                    ) : (
                      <div className="flex items-center gap-2.5 bg-rose-500 text-white px-2 py-1 rounded-lg shadow-md text-xs font-semibold">
                        <button onClick={() => updateQty(product.id, -1)} className="hover:opacity-80">
                          <Minus size={12} strokeWidth={3} />
                        </button>
                        <span>{qty}</span>
                        <button onClick={() => updateQty(product.id, 1)} className="hover:opacity-80">
                          <Plus size={12} strokeWidth={3} />
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Data Descriptions */}
              <div className="flex-1 flex flex-col justify-between mt-3">
                <div>
                  <h3 className="text-xs font-semibold text-slate-700 line-clamp-2 h-8 leading-tight">
                    {product.name}
                  </h3>

                  {/* Metadata string row (if available) */}
                  {product.meta && (
                    <span className="text-[10px] text-slate-400 font-medium block mt-1">
                      {product.meta}
                    </span>
                  )}
                </div>

                <div>
                  {/* Pricing Rows */}
                  <div className="flex items-center gap-1 mt-2 flex-wrap">
                    <span className="text-sm font-bold text-slate-800">
                      ₹{product.price}
                    </span>
                    {product.weightLabel && (
                      <span className="text-[11px] text-slate-400">
                        {product.weightLabel}
                      </span>
                    )}
                    <span className="text-[11px] text-slate-300 line-through">
                      ₹{product.originalPrice}
                    </span>
                    <span className="text-[11px] font-bold text-emerald-600 ml-auto">
                      {product.discount}% off
                    </span>
                  </div>

                  {/* Bottom Footer Section */}
                  <div className="mt-4 pt-3 border-t border-dotted border-slate-100">
                    {product.isOutOfStock ? (
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[10px] text-slate-400 leading-tight">
                          Get notified when available
                        </span>
                        <button className="flex items-center gap-1 border border-rose-200 text-rose-500 text-[11px] font-medium px-2.5 py-1 rounded-md bg-rose-50/40 hover:bg-rose-50 transition-colors">
                          Notify <Bell size={10} className="fill-rose-500" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 text-amber-600 font-medium text-[10px]">
                        <span>⚡</span>
                        <span>{product.deliveryTime}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Specialized "View All" Final Route Deck Card */}
        <div className="bg-white border border-dashed border-slate-200 rounded-2xl p-4 flex flex-col items-center justify-center min-h-[340px] text-center group cursor-pointer hover:border-rose-300 transition-colors duration-200">
          <h3 className="text-sm font-bold text-slate-700">View All</h3>
          <p className="text-[11px] text-slate-400 mt-0.5">Browse all items</p>
          <div className="w-9 h-9 bg-rose-500/10 text-rose-500 flex items-center justify-center rounded-full mt-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:bg-rose-500 group-hover:text-white">
            <ArrowRight size={16} />
          </div>
        </div>
      </div>
    </section>
  );
}