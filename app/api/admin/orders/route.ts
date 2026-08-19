import { NextRequest, NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";
import { createClient } from "@supabase/supabase-js";

function createExpectedAdminSession(email: string) {
  const secret = process.env.ADMIN_SESSION_SECRET;

  if (!secret) {
    throw new Error("ADMIN_SESSION_SECRET is not configured.");
  }

  return createHmac("sha256", secret)
    .update(email)
    .digest("hex");
}

function isAdminAuthenticated(request: NextRequest) {
  const sessionToken =
    request.cookies.get("admin_session")?.value;

  const adminEmail =
    process.env.ADMIN_EMAIL?.trim().toLowerCase();

  if (!sessionToken || !adminEmail) {
    return false;
  }

  const expectedToken =
    createExpectedAdminSession(adminEmail);

  const receivedBuffer = Buffer.from(
    sessionToken,
    "utf8"
  );

  const expectedBuffer = Buffer.from(
    expectedToken,
    "utf8"
  );

  if (
    receivedBuffer.length !== expectedBuffer.length
  ) {
    return false;
  }

  return timingSafeEqual(
    receivedBuffer,
    expectedBuffer
  );
}

export async function GET(request: NextRequest) {
  try {
    // --------------------------------
    // Verify admin session FIRST
    // --------------------------------

    if (!process.env.ADMIN_SESSION_SECRET) {
      console.error(
        "ADMIN_SESSION_SECRET is not configured."
      );

      return NextResponse.json(
        {
          success: false,
          message: "Admin session is not configured.",
        },
        { status: 500 }
      );
    }

    if (!process.env.ADMIN_EMAIL) {
      console.error(
        "ADMIN_EMAIL is not configured."
      );

      return NextResponse.json(
        {
          success: false,
          message: "Admin account is not configured.",
        },
        { status: 500 }
      );
    }

    if (!isAdminAuthenticated(request)) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized.",
        },
        { status: 401 }
      );
    }

    // --------------------------------
    // Supabase configuration
    // --------------------------------

    const supabaseUrl =
      process.env.NEXT_PUBLIC_SUPABASE_URL;

    const serviceRoleKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
      console.error(
        "Missing Supabase admin environment variables."
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Supabase admin configuration is missing.",
        },
        { status: 500 }
      );
    }

    // --------------------------------
    // Supabase admin client
    // --------------------------------

    const supabaseAdmin = createClient(
      supabaseUrl,
      serviceRoleKey,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );

    // --------------------------------
    // Fetch orders
    // --------------------------------

    const { data: orders, error } =
      await supabaseAdmin
        .from("orders")
        .select("*")
        .order("created_at", {
          ascending: false,
        });

    if (error) {
      console.error(
        "Failed to fetch admin orders:",
        error.message
      );

      return NextResponse.json(
        {
          success: false,
          message: "Failed to load orders.",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      orders: orders ?? [],
    });
  } catch (error) {
    console.error(
      "Admin orders API error:",
      error instanceof Error
        ? error.message
        : "Unknown error"
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to load orders.",
      },
      { status: 500 }
    );
  }
}