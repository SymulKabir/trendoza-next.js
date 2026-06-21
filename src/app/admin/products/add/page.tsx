"use client";

import React, { useState } from "react";
import { ArrowLeft, Upload, Plus, Trash2, Save } from "lucide-react";
import { addProductService } from "@/src/services/product/client";
import { successToast, warningToast } from "@/src/utils/toast";
import { useNavigate } from "@/src/hooks/useNavigate"

interface ProductVariant {
  weight: string; // e.g., "500g" or "1.0kg"
  cleanedWeight: string; // e.g., "~400g - 450g"
  originalPrice: number; // e.g., 800
  sellingPrice: number; // e.g., 700
  discountPercent: number; // Auto-computed or manual override
}

// Internal interface tracking files with local preview strings
interface ImageAsset {
  id: string;
  file: File;
  previewUrl: string;
}

const Index = () => {
  // Core Descriptive States
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Fresh Fish");
  const [description, setDescription] = useState("");
  const [stockStatus, setStockStatus] = useState("In Stock");
  const [badgeType, setBadgeType] = useState("None");
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Multi-Image Upload State
  const [images, setImages] = useState<ImageAsset[]>([]);

  // Available Cuts Selection Options
  const [availableCuts, setAvailableCuts] = useState<string[]>([
    "Fry Cut",
    "Slices",
  ]);
  const cutOptions = [
    "Fry Cut",
    "Slices",
    "Whole Cleaned",
    "Curry Cut",
    "With Skin",
    "Skinless",
  ];
  const { goTo } = useNavigate()

  // Multi-variant package list state (Supports the 500g / 1kg dynamic rows)
  const [variants, setVariants] = useState<ProductVariant[]>([
    {
      weight: "500g",
      cleanedWeight: "~400g - 450g",
      originalPrice: 800,
      sellingPrice: 700,
      discountPercent: 12,
    },
  ]);

  // Handle incoming selected images via dropzone input
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selectedFiles = Array.from(e.target.files);

    const newAssets: ImageAsset[] = selectedFiles.map((file) => ({
      id: crypto.randomUUID(), // unique runtime ID for reliable filtering
      file,
      previewUrl: URL.createObjectURL(file), // temporary local blob path
    }));

    setImages((prev) => [...prev, ...newAssets]);

    // Reset input value to allow uploading the same file if deleted and re-added
    e.target.value = "";
  };

  // Remove a specific image from state array and revoke its object URL
  const handleRemoveImage = (id: string, previewUrl: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
    URL.revokeObjectURL(previewUrl); // clean up browser memory leak
  };

  // Utility to auto-compute discount if original and selling price alter
  const calculateDiscount = (original: number, selling: number): number => {
    if (!original || original <= 0) return 0;
    const deduction = original - selling;
    return Math.round((deduction / original) * 100);
  };

  const handleVariantChange = (
    index: number,
    field: keyof ProductVariant,
    value: any,
  ) => {
    setVariants((prev) => {
      const updated = [...prev];
      if (field === "originalPrice" || field === "sellingPrice") {
        const numVal = Number(value) || 0;
        updated[index] = { ...updated[index], [field]: numVal };
        const orig =
          field === "originalPrice" ? numVal : updated[index].originalPrice;
        const sell =
          field === "sellingPrice" ? numVal : updated[index].sellingPrice;
        updated[index].discountPercent = calculateDiscount(orig, sell);
      } else {
        updated[index] = { ...updated[index], [field]: value };
      }
      return updated;
    });
  };

  const addVariantRow = () => {
    setVariants([
      ...variants,
      {
        weight: "",
        cleanedWeight: "",
        originalPrice: 0,
        sellingPrice: 0,
        discountPercent: 0,
      },
    ]);
  };

  const removeVariantRow = (index: number) => {
    if (variants.length === 1) return;
    setVariants(variants.filter((_, i) => i !== index));
  };

  const toggleCut = (cut: string) => {
    setAvailableCuts((prev) =>
      prev.includes(cut) ? prev.filter((c) => c !== cut) : [...prev, cut],
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Hello form api call");
    setIsSubmitting(true);

    try {
      const productPayload = {
        name,
        category,
        description,
        stockStatus,
        badgeType,
        availableCuts,
        variants,
        rawImageFiles: images.map((img) => img.file),
      };
      const { data } = await addProductService(productPayload);
      console.log("data --->>>", data)
      if (data) {
        successToast("Product created successfully!");
        goTo("/admin/products")
      } else {
        warningToast("Failed to create product");
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  console.log("images --->>", images);

  return (
    <div className="min-h-screen bg-[#F8F9FC] p-6 sm:p-8 font-sans antialiased text-slate-600">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* NAV BACK BAR HEAD */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="p-2 bg-white border border-slate-200 text-slate-500 hover:text-slate-800 rounded-xl transition-colors cursor-pointer shadow-3xs"
            >
              <ArrowLeft size={16} />
            </button>
            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Products Manager
              </span>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">
                Add New Product
              </h1>
            </div>
          </div>
        </div>

        {/* COMPREHENSIVE FORM CONTAINER */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-12 gap-6"
        >
          {/* LEFT CONTAINER LAYER: CORE INVENTORY DEFINITIONS */}
          <div className="md:col-span-8 space-y-6">
            {/* CARD BLOCK 1: PRIMARY INFO */}
            <div className="bg-white rounded-2xl border border-slate-200/70 shadow-2xs p-6 space-y-4">
              <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
                Primary Details
              </h2>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                  Product Title / Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Premium White Pomfret (Paplet) - Sea Fresh"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-600/10 focus:border-indigo-600 transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                    Category Group
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-indigo-600/10 focus:border-indigo-600 transition-all"
                  >
                    <option value="Fresh Fish">Fresh Fish</option>
                    <option value="Seafood & Shellfish">
                      Seafood & Shellfish
                    </option>
                    <option value="Prawns & Shrimps">Prawns & Shrimps</option>
                    <option value="Signature Masalas">Signature Masalas</option>
                    <option value="Ready to Cook">Ready to Cook</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                    Premium Badge Placement
                  </label>
                  <select
                    value={badgeType}
                    onChange={(e) => setBadgeType(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-xs text-slate-700 focus:outline-hidden focus:ring-2 focus:ring-indigo-600/10 focus:border-indigo-600 transition-all"
                  >
                    <option value="None">No Promotional Tag</option>
                    <option value="Premium Catch">Premium Catch ✨</option>
                    <option value="Fishlo Freshness Control">
                      Fishlo Freshness Control ✅
                    </option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                  Product Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe seafood origin, textures, flavor profile, or standard cooking compatibility recommendations..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-600/10 focus:border-indigo-600 transition-all resize-none"
                />
              </div>
            </div>

            {/* CARD BLOCK 2: PRICING MATRIX & WEIGHT CONFIGURATOR */}
            <div className="bg-white rounded-2xl border border-slate-200/70 shadow-2xs p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h2 className="text-sm font-bold text-slate-900">
                  Pricing & Weight Packs
                </h2>
                <button
                  type="button"
                  onClick={addVariantRow}
                  className="flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer"
                >
                  <Plus size={14} /> Add Weight Tier
                </button>
              </div>

              <div className="space-y-4 divide-y divide-slate-100">
                {variants.map((variant, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-3 first:pt-0 items-end"
                  >
                    <div className="sm:col-span-2 space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase">
                        Pack Size
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="500g"
                        value={variant.weight}
                        onChange={(e) =>
                          handleVariantChange(index, "weight", e.target.value)
                        }
                        className="w-full border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:border-indigo-500 focus:outline-hidden"
                      />
                    </div>

                    <div className="sm:col-span-3 space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase">
                        Gross Cleaned Yield
                      </label>
                      <input
                        type="text"
                        placeholder="~400g - 450g"
                        value={variant.cleanedWeight}
                        onChange={(e) =>
                          handleVariantChange(
                            index,
                            "cleanedWeight",
                            e.target.value,
                          )
                        }
                        className="w-full border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:border-indigo-500 focus:outline-hidden"
                      />
                    </div>

                    <div className="sm:col-span-2 space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase">
                        Original (₹)
                      </label>
                      <input
                        type="number"
                        required
                        placeholder="800"
                        value={variant.originalPrice || ""}
                        onChange={(e) =>
                          handleVariantChange(
                            index,
                            "originalPrice",
                            e.target.value,
                          )
                        }
                        className="w-full border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:border-indigo-500 focus:outline-hidden"
                      />
                    </div>

                    <div className="sm:col-span-2 space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase">
                        Selling (₹)
                      </label>
                      <input
                        type="number"
                        required
                        placeholder="700"
                        value={variant.sellingPrice || ""}
                        onChange={(e) =>
                          handleVariantChange(
                            index,
                            "sellingPrice",
                            e.target.value,
                          )
                        }
                        className="w-full border border-slate-200 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 focus:border-indigo-500 focus:outline-hidden"
                      />
                    </div>

                    <div className="sm:col-span-2 space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase">
                        Discount
                      </label>
                      <div className="w-full bg-slate-50 border border-slate-150 rounded-lg px-2.5 py-1.5 text-xs font-bold text-emerald-600 text-center select-none">
                        {variant.discountPercent}% off
                      </div>
                    </div>

                    <div className="sm:col-span-1 text-center pb-1">
                      <button
                        type="button"
                        disabled={variants.length === 1}
                        onClick={() => removeVariantRow(index)}
                        className="p-1.5 text-slate-400 hover:text-rose-500 disabled:opacity-30 disabled:hover:text-slate-400 rounded-md transition-colors cursor-pointer"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CARD BLOCK 3: PREPARATION CONFIGURATION CUTS */}
            <div className="bg-white rounded-2xl border border-slate-200/70 shadow-2xs p-6 space-y-3">
              <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
                Available Preparation Cuts
              </h2>
              <p className="text-[11px] text-slate-400 font-medium">
                Select which specialized seafood cutting variations customers
                can choose from for this specific fish item.
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {cutOptions.map((cut) => {
                  const isSelected = availableCuts.includes(cut);
                  return (
                    <button
                      key={cut}
                      type="button"
                      onClick={() => toggleCut(cut)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold tracking-tight border transition-all cursor-pointer ${isSelected
                          ? "bg-indigo-50 border-indigo-300 text-indigo-600 shadow-3xs"
                          : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                        }`}
                    >
                      {cut}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT CONTAINER LAYER: METADATA CONTROLS & DYNAMIC MULTI-MEDIA UPLOADER */}
          <div className="md:col-span-4 space-y-6">
            {/* SIDE PANEL CARD 1: DYNAMIC ASSET IMAGE GALLERY GRID */}
            <div className="bg-white rounded-2xl border border-slate-200/70 shadow-2xs p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h2 className="text-sm font-bold text-slate-900">
                  Product Assets
                </h2>
                <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
                  {images.length} added
                </span>
              </div>

              {/* Dynamic Grid: Holds both the uploader interface card and your live preview elements */}
              <div className="grid grid-cols-2 gap-3">
                {/* INLINE PERSISTENT DROPZONE TRIGGER */}
                <div className="relative border-2 border-dashed border-slate-200 rounded-xl aspect-square flex flex-col items-center justify-center text-center hover:border-indigo-500/60 transition-colors group cursor-pointer bg-slate-50/40 p-2">
                  <input
                    type="file"
                    multiple
                    accept="image/png, image/jpeg"
                    onChange={handleImageUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className="flex flex-col items-center space-y-1">
                    <div className="w-8 h-8 rounded-full bg-white border border-slate-100 shadow-3xs flex items-center justify-center text-slate-400 group-hover:text-indigo-600 transition-colors">
                      <Upload size={14} />
                    </div>
                    <div className="text-[10px] font-bold text-slate-700">
                      Add Image
                    </div>
                  </div>
                </div>

                {/* LIVE PREVIEW CARDS WITH TARGETED REMOVE FUNCTIONALITY */}
                {images.map((img) => (
                  <div
                    key={img.id}
                    className="relative rounded-xl border border-slate-200 aspect-square overflow-hidden bg-slate-50 group/preview shadow-3xs"
                  >
                    <img
                      src={img.previewUrl}
                      alt="Uploaded preview"
                      className="w-full h-full object-cover"
                    />

                    {/* Dark overlay showing actionable quick-remove button */}
                    <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover/preview:opacity-100 transition-opacity flex items-center justify-center z-20">
                      <button
                        type="button"
                        onClick={() =>
                          handleRemoveImage(img.id, img.previewUrl)
                        }
                        className="p-1.5 bg-white/90 hover:bg-white text-rose-600 rounded-lg shadow-xs transition-colors cursor-pointer transform scale-90 group-hover/preview:scale-100 duration-150"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <span className="text-[10px] text-slate-400 block font-medium mt-1 leading-normal">
                Supports multiple PNG or JPEG assets. Click any overlay to
                delete.
              </span>
            </div>

            {/* SIDE PANEL CARD 2: STATUS CONTROL BOX */}
            <div className="bg-white rounded-2xl border border-slate-200/70 shadow-2xs p-6 space-y-4">
              <h2 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
                Inventory Management
              </h2>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wide block">
                  Stock Status
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setStockStatus("In Stock")}
                    className={`py-2 text-xs font-bold rounded-xl border text-center transition-all cursor-pointer ${stockStatus === "In Stock"
                        ? "bg-emerald-50 border-emerald-300 text-emerald-600 shadow-3xs"
                        : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50"
                      }`}
                  >
                    In Stock
                  </button>
                  <button
                    type="button"
                    onClick={() => setStockStatus("Out Of Stock")}
                    className={`py-2 text-xs font-bold rounded-xl border text-center transition-all cursor-pointer ${stockStatus === "Out Of Stock"
                        ? "bg-rose-50 border-rose-300 text-rose-600 shadow-3xs"
                        : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50"
                      }`}
                  >
                    Out of Stock
                  </button>
                </div>
              </div>
            </div>

            {/* FORM SUBMIT ACTION FOOTER */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-[#F15A4A] hover:bg-[#db4f40] text-white font-bold text-xs py-3 rounded-xl shadow-xs transition-colors uppercase tracking-wider text-center flex items-center justify-center gap-2 cursor-pointer"
              >
                <Save size={15} />
                Save New Product
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Index;
