import Navbar from "@/src/components/ui/Navbar";
import HeroBanner from "@/src/components/ui/HeroBanner";
import ProductCarousel from "@/src/components/ui/ProductCarousel";
import Category from "@/src/components/ui/Category";
import SignatureProduct from "@/src/components/ui/SignatureProduct";
import ProductShowcase from "@/src/components/ui/ProductShowcase";
import FAQAccordion from "@/src/components/ui/FAQAccordion"; 
import HeaderFooterLayout from "@/src/components/layout/HeaderFooterLayout";

export default function HomePage() {
  return (
    <HeaderFooterLayout>
      <div className="max-w-[1400px] mx-auto px-4"> 
        <HeroBanner />
        <ProductCarousel />
        <Category />
        <SignatureProduct />
        <ProductShowcase />
        <FAQAccordion />
      </div>
    </HeaderFooterLayout>
  );
}
