import bcrypt from 'bcryptjs';
import postgres from 'postgres';
import { users, products } from '../lib/placeholder-data'; 

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function seedUsers() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
  `;

  console.log(`Created "users" table`);

  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return sql`
        INSERT INTO users (id, name, email, password)
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
    }),
  );
  console.log(`Seeded ${insertedUsers.length} users`);
  return insertedUsers;
}

async function seedProducts() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await sql`
    CREATE TABLE IF NOT EXISTS products (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      seller_id UUID NOT NULL,
      name VARCHAR(255) NOT NULL,
      description TEXT,
      price DECIMAL(10, 2) NOT NULL,
      category VARCHAR(100),
      images JSONB, -- Store as an array of image URLs, e.g., ['url1.jpg', 'url2.png']
      created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (seller_id) REFERENCES users(id) ON DELETE CASCADE
    );
  `;
  console.log(`Created "products" table`);

  const insertedProducts = await Promise.all(
    products.map(async (product) => {
      return sql`
        INSERT INTO products (seller_id, name, description, price, category, images)
        VALUES (${product.seller_id}, ${product.name}, ${product.description}, 
                ${product.price}, ${product.category}, ${JSON.stringify(product.images)})
        ON CONFLICT (id) DO NOTHING;
      `;
    }),
  )

  console.log(`Seeded ${insertedProducts.length} products`);
  return insertedProducts;
}

async function seedReviews() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await sql`
    CREATE TABLE IF NOT EXISTS reviews (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      product_id UUID NOT NULL,
      user_id UUID NOT NULL,
      rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
      comment TEXT,
      created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
  `;
  console.log(`Created "reviews" table`);
}

export async function GET() {
  try {
    await sql.begin(async (sql) => {
      await seedUsers();
      await seedProducts();
      await seedReviews();
    });

    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    console.error('Error seeding database:', error);
    return Response.json({ error: 'Failed to seed database' }, { status: 500 });
  }
}
