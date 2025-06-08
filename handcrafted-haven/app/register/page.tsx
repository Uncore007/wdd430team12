"use client";

import { useState } from "react";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      setMessage("Registration successful! Redirecting...");
      setTimeout(() => {
        window.location.href = "/login"; //  Redirect to login
      }, 2000);
    } else {
      setMessage(data.error || "Registration failed.");
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-100">
      <form onSubmit={handleRegister} className="card w-96 bg-white shadow-xl p-6">
        <h2 className="text-2xl font-bold text-center mb-4">Create an Account</h2>

        <label className="label">
          <span className="label-text">Name</span>
        </label>
        <input 
          type="text" 
          className="input input-bordered w-full"
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />

        <label className="label">
          <span className="label-text">Email</span>
        </label>
        <input 
          type="email" 
          className="input input-bordered w-full"
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />

        <label className="label">
          <span className="label-text">Password</span>
        </label>
        <input 
          type="password" 
          className="input input-bordered w-full"
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />

        <button type="submit" className="btn btn-primary w-full mt-4" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>

        {message && <p className="text-center text-error mt-4">{message}</p>}

        <p className="text-center mt-4">
          Already have an account? <a href="/login" className="text-primary">Login</a>
        </p>
      </form>
    </div>
  );
}
