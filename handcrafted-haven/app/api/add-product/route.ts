import { pool } from "../../../libs/db";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
  const { productName, productDescription, productPrice, category, productImages } = await req.json();
  const userId = (await cookies()).get("userId")?.value;

  if (!userId) {
    return NextResponse.json({ error: "User not logged in" }, { status: 401 });
  }

  try {
    await pool.query(
      `INSERT INTO products (seller_id, product_name, product_description, product_price, category, product_images) 
       VALUES ($1, $2, $3, $4, $5, $6::jsonb) RETURNING id`,  // Store single or multiple URLs in JSONB
      [userId, productName, productDescription, productPrice, category, JSON.stringify(productImages)]
    );

    return NextResponse.json({ success: true, message: "Product added successfully!" });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
