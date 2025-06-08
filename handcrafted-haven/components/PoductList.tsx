import Image from "next/image";
import { Product } from "../types/product"; // Ensure correct product type import

interface ProductListProps {
  products: Product[];
}

export default function ProductList({ products }: ProductListProps) {
  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product) => (
              <tr key={product.id}>
                
                <td>
                  {product.product_images?.length ? (
                    <Image 
                      src={product.product_images[0]} // First image from JSONB array
                      alt={product.product_name} 
                      width={50}  //  Explicit width to prevent layout shifts
                      height={50} //  Explicit height for correct aspect ratio
                      className="object-cover" 
                    />
                  ) : (
                    "No Image"
                  )}
                </td>
                <td>{product.product_name}</td>
                <td>{product.category || "Uncategorized"}</td>
                <td>${product.product_price.toFixed(2)}</td>
                <td>
                  <button className="btn btn-sm btn-error">Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center text-gray-500">
                No products available.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
