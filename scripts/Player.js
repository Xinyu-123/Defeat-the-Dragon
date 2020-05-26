import Character from './Character';
import Weapon from './Weapons';

class Player extends Character {

    constructor(options){
        // console.log(this.type);
        super(options);
        this._class = options.class;

    
    }




}



export default Player;