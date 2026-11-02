import { z } from "zod";
import { ageBreakdown, dateSpan } from "../tools/_lib/age";
import { addWorkdays, workdaysBetween, workdaysBreakdown, type WeekendDef } from "../tools/_lib/workdays";
import { bedtimesFor, dayOffset, formatHm, parseHm, wakeTimesFor } from "../tools/_lib/sleep";

/**
 * DateBite MCP 工具注册表:把 tools/_lib 的纯函数暴露为 AI 可执行工具。
 * 站上的同名工具在浏览器里跑(交互式),这里跑同一份经过测试的实现——
 * 人和 AI 用同一套逻辑,而不是两套各写各的。
 */

const json = (v: unknown) => ({ content: [{ type: "text" as const, text: JSON.stringify(v, null, 2) }] });
const text = (t: string) => ({ content: [{ type: "text" as const, text: t }] });
const bad = (t: string) => ({ content: [{ type: "text" as const, text: t }], isError: true as const });

/** 本地当天(UTC 日历)的 ISO 日期,供 age_breakdown 的可选 on 参数使用 */
function todayIsoUtc(): string {
  return new Date().toISOString().slice(0, 10);
}

export type McpToolDef = {
  name: string;
  title: string;
  description: string;
  schema: Record<string, any>;
  run: (args: any) => { content: { type: "text"; text: string }[]; isError?: boolean };
};

export const MCP_TOOLS: McpToolDef[] = [
  {
    name: "age_breakdown",
    title: "Exact age breakdown",
    description:
      "Exact age on a date, from a date of birth: years/months/days (calendar-accurate, not 30-day months), total days lived, full months, and a countdown to the next birthday. 29 February birthdays are observed on 1 March in non-leap years. Dates are ISO YYYY-MM-DD.",
    schema: {
      birth: z.string().describe("date of birth, ISO YYYY-MM-DD"),
      on: z.string().optional().describe("age-on date, ISO YYYY-MM-DD; defaults to today (UTC)"),
    },
    run: (a) => {
      const on = a.on ?? todayIsoUtc();
      const age = ageBreakdown(a.birth, on);
      if (!age) {
        return bad("invalid input — need two real ISO dates YYYY-MM-DD, with the age-on date on or after the birth date");
      }
      return json({
        age: `${age.years}y ${age.months}m ${age.days}d`,
        years: age.years,
        months: age.months,
        days: age.days,
        total_days: age.totalDays,
        total_months: age.totalMonths,
        next_birthday: {
          date: age.nextBirthday.iso,
          days_away: age.nextBirthday.daysAway,
          turning: age.nextBirthday.turning,
          observed_mar_1: age.nextBirthday.observedMar1,
        },
      });
    },
  },
  {
    name: "workdays_between",
    title: "Business days between dates",
    description:
      "Count working days between two ISO dates, inclusive of both endpoints (Mon–Fri is 5). Optional holidays (YYYY-MM-DD, excluded like weekends) and weekend definition. Order of the dates does not matter. Also returns the calendar-day, weekend-day and holiday-day breakdown.",
    schema: {
      start: z.string().describe("ISO date YYYY-MM-DD"),
      end: z.string().describe("ISO date YYYY-MM-DD"),
      holidays: z.array(z.string()).default([]).describe("ISO dates to exclude, YYYY-MM-DD each"),
      weekend: z.enum(["sat-sun", "fri-sat"]).default("sat-sun"),
    },
    run: (a) => {
      const opts = { weekend: a.weekend as WeekendDef, holidays: a.holidays as string[] };
      const workdays = workdaysBetween(a.start, a.end, opts);
      if (!Number.isFinite(workdays)) {
        return bad("invalid input — both dates must be real ISO dates YYYY-MM-DD (e.g. 2026-02-31 is rejected)");
      }
      const breakdown = workdaysBreakdown(a.start, a.end, opts);
      return json({
        workdays,
        calendar_days: breakdown!.total,
        weekend_days: breakdown!.weekendDays,
        holidays_excluded: breakdown!.holidayDays,
      });
    },
  },
  {
    name: "add_workdays",
    title: "Add working days",
    description:
      "Add N working days to an ISO date (negative to go backward) and get the landing date — Excel WORKDAY semantics: the start date itself is not consumed, n = 0 returns the start unchanged. Optional holidays and weekend definition.",
    schema: {
      start: z.string().describe("ISO date YYYY-MM-DD"),
      days: z.number().int().describe("whole number of workdays; negative counts backward"),
      holidays: z.array(z.string()).default([]),
      weekend: z.enum(["sat-sun", "fri-sat"]).default("sat-sun"),
    },
    run: (a) => {
      const result = addWorkdays(a.start, a.days, {
        weekend: a.weekend as WeekendDef,
        holidays: a.holidays as string[],
      });
      if (result === null) {
        return bad("invalid input — the start must be a real ISO date YYYY-MM-DD and days a whole number");
      }
      return text(result);
    },
  },
  {
    name: "date_difference",
    title: "Difference between dates",
    description:
      "Calendar distance between two ISO dates, order-independent: years/months/days with month-end clamping (a month from 31 January is 28/29 February), plus total days (end date not counted), full weeks with remainder, and full months.",
    schema: {
      from: z.string().describe("ISO date YYYY-MM-DD"),
      to: z.string().describe("ISO date YYYY-MM-DD"),
    },
    run: (a) => {
      const span = dateSpan(a.from, a.to);
      if (!span) {
        return bad("invalid input — both dates must be real ISO dates YYYY-MM-DD");
      }
      return json({
        span: `${span.years}y ${span.months}m ${span.days}d`,
        years: span.years,
        months: span.months,
        days: span.days,
        total_days: span.totalDays,
        total_weeks: span.totalWeeks,
        remainder_days: span.remainderDays,
        total_months: span.totalMonths,
      });
    },
  },
  {
    name: "sleep_schedule",
    title: "Sleep cycle schedule",
    description:
      "Bedtimes that end a full 90-minute sleep cycle (plus 15 min to fall asleep) at a chosen wake time, or wake times if sleeping at a given moment — 6 down to 3 cycles (9 h to 4.5 h). Individual cycles vary 80–120 min; times are anchors, not alarms.",
    schema: {
      mode: z.enum(["bedtimes", "wake_times"]),
      time: z.string().describe("HH:MM (24h)"),
    },
    run: (a) => {
      const min = parseHm(a.time ?? "");
      if (min === null) {
        return bad("invalid time — use HH:MM (24h), e.g. 07:00");
      }
      const options = a.mode === "bedtimes" ? bedtimesFor(min) : wakeTimesFor(min);
      return json(
        options.map((o) => ({
          cycles: o.cycles,
          sleep_hours: o.sleepMinutes / 60,
          time: formatHm(o.minutes),
          day_offset: dayOffset(o.minutes),
        })),
      );
    },
  },
];
