
export default class Weapon {
    constructor(name){

        this._name = name;
        this._attack = this.getWeaponAttack(name)
        // this._attack = getWeaponAttack(name);
        // this._class = getWeaponClass(name);
    }

    getWeaponAttack(name) {
        return 1;
    }

    getWeaponClass (name) {
        return "Warrior";
    }
}



