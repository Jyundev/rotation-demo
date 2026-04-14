export interface Profile {
  id: number;
  name: string;
  age: number;
  mbti: string;
  hobbies: string[];
  job: string;
  keyword: string;
  avatar: string; // gradient class string
  drink: string;
}

export const MOCK_PROFILES: Profile[] = [
  {
    id: 1,
    name: "여자 1호",
    age: 26,
    mbti: "ENFP",
    hobbies: ["여행", "사진"],
    job: "그래픽 디자이너",
    keyword: "자유로운 영혼",
    avatar: "from-pink-400 to-rose-300",
    drink: "아이스 아메리카노",
  },
  {
    id: 2,
    name: "여자 2호",
    age: 28,
    mbti: "ISTJ",
    hobbies: ["독서", "요리"],
    job: "공무원",
    keyword: "믿음직한 사람",
    avatar: "from-violet-400 to-purple-300",
    drink: "카페라떼",
  },
  {
    id: 3,
    name: "여자 3호",
    age: 25,
    mbti: "INFJ",
    hobbies: ["영화", "드로잉"],
    job: "UX 디자이너",
    keyword: "감성 충만",
    avatar: "from-sky-400 to-cyan-300",
    drink: "녹차 라떼",
  },
  {
    id: 4,
    name: "여자 4호",
    age: 27,
    mbti: "ENTP",
    hobbies: ["게임", "등산"],
    job: "스타트업 PM",
    keyword: "도전을 즐기는",
    avatar: "from-amber-400 to-orange-300",
    drink: "콜드브루",
  },
  {
    id: 5,
    name: "여자 5호",
    age: 24,
    mbti: "ESFJ",
    hobbies: ["헬스", "댄스"],
    job: "간호사",
    keyword: "따뜻한 에너지",
    avatar: "from-emerald-400 to-teal-300",
    drink: "허브티",
  },
];

export const MBTI_LIST = [
  "INTJ","INTP","ENTJ","ENTP",
  "INFJ","INFP","ENFJ","ENFP",
  "ISTJ","ISFJ","ESTJ","ESFJ",
  "ISTP","ISFP","ESTP","ESFP",
];

export const HOBBY_LIST = [
  "여행", "독서", "영화", "음악",
  "요리", "운동", "게임", "사진",
  "드로잉", "등산", "댄스", "카페투어",
  "반려동물", "유튜브", "쇼핑", "전시회",
];

export const DRINK_LIST = [
  "아이스 아메리카노",
  "카페라떼",
  "녹차 라떼",
  "콜드브루",
  "허브티",
  "오렌지 주스",
];
