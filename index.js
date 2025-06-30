import { Telegraf } from 'telegraf';
import dotenv from 'dotenv';

import { registerStart } from './commands/start.js';
import { registerHelp } from './commands/help.js';
import { registerEcho } from './commands/echo.js';

dotenv.config();

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

// Регистрируем все команды/хэндлеры
registerStart(bot);
registerHelp(bot);
registerEcho(bot);

// Лог ошибок
bot.catch((err, ctx) => {
  console.error(`Ошибка при обработке ${ctx.updateType}:`, err);
});

// Запуск бота
bot.launch({ polling: true })
  .catch(err => console.error('Ошибка запуска бота:', err));

// Лог сразу после инициации polling
console.log('Бот запущен');

// Грейсфул-стоп
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));