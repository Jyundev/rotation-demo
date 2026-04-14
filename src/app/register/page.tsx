"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight, ChevronLeft, Check, Coffee, Smile, Leaf, Milk, GlassWater, Citrus } from "lucide-react";
import Button from "@/components/Button";
import Card from "@/components/Card";
import ProgressDots from "@/components/ProgressDots";
import { MBTI_LIST, HOBBY_LIST, DRINK_LIST } from "@/lib/mockData";
import { saveUser } from "@/lib/store";

const STEPS = ["MBTI", "취미", "이상형", "음료"];

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [mbti, setMbti] = useState("");
  const [hobbies, setHobbies] = useState<string[]>([]);
  const [idealType, setIdealType] = useState("");
  const [drink, setDrink] = useState("");

  function toggleHobby(h: string) {
    setHobbies((prev) =>
      prev.includes(h) ? prev.filter((x) => x !== h) : prev.length < 3 ? [...prev, h] : prev
    );
  }

  function canNext() {
    if (step === 0) return !!mbti;
    if (step === 1) return hobbies.length > 0;
    if (step === 2) return idealType.trim().length > 0;
    if (step === 3) return !!drink;
    return false;
  }

  function handleNext() {
    if (step < STEPS.length - 1) {
      setStep((s) => s + 1);
    } else {
      saveUser({ mbti, hobbies, idealType, drink });
      router.push("/rotation");
    }
  }

  return (
    <main className="min-h-dvh flex flex-col bg-gradient-to-b from-pink-50 to-white">
      {/* Header */}
      <header className="flex items-center px-5 pt-12 pb-4 gap-3">
        {step > 0 && (
          <button
            onClick={() => setStep((s) => s - 1)}
            className="w-10 h-10 flex items-center justify-center rounded-2xl bg-white shadow-sm border border-gray-100 active:scale-95"
          >
            <ChevronLeft size={20} className="text-gray-600" />
          </button>
        )}
        <div className="flex-1">
          <p className="text-xs text-gray-400 font-medium mb-1">
            {step + 1} / {STEPS.length}
          </p>
          <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-pink-400 to-rose-400 rounded-full transition-all duration-500"
              style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
            />
          </div>
        </div>
      </header>

      <div className="flex-1 px-5 pb-8 flex flex-col animate-fadeIn" key={step}>
        {/* Step 0: MBTI */}
        {step === 0 && (
          <>
            <div className="mb-6 mt-2">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">
                나의 MBTI는? <Smile className="inline text-pink-400" size={22} />
              </h2>
              <p className="text-gray-400 text-sm">상대방도 볼 수 있어요</p>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {MBTI_LIST.map((m) => (
                <button
                  key={m}
                  onClick={() => setMbti(m)}
                  className={`py-3 rounded-2xl text-sm font-bold transition-all duration-150 active:scale-95 ${
                    mbti === m
                      ? "bg-gradient-to-br from-pink-500 to-rose-500 text-white shadow-md shadow-pink-200"
                      : "bg-white text-gray-700 border border-gray-200 hover:border-pink-300"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </>
        )}

        {/* Step 1: 취미 */}
        {step === 1 && (
          <>
            <div className="mb-6 mt-2">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">
                취미를 골라봐요
              </h2>
              <p className="text-gray-400 text-sm">최대 3개 선택 ({hobbies.length}/3)</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {HOBBY_LIST.map((h) => (
                <button
                  key={h}
                  onClick={() => toggleHobby(h)}
                  className={`px-4 py-2.5 rounded-2xl text-sm font-semibold transition-all duration-150 active:scale-95 ${
                    hobbies.includes(h)
                      ? "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-sm shadow-pink-200"
                      : hobbies.length >= 3
                      ? "bg-white text-gray-300 border border-gray-100"
                      : "bg-white text-gray-700 border border-gray-200 hover:border-pink-300"
                  }`}
                >
                  {hobbies.includes(h) && <Check size={12} className="inline mr-1" />}
                  {h}
                </button>
              ))}
            </div>
          </>
        )}

        {/* Step 2: 이상형 */}
        {step === 2 && (
          <>
            <div className="mb-6 mt-2">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">
                이상형을 알려줘요
              </h2>
              <p className="text-gray-400 text-sm">자유롭게 적어주세요</p>
            </div>
            <Card padding="none" className="overflow-hidden">
              <textarea
                value={idealType}
                onChange={(e) => setIdealType(e.target.value)}
                placeholder="예) 유머있고 배려심 깊은 사람, 같이 여행 다닐 수 있는 사람..."
                maxLength={100}
                rows={5}
                className="w-full p-5 text-sm text-gray-800 placeholder-gray-300 resize-none focus:outline-none leading-relaxed"
              />
              <div className="px-5 pb-3 text-right text-xs text-gray-300">
                {idealType.length}/100
              </div>
            </Card>
          </>
        )}

        {/* Step 3: 음료 */}
        {step === 3 && (
          <>
            <div className="mb-6 mt-2">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">
                오늘의 음료는? <Coffee className="inline text-amber-400" size={22} />
              </h2>
              <p className="text-gray-400 text-sm">소개팅 테이블에 놓을 음료예요</p>
            </div>
            <div className="flex flex-col gap-3">
              {DRINK_LIST.map((d) => (
                <button
                  key={d}
                  onClick={() => setDrink(d)}
                  className={`flex items-center gap-4 p-4 rounded-2xl text-sm font-semibold transition-all duration-150 active:scale-[0.98] text-left ${
                    drink === d
                      ? "bg-gradient-to-r from-pink-50 to-rose-50 border-2 border-pink-400 text-pink-700"
                      : "bg-white border border-gray-200 text-gray-700"
                  }`}
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${drink === d ? "bg-pink-100" : "bg-gray-100"}`}>
                    <DrinkIcon name={d} size={18} className={drink === d ? "text-pink-500" : "text-gray-500"} />
                  </div>
                  <span>{d}</span>
                  {drink === d && (
                    <Check size={16} className="ml-auto text-pink-500" />
                  )}
                </button>
              ))}
            </div>
          </>
        )}

        <div className="mt-auto pt-8">
          <Button
            size="lg"
            fullWidth
            onClick={handleNext}
            disabled={!canNext()}
          >
            {step === STEPS.length - 1 ? (
              <>자리로 이동하기 <ChevronRight size={20} /></>
            ) : (
              <>다음 <ChevronRight size={20} /></>
            )}
          </Button>
        </div>
      </div>
    </main>
  );
}

function DrinkIcon({ name, size, className }: { name: string; size: number; className?: string }) {
  const map: Record<string, React.ReactNode> = {
    "아이스 아메리카노": <Coffee size={size} className={className} />,
    "카페라떼": <Milk size={size} className={className} />,
    "녹차 라떼": <Leaf size={size} className={className} />,
    "콜드브루": <Coffee size={size} className={className} />,
    "허브티": <Leaf size={size} className={className} />,
    "오렌지 주스": <Citrus size={size} className={className} />,
  };
  return <>{map[name] ?? <GlassWater size={size} className={className} />}</>;
}
