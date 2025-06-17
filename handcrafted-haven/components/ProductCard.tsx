"use client"
import Image from "next/image";

interface ProductCardProps {
  title: string;
  description: string;
  imageUrl: string;
  price: string;
  avgRating: string; 
  totalReviews: string;
  onRateReview: () => void;
  }



export default function ProductCard({ title, description, imageUrl, price, avgRating, totalReviews, onRateReview }: ProductCardProps) {
  return (
    <div className="card bg-white shadow-md rounded-lg overflow-hidden">
      <figure>
        <Image 
          src={imageUrl} 
          alt={title} 
          width={600}
          height={192}
          className="w-full h-48 object-cover" 
          priority
        />
      </figure>
      <div className="p-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-gray-600">{description}</p>
        <p className="text-xl font-bold mt-2">${price}</p>        
        <p className="text-sm text-yellow-500">
        ⭐ {Number(avgRating).toFixed(1)} | {Number(totalReviews)} reviews
      </p>
        <div className="mt-4 flex justify-between">
          <button className="btn btn-outline">Add to Cart</button>
          <button className="btn btn-primary" onClick={onRateReview}>Rate & Review</button>
        </div>
      </div>
    </div>
  );
}