"use client";

import Link from "next/link";
import { Heart, Clock, Users, Sparkles } from "lucide-react";
import Button from "@/components/Button";

const features = [
  { icon: Clock, label: "10분 로테이션", desc: "짧고 집중된 만남" },
  { icon: Users, label: "5명과 대화", desc: "다양한 인연 탐색" },
  { icon: Heart, label: "상호 매칭", desc: "서로 선택해야 연결" },
];

export default function LandingPage() {
  return (
    <main className="min-h-dvh flex flex-col bg-gradient-to-b from-pink-50 via-white to-purple-50">
      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center px-6 pt-16 pb-8 text-center">
        {/* Logo badge */}
        <div className="animate-scaleIn mb-6">
          <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-600 px-4 py-2 rounded-full text-sm font-semibold">
            <Sparkles size={14} />
            체험용 프로토타입
          </div>
        </div>

        {/* Main heading */}
        <div className="animate-fadeIn mb-4" style={{ animationDelay: "0.1s", opacity: 0 }}>
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-pink-500 to-rose-400 shadow-xl shadow-pink-200 flex items-center justify-center mx-auto mb-6">
            <Heart size={36} className="text-white fill-white" />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 leading-tight tracking-tight">
            단 10분,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-500">
              당신의 이상형
            </span>을<br />
            찾는 방법
          </h1>
        </div>

        <p
          className="animate-fadeIn text-gray-500 text-base leading-relaxed mb-10 max-w-xs"
          style={{ animationDelay: "0.25s", opacity: 0 }}
        >
          로테이션 소개팅에서 5명을 만나고<br />
          마음에 드는 사람을 선택하세요
        </p>

        {/* Feature cards */}
        <div
          className="animate-slideUp w-full grid grid-cols-3 gap-3 mb-10 max-w-sm"
          style={{ animationDelay: "0.4s", opacity: 0 }}
        >
          {features.map(({ icon: Icon, label, desc }) => (
            <div
              key={label}
              className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100 flex flex-col items-center gap-1.5"
            >
              <div className="w-9 h-9 bg-pink-50 rounded-xl flex items-center justify-center">
                <Icon size={18} className="text-pink-500" />
              </div>
              <span className="text-xs font-bold text-gray-800">{label}</span>
              <span className="text-[10px] text-gray-400 text-center">{desc}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div
          className="animate-slideUp w-full max-w-sm"
          style={{ animationDelay: "0.55s", opacity: 0 }}
        >
          <Link href="/register" className="block">
            <Button size="lg" fullWidth className="rounded-2xl shadow-xl shadow-pink-200">
              <Heart size={20} className="fill-white" />
              시작하기
            </Button>
          </Link>
          <p className="text-xs text-gray-400 mt-3">
            체험용입니다 · 실제 데이터 수집 없음
          </p>
        </div>
      </section>

      {/* Bottom wave decoration */}
      <div className="w-full overflow-hidden leading-none">
        <svg viewBox="0 0 430 40" className="w-full fill-pink-100/60">
          <path d="M0,20 C100,40 330,0 430,20 L430,40 L0,40 Z" />
        </svg>
      </div>
    </main>
  );
}
