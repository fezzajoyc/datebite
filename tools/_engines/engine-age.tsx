"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/components/i18n-provider";
import { ToolPanel } from "@/components/ui";
import { DateIn, Field, Note, Stats, fmtLongDate, fmtNum, pick } from "./calc-ui";
import { ageBreakdown } from "../_lib/age";
import { isoToDay } from "../_lib/workdays";

/**
 * 年龄引擎:出生日 + 起算日 → 精确岁/月/天、累计天数与下次生日倒计时。
 * 计算全部走 tools/_lib/age.ts(UTC 整数天数),组件只做输入与呈现。
 */

const S = {
  birth: { en: "Date of birth", zh: "出生日期", ja: "生年月日", es: "Fecha de nacimiento", pt: "Data de nascimento" },
  asOf: { en: "Age on", zh: "计算到哪天", ja: "起算日", es: "Edad a fecha", pt: "Idade na data" },
  exact: { en: "Exact age", zh: "精确年龄", ja: "正確な年齢", es: "Edad exacta", pt: "Idade exata" },
  totalDays: { en: "Days lived", zh: "生活天数", ja: "生きてきた日数", es: "Días vividos", pt: "Dias vividos" },
  totalMonths: { en: "Full months", zh: "完整月数", ja: "満月数", es: "Meses cumplidos", pt: "Meses completos" },
  bornOn: { en: "Born on a", zh: "出生那天是", ja: "生まれた曜日", es: "Nació un", pt: "Nasceu numa" },
  next: { en: "Next birthday", zh: "下一个生日", ja: "次の誕生日", es: "Próximo cumpleaños", pt: "Próximo aniversário" },
  turns: { en: "turns", zh: "届时满", ja: "歳になる", es: "cumple", pt: "fará" },
  daysToGo: { en: "days to go", zh: "天后", ja: "日後", es: "días", pt: "dias" },
  today: { en: "Today — happy birthday!", zh: "就是今天——生日快乐!", ja: "今日です——お誕生日おめでとう!", es: "¡Hoy es el día — felicidades!", pt: "É hoje — parabéns!" },
  y: { en: "years", zh: "岁", ja: "歳", es: "años", pt: "anos" },
  m: { en: "months", zh: "个月", ja: "か月", es: "meses", pt: "meses" },
  d: { en: "days", zh: "天", ja: "日", es: "días", pt: "dias" },
  leapNote: {
    en: "Born on 29 February? Birthdays are observed on 1 March in non-leap years, and leap years and month lengths are counted exactly.",
    zh: "2 月 29 日出生?平年生日按 3 月 1 日计,闰年与大小月都已精确处理。",
    ja: "2 月 29 日生まれの場合、平年の誕生日は 3 月 1 日扱い。うるう年と月の日数も正確に数えます。",
    es: "¿Nació un 29 de febrero? En años no bisiestos el cumpleaños se celebra el 1 de marzo, y los años bisiestos y la duración de los meses se cuentan con exactitud.",
    pt: "Nasceu em 29 de fevereiro? Em anos não bissextos o aniversário é lembrado em 1º de março, e anos bissextos e a duração dos meses são contados com exatidão.",
  },
  pickDates: { en: "Pick both dates to see the age.", zh: "选择两个日期即可看到年龄。", ja: "両方の日付を選ぶと年齢が表示されます。", es: "Elija ambas fechas para ver la edad.", pt: "Informe as duas datas para ver a idade." },
  invalid: {
    en: "The age-on date can't be earlier than the date of birth, and both must be real calendar dates.",
    zh: "起算日不能早于出生日期,且两个日期都必须真实存在。",
    ja: "起算日は生年月日より前にできません。両方とも実在する日付にしてください。",
    es: "La fecha de cálculo no puede ser anterior a la de nacimiento, y ambas deben ser fechas reales.",
    pt: "A data de cálculo não pode ser anterior à de nascimento, e ambas devem ser datas reais.",
  },
};

function todayIso(): string {
  const t = new Date();
  const two = (n: number) => String(n).padStart(2, "0");
  return `${t.getFullYear()}-${two(t.getMonth() + 1)}-${two(t.getDate())}`;
}

export function AgeEngine() {
  const { locale } = useI18n();
  const [birth, setBirth] = useState("1990-06-15");
  const [asOf, setAsOf] = useState("");

  useEffect(() => {
    setAsOf(todayIso());
  }, []);

  // 字符串比较即日期先后(ISO 格式天然有序)
  const ordered = birth !== "" && asOf !== "" && birth <= asOf;
  const age = ordered ? ageBreakdown(birth, asOf) : undefined;
  const bothSet = birth !== "" && asOf !== "";
  const birthDow = age
    ? new Intl.DateTimeFormat(locale === "zh" ? "zh-CN" : locale === "ja" ? "ja-JP" : locale === "es" ? "es-ES" : locale === "pt" ? "pt-BR" : "en-US", {
        weekday: "long",
        timeZone: "UTC",
      }).format(new Date((isoToDay(birth) ?? 0) * 86400000))
    : "";

  return (
    <ToolPanel>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label={pick(locale, S.birth)}>
          <DateIn value={birth} onChange={setBirth} aria={pick(locale, S.birth)} />
        </Field>
        <Field label={pick(locale, S.asOf)}>
          <DateIn value={asOf} onChange={setAsOf} aria={pick(locale, S.asOf)} min={birth || undefined} />
        </Field>
      </div>

      {age ? (
        <>
          <div className="mt-5">
            <Stats
              items={[
                {
                  label: pick(locale, S.exact),
                  value: `${age.years} ${pick(locale, S.y)} ${age.months} ${pick(locale, S.m)} ${age.days} ${pick(locale, S.d)}`,
                  tone: "accent",
                },
                { label: pick(locale, S.totalDays), value: fmtNum(age.totalDays, locale) },
                { label: pick(locale, S.totalMonths), value: fmtNum(age.totalMonths, locale) },
                { label: pick(locale, S.bornOn), value: birthDow },
              ]}
            />
          </div>
          <div className="mt-5 rounded-xl border hairline px-4 py-3.5">
            <span className="text-[13px] font-medium text-[var(--color-sub)]">{pick(locale, S.next)}</span>
            <p className="mt-1 text-[15px]">
              {fmtLongDate(age.nextBirthday.iso, locale)} ·{" "}
              {age.nextBirthday.daysAway === 0 ? (
                <strong className="font-semibold text-[var(--color-good)]">{pick(locale, S.today)}</strong>
              ) : (
                <strong className="font-semibold text-[var(--color-ink)]">
                  {fmtNum(age.nextBirthday.daysAway, locale)} {pick(locale, S.daysToGo)} · {pick(locale, S.turns)} {age.nextBirthday.turning}
                </strong>
              )}
            </p>
          </div>
        </>
      ) : (
        <div className="mt-5">
          <Note>{bothSet ? pick(locale, S.invalid) : pick(locale, S.pickDates)}</Note>
        </div>
      )}

      <div className="mt-3">
        <Note>{pick(locale, S.leapNote)}</Note>
      </div>
    </ToolPanel>
  );
}
