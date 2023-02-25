const launchGame = require('./app/lancer');
const Hero = require("./app/hero");
const {
    input,
    COMP_RACE_BONUS,
    NAME,
    ATTACK_DICE,
    DEFENSE_DICE,
    ARMOR,
    MAGIC_ARMOR,
} = require("./app/utils/prompts");
const style = require('./app/utils/style');

(async () => {
    // TODO: avoir une classe générique pour le print, pas dans Hero
    // TODO: double checker la logique métier de Mel

    console.log(style.title(`
    
    
    
    
    
    
    
 ▐▄▄▄   ·▄▄▄▄     ▄▄▄      ▄▄▄▄▄            ▄▄▌  ▄▄▄▄·       ▐▄• ▄ 
  ·██   ██▪ ██    ▀▄ █·    •██  ▪     ▪     ██•  ▐█ ▀█▪▪      █▌█▌▪
▪▄ ██   ▐█· ▐█▌   ▐▀▀▄      ▐█.▪ ▄█▀▄  ▄█▀▄ ██▪  ▐█▀▀█▄ ▄█▀▄  ·██· 
▐▌▐█▌   ██. ██    ▐█•█▌     ▐█▌·▐█▌.▐▌▐█▌.▐▌▐█▌▐▌██▄▪▐█▐█▌.▐▌▪▐█·█▌
 ▀▀▀• ▀ ▀▀▀▀▀•  ▀ .▀  ▀     ▀▀▀  ▀█▄▀▪ ▀█▄▀▪.▀▀▀ ·▀▀▀▀  ▀█▄▀▪•▀▀ ▀▀`));
    console.log(style.effects('> by Mel&Dim'));

    // ===========================================================================
    // HERO CREATION STEP
    // ===========================================================================
    console.log(style.emoji.hero, style.dialog('Tout d\'abord, créons ton personnage.'));
    const {name} = await input(NAME);
    console.log(style.emoji.hero, style.dialog('Hello'), style.important(name), style.dialog('! Voyons maintenant ce que tu as dans le ventre !'));
    const {competenceAndRacialBonus: bonus} = await input(COMP_RACE_BONUS);
    const {attackDice} = await input(ATTACK_DICE);
    const {defenseDice} = await input(DEFENSE_DICE);
    const {armor} = await input(ARMOR);
    const {magicArmor} = await input(MAGIC_ARMOR);
    const hero = new Hero({name, bonus, attackDice, defenseDice, armor, magicArmor});
    console.log(style.emoji.hero, style.dialog(`Nice to meet you`) + ' ' + style.important(`${hero.name}!`));
    // ===========================================================================
    // PLAY UNTIL DEATH
    // ===========================================================================
    let chapter = 1;
    while (hero.isAlive()) {
        await launchGame(hero, chapter);
        chapter++;
    }
    // ===========================================================================
    // RAGE QUIT
    // ===========================================================================
    console.log(style.step(`
 ▄· ▄▌      ▄• ▄▌▄▄▄      ·▄▄▄▄  ▄▄▄ . ▄▄▄· ·▄▄▄▄  
▐█▪██▌▪     █▪██▌▀▄ █·    ██▪ ██ ▀▄.▀·▐█ ▀█ ██▪ ██ 
▐█▌▐█▪ ▄█▀▄ █▌▐█▌▐▀▀▄     ▐█· ▐█▌▐▀▀▪▄▄█▀▀█ ▐█· ▐█▌
 ▐█▀·.▐█▌.▐▌▐█▄█▌▐█•█▌    ██. ██ ▐█▄▄▌▐█ ▪▐▌██. ██ 
  ▀ •  ▀█▄▀▪ ▀▀▀ .▀  ▀    ▀▀▀▀▀•  ▀▀▀  ▀  ▀ ▀▀▀▀▀•`));
    console.log(style.effects('> who\'s next?'));
    process.exit();
})();
