/**
 * Centralized Product Catalog
 * Add or modify products here. The entire frontend automatically adapts.
 */

export const products = [
  {
    id: 1,
    name: "Bathroom Protector kit",
    slug: "bathroom-protector-kit",
    category: "Bathroom Care",
    productType: "Protection Kit",
    surface: ["Bathroom", "Glass", "Ceramic", "Tiles"],
    concerns: ["Hard Water Stains", "Soap Scum", "Bathroom Scaling"],
    rooms: ["Bathroom"],
    price: 1599,
    originalPrice: 2299,
    discount: 30,
    rating: 4.9,
    reviewCount: 248,
    badge: "BESTSELLER",
    isFeatured: true,
    isCombo: true,
    stockStatus: "in_stock",
    size: "Complete Multi-Action Solution Set (50 in stock)",
    shortDescription: "Complete dual-action bathroom transformation: heavy-duty hard water scale remover plus 6-month hydrophobic glass, ceramic & tile nano-shield.",
    description: "Formulated specifically for Indian ground-water conditions with high TDS and mineral hardness. Step 1 removes deep-set white mineral limescale, silica marks and soap scum without scratching. Step 2 creates an ultra-slick, invisible hydrophobic barrier that makes water bead off immediately, preventing future stain formation for up to 180 days.",
    thumbnail: "https://cdn.shopify.com/s/files/1/0831/5037/2921/files/GharShineBathroomCleaningTrio.png?v=1791689722",
    images: [
      "https://cdn.shopify.com/s/files/1/0831/5037/2921/files/GharShineBathroomCleaningTrio.png?v=1791689722",
      "https://cdn.shopify.com/s/files/1/0831/5037/2921/files/GharShineMarbleProtectionInfographic.png?v=1791689722",
      "https://cdn.shopify.com/s/files/1/0831/5037/2921/files/GharShineNano-CoatingCleaningSolutions.png?v=1791689722",
      "https://cdn.shopify.com/s/files/1/0831/5037/2921/files/GharShineGlassProtectionin4Steps.png?v=1791689722",
      "https://cdn.shopify.com/s/files/1/0831/5037/2921/files/GharShineHardWaterStainRemover.png?v=1791689722"
    ],
    features: [
      "Dissolves stubborn hard water scaling and mineral film in minutes",
      "Creates hydrophobic nano-barrier that repels soap scum & water drops",
      "Safe on tempered shower cubicles, mirrors, washbasins and glazed ceramics",
      "Zero acid fumes, non-corrosive to adjacent chrome fittings",
      "Protection lasts up to 6 months per single application"
    ],
    howToUse: [
      { step: "01. Clean", text: "Spray ScaleOff onto dry glass/ceramic surface. Allow 2-3 minutes for active dissolving action." },
      { step: "02. Scrub & Rinse", text: "Gently agitate with the non-scratch pad, then rinse thoroughly with clean water and dry completely." },
      { step: "03. Apply Shield", text: "Spray NanoShield mist evenly on the dry surface. Buff in circular motions with the blue microfiber cloth." },
      { step: "04. Cure", text: "Let it cure for 4 hours away from running water. Enjoy crystal-clear, water-beading surfaces." }
    ],
    suitableFor: [
      "Shower glass partitions & enclosures",
      "Bathroom vanity mirrors and dressing mirrors",
      "Ceramic washbasins & wall-hung commodes",
      "Glazed porcelain wall tiles",
      "Balcony glass railings and high-rise windows"
    ],
    notSuitableFor: [
      "Unsealed natural marble & limestone (mask surrounding areas)",
      "Tinted films on car windows",
      "Eyeglasses with delicate anti-reflective coatings"
    ],
    specs: {
      "Volume": "500ml Cleaner + 250ml Protective Shield",
      "Coverage": "Up to 350 sq. ft.",
      "Durability": "Up to 6 Months",
      "Origin": "Formulated & Bottled in India",
      "Stock": "50 Units Available"
    },
    relatedProducts: [2, 6, 8]
  },
  {
    id: 2,
    name: "HydroBarrier Sofa & Fabric Stain Repellent Spray",
    slug: "hydrobarrier-sofa-fabric-stain-repellent",
    category: "Protection",
    productType: "Surface Protector",
    surface: ["Fabric", "Sofa & Fabric"],
    concerns: ["Sofa & Fabric Stains"],
    rooms: ["Living Room", "Bedroom", "Dining Area"],
    price: 999,
    originalPrice: 1499,
    discount: 33,
    rating: 4.8,
    reviewCount: 328,
    badge: "POPULAR",
    isFeatured: true,
    isCombo: false,
    stockStatus: "in_stock",
    size: "500ml Spray Bottle",
    shortDescription: "Invisible breathable liquid barrier that repels chai, coffee, wine, oil and masala spills instantly.",
    description: "An advanced water-based fluoropolymer shield engineered for Indian fabrics. It coats individual yarn fibers without blocking the fabric's breathability, altering its original texture, or leaving a stiff plastic feel. Spilled liquids bead up into droplets on the surface and can be wiped away with a dry napkin.",
    thumbnail: "https://cdn.shopify.com/s/files/1/0831/5037/2921/files/GharshineSofaProtectorCombo.png?v=1791652689",
    images: [
      "https://cdn.shopify.com/s/files/1/0831/5037/2921/files/GharshineSofaProtectorCombo.png?v=1791652689",
      "https://cdn.shopify.com/s/files/1/0831/5037/2921/files/GharshineFabricCareProductSet.png?v=1791652689"
    ],
    features: [
      "Liquids bead up instantly for stress-free blotting",
      "Zero change in fabric color, softness, or breathability",
      "Effective against chai, coffee, gravies, ketchup and soda",
      "Eco-friendly, VOC-compliant, pet & toddler safe once dry",
      "Durable against regular daily use for up to 12 months"
    ],
    howToUse: [
      { step: "01. Vacuum", text: "Ensure the fabric is clean, dry and vacuumed free of dust." },
      { step: "02. Shake & Spray", text: "Hold the bottle 15-20 cm away and spray in overlapping strokes until evenly damp." },
      { step: "03. Air Dry", text: "Allow 12-24 hours of natural air drying in a well-ventilated room before using." }
    ],
    suitableFor: [
      "Cotton, linen, polyester and chenille sofas",
      "Dining chair fabric seats and barstools",
      "Bed headboards, mattresses & throw pillows",
      "Living room area rugs & carpets",
      "Fabric car seats and baby stroller liners"
    ],
    notSuitableFor: [
      "Genuine smooth leather (use GharShine Leather Shield)",
      "Silk or faux-fur without a hidden patch test"
    ],
    specs: {
      "Volume": "500ml Trigger Spray",
      "Coverage": "Covers a 3+2+1 Sofa Set (approx. 100 sq. ft.)",
      "Drying Time": "12-24 Hours",
      "Origin": "Made in India"
    },
    relatedProducts: [1, 6, 8]
  },
  {
    id: 6,
    name: "BioDegrease Kitchen Hob, Chimney & Countertop Cleaner",
    slug: "biodegrease-kitchen-hob-chimney-cleaner",
    category: "Cleaners",
    productType: "Heavy Cleaner",
    surface: ["Kitchen", "Granite", "Metal", "Tiles"],
    concerns: ["Kitchen Grease", "Tile Dirt"],
    rooms: ["Kitchen"],
    price: 499,
    originalPrice: 699,
    discount: 28,
    rating: 4.8,
    reviewCount: 215,
    badge: "TADKA PROOF",
    isFeatured: true,
    isCombo: false,
    stockStatus: "in_stock",
    size: "500ml Trigger Spray",
    shortDescription: "Plant-derived powerhouse that instantly emulsifies burnt mustard oil, ghee films, and chimney grease.",
    description: "Engineered specifically for authentic Indian cooking where tempering spices and daily frying create tenacious polymerised grease layers. BioDegrease breaks lipid bonds in under 60 seconds, allowing you to wipe away thick yellow oil residue with a single swipe.",
    thumbnail: "https://cdn.shopify.com/s/files/1/0831/5037/2921/files/WhatsAppImage2026-10-10at23.23.25_1.jpg?v=1791654877",
    images: [
      "https://cdn.shopify.com/s/files/1/0831/5037/2921/files/WhatsAppImage2026-10-10at23.23.25_1.jpg?v=1791654877",
      "https://cdn.shopify.com/s/files/1/0831/5037/2921/files/WhatsAppImage2026-10-10at23.23.25.jpg?v=1791654877",
      "https://cdn.shopify.com/s/files/1/0831/5037/2921/files/WhatsAppImage2026-10-10at23.23.24.jpg?v=1791654877"
    ],
    features: [
      "Melts burnt grease on gas hobs, glass stoves & chimney baffles",
      "100% plant-derived surfactants, non-caustic & skin safe",
      "Streak-free shine on stainless steel sinks and backsplashes",
      "Fresh citrus zest scent eliminates stagnant kitchen odors"
    ],
    howToUse: [
      { step: "01. Spray", text: "Spray generously over grease-laden surface." },
      { step: "02. Wait 60s", text: "Allow surfactant enzymes to liquefy the grease." },
      { step: "03. Wipe Clean", text: "Wipe with a damp microfiber towel. No harsh scrubbing required." }
    ],
    suitableFor: [
      "Stainless steel & glass chimney hoods & filters",
      "Toughened glass gas stoves & induction cooktops",
      "Kitchen backsplash tiles & microwave interiors"
    ],
    notSuitableFor: [
      "Raw unfinished wood or unlacquered aluminum"
    ],
    specs: {
      "Volume": "500ml Trigger Spray",
      "Type": "Bio-Enzymatic Degreaser",
      "Safe On Food Prep Areas": "Yes, rinse after cleaning"
    },
    relatedProducts: [1, 2, 8]
  },
  {
    id: 8,
    name: "Living Room Kit",
    slug: "living-room-kit",
    category: "Combos",
    productType: "Room Kit",
    surface: ["Fabric", "Wood", "Glass", "Leather"],
    concerns: ["Sofa & Fabric Stains", "Wood Surface Damage"],
    rooms: ["Living Room"],
    price: 1999,
    originalPrice: 4299,
    discount: 53,
    rating: 4.9,
    reviewCount: 310,
    badge: "FAMILY PACK",
    isFeatured: true,
    isCombo: true,
    stockStatus: "in_stock",
    size: "Complete Multi-Surface Protection Kit",
    shortDescription: "The ultimate living room armor: Protect your sofa, wooden furniture, and glass surfaces with nano-barrier technology.",
    description: "Designed for busy Indian households with kids and frequent guests. Never stress over spilled chai, biscuit crumbs, oily fingerprints, or glass drink rings again. Complete protection for your entire living room.",
    thumbnail: "https://cdn.shopify.com/s/files/1/0831/5037/2921/files/GharShineCleaningCollectionDisplay.png?v=1791707672",
    images: [
      "https://cdn.shopify.com/s/files/1/0831/5037/2921/files/GharShineCleaningCollectionDisplay.png?v=1791707672",
      "https://cdn.shopify.com/s/files/1/0831/5037/2921/files/GharShineSofaProtectionSpray.png?v=1791707672",
      "https://cdn.shopify.com/s/files/1/0831/5037/2921/files/GharShineMulti-SurfaceCleaningDemo.png?v=1791707672",
      "https://cdn.shopify.com/s/files/1/0831/5037/2921/files/GharShineWoodProtectorSprayAd.png?v=1791707672",
      "https://cdn.shopify.com/s/files/1/0831/5037/2921/files/GharShineFabricCleaningDemo.png?v=1791707672",
      "https://cdn.shopify.com/s/files/1/0831/5037/2921/files/GharShineCompleteCleaningKit.png?v=1791707672",
      "https://cdn.shopify.com/s/files/1/0831/5037/2921/files/GharShineWoodProtector_4EasySteps.png?v=1791707672",
      "https://cdn.shopify.com/s/files/1/0831/5037/2921/files/GharShine_CleaninFourEasySteps.png?v=1791707672"
    ],
    features: [
      "Protects entire living room furniture in one weekend project",
      "Saves ₹1,100 compared to buying individually",
      "Includes ultra-plush 400 GSM dual-sided microfiber towels",
      "Safe around pets, toddlers, and sensitive fabrics"
    ],
    howToUse: [
      { step: "01. Sofa", text: "Vacuum and spray HydroBarrier evenly across cushions and armrests." },
      { step: "02. Tables", text: "Buff tables and veneer consoles with LustreWood." },
      { step: "03. Glass", text: "Wipe coffee table glass & mirrors with CrystalGlass mist." }
    ],
    suitableFor: [
      "Fabric sofas, rugs, throw cushions",
      "Sheesham, teak & engineered wood tables",
      "Glass center tables and large living room windows"
    ],
    notSuitableFor: [
      "Outdoor unsealed raw sandstone"
    ],
    specs: {
      "Bundle Items": "3 Bottles + 2 Accessories",
      "Savings": "₹1,100 (33% OFF)",
      "Total Volume": "1,350ml"
    },
    relatedProducts: [1, 2, 6]
  }
];
