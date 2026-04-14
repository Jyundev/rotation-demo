"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Trophy, Medal, Heart, ChevronRight, Star } from "lucide-react";
import Button from "@/components/Button";
import Card from "@/components/Card";
import ProfileAvatar from "@/components/ProfileAvatar";
import { MOCK_PROFILES } from "@/lib/mockData";
import { getRatings, savePicks, type Rating } from "@/lib/store";

export default function ResultSelectPage() {
  const router = useRouter();
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [first, setFirst] = useState<number | null>(null);
  const [second, setSecond] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const r = getRatings();
    setRatings(r);
  }, []);

  // 하트 순으로 정렬된 프로필 목록
  const sorted = [...MOCK_PROFILES].sort((a, b) => {
    const ra = ratings.find((r) => r.profileId === a.id)?.hearts ?? 0;
    const rb = ratings.find((r) => r.profileId === b.id)?.hearts ?? 0;
    return rb - ra;
  });

  function selectPick(id: number) {
    if (first === null) {
      setFirst(id);
    } else if (second === null && id !== first) {
      setSecond(id);
    } else if (id === first) {
      setFirst(second);
      setSecond(null);
    } else if (id === second) {
      setSecond(null);
    }
  }

  function getPickLabel(id: number) {
    if (id === first) return "1지망";
    if (id === second) return "2지망";
    return null;
  }

  function handleSubmit() {
    if (first === null) return;
    savePicks(first, second ?? -1);
    setSubmitted(true);
    setTimeout(() => router.push("/final"), 1500);
  }

  if (submitted) {
    return (
      <div className="min-h-dvh flex items-center justify-center bg-gradient-to-b from-pink-50 to-white">
        <div className="text-center animate-scaleIn">
          <div className="text-5xl mb-4">💌</div>
          <p className="text-xl font-bold text-gray-900">선택지를 보냈어요!</p>
          <p className="text-gray-400 text-sm mt-1">결과 확인 중...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-dvh bg-gradient-to-b from-pink-50 to-white flex flex-col">
      <header className="px-5 pt-12 pb-2">
        <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-600 px-3 py-1.5 rounded-full text-xs font-semibold mb-3">
          <Star size={12} />
          최종 선택
        </div>
        <h1 className="text-2xl font-bold text-gray-900 leading-snug">
          마음에 드는 사람을<br />골라주세요
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          1지망 → 2지망 순서로 터치하세요 (2지망은 선택사항)
        </p>
      </header>

      <div className="flex-1 px-4 py-4 flex flex-col gap-3 overflow-y-auto">
        {sorted.map((profile) => {
          const rating = ratings.find((r) => r.profileId === profile.id);
          const pickLabel = getPickLabel(profile.id);
          const isSelected = pickLabel !== null;

          return (
            <button
              key={profile.id}
              onClick={() => selectPick(profile.id)}
              className={`w-full text-left transition-all duration-200 active:scale-[0.98] rounded-3xl ${
                isSelected ? "ring-2 ring-offset-1 ring-pink-400" : ""
              }`}
            >
              <Card
                padding="none"
                className={`overflow-hidden ${
                  isSelected ? "bg-gradient-to-r from-pink-50 to-rose-50" : ""
                }`}
              >
                <div className="flex items-center gap-4 p-4">
                  {/* Pick badge */}
                  <div className="relative flex-shrink-0">
                    <ProfileAvatar
                      gradient={profile.avatar}
                      size="md"
                      name={profile.name}
                    />
                    {isSelected && (
                      <div
                        className={`absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white shadow-sm ${
                          pickLabel === "1지망" ? "bg-pink-500" : "bg-violet-500"
                        }`}
                      >
                        {pickLabel === "1지망" ? "1" : "2"}
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-bold text-gray-900">{profile.name}</span>
                      <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full font-medium">
                        {profile.mbti}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 truncate">
                      {profile.hobbies.join(" · ")}
                    </p>

                    {/* Hearts given */}
                    <div className="flex items-center gap-0.5 mt-1.5">
                      {Array.from({ length: 5 }, (_, i) => (
                        <Heart
                          key={i}
                          size={12}
                          className={
                            i < (rating?.hearts ?? 0)
                              ? "fill-pink-400 text-pink-400"
                              : "text-gray-200"
                          }
                        />
                      ))}
                      {rating?.memo && (
                        <span className="ml-1.5 text-[10px] text-gray-400 truncate">
                          "{rating.memo}"
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Pick label */}
                  {pickLabel ? (
                    <div
                      className={`flex-shrink-0 px-3 py-1.5 rounded-2xl text-xs font-bold text-white ${
                        pickLabel === "1지망"
                          ? "bg-gradient-to-br from-pink-500 to-rose-500"
                          : "bg-gradient-to-br from-violet-500 to-purple-500"
                      }`}
                    >
                      {pickLabel === "1지망" ? (
                        <><Trophy size={12} className="inline mr-1" />1지망</>
                      ) : (
                        <><Medal size={12} className="inline mr-1" />2지망</>
                      )}
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full border-2 border-dashed border-gray-200 flex items-center justify-center flex-shrink-0">
                      <span className="text-gray-300 text-xs">+</span>
                    </div>
                  )}
                </div>
              </Card>
            </button>
          );
        })}
      </div>

      {/* Bottom action */}
      <div className="p-4 bg-white/80 backdrop-blur-sm border-t border-gray-100">
        <div className="flex items-center gap-3 mb-3">
          <div className={`flex-1 h-10 rounded-2xl flex items-center justify-center text-sm font-bold border-2 transition-all ${
            first !== null ? "bg-pink-50 border-pink-300 text-pink-600" : "border-dashed border-gray-200 text-gray-300"
          }`}>
            {first !== null
              ? `1지망: ${MOCK_PROFILES.find((p) => p.id === first)?.name}`
              : "1지망 선택"}
          </div>
          <div className={`flex-1 h-10 rounded-2xl flex items-center justify-center text-sm font-bold border-2 transition-all ${
            second !== null ? "bg-violet-50 border-violet-300 text-violet-600" : "border-dashed border-gray-200 text-gray-300"
          }`}>
            {second !== null
              ? `2지망: ${MOCK_PROFILES.find((p) => p.id === second)?.name}`
              : "2지망 (선택)"}
          </div>
        </div>
        <Button
          fullWidth
          size="lg"
          onClick={handleSubmit}
          disabled={first === null}
        >
          선택지 제출하기 <ChevronRight size={20} />
        </Button>
      </div>
    </main>
  );
}
