"use client"; // Enables interactivity

import { useState } from "react";
import { addProduct } from "../libs/db"; // Adjust the path if needed

export default function ProductForm({ sellerId }: { sellerId: string }) {
  const [formData, setFormData] = useState({
    product_name: "",
    product_description: "",
    product_price: 0,
    category: "",
    product_images: [] as string[],
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await addProduct(sellerId, formData);
    alert("Product added successfully!");
    setFormData({ // Reset form after submission
      product_name: "",
      product_description: "",
      product_price: 0,
      category: "",
      product_images: [],
    });
  }

  return (
    <div className="p-6 bg-white rounded shadow-md">
      <h2 className="text-lg font-semibold">Add a New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Product Name"
          className="input input-bordered w-full"
          value={formData.product_name}
          onChange={(e) => setFormData({ ...formData, product_name: e.target.value })}
          required
        />
        <textarea
          placeholder="Description"
          className="textarea textarea-bordered w-full"
          value={formData.product_description}
          onChange={(e) => setFormData({ ...formData, product_description: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          className="input input-bordered w-full"
          value={formData.product_price}
          onChange={(e) => setFormData({ ...formData, product_price: Number(e.target.value) })}
          required
        />
        <input
          type="text"
          placeholder="Category"
          className="input input-bordered w-full"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
        />
        <input
          type="text"
          placeholder="Image URL"
          className="input input-bordered w-full"
          value={formData.product_images[0] || ""}
          onChange={(e) => setFormData({ ...formData, product_images: [e.target.value] })}
        />
        <button type="submit" className="btn btn-primary w-full">Add Product</button>
      </form>
    </div>
  );
}
