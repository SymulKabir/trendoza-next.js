"use client";

import React from "react";
import Image from "next/image";
import { Bell } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";

interface Product {
  id: string;
  name: string;
  subtitle?: string;
  image: string;
  price: number;
  originalPrice: number;
  discount: number;
  weight: string;
  isOutOfStock: boolean;
  deliveryTime?: string;
}

const products: Product[] = [
  {
    id: "1",
    name: "Premium White Pomfret (Paplet) – Sea Fresh - Medium",
    image: "https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?w=500&auto=format&fit=crop&q=60", // Placeholder
    price: 700,
    originalPrice: 800,
    discount: 12,
    weight: "500g",
    isOutOfStock: true,
  },
  {
    id: "2",
    name: "Fresh Indian Salmon (Rawas / Raavas / Vazhmeen)",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=500&auto=format&fit=crop&q=60", // Placeholder
    price: 550,
    originalPrice: 850,
    discount: 35,
    weight: "500g",
    isOutOfStock: true,
  },
  {
    id: "3",
    name: "Fresh Bangda (Mackerel) – Cleaned, Never Frozen - Large",
    image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=500&auto=format&fit=crop&q=60", // Placeholder
    price: 175,
    originalPrice: 250,
    discount: 30,
    weight: "500g",
    isOutOfStock: false,
    deliveryTime: "Today 10AM - 11AM",
  },
  {
    id: "4",
    name: "Fresh Black Pomfret (Premium Quality) - Halwa",
    image: "https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?w=500&auto=format&fit=crop&q=60", // Placeholder
    price: 550,
    originalPrice: 675,
    discount: 19,
    weight: "500g",
    isOutOfStock: false,
    deliveryTime: "Today 10AM - 11AM",
  },
  {
    id: "5",
    name: "Fresh Squid / Calamari / Koonthal / Premium Bondas",
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=500&auto=format&fit=crop&q=60", // Placeholder
    price: 300,
    originalPrice: 425,
    discount: 29,
    weight: "500g",
    isOutOfStock: false,
    deliveryTime: "Today 10AM - 11AM",
  },
];

export default function ProductCarousel() {
  return (
    <section className="py-12 bg-white w-full max-w-7xl mx-auto px-4 select-none">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-800 tracking-tight">
          What&apos;s Everyone Ordering?
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          Customer favorites, ordered again and again.
        </p>
      </div>

      {/* Swiper Slider */}
      <Swiper
        modules={[Autoplay]}
        spacing={16}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          reverseDirection: false, // Forces left-to-right standard, false keeps standard flow. Swiper slides right-to-left naturally with standard RTL configurations or normal autoplay.
        }}
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 16 },
          768: { slidesPerView: 3, spaceBetween: 16 },
          1024: { slidesPerView: 4, spaceBetween: 16 },
          1280: { slidesPerView: 5, spaceBetween: 16 },
        }}
        className="pb-4"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <div className="bg-white border border-dashed border-slate-200 rounded-2xl p-3 flex flex-col h-auto justify-between transition-shadow duration-300 hover:shadow-md">
              
              {/* Image Container */}
              <div className="relative w-full aspect-[3/2] rounded-xl overflow-hidden bg-slate-100 group">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 250px"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {/* Out Of Stock Overlay */}
                {product.isOutOfStock && (
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] flex items-start justify-center pt-2">
                    <span className="text-[10px] tracking-wider uppercase font-semibold text-white bg-black/60 px-6 py-1 rounded-sm">
                      OUT OF STOCK
                    </span>
                  </div>
                )}
              </div>

              {/* Content Details */}
              <div className="flex-1 flex flex-col justify-between mt-3">
                <h3 className="text-xs font-semibold text-slate-700 line-clamp-2 h-8 leading-tight">
                  {product.name}
                </h3>

                <div>
                  {/* Pricing Matrix */}
                  <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                    <span className="text-sm font-bold text-slate-800">
                      ₹{product.price}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      /{product.weight}
                    </span>
                    <span className="text-[11px] text-slate-300 line-through">
                      ₹{product.originalPrice}
                    </span>
                    <span className="text-[11px] font-bold text-emerald-600 ml-auto">
                      {product.discount}% off
                    </span>
                  </div>

                  {/* Dynamic Action Section */}
                  <div className="mt-4 pt-3 border-t border-dashed border-slate-200 ">
                    {product.isOutOfStock ? (
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] text-slate-500 leading-tight max-w-[100px]">
                          Get notified when available
                        </span>
                        <button className="flex items-center gap-1 border border-rose-200 text-rose-500 text-xs font-medium px-3 py-1.5 rounded-lg bg-rose-50/50 hover:bg-rose-50 transition-colors">
                          Notify <Bell size={12} className="fill-rose-500" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 text-amber-600 font-medium text-[11px]">
                        <span className="text-xs">⚡</span>
                        <span>{product.deliveryTime}</span>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}