"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        setError(result.message || "Invalid admin credentials.");
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch (error) {
      console.error("Admin login error:", error);
      setError("Unable to login. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#fffaf2] px-5">
      <div className="w-full max-w-md">
        <div className="rounded-[2rem] border border-[#4b2719]/10 bg-white p-8 shadow-[0_20px_60px_rgba(75,39,25,.10)] md:p-10">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#c65334]">
              Piyush&apos;s Bakery
            </p>

            <div
              className="mx-auto mt-6 grid size-16 place-items-center rounded-full bg-[#f2e1cb] text-3xl"
              aria-hidden="true"
            >
              🔐
            </div>

            <h1 className="mt-5 font-display text-4xl font-bold text-[#4b2719]">
              Admin Login
            </h1>

            <p className="mt-2 text-sm text-[#76584a]">
              Sign in to manage your bakery dashboard.
            </p>
          </div>

          <form onSubmit={handleLogin} className="mt-8 space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-bold text-[#4b2719]"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                required
                autoComplete="username"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="admin@example.com"
                className="w-full rounded-2xl border border-[#4b2719]/15 bg-[#fffaf2] px-4 py-3.5 text-sm outline-none transition focus:border-[#c65334] focus:ring-2 focus:ring-[#c65334]/10"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-bold text-[#4b2719]"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter your password"
                className="w-full rounded-2xl border border-[#4b2719]/15 bg-[#fffaf2] px-4 py-3.5 text-sm outline-none transition focus:border-[#c65334] focus:ring-2 focus:ring-[#c65334]/10"
              />
            </div>

            {error && (
              <div
                role="alert"
                className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700"
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-[#4b2719] px-5 py-3.5 text-sm font-bold text-white transition hover:bg-[#c65334] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-[#a57d69]">
            Admin access only
          </p>
        </div>
      </div>
    </main>
  );
}