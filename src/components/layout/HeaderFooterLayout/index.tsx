import React from "react";
import Navbar from "@/src/components/ui/Navbar";
import { Suspense } from "react";

import Footer from "@/src/components/ui/Footer";

const Index = ({ children }: any) => {
  return (
    <>
      <Suspense fallback={null}>
        <Navbar />
      </Suspense>
      {children}
      <Footer />
    </>
  );
};

export default Index;
