/**
 * Centralized Categories, Surfaces, Concerns, and Rooms Data
 */

export const surfaces = [
  {
    id: "glass",
    name: "Glass & Mirrors",
    slug: "glass",
    shortDesc: "Shower cubicles, mirrors, windows & glass railings",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80",
    itemCount: 4,
    startingPrice: 499,
    features: ["Repels hard water stains", "Fog & fingerprint resistant", "Crystal clear shine"]
  },
  {
    id: "ceramic",
    name: "Ceramic & Sanitaryware",
    slug: "ceramic",
    shortDesc: "Washbasins, commodes, glazed tiles & fittings",
    image: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=600&q=80",
    itemCount: 5,
    startingPrice: 549,
    features: ["Scale-resistant shield", "Prevents yellowing", "Smooth easy wipe-down"]
  },
  {
    id: "bathroom",
    name: "Complete Bathroom",
    slug: "bathroom",
    shortDesc: "Taps, shower partitions, chrome fittings & wall tiles",
    image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=600&q=80",
    itemCount: 6,
    startingPrice: 699,
    features: ["Anti-hard water protection", "Shines chrome & CP fittings", "Resists soap scum"]
  },
  {
    id: "fabric",
    name: "Sofa & Fabric",
    slug: "fabric",
    shortDesc: "Fabric sofas, dining chairs, rugs, curtains & cushions",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80",
    itemCount: 4,
    startingPrice: 799,
    features: ["Hydrophobic liquid repellent", "Prevents chai, coffee & curry stains", "Zero fabric stiffness"]
  },
  {
    id: "marble",
    name: "Marble & Natural Stone",
    slug: "marble",
    shortDesc: "Italian marble flooring, vanity tops & Pooja mandirs",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80",
    itemCount: 4,
    startingPrice: 899,
    features: ["Acid & turmeric etch barrier", "Deep pore sealing", "Breathable natural sheen"]
  },
  {
    id: "granite",
    name: "Granite & Countertops",
    slug: "granite",
    shortDesc: "Kitchen platforms, breakfast bars & outdoor counters",
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80",
    itemCount: 3,
    startingPrice: 699,
    features: ["Oil & masala stain defense", "Food-safe touch formula", "Heat-resilient finish"]
  },
  {
    id: "wood",
    name: "Wood & Veneer",
    slug: "wood",
    shortDesc: "Dining tables, credenzas, wooden doors & wardrobes",
    image: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=600&q=80",
    itemCount: 3,
    startingPrice: 599,
    features: ["Moisture & cup-ring barrier", "Enriches grain luster", "Non-sticky protective coat"]
  },
  {
    id: "leather",
    name: "Leather & Leatherette",
    slug: "leather",
    shortDesc: "Leather couches, recliner chairs & car upholstery",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80",
    itemCount: 2,
    startingPrice: 749,
    features: ["Conditioning + stain shield", "UV crack protection", "Supple matte finish"]
  },
  {
    id: "tiles",
    name: "Tiles & Grout",
    slug: "tiles",
    shortDesc: "Floor tiles, balcony vitrified tiles & grout lines",
    image: "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&w=600&q=80",
    itemCount: 3,
    startingPrice: 549,
    features: ["Stops blackened grout", "Anti-skid safe sheen", "Repels grime & muddy footprints"]
  },
  {
    id: "kitchen",
    name: "Kitchen & Appliances",
    slug: "kitchen",
    shortDesc: "Gas hobs, chimneys, stainless steel sinks & backsplashes",
    image: "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&w=600&q=80",
    itemCount: 5,
    startingPrice: 599,
    features: ["Dissolves sticky tadka grease", "Repels future oil splatters", "Streak-free stainless shine"]
  },
  {
    id: "metal",
    name: "Metal, Brass & Copper",
    slug: "metal",
    shortDesc: "Brass Pooja idols, copper vessels, bronze & chrome",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=80",
    itemCount: 3,
    startingPrice: 499,
    features: ["Anti-tarnish shield for months", "Gentle non-abrasive action", "Mirror-like shine"]
  },
  {
    id: "multi-surface",
    name: "Multi-Surface All-Rounder",
    slug: "multi-surface",
    shortDesc: "Everyday rapid cleaner & protector for all non-porous surfaces",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80",
    itemCount: 4,
    startingPrice: 449,
    features: ["Universal formulation", "Daily dust & fingerprint repellent", "Fresh subtle botanical scent"]
  }
];

export const concerns = [
  {
    id: "hard-water-stains",
    title: "Hard Water Stains",
    subtitle: "Stubborn white mineral scaling on glass partitions & chrome taps",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80",
    solutionName: "Glass & Chrome Scale Dissolver + Hydrophobic Nano-Shield",
    badge: "Most Common Indian Concern",
    slug: "hard-water-stains"
  },
  {
    id: "sofa-fabric-stains",
    title: "Sofa & Fabric Spills",
    subtitle: "Chai, coffee, turmeric & juice stains on expensive upholstery",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80",
    solutionName: "HydroBarrier Fabric Guard Liquid Shield",
    badge: "Spill-Proof Protection",
    slug: "sofa-fabric-stains"
  },
  {
    id: "kitchen-grease",
    title: "Tadka & Kitchen Grease",
    subtitle: "Sticky oil films on chimneys, tiles, cabinets & stove tops",
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80",
    solutionName: "BioDegrease Active Foam + Oleophobic Guard",
    badge: "Heavy Grease Defense",
    slug: "kitchen-grease"
  },
  {
    id: "marble-etching",
    title: "Marble & Granite Discoloration",
    subtitle: "Lemon, tomato acid etching and deep oil absorption",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    solutionName: "StoneArmor Impregnating Breathable Sealant",
    badge: "Italian & Indian Marble",
    slug: "marble-etching"
  },
  {
    id: "bathroom-soap-scum",
    title: "Bathroom Soap Scum & Grout Grime",
    subtitle: "Blackened tile grout lines and dull matte sanitaryware",
    image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=800&q=80",
    solutionName: "BathGleam Total Restorative System",
    badge: "Deep Bathroom Renewal",
    slug: "bathroom-soap-scum"
  },
  {
    id: "wood-water-rings",
    title: "Wood Water Rings & Dullness",
    subtitle: "Condensation cup marks, UV fading and dry dull timber",
    image: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=800&q=80",
    solutionName: "LustreWood Carnauba-Ceramic Polish & Seal",
    badge: "Natural Timber Care",
    slug: "wood-water-rings"
  }
];

export const rooms = [
  {
    id: "bathroom",
    title: "Bathroom",
    subtitle: "Glass Partitions, Shower Fittings, Washbasin & Tiles",
    image: "https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&w=800&q=80",
    startingPrice: 1399,
    kitName: "Bathroom Care & Protection Kit",
    includedSurfaces: ["Glass", "Tiles", "Chrome Fittings", "Ceramic"],
    slug: "bathroom"
  },
  {
    id: "living-room",
    title: "Living Room",
    subtitle: "Fabric Sofas, Center Table, Veneer Cabinets & Rugs",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80",
    startingPrice: 1599,
    kitName: "Living Room Stain Defense Kit",
    includedSurfaces: ["Fabric", "Wood", "Glass", "Leather"],
    slug: "living-room"
  },
  {
    id: "kitchen",
    title: "Kitchen",
    subtitle: "Granite Platform, Sinks, Chimney & Backsplash",
    image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80",
    startingPrice: 1499,
    kitName: "Kitchen Anti-Grease & Stone Kit",
    includedSurfaces: ["Granite", "Steel", "Ceramic Tiles", "Glass"],
    slug: "kitchen"
  },
  {
    id: "bedroom",
    title: "Bedroom",
    subtitle: "Mattresses, Headboards, Dressing Mirrors & Wardrobes",
    image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80",
    startingPrice: 1199,
    kitName: "Bedroom Sanctuary Surface Kit",
    includedSurfaces: ["Upholstery", "Mirrors", "Laminate Wood"],
    slug: "bedroom"
  },
  {
    id: "pooja-room",
    title: "Pooja Mandir & Brass Area",
    subtitle: "Marble Flooring, Brass Idols, Copper Kalash & Silver Diya",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
    startingPrice: 999,
    kitName: "Sacred Shringar Brass & Stone Kit",
    includedSurfaces: ["Brass", "Copper", "White Marble", "Silver"],
    slug: "pooja-room"
  },
  {
    id: "balcony",
    title: "Balcony & Outdoor",
    subtitle: "Glass Railings, Outdoor Tiles & Metal Furniture",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
    startingPrice: 1299,
    kitName: "WeatherGuard Balcony Kit",
    includedSurfaces: ["Exterior Glass", "Vitrified Tiles", "Powder-coated Metal"],
    slug: "balcony"
  }
];
