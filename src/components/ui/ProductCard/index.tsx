import React from "react";
import { getProductUrl } from "@/src/utils";
import { Bell, Minus, Plus } from "lucide-react";
import Image from "next/image";
import { ProductItem } from "@/src/types/product";
import { updateCartService } from "@/src/services/product/client";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/src/store/client/store";
import { setCart, updateResyncing } from "@/src/store/client/cartSlice";
import { useNavigate } from "@/src/hooks/useNavigate";
import { updateSingleProduct } from "@/src/store/client/productSlice";

const Index = ({ product }: any) => {
  const activeVariant = product.variants?.[0];
  const originalPrice = activeVariant ? activeVariant.originalPrice : 0;
  const sellingPrice = activeVariant ? activeVariant.sellingPrice : 0;
  const discountPercent = activeVariant ? activeVariant.discountPercent : 0;
  const weightLabel = activeVariant ? `/${activeVariant.weight}` : "";
  const isOutOfStock = product.stockStatus !== "In Stock";
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const { goTo } = useNavigate(); 

  const handleQuantityAdjustment = async (
    product: ProductItem,
    delta: number,
  ) => {
    const activeVariant = product.variants?.[0];
    if (!activeVariant) {
      alert(
        "This item does not have an active variant option configuration configured.",
      );
      return;
    }

    const currentQty = product.cartItemCount;
    const targetQty = Math.max(0, currentQty + delta);
    const updateProduct = { ...product, cartItemCount: targetQty || 0 };
    dispatch(updateSingleProduct(updateProduct));
    
    try {
      await updateCartService({
        productId: product.id,
        variantId: activeVariant.id,
        quantity: targetQty,
      });
      let newCartItem = true;
      let updateCartItems = [];
      if (targetQty > 0) {
        updateCartItems = await cartItems.map((cartItem: any) => {
          if (cartItem.productId === product.id) {
            newCartItem = false;
            return { ...cartItem, quantity: targetQty };
          }

          return { ...cartItem };
        });
      } else {
        updateCartItems = await cartItems.filter((cartItem: any) => {
          if (cartItem.productId === product.id) {
            newCartItem = false;
          }
          return cartItem.productId !== product.id;
        });
      }
      console.log("newCartItem -->>>", newCartItem);
      if (newCartItem) {
        dispatch(updateResyncing());
      } else {
        dispatch(setCart(updateCartItems));
      }
    } catch (error) {}
  };

  return (
    <div
      // key={product.id}
      className="bg-white border border-dashed border-slate-200 rounded-2xl p-3 flex flex-col justify-between transition-shadow duration-300 hover:shadow-md"
    >
      <div className="relative w-full h-40 rounded-xl overflow-hidden bg-slate-50 group">
        <Image
          src={getProductUrl(product.images)}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, 220px"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {product.badgeType && product.badgeType !== "None" && !isOutOfStock && (
          <span className="absolute top-2 left-2 text-[9px] font-bold tracking-wide uppercase bg-amber-500 text-white px-2 py-0.5 rounded-md shadow-sm">
            {product.badgeType}
          </span>
        )}

        {isOutOfStock && (
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[0.5px] flex items-start justify-center pt-2">
            <span className="text-[10px] tracking-wider uppercase font-semibold text-white bg-black/60 px-6 py-1 rounded-sm">
              OUT OF STOCK
            </span>
          </div>
        )}

        {!isOutOfStock && (
          <div className="absolute bottom-2 right-2 z-10">
            {!product.cartItemCount ? (
              <button
                onClick={() => handleQuantityAdjustment(product, 1)}
                className="w-7 h-7 flex items-center justify-center bg-white rounded-lg shadow-md text-rose-500 font-bold hover:bg-rose-50 transition-colors border border-slate-100"
              >
                <Plus size={16} strokeWidth={3} />
              </button>
            ) : (
              <div className="flex items-center gap-2.5 bg-rose-500 text-white px-2 py-1 rounded-lg shadow-md text-xs font-semibold">
                <button
                  onClick={() => handleQuantityAdjustment(product, -1)}
                  className="hover:opacity-80"
                >
                  <Minus size={12} strokeWidth={3} />
                </button>
                <span>{product.cartItemCount}</span>
                <button
                  onClick={() => handleQuantityAdjustment(product, 1)}
                  className="hover:opacity-80"
                >
                  <Plus size={12} strokeWidth={3} />
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex-1 flex flex-col justify-between mt-3">
        <div>
          <h3
            className="text-xs font-semibold text-slate-700 line-clamp-2 h-8 leading-tight"
            onClick={() => goTo(`/product/${product.id}`)}
          >
            {product.name}
          </h3>
          <span className="text-[10px] text-slate-400 font-medium block mt-1">
            {product.category}{" "}
            {activeVariant?.cleanedWeight
              ? `| ${activeVariant.cleanedWeight}`
              : ""}
          </span>
        </div>

        <div>
          <div className="flex items-center gap-1 mt-2 flex-wrap">
            <span className="text-sm font-bold text-slate-800">
              ৳{sellingPrice}
            </span>
            {weightLabel && (
              <span className="text-[11px] text-slate-400">{weightLabel}</span>
            )}
            {originalPrice > sellingPrice && (
              <>
                <span className="text-[11px] text-slate-300 line-through">
                  ৳{originalPrice}
                </span>
                <span className="text-[11px] font-bold text-emerald-600 ml-auto">
                  {discountPercent}% off
                </span>
              </>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-dotted border-slate-100">
            {isOutOfStock ? (
              <div className="flex items-center justify-between gap-1">
                <span className="text-[10px] text-slate-400 leading-tight">
                  Get notified when available
                </span>
                <button className="flex items-center gap-1 border border-rose-200 text-rose-500 text-[11px] font-medium px-2.5 py-1 rounded-md bg-rose-50/40 hover:bg-rose-50 transition-colors">
                  Notify <Bell size={10} className="fill-rose-500" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-1 text-amber-600 font-medium text-[10px]">
                <span>⚡</span>
                <span>Available for Express Delivery</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Index;
