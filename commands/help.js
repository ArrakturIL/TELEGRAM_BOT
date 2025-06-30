// commands/help.js
export function registerHelp(bot) {
  bot.help((ctx) => {
    ctx.reply(
      'Доступные команды:\n' +
      '/start — запуск и приветствие\n' +
      '/help — показать это сообщение'
    );
  });
}