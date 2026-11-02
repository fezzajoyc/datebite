import { WorkdaysEngine } from "../_engines/engine-workdays";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "workdays-calculator",
  category: "utility",
  icon: "calc",
  featured: true,
  engine: { component: WorkdaysEngine, props: { mode: "between" } },
  related: ["add-workdays-calculator", "date-difference-calculator", "age-calculator", "sleep-calculator"],
  copy: {
    en: {
      name: "Workdays Calculator",
      tagline:
        "Count the working days inside any date range — both endpoints included, with your own weekend rule and a holiday list, DST-proof.",
      intro: [
        "Notice periods, sprint lengths, payroll runs and delivery windows live on business days, not calendar days. Type a start and an end date and this tool walks the range day by day, counting every day that is not a weekend and not on your holiday list. Monday through Friday is 5 — both endpoints count.",
        "The weekend rule is yours to pick: Saturday–Sunday or Friday–Saturday for regions that rest differently. Paste holidays one per line to subtract company closures and public holidays. The counting runs on whole UTC days, so a range that crosses a daylight-saving change comes out the same in every browser and every time zone.",
      ],
      steps: [
        "Enter the first and last date of the range — order does not matter.",
        "Optionally switch the weekend definition and paste holiday dates, one YYYY-MM-DD per line.",
        "Read the business-day count with its full breakdown: calendar days, weekend days and holidays dropped.",
        "Need a landing date instead of a count? Switch to the add-workdays tool on this site.",
      ],
      faqs: [
        {
          q: "Do the first and last dates count?",
          a: "Yes, both endpoints are included, so Monday 2026-11-02 through Friday 2026-11-06 is exactly 5 working days. A single weekday counts as 1, a single weekend day as 0.",
        },
        {
          q: "How should I enter holidays?",
          a: "One date per line in YYYY-MM-DD form, for example 2026-12-25. Blank lines and anything that is not a real date are ignored, duplicates are harmless, and a holiday that lands on your weekend changes nothing because that day was already excluded.",
        },
        {
          q: "Why does the result never drift by a day?",
          a: "Because the range is counted in whole UTC days rather than local timestamps. Local date arithmetic can miscount around daylight-saving transitions, while UTC day numbers are the same everywhere on Earth — a Mon–Fri week is 5 workdays regardless of where you are.",
        },
        {
          q: "What is the difference between this and adding workdays?",
          a: "This tool answers \"how many working days are in this window?\". The add-workdays calculator answers the reverse: \"if I count N working days from a date, where do I land?\". Both share the same weekend and holiday settings.",
        },
      ],
    },
    zh: {
      name: "工作日计算器",
      tagline: "统计任意日期区间里的工作日——两端都计入,支持自定义周末规则与节假日清单,不受夏令时影响。",
      intro: [
        "离职通知期、迭代长度、发薪周期、交货窗口都按工作日走,而不是日历日。输入起止日期,本工具逐天扫过整个区间,数出所有既非周末、又不在节假日清单里的日子。周一到周五是 5 天——两端都算。",
        "周末规则可以自选:周六周日,或周五周六(适合双休不同的地区)。节假日每行粘贴一个,自动扣除公司假期与法定假日。计数基于 UTC 整数天数,跨夏令时切换的区间在任何浏览器、任何时区结果一致。",
      ],
      steps: [
        "输入区间的首尾两个日期——先后顺序无所谓。",
        "按需切换周末定义,并逐行粘贴节假日(格式 YYYY-MM-DD)。",
        "查看带明细的工作日数:日历天数、周末天数、扣除的节假日。",
        "要的是落点日期而不是个数?请用本站的加减工作日工具。",
      ],
      faqs: [
        {
          q: "首尾两天算不算?",
          a: "算,两端都计入:2026-11-02(周一)到 2026-11-06(周五)正好 5 个工作日。单个工作日算 1,单个周末日算 0。",
        },
        {
          q: "节假日怎么填?",
          a: "每行一个日期,格式 YYYY-MM-DD,例如 2026-12-25。空行和不是真实日期的内容会被忽略,重复无副作用;落在周末上的节假日不会改变结果——那天本来就被排除了。",
        },
        {
          q: "为什么结果永远不会差一天?",
          a: "因为区间按完整的 UTC 天数统计,而不是本地时间戳。本地日期运算在夏令时切换附近可能数错,而 UTC 天数在地球上处处相同——周一到周五就是 5 个工作日,与你所在位置无关。",
        },
        {
          q: "这和“加减工作日”有什么区别?",
          a: "本工具回答“这段窗口里有多少个工作日”;加减工作日回答反过来的一半:“从某天数 N 个工作日会落在哪天”。两者共用同一套周末与节假日设置。",
        },
      ],
    },
    ja: {
      name: "営業日カウンター",
      tagline: "任意の期間に含まれる営業日を数えます。両端を含み、週末の定義と祝日リストも設定可能。サマータイムの影響はありません。",
      intro: [
        "退職予告期間、スプリント、給与締め、納期は暦日ではなく営業日で動きます。開始日と終了日を入力すると、このツールは期間を 1 日ずつたどり、週末でも祝日リストにも当たらない日を数えます。月曜から金曜なら 5 日——両端を含みます。",
        "週末の定義は選べます。土日付きでも金土付きでも。祝日は 1 行に 1 つずつ貼り付ければ、会社の休業日と祝日が差し引かれます。計算は UTC の整数日数で行うので、サマータイムをまたぐ期間でもブラウザもタイムゾーンも結果は変わりません。",
      ],
      steps: [
        "期間の最初と最後の日付を入力します。どちらが先でも構いません。",
        "必要なら週末の定義を切り替え、祝日を 1 行に 1 つ(YYYY-MM-DD)貼り付けます。",
        "内訳付きの営業日数を確認します。暦日数・週末日数・除外された祝日。",
        "個数ではなく到着日が知りたいときは、同サイトの営業日加減ツールへ。",
      ],
      faqs: [
        {
          q: "最初と最後の日付も数えますか?",
          a: "数えます。両端を含むので、2026-11-02(月)から 2026-11-06(金)はちょうど 5 営業日です。平日 1 日なら 1、週末 1 日なら 0 です。",
        },
        {
          q: "祝日はどう入力しますか?",
          a: "YYYY-MM-DD 形式で 1 行に 1 つ。例:2026-12-25。空行や実在しない日付は無視され、重複も無害です。週末に当たる祝日は結果を変えません。その日ははじめから除外されているからです。",
        },
        {
          q: "結果が 1 日ずれないのはなぜですか?",
          a: "期間をローカル時刻ではなく UTC の整数日数で数えているからです。ローカルの日付演算は DST 切替の前後で誤ることがありますが、UTC の日数は地球上どこでも同じ。月曜から金曜は 5 営業日です。",
        },
        {
          q: "営業日の加減とは何が違いますか?",
          a: "このツールは「この期間に営業日は何日あるか」に答えます。加減ツールは逆で「基準日から N 営業日を数えるとどの日か」に答えます。週末と祝日の設定は両者で共通です。",
        },
      ],
    },
    es: {
      name: "Calculadora de días hábiles",
      tagline:
        "Cuenta los días hábiles de cualquier rango de fechas — extremos incluidos, con su regla de fin de semana y lista de festivos, a prueba de horarios.",
      intro: [
        "Los preavisos, los sprints, las nóminas y las ventanas de entrega corren en días hábiles, no de calendario. Escriba una fecha inicial y una final y esta herramienta recorre el rango día a día, contando cada día que no es fin de semana ni está en su lista de festivos. De lunes a viernes son 5 — los dos extremos cuentan.",
        "La regla del fin de semana la elige usted: sábado y domingo, o viernes y sábado para las regiones que descansan distinto. Pegue los festivos de uno en uno para descontar cierres y días festivos. El conteo corre sobre días UTC enteros: un rango que cruza un cambio de horario da lo mismo en todos los navegadores y todas las zonas.",
      ],
      steps: [
        "Introduzca la primera y la última fecha del rango — el orden no importa.",
        "Si quiere, cambie la definición de fin de semana y pegue festivos, un AAAA-MM-DD por línea.",
        "Lea el recuento con su desglose completo: días de calendario, días de fin de semana y festivos descontados.",
        "¿Prefiere una fecha de llegada en vez de un número? Use la herramienta de sumar días hábiles de este sitio.",
      ],
      faqs: [
        {
          q: "¿La primera y la última fecha cuentan?",
          a: "Sí, los dos extremos se incluyen: del lunes 2026-11-02 al viernes 2026-11-06 son exactamente 5 días hábiles. Un solo día laborable cuenta 1 y un solo día de fin de semana, 0.",
        },
        {
          q: "¿Cómo introduzco los festivos?",
          a: "Una fecha por línea en formato AAAA-MM-DD, por ejemplo 2026-12-25. Las líneas vacías y lo que no sea una fecha real se ignoran, los duplicados no molestan y un festivo que caiga en fin de semana no cambia nada: ese día ya estaba excluido.",
        },
        {
          q: "¿Por qué el resultado nunca se desvía un día?",
          a: "Porque el rango se cuenta en días UTC enteros, no en marcas de tiempo locales. La aritmética local puede fallar alrededor de los cambios de horario, mientras que los días UTC son iguales en todo el planeta: de lunes a viernes son 5 días hábiles dondequiera que esté.",
        },
        {
          q: "¿En qué se diferencia de sumar días hábiles?",
          a: "Esta herramienta responde «cuántos días hábiles hay en esta ventana». La calculadora de sumar días hábiles responde lo inverso: «si cuento N días hábiles desde una fecha, ¿dónde caigo?». Ambas comparten los ajustes de fin de semana y festivos.",
        },
      ],
    },
    pt: {
      name: "Calculadora de dias úteis",
      tagline:
        "Conta os dias úteis de qualquer intervalo de datas — extremos incluídos, com sua regra de fim de semana e lista de feriados, imune ao horário de verão.",
      intro: [
        "Avisos prévios, sprints, folha de pagamento e prazos de entrega correm em dias úteis, não corridos. Informe uma data inicial e uma final e esta ferramenta percorre o intervalo dia a dia, contando cada dia que não é fim de semana nem está na sua lista de feriados. De segunda a sexta são 5 — as duas pontas contam.",
        "A regra do fim de semana você escolhe: sábado e domingo, ou sexta e sábado para regiões que descansam diferente. Cole os feriados um por linha para descontar recesso e feriados públicos. A contagem roda sobre dias UTC inteiros: um intervalo que cruza uma mudança de horário dá o mesmo resultado em qualquer navegador e qualquer fuso.",
      ],
      steps: [
        "Informe a primeira e a última data do intervalo — a ordem não importa.",
        "Se quiser, troque a definição de fim de semana e cole os feriados, um AAAA-MM-DD por linha.",
        "Leia a contagem com o detalhamento completo: dias corridos, dias de fim de semana e feriados descontados.",
        "Prefere uma data de chegada em vez de um número? Use a ferramenta de somar dias úteis deste site.",
      ],
      faqs: [
        {
          q: "A primeira e a última data contam?",
          a: "Sim, os dois extremos entram: de segunda 2026-11-02 a sexta 2026-11-06 são exatamente 5 dias úteis. Um único dia útil conta 1; um único dia de fim de semana, 0.",
        },
        {
          q: "Como informo os feriados?",
          a: "Uma data por linha no formato AAAA-MM-DD, por exemplo 2026-12-25. Linhas vazias e o que não for data real são ignorados, duplicatas não atrapalham e um feriado que caia no fim de semana não muda nada: esse dia já estava excluído.",
        },
        {
          q: "Por que o resultado nunca desvia um dia?",
          a: "Porque o intervalo é contado em dias UTC inteiros, não em carimbos de hora locais. Aritmética local pode errar perto das transições de horário de verão, enquanto os dias UTC são iguais no planeta inteiro: de segunda a sexta são 5 dias úteis onde você estiver.",
        },
        {
          q: "Qual a diferença para somar dias úteis?",
          a: "Esta ferramenta responde \"quantos dias úteis há nesta janela\". A calculadora de somar dias úteis responde o inverso: \"se eu contar N dias úteis a partir de uma data, em que dia caio\". As duas compartilham as mesmas configurações de fim de semana e feriados.",
        },
      ],
    },
  },
});
