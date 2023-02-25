const random = require('./utils/random');
const style = require('./utils/style');
const {
    PHYSICAL_ATTACK, MAGICAL_ATTACK,
} = require('./utils/constants');

const BAD_CONSTANT = 100;

/**
 * @class Hero
 */
class Hero {
    health = BAD_CONSTANT;
    currentMagic;
    attackResult;
    defenseResult;

    constructor({name, magicArmor, armor, bonus, defenseDice, attackDice}) {
        this.name = name;
        this.armor = armor;
        this.magicArmor = magicArmor;
        this.bonus = bonus;
        this.attackDice = attackDice;
        this.defenseDice = defenseDice;
    }

    /**
     * Check if hero is alive
     * @returns {number}
     */
    isAlive = () => this.health;

    /**
     * Launch a magical attack
     * @param magic
     */
    summon = (magic) => {
        this.currentMagic = magic;
        return this.attack(MAGICAL_ATTACK);
    }

    /**
     * Launch a physical attack
     */
    slap = () => {
        return this.attack(PHYSICAL_ATTACK);
    }

    /**
     * Dodge, then use damage from attack type
     * @param result
     * @param type
     */
    dodge = (result, type) => {
        const damage = this.calculateDamage(type);
        if (this.defenseResult < result) {
            this.suffer(damage);
        }
        return {defenseResult: this.defenseResult, result, damage};
    }

    /**
     * Protect, then use damage from attack type
     * @param result
     * @param type
     */
    protect = (result, type) => {
        const damage = this.calculateDamage(type),
            armor = (type === PHYSICAL_ATTACK) ? this.armor : this.magicArmor,
            protection = (this.defenseResult >= result) ?
                Math.abs(damage - armor) :
                Math.abs(damage - Math.ceil(armor / 2));
        if (this.defenseResult === 0) {
            this.suffer(damage);
        } else if (this.defenseResult >= result && this.defenseResult !== 20 || this.defenseResult < result) {
            this.suffer(protection);
        }
        return {defenseResult: this.defenseResult, damage, result, armor, protection};
    }

    /**
     * Throw the attack dice and return result
     * @returns {number}
     */
    throwAttackDice = () => {
        const result = random(this.attackDice);
        this.attackResult = result;
        return result;
    }

    /**
     * Throw the defense dice and return result
     * @returns {number}
     */
    throwDefenseDice = () => {
        const result = random(this.defenseDice);
        this.defenseResult = result;
        return result;
    }

    /**
     * Send information in order to draw lifebar
     * @returns {{total: number, health: number}}
     */
    lifeState = () => ({health: this.health, total: BAD_CONSTANT});

    /**
     * @internal
     * Calculate and return damage for both physical and magical attacks
     * @param type
     * @returns {*}
     */
    calculateDamage = (type) => {
        return type === PHYSICAL_ATTACK ?
            this.getPhysicalDamage() : this.getMagicalDamage();
    }

    /**
     * @internal
     * Decrease the health by the given damage.
     * @param damage
     */
    suffer = (damage) => this.health = (this.health - damage < 0) ? 0 : this.health - damage;

    /**
     * @internal
     * Calculate and return damage for physical attacks
     * @returns {*}
     */
    getPhysicalDamage = () => {
        if (this.attackResult === 20) {
            return this.attackResult * 2 + this.bonus;
        }
        return this.attackResult + this.bonus;
    }

    /**
     * @internal
     * Calculate and return damage for magical attacks
     * @returns {*}
     */
    getMagicalDamage = () => {
        let calculatedBonus;
        switch (this.currentMagic) {
            case 1:
                calculatedBonus = 6 + this.bonus
                break;
            case 2:
                calculatedBonus = 10 + this.bonus
                break;
            case 3:
                calculatedBonus = 16 + this.bonus
                break;
            default:
                calculatedBonus = 20 + this.bonus
        }
        return this.attackResult === 20 ? calculatedBonus * 2 : calculatedBonus;
    }

    /**
     * @internal
     * Launch both physical and magical attack
     * @param type
     */
    attack = (type) => {
        const calculatedBonus = (type === PHYSICAL_ATTACK) ?
            this.getPhysicalDamage() :
            this.getMagicalDamage();
        if (this.attackResult === 1) {
            this.suffer(calculatedBonus);
        }
        return {attackResult: this.attackResult, calculatedBonus, type};
    }
}

module.exports = Hero;
