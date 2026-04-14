import { User } from "lucide-react";

interface ProfileAvatarProps {
  gradient: string;
  size?: "sm" | "md" | "lg" | "xl";
  name: string;
}

const sizes = {
  sm: "w-12 h-12",
  md: "w-20 h-20",
  lg: "w-28 h-28",
  xl: "w-36 h-36",
};

const iconSizes = {
  sm: 20,
  md: 32,
  lg: 44,
  xl: 56,
};

export default function ProfileAvatar({ gradient, size = "md", name }: ProfileAvatarProps) {
  const initial = name.slice(-2, -1); // e.g. "1" from "여자 1호"

  return (
    <div
      className={`${sizes[size]} rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg flex-shrink-0`}
    >
      <span className="text-white font-bold text-lg select-none">{initial}</span>
    </div>
  );
}
