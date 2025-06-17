"use client";

import { useState, useEffect, useMemo } from "react";
import ProductCard from "./ProductCard";
import ReviewModal from "./ReviewModel";

// Define the Product type based on data from fetchProducts and ProductCard props
// Ideally, this would be imported from a shared types file (e.g., ../types/product.ts)
interface Product {
  id: string;
  product_name: string;
  product_description: string;
  product_price: number;
  category: string;
  product_images: string | string[] | null; // From JSONB, can be single URL or array
  avgRating: number; // Alias from fetchProducts
  totalReviews: number; // Alias from fetchProducts
  seller_name?: string; // Optional: for seller filtering if added to fetchProducts
}

interface ProductGridProps {
  initialProducts: Product[];
}

// Helper to get the first image URL or a placeholder
const getFirstImageUrl = (images: string | string[] | null): string => {
  if (Array.isArray(images) && images.length > 0 && images[0]) {
    return images[0];
  }
  if (typeof images === 'string' && images.trim() !== '') {
    return images;
  }
  return "/placeholder.jpg"; // Default placeholder
};

export default function ProductGrid({ initialProducts }: ProductGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [sortOption, setSortOption] = useState<string>("default");
  // const [selectedSeller, setSelectedSeller] = useState<string>(""); // For seller filter
  const [uniqueCategories, setUniqueCategories] = useState<string[]>([]);
  // const [uniqueSellers, setUniqueSellers] = useState<string[]>([]); // For seller filter
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  useEffect(() => {
    if (initialProducts) {
      const categories = Array.from(new Set(initialProducts.map(p => p.category).filter(Boolean)));
      setUniqueCategories(categories);

      // To enable seller filtering, ensure seller_name is part of the Product interface
      // and is fetched by `fetchProducts`.
      // const sellers = Array.from(new Set(initialProducts.map(p => p.seller_name).filter(Boolean as (value: string | undefined) => value is string)));
      // setUniqueSellers(sellers);
    }
  }, [initialProducts]);

  const displayedProducts = useMemo(() => {
    let products = [...initialProducts];

    if (selectedCategory) {
      products = products.filter(p => p.category === selectedCategory);
    }

    // if (selectedSeller) { // For seller filter
    //   products = products.filter(p => p.seller_name === selectedSeller);
    // }

    switch (sortOption) {
      case "price-asc":
        products.sort((a, b) => a.product_price - b.product_price);
        break;
      case "price-desc":
        products.sort((a, b) => b.product_price - a.product_price);
        break;
      case "name-asc":
        products.sort((a, b) => a.product_name.localeCompare(b.product_name));
        break;
      case "name-desc":
        products.sort((a, b) => b.product_name.localeCompare(a.product_name));
        break;
      case "rating-desc":
        products.sort((a, b) => (b.avgRating ?? 0) - (a.avgRating ?? 0));
        break;
      default:
        // Initial sort is by created_at DESC from fetchProducts
        break;
    }
    return products;
  }, [initialProducts, selectedCategory, sortOption /*, selectedSeller */]);

  const handleOpenReview = (productId: string) => {
    setSelectedProductId(productId);
    setShowReviewModal(true);
  };

  const handleCloseReview = () => {
    setShowReviewModal(false);
    setSelectedProductId(null);
  };

  return (
    <div>
      <div className="mb-6 p-4 bg-base-200 rounded-lg shadow">
        <div className="flex flex-wrap gap-4 items-center justify-center">
          <div className="form-control">
            <label htmlFor="category-filter" className="label">
              <span className="label-text">Filter by Category:</span>
            </label>
            <select
              id="category-filter"
              className="select select-bordered w-full max-w-xs"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {uniqueCategories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          {/* Uncomment and implement if seller_name is available in Product
          <div className="form-control">
            <label htmlFor="seller-filter" className="label">
              <span className="label-text">Filter by Seller:</span>
            </label>
            <select
              id="seller-filter"
              className="select select-bordered w-full max-w-xs"
              value={selectedSeller}
              onChange={(e) => setSelectedSeller(e.target.value)}
            >
              <option value="">All Sellers</option>
              {uniqueSellers.map(seller => (
                <option key={seller} value={seller}>{seller}</option>
              ))}
            </select>
          </div>
          */}

          <div className="form-control">
            <label htmlFor="sort-options" className="label">
              <span className="label-text">Sort by:</span>
            </label>
            <select
              id="sort-options"
              className="select select-bordered w-full max-w-xs"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="default">Default (Newest)</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
              <option value="rating-desc">Rating: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {displayedProducts.length === 0 ? (
        <p className="text-center text-lg py-10">No products match your criteria.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
          {displayedProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.product_name}
              description={product.product_description}
              imageUrl={getFirstImageUrl(product.product_images)}
              price={`${product.product_price}`}
              avgRating={String(product.avgRating ?? 0)}
              totalReviews={String(product.totalReviews ?? 0)}
              onRateReview={() => handleOpenReview(product.id)}
            />
          ))}
        </div>
      )}

      {showReviewModal && selectedProductId && (
        <ReviewModal productId={selectedProductId} closeModal={handleCloseReview} />
      )}
    </div>
  );
}


