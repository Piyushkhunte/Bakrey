import { NextResponse } from "next/server";
import { createHmac } from "crypto";

function createAdminSession(email: string) {
  const secret = process.env.ADMIN_SESSION_SECRET;

  if (!secret) {
    throw new Error("ADMIN_SESSION_SECRET is not configured.");
  }

  return createHmac("sha256", secret)
    .update(email)
    .digest("hex");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const email =
      typeof body.email === "string"
        ? body.email.trim().toLowerCase()
        : "";

    const password =
      typeof body.password === "string"
        ? body.password
        : "";

    const adminEmail =
      process.env.ADMIN_EMAIL?.trim().toLowerCase();

    const adminPassword =
      process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      console.error(
        "ADMIN_EMAIL or ADMIN_PASSWORD is missing.",
      );

      return NextResponse.json(
        {
          success: false,
          message: "Admin login is not configured.",
        },
        { status: 500 },
      );
    }

    if (!process.env.ADMIN_SESSION_SECRET) {
      console.error(
        "ADMIN_SESSION_SECRET is missing.",
      );

      return NextResponse.json(
        {
          success: false,
          message: "Admin session is not configured.",
        },
        { status: 500 },
      );
    }

    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Email and password are required.",
        },
        { status: 400 },
      );
    }

    if (
      email !== adminEmail ||
      password !== adminPassword
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid admin credentials.",
        },
        { status: 401 },
      );
    }

    const sessionToken = createAdminSession(email);

    const response = NextResponse.json({
      success: true,
      message: "Admin login successful.",
    });

    response.cookies.set({
      name: "admin_session",
      value: sessionToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error("Admin login error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to process admin login.",
      },
      { status: 500 },
    );
  }
}