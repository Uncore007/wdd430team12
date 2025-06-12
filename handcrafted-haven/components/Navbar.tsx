export default function Navbar() {
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <a className="text-xl font-bold text-gray-900">Handcrafted Haven</a>
      
      <div className="flex gap-6 items-center">
        <input
          type="text"
          placeholder="Search products..."
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none"
        />
        <a className="text-gray-700 hover:text-gray-900">Products</a>
        
        <div className="relative group">
          <button className="text-gray-700 hover:text-gray-900">Account ▼</button>
          <ul className="absolute hidden group-hover:block bg-white shadow-md rounded-md w-36 mt-2">
            <li><a className="block px-4 py-2 hover:bg-gray-200">Login</a></li>
            <li><a className="block px-4 py-2 hover:bg-gray-200">View X</a></li>
          </ul>
        </div>

        <button className="relative">
          🛒 <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-2">3</span>
        </button>
      </div>
    </nav>
  );
}
