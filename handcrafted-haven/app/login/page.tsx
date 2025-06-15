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
    <form onSubmit={handleLogin} className="max-w-md mx-auto p-6">
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit" className="btn">Login</button>
    </form>
  );
}
