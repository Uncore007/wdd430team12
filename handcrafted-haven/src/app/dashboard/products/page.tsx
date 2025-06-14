import { getProducts } from "@/app/lib/data";

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <ul className="space-y-4">
        {products.map((product) => (
          <li key={product.id} className="border p-4 rounded-lg">
            <h2 className="text-xl font-semibold">{product.title}</h2>
            <p>{product.description}</p>
            <p className="text-gray-500">Price: ${product.price}</p>
            <p className="text-gray-500">Seller: {product.profile_name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

  // return (
  //   <div className="p-4">
  //     <h1 className="text-2xl font-bold mb-4">Listings</h1>
  //     <ul className="space-y-4">
  //       {listings.map((listing) => (
  //         <li key={listing.id} className="border p-4 rounded-lg">
  //           <h2 className="text-xl font-semibold">{listing.title}</h2>
  //           <p>{listing.description}</p>
  //           <p className="text-gray-500">Price: ${listing.price}</p>
  //         </li>
  //       ))}
  //     </ul>
  //   </div>
  // );
// }