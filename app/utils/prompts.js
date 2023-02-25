const prompts = require('prompts');
const style = require('./style');

const COMP_RACE_BONUS = 'competenceAndRacialBonus';
const ATTACK_DICE = 'attackDice';
const DEFENSE_DICE = 'defenseDice';
const ATTACK_TYPE = 'attackType';
const SORT_LEVEL = 'sortLevel';
const DEFENSIVE = 'defense';
const ARMOR = 'armor';
const MAGIC_ARMOR = 'magicArmor';
const NAME = 'name';

const promptsMap = new Map();
promptsMap.set(NAME, {message: 'Entrez son nom :', type: 'text'});
promptsMap.set(ATTACK_DICE, {message: 'Entrez le dés d\'attaque :'});
promptsMap.set(DEFENSE_DICE, {message: 'Entrez le dés de protection :'});
promptsMap.set(COMP_RACE_BONUS, {message: 'Rentrer le total de votre bonus de compétence et de votre bonus racial :'});
promptsMap.set(ARMOR, {message: 'Entrer votre armure :'});
promptsMap.set(MAGIC_ARMOR, {message: 'Entrer votre armure magique :'});
promptsMap.set(SORT_LEVEL, {
    message: 'Entrer le niveau de votre sort :',
    type: 'select',
    choices: [
        {title: style.emoji.common + ' Commun', value: 1},
        {title: style.emoji.rare + ' Rare', value: 2},
        {title: style.emoji.epic + ' Épic', value: 3},
        {title: style.emoji.legendary + ' Légendaire', value: 4},
    ]
});
promptsMap.set(ATTACK_TYPE, {
    message: 'Voulez-vous faire une attaque physique ou magique ?',
    type: 'select',
    choices: [
        {title: style.emoji.sword + ' Physique', value: 1},
        {title: style.emoji.magic + ' Magique', value: 2},
    ]
});
promptsMap.set(DEFENSIVE, {
    message: 'Voulez-vous vous protéger ou esquiver ?',
    type: 'select',
    choices: [
        {title: style.emoji.dodge + ' Esquiver', value: 1},
        {title: style.emoji.shield + 'Protection', value: 2},
    ]
});

const input = async (key) => {
    const {message, type, choices} = promptsMap.get(key);
    return prompts({
        type: type || 'number',
        name: key,
        message,
        choices,
    });
}

module.exports = {
    input,
    COMP_RACE_BONUS,
    ATTACK_TYPE,
    SORT_LEVEL,
    DEFENSIVE,
    ATTACK_DICE,
    ARMOR,
    MAGIC_ARMOR,
    NAME,
    DEFENSE_DICE,
}
