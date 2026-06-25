import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { clearAllTokens } from "@/src/utils/authTokens/client";

// Type definitions for your system profiles
interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: "USER";
}

interface AdminProfile {
  id: string;
  name: string;
  email: string;
  role: "ADMIN";
}

interface AuthState {
  user: UserProfile | null;
  admin: AdminProfile | null;
  isAuthenticatedUser: boolean;
  isAuthenticatedAdmin: boolean;
  // Progress & Loading States
  isUserLoading: boolean;
  isAdminLoading: boolean;
  authError: string | null; // Optional: To capture any global auth failures
}

const initialState: AuthState = {
  user: null,
  admin: null,
  isAuthenticatedUser: false,
  isAuthenticatedAdmin: false,
  isUserLoading: false,
  isAdminLoading: false,
  authError: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // --- USER STATUS REDUCERS ---
    setUserLoading: (state, action: PayloadAction<boolean>) => {
      state.isUserLoading = action.payload;
      if (action.payload) state.authError = null; // Clear previous errors when a new attempt starts
    },
    setUserSession: (state, action: PayloadAction<UserProfile>) => {
      state.user = action.payload;
      state.isAuthenticatedUser = true;
      state.isUserLoading = false; // Turn off loading upon success
    },
    logoutUser: (state) => {
      state.user = null;
      state.isAuthenticatedUser = false;
      state.isUserLoading = false;
    },

    // --- ADMIN STATUS REDUCERS ---
    setAdminLoading: (state, action: PayloadAction<boolean>) => {
      state.isAdminLoading = action.payload;
      if (action.payload) state.authError = null;
    },
    setAdminSession: (state, action: PayloadAction<AdminProfile>) => {
      state.admin = action.payload;
      state.isAuthenticatedAdmin = true;
      state.isAdminLoading = false; // Turn off loading upon success
    },
    logoutAdmin: (state) => {
      state.admin = null;
      state.isAuthenticatedAdmin = false;
      state.isAdminLoading = false;
    },

    // --- ERROR & CLEANUP REDUCERS ---
    setAuthError: (state, action: PayloadAction<string | null>) => {
      state.authError = action.payload;
      state.isUserLoading = false;
      state.isAdminLoading = false;
    },
    logoutAll: (state) => {
      state.user = null;
      state.admin = null;
      state.isAuthenticatedUser = false;
      state.isAuthenticatedAdmin = false;
      state.isUserLoading = false;
      state.isAdminLoading = false;
      state.authError = null;
      clearAllTokens(); // Clears cookies via your js-cookie utility file
    },
  },
});

export const { 
  setUserLoading, 
  setUserSession, 
  logoutUser, 
  setAdminLoading, 
  setAdminSession, 
  logoutAdmin, 
  setAuthError,
  logoutAll 
} = authSlice.actions;

export default authSlice.reducer;