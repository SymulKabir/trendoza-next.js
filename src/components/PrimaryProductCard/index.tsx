'use client'

const Index = (product: any) => {
    return (
        <div
            key={product.id}
            className="bg-white border border-dashed border-slate-200 rounded-2xl p-3 flex flex-col justify-between transition-shadow duration-300 hover:shadow-md"
        >
            {/* Product Thumbnail Window */}
            <div className="relative w-full h-40 rounded-xl overflow-hidden bg-slate-50 group">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 220px"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* Out Of Stock Dark Banner */}
                {product.isOutOfStock && (
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[0.5px] flex items-start justify-center pt-2">
                        <span className="text-[10px] tracking-wider uppercase font-semibold text-white bg-black/60 px-6 py-1 rounded-sm">
                            OUT OF STOCK
                        </span>
                    </div>
                )}

                {/* Dynamic Cart Action Pill (Floating right over image) */}
                {!product.isOutOfStock && (
                    <div className="absolute bottom-2 right-2 z-10">
                        {qty === 0 ? (
                            <button
                                onClick={() => updateQty(product.id, 1)}
                                className="w-7 h-7 flex items-center justify-center bg-white rounded-lg shadow-md text-rose-500 font-bold hover:bg-rose-50 transition-colors border border-slate-100"
                            >
                                <Plus size={16} strokeWidth={3} />
                            </button>
                        ) : (
                            <div className="flex items-center gap-2.5 bg-rose-500 text-white px-2 py-1 rounded-lg shadow-md text-xs font-semibold">
                                <button onClick={() => updateQty(product.id, -1)} className="hover:opacity-80">
                                    <Minus size={12} strokeWidth={3} />
                                </button>
                                <span>{qty}</span>
                                <button onClick={() => updateQty(product.id, 1)} className="hover:opacity-80">
                                    <Plus size={12} strokeWidth={3} />
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Data Descriptions */}
            <div className="flex-1 flex flex-col justify-between mt-3">
                <div>
                    <h3 className="text-xs font-semibold text-slate-700 line-clamp-2 h-8 leading-tight">
                        {product.name}
                    </h3>

                    {/* Metadata string row (if available) */}
                    {product.meta && (
                        <span className="text-[10px] text-slate-400 font-medium block mt-1">
                            {product.meta}
                        </span>
                    )}
                </div>

                <div>
                    {/* Pricing Rows */}
                    <div className="flex items-center gap-1 mt-2 flex-wrap">
                        <span className="text-sm font-bold text-slate-800">
                            ₹{product.price}
                        </span>
                        {product.weightLabel && (
                            <span className="text-[11px] text-slate-400">
                                {product.weightLabel}
                            </span>
                        )}
                        <span className="text-[11px] text-slate-300 line-through">
                            ₹{product.originalPrice}
                        </span>
                        <span className="text-[11px] font-bold text-emerald-600 ml-auto">
                            {product.discount}% off
                        </span>
                    </div>

                    {/* Bottom Footer Section */}
                    <div className="mt-4 pt-3 border-t border-dotted border-slate-100">
                        {product.isOutOfStock ? (
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
                                <span>{product.deliveryTime}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
} 