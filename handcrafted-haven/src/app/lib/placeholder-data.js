const users = [
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    name: 'Delba de Oliveira',
    email: 'delba@oliveira.com',
    password: 'password123',
  },
  {
    id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
    name: 'Lee Robinson',
    email: 'lee@robinson.com',
    password: 'password456',
  },
  {
    id: '3958dc9e-737f-4377-85e9-fec4b6a6442a',
    name: 'Steph Dietz',
    email: 'steph@dietz.com',
    password: 'password789',
  },
];

const products = [
  {
    seller_id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    name: 'Handcrafted Wooden Bowl',
    description: 'A beautiful handcrafted wooden bowl made from reclaimed wood.',
    price: 29.99,
    category: 'Home Decor',
    images: ['https://example.com/images/bowl1.jpg', 'https://example.com/images/bowl2.jpg'],
  },
  {
    seller_id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
    name: 'Ceramic Mug Set',
    description: 'A set of two handcrafted ceramic mugs with unique glazes.',
    price: 19.99,
    category: 'Kitchenware',
    images: ['https://example.com/images/mug1.jpg', 'https://example.com/images/mug2.jpg'],
  },
];

// For now, just exporting users:
module.exports = { users, products };