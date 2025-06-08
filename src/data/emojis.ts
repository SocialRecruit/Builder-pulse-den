export interface EmojiCategory {
  name: string;
  emojis: string[];
}

export const emojiCategories: EmojiCategory[] = [
  {
    name: "Häufig verwendet",
    emojis: ["📋", "✅", "⭐", "🔥", "💡", "🎯", "🚀", "💼", "📈", "🏆"],
  },
  {
    name: "Arbeit & Büro",
    emojis: [
      "💼",
      "📊",
      "📈",
      "📉",
      "📋",
      "📝",
      "✏️",
      "📎",
      "📌",
      "📁",
      "🗂️",
      "📄",
      "📃",
      "📑",
      "📜",
      "💻",
      "⌨️",
      "🖥️",
      "🖨️",
      "📠",
      "📞",
      "☎️",
      "📧",
      "📮",
      "📬",
      "📫",
      "📪",
      "📯",
      "📢",
      "📣",
    ],
  },
  {
    name: "Erfolg & Leistung",
    emojis: [
      "🏆",
      "🥇",
      "🥈",
      "🥉",
      "🎖️",
      "🏅",
      "⭐",
      "✨",
      "💫",
      "🌟",
      "🔥",
      "💪",
      "👍",
      "👏",
      "🙌",
      "✅",
      "☑️",
      "✔️",
      "💯",
      "🎯",
    ],
  },
  {
    name: "Pfeil & Richtung",
    emojis: [
      "➡️",
      "⬅️",
      "⬆️",
      "⬇️",
      "↗️",
      "↘️",
      "↙️",
      "↖️",
      "↕️",
      "↔️",
      "🔄",
      "🔃",
      "🔁",
      "🔂",
      "▶️",
      "⏸️",
      "⏹️",
      "⏺️",
      "⏭️",
      "⏮️",
    ],
  },
  {
    name: "Zahlen",
    emojis: [
      "1️⃣",
      "2️⃣",
      "3️⃣",
      "4️⃣",
      "5️⃣",
      "6️⃣",
      "7️⃣",
      "8️⃣",
      "9️⃣",
      "🔟",
      "#️⃣",
      "*️⃣",
      "0️⃣",
    ],
  },
  {
    name: "Symbole",
    emojis: [
      "💡",
      "🔍",
      "🔎",
      "❓",
      "❗",
      "❕",
      "❔",
      "‼️",
      "⁉️",
      "💭",
      "💬",
      "🗨️",
      "🗯️",
      "🔔",
      "🔕",
      "📣",
      "📢",
      "🔊",
      "🔉",
      "🔈",
    ],
  },
  {
    name: "Orte & Reisen",
    emojis: [
      "🏢",
      "🏬",
      "🏭",
      "🏛️",
      "🏗️",
      "🏘️",
      "🏙️",
      "🌍",
      "🌎",
      "🌏",
      "📍",
      "📌",
      "🗺️",
      "🧭",
      "🏠",
      "🏡",
      "🏘️",
      "🌆",
      "🌇",
      "🌃",
    ],
  },
  {
    name: "Zeit & Termine",
    emojis: [
      "⏰",
      "⏱️",
      "⏲️",
      "🕐",
      "🕑",
      "🕒",
      "🕓",
      "🕔",
      "🕕",
      "🕖",
      "📅",
      "📆",
      "🗓️",
      "⌚",
      "⏳",
      "⌛",
      "📱",
      "📲",
    ],
  },
  {
    name: "Personen & Teams",
    emojis: [
      "👤",
      "👥",
      "👨‍💼",
      "👩‍💼",
      "👨‍💻",
      "👩‍💻",
      "👨‍🔧",
      "👩‍🔧",
      "👨‍🏫",
      "👩‍🏫",
      "👨‍⚕️",
      "👩‍⚕️",
      "👨‍🍳",
      "👩‍🍳",
      "👨‍🎨",
      "👩‍🎨",
      "👨‍🚀",
      "👩‍🚀",
      "👨‍🔬",
      "👩‍🔬",
    ],
  },
];

export const searchEmojis = (query: string): string[] => {
  if (!query.trim()) return [];

  const lowerQuery = query.toLowerCase();
  const searchTerms = {
    // Deutsch
    arbeit: ["💼", "👨‍💼", "👩‍💼", "🏢", "📊"],
    erfolg: ["🏆", "⭐", "🥇", "💪", "🎯"],
    zeit: ["⏰", "📅", "⏱️", "🕐", "⏳"],
    geld: ["💰", "💵", "💎", "🪙", "💳"],
    team: ["👥", "🤝", "👨‍💼", "👩‍💼", "👫"],
    ziel: ["🎯", "🏹", "🔮", "🚀", "⭐"],
    idee: ["💡", "🧠", "💭", "✨", "🌟"],
    kommunikation: ["📞", "📧", "💬", "📢", "📣"],
    wachstum: ["📈", "🚀", "🌱", "⬆️", "📊"],
    qualität: ["⭐", "💎", "🏆", "✨", "👌"],

    // English
    work: ["💼", "👨‍💼", "👩‍💼", "🏢", "📊"],
    success: ["🏆", "⭐", "🥇", "💪", "🎯"],
    time: ["⏰", "📅", "⏱️", "🕐", "⏳"],
    money: ["💰", "💵", "💎", "🪙", "💳"],
    team: ["👥", "🤝", "👨‍💼", "👩‍💼", "👫"],
    goal: ["🎯", "🏹", "🔮", "🚀", "⭐"],
    idea: ["💡", "🧠", "💭", "✨", "🌟"],
    communication: ["📞", "📧", "💬", "📢", "📣"],
    growth: ["📈", "🚀", "🌱", "⬆️", "📊"],
    quality: ["⭐", "💎", "🏆", "✨", "👌"],
  };

  // Direkte Suche in Suchbegriffen
  for (const [term, emojis] of Object.entries(searchTerms)) {
    if (term.includes(lowerQuery) || lowerQuery.includes(term)) {
      return emojis;
    }
  }

  // Suche in allen Kategorien
  const allEmojis = emojiCategories.flatMap((category) => category.emojis);
  return allEmojis.filter((emoji) => {
    // Hier könnten emoji-Beschreibungen hinzugefügt werden
    return false; // Placeholder für erweiterte Suche
  });
};

export const getAllEmojis = (): string[] => {
  return emojiCategories.flatMap((category) => category.emojis);
};
