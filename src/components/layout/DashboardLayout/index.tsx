'use client'
import React from 'react'
import DashboardSideNav from "@/src/components/ui/DashboardSideNav"
import DashboardNavbar from "@/src/components/ui/DashboardNavbar"

const Index = ({ children }: any) => {
    return (
        <div className="min-h-screen bg-[#F8F9FC] flex font-sans antialiased text-slate-600">
            <DashboardSideNav />
            <main className="flex-1 flex flex-col min-w-0">
                <DashboardNavbar />
                <div className="flex-1 p-8 overflow-y-auto">
                    <div className="bg-white rounded-2xl border border-slate-200/70 shadow-2xs overflow-hidden flex flex-col justify-between">
                        {children}
                    </div>
                </div>
            </main>

        </div>
    )
}

export default Index