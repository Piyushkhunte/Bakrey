// widgetId: "366872654a32363634343332",

//       // Replace with your NEW MSG91 tokenAuth.
//       // Do not use the token previously exposed.
//       tokenAuth: "561710Tp2rBw2tJR6a83efd6P1",

"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    initSendOTP?: (configuration: {
      widgetId: string;
      tokenAuth: string;
      identifier?: string;
      exposeMethods?: boolean;
      success?: (data: unknown) => void;
      failure?: (error: unknown) => void;
    }) => void;
  }
}

export default function MSG91OTP() {
  const [status, setStatus] = useState("");
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;

    const configuration = {
      // Your MSG91 OTP Widget ID
      widgetId: "366872654a32363634343332",

      // IMPORTANT:
      // Put your NEW MSG91 OTP token here.
      // Do NOT use the token that was previously exposed.
      tokenAuth: "561710Tp2rBw2tJR6a83efd6P1",

      // MSG91 widget will collect the mobile number
      identifier: "",

      // Expose OTP verification methods
      exposeMethods: true,

      // Called after MSG91 successfully verifies the OTP
      success: async (data: unknown) => {
        console.log("🔥 MSG91 SUCCESS CALLBACK:", data);

        const responseData = data as Record<string, unknown>;

        const accessToken =
          typeof responseData["access-token"] === "string"
            ? responseData["access-token"]
            : typeof responseData["token"] === "string"
              ? responseData["token"]
              : null;

        console.log(
          "🔥 MSG91 ACCESS TOKEN:",
          accessToken ? "RECEIVED" : "MISSING",
        );

        if (!accessToken) {
          console.error("MSG91 did not return an access token:", data);

          setStatus(
            "OTP verified, but MSG91 did not return a verification token.",
          );

          return;
        }

        try {
          const response = await fetch("/api/verify-phone", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              accessToken,
            }),
          });

          const result = await response.json();

          console.log("🔥 /api/verify-phone RESULT:", result);

          if (result.success) {
            setStatus("✓ Phone number verified successfully.");
          } else {
            setStatus("Phone verification could not be completed.");
          }
        } catch (error) {
          console.error("🔥 Phone verification request failed:", error);

          setStatus("Phone verification failed. Please try again.");
        }
      },

      // Called when MSG91 OTP verification fails
      failure: (error: unknown) => {
        console.error("🔥 MSG91 OTP FAILURE:", error);

        setStatus("Unable to verify the phone number. Please try again.");
      },
    };

    const loadOtpScript = (urls: string[]) => {
      let index = 0;

      const attempt = () => {
        const script = document.createElement("script");

        script.src = urls[index];
        script.async = true;

        script.onload = () => {
          if (typeof window.initSendOTP === "function") {
            initialized.current = true;

            window.initSendOTP(configuration);
          } else {
            console.error(
              "MSG91 OTP script loaded but initSendOTP was not found.",
            );

            setStatus("MSG91 OTP service could not be initialized.");
          }
        };

        script.onerror = () => {
          index++;

          if (index < urls.length) {
            attempt();
          } else {
            console.error("MSG91 OTP scripts failed to load.");

            setStatus(
              "Unable to load phone verification. Please refresh and try again.",
            );
          }
        };

        document.head.appendChild(script);
      };

      attempt();
    };

    loadOtpScript([
      "https://verify.msg91.com/otp-provider.js",
      "https://verify.phone91.com/otp-provider.js",
    ]);
  }, []);

  return (
    <div className="mx-auto w-full max-w-md rounded-3xl border border-[#4b2719]/10 bg-white p-6 shadow-[0_12px_40px_rgba(75,39,25,0.08)]">
      <div className="text-center">
        <div className="mx-auto grid size-14 place-items-center rounded-full bg-[#f2e1cb] text-2xl">
          📱
        </div>

        <h2 className="mt-4 font-display text-2xl font-bold text-[#4b2719]">
          Verify your phone
        </h2>

        <p className="mt-2 text-sm leading-6 text-[#76584a]">
          Verify your mobile number for order updates and notifications.
        </p>
      </div>

      <div className="mt-6 min-h-6">
        {status && (
          <div
            role="status"
            aria-live="polite"
            className="rounded-xl bg-[#f2e1cb] px-4 py-3 text-center text-sm font-semibold text-[#4b2719]"
          >
            {status}
          </div>
        )}
      </div>

      <p className="mt-4 text-center text-xs leading-5 text-[#76584a]">
        Your phone number is used for verification and order communication.
      </p>
    </div>
  );
}