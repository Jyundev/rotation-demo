interface ProgressDotsProps {
  total: number;
  current: number;
}

export default function ProgressDots({ total, current }: ProgressDotsProps) {
  return (
    <div className="flex items-center gap-1.5 justify-center">
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          className={`rounded-full transition-all duration-300 ${
            i < current
              ? "w-2 h-2 bg-pink-400"
              : i === current
              ? "w-4 h-2 bg-pink-500"
              : "w-2 h-2 bg-gray-200"
          }`}
        />
      ))}
    </div>
  );
}
