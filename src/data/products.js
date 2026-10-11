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
    relatedProducts: [2, 5, 8]
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
    relatedProducts: [1, 4, 8]
  },
  {
    id: 4,
    name: "StoneArmor Marble & Granite Deep Impregnating Sealant",
    slug: "stonearmor-marble-granite-sealant",
    category: "Protection",
    productType: "Surface Protector",
    surface: ["Marble", "Granite"],
    concerns: ["Marble & Granite Stains"],
    rooms: ["Living Room", "Kitchen", "Pooja Room"],
    price: 1299,
    originalPrice: 1899,
    discount: 31,
    rating: 4.8,
    reviewCount: 194,
    badge: "PREMIUM",
    isFeatured: true,
    isCombo: false,
    stockStatus: "in_stock",
    size: "500ml Bottle",
    shortDescription: "Sub-surface oleophobic & hydrophobic shield for Italian marble, Indian granite, and Quartz platforms.",
    description: "Natural marble and granite have microscopic pores that greedily absorb turmeric haldi, cooking oils, wine, lemon juice, and tea. StoneArmor penetrates up to 5mm below the stone matrix, anchoring silane bonds that stop liquids from soaking into the stone, without leaving an artificial plastic gloss.",
    thumbnail: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1000&q=80"
    ],
    features: [
      "Prevents yellow haldi, mustard oil, and citrus etching",
      "Impregnating sub-surface technology — zero sticky residue",
      "Certified food-contact safe for kitchen food prep counters",
      "Preserves original natural stone breathability & color depth",
      "Long-lasting 12 to 18-month single treatment durability"
    ],
    howToUse: [
      { step: "01. Prep", text: "Clean stone surface with neutral cleaner and let dry 24 hours." },
      { step: "02. Pour & Spread", text: "Pour small puddles and spread evenly with lint-free microfiber pad." },
      { step: "03. Dwell", text: "Let penetrate for 15-20 minutes. Apply second coat if stone is highly porous." },
      { step: "04. Buff", text: "Wipe off excess liquid with a dry cloth before it dries sticky." }
    ],
    suitableFor: [
      "Italian Bottochino, Statuario, Dyna & Makrana white marble",
      "Black Galaxy, Tan Brown & Kashmir white granite countertops",
      "Pooja mandir marble flooring & backdrops",
      "Engineered Quartz & Dekton kitchen islands"
    ],
    notSuitableFor: [
      "Pre-sealed glossy resin epoxies without prior degreasing"
    ],
    specs: {
      "Volume": "500ml",
      "Coverage": "150 - 200 sq. ft. depending on porosity",
      "Finish": "Natural invisible matte / unchanged sheen"
    },
    relatedProducts: [1, 2, 8]
  },
  {
    id: 5,
    name: "Hard Water Pro Mineral & Scale Dissolver Gel",
    slug: "hard-water-pro-scale-dissolver-gel",
    category: "Cleaners",
    productType: "Heavy Cleaner",
    surface: ["Glass", "Bathroom", "Ceramic", "Metal"],
    concerns: ["Hard Water Stains", "Glass Water Marks"],
    rooms: ["Bathroom", "Kitchen"],
    price: 549,
    originalPrice: 799,
    discount: 31,
    rating: 4.7,
    reviewCount: 285,
    badge: "FAST ACTING",
    isFeatured: true,
    isCombo: false,
    stockStatus: "in_stock",
    size: "500ml Clinging Gel Bottle",
    shortDescription: "Thick clinging formula that breaks down years of hard water calcium and magnesium crust in 5 minutes.",
    description: "Unlike watery cleaners that drip down immediately, our high-viscosity active gel adheres to vertical glass partitions and bathroom tiles, actively chewing through calcium carbonate, iron scaling, and soap crust without harmful hydrochloric acid fumes.",
    thumbnail: "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=80"
    ],
    features: [
      "Clings to vertical glass and tiles without running down",
      "No choking fumes or harsh corrosive acid vapors",
      "Effortlessly removes tough borewell & tanker water stains",
      "Restores cloudy shower enclosures to crystal transparency"
    ],
    howToUse: [
      { step: "01. Apply Gel", text: "Squirt or wipe gel evenly over dry affected glass or tile." },
      { step: "02. Wait", text: "Let it work for 5-7 minutes without letting it completely dry out." },
      { step: "03. Scrub & Rinse", text: "Scrub with white pad and rinse with abundant water." }
    ],
    suitableFor: [
      "Glass shower cabins",
      "Ceramic washbasins and commode bowls",
      "Glazed wall tiles & bathtub basins"
    ],
    notSuitableFor: [
      "Polished natural marble (will cause acid etch spots)"
    ],
    specs: {
      "Volume": "500ml",
      "Form": "High-viscosity clinging gel",
      "Scent": "Fresh Crisp Citrus"
    },
    relatedProducts: [1, 6]
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
    relatedProducts: [4, 8]
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
    relatedProducts: [1, 2, 4]
  },
  {
    id: 10,
    name: "Leather Luxe 2-in-1 Condition & Stain Shield",
    slug: "leather-luxe-condition-stain-shield",
    category: "Protection",
    productType: "Surface Protector",
    surface: ["Leather", "Leather & Leatherette"],
    concerns: ["Sofa & Fabric Stains"],
    rooms: ["Living Room", "Bedroom"],
    price: 749,
    originalPrice: 1099,
    discount: 31,
    rating: 4.7,
    reviewCount: 118,
    badge: "UV DEFENSE",
    isFeatured: false,
    isCombo: false,
    stockStatus: "in_stock",
    size: "350ml Pump Bottle",
    shortDescription: "Restores supple moisture to leather couches & car seats while repels pen marks, body sweat, and denim color transfer.",
    description: "Prevents leather cracking in Indian summer heat. Penetrates deep with natural lanolin and beeswax micro-emulsions while creating a breathable shield against ink marks, body oils, and blue denim dye stains.",
    thumbnail: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=80"
    ],
    features: [
      "Prevents dry leather cracking and UV discoloration",
      "Protects against blue denim transfer & oily hair oils",
      "Non-slippery, matte factory finish — zero synthetic stickiness",
      "Pleasant subtle genuine leather fragrance"
    ],
    howToUse: [
      { step: "01. Pump", text: "Dispense small amount onto soft applicator sponge." },
      { step: "02. Massage", text: "Gently massage into leather in circular motions." },
      { step: "03. Buff", text: "Buff dry with clean microfiber towel after 10 minutes." }
    ],
    suitableFor: [
      "Full grain, top grain and bonded leather sofas",
      "Leatherette & PU recliner armchairs",
      "Automotive leather car seats & steering wheels"
    ],
    notSuitableFor: [
      "Raw suede or nubuck leather"
    ],
    specs: {
      "Volume": "350ml",
      "Finish": "Rich soft matte",
      "Application Frequency": "Every 3 to 6 months"
    },
    relatedProducts: [1, 2, 8]
  },
  {
    id: 11,
    name: "GroutBright Deep Tile & Joint Whitener Shield",
    slug: "groutbright-tile-joint-whitener-shield",
    category: "Cleaners",
    productType: "Heavy Cleaner",
    surface: ["Tiles", "Bathroom"],
    concerns: ["Bathroom Stains", "Tile Dirt"],
    rooms: ["Bathroom", "Kitchen", "Balcony"],
    price: 499,
    originalPrice: 699,
    discount: 28,
    rating: 4.6,
    reviewCount: 154,
    badge: "DEEP CLEAN",
    isFeatured: false,
    isCombo: false,
    stockStatus: "in_stock",
    size: "500ml Pointed Nozzle Bottle",
    shortDescription: "Dissolves black mold, trapped soap grime, and dirt from floor tile grout lines with precision applicator tip.",
    description: "Dirty grout lines make even expensive bathrooms and living room floors look worn out. GroutBright penetrates the porous grout channel, breaking down entrenched dirt and locking in a stain barrier that stops future moisture seepage.",
    thumbnail: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1000&q=80"
    ],
    features: [
      "Precision applicator tip for direct grout line targeting",
      "Eliminates dark mold & mildew staining",
      "Leaves protective sealant behind to prevent new grime",
      "Fast action in under 5 minutes"
    ],
    howToUse: [
      { step: "01. Apply", text: "Trace nozzle directly along tile grout lines." },
      { step: "02. Wait", text: "Let sit for 5 minutes." },
      { step: "03. Brush & Rinse", text: "Lightly scrub with grout brush and rinse with water." }
    ],
    suitableFor: [
      "Bathroom floor & wall tile joints",
      "Kitchen floor vitrified grout",
      "Balcony exterior tile channels"
    ],
    notSuitableFor: [
      "Unsealed acid-sensitive limestone joints"
    ],
    specs: {
      "Volume": "500ml Precision Tip",
      "Coverage": "Over 200 linear meters of grout"
    },
    relatedProducts: [3, 5, 6]
  },
  {
    id: 12,
    name: "UltraGlow Multi-Surface Daily Rapid Cleaner & Dust Shield",
    slug: "ultraglow-multi-surface-daily-cleaner",
    category: "Cleaners",
    productType: "Daily Cleaner",
    surface: ["Multi-Surface", "Glass", "Wood", "Metal"],
    concerns: ["Glass Water Marks", "Tile Dirt"],
    rooms: ["Living Room", "Bedroom", "Kitchen"],
    price: 399,
    originalPrice: 549,
    discount: 27,
    rating: 4.8,
    reviewCount: 388,
    badge: "EVERYDAY ESSENTIAL",
    isFeatured: true,
    isCombo: false,
    stockStatus: "in_stock",
    size: "500ml Trigger Spray",
    shortDescription: "One spray for everything: Glass, laminate, appliances, dining tables and electronics with antistatic dust repellent.",
    description: "The ultimate daily housekeeping companion. Non-toxic, streak-free, and powered by plant surfactants. Neutralizes static charges so fine airborne dust doesn't resettle on TV screens, glass tables, or glossy wardrobes for days.",
    thumbnail: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80"
    ],
    features: [
      "Safe on 15+ different household surfaces",
      "Antistatic formula cuts down dusting frequency by half",
      "Zero ammonia or harsh chlorine bleach",
      "Subtle botanical jasmine & white tea aroma"
    ],
    howToUse: [
      { step: "01. Spray", text: "Spray lightly onto surface or directly on microfiber cloth." },
      { step: "02. Wipe", text: "Wipe with clean dry microfiber for instant streak-free shine." }
    ],
    suitableFor: [
      "Laminates, acrylic cabinets & desks",
      "TV & laptop screens, monitors, glass tabletops",
      "Stainless steel refrigerators, microwaves & handles"
    ],
    notSuitableFor: [
      "Raw unsealed natural wood"
    ],
    specs: {
      "Volume": "500ml",
      "Fragrance": "Jasmine & White Tea",
      "Eco-Friendly": "100% Biodegradable Surfactants"
    },
    relatedProducts: [1, 2, 6, 7]
  }
];
