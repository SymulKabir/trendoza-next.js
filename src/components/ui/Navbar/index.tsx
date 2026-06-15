"use client";
import React, { useState } from "react";
import AuthModal from "@/src/components/Modal/AuthModal";
import CartDrawer from "@/src/components/Drawer/CartDrawer";
import SearchResults from "@/src/components/ui/SearchResults";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Index = () => {
  const [isOepnAuthModal, setIsOpenAuthModal] = useState(false);
  const [isOpenCartDrawer, setIsOpenCartDrawer] = useState(false);
  const [isShowSearchResult, setIsShowSearchResult] = useState(false);

  const router = useRouter();

  const handleAuthModal = () => {
    setIsOpenAuthModal((pre) => !pre);
  };
  const handleCartDrawer = () => {
    setIsOpenCartDrawer((pre) => !pre);
  };
  const handleShowSearchResult = () => {
    setIsShowSearchResult((pre) => !pre);
  };
  const navigate = (path: string) => {
    router.push(path);
  };

  return (
    <header className="bg-white sticky top-0 z-50 primary-border primary-shadow">
      <div className="max-w-[1400px] mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-10">
          <Link href="/">
            <img
              src="/assets/logo.svg"
              alt="Logo"
              className="w-[120px] h-[60px] object-contain"
            />
          </Link>

          <button className="flex items-center gap-3 border-2 border-dashed border-gray-300 rounded-xl px-4 py-2 hover:border-[var(--primary-color)] transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-[var(--primary-color)]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 21s7-4.35 7-11a7 7 0 10-14 0c0 6.65 7 11 7 11z"
              />
              <circle cx="12" cy="10" r="2.5" />
            </svg>

            <div className="flex flex-col items-start leading-tight">
              <span className="text-[11px] text-gray-500">Please Select</span>
              <span className="text-sm font-semibold text-gray-900">
                Your Location
              </span>
            </div>
          </button>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-2xl mx-8">
          <div className="relative">
            <input
              className="
                          w-full
                          border border-gray-300
                          rounded-xl
                          pl-4 pr-12 py-3
                          text-gray-900
                          placeholder:text-gray-400
                          focus:outline-none
                          focus:ring-2
                          focus:ring-[var(--primary-color)]/20
                          focus:border-[var(--primary-color)]
                        "
              placeholder="Search for fish, seafood, crab..."
            />
            <button
              onClick={handleShowSearchResult}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[var(--primary-color)] cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <circle cx="11" cy="11" r="7" />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20 20l-3.5-3.5"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-6">
          {/* How it Works */}
          <button
            onClick={() => navigate("/how-it-works")}
            className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-[var(--primary-color)] transition-colors cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <circle cx="12" cy="12" r="9" />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8h.01M11 12h1v4h1"
              />
            </svg>
            <span>How it Works?</span>
          </button>

          {/* Login */}
          <button className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-[var(--primary-color)] transition-colors cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 7a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 20a8 8 0 1116 0"
              />
            </svg>
            <span onClick={handleAuthModal}>Login</span>
          </button>

          {/* Cart */}
          <button
            onClick={handleCartDrawer}
            className="relative flex items-center justify-center w-11 h-11 rounded-xl border border-gray-200 hover:border-[var(--primary-color)] hover:text-[var(--primary-color)] transition-all cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l2.4 10.4a1 1 0 001 .8h8.9a1 1 0 001-.8L22 6H7"
              />
              <circle cx="10" cy="20" r="1.5" />
              <circle cx="18" cy="20" r="1.5" />
            </svg>

            {/* Cart Count */}
            <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-[11px] font-bold text-white bg-[var(--primary-color)] rounded-full">
              3
            </span>
          </button>
        </div>
      </div>
      <SearchResults isOpen={isShowSearchResult} />
      <CartDrawer onClose={handleCartDrawer} isOpen={isOpenCartDrawer} />
      <AuthModal onClose={handleAuthModal} isOpen={isOepnAuthModal} />
    </header>
  );
};

export default Index;
