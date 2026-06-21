"use client";

import React, { useEffect, useState } from "react";
import DashboardLayout from "@/src/components/layout/DashboardLayout";
import {
  ChevronDown,
  SlidersHorizontal,
  Eye,
  Plus,
  ArrowLeft,
  Pencil,
  Trash2,
} from "lucide-react";
import { getProductUrl } from "@/src/utils";
import type { ProductItem } from "@/src/types/product";
import { deleteProductService, getProductService } from "@/src/services/product/client";
import { useNavigate } from "@/src/hooks/useNavigate"
import { successToast, warningToast } from "@/src/utils/toast";



export default function ProductDashboard() {
  const [selectedAll, setSelectedAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  // 🔥 API STATE (replaces static products)
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const { goTo } = useNavigate()

  const fetchProducts = async (pageNumber = 1) => {
    try {
      setLoading(true);

      const data = await getProductService({})

      setProducts(data.data || []);
      setPage(data.page);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(1);
  }, []);

  console.log("products ========<<<<>>>>>>>", products);

  // ================= SELECT LOGIC =================
  const handleSelectAll = () => {
    if (selectedAll) {
      setSelectedItems([]);
    } else {
      setSelectedItems(products.map((p) => p.id));
    }
    setSelectedAll(!selectedAll);
  };

  const toggleSelectItem = (id: number) => {
    if (selectedItems.includes(id)) {
      setSelectedItems((prev) => prev.filter((item) => item !== id));
      setSelectedAll(false);
    } else {
      const newSelected = [...selectedItems, id];
      setSelectedItems(newSelected);
      if (newSelected.length === products.length) setSelectedAll(true);
    }
  };

  // ================= PAGINATION =================
  const nextPage = () => {
    if (page < totalPages) fetchProducts(page + 1);
  };

  const prevPage = () => {
    if (page > 1) fetchProducts(page - 1);
  };
  const deleteProducts = async (ids: string[]) => {
    try {

      const { success, message, count } = deleteProductService(ids)
      if (success) {
        successToast(message)
        const updateProduct = products.filter((product) => !ids.includes(product.id))
        setProducts([...updateProduct])
      } else {
        warningToast("Failed to delete product")
      }

    } catch (error) {

    }
  }

  return (
    <DashboardLayout>
      {/* WORKSPACE ACTIONS TOOLBAR */}
      <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-base font-bold text-slate-900 tracking-tight">
          Products list
        </h2>

        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 text-slate-600 rounded-lg text-xs font-semibold hover:bg-slate-50 transition-colors cursor-pointer">
            <SlidersHorizontal size={13} />
            Filter
          </button>

          <button className="px-3 py-1.5 border border-slate-200 text-slate-600 rounded-lg text-xs font-semibold hover:bg-slate-50 transition-colors cursor-pointer">
            See All
          </button>

          <button
            onClick={() => goTo("/admin/products/add")}
            className="flex items-center gap-1 px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-xs font-semibold hover:bg-indigo-700 transition-colors shadow-2xs cursor-pointer">
            <Plus size={14} />
            Add
          </button>
        </div>
      </div>

      {/* DATA TABLE (UNCHANGED DESIGN) */}
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
                Price <ChevronDown size={12} />
              </th>

              <th className="py-3 px-4 font-semibold">
                Stock <ChevronDown size={12} />
              </th>

              <th className="py-3 px-4 font-semibold">
                Status <ChevronDown size={12} />
              </th>

              <th className="py-3 px-5 text-right font-semibold">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 text-slate-600 font-medium">
            {loading ? (
              <tr>
                <td colSpan={7} className="text-center py-6">
                  Loading...
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr
                  key={product.id}
                  className="hover:bg-slate-50/40 transition-colors group"
                >
                  <td className="py-3.5 px-5 text-center">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(product.id)}
                      onChange={() => toggleSelectItem(product.id)}
                      className="rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 accent-indigo-600 cursor-pointer"
                    />
                  </td>

                  <td className="py-3.5 px-4 font-bold text-slate-800">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg overflow-hidden bg-amber-100/60 border border-amber-200/40 flex items-center justify-center text-sm">
                        <img
                          className="w-full h-full"
                          src={
                            getProductUrl(product.images) || "/placeholder.png"
                          }
                          alt=""
                        />
                      </div>

                      <span>{product.name}</span>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 text-slate-500">
                    {product.category}
                  </td>

                  <td className="py-3.5 px-4 text-slate-700 font-semibold">
                    {product.price}
                  </td>

                  <td className="py-3.5 px-4 text-slate-600">
                    {product.stock}
                  </td>

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

                  <td className="py-3.5 px-5 text-right whitespace-nowrap">
                    <div className="flex justify-end items-center gap-3">
                      {/* DETAILS */}
                      <button className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer inline-flex items-center gap-1">
                        <Eye size={12} />
                      </button>

                      {/* EDIT */}
                      <button className="text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer inline-flex items-center gap-1">
                        <Pencil size={12} />
                      </button>

                      {/* DELETE */}
                      <button
                        onClick={() => deleteProducts([product.id])}
                        className="text-xs font-semibold text-red-500 hover:text-red-700 transition-colors cursor-pointer inline-flex items-center gap-1">
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* PAGINATION (UNCHANGED DESIGN + LOGIC) */}
      <div className="p-4 bg-slate-50/40 border-t border-slate-100 flex items-center justify-between gap-4">
        <button
          onClick={prevPage}
          disabled={page === 1}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 text-slate-600 rounded-lg text-xs font-semibold hover:bg-slate-50 transition-colors cursor-pointer shadow-3xs"
        >
          <ArrowLeft size={13} />
          Previous
        </button>

        <div className="flex items-center gap-1">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => fetchProducts(i + 1)}
              className={`w-7 h-7 rounded-md text-xs font-bold ${page === i + 1
                ? "bg-indigo-50 text-indigo-600 border border-indigo-100/40"
                : "text-slate-500 hover:bg-slate-100"
                }`}
            >
              {i + 1}
            </button>
          ))}
        </div>

        <div className="w-20 hidden sm:block"></div>
      </div>
    </DashboardLayout>
  );
}
