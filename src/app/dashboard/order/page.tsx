"use client";

import React, { useEffect, useState } from "react";
import DashboardLayout from "@/src/components/layout/DashboardLayout";
import { ChevronDown, ChevronUp } from "lucide-react";
import { warningToast } from "@/src/utils/toast";
import { getProductUrl } from "@/src/utils";

export default function OrderDashboard() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [expandedOrders, setExpandedOrders] = useState<Set<string>>(new Set());

  const toggleExpand = (orderId: string) => {
    const newExpanded = new Set(expandedOrders);
    if (newExpanded.has(orderId)) newExpanded.delete(orderId);
    else newExpanded.add(orderId);
    setExpandedOrders(newExpanded);
  };

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/order/get");
      const data = await res.json();
      if (data.success) setOrders(data.orders || []);
      else warningToast(data.message || "Failed to load orders");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <DashboardLayout>
      <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-white">
        <h2 className="text-base font-bold text-slate-900">Order list</h2>
      </div>

      <div className="overflow-x-auto w-full bg-white">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider text-[11px]">
              <th className="py-3 px-4 border-b border-slate-200">Order ID</th>
              <th className="py-3 px-4 border-b border-slate-200">Date</th>
              <th className="py-3 px-4 border-b border-slate-200">Items</th>
              <th className="py-3 px-4 border-b border-slate-200">Total</th>
              <th className="py-3 px-4 border-b border-slate-200">Status</th>
              <th className="py-3 px-4 border-b border-slate-200"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {orders.map((order) => (
              <React.Fragment key={order.id}>
                <tr
                  className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                  onClick={() => toggleExpand(order.id)}
                >
                  <td className="py-3.5 px-4 font-bold text-slate-800">{order.orderNumber}</td>
                  <td className="py-3.5 px-4 text-slate-600">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="py-3.5 px-4 text-slate-600">
                    <span className="bg-slate-100 text-slate-600 py-0.5 px-2 rounded-full font-medium">
                      {order.items.length}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-slate-800">${order.totalAmount.toFixed(2)}</td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide ${getStatusColor(order.orderStatus)}`}>
                      {order.orderStatus}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-400 group-hover:text-slate-700 transition-colors text-right">
                    {expandedOrders.has(order.id) ? <ChevronUp size={16} className="inline" /> : <ChevronDown size={16} className="inline" />}
                  </td>
                </tr>

                {/* Ultra-Compact & Smart Breakdown Row */}
                {expandedOrders.has(order.id) && (
                  <tr>
                    <td colSpan={6} className="bg-slate-50/50 p-4 border-t border-slate-100 shadow-inner">
                      <div className="flex flex-col md:flex-row gap-4">
                        
                        {/* Left Side: Order Items */}
                        <div className="flex-1">
                          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Items</p>
                          <div className="bg-white rounded-lg border border-slate-200 shadow-sm divide-y divide-slate-100">
                            {order.items.map((item: any) => (
                              <div key={item.id} className="flex items-center justify-between p-2.5">
                                <div className="flex items-center gap-3">
                                  <img
                                    src={getProductUrl(item.productImage.name) || "/placeholder.png"}
                                    alt={item.productName}
                                    className="w-10 h-10 object-cover rounded border border-slate-100 bg-slate-50 shrink-0"
                                  />
                                  <div>
                                    <p className="font-bold text-slate-800 text-xs line-clamp-1">{item.productName}</p>
                                    <p className="text-[10px] text-slate-500 mt-0.5">
                                      {item.weight} <span className="mx-1 text-slate-300">•</span> Qty: {item.quantity}
                                    </p>
                                  </div>
                                </div>
                                <div className="text-right shrink-0 ml-4">
                                  <p className="text-[10px] text-slate-400 font-medium">${item.unitPrice.toFixed(2)} / ea</p>
                                  <p className="font-bold text-slate-900 text-xs">${item.totalPrice.toFixed(2)}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Right Side: Financial Summary */}
                        <div className="w-full md:w-64 shrink-0">
                          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Summary</p>
                          <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-3 space-y-2">
                            <div className="flex justify-between text-slate-600 text-[11px]">
                              <span>Subtotal</span>
                              <span className="font-medium">${order.subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-slate-600 text-[11px]">
                              <span>Shipping</span>
                              <span className="font-medium">${order.shippingCharge.toFixed(2)}</span>
                            </div>
                            {order.discountAmount > 0 && (
                              <div className="flex justify-between text-red-500 text-[11px]">
                                <span>Discount</span>
                                <span className="font-medium">-${order.discountAmount.toFixed(2)}</span>
                              </div>
                            )}
                            <div className="border-t border-dashed border-slate-200 pt-2 mt-2 flex justify-between items-center">
                              <span className="font-bold text-slate-800 text-xs">Total</span>
                              <span className="font-black text-slate-900 text-sm">${order.totalAmount.toFixed(2)}</span>
                            </div>
                          </div>
                        </div>

                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </DashboardLayout>
  );
}

function getStatusColor(status: string) {
  switch (status) {
    case "DELIVERED": return "bg-emerald-100 text-emerald-700";
    case "PENDING": return "bg-amber-100 text-amber-700";
    case "CANCELLED": return "bg-red-100 text-red-700";
    case "PROCESSING": return "bg-blue-100 text-blue-700";
    default: return "bg-slate-100 text-slate-700";
  }
}