"use client";

import React, { useState } from "react";
import { X, Minus, Plus, Zap } from "lucide-react";

interface CartItem {
  id: number;
  title: string;
  subtitle: string;
  pricePerUnit: number;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  // Populate exactly with the 4 items shown in your screenshot
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      title: "Marinated White Pomfret (Whole, Silt Cut) | Ready T...",
      subtitle: "₹349 × 2",
      pricePerUnit: 349,
      quantity: 2,
    },
    {
      id: 2,
      title: "Authentic Surmai Fish Fry - (Seer Fish Steak) - Rea...",
      subtitle: "₹289 × 3",
      pricePerUnit: 289,
      quantity: 3,
    },
    {
      id: 3,
      title: "Fresh Marinated Seer Fish | Surmai Slices (Ready T...",
      subtitle: "₹399 × 1",
      pricePerUnit: 399,
      quantity: 1,
    },
    {
      id: 4,
      title: "Fishlo Signature Fish Fry Masala - Spicy - 100g",
      subtitle: "₹65 × 1",
      pricePerUnit: 65,
      quantity: 1,
    },
  ]);

  if (!isOpen) return null;

  // Quantity updates handler
  const updateQuantity = (id: number, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty, subtitle: `₹${item.pricePerUnit} × ${newQty}` } : item;
          }
          return item;
        })
    );
  };

  // Remove individual item handler
  const removeItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Dynamic calculations matches screenshot subtotal exactly (₹2029)
  const totalPrice = cartItems.reduce((acc, item) => acc + item.pricePerUnit * item.quantity, 0);

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
                {/* Minimal illustration marker to match screenshot banner */}
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-xs">🐟</div>
              </div>
              <span className="text-[9px] font-semibold tracking-tight text-purple-950/80">*on your first order</span>
            </div>

            {/* INTERACTIVE CART SELECTION LIST ITEMS */}
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="relative flex gap-3 pb-3 border-b border-stone-100">
                  
                  {/* Thumbnail Container placeholder */}
                  <div className="w-16 h-12 bg-stone-100 border border-stone-200/60 rounded-lg overflow-hidden shrink-0 flex items-center justify-center">
                    <span className="text-[9px] font-bold text-stone-400">Fresh</span>
                  </div>

                  {/* Descriptions block row */}
                  <div className="flex-1 min-w-0 pr-4">
                    <h3 className="text-xs font-bold text-slate-800 leading-tight truncate">
                      {item.title}
                    </h3>
                    <span className="block text-[11px] text-stone-400 font-medium mt-0.5">
                      {item.subtitle}
                    </span>

                    {/* Quantity Selector Stepper Element Row */}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-stone-200 rounded-md bg-stone-50/50">
                        <button 
                          onClick={() => updateQuantity(item.id, -1)}
                          className="px-2 py-1 text-stone-500 hover:text-stone-800 hover:bg-stone-100 transition-colors"
                        >
                          <Minus size={10} strokeWidth={2.5} />
                        </button>
                        <span className="px-2 text-xs font-bold text-slate-700 min-w-[16px] text-center">
                          {item.quantity}
                        </span>
                        <button 
                          onClick={() => updateQuantity(item.id, 1)}
                          className="px-2 py-1 text-stone-500 hover:text-stone-800 hover:bg-stone-100 transition-colors"
                        >
                          <Plus size={10} strokeWidth={2.5} />
                        </button>
                      </div>
                      
                      {/* Sub-Aggregated Line Item Total Value */}
                      <span className="text-xs font-bold text-slate-800">
                        ₹{item.pricePerUnit * item.quantity}
                      </span>
                    </div>
                  </div>

                  {/* Remove cross trigger handle */}
                  <button 
                    onClick={() => removeItem(item.id)}
                    className="absolute top-0 right-0 p-0.5 rounded-full bg-stone-100 text-stone-400 hover:text-stone-600 transition-colors"
                    aria-label="Remove item"
                  >
                    <X size={11} strokeWidth={2.5} />
                  </button>

                </div>
              ))}
            </div>

            {/* SUB-TOTAL INNER CALCULATOR BOX SUMMARY */}
            {cartItems.length > 0 && (
              <div className="flex items-center justify-between pt-2 border-t border-dashed border-stone-200 text-sm">
                <span className="font-bold text-slate-600">Total :</span>
                <span className="font-extrabold text-slate-800">₹{totalPrice}</span>
              </div>
            )}
          </div>

          {/* STICKY BOTTOM ACTIONS FOOTER ATTACHMENT */}
          <div className="border-t border-stone-100 bg-stone-50/80 p-3 grid grid-cols-12 items-center gap-3">
            <div className="col-span-5 pl-1">
              <span className="block text-[10px] text-stone-400 font-bold uppercase tracking-wider">Total</span>
              <span className="text-sm font-black text-slate-800">₹{totalPrice}</span>
            </div>
            
            {/* Action Trigger Button */}
            <button 
              disabled={cartItems.length === 0}
              className="col-span-7 w-full bg-[#d6685e] hover:bg-[#cc5b51] disabled:bg-stone-300 text-white font-bold text-xs py-3 rounded-lg shadow-sm transition-colors uppercase tracking-wider text-center"
            >
              Proceed to Checkout
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}