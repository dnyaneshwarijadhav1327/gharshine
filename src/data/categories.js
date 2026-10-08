/**
 * Centralized Categories, Surfaces, Concerns, and Rooms Data
 */

export const surfaces = [
  {
    id: "fabric",
    name: "Sofa & Fabric",
    slug: "fabric",
    shortDesc: "Fabric sofas, dining chairs, rugs, curtains & cushions",
    image: "/images/surface-fabric.png",
    itemCount: 4,
    startingPrice: 799,
    features: ["Hydrophobic liquid repellent", "Prevents chai, coffee & curry stains", "Zero fabric stiffness"]
  },
  {
    id: "glass",
    name: "Shower Glass & Mirrors",
    slug: "glass",
    shortDesc: "Shower cubicles, mirrors, windows & glass railings",
    image: "/images/surface-glass.jpg",
    itemCount: 4,
    startingPrice: 499,
    features: ["Repels hard water stains", "Fog & fingerprint resistant", "Crystal clear shine"]
  },
  {
    id: "marble",
    name: "Marble & Natural Stone",
    slug: "marble",
    shortDesc: "Italian marble flooring, vanity tops & Pooja mandirs",
    image: "/images/surface-marble.png",
    itemCount: 4,
    startingPrice: 899,
    features: ["Acid & turmeric etch barrier", "Deep pore sealing", "Breathable natural sheen"]
  },
  {
    id: "wood",
    name: "Wood & Veneer",
    slug: "wood",
    shortDesc: "Dining tables, credenzas, wooden doors & wardrobes",
    image: "/images/surface-wood.jpg",
    itemCount: 3,
    startingPrice: 599,
    features: ["Moisture & cup-ring barrier", "Enriches grain luster", "Non-sticky protective coat"]
  },
  {
    id: "leather",
    name: "Leather & Leatherette",
    slug: "leather",
    shortDesc: "Leather couches, recliner chairs & car upholstery",
    image: "/images/surface-leather.jpg",
    itemCount: 2,
    startingPrice: 749,
    features: ["Conditioning + stain shield", "UV crack protection", "Supple matte finish"]
  },
  {
    id: "tiles",
    name: "Tiles & Basins",
    slug: "tiles",
    shortDesc: "Floor tiles, balcony vitrified tiles & bathroom basins",
    image: "/images/concern-hardwater.jpg",
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
    image: "/images/concern-hardwater.jpg",
    solutionName: "Glass & Chrome Scale Dissolver + Hydrophobic Nano-Shield",
    badge: "Borewell Water Tested",
    slug: "hard-water-stains"
  },
  {
    id: "marble-etching",
    title: "Marble Haldi & Acid Etching",
    subtitle: "Lemon, tomato acid etching and deep cooking oil absorption",
    image: "/images/concern-marble.jpg",
    solutionName: "StoneArmor Impregnating Breathable Sealant",
    badge: "Natural Stone Defense",
    slug: "marble-etching"
  },
  {
    id: "sofa-fabric-stains",
    title: "Sofa Chai & Spills Absorption",
    subtitle: "Chai, coffee, turmeric & juice stains on expensive upholstery",
    image: "/images/concern-sofa.jpg",
    solutionName: "HydroBarrier Fabric Guard Liquid Shield",
    badge: "Zero Fabric Stiffness",
    slug: "sofa-fabric-stains"
  },
  {
    id: "wood-water-rings",
    title: "Wood Cup Rings & Moisture",
    subtitle: "Condensation cup marks, UV fading and dry dull timber",
    image: "/images/concern-wood.jpg",
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
    image: "/images/surface-glass.jpg",
    startingPrice: 1399,
    kitName: "Bathroom Care & Protection Kit",
    includedSurfaces: ["Glass", "Tiles", "Chrome Fittings", "Ceramic"],
    slug: "bathroom"
  },
  {
    id: "living-room",
    title: "Living Room",
    subtitle: "Fabric Sofas, Center Table, Veneer Cabinets & Rugs",
    image: "/images/surface-fabric.png",
    startingPrice: 1599,
    kitName: "Living Room Stain Defense Kit",
    includedSurfaces: ["Fabric", "Wood", "Glass", "Leather"],
    slug: "living-room"
  },
  {
    id: "kitchen",
    title: "Kitchen & Dining",
    subtitle: "Granite Platform, Sinks, Chimney & Backsplash",
    image: "/images/surface-marble.png",
    startingPrice: 1499,
    kitName: "Kitchen Anti-Grease & Stone Kit",
    includedSurfaces: ["Granite", "Steel", "Ceramic Tiles", "Glass"],
    slug: "kitchen"
  },
  {
    id: "bedroom",
    title: "Bedroom & Furniture",
    subtitle: "Mattresses, Headboards, Dressing Mirrors & Wardrobes",
    image: "/images/surface-wood.jpg",
    startingPrice: 1199,
    kitName: "Bedroom Sanctuary Surface Kit",
    includedSurfaces: ["Upholstery", "Mirrors", "Laminate Wood"],
    slug: "bedroom"
  }
];
