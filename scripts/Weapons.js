
export default class Weapon {
    constructor(name){

        this._name = name;
        this._attack = this.getWeaponAttack(name)
        this._cooldown = this.getWeaponCooldown(name);
        // this._attack = getWeaponAttack(name);
        // this._class = getWeaponClass(name);
    }

    getWeaponAttack(name) {
        return 1;
    }

    getWeaponClass (name) {
        return "Warrior";
    }

    getWeaponCooldown(name) {
        switch(name){
            case 'Shortsword':
                return 2;
            case 'fists':
                return 3;
            case 'claws':
                return 2.5;

            
        }

        return 3;
    }
}



