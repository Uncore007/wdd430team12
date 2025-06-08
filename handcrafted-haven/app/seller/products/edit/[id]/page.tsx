"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

interface Product {
  id: string;
  product_name: string;
  product_description: string;
  product_price: number;
  category: string;
  product_images: string[]; // JSONB array for multiple image URLs
}

export default function EditProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function fetchProduct() {
      if (!id) return;
      try {
        const res = await fetch(`/api/seller-product/${id}`);
        const data: Product = await res.json();
        if (res.ok) {
          setProduct(data);
        }
      } catch {
        setError("Network error. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setProduct((prev) => prev ? { ...prev, [name]: value } : null);
  }

  function handleImageUrlChange(index: number, e: React.ChangeEvent<HTMLInputElement>) {
    const newImages = [...(product?.product_images ?? [])];
    newImages[index] = e.target.value;
    setProduct((prev) => prev ? { ...prev, product_images: newImages } : null);
  }

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    if (!product) return;

    const res = await fetch(`/api/seller-product/${product.id}`, {
      method: "PUT",
      body: JSON.stringify(product),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      router.push("/seller/products");
    } else {
      setError("Failed to update product.");
    }
  }

  if (loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  if (error) return <div className="flex justify-center items-center min-h-screen text-red-500">{error}</div>;

  return (
    <div className="min-h-screen p-6 bg-base-100">
      <h2 className="text-3xl font-bold text-center mb-6">Edit Product</h2>
      {product && (
        <form onSubmit={handleUpdate} className="card w-96 bg-white shadow-xl p-6">
          <label className="label"><span className="label-text">Product Name</span></label>
          <input type="text" name="product_name" className="input input-bordered w-full" value={product.product_name} onChange={handleInputChange} required />

          <label className="label"><span className="label-text">Description</span></label>
          <textarea name="product_description" className="textarea textarea-bordered w-full" value={product.product_description} onChange={handleInputChange} required />

          <label className="label"><span className="label-text">Price ($)</span></label>
          <input type="number" name="product_price" className="input input-bordered w-full" value={product.product_price} onChange={handleInputChange} required />

          <label className="label"><span className="label-text">Category</span></label>
          <input type="text" name="category" className="input input-bordered w-full" value={product.category} onChange={handleInputChange} required />

          {/*  Editable Image URLs with Live Preview */}
          <label className="label"><span className="label-text">Product Images (URLs)</span></label>
          {product?.product_images?.map((img, index) => (
            <div key={index} className="flex gap-2 items-center">
              <input 
                type="text" 
                className="input input-bordered w-full" 
                value={img} 
                onChange={(e) => handleImageUrlChange(index, e)} 
                placeholder="Enter image URL" 
              />
              <Image 
                src={img} 
                alt="Preview" 
                width={64}  // Define explicit width
                height={64} // Define explicit height
                className="rounded border object-cover" 
                priority // Ensures faster loading for better UX
              />
            </div>
          ))}

          <button type="submit" className="btn btn-primary w-full mt-4">Update Product</button>

          {error && <p className="text-center text-error mt-4">{error}</p>}
        </form>
      )}
    </div>
  );
}
