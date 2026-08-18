import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { accessToken } = await request.json();

    if (!accessToken || typeof accessToken !== "string") {
      return NextResponse.json(
        {
          success: false,
          message: "Access token is required.",
        },
        { status: 400 },
      );
    }

    const authKey = process.env.MSG91_AUTHKEY;

    if (!authKey) {
      console.error("MSG91_AUTHKEY is missing.");

      return NextResponse.json(
        {
          success: false,
          message: "MSG91 authentication is not configured.",
        },
        { status: 500 },
      );
    }

    const response = await fetch(
      "https://control.msg91.com/api/v5/widget/verifyAccessToken",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          authkey: authKey,
          "access-token": accessToken,
        }),
        cache: "no-store",
      },
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("MSG91 verification failed:", {
        status: response.status,
        data,
      });

      return NextResponse.json(
        {
          success: false,
          message: "MSG91 could not verify the phone.",
        },
        { status: response.status },
      );
    }

    /*
     * MSG91's response can contain the verified phone/access-token
     * information depending on the widget configuration.
     *
     * Do not expose the MSG91 authkey or raw credentials to the browser.
     */

    return NextResponse.json({
      success: true,
      message: "Phone number verified successfully.",
      verified: true,
    });
  } catch (error) {
    console.error("Phone verification error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Phone verification failed.",
      },
      { status: 500 },
    );
  }
}