import { AgeEngine } from "../_engines/engine-age";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "age-calculator",
  category: "utility",
  icon: "calendar",
  featured: true,
  engine: { component: AgeEngine },
  related: ["date-difference-calculator", "workdays-calculator", "add-workdays-calculator", "sleep-calculator"],
  copy: {
    en: {
      name: "Age Calculator",
      tagline:
        "Turn a date of birth into an exact age in years, months and days — with total days lived and a countdown to the next birthday.",
      intro: [
        "Most of us round our age to a single number, but forms, visas, insurance brackets and school cutoffs often ask for more. This calculator reads a date of birth and any \"age on\" date, then counts the calendar distance between them the way a calendar would: whole years first, then whole months, then whatever days remain. It also totals every day lived so far and points at the next birthday.",
        "Everything is computed in whole UTC days, so daylight-saving shifts can never nudge a result. Leap years and uneven month lengths are handled exactly, and a 29 February birthday is observed on 1 March in years without a leap day — the convention most legal systems use.",
      ],
      steps: [
        "Enter the date of birth.",
        "Set the age-on date — it defaults to today and can be any past or future date.",
        "Read the exact age in years, months and days, plus the total days and months lived.",
        "Check the next-birthday line for the countdown and the age being reached.",
      ],
      faqs: [
        {
          q: "How is the exact age calculated?",
          a: "By counting whole calendar months first, then leftover days — never by assuming 30-day months. For example, from 15 June 1990 to 1 November 2026 the calculator reports 36 years, 4 months and 17 days, because 15 June plus 36 years and 4 months lands on 15 October, and 1 November is 17 days later.",
        },
        {
          q: "What happens to 29 February birthdays?",
          a: "In a leap year the birthday stays on 29 February. In a common year it is observed on 1 March, which matches how most jurisdictions treat leap-day births. The tool flags this convention so you can see which date it used.",
        },
        {
          q: "Can I calculate an age at a future date?",
          a: "Yes. Set the age-on date to anything from the birth date onward — useful for pension eligibility, school enrollment cutoffs or how old you will be on a planned trip. The next-birthday countdown follows whichever date you chose.",
        },
        {
          q: "Why does the total days figure matter?",
          a: "A handful of systems count age in days: some medical dosing, certain visa rules and plenty of milestone celebrations. The day count is computed as the exact distance between the two dates, immune to time zones and daylight-saving transitions.",
        },
      ],
    },
    zh: {
      name: "年龄计算器",
      tagline: "把出生日期换算成精确到岁、月、天的年龄——附累计生活天数与下一个生日倒计时。",
      intro: [
        "平时我们习惯把年龄约成一个数,但签证、保险档位、入学 cutoff 常常要求更精确的口径。输入出生日期和任一“起算日”,本工具按日历的方式数出两者间距:先数整年,再数整月,最后补足零头天数;同时给出出生至今的累计天数和下一个生日的倒计时。",
        "所有运算基于 UTC 整数天数,夏令时切换不会让结果偏移;闰年与大小月按真实日历精确处理,2 月 29 日出生者在平年按 3 月 1 日过生日——这也是多数司法辖区的惯例。",
      ],
      steps: [
        "输入出生日期。",
        "设置起算日——默认今天,也可以选过去或未来的任意日期。",
        "查看精确到岁、月、天的年龄,以及累计天数和完整月数。",
        "在“下一个生日”一行查看倒计时和届时满几岁。",
      ],
      faqs: [
        {
          q: "精确年龄是怎么算的?",
          a: "先数完整日历月,再补剩余天数,绝不按“一个月 30 天”近似。例如 1990 年 6 月 15 日到 2026 年 11 月 1 日:6 月 15 日加 36 年 4 个月落在 10 月 15 日,距 11 月 1 日还有 17 天,所以是 36 岁 4 个月 17 天。",
        },
        {
          q: "2 月 29 日出生怎么算?",
          a: "闰年生日就在 2 月 29 日;平年按 3 月 1 日观察,与多数地区对闰日生日的处理一致。工具会标注这一惯例,方便核对它采用了哪个日期。",
        },
        {
          q: "能算未来某天的年龄吗?",
          a: "可以。把起算日设为出生日之后的任何日期——适合算养老金资格、入学年龄线,或“旅行那天我几岁”。生日倒计时也会跟着你选的日期走。",
        },
        {
          q: "累计天数有什么用?",
          a: "有些场景直接按天数计龄:部分用药剂量、个别签证条款,还有各种纪念日。天数是两个日期的精确距离,不受时区和夏令时影响。",
        },
      ],
    },
    ja: {
      name: "年齢計算",
      tagline: "生年月日から歳・か月・日までの正確な年齢を算出。累積日数と次の誕生日までのカウントダウンも表示します。",
      intro: [
        "普段は概数で済む年齢も、ビザや保険の等級、入学の基準日では細かい区分を聞かれます。生年月日と起算日を入力すると、暦の通りに数えます。まず満年数、次に満か月数、残りを日数で埋め、生まれてからの累積日数と次の誕生日までの日数も出します。",
        "計算は UTC の整数日数で行うため、サマータイムで結果がずれることはありません。うるう年と月の日数は正確に処理し、2 月 29 日生まれの誕生日は平年 3 月 1 日扱い——多くの法域と同じ規則です。",
      ],
      steps: [
        "生年月日を入力します。",
        "起算日を設定します。今日が既定値で、過去や未来の任意の日付も指定できます。",
        "歳・か月・日の正確な年齢と、累積日数・満か月数を確認します。",
        "「次の誕生日」行でカウントダウンと、その誕生日で迎える年齢を見ます。",
      ],
      faqs: [
        {
          q: "正確な年齢はどう計算していますか?",
          a: "まず暦通りの満か月を数え、残りを日数で足します。「1 か月 = 30 日」のような近似はしません。例:1990 年 6 月 15 日から 2026 年 11 月 1 日までは 36 歳 4 か月 17 日。6 月 15 日に 36 年と 4 か月を足すと 10 月 15 日になり、11 月 1 日まで 17 日だからです。",
        },
        {
          q: "2 月 29 日生まれはどう扱われますか?",
          a: "うるう年の誕生日は 2 月 29 日のまま。平年は 3 月 1 日扱いで、これは多くの法域での取り扱いと一致します。ツールがどちらの日付を使ったかも表示します。",
        },
        {
          q: "未来の日付の年齢も計算できますか?",
          a: "できます。起算日を生年月日以降の任意の日にすれば、年金の受給資格や入学基準、「旅行に行く日は何歳か」も計算できます。誕生日カウントダウンも指定日に合わせて変わります。",
        },
        {
          q: "累積日数は何に役立ちますか?",
          a: "医療の一部の投与量や一部のビザ規定など、日数で年齢を数える場面があります。日数は 2 つの日付の正確な距離で、タイムゾーンやサマータイムの影響を受けません。",
        },
      ],
    },
    es: {
      name: "Calculadora de edad",
      tagline:
        "Convierte una fecha de nacimiento en una edad exacta en años, meses y días — con los días vividos y la cuenta atrás al próximo cumpleaños.",
      intro: [
        "Solemos redondear la edad a una sola cifra, pero visados, tramos de seguro y cortes escolares piden a menudo algo más preciso. Esta calculadora toma una fecha de nacimiento y cualquier fecha de cálculo, y mide la distancia de calendario entre ambas como lo haría un calendario: años completos, luego meses completos y al final los días que quedan. También suma cada día vivido y señala el próximo cumpleaños.",
        "Todo se calcula en días UTC enteros, así que ningún cambio de horario puede alterar el resultado. Los años bisiestos y la duración desigual de los meses se cuentan con exactitud, y un cumpleaños de 29 de febrero se celebra el 1 de marzo en los años sin 29 de febrero: la convención que usa la mayoría de los ordenamientos.",
      ],
      steps: [
        "Introduzca la fecha de nacimiento.",
        "Fije la fecha de cálculo — por defecto es hoy y puede ser pasada o futura.",
        "Lea la edad exacta en años, meses y días, junto con los días y meses totales.",
        "Consulte la línea del próximo cumpleaños para la cuenta atrás y la edad que se cumple.",
      ],
      faqs: [
        {
          q: "¿Cómo se calcula la edad exacta?",
          a: "Contando primero meses de calendario completos y añadiendo los días sobrantes, sin suponer meses de 30 días. Por ejemplo, del 15 de junio de 1990 al 1 de noviembre de 2026: 15 de junio más 36 años y 4 meses cae en 15 de octubre, y al 1 de noviembre le faltan 17 días — 36 años, 4 meses y 17 días.",
        },
        {
          q: "¿Qué pasa con los cumpleaños de 29 de febrero?",
          a: "En año bisiesto el cumpleaños sigue siendo el 29 de febrero. En año común se celebra el 1 de marzo, igual que lo tratan la mayoría de los ordenamientos. La herramienta indica esta convención para que vea qué fecha utilizó.",
        },
        {
          q: "¿Puedo calcular la edad en una fecha futura?",
          a: "Sí. Ponga la fecha de cálculo en cualquier día desde el nacimiento en adelante — útil para requisitos de pensión, cortes de matrícula o saber qué edad tendrá en un viaje planeado. La cuenta atrás sigue la fecha que usted elija.",
        },
        {
          q: "¿Para qué sirve el total de días?",
          a: "Algunos sistemas cuentan la edad en días: ciertas dosificaciones médicas, algunas normas de visado y muchos aniversarios redondos. La cifra es la distancia exacta entre las dos fechas, inmune a zonas horarias y cambios de horario.",
        },
      ],
    },
    pt: {
      name: "Calculadora de idade",
      tagline:
        "Transforma a data de nascimento em idade exata em anos, meses e dias — com o total de dias vividos e a contagem para o próximo aniversário.",
      intro: [
        "Costumamos arredondar a idade para um número só, mas vistos, faixas de seguro e cortes escolares pedem às vezes mais precisão. Esta calculadora recebe a data de nascimento e qualquer data de referência e mede a distância de calendário entre as duas do jeito que um calendário faz: anos completos, depois meses completos e, por fim, os dias que sobram. Ela também soma cada dia vivido e aponta o próximo aniversário.",
        "Tudo é calculado em dias UTC inteiros, então mudanças de horário nunca alteram o resultado. Anos bissextos e a duração desigual dos meses são contados com exatidão, e um aniversário de 29 de fevereiro é lembrado em 1º de março nos anos sem leap day — a convenção que a maioria dos ordenamentos usa.",
      ],
      steps: [
        "Informe a data de nascimento.",
        "Defina a data de referência — o padrão é hoje e pode ser passada ou futura.",
        "Leia a idade exata em anos, meses e dias, além dos totais de dias e meses.",
        "Veja a linha do próximo aniversário para a contagem e a idade que será atingida.",
      ],
      faqs: [
        {
          q: "Como a idade exata é calculada?",
          a: "Contando primeiro meses de calendário completos e somando os dias restantes, sem assumir meses de 30 dias. Por exemplo, de 15 de junho de 1990 a 1 de novembro de 2026: 15 de junho mais 36 anos e 4 meses cai em 15 de outubro, e 1º de novembro está 17 dias depois — 36 anos, 4 meses e 17 dias.",
        },
        {
          q: "E os aniversários de 29 de fevereiro?",
          a: "Em ano bissexto o aniversário continua em 29 de fevereiro. Em ano comum é lembrado em 1º de março, como a maioria dos ordenamentos trata nascidos no leap day. A ferramenta avisa quando usa essa convenção.",
        },
        {
          q: "Posso calcular a idade numa data futura?",
          a: "Sim. Coloque a data de referência em qualquer dia a partir do nascimento — útil para requisitos de aposentadoria, cortes de matrícula ou saber que idade terá numa viagem planejada. A contagem segue a data escolhida.",
        },
        {
          q: "Por que o total de dias importa?",
          a: "Alguns sistemas contam a idade em dias: certas dosagens médicas, algumas regras de visto e muitos aniversários redondos. O número é a distância exata entre as duas datas, imune a fusos e horário de verão.",
        },
      ],
    },
  },
});
