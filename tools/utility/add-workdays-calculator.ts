import { WorkdaysEngine } from "../_engines/engine-workdays";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "add-workdays-calculator",
  category: "utility",
  icon: "rotate",
  featured: true,
  engine: { component: WorkdaysEngine, props: { mode: "add" } },
  related: ["workdays-calculator", "date-difference-calculator", "age-calculator", "sleep-calculator"],
  copy: {
    en: {
      name: "Add Workdays Calculator",
      tagline:
        "Move N working days forward or backward from any date and land on the exact result — contract and SLA deadlines without a spreadsheet.",
      intro: [
        "\"Payment due 10 business days after invoice\" and \"ship within 3 workdays\" need a landing date, not a count. Give this tool a starting date and a number of workdays, and it steps through the calendar skipping weekends and your holidays until the count runs out — then shows the exact date it lands on, weekday included.",
        "The direction flips to backward for deadlines counted the other way, and the same weekend rule and holiday list as the workdays counter apply here. The stepping uses whole UTC days, so the result is identical in every time zone and never shifts across a daylight-saving boundary.",
      ],
      steps: [
        "Enter the starting date.",
        "Choose forward or backward and type how many workdays to move.",
        "Set the weekend rule and paste holidays if your calendar differs from the default.",
        "Read the landing date with its weekday — that is your deadline or delivery day.",
      ],
      faqs: [
        {
          q: "Does the starting date itself count as one of the workdays?",
          a: "No — it is the launch pad, not a step. Friday plus 1 workday lands on Monday, and Saturday plus 1 also lands on Monday. To count a span instead of moving from a date, use the workdays calculator.",
        },
        {
          q: "Can I move backwards to find when a clock started?",
          a: "Yes. Pick backward and enter the number of workdays — handy when a policy says \"written notice at least 10 business days before\" and you know the target date. Holidays and the weekend rule apply to backward steps exactly as to forward ones.",
        },
        {
          q: "How do holidays change the landing date?",
          a: "Every holiday you list is skipped like a weekend day, pushing the landing later by however many holidays fall on the path. Wednesday plus 1 workday with Thursday listed as a holiday lands on Friday.",
        },
        {
          q: "Which conventions does this follow?",
          a: "Excel's WORKDAY semantics: the start date is not consumed, zero days returns the start date unchanged, and only whole numbers of workdays are accepted. Invalid dates return an explicit error rather than a silently wrong date.",
        },
      ],
    },
    zh: {
      name: "加减工作日计算器",
      tagline: "从任意日期往前或往后数 N 个工作日,给出精确落点——合同与 SLA 截止日不再需要表格。",
      intro: [
        "“发票后 10 个工作日内付款”“3 个工作日内发货”,要的是落点日期,不是个数。给这个工具一个起始日期和工作日数,它会在日历上逐天走,跳过周末与你列出的节假日,数满为止——然后显示落点日期和星期。",
        "方向可以切换为往前,适合反过来计数的截止日;周末规则与节假日清单和工作日统计工具完全一致。逐天步进基于 UTC 整数天数,结果在任何时区都相同,也不会跨夏令时漂移。",
      ],
      steps: [
        "输入起始日期。",
        "选择往后或往前,填入要移动的工作日数。",
        "按需设置周末规则,并粘贴节假日。",
        "查看落点日期与星期——那就是你的截止日或交付日。",
      ],
      faqs: [
        {
          q: "起始日期本身算不算一个工作日?",
          a: "不算——它是起跳点,不是一步。周五加 1 个工作日落在下周一;周六加 1 个同样落在下周一。要统计区间而不是移动,请用工作日计算器。",
        },
        {
          q: "能往回数,倒推时钟从哪天开始吗?",
          a: "可以。选“往前”并输入工作日数——适合“提前至少 10 个工作日书面通知”这类规则,而你知道目标日期的情况。节假日与周末规则对往前、往后同样生效。",
        },
        {
          q: "节假日会如何改变落点?",
          a: "你列出的每个节假日都像周末一样被跳过,路径上每多一个节假日,落点就后移一天。周三加 1 个工作日、周四被列为节假日时,落点在周五。",
        },
        {
          q: "遵循什么约定?",
          a: "Excel 的 WORKDAY 语义:起点不消耗计数,0 天原样返回起点,只接受整数个工作日数。日期非法时会明确报错,而不是悄悄给出错误日期。",
        },
      ],
    },
    ja: {
      name: "営業日加減ツール",
      tagline: "基準日から N 営業日前後した日付を正確に算出。契約や SLA の期日計算を表計算なしで。",
      intro: [
        "「請求書から 10 営業日以内に支払い」「3 営業日以内に発送」——必要なのは個数ではなく到着日です。開始日と営業日数を渡すと、このツールは週末と祝日リストを避けながら暦を 1 日ずつ進み、数え切った日の日付と曜日を示します。",
        "方向を「戻る」に切り替えれば、逆に数える期日にも対応。週末の定義と祝日リストは営業日カウンターと共通です。1 日ずつの移動は UTC の整数日数で行うので、タイムゾーンが違っても結果は同じ、サマータイムの境界でもずれません。",
      ],
      steps: [
        "開始日を入力します。",
        "進むか戻るかを選び、移動する営業日数を入力します。",
        "既定と違う暦なら、週末の定義を変え、祝日を貼り付けます。",
        "曜日付きの到着日を読みます——それが期日または納期です。",
      ],
      faqs: [
        {
          q: "開始日自体も 1 営業日として数えますか?",
          a: "数えません。開始日は踏み台であり、ステップではありません。金曜 + 1 営業日は月曜、土曜 + 1 営業日も月曜に着地します。移動ではなく期間を数えたい場合は営業日カウンターをどうぞ。",
        },
        {
          q: "逆算で開始日を求められますか?",
          a: "できます。「戻る」を選んで営業日数を入力してください。「少なくとも 10 営業日前に書面通知」のような規則で、期日は分かっている場合に便利です。祝日と週末の設定は前方も後方も同じように効きます。",
        },
        {
          q: "祝日があると到着日はどう変わりますか?",
          a: "リストした祝日は週末と同様にスキップされ、経路上の祝日ぶんだけ到着が後ろへずれます。水曜 + 1 営業日で木曜が祝日なら、到着は金曜です。",
        },
        {
          q: "どの規則に従っていますか?",
          a: "Excel の WORKDAY 準拠です。開始日は消費されず、0 日なら開始日をそのまま返し、営業日数は整数のみ受け付けます。無効な日付は黙って誤った日を返すのではなく、明示的にエラーになります。",
        },
      ],
    },
    es: {
      name: "Calculadora de sumar días hábiles",
      tagline:
        "Avance o retroceda N días hábiles desde cualquier fecha y caiga en el resultado exacto — vencimientos de contratos y SLA sin hoja de cálculo.",
      intro: [
        "«Pago a 10 días hábiles de la factura» y «envío en 3 días hábiles» piden una fecha de llegada, no un número. Dele a esta herramienta una fecha de partida y una cantidad de días hábiles: recorrerá el calendario saltando fines de semana y sus festivos hasta agotar la cuenta, y le mostrará la fecha exacta con su día de la semana.",
        "La dirección se invierte para los plazos que cuentan al revés, y aquí valen la misma regla de fin de semana y la misma lista de festivos que en el contador de días hábiles. El avance usa días UTC enteros, así que el resultado es idéntico en cualquier zona horaria y nunca se desvía en un cambio de horario.",
      ],
      steps: [
        "Introduzca la fecha de partida.",
        "Elija adelante o atrás y escriba cuántos días hábiles avanzar.",
        "Fije la regla de fin de semana y pegue los festivos si su calendario difiere.",
        "Lea la fecha de llegada con su día de la semana — ese es su vencimiento o entrega.",
      ],
      faqs: [
        {
          q: "¿La fecha inicial cuenta como uno de los días hábiles?",
          a: "No — es el trampolín, no un paso. Viernes más 1 día hábil cae en lunes, y sábado más 1 también cae en lunes. Para contar un intervalo en vez de moverse, use la calculadora de días hábiles.",
        },
        {
          q: "¿Puedo retroceder para saber cuándo empezó un plazo?",
          a: "Sí. Elija atrás e indique los días hábiles — útil cuando una norma exige «notificación escrita al menos 10 días hábiles antes» y usted conoce la fecha objetivo. Los festivos y la regla de fin de semana se aplican igual hacia atrás.",
        },
        {
          q: "¿Cómo cambian los festivos la fecha de llegada?",
          a: "Cada festivo que liste se salta como un día de fin de semana y retrasa la llegada en tantos días como festivos haya en el camino. Miércoles más 1 día hábil, con el jueves como festivo, cae en viernes.",
        },
        {
          q: "¿Qué convenciones sigue?",
          a: "La semántica de WORKDAY de Excel: la fecha inicial no se consume, con cero días se devuelve la fecha tal cual y solo se aceptan números enteros de días. Una fecha inválida produce un error explícito, nunca una fecha silenciosamente equivocada.",
        },
      ],
    },
    pt: {
      name: "Calculadora de somar dias úteis",
      tagline:
        "Avance ou recue N dias úteis a partir de qualquer data e caia no resultado exato — prazos de contrato e SLA sem planilha.",
      intro: [
        "\"Pagamento em 10 dias úteis após a fatura\" e \"envio em 3 dias úteis\" pedem uma data de chegada, não um número. Dê a esta ferramenta uma data de partida e uma quantidade de dias úteis: ela percorre o calendário pulando fins de semana e seus feriados até esgotar a contagem, e mostra a data exata com o dia da semana.",
        "A direção inverte para prazos contados ao contrário, e valem aqui a mesma regra de fim de semana e a mesma lista de feriados da calculadora de dias úteis. O avanço usa dias UTC inteiros, então o resultado é idêntico em qualquer fuso e nunca desloca numa transição de horário.",
      ],
      steps: [
        "Informe a data de partida.",
        "Escolha avançar ou recuar e digite quantos dias úteis mover.",
        "Defina a regra de fim de semana e cole os feriados se o seu calendário for diferente.",
        "Leia a data de chegada com o dia da semana — esse é o seu prazo ou entrega.",
      ],
      faqs: [
        {
          q: "A data inicial conta como um dos dias úteis?",
          a: "Não — ela é o ponto de partida, não um passo. Sexta mais 1 dia útil cai na segunda, e sábado mais 1 também cai na segunda. Para contar um intervalo em vez de se mover, use a calculadora de dias úteis.",
        },
        {
          q: "Posso recuar para descobrir quando um prazo começou?",
          a: "Sim. Escolha recuar e informe os dias úteis — útil quando uma regra exige \"aviso por escrito com pelo menos 10 dias úteis de antecedência\" e você já sabe a data-alvo. Feriados e a regra de fim de semana valem igual para trás.",
        },
        {
          q: "Como os feriados mudam a data de chegada?",
          a: "Cada feriado listado é pulado como um dia de fim de semana e atrasa a chegada em tantos dias quantos estejam no caminho. Quarta mais 1 dia útil, com quinta como feriado, cai na sexta.",
        },
        {
          q: "Quais convenções são seguidas?",
          a: "A semântica do WORKDAY do Excel: a data inicial não é consumida, zero dias devolve a data como está e só se aceitam números inteiros de dias. Data inválida gera um erro explícito, nunca uma data silenciosamente errada.",
        },
      ],
    },
  },
});
