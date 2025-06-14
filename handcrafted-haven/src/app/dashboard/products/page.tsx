import { getProducts } from "@/app/lib/data";
import { auth } from '@/auth';

export default async function ProductsPage() {
  const session = await auth();
  console.log("Session:", session);
  const currentUserId = session?.user?.id;
  
  let products: any[] = [];
  if (currentUserId) {
    products = await getProducts(currentUserId);
  } else {
    console.log("User not logged in or no user ID found in session.");
  } 

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <ul className="space-y-4">
        {products.map((product) => (
          <li key={product.id} className="border p-4 rounded-lg">
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p>{product.description}</p>
            <p className="text-gray-500">Price: ${product.price}</p>
            <p className="text-gray-500">Seller: {product.seller_id}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}