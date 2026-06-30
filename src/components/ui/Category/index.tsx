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
  { id: "1", name: "Bombay Special", image: "bombil.png" },
  { id: "2", name: "Crabs & Lobsters", image: "crabs.png" },
  { id: "3", name: "Dry Fish", image: "dryfish.png" },
  { id: "4", name: "Fishlo Masala", image: "fishlo-masala.png" },
  { id: "5", name: "Fresh Cuts", image: "fresh-cuts.webp" },
  { id: "6", name: "Prawns & Shrimps", image: "prawns.png" },
  { id: "7", name: "Ready To Cook", image: "ready-to-cook.webp" },
  { id: "8", name: "Ready To Eat", image: "ready-to-eat.webp" },
  { id: "9", name: "Saltwater Fish", image: "salt-water-fist.png" },
  { id: "10", name: "Squids & Lobsters", image: "lobster.png" },
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
          src={`/assets/categories/${item.image}`}
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