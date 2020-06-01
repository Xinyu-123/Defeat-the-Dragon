import Weapon from './Weapons';

class Character {
    constructor(options){
        this._attack = options.stats.attack;
        this._defence = options.stats.defence;
        this._weapon = new Weapon(options.weapon);
        this._health = options.health
        this._level = options.level;        
    }

    get attack() {
        return this._attack;
    }

    set attack(attack) {
        this._attack = attack;
    }

    get defence() {
        return this._defence;
    }

    set defence(defence) {
        this._defence = defence;
    }

    get health() {
        return this._health;
    }

    set health(health) {
        this._health = health;
    }

    get weapon() {
        return this._weapon;
    }

    set weapon(weapon) {
        this._weapon = weapon;
    }

    get level(){
        return this._level;
    }

    set level(level) {
        this._level = level;
    }
    /* Needed functions
    - Class type
    - getAttack
    - getDefence
    - getWeapon
    */
}

export default Character;