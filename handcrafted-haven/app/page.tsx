import Navbar from "../components/Navbar";
import ProductGrid from "../components/ProductGrid";
import Footer from "../components/Footer";
import { fetchProducts } from "../libs/db"; // Import fetchProducts

// Define the Product interface, matching the one in ProductGrid
// Ideally, this would be imported from a shared types file (e.g., ../types/product.ts)
interface Product {
  id: string;
  product_name: string;
  product_description: string;
  product_price: number;
  category: string;
  product_images: string | string[] | null;
  avgRating: number;
  totalReviews: number;
  seller_name?: string;
}

export default async function Home() { // Make Home an async function
  const productsFromDb: any[] = await fetchProducts();

  // Map to ensure the structure matches the Product interface
  const initialProducts: Product[] = productsFromDb.map(p => ({
    id: p.id,
    product_name: p.product_name,
    product_description: p.product_description,
    product_price: p.product_price,
    category: p.category,
    product_images: p.product_images,
    avgRating: p.avgrating, // Ensure this matches the alias from fetchProducts (avgRating)
    totalReviews: p.totalreviews, // Ensure this matches the alias from fetchProducts (totalReviews)
    // seller_name: p.seller_name, // If you added seller name to fetchProducts
  }));

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar /> {/* Navbar now imported as a separate component */}

      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold text-center mb-6">Welcome to Handcrafted Haven</h1>
        {/* Pass fetched products to ProductGrid */}
        <ProductGrid initialProducts={initialProducts} />
      </main>

      <Footer /> {/* Footer now modular */}
    </div>
  );
}