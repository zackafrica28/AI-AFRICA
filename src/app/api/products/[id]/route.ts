// Mock database
const mockProducts = [
  { id: "1", title: "Neural Vision Pro", price: 1200, vendorId: "vendorA", category: "tech" },
  { id: "2", title: "Solar Grid Link", price: 2400, vendorId: "vendorB", category: "energy" },
  { id: "3", title: "Agro AI Drone", price: 1800, vendorId: "vendorA", category: "agriculture" },
];

// Fetch all products with optional filters
export async function getProducts(limit: number = 12, offset: number = 0, category?: string) {
  let products = mockProducts;
  if (category) {
    products = products.filter(p => p.category === category);
  }
  return products.slice(offset, offset + limit);
}

// Fetch a single product by ID
export async function getProductById(id: string) {
  return mockProducts.find(p => p.id === id) || null;
}

// Create a new product for a vendor
export async function createProduct(vendorId: string, data: any) {
  const newProduct = { id: String(mockProducts.length + 1), vendorId, ...data };
  mockProducts.push(newProduct);
  return newProduct;
}

// Fetch all products for a specific vendor
export async function getVendorProducts(vendorId: string) {
  return mockProducts.filter(p => p.vendorId === vendorId);
}

// Delete a product
export async function deleteProduct(productId: string, vendorId: string) {
  const index = mockProducts.findIndex(p => p.id === productId && p.vendorId === vendorId);
  if (index !== -1) {
    const [deleted] = mockProducts.splice(index, 1);
    return deleted;
  }
  return null;
}
