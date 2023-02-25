const chalk = require('chalk');
const emoji = require('node-emoji');

// https://raw.githubusercontent.com/omnidan/node-emoji/master/lib/emoji.json

module.exports = {
    title: chalk.greenBright,
    step: chalk.red,
    important: chalk.green.bold,
    score: chalk.white.bold,
    dialog: chalk.green,
    effects: chalk.italic.grey,
    dices: chalk.yellowBright,
    emoji: {
        sword: emoji.get(':dagger_knife:'),
        book: emoji.get(':scroll:'),
        shield: emoji.get(':shield:'),
        dodge: emoji.get(':raised_hands:'),
        hero: emoji.get(':crown:'),
        skull: emoji.get(':skull:'),
        common: emoji.get(':fire:'),
        rare: emoji.get(':zap:'),
        epic: emoji.get(':spock-hand:'),
        legendary: emoji.get(':unicorn_face:'),
        magic: emoji.get(':crystal_ball:'),
        life: emoji.get(':sparkling_heart:'),
        noLife: emoji.get(':broken_heart:'),
        dice: emoji.get(':game_die:'),
        loop: emoji.get(':curly_loop:'),
    }
}
