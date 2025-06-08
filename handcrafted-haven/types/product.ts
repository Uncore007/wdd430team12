// export interface Product {
//   id: string;
//   name: string;
//   description: string;
//   price: number;
//   imageUrl: string;
//   category: string;
//   inStock: boolean;
//   quantity: number;
//   createdAt: Date;
//   updatedAt: Date;
// }

export interface ProductFormData {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  quantity: number;
} 

export interface Product {
  id: string;
  product_name: string;
  product_description: string;
  product_price: number;
  category: string | null;
  product_images: string[];
}

export interface ProductCreate {
   product_name: string;
  product_description: string;
  product_price: number;
  category: string | null;
  product_images: string[];
} 
