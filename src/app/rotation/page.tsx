"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Coffee,
  Briefcase,
  Tag,
  Music2,
  ArrowRight,
  Bell,
} from "lucide-react";
import Card from "@/components/Card";
import Button from "@/components/Button";
import HeartRating from "@/components/HeartRating";
import ProfileAvatar from "@/components/ProfileAvatar";
import ProgressDots from "@/components/ProgressDots";
import { MOCK_PROFILES } from "@/lib/mockData";
import { saveRatings, type Rating } from "@/lib/store";

const ROUND_SECONDS = 10; // 실제론 60~120초지만 데모라 10초
const TOTAL_SECONDS = ROUND_SECONDS * MOCK_PROFILES.length;

export default function RotationPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(TOTAL_SECONDS);
  const [roundLeft, setRoundLeft] = useState(ROUND_SECONDS);
  const [ratings, setRatings] = useState<Rating[]>(
    MOCK_PROFILES.map((p) => ({ profileId: p.id, hearts: 0, memo: "" }))
  );
  const [showMove, setShowMove] = useState(false);
  const [cardVisible, setCardVisible] = useState(true);
  const [done, setDone] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const current = MOCK_PROFILES[currentIndex];
  const currentRating = ratings[currentIndex];

  const goNext = useCallback(() => {
    if (currentIndex >= MOCK_PROFILES.length - 1) {
      setDone(true);
      return;
    }
    // vibrate
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate([40, 30, 40]);
    }
    setShowMove(true);
    setCardVisible(false);

    setTimeout(() => {
      setCurrentIndex((i) => i + 1);
      setRoundLeft(ROUND_SECONDS);
      setShowMove(false);
      setCardVisible(true);
    }, 800);
  }, [currentIndex]);

  // 전체 타이머
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current!);
          setDone(true);
          return 0;
        }
        return t - 1;
      });
      setRoundLeft((r) => {
        if (r <= 1) {
          return ROUND_SECONDS; // goNext handles the actual index change
        }
        return r - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current!);
  }, []);

  // 라운드 타이머 → 다음 사람
  useEffect(() => {
    if (roundLeft === 0 && !done) {
      goNext();
    }
  }, [roundLeft, done, goNext]);

  // 완료 → 결과 선택으로
  useEffect(() => {
    if (done) {
      saveRatings(ratings);
      setTimeout(() => router.push("/result-select"), 1200);
    }
  }, [done, ratings, router]);

  function updateRating(field: "hearts" | "memo", value: number | string) {
    setRatings((prev) =>
      prev.map((r, i) =>
        i === currentIndex ? { ...r, [field]: value } : r
      )
    );
  }

  const totalMin = Math.floor(timeLeft / 60);
  const totalSec = timeLeft % 60;
  const progress = roundLeft / ROUND_SECONDS;
  const circumference = 2 * Math.PI * 28; // r=28

  return (
    <main className="min-h-dvh bg-gradient-to-b from-pink-50 to-white flex flex-col">
      {/* Top bar */}
      <header className="px-5 pt-10 pb-4 flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-400 font-medium">지금 만나는 사람</p>
          <p className="text-lg font-bold text-gray-900">
            {currentIndex + 1} / {MOCK_PROFILES.length}
          </p>
        </div>

        {/* Timer */}
        <div className="flex flex-col items-center gap-0.5">
          <div className="relative w-16 h-16">
            <svg className="w-full h-full" viewBox="0 0 64 64">
              <circle cx="32" cy="32" r="28" fill="none" stroke="#fce7f3" strokeWidth="4" />
              <circle
                cx="32"
                cy="32"
                r="28"
                fill="none"
                stroke={roundLeft <= 3 ? "#ef4444" : "#ec4899"}
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={circumference * (1 - progress)}
                className="timer-ring"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span
                className={`text-sm font-bold tabular-nums ${
                  roundLeft <= 3 ? "text-red-500 animate-pulse2" : "text-gray-800"
                }`}
              >
                {roundLeft}
              </span>
            </div>
          </div>
          <span className="text-[10px] text-gray-400">
            총 {String(totalMin).padStart(2, "0")}:{String(totalSec).padStart(2, "0")}
          </span>
        </div>
      </header>

      {/* Progress dots */}
      <div className="px-5 mb-4">
        <ProgressDots total={MOCK_PROFILES.length} current={currentIndex} />
      </div>

      {/* "자리 이동" overlay */}
      {showMove && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-scaleIn">
          <div className="bg-white rounded-3xl px-8 py-6 shadow-2xl flex flex-col items-center gap-3 mx-6">
            <Bell size={32} className="text-pink-500 animate-pulse2" />
            <p className="text-xl font-bold text-gray-900">다음 자리로</p>
            <p className="text-gray-500 text-sm text-center">
              이동해주세요! <br />
              <span className="text-pink-500 font-semibold">
                {MOCK_PROFILES[currentIndex + 1]?.name ?? ""}
              </span>
            </p>
          </div>
        </div>
      )}

      {/* 완료 overlay */}
      {done && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-pink-500/90 animate-scaleIn">
          <div className="text-center text-white px-6">
            <div className="text-5xl mb-4">🎊</div>
            <p className="text-2xl font-bold mb-1">모든 만남 완료!</p>
            <p className="opacity-80 text-sm">결과 선택 페이지로 이동 중...</p>
          </div>
        </div>
      )}

      {/* Profile card */}
      <div
        className={`flex-1 px-4 pb-4 flex flex-col gap-3 transition-all duration-500 ${
          cardVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        {/* Main profile */}
        <Card className="overflow-hidden" padding="none">
          {/* Gradient header */}
          <div className={`bg-gradient-to-br ${current.avatar} p-6 flex items-center gap-4`}>
            <ProfileAvatar gradient={current.avatar} size="lg" name={current.name} />
            <div className="text-white">
              <h2 className="text-2xl font-bold">{current.name}</h2>
              <p className="opacity-90 text-sm font-medium">{current.age}세</p>
              <span className="inline-block mt-1.5 bg-white/25 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full">
                {current.mbti}
              </span>
            </div>
          </div>

          {/* Info rows */}
          <div className="p-5 flex flex-col gap-3">
            <InfoRow icon={<Briefcase size={15} className="text-pink-400" />} label="직업" value={current.job} />
            <InfoRow
              icon={<Music2 size={15} className="text-pink-400" />}
              label="취미"
              value={current.hobbies.join(", ")}
            />
            <InfoRow icon={<Coffee size={15} className="text-pink-400" />} label="오늘 음료" value={current.drink} />
            <InfoRow icon={<Tag size={15} className="text-pink-400" />} label="키워드" value={`"${current.keyword}"`} />
          </div>
        </Card>

        {/* Rating card */}
        <Card>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
            호감도 평가
          </p>
          <HeartRating
            value={currentRating.hearts}
            onChange={(v) => updateRating("hearts", v)}
          />
          <p className="text-xs text-gray-400 mt-1.5 mb-3">
            {currentRating.hearts > 0
              ? ratingLabel(currentRating.hearts)
              : "하트를 눌러 평가해주세요"}
          </p>

          <textarea
            value={currentRating.memo}
            onChange={(e) => updateRating("memo", e.target.value)}
            placeholder="메모 남기기 (나만 볼 수 있어요)"
            maxLength={60}
            rows={2}
            className="w-full bg-gray-50 rounded-2xl px-4 py-3 text-sm text-gray-700 placeholder-gray-300 resize-none focus:outline-none focus:ring-2 focus:ring-pink-200"
          />
        </Card>

        {/* Next button */}
        {currentIndex < MOCK_PROFILES.length - 1 ? (
          <Button variant="secondary" fullWidth onClick={goNext}>
            다음 사람 <ArrowRight size={18} />
          </Button>
        ) : (
          <Button fullWidth onClick={() => setDone(true)}>
            평가 완료하기 <ArrowRight size={18} />
          </Button>
        )}
      </div>
    </main>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-7 h-7 bg-pink-50 rounded-xl flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <span className="text-xs text-gray-400 w-10 flex-shrink-0">{label}</span>
      <span className="text-sm font-semibold text-gray-800">{value}</span>
    </div>
  );
}

function ratingLabel(n: number) {
  return ["", "별로예요", "그럭저럭", "괜찮아요!", "좋아요!", "완전 좋아요! ❤️"][n] ?? "";
}
