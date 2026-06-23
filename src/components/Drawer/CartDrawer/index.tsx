"use client";

import React, { useState, useEffect } from "react";
import { X, Minus, Plus, Zap } from "lucide-react";
import Image from "next/image";
import MakePayment from "@/src/components/MakePayment";
import { updateCartService } from "@/src/services/product/client";

// Interfaces adjusted to match your exact JSON structure
interface CartItem {
  id: string;
  productId: string;
  variantId: string;
  quantity: number;
  productName: string;
  category: string;
  unitPrice: number;
  weight: string;
  totalPrice: number;
  images?: {
    name: string;
    originalName: string;
  }[];
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const [makePaymentModalData, setMakePaymentModalData] = useState<any>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // 1. Fixed data extraction from your API array structure
  const fetchCartItems = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/cart/get");
      const result = await response.json();

      console.log("API result", result);
      
      if (result.success && result.data && result.data.length > 0) {
        // Target the items array belonging to the first returned cart document
        setCartItems(result.data[0].items || []);
      } else {
        setCartItems([]);
      }
    } catch (error) {
      console.error("Failed to load backend cart data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchCartItems();
    }
  }, [isOpen]);

  // 2. Persistent Quantity Handler (Matches your structural fields)
  const updateQuantity = async (item: CartItem, delta: number) => {
    const currentQty = item.quantity;
    const targetQty = currentQty + delta;

    if (targetQty <= 0) {
      setCartItems((prev) => prev.filter((i) => i.id !== item.id));
    } else {
      setCartItems((prev) =>
        prev.map((i) => (i.id === item.id ? { ...i, quantity: targetQty } : i))
      );
    }

    try {
      await updateCartService({
        productId: item.productId,
        variantId: item.variantId,
        quantity: targetQty,
      });
    } catch (error) {
      console.error("Failed to sync cart item update:", error);
      fetchCartItems(); // Revert to database state on failure
    }
  };

  // 3. Persistent item removal trigger
  const removeItem = async (item: CartItem) => {
    setCartItems((prev) => prev.filter((i) => i.id !== item.id));

    try {
      await updateCartService({
        productId: item.productId,
        variantId: item.variantId,
        quantity: 0,
      });
    } catch (error) {
      console.error("Failed to delete cart item:", error);
      fetchCartItems();
    }
  };

  const closeMakePaymentModal = () => {
    setMakePaymentModalData(null);
  };

  // Safe programmatic total aggregation from unitPrice properties
  const totalPrice = cartItems.reduce((acc, item) => {
    return acc + (item.unitPrice || 0) * item.quantity;
  }, 0);

  const procidToCheckOut = () => {
    setMakePaymentModalData({
      title: "#L2KS2K9SDF",
      amount: totalPrice,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans antialiased">
      {/* Dynamic Backdrop dim veil overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        {/* DRAWER CONTAINER */}
        <div className="w-screen max-w-md bg-white flex flex-col justify-between shadow-2xl rounded-l-2xl animate-in slide-in-from-right duration-300">
          
          {/* TOP DRAWER HEADER FRAME */}
          <div className="p-4 border-b border-stone-100/80">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-800 tracking-tight">My cart</h2>
              <button
                onClick={onClose}
                className="p-1 rounded-md bg-[#fee2e2] text-[#f43f5e] hover:bg-[#fecdd3] transition-colors"
                aria-label="Close cart"
              >
                <X size={15} strokeWidth={2.5} />
              </button>
            </div>

            {/* Delivery Promise Timeline Pill */}
            <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-500 mt-1.5">
              <Zap size={12} className="fill-amber-500 text-amber-500" />
              <span>Today 12PM - 1PM</span>
            </div>
          </div>

          {/* INNER SCROLLABLE WORKSPACE AREA */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
            
            {/* 20% OFF BANNER STRIP PROMO */}
            <div className="relative w-full aspect-[4.2/1] rounded-xl overflow-hidden bg-gradient-to-r from-[#d8b4fe] to-[#c084fc] p-3 flex flex-col justify-between shadow-xs text-purple-900 select-none">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-xl font-black italic tracking-tighter leading-none text-purple-950">20% OFF</div>
                  <div className="text-[10px] font-bold uppercase tracking-wider mt-0.5 text-purple-800">+ FREE DELIVERY</div>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-xs">🐟</div>
              </div>
              <span className="text-[9px] font-semibold tracking-tight text-purple-950/80">*on your first order</span>
            </div>

            {/* INTERACTIVE CART SELECTION LIST ITEMS */}
            <div className="space-y-4">
              {loading && cartItems.length === 0 ? (
                <div className="text-center py-12 text-xs font-medium text-stone-400">
                  Syncing your cart items...
                </div>
              ) : cartItems.length === 0 ? (
                <div className="text-center py-12 text-xs font-medium text-stone-400">
                  Your cart is empty.
                </div>
              ) : (
                cartItems.map((item) => {
                  const unitPrice = item.unitPrice || 0;
                  const weightLabel = item.weight ? ` (${item.weight})` : "";
                  
                  // Extract product image dynamically or fallback to Unsplash placeholder safely
                  const imageSrc = item.images && item.images[0]?.name
                    ? `/uploads/${item.images[0].name}`
                    : "https://images.unsplash.com/photo-1544025162-d76694265947?w=500&auto=format&fit=crop&q=60";

                  return (
                    <div key={item.id} className="relative flex gap-3 pb-3 border-b border-stone-100">
                      
                      {/* Thumbnail Container Element */}
                      <div className="relative w-16 h-12 bg-stone-100 border border-stone-200/60 rounded-lg overflow-hidden shrink-0 flex items-center justify-center">
                        <Image 
                          src={imageSrc} 
                          alt={item.productName} 
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </div>

                      {/* Descriptions block row */}
                      <div className="flex-1 min-w-0 pr-4">
                        <h3 className="text-xs font-bold text-slate-800 leading-tight truncate">
                          {item.productName}
                        </h3>
                        <span className="block text-[11px] text-stone-400 font-medium mt-0.5">
                          ৳{unitPrice} × {item.quantity}{weightLabel}
                        </span>

                        {/* Quantity Selector Stepper Element Row */}
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center border border-stone-200 rounded-md bg-stone-50/50">
                            <button
                              onClick={() => updateQuantity(item, -1)}
                              className="px-2 py-1 text-stone-500 hover:text-stone-800 hover:bg-stone-100 transition-colors"
                            >
                              <Minus size={10} strokeWidth={2.5} />
                            </button>
                            <span className="px-2 text-xs font-bold text-slate-700 min-w-[16px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item, 1)}
                              className="px-2 py-1 text-stone-500 hover:text-stone-800 hover:bg-stone-100 transition-colors"
                            >
                              <Plus size={10} strokeWidth={2.5} />
                            </button>
                          </div>

                          {/* Sub-Aggregated Line Item Total Value */}
                          <span className="text-xs font-bold text-slate-800">
                            ৳{unitPrice * item.quantity}
                          </span>
                        </div>
                      </div>

                      {/* Remove cross trigger handle */}
                      <button
                        onClick={() => removeItem(item)}
                        className="absolute top-0 right-0 p-0.5 rounded-full bg-stone-100 text-stone-400 hover:text-stone-600 transition-colors"
                        aria-label="Remove item"
                      >
                        <X size={11} strokeWidth={2.5} />
                      </button>
                    </div>
                  );
                })
              )}
            </div>

            {/* SUB-TOTAL INNER CALCULATOR BOX SUMMARY */}
            {cartItems.length > 0 && (
              <div className="flex items-center justify-between pt-2 border-t border-dashed border-stone-200 text-sm">
                <span className="font-bold text-slate-600">Total :</span>
                <span className="font-extrabold text-slate-800">৳{totalPrice}</span>
              </div>
            )}
          </div>

          {/* STICKY BOTTOM ACTIONS FOOTER ATTACHMENT */}
          <div className="border-t border-stone-100 bg-stone-50/80 p-3 grid grid-cols-12 items-center gap-3">
            <div className="col-span-5 pl-1">
              <span className="block text-[10px] text-stone-400 font-bold uppercase tracking-wider">Total</span>
              <span className="text-sm font-black text-slate-800">৳{totalPrice}</span>
            </div>

            {/* Action Trigger Button */}
            <button
              disabled={cartItems.length === 0 || loading}
              className="col-span-7 w-full bg-[#d6685e] hover:bg-[#cc5b51] disabled:bg-stone-300 text-white font-bold text-xs py-3 rounded-lg shadow-sm transition-colors uppercase tracking-wider text-center"
              onClick={procidToCheckOut}
            >
              Proceed to Checkout
            </button>
          </div>

        </div>
      </div>
      <MakePayment modalData={makePaymentModalData} closeModal={closeMakePaymentModal} />
    </div>
  );
}