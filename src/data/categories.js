/**
 * Centralized Categories, Surfaces, Concerns, and Rooms Data
 */

export const surfaces = [
  {
    id: "fabric",
    name: "Sofa & Fabric",
    slug: "fabric",
    shortDesc: "Fabric sofas, dining chairs, rugs, curtains & cushions",
    image: "https://www.invisel.in/cdn/shop/files/ebf291dae363b116169b941ee866b8ad999ddc91.png?v=1784298376&width=600",
    itemCount: 4,
    startingPrice: 799,
    features: ["Hydrophobic liquid repellent", "Prevents chai, coffee & curry stains", "Zero fabric stiffness"]
  },
  {
    id: "glass",
    name: "Shower Glass & Mirrors",
    slug: "glass",
    shortDesc: "Shower cubicles, mirrors, windows & glass railings",
    image: "https://www.invisel.in/cdn/shop/files/hero_image_31d6d9f6-e59d-48cd-bc98-987f36df7120.jpg?v=1786437836&width=600",
    itemCount: 4,
    startingPrice: 499,
    features: ["Repels hard water stains", "Fog & fingerprint resistant", "Crystal clear shine"]
  },
  {
    id: "marble",
    name: "Marble & Natural Stone",
    slug: "marble",
    shortDesc: "Italian marble flooring, vanity tops & Pooja mandirs",
    image: "https://www.invisel.in/cdn/shop/files/four-white-marble-tiles-with-a-transparent-background-png.png?v=1784298356&width=600",
    itemCount: 4,
    startingPrice: 899,
    features: ["Acid & turmeric etch barrier", "Deep pore sealing", "Breathable natural sheen"]
  },
  {
    id: "wood",
    name: "Wood & Veneer",
    slug: "wood",
    shortDesc: "Dining tables, credenzas, wooden doors & wardrobes",
    image: "https://www.invisel.in/cdn/shop/files/heroimage_b559f3ff-c795-4df2-bbe4-718def08e5cc.jpg?v=1784289211&width=600",
    itemCount: 3,
    startingPrice: 599,
    features: ["Moisture & cup-ring barrier", "Enriches grain luster", "Non-sticky protective coat"]
  },
  {
    id: "leather",
    name: "Leather & Leatherette",
    slug: "leather",
    shortDesc: "Leather couches, recliner chairs & car upholstery",
    image: "https://www.invisel.in/cdn/shop/files/hero_image_b4de9e3f-0122-49e9-b530-b502399b3a1e.jpg?v=1784289416&width=600",
    itemCount: 2,
    startingPrice: 749,
    features: ["Conditioning + stain shield", "UV crack protection", "Supple matte finish"]
  },
  {
    id: "tiles",
    name: "Tiles & Basins",
    slug: "tiles",
    shortDesc: "Floor tiles, balcony vitrified tiles & bathroom basins",
    image: "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&w=600&q=80",
    itemCount: 3,
    startingPrice: 549,
    features: ["Stops blackened grout", "Anti-skid safe sheen", "Repels grime & muddy footprints"]
  }
];

export const concerns = [
  {
    id: "hard-water-stains",
    title: "Hard Water Mineral Scale",
    subtitle: "Stubborn white mineral scaling on glass partitions & chrome taps",
    image: "https://www.invisel.in/cdn/shop/files/image_1_47dc88af-b2a7-4d06-b685-04ad89a5e56e.jpg?v=1784298033&width=800",
    solutionName: "Glass & Chrome Scale Dissolver + Hydrophobic Nano-Shield",
    badge: "Borewell Water Tested",
    slug: "hard-water-stains"
  },
  {
    id: "marble-etching",
    title: "Marble Haldi & Acid Etching",
    subtitle: "Lemon, tomato acid etching and deep cooking oil absorption",
    image: "https://www.invisel.in/cdn/shop/files/image_2_e688e54b-e432-4b6a-b2d9-852064188971.jpg?v=1784298062&width=800",
    solutionName: "StoneArmor Impregnating Breathable Sealant",
    badge: "Natural Stone Defense",
    slug: "marble-etching"
  },
  {
    id: "sofa-fabric-stains",
    title: "Sofa Chai & Spills Absorption",
    subtitle: "Chai, coffee, turmeric & juice stains on expensive upholstery",
    image: "https://www.invisel.in/cdn/shop/files/image_3.jpg?v=1784298076&width=800",
    solutionName: "HydroBarrier Fabric Guard Liquid Shield",
    badge: "Zero Fabric Stiffness",
    slug: "sofa-fabric-stains"
  },
  {
    id: "wood-water-rings",
    title: "Wood Cup Rings & Moisture",
    subtitle: "Condensation cup marks, UV fading and dry dull timber",
    image: "https://www.invisel.in/cdn/shop/files/image_4.jpg?v=1784298090&width=800",
    solutionName: "LustreWood Carnauba-Ceramic Polish & Seal",
    badge: "Moisture-Proof",
    slug: "wood-water-rings"
  }
];

export const rooms = [
  {
    id: "bathroom",
    title: "Bathroom",
    subtitle: "Glass Partitions, Shower Fittings, Washbasin & Tiles",
    image: "https://www.invisel.in/cdn/shop/files/hero_image_31d6d9f6-e59d-48cd-bc98-987f36df7120.jpg?v=1786437836&width=800",
    startingPrice: 1399,
    kitName: "Bathroom Care & Protection Kit",
    includedSurfaces: ["Glass", "Tiles", "Chrome Fittings", "Ceramic"],
    slug: "bathroom"
  },
  {
    id: "living-room",
    title: "Living Room",
    subtitle: "Fabric Sofas, Center Table, Veneer Cabinets & Rugs",
    image: "https://www.invisel.in/cdn/shop/files/ebf291dae363b116169b941ee866b8ad999ddc91.png?v=1784298376&width=800",
    startingPrice: 1599,
    kitName: "Living Room Stain Defense Kit",
    includedSurfaces: ["Fabric", "Wood", "Glass", "Leather"],
    slug: "living-room"
  },
  {
    id: "kitchen",
    title: "Kitchen & Dining",
    subtitle: "Granite Platform, Sinks, Chimney & Backsplash",
    image: "https://www.invisel.in/cdn/shop/files/four-white-marble-tiles-with-a-transparent-background-png.png?v=1784298356&width=800",
    startingPrice: 1499,
    kitName: "Kitchen Anti-Grease & Stone Kit",
    includedSurfaces: ["Granite", "Steel", "Ceramic Tiles", "Glass"],
    slug: "kitchen"
  },
  {
    id: "bedroom",
    title: "Bedroom & Furniture",
    subtitle: "Mattresses, Headboards, Dressing Mirrors & Wardrobes",
    image: "https://www.invisel.in/cdn/shop/files/heroimage_b559f3ff-c795-4df2-bbe4-718def08e5cc.jpg?v=1784289211&width=800",
    startingPrice: 1199,
    kitName: "Bedroom Sanctuary Surface Kit",
    includedSurfaces: ["Upholstery", "Mirrors", "Laminate Wood"],
    slug: "bedroom"
  }
];
