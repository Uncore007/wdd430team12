import bcrypt from "bcryptjs";
import { pool } from "../../../libs/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash password

    await pool.query(
      `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name`,
      [name, email, hashedPassword]
    );

    return NextResponse.json({ success: true, message: "User registered successfully!" });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}