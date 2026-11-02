/**
 * 年龄与日历差值纯逻辑。全部复用 workdays.ts 的 UTC 整数天数原语
 * (isoToDay / dayToIso),与本地时区/DST 完全解耦;日期一律 ISO "YYYY-MM-DD",
 * 无法解析(含 2026-02-30 这类假日期)→ null。
 *
 * 语义约定:
 * - 年/月/日差采用"锚点法":先数整月(目标日不足 anchor 日则回退一个月),
 *   再用锚点日期(出生日向整月推进、日数向月末收敛)补足余下天数。
 *   月末生日天然正确:1 月 31 日 + 1 个月 = 2 月 28/29 日。
 * - 2 月 29 日出生:平年生日按 3 月 1 日观察(与多数司法辖区/年龄计算惯例一致)。
 * - ageBreakdown 要求 onIso >= birthIso,早于出生日 → null(引擎负责提示)。
 */

import { isoToDay } from "./workdays";

const MS_PER_DAY = 86400000;

/** 公历闰年:四年一闰,百年不闰,四百年再闰(1900 平、2000 闰、2100 平)。 */
export function isLeapYear(y: number): boolean {
  return (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
}

/** 某年某月的天数(m 为 1-based;非法月份返回 0)。 */
export function daysInMonth(y: number, m: number): number {
  if (m < 1 || m > 12) return 0;
  return new Date(Date.UTC(y, m, 0)).getUTCDate();
}

type Ymd = { y: number; m: number; d: number };

/** UTC 整数天数 → 年月日分量 */
function ymdOf(day: number): Ymd {
  const dt = new Date(day * MS_PER_DAY);
  return { y: dt.getUTCFullYear(), m: dt.getUTCMonth() + 1, d: dt.getUTCDate() };
}

/**
 * 锚点法日历差:a、b 为自 epoch 的天数且 a <= b。
 * totalMonths = 整月数;anchor = a 推进 totalMonths 个月(日数收敛到月末);
 * days = b - anchor。这样月末边界永不越界:2026-01-31 → 2026-03-01 = 1 个月 1 天。
 */
function anchoredDiff(a: number, b: number): { years: number; months: number; days: number; totalMonths: number } {
  const A = ymdOf(a);
  const B = ymdOf(b);
  let totalMonths = (B.y - A.y) * 12 + (B.m - A.m);
  if (B.d < A.d) totalMonths -= 1;
  if (totalMonths < 0) totalMonths = 0;
  const ay = A.y + Math.floor((A.m - 1 + totalMonths) / 12);
  const am = ((A.m - 1 + totalMonths) % 12) + 1;
  const ad = Math.min(A.d, daysInMonth(ay, am));
  const anchor = Date.UTC(ay, am - 1, ad) / MS_PER_DAY;
  return { years: Math.floor(totalMonths / 12), months: totalMonths % 12, days: b - anchor, totalMonths };
}

export type CalendarSpan = {
  years: number;
  months: number;
  days: number;
  /** 完整月数(= years × 12 + months) */
  totalMonths: number;
  /** 总天数(b − a,不含末端) */
  totalDays: number;
  /** 完整周数 */
  totalWeeks: number;
  /** 凑满整周后剩下的天数 */
  remainderDays: number;
};

/**
 * 两个日期之间的日历跨度:年/月/日、总月数、总天数、周数。
 * 方向对称(先后随意,结果一致);任一日期无法解析 → null。
 */
export function dateSpan(fromIso: string, toIso: string): CalendarSpan | null {
  const a = isoToDay(fromIso);
  const b = isoToDay(toIso);
  if (a === null || b === null) return null;
  const [lo, hi] = a <= b ? [a, b] : [b, a];
  const diff = anchoredDiff(lo, hi);
  return {
    years: diff.years,
    months: diff.months,
    days: diff.days,
    totalMonths: diff.totalMonths,
    totalDays: hi - lo,
    totalWeeks: Math.floor((hi - lo) / 7),
    remainderDays: (hi - lo) % 7,
  };
}

export type NextBirthday = {
  /** 下一个生日的 ISO 日期(可能就是 onIso 当天) */
  iso: string;
  /** 距下次生日的天数;0 = 就是 onIso 当天 */
  daysAway: number;
  /** 该次生日满几岁 */
  turning: number;
  /** 2 月 29 日生日在平年落到了 3 月 1 日 */
  observedMar1: boolean;
};

export type AgeBreakdown = {
  /** 日历精确年龄:X 岁 Y 个月 Z 天 */
  years: number;
  months: number;
  days: number;
  /** 完整月数 */
  totalMonths: number;
  /** 出生到 on 当天的总天数(含两端,与"活了多少天"一致) */
  totalDays: number;
  totalWeeks: number;
  remainderDays: number;
  /** 出生那天的星期(0 = 周日,UTC) */
  birthWeekday: number;
  nextBirthday: NextBirthday;
};

/** 某一年的生日落点:2 月 29 日出生者,平年观察为 3 月 1 日;其余收敛到月末。 */
function birthdayInYear(birth: Ymd, year: number): { day: number; observedMar1: boolean } {
  if (birth.m === 2 && birth.d === 29 && !isLeapYear(year)) {
    return { day: Date.UTC(year, 2, 1) / MS_PER_DAY, observedMar1: true };
  }
  const d = Math.min(birth.d, daysInMonth(year, birth.m));
  return { day: Date.UTC(year, birth.m - 1, d) / MS_PER_DAY, observedMar1: false };
}

/**
 * 精确年龄拆解:出生日 birthIso 到 onIso 的岁/月/天、累计天数与下次生日倒计时。
 * onIso 早于 birthIso 或任一日期非法 → null。
 */
export function ageBreakdown(birthIso: string, onIso: string): AgeBreakdown | null {
  const birthDay = isoToDay(birthIso);
  const onDay = isoToDay(onIso);
  if (birthDay === null || onDay === null || onDay < birthDay) return null;

  const birth = ymdOf(birthDay);
  const diff = anchoredDiff(birthDay, onDay);
  const totalDays = onDay - birthDay;

  // 下一个生日:先看 on 所在年份,已过(<= on)则取下一年
  const onYear = ymdOf(onDay).y;
  const thisYear = birthdayInYear(birth, onYear);
  let nextDay = thisYear.day;
  let nextYear = onYear;
  let observedMar1 = thisYear.observedMar1;
  if (nextDay <= onDay) {
    nextYear = onYear + 1;
    const nb = birthdayInYear(birth, nextYear);
    nextDay = nb.day;
    observedMar1 = nb.observedMar1;
  }

  return {
    years: diff.years,
    months: diff.months,
    days: diff.days,
    totalMonths: diff.totalMonths,
    totalDays,
    totalWeeks: Math.floor(totalDays / 7),
    remainderDays: totalDays % 7,
    birthWeekday: new Date(birthDay * MS_PER_DAY).getUTCDay(),
    nextBirthday: {
      iso: new Date(nextDay * MS_PER_DAY).toISOString().slice(0, 10),
      daysAway: nextDay - onDay,
      turning: nextYear - birth.y,
      observedMar1,
    },
  };
}
