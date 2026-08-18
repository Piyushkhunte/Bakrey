"use client";

import { useEffect, useState } from "react";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("bakery-cookie-consent");

    if (!consent) {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("bakery-cookie-consent", "accepted");
    setVisible(false);
  };

  const reject = () => {
    localStorage.setItem("bakery-cookie-consent", "rejected");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-[99999] mx-auto max-w-2xl rounded-3xl bg-[#4b2719] p-5 text-white shadow-2xl">
      <h3 className="font-display text-xl font-bold">
        We use cookies 🍪
      </h3>

      <p className="mt-2 text-sm leading-6 text-white/75">
        We use essential cookies and browser storage to keep the website,
        cart and preferences working properly.
      </p>

      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={accept}
          className="rounded-full bg-[#f0a16f] px-5 py-2.5 text-sm font-bold text-[#4b2719]"
        >
          Accept
        </button>

        <button
          type="button"
          onClick={reject}
          className="rounded-full border border-white/30 px-5 py-2.5 text-sm font-bold"
        >
          Reject non-essential
        </button>
      </div>
    </div>
  );
}