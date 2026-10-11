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
          // Enhance live Shopify products with rich schema details (surface, howToUse, features)
          const enhancedLive = liveShopifyProducts.map((lp) => {
            const lpName = (lp.name || '').toLowerCase();
            const lpSlug = (lp.slug || '').toLowerCase();
            const localMatch = products.find((p) => {
              const pName = (p.name || '').toLowerCase();
              const pSlug = (p.slug || '').toLowerCase();
              if (lpSlug === pSlug) return true;
              if (lpSlug.includes('bathroom') && (pSlug.includes('bathroom') || pName.includes('bathroom'))) return true;
              if (lpSlug.includes('kitchen-foam') && (pSlug.includes('kitchen') || pName.includes('kitchen'))) return true;
              if (lpSlug.includes('sofa') && (pSlug.includes('sofa') || pSlug.includes('fabric'))) return true;
              if (lpSlug.includes('kitchen-protector') && (pSlug.includes('kitchen') || pName.includes('kitchen'))) return true;
              return false;
            });

            if (localMatch) {
              return {
                ...localMatch,
                ...lp,
                thumbnail: lp.thumbnail || localMatch.thumbnail,
                images: lp.images?.length > 0 ? lp.images : localMatch.images,
                surface: localMatch.surface || lp.surface,
                howToUse: localMatch.howToUse || lp.howToUse,
                features: localMatch.features || lp.features,
                suitableFor: localMatch.suitableFor || lp.suitableFor,
                notSuitableFor: localMatch.notSuitableFor || lp.notSuitableFor
              };
            }
            return lp;
          });

          // Deduplicate: filter out fallback products that match live Shopify products
          const liveSlugs = new Set(enhancedLive.map((p) => p.slug.toLowerCase()));
          const remainingLocal = products.filter((p) => {
            const pSlug = (p.slug || '').toLowerCase();
            const pName = (p.name || '').toLowerCase();
            if (pSlug.includes('bathroom-protector') || pName.includes('bathroom protector')) return false;
            if (pSlug.includes('kitchen') && liveSlugs.has('kitchen-foam-cleaner')) return false;
            if ((pSlug.includes('sofa') || pSlug.includes('fabric')) && liveSlugs.has('sofa-fabric-stain-repellent-combo')) return false;
            return !liveSlugs.has(pSlug);
          });

          result = [...enhancedLive, ...remainingLocal];
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

    // Map combo & room kit aliases to live Shopify handles
    const slugAliases = {
      'bathroom-protector-kit': 'bathroom-protector-kit-deep-clean-long-lasting-protection-for-glass-marble-fittings',
      'bathroom-kit': 'bathroom-protector-kit-deep-clean-long-lasting-protection-for-glass-marble-fittings',
      'complete-bathroom-care-shield-kit': 'bathroom-protector-kit-deep-clean-long-lasting-protection-for-glass-marble-fittings',
      'kitchen-kit': 'kitchen-protector-kit',
      'biodegrease-kitchen-hob-chimney-cleaner': 'kitchen-foam-cleaner',
      'living-room-kit': 'sofa-fabric-stain-repellent-combo',
      'living-room-complete-protection-kit': 'sofa-fabric-stain-repellent-combo',
      'hydrobarrier-sofa-fabric-stain-repellent': 'sofa-fabric-stain-repellent-combo',
      'glass-ceramics-cleaning-protection-combo': 'abc',
      'glass-tile-stain-repellent': 'glass-tile-hard-water-stain-repellent',
      'ultimate-whole-home-protection-combo': 'sofa-fabric-stain-repellent-combo',
      'balcony-kit': 'glass-tile-hard-water-stain-repellent',
      'dining-kit': 'kitchen-foam-cleaner'
    };

    const targetSlug = slugAliases[cleanSlug] || cleanSlug;

    // 1. Check live Shopify products FIRST so real images, titles & prices always show!
    try {
      // Try direct handle lookup
      const shopifyData = await shopifyFetch({
        query: SHOPIFY_QUERIES.GET_PRODUCT_BY_HANDLE,
        variables: { handle: targetSlug }
      });
      if (shopifyData?.product) {
        const liveProduct = formatShopifyProduct(shopifyData.product);
        if (liveProduct) {
          const localMatch = products.find(
            (p) => p.slug === cleanSlug || p.slug === targetSlug || p.name.toLowerCase() === liveProduct.name.toLowerCase()
          );
          if (localMatch) {
            return {
              success: true,
              data: {
                ...localMatch,
                ...liveProduct,
                thumbnail: liveProduct.thumbnail || localMatch.thumbnail,
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
            h === targetSlug ||
            h === cleanSlug ||
            e.node.id === targetSlug ||
            h.includes(targetSlug) ||
            targetSlug.includes(h) ||
            h.includes(cleanSlug) ||
            cleanSlug.includes(h) ||
            t.includes(targetSlug.replace(/-/g, ' ')) ||
            t.includes(cleanSlug.replace(/-/g, ' '))
          );
        });
        if (match) {
          const liveProduct = formatShopifyProduct(match.node);
          if (liveProduct) {
            const localMatch = products.find(
              (p) => p.slug === cleanSlug || p.slug === targetSlug || p.name.toLowerCase() === liveProduct.name.toLowerCase()
            );
            if (localMatch) {
              return {
                success: true,
                data: {
                  ...localMatch,
                  ...liveProduct,
                  thumbnail: liveProduct.thumbnail || localMatch.thumbnail,
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
