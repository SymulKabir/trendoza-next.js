"use client";

import React, { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import ProductCard from "@/src/components/ui/ProductCard";
import { useSelector } from "react-redux";

const Index = () => { 
  const {items: products, loading} = useSelector((state) => state.product.items);

  // Updated operation execution block mapping directly back to the database

  if (loading && products.length === 0) {
    return (
      <div className="w-full text-center py-24 text-sm text-slate-400 font-medium">
        Loading fresh catches...
      </div>
    );
  }

  return (
    <section className="py-12 bg-white w-full max-w-7xl mx-auto px-4 select-none">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-800 tracking-tight">
          Fishlo&apos;s Signature Seafood
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          A curated collection of our finest, premium-grade seafood.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {products.map((product) => {
          return <ProductCard key={product.id} product={product} />;
        })}

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
};

export default Index;
