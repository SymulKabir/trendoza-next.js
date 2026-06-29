"use client";
import React from "react";
import { useParams } from "next/navigation"; // Import the hook

import HeaderFooterLayout from "@/src/components/layout/HeaderFooterLayout";
import ProductDetails from "./components/ProductDetails";
import CategoryProducts from "./components/CategoryProducts";

const Index = () => {
  // Use the hook to access the params defined in your folder structure
  const params = useParams();
  const productId = params?.id as string;

  // Handle the case where ID might not exist yet
  if (!productId) {
    return <div>Loading product...</div>;
  }

  return (
    <HeaderFooterLayout> 
      <ProductDetails productId={productId} />
      <CategoryProducts />
    </HeaderFooterLayout>
  );
};

export default Index;