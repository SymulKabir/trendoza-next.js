export const products = [
  {
    name: "Authentic Surmai Fish Fry - (Seer Fish Steak) – Ready to Eat",
    category: "Ready To Eat",
    description:
      "Crispy, ready-to-eat seer fish steak, marinated in authentic spices and pan-fried to perfection. Served hot with rich flavor and a firm, meaty bite. Contains a central bone.",
    stockStatus: "In Stock",
    badgeType: "Discount",
    images: [
      "surmai-steak .webp",
      "packed-seer-fish.webp"
    ],
    availableCuts: [],
    variants: [
      {
        weight: "120g",
        cleanedWeight: null,
        originalPrice: 499,
        sellingPrice: 289,
        discountPercent: 42
      }
    ]
  },

  {
    name: "Fresh Marinated Seer Fish | Surmai Slices (Ready to Cook)",
    category: "Ready To Cook",
    description: "2 slices of 150g - 180g each",
    stockStatus: "In Stock",
    badgeType: "Discount",
    images: [
      "surmai-marinated.webp"
    ],
    availableCuts: [],
    variants: [
      {
        weight: "300g",
        cleanedWeight: null,
        originalPrice: 499,
        sellingPrice: 399,
        discountPercent: 20
      }
    ]
  },

  {
    name: "Marinated White Pomfret (Whole, Slit Cut) | Ready to Cook | Pack of 1",
    category: "Ready To Cook",
    description:
      "Fresh pomfret cleaned, slit-cut, and coated with our balanced in-house coastal-style masala. Just heat your pan and fry — no prep needed.",
    stockStatus: "In Stock",
    badgeType: "Discount",
    images: [
      "pomfret-marinated.webp"
    ],
    availableCuts: [],
    variants: [
      {
        weight: "200g",
        cleanedWeight: null,
        originalPrice: 450,
        sellingPrice: 349,
        discountPercent: 22
      }
    ]
  },

  {
    name: "Fresh Squid / Calamari / Koonthal / Premium Bondas",
    category: "Squids & Lobsters",
    description:
      "Sea fresh squid with naturally soft, tender flesh that absorbs spices well, making it perfect for fry, curry, and starters.",
    stockStatus: "In Stock",
    badgeType: "Discount",
    images: [
      "squid1.jpg",
      "squid2.jpg",
      "squid3.jpg",
      "squid-cleaned.jpg",
      "squid4.jpg",
      "squid5.jpg",
      "squid6.jpg"
    ],
    availableCuts: [
      {
        id: 27,
        name: "Ring Cut",
        image: "https://fishlo.in/media/images/cuts/squid-ring.webp",
        isFree: true,
        price: 0
      }
    ],
    variants: [
      {
        weight: "500g",
        cleanedWeight: "After cleaning ~300g – 400g",
        originalPrice: 850,
        sellingPrice: 600,
        discountPercent: 29
      },
      {
        weight: "1kg",
        cleanedWeight: "After cleaning ~600g – 800g",
        originalPrice: 850,
        sellingPrice: 600,
        discountPercent: 29
      }
    ]
  },

  {
    name: "Fresh Black Pomfret (Premium Quality) - Halwa",
    category: "Saltwater Fish",
    description:
      "Soft, buttery, and rich in flavor, Black Pomfret is perfect for fry, curry, or tawa roast. 2-3 fishes in 1 kg (~330g each)",
    stockStatus: "In Stock",
    badgeType: "Discount",
    images: [
      "black-pomfret_DEmuBmT.webp",
      "halwa-slice.webp"
    ],
    availableCuts: [
      {
        id: 26,
        name: "Slices",
        image: "https://fishlo.in/media/images/cuts/halwa-slice.webp",
        isFree: true,
        price: 0
      }
    ],
    variants: [
      {
        weight: "500g",
        cleanedWeight: "After cleaning ~400g – 450g",
        originalPrice: 1350,
        sellingPrice: 1100,
        discountPercent: 19
      },
      {
        weight: "1kg",
        cleanedWeight: "After cleaning ~800g – 900g",
        originalPrice: 1350,
        sellingPrice: 1100,
        discountPercent: 19
      }
    ]
  },

  {
    name: "Fresh Bangda (Mackerel) – Cleaned, Never Frozen - Large",
    category: "Saltwater Fish",
    description:
      "Fresh sea-caught Bangda (Mackerel) known for its rich flavour, firm texture, and high omega-3 content. Perfect for frying, curries, and grilling. Cleaned and ready to cook.",
    stockStatus: "In Stock",
    badgeType: "Discount",
    images: [
      "bangada1.webp",
      "bangada-fry.webp",
      "bangada3.webp"
    ],
    availableCuts: [
      {
        id: 9,
        name: "Fry Cut",
        image: "https://fishlo.in/media/images/cuts/fry-cut.webp",
        isFree: true,
        price: 0
      },
      {
        id: 10,
        name: "Curry Cuts",
        image: "https://fishlo.in/media/images/cuts/curry-cut-bangda.webp",
        isFree: false,
        price: 0
      },
      {
        id: 17,
        name: "Whole Cleaned",
        image: "https://fishlo.in/media/images/cuts/bangda-medium.webp",
        isFree: true,
        price: 0
      },
      {
        id: 18,
        name: "Whole Uncleaned",
        image: "https://fishlo.in/media/images/cuts/bangada3.webp",
        isFree: true,
        price: 0
      }
    ],
    variants: [
      {
        weight: "500g",
        cleanedWeight: "After cleaning ~350g – 400g",
        originalPrice: 499,
        sellingPrice: 349,
        discountPercent: 30
      },
      {
        weight: "1kg",
        cleanedWeight: "After cleaning ~700g – 800g",
        originalPrice: 499,
        sellingPrice: 349,
        discountPercent: 30
      }
    ]
  },

  {
    name: "Premium White Pomfret (Paplet) – Sea Fresh - Medium",
    category: "Saltwater Fish",
    description:
      "Premium sea-caught White Pomfret known for its delicate flavour, soft texture, and premium quality. Perfect for fry, grill, and curry. Cleaned and ready to cook.",
    stockStatus: "Out of Stock",
    badgeType: "Discount",
    images: [
      "pomfret1.webp",
      "pomfret2.webp",
      "pomfret3.webp"
    ],
    availableCuts: [
      {
        id: 23,
        name: "Fry Cut",
        image: "https://fishlo.in/media/images/cuts/pomfret-fry.webp",
        isFree: true,
        price: 0
      },
      {
        id: 24,
        name: "Slices",
        image: "https://fishlo.in/media/images/cuts/pomfret-slices.webp",
        isFree: true,
        price: 0
      },
      {
        id: 25,
        name: "Whole Cleaned",
        image: "https://fishlo.in/media/images/cuts/whole-pomfret.webp",
        isFree: true,
        price: 0
      }
    ],
    variants: [
      {
        weight: "500g",
        cleanedWeight: "After cleaning ~400g – 450g",
        originalPrice: 1599,
        sellingPrice: 1400,
        discountPercent: 12
      },
      {
        weight: "1kg",
        cleanedWeight: "After cleaning ~800g – 900g",
        originalPrice: 1599,
        sellingPrice: 1400,
        discountPercent: 12
      }
    ]
  },

  {
    name: "Fresh Indian Salmon (Rawas / Raavas / Vazhmeen)",
    category: "Saltwater Fish",
    description: "Rawas Steaks or Fillets without head",
    stockStatus: "Out of Stock",
    badgeType: "Discount",
    images: [
      "rawas.webp",
      "salmon-curry-cuts.webp"
    ],
    availableCuts: [
      {
        id: 6,
        name: "Steaks",
        image: "https://fishlo.in/media/images/cuts/steaks.webp",
        isFree: true,
        price: 0
      },
      {
        id: 5,
        name: "Fillets",
        image: "https://fishlo.in/media/images/cuts/salmon-fillets.jpg",
        isFree: true,
        price: 0
      }
    ],
    variants: [
      {
        weight: "250g",
        cleanedWeight: "After cleaning ~175g – 200g",
        originalPrice: 1699,
        sellingPrice: 1100,
        discountPercent: 35
      },
      {
        weight: "500g",
        cleanedWeight: "After cleaning ~350g – 400g",
        originalPrice: 1699,
        sellingPrice: 1100,
        discountPercent: 35
      },
      {
        weight: "1kg",
        cleanedWeight: "After cleaning ~700g – 800g",
        originalPrice: 1699,
        sellingPrice: 1100,
        discountPercent: 35
      }
    ]
  },

  {
    name: "Fresh Bangda (Mackerel) – Cleaned, Never Frozen - Small",
    category: "Saltwater Fish",
    description:
      "Fresh sea-caught Bangda (Mackerel) known for its rich flavour, firm texture, and high omega-3 content. Perfect for frying, curries, and grilling. Cleaned and ready to cook.",
    stockStatus: "Out of Stock",
    badgeType: "Discount",
    images: [
      "bangda-medium.webp",
      "bangda-medium.webp"
    ],
    availableCuts: [
      {
        id: 9,
        name: "Fry Cut",
        image: "https://fishlo.in/media/images/cuts/fry-cut.webp",
        isFree: true,
        price: 0
      },
      {
        id: 10,
        name: "Curry Cuts",
        image: "https://fishlo.in/media/images/cuts/curry-cut-bangda.webp",
        isFree: false,
        price: 0
      },
      {
        id: 17,
        name: "Whole Cleaned",
        image: "https://fishlo.in/media/images/cuts/bangda-medium.webp",
        isFree: true,
        price: 0
      }
    ],
    variants: [
      {
        weight: "500g",
        cleanedWeight: "After cleaning ~350g – 400g",
        originalPrice: 349,
        sellingPrice: 249,
        discountPercent: 29
      },
      {
        weight: "1kg",
        cleanedWeight: "After cleaning ~700g – 800g",
        originalPrice: 349,
        sellingPrice: 249,
        discountPercent: 29
      }
    ]
  },

  {
    name: "Fresh Pink Perch (Rani Fish) – Fresh, Cleaned & Ready to Cook",
    category: "Saltwater Fish",
    description:
      "Craving authentic seafood? Fresh Pink Perch, hygienically delivered—cook restaurant-style at home.",
    stockStatus: "Out of Stock",
    badgeType: "Discount",
    images: [
      "raja-rani.webp",
      "pink-perch-fry-cut.webp",
      "pink-perch-curry-cut.webp"
    ],
    availableCuts: [
      {
        id: 35,
        name: "Curry Cut",
        image: "https://fishlo.in/media/images/cuts/pink-perch-curry-cut.webp",
        isFree: true,
        price: 0
      },
      {
        id: 36,
        name: "Fry Cut",
        image: "https://fishlo.in/media/images/cuts/pink-perch-fry-cut.webp",
        isFree: true,
        price: 0
      }
    ],
    variants: [
      {
        weight: "500g",
        cleanedWeight: "After cleaning ~350g – 400g",
        originalPrice: 499,
        sellingPrice: 349,
        discountPercent: 30
      },
      {
        weight: "1kg",
        cleanedWeight: "After cleaning ~700g – 800g",
        originalPrice: 499,
        sellingPrice: 349,
        discountPercent: 30
      }
    ]
  },

  {
    name: "Fresh Raawas (Indian Salmon) Medium Steaks | 350g – 400g (3–5 pcs)",
    category: "Saltwater Fish",
    description: "Whole fish cut into steaks, without head.",
    stockStatus: "Out of Stock",
    badgeType: "Discount",
    images: [
      "salmon-curry-cuts.webp"
    ],
    availableCuts: [],
    variants: [
      {
        weight: "350g",
        cleanedWeight: null,
        originalPrice: 999,
        sellingPrice: 660,
        discountPercent: 34
      }
    ]
  },

  {
    name: "Fresh Sea Crab (Premium Quality)",
    category: "Crabs & Lobsters",
    description:
      "Meaty, flavorful, and rich in taste, fresh sea crabs are perfect for curries, masala, and coastal-style dishes. Hygienically handled and cleaned to ensure freshness and quality in every serving.",
    stockStatus: "Out of Stock",
    badgeType: "Discount",
    images: [
      "crab.jpg"
    ],
    availableCuts: [
      {
        id: 21,
        name: "Curry Cut",
        image: "https://fishlo.in/media/images/cuts/placeholder-cut_HRDdS97.webp",
        isFree: true,
        price: 0
      }
    ],
    variants: []
  },

  {
    name: "Fresh Seer Fish (Surmai / King Fish) Mangalore Anjal - LARGE",
    category: "Saltwater Fish",
    description:
      "Premium quality fresh Seer Fish, also known as King fish, Surmai, Anjal. Famous for its firm texture, rich taste, and high protein content. Perfect for curries, frying, and grilling. Hygienically cleaned and cut to preserve freshness and flavor.",
    stockStatus: "Out of Stock",
    badgeType: "Discount",
    images: [
      "seer-fish.webp",
      "slices-surmai.webp",
      "curry-cut-surmai.webp",
      "nutritional-info-surmai_aynk99W.webp"
    ],
    availableCuts: [
      {
        id: 22,
        name: "Slices",
        image: "https://fishlo.in/media/images/cuts/slices-surmai.webp",
        isFree: true,
        price: 0
      },
      {
        id: 39,
        name: "Curry cuts",
        image: "https://fishlo.in/media/images/cuts/curry-cut-surmai.webp",
        isFree: true,
        price: 0
      }
    ],
    variants: [
      {
        weight: "500g",
        cleanedWeight: "After cleaning ~500g – 500g",
        originalPrice: 2299,
        sellingPrice: 1400,
        discountPercent: 39
      },
      {
        weight: "1kg",
        cleanedWeight: "After cleaning ~1000g – 1000g",
        originalPrice: 2299,
        sellingPrice: 1400,
        discountPercent: 39
      }
    ]
  },

  {
    name: "Fresh Seer Fish (Surmai / King Fish) Mangalore Anjal - MEDIUM",
    category: "Saltwater Fish",
    description:
      "Premium quality fresh Seer Fish, also known as King fish, Surmai, Anjal. Famous for its firm texture, rich taste, and high protein content. Perfect for curries, frying, and grilling. Hygienically cleaned and cut to preserve freshness and flavor.",
    stockStatus: "Out of Stock",
    badgeType: "Discount",
    images: [
      "surmai.jpg",
      "nutritional-info-surmai_etsqANb.webp"
    ],
    availableCuts: [
      {
        id: 22,
        name: "Slices",
        image: "https://fishlo.in/media/images/cuts/slices-surmai.webp",
        isFree: true,
        price: 0
      }
    ],
    variants: [
      {
        weight: "500g",
        cleanedWeight: "After cleaning ~500g – 500g",
        originalPrice: 1999,
        sellingPrice: 1100,
        discountPercent: 45
      },
      {
        weight: "1kg",
        cleanedWeight: "After cleaning ~1000g – 1000g",
        originalPrice: 1999,
        sellingPrice: 1100,
        discountPercent: 45
      }
    ]
  },

  {
    name: "Fresh Sole Fish (Lepa) – Cleaned & Ready to Cook",
    category: "Saltwater Fish",
    description:
      "Fresh Lepa, soft & delicate—perfect for fry or light curry.",
    stockStatus: "Out of Stock",
    badgeType: "Discount",
    images: [
      "sole_fish.webp"
    ],
    availableCuts: [
      {
        id: 38,
        name: "Whole Cleaned",
        image: "https://fishlo.in/media/images/cuts/sole_fish.webp",
        isFree: false,
        price: 0
      }
    ],
    variants: [
      {
        weight: "500g",
        cleanedWeight: "After cleaning ~350g – 400g",
        originalPrice: 525,
        sellingPrice: 399,
        discountPercent: 24
      },
      {
        weight: "1kg",
        cleanedWeight: "After cleaning ~700g – 800g",
        originalPrice: 525,
        sellingPrice: 399,
        discountPercent: 24
      }
    ]
  },

  {
    name: "Fresh Three Spot Crab – Coastal Catch | Cleaned & Cut After Order",
    category: "Crabs & Lobsters",
    description:
      "Fresh sea-caught Three Spot Crab, cleaned and cut after you place the order. Naturally sweet crab meat, perfect for traditional crab curries and masala dishes.",
    stockStatus: "Out of Stock",
    badgeType: "Discount",
    images: [
      "threedot-crab.webp",
      "threedot-crab-pieces.webp"
    ],
    availableCuts: [
      {
        id: 15,
        name: "Whole Uncleaned",
        image: "https://fishlo.in/media/images/cuts/threedot-crab.webp",
        isFree: false,
        price: 0
      },
      {
        id: 16,
        name: "Curry Cut",
        image: "https://fishlo.in/media/images/cuts/threedot-crab-pieces.webp",
        isFree: true,
        price: 0
      }
    ],
    variants: [
      {
        weight: "500g",
        cleanedWeight: "After cleaning ~275g – 350g",
        originalPrice: 899,
        sellingPrice: 549,
        discountPercent: 39
      },
      {
        weight: "1kg",
        cleanedWeight: "After cleaning ~550g – 700g",
        originalPrice: 899,
        sellingPrice: 549,
        discountPercent: 39
      }
    ]
  },

  {
    name: "Fresh Tiger Prawns – Premium Quality Coastal Catch - Medium",
    category: "Prawns & Shrimps",
    description:
      "Medium, juicy tiger prawns sourced from coastal waters and delivered fresh. Choose your preferred cleaning and cut style.",
    stockStatus: "Out of Stock",
    badgeType: "Discount",
    images: [
      "tiger-prawns.webp",
      "tigerprawns-cleaned.webp",
      "tiger-prawns.webp"
    ],
    availableCuts: [
      {
        id: 13,
        name: "Whole Uncleaned",
        image: "https://fishlo.in/media/images/cuts/tiger-prawns.webp",
        isFree: false,
        price: 0
      },
      {
        id: 14,
        name: "Peeled & Deveined",
        image: "https://fishlo.in/media/images/cuts/tigerprawns-cleaned.jpg",
        isFree: true,
        price: 0
      }
    ],
    variants: [
      {
        weight: "500g",
        cleanedWeight: "After cleaning ~250g – 300g",
        originalPrice: 990,
        sellingPrice: 760,
        discountPercent: 23
      },
      {
        weight: "1kg",
        cleanedWeight: "After cleaning ~500g – 600g",
        originalPrice: 990,
        sellingPrice: 760,
        discountPercent: 23
      }
    ]
  },

  {
    name: "Fresh Tuna Fish (Kupa / Tuni / Tuna / Surma)",
    category: "Saltwater Fish",
    description:
      "Exceptionally high-protein Tuna boneless cubes and fillets.",
    stockStatus: "Out of Stock",
    badgeType: "Discount",
    images: [
      "tuna_2.jpg",
      "tuna.jpg",
      "tuna-pieces.jpg",
      "fillet.jpg"
    ],
    availableCuts: [
      {
        id: 7,
        name: "Fillets",
        image: "https://fishlo.in/media/images/cuts/fillet.jpg",
        isFree: true,
        price: 0
      },
      {
        id: 8,
        name: "Curry Cut / Pieces",
        image: "https://fishlo.in/media/images/cuts/tuna-pieces.jpg",
        isFree: true,
        price: 0
      }
    ],
    variants: [
      {
        weight: "500g",
        cleanedWeight: "After cleaning ~225g – 250g",
        originalPrice: 899,
        sellingPrice: 599,
        discountPercent: 33
      },
      {
        weight: "1kg",
        cleanedWeight: "After cleaning ~450g – 500g",
        originalPrice: 899,
        sellingPrice: 599,
        discountPercent: 33
      }
    ]
  },

  {
    name: "Fresh Vannamei Prawns (Premium Quality)",
    category: "Prawns & Shrimps",
    description:
      "Fresh, tender, and naturally sweet Vannamei prawns—perfect for curries, fry, and grills. Carefully cleaned and hygienically packed to ensure top quality and great taste in every bite.",
    stockStatus: "Out of Stock",
    badgeType: "Discount",
    images: [
      "prawns_1.jpg",
      "peeled-pr.webp"
    ],
    availableCuts: [
      {
        id: 19,
        name: "Peeled & Deveined",
        image: "https://fishlo.in/media/images/cuts/peeled-pr.webp",
        isFree: true,
        price: 0
      },
      {
        id: 20,
        name: "Whole Uncleaned",
        image: "https://fishlo.in/media/images/cuts/prawns_1.jpg",
        isFree: true,
        price: 0
      }
    ],
    variants: [
      {
        weight: "500g",
        cleanedWeight: "After cleaning ~250g – 300g",
        originalPrice: 699,
        sellingPrice: 640,
        discountPercent: 8
      },
      {
        weight: "1kg",
        cleanedWeight: "After cleaning ~500g – 600g",
        originalPrice: 699,
        sellingPrice: 640,
        discountPercent: 8
      }
    ]
  },

  {
    name: "Fresh Whole Baby Surmai (Seer Fish)",
    category: "Saltwater Fish",
    description: "2-3 whole baby surmai fish per kg",
    stockStatus: "Out of Stock",
    badgeType: "Discount",
    images: [
      "baby-surmai.webp",
      "slices-baby-surmai.webp"
    ],
    availableCuts: [
      {
        id: 28,
        name: "Slices",
        image: "https://fishlo.in/media/images/cuts/slices-baby-surmai.webp",
        isFree: true,
        price: 0
      }
    ],
    variants: [
      {
        weight: "500g",
        cleanedWeight: "After cleaning ~350g – 400g",
        originalPrice: 1100,
        sellingPrice: 900,
        discountPercent: 18
      },
      {
        weight: "1kg",
        cleanedWeight: "After cleaning ~700g – 800g",
        originalPrice: 1100,
        sellingPrice: 900,
        discountPercent: 18
      }
    ]
  }
]