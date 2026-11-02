import { describe, expect, it } from "vitest";
import { ageBreakdown, dateSpan, daysInMonth, isLeapYear } from "@/tools/_lib/age";

/**
 * 手算基准(全部用整数天数/日历月逐段核对,不用 Date 近似):
 * - 1990-06-15 → 2026-11-01:1990-06-15 加 36 年落 2026-06-15,再加 4 个月
 *   落 2026-10-15,距 11-01 还有 17 天 → 36y 4m 17d;
 *   总天数 = 36×365 + 9 个闰日(1992…2024)+ 139(6-15→11-01)= 13288;
 *   下个生日 2027-06-15,倒计时 226 天,届时满 37 岁。
 * - 2000-02-29 出生:2026-02-28 → 25y 11m 30d;2026-03-01 → 满 26y(平年按 3-1 观察);
 *   2024-02-29 → 恰好 24y 0m 0d,总天数 8766(8760 + 6 个闰日)。
 * - 月末边界:2026-01-31 → 2026-03-01 = 1m 1d(1-31 + 1 个月 = 2-28);
 *   2026-02-28 → 2026-03-31 = 1m 3d(2-28 + 1 个月 = 3-28)。
 * - 2026-11-02(周一)→ 2026-11-06(周五)= 5 个工作日(回归确认 workdays 语义)。
 */
describe("isLeapYear and daysInMonth: Gregorian rules", () => {
  it("marks 2000 and 2024 leap, 1900 and 2100 common (century rule)", () => {
    expect(isLeapYear(2000)).toBe(true);
    expect(isLeapYear(2024)).toBe(true);
    expect(isLeapYear(1900)).toBe(false);
    expect(isLeapYear(2100)).toBe(false);
    expect(isLeapYear(2026)).toBe(false);
  });

  it("gives real month lengths, 28/29 for February", () => {
    expect(daysInMonth(2026, 2)).toBe(28);
    expect(daysInMonth(2024, 2)).toBe(29);
    expect(daysInMonth(2000, 2)).toBe(29);
    expect(daysInMonth(1900, 2)).toBe(28);
    expect(daysInMonth(2026, 1)).toBe(31);
    expect(daysInMonth(2026, 4)).toBe(30);
    expect(daysInMonth(2026, 13)).toBe(0); // invalid month → 0, never throws
  });
});

describe("dateSpan: hand-computed calendar distances", () => {
  it("counts 36y 4m 17d and 13288 days from 1990-06-15 to 2026-11-01", () => {
    const s = dateSpan("1990-06-15", "2026-11-01")!;
    expect(s.years).toBe(36);
    expect(s.months).toBe(4);
    expect(s.days).toBe(17);
    expect(s.totalMonths).toBe(436);
    expect(s.totalDays).toBe(13288);
    expect(s.totalWeeks).toBe(Math.floor(13288 / 7)); // 1898
    expect(s.remainderDays).toBe(13288 % 7); // 2
  });

  it("clamps month ends: Jan 31 + 1 month = Feb 28/29", () => {
    expect(dateSpan("2026-01-31", "2026-03-01")).toMatchObject({ years: 0, months: 1, days: 1, totalDays: 29 });
    expect(dateSpan("2024-01-31", "2024-03-01")).toMatchObject({ years: 0, months: 1, days: 1, totalDays: 30 }); // leap Feb
    expect(dateSpan("2026-01-31", "2026-02-28")).toMatchObject({ years: 0, months: 0, days: 28 });
  });

  it("a month from Feb 28 lands on Mar 28, so Feb 28 → Mar 31 is 1m 3d", () => {
    expect(dateSpan("2026-02-28", "2026-03-31")).toMatchObject({ years: 0, months: 1, days: 3, totalDays: 31 });
  });

  it("is symmetric: argument order never changes the span", () => {
    const a = dateSpan("2026-11-01", "2019-04-23");
    const b = dateSpan("2019-04-23", "2026-11-01");
    expect(a).toEqual(b);
  });

  it("a whole leap year is 366 days, a whole common year 365", () => {
    expect(dateSpan("2024-01-01", "2025-01-01")!.totalDays).toBe(366);
    expect(dateSpan("2026-01-01", "2027-01-01")!.totalDays).toBe(365);
    expect(dateSpan("2000-01-01", "2000-12-31")).toMatchObject({ years: 0, months: 11, days: 30, totalDays: 365 });
  });

  it("counts leap days inside the range as real days", () => {
    // 2024-02-27 → 2024-03-01:Feb 28 + Feb 29 = 3 天
    expect(dateSpan("2024-02-27", "2024-03-01")!.totalDays).toBe(3);
    expect(dateSpan("2023-02-27", "2023-03-01")!.totalDays).toBe(2); // 非闰年对照
  });

  it("same date is a zero span", () => {
    const s = dateSpan("2026-11-01", "2026-11-01")!;
    expect(s).toMatchObject({ years: 0, months: 0, days: 0, totalDays: 0, totalWeeks: 0, remainderDays: 0 });
  });

  it("returns null for invalid dates", () => {
    expect(dateSpan("2026-02-30", "2026-03-01")).toBeNull();
    expect(dateSpan("garbage", "2026-03-01")).toBeNull();
    expect(dateSpan("2026-03-01", "")).toBeNull();
  });
});

describe("ageBreakdown: the headline vector", () => {
  const age = ageBreakdown("1990-06-15", "2026-11-01")!;

  it("reports 36y 4m 17d on 2026-11-01", () => {
    expect(age.years).toBe(36);
    expect(age.months).toBe(4);
    expect(age.days).toBe(17);
  });

  it("totals 13288 days lived in 436 full months", () => {
    expect(age.totalDays).toBe(13288);
    expect(age.totalMonths).toBe(436);
    expect(age.totalWeeks).toBe(1898);
    expect(age.remainderDays).toBe(2);
  });

  it("counts down 226 days to the 37th birthday on 2027-06-15", () => {
    expect(age.nextBirthday.iso).toBe("2027-06-15");
    expect(age.nextBirthday.daysAway).toBe(226);
    expect(age.nextBirthday.turning).toBe(37);
    expect(age.nextBirthday.observedMar1).toBe(false);
  });

  it("15 June 1990 was a Friday (UTC weekday 5)", () => {
    expect(age.birthWeekday).toBe(5);
  });
});

describe("ageBreakdown: 29 February birthdays across leap-year boundaries", () => {
  it("is exactly 24y 0m 0d on the leap-day birthday itself (8766 days = 6 leap days)", () => {
    const age = ageBreakdown("2000-02-29", "2024-02-29")!;
    expect(age).toMatchObject({ years: 24, months: 0, days: 0, totalMonths: 288 });
    expect(age.totalDays).toBe(8766);
  });

  it("the day before the birthday is 23y 11m 30d", () => {
    expect(ageBreakdown("2000-02-29", "2024-02-28")).toMatchObject({ years: 23, months: 11, days: 30 });
  });

  it("observes the birthday on 1 March in a common year (26 on 2026-03-01)", () => {
    expect(ageBreakdown("2000-02-29", "2026-02-28")).toMatchObject({ years: 25, months: 11, days: 30 });
    const on = ageBreakdown("2000-02-29", "2026-03-01")!;
    expect(on.years).toBe(26);
    expect(on.nextBirthday.observedMar1).toBe(true);
    expect(on.nextBirthday.iso).toBe("2027-03-01"); // 2027 也是平年
    expect(on.nextBirthday.turning).toBe(27);
  });

  it("keeps the birthday on 29 February in a leap year, one day out", () => {
    const age = ageBreakdown("2000-02-29", "2024-02-28")!;
    expect(age.nextBirthday.iso).toBe("2024-02-29");
    expect(age.nextBirthday.daysAway).toBe(1);
    expect(age.nextBirthday.turning).toBe(24);
  });

  it("after the Mar-1 birthday passes, the next one is the following year", () => {
    const age = ageBreakdown("2000-02-29", "2024-03-01")!;
    expect(age.nextBirthday.iso).toBe("2025-03-01"); // 2025 平年 → 3-1
    expect(age.nextBirthday.daysAway).toBe(365);
    expect(age.nextBirthday.turning).toBe(25);
  });
});

describe("ageBreakdown: birthday countdown edges", () => {
  it("reports 0 days away on the birthday itself and the age just reached", () => {
    const age = ageBreakdown("1990-06-15", "2026-06-15")!;
    expect(age).toMatchObject({ years: 36, months: 0, days: 0 });
    expect(age.nextBirthday.iso).toBe("2027-06-15");
    expect(age.nextBirthday.daysAway).toBe(365);
    expect(age.nextBirthday.turning).toBe(37);
  });

  it("points at this year's birthday when it is still ahead", () => {
    const age = ageBreakdown("1990-06-15", "2026-01-20")!;
    expect(age.nextBirthday.iso).toBe("2026-06-15");
    expect(age.nextBirthday.daysAway).toBe(146); // Jan 20 → Jun 15:11+28+31+30+31+15
    expect(age.nextBirthday.turning).toBe(36);
  });

  it("survives a century span including the non-leap 2100", () => {
    const age = ageBreakdown("2000-02-29", "2100-02-28")!;
    expect(age).toMatchObject({ years: 99, months: 11, days: 30 });
    expect(age.nextBirthday.iso).toBe("2100-03-01");
  });
});

describe("ageBreakdown: documented refusals, never throws", () => {
  it("returns null when the age-on date precedes the birth date", () => {
    expect(ageBreakdown("2026-11-01", "1990-06-15")).toBeNull();
  });

  it("returns null for impossible dates (Feb 30, month 13) and garbage", () => {
    expect(ageBreakdown("2026-02-30", "2026-11-01")).toBeNull();
    expect(ageBreakdown("1990-06-15", "2026-13-01")).toBeNull();
    expect(ageBreakdown("", "2026-11-01")).toBeNull();
    expect(ageBreakdown("not-a-date", "2026-11-01")).toBeNull();
  });

  it("a birth on the same day as the age-on date is a valid zero age", () => {
    const age = ageBreakdown("2026-11-01", "2026-11-01")!;
    expect(age).toMatchObject({ years: 0, months: 0, days: 0, totalDays: 0 });
    expect(age.nextBirthday.iso).toBe("2027-11-01");
    expect(age.nextBirthday.turning).toBe(1);
  });
});

describe("consistency with the workdays engine on the shared UTC primitives", () => {
  it("one calendar year of age equals 365 or 366 total days", () => {
    expect(ageBreakdown("2024-01-01", "2025-01-01")!.totalDays).toBe(366);
    expect(ageBreakdown("2026-01-01", "2027-01-01")!.totalDays).toBe(365);
  });

  it("dateSpan totals match age totals for the same pair", () => {
    const span = dateSpan("1990-06-15", "2026-11-01")!;
    const age = ageBreakdown("1990-06-15", "2026-11-01")!;
    expect(span.totalDays).toBe(age.totalDays);
    expect(span.totalMonths).toBe(age.totalMonths);
    expect(span.years).toBe(age.years);
  });
});
