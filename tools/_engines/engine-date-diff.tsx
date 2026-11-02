"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { ToolPanel } from "@/components/ui";
import { DateIn, Field, Note, Stats, fmtNum, pick } from "./calc-ui";
import { dateSpan } from "../_lib/age";

/**
 * 日期差值引擎:两个日期之间隔了多久。与年龄工具同一套日历数学
 * (tools/_lib/age.ts),但框定方式不同——这里回答"间隔",不问年龄。
 */

const S = {
  from: { en: "From", zh: "开始日期", ja: "開始日", es: "Desde", pt: "De" },
  to: { en: "To", zh: "结束日期", ja: "終了日", es: "Hasta", pt: "Até" },
  span: { en: "Calendar span", zh: "日历跨度", ja: "暦の間隔", es: "Intervalo de calendario", pt: "Intervalo de calendário" },
  totalDays: { en: "Total days", zh: "总天数", ja: "合計日数", es: "Total de días", pt: "Total de dias" },
  weeksDays: { en: "Weeks + days", zh: "周 + 天", ja: "週 + 日", es: "Semanas + días", pt: "Semanas + dias" },
  totalMonths: { en: "Full months", zh: "完整月数", ja: "満月数", es: "Meses cumplidos", pt: "Meses completos" },
  y: { en: "years", zh: "岁", ja: "年", es: "años", pt: "anos" },
  m: { en: "months", zh: "个月", ja: "か月", es: "meses", pt: "meses" },
  d: { en: "days", zh: "天", ja: "日", es: "días", pt: "dias" },
  w: { en: "weeks", zh: "周", ja: "週間", es: "semanas", pt: "semanas" },
  sameDay: {
    en: "Both dates are the same day, so the span is zero.",
    zh: "两个日期是同一天,间隔为零。",
    ja: "両方とも同じ日付なので、間隔はゼロです。",
    es: "Ambas fechas son el mismo día, así que el intervalo es cero.",
    pt: "As duas datas são o mesmo dia, então o intervalo é zero.",
  },
  exclusiveNote: {
    en: "The end date itself is not counted — March 1 to March 2 is 1 day, not 2. Want both endpoints counted? Use the business days calculator.",
    zh: "结束当天不计入——3 月 1 日到 3 月 2 日是 1 天而不是 2 天。要两端都计入,请用工作日计算器。",
    ja: "終了日は数えません。3 月 1 日から 3 月 2 日なら 1 日です。両端を数えたい場合は営業日計算ツールをどうぞ。",
    es: "La fecha final no se cuenta: del 1 de marzo al 2 de marzo es 1 día, no 2. ¿Quiere contar ambos extremos? Use la calculadora de días hábiles.",
    pt: "A data final não entra na conta — de 1 de março a 2 de março é 1 dia, não 2. Quer contar as duas pontas? Use a calculadora de dias úteis.",
  },
  pickDates: {
    en: "Pick two dates — any order works, the span is the same.",
    zh: "选择两个日期即可——先后顺序无所谓,间隔一样。",
    ja: "日付を 2 つ選んでください。どちらが先でも結果は同じです。",
    es: "Elija dos fechas — el orden no importa, el intervalo es el mismo.",
    pt: "Informe duas datas — a ordem não importa, o intervalo é o mesmo.",
  },
};

export function DateDiffEngine() {
  const { locale } = useI18n();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  useEffect(() => {
    const t = new Date();
    const two = (n: number) => String(n).padStart(2, "0");
    setFrom(`${t.getFullYear()}-01-01`);
    setTo(`${t.getFullYear()}-${two(t.getMonth() + 1)}-${two(t.getDate())}`);
  }, []);

  const span = dateSpan(from, to);
  const sameDay = span !== null && span.totalDays === 0;

  return (
    <ToolPanel>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={pick(locale, S.from)}>
          <DateIn value={from} onChange={setFrom} aria={pick(locale, S.from)} />
        </Field>
        <Field label={pick(locale, S.to)}>
          <DateIn value={to} onChange={setTo} aria={pick(locale, S.to)} />
        </Field>
      </div>

      {span ? (
        <>
          <div className="mt-5">
            <Stats
              items={[
                {
                  label: pick(locale, S.span),
                  value: `${span.years} ${pick(locale, S.y)} ${span.months} ${pick(locale, S.m)} ${span.days} ${pick(locale, S.d)}`,
                  tone: "accent",
                },
                { label: pick(locale, S.totalDays), value: fmtNum(span.totalDays, locale) },
                {
                  label: pick(locale, S.weeksDays),
                  value: sameDay ? "0" : `${fmtNum(span.totalWeeks, locale)} ${pick(locale, S.w)} ${span.remainderDays} ${pick(locale, S.d)}`,
                },
                { label: pick(locale, S.totalMonths), value: fmtNum(span.totalMonths, locale) },
              ]}
            />
          </div>
          <div className="mt-4">
            <Note>{sameDay ? pick(locale, S.sameDay) : pick(locale, S.exclusiveNote)}</Note>
          </div>
        </>
      ) : (
        <div className="mt-5">
          <Note>{pick(locale, S.pickDates)}</Note>
        </div>
      )}
    </ToolPanel>
  );
}
