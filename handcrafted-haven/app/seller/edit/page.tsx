"use client";

import { useEffect, useState } from "react";

export default function EditSellerProfile() {
  const [profileName, setProfileName] = useState("");
  const [story, setStory] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetchSellerData() {
      const res = await fetch("/api/seller-profile");
      const data = await res.json();

      if (res.ok) {
        setProfileName(data.profile_name);
        setStory(data.story);
        setProfileImage(data.profile_image_url || "");
      } else {
        setMessage("Failed to load profile.");
      }
    }
    fetchSellerData();
  }, []);

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/update-seller", {
      method: "POST",
      body: JSON.stringify({ profileName, story, profileImage }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      setMessage("Profile updated successfully!");
      setTimeout(() => {
        window.location.href = "/sellerdashboard"; // Redirect to seller dashboard
      }, 2000);
    } else {
      setMessage(data.error || "Failed to update profile.");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-100">
      <form onSubmit={handleUpdate} className="card w-96 bg-white shadow-xl p-6">
        <h2 className="text-2xl font-bold text-center mb-4">Edit Seller Profile</h2>

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
          {loading ? "Updating..." : "Save Changes"}
        </button>

        {message && <p className="text-center text-error mt-4">{message}</p>}
      </form>
    </div>
  );
}
