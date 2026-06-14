"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    id: 1,
    question: "How fresh is your seafood?",
    answer: "Our seafood is sourced daily from local docks and trusted farms. We pride ourselves on delivering catch-of-the-day freshness, usually within 24 hours of being harvested.",
  },
  {
    id: 2,
    question: "How do you pack the fish for delivery?",
    answer: "We use specialized, temperature-controlled insulated packaging with food-grade gel ice packs to ensure your seafood stays optimally chilled at ideal temperatures from our facility straight to your doorstep.",
  },
  {
    id: 3,
    question: "What happens if I'm not home during delivery?",
    answer: "You can specify drop-off instructions during checkout. If you aren't available, our delivery rider will call you to arrange leaving it with security, a neighbor, or reschedule for the next available slot.",
  },
  {
    id: 4,
    question: "Do you deliver pan-ready or pre-cut pieces?",
    answer: "Yes! All our fish options are completely scaled, gutted, cleaned, and cut according to your culinary preference (steaks, fillets, or whole clean) so they are 100% ready to cook upon unboxing.",
  },
  {
    id: 5,
    question: "What is your refund policy for spoiled items?",
    answer: "We offer a hassle-free replacement or refund policy. If you receive an item that doesn't meet our strict freshness standards, take a picture and report it to our support team within 2 hours of delivery.",
  },
  {
    id: 6,
    question: "How are delivery charges calculated?",
    answer: "Delivery fees are calculated based on your distance from our nearest distribution hub. We also offer free delivery milestones on orders above a specific checkout cart value.",
  },
  {
    id: 7,
    question: "Is your seafood safe from preservatives?",
    answer: "Absolutely. We maintain a strict zero-preservative, zero-chemical policy. Our cold-chain logistics workflow ensures that freshness is locked in purely through ice and rapid transit cycles.",
  },
];

export default function FAQAccordion() {
  // Track open state; defaults to opening the first item like your screenshot
  const [openId, setOpenId] = useState<number | null>(1);

  const toggleFAQ = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="w-full max-w-4xl mx-auto px-4 py-16 select-none">
      
      {/* Centered Heading Block */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Frequently Asked Questions
        </h2>
        <p className="text-sm text-rose-500 font-medium mt-2">
          Everything you need to know about our fresh delivery and returns.
        </p>
      </div>

      {/* Accordion List Container */}
      <div className="divide-y divide-slate-100 border-b border-slate-100">
        {faqData.map((item) => {
          const isOpen = openId === item.id;

          return (
            <div key={item.id} className="py-4 block">
              {/* Trigger Button Row */}
              <button
                onClick={() => toggleFAQ(item.id)}
                className="w-full flex items-center justify-between text-left py-2 focus:outline-none group"
              >
                <span
                  className={`text-sm font-semibold tracking-tight transition-colors duration-200 ${
                    isOpen 
                      ? "text-rose-500 font-bold" 
                      : "text-slate-800 group-hover:text-slate-900"
                  }`}
                >
                  {item.question}
                </span>
                
                {/* Smooth Rotating Chevron Indicator */}
                <ChevronDown
                  size={16}
                  className={`text-slate-400 transition-transform duration-300 ease-in-out ${
                    isOpen ? "rotate-180 text-rose-500" : ""
                  }`}
                />
              </button>

              {/* Collapsible Content Pane with CSS Transitions */}
              <div
                className={`grid transition-all duration-300 ease-in-out overflow-hidden ${
                  isOpen 
                    ? "grid-rows-[1fr] opacity-100 mt-2" 
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-3xl pr-4">
                    {item.answer}
                  </p>
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </section>
  );
}