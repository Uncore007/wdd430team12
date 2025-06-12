import ProductCard from "./ProductCard";

const products = [
  {
    title: "Handcrafted Wooden Bowl",
    description: "A beautifully handcrafted wooden bowl, perfect for decor or serving.",
    imageUrl: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
    price: "$25.99",
  },
  {
    title: "Artisan Ceramic Mug",
    description: "Handmade ceramic mug with intricate detailing and a comfortable grip.",
    imageUrl: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
    price: "$18.99",
  },
  {
    title: "Luxury Scented Candle",
    description: "A soothing blend of fragrances to create a relaxing atmosphere.",
    imageUrl: "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp",
    price: "$32.99",
  },
];

export default function ProductGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {products.map((product, index) => (
        <ProductCard key={index} {...product} />
      ))}
    </div>
  );
}
