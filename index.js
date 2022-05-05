const Eyo = require('eyo-kernel');
const { Composer } = require('micro-bot');

const bot = new Composer();

const safeEyo = new Eyo();
safeEyo.dictionary.loadSafeSync();

bot.on('message', ({ reply, message }) => {
  const cases = safeEyo.lint(message.text).map(({ after }) => '«' + after + '»')
  // Remove duplicates
  .filter((item, index, self) => self.indexOf(item) === index);
  if (cases.length) {
    return reply(
      `${cases.length === 1 ? 'Слово' : 'Слова'}: ${cases.join(', ')} ${
        cases.length === 1 ? 'пишется' : 'пишутся'
      } не так :)`
    );
  }
});

module.exports = bot;
