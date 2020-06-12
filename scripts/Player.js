import Character from './Character';
import Weapon from './Weapons';
import { player } from './app';
import { enemy } from './gamepage';
import Button from './Button';


const Noti = require('./notification');
const Util = require('./Utility');
const Page = require('./gamepage');
const ButtonFunc = require('./buttonFunctions');
const $ = require('jquery');

class Player extends Character {

    constructor(options){
        // console.log(this.type);
        super(options);
        this._class = options.class;
        this._xp_to_lvl = this.getLevelXP(this._level);
        this._max_health = options.max_health;
        this._defending = false;
        this._spells = ['Thundershock', 'Fireball', 'Water Surge', 'Earthquake']
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
        this._max_health += 50;
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

    health_change(options){
        this.checkDeath(options.health);
        this.health_bound();
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

            Page.enemy.clear_attack();
            // clearInterval(Page.enemy._attack_int);
            console.log($('.interaction-container').children())

            $('.interaction-container').children('img').fadeOut(1000);
            
            $('.battle-options-container').children().fadeOut(1000);
            
            $('.items-container').children('#intro-btn').fadeOut(1000)



            Page.enemy = null;

            setTimeout(() => {
                $('.battle-options-container').empty();
                $('.interaction-container').children('img').remove();
                // $('.items-container').children('#intro-btn').remove();
                let game_over = $('<img>').addClass('enemy').attr('src', 'https://pngimg.com/uploads/game_over/game_over_PNG22.png');
                let try_again_btn = new Button({
                    id: 'alt-btn',
                    text: 'try again',
                    click_events: [ButtonFunc.restart_btn],
                    cooldown: 0,
                    width: 60
                })
                console.log('1');
                $(game_over).hide().appendTo('.interaction-container').fadeIn(1000);
                console.log('2');
                $(try_again_btn._element).hide().appendTo('.battle-options-container').delay(500).fadeIn(2000);

                console.log('3');

            }, 1000)
            
            // https://pngimg.com/uploads/game_over/game_over_PNG22.png
            
        }
    }

    health_bound() {

        if(player.health > player._max_health){
            player.health = player._max_health;
        }
    }

    get_spell(){
        let roll = Util.getRandomInt(4);
        return this._spells[roll]
    }

}



export default Player;