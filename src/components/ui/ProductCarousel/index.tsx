"use client";

import React from "react";
import Image from "next/image";
import { Bell } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import ProductCard from "@/src/components/ui/ProductCard"

// Import Swiper styles
import "swiper/css";
import { useSelector } from "react-redux";
import { shuffleList } from "@/src/utils";

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

// {
//   id: "1",
//   name: "Premium White Pomfret (Paplet) – Sea Fresh - Medium",
//   image: "https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?w=500&auto=format&fit=crop&q=60", // Placeholder
//   price: 700,
//   originalPrice: 800,
//   discount: 12,
//   weight: "500g",
//   isOutOfStock: true,
// },

const products2: Product[] = [
  {
    id: "1",
    name: "Premium White Pomfret (Paplet) – Sea Fresh - Medium",
    image:
      "https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?w=500&auto=format&fit=crop&q=60", // Placeholder
    price: 700,
    originalPrice: 800,
    discount: 12,
    weight: "500g",
    isOutOfStock: true,
  },
  {
    id: "2",
    name: "Fresh Indian Salmon (Rawas / Raavas / Vazhmeen)",
    image:
      "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=500&auto=format&fit=crop&q=60", // Placeholder
    price: 550,
    originalPrice: 850,
    discount: 35,
    weight: "500g",
    isOutOfStock: true,
  },
  {
    id: "3",
    name: "Fresh Bangda (Mackerel) – Cleaned, Never Frozen - Large",
    image:
      "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=500&auto=format&fit=crop&q=60", // Placeholder
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
    image:
      "https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?w=500&auto=format&fit=crop&q=60", // Placeholder
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
    image:
      "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=500&auto=format&fit=crop&q=60", // Placeholder
    price: 300,
    originalPrice: 425,
    discount: 29,
    weight: "500g",
    isOutOfStock: false,
    deliveryTime: "Today 10AM - 11AM",
  },
];

export default function ProductCarousel() {
  const { items: products } = useSelector((state) => state.product);
  console.log("products ------>>>>>>>>>", products);

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
        {!!products?.length &&
          shuffleList(products).map((product) => (
            <SwiperSlide key={product.id}>
              <ProductCard product={product}/>
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  );
}
