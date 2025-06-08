

import { pool } from "../../../../libs/db";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const result = await pool.query(
      `SELECT id, product_name, product_price, product_description, category, product_images 
       FROM products WHERE id = $1`,
      [params.id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const { product_name, product_price, product_description, category, product_images } = await req.json();

  try {
    await pool.query(
      `UPDATE products SET product_name = $1, product_price = $2, product_description = $3, category = $4, product_images = $5
       WHERE id = $6 RETURNING id`,
      [product_name, product_price, product_description, category, JSON.stringify(product_images), params.id]
    );

    return NextResponse.json({ success: true, message: "Product updated successfully!" });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}




export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const result = await pool.query(
      `DELETE FROM products WHERE id = $1 RETURNING id`,
      [params.id]
    );

    if (result.rowCount === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Product deleted successfully!" });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}