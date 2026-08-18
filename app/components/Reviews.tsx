"use client";

import { FormEvent, useEffect, useState } from "react";

type Review = {
  id: string;
  customer_name: string;
  location: string | null;
  rating: number;
  review_text: string;
  created_at: string;
};

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadReviews();
  }, []);

  async function loadReviews() {
    try {
      const response = await fetch("/api/reviews");

      if (!response.ok) {
        throw new Error("Failed to fetch reviews");
      }

      const data = await response.json();

      setReviews(data);
    } catch (error) {
      console.error("Reviews error:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!name.trim()) {
      setMessage("Please enter your name.");
      return;
    }

    if (reviewText.trim().length < 5) {
      setMessage("Please write at least 5 characters in your review.");
      return;
    }

    setSubmitting(true);
    setMessage("");

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerName: name.trim(),
          location: location.trim(),
          rating,
          reviewText: reviewText.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Failed to submit review.",
        );
      }

      const submittedReview = data.review as Review;
      setReviews((currentReviews) => [submittedReview, ...currentReviews]);

      setName("");
      setLocation("");
      setRating(5);
      setReviewText("");

      setMessage(
        "Thank you! Your review is now live.",
      );
    } catch (error) {
      console.error("Review submission error:", error);

      setMessage(
        error instanceof Error
          ? error.message
          : "Failed to submit review.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="w-full">
      {/* HEADER */}

      <div className="text-center">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#d86436]">
          From our lovely customers
        </p>

        <h2 className="mt-3 font-display text-4xl text-[#4b2719] md:text-6xl">
          Sweet words mean the world
        </h2>

        <p className="mt-4 text-[#99523a]">
          Real smiles from right here in Pune.
        </p>
      </div>

      {/* EXISTING REVIEWS */}

      <div className="mt-12">
        {loading ? (
          <div className="rounded-3xl bg-white p-10 text-center">
            <p className="text-sm text-[#76584a]">
              Loading customer reviews...
            </p>
          </div>
        ) : reviews.length === 0 ? (
          <div className="rounded-3xl border border-[#e8d4bf] bg-white p-10 text-center">
            <p className="font-display text-2xl text-[#4b2719]">
              Be the first to leave a review!
            </p>

            <p className="mt-2 text-sm text-[#76584a]">
              Your feedback means a lot to us.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-3">
            {reviews.map((review) => (
              <article
                key={review.id}
                className="rounded-[1.5rem] border border-[#e8d4bf] bg-white p-7"
              >
                {/* STARS */}

                <div className="mb-5 flex gap-1 text-[#db6b40]">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <span key={index} className="text-lg">
                      {index < review.rating ? "★" : "☆"}
                    </span>
                  ))}
                </div>

                {/* REVIEW */}

                <blockquote className="font-display text-xl leading-7 text-[#4b2719]">
                  &ldquo;{review.review_text}&rdquo;
                </blockquote>

                {/* CUSTOMER */}

                <div className="mt-6 text-sm">
                  <b className="text-[#4b2719]">
                    {review.customer_name}
                  </b>

                  {review.location && (
                    <span className="ml-2 text-[#8b6c5c]">
                      · {review.location}
                    </span>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {/* REVIEW FORM */}

      <div className="mx-auto mt-14 max-w-2xl rounded-[2rem] bg-[#f2e1cb] p-6 md:p-10">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#d86436]">
            Share your experience
          </p>

          <h3 className="mt-2 font-display text-3xl text-[#4b2719]">
            Leave us a review
          </h3>

          <p className="mt-2 text-sm text-[#76584a]">
            Tell us what you thought about your order.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >
          {/* NAME */}

          <div>
            <label
              htmlFor="review-name"
              className="mb-2 block text-sm font-bold text-[#4b2719]"
            >
              Your name
            </label>

            <input
              id="review-name"
              type="text"
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Enter your name"
              className="w-full rounded-2xl border border-[#4b2719]/15 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#d86436]"
            />
          </div>

          {/* LOCATION */}

          <div>
            <label
              htmlFor="review-location"
              className="mb-2 block text-sm font-bold text-[#4b2719]"
            >
              Location
            </label>

            <input
              id="review-location"
              type="text"
              value={location}
              onChange={(event) =>
                setLocation(event.target.value)
              }
              placeholder="e.g. Bharati Vidyapeeth"
              className="w-full rounded-2xl border border-[#4b2719]/15 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#d86436]"
            />
          </div>

          {/* RATING */}

          <div>
            <label className="mb-2 block text-sm font-bold text-[#4b2719]">
              Your rating
            </label>

            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setRating(value)}
                  aria-label={`${value} star${
                    value > 1 ? "s" : ""
                  }`}
                  className={`text-3xl transition ${
                    value <= rating
                      ? "text-[#d86436]"
                      : "text-[#cdb8a8]"
                  }`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          {/* REVIEW */}

          <div>
            <label
              htmlFor="review-text"
              className="mb-2 block text-sm font-bold text-[#4b2719]"
            >
              Your review
            </label>

            <textarea
              id="review-text"
              required
              minLength={5}
              rows={5}
              value={reviewText}
              onChange={(event) =>
                setReviewText(event.target.value)
              }
              placeholder="How was your experience?"
              className="w-full resize-none rounded-2xl border border-[#4b2719]/15 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#d86436]"
            />
          </div>

          {/* MESSAGE */}

          {message && (
            <div className="rounded-2xl bg-white px-4 py-3 text-sm leading-6 text-[#4b2719]">
              {message}
            </div>
          )}

          {/* SUBMIT */}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-full bg-[#4b2719] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#d86436] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting
              ? "Submitting..."
              : "Submit review"}
          </button>
        </form>
      </div>
    </div>
  );
}
