import Link from "next/link";

export default function SellerNavbar() {
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold text-gray-900">Handcrafted Haven</Link>
      <Link href="/seller/products/add" className="btn btn-primary">Add New Product</Link>
    </nav>
  );
}
