// ✏️ CUSTOMIZE EVERYTHING HERE — no need to touch the other files.
var CONFIG = {
  // Your name (shown at the end). Can also be set per link:  ?from=Raj
  yourName: "Your Name",

  // Her name. Leave "" to not show a name. Can also be set per link:  ?to=Sara
  herName: "",

  // Your WhatsApp number: country code + number, digits only (91 = India)
  whatsapp: "918005310750",

  // Page title shown in the browser tab
  pageTitle: "I have a question for you 💌",

  // Questions. mode "dodge" = the No button runs away,
  // mode "cycle" = No keeps changing text then turns into Yes.
  // Use {name} to insert her name (e.g. "Hey{name}…" → "Hey, Sara…")
  rounds: [
    { emoji: "💌", title: "Hey{name}… I have a question", sub: "Promise it’s a nice one.",
      yes: "Okay, ask me 😊", no: "Not now", mode: "cycle",
      noTexts: ["Are you sure? 🥺", "Pretty please?", "Just listen 🥹"] },

    { emoji: "😏", title: "First, be honest…", sub: "Do you think I’m kind of cute?",
      yes: "Yes, very 😍", no: "No", mode: "dodge" },

    { emoji: "🥰", title: "Do you like talking to me?", sub: "Think carefully. The wrong answer is hard to click.",
      yes: "Yes, always 💕", no: "No", mode: "cycle",
      noTexts: ["Really? 😢", "Try again 🥺", "Wrong button 😅", "Last chance 💔"] },

    { emoji: "🌹", title: "Will you go on a date with me{name}?", sub: "Coffee, food, a walk… you pick.",
      yes: "Yes! 💖", no: "No", mode: "dodge" },

    { emoji: "💘", title: "Last one… will you accept my love?", sub: "I’ll try my best to make you smile every day.",
      yes: "Yes, I accept ❤️", no: "No", mode: "cycle",
      noTexts: ["Think again 🥺", "My heart is breaking 💔", "Please? 🌹", "You know you want to 😘"] }
  ],

  // After she says YES
  yayTitle: "YAY!!! You said yes! 💖",
  yaySub: "You just made me the happiest person. Now pick our date:",
  activities: ["☕ Coffee", "🍽️ Dinner", "🎬 Movie", "🌅 Sunset walk", "🍦 Dessert", "🎡 Surprise me"],
  doneTitle: "It’s a date! 💞",

  // Colors
  accent: "#ff4d85",
  background1: "#ffe3ec",
  background2: "#ffd0e0"
};
