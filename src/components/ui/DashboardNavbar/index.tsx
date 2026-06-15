'use client'
import React from 'react'
import {
    ChevronDown,
    Search,
    SlidersHorizontal,
    Eye,
    Plus,
    ArrowLeft
} from "lucide-react";

const Index = () => {
    return (
        <header className="bg-white border-b border-slate-200/60 px-8 h-16 flex items-center justify-between shrink-0">
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">Products</h1>

            <div className="flex items-center gap-4">
                <button className="p-2 text-slate-400 hover:text-slate-600 rounded-lg transition-colors cursor-pointer">
                    <Search size={19} />
                </button>
                <div className="w-7 h-7 bg-slate-200 rounded-full overflow-hidden border border-slate-300 shadow-3xs cursor-pointer">
                    <div className="w-full h-full flex items-center justify-center text-xs">👤</div>
                </div>
            </div>
        </header>
    )
}

export default Index