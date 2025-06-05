export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-800 p-6 mt-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div>
          <h2 className="text-xl font-bold">Handcrafted Haven</h2>
          <p className="text-sm">Providing unique handmade products since 1992</p>
        </div>
        
        <nav className="flex flex-wrap gap-4 mt-4 md:mt-0">
          <a className="text-gray-600 hover:text-gray-900" href="#">About Us</a>
          <a className="text-gray-600 hover:text-gray-900" href="#">Contact</a>
          <a className="text-gray-600 hover:text-gray-900" href="#">FAQ</a>
          <a className="text-gray-600 hover:text-gray-900" href="#">Privacy Policy</a>
        </nav>
        
        <div className="mt-4 md:mt-0">
          <p className="text-sm">© 2025 Handcrafted Haven. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
