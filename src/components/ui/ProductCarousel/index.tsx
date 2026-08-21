"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import ProductCard from "@/src/components/ui/ProductCard"
import type { RootState } from "@/src/store/client/store";

// Import Swiper styles
import "swiper/css";
import { useSelector } from "react-redux";

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
 
export default function ProductCarousel() {
  const { items: products } = useSelector((state: RootState) => state.product);

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
        // spacing={16}
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
        {!!products?.length &&
          products.map((product) => (
            <SwiperSlide key={product.id}>
              <ProductCard product={product}/>
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  );
}
