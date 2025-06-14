import postgres from 'postgres';
import { Product, User } from './definitions';
import { unstable_noStore as noStore } from 'next/cache';


const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

export async function getUsers(): Promise<User[]> {
  try {
    const users = await sql<User[]>`SELECT * FROM users ORDER BY created_at DESC;`;
    return users;
  } catch (error) {
    console.error('Failed to fetch users:', error);
    throw new Error('Failed to fetch users.');
  }
}

export async function getProducts(userId?: string): Promise<Product[]> {
    noStore();
    try {
      if (!userId) {
        // Decide behavior: fetch all products, or require a userId
        // For fetching only a specific user's products:
        // throw new Error('User ID is required to fetch products.'); 
        // Or, to fetch all products if no userId is given:
        const allProducts = await sql<Product[]>`
          SELECT * FROM products
          ORDER BY created_at DESC;
        `;
        return allProducts;
      }

      // Fetch products for the specified seller_id (userId)
      const products = await sql<Product[]>`
        SELECT * FROM products
        WHERE seller_id = ${userId}
        ORDER BY created_at DESC;
      `;
      return products;
    } catch (error) {
        console.error('Failed to fetch products:', error);
        throw new Error('Failed to fetch products.');
    }
}

// export async function getProducts(): Promise<Product[]> {
//     try {
//       const products = await sql<Product[]>`
//         SELECT * FROM products p
//         WHERE p.seller_id = -- Get the seller_id dynamically
//         ORDER BY created_at DESC;
//         `;
//       return products;
//     } catch (error) {
//         console.error('Failed to fetch products:', error);
//         throw new Error('Failed to fetch products.');
//     }
// }
