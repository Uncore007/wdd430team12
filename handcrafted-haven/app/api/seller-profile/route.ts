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
      `SELECT profile_name, story, profile_image_url FROM seller_profiles WHERE user_id = $1`,
      [userId]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Seller profile not found" }, { status: 404 });
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
