"use client";
import { RootState } from "@/src/store/client/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setAdminLoading,
  setAdminSession,
  setUserLoading,
  setUserSession,
} from "@/src/store/client/authSlice"; 
import { adminAuthService } from "@/src/services/admin/client";
import { userAuthService } from "@/src/services/user/client";
import { getCartItemService } from "@/src/services/cart";
import { setCart } from "@/src/store/client/cartSlice";

const Index = ({ children }: { children: React.ReactNode }) => {
  const {  isAuthenticatedUser, isAuthenticatedAdmin } =
    useSelector((state: RootState) => state.auth); 
  const dispatch = useDispatch();
 
  useEffect(() => {
    (async () => {
      if (isAuthenticatedAdmin || isAuthenticatedUser) return;
      try {
        initAuth();
        initCartItem();
      } catch (error) {}
    })();
  }, []);

  const initAuth = async () => {
    try {
      dispatch(setAdminLoading(true));
      console.log("before api call of auth");
      const adminData = await adminAuthService();

      console.log("adminData ==>?", adminData);
      if (adminData?.user) {
        dispatch(setAdminSession(adminData.user));
        return;
      }
      dispatch(setUserLoading(true));
      const userData = await userAuthService();

      if (userData?.user) {
        dispatch(setUserSession(userData.user));
      }
    } catch (error) {
    } finally {
      dispatch(setUserLoading(false));
      dispatch(setAdminLoading(false));
    }
  };
  const initCartItem = async () => {
    try {
      const result = await getCartItemService(); // This returns { success: true, data: [...] }

      if (result?.success && Array.isArray(result.data)) {
        dispatch(setCart(result.data));
      }
    } catch (error) {
      console.error("Cart fetch failed", error);
    }
  };

  return <>{children}</>;
};

export default Index;
