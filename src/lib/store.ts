// 간단한 in-memory 전역 상태 (sessionStorage 기반)
// 서버 컴포넌트 없이 페이지 간 데이터 공유

export interface UserProfile {
  mbti: string;
  hobbies: string[];
  idealType: string;
  drink: string;
}

export interface Rating {
  profileId: number;
  hearts: number;
  memo: string;
}

const STORAGE_KEYS = {
  USER: "rotation_user",
  RATINGS: "rotation_ratings",
  PICKS: "rotation_picks",
} as const;

function isBrowser() {
  return typeof window !== "undefined";
}

export function saveUser(data: UserProfile) {
  if (!isBrowser()) return;
  sessionStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(data));
}

export function getUser(): UserProfile | null {
  if (!isBrowser()) return null;
  const raw = sessionStorage.getItem(STORAGE_KEYS.USER);
  return raw ? JSON.parse(raw) : null;
}

export function saveRatings(data: Rating[]) {
  if (!isBrowser()) return;
  sessionStorage.setItem(STORAGE_KEYS.RATINGS, JSON.stringify(data));
}

export function getRatings(): Rating[] {
  if (!isBrowser()) return [];
  const raw = sessionStorage.getItem(STORAGE_KEYS.RATINGS);
  return raw ? JSON.parse(raw) : [];
}

export function savePicks(first: number, second: number) {
  if (!isBrowser()) return;
  sessionStorage.setItem(STORAGE_KEYS.PICKS, JSON.stringify({ first, second }));
}

export function getPicks(): { first: number; second: number } | null {
  if (!isBrowser()) return null;
  const raw = sessionStorage.getItem(STORAGE_KEYS.PICKS);
  return raw ? JSON.parse(raw) : null;
}
