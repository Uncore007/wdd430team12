import ProductCard from "./ProductCard"; 
import { fetchProducts } from "../libs/db"; 

export default async function ProductGrid() { 
  const products = await fetchProducts(); // Direct server-side DB call 
   return ( 
   <div className="grid grid-cols-2 md:grid-cols-3 gap-6 p-6"> 
    {products.map((product) => ( 
      <ProductCard 
        id={product.id}
         key={product.id} title={product.product_name}
         description={product.product_description}
        imageUrl={product.product_images[0] || "/placeholder.jpg"}
        price={`${product.product_price}`}
        avgRating={product.avgrating ?? 0}
        totalReviews={product.totalreviews}       

        /> ))} 
        </div> ); }


