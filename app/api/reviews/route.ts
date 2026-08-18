import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
);

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from("reviews")
      .select(
        "id, customer_name, location, rating, review_text, created_at",
      )
      .eq("is_approved", true)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Reviews fetch error:", error);

      return NextResponse.json(
        { error: "Failed to fetch reviews" },
        { status: 500 },
      );
    }

    return NextResponse.json(data ?? []);
  } catch (error) {
    console.error("Reviews API error:", error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const customerName = String(body.customerName ?? "").trim();
    const location = String(body.location ?? "").trim();
    const reviewText = String(body.reviewText ?? "").trim();
    const rating = Number(body.rating);

    if (!customerName) {
      return NextResponse.json(
        { error: "Name is required." },
        { status: 400 },
      );
    }

    if (!reviewText || reviewText.length < 5) {
      return NextResponse.json(
        { error: "Review must contain at least 5 characters." },
        { status: 400 },
      );
    }

    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Rating must be between 1 and 5." },
        { status: 400 },
      );
    }

    const { data, error } = await supabaseAdmin
      .from("reviews")
      .insert({
        customer_name: customerName,
        location: location || "Pune",
        rating,
        review_text: reviewText,
        // Reviews are displayed immediately after submission.
        is_approved: true,
      })
      .select()
      .single();

    if (error) {
      console.error("Review insert error:", error);

      return NextResponse.json(
        { error: "Failed to submit review." },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        review: data,
        message: "Review submitted successfully.",
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Review POST error:", error);

    return NextResponse.json(
      { error: "Invalid request." },
      { status: 400 },
    );
  }
}
