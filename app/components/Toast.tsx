"use client";

import { useEffect } from "react";

type ToastProps = {
  message: string;
  type?: "success" | "info" | "error";
  show: boolean;
  onClose: () => void;
  duration?: number;
};

export default function Toast({
  message,
  type = "success",
  show,
  onClose,
  duration = 3500,
}: ToastProps) {
  useEffect(() => {
    if (!show) return;

    const timer = window.setTimeout(() => {
      onClose();
    }, duration);

    return () => window.clearTimeout(timer);
  }, [show, duration, onClose]);

  if (!show) return null;

  const styles = {
    success: {
      icon: "✓",
      background: "bg-[#4b2719]",
      iconBackground: "bg-[#d86436]",
    },
    info: {
      icon: "✦",
      background: "bg-[#4b2719]",
      iconBackground: "bg-[#c65334]",
    },
    error: {
      icon: "!",
      background: "bg-[#7f2d20]",
      iconBackground: "bg-[#ef8b62]",
    },
  };

  const current = styles[type];

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed right-5 top-5 z-[9999] flex w-[min(390px,calc(100vw-2rem))] items-start gap-3 rounded-2xl ${current.background} p-4 text-white shadow-2xl`}
    >
      <span
        className={`grid size-9 shrink-0 place-items-center rounded-full ${current.iconBackground} text-lg font-bold`}
      >
        {current.icon}
      </span>

      <p className="flex-1 pt-1 text-sm font-semibold leading-5">
        {message}
      </p>

      <button
        type="button"
        onClick={onClose}
        aria-label="Close notification"
        className="rounded-full px-2 text-lg leading-none text-white/60 transition hover:text-white"
      >
        ×
      </button>
    </div>
  );
}