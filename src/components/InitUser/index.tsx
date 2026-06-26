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
import { adminHeader } from "@/src/utils/headers";
import { adminAuthService } from "@/src/services/admin/client";
import { userAuthService } from "@/src/services/user/client";

const Index = ({ children }: { children: React.ReactNode }) => {
  const { user, admin, isAuthenticatedUser, isAuthenticatedAdmin } =
    useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      if (isAuthenticatedAdmin || isAuthenticatedUser) return;
      try {
        dispatch(setAdminLoading(true));
        const adminData = await adminAuthService();

        if (adminData.user) {
          dispatch(setAdminSession(adminData.user));
          return;
        }
        dispatch(setUserLoading(true));
        const userData = await userAuthService();

        if (userData.user) {
          dispatch(setUserSession(userData.user)); 
        }
      } catch (error) {
      } finally {
        dispatch(setUserLoading(false));
        dispatch(setAdminLoading(false));
      }
    })();
  }, []);

  return <>{children}</>;
};

export default Index;
