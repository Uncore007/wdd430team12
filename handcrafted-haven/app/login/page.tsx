"use client";

import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      const { userId, userName, userRole } = await res.json();
      document.cookie = `userId=${userId}; path=/`;
      document.cookie = `userName=${userName}; path=/`;
      document.cookie = `userRole=${userRole}; path=/`;
      window.location.href = "/";
    } else {
      alert("Invalid credentials");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-full max-w-md shadow-xl bg-base-100">
        <form onSubmit={handleLogin} className="card-body">
          <h2 className="card-title text-2xl font-bold text-center mb-6">
            Login to Handcrafted Haven
          </h2>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control mt-6">
            <button type="submit" className="btn btn-primary w-full">
              Login
            </button>
          </div>
          <div className="text-center mt-4">
            <p className="text-sm">
              Don&apos;t have an account?{" "}
              <a href="/register" className="link link-primary">
                Register here
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
