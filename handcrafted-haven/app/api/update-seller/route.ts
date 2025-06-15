import { pool } from "../../../libs/db";
import { cookies } from "next/headers"; //  Correct import for cookies
import { NextResponse } from "next/server"; // Fix incorrect use of `Response`

export async function POST(req: Request) {
  const { profileName, story, profileImage } = await req.json();
  const userId = (await cookies()).get("userId")?.value; //  Now correctly gets the cookie

  if (!userId) {
    return NextResponse.json({ error: "User not logged in" }, { status: 401 }); // Fix `Response.json()` to `NextResponse.json()`
  }

  try {
    await pool.query(
      `UPDATE seller_profiles SET profile_name = $1, story = $2, profile_image_url = $3, updated_at = CURRENT_TIMESTAMP WHERE user_id = $4`,
      [profileName, story, profileImage, userId]
    );

    return NextResponse.json({ success: true, message: "Profile updated successfully!" }); // ✅ Fix `Response.json()`
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 }); // Fix `Response.json()`
  }
}
