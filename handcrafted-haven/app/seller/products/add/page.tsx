"use client";
import Image from "next/image"; // Import Next.js Image component

import { useState } from "react";

export default function AddProduct() {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [category, setCategory] = useState("");
  const [productImages, setProductImages] = useState<string[]>([]); //  Can be single or multiple URLs
  const [imageInput, setImageInput] = useState(""); //  Temporary input for adding URLs
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  function handleAddImage() {
    if (imageInput.trim()) {
      setProductImages([...productImages, imageInput.trim()]); //  Add image URL to list
      setImageInput(""); //  Clear input after adding
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/add-product", {
      method: "POST",
      body: JSON.stringify({
        productName,
        productDescription,
        productPrice,
        category,
        productImages: productImages.length === 1 ? productImages[0] : productImages, //  Store as single or array
      }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      setMessage("Product added successfully!");
      setTimeout(() => {
        window.location.href = "/seller/products";
      }, 2000);
    } else {
      setMessage(data.error || "Failed to add product.");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-100">
      <form onSubmit={handleSubmit} className="card w-96 bg-white shadow-xl p-6">
        <h2 className="text-2xl font-bold text-center mb-4">Add New Product</h2>

        <label className="label"><span className="label-text">Product Name</span></label>
        <input type="text" className="input input-bordered w-full" value={productName} onChange={(e) => setProductName(e.target.value)} required />

        <label className="label"><span className="label-text">Description</span></label>
        <textarea className="textarea textarea-bordered w-full" value={productDescription} onChange={(e) => setProductDescription(e.target.value)} required />

        <label className="label"><span className="label-text">Price ($)</span></label>
        <input type="number" className="input input-bordered w-full" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} required />

        <label className="label"><span className="label-text">Category</span></label>
        <input type="text" className="input input-bordered w-full" value={category} onChange={(e) => setCategory(e.target.value)} required />

        <label className="label"><span className="label-text">Image URLs</span></label>
        <div className="flex gap-2">
          <input type="text" className="input input-bordered w-full" value={imageInput} onChange={(e) => setImageInput(e.target.value)} placeholder="Enter image URL" />
          <button type="button" className="btn btn-secondary" onClick={handleAddImage}>Add</button>
        </div>

        <div className="mt-4">
        {productImages.map((url, index) => (
          <div key={index} className="flex gap-2 items-center">
            <Image 
              src={url} 
              alt="Preview" 
              width={64}  //  Set explicit width
              height={64} //  Set explicit height
              className="rounded object-cover" 
            />
            <p className="text-sm">{url}</p>
          </div>
        ))}
      </div>

        <button type="submit" className="btn btn-primary w-full mt-4" disabled={loading}>
          {loading ? "Adding..." : "Add Product"}
        </button>

        {message && <p className="text-center text-error mt-4">{message}</p>}
      </form>
    </div>
  );
}
