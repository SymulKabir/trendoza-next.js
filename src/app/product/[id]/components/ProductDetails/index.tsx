"use client";
import React, { useState, useEffect } from "react";
import {
  ShieldCheck,
  CheckCircle2,
  Bell,
  Sparkles,
  Scale,
  Leaf,
  Lightbulb,
} from "lucide-react";
import ImagePreview from "@/src/app/product/[id]/components/ImagePreview"
import { fetchProductByIdService } from "@/src/services/product/client";
import { getProductUrl } from "@/src/utils";

const ProductDetails = ({ productId }: { productId: string }) => {
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedWeight, setSelectedWeight] = useState<any>(null);
  const [selectedCut, setSelectedCut] = useState<string>("whole");

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        const data = await fetchProductByIdService(productId);
        setProduct(data);
        // Set default variant if available
        if (data.variants?.length > 0) setSelectedWeight(data.variants[0]);
      } catch (err) {
        setError("Could not load product details.");
      } finally {
        setLoading(false);
      }
    };
    if (productId) loadProduct();
  }, [productId]);

  if (loading)
    return <div className="py-20 text-center">Loading product details...</div>;
  if (error || !product)
    return (
      <div className="py-20 text-center text-rose-500">
        {error || "Product not found"}
      </div>
    );
 

  return (
    <div className="w-full min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8 font-sans antialiased">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-4 space-y-4">
         {false && <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-stone-100 shadow-sm border border-stone-100">
            {/* Product Image */}
            {product.images ? (
              <img
                src={getProductUrl(product.images)}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-tr from-stone-200 to-stone-50 flex flex-col items-center justify-center text-center p-4">
                <span className="text-stone-400 font-medium text-sm">
                  No Image Available
                </span>
              </div>
            )}

            {/* Navigational Slider Caret Right (Visible only if there are multiple images) */}
            <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm w-8 h-8 rounded-full flex items-center justify-center text-white transition-colors">
              &#10095;
            </button>
          </div>}

          <ImagePreview  product={product} />
        </div>

        {/* MIDDLE COLUMN: PRODUCT CONFIGURATOR */}
        <div className="lg:col-span-4 space-y-6">
          {/* Freshness Badge */}
          <div className="flex items-center gap-1.5 text-[#10b981] font-semibold text-xs tracking-wide">
            <ShieldCheck size={14} strokeWidth={2.5} />
            <span>Fishlo Freshness Control</span>
          </div>

          {/* Product Title Heading */}
          <div className="space-y-2">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-800 leading-snug">
              {product.name}
            </h1>
            <p className="text-xs text-slate-500 leading-relaxed">
              {product?.description}
            </p>
          </div>

          {/* Availability Status */}
          <div className="text-right">
            <span className="text-[11px] font-bold text-[#10b981] tracking-wider bg-emerald-50 px-2.5 py-0.5 rounded-full">
              IN STOCK
            </span>
          </div>

          {/* Weight Tier Configuration Options */}
          <div className="space-y-3">
            {/* Option: 500g */}
            {!!product?.variants?.length &&
              product.variants.map((variant: any, index: number) => {
                console.log("variant --->>>", variant);
                return (
                  <div
                    key={index}
                    onClick={() => setSelectedWeight(variant.weight)}
                    className={`relative flex items-center justify-between p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                      selectedWeight === variant.weight
                        ? "border-[#10b981] bg-[#f0fdf4]/40"
                        : "border-slate-200 bg-white hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative flex items-center justify-center">
                        {selectedWeight === variant.weight ? (
                          <CheckCircle2
                            size={18}
                            className="text-[#10b981] fill-[#10b981]/10"
                          />
                        ) : (
                          <div className="w-[18px] h-[18px] rounded-full border-2 border-slate-300" />
                        )}
                      </div>
                      <div>
                        <span className="block font-bold text-sm text-slate-800">
                          {variant.weight}
                        </span>
                        <span className="block text-[11px] text-slate-400 mt-0.5">
                          After cleaning {variant.cleanedWeight}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="block text-xs line-through text-slate-400 font-medium">
                        {`₹${variant.originalPrice}`}
                      </span>
                      <span className="text-base font-bold text-slate-800">
                        {`₹${variant.sellingPrice}`}
                        <span className="text-xs text-rose-500 font-semibold ml-0.5">
                          {`${variant.discountPercent}% off`}
                        </span>
                      </span>
                    </div>
                  </div>
                );
              })}
          </div>

          {/* Cooking Cut Styles Layout Selection */}
          {!!product?.availableCuts?.length && (
            <div className="space-y-2">
              <div className="grid grid-cols-3 gap-3">
                {product.availableCuts?.map((cut) => (
                  <div
                    key={cut}
                    onClick={() => setSelectedCut(cut as any)}
                    className={`cursor-pointer rounded-lg p-1 text-center transition-all ${
                      selectedCut === cut
                        ? "ring-2 ring-slate-800 ring-offset-1"
                        : "opacity-80 hover:opacity-100"
                    }`}
                  >
                    <div className="aspect-video w-full bg-stone-100 rounded-md mb-1.5 flex items-center justify-center text-[10px] text-stone-400 font-medium border border-stone-200/60">
                      {cut} Box
                    </div>
                    <span className="text-[11px] font-bold text-slate-700 tracking-tight">
                      {cut}

                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Stock Alert Warning Label & Interface elements */}
          <div className="space-y-3 pt-2">
            <div className="text-xs font-bold text-rose-500 tracking-wide">
              OUT OF STOCK
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-medium text-slate-500">
                Get notified when available
              </label>
              <button className="flex items-center gap-1.5 px-4 py-2 border border-rose-400 rounded-lg text-xs font-semibold text-rose-500 hover:bg-rose-50/50 transition-colors">
                Notify
                <Bell size={13} className="fill-current" />
              </button>
            </div>
          </div>

          {/* Offer & Promo Code Banner Strip */}
          <div className="bg-[#e6f7f0] border border-[#a3e4cd] rounded-xl p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
            <div>
              <div className="flex items-center gap-1 text-xs font-bold text-slate-800">
                <span>🎉 Get 20% OFF upto INR 200 + Free Delivery</span>
              </div>
              <span className="block text-[10px] text-slate-500 mt-0.5">
                *On your first order.
              </span>
            </div>
            <div className="bg-[#0f7654] text-white font-mono text-[11px] font-bold px-3 py-1.5 rounded-lg select-all cursor-pointer whitespace-nowrap tracking-wider">
              Code: FISHLO
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: USP MARKETING INFOCARD */}
        <div className="lg:col-span-4">
          <div className="bg-gradient-to-b from-[#fdf2f0] to-white rounded-2xl p-5 border border-[#fae4e1]/70 shadow-sm space-y-5">
            {/* Header Badge Cluster */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-rose-100/50 pb-4">
              <div className="flex items-center gap-1 bg-white/80 backdrop-blur-sm border border-rose-200/50 px-2.5 py-1 rounded-full text-[10px] font-bold text-rose-600 shadow-2xs">
                <Sparkles size={11} className="fill-current" />
                <span>Premium Catch</span>
              </div>
              <div className="flex items-center gap-1 bg-white/80 backdrop-blur-sm border border-emerald-200/50 px-2.5 py-1 rounded-full text-[10px] font-bold text-[#10b981] shadow-2xs">
                <ShieldCheck size={11} />
                <span>{product?.category}</span>
              </div>
            </div>

            {/* Main Value Title */}
            <div className="space-y-1">
              <h3 className="font-extrabold text-slate-800 text-base tracking-tight">
                Why Choose Fishlo?
              </h3>
              <p className="text-xs text-slate-500">
                Premium seafood, handled with precision and care.
              </p>
            </div>

            {/* List of Value Points */}
            <div className="space-y-3.5">
              {/* USP Point 1 */}
              <div className="bg-white/70 rounded-xl p-3 border border-slate-100 flex gap-3">
                <div className="text-slate-600 mt-0.5 shrink-0">
                  <Scale size={15} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800 leading-tight">
                    Cleaned Weight Transparency
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-1 leading-normal">
                    Cleaning removes scales, guts, shell, or bones, so the final
                    edible weight varies by seafood type.
                  </p>
                </div>
              </div>

              {/* USP Point 2 */}
              <div className="bg-white/70 rounded-xl p-3 border border-slate-100 flex gap-3">
                <div className="text-slate-600 mt-0.5 shrink-0">
                  <Leaf size={15} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800 leading-tight">
                    Always Fresh, Never Compromised
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-1 leading-normal">
                    Handled with care to keep its natural flavour and texture
                    intact.
                  </p>
                </div>
              </div>

              {/* USP Point 3 (Did you know?) */}
              <div className="bg-[#fff5f4] rounded-xl p-3 border border-[#fee2e0] flex gap-3">
                <div className="text-rose-500 mt-0.5 shrink-0">
                  <Lightbulb size={15} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-rose-900 leading-tight">
                    Did you know?
                  </h4>
                  <p className="text-[11px] text-rose-700/90 mt-1 leading-normal">
                    No open-air exposure. No crowd handling. Just hygienic at
                    its peak.
                  </p>
                </div>
              </div>
            </div>

            {/* Subdued Bottom Verification Label */}
            <div className="text-center pt-2 text-[10px] text-slate-400 font-medium tracking-wide">
              ✦ Transparent pricing. Clean handling. No hidden surprises
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
