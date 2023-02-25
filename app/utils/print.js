const style = require('./style');
const {
    ATTACK, DEFENSE, PHYSICAL_ATTACK,
} = require('./constants');
const intToRoman = require('./numbers');
const quotes = require('./quotes');

/**
 * Display the life bar of the hero + the message with the hearts left
 * @param health
 * @param total
 */
const lifeBar = ({health, total}) => {
    const life = Array(health).fill(style.emoji.life).join(' '),
        noLife = Array(total - health).fill(style.emoji.noLife).join(' '),
        bar = [style.dialog('Il vous reste'), style.score(health), style.dialog('points de santé !')];
    console.log();
    (health) ? console.log(`[ ${life} ${noLife} ]`, ...bar) : console.log(`[ ${noLife} ]`, ...bar);
    console.log();
}

/**
 * Display the message for the result of a protection defense
 * @param defenseResult
 * @param damage
 * @param result
 * @param armor
 * @param protection
 */
const protectDamages = ({defenseResult, damage, result, armor, protection}) => {
    if (defenseResult === 20) {
        console.log(style.dialog('Vous réduisez tout les dégats subit et prenez aucun dégats'));
    } else if (defenseResult === 0) {
        console.log(style.dialog('Vous ne réduisez aucun dégats et prenez'), style.score(damage), style.dialog('dégats'));
    } else if (defenseResult >= result) {
        console.log(style.dialog('Vous réduisez les dégâts de'), style.score(armor), style.dialog('et prenez'), style.score(protection), style.dialog('dégats'));
    } else {
        console.log(style.dialog('Vous réduisez les dégâts de'), style.score(Math.ceil(armor / 2)), style.dialog('et prenez'), style.score(protection), style.dialog('dégats'));
    }
}

/**
 * Display the message for the result of a dodge defense
 * @param defenseResult
 * @param result
 * @param damage
 */
const dodgeDamages = ({defenseResult, result, damage}) => {
    if (defenseResult >= result) {
        console.log(style.dialog('Vous esquivez l\'attaque !'));
    } else {
        console.log(style.dialog('Vous n\'esquivez pas l\'attaque et prenez'), style.score(damage), style.dialog('de dégats'));
    }
}

/**
 * Display the message for the result of an attack
 * @param attackResult
 * @param calculatedBonus
 * @param limit
 * @param type
 */
const attack = ({attackResult, calculatedBonus, type}) => {
    const wording = (type === PHYSICAL_ATTACK) ? 'attaque' : 'sort',
        limit = (type === PHYSICAL_ATTACK) ? 5 : 9;
    if (attackResult === 1) {
        console.log(style.dialog(`Votre ${wording} se retourne contre vous et vous inflige`), style.score(calculatedBonus), style.dialog('de dégats'));
    } else if (attackResult >= 2 && attackResult <= limit) {
        console.log(style.dialog(`Votre ${wording} ne réussit pas`));
    } else if (attackResult <= 19) {
        console.log(style.dialog(`Votre ${wording} réussit, vous infligez`), style.score(calculatedBonus), style.dialog('de dégats'));
    } else {
        console.log(style.dialog('Coups critique ! Vous infligez'), style.score(calculatedBonus), style.dialog('de dégats'));
    }
}

/**
 * Display the result of the hero dice roll
 * @param result
 * @param type
 */
const heroDice = (result, type) => {
    const wording = (type === ATTACK) ? 'd\'attaque' : 'de défense';
    console.log(style.emoji.dice, style.dialog(`Vous lancez le dé ${wording} et faites un`), style.score(result), style.dialog('!'));
}

/**
 * Display the result of the game master dice roll
 * @param result
 * @param type
 */
const gameMasterDice = (result, type = ATTACK) => {
    const wording = (type === ATTACK) ? 'd\'attaque' : 'de défense';
    console.log(style.emoji.dice, style.effects(`Le maître du jeu lance son dé ${wording} et fait un`), style.score(result), style.effects('!'));
}

/**
 * Display the chapter box with a random Lao Tseu quote (because reason)
 * @param chapter
 */
const chapterBox = (chapter) => {
    const chapText = `CHAPTER ${intToRoman(chapter)}`,
        quote = `“${quotes()}„`,
        hr = Array((`${chapText} ${quote}`).length + 7).fill(style.emoji.loop).join('');
    console.log(style.effects(hr));
    console.log(' ', style.emoji.book, style.step(chapText), style.effects(quote));
    console.log(style.effects(hr));
}

module.exports = {
    protectDamages, dodgeDamages, attack, heroDice, gameMasterDice, lifeBar, chapterBox,
}
