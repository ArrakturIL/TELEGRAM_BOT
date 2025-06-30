// commands/start.js
export function registerStart(bot) {
  bot.start((ctx) => {
    ctx.reply(
      'Привет! Я эхо-бот на Telegraf. Отправь любое сообщение, и я повторю его.'
    );
  });
}