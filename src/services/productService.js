import { products } from '../data/products';
import { surfaces, concerns, rooms } from '../data/categories';
import { shopifyFetch, SHOPIFY_QUERIES, formatShopifyProduct } from './shopify';

/**
 * Product Service (Hybrid Layer: Shopify Live API + Fallback Catalog)
 */

export const productService = {
  // Fetch all products with optional filtering and sorting
  async getProducts(params = {}) {
    let result = [...products];

    // Attempt live Shopify fetch
    try {
      const shopifyData = await shopifyFetch({
        query: SHOPIFY_QUERIES.GET_PRODUCTS,
        variables: { first: 50 }
      });

      if (shopifyData?.products?.edges?.length > 0) {
        const liveShopifyProducts = shopifyData.products.edges
          .map((e) => formatShopifyProduct(e.node))
          .filter(Boolean);
        if (liveShopifyProducts.length > 0) {
          result = [...liveShopifyProducts, ...products];
        }
      }
    } catch (e) {
      console.log('Using local catalog products:', e);
    }

    // Filter by Category
    if (params.category && params.category !== 'All') {
      result = result.filter(
        (p) => p.category?.toLowerCase() === params.category.toLowerCase()
      );
    }

    // Filter by Surface
    if (params.surface && params.surface !== 'All') {
      result = result.filter((p) =>
        p.surface?.some((s) => s.toLowerCase().includes(params.surface.toLowerCase()))
      );
    }

    // Filter by Concern
    if (params.concern && params.concern !== 'All') {
      result = result.filter((p) =>
        p.concerns?.some((c) => c.toLowerCase().includes(params.concern.toLowerCase()))
      );
    }

    // Filter by Room
    if (params.room && params.room !== 'All') {
      result = result.filter((p) =>
        p.rooms?.some((r) => r.toLowerCase().includes(params.room.toLowerCase()))
      );
    }

    // Filter by Price range
    if (params.maxPrice) {
      result = result.filter((p) => p.price <= Number(params.maxPrice));
    }

    // Filter by Rating
    if (params.minRating) {
      result = result.filter((p) => p.rating >= Number(params.minRating));
    }

    // Search query
    if (params.search) {
      const q = params.search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name?.toLowerCase().includes(q) ||
          p.shortDescription?.toLowerCase().includes(q) ||
          p.surface?.some((s) => s.toLowerCase().includes(q)) ||
          p.concerns?.some((c) => c.toLowerCase().includes(q))
      );
    }

    // Sort
    if (params.sortBy) {
      switch (params.sortBy) {
        case 'price-asc':
          result.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          result.sort((a, b) => b.price - a.price);
          break;
        case 'rating-desc':
          result.sort((a, b) => b.rating - a.rating);
          break;
        case 'newest':
          result.sort((a, b) => b.id - a.id);
          break;
        case 'discount-desc':
          result.sort((a, b) => b.discount - a.discount);
          break;
        default:
          break;
      }
    }

    return {
      success: true,
      total: result.length,
      data: result
    };
  },

  // Get single product by slug
  async getProductBySlug(slug) {
    if (!slug) return { success: false, error: 'Invalid slug' };

    const cleanSlug = slug.toLowerCase().trim();

    // Map combo & room kit aliases directly
    const slugAliases = {
      'glass-ceramics-cleaning-protection-combo': 'bathroom-protector-kit',
      'sofa-fabric-stain-repellent-combo': 'hydrobarrier-sofa-fabric-stain-repellent',
      'ultimate-whole-home-protection-combo': 'living-room-complete-protection-kit',
      'bathroom-protector-kit': 'bathroom-protector-kit',
      'bathroom-kit': 'bathroom-protector-kit',
      'living-room-kit': 'living-room-complete-protection-kit',
      'kitchen-protector-kit': 'biodegrease-kitchen-hob-chimney-cleaner',
      'kitchen-kit': 'biodegrease-kitchen-hob-chimney-cleaner',
      'balcony-protection-kit': 'groutbright-tile-joint-whitener-shield',
      'balcony-kit': 'groutbright-tile-joint-whitener-shield',
      'dining-table-combo': 'lustrewood-carnauba-ceramic-polish-shield',
      'dining-kit': 'lustrewood-carnauba-ceramic-polish-shield'
    };

    const targetSlug = slugAliases[cleanSlug] || cleanSlug;

    // Check in local catalog first
    let product = products.find(
      (p) => p.slug === targetSlug || p.slug === cleanSlug || String(p.id) === cleanSlug
    );

    // Fuzzy matching if exact slug not found
    if (!product) {
      product = products.find(
        (p) =>
          cleanSlug.includes(p.slug) ||
          p.slug.includes(cleanSlug) ||
          p.name.toLowerCase().includes(cleanSlug.replace(/-/g, ' '))
      );
    }
    
    if (!product) {
      // Check live shopify products
      try {
        const shopifyData = await shopifyFetch({
          query: SHOPIFY_QUERIES.GET_PRODUCTS,
          variables: { first: 50 }
        });
        if (shopifyData?.products?.edges) {
          const match = shopifyData.products.edges.find(e => e.node.handle === cleanSlug);
          if (match) {
            product = formatShopifyProduct(match.node);
          }
        }
      } catch (e) {
        console.warn('Error fetching slug from Shopify:', e);
      }
    }

    // Default fallback to first product if still not found so user NEVER gets a broken page
    if (!product) {
      product = products[0];
    }

    return { success: true, data: product };
  },

  // Get featured bestseller products
  async getBestsellers() {
    return {
      success: true,
      data: products.filter((p) => p.isFeatured || p.badge === 'BESTSELLER')
    };
  },

  // Get featured combos
  async getCombos() {
    return {
      success: true,
      data: products.filter((p) => p.isCombo)
    };
  },

  // Get related products
  async getRelatedProducts(relatedIds = []) {
    const list = products.filter((p) => relatedIds?.includes(p.id));
    if (list.length < 4) {
      const rest = products.filter((p) => !relatedIds?.includes(p.id)).slice(0, 4 - list.length);
      return { success: true, data: [...list, ...rest] };
    }
    return { success: true, data: list };
  },

  // Get all surface categories
  async getSurfaces() {
    return { success: true, data: surfaces };
  },

  // Get all concerns
  async getConcerns() {
    return { success: true, data: concerns };
  },

  // Get all rooms
  async getRooms() {
    return { success: true, data: rooms };
  }
};
