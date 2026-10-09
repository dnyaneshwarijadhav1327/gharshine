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

    const isCombo = tags.includes('combo') || tags.includes('kit') || (node.productType && node.productType.toLowerCase().includes('combo'));
    const isFeatured = tags.includes('featured') || tags.includes('bestseller') || tags.includes('frontpage');
    const isBestseller = tags.includes('bestseller');

    return {
      id: node.id || `shopify-${Date.now()}`,
      name: node.title || 'GharShine Product',
      slug: node.handle || 'product',
      category: isCombo ? 'Combos' : (node.productType || 'Surface Care'),
      productType: node.productType || (isCombo ? 'Protection Kit' : 'Solution'),
      surface: ['Multi-Surface', 'Glass', 'Stone', 'Fabric'],
      concerns: ['Stains & Protection'],
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
