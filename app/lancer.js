const random = require('./utils/random');
const print = require('./utils/print');
const {
    input,
    ATTACK_TYPE,
    SORT_LEVEL,
    DEFENSIVE,
} = require('./utils/prompts');
const style = require('./utils/style');
const {
    PHYSICAL_ATTACK, DODGE, ATTACK, DEFENSE,
} = require('./utils/constants');

const launchGame = async (hero, chapter) => {
    // allez on construit un joli titre de chapitre :)
    print.chapterBox(chapter);
    // ===========================================================================
    // ATTACK STEP
    // ===========================================================================
    const {attackType} = await input(ATTACK_TYPE);
    const attackDiceResult = hero.throwAttackDice();
    print.heroDice(attackDiceResult, ATTACK);
    // physical or magical attack
    let attack;
    if (attackType === PHYSICAL_ATTACK) {
        attack = hero.slap();
    } else {
        const {magic} = await input(SORT_LEVEL);
        attack = hero.summon(magic);
    }
    print.attack(attack);
    // update life bar
    print.lifeBar(hero.lifeState());

    // below we do not continue the game if hero is dead
    if (!hero.isAlive()) {
        return;
    }

    // ===========================================================================
    // CHEH STEP (damn you Mel!)
    // ===========================================================================
    const limit = (attackType === PHYSICAL_ATTACK) ? 5 : 9;
    if (hero.attackResult >= 2 && hero.attackResult <= limit) {
        console.log(style.emoji.skull, style.important('CHEH !!!'));
    } else {
        // ===========================================================================
        // DEFENSIVE STEP
        // ===========================================================================
        const {defense} = await input(DEFENSIVE);
        // game master and hero throw dice
        const gameMasterDice = random(20);
        print.gameMasterDice(gameMasterDice);
        const defenseDiceResult = hero.throwDefenseDice();
        print.heroDice(defenseDiceResult, DEFENSE);
        let damages;
        if (defense === DODGE) {
            damages = hero.dodge(gameMasterDice, attackType);
            print.dodgeDamages(damages);
        } else {
            damages = hero.protect(gameMasterDice, attackType);
            print.protectDamages(damages);
        }
        // update life bar
        print.lifeBar(hero.lifeState());
    }
}

module.exports = launchGame;
