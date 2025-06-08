

import { Product, ProductCreate } from "../types/product"; // Ensure correct product type import

import { Pool } from "pg";

export const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

// export async function fetchProducts() {
//   try {
//     const result = await pool.query(`
//       SELECT id, product_name, product_description, product_price, category, product_images
//       FROM products
//       ORDER BY created_at DESC
//     `);
//     return result.rows;
//   } catch (error) {
//     console.error("Database Error:", error);
//     return [];
//   }
// }
export async function fetchProducts() {
  try {
    const result = await pool.query(`
      SELECT 
        products.id, 
        products.product_name, 
        products.product_description, 
        products.product_price, 
        products.category, 
        products.product_images,
        COALESCE(AVG(pr.rating), 0) AS avgRating,  -- ✅ Ensures avgRating is always a number
        COALESCE(COUNT(pr.id), 0) AS totalReviews  -- ✅ Ensures totalReviews is always a number
      FROM products
      LEFT JOIN product_reviews pr ON products.id = pr.product_id
      GROUP BY products.id
      ORDER BY products.created_at DESC;
    `);

    // console.log("Fetched products:", result.rows); // ✅ Debugging step
    return result.rows;
  } catch (error) {
    console.error("Database Error:", error);
    return [];
  }
}


export async function addProduct(sellerId: string, product: ProductCreate) {
  if (!sellerId || sellerId.trim() === "") {
    throw new Error("Invalid seller ID: Seller ID cannot be empty");
  }

  try {
    await pool.query(
      `INSERT INTO products (seller_id, product_name, product_description, product_price, category, product_images)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [sellerId, product.product_name, product.product_description, product.product_price, product.category, JSON.stringify(product.product_images)]
    );
  } catch (error) {
    console.error("Database Error:", error);
    throw error;
  }
}


//This will modify product data when sellers submit changes.

export async function updateProduct(product: Product) {
  try {
    await pool.query(
      `UPDATE products
       SET product_name = $1, product_description = $2, product_price = $3, category = $4, updated_at = CURRENT_TIMESTAMP
       WHERE id = $5`,
      [product.product_name, product.product_description, product.product_price, product.category, product.id]
    );
  } catch (error) {
    console.error("Database Error:", error);
  }
}

//Sellers can remove their own products.

export async function deleteProduct(productId: string) {
  try {
    await pool.query(`DELETE FROM products WHERE id = $1`, [productId]);
  } catch (error) {
    console.error("Database Error:", error);
  }
}