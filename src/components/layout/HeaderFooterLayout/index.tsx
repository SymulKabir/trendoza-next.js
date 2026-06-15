import React from "react";
import Navbar from "@/src/components/ui/Navbar";

import Footer from "@/src/components/ui/Footer";

const Index = ({ children }: any) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default Index;
