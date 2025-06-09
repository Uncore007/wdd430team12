"use client";
import { useState, useEffect } from "react";

interface Review {
  id: string;
  rating: number;
  review_text: string;
  reviewer_name: string;
  reviewer_role: string;
  created_at: string;
}

interface ReviewModalProps {
  productId: string;
  closeModal: () => void;
}

export default function ReviewModal({ productId, closeModal }: ReviewModalProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [reviewerName, setReviewerName] = useState("");
  const [reviewerRole, setReviewerRole] = useState("Customer"); //  Default role

  useEffect(() => {
    async function fetchReviews() {
      try {
        const res = await fetch(`/api/reviews/${productId}`);
        const data: Review[] = await res.json();
        setReviews(data);
      } catch {
        console.error("Failed to load reviews.");
      }
    }
    fetchReviews();
  }, [productId]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const reviewData = {
      rating,
      review_text: reviewText,
      reviewer_name: reviewerName,
      reviewer_role: reviewerRole,
    };

    // console.log("Submitting review:", reviewData); //  Debugging step

    const res = await fetch(`/api/reviews/${productId}`, {
      method: "POST",
      body: JSON.stringify(reviewData),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    console.log("Response from server:", data); //  Verify API response

    if (res.ok) {
      setReviewText("");
      setRating(5);
      setReviewerName("");
      closeModal();
    } else {
      alert("Failed to submit review: " + data.error);
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30"> {/* ✅ Transparent background */}
      <div className="bg-white p-6 shadow-lg rounded-lg w-[400px]"> {/*  Compact popup */}
        <h2 className="text-xl font-bold text-center">Leave a Review</h2>

        {/*  Review List */}
        {reviews.length > 0 ? (
          reviews.map((rev, index) => (
            <div key={index} className="border p-3 rounded my-2">
              <p className="text-sm font-semibold">{rev.reviewer_name} ({rev.reviewer_role})</p>
              <p>{rev.review_text}</p>
              <p className="text-sm text-yellow-500">⭐ {rev.rating} | {new Date(rev.created_at).toLocaleDateString()}</p>
            </div>
          ))
        ) : (
          <p className="text-center">No reviews yet. Be the first to leave one!</p>
        )}

        {/*  Review Form */}
        <form onSubmit={handleSubmit} className="mt-4">
          <label className="block text-sm font-medium">Your Name:</label>
          <input type="text" value={reviewerName} onChange={(e) => setReviewerName(e.target.value)} className="input input-bordered w-full" required />

          <label className="block text-sm font-medium mt-2">Your Role:</label>
          <select value={reviewerRole} onChange={(e) => setReviewerRole(e.target.value)} className="select select-bordered w-full">
            <option>Customer</option>
            <option>Verified Seller</option>
            <option>Admin</option>
            <option>Guest</option>
          </select>

          <label className="block text-sm font-medium mt-2">Rating:</label>
          <input type="number" min="1" max="5" value={rating} onChange={(e) => setRating(Number(e.target.value))} className="input input-bordered w-full" />

          <label className="block text-sm font-medium mt-2">Review:</label>
          <textarea value={reviewText} onChange={(e) => setReviewText(e.target.value)} className="textarea textarea-bordered w-full" required />

          <div className="flex justify-between mt-4">
            <button type="submit" className="btn btn-primary">Submit Review</button>
            <button type="button" onClick={closeModal} className="btn btn-error">Close</button>
          </div>
        </form>
      </div>
    </div>
  );
}
