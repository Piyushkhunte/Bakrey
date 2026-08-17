"use client";

import { useEffect, useState } from "react";
import Toast from "./Toast";

export default function WelcomeToast() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Wait 4 seconds after the page loads
    const showTimer = window.setTimeout(() => {
      setShow(true);
    }, 4000);

    return () => {
      window.clearTimeout(showTimer);
    };
  }, []);

  useEffect(() => {
    if (!show) return;

    // Hide 4.5 seconds after it appears
    const hideTimer = window.setTimeout(() => {
      setShow(false);
    }, 4500);

    return () => {
      window.clearTimeout(hideTimer);
    };
  }, [show]);

  return (
    <Toast
      show={show}
      onClose={() => setShow(false)}
      type="info"
      message="A warm welcome! Get 15% off your first online order — use code WELCOME15."
      duration={4500}
    />
  );
}