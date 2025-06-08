import { pool } from "../../../libs/db";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";



export async function POST(req: Request) {
  const { profileName, story, profileImage } = await req.json();
  const userId = (await cookies()).get("userId")?.value;

  if (!userId) {
    return NextResponse.json({ error: "User not logged in" }, { status: 401 });
  }

  try {
    await pool.query(
      `UPDATE users SET role = 'seller' WHERE id = $1`,
      [userId]
    );

    await pool.query(
      `INSERT INTO seller_profiles (user_id, profile_name, story, profile_image_url) VALUES ($1, $2, $3, $4) RETURNING id`,
      [userId, profileName, story, profileImage]
    );

    return NextResponse.json({ success: true, message: "You are now a seller!" });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
