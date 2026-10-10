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

    // 1. Check live Shopify products FIRST so real images, titles & prices always show!
    try {
      // Try direct handle lookup
      const shopifyData = await shopifyFetch({
        query: SHOPIFY_QUERIES.GET_PRODUCT_BY_HANDLE,
        variables: { handle: cleanSlug }
      });
      if (shopifyData?.product) {
        const liveProduct = formatShopifyProduct(shopifyData.product);
        if (liveProduct) {
          const localMatch = products.find(
            (p) => p.slug === cleanSlug || p.name.toLowerCase() === liveProduct.name.toLowerCase()
          );
          if (localMatch) {
            return {
              success: true,
              data: {
                ...localMatch,
                ...liveProduct,
                thumbnail: liveProduct.thumbnail,
                images: liveProduct.images && liveProduct.images.length > 0 ? liveProduct.images : localMatch.images
              }
            };
          }
          return { success: true, data: liveProduct };
        }
      }

      // Check all products list in Shopify for handle, id, or title match
      const allShopifyData = await shopifyFetch({
        query: SHOPIFY_QUERIES.GET_PRODUCTS,
        variables: { first: 50 }
      });
      if (allShopifyData?.products?.edges) {
        const match = allShopifyData.products.edges.find((e) => {
          const h = (e.node.handle || '').toLowerCase();
          const t = (e.node.title || '').toLowerCase();
          return (
            h === cleanSlug ||
            e.node.id === cleanSlug ||
            h.includes(cleanSlug) ||
            cleanSlug.includes(h) ||
            t.includes(cleanSlug.replace(/-/g, ' '))
          );
        });
        if (match) {
          const liveProduct = formatShopifyProduct(match.node);
          if (liveProduct) {
            const localMatch = products.find(
              (p) => p.slug === cleanSlug || p.name.toLowerCase() === liveProduct.name.toLowerCase()
            );
            if (localMatch) {
              return {
                success: true,
                data: {
                  ...localMatch,
                  ...liveProduct,
                  thumbnail: liveProduct.thumbnail,
                  images: liveProduct.images && liveProduct.images.length > 0 ? liveProduct.images : localMatch.images
                }
              };
            }
            return { success: true, data: liveProduct };
          }
        }
      }
    } catch (e) {
      console.warn('Error fetching live product from Shopify:', e);
    }

    // 2. Map combo & room kit aliases if Shopify lookup had no direct match
    const slugAliases = {
      'glass-ceramics-cleaning-protection-combo': 'bathroom-protector-kit',
      'ultimate-whole-home-protection-combo': 'living-room-complete-protection-kit',
      'bathroom-kit': 'bathroom-protector-kit',
      'living-room-kit': 'living-room-complete-protection-kit',
      'kitchen-kit': 'biodegrease-kitchen-hob-chimney-cleaner',
      'balcony-kit': 'groutbright-tile-joint-whitener-shield',
      'dining-kit': 'lustrewood-carnauba-ceramic-polish-shield'
    };

    const targetSlug = slugAliases[cleanSlug] || cleanSlug;

    // 3. Fallback to local catalog
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
