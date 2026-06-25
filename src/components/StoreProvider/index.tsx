"use client";

import React from "react";
import { Provider } from "react-redux";
import { store } from "@/src/store/client/store"; // Adjust path to point to your configured store file

export default function Index({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}