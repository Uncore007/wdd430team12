"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";


interface Product {
  id: string;
  product_name: string;
  product_description: string;
  product_price: number;
  category: string;
  product_images: string[]; // JSONB array for multiple image URLs
}

export default function SellerProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
  async function fetchProducts() {
    try {
      const res = await fetch("/api/sellers-products");
      const data: Product[] = await res.json();

      if (res.ok) {
        setProducts(data);
      } else {
        setError("Failed to fetch products.");
      }
    } catch {
      setError("Network error. Please try again."); // Removed unused `err`
    } finally {
      setLoading(false);
    }
  }
  fetchProducts();
}, []);


async function handleDelete(productId: string) {
  if (!confirm("Are you sure you want to delete this product?")) return;

  try {
    const res = await fetch(`/api/seller-product/${productId}`, { method: "DELETE" });
    const data = await res.json();

    if (res.ok) {
      setProducts(products.filter((product) => product.id !== productId)); //  Instantly updates UI
    } else {
      alert(data.error || "Failed to delete product.");
    }
  } catch {
    alert("Network error. Please try again.");
  }
}

  

  if (loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  if (error) return <div className="flex justify-center items-center min-h-screen text-red-500">{error}</div>;

  return (
    <div className="min-h-screen p-6 bg-base-100">
      <h2 className="text-3xl font-bold text-center mb-6">Manage Your Products</h2>
      <Link href="/seller/products/add" className="btn btn-primary mb-4">Add New Product</Link>
      
      {products.length === 0 ? (
        <div className="text-center text-gray-600">
          <p>No products added yet.</p>
          <Link href="/seller/products/add" className="btn btn-secondary mt-4">Add Your First Product</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {products.map((product) => (
            <div key={product.id} className="card bg-white shadow-lg p-4 flex items-center gap-4">
              {product.product_images.length > 0 && (
              <Image 
                  src={product.product_images[0]} 
                  alt={product.product_name} 
                  width={64}  //  Explicitly define width
                  height={64} //  Explicitly define height
                  className="rounded object-cover" 
                  priority //  Ensures faster loading for important images
                />
              )}
              <div>
                <h3 className="text-xl font-semibold">{product.product_name}</h3>
                <p className="text-gray-600">${product.product_price}</p>
                <p className="text-sm text-gray-500">{product.category}</p>
              </div>
              <div className="ml-auto flex gap-2">
                <Link href={`/seller/products/edit/${product.id}`} className="btn btn-ghost">Edit</Link>
                <button className="btn btn-error" onClick={() => handleDelete(product.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
