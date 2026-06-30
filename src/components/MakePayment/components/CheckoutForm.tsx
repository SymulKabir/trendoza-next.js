"use client";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useMemo, useState } from "react";
import { successToast, warningToast } from "@/src/utils/toast";
import { Lock, Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "@/src/store/client/cartSlice";
import { setProducts } from "@/src/store/client/productSlice";
interface ComponentProps {
  modalData: any;
  closeModal: () => void;
}

const Index = ({ modalData, closeModal }: ComponentProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { items: products, pagination: productPagination } = useSelector((state) => state.product)

  console.log("products =========------------->>>>>", products)
  const dispatch = useDispatch()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsProcessing(true);
    setErrorMessage(null);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
      confirmParams: {
        return_url: `${window.location.origin}/dashboard/issue-history`,
        payment_method_data: {
          billing_details: {
            name: modalData?.name || "Guest User",
            email: modalData?.email || "guest@example.com",
            phone: modalData?.phone || "0000000000", // Add this missing field
          },
        },
      },
    });
    console.log("paymentIntent -->>", paymentIntent)
    console.log("error from payment ====>>>>", error)
    if (error) {
      setErrorMessage(error.message || "An unexpected error occurred.");
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      const transactionId = paymentIntent.id;
      console.log("Payment success --->>")
      console.log("transactionId --->>", transactionId)

      // Make the API call
      const res = await fetch("/api/order/make-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: modalData.userId, // Ensure this exists
          cartId: modalData.cartId, // Ensure this exists
          items: modalData.cartItems, // Map your cart items here
          subtotal: modalData.subtotal,
          shippingCharge: modalData.shippingCharge,
          discountAmount: modalData.discountAmount,
          totalAmount: modalData.totalAmount,
          paymentMethod: "Stripe",
          transactionId: transactionId,
        }),
      });

      const data = await res.json();
      if (data.success) {
        successToast("Order placed successfully!");
        closeModal({ reloadData: true });
        dispatch(clearCart())
        const updateProduct = products.map(({ _, ...product }) => {
          return { ...product, cartItemCount: 0 }
        })
        console.log("updateProduct --->>>", updateProduct)
        dispatch(setProducts({
          items: updateProduct,
          pagination: productPagination,
        }),)
      } else {
        warningToast("Payment successful but order creation failed.");
      }
    }
    setIsProcessing(false);
  };
  const paymentElementOptions = useMemo(
    () => ({
      fields: {
        billingDetails: {
          name: "never" as const, // 🚫 Hides the Name Field
          email: "never" as const, // 🚫 Hides the Email Field
          phone: "never" as const, // 🚫 Hides the Phone Number Field
        },
      },
    }),
    [],
  );
  return (
    <form onSubmit={handleSubmit} className="stripe-payment-form">
      <div className="elements-wrapper">
        <PaymentElement options={paymentElementOptions} />
      </div>

      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <button
        disabled={isProcessing || !stripe || !elements}
        className="submit-payment-btn"
      >
        {isProcessing ? (
          <>
            <Loader2 className="spinner-icon" size={18} />
            <span>Processing Payment...</span>
          </>
        ) : (
          <>
            <Lock size={18} />
            <span>Pay Now</span>
          </>
        )}
      </button>
    </form>
  );
};

export default Index;
