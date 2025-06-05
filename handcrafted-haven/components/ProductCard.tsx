interface ProductCardProps {
  title: string;
  description: string;
  imageUrl: string;
  price: string;
}

export default function ProductCard({ title, description, imageUrl, price }: ProductCardProps) {
  return (
    <div className="card bg-white shadow-md rounded-lg overflow-hidden">
      <figure>
        <img className="w-full h-48 object-cover" src={imageUrl} alt={title} />
      </figure>
      <div className="p-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-gray-600">{description}</p>
        <p className="text-xl font-bold mt-2">{price}</p>
        <div className="mt-4 flex justify-between">
          <button className="btn btn-outline">Add to Cart</button>
          <button className="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </div>
  );
}
