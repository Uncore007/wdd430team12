import postgres from 'postgres';
import { Product, SellerProfile, User } from './definitions';

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

export async function getProducts(): Promise<Product[]> {
  try {
    const products = await sql<Product[]>`
      SELECT p.*, sp.profile_name, sp.profile_image_url
      FROM products p
      JOIN seller_profiles sp ON p.seller_id = sp.user_id
      ORDER BY p.created_at DESC;
    `;
    return products;
  } catch (error) {
    console.error('Failed to fetch products:', error);
    throw new Error('Failed to fetch products.');
  }
}

// export async function getPro(): Promise<Product[]> {
//   try {
//     const products = await sql<Product[]>`
//       SELECT p.*, sp.profile_name, sp.profile_image_url
//       FROM products p
//       JOIN seller_profiles sp ON p.seller_id = sp.user_id
//       ORDER BY p.created_at DESC;
//     `;
//     return products;
//   } catch (error) {
//     console.error('Failed to fetch listings:', error);
//     throw new Error('Failed to fetch listings.');
//   }
// }