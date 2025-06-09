require('dotenv').config({ path: '.env.local' });
const postgres = require('postgres');

const sql = postgres(process.env.POSTGRES_URL, { ssl: 'require' });

async function seed() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await sql`
    CREATE TABLE IF NOT EXISTS products (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT,
      price DECIMAL(10, 2) NOT NULL,
      images JSONB
    );
  `;

  await sql`
    INSERT INTO products (name, description, price, images)
    VALUES
      ('Handcrafted Wooden Bowl', 'A beautifully handcrafted wooden bowl, perfect for decor or serving.', 25.99, ARRAY['https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp']),
      ('Artisan Ceramic Mug', 'Handmade ceramic mug with intricate detailing and a comfortable grip.', 18.99, ARRAY['https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp']),
      ('Luxury Scented Candle', 'A soothing blend of fragrances to create a relaxing atmosphere.', 32.99, ARRAY['https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp']);
  `;

  console.log('✅ Seeded products');
  await sql.end();
}

seed().catch((err) => {
  console.error('❌ Error seeding:', err);
  process.exit(1);
});
