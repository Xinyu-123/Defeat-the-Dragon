import Weapon from './Weapons'
;
class Character {
    constructor(options){
        this._attack = options.attack;
        this._defence = options.defence;
        this._weapon = new Weapon(options.weapon);
        this._health = options.health
        this._level = options.level;
    }

    get type() {
        return this._type;
    }

    set type(type) {
        this._type = type;
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

    get attack_delay(){
        return this._attack_delay;
    }

    set attack_delay(delay) {
        this._attack_delay = delay;
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