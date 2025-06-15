"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import SellerSidebar from "../../components/sellerSidebar";
import SellerNavbar from "../../components/sellerNavebar";

interface Seller {
  profile_name: string;
  story: string;
  profile_image_url?: string; // Optional profile image
}

export default function SellerDashboard() {
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchSellers() {
      try {
        const res = await fetch("/api/sellers");
        const data: Seller[] = await res.json();

        if (res.ok) {
          setSellers(data);
        } else {
          setError("Failed to fetch sellers.");
        }
      } catch {
        setError("Network error. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    fetchSellers();
  }, []);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar Navigation */}
      <SellerSidebar />

      {/* Main Content Area */}
      <div className="flex-1">
        {/* Top Navigation */}
        <SellerNavbar />

        {/* Dashboard Content */}
        <main className="p-6 bg-base-100">
          <h2 className="text-3xl font-bold text-center mb-6">Welcome to Your Seller Dashboard</h2>

          {loading ? (
            <div className="flex justify-center items-center min-h-screen">Loading...</div>
          ) : error ? (
            <div className="flex justify-center items-center min-h-screen text-red-500">{error}</div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {sellers.length === 0 ? (
                <div className="text-center text-gray-600">
                  <p>No seller profiles found.</p>
                </div>
              ) : (
               sellers.map((seller) => (
                <div key={seller.profile_name} className="card bg-white shadow-lg p-4 flex items-center gap-4">
                  {seller.profile_image_url && (
                    <Image 
                      src={seller.profile_image_url} 
                      alt={seller.profile_name} 
                      width={64}  // ✅ Explicit width for better layout stability
                      height={64} // ✅ Explicit height for proper scaling
                      className="rounded-full object-cover" 
                      priority // ✅ Ensures faster loading of profile images
                    />
              )}
    <div>
      <h3 className="text-xl font-semibold">{seller.profile_name}</h3>
      <p className="text-gray-600">{seller.story}</p>
    </div>
  </div>
))
              )}
            </div>
          )}

          {/* Product Management Button */}
          <div className="text-center mt-6">
            <a href="/seller/products" className="btn btn-primary">Go to Product Management</a>
          </div>
        </main>
      </div>
    </div>
  );
}
