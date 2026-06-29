"use client";

import React, { useEffect, useState } from "react";
import { getProductService } from "@/src/services/product/client";
import { ChevronDown } from "lucide-react";
import ProductCard from "@/src/components/ui/ProductCard"
import HeaderFooterLayout from "@/src/components/layout/HeaderFooterLayout"
import { useSelector } from "react-redux";

const categories = ["All Items", "Bombay Special", "Crabs & Lobsters", "Dry Fish", "Fishlo Masala", "Fresh Cuts", "Prawns & Shrimps"];

export default function AllProductsPage() {
  // const [products, setProducts] = useState<any[]>([]);
  const [activeCategory, setActiveCategory] = useState("All Items");
  const [inStockOnly, setInStockOnly] = useState(false);
  const {items: products, loading} = useSelector(state => state.product)



  return (
    <HeaderFooterLayout>

      <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-xl font-bold text-slate-800 mb-6">All Products</h1>

      {/* Filter Bar */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activeCategory === cat ? "bg-red-500 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Control Bar (Toggle + Sort) */}
      <div className="flex items-center justify-between py-4 border-y border-slate-100 mb-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={inStockOnly} onChange={() => setInStockOnly(!inStockOnly)} className="toggle" />
          <span className="text-xs font-semibold text-slate-600">In-Stock</span>
        </label>
        
        <div className="flex gap-4">
          <button className="flex items-center gap-1 text-xs font-semibold text-slate-600">
            All Products <ChevronDown size={14} />
          </button>
          <button className="flex items-center gap-1 text-xs font-semibold text-slate-600">
            Sort by: Relevance <ChevronDown size={14} />
          </button>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {products.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
    </HeaderFooterLayout>
  );
}