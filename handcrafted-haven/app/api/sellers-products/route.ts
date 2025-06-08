import { pool } from "../../../libs/db";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";



export async function GET() {
  const userId = (await cookies()).get("userId")?.value;

  if (!userId) {
    return NextResponse.json({ error: "User not logged in" }, { status: 401 });
  }

  try {
    const result = await pool.query(
      `SELECT id, product_name, product_price, product_description, category, product_images 
       FROM products 
       WHERE seller_id = $1`,
      [userId]
    );

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
