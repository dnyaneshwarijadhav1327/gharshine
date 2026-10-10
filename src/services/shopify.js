/**
 * Shopify Client & Storefront Service
 * Connects your live Shopify store products, inventory, and checkout.
 */

const SHOPIFY_DOMAIN = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN || '07nth0-p5.myshopify.com';
const SHOPIFY_CLIENT_ID = import.meta.env.VITE_SHOPIFY_CLIENT_ID || 'e3161875df08b8b9289a501c8303f812';
const SHOPIFY_TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN || 'a01f7134ab7cee8066b2e15e0d6a533c';

export async function shopifyFetch({ query, variables = {} }) {
  if (!SHOPIFY_DOMAIN || !SHOPIFY_TOKEN) {
    return null;
  }

  const endpoint = `https://${SHOPIFY_DOMAIN}/api/2024-01/graphql.json`;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': SHOPIFY_TOKEN,
      },
      body: JSON.stringify({ query, variables }),
    });

    const json = await response.json();
    if (json?.errors) {
      console.warn('Shopify GraphQL response warnings:', json.errors);
      return null;
    }
    return json?.data || null;
  } catch (error) {
    console.warn('Shopify Fetch not reachable yet (using catalog fallback):', error);
    return null;
  }
}

// Convert Shopify product node into GharShine frontend format
export function formatShopifyProduct(node) {
  if (!node) return null;

  try {
    const price = parseFloat(node.priceRange?.minVariantPrice?.amount || '0');
    const comparePrice = parseFloat(node.compareAtPriceRange?.minVariantPrice?.amount || '0');
    const discount = comparePrice > price ? Math.round(((comparePrice - price) / comparePrice) * 100) : 0;
    
    const images = (node.images?.edges || []).map(e => e.node?.url).filter(Boolean);
    const thumbnail = images[0] || 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80';
    
    const rawTags = Array.isArray(node.tags) ? node.tags : (typeof node.tags === 'string' ? node.tags.split(',') : []);
    const tags = rawTags.map(t => String(t).trim().toLowerCase());

    const rawCollections = (node.collections?.edges || []).map(e => ({
      id: e.node?.id,
      title: e.node?.title || '',
      handle: e.node?.handle || ''
    }));
    const collectionTitles = rawCollections.map(c => c.title.toLowerCase());
    const collectionHandles = rawCollections.map(c => c.handle.toLowerCase());

    const titleLower = (node.title || '').toLowerCase();

    const isCombo = 
      tags.includes('combo') || 
      tags.includes('kit') || 
      (node.productType && node.productType.toLowerCase().includes('combo')) ||
      titleLower.includes('combo') || 
      titleLower.includes('kit') ||
      collectionTitles.some(t => t.includes('combo') || t.includes('protection kit')) ||
      collectionHandles.some(h => h.includes('combo'));

    const isBestseller = 
      tags.includes('bestseller') || 
      tags.includes('best seller') || 
      tags.includes('best-seller') || 
      collectionTitles.some(t => t.includes('best seller') || t.includes('bestseller')) ||
      collectionHandles.some(h => h.includes('best-seller') || h.includes('bestseller'));

    const isFeatured = 
      isBestseller ||
      tags.includes('featured') || 
      tags.includes('frontpage') || 
      tags.includes('home') ||
      tags.includes('homepage') ||
      collectionTitles.some(t => t.includes('home page') || t.includes('featured') || t.includes('homepage')) ||
      collectionHandles.some(h => h.includes('frontpage') || h.includes('featured'));

    // Detect rooms from collections, tags, or title
    const detectedRooms = [];
    const checkRoom = (term, roomName) => {
      if (
        titleLower.includes(term) ||
        tags.some(t => t.includes(term)) ||
        collectionTitles.some(c => c.includes(term)) ||
        collectionHandles.some(c => c.includes(term))
      ) {
        if (!detectedRooms.includes(roomName)) detectedRooms.push(roomName);
      }
    };
    checkRoom('kitchen', 'Kitchen');
    checkRoom('bathroom', 'Bathroom');
    checkRoom('bath', 'Bathroom');
    checkRoom('living', 'Living Room');
    checkRoom('sofa', 'Living Room');
    checkRoom('bedroom', 'Bedroom');
    checkRoom('dining', 'Dining Room');
    checkRoom('pooja', 'Pooja Room');
    checkRoom('balcony', 'Balcony');
    checkRoom('glass', 'Bathroom');
    checkRoom('tile', 'Bathroom');

    return {
      id: node.id || `shopify-${Date.now()}`,
      name: node.title || 'GharShine Product',
      slug: node.handle || 'product',
      category: isCombo ? 'Combos' : (node.productType || 'Surface Care'),
      productType: node.productType || (isCombo ? 'Protection Kit' : 'Solution'),
      surface: ['Multi-Surface', 'Glass', 'Stone', 'Fabric'],
      concerns: ['Stains & Protection'],
      rooms: detectedRooms.length > 0 ? detectedRooms : ['Living Room', 'Kitchen'],
      collections: rawCollections,
      collectionTitles: collectionTitles,
      collectionHandles: collectionHandles,
      price: Math.round(price) || 999,
      originalPrice: comparePrice > price ? Math.round(comparePrice) : null,
      discount: discount,
      rating: 4.9,
      reviewCount: 142,
      badge: isBestseller ? 'BESTSELLER' : (isFeatured ? 'FEATURED' : (isCombo ? 'COMBO SET' : 'SHOPIFY LIVE')),
      isFeatured: isFeatured,
      isCombo: isCombo,
      tags: tags,
      stockStatus: node.availableForSale ? 'in_stock' : 'out_of_stock',
      thumbnail: thumbnail,
      images: images.length > 0 ? images : [thumbnail],
      shortDescription: node.description?.slice(0, 150) || 'Premium home surface protection formula.',
      description: node.description || 'Premium home surface cleaning and nano-barrier formula.',
      features: [
        'Authentic formula direct from Shopify warehouse',
        'Long-lasting surface protection barrier',
        'Safe for modern Indian homes'
      ],
      howToUse: [
        { step: '01. Clean', text: 'Clean and dry target surface.' },
        { step: '02. Apply', text: 'Apply solution evenly and buff dry.' }
      ],
      suitableFor: ['All household surfaces as per bottle label'],
      notSuitableFor: ['Surfaces unverified by patch test']
    };
  } catch (err) {
    console.error('Error formatting Shopify product:', err);
    return null;
  }
}

export const SHOPIFY_QUERIES = {
  GET_PRODUCTS: `
    query getProducts($first: Int = 50) {
      products(first: $first) {
        edges {
          node {
            id
            title
            handle
            description
            productType
            tags
            availableForSale
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            compareAtPriceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 5) {
              edges {
                node {
                  url
                }
              }
            }
            collections(first: 10) {
              edges {
                node {
                  id
                  title
                  handle
                }
              }
            }
          }
        }
      }
    }
  `,

  CREATE_CHECKOUT: `
    mutation checkoutCreate($input: CheckoutCreateInput!) {
      checkoutCreate(input: $input) {
        checkout {
          id
          webUrl
        }
        checkoutUserErrors {
          code
          field
          message
        }
      }
    }
  `
};
