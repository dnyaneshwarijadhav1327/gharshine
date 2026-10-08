/**
 * Shopify Client & Storefront Service
 * Connects your live Shopify store products, inventory, and checkout.
 */

const SHOPIFY_DOMAIN = import.meta.env.VITE_SHOPIFY_STORE_DOMAIN || 'ufjxrx-gd.myshopify.com';
const SHOPIFY_CLIENT_ID = import.meta.env.VITE_SHOPIFY_CLIENT_ID || 'e3161875df08b8b9289a501c8303f812';
const SHOPIFY_TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN || 'a01f7134ab7cee8066b2e15e0d6a533c';

export async function shopifyFetch({ query, variables = {} }) {
  if (!SHOPIFY_DOMAIN) {
    // Return null to allow fallback to local catalog
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
    if (json.errors) {
      console.warn('Shopify GraphQL response warnings:', json.errors);
      return null;
    }
    return json.data;
  } catch (error) {
    console.warn('Shopify Fetch not reachable yet (checking credentials):', error);
    return null;
  }
}

// Convert Shopify product node into GharShine frontend format
export function formatShopifyProduct(node) {
  const price = parseFloat(node.priceRange?.minVariantPrice?.amount || '0');
  const comparePrice = parseFloat(node.compareAtPriceRange?.minVariantPrice?.amount || '0');
  const discount = comparePrice > price ? Math.round(((comparePrice - price) / comparePrice) * 100) : 0;
  
  const images = node.images?.edges?.map(e => e.node.url) || [];
  const thumbnail = images[0] || 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80';

  return {
    id: node.id,
    name: node.title,
    slug: node.handle,
    category: 'Surface Care',
    productType: 'Solution',
    surface: ['Multi-Surface', 'Glass', 'Stone', 'Fabric'],
    concerns: ['Stains & Protection'],
    price: Math.round(price),
    originalPrice: comparePrice > price ? Math.round(comparePrice) : null,
    discount: discount,
    rating: 4.9,
    reviewCount: 142,
    badge: 'SHOPIFY LIVE',
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
