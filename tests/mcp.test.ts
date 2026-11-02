import { describe, expect, it } from "vitest";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import { createServer } from "@/mcp/server";

async function connect() {
  const server = createServer();
  const client = new Client({ name: "test", version: "0.0.0" });
  const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
  await Promise.all([server.connect(serverTransport), client.connect(clientTransport)]);
  return client;
}

/**
 * 与 tests/age.test.ts、tests/workdays.test.ts 同一套手算基准:
 * 1990-06-15 → 2026-11-01 = 36y 4m 17d(13288 天);2026-11-02(周一)→
 * 2026-11-06(周五)= 5 个工作日;2026 年感恩节 2026-11-26(周四)。
 */
describe("datebite MCP server", () => {
  it("exposes exactly the five DateBite tools", async () => {
    const client = await connect();
    const { tools } = await client.listTools();
    expect(tools.length).toBe(5);
    expect(new Set(tools.map((t) => t.name))).toEqual(
      new Set(["age_breakdown", "workdays_between", "add_workdays", "date_difference", "sleep_schedule"]),
    );
    // 每个工具都有 schema 与说明,AI 客户端靠它们路由
    for (const tool of tools) {
      expect(tool.description?.length ?? 0).toBeGreaterThan(20);
      expect(tool.inputSchema).toBeTruthy();
    }
    await client.close();
  });

  it("breaks an age down to 36y 4m 17d with the next-birthday countdown", async () => {
    const client = await connect();
    const r = await client.callTool({
      name: "age_breakdown",
      arguments: { birth: "1990-06-15", on: "2026-11-01" },
    });
    expect((r as any).isError).toBeUndefined();
    const parsed = JSON.parse((r.content as any)[0].text);
    expect(parsed.age).toBe("36y 4m 17d");
    expect(parsed.years).toBe(36);
    expect(parsed.months).toBe(4);
    expect(parsed.days).toBe(17);
    expect(parsed.total_days).toBe(13288);
    expect(parsed.total_months).toBe(436);
    expect(parsed.next_birthday.date).toBe("2027-06-15");
    expect(parsed.next_birthday.days_away).toBe(226);
    expect(parsed.next_birthday.turning).toBe(37);
    await client.close();
  });

  it("defaults the age-on date to today when omitted", async () => {
    const client = await connect();
    const r = await client.callTool({ name: "age_breakdown", arguments: { birth: "1990-06-15" } });
    const parsed = JSON.parse((r.content as any)[0].text);
    expect(typeof parsed.years).toBe("number");
    expect(parsed.years).toBeGreaterThanOrEqual(36);
    expect(parsed.next_birthday.days_away).toBeGreaterThanOrEqual(0);
    await client.close();
  });

  it("counts 5 workdays for Mon 2026-11-02 → Fri 2026-11-06, inclusive", async () => {
    const client = await connect();
    const r = await client.callTool({
      name: "workdays_between",
      arguments: { start: "2026-11-02", end: "2026-11-06" },
    });
    const parsed = JSON.parse((r.content as any)[0].text);
    expect(parsed.workdays).toBe(5);
    expect(parsed.calendar_days).toBe(5);
    expect(parsed.weekend_days).toBe(0);
    expect(parsed.holidays_excluded).toBe(0);
    await client.close();
  });

  it("drops a listed holiday (US Thanksgiving 2026-11-26) and reports the breakdown", async () => {
    const client = await connect();
    const r = await client.callTool({
      name: "workdays_between",
      arguments: { start: "2026-11-23", end: "2026-11-27", holidays: ["2026-11-26"] },
    });
    const parsed = JSON.parse((r.content as any)[0].text);
    expect(parsed.workdays).toBe(4);
    expect(parsed.calendar_days).toBe(5);
    expect(parsed.holidays_excluded).toBe(1);
    await client.close();
  });

  it("supports the Fri/Sat weekend definition", async () => {
    const client = await connect();
    const r = await client.callTool({
      name: "workdays_between",
      arguments: { start: "2026-11-06", end: "2026-11-08", weekend: "fri-sat" },
    });
    const parsed = JSON.parse((r.content as any)[0].text);
    expect(parsed.workdays).toBe(1); // 只剩周日
    await client.close();
  });

  it("lands Fri + 1 workday on Mon and honors n = 0 (WORKDAY semantics)", async () => {
    const client = await connect();
    const fwd = await client.callTool({ name: "add_workdays", arguments: { start: "2026-11-06", days: 1 } });
    expect((fwd.content as any)[0].text).toBe("2026-11-09");
    const back = await client.callTool({ name: "add_workdays", arguments: { start: "2026-11-09", days: -1 } });
    expect((back.content as any)[0].text).toBe("2026-11-06");
    const zero = await client.callTool({ name: "add_workdays", arguments: { start: "2026-11-07", days: 0 } });
    expect((zero.content as any)[0].text).toBe("2026-11-07"); // Saturday passes through untouched
    await client.close();
  });

  it("skips holidays while stepping workdays", async () => {
    const client = await connect();
    const r = await client.callTool({
      name: "add_workdays",
      arguments: { start: "2026-11-25", days: 1, holidays: ["2026-11-26"] },
    });
    expect((r.content as any)[0].text).toBe("2026-11-27");
    await client.close();
  });

  it("measures the date difference with month-end clamping, order-independent", async () => {
    const client = await connect();
    const r = await client.callTool({
      name: "date_difference",
      arguments: { from: "2026-01-31", to: "2026-03-01" },
    });
    const parsed = JSON.parse((r.content as any)[0].text);
    expect(parsed.span).toBe("0y 1m 1d");
    expect(parsed.total_days).toBe(29);
    const rev = await client.callTool({
      name: "date_difference",
      arguments: { from: "2026-03-01", to: "2026-01-31" },
    });
    expect(JSON.parse((rev.content as any)[0].text)).toEqual(parsed);
    await client.close();
  });

  it("builds sleep schedules on 90-minute cycles with day offsets", async () => {
    const client = await connect();
    const bed = await client.callTool({ name: "sleep_schedule", arguments: { mode: "bedtimes", time: "07:00" } });
    const bedRows = JSON.parse((bed.content as any)[0].text);
    expect(bedRows.map((r: any) => r.cycles)).toEqual([6, 5, 4, 3]);
    expect(bedRows[0]).toMatchObject({ time: "21:45", day_offset: -1, sleep_hours: 9 });
    expect(bedRows[3]).toMatchObject({ time: "02:15", day_offset: 0, sleep_hours: 4.5 });

    const wake = await client.callTool({ name: "sleep_schedule", arguments: { mode: "wake_times", time: "23:30" } });
    const wakeRows = JSON.parse((wake.content as any)[0].text);
    expect(wakeRows[0]).toMatchObject({ time: "08:45", day_offset: 1, sleep_hours: 9 });
    await client.close();
  });

  it("guards both layers: schema violations and invalid logic input", async () => {
    const client = await connect();
    // 逻辑层:假日期(2 月 30 日)被 isoToDay 拒绝 → isError,而不是 JSON 里静默变 null
    const fake = await client.callTool({ name: "age_breakdown", arguments: { birth: "2026-02-30", on: "2026-11-01" } });
    expect((fake as any).isError).toBe(true);
    expect((fake.content as any)[0].text).toContain("real ISO dates");
    // 逻辑层:on 早于 birth → isError
    const reversed = await client.callTool({ name: "age_breakdown", arguments: { birth: "2026-11-01", on: "1990-06-15" } });
    expect((reversed as any).isError).toBe(true);
    // 逻辑层:非法时间 → isError
    const badTime = await client.callTool({ name: "sleep_schedule", arguments: { mode: "bedtimes", time: "24:00" } });
    expect((badTime as any).isError).toBe(true);
    // schema 层:非整数天数被 zod 拒绝 → SDK 返回 isError(-32602)
    const schemaBad = await client.callTool({ name: "add_workdays", arguments: { start: "2026-11-06", days: 1.5 } });
    expect((schemaBad as any).isError).toBe(true);
    expect((schemaBad.content as any)[0].text).toContain("-32602");
    // schema 层:错误枚举 → isError
    const badMode = await client.callTool({ name: "sleep_schedule", arguments: { mode: "nap", time: "07:00" } });
    expect((badMode as any).isError).toBe(true);
    await client.close();
  });
});
