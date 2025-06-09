import { NextResponse } from "next/server";
import { pool } from "../../../libs/db";
import bcrypt from "bcryptjs";

import { cookies } from "next/headers";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  
  try {
    const result = await pool.query(
      `SELECT id, name, role, password FROM users WHERE email = $1 LIMIT 1`,
      [email]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const { id, name, role, password: hashedPassword } = result.rows[0];
    const isPasswordValid = await bcrypt.compare(password, hashedPassword);

    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    //  Ensure cookies store the correct role
    (await
          //  Ensure cookies store the correct role
          cookies()).set("userId", id);
    (await cookies()).set("userName", name);
    (await cookies()).set("userRole", role || "customer"); //  Default to "customer" if missing

    return NextResponse.json({ success: true, userId: id, userName: name, userRole: role || "customer" });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
