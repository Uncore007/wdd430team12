"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [user, setUser] = useState<{ id: string; name: string; role: string } | null>(null);

  useEffect(() => {
    function getCookie(name: string): string | null {
      const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
      return match ? match[2] : null;
    }

    const userId = getCookie("userId");
    const userName = getCookie("userName") || "Guest"; // ✅ Default if undefined
    const userRole = getCookie("userRole") ?? "customer"; // ✅ Default if missing

    if (userId) {
      setUser({ id: userId, name: userName, role: userRole });
    }
  }, []);

 function handleLogout() {
  document.cookie = "userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie = "userName=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  document.cookie = "userRole=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  
  setUser(null);
  window.location.reload(); // ✅ Reloads the page to refresh state   0547915573
}


  return (<nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
  <Link href="/" className="text-xl font-bold text-gray-900">Handcrafted Haven</Link>

  <div className="flex gap-6 items-center">
    <Link href="/products" className="btn btn-ghost">Products</Link>

    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost">Account ▼</label>
      <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-36">
        {user ? (
          <>
            <li><p className="px-4 py-2">{user.name} ({user.role})</p></li>
            {user.role === "customer" && (
              <li><Link href="/become-seller" className="btn btn-primary btn-sm w-full">Become a Seller</Link></li>
            )}
            {user.role === "seller" && (
              <>
                <li><Link href="/sellerdashboard" className="btn btn-ghost btn-sm w-full">Seller Dashboard</Link></li>
                <li><Link href="/seller/edit" className="btn btn-ghost btn-sm w-full">Edit Profile</Link></li>
              </>
            )}
            <li><button onClick={handleLogout} className="btn btn-error btn-sm w-full">Logout</button></li>
          </>
        ) : (
          <>
            <li><Link href="/login" className="btn btn-primary btn-sm w-full">Login</Link></li>
            <li><Link href="/register" className="btn btn-secondary btn-sm w-full">Sign Up</Link></li> {/* ✅ Added Sign Up button */}
          </>
        )}
      </ul>
    </div>

    <button className="relative">
      🛒 <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-2">3</span>
    </button>
  </div>
</nav>

          );
}
