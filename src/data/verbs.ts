export type AuxVerb = "haben" | "sein";

export interface VerbEntry {
  english: string;
  auxiliary: AuxVerb;
  partizip2: string;
  /** [ich, du, er/sie/es, wir, ihr, sie/Sie] */
  present: [string, string, string, string, string, string];
  prateritumIch: string; // ich & er/sie/es share the same Präteritum in German
}

// ── Irregular verbs ──────────────────────────────────────────────────────────
export const IRREGULAR_VERBS: Record<string, VerbEntry> = {
  sein: {
    english: "to be",
    auxiliary: "sein",
    partizip2: "gewesen",
    present: ["bin", "bist", "ist", "sind", "seid", "sind"],
    prateritumIch: "war",
  },
  haben: {
    english: "to have",
    auxiliary: "haben",
    partizip2: "gehabt",
    present: ["habe", "hast", "hat", "haben", "habt", "haben"],
    prateritumIch: "hatte",
  },
  werden: {
    english: "to become / will (future)",
    auxiliary: "sein",
    partizip2: "geworden",
    present: ["werde", "wirst", "wird", "werden", "werdet", "werden"],
    prateritumIch: "wurde",
  },
  gehen: {
    english: "to go",
    auxiliary: "sein",
    partizip2: "gegangen",
    present: ["gehe", "gehst", "geht", "gehen", "geht", "gehen"],
    prateritumIch: "ging",
  },
  kommen: {
    english: "to come",
    auxiliary: "sein",
    partizip2: "gekommen",
    present: ["komme", "kommst", "kommt", "kommen", "kommt", "kommen"],
    prateritumIch: "kam",
  },
  fahren: {
    english: "to drive / travel",
    auxiliary: "sein",
    partizip2: "gefahren",
    present: ["fahre", "fährst", "fährt", "fahren", "fahrt", "fahren"],
    prateritumIch: "fuhr",
  },
  fliegen: {
    english: "to fly",
    auxiliary: "sein",
    partizip2: "geflogen",
    present: ["fliege", "fliegst", "fliegt", "fliegen", "fliegt", "fliegen"],
    prateritumIch: "flog",
  },
  laufen: {
    english: "to run / walk",
    auxiliary: "sein",
    partizip2: "gelaufen",
    present: ["laufe", "läufst", "läuft", "laufen", "lauft", "laufen"],
    prateritumIch: "lief",
  },
  essen: {
    english: "to eat",
    auxiliary: "haben",
    partizip2: "gegessen",
    present: ["esse", "isst", "isst", "essen", "esst", "essen"],
    prateritumIch: "aß",
  },
  trinken: {
    english: "to drink",
    auxiliary: "haben",
    partizip2: "getrunken",
    present: ["trinke", "trinkst", "trinkt", "trinken", "trinkt", "trinken"],
    prateritumIch: "trank",
  },
  schlafen: {
    english: "to sleep",
    auxiliary: "haben",
    partizip2: "geschlafen",
    present: ["schlafe", "schläfst", "schläft", "schlafen", "schlaft", "schlafen"],
    prateritumIch: "schlief",
  },
  sehen: {
    english: "to see",
    auxiliary: "haben",
    partizip2: "gesehen",
    present: ["sehe", "siehst", "sieht", "sehen", "seht", "sehen"],
    prateritumIch: "sah",
  },
  lesen: {
    english: "to read",
    auxiliary: "haben",
    partizip2: "gelesen",
    present: ["lese", "liest", "liest", "lesen", "lest", "lesen"],
    prateritumIch: "las",
  },
  schreiben: {
    english: "to write",
    auxiliary: "haben",
    partizip2: "geschrieben",
    present: ["schreibe", "schreibst", "schreibt", "schreiben", "schreibt", "schreiben"],
    prateritumIch: "schrieb",
  },
  sprechen: {
    english: "to speak",
    auxiliary: "haben",
    partizip2: "gesprochen",
    present: ["spreche", "sprichst", "spricht", "sprechen", "sprecht", "sprechen"],
    prateritumIch: "sprach",
  },
  treffen: {
    english: "to meet",
    auxiliary: "haben",
    partizip2: "getroffen",
    present: ["treffe", "triffst", "trifft", "treffen", "trefft", "treffen"],
    prateritumIch: "traf",
  },
  helfen: {
    english: "to help",
    auxiliary: "haben",
    partizip2: "geholfen",
    present: ["helfe", "hilfst", "hilft", "helfen", "helft", "helfen"],
    prateritumIch: "half",
  },
  nehmen: {
    english: "to take",
    auxiliary: "haben",
    partizip2: "genommen",
    present: ["nehme", "nimmst", "nimmt", "nehmen", "nehmt", "nehmen"],
    prateritumIch: "nahm",
  },
  geben: {
    english: "to give",
    auxiliary: "haben",
    partizip2: "gegeben",
    present: ["gebe", "gibst", "gibt", "geben", "gebt", "geben"],
    prateritumIch: "gab",
  },
  lassen: {
    english: "to let / leave",
    auxiliary: "haben",
    partizip2: "gelassen",
    present: ["lasse", "lässt", "lässt", "lassen", "lasst", "lassen"],
    prateritumIch: "ließ",
  },
  bringen: {
    english: "to bring",
    auxiliary: "haben",
    partizip2: "gebracht",
    present: ["bringe", "bringst", "bringt", "bringen", "bringt", "bringen"],
    prateritumIch: "brachte",
  },
  denken: {
    english: "to think",
    auxiliary: "haben",
    partizip2: "gedacht",
    present: ["denke", "denkst", "denkt", "denken", "denkt", "denken"],
    prateritumIch: "dachte",
  },
  finden: {
    english: "to find",
    auxiliary: "haben",
    partizip2: "gefunden",
    present: ["finde", "findest", "findet", "finden", "findet", "finden"],
    prateritumIch: "fand",
  },
  kennen: {
    english: "to know (a person/place)",
    auxiliary: "haben",
    partizip2: "gekannt",
    present: ["kenne", "kennst", "kennt", "kennen", "kennt", "kennen"],
    prateritumIch: "kannte",
  },
  wissen: {
    english: "to know (a fact)",
    auxiliary: "haben",
    partizip2: "gewusst",
    present: ["weiß", "weißt", "weiß", "wissen", "wisst", "wissen"],
    prateritumIch: "wusste",
  },
  heißen: {
    english: "to be called / named",
    auxiliary: "haben",
    partizip2: "geheißen",
    present: ["heiße", "heißt", "heißt", "heißen", "heißt", "heißen"],
    prateritumIch: "hieß",
  },
  rufen: {
    english: "to call / shout",
    auxiliary: "haben",
    partizip2: "gerufen",
    present: ["rufe", "rufst", "ruft", "rufen", "ruft", "rufen"],
    prateritumIch: "rief",
  },
  tragen: {
    english: "to carry / wear",
    auxiliary: "haben",
    partizip2: "getragen",
    present: ["trage", "trägst", "trägt", "tragen", "tragt", "tragen"],
    prateritumIch: "trug",
  },
  fallen: {
    english: "to fall",
    auxiliary: "sein",
    partizip2: "gefallen",
    present: ["falle", "fällst", "fällt", "fallen", "fallt", "fallen"],
    prateritumIch: "fiel",
  },
  halten: {
    english: "to hold / stop",
    auxiliary: "haben",
    partizip2: "gehalten",
    present: ["halte", "hältst", "hält", "halten", "haltet", "halten"],
    prateritumIch: "hielt",
  },
  stehen: {
    english: "to stand",
    auxiliary: "haben",
    partizip2: "gestanden",
    present: ["stehe", "stehst", "steht", "stehen", "steht", "stehen"],
    prateritumIch: "stand",
  },
  liegen: {
    english: "to lie (be located)",
    auxiliary: "haben",
    partizip2: "gelegen",
    present: ["liege", "liegst", "liegt", "liegen", "liegt", "liegen"],
    prateritumIch: "lag",
  },
  sitzen: {
    english: "to sit",
    auxiliary: "haben",
    partizip2: "gesessen",
    present: ["sitze", "sitzt", "sitzt", "sitzen", "sitzt", "sitzen"],
    prateritumIch: "saß",
  },
  tun: {
    english: "to do",
    auxiliary: "haben",
    partizip2: "getan",
    present: ["tue", "tust", "tut", "tun", "tut", "tun"],
    prateritumIch: "tat",
  },
  waschen: {
    english: "to wash",
    auxiliary: "haben",
    partizip2: "gewaschen",
    present: ["wasche", "wäschst", "wäscht", "waschen", "wascht", "waschen"],
    prateritumIch: "wusch",
  },
  bitten: {
    english: "to ask / request",
    auxiliary: "haben",
    partizip2: "gebeten",
    present: ["bitte", "bittest", "bittet", "bitten", "bittet", "bitten"],
    prateritumIch: "bat",
  },
  wohnen: {
    english: "to live / reside",
    auxiliary: "haben",
    partizip2: "gewohnt",
    present: ["wohne", "wohnst", "wohnt", "wohnen", "wohnt", "wohnen"],
    prateritumIch: "wohnte",
  },
  // ── Modal verbs ──────────────────────────────────────────────────────────
  können: {
    english: "can / to be able to",
    auxiliary: "haben",
    partizip2: "gekonnt",
    present: ["kann", "kannst", "kann", "können", "könnt", "können"],
    prateritumIch: "konnte",
  },
  müssen: {
    english: "must / to have to",
    auxiliary: "haben",
    partizip2: "gemusst",
    present: ["muss", "musst", "muss", "müssen", "müsst", "müssen"],
    prateritumIch: "musste",
  },
  wollen: {
    english: "to want to",
    auxiliary: "haben",
    partizip2: "gewollt",
    present: ["will", "willst", "will", "wollen", "wollt", "wollen"],
    prateritumIch: "wollte",
  },
  dürfen: {
    english: "may / to be allowed to",
    auxiliary: "haben",
    partizip2: "gedurft",
    present: ["darf", "darfst", "darf", "dürfen", "dürft", "dürfen"],
    prateritumIch: "durfte",
  },
  sollen: {
    english: "should / to be supposed to",
    auxiliary: "haben",
    partizip2: "gesollt",
    present: ["soll", "sollst", "soll", "sollen", "sollt", "sollen"],
    prateritumIch: "sollte",
  },
  mögen: {
    english: "to like",
    auxiliary: "haben",
    partizip2: "gemocht",
    present: ["mag", "magst", "mag", "mögen", "mögt", "mögen"],
    prateritumIch: "mochte",
  },
};

// ── Separable verb prefixes ───────────────────────────────────────────────────
const SEPARABLE_PREFIXES = [
  "ab", "an", "auf", "aus", "bei", "durch", "ein", "fest", "fort",
  "her", "hin", "los", "mit", "nach", "um", "vor", "weg", "zu", "zurück",
];

export function detectSeparablePrefix(infinitive: string): string | null {
  for (const prefix of SEPARABLE_PREFIXES) {
    if (infinitive.startsWith(prefix) && infinitive.length > prefix.length + 2) {
      return prefix;
    }
  }
  return null;
}

// ── Regular verb conjugation algorithm ───────────────────────────────────────
function regularStem(infinitive: string): string {
  if (infinitive.endsWith("eln")) return infinitive.slice(0, -2); // sammeln → samml
  if (infinitive.endsWith("ern")) return infinitive.slice(0, -2); // wandern → wander
  return infinitive.slice(0, -2); // remove -en
}

function needsEInsert(stem: string): boolean {
  // stems ending in -t, -d, -chn, -ffn, -gn, -tm need -e- before -st/-t
  return /[td]$/.test(stem) || /[^aeiou]n$/.test(stem);
}

export interface ConjugationResult {
  infinitive: string;
  english: string;
  isIrregular: boolean;
  auxiliary: AuxVerb;
  partizip2: string;
  separablePrefix: string | null;
  present: {
    ich: string;
    du: string;
    "er/sie/es": string;
    wir: string;
    ihr: string;
    "sie/Sie": string;
  };
  prateritum: {
    ich: string;
    du: string;
    "er/sie/es": string;
    wir: string;
    ihr: string;
    "sie/Sie": string;
  };
  perfekt: {
    ich: string;
    du: string;
    "er/sie/es": string;
    wir: string;
    ihr: string;
    "sie/Sie": string;
  };
}

export function conjugate(input: string): ConjugationResult | null {
  const infinitive = input.trim().toLowerCase();
  if (!infinitive) return null;

  // Strip separable prefix to look up base verb
  const sepPrefix = detectSeparablePrefix(infinitive);
  const baseVerb = sepPrefix ? infinitive.slice(sepPrefix.length) : infinitive;

  // Check irregular table first (with and without prefix)
  const irregEntry = IRREGULAR_VERBS[infinitive] ?? IRREGULAR_VERBS[baseVerb];

  let present: ConjugationResult["present"];
  let prateritumIch: string;
  let partizip2: string;
  let auxiliary: AuxVerb;
  let english: string;
  let isIrregular: boolean;

  if (irregEntry) {
    isIrregular = true;
    auxiliary = irregEntry.auxiliary;
    partizip2 = irregEntry.partizip2;
    english = irregEntry.english;
    prateritumIch = irregEntry.prateritumIch;

    // If separable, adapt forms: aufstehen → stehe auf
    const [i, du, er, wir, ihr, sie] = irregEntry.present;
    if (sepPrefix && IRREGULAR_VERBS[baseVerb]) {
      present = {
        ich: `${i} ${sepPrefix}`,
        du: `${du} ${sepPrefix}`,
        "er/sie/es": `${er} ${sepPrefix}`,
        wir: `${wir} ${sepPrefix}`,
        ihr: `${ihr} ${sepPrefix}`,
        "sie/Sie": `${sie} ${sepPrefix}`,
      };
      partizip2 = `${sepPrefix}ge${irregEntry.partizip2.replace(/^ge/, "")}`;
    } else {
      present = { ich: i, du, "er/sie/es": er, wir, ihr, "sie/Sie": sie };
    }
  } else {
    // Regular conjugation
    isIrregular = false;
    auxiliary = "haben";
    english = "";
    const stem = regularStem(baseVerb);
    const eInsert = needsEInsert(stem);

    const forms = {
      ich: `${stem}e`,
      du: `${stem}${eInsert ? "est" : "st"}`,
      "er/sie/es": `${stem}${eInsert ? "et" : "t"}`,
      wir: `${stem}en`,
      ihr: `${stem}${eInsert ? "et" : "t"}`,
      "sie/Sie": `${stem}en`,
    };

    if (sepPrefix) {
      present = Object.fromEntries(
        Object.entries(forms).map(([k, v]) => [k, `${v} ${sepPrefix}`])
      ) as ConjugationResult["present"];
    } else {
      present = forms;
    }

    // Regular Partizip II
    const p2stem = regularStem(baseVerb);
    const p2 = `ge${p2stem}${eInsert ? "et" : "t"}`;
    partizip2 = sepPrefix ? `${sepPrefix}${p2}` : p2;

    // Regular Präteritum (weak verbs)
    prateritumIch = `${stem}${eInsert ? "ete" : "te"}`;
  }

  // Build Präteritum table
  const praetStem = prateritumIch.replace(/e$/, "").replace(/te$/, "t");
  const isWeakPraet = prateritumIch.endsWith("te");
  const prateritum: ConjugationResult["prateritum"] = isWeakPraet
    ? {
        ich: prateritumIch,
        du: `${praetStem}test`,
        "er/sie/es": prateritumIch,
        wir: `${praetStem}ten`,
        ihr: `${praetStem}tet`,
        "sie/Sie": `${praetStem}ten`,
      }
    : {
        ich: prateritumIch,
        du: `${prateritumIch}st`,
        "er/sie/es": prateritumIch,
        wir: `${prateritumIch}en`,
        ihr: `${prateritumIch}t`,
        "sie/Sie": `${prateritumIch}en`,
      };

  // Perfekt (auxiliary + Partizip II)
  const auxPresent =
    auxiliary === "sein"
      ? ["bin", "bist", "ist", "sind", "seid", "sind"]
      : ["habe", "hast", "hat", "haben", "habt", "haben"];
  const pronouns: (keyof ConjugationResult["perfekt"])[] = [
    "ich", "du", "er/sie/es", "wir", "ihr", "sie/Sie",
  ];
  const perfekt = Object.fromEntries(
    pronouns.map((p, i) => [p, `${auxPresent[i]} ${partizip2}`])
  ) as ConjugationResult["perfekt"];

  return {
    infinitive,
    english,
    isIrregular,
    auxiliary,
    partizip2,
    separablePrefix: sepPrefix,
    present,
    prateritum,
    perfekt,
  };
}
