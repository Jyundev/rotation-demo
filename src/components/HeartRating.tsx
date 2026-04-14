"use client";

import { Heart } from "lucide-react";

interface HeartRatingProps {
  value: number;
  onChange: (v: number) => void;
  max?: number;
}

export default function HeartRating({ value, onChange, max = 5 }: HeartRatingProps) {
  function handleClick(i: number) {
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(30);
    }
    onChange(i);
  }

  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: max }, (_, i) => i + 1).map((i) => (
        <button
          key={i}
          onClick={() => handleClick(i)}
          className="heart-btn focus:outline-none"
          aria-label={`${i}점`}
        >
          <Heart
            size={32}
            className={
              i <= value
                ? "fill-pink-500 text-pink-500 drop-shadow-sm"
                : "text-gray-200"
            }
          />
        </button>
      ))}
    </div>
  );
}
