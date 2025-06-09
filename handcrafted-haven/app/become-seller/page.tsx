"use client";

import { useState } from "react";

export default function BecomeSeller() {
  const [profileName, setProfileName] = useState("");
  const [story, setStory] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSellerRegistration(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/become-seller", {
      method: "POST",
      body: JSON.stringify({ profileName, story, profileImage }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      setMessage("Seller profile created! Redirecting...");
      setTimeout(() => {
        window.location.href = "/sellerdashboard"; // Redirect to seller dashboard
      }, 2000);
    } else {
      setMessage(data.error || "Failed to create seller profile.");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-100">
      <form onSubmit={handleSellerRegistration} className="card w-96 bg-white shadow-xl p-6">
        <h2 className="text-2xl font-bold text-center mb-4">Become a Seller</h2>

        <label className="label">
          <span className="label-text">Profile Name</span>
        </label>
        <input 
          type="text" 
          className="input input-bordered w-full"
          value={profileName} 
          onChange={(e) => setProfileName(e.target.value)} 
          required 
        />

        <label className="label">
          <span className="label-text">Your Story</span>
        </label>
        <textarea 
          className="textarea textarea-bordered w-full"
          value={story} 
          onChange={(e) => setStory(e.target.value)} 
          required 
        />

        <label className="label">
          <span className="label-text">Profile Image URL (Optional)</span>
        </label>
        <input 
          type="text" 
          className="input input-bordered w-full"
          value={profileImage} 
          onChange={(e) => setProfileImage(e.target.value)} 
        />

        <button type="submit" className="btn btn-primary w-full mt-4" disabled={loading}>
          {loading ? "Submitting..." : "Register as Seller"}
        </button>

        {message && <p className="text-center text-error mt-4">{message}</p>}
      </form>
    </div>
  );
}
