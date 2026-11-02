import { SleepEngine } from "../_engines/engine-sleep";
import { defineTool } from "../_lib/types";

export default defineTool({
  slug: "sleep-calculator",
  category: "utility",
  icon: "moon",
  featured: true,
  engine: { component: SleepEngine },
  related: ["age-calculator", "date-difference-calculator", "workdays-calculator", "add-workdays-calculator"],
  copy: {
    en: {
      name: "Sleep Cycle Calculator",
      tagline:
        "Find the bedtime that catches a whole sleep cycle before your alarm — or what time a nap right now would end, in 90-minute cycles.",
      intro: [
        "Grogginess after a full night of sleep is often just waking mid-cycle. Sleep runs in roughly 90-minute cycles, and coming up between two of them feels dramatically lighter than being pulled out of deep sleep. Enter when your alarm rings and this tool lists the bedtimes — with 15 minutes added to fall asleep — that end a cycle right on time, from a full 9 hours down to a 4.5-hour minimum.",
        "The second direction answers the other late-night question: if you go to bed right now, when does each option let you get up? Every result is anchored to whole cycles, which is why the times look \"odd\" — 21:45 rather than 22:00. Your own cycle length varies from about 80 to 120 minutes, so treat the list as a target window rather than an exact prescription.",
      ],
      steps: [
        "Choose \"I want to wake up at\" and enter your alarm time.",
        "Pick a bedtime whose cycle count fits how much sleep you can afford tonight.",
        "Or switch to \"sleeping right now\" and see the wake-up times for the moment you lie down.",
        "Aim to wake at a cycle boundary — the shorter options are there for emergencies, not as a routine.",
      ],
      faqs: [
        {
          q: "Why 90 minutes?",
          a: "It is the textbook average length of one sleep cycle across all its stages. Real cycles run longer or shorter per person and per night — around 80 to 120 minutes — so the schedule works best as an anchor: pick the option closest to the sleep you need and let your body settle in.",
        },
        {
          q: "Where does the 15-minute figure come from?",
          a: "Sleep onset is not instant. The tool reserves about 15 minutes for lights-out to actually falling asleep. If you regularly drop off faster or slower, shift your chosen bedtime by the difference yourself.",
        },
        {
          q: "Is a 4.5-hour option a recommendation?",
          a: "No — it is the arithmetic floor of three whole cycles. Adults generally need 7 to 9 hours; the short rows exist because sometimes a fixed wake-up leaves no better choice, and finishing a cycle beats being cut out of one.",
        },
        {
          q: "Does this replace medical advice for sleep problems?",
          a: "It does not. Persistent trouble falling or staying asleep deserves a conversation with a doctor. This is a planning aid for ordinary nights, not a diagnostic tool.",
        },
      ],
    },
    zh: {
      name: "睡眠周期计算器",
      tagline: "算出能在闹钟前完整结束一个睡眠周期的就寝时间——或现在躺下几点能醒,按 90 分钟周期。",
      intro: [
        "睡了整晚还是昏沉?多半是在周期中间被闹钟拽醒的。睡眠以约 90 分钟为一个周期,在两个周期之间醒来会比从深睡中被叫醒轻快得多。输入闹钟时间,本工具列出能让周期准时结束的就寝时间——已含约 15 分钟入睡时间——从 9 小时满周期到 4.5 小时的下限都有。",
        "另一个方向回答深夜的另一问:现在就睡,几点能自然醒?所有结果都锚定在整周期上,所以时间看起来“不整”——是 21:45 而不是 22:00。个人周期在 80–120 分钟之间浮动,这份清单适合当目标窗口,而不是精确处方。",
      ],
      steps: [
        "选择“想在几点醒”,输入闹钟时间。",
        "按今晚睡得起的时长,挑一个周期数对应的就寝时间。",
        "或切到“现在就睡”,看你躺下的那一刻对应的各档醒来时间。",
        "尽量在周期边界醒来——短档是留给紧急情况的,不是常规作息。",
      ],
      faqs: [
        {
          q: "为什么是 90 分钟?",
          a: "这是教科书上单个睡眠周期(覆盖各睡眠阶段)的平均长度。真实周期因人因夜而异,约在 80–120 分钟之间,所以把它当锚点最合适:选最接近所需睡眠的档位,让身体去适应。",
        },
        {
          q: "15 分钟这个数字是怎么来的?",
          a: "入睡不是瞬时的。工具为“关灯到真正睡着”预留了约 15 分钟。如果你固定地更快或更慢入睡,自己把选定的时间平移这个差值即可。",
        },
        {
          q: "4.5 小时那一档是建议吗?",
          a: "不是——它只是三个完整周期的算术下限。成年人一般需要 7–9 小时;短档存在是因为有时起床时间是死的,别无选择,而“在周期边界结束”总好过“从周期中间被切断”。",
        },
        {
          q: "能替代睡眠问题的医疗建议吗?",
          a: "不能。长期入睡困难或易醒应当看医生。这是为平常夜晚准备的规划工具,不是诊断工具。",
        },
      ],
    },
    ja: {
      name: "睡眠サイクル計算",
      tagline: "アラームの直前に睡眠サイクルがちょうど終わる就寝時刻を算出。いま寝た場合の起床時刻も、90 分サイクルで。",
      intro: [
        "十分眠ったのに頭が重い——それはサイクルの途中で無理やり起こされているからかもしれません。睡眠は約 90 分で 1 サイクル。サイクルとサイクルの合間に起きると、深い睡眠の途中で起こされるよりずっと楽に目が覚めます。アラームの時刻を入力すると、入眠 15 分を含めてサイクルがちょうど終わる就寝時刻を、9 時間から 4.5 時間まで並べます。",
        "逆向きの質問にも答えます。「いま寝たら何時に起きられる?」。結果はすべてサイクル境界に合わせてあるため、時刻は 22:00 ではなく 21:45 のように中途半端に見えます。個人差は 80〜120 分あるので、リストは処方箋ではなく目安として。",
      ],
      steps: [
        "「起きたい時刻」を選び、アラームの時刻を入力します。",
        "今夜確保できる睡眠に合うサイクル数の就寝時刻を選びます。",
        "あるいは「いま寝る」に切り替え、横になった時点ごとの起床時刻を見ます。",
        "サイクルの境界で起きるのが目標。短い選択肢は緊急用で、常用向けではありません。",
      ],
      faqs: [
        {
          q: "なぜ 90 分なのですか?",
          a: "すべての睡眠段階を含む 1 サイクルの教科書的な平均が 90 分だからです。実際は人や夜によって 80〜120 分前後します。だからこそ目安として使い、必要な睡眠に最も近い選択肢を選んで体に合わせてください。",
        },
        {
          q: "15 分はどこから来ますか?",
          a: "入眠は瞬時ではありません。消灯してから実際に眠りに落ちるまで約 15 分を見ています。いつもより早く(遅く)眠れるなら、その差だけ時刻をずらせば大丈夫です。",
        },
        {
          q: "4.5 時間の選択肢は推奨ですか?",
          a: "いいえ。3 サイクルぶんという算術上の下限です。成人には一般に 7〜9 時間が必要です。短い行があるのは、起床時刻が固定されて選択の余地がない夜のため。サイクルを完走する方が、途中で切られるより良いからです。",
        },
        {
          q: "睡眠の悩みに対する医療アドバイスの代わりになりますか?",
          a: "なりません。入眠や継続睡眠の困難が続くなら医師に相談すべきです。これは普通の夜のための計画ツールであり、診断ツールではありません。",
        },
      ],
    },
    es: {
      name: "Calculadora de ciclos de sueño",
      tagline:
        "Halle la hora de acostarse que completa un ciclo de sueño antes del despertador — o a qué hora despertaría si se duerme ahora, en ciclos de 90 minutos.",
      intro: [
        "Esa pesadez tras dormir toda la noche suele ser despertar a mitad de ciclo. El sueño avanza en ciclos de unos 90 minutos, y salir entre dos de ellos se siente mucho más ligero que que lo saquen del sueño profundo. Diga cuándo suena la alarma y esta herramienta lista las horas de acostarse — con 15 minutos para conciliar el sueño — que terminan un ciclo justo a tiempo, de 9 horas completas a un mínimo de 4,5.",
        "La otra dirección responde la otra pregunta nocturna: si me acuesto ahora, ¿a qué hora puedo levantarme con cada opción? Todos los resultados se anclan a ciclos completos, por eso las horas parecen «raras» — 21:45 en vez de 22:00. Su ciclo propio varía entre unos 80 y 120 minutos: tome la lista como ventana de referencia, no como receta exacta.",
      ],
      steps: [
        "Elija «Quiero despertar a las» e introduzca la hora del despertador.",
        "Escoja la hora de acostarse cuyo número de ciclos encaje con el sueño que puede pagarse esta noche.",
        "O pase a «dormir ahora mismo» y vea las horas de despertar para el momento en que se acuesta.",
        "Apunte a despertar en un borde de ciclo — las opciones cortas son para emergencias, no para la rutina.",
      ],
      faqs: [
        {
          q: "¿Por qué 90 minutos?",
          a: "Es la duración media de manual de un ciclo de sueño con todas sus fases. Los ciclos reales varían por persona y por noche — entre 80 y 120 minutos — así que lo mejor es usarlo como ancla: elija la opción más cercana al sueño que necesita y deje que el cuerpo se acomode.",
        },
        {
          q: "¿De dónde sale el dato de 15 minutos?",
          a: "Conciliar el sueño no es instantáneo. La herramienta reserva unos 15 minutos entre apagar la luz y quedarse dormido. Si usted se duerme sistemáticamente antes o después, desplace usted mismo la hora elegida esa diferencia.",
        },
        {
          q: "¿La opción de 4,5 horas es una recomendación?",
          a: "No — es el suelo aritmético de tres ciclos completos. Los adultos necesitan por lo general de 7 a 9 horas; las filas cortas existen porque a veces el despertar es fijo y no hay alternativa, y terminar un ciclo es mejor que quedarse a medias.",
        },
        {
          q: "¿Sustituye el consejo médico para problemas de sueño?",
          a: "No lo hace. Si le cuesta dormir o mantener el sueño de forma persistente, hable con un médico. Es una ayuda de planificación para noches corrientes, no una herramienta de diagnóstico.",
        },
      ],
    },
    pt: {
      name: "Calculadora de ciclos de sono",
      tagline:
        "Descubra a hora de dormir que fecha um ciclo de sono antes do despertador — ou que horas um cochilo agora terminaria, em ciclos de 90 minutos.",
      intro: [
        "Aquela moleza depois de uma noite inteira de sono costuma ser despertar no meio de um ciclo. O sono avança em ciclos de cerca de 90 minutos, e sair entre dois deles é muito mais leve do que ser arrancado do sono profundo. Diga quando o alarme toca e esta ferramenta lista os horários de dormir — com 15 minutos para pegar no sono — que encerram um ciclo na hora certa, de 9 horas completas a um mínimo de 4,5.",
        "A outra direção responde a outra pergunta da madrugada: se eu dormir agora, a que horas acordo em cada opção? Todos os resultados ficam ancorados em ciclos completos, por isso as horas parecem \"quebradas\" — 21:45 em vez de 22:00. Seu ciclo pessoal varia entre 80 e 120 minutos: use a lista como janela de referência, não como receita exata.",
      ],
      steps: [
        "Escolha \"Quero acordar às\" e informe a hora do despertador.",
        "Escolha o horário de dormir cujo número de ciclos caiba no sono que dá para ter hoje.",
        "Ou passe para \"dormir agora\" e veja os horários de acordar a partir do momento em que se deita.",
        "Busque acordar numa fronteira de ciclo — as opções curtas servem para emergências, não para a rotina.",
      ],
      faqs: [
        {
          q: "Por que 90 minutos?",
          a: "É a duração média de manual de um ciclo de sono com todas as suas fases. Ciclos reais variam por pessoa e por noite — entre 80 e 120 minutos — então o melhor é usar como âncora: escolha a opção mais próxima do sono de que precisa e deixe o corpo se ajustar.",
        },
        {
          q: "De onde vem o número de 15 minutos?",
          a: "Pegar no sono não é instantâneo. A ferramenta reserva cerca de 15 minutos entre apagar a luz e adormecer de fato. Se você demora mais ou menos sempre, desloque o horário escolhido por essa diferença.",
        },
        {
          q: "A opção de 4,5 horas é uma recomendação?",
          a: "Não — é o piso aritmético de três ciclos completos. Adultos precisam em geral de 7 a 9 horas; as linhas curtas existem porque às vezes a hora de acordar é fixa e não há alternativa, e terminar um ciclo é melhor do que ser cortado no meio.",
        },
        {
          q: "Substitui orientação médica para problemas de sono?",
          a: "Não substitui. Dificuldade persistente para dormir ou manter o sono merece uma conversa com médico. Este é um auxílio de planejamento para noites comuns, não uma ferramenta de diagnóstico.",
        },
      ],
    },
  },
});
