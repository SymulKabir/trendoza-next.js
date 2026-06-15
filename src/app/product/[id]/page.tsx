"use client";

import React, { useState } from "react";
 
import HeaderFooterLayout from "@/src/components/layout/HeaderFooterLayout";
import ProductDetails from   "./components/ProductDetails";
import CategoryProducts from   "./components/CategoryProducts";

const Index = () => {


  return (
    <HeaderFooterLayout>
     <ProductDetails/>
     <CategoryProducts/>
    </HeaderFooterLayout>
  );
};

export default Index;
