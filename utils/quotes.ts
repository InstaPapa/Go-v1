// utils/quotes.ts
const quotes = [
  "Ты сильнее, чем думаешь.",
  "Каждый шаг — это прогресс.",
  "Делай сегодня то, за что завтра скажешь себе спасибо.",
  "Перестань ждать. Начни делать.",
  "Сначала трудно, потом привычка.",
  "У тебя всё получится. Без вариантов.",
  "Преврати каждую пробежку в достижение",
];

export function getRandomQuote(): string {
  const index = Math.floor(Math.random() * quotes.length);
  return quotes[index];
}