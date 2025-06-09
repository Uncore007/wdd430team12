import Link from "next/link";

export default function SellerSidebar() {
  return (
    <aside className="w-64 min-h-screen bg-gray-800 text-white p-6">
      <h2 className="text-2xl font-bold mb-6">Seller Dashboard</h2>
      <nav className="flex flex-col space-y-4">
        <Link href="/sellerdashboard" className="btn btn-ghost w-full">Dashboard Home</Link>
        <Link href="/seller/products" className="btn btn-ghost w-full">Manage Products</Link>
        <Link href="/seller/orders" className="btn btn-ghost w-full">Orders & Sales</Link>
        <button className="btn btn-error mt-6 w-full">Logout</button>
      </nav>
    </aside>
  );
}
