import { pool } from "../../../../libs/db";
import { NextResponse } from "next/server";







export async function GET(req: Request, context: { params: Record<string, string> }) {
  const params = await context.params; //  Wait for `params` to be fully available
  const productId = params?.productId; //  Extract `productId` safely

  if (!productId) {
    return NextResponse.json({ error: "Missing product ID" }, { status: 400 });
  }

  
   try {
    const result = await pool.query(
      `SELECT id, rating, review_text, reviewer_name, reviewer_role, created_at,
       (SELECT AVG(rating) FROM product_reviews WHERE product_id = $1) AS avgRating
       FROM product_reviews WHERE product_id = $1 ORDER BY created_at DESC`,
      [productId]
    );



    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
  }
}








// export async function POST(req: Request, { params }: { params: { productId: string } }) {
//   const { rating, review_text, reviewer_name, reviewer_role } = await req.json();

//   if (!reviewer_name) {
//     return NextResponse.json({ error: "Reviewer name is required." }, { status: 400 });
//   }

//   try {
//     await pool.query(
//       `INSERT INTO product_reviews (product_id, rating, review_text, reviewer_name, reviewer_role) 
//        VALUES ($1, $2, $3, $4, $5) RETURNING id`,
//       [params.productId, rating, review_text, reviewer_name, reviewer_role ?? "customer"]
//     );

//     return NextResponse.json({ success: true, message: "Review added successfully!" });
//   } catch (error) {
//     console.error("Database error:", error);
//     return NextResponse.json({ error: "Failed to submit review" }, { status: 500 });
//   }
// }


export async function POST(req: Request, context: { params: Record<string, string> }) {
 const { rating, review_text, reviewer_name, reviewer_role } = await req.json();
  const params = await context.params; // Ensure we await `params`
  const productId = params?.productId; // Extract `productId` safely

  if (!productId) {
    return NextResponse.json({ error: "Missing product ID" }, { status: 400 });
  }

  try {
    await pool.query(
      `INSERT INTO product_reviews (product_id, rating, review_text, reviewer_name, reviewer_role) 
       VALUES ($1, $2, $3, $4, $5) RETURNING id`,
      [productId, rating, review_text, reviewer_name, reviewer_role ?? "Customer"]
    );

    return NextResponse.json({ success: true, message: "Review added successfully!" });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Failed to submit review" }, { status: 500 });
  }
}
