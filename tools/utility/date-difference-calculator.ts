import { DateDiffEngine } from "../_engines/engine-date-diff";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "date-difference-calculator",
  category: "utility",
  icon: "swap",
  featured: true,
  engine: { component: DateDiffEngine },
  related: ["age-calculator", "workdays-calculator", "add-workdays-calculator", "sleep-calculator"],
  copy: {
    en: {
      name: "Date Difference Calculator",
      tagline:
        "Measure the distance between two dates in calendar months, weeks and days — plus the exact day total for deadlines and planning.",
      intro: [
        "How long is a project run, a rental term, a trial window or a long-distance relationship? Pick two dates and this tool reports the calendar span — whole years, months and days — alongside the raw totals: every day between them, the weeks plus leftover days, and the count of full months.",
        "The answer is symmetric: whichever date comes first, the span is the same, because the tool measures distance rather than age. Month boundaries follow the calendar, so a month from 31 January means 28 or 29 February, and leap days inside a range are counted like any other day.",
      ],
      steps: [
        "Enter the two dates in either order.",
        "Read the calendar span in years, months and days.",
        "Check the totals: all days, weeks plus remaining days, and full months.",
        "Swap one date to test scenarios — new deadline, new span, instantly.",
      ],
      faqs: [
        {
          q: "Is the end date included in the total?",
          a: "No. The count measures the gap between the dates, so March 1 to March 2 is 1 day. If you need both endpoints counted — for example booking nights or counting a range that must cover both Fridays — add 1 day, or use the workdays calculator which counts inclusively.",
        },
        {
          q: "What does \"1 month\" mean here?",
          a: "A calendar month, not 30 days. From 31 January to 28 February is 0 months 28 days, while 31 January to 1 March is 1 month 1 day — the month-end clamps to the shorter month exactly the way due-date conventions do.",
        },
        {
          q: "Does the order of the dates matter?",
          a: "Not at all. The tool measures the distance between them, so 2026-03-01 → 2026-11-01 and 2026-11-01 → 2026-03-01 produce the same span. This is deliberately different from the age calculator, where the birth date must come first.",
        },
        {
          q: "How are leap years handled?",
          a: "As real calendar days. A range covering 29 February counts 366 days for that year, and spans across several leap years simply accumulate the extra days — no approximations and no 365.25 averages.",
        },
      ],
    },
    zh: {
      name: "日期差计算器",
      tagline: "用日历月、周和天数度量两个日期的距离——并给出截止日与规划所需的精确总天数。",
      intro: [
        "一个项目跑多久?租期、试用期、异地的日子有多长?选两个日期,本工具给出日历跨度——整年、整月加零头天数——同时附上原始总量:中间所有天数、周数加余数,以及完整月数。",
        "结果是对称的:谁先谁后都一样,因为这里度量的是距离而不是年龄。月份边界遵循真实日历:1 月 31 日的“一个月”是 2 月 28 或 29 日,区间内的闰日和其他日子一样被计入。",
      ],
      steps: [
        "以任意顺序输入两个日期。",
        "查看以年、月、日表示的日历跨度。",
        "查看总量:全部天数、周数加剩余天数、完整月数。",
        "改一个日期即可测试新场景——新截止日、新跨度,即时可得。",
      ],
      faqs: [
        {
          q: "结束日期算进总数吗?",
          a: "不算。这里度量的是两天的间隔,3 月 1 日到 3 月 2 日是 1 天。如果需要两端都计入——比如订房晚数、或必须覆盖两个周五的区间——加 1 天即可,或者改用按两端计入的工作日计算器。",
        },
        {
          q: "这里的“一个月”是什么意思?",
          a: "指日历月,不是 30 天。1 月 31 日到 2 月 28 日是 0 个月 28 天;1 月 31 日到 3 月 1 日是 1 个月 1 天——月末会收敛到较短的月份,与到期日惯例一致。",
        },
        {
          q: "两个日期的先后有影响吗?",
          a: "没有。工具度量的是距离,2026-03-01 → 2026-11-01 和 2026-11-01 → 2026-03-01 的跨度相同。这与年龄计算器刻意不同——年龄必须出生日在前。",
        },
        {
          q: "闰年怎么处理?",
          a: "按真实日历日处理。覆盖 2 月 29 日的区间当年就按 366 天计,跨多个闰年的跨度把多出的天数如实累加——没有近似,也没有 365.25 的平均。",
        },
      ],
    },
    ja: {
      name: "日付差計算",
      tagline: "2 つの日付の間を暦のか月・週・日で測定。期日と計画に必要な総日数も正確に出します。",
      intro: [
        "プロジェクトはどれだけ走るのか。賃貸期間、トライアル期間、遠距離の日々は? 日付を 2 つ選ぶと、このツールは暦の間隔——満年数・満か月数・残り日数——に加えて、生の総量も出します。間の全日数、週数と余り、満か月数です。",
        "結果は対称です。どちらが先でも間隔は同じ。「距離」を測るのであって「年齢」ではないからです。月の境目は暦に従い、1 月 31 日の「1 か月」は 2 月 28 日か 29 日を指し、期間内のうるう日は他の日と同じように数えます。",
      ],
      steps: [
        "2 つの日付をどちらの順でも入力します。",
        "年・か月・日の暦の間隔を読みます。",
        "総量を確認します。全日数、週数と残り日数、満か月数。",
        "日付を 1 つ変えればシナリオ比較——新しい期日、新しい間隔がすぐ分かります。",
      ],
      faqs: [
        {
          q: "終了日は合計に含まれますか?",
          a: "含まれません。この数は日付間の「間隔」で、3 月 1 日から 3 月 2 日なら 1 日です。両端を数えたい(宿泊数や、両方の金曜を覆う期間など)場合は 1 日を足すか、両端を含んで数える営業日カウンターを使ってください。",
        },
        {
          q: "ここでの「1 か月」とは?",
          a: "30 日ではなく暦の 1 か月です。1 月 31 日から 2 月 28 日までは 0 か月 28 日、1 月 31 日から 3 月 1 日までは 1 か月 1 日。月末日講は支払期日の慣行と同じように短い月へ収まります。",
        },
        {
          q: "日付の順番は関係ありますか?",
          a: "ありません。間隔を測るので、2026-03-01 → 2026-11-01 と 2026-11-01 → 2026-03-01 は同じ間隔になります。生年月日を先にしなければならない年齢計算とは、意図的に異なります。",
        },
        {
          q: "うるう年はどう扱われますか?",
          a: "実在する暦日として扱います。2 月 29 日を含む期間はその年 366 日として数え、複数のうるう年にまたがる間隔は余分な日をそのまま積み上げます。近似も 365.25 平均もありません。",
        },
      ],
    },
    es: {
      name: "Calculadora de diferencia de fechas",
      tagline:
        "Mide la distancia entre dos fechas en meses de calendario, semanas y días — más el total exacto para plazos y planificación.",
      intro: [
        "¿Cuánto dura un proyecto, un alquiler, un periodo de prueba o una relación a distancia? Elija dos fechas y esta herramienta informa del intervalo de calendario — años, meses y días completos — junto con los totales en bruto: cada día entre ellas, las semanas más los días sobrantes y el número de meses cumplidos.",
        "La respuesta es simétrica: da igual qué fecha va primero, el intervalo es el mismo, porque se mide distancia, no edad. Los límites de mes siguen el calendario: un mes desde el 31 de enero significa 28 o 29 de febrero, y los días bisiestos dentro del rango cuentan como cualquier otro día.",
      ],
      steps: [
        "Introduzca las dos fechas en cualquier orden.",
        "Lea el intervalo de calendario en años, meses y días.",
        "Consulte los totales: todos los días, semanas más días restantes y meses completos.",
        "Cambie una fecha para probar escenarios — nuevo plazo, nuevo intervalo, al instante.",
      ],
      faqs: [
        {
          q: "¿La fecha final entra en el total?",
          a: "No. La cuenta mide la separación entre las fechas: del 1 de marzo al 2 de marzo es 1 día. Si necesita contar los dos extremos — noches reservadas o un rango que deba cubrir ambos viernes — sume 1 día, o use la calculadora de días hábiles, que cuenta de forma inclusiva.",
        },
        {
          q: "¿Qué significa aquí «1 mes»?",
          a: "Un mes de calendario, no 30 días. Del 31 de enero al 28 de febrero hay 0 meses y 28 días; del 31 de enero al 1 de marzo, 1 mes y 1 día. El fin de mes se ajusta al mes corto igual que las convenciones de vencimiento.",
        },
        {
          q: "¿Importa el orden de las fechas?",
          a: "Para nada. La herramienta mide la distancia entre ellas: 2026-03-01 → 2026-11-01 y 2026-11-01 → 2026-03-01 dan el mismo intervalo. Es distinto a propósito de la calculadora de edad, donde la fecha de nacimiento va primero.",
        },
        {
          q: "¿Cómo se manejan los años bisiestos?",
          a: "Como días de calendario reales. Un rango que cubre el 29 de febrero cuenta 366 días ese año, y los tramos de varios años bisiestos acumulan los días extra — sin aproximaciones ni promedios de 365,25.",
        },
      ],
    },
    pt: {
      name: "Calculadora de diferença de datas",
      tagline:
        "Mede a distância entre duas datas em meses de calendário, semanas e dias — mais o total exato para prazos e planejamento.",
      intro: [
        "Quanto dura um projeto, um aluguel, um período de teste ou uma relação a distância? Escolha duas datas e esta ferramenta informa o intervalo de calendário — anos, meses e dias completos — junto com os totais brutos: cada dia entre elas, as semanas mais os dias que sobram e a quantidade de meses completos.",
        "A resposta é simétrica: tanto faz qual data vem primeiro, o intervalo é o mesmo, porque aqui se mede distância, não idade. As viradas de mês seguem o calendário: um mês a partir de 31 de janeiro significa 28 ou 29 de fevereiro, e os dias bissextos dentro do intervalo contam como qualquer outro.",
      ],
      steps: [
        "Informe as duas datas em qualquer ordem.",
        "Leia o intervalo de calendário em anos, meses e dias.",
        "Confira os totais: todos os dias, semanas mais dias restantes e meses completos.",
        "Troque uma data para testar cenários — novo prazo, novo intervalo, na hora.",
      ],
      faqs: [
        {
          q: "A data final entra no total?",
          a: "Não. A contagem mede a distância entre as datas: de 1 de março a 2 de março é 1 dia. Se precisar contar as duas pontas — diárias reservadas ou um intervalo que deva cobrir as duas sextas — some 1 dia, ou use a calculadora de dias úteis, que conta de forma inclusiva.",
        },
        {
          q: "O que significa \"1 mês\" aqui?",
          a: "Um mês de calendário, não 30 dias. De 31 de janeiro a 28 de fevereiro são 0 meses e 28 dias; de 31 de janeiro a 1º de março, 1 mês e 1 dia. O fim de mês encaixa no mês curto exatamente como as convenções de vencimento.",
        },
        {
          q: "A ordem das datas importa?",
          a: "Nada. A ferramenta mede a distância entre elas: 2026-03-01 → 2026-11-01 e 2026-11-01 → 2026-03-01 dão o mesmo intervalo. É diferente de propósito da calculadora de idade, onde a data de nascimento vem primeiro.",
        },
        {
          q: "Como os anos bissextos são tratados?",
          a: "Como dias de calendário reais. Um intervalo que cobre 29 de fevereiro conta 366 dias naquele ano, e trechos de vários anos bissextos simplesmente acumulam os dias extras — sem aproximações e sem médias de 365,25.",
        },
      ],
    },
  },
});
