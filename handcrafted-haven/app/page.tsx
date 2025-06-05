import Navbar from "../components/Navbar";
import ProductGrid from "../components/ProductGrid";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar /> {/* Navbar now imported as a separate component */}

      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold text-center mb-6">Welcome to Handcrafted Haven</h1>
        <ProductGrid /> {/* ProductGrid will dynamically display products */}
      </main>

      <Footer /> {/* Footer now modular */}
    </div>
  );
}