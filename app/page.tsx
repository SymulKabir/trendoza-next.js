import Navbar from "@/src/components/ui/Navbar";
import HeroBanner from "@/src/components/ui/HeroBanner";
import ProductCarousel from "@/src/components/ui/ProductCarousel";
import Category from "@/src/components/ui/Category";
import SignatureProduct from "@/src/components/ui/SignatureProduct";
import ProductShowcase from "@/src/components/ui/ProductShowcase";
import FAQAccordion from "@/src/components/ui/FAQAccordion";
import Footer from "@/src/components/ui/Footer";

export default function HomePage() {
  return (
    <main className="bg-[#f8f8f8] min-h-screen">
      <Navbar />

      <div className="max-w-[1400px] mx-10 px-4">
        <HeroBanner />
        <ProductCarousel />
        <Category />
        <SignatureProduct />
        <ProductShowcase />
        <FAQAccordion />
      </div>

      <Footer />
    </main>
  );
}