"use client";

import React, { useState } from "react";
import DashboardLayout from "@/src/components/layout/DashboardLayout"
import {
    ChevronDown,
    SlidersHorizontal,
    Eye,
    Plus,
    ArrowLeft
} from "lucide-react";

interface ProductItem {
    id: number;
    name: string;
    category: string;
    price: string;
    stock: number;
    status: "Scheduled" | "Active" | "Draft";
    imageLabel: string;
}

export default function ProductDashboard() {
    const [selectedAll, setSelectedAll] = useState(false);
    const [selectedItems, setSelectedItems] = useState<number[]>([]);

    // Extracted data schema exactly mapping original-7a7c3c2c2c73bdbe6cb457b8b60acfff.webp
    const products: ProductItem[] = [
        { id: 1, name: "T-Shirt", category: "Women Cloths", price: "$79.80", stock: 79, status: "Scheduled", imageLabel: "👕" },
        { id: 2, name: "Shirt", category: "Man Cloths", price: "$76.89", stock: 86, status: "Active", imageLabel: "👔" },
        { id: 3, name: "Pant", category: "Kid Cloths", price: "$86.65", stock: 74, status: "Draft", imageLabel: "👖" },
        { id: 4, name: "Sweater", category: "Man Cloths", price: "$56.07", stock: 69, status: "Active", imageLabel: "🧥" },
        { id: 5, name: "Sweater", category: "Man Cloths", price: "$56.07", stock: 69, status: "Scheduled", imageLabel: "🧥" },
        { id: 6, name: "Light Jacket", category: "Women Cloths", price: "$36.00", stock: 65, status: "Draft", imageLabel: "🧥" },
        { id: 7, name: "Half Shirt", category: "Man Cloths", price: "$46.78", stock: 58, status: "Active", imageLabel: "👕" },
        { id: 8, name: "Half Shirt", category: "Sweater", price: "$46.78", stock: 58, status: "Active", imageLabel: "👕" },
        { id: 9, name: "Half Shirt", category: "Man Cloths", price: "$46.78", stock: 58, status: "Scheduled", imageLabel: "👕" },
        { id: 10, name: "Half Shirt", category: "Kid", price: "$46.78", stock: 58, status: "Active", imageLabel: "👕" },
    ];

    const handleSelectAll = () => {
        if (selectedAll) {
            setSelectedItems([]);
        } else {
            setSelectedItems(products.map(p => p.id));
        }
        setSelectedAll(!selectedAll);
    };

    const toggleSelectItem = (id: number) => {
        if (selectedItems.includes(id)) {
            setSelectedItems(prev => prev.filter(item => item !== id));
            setSelectedAll(false);
        } else {
            const newSelected = [...selectedItems, id];
            setSelectedItems(newSelected);
            if (newSelected.length === products.length) setSelectedAll(true);
        }
    };

    return (
        <DashboardLayout>

            {/* WORKSPACE ACTIONS TOOLBAR */}
            <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h2 className="text-base font-bold text-slate-900 tracking-tight">Products list</h2>

                <div className="flex items-center gap-2">
                    <button className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 text-slate-600 rounded-lg text-xs font-semibold hover:bg-slate-50 transition-colors cursor-pointer">
                        <SlidersHorizontal size={13} />
                        Filter
                    </button>
                    <button className="px-3 py-1.5 border border-slate-200 text-slate-600 rounded-lg text-xs font-semibold hover:bg-slate-50 transition-colors cursor-pointer">
                        See All
                    </button>
                    <button className="flex items-center gap-1 px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-xs font-semibold hover:bg-indigo-700 transition-colors shadow-2xs cursor-pointer">
                        <Plus size={14} />
                        Add
                    </button>
                </div>
            </div>

            {/* DATA CONTAINER INTERACTIVE TABLE ROW SEGMENTS */}
            <div className="overflow-x-auto w-full">
                <table className="w-full border-collapse text-left text-xs">
                    <thead>
                        <tr className="border-b border-slate-100 text-slate-400 font-semibold bg-slate-50/20">
                            <th className="py-3 px-5 w-12 text-center">
                                <input
                                    type="checkbox"
                                    checked={selectedAll}
                                    onChange={handleSelectAll}
                                    className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 accent-indigo-600 cursor-pointer"
                                />
                            </th>
                            <th className="py-3 px-4 font-semibold">
                                <div className="flex items-center gap-1 cursor-pointer select-none hover:text-slate-600">
                                    Product Name <ChevronDown size={12} />
                                </div>
                            </th>
                            <th className="py-3 px-4 font-semibold">
                                <div className="flex items-center gap-1 cursor-pointer select-none hover:text-slate-600">
                                    Category <ChevronDown size={12} />
                                </div>
                            </th>
                            <th className="py-3 px-4 font-semibold">
                                <div className="flex items-center gap-1 cursor-pointer select-none hover:text-slate-600">
                                    Price <ChevronDown size={12} />
                                </div>
                            </th>
                            <th className="py-3 px-4 font-semibold">
                                <div className="flex items-center gap-1 cursor-pointer select-none hover:text-slate-600">
                                    Stock <ChevronDown size={12} />
                                </div>
                            </th>
                            <th className="py-3 px-4 font-semibold">
                                <div className="flex items-center gap-1 cursor-pointer select-none hover:text-slate-600">
                                    Status <ChevronDown size={12} />
                                </div>
                            </th>
                            <th className="py-3 px-5 text-right font-semibold">Actions</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100 text-slate-600 font-medium">
                        {products.map((product) => (
                            <tr key={product.id} className="hover:bg-slate-50/40 transition-colors group">
                                {/* Checkbox Frame */}
                                <td className="py-3.5 px-5 text-center">
                                    <input
                                        type="checkbox"
                                        checked={selectedItems.includes(product.id)}
                                        onChange={() => toggleSelectItem(product.id)}
                                        className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 accent-indigo-600 cursor-pointer"
                                    />
                                </td>

                                {/* Product Name & Miniature Graphic */}
                                <td className="py-3.5 px-4 font-bold text-slate-800">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-amber-100/60 border border-amber-200/40 flex items-center justify-center text-sm shadow-3xs overflow-hidden shrink-0">
                                            {product.imageLabel}
                                        </div>
                                        <span>{product.name}</span>
                                    </div>
                                </td>

                                {/* Category field */}
                                <td className="py-3.5 px-4 text-slate-500">{product.category}</td>

                                {/* Cost value */}
                                <td className="py-3.5 px-4 text-slate-700 font-semibold">{product.price}</td>

                                {/* Stock level */}
                                <td className="py-3.5 px-4 text-slate-600">{product.stock}</td>

                                {/* State Conditional Badge */}
                                <td className="py-3.5 px-4">
                                    {product.status === "Active" && (
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-100/60">
                                            Active
                                        </span>
                                    )}
                                    {product.status === "Scheduled" && (
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-sky-50 text-sky-600 border border-sky-100/60">
                                            Scheduled
                                        </span>
                                    )}
                                    {product.status === "Draft" && (
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-600 border border-amber-100/60">
                                            Draft
                                        </span>
                                    )}
                                </td>

                                {/* Table row single row link prompt actions */}
                                <td className="py-3.5 px-5 text-right whitespace-nowrap">
                                    <button className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer inline-flex items-center gap-1">
                                        <Eye size={12} />
                                        Details
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* LOWER INTERACTIVE PAGINATION GRID FRAME WORK */}
            <div className="p-4 bg-slate-50/40 border-t border-slate-100 flex items-center justify-between gap-4">
                <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 text-slate-600 rounded-lg text-xs font-semibold hover:bg-slate-50 transition-colors cursor-pointer shadow-3xs">
                    <ArrowLeft size={13} />
                    Previous
                </button>

                <div className="flex items-center gap-1">
                    <button className="w-7 h-7 rounded-md text-xs font-bold bg-indigo-50 text-indigo-600 border border-indigo-100/40">1</button>
                    <button className="w-7 h-7 rounded-md text-xs font-semibold text-slate-500 hover:bg-slate-100 transition-colors cursor-pointer">2</button>
                    <button className="w-7 h-7 rounded-md text-xs font-semibold text-slate-500 hover:bg-slate-100 transition-colors cursor-pointer">3</button>
                    <span className="px-1.5 text-xs text-slate-400 tracking-tight">...</span>
                    <button className="w-7 h-7 rounded-md text-xs font-semibold text-slate-500 hover:bg-slate-100 transition-colors cursor-pointer">8</button>
                    <button className="w-7 h-7 rounded-md text-xs font-semibold text-slate-500 hover:bg-slate-100 transition-colors cursor-pointer">9</button>
                    <button className="w-7 h-7 rounded-md text-xs font-semibold text-slate-500 hover:bg-slate-100 transition-colors cursor-pointer">10</button>
                </div>

                {/* Layout matching right whitespace placeholder spacer */}
                <div className="w-20 hidden sm:block"></div>
            </div>

        </DashboardLayout>
    );
}