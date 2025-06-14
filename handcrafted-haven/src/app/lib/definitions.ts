export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type SellerProfile = {
  id: string;
  user_id: string;
  profile_name: string;
  story?: string;
  profile_image_url?: string;
  created_at: string;
  updated_at: string;
};

export type Product = {
  id: string;
  seller_id: string;
  name: string;
  description?: string;
  price: number;
  category?: string;
  images?: string[]; // Array of image URLs
  created_at: string;
  updated_at: string;
};