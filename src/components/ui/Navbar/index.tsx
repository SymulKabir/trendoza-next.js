"use client";
import React, { useEffect, useState } from "react";
import AuthModal from "@/src/components/Modal/AuthModal";
import CartDrawer from "@/src/components/Drawer/CartDrawer";
import SearchResults from "@/src/components/ui/SearchResults";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/src/store/client/store";
import { useSearchParams } from "next/navigation";
import { useNavigate } from "@/src/hooks/useNavigate";

const Index = () => {
  const [isOpenAuthModal, setIsOpenAuthModal] = useState(false);
  const [isOpenCartDrawer, setIsOpenCartDrawer] = useState(false);
  const [isShowSearchResult, setIsShowSearchResult] = useState(false);
  const [isOpenMobileMenu, setIsOpenMobileMenu] = useState(false); // State for mobile drawer menu

  const {
    isUserLoading,
    isAdminLoading,
    isAuthenticatedUser,
    isAuthenticatedAdmin,
  } = useSelector((state: RootState) => state.auth);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const pathname = usePathname();
  const { goTo } = useNavigate();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!isUserLoading && !isAdminLoading && !isAuthenticatedAdmin && !isAuthenticatedUser) {
      const authQuery = searchParams.get("auth");
      if (authQuery && authQuery === "sing-in") {
        handleAuthModal();
      }
    }
  }, [searchParams, isUserLoading, isAdminLoading]);

  const router = useRouter();

  const handleAuthModal = () => {
    if (isOpenAuthModal) {
      goTo(pathname);
    }
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
    setIsOpenMobileMenu(false); // Close mobile menu on navigation
  };

  return (
    <header className="bg-white min-h-[60px] sticky top-0 z-50 shadow-sm border-b border-gray-100">
      <div className="max-w-[1400px] mx-auto px-4 h-16 flex items-center justify-between gap-4">
        
        {/* ================= DESKTOP VIEW (Kept Intact) ================= */}
        <div className="hidden md:flex items-center gap-10">
          <Link href="/">
            <img
              src="/assets/logo.svg"
              alt="Logo"
              className="w-[120px] h-[60px] object-contain"
            />
          </Link>

          <button className="flex h-[40px] items-center gap-3 border-2 border-dashed border-gray-300 rounded-xl px-4 py-1 hover:border-[var(--primary-color)] transition-colors cursor-pointer">
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

        {/* ================= MOBILE LOGO & MENU BUTTON ================= */}
        <div className="flex md:hidden items-center justify-between w-full">
          <Link href="/">
            <img
              src="/assets/logo.svg"
              alt="Logo"
              className="w-[100px] h-[45px] object-contain"
            />
          </Link>

          <div className="flex items-center gap-3">
            {/* Mobile Cart Icon */}
            <button
              onClick={handleCartDrawer}
              className="relative flex items-center justify-center w-10 h-10 rounded-xl border border-gray-200 text-gray-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l2.4 10.4a1 1 0 001 .8h8.9a1 1 0 001-.8L22 6H7" />
                <circle cx="10" cy="20" r="1.5" />
                <circle cx="18" cy="20" r="1.5" />
              </svg>
              <span className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-[var(--primary-color)] rounded-full">
                {cartItems.length}
              </span>
            </button>

            {/* Hamburger Toggle */}
            <button
              onClick={() => setIsOpenMobileMenu(!isOpenMobileMenu)}
              className="p-2 text-gray-700 hover:text-[var(--primary-color)] focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                {isOpenMobileMenu ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* ================= DESKTOP SEARCH BAR ================= */}
        <div className="hidden md:block flex-1 max-w-2xl mx-8">
          <div className="relative">
            <input
              className="w-full border border-gray-300 rounded-xl pl-4 pr-12 py-2.5 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]/20 focus:border-[var(--primary-color)]"
              placeholder="Search for fish, seafood, crab..."
            />
            <button
              onClick={handleShowSearchResult}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[var(--primary-color)] cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <circle cx="11" cy="11" r="7" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M20 20l-3.5-3.5" />
              </svg>
            </button>
          </div>
        </div>

        {/* ================= DESKTOP RIGHT ACTIONS ================= */}
        <div className="hidden md:flex items-center gap-6">
          {/* How it Works */}
          <button
            onClick={() => navigate("/how-it-works")}
            className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-[var(--primary-color)] transition-colors cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <circle cx="12" cy="12" r="9" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8h.01M11 12h1v4h1" />
            </svg>
            <span>How it Works?</span>
          </button>

          {/* Login */}
          {!isAuthenticatedAdmin && !isAuthenticatedUser && (
            <button 
              onClick={handleAuthModal}
              className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-[var(--primary-color)] transition-colors cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 20a8 8 0 1116 0" />
              </svg>
              <span>Login</span>
            </button>
          )}

          {(isAuthenticatedAdmin || isAuthenticatedUser) && (
            <div className="flex items-center gap-4">
              <button
                onClick={() =>
                  navigate(isAuthenticatedAdmin ? "/admin/products" : "/dashboard/order")
                }
                className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-[var(--primary-color)] transition-colors cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center border border-gray-300">
                  <span className="text-xs font-bold text-gray-600">
                    {isAuthenticatedAdmin ? "A" : "U"}
                  </span>
                </div>
                <span>{isAuthenticatedAdmin ? "Admin" : "Profile"}</span>
              </button>
            </div>
          )}

          {/* Cart */}
          <button
            onClick={handleCartDrawer}
            className="relative flex items-center justify-center w-11 h-11 rounded-xl border border-gray-200 hover:border-[var(--primary-color)] hover:text-[var(--primary-color)] transition-all cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l2.4 10.4a1 1 0 001 .8h8.9a1 1 0 001-.8L22 6H7" />
              <circle cx="10" cy="20" r="1.5" />
              <circle cx="18" cy="20" r="1.5" />
            </svg>
            <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-[11px] font-bold text-white bg-[var(--primary-color)] rounded-full">
              {cartItems.length}
            </span>
          </button>
        </div>
      </div>

      {/* ================= MOBILE SEARCH BAR (Extra Row) ================= */}
      <div className="block md:hidden px-4 pb-3">
        <div className="relative">
          <input
            className="w-full border border-gray-300 rounded-xl pl-4 pr-12 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]/20 focus:border-[var(--primary-color)]"
            placeholder="Search for fish, seafood, crab..."
          />
          <button
            onClick={handleShowSearchResult}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[var(--primary-color)]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <circle cx="11" cy="11" r="7" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M20 20l-3.5-3.5" />
            </svg>
          </button>
        </div>
      </div>

      {/* ================= MOBILE SLIDE-OUT MENU DRAWER ================= */}
      {isOpenMobileMenu && (
        <div className="absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-lg md:hidden flex flex-col p-5 space-y-4 animate-fadeIn">
          {/* Location Selector */}
          <button className="flex items-center gap-3 border-2 border-dashed border-gray-300 rounded-xl p-3 w-full hover:border-[var(--primary-color)] transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[var(--primary-color)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s7-4.35 7-11a7 7 0 10-14 0c0 6.65 7 11 7 11z" />
              <circle cx="12" cy="10" r="2.5" />
            </svg>
            <div className="flex flex-col items-start leading-tight">
              <span className="text-[11px] text-gray-500">Please Select</span>
              <span className="text-sm font-semibold text-gray-900">Your Location</span>
            </div>
          </button>

          {/* How it Works Link */}
          <button
            onClick={() => navigate("/how-it-works")}
            className="flex items-center gap-3 text-sm font-medium text-gray-700 py-2 border-b border-gray-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <circle cx="12" cy="12" r="9" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8h.01M11 12h1v4h1" />
            </svg>
            <span>How it Works?</span>
          </button>

          {/* Auth Button for Mobile */}
          {!isAuthenticatedAdmin && !isAuthenticatedUser ? (
            <button
              onClick={() => {
                setIsOpenMobileMenu(false);
                handleAuthModal();
              }}
              className="flex items-center gap-3 text-sm font-medium text-gray-700 py-2 border-b border-gray-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 20a8 8 0 1116 0" />
              </svg>
              <span>Login / Sign Up</span>
            </button>
          ) : (
            <button
              onClick={() =>
                navigate(isAuthenticatedAdmin ? "/admin/products" : "/dashboard/order")
              }
              className="flex items-center gap-3 text-sm font-medium text-gray-700 py-2 border-b border-gray-100"
            >
              <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center border border-gray-300">
                <span className="text-xs font-bold text-gray-600">
                  {isAuthenticatedAdmin ? "A" : "U"}
                </span>
              </div>
              <span>{isAuthenticatedAdmin ? "Admin Dashboard" : "My Profile"}</span>
            </button>
          )}
        </div>
      )}

      {/* Global Modals/Drawers */}
      <SearchResults isOpen={isShowSearchResult} onClose={() => setIsShowSearchResult(false)} />
      <CartDrawer onClose={handleCartDrawer} isOpen={isOpenCartDrawer} />
      <AuthModal onClose={handleAuthModal} isOpen={isOpenAuthModal} />
    </header>
  );
};

export default Index;