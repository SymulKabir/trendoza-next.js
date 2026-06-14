"use client";

import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Mousewheel } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";

interface Category {
  id: string;
  name: string;
  image: string;
}

const categories: Category[] = [
  { id: "1", name: "Bombay Special", image: "https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?w=200&q=80" },
  { id: "2", name: "Crabs & Lobsters", image: "https://images.unsplash.com/photo-1551248429-4043bcead3ab?w=200&q=80" },
  { id: "3", name: "Dry Fish", image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=200&q=80" },
  { id: "4", name: "Fishlo Masala", image: "https://images.unsplash.com/photo-1599250300435-b9693edd4843?w=200&q=80" },
  { id: "5", name: "Fresh Cuts", image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=200&q=80" },
  { id: "6", name: "Prawns & Shrimps", image: "https://images.unsplash.com/photo-1559742811-82428b49223b?w=200&q=80" },
  { id: "7", name: "Ready To Cook", image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=200&q=80" },
  { id: "8", name: "Ready To Eat", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=200&q=80" },
  { id: "9", name: "Saltwater Fish", image: "https://images.unsplash.com/photo-1534604973900-c43ab4c2e0ab?w=200&q=80" },
  { id: "10", name: "Squids & Lobsters", image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=200&q=80" },
];

export default function CategorySlider() {
  // Split the categories array into two rows to match the double-decker grid layout
  const firstRow = categories.slice(0, 6);
  const secondRow = categories.slice(6);

  const swiperConfig = {
    modules: [FreeMode, Mousewheel],
    freeMode: true, // Enables smooth fluid dragging/flicking without strict snap breaking points
    mousewheel: { forceToAxis: true }, // Enables trackpad/mousewheel horizontal scrolling
    className: "w-full cursor-grab active:cursor-grabbing px-4 !overflow-visible",
  };

  const renderCategoryItem = (item: Category) => (
    <div className="flex flex-col items-center text-center group select-none">
      {/* Circular Image Wrapper */}
      <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden shadow-inner bg-slate-50 border border-slate-100 transition-transform duration-300 group-hover:scale-105">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(max-width: 640px) 96px, 112px"
          className="object-cover"
        />
      </div>
      {/* Label Text */}
      <span className="mt-3 text-xs sm:text-sm font-semibold text-slate-700 tracking-tight transition-colors duration-200 group-hover:text-slate-900 line-clamp-1">
        {item.name}
      </span>
    </div>
  );

  return (
    <section className="py-12 bg-white w-full overflow-hidden max-w-7xl mx-auto">
      {/* Header Titles */}
      <div className="text-center mb-10 px-4">
        <h2 className="text-3xl font-bold text-slate-800 tracking-tight">
          What Are You Craving Today?
        </h2>
        <p className="text-sm text-slate-400 mt-1.5">
          Choose from fresh seafood and chicken, cleaned & ready to cook.
        </p>
      </div>

      {/* Grid container handles large screens, Swiper takes over on smaller viewport carousels */}
      <div className="hidden lg:flex flex-col gap-8 items-center px-8">
        <div className="flex gap-10 xl:gap-14 justify-center">
          {firstRow.map((item) => <div key={item.id} className="w-28">{renderCategoryItem(item)}</div>)}
        </div>
        <div className="flex gap-10 xl:gap-14 justify-center">
          {secondRow.map((item) => <div key={item.id} className="w-28">{renderCategoryItem(item)}</div>)}
        </div>
      </div>

      {/* Touch slider/dragger view for smaller screens */}
      <div className="lg:hidden flex flex-col gap-6">
        {/* Row 1 Slider */}
        <Swiper
          {...swiperConfig}
          breakpoints={{
            320: { slidesPerView: 3.2, spaceBetween: 12 },
            480: { slidesPerView: 4.2, spaceBetween: 16 },
            640: { slidesPerView: 5.2, spaceBetween: 20 },
          }}
        >
          {firstRow.map((item) => (
            <SwiperSlide key={item.id}>
              {renderCategoryItem(item)}
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Row 2 Slider */}
        <Swiper
          {...swiperConfig}
          breakpoints={{
            320: { slidesPerView: 2.2, spaceBetween: 12 },
            480: { slidesPerView: 3.2, spaceBetween: 16 },
            640: { slidesPerView: 4.2, spaceBetween: 20 },
          }}
        >
          {secondRow.map((item) => (
            <SwiperSlide key={item.id}>
              {renderCategoryItem(item)}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}