import Navbar from "../components/Navbar";
import ProductGrid from "../components/ProductGrid";
import Footer from "../components/Footer";
import { fetchProducts } from "../libs/db";

interface ProductFromDb {
  id: string;
  product_name: string;
  product_description: string;
  product_price: number;
  category: string;
  product_images: string | string[] | null; 
  avgrating: number;
  totalreviews: number;
  seller_name: string;
}

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

export const revalidate = 0; // or a number of seconds for ISR

export default async function Home() {
  const productsFromDb: ProductFromDb[] = await fetchProducts();

  const initialProducts: Product[] = productsFromDb.map(p => ({
    id: p.id,
    product_name: p.product_name,
    product_description: p.product_description,
    product_price: p.product_price,
    category: p.category,
    product_images: p.product_images,
    avgRating: p.avgrating,
    totalReviews: p.totalreviews,
    seller_name: p.seller_name,
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