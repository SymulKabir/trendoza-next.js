"use client";

import "./style.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const banners = [
  { id: 1, image: "slide-1.webp" },
  { id: 2, image: "slide-2.webp" },
  { id: 3, image: "slide-3.webp" },
  { id: 4, image: "slide-4.jpg" },
];

export default function HeroBanner() {
  return (
    <section className="my-6 w-full">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        loop
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        className="hero-slider w-full overflow-hidden rounded-2xl"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <div
              className="
                relative
                w-full
                h-[180px]
                sm:h-[220px]
                md:h-[300px]
                lg:h-[380px]
                xl:h-[420px]
              "
            >
              <img
                src={`/assets/${banner.image}`}
                alt={`Banner ${banner.id}`}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}