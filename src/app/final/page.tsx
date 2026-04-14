"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Heart, RefreshCw, Home, Send, Sparkles, Mail, PartyPopper, HeartCrack, CheckCircle2 } from "lucide-react";
import Button from "@/components/Button";
import Card from "@/components/Card";
import ProfileAvatar from "@/components/ProfileAvatar";
import { MOCK_PROFILES } from "@/lib/mockData";
import { getPicks } from "@/lib/store";

type MatchState = "loading" | "success" | "fail" | "lastchance";

export default function FinalPage() {
  const router = useRouter();
  const [state, setState] = useState<MatchState>("loading");
  const [matchedId, setMatchedId] = useState<number | null>(null);
  const [lastChanceSent, setLastChanceSent] = useState(false);

  useEffect(() => {
    // 로딩 연출
    const timer = setTimeout(() => {
      const picks = getPicks();
      // 랜덤으로 매칭 결정 (데모라 50% 확률)
      const isMatch = Math.random() > 0.5;

      if (isMatch && picks) {
        setMatchedId(picks.first);
        setState("success");
      } else {
        setState("fail");
      }
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  const matched = MOCK_PROFILES.find((p) => p.id === matchedId);

  if (state === "loading") {
    return (
      <div className="min-h-dvh flex flex-col items-center justify-center bg-gradient-to-b from-pink-50 to-white px-6">
        <div className="animate-pulse2 w-20 h-20 rounded-3xl bg-gradient-to-br from-pink-400 to-rose-400 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-pink-200">
          <Mail size={36} className="text-white" />
        </div>
        <p className="text-xl font-bold text-gray-900 mb-2">매칭 결과 확인 중...</p>
        <p className="text-gray-400 text-sm text-center">
          상대방도 당신을 선택했는지<br />확인하고 있어요
        </p>
        <div className="mt-8 flex gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 bg-pink-400 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (state === "success" && matched) {
    return (
      <main className="min-h-dvh flex flex-col items-center bg-gradient-to-b from-pink-50 via-white to-purple-50 px-5 pt-16 pb-10">
        {/* Confetti-like decoration */}
        <div className="animate-scaleIn w-20 h-20 rounded-3xl bg-gradient-to-br from-pink-500 to-rose-400 flex items-center justify-center mx-auto mb-4 shadow-xl shadow-pink-200">
          <PartyPopper size={36} className="text-white" />
        </div>

        <div className="animate-fadeIn text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
            매칭 성공!
          </h1>
          <p className="text-gray-500 text-sm flex items-center justify-center gap-1">
            서로 마음이 통했어요 <Sparkles size={14} className="text-pink-400" />
          </p>
        </div>

        {/* Match card */}
        <div className="animate-slideUp w-full max-w-sm">
          <Card className="overflow-hidden" padding="none">
            {/* Gradient header */}
            <div className={`bg-gradient-to-br ${matched.avatar} p-8 flex flex-col items-center gap-3`}>
              <ProfileAvatar gradient={matched.avatar} size="xl" name={matched.name} />
              <div className="text-center text-white">
                <h2 className="text-2xl font-bold">{matched.name}</h2>
                <p className="opacity-90 text-sm">{matched.age}세 · {matched.job}</p>
              </div>
              {/* Match badge */}
              <div className="bg-white/25 backdrop-blur-sm text-white text-sm font-bold px-5 py-2 rounded-full flex items-center gap-2">
                <Heart size={14} className="fill-white" />
                {matched.mbti} · {matched.hobbies[0]}
              </div>
            </div>

            <div className="p-5 text-center">
              <p className="text-gray-700 font-semibold text-base leading-relaxed">
                <span className="text-pink-500 font-bold">{matched.name}</span>와(과) 연결되었습니다!
              </p>
              <p className="text-gray-400 text-sm mt-1">
                운영진이 카카오톡 오픈채팅으로<br />연락드릴 예정이에요
              </p>

              <div className="mt-4 bg-pink-50 rounded-2xl p-4 flex items-start gap-3 text-left">
                <Sparkles size={16} className="text-pink-400 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-pink-700 leading-relaxed">
                  <strong>"{matched.keyword}"</strong> 스타일의 분이에요.<br />
                  음료는 <strong>{matched.drink}</strong>을 즐기신다고 하네요!
                </p>
              </div>
            </div>
          </Card>
        </div>

        <div
          className="animate-slideUp mt-6 w-full max-w-sm flex flex-col gap-3"
          style={{ animationDelay: "0.3s" }}
        >
          <Button fullWidth size="lg" onClick={() => router.push("/")}>
            <Home size={18} /> 처음으로
          </Button>
          <Button variant="secondary" fullWidth onClick={() => router.push("/register")}>
            <RefreshCw size={16} /> 다시 체험하기
          </Button>
        </div>
      </main>
    );
  }

  // Fail state
  return (
    <main className="min-h-dvh flex flex-col items-center bg-gradient-to-b from-gray-50 to-white px-5 pt-16 pb-10">
      <div className="animate-scaleIn w-20 h-20 rounded-3xl bg-gradient-to-br from-gray-400 to-slate-400 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-gray-200">
        <HeartCrack size={36} className="text-white" />
      </div>

      <div className="animate-fadeIn text-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
          아쉽지만 매칭 실패
        </h1>
        <p className="text-gray-400 text-sm leading-relaxed">
          이번엔 타이밍이 맞지 않았어요.<br />
          하지만 아직 기회가 있어요!
        </p>
      </div>

      {/* Last chance card */}
      {!lastChanceSent ? (
        <div className="animate-slideUp w-full max-w-sm">
          <Card className="text-center">
            <div className="w-14 h-14 bg-rose-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Send size={24} className="text-rose-500" />
            </div>
            <h3 className="font-bold text-gray-900 text-lg mb-1">
              라스트 찬스 보내기
            </h3>
            <p className="text-gray-400 text-sm mb-5 leading-relaxed">
              마음에 드는 분에게 마지막으로<br />
              한 번 더 연락을 시도할 수 있어요
            </p>
            <Button
              variant="danger"
              fullWidth
              onClick={() => {
                if (typeof navigator !== "undefined" && navigator.vibrate) {
                  navigator.vibrate([50, 30, 50, 30, 100]);
                }
                setLastChanceSent(true);
              }}
            >
              <Heart size={18} className="fill-white" />
              라스트 찬스 보내기
            </Button>
          </Card>
        </div>
      ) : (
        <div className="animate-scaleIn w-full max-w-sm">
          <Card className="text-center">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-400 to-rose-400 flex items-center justify-center mx-auto mb-3 shadow-md shadow-pink-200">
            <CheckCircle2 size={28} className="text-white" />
          </div>
            <h3 className="font-bold text-gray-900 text-lg mb-1">전송 완료!</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              운영진이 상대방에게 전달할게요.<br />
              좋은 결과가 있길 바라요!
            </p>
          </Card>
        </div>
      )}

      <div
        className="animate-slideUp mt-6 w-full max-w-sm flex flex-col gap-3"
        style={{ animationDelay: "0.3s" }}
      >
        <Button variant="secondary" fullWidth onClick={() => router.push("/register")}>
          <RefreshCw size={16} /> 다시 체험하기
        </Button>
        <Button variant="ghost" fullWidth onClick={() => router.push("/")}>
          <Home size={16} /> 처음으로
        </Button>
      </div>
    </main>
  );
}
