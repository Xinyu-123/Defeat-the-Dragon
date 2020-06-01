import Character from './Character';
import Weapon from './Weapons';
import { player } from './app';
import { enemy } from './gamepage';


const Noti = require('./notification');
const Util = require('./Utility');
const Page = require('./gamepage');
const $ = require('jquery');

class Player extends Character {

    constructor(options){
        // console.log(this.type);
        super(options);
        this._class = options.class;
        this._xp_to_lvl = this.getLevelXP(this._level);
    
    }

    getLevelXP(level) {
        switch(level){
            case 1:
                return 10;
            case 2:
                return 40;
            case 3:
                return 60;
            case 4:
                return 200;

        }
    }

    show(){
        return 'hi';
    }

    gainXP(xp){
        this._xp_to_lvl -= xp
        setTimeout(() => {
            Noti.create_noti({
                type: 'gain_xp',
                xp: xp
            })

            if(this._xp_to_lvl <= 0)
            this.levelUP(this._level + 1);
        }, 1000)


    }

    levelUP (level){

        this._attack += 5;
        this.defence += 5;
        this._level = level;
        this._xp_to_lvl = this.getLevelXP(level);

        setTimeout(() => {
            Noti.create_noti({
                type: 'level_up',
                level: level,
                stats: {
                    attack: 5,
                    defence: 5
                }
            })
        }, 1000)


        console.log(player)
    }

    checkDeath(health){
        if(health <= 0){
            Noti.create_noti({
                type: 'player_death'
            })

            // let container = document.getElementsByClassName('interaction-container')[0];
            // while(container.firstChild){
            //     container.removeChild(container.firstChild);
            // }

            clearInterval(enemy._attack_int);

            $('.interaction-container').children().fadeOut(1000);

            Page.enemy = null;

            let game_over = $('<img>').addClass('enemy').attr('src', 'https://pngimg.com/uploads/game_over/game_over_PNG22.png');
            $(game_over).hide().appendTo('.interaction-container').fadeIn(1000);
            // https://pngimg.com/uploads/game_over/game_over_PNG22.png
            
        }
    }

}



export default Player;