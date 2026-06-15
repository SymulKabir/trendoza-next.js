'use client'
import React from 'react'
import {
    LayoutDashboard,
    ShoppingBag,
    ChevronUp,
    Tag,
    Users,
    BarChart3,
    Bell,
    Settings,
} from "lucide-react";


const Index = () => {
    return (
        <aside className="w-64 bg-white border-r border-slate-200/80 p-5 flex flex-col justify-between shrink-0">
            <div className="space-y-8">
                {/* Brand Identity */}
                <div className="flex items-center gap-2.5 px-2">
                    <div className="w-8 h-8 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-xs">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0 1 15 0m-15 0a7.5 7.5 0 1 1 15 0" />
                        </svg>
                    </div>
                    <span className="text-xl font-bold tracking-tight text-indigo-950">Spodut</span>
                </div>

                {/* Navigation Links Group */}
                <nav className="space-y-1">
                    <a href="#" className="flex items-center gap-3 px-3 py-2.5 text-sm font-semibold text-slate-500 hover:text-slate-900 rounded-xl transition-colors">
                        <LayoutDashboard size={18} />
                        <span>Dashboard</span>
                    </a>

                    {/* Expanded Parent Active State Group */}
                    <div className="space-y-1">
                        <button className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-semibold text-indigo-600 transition-colors">
                            <div className="flex items-center gap-3">
                                <ShoppingBag size={18} />
                                <span>Products</span>
                            </div>
                            <ChevronUp size={14} />
                        </button>

                        <div className="pl-9 space-y-1">
                            <a href="#" className="block px-3 py-2 text-xs font-bold text-indigo-600 bg-indigo-50/50 rounded-lg">
                                Product List
                            </a>
                            <a href="#" className="block px-3 py-2 text-xs font-semibold text-slate-400 hover:text-slate-800 transition-colors">
                                Categories
                            </a>
                        </div>
                    </div>

                    <a href="#" className="flex items-center gap-3 px-3 py-2.5 text-sm font-semibold text-slate-500 hover:text-slate-900 rounded-xl transition-colors">
                        <Tag size={18} />
                        <span>Sales</span>
                    </a>
                    <a href="#" className="flex items-center gap-3 px-3 py-2.5 text-sm font-semibold text-slate-500 hover:text-slate-900 rounded-xl transition-colors">
                        <Users size={18} />
                        <span>Customers</span>
                    </a>
                    <a href="#" className="flex items-center gap-3 px-3 py-2.5 text-sm font-semibold text-slate-500 hover:text-slate-900 rounded-xl transition-colors">
                        <BarChart3 size={18} />
                        <span>Analytics</span>
                    </a>
                    <a href="#" className="flex items-center gap-3 px-3 py-2.5 text-sm font-semibold text-slate-500 hover:text-slate-900 rounded-xl transition-colors">
                        <Bell size={18} />
                        <span>Notifications</span>
                    </a>
                    <a href="#" className="flex items-center gap-3 px-3 py-2.5 text-sm font-semibold text-slate-500 hover:text-slate-900 rounded-xl transition-colors">
                        <Settings size={18} />
                        <span>Settings</span>
                    </a>
                </nav>
            </div>
        </aside>
    )
}

export default Index