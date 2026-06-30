"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import "./styles.scss"
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { getProductUrl } from "@/src/utils";

const Index = ({ product }: { product: any }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  if (!product?.images || product.images.length === 0) {
    return (
      <div className="aspect-[4/3] w-full rounded-2xl bg-stone-100 flex items-center justify-center text-stone-400">
        No Image Available
      </div>
    );
  }

  return (
    <div className="lg:col-span-4 space-y-4">
      {/* Main Large Image Swiper */}
      <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-stone-100 shadow-sm border border-stone-100">
        <Swiper
          spaceBetween={10}
          navigation={true}
          thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
          modules={[FreeMode, Navigation, Thumbs]}
          className="w-full h-full"
        >
          {product.images.map((img: any, idx: number) => (
            <SwiperSlide key={idx}>
              <img
                src={getProductUrl([img])}
                alt={product.name || "Product image"}
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Thumbnail Strip */}
      <div className="mt-4">
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="thumbs-swiper"
        >
          {product.images.map((img: any, idx: number) => (
            <SwiperSlide key={idx} className="cursor-pointer">
              <div className="aspect-square rounded-lg overflow-hidden border-2 border-transparent transition-all">
                <img
                  src={getProductUrl([img])}
                  className="w-full h-full object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Index;