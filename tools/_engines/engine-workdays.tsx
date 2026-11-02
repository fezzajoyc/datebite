"use client";

import { useEffect, useMemo, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { ToolPanel } from "@/components/ui";
import { DateIn, Field, Note, Stats, fmtLongDate, fmtNum, pick } from "./calc-ui";
import { addWorkdays, dayToIso, isoToDay, parseHolidays, workdaysBreakdown, type WeekendDef } from "../_lib/workdays";

/**
 * 工作日引擎,一具两用:props.mode = "between" 时统计区间工作日,
 * "add" 时从基准日加减 N 个工作日。两个站上工具共用这个引擎与同一份
 * tools/_lib/workdays.ts 纯逻辑(UTC 整数天数,不受 DST 影响)。
 */

const S = {
  start: { en: "Start date", zh: "开始日期", ja: "開始日", es: "Fecha de inicio", pt: "Data de início" },
  end: { en: "End date", zh: "结束日期", ja: "終了日", es: "Fecha de fin", pt: "Data final" },
  base: { en: "Starting from", zh: "基准日期", ja: "基準日", es: "Fecha de partida", pt: "Data de partida" },
  direction: { en: "Direction", zh: "方向", ja: "方向", es: "Dirección", pt: "Direção" },
  forward: { en: "Forward", zh: "往后", ja: "進む", es: "Adelante", pt: "Avançar" },
  back: { en: "Backward", zh: "往前", ja: "戻る", es: "Atrás", pt: "Retroceder" },
  count: { en: "How many workdays", zh: "工作日数", ja: "営業日数", es: "Cuántos días hábiles", pt: "Quantos dias úteis" },
  weekend: { en: "Weekend falls on", zh: "周末是哪两天", ja: "休曜日", es: "Fin de semana", pt: "Fim de semana" },
  satSun: { en: "Saturday & Sunday", zh: "周六、周日", ja: "土曜・日曜", es: "Sábado y domingo", pt: "Sábado e domingo" },
  friSat: { en: "Friday & Saturday", zh: "周五、周六", ja: "金曜・土曜", es: "Viernes y sábado", pt: "Sexta e sábado" },
  holidays: {
    en: "Holidays — one YYYY-MM-DD per line",
    zh: "节假日——每行一个,格式 YYYY-MM-DD",
    ja: "祝日——1 行に 1 つの YYYY-MM-DD",
    es: "Festivos — un AAAA-MM-DD por línea",
    pt: "Feriados — um AAAA-MM-DD por linha",
  },
  result: { en: "Business days", zh: "工作日", ja: "営業日", es: "Días hábiles", pt: "Dias úteis" },
  calDays: { en: "Calendar days", zh: "日历天数", ja: "暦日数", es: "Días de calendario", pt: "Dias corridos" },
  weekendDays: { en: "Weekend days", zh: "周末天数", ja: "休曜日数", es: "Días de fin de semana", pt: "Dias de fim de semana" },
  holidayDays: { en: "Holidays dropped", zh: "扣除节假日", ja: "除外祝日", es: "Festivos descontados", pt: "Feriados descontados" },
  landing: { en: "Lands on", zh: "落点日期", ja: "到着日", es: "Resultado", pt: "Resultado" },
  inclusiveNote: {
    en: "Both endpoints count: Monday through Friday is 5 business days. Swap the direction in add mode and the start date itself is never consumed — Friday + 1 workday lands on Monday, and so does Saturday + 1.",
    zh: "两端日期都计入:周一到周五是 5 个工作日。加减模式下起点本身不消耗——周五加 1 个工作日落在下周一,周六加 1 个也一样。",
    ja: "両端の日付を数えます。月曜から金曜なら 5 営業日。加減モードでは開始日自体を消費しません。金曜 + 1 営業日は月曜、土曜 + 1 も月曜に着地します。",
    es: "Los dos extremos cuentan: de lunes a viernes son 5 días hábiles. En el modo de suma la fecha inicial no se consume: viernes + 1 día hábil cae en lunes, y sábado + 1 también.",
    pt: "As duas pontas contam: de segunda a sexta são 5 dias úteis. No modo de soma a data inicial não é consumida: sexta + 1 dia útil cai na segunda, e sábado + 1 também.",
  },
  invalid: {
    en: "Check the dates (YYYY-MM-DD) and use a whole number of workdays.",
    zh: "请检查日期格式(YYYY-MM-DD),工作日数需为整数。",
    ja: "日付(YYYY-MM-DD)を確認し、営業日数は整数で入力してください。",
    es: "Revise las fechas (AAAA-MM-DD) e introduzca un número entero de días hábiles.",
    pt: "Confira as datas (AAAA-MM-DD) e informe um número inteiro de dias úteis.",
  },
};

function todayIso(): string {
  const t = new Date();
  const two = (n: number) => String(n).padStart(2, "0");
  return `${t.getFullYear()}-${two(t.getMonth() + 1)}-${two(t.getDate())}`;
}

function plusDays(iso: string, days: number): string {
  const d = isoToDay(iso);
  return d === null ? iso : dayToIso(d + days);
}

export function WorkdaysEngine({ mode }: { mode: "between" | "add" }) {
  const { locale } = useI18n();
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [base, setBase] = useState("");
  const [dir, setDir] = useState("forward");
  const [count, setCount] = useState("10");
  const [weekend, setWeekend] = useState<WeekendDef>("sat-sun");
  const [holidayText, setHolidayText] = useState("");

  useEffect(() => {
    const t = todayIso();
    if (mode === "between") {
      setStart(t);
      setEnd(plusDays(t, 30));
    } else {
      setBase(t);
    }
  }, [mode]);

  const holidays = useMemo(() => parseHolidays(holidayText.split("\n")), [holidayText]);

  const n = Math.floor(Number(count));
  const breakdown = useMemo(
    () => (mode === "between" ? workdaysBreakdown(start, end, { weekend, holidays }) : null),
    [mode, start, end, weekend, holidays],
  );
  const landing = useMemo(
    () =>
      mode === "add" && Number.isFinite(n) && count.trim() !== ""
        ? addWorkdays(base, dir === "forward" ? n : -n, { weekend, holidays })
        : null,
    [mode, base, dir, n, count, weekend, holidays],
  );

  return (
    <ToolPanel>
      {mode === "between" ? (
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label={pick(locale, S.start)}>
            <DateIn value={start} onChange={setStart} aria={pick(locale, S.start)} />
          </Field>
          <Field label={pick(locale, S.end)}>
            <DateIn value={end} onChange={setEnd} aria={pick(locale, S.end)} />
          </Field>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-3">
          <Field label={pick(locale, S.base)}>
            <DateIn value={base} onChange={setBase} aria={pick(locale, S.base)} />
          </Field>
          <Field label={pick(locale, S.direction)}>
            <select className="field" value={dir} onChange={(e) => setDir(e.target.value)} aria-label={pick(locale, S.direction)}>
              <option value="forward">+ {pick(locale, S.forward)}</option>
              <option value="back">− {pick(locale, S.back)}</option>
            </select>
          </Field>
          <Field label={pick(locale, S.count)}>
            <input
              type="number"
              inputMode="numeric"
              className="field mono"
              value={count}
              onChange={(e) => setCount(e.target.value)}
              placeholder="10"
              aria-label={pick(locale, S.count)}
            />
          </Field>
        </div>
      )}

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <Field label={pick(locale, S.weekend)}>
          <select
            className="field"
            value={weekend}
            onChange={(e) => setWeekend(e.target.value as WeekendDef)}
            aria-label={pick(locale, S.weekend)}
          >
            <option value="sat-sun">{pick(locale, S.satSun)}</option>
            <option value="fri-sat">{pick(locale, S.friSat)}</option>
          </select>
        </Field>
        <Field label={pick(locale, S.holidays)}>
          <textarea
            className="field mono"
            rows={3}
            value={holidayText}
            onChange={(e) => setHolidayText(e.target.value)}
            placeholder={"2026-12-25\n2027-01-01"}
            aria-label={pick(locale, S.holidays)}
            spellCheck={false}
          />
        </Field>
      </div>

      {mode === "between" ? (
        breakdown ? (
          <>
            <div className="mt-5">
              <Stats
                items={[
                  { label: pick(locale, S.result), value: fmtNum(breakdown.workdays, locale), tone: "accent" },
                  { label: pick(locale, S.calDays), value: fmtNum(breakdown.total, locale) },
                  { label: pick(locale, S.weekendDays), value: fmtNum(breakdown.weekendDays, locale) },
                  { label: pick(locale, S.holidayDays), value: fmtNum(breakdown.holidayDays, locale) },
                ]}
              />
            </div>
            <div className="mt-4">
              <Note>{pick(locale, S.inclusiveNote)}</Note>
            </div>
          </>
        ) : (
          <div className="mt-5">
            <Note>{pick(locale, S.invalid)}</Note>
          </div>
        )
      ) : landing ? (
        <>
          <div className="mt-5 rounded-xl border hairline px-4 py-3.5">
            <span className="text-[13px] font-medium text-[var(--color-sub)]">{pick(locale, S.landing)}</span>
            <p className="mono mt-1 text-[17px] font-semibold">{fmtLongDate(landing, locale)}</p>
          </div>
          <div className="mt-4">
            <Note>{pick(locale, S.inclusiveNote)}</Note>
          </div>
        </>
      ) : (
        <div className="mt-5">
          <Note>{pick(locale, S.invalid)}</Note>
        </div>
      )}
    </ToolPanel>
  );
}
