"use client";

import { useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { ToolPanel } from "@/components/ui";
import { Field, Note, Tabs, pick } from "./calc-ui";
import type { Locale } from "@/lib/site";
import { bedtimesFor, dayOffset, formatHm, parseHm, wakeTimesFor } from "../_lib/sleep";

/**
 * 睡眠引擎:按 90 分钟周期 + 约 15 分钟入睡时间,给出"几点睡能几点醒"
 * 或"现在睡会几点醒"两档。纯逻辑在 tools/_lib/sleep.ts。
 */

const S = {
  bedtimes: { en: "I want to wake up at", zh: "想在几点醒", ja: "起きたい時刻", es: "Quiero despertar a las", pt: "Quero acordar às" },
  wakeTimes: { en: "Sleeping right now", zh: "现在就睡", ja: "いま寝る", es: "Dormir ahora mismo", pt: "Dormir agora" },
  wakeAt: { en: "Wake-up time", zh: "起床时间", ja: "起床時刻", es: "Hora de despertar", pt: "Hora de acordar" },
  now: { en: "Time you go to bed", zh: "入睡时间", ja: "寝る時刻", es: "Hora de acostarse", pt: "Hora de deitar" },
  cycles: { en: "cycles", zh: "个周期", ja: "サイクル", es: "ciclos", pt: "ciclos" },
  sleep: { en: "of sleep", zh: "睡眠", ja: "睡眠", es: "de sueño", pt: "de sono" },
  bedAt: { en: "Bedtime", zh: "就寝", ja: "就寝", es: "Acostarse", pt: "Deitar-se" },
  wakeAt2: { en: "Wake up", zh: "醒来", ja: "起床", es: "Despertar", pt: "Acordar" },
  nextDay: { en: "next day", zh: "次日", ja: "翌日", es: "día siguiente", pt: "dia seguinte" },
  prevDay: { en: "previous evening", zh: "前一晚", ja: "前夜", es: "noche anterior", pt: "noite anterior" },
  cyclesNote: {
    en: "The maths: 90-minute sleep cycles plus about 15 minutes to fall asleep. Waking between cycles feels far easier than mid-cycle — but individual cycles run 80–120 minutes, so treat these times as anchors, not alarms.",
    zh: "原理:90 分钟一个睡眠周期,另加约 15 分钟入睡时间。在周期之间醒来比周期中醒来轻松得多——但个人周期在 80–120 分钟之间浮动,这些时间点适合当锚点,不适合当闹钟。",
    ja: "仕組み:90 分の睡眠サイクル + 入眠まで約 15 分。サイクルの合間に起きるとすっきりしやすいのですが、個人差は 80〜120 分。目覚ましというより目安として使ってください。",
    es: "La base: ciclos de sueño de 90 minutos más unos 15 minutos para conciliar el sueño. Despertar entre ciclos cuesta menos que a mitad de uno, pero los ciclos varían entre 80 y 120 minutos: tómelas como referencia, no como alarma.",
    pt: "A base: ciclos de sono de 90 minutos mais cerca de 15 minutos para pegar no sono. Acordar entre ciclos é mais leve do que no meio de um, mas os ciclos variam de 80 a 120 minutos: use como referência, não como despertador.",
  },
  invalid: {
    en: "Enter a time as HH:MM (24-hour), like 07:00.",
    zh: "请按 HH:MM(24 小时制)输入时间,例如 07:00。",
    ja: "時刻は HH:MM(24 時間制)で入力してください。例:07:00。",
    es: "Escriba la hora como HH:MM (24 h), por ejemplo 07:00.",
    pt: "Digite a hora como HH:MM (24 h), por exemplo 07:00.",
  },
};

type Row = { cycles: number; sleepMinutes: number; minutes: number };

function RowList({ rows, kind, locale }: { rows: Row[]; kind: "bed" | "wake"; locale: string }) {
  return (
    <ul className="mt-5 space-y-2.5">
      {rows.map((r) => {
        const off = dayOffset(r.minutes);
        return (
          <li key={r.cycles} className="flex items-center justify-between rounded-xl border hairline px-4 py-3">
            <span className="text-[13px] font-medium text-[var(--color-sub)]">
              {r.cycles} {pick(locale as Locale, S.cycles)} · {r.sleepMinutes / 60} h {pick(locale as Locale, S.sleep)}
            </span>
            <span className="mono text-[17px] font-semibold text-[var(--color-ink)]">
              {formatHm(r.minutes)}
              <span className="ml-2 text-[11px] font-medium text-[var(--color-sub)]">
                {off === 1 ? pick(locale as Locale, S.nextDay) : off === -1 ? pick(locale as Locale, S.prevDay) : ""}
              </span>
            </span>
            <span className="sr-only">
              {kind === "bed" ? pick(locale as Locale, S.bedAt) : pick(locale as Locale, S.wakeAt2)} {formatHm(r.minutes)}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

export function SleepEngine() {
  const { locale } = useI18n();
  const [tab, setTab] = useState("bed");
  const [time, setTime] = useState("07:00");

  const min = parseHm(time);
  const rows: Row[] | null =
    min === null ? null : tab === "bed" ? bedtimesFor(min) : wakeTimesFor(min);

  return (
    <ToolPanel>
      <Tabs
        options={[
          { id: "bed", label: pick(locale, S.bedtimes) },
          { id: "wake", label: pick(locale, S.wakeTimes) },
        ]}
        value={tab}
        onChange={setTab}
      />
      <Field label={tab === "bed" ? pick(locale, S.wakeAt) : pick(locale, S.now)}>
        <input
          type="time"
          className="field mono sm:max-w-[12rem]"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          aria-label={tab === "bed" ? pick(locale, S.wakeAt) : pick(locale, S.now)}
        />
      </Field>

      {rows && rows.length > 0 ? (
        <RowList rows={rows} kind={tab === "bed" ? "bed" : "wake"} locale={locale} />
      ) : (
        <div className="mt-5">
          <Note>{pick(locale, S.invalid)}</Note>
        </div>
      )}

      <div className="mt-4">
        <Note>{pick(locale, S.cyclesNote)}</Note>
      </div>
    </ToolPanel>
  );
}
